"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "../ui/MagneticButton";
import SectionLabel from "../ui/SectionLabel";
import SystemGraph from "./SystemGraph";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const graphScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const graphY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const graphOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-[100dvh] flex items-center pt-40 md:pt-32 pb-8 lg:pt-24 lg:pb-16 overflow-visible"
    >
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center max-w-7xl mx-auto">
        {/* ── LEFT COLUMN ── */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col items-start px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel number="01" text="INTRODUCTION" />
          </motion.div>

          <div className="flex flex-col gap-2 mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,12vw,4.5rem)] font-light tracking-[-0.04em] leading-none text-white font-display"
            >
              Dheesh
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,12vw,4.5rem)] font-light tracking-[-0.04em] leading-none font-display text-gray-500"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">
                Medekar
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1.5 mb-8"
          >
            {["AI / LLM ENGINEER", "BACKEND ENGINEER", "FULL-STACK DEVELOPER"].map((role, i) => (
              <div key={role} className="flex items-center gap-3">
                <div className={`w-6 h-px ${i === 0 ? "bg-white" : "bg-white/20"}`} />
                <span className={`text-[11px] font-mono tracking-[0.2em] ${i === 0 ? "text-white" : "text-gray-500"}`}>
                  {role}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-400 text-base max-w-[420px] mb-10 leading-relaxed font-sans"
          >
            I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">intelligent</span> systems, real-time applications and full-stack products — from LLM orchestration and RAG pipelines to production APIs and polished interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-4 mb-12"
          >
            <MagneticButton
              href="#projects"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex h-12 items-center justify-center gap-2 px-6 rounded-lg bg-white text-[#030712] text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
              VIEW PROJECTS
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex h-12 items-center justify-center px-6 rounded-lg border border-white/10 text-white text-sm font-semibold hover:border-white/20 hover:bg-white/5 transition-colors"
            >
              CONTACT ME
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[11px] font-mono tracking-widest text-gray-500 hover:text-white transition-colors uppercase flex items-center gap-2">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[11px] font-mono tracking-widest text-gray-500 hover:text-white transition-colors uppercase flex items-center gap-2">
              LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN: System Graph ── */}
        <motion.div
          style={{ scale: graphScale, y: graphY, opacity: graphOpacity }}
          className="relative flex items-center justify-center w-full h-[400px] lg:h-full lg:min-h-[600px]"
        >
          <SystemGraph />
        </motion.div>
      </div>
    </section>
  );
}
