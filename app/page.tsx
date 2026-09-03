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

export default function Page() {
  const [activeSection, setActiveSection] = useState("home");
  const [isPageReady, setIsPageReady] = useState(true);

  // Sync section with URL hash on mount & on popstate / hashchange (browser back/forward)
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash && VALID_SECTIONS.includes(hash)) {
        setActiveSection(hash);
      }
    };

    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    window.addEventListener("popstate", handleHashSync);

    return () => {
      window.removeEventListener("hashchange", handleHashSync);
      window.removeEventListener("popstate", handleHashSync);
    };
  }, []);

  const handleSelectSection = useCallback((sectionKey: string) => {
    if (!VALID_SECTIONS.includes(sectionKey)) return;
    setActiveSection(sectionKey);

    // Update URL hash without full reload
    if (window.location.hash !== `#${sectionKey}`) {
      window.history.pushState(null, "", `#${sectionKey}`);
    }

    // Smooth scroll to top of new section
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05060B] text-[#F4F6FA] selection:bg-red-500/20 overflow-x-hidden flex flex-col justify-between">
      {/* ── Entry Intro Loader ── */}
      <PortfolioLoader onStartExit={() => setIsPageReady(true)} />

      {/* ── Structured SEO JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* ── Persistent Hyperspeed Background (Mounted ONCE at root level) ── */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#05060B]">
        <Hyperspeed effectOptions={hyperspeedPresets.three} />
      </div>

      {/* ── Persistent Crimson SplashCursor WebGL fluid simulation (z-[1]) ── */}
      <SplashCursor
        COLOR="#7F1D1D"
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
