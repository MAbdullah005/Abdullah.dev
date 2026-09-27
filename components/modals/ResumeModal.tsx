"use client";

import React, { useEffect } from "react";
import { X, Download, ExternalLink, FileText, CheckCircle2 } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] bg-white dark:bg-[#111827] border border-[#E8E8E4] dark:border-[#1F2937] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E4] dark:border-[#1F2937] bg-[#FBFBF9] dark:bg-[#0B0F1A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0D9488]/10 text-[#0D9488] dark:text-[#5EEAD4] flex items-center justify-center border border-[#0D9488]/20">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#111827] dark:text-[#F9FAFB] flex items-center gap-2">
                <span>{PERSONAL_INFO.name} — Resume</span>
                <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-[#F4F4F0] dark:bg-[#1F2937] text-[#6B7280] dark:text-[#9CA3AF] font-normal">
                  PDF Preview
                </span>
              </h3>
              <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                {PERSONAL_INFO.role} • {PERSONAL_INFO.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#F9FAFB] hover:bg-[#F4F4F0] dark:hover:bg-[#1F2937] border border-[#E8E8E4] dark:border-[#1F2937] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>

            <a
              href={PERSONAL_INFO.resumeUrl}
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0D9488] hover:bg-[#0F766E] transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#F9FAFB] hover:bg-[#F4F4F0] dark:hover:bg-[#1F2937] transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 w-full bg-[#E5E7EB] dark:bg-[#070A12] relative overflow-hidden">
          <iframe
            src={`${PERSONAL_INFO.resumeUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title="Abdullah Ali Resume PDF"
            className="w-full h-full border-none"
          />
        </div>

        {/* Modal Footer Callout */}
        <div className="px-5 py-2.5 bg-[#FBFBF9] dark:bg-[#0B0F1A] border-t border-[#E8E8E4] dark:border-[#1F2937] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF] shrink-0 gap-2">
          <span>Bachelor in Computer Science • Virtual University of Pakistan</span>
          <span className="text-[#0D9488] dark:text-[#5EEAD4]">
            Agentic AI & MLOps Specialization
          </span>
        </div>
      </div>
    </div>
  );
}
