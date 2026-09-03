"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import HomeView from "@/components/views/HomeView";
import AboutView from "@/components/views/AboutView";
import TechView from "@/components/views/TechView";
import ProjectsView from "@/components/views/ProjectsView";
import ExperienceView from "@/components/views/ExperienceView";
import ContactView from "@/components/views/ContactView";
import PortfolioLoader from "@/components/ui/PortfolioLoader";
import { hyperspeedPresets } from "@/components/HyperSpeedPresets";
import { SAME_AS, EMAIL } from "@/data/socials";
import { SITE_URL } from "@/lib/siteUrl";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

// Persistent WebGL effects loaded client-side only
const Hyperspeed = dynamic(() => import("@/components/Hyperspeed"), { ssr: false });
const SplashCursor = dynamic(() => import("@/components/ui/SplashCursor"), { ssr: false });

const VALID_SECTIONS = ["home", "about", "tech", "projects", "experience", "contact"];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dheesh Medekar",
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  jobTitle: "AI / LLM Engineer",
  description:
    "I build intelligent systems, real-time applications and full-stack products — from LLM orchestration and RAG pipelines to production APIs and polished interfaces.",
  sameAs: SAME_AS,
  knowsAbout: [
    "AI Engineering",
    "LLM Orchestration",
    "RAG Pipelines",
    "Backend APIs",
    "Full-Stack Development",
  ],
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isPageReady, setIsPageReady] = useState(false);
  const { isLightMode } = useTheme();

  // URL Hash Sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && VALID_SECTIONS.includes(hash)) {
        setActiveSection(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectSection = useCallback((sectionKey: string) => {
    setActiveSection(sectionKey);

    // Update URL hash without full reload
    if (window.location.hash !== `#${sectionKey}`) {
      window.history.pushState(null, "", `#${sectionKey}`);
    }

    // Smooth scroll to top of new section
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={cn(
      "relative min-h-screen selection:bg-red-500/20 overflow-x-hidden flex flex-col justify-between transition-colors duration-300",
      isLightMode ? "bg-[#FFFFFF] text-[#111111]" : "bg-[#05060B] text-[#F4F6FA]"
    )}>
      {/* ── Entry Intro Loader ── */}
      <PortfolioLoader onStartExit={() => setIsPageReady(true)} />

      {/* ── Structured SEO JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* ── Persistent Hyperspeed Background (Mounted ONCE at root level) ── */}
      <div className={cn(
        "fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-colors duration-300",
        isLightMode ? "bg-[#FFFFFF]" : "bg-[#05060B]"
      )}>
        <Hyperspeed 
          effectOptions={isLightMode ? hyperspeedPresets.light : hyperspeedPresets.three} 
          lightMode={isLightMode} 
        />
      </div>

      {/* ── Persistent Crimson SplashCursor WebGL fluid simulation (z-[1]) ── */}
      <SplashCursor
        COLOR={isLightMode ? "#E50909" : "#7F1D1D"}
        RAINBOW_MODE={false}
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={720}
        PRESSURE_ITERATIONS={12}
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        CURL={2.5}
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={4500}
        SHADING={true}
        TRANSPARENT={true}
      />

      {/* ── Main Application UI ── */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
        {/* Floating Top Navbar */}
        <Navbar
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />

        {/* Dynamic Section View (Smooth Framer Motion crossfade) */}
        <main className="w-full flex-1 flex flex-col">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full flex-1 flex flex-col"
          >
            {activeSection === "home" && <HomeView onNavigate={handleSelectSection} />}
            {activeSection === "about" && <AboutView />}
            {activeSection === "tech" && <TechView />}
            {activeSection === "projects" && <ProjectsView />}
            {activeSection === "experience" && <ExperienceView />}
            {activeSection === "contact" && <ContactView />}
          </motion.div>
        </main>

        {/* Reusable Compact Footer (Immediately following every section view) */}
        <Footer onBackToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
      </div>
    </div>
  );
}
