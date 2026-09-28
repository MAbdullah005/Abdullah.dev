"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, RotateCcw, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hello! I'm Abdullah Ali's personal AI Assistant. Ask me anything about my work, projects, or skills.",
    timestamp: "Just now",
  },
];

const QUICK_PROMPTS = [
  "What is Abdullah's experience with Agentic AI & RAG?",
  "Tell me about NexusAI and its architecture",
  "What is his production & MLOps tech stack?",
  "What certifications and education does he hold?",
  "How can I contact or hire Abdullah?",
];

export default function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error(`Server returned status ${response.status}`);

      const data = await response.json();
      const botReply: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          data.reply ||
          "I'm sorry, I couldn't generate a response. Please try again.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "Sorry, I encountered an issue. Please contact Abdullah directly at **abdullahaliofc@gmail.com**.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => setMessages(INITIAL_MESSAGES);

  // Render **bold** and `code` inline
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return (
          <strong key={i} className="font-semibold text-[#111827] dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      if (part.startsWith("`") && part.endsWith("`"))
        return (
          <code
            key={i}
            className="rounded bg-[#E8E8E4]/70 dark:bg-[#1F2937] px-1 py-0.5 font-mono text-[11px] text-[#0D9488] dark:text-[#5EEAD4]"
          >
            {part.slice(1, -1)}
          </code>
        );
      return part;
    });
  };

  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    return (
      <div className="space-y-1.5 text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1.5" />;
          if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
            const bulletText = line.trim().substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4] shrink-0" />
                <span>{renderFormattedText(bulletText)}</span>
              </div>
            );
          }
          return <p key={idx}>{renderFormattedText(line)}</p>;
        })}
      </div>
    );
  };

  return (
    <section
      id="chat"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#FBFBF9] dark:bg-[#0B0F1A]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E4] dark:border-[#1F2937] bg-white dark:bg-[#111827] px-3 py-1 text-[11px] font-mono font-semibold tracking-widest text-[#0D9488] dark:text-[#5EEAD4] uppercase shadow-xs mb-4">
            <Sparkles className="w-3 h-3" />
            AI Assistant
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB]">
            Ask Me Anything
          </h2>
          <p className="mt-3 text-sm text-[#6B7280] dark:text-[#9CA3AF] max-w-md mx-auto">
            Powered by my personal AI assistant. Ask about my projects, skills,
            experience, or how to reach me.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left: Info panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Avatar + identity */}
            <div className="flex items-center gap-4 p-5 rounded-2xl border border-[#E8E8E4] dark:border-[#1F2937] bg-white dark:bg-[#111827] shadow-xs">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-xl bg-[#0D9488]/15 dark:bg-[#0D9488]/25 flex items-center justify-center border border-[#0D9488]/30">
                  <Bot className="w-7 h-7 text-[#0D9488] dark:text-[#5EEAD4]" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#111827]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827] dark:text-[#F9FAFB]">
                  Abdullah Ali&apos;s Assistant
                </p>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                  Online · Ready to answer
                </p>
              </div>
            </div>

            {/* Suggested quick-starts */}
            <div className="p-5 rounded-2xl border border-[#E8E8E4] dark:border-[#1F2937] bg-white dark:bg-[#111827] shadow-xs">
              <p className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-widest mb-3">
                Suggested questions
              </p>
              <div className="flex flex-col gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-left text-xs px-3 py-2.5 rounded-xl border border-[#E8E8E4] dark:border-[#1F2937] bg-[#FBFBF9] dark:bg-[#0B0F1A] text-[#374151] dark:text-[#D1D5DB] hover:border-[#0D9488] hover:text-[#0D9488] dark:hover:border-[#5EEAD4] dark:hover:text-[#5EEAD4] transition-colors leading-snug"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <p className="text-[11px] text-[#9CA3AF] dark:text-[#6B7280] leading-relaxed px-1">
              Responses are based on Abdullah&apos;s verified resume and portfolio.
              For direct contact use the Contact section below.
            </p>
          </div>

          {/* Right: Chat panel */}
          <div className="lg:col-span-3 flex flex-col rounded-2xl border border-[#E8E8E4] dark:border-[#1F2937] bg-white dark:bg-[#111827] shadow-sm overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E4] dark:border-[#1F2937] bg-[#FBFBF9] dark:bg-[#0B0F1A]">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                </div>
                <span className="text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] ml-1">
                  Chat with Abdullah&apos;s Assistant
                </span>
              </div>
              <button
                onClick={resetChat}
                title="Restart conversation"
                className="p-1.5 text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white rounded-lg hover:bg-[#E8E8E4]/50 dark:hover:bg-[#1F2937] transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[380px] max-h-[480px] bg-[#FBFBF9]/40 dark:bg-[#0B0F1A]/40">
              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="h-7 w-7 shrink-0 rounded-full bg-[#0D9488]/15 dark:bg-[#0D9488]/25 text-[#0D9488] dark:text-[#5EEAD4] flex items-center justify-center text-[10px] font-bold mt-0.5">
                        AA
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-xs ${
                        isUser
                          ? "bg-[#0D9488] text-white rounded-br-sm"
                          : "bg-white dark:bg-[#1F2937] text-[#374151] dark:text-[#E5E7EB] border border-[#E8E8E4] dark:border-[#374151]/60 rounded-bl-sm"
                      }`}
                    >
                      {renderMessageContent(m.content)}
                      <div
                        className={`mt-1.5 text-[10px] text-right ${
                          isUser
                            ? "text-teal-100"
                            : "text-[#9CA3AF] dark:text-[#6B7280]"
                        }`}
                      >
                        {m.timestamp}
                      </div>
                    </div>
                    {isUser && (
                      <div className="h-7 w-7 shrink-0 rounded-full bg-[#111827] dark:bg-[#374151] text-white flex items-center justify-center mt-0.5">
                        <User className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loading indicator */}
              {loading && (
                <div className="flex items-center gap-2 text-[#6B7280] dark:text-[#9CA3AF] pl-9">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4] animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4] animate-bounce [animation-delay:0.2s]" />
                    <span className="h-2 w-2 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4] animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-xs font-mono">Thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="p-4 border-t border-[#E8E8E4] dark:border-[#1F2937] bg-white dark:bg-[#111827]">
              <div className="flex items-center gap-2.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Abdullah's skills, projects, experience..."
                  disabled={loading}
                  className="flex-1 bg-[#F4F4F0] dark:bg-[#0B0F1A] border border-[#E8E8E4] dark:border-[#1F2937] focus:border-[#0D9488] dark:focus:border-[#5EEAD4] rounded-xl px-4 py-3 text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none transition-colors"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="h-11 w-11 shrink-0 flex items-center justify-center rounded-xl bg-[#0D9488] text-white hover:bg-[#0F766E] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
