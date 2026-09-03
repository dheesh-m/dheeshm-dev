"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import {
  Layers,
  Search,
  Target,
  Sparkles,
  Bot,
  Volume2,
  Mic,
  GitBranch,
  Terminal,
  Activity,
  Database,
  Box,
  Container,
  Cloud,
  Globe,
  Zap,
  Radio,
  Wifi,
  Code2,
  Layout,
  FileCode,
} from "lucide-react";

interface TechItem {
  name: string;
  icon: any;
}

const AI_CLUSTER_LEFT: TechItem[] = [
  { name: "LLM ORCHESTRATION", icon: Layers },
  { name: "RAG", icon: Search },
  { name: "VECTOR RETRIEVAL", icon: Target },
  { name: "EMBEDDINGS", icon: Sparkles },
  { name: "AGENTS", icon: Bot },
];

const AI_CLUSTER_RIGHT: TechItem[] = [
  { name: "TTS", icon: Volume2 },
  { name: "ASR", icon: Mic },
  { name: "LANGGRAPH", icon: GitBranch },
  { name: "PROMPT ENGINEERING", icon: Terminal },
  { name: "VOICE AI", icon: Activity },
];

const DATA_CLUSTER_LEFT: TechItem[] = [
  { name: "POSTGRESQL", icon: Database },
  { name: "PINECONE", icon: Box },
  { name: "DOCKER", icon: Container },
];

const DATA_CLUSTER_RIGHT: TechItem[] = [
  { name: "AWS", icon: Cloud },
  { name: "GCP", icon: Globe },
  { name: "VECTOR DBS", icon: Database },
];

const BACKEND_CLUSTER_LEFT: TechItem[] = [
  { name: "PYTHON", icon: FileCode },
  { name: "FASTAPI", icon: Zap },
];

const BACKEND_CLUSTER_RIGHT: TechItem[] = [
  { name: "REST APIS", icon: Radio },
  { name: "WEBSOCKETS", icon: Wifi },
];

const FRONTEND_CLUSTER_LEFT: TechItem[] = [
  { name: "REACT", icon: Sparkles },
  { name: "NEXT.JS", icon: Layers },
];

const FRONTEND_CLUSTER_RIGHT: TechItem[] = [
  { name: "TYPESCRIPT", icon: Code2 },
  { name: "TAILWIND CSS", icon: Layout },
];

export default function TechView() {
  const { isLightMode } = useTheme();
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-16 min-h-[calc(100vh-140px)] flex flex-col justify-center">
      
      {/* ── 1. Section Header ── */}
      <div className="flex flex-col items-center text-center mx-auto mb-6 sm:mb-10">
        <div className={cn(
          "inline-flex items-center gap-2 px-3.5 py-1 rounded-full backdrop-blur-md mb-4 transition-colors",
          isLightMode 
            ? "bg-red-500/[0.05] border border-red-500/20 text-[#E50909]" 
            : "bg-white/[0.04] border border-white/10 text-white/80"
        )}>
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]"
          )} />
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
            03 / TECHNOLOGY ECOSYSTEM
          </span>
        </div>

        <h2 
          className={cn(
            "text-4xl sm:text-6xl font-normal tracking-tight mb-3 transition-colors",
            isLightMode ? "text-[#111111]" : "text-white"
          )}
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          Systems I Build With
        </h2>
        <p className={cn(
          "text-sm sm:text-base max-w-2xl font-normal transition-colors",
          isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
        )}>
          The technologies, frameworks and platforms that power my solutions.
        </p>
      </div>

      {/* ── 2. Pixel-Perfect Planetary Ecosystem Diagram ── */}
      <div className="relative w-full max-w-6xl mx-auto py-4 select-none">
        
        {/* Desktop View: Interactive 2x2 Orbital Architecture with Center AI Hub (lg+) */}
        <div className="hidden lg:block relative w-full h-[640px]">
          
          {/* Master SVG Connecting Orbit Curves */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            viewBox="0 0 1152 640"
            fill="none"
          >
            {/* ── Orbital Trajectory Lines ── */}
            {/* 1. Center to Top-Left AI Cluster */}
            <path
              d="M 520 280 C 450 240, 390 190, 310 175"
              stroke={isLightMode ? "#E50909" : "#950606"}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity={hoveredCluster === "ai" ? 0.9 : isLightMode ? 0.35 : 0.45}
              className="transition-opacity duration-300"
            />

            {/* 2. Center to Top-Right Data Cluster */}
            <path
              d="M 632 280 C 700 240, 770 190, 850 175"
              stroke={isLightMode ? "#E50909" : "#950606"}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity={hoveredCluster === "data" ? 0.95 : isLightMode ? 0.4 : 0.5}
              className="transition-opacity duration-300"
            />

            {/* 3. Center to Bottom-Left Backend Cluster */}
            <path
              d="M 520 360 C 450 400, 380 470, 300 485"
              stroke={isLightMode ? "#E50909" : "#950606"}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity={hoveredCluster === "backend" ? 0.9 : isLightMode ? 0.35 : 0.45}
              className="transition-opacity duration-300"
            />

            {/* 4. Center to Bottom-Right Frontend Cluster */}
            <path
              d="M 632 360 C 700 400, 780 470, 850 485"
              stroke={isLightMode ? "#E50909" : "#950606"}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity={hoveredCluster === "frontend" ? 0.9 : isLightMode ? 0.35 : 0.45}
              className="transition-opacity duration-300"
            />
          </svg>

          {/* ── 1. Top-Left Cluster: AI / LLM ENGINEERING ── */}
          <div
            onMouseEnter={() => setHoveredCluster("ai")}
            onMouseLeave={() => setHoveredCluster(null)}
            className="absolute top-[20px] left-[15px] w-[500px] z-10"
          >
            <div
              className={cn(
                "relative rounded-[45px] p-6 transition-all duration-300",
                isLightMode
                  ? "border border-dashed border-black/15 bg-white/75 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-red-500/40"
                  : "border border-dashed border-[#950606]/40 bg-[#070914]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-[#950606]/80"
              )}
            >
              {/* Floating Pill Badge */}
              <div className={cn(
                "absolute -top-3.5 left-10 px-3.5 py-0.5 rounded-full flex items-center gap-2 shadow-sm border",
                isLightMode
                  ? "bg-white border-black/15 text-[#111111]"
                  : "bg-[#070914] border-[#950606]/50 text-white"
              )}>
                <span className={cn("w-1.5 h-1.5 rounded-full", isLightMode ? "bg-[#E50909] shadow-[0_0_6px_#E50909]" : "bg-[#950606] shadow-[0_0_6px_#950606]")} />
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                  AI / LLM ENGINEERING
                </span>
              </div>

              {/* Technologies 2 Columns */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1">
                <div className="flex flex-col gap-2.5">
                  {AI_CLUSTER_LEFT.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="flex items-center gap-2 group cursor-default">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          isLightMode
                            ? "bg-red-500/[0.08] text-[#E50909]"
                            : "bg-[#950606]/15 border border-[#950606]/40 text-[#950606]"
                        )}>
                          <Icon className={cn("w-2.5 h-2.5", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                        </div>
                        <span className={cn(
                          "font-mono text-[11px] font-medium tracking-wide transition-colors",
                          isLightMode ? "text-[#343A40] group-hover:text-[#111111]" : "text-[#D1D5DB] group-hover:text-white"
                        )}>
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-2.5">
                  {AI_CLUSTER_RIGHT.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="flex items-center gap-2 group cursor-default">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          isLightMode
                            ? "bg-red-500/[0.08] text-[#E50909]"
                            : "bg-[#950606]/15 border border-[#950606]/40 text-[#950606]"
                        )}>
                          <Icon className={cn("w-2.5 h-2.5", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                        </div>
                        <span className={cn(
                          "font-mono text-[11px] font-medium tracking-wide transition-colors",
                          isLightMode ? "text-[#343A40] group-hover:text-[#111111]" : "text-[#D1D5DB] group-hover:text-white"
                        )}>
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. Top-Right Cluster: DATA & CLOUD ── */}
          <div
            onMouseEnter={() => setHoveredCluster("data")}
            onMouseLeave={() => setHoveredCluster(null)}
            className="absolute top-[35px] right-[15px] w-[460px] z-10"
          >
            <div
              className={cn(
                "relative rounded-[45px] p-6 transition-all duration-300",
                isLightMode
                  ? "border border-dashed border-black/15 bg-white/75 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-red-500/40"
                  : "border border-dashed border-[#950606]/45 bg-[#070914]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-[#950606]/85"
              )}
            >
              {/* Floating Pill Badge */}
              <div className={cn(
                "absolute -top-3.5 left-10 px-3.5 py-0.5 rounded-full flex items-center gap-2 shadow-sm border",
                isLightMode
                  ? "bg-white border-black/15 text-[#111111]"
                  : "bg-[#070914] border-[#950606]/55 text-white"
              )}>
                <span className={cn("w-1.5 h-1.5 rounded-full", isLightMode ? "bg-[#E50909] shadow-[0_0_6px_#E50909]" : "bg-[#950606] shadow-[0_0_6px_#950606]")} />
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                  DATA & CLOUD
                </span>
              </div>

              {/* Technologies 2 Columns */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1">
                <div className="flex flex-col gap-2.5">
                  {DATA_CLUSTER_LEFT.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="flex items-center gap-2 group cursor-default">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          isLightMode
                            ? "bg-red-500/[0.08] text-[#E50909]"
                            : "bg-[#950606]/15 border border-[#950606]/40 text-[#950606]"
                        )}>
                          <Icon className={cn("w-2.5 h-2.5", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                        </div>
                        <span className={cn(
                          "font-mono text-[11px] font-medium tracking-wide transition-colors",
                          isLightMode ? "text-[#343A40] group-hover:text-[#111111]" : "text-[#D1D5DB] group-hover:text-white"
                        )}>
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-2.5">
                  {DATA_CLUSTER_RIGHT.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="flex items-center gap-2 group cursor-default">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          isLightMode
                            ? "bg-red-500/[0.08] text-[#E50909]"
                            : "bg-[#950606]/15 border border-[#950606]/40 text-[#950606]"
                        )}>
                          <Icon className={cn("w-2.5 h-2.5", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                        </div>
                        <span className={cn(
                          "font-mono text-[11px] font-medium tracking-wide transition-colors",
                          isLightMode ? "text-[#343A40] group-hover:text-[#111111]" : "text-[#D1D5DB] group-hover:text-white"
                        )}>
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Bottom-Left Cluster: BACKEND ── */}
          <div
            onMouseEnter={() => setHoveredCluster("backend")}
            onMouseLeave={() => setHoveredCluster(null)}
            className="absolute bottom-[35px] left-[50px] w-[430px] z-10"
          >
            <div
              className={cn(
                "relative rounded-[40px] p-5 transition-all duration-300",
                isLightMode
                  ? "border border-dashed border-black/15 bg-white/75 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-red-500/40"
                  : "border border-dashed border-[#950606]/40 bg-[#070914]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-[#950606]/80"
              )}
            >
              {/* Floating Pill Badge */}
              <div className={cn(
                "absolute -top-3.5 left-10 px-3.5 py-0.5 rounded-full flex items-center gap-2 shadow-sm border",
                isLightMode
                  ? "bg-white border-black/15 text-[#111111]"
                  : "bg-[#070914] border-[#950606]/50 text-white"
              )}>
                <span className={cn("w-1.5 h-1.5 rounded-full", isLightMode ? "bg-[#E50909] shadow-[0_0_6px_#E50909]" : "bg-[#950606] shadow-[0_0_6px_#950606]")} />
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                  BACKEND
                </span>
              </div>

              {/* Technologies 2 Columns */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1">
                <div className="flex flex-col gap-2.5">
                  {BACKEND_CLUSTER_LEFT.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="flex items-center gap-2 group cursor-default">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          isLightMode
                            ? "bg-red-500/[0.08] text-[#E50909]"
                            : "bg-[#950606]/15 border border-[#950606]/40 text-[#950606]"
                        )}>
                          <Icon className={cn("w-2.5 h-2.5", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                        </div>
                        <span className={cn(
                          "font-mono text-[11px] font-medium tracking-wide transition-colors",
                          isLightMode ? "text-[#343A40] group-hover:text-[#111111]" : "text-[#D1D5DB] group-hover:text-white"
                        )}>
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-2.5">
                  {BACKEND_CLUSTER_RIGHT.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="flex items-center gap-2 group cursor-default">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          isLightMode
                            ? "bg-red-500/[0.08] text-[#E50909]"
                            : "bg-[#950606]/15 border border-[#950606]/40 text-[#950606]"
                        )}>
                          <Icon className={cn("w-2.5 h-2.5", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                        </div>
                        <span className={cn(
                          "font-mono text-[11px] font-medium tracking-wide transition-colors",
                          isLightMode ? "text-[#343A40] group-hover:text-[#111111]" : "text-[#D1D5DB] group-hover:text-white"
                        )}>
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. Bottom-Right Cluster: FRONTEND ── */}
          <div
            onMouseEnter={() => setHoveredCluster("frontend")}
            onMouseLeave={() => setHoveredCluster(null)}
            className="absolute bottom-[35px] right-[50px] w-[430px] z-10"
          >
            <div
              className={cn(
                "relative rounded-[40px] p-5 transition-all duration-300",
                isLightMode
                  ? "border border-dashed border-black/15 bg-white/75 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-red-500/40"
                  : "border border-dashed border-[#950606]/40 bg-[#070914]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-[#950606]/80"
              )}
            >
              {/* Floating Pill Badge */}
              <div className={cn(
                "absolute -top-3.5 left-10 px-3.5 py-0.5 rounded-full flex items-center gap-2 shadow-sm border",
                isLightMode
                  ? "bg-white border-black/15 text-[#111111]"
                  : "bg-[#070914] border-[#950606]/50 text-white"
              )}>
                <span className={cn("w-1.5 h-1.5 rounded-full", isLightMode ? "bg-[#E50909] shadow-[0_0_6px_#E50909]" : "bg-[#950606] shadow-[0_0_6px_#950606]")} />
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                  FRONTEND
                </span>
              </div>

              {/* Technologies 2 Columns */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1">
                <div className="flex flex-col gap-2.5">
                  {FRONTEND_CLUSTER_LEFT.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="flex items-center gap-2 group cursor-default">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          isLightMode
                            ? "bg-red-500/[0.08] text-[#E50909]"
                            : "bg-[#950606]/15 border border-[#950606]/40 text-[#950606]"
                        )}>
                          <Icon className={cn("w-2.5 h-2.5", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                        </div>
                        <span className={cn(
                          "font-mono text-[11px] font-medium tracking-wide transition-colors",
                          isLightMode ? "text-[#343A40] group-hover:text-[#111111]" : "text-[#D1D5DB] group-hover:text-white"
                        )}>
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-2.5">
                  {FRONTEND_CLUSTER_RIGHT.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="flex items-center gap-2 group cursor-default">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          isLightMode
                            ? "bg-red-500/[0.08] text-[#E50909]"
                            : "bg-[#950606]/15 border border-[#950606]/40 text-[#950606]"
                        )}>
                          <Icon className={cn("w-2.5 h-2.5", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                        </div>
                        <span className={cn(
                          "font-mono text-[11px] font-medium tracking-wide transition-colors",
                          isLightMode ? "text-[#343A40] group-hover:text-[#111111]" : "text-[#D1D5DB] group-hover:text-white"
                        )}>
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── 5. Center Hub Disc: AI Core Hub ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className={cn(
              "relative w-28 h-28 rounded-full flex flex-col items-center justify-center p-3 transition-all duration-300",
              isLightMode
                ? "bg-white border-black/15 shadow-[0_4px_30px_rgba(0,0,0,0.06),inset_0_0_15px_rgba(229,9,9,0.04)]"
                : "bg-[#05060E]/95 border-white/20 shadow-[0_0_45px_rgba(149,6,6,0.4),inset_0_0_20px_rgba(149,6,6,0.2)]"
            )}>
              {/* 6 Glowing Junction Point Nodes on the Circular Ring */}
              <span className={cn("absolute top-2 left-6 w-2 h-2 rounded-full", isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]")} />
              <span className={cn("absolute top-2 right-6 w-2 h-2 rounded-full", isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]")} />
              <span className={cn("absolute bottom-2 left-6 w-2 h-2 rounded-full", isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]")} />
              <span className={cn("absolute bottom-2 right-6 w-2 h-2 rounded-full", isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]")} />
              <span className={cn("absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full", isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]")} />
              <span className={cn("absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full", isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]")} />

              {/* Core Text */}
              <span className={cn(
                "text-3xl font-black tracking-tight leading-none mb-1",
                isLightMode ? "text-[#111111]" : "text-white"
              )}>
                AI
              </span>
              <span className={cn("text-[10px] font-mono tracking-widest font-bold leading-tight", isLightMode ? "text-[#E50909]" : "text-[#950606]")}>
                LLM
              </span>
              <span className={cn(
                "text-[8.5px] font-mono tracking-widest font-semibold uppercase leading-tight",
                isLightMode ? "text-[#667085]" : "text-zinc-300"
              )}>
                ENGINEERING
              </span>
            </div>
          </div>

        </div>

        {/* Mobile / Tablet Responsive Fallback View (< lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden relative z-10">
          {/* AI Cluster */}
          <div className={cn(
            "relative rounded-[32px] p-6 border border-dashed backdrop-blur-md",
            isLightMode ? "border-black/15 bg-white/80" : "border-[#950606]/40 bg-[#070914]/40"
          )}>
            <div className={cn(
              "inline-flex items-center gap-2 px-3 py-0.5 rounded-full border mb-4",
              isLightMode ? "bg-white border-black/15 text-[#111111]" : "bg-[#070914] border-[#950606]/50 text-white"
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full", isLightMode ? "bg-[#E50909]" : "bg-[#950606]")} />
              <span className="font-mono text-[10px] font-bold uppercase">AI / LLM ENGINEERING</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[...AI_CLUSTER_LEFT, ...AI_CLUSTER_RIGHT].map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <item.icon className={cn("w-3 h-3 shrink-0", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                  <span className={cn("font-mono text-[11px]", isLightMode ? "text-[#343A40]" : "text-[#D1D5DB]")}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Data & Cloud Cluster */}
          <div className={cn(
            "relative rounded-[32px] p-6 border border-dashed backdrop-blur-md",
            isLightMode ? "border-black/15 bg-white/80" : "border-[#950606]/45 bg-[#070914]/40"
          )}>
            <div className={cn(
              "inline-flex items-center gap-2 px-3 py-0.5 rounded-full border mb-4",
              isLightMode ? "bg-white border-black/15 text-[#111111]" : "bg-[#070914] border-[#950606]/55 text-white"
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full", isLightMode ? "bg-[#E50909]" : "bg-[#950606]")} />
              <span className="font-mono text-[10px] font-bold uppercase">DATA & CLOUD</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[...DATA_CLUSTER_LEFT, ...DATA_CLUSTER_RIGHT].map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <item.icon className={cn("w-3 h-3 shrink-0", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                  <span className={cn("font-mono text-[11px]", isLightMode ? "text-[#343A40]" : "text-[#D1D5DB]")}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Cluster */}
          <div className={cn(
            "relative rounded-[32px] p-6 border border-dashed backdrop-blur-md",
            isLightMode ? "border-black/15 bg-white/80" : "border-[#950606]/40 bg-[#070914]/40"
          )}>
            <div className={cn(
              "inline-flex items-center gap-2 px-3 py-0.5 rounded-full border mb-4",
              isLightMode ? "bg-white border-black/15 text-[#111111]" : "bg-[#070914] border-[#950606]/50 text-white"
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full", isLightMode ? "bg-[#E50909]" : "bg-[#950606]")} />
              <span className="font-mono text-[10px] font-bold uppercase">BACKEND</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[...BACKEND_CLUSTER_LEFT, ...BACKEND_CLUSTER_RIGHT].map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <item.icon className={cn("w-3 h-3 shrink-0", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                  <span className={cn("font-mono text-[11px]", isLightMode ? "text-[#343A40]" : "text-[#D1D5DB]")}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Frontend Cluster */}
          <div className={cn(
            "relative rounded-[32px] p-6 border border-dashed backdrop-blur-md",
            isLightMode ? "border-black/15 bg-white/80" : "border-[#950606]/40 bg-[#070914]/40"
          )}>
            <div className={cn(
              "inline-flex items-center gap-2 px-3 py-0.5 rounded-full border mb-4",
              isLightMode ? "bg-white border-black/15 text-[#111111]" : "bg-[#070914] border-[#950606]/50 text-white"
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full", isLightMode ? "bg-[#E50909]" : "bg-[#950606]")} />
              <span className="font-mono text-[10px] font-bold uppercase">FRONTEND</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[...FRONTEND_CLUSTER_LEFT, ...FRONTEND_CLUSTER_RIGHT].map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <item.icon className={cn("w-3 h-3 shrink-0", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                  <span className={cn("font-mono text-[11px]", isLightMode ? "text-[#343A40]" : "text-[#D1D5DB]")}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
