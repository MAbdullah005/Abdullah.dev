"use client";

import React, { useEffect, useRef, useState } from "react";
import { CERTIFICATIONS } from "@/data/portfolio-data";
import type { Certification } from "@/data/portfolio-data";
import { Award, BadgeCheck, FileBadge, ArrowUpRight } from "lucide-react";

const ICONS = [BadgeCheck, Award, FileBadge];

interface CertificationsSectionProps {
  onSelectCertificate: (certificate: Certification) => void;
}

export default function CertificationsSection({
  onSelectCertificate,
}: CertificationsSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="certifications"
      className="py-16 sm:py-20 border-b border-[#E8E8E4]/60 dark:border-[#1F2937]/60 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ease-smooth ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2 className="section-title">Certifications</h2>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-[#0D9488]/30 bg-white px-3 py-1.5 text-[11px] font-mono font-semibold text-[#0D9488] dark:border-[#5EEAD4]/25 dark:bg-[#111827] dark:text-[#5EEAD4] sm:self-auto">
              <Award className="h-3 w-3" />
              {CERTIFICATIONS.length} certificates
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {CERTIFICATIONS.map((cert, idx) => {
              const Icon = ICONS[idx % ICONS.length];
              return (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => onSelectCertificate(cert)}
                  aria-label={`View certificate: ${cert.title}`}
                  className="group relative flex items-start gap-3.5 overflow-hidden rounded-xl border border-[#E8E8E4] bg-white p-5 text-left shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#0D9488]/40 hover:shadow-sm dark:border-[#1F2937] dark:bg-[#111827] dark:hover:border-[#5EEAD4]/35"
                  style={{
                    transitionDelay: `${inView ? idx * 80 : 0}ms`,
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#0D9488]/0 blur-2xl transition-all duration-500 group-hover:bg-[#0D9488]/10 dark:group-hover:bg-[#0D9488]/15"
                  />
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E8E8E4] bg-[#F4F4F0] text-[#111827] transition-colors group-hover:border-[#0D9488]/30 group-hover:text-[#0D9488] dark:border-[#374151] dark:bg-[#1F2937] dark:text-[#F9FAFB] dark:group-hover:text-[#5EEAD4]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-[#111827] transition-colors group-hover:text-[#0D9488] dark:text-[#F9FAFB] dark:group-hover:text-[#5EEAD4]">
                        {cert.title}
                      </p>
                      <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9CA3AF] dark:text-[#6B7280] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0D9488] dark:group-hover:text-[#5EEAD4]" />
                    </div>
                    <p className="mt-1 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                      {cert.issuer}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                      {cert.issued} • {cert.credential}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
