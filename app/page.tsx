"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import HomeView from "@/components/views/HomeView";

// Code-split secondary views for maximum initial page load speed
const AboutView = dynamic(() => import("@/components/views/AboutView"));
const TechView = dynamic(() => import("@/components/views/TechView"));
const ProjectsView = dynamic(() => import("@/components/views/ProjectsView"));
const ExperienceView = dynamic(() => import("@/components/views/ExperienceView"));
const ContactView = dynamic(() => import("@/components/views/ContactView"));
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
  // Synchronously initialize from hash if available in browser to avoid flash of Home
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash && VALID_SECTIONS.includes(hash)) {
        return hash;
      }
    }
    return "home";
  });
  const [isPageReady, setIsPageReady] = useState(false);
  const { isLightMode } = useTheme();

  // URL Hash Sync & Browser Back/Forward History Support
  useEffect(() => {
    const handleSync = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash && VALID_SECTIONS.includes(hash)) {
        setActiveSection(hash);
        window.scrollTo({ top: 0, behavior: "instant" });
      } else if (!hash) {
        setActiveSection("home");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else {
        // Fall back cleanly if hash is invalid
        setActiveSection("home");
        window.history.replaceState(null, "", "#home");
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    handleSync();
    window.addEventListener("hashchange", handleSync);
    window.addEventListener("popstate", handleSync);
    return () => {
      window.removeEventListener("hashchange", handleSync);
      window.removeEventListener("popstate", handleSync);
    };
  }, []);

  const handleSelectSection = useCallback((sectionKey: string) => {
    if (!VALID_SECTIONS.includes(sectionKey)) return;
    setActiveSection(sectionKey);

    // Update URL hash without full reload
    if (window.location.hash !== `#${sectionKey}`) {
      window.history.pushState(null, "", `#${sectionKey}`);
    }

    // Reset scroll position to top immediately on view switch
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className={cn(
      "relative min-h-screen selection:bg-red-500/20 overflow-x-hidden flex flex-col transition-colors duration-300",
      isLightMode ? "bg-[#FFFFFF] text-[#111111]" : "bg-[#05060B] text-[#F4F6FA]"
    )}>
      {/* ── Entry Intro Loader ── */}
      <PortfolioLoader onStartExit={() => setIsPageReady(true)} />

      {/* ── Structured SEO JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* ── Dedicated Fixed Visual Layer: Persistent Hyperspeed Background (z-0) ── */}
      <div
        id="fixed-bg-layer"
        aria-hidden="true"
        className={cn(
          "fixed inset-0 w-full h-full min-h-[100lvh] pointer-events-none z-0 overflow-hidden select-none transition-colors duration-300",
          isLightMode ? "bg-[#FFFFFF]" : "bg-[#05060B]"
        )}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          contain: "strict",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          willChange: "transform",
        }}
      >
        <Hyperspeed 
          effectOptions={isLightMode ? hyperspeedPresets.light : hyperspeedPresets.akira} 
          lightMode={isLightMode} 
        />
      </div>

      {/* ── Persistent Red & Silver SplashCursor WebGL fluid simulation (z-[1]) ── */}
      <SplashCursor
        COLOR="#E50909"
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
      <div className="relative z-10 w-full flex-1 flex flex-col">
        {/* Floating Top Navbar */}
        <Navbar
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />

        {/* Dynamic Section View (Smooth Framer Motion crossfade with AnimatePresence) */}
        <main className="w-full flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex-1 flex flex-col"
            >
              {activeSection === "home" && <HomeView onNavigate={handleSelectSection} />}
              {activeSection === "about" && <AboutView />}
              {activeSection === "tech" && <TechView />}
              {activeSection === "projects" && <ProjectsView />}
              {activeSection === "experience" && <ExperienceView />}
              {activeSection === "contact" && <ContactView />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Reusable Compact Footer (Immediately following every active section view) */}
        <Footer onBackToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
      </div>
    </div>
  );
}
