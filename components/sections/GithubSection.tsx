"use client";

import React from "react";
import { GITHUB_CTA, PERSONAL_INFO } from "@/data/portfolio-data";
import { Github, ArrowUpRight, Terminal, GitBranch, Star } from "lucide-react";

const HIGHLIGHTS = [
  { label: "Language", value: "Python", Icon: Terminal },
  { label: "Focus", value: "Agents · RAG", Icon: GitBranch },
  { label: "Repos", value: "Open source", Icon: Star },
];

export default function GithubSection() {
  return (
    <section className="py-16 sm:py-24 border-b border-[#E8E8E4]/60 dark:border-[#1F2937]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-[#E8E8E4] bg-white p-6 shadow-2xs sm:p-10 dark:border-[#1F2937] dark:bg-[#111827]">
          {/* Ambient grid + glow */}
          <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-70" />
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#0D9488]/10 blur-3xl dark:bg-[#0D9488]/20"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#0D9488]/30 bg-[#0D9488]/[0.06] text-[#0D9488] dark:border-[#5EEAD4]/25 dark:bg-[#0D9488]/10 dark:text-[#5EEAD4]">
                <Github className="h-5 w-5" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB]">
                {GITHUB_CTA.heading}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
                {GITHUB_CTA.body}
              </p>
              <p className="mt-2 text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                {GITHUB_CTA.subline}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>{PERSONAL_INFO.github.replace("https://github.com/", "@")}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* Highlight strip */}
            <div className="space-y-2.5">
              {HIGHLIGHTS.map(({ label, value, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-[#E8E8E4] bg-[#FBFBF9] px-4 py-3 transition-colors hover:border-[#0D9488]/40 dark:border-[#1F2937] dark:bg-[#0B0F1A]"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#0D9488] dark:text-[#5EEAD4]" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
                    {label}
                  </span>
                  <span className="ml-auto text-sm font-semibold text-[#111827] dark:text-[#F9FAFB]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
