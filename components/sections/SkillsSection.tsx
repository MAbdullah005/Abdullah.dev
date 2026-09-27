"use client";

import React, { useEffect, useRef, useState } from "react";
import { SKILL_CATEGORIES } from "@/data/portfolio-data";
import { Sparkles, Brain, Database, Cpu, Cloud } from "lucide-react";

const ICONS = [Sparkles, Brain, Database, Cpu, Cloud];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 border-b border-[#E8E8E4]/60 dark:border-[#1F2937]/60 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <span className="section-label">Skills</span>
          <h2 className="section-title">Organised by where they get used</h2>
        </div>

        <div
          ref={ref}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const span =
              category.id === "ai-llm" || category.id === "machine-learning"
                ? "lg:col-span-2"
                : "";

            return (
              <div
                key={category.id}
                className={`group relative overflow-hidden rounded-2xl border border-[#E8E8E4] bg-white p-6 shadow-2xs transition-all duration-300 hover:border-[#0D9488]/40 hover:shadow-sm dark:border-[#1F2937] dark:bg-[#111827] dark:hover:border-[#5EEAD4]/35 ${span} ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: `${idx * 60}ms`,
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0D9488]/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-[#0D9488]/[0.09]"
                />

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E8E8E4] bg-[#F4F4F0] text-[#0D9488] dark:border-[#374151] dark:bg-[#1F2937] dark:text-[#5EEAD4]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#111827] dark:text-[#F9FAFB]">
                        {category.name}
                      </h3>
                      <p className="text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                        {category.caption}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="pill transition-colors hover:border-[#0D9488]/40 hover:text-[#0D9488] dark:hover:border-[#5EEAD4]/35 dark:hover:text-[#5EEAD4]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
