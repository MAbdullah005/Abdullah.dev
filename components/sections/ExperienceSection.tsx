"use client";

import React, { useEffect, useRef, useState } from "react";
import { EXPERIENCE } from "@/data/portfolio-data";
import { Building2, MapPin, Layers } from "lucide-react";

export default function ExperienceSection() {
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
      id="experience"
      className="py-16 sm:py-24 border-b border-[#E8E8E4]/60 dark:border-[#1F2937]/60 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <span className="section-label">Career</span>
          <h2 className="section-title">Experience</h2>
        </div>

        <div
          ref={ref}
          className={`space-y-5 transition-all duration-700 ease-smooth ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {EXPERIENCE.map((job) => (
            <article
              key={job.company}
              className="group relative overflow-hidden rounded-2xl border border-[#E8E8E4] bg-white p-6 shadow-2xs transition-all duration-300 hover:border-[#0D9488]/40 hover:shadow-sm sm:p-7 dark:border-[#1F2937] dark:bg-[#111827] dark:hover:border-[#5EEAD4]/35"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0D9488]/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-[#0D9488]/[0.09]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[#0D9488] transition-transform duration-500 ease-smooth group-hover:scale-x-100 dark:bg-[#5EEAD4]"
              />

              <div className="relative">
                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E8E8E4] bg-[#F4F4F0] text-[#111827] transition-colors group-hover:border-[#0D9488]/30 group-hover:text-[#0D9488] dark:border-[#374151] dark:bg-[#1F2937] dark:text-[#F9FAFB] dark:group-hover:text-[#5EEAD4]">
                      <Building2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold tracking-tight text-[#111827] sm:text-lg dark:text-[#F9FAFB]">
                        {job.company}
                      </h3>
                      <p className="mt-0.5 text-xs font-mono text-[#0D9488] dark:text-[#5EEAD4]">
                        {job.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8E8E4] bg-[#FBFBF9] px-2.5 py-1 font-mono text-[11px] text-[#4B5563] dark:border-[#1F2937] dark:bg-[#0B0F1A] dark:text-[#9CA3AF]">
                      <MapPin className="h-3 w-3 text-[#0D9488] dark:text-[#5EEAD4]" />
                      {job.type}
                    </span>
                  </div>
                </div>

                {/* Achievements */}
                <ul className="mt-6 space-y-3">
                  {job.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#0D9488] dark:bg-[#5EEAD4]"
                      />
                      <p className="text-sm leading-relaxed text-[#374151] dark:text-[#D1D5DB]">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Stack */}
                <div className="mt-6 border-t border-[#E8E8E4]/60 pt-4 dark:border-[#1F2937]/60">
                  <span className="mb-2.5 flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
                    <Layers className="h-3 w-3" />
                    Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.stack.map((item) => (
                      <span
                        key={item}
                        className="pill transition-colors hover:border-[#0D9488]/40 hover:text-[#0D9488] dark:hover:border-[#5EEAD4]/35 dark:hover:text-[#5EEAD4]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
