"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/portfolio-data";
import type { Project } from "@/data/portfolio-data";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  Star,
  GitBranch,
  Layers,
  Film,
  Stethoscope,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const ICONS: Record<string, React.ElementType> = {
  nexusai: Sparkles,
  "ai-medical-assistant": Stethoscope,
  "network-security-detection": ShieldCheck,
  "movie-recommender": Film,
};

function useInView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null);
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
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/* Featured project — full width, with pipeline visualisation          */
/* ------------------------------------------------------------------ */

function FeaturedCard({
  project,
  onSelect,
  mounted,
}: {
  project: Project;
  onSelect: (p: Project) => void;
  mounted: boolean;
}) {
  return (
    <article
      onClick={() => onSelect(project)}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-[#E8E8E4] bg-white shadow-2xs transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-[#0D9488]/40 hover:shadow-sm dark:border-[#1F2937] dark:bg-[#111827] dark:hover:border-[#5EEAD4]/35 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {/* Accent wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0D9488]/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-[#0D9488]/[0.1]"
      />

      <div className="relative grid gap-0 lg:grid-cols-[1.15fr_1fr]">
        {/* Visual / pipeline panel */}
        <div className="relative overflow-hidden border-b border-[#E8E8E4] bg-[#FBFBF9] p-6 sm:p-8 lg:border-b-0 lg:border-r dark:border-[#1F2937] dark:bg-[#0B0F1A]">
          <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />

          <div className="relative">
            <div className="mb-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0D9488]/30 bg-white px-2.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#0D9488] dark:border-[#5EEAD4]/25 dark:bg-[#111827] dark:text-[#5EEAD4]">
                <Star className="h-3 w-3" />
                Featured
              </span>
              <span className="pill">{project.metricLabel}</span>
            </div>

            {/* User → Agent → Retriever → Tools → LLM → Response */}
            <div className="space-y-2 font-mono text-[11px]">
              {[
                { label: "User", sub: "question" },
                { label: "Agent", sub: "intent routing" },
                { label: "Retriever", sub: "FAISS + BM25" },
                { label: "Tools", sub: "web · youtube · docs" },
                { label: "LLM", sub: "gemini · openai · ollama" },
                { label: "Response", sub: "grounded" },
              ].map((step, idx, all) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className="flex-1 flex items-center justify-between gap-3 rounded-lg border border-[#E8E8E4] bg-white px-3 py-2 transition-all duration-300 group-hover:border-[#0D9488]/30 dark:border-[#1F2937] dark:bg-[#111827]">
                    <span className="text-[#111827] dark:text-[#F9FAFB]">
                      {step.label}
                    </span>
                    <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                      {step.sub}
                    </span>
                  </div>
                  {idx < all.length - 1 && (
                    <div className="w-px h-3 bg-[#0D9488]/40 dark:bg-[#5EEAD4]/40" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content panel */}
        <div className="relative p-6 sm:p-8 flex flex-col">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111827] transition-colors group-hover:text-[#0D9488] dark:text-[#F9FAFB] dark:group-hover:text-[#5EEAD4]">
            {project.title}
          </h3>
          <p className="mt-1 text-xs font-mono text-[#0D9488] dark:text-[#5EEAD4]">
            {project.tagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 8).map((tech) => (
              <span
                key={tech}
                className="pill transition-colors group-hover:border-[#0D9488]/30"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 8 && (
              <span className="pill">+{project.tech.length - 8}</span>
            )}
          </div>

          <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg bg-[#111827] px-4 py-2.5 text-xs font-semibold text-white transition-all group-hover:bg-[#0D9488] dark:bg-[#F9FAFB] dark:text-[#111827] dark:group-hover:bg-[#0D9488] dark:group-hover:text-white">
              View Case Study
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-ghost"
              >
                <Github className="h-3.5 w-3.5" />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Standard project card                                               */
/* ------------------------------------------------------------------ */

function ProjectCard({
  project,
  onSelect,
  mounted,
  delay,
}: {
  project: Project;
  onSelect: (p: Project) => void;
  mounted: boolean;
  delay: number;
}) {
  const Icon = ICONS[project.slug] ?? Layers;

  return (
    <article
      onClick={() => onSelect(project)}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#E8E8E4] bg-white p-5 sm:p-6 shadow-2xs transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-[#0D9488]/40 hover:shadow-sm dark:border-[#1F2937] dark:bg-[#111827] dark:hover:border-[#5EEAD4]/35 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Top rule accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[#0D9488] transition-transform duration-500 ease-smooth group-hover:scale-x-100 dark:bg-[#5EEAD4]"
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E8E8E4] bg-[#F4F4F0] text-[#111827] transition-all duration-300 group-hover:scale-105 group-hover:border-[#0D9488]/30 group-hover:text-[#0D9488] dark:border-[#374151] dark:bg-[#1F2937] dark:text-[#F9FAFB] dark:group-hover:text-[#5EEAD4]"
        >
          <Icon className="h-4.5 w-4.5" />
        </div>
        {project.metric && (
          <div className="text-right">
            <p className="text-sm font-bold text-[#0D9488] dark:text-[#5EEAD4]">
              {project.metric}
            </p>
            <p className="text-[10px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
              {project.metricLabel}
            </p>
          </div>
        )}
      </div>

      <h3 className="mt-4 text-base font-bold tracking-tight text-[#111827] transition-colors group-hover:text-[#0D9488] dark:text-[#F9FAFB] dark:group-hover:text-[#5EEAD4]">
        {project.title}
      </h3>
      <p className="mt-0.5 text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
        {project.tagline}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="pill transition-colors group-hover:border-[#0D9488]/30"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="pill">+{project.tech.length - 5}</span>
        )}
      </div>

      {/* Actions reveal on hover, always visible on touch */}
      <div className="mt-5 flex items-center gap-3 border-t border-[#E8E8E4]/60 pt-4 dark:border-[#1F2937]/60">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111827] transition-colors group-hover:text-[#0D9488] dark:text-[#F9FAFB] dark:group-hover:text-[#5EEAD4]">
          View Case Study
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${project.title} source code`}
            className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-[#E8E8E4] px-2.5 py-1.5 text-[11px] font-mono text-[#4B5563] transition-all hover:border-[#0D9488]/40 hover:text-[#0D9488] dark:border-[#1F2937] dark:text-[#9CA3AF] dark:hover:border-[#5EEAD4]/35 dark:hover:text-[#5EEAD4]"
          >
            <Github className="h-3.5 w-3.5" />
            Code
          </a>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */

export default function ProjectsSection({
  onSelectProject,
}: {
  onSelectProject: (project: Project) => void;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const featured = PROJECTS.find((p) => p.featured) ?? PROJECTS[0];
  const rest = PROJECTS.filter((p) => p.slug !== featured.slug);

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 border-b border-[#E8E8E4]/60 dark:border-[#1F2937]/60 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="section-label">Selected Work</span>
            <h2 className="section-title">Systems, not notebooks</h2>
            <p className="section-body">
              Each project below is a working system with retrieval, services, and
              deployment behind it. Open any card for the problem, architecture,
              engineering decisions, and outcome.
            </p>
          </div>
          <a
            href="https://github.com/MAbdullah005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 self-start text-xs font-mono font-semibold text-[#0D9488] transition-colors hover:text-[#0F766E] dark:text-[#5EEAD4] dark:hover:text-[#CCFBF1] sm:self-auto"
          >
            <GitBranch className="h-3.5 w-3.5" />
            All repositories
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div ref={ref} className="space-y-5">
          <FeaturedCard
            project={featured}
            onSelect={onSelectProject}
            mounted={inView}
          />

          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((project, idx) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onSelect={onSelectProject}
                mounted={inView}
                delay={120 + idx * 90}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
