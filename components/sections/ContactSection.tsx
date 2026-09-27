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
              I&apos;m always interested in AI/ML projects, collaborations, and
              opportunities to build useful AI systems.
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
                className="btn-secondary justify-center"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#0D9488] dark:text-[#5EEAD4]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Social and phone links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="pill group transition-colors hover:border-[#0D9488]/40 hover:text-[#0D9488] dark:hover:border-[#5EEAD4]/35 dark:hover:text-[#5EEAD4]"
              >
                <Linkedin className="h-3 w-3 text-[#0D9488] dark:text-[#5EEAD4]" />
                LinkedIn
                <ArrowUpRight className="h-2.5 w-2.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pill group transition-colors hover:border-[#0D9488]/40 hover:text-[#0D9488] dark:hover:border-[#5EEAD4]/35 dark:hover:text-[#5EEAD4]"
              >
                <Github className="h-3 w-3 text-[#4B5563] dark:text-[#9CA3AF]" />
                GitHub
                <ArrowUpRight className="h-2.5 w-2.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              {PERSONAL_INFO.phone && (
                <span className="pill text-[#6B7280] dark:text-[#9CA3AF]">
                  <Phone className="h-3 w-3 text-[#0D9488] dark:text-[#5EEAD4]" />
                  {PERSONAL_INFO.phone}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
