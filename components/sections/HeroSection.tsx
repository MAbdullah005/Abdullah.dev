"use client";

import React, { useEffect, useRef, useState } from "react";
import { PERSONAL_INFO, ARCHITECTURE_PIPELINE } from "@/data/portfolio-data";
import {
  ArrowDown,
  Github,
  Linkedin,
  FileText,
  ArrowUpRight,
  Boxes,
  Container,
  Cloud,
  Gauge,
  Cpu,
  Database,
  Code2,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const ICONS = [Database, Code2, Cpu, Layers, Boxes, Container, Cloud, Gauge];

const STATS = [
  { value: "4+", label: "Major Projects", sub: "Production AI & RAG" },
  { value: "4+", label: "Certifications", sub: "Agentic AI & MLOps" },
  { value: "Full Stack", label: "AI & MLOps", sub: "FastAPI · Docker · AWS" },
  { value: "AI/ML", label: "Specialization", sub: "LLMs & Agentic Systems" },
];

const QUICK_HIGHLIGHTS = [
  "AI, LLM applications, and Agentic RAG focus",
  "Cloud architecture, containerization, and MLOps builds",
  "Open to AI/ML projects and collaborations",
];

export default function HeroSection({
  onOpenResume,
}: {
  onOpenResume: () => void;
}) {
  const pipelineRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [pipelineInView, setPipelineInView] = useState(false);

  useEffect(() => {
    const el = pipelineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPipelineInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pipelineInView) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % ARCHITECTURE_PIPELINE.length);
    }, 1500);
    return () => window.clearInterval(interval);
  }, [pipelineInView]);

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 border-b border-[#E8E8E4]/60 dark:border-[#1F2937]/60 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Hero Layout: Left Content & Right Circular Photo */}
        <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-10 lg:gap-14">
          {/* Left Column: Heading, Quick Highlights, CTAs, Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#111827] border border-[#E8E8E4] dark:border-[#1F2937] text-[11px] font-mono tracking-wider uppercase text-[#0D9488] dark:text-[#5EEAD4] mb-5 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D9488] dark:bg-[#5EEAD4] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488] dark:bg-[#5EEAD4]" />
              </span>
              <span>AI &amp; Data Science · MLOps</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-[#F9FAFB] leading-[1.15] mb-3">
              {PERSONAL_INFO.name}
            </h1>

            <h2 className="text-lg sm:text-xl font-semibold text-[#0D9488] dark:text-[#5EEAD4] mb-4 flex items-center gap-2">
              <span>AI/ML &amp; Agentic Systems Engineer</span>
              <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4]" />
            </h2>

            {/* Tagline */}
            <p className="text-sm sm:text-base text-[#4B5563] dark:text-[#9CA3AF] max-w-xl leading-relaxed mb-6">
              Building intelligent solutions with Python, Machine Learning, Agentic AI, and Cloud Architecture.
            </p>

            {/* Quick Highlights Box */}
            <div className="mb-6 p-3.5 sm:p-4 rounded-xl border border-[#E8E8E4] dark:border-[#1F2937] bg-white/70 dark:bg-[#111827]/70 backdrop-blur-xs shadow-2xs space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#0D9488] dark:text-[#5EEAD4]" />
                <span>Quick highlights</span>
              </div>
              <ul className="space-y-1.5">
                {QUICK_HIGHLIGHTS.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-[#374151] dark:text-[#D1D5DB]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] dark:text-[#5EEAD4] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111827] dark:bg-[#F9FAFB] text-white dark:text-[#111827] hover:bg-[#1F2937] dark:hover:bg-[#E5E7EB] text-xs font-semibold tracking-wide transition-all shadow-sm group hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D9488] text-white hover:bg-[#0F766E] text-xs font-semibold tracking-wide transition-all shadow-sm group hover:-translate-y-0.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View / Download Resume</span>
              </button>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#111827] border border-[#E8E8E4] dark:border-[#1F2937] text-[#111827] dark:text-[#F9FAFB] hover:bg-[#F4F4F0] dark:hover:bg-[#1F2937] hover:border-[#0D9488]/40 text-xs font-semibold tracking-wide transition-all group shadow-2xs"
              >
                <Github className="w-3.5 h-3.5 text-[#4B5563] dark:text-[#9CA3AF]" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#9CA3AF] dark:text-[#6B7280] group-hover:text-[#0D9488] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#111827] border border-[#E8E8E4] dark:border-[#1F2937] text-[#111827] dark:text-[#F9FAFB] hover:bg-[#F4F4F0] dark:hover:bg-[#1F2937] hover:border-[#0D9488]/40 text-xs font-semibold tracking-wide transition-all group shadow-2xs"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0D9488] dark:text-[#5EEAD4]" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* 4 Stat Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 sm:p-3.5 rounded-xl border border-[#E8E8E4] dark:border-[#1F2937] bg-white dark:bg-[#111827] shadow-2xs text-center transition-colors hover:border-[#0D9488]/50 dark:hover:border-[#5EEAD4]/40"
                >
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0D9488] dark:text-[#5EEAD4] tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold text-[#111827] dark:text-[#F9FAFB] mt-0.5">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] mt-0.5 truncate font-mono">
                    {stat.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Clean Circular Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 mx-auto lg:mx-0 flex flex-col items-center justify-center"
          >
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-[#E8E8E4] dark:border-[#1F2937] bg-white dark:bg-[#111827] shadow-lg group">
              <img
                src={PERSONAL_INFO.profileImage}
                alt="Abdullah Ali — AI/ML Engineer"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Technical Architecture Pipeline — Embedded into Home */}
        <div className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-[#E8E8E4]/60 dark:border-[#1F2937]/60">
          <div className="mb-6 flex items-center justify-between">
            <span className="section-label mb-0">From Model to Production</span>
            <span className="text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
              End-to-End System Pipeline
            </span>
          </div>

          {/* Desktop: horizontal pipeline */}
          <div
            ref={pipelineRef}
            className={`hidden md:grid md:grid-cols-8 md:items-stretch transition-all duration-700 ease-smooth ${
              pipelineInView ? "opacity-100" : "opacity-0"
            }`}
          >
            {ARCHITECTURE_PIPELINE.map((stage, idx) => {
              const Icon = ICONS[idx % ICONS.length];
              const isActive = idx === active;

              return (
                <div key={stage.label} className="flex flex-col items-center">
                  <div
                    className={`w-full flex-1 rounded-xl border p-3.5 text-center transition-all duration-300 ease-smooth ${
                      isActive
                        ? "border-[#0D9488]/50 bg-[#0D9488]/[0.06] shadow-glow -translate-y-1 dark:border-[#5EEAD4]/40 dark:bg-[#0D9488]/[0.1]"
                        : "border-[#E8E8E4] bg-white hover:border-[#0D9488]/30 dark:border-[#1F2937] dark:bg-[#111827]"
                    }`}
                  >
                    <div
                      className={`mx-auto mb-2.5 flex h-7.5 w-7.5 items-center justify-center rounded-lg border transition-colors ${
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
                    <div className="flex h-7 items-center">
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
                  <div className="card flex items-center gap-3 p-3.5">
                    <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg border border-[#E8E8E4] text-[#0D9488] dark:border-[#374151] dark:text-[#5EEAD4]">
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
                      <ArrowDown className="h-3 w-3 text-[#0D9488]/50 dark:text-[#5EEAD4]/50" />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
