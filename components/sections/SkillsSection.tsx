"use client";

import React, { useEffect, useRef, useState } from "react";
import { SKILL_CATEGORIES } from "@/data/portfolio-data";
import { Brain, Cpu, Database, Boxes, Cloud } from "lucide-react";

const ICONS = [Brain, Cpu, Database, Boxes, Cloud];

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

  const totalSkills = SKILL_CATEGORIES.reduce(
    (sum, category) => sum + category.skills.length,
    0
  );

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
          <p className="section-body">
            {totalSkills} tools and concepts grouped by the layer they operate at — from
            raw data, through models and agents, to the infrastructure that keeps them
            running.
          </p>
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
                className={`card group relative p-5 sm:p-6 overflow-hidden transition-all duration-500 ease-smooth hover:border-[#0D9488]/40 hover:shadow-sm dark:hover:border-[#5EEAD4]/35 ${span} ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${idx * 70}ms` }}
              >
                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#0D9488]/0 blur-2xl transition-all duration-500 group-hover:bg-[#0D9488]/10 dark:group-hover:bg-[#0D9488]/15"
                />

                <div className="relative flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#111827] dark:text-[#F9FAFB] group-hover:text-[#0D9488] dark:group-hover:text-[#5EEAD4] transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                      {category.caption}
                    </p>
                  </div>
                  <div className="w-9 h-9 shrink-0 rounded-lg border border-[#E8E8E4] dark:border-[#374151] bg-[#F4F4F0] dark:bg-[#1F2937] flex items-center justify-center text-[#111827] dark:text-[#F9FAFB] group-hover:text-[#0D9488] dark:group-hover:text-[#5EEAD4] group-hover:border-[#0D9488]/30 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="relative flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="pill transition-all duration-200 hover:border-[#0D9488]/40 hover:bg-[#CCFBF1]/30 hover:text-[#0F766E] dark:hover:border-[#5EEAD4]/35 dark:hover:bg-[#0D9488]/12 dark:hover:text-[#5EEAD4]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
