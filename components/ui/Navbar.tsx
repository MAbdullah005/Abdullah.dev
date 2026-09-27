"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { Github, Linkedin, FileText, Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Architecture", href: "#architecture" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onOpenResume }: { onOpenResume: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FBFBF9]/85 dark:bg-[#0B0F1A]/85 backdrop-blur-xl border-b border-[#E8E8E4] dark:border-[#1F2937] shadow-xs py-3"
          : "bg-transparent py-4.5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Monogram */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex items-center gap-2.5 transition-transform hover:scale-102"
        >
          <div className="relative w-7 h-7 rounded-md overflow-hidden bg-black border border-[#111827] dark:border-[#374151] group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center shadow-2xs">
            <span className="font-mono text-xs font-bold text-white">AA</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-[#111827] dark:text-[#F9FAFB] hover:text-[#0D9488] transition-colors">
            {PERSONAL_INFO.name}
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF] font-normal pl-2 border-l border-[#E8E8E4] dark:border-[#1F2937]">
            {PERSONAL_INFO.role}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-[#4B5563] dark:text-[#9CA3AF]">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative py-1 transition-colors hover:text-[#111827] dark:hover:text-[#F9FAFB] ${
                  isActive ? "text-[#0D9488] dark:text-[#5EEAD4] font-semibold" : ""
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0D9488] dark:bg-[#5EEAD4] rounded-full" />
                )}
              </a>
            );
          })}

          {/* View Resume Button (Opens Modal) */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[#0D9488] dark:text-[#5EEAD4] hover:bg-[#CCFBF1]/30 dark:hover:bg-[#0D9488]/10 font-mono text-xs font-semibold transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* GitHub Link */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E8E8E4] dark:border-[#1F2937] bg-white dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB] hover:border-[#0D9488]/40 hover:bg-[#F4F4F0] dark:hover:bg-[#1F2937] transition-all text-xs font-medium shadow-2xs"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-[#9CA3AF] dark:text-[#6B7280]" />
          </a>

          {/* Theme Switcher Toggle */}
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="px-2.5 py-1 rounded bg-[#CCFBF1]/40 dark:bg-[#0D9488]/15 text-[#0F766E] dark:text-[#5EEAD4] text-xs font-mono font-semibold"
          >
            Resume
          </button>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-1.5 text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#F9FAFB]"
          >
            <Github className="w-4 h-4" />
          </a>
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#F9FAFB] hover:bg-[#F4F4F0] dark:hover:bg-[#1F2937] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBFBF9]/95 dark:bg-[#0B0F1A]/95 backdrop-blur-2xl border-b border-[#E8E8E4] dark:border-[#1F2937] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-[#0D9488] dark:text-[#5EEAD4] bg-[#CCFBF1]/20 dark:bg-[#0D9488]/10 font-semibold"
                      : "text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#F9FAFB]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] dark:bg-[#5EEAD4]"></span>}
                </a>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#E8E8E4] dark:border-[#1F2937] flex items-center justify-around">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0D9488] dark:text-[#5EEAD4] py-1.5 px-3 rounded-md bg-[#CCFBF1]/30 dark:bg-[#0D9488]/15"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Resume</span>
            </button>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#F9FAFB] py-1.5 px-3"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

