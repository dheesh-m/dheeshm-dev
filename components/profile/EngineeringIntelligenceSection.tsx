"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EngineeringIntelligenceSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[880px] mx-auto rounded-xl bg-black/35 backdrop-blur-2xl border border-white/20 hover:border-white/35 p-5 sm:p-7 lg:p-8 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.06)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.12)] transition-all duration-300 overflow-hidden select-none"
    >
      {/* ── Subtle Ambient Glow Behind ── */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 rounded-full bg-white/[0.04] blur-[70px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-white/[0.03] blur-[70px]" />

      {/* ── Rectangular Corner Accents ── */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/70 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/70 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/70 pointer-events-none" />

      {/* ── Header Area ── */}
      <div className="flex flex-col items-start mb-6 sm:mb-8">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.05] backdrop-blur-md border border-white/20 text-[10.5px] font-mono tracking-widest text-slate-200 mb-3 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff] animate-pulse" />
          02 / ABOUT ME
        </div>

        {/* Display Title */}
        <h2 className="text-[clamp(1.85rem,5.5vw,3.2rem)] font-light tracking-[-0.035em] leading-[0.98] font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
          Engineering<br />Intelligence
        </h2>
      </div>

      {/* ── Two-Column Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start w-full">
        
        {/* Left Column: 3 Paragraphs */}
        <div className="lg:col-span-8 flex flex-col gap-3.5 sm:gap-4 text-xs sm:text-[13.5px] font-light leading-relaxed text-white/80 text-left">
          <p>
            I bridge the gap between high-level architectural design and low-level engineering execution. With a strong foundation in scalable architectures and AI-driven workflows, I build software that performs reliably in mission-critical environments.
          </p>
          <p>
            My expertise spans large language model orchestration, retrieval-augmented generation pipelines, and high-concurrency backend services. I prioritize clean interfaces, rigorous type safety, and real-time responsiveness.
          </p>
          <p>
            Whether deploying automated data pipelines, constructing full-stack systems, or fine-tuning neural interfaces, I focus on velocity, resilience, and maintainable software patterns.
          </p>
        </div>

        {/* Right Column: Currently Building Card */}
        <div className="lg:col-span-4 w-full">
          <div className="relative group p-4 sm:p-5 rounded-lg bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 shadow-sm transition-all duration-300 w-full">
            <div className="text-[9px] font-mono tracking-widest text-white/50 mb-3.5 uppercase">
              CURRENTLY BUILDING
            </div>
            <ul className="flex flex-col gap-3">
              {[
                { label: "AI SYSTEMS" },
                { label: "REAL-TIME APPS" },
                { label: "FULL-STACK PRODUCTS" },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2.5 group/item cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] group-hover/item:scale-125 transition-transform" />
                  <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-white/85 group-hover/item:text-white transition-colors">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
