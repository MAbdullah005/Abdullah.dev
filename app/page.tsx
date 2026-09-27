"use client";

import React, { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import NeuralBackground from "@/components/canvas/NeuralBackground";
import HeroSection from "@/components/sections/HeroSection";
import ArchitectureSection from "@/components/sections/ArchitectureSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import WhatIBuildSection from "@/components/sections/WhatIBuildSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import JourneySection from "@/components/sections/JourneySection";
import GithubSection from "@/components/sections/GithubSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import ResumeModal from "@/components/modals/ResumeModal";
import CertificateModal from "@/components/modals/CertificateModal";
import FloatingChatbot from "@/components/ui/FloatingChatbot";
import type { Certification } from "@/data/portfolio-data";
import ProjectDetailModal, {
  Project,
} from "@/components/modals/ProjectDetailModal";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCertificate, setActiveCertificate] =
    useState<Certification | null>(null);

  return (
    <div id="page-root" className="relative min-h-screen">
      {/* Ambient background layers */}
      <NeuralBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[70vh] grid-bg opacity-70 dark:opacity-100"
      />

      {/* Content sits above the background */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar onOpenResume={() => setResumeOpen(true)} />

        <main className="flex-1">
          <HeroSection onOpenResume={() => setResumeOpen(true)} />
          <ArchitectureSection />
          <ExperienceSection />
          <ProjectsSection onSelectProject={setActiveProject} />
          <WhatIBuildSection />
          <SkillsSection />
          <JourneySection />
          <CertificationsSection onSelectCertificate={setActiveCertificate} />
          <GithubSection />
          <ContactSection />
        </main>

        <Footer />
      </div>

      <FloatingChatbot />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <CertificateModal
        certificate={activeCertificate}
        onClose={() => setActiveCertificate(null)}
      />
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
