"use client";

import React, { useEffect, useRef, useState } from "react";
import { JOURNEY } from "@/data/portfolio-data";
import { GraduationCap, Sparkles, Cpu, Workflow, Rocket } from "lucide-react";

const ICONS = [GraduationCap, Cpu, Sparkles, Workflow, Rocket];

export default function JourneySection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(1);
      return;
    }

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height + viewport - 120;
      const travelled = Math.min(
        Math.max(viewport - rect.top - 60, 0),
        total
      );
      setProgress(Math.min(travelled / total, 1));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      id="journey"
      className="py-16 sm:py-24 border-b border-[#E8E8E4]/60 dark:border-[#1F2937]/60 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <span className="section-label">Journey</span>
          <h2 className="section-title">How I got here</h2>
          <p className="section-body">
            A learning path rather than a job history — from computer science
            fundamentals through classical ML, LLM applications, agents, and the
            deployment work that makes them usable.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Rail */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-px bg-[#E8E8E4] dark:bg-[#1F2937] md:left-1/2 md:-translate-x-1/2"
          >
            <div
              className="w-px origin-top bg-[#0D9488] transition-[height] duration-200 ease-out dark:bg-[#5EEAD4]"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          <ol className="space-y-8 md:space-y-10">
            {JOURNEY.map((entry, idx) => {
              const Icon = ICONS[idx % ICONS.length];
              const isRight = idx % 2 === 1;

              return (
                <li
                  key={entry.title}
                  className="relative md:grid md:grid-cols-2 md:gap-10"
                >
                  {/* Node marker */}
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E4] bg-[#FBFBF9] dark:border-[#1F2937] dark:bg-[#0B0F1A] md:left-1/2 md:-translate-x-1/2"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ${
                        progress * JOURNEY.length > idx
                          ? "bg-[#0D9488] text-white dark:bg-[#5EEAD4] dark:text-[#0B0F1A]"
                          : "bg-[#F4F4F0] text-[#6B7280] dark:bg-[#1F2937] dark:text-[#9CA3AF]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-14 md:ml-0 ${
                      isRight ? "md:pl-14" : "md:pr-14 md:text-right"
                    }`}
                  >
                    <div className="card p-5 transition-all duration-300 hover:border-[#0D9488]/40 dark:hover:border-[#5EEAD4]/35">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#0D9488] dark:text-[#5EEAD4]">
                        {entry.period}
                      </span>
                      <h3 className="mt-1 text-sm font-bold text-[#111827] dark:text-[#F9FAFB]">
                        {entry.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
                        {entry.description}
                      </p>
                      <div
                        className={`mt-3.5 flex flex-wrap gap-1.5 ${
                          isRight ? "md:justify-end" : ""
                        }`}
                      >
                        {entry.tags.map((tag) => (
                          <span key={tag} className="pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
