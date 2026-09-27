"use client";

import React, { useEffect } from "react";
import type { Project as ProjectData } from "@/data/portfolio-data";
import AgenticDiagram from "@/components/sections/AgenticDiagram";
import {
  X,
  Github,
  ExternalLink,
  Target,
  Lightbulb,
  Network,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Layers,
} from "lucide-react";

export type Project = ProjectData;

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h4 className="mb-2.5 flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#0D9488] dark:text-[#5EEAD4]">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </h4>
      <div className="text-sm leading-relaxed text-[#374151] dark:text-[#D1D5DB]">
        {children}
      </div>
    </section>
  );
}

function BulletList({
  items,
  icon: Icon,
  tone,
}: {
  items: string[];
  icon: React.ElementType;
  tone: string;
}) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${tone}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-black/60 p-3 backdrop-blur-md animate-fade-in sm:items-center sm:p-6 dark:bg-black/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-0 flex max-h-[94vh] w-full max-w-3xl animate-slide-in-from-bottom flex-col overflow-hidden rounded-2xl border border-[#E8E8E4] bg-white shadow-2xl dark:border-[#1F2937] dark:bg-[#111827] sm:my-6"
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#E8E8E4] bg-[#FBFBF9] px-5 py-4 dark:border-[#1F2937] dark:bg-[#0B0F1A] sm:px-6">
          <div className="min-w-0">
            <h3 className="text-base font-bold tracking-tight text-[#111827] sm:text-lg dark:text-[#F9FAFB]">
              {project.title}
            </h3>
            <p className="mt-0.5 text-[11px] font-mono text-[#0D9488] dark:text-[#5EEAD4]">
              {project.tagline}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-lg border border-[#E8E8E4] px-3 py-1.5 text-xs font-medium text-[#4B5563] transition-colors hover:border-[#0D9488]/40 hover:text-[#111827] sm:inline-flex dark:border-[#1F2937] dark:text-[#9CA3AF] dark:hover:text-[#F9FAFB]"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close case study"
              className="rounded-lg p-1.5 text-[#6B7280] transition-colors hover:bg-[#F4F4F0] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:bg-[#1F2937] dark:hover:text-[#F9FAFB]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          <p className="mb-6 text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
            {project.description}
          </p>

          {project.diagram === "agentic-rag" && (
            <div className="mb-6">
              <AgenticDiagram />
            </div>
          )}

          <Block icon={Target} title="Problem">
            <p>{project.problem}</p>
          </Block>

          <Block icon={Lightbulb} title="Solution">
            <p>{project.solution}</p>
          </Block>

          <Block icon={Network} title="Architecture">
            <p>{project.architecture}</p>
          </Block>

          <Block icon={CheckCircle2} title="Key Features">
            <BulletList
              items={project.keyFeatures}
              icon={CheckCircle2}
              tone="text-[#0D9488] dark:text-[#5EEAD4]"
            />
          </Block>

          <Block icon={AlertTriangle} title="Engineering Challenges">
            <BulletList
              items={project.engineeringChallenges}
              icon={AlertTriangle}
              tone="text-amber-500"
            />
          </Block>

          <Block icon={TrendingUp} title="Results / Impact">
            <BulletList
              items={project.results}
              icon={TrendingUp}
              tone="text-sky-500"
            />
          </Block>

          <Block icon={Layers} title="Tech Stack">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span key={tech} className="pill">
                  {tech}
                </span>
              ))}
            </div>
          </Block>
        </div>

        {/* Footer actions */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#E8E8E4] bg-[#FBFBF9] px-5 py-3.5 sm:px-6 dark:border-[#1F2937] dark:bg-[#0B0F1A]">
          <span className="text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
            {project.tech.length} technologies · {project.keyFeatures.length} features
          </span>
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                <Github className="h-3.5 w-3.5" />
                View source
              </a>
            )}
            <button
              onClick={onClose}
              className="btn-ghost"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
