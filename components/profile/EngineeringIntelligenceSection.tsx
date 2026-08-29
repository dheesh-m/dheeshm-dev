"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EngineeringIntelligenceSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-6xl mx-auto rounded-[24px] sm:rounded-[32px] bg-[#07090d]/85 backdrop-blur-2xl border border-slate-400/35 hover:border-slate-300/55 p-6 sm:p-10 lg:p-12 text-white shadow-[0_0_60px_rgba(255,255,255,0.07),0_0_30px_rgba(203,213,225,0.05)] hover:shadow-[0_0_80px_rgba(255,255,255,0.12)] transition-all duration-500 overflow-hidden select-none"
    >
      {/* ── Silver Ambient Glow Behind ── */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-slate-300/10 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-[90px]" />

      {/* ── Silver Corner Notches ── */}
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-slate-300 rounded-tl pointer-events-none" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-slate-300 rounded-tr pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-slate-300 rounded-bl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-slate-300 rounded-br pointer-events-none" />

      {/* ── Header Area ── */}
      <div className="flex flex-col items-start mb-8 sm:mb-12">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-slate-400/30 text-[11px] font-mono tracking-widest text-slate-300 mb-5 shadow-[0_0_12px_rgba(255,255,255,0.08)]">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-200 shadow-[0_0_8px_#ffffff] animate-pulse" />
          02 / ABOUT ME
        </div>

        {/* Display Title */}
        <h2 className="text-[clamp(2.3rem,7vw,4.5rem)] font-light tracking-[-0.035em] leading-[0.96] font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
          Engineering<br />Intelligence
        </h2>
      </div>

      {/* ── Two-Column Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
        
        {/* Left Column: 3 Paragraphs */}
        <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6 text-sm sm:text-base md:text-[17px] font-light leading-relaxed text-slate-300/90 text-left">
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
          <div className="relative group p-6 sm:p-7 rounded-2xl bg-[#0d0f14]/85 backdrop-blur-xl border border-slate-400/30 hover:border-slate-300/50 shadow-[0_4px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.06)] transition-all duration-300 w-full">
            <div className="text-[10px] font-mono tracking-widest text-slate-400 mb-5 uppercase">
              CURRENTLY BUILDING
            </div>
            <ul className="flex flex-col gap-4">
              {[
                { label: "AI SYSTEMS" },
                { label: "REAL-TIME APPS" },
                { label: "FULL-STACK PRODUCTS" },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-3.5 group/item cursor-default">
                  <div className="w-2 h-2 rounded-full bg-slate-300 group-hover/item:bg-white group-hover/item:scale-125 transition-all shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-200 group-hover/item:text-white transition-colors">
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
