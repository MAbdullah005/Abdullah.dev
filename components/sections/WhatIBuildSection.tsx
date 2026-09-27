"use client";

import React from "react";
import { WHAT_I_BUILD } from "@/data/portfolio-data";
import { Bot, Network, Cpu, Server } from "lucide-react";

export default function WhatIBuildSection() {
  const icons = [Bot, Network, Cpu, Server];

  return (
    <section className="py-16 sm:py-24 border-b border-[#E8E8E4]/60 dark:border-[#1F2937]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-[#0D9488] dark:text-[#5EEAD4] tracking-wider uppercase font-semibold block mb-3">
            Focus Areas
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB] mb-3">
            What I Build
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
            Bridging foundational machine learning theory with scalable LLM orchestration, containerized microservices, and autonomous tool-using agents.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WHAT_I_BUILD.map((item, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={item.num}
                className="group relative rounded-xl bg-white dark:bg-[#111827] border border-[#E8E8E4] dark:border-[#1F2937] hover:border-[#0D9488]/40 dark:hover:border-[#5EEAD4]/40 p-6 sm:p-7 transition-all duration-200 shadow-2xs hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-bold text-[#9CA3AF] dark:text-[#4B5563] group-hover:text-[#0D9488] dark:group-hover:text-[#5EEAD4] transition-colors">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#F4F4F0] dark:bg-[#1F2937] border border-[#E8E8E4] dark:border-[#374151] flex items-center justify-center text-[#111827] dark:text-[#F9FAFB] group-hover:text-[#0D9488] dark:group-hover:text-[#5EEAD4] group-hover:border-[#0D9488]/30 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-[#111827] dark:text-[#F9FAFB] mb-1 group-hover:text-[#0D9488] dark:group-hover:text-[#5EEAD4] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-[#0D9488] dark:text-[#5EEAD4] mb-3">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-[#4B5563] dark:text-[#9CA3AF] text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Focus Areas Pill Tags */}
                <div className="pt-4 border-t border-[#E8E8E4]/60 dark:border-[#1F2937]/60">
                  <div className="flex flex-wrap gap-1.5">
                    {item.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#FBFBF9] dark:bg-[#0B0F1A] border border-[#E8E8E4] dark:border-[#1F2937] text-[#4B5563] dark:text-[#9CA3AF]"
                      >
                        {area}
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

