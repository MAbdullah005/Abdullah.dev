"use client";

import React, { useEffect, useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { Github, Linkedin, ArrowUp, Mail } from "lucide-react";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 600);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#FBFBF9] dark:bg-[#0B0F1A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[#111827] bg-black dark:border-[#374151]">
                <span className="font-mono text-xs font-bold text-white">AA</span>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight text-[#111827] dark:text-[#F9FAFB]">
                  {PERSONAL_INFO.name}
                </p>
                <p className="text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                  {PERSONAL_INFO.role}
                </p>
              </div>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
              Building intelligent systems with LLMs, RAG, Agentic AI, and modern ML
              infrastructure.
            </p>
          </div>

          {/* Links & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8E8E4] text-[#4B5563] transition-all hover:border-[#0D9488]/40 hover:text-[#0D9488] dark:border-[#1F2937] dark:text-[#9CA3AF] dark:hover:border-[#5EEAD4]/35 dark:hover:text-[#5EEAD4]"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8E8E4] text-[#4B5563] transition-all hover:border-[#0D9488]/40 hover:text-[#0D9488] dark:border-[#1F2937] dark:text-[#9CA3AF] dark:hover:border-[#5EEAD4]/35 dark:hover:text-[#5EEAD4]"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8E8E4] text-[#4B5563] transition-all hover:border-[#0D9488]/40 hover:text-[#0D9488] dark:border-[#1F2937] dark:text-[#9CA3AF] dark:hover:border-[#5EEAD4]/35 dark:hover:text-[#5EEAD4]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className={`flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8E8E4] text-[#4B5563] transition-all hover:border-[#0D9488]/40 hover:text-[#0D9488] dark:border-[#1F2937] dark:text-[#9CA3AF] dark:hover:border-[#5EEAD4]/35 dark:hover:text-[#5EEAD4] ${
                showTop
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
