"use client";

import React from "react";
import { ArrowRight, Code2, Brain, Box, Rocket } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface HomeViewProps {
  onNavigate: (section: string) => void;
}

const STATS = [
  {
    icon: Code2,
    value: "5+",
    label: "YEARS OF CODING",
  },
  {
    icon: Brain,
    value: "10+",
    label: "AI / LLM PROJECTS",
  },
  {
    icon: Box,
    value: "20+",
    label: "FULL-STACK PRODUCTS",
  },
  {
    icon: Rocket,
    value: "∞",
    label: "CURIOSITY",
  },
];

export default function HomeView({ onNavigate }: HomeViewProps) {
  const { isLightMode } = useTheme();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-12 sm:pb-16 flex flex-col justify-between min-h-screen">
      {/* ── Top & Main Content (Center Aligned with Dheesh Medekar in One Line) ── */}
      <div className="w-full flex flex-col items-center text-center my-auto max-w-4xl mx-auto">
        
        {/* Section Indicator */}
        <div className={cn(
          "inline-flex items-center gap-2 px-3.5 py-1 rounded-full backdrop-blur-md mb-6 transition-colors",
          isLightMode 
            ? "bg-red-500/[0.05] border border-red-500/20 text-[#E50909]" 
            : "bg-white/[0.04] border border-white/10 text-white/80"
        )}>
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]"
          )} />
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
            01 / INTRODUCTION
          </span>
        </div>

        {/* Hero Name Heading */}
        <h1 
          className={cn(
            "text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight leading-none mb-6 whitespace-nowrap text-center transition-colors select-none",
            isLightMode ? "text-[#111111]" : "text-white"
          )}
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          Dheesh Medekar
        </h1>

        {/* Roles Stack */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-6 text-xs sm:text-sm font-mono tracking-widest">
          <div className="flex items-center gap-2">
            <span className={isLightMode ? "text-[#E50909] font-bold" : "text-[#950606] font-bold"}>—</span>
            <span className={cn("font-bold", isLightMode ? "text-[#111111]" : "text-white/90")}>
              AI / LLM ENGINEER
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={isLightMode ? "text-[#E50909] font-bold" : "text-[#950606] font-bold"}>—</span>
            <span className={cn("font-bold", isLightMode ? "text-[#111111]" : "text-white/90")}>
              BACKEND ENGINEER
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={isLightMode ? "text-[#E50909] font-bold" : "text-[#950606] font-bold"}>—</span>
            <span className={cn("font-bold", isLightMode ? "text-[#111111]" : "text-white/90")}>
              FULL-STACK DEVELOPER
            </span>
          </div>
        </div>

        {/* Bio Summary */}
        <p className={cn(
          "text-sm sm:text-base leading-relaxed max-w-2xl mb-8 font-normal text-center transition-colors",
          isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
        )}>
          I build <strong className={cn("font-medium", isLightMode ? "text-[#111111]" : "text-white")}>intelligent systems</strong>, real-time applications and full-stack products — from LLM orchestration and RAG pipelines to production APIs and polished interfaces.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <button
            onClick={() => onNavigate("projects")}
            className={cn(
              "group inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] cursor-pointer",
              isLightMode 
                ? "bg-[#E50909] hover:bg-[#CC0808] shadow-[0_4px_14px_rgba(229,9,9,0.25)]" 
                : "bg-[#950606] hover:bg-[#7D0505] shadow-[0_4px_14px_rgba(149,6,6,0.35)]"
            )}
          >
            <span>VIEW PROJECTS</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate("about")}
            className={cn(
              "group inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-pointer",
              isLightMode
                ? "bg-white text-[#111111] border border-black/15 hover:bg-black/[0.03] shadow-sm"
                : "bg-white/[0.08] hover:bg-white/[0.15] border border-white/25 text-white"
            )}
          >
            <span>KNOW ME MORE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>

      {/* ── Bottom Metrics Capsules (4 clean cards) ── */}
      <div className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t transition-colors",
        isLightMode ? "border-black/[0.06]" : "border-white/10"
      )}>
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={cn(
                "flex items-center gap-3 p-4 sm:p-5 rounded-2xl transition-all duration-300",
                isLightMode
                  ? "bg-white border border-black/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:border-black/20"
                  : "bg-white/[0.04] border border-white/15 backdrop-blur-md hover:border-white/30 hover:bg-white/[0.08]"
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                isLightMode 
                  ? "bg-red-500/[0.08] text-[#E50909]" 
                  : "bg-white/[0.08] border border-white/15 text-[#950606]"
              )}>
                <Icon className={cn("w-4 h-4", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  "text-base sm:text-lg font-black leading-none",
                  isLightMode ? "text-[#111111]" : "text-white"
                )}>
                  {stat.value}
                </span>
                <span className={cn(
                  "text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold mt-1 leading-tight",
                  isLightMode ? "text-[#667085]" : "text-white/80"
                )}>
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
