"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Brain,
  Search,
  Wrench,
  Bot,
  Sparkles,
  Database,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

const SOURCES = [
  {
    id: "retriever",
    label: "Retriever",
    sub: "FAISS + BM25",
    detail: "Hybrid dense + sparse search",
    Icon: Search,
  },
  {
    id: "tools",
    label: "Tools",
    sub: "Web · YouTube · Docs",
    detail: "Tool calling with web-search fallback",
    Icon: Wrench,
  },
];

const STAGES = [
  { id: "user", label: "User", sub: "Question", Icon: User },
  { id: "agent", label: "Agent", sub: "Intent router", Icon: Brain, primary: true },
  { id: "llm", label: "LLM", sub: "Gemini · OpenAI · Ollama", Icon: Bot, primary: true },
  { id: "response", label: "Response", sub: "Grounded answer", Icon: Sparkles },
];

function NodeCard({
  label,
  sub,
  detail,
  Icon,
  primary,
  delay,
  mounted,
}: {
  label: string;
  sub: string;
  detail?: string;
  Icon: React.ElementType;
  primary?: boolean;
  delay: number;
  mounted: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-3 transition-all duration-500 ease-smooth ${
        primary
          ? "border-[#0D9488]/40 bg-[#0D9488]/[0.05] dark:border-[#5EEAD4]/30 dark:bg-[#0D9488]/[0.08]"
          : "border-[#E8E8E4] bg-white dark:border-[#1F2937] dark:bg-[#111827]"
      } ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`w-7 h-7 shrink-0 rounded-md flex items-center justify-center border ${
            primary
              ? "border-[#0D9488]/30 text-[#0D9488] dark:text-[#5EEAD4]"
              : "border-[#E8E8E4] text-[#4B5563] dark:border-[#374151] dark:text-[#9CA3AF]"
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#111827] dark:text-[#F9FAFB] truncate">
            {label}
          </p>
          <p className="text-[10px] font-mono text-[#6B7280] dark:text-[#9CA3AF] truncate">
            {sub}
          </p>
        </div>
      </div>
      {detail && (
        <p className="mt-2 text-[10px] leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
          {detail}
        </p>
      )}
    </div>
  );
}

function Connector({ vertical = false }: { vertical?: boolean }) {
  const Icon = vertical ? ArrowDown : ArrowRight;
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center ${
        vertical ? "py-0.5" : "px-0.5"
      }`}
    >
      <Icon className="w-3.5 h-3.5 text-[#0D9488] dark:text-[#5EEAD4] animate-bounce-soft" />
    </div>
  );
}

export default function AgenticDiagram() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="rounded-xl border border-[#E8E8E4] bg-[#FBFBF9] p-4 sm:p-5 dark:border-[#1F2937] dark:bg-[#0B0F1A]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
          Agentic RAG flow
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#0D9488] dark:text-[#5EEAD4]">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex w-full h-full animate-ping rounded-full bg-[#0D9488] opacity-60 dark:bg-[#5EEAD4]" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4]" />
          </span>
          live graph
        </span>
      </div>

      {/* Mobile: vertical flow */}
      <div className="sm:hidden space-y-2">
        <NodeCard {...STAGES[0]} mounted={mounted} delay={0} />
        <Connector vertical />
        <NodeCard {...STAGES[1]} mounted={mounted} delay={60} />
        <div className="grid grid-cols-2 gap-2">
          {SOURCES.map((source, idx) => (
            <NodeCard
              key={source.id}
              {...source}
              mounted={mounted}
              delay={120 + idx * 60}
            />
          ))}
        </div>
        <Connector vertical />
        <NodeCard {...STAGES[2]} mounted={mounted} delay={240} />
        <Connector vertical />
        <NodeCard {...STAGES[3]} mounted={mounted} delay={300} />
      </div>

      {/* Desktop: horizontal flow with a branched source column */}
      <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr_auto_1.15fr_auto_1fr_auto_1fr] sm:items-stretch sm:gap-1">
        <NodeCard {...STAGES[0]} mounted={mounted} delay={0} />
        <Connector />
        <NodeCard {...STAGES[1]} mounted={mounted} delay={60} />
        <Connector />
        <div className="grid gap-2">
          {SOURCES.map((source, idx) => (
            <NodeCard
              key={source.id}
              {...source}
              mounted={mounted}
              delay={120 + idx * 60}
            />
          ))}
        </div>
        <Connector />
        <NodeCard {...STAGES[2]} mounted={mounted} delay={240} />
        <Connector />
        <NodeCard {...STAGES[3]} mounted={mounted} delay={300} />
      </div>

      {/* Persistence layer */}
      <div
        className={`mt-4 flex items-center gap-2.5 rounded-lg border border-dashed border-[#0D9488]/30 px-3 py-2.5 transition-opacity duration-500 dark:border-[#5EEAD4]/25 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0D9488]/10 text-[#0D9488] dark:text-[#5EEAD4]">
          <Database className="w-3.5 h-3.5" />
        </div>
        <p className="text-[11px] font-mono text-[#4B5563] dark:text-[#9CA3AF]">
          Checkpoints · SQLite — every routing and tool step is persisted, so a thread
          resumes with its full history
        </p>
      </div>
    </div>
  );
}
