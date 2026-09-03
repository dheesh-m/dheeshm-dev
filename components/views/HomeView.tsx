"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Brain, Box, Sparkles } from "lucide-react";

interface HomeViewProps {
  onNavigate: (section: string) => void;
}

const STATS = [
  {
    icon: Code2,
    value: "2+",
    label: "YEARS OF EXPERIENCE",
  },
  {
    icon: Brain,
    value: "10+",
    label: "PROJECTS COMPLETED",
  },
  {
    icon: Box,
    value: "15+",
    label: "TECHNOLOGIES MASTERED",
  },
  {
    icon: Sparkles,
    value: "∞",
    label: "CURIOSITY & PASSION",
  },
];

export default function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-12 flex flex-col justify-between min-h-[calc(100vh-140px)]">
      {/* ── Top & Main Content (Left aligned with open right side for Hyperspeed trails) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          
          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase">
              01 / INTRODUCTION
            </span>
          </div>

          {/* Hero Name Heading */}
          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.95] text-white mb-6 uppercase">
            Dheesh<br />
            Medekar
          </h1>

          {/* Roles Stack */}
          <div className="flex flex-col gap-1.5 mb-6 text-xs sm:text-sm font-mono tracking-widest text-white/90">
            <div className="flex items-center gap-2">
              <span className="text-[#EF4444] font-bold">—</span>
              <span className="font-semibold">AI / LLM ENGINEER</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#EF4444] font-bold">—</span>
              <span className="font-semibold">BACKEND ENGINEER</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#EF4444] font-bold">—</span>
              <span className="font-semibold">FULL-STACK DEVELOPER</span>
            </div>
          </div>

          {/* Bio Summary */}
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8] max-w-xl mb-8 font-normal">
            I build <strong className="text-white font-medium">intelligent systems</strong>, real-time applications and full-stack products — from LLM orchestration and RAG pipelines to production APIs and polished interfaces.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              onClick={() => onNavigate("projects")}
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-[#05060B] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white/90 hover:scale-[1.03] shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              <span>VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4 text-[#05060B] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate("about")}
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/25 text-white text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:scale-[1.03] cursor-pointer"
            >
              <span className="text-white">KNOW ME MORE</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>

        {/* Right side empty on desktop to let Hyperspeed light trails shine through */}
        <div className="hidden lg:block lg:col-span-4" />
      </div>

      {/* ── Bottom Metrics Capsules (4 compact glass cards) ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#EF4444]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-black text-white leading-none">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-white/80 font-medium mt-1 leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
