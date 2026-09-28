"use client";

import React, { useEffect } from "react";
import { X, MapPin } from "lucide-react";
import { JOURNEY } from "@/data/portfolio-data";

interface JourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Soft accent colors cycling for each stage
const STAGE_COLORS = [
  { bg: "bg-[#CCFBF1]/60 dark:bg-[#0D9488]/10", border: "border-[#99F6E4] dark:border-[#0D9488]/40", badge: "bg-[#0D9488]/10 dark:bg-[#0D9488]/20 text-[#0F766E] dark:text-[#5EEAD4]", dot: "bg-[#0D9488]" },
  { bg: "bg-[#EDE9FE]/60 dark:bg-[#7C3AED]/10", border: "border-[#DDD6FE] dark:border-[#7C3AED]/30", badge: "bg-[#7C3AED]/10 dark:bg-[#7C3AED]/20 text-[#6D28D9] dark:text-[#A78BFA]", dot: "bg-[#7C3AED]" },
  { bg: "bg-[#FEF3C7]/60 dark:bg-[#D97706]/10", border: "border-[#FDE68A] dark:border-[#D97706]/30", badge: "bg-[#D97706]/10 dark:bg-[#D97706]/20 text-[#B45309] dark:text-[#FCD34D]", dot: "bg-[#D97706]" },
  { bg: "bg-[#FCE7F3]/60 dark:bg-[#DB2777]/10", border: "border-[#FBCFE8] dark:border-[#DB2777]/30", badge: "bg-[#DB2777]/10 dark:bg-[#DB2777]/20 text-[#9D174D] dark:text-[#F9A8D4]", dot: "bg-[#DB2777]" },
  { bg: "bg-[#DBEAFE]/60 dark:bg-[#2563EB]/10", border: "border-[#BFDBFE] dark:border-[#2563EB]/30", badge: "bg-[#2563EB]/10 dark:bg-[#2563EB]/20 text-[#1D4ED8] dark:text-[#93C5FD]", dot: "bg-[#2563EB]" },
  { bg: "bg-[#DCFCE7]/60 dark:bg-[#16A34A]/10", border: "border-[#BBF7D0] dark:border-[#16A34A]/30", badge: "bg-[#16A34A]/10 dark:bg-[#16A34A]/20 text-[#15803D] dark:text-[#86EFAC]", dot: "bg-[#16A34A]" },
];

export default function JourneyModal({ isOpen, onClose }: JourneyModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-10 sm:py-16"
      aria-modal="true"
      role="dialog"
      aria-label="Learning Journey"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-3xl rounded-2xl border border-[#E8E8E4] dark:border-[#1F2937] bg-[#FBFBF9] dark:bg-[#0B0F1A] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E8E4] dark:border-[#1F2937]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D9488]/10 dark:bg-[#0D9488]/20 border border-[#0D9488]/20">
              <MapPin className="h-4 w-4 text-[#0D9488] dark:text-[#5EEAD4]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#111827] dark:text-[#F9FAFB]">
                My Learning Journey
              </h2>
              <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                From fundamentals to production AI — one stage at a time
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#6B7280] hover:text-[#111827] dark:hover:text-white hover:bg-[#E8E8E4]/60 dark:hover:bg-[#1F2937] transition-colors"
            aria-label="Close journey"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Timeline body */}
        <div className="px-6 py-8">
          {/* Center spine (desktop) */}
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-[#E8E8E4] dark:bg-[#1F2937] -translate-x-1/2" />

            <div className="flex flex-col gap-10">
              {JOURNEY.map((entry, idx) => {
                const color = STAGE_COLORS[idx % STAGE_COLORS.length];
                const isLeft = idx % 2 === 0; // even → left side

                return (
                  <div key={entry.period} className="relative flex items-start gap-0">
                    {/* ── Desktop: alternating left/right ── */}
                    <div className="hidden sm:flex w-full items-start gap-6">
                      {/* LEFT card */}
                      <div className={`flex-1 ${isLeft ? "flex justify-end pr-8" : "pr-8 invisible"}`}>
                        {isLeft && (
                          <div
                            className={`w-full max-w-[260px] rounded-2xl border p-5 shadow-xs ${color.bg} ${color.border}`}
                          >
                            <span className={`inline-block text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${color.badge}`}>
                              {entry.period}
                            </span>
                            <h3 className="text-sm font-bold text-[#111827] dark:text-[#F9FAFB] leading-snug">
                              {entry.title}
                            </h3>
                            <p className="mt-2 text-xs text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
                              {entry.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {entry.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-white/70 dark:bg-[#111827]/70 border border-[#E8E8E4] dark:border-[#1F2937] text-[#374151] dark:text-[#D1D5DB] font-mono"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="relative flex-none flex flex-col items-center" style={{ width: "0px" }}>
                        <div className={`absolute top-4 -translate-x-1/2 h-3.5 w-3.5 rounded-full ring-4 ring-[#FBFBF9] dark:ring-[#0B0F1A] shadow ${color.dot}`} />
                      </div>

                      {/* RIGHT card */}
                      <div className={`flex-1 ${!isLeft ? "flex justify-start pl-8" : "pl-8 invisible"}`}>
                        {!isLeft && (
                          <div
                            className={`w-full max-w-[260px] rounded-2xl border p-5 shadow-xs ${color.bg} ${color.border}`}
                          >
                            <span className={`inline-block text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${color.badge}`}>
                              {entry.period}
                            </span>
                            <h3 className="text-sm font-bold text-[#111827] dark:text-[#F9FAFB] leading-snug">
                              {entry.title}
                            </h3>
                            <p className="mt-2 text-xs text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
                              {entry.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {entry.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-white/70 dark:bg-[#111827]/70 border border-[#E8E8E4] dark:border-[#1F2937] text-[#374151] dark:text-[#D1D5DB] font-mono"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ── Mobile: single column ── */}
                    <div className={`sm:hidden flex gap-4 w-full`}>
                      <div className="flex flex-col items-center">
                        <div className={`mt-4 h-3 w-3 rounded-full shrink-0 ${color.dot}`} />
                        {idx < JOURNEY.length - 1 && (
                          <div className="flex-1 w-px bg-[#E8E8E4] dark:bg-[#1F2937] mt-2" />
                        )}
                      </div>
                      <div
                        className={`flex-1 mb-2 rounded-2xl border p-4 shadow-xs ${color.bg} ${color.border}`}
                      >
                        <span className={`inline-block text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 ${color.badge}`}>
                          {entry.period}
                        </span>
                        <h3 className="text-sm font-bold text-[#111827] dark:text-[#F9FAFB]">
                          {entry.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
                          {entry.description}
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/70 dark:bg-[#111827]/70 border border-[#E8E8E4] dark:border-[#1F2937] text-[#374151] dark:text-[#D1D5DB] font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
