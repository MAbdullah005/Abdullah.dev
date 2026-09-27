"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
} from "lucide-react";

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

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

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

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

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
      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (err: any) {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "Sorry, I encountered an issue connecting to the AI service. Please contact Abdullah directly at **abdullahaliofc@gmail.com**.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
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

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  // Helper to render markdown bolding and bullet points cleanly
  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1.5" />;

          // Bullet points
          if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
            const bulletText = line.trim().substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4] shrink-0" />
                <span>{renderFormattedText(bulletText)}</span>
              </div>
            );
          }

          return <p key={idx}>{renderFormattedText(line)}</p>;
        })}
      </div>
    );
  };

  // Parse **bold** and `code` text
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-[#111827] dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="rounded bg-[#E8E8E4]/70 dark:bg-[#1F2937] px-1 py-0.5 font-mono text-[11px] text-[#0D9488] dark:text-[#5EEAD4]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Assistant Chat"
            className="relative group flex items-center gap-2.5 rounded-full bg-[#111827] dark:bg-[#111827] text-white px-4 py-3 sm:px-5 sm:py-3.5 shadow-xl hover:shadow-2xl border border-[#374151] dark:border-[#1F2937] hover:border-[#0D9488] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-[#5EEAD4] animate-pulse" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#111827]" />
              )}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold tracking-tight text-white">
                Hey There 👋, I&apos;m Abdullah Ali&apos;s Assistant. Have A Chat!
              </p>
            </div>
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Portfolio Assistant Chat"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-[#111827] border border-[#E8E8E4] dark:border-[#1F2937] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E8E8E4] dark:border-[#1F2937] bg-[#FBFBF9] dark:bg-[#0B0F1A]">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D9488]/15 dark:bg-[#0D9488]/25 text-[#0D9488] dark:text-[#5EEAD4] border border-[#0D9488]/30">
                <Bot className="h-4.5 w-4.5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0B0F1A]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#111827] dark:text-[#F9FAFB]">
                  Abdullah Ali&apos;s Assistant
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart conversation"
                className="p-1.5 text-[#6B7280] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:text-white rounded-md hover:bg-[#E8E8E4]/50 dark:hover:bg-[#1F2937] transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-[#6B7280] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:text-white rounded-md hover:bg-[#E8E8E4]/50 dark:hover:bg-[#1F2937] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FBFBF9]/40 dark:bg-[#0B0F1A]/40">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="h-6 w-6 shrink-0 rounded-full bg-[#0D9488]/15 dark:bg-[#0D9488]/25 text-[#0D9488] dark:text-[#5EEAD4] flex items-center justify-center text-[10px] font-bold mt-0.5">
                      AA
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3 shadow-2xs ${
                      isUser
                        ? "bg-[#0D9488] text-white rounded-br-xs"
                        : "bg-white dark:bg-[#1F2937] text-[#374151] dark:text-[#E5E7EB] border border-[#E8E8E4] dark:border-[#374151]/60 rounded-bl-xs"
                    }`}
                  >
                    {renderMessageContent(m.content)}
                    <div
                      className={`mt-1 text-[10px] text-right ${
                        isUser
                          ? "text-teal-100"
                          : "text-[#9CA3AF] dark:text-[#6B7280]"
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="h-6 w-6 shrink-0 rounded-full bg-[#111827] text-white dark:bg-white dark:text-[#111827] flex items-center justify-center text-[10px] font-bold mt-0.5">
                      <User className="h-3 w-3" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick Prompts (only when messages length is small) */}
            {messages.length <= 2 && !loading && (
              <div className="pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left text-[11px] px-2.5 py-1.5 rounded-lg border border-[#E8E8E4] dark:border-[#1F2937] bg-white dark:bg-[#111827] text-[#111827] dark:text-[#E5E7EB] hover:border-[#0D9488] hover:text-[#0D9488] dark:hover:border-[#5EEAD4] dark:hover:text-[#5EEAD4] transition-colors shadow-2xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center gap-2 text-[#6B7280] dark:text-[#9CA3AF] pl-8">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4] animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4] animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4] animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-[11px] font-mono">
                  Thinking...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 border-t border-[#E8E8E4] dark:border-[#1F2937] bg-white dark:bg-[#111827]">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Abdullah's skills, projects, resume..."
                disabled={loading}
                className="flex-1 bg-[#F4F4F0] dark:bg-[#0B0F1A] border border-[#E8E8E4] dark:border-[#1F2937] focus:border-[#0D9488] dark:focus:border-[#5EEAD4] rounded-xl px-3.5 py-2.5 text-xs text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-[#0D9488] text-white hover:bg-[#0F766E] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
