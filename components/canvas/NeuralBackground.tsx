"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Balanced medium node count
    const nodeCount = Math.floor(Math.min(width, 1600) / 24);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.5),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.5),
        radius: Math.random() * 1.2 + 1.2, // Medium balanced size (~1.2 - 2.4px)
        baseAlpha: Math.random() * 0.35 + 0.35,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseOnScreen = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOnScreen = true;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      isMouseOnScreen = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let time = 0;
    const maxDistance = 140;
    const mouseRepelRadius = 180; // Strong avoidance bubble so cursor never touches nodes

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const primaryColor = isDark ? "45, 212, 191" : "13, 148, 136"; // teal-400 : teal-600
      const accentGlow = isDark ? "94, 234, 212" : "20, 184, 166"; // teal-300 : teal-500

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          // Strong cursor avoidance forcefield - keeps nodes away from cursor
          if (isMouseOnScreen && mouseX > -500 && mouseY > -500) {
            const dx = node.x - mouseX;
            const dy = node.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRepelRadius && dist > 0) {
              const force = Math.pow(1 - dist / mouseRepelRadius, 1.5) * 7.0;
              const angle = Math.atan2(dy, dx);
              node.vx += Math.cos(angle) * force * 0.45;
              node.vy += Math.sin(angle) * force * 0.45;
            }
          }

          // Apply velocity with dampening
          node.x += node.vx;
          node.y += node.vy;

          node.vx *= 0.93;
          node.vy *= 0.93;

          // Continuous gentle drifting
          if (Math.abs(node.vx) < 0.18) node.vx += (Math.random() - 0.5) * 0.05;
          if (Math.abs(node.vy) < 0.18) node.vy += (Math.random() - 0.5) * 0.05;

          // Smooth edge wrapping
          if (node.x < -30) node.x = width + 30;
          else if (node.x > width + 30) node.x = -30;

          if (node.y < -30) node.y = height + 30;
          else if (node.y > height + 30) node.y = -30;
        }

        // Draw connections between nodes ONLY (never to the cursor)
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.25 : 0.18);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${primaryColor}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw medium-sized glowing node
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.25 + 0.85;
        const currentAlpha = node.baseAlpha * pulse * (isDark ? 0.85 : 0.65);

        // Soft outer glow halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryColor}, ${currentAlpha * 0.2})`;
        ctx.fill();

        // Solid inner core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentGlow}, ${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-85 transition-opacity duration-300"
      aria-hidden="true"
    />
  );
}
