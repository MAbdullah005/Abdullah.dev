"use client";

import React, { useEffect, useRef, useState } from "react";
import { ARCHITECTURE_PIPELINE } from "@/data/portfolio-data";
import { ArrowDown, Boxes, Container, Cloud, Gauge, Cpu, Database, Code2, Layers } from "lucide-react";

const ICONS = [Database, Code2, Cpu, Layers, Boxes, Container, Cloud, Gauge];

export default function ArchitectureSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % ARCHITECTURE_PIPELINE.length);
    }, 1500);
    return () => window.clearInterval(interval);
  }, [inView]);

  return (
    <section
      id="architecture"
      className="relative py-16 sm:py-24 border-b border-[#E8E8E4]/60 dark:border-[#1F2937]/60 scroll-mt-20"
    >
      {/* Faint pipeline glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-64 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0D9488]/[0.05] blur-3xl dark:bg-[#0D9488]/[0.1]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <span className="section-label">Technical Architecture</span>
          <h2 className="section-title">From Model to Production</h2>
        </div>

        {/* Desktop: horizontal pipeline */}
        <div
          ref={ref}
          className={`hidden md:grid md:grid-cols-8 md:items-stretch transition-all duration-700 ease-smooth ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          {ARCHITECTURE_PIPELINE.map((stage, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const isActive = idx === active;

            return (
              <div key={stage.label} className="flex flex-col items-center">
                <div
                  className={`w-full flex-1 rounded-xl border p-4 text-center transition-all duration-300 ease-smooth ${
                    isActive
                      ? "border-[#0D9488]/50 bg-[#0D9488]/[0.06] shadow-glow -translate-y-1 dark:border-[#5EEAD4]/40 dark:bg-[#0D9488]/[0.1]"
                      : "border-[#E8E8E4] bg-white hover:border-[#0D9488]/30 dark:border-[#1F2937] dark:bg-[#111827]"
                  }`}
                >
                  <div
                    className={`mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                      isActive
                        ? "border-[#0D9488]/30 text-[#0D9488] dark:text-[#5EEAD4]"
                        : "border-[#E8E8E4] text-[#6B7280] dark:border-[#374151] dark:text-[#9CA3AF]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-xs font-bold text-[#111827] dark:text-[#F9FAFB]">
                    {stage.label}
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
                    {stage.detail}
                  </p>
                </div>

                {idx < ARCHITECTURE_PIPELINE.length - 1 && (
                  <div className="flex h-8 items-center">
                    <span
                      className={`h-px w-full transition-colors duration-300 ${
                        idx < active
                          ? "bg-[#0D9488]/60 dark:bg-[#5EEAD4]/60"
                          : "bg-[#E8E8E4] dark:bg-[#1F2937]"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical pipeline */}
        <ol className="md:hidden space-y-2">
          {ARCHITECTURE_PIPELINE.map((stage, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <li key={stage.label}>
                <div className="card flex items-center gap-3 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E8E8E4] text-[#0D9488] dark:border-[#374151] dark:text-[#5EEAD4]">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#111827] dark:text-[#F9FAFB]">
                      {stage.label}
                    </p>
                    <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                      {stage.detail}
                    </p>
                  </div>
                </div>
                {idx < ARCHITECTURE_PIPELINE.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="h-3.5 w-3.5 text-[#0D9488]/50 dark:text-[#5EEAD4]/50" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
