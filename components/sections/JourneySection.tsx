"use client";

import React, { useEffect, useRef, useState } from "react";
import { JOURNEY } from "@/data/portfolio-data";
import { CheckCircle2, Circle } from "lucide-react";

export default function JourneySection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = rect.height;
      const travelled = Math.max(
        0,
        Math.min(windowH * 0.7 - rect.top, total)
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
        </div>

        <div ref={ref} className="relative">
          {/* Vertical Track */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-2 bottom-2 w-px bg-[#E8E8E4] dark:bg-[#1F2937] sm:left-5"
          >
            <div
              className="w-full bg-[#0D9488] transition-all duration-300 dark:bg-[#5EEAD4]"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-6 sm:space-y-8 pl-10 sm:pl-14">
            {JOURNEY.map((entry, idx) => {
              const nodeActive = inView;

              return (
                <article
                  key={entry.period}
                  className={`group relative rounded-xl border border-[#E8E8E4] bg-white p-5 shadow-2xs transition-all duration-500 hover:border-[#0D9488]/40 hover:shadow-sm sm:p-6 dark:border-[#1F2937] dark:bg-[#111827] dark:hover:border-[#5EEAD4]/35 ${
                    nodeActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                >
                  {/* Node icon positioned over track */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-10 sm:-left-14 top-6 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-[#E8E8E4] bg-white text-[#0D9488] shadow-2xs transition-transform group-hover:scale-110 dark:border-[#1F2937] dark:bg-[#111827] dark:text-[#5EEAD4]"
                  >
                    {idx === JOURNEY.length - 1 ? (
                      <Circle className="h-3 w-3 fill-[#0D9488] text-[#0D9488] dark:fill-[#5EEAD4] dark:text-[#5EEAD4]" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                  </div>

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="font-mono text-xs font-semibold text-[#0D9488] dark:text-[#5EEAD4]">
                      {entry.period}
                    </span>
                    <h3 className="text-base font-bold text-[#111827] dark:text-[#F9FAFB]">
                      {entry.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
                    {entry.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
