"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import MagneticButton from "../ui/MagneticButton";
import { SOCIALS } from "@/data/socials";
import SectionLabel from "../ui/SectionLabel";
import SystemGraph from "./SystemGraph";

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-linked parallax stays in framer-motion: it depends on scroll
  // position, so it cannot be expressed as a static CSS animation.
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const graphScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const graphY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const graphOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-[100dvh] flex items-center pt-28 md:pt-32 pb-8 lg:pt-24 lg:pb-16 overflow-visible"
    >
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">
        {/* ── LEFT COLUMN ── */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col items-start px-6"
        >
          <div className="reveal-up">
            <SectionLabel number="01" text="INTRODUCTION" />
          </div>

          <h1 className="flex flex-col gap-2 mb-8 text-[clamp(2.5rem,12vw,4.5rem)] font-light tracking-[-0.04em] leading-none font-display">
            <span className="reveal-up block text-white" style={delay(0.05)}>
              Dheesh
            </span>
            <span
              className="reveal-up block text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]"
              style={delay(0.1)}
            >
              Medekar
            </span>
          </h1>

          <div
            className="reveal-up flex flex-col gap-1.5 mb-8"
            style={delay(0.15)}
          >
            {["AI / LLM ENGINEER", "BACKEND ENGINEER", "FULL-STACK DEVELOPER"].map(
              (role, i) => (
                <div key={role} className="flex items-center gap-3">
                  <div
                    className={`w-6 h-px ${i === 0 ? "bg-white" : "bg-white/20"}`}
                  />
                  <span
                    className={`text-[11px] font-mono tracking-[0.2em] ${i === 0 ? "text-white" : "text-gray-400"}`}
                  >
                    {role}
                  </span>
                </div>
              )
            )}
          </div>

          <p
            className="reveal-up text-gray-400 text-base max-w-[420px] mb-10 leading-relaxed font-sans"
            style={delay(0.2)}
          >
            I build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">
              intelligent
            </span>{" "}
            systems, real-time applications and full-stack products — from LLM
            orchestration and RAG pipelines to production APIs and polished
            interfaces.
          </p>

          <div
            className="reveal-up flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-4 mb-12"
            style={delay(0.25)}
          >
            {/* Native anchor navigation; scroll-behavior and scroll-padding-top
                in globals.css handle the smooth scroll and header offset. */}
            <MagneticButton
              href="#projects"
              className="hero-btn-primary group inline-flex h-12 items-center justify-center gap-2 px-6 rounded-lg bg-white text-[#050505] text-sm font-semibold hover:bg-gray-200 transition-colors shadow-sm"
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
            <MagneticButton
              href="#contact"
              className="hero-btn-secondary inline-flex h-12 items-center justify-center px-6 rounded-lg border border-white/10 text-white text-sm font-semibold hover:border-white/20 hover:bg-white/5 transition-colors shadow-sm"
            >
              CONTACT ME
            </MagneticButton>
          </div>

          <div className="reveal-up flex items-center gap-6" style={delay(0.3)}>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[11px] font-mono tracking-widest text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors uppercase flex items-center gap-2"
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
              className="text-[11px] font-mono tracking-widest text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors uppercase flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN: 3D Orbital System ── */}
        <motion.div
          style={{ scale: graphScale, y: graphY, opacity: graphOpacity }}
          className="relative flex items-center justify-center w-full max-w-[500px] lg:max-w-none h-[380px] sm:h-[480px] lg:h-[560px] mx-auto mt-2 lg:-mt-8"
        >
          <SystemGraph />
        </motion.div>
      </div>
    </section>
  );
}
