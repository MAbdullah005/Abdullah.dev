"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import {
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  Phone,
  ArrowUpRight,
} from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 border-b border-[#E8E8E4]/60 dark:border-[#1F2937]/60 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-[#0D9488]/25 bg-white p-6 sm:p-12 dark:border-[#0D9488]/25 dark:bg-[#111827]">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid-bg opacity-80 dark:opacity-100"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-64 w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0D9488]/10 blur-3xl dark:bg-[#0D9488]/20"
          />

          <div className="relative text-center">
            <span className="section-label">Contact</span>
            <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl font-bold tracking-tight text-balance text-[#111827] dark:text-[#F9FAFB]">
              Let&apos;s Build Something{" "}
              <span className="text-[#0D9488] dark:text-[#5EEAD4]">Intelligent.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
              I&apos;m always interested in AI/ML projects, internships,
              collaborations, and opportunities to build useful AI systems.
            </p>

            {/* Email with copy-to-clipboard */}
            <div className="mx-auto mt-7 flex max-w-md flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="btn-accent flex-1 justify-center"
              >
                <Mail className="h-3.5 w-3.5" />
                Email Me
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="btn-ghost justify-center"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-[#0D9488] dark:text-[#5EEAD4]" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span className="font-mono">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <p className="mt-3 font-mono text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              {PERSONAL_INFO.email}
            </p>

            {/* Secondary links */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost group"
              >
                <Linkedin className="h-3.5 w-3.5 text-[#0D9488] dark:text-[#5EEAD4]" />
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5 text-[#9CA3AF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost group"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5 text-[#9CA3AF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Meta line */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#E8E8E4]/60 pt-5 text-[11px] font-mono text-[#6B7280] dark:border-[#1F2937]/60 dark:text-[#9CA3AF]">
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3 w-3 text-[#0D9488] dark:text-[#5EEAD4]" />
                {PERSONAL_INFO.phone}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex w-full h-full animate-ping rounded-full bg-[#0D9488] opacity-60 dark:bg-[#5EEAD4]" />
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4]" />
                </span>
                Open to AI/ML roles &amp; collaborations
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
