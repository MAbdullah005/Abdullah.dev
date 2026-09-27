"use client";

import React, { useEffect } from "react";
import { X, Download, ExternalLink, BadgeCheck, Clock } from "lucide-react";
import type { Certification } from "@/data/portfolio-data";

interface CertificateModalProps {
  certificate: Certification | null;
  onClose: () => void;
}

export default function CertificateModal({
  certificate,
  onClose,
}: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (certificate) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const isPdf = certificate.media === "pdf";
  const fileName = certificate.file.split("/").pop() ?? "certificate";

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
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E4] dark:border-[#1F2937] bg-[#FBFBF9] dark:bg-[#0B0F1A] shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 shrink-0 rounded-lg bg-[#0D9488]/10 text-[#0D9488] dark:text-[#5EEAD4] flex items-center justify-center border border-[#0D9488]/20">
              <BadgeCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[#111827] dark:text-[#F9FAFB] flex items-center gap-2">
                <span className="truncate">{certificate.title}</span>
                <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-[#F4F4F0] dark:bg-[#1F2937] text-[#6B7280] dark:text-[#9CA3AF] font-normal">
                  {isPdf ? "PDF" : "Image"}
                </span>
              </h3>
              <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] truncate">
                {certificate.issuer}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={certificate.file}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#F9FAFB] hover:bg-[#F4F4F0] dark:hover:bg-[#1F2937] border border-[#E8E8E4] dark:border-[#1F2937] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>

            <a
              href={certificate.file}
              download={fileName}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0D9488] hover:bg-[#0F766E] transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
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

        {/* Certificate Preview */}
        <div className="flex-1 w-full bg-[#E5E7EB] dark:bg-[#070A12] relative overflow-auto">
          {isPdf ? (
            <iframe
              key={certificate.file}
              src={`${certificate.file}#toolbar=1&navpanes=0&scrollbar=1`}
              title={`${certificate.title} certificate`}
              className="w-full h-full border-none"
            />
          ) : (
            <div className="w-full h-full flex items-start sm:items-center justify-center p-3 sm:p-6">
              <img
                key={certificate.file}
                src={certificate.file}
                alt={`${certificate.title} — certificate of completion`}
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg border border-[#E8E8E4] dark:border-[#1F2937] shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Modal Footer Callout */}
        <div className="px-5 py-2.5 bg-[#FBFBF9] dark:bg-[#0B0F1A] border-t border-[#E8E8E4] dark:border-[#1F2937] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF] shrink-0 gap-2">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {certificate.issued}
          </span>
          <span className="text-[#0D9488] dark:text-[#5EEAD4]">
            {certificate.credential}
          </span>
        </div>
      </div>
    </div>
  );
}
