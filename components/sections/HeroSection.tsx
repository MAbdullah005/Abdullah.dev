"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import {
  ArrowDown,
  Github,
  Linkedin,
  FileText,
  ArrowUpRight,
} from "lucide-react";

export default function HeroSection({
  onOpenResume,
}: {
  onOpenResume: () => void;
}) {
  return (
    <section
      id="home"
      className="pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-[#E8E8E4]/60 dark:border-[#1F2937]/60"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-14">
          {/* Left Column: Heading, Bio, CTAs */}
          <div className="flex-1">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#111827] border border-[#E8E8E4] dark:border-[#1F2937] text-[11px] font-mono tracking-wider uppercase text-[#0D9488] dark:text-[#5EEAD4] mb-6 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4] animate-pulse" />
              <span>AI/ML Engineer · LLMs · RAG · Agentic AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB] max-w-3xl leading-[1.15] mb-6">
              Building Intelligent Systems with{" "}
              <span className="text-[#0D9488] dark:text-[#5EEAD4]">
                AI & Machine Learning.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#4B5563] dark:text-[#9CA3AF] max-w-2xl leading-relaxed mb-8">
              {PERSONAL_INFO.shortPositioning.split(". ").map((line, idx, all) => {
                const isLast = idx === all.length - 1;
                return (
                  <span key={idx} className="block sm:inline sm:mr-2">
                    {line}
                    {!isLast && "."}
                  </span>
                );
              })}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#111827] dark:bg-[#F9FAFB] text-white dark:text-[#111827] hover:bg-[#1F2937] dark:hover:bg-[#E5E7EB] text-xs font-semibold tracking-wide transition-all shadow-sm group"
              >
                <span>View Projects</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0D9488] text-white hover:bg-[#0F766E] text-xs font-semibold tracking-wide transition-all shadow-sm group"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View / Download Resume</span>
              </button>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-[#111827] border border-[#E8E8E4] dark:border-[#1F2937] text-[#111827] dark:text-[#F9FAFB] hover:bg-[#F4F4F0] dark:hover:bg-[#1F2937] hover:border-[#0D9488]/40 text-xs font-semibold tracking-wide transition-all group"
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-[#111827] border border-[#E8E8E4] dark:border-[#1F2937] text-[#111827] dark:text-[#F9FAFB] hover:bg-[#F4F4F0] dark:hover:bg-[#1F2937] hover:border-[#0D9488]/40 text-xs font-semibold tracking-wide transition-all group"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0D9488] dark:text-[#5EEAD4]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Image Card */}
          <div className="shrink-0 mx-auto lg:mx-0 flex flex-col items-center">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border border-[#E8E8E4] dark:border-[#1F2937] shadow-sm bg-white dark:bg-[#111827] group">
              <img
                src={PERSONAL_INFO.profileImage}
                alt="Abdullah Ali — AI/ML Engineer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

