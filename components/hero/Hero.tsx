"use client";

import { useRef, type CSSProperties } from "react";
import MagneticButton from "../ui/MagneticButton";
import HeroSpotlightCTA from "./HeroSpotlightCTA";
import { SOCIALS } from "@/data/socials";
import SectionLabel from "../ui/SectionLabel";
import SystemGraph from "./SystemGraph";

import DecryptedText from "../ui/DecryptedText";

/**
 * Stagger for the entry cascade.
 *
 * These are CSS animation delays, not framer-motion transitions. The hero
 * holds the LCP element, and animating it from opacity 0 in JS meant LCP could
 * not happen until the bundle had loaded and hydrated - 3.2s of pure render
 * delay on throttled mobile. CSS starts at first paint instead.
 */
const delay = (seconds: number) =>
  ({ "--reveal-delay": `${seconds}s` }) as CSSProperties;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-[100dvh] flex items-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 lg:pt-24 lg:pb-16 overflow-hidden"
    >
      <div className="hero-content relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-8 items-center max-w-7xl mx-auto">
        {/* ── LEFT COLUMN ── */}
        <div
          className="hero-text flex flex-col items-start px-4 sm:px-6 w-full"
        >
          <div className="reveal-up">
            <SectionLabel number="01" text="INTRODUCTION" />
          </div>

          <h1 
            className="flex items-center mb-6 sm:mb-8 text-[clamp(2.35rem,8vw,4.5rem)] font-bold tracking-tight leading-[0.98] whitespace-nowrap"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            <span
              className="reveal-up block text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] to-[#394E6E] dark:from-[#94A3B8] dark:via-[#F8FAFC] dark:to-[#CBD5E1]"
              style={delay(0.05)}
            >
              <DecryptedText
                text="Dheesh Medekar"
                animateOn="view"
                speed={80}
                maxIterations={20}
                sequential={true}
                revealDirection="start"
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] to-[#394E6E] dark:from-[#94A3B8] dark:via-[#F8FAFC] dark:to-[#CBD5E1]"
                encryptedClassName="text-red-400 dark:text-red-300 font-mono opacity-80"
              />
            </span>
          </h1>

          <div
            className="hero-roles reveal-up flex flex-col gap-2 sm:gap-2.5 mb-6 sm:mb-8 w-full"
            style={delay(0.15)}
          >
            {["AI / LLM ENGINEER", "BACKEND ENGINEER", "FULL-STACK DEVELOPER"].map(
              (role, i) => (
                <div key={role} className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className={`w-5 sm:w-6 h-[2px] shrink-0 hero-role-dash ${i === 0 ? "bg-[#394E6E] dark:bg-white" : "bg-[#394E6E]/60 dark:bg-white/30"}`}
                  />
                  <span
                    className={`text-[10.5px] sm:text-[11.5px] font-mono tracking-[0.16em] sm:tracking-[0.2em] font-bold hero-role-text truncate ${i === 0
                        ? "text-[#394E6E] dark:text-white"
                        : "text-[#394E6E] dark:text-gray-300"
                      }`}
                  >
                    <DecryptedText
                      text={role}
                      animateOn="inViewHover"
                      speed={55}
                      maxIterations={14}
                      sequential={true}
                      className={i === 0 ? "text-[#394E6E] dark:text-white" : "text-[#394E6E] dark:text-gray-300"}
                      encryptedClassName="text-violet-400 dark:text-violet-300 font-mono opacity-70"
                    />
                  </span>
                </div>
              )
            )}
          </div>

          <p
            className="hero-description reveal-up text-[#1e293b] dark:text-gray-400 text-sm sm:text-base max-w-[420px] mb-8 sm:mb-10 leading-relaxed font-sans font-normal"
            style={delay(0.2)}
          >
            I build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] via-[#334155] to-[#394E6E] dark:from-[#8A8A8A] dark:to-[#FFFFFF] font-semibold">
              intelligent
            </span>{" "}
            systems, real-time applications and full-stack products — from LLM
            orchestration and RAG pipelines to production APIs and polished
            interfaces.
          </p>

          <div
            className="hero-buttons reveal-up flex flex-col xs:flex-row items-stretch sm:items-center w-full sm:w-auto gap-3 sm:gap-3.5 mb-8 sm:mb-12"
            style={delay(0.25)}
          >
            {/* 1. Primary White CTA: VIEW PROJECTS */}
            <MagneticButton
              href="#projects"
              className="hero-btn-primary group inline-flex h-11 sm:h-12 items-center justify-center gap-2 px-5 sm:px-6 rounded-lg bg-white text-[#050505] text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-colors shadow-sm shrink-0"
            >
              VIEW PROJECTS
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M1 11L11 1M11 1H3.5M11 1V8.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>

            {/* 2. Interactive Spotlight CTA: ✦ ABOUT ME → */}
            <HeroSpotlightCTA href="/know-me-more" />
          </div>

          <div className="reveal-up flex items-center gap-5 sm:gap-6 flex-wrap" style={delay(0.3)}>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[10.5px] sm:text-[11px] font-mono tracking-widest text-gray-500 dark:text-gray-400 hover:text-[#394E6E] dark:hover:text-white transition-colors uppercase flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[10.5px] sm:text-[11px] font-mono tracking-widest text-gray-500 dark:text-gray-400 hover:text-[#394E6E] dark:hover:text-white transition-colors uppercase flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* ── RIGHT COLUMN: AI System Architecture ── */}
        <div
          className="relative flex items-center justify-center w-full max-w-[540px] lg:max-w-none h-auto min-h-[380px] sm:h-[480px] lg:h-[560px] mx-auto -mt-4 sm:-mt-6 lg:-mt-14 overflow-visible"
        >
          <SystemGraph />
        </div>
      </div>
    </section>

  );
}
