"use client";

import { useState, useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import {
  Database,
  FileText,
  Code2,
  Box,
  UserCheck,
  Cpu,
  Sparkles,
} from "lucide-react";

type NodeId = "memory" | "rag" | "api" | "tools" | "agents" | "core";

interface NodeItem {
  id: NodeId;
  title: string;
  subtitle?: string;
  description: string;
  icon: typeof Database;
}

const NODES_DATA: Record<Exclude<NodeId, "core">, NodeItem> = {
  memory: {
    id: "memory",
    title: "MEMORY",
    description: "Long-term & short-term memory storage for context and learning.",
    icon: Database,
  },
  rag: {
    id: "rag",
    title: "RAG ENGINE",
    description: "Retrieval augmented generation for accurate, relevant and context-aware responses.",
    icon: FileText,
  },
  api: {
    id: "api",
    title: "API LAYER",
    description: "Robust APIs to connect services, applications and external systems.",
    icon: Code2,
  },
  tools: {
    id: "tools",
    title: "TOOLS",
    description: "Integrated tools & functions to extend capabilities and execute real-world actions.",
    icon: Box,
  },
  agents: {
    id: "agents",
    title: "AGENTS",
    description: "Autonomous agents that plan, reason and take action to solve complex problems.",
    icon: UserCheck,
  },
};

export default function HeroAiArchitecture() {
  const { isLightMode } = useTheme();
  const [hoveredNode, setHoveredNode] = useState<NodeId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredNode(null);
  };

  const isCoreHovered = hoveredNode === "core";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex flex-col items-center justify-center select-none py-2"
    >
      {/* ── Luminous Silver-Purple Ambient Nebula Glow ── */}
      <div
        className={cn(
          "absolute w-[440px] h-[440px] rounded-full blur-[85px] pointer-events-none transition-all duration-700 -z-10",
          isLightMode
            ? "bg-gradient-to-tr from-purple-200/40 via-slate-100/50 to-violet-200/40 opacity-70"
            : "bg-gradient-to-tr from-violet-600/[0.14] via-slate-300/[0.1] to-purple-500/[0.12] opacity-85",
          isCoreHovered ? "scale-115 opacity-100 blur-[95px]" : "scale-100"
        )}
      />

      {/* ── 1. Desktop & Tablet Spatial Canvas ── */}
      <div
        className="hidden sm:block relative w-[620px] h-[520px] scale-[0.78] md:scale-[0.88] lg:scale-100 origin-center transition-transform duration-300 ease-out"
        style={{
          perspective: 1200,
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── SVG Connection Network with Soft Purple & Silver Shimmer ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 620 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="silver-purple-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="35%" stopColor="#C084FC" />
              <stop offset="60%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="silver-purple-grad-right" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="35%" stopColor="#A855F7" />
              <stop offset="60%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="silver-purple-grad-agents" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="40%" stopColor="#D8B4FE" />
              <stop offset="70%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            {/* Silver-Purple Glow Filter */}
            <filter id="silver-line-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur1" />
              <feGaussianBlur stdDeviation="1.2" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Bright Silver-Purple Photon Glow */}
            <filter id="photon-silver-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Path: MEMORY -> AI CORE */}
          <path
            d="M 170 95 C 195 95, 175 185, 195 185"
            stroke="url(#silver-purple-grad-left)"
            strokeWidth={hoveredNode === "memory" || isCoreHovered ? 2.2 : 1.4}
            opacity={hoveredNode === "memory" || isCoreHovered ? 1 : isLightMode ? 0.65 : 0.48}
            filter="url(#silver-line-glow)"
            className="transition-all duration-300"
          />

          {/* 2. Path: AI CORE -> RAG ENGINE */}
          <path
            d="M 450 95 C 425 95, 445 185, 425 185"
            stroke="url(#silver-purple-grad-right)"
            strokeWidth={hoveredNode === "rag" || isCoreHovered ? 2.2 : 1.4}
            opacity={hoveredNode === "rag" || isCoreHovered ? 1 : isLightMode ? 0.65 : 0.48}
            filter="url(#silver-line-glow)"
            className="transition-all duration-300"
          />

          {/* 3. Path: API LAYER -> AI CORE */}
          <path
            d="M 170 335 C 195 335, 175 265, 195 265"
            stroke="url(#silver-purple-grad-left)"
            strokeWidth={hoveredNode === "api" || isCoreHovered ? 2.2 : 1.4}
            opacity={hoveredNode === "api" || isCoreHovered ? 1 : isLightMode ? 0.65 : 0.48}
            filter="url(#silver-line-glow)"
            className="transition-all duration-300"
          />

          {/* 4. Path: AI CORE -> TOOLS */}
          <path
            d="M 450 335 C 425 335, 445 265, 425 265"
            stroke="url(#silver-purple-grad-right)"
            strokeWidth={hoveredNode === "tools" || isCoreHovered ? 2.2 : 1.4}
            opacity={hoveredNode === "tools" || isCoreHovered ? 1 : isLightMode ? 0.65 : 0.48}
            filter="url(#silver-line-glow)"
            className="transition-all duration-300"
          />

          {/* 5. Path: AI CORE -> AGENTS */}
          <path
            d="M 310 345 L 310 405"
            stroke="url(#silver-purple-grad-agents)"
            strokeWidth={hoveredNode === "agents" || isCoreHovered ? 2.2 : 1.4}
            opacity={hoveredNode === "agents" || isCoreHovered ? 1 : isLightMode ? 0.65 : 0.48}
            filter="url(#silver-line-glow)"
            className="transition-all duration-300"
          />

          {/* ── Traveling Light Data Photons (Luminous Silver-White with Lavender Aura) ── */}
          <circle r={hoveredNode === "memory" ? "3" : "2.2"} fill="#FFFFFF" filter="url(#photon-silver-glow)">
            <animateMotion
              dur={hoveredNode === "memory" ? "1.6s" : "2.8s"}
              repeatCount="indefinite"
              path="M 170 95 C 195 95, 175 185, 195 185"
            />
          </circle>

          <circle r={hoveredNode === "rag" ? "3" : "2.2"} fill="#FFFFFF" filter="url(#photon-silver-glow)">
            <animateMotion
              dur={hoveredNode === "rag" ? "1.6s" : "3.0s"}
              repeatCount="indefinite"
              path="M 425 185 C 445 185, 425 95, 450 95"
            />
          </circle>

          <circle r={hoveredNode === "api" ? "3" : "2.2"} fill="#FFFFFF" filter="url(#photon-silver-glow)">
            <animateMotion
              dur={hoveredNode === "api" ? "1.6s" : "2.9s"}
              repeatCount="indefinite"
              path="M 170 335 C 195 335, 175 265, 195 265"
            />
          </circle>

          <circle r={hoveredNode === "tools" ? "3" : "2.2"} fill="#FFFFFF" filter="url(#photon-silver-glow)">
            <animateMotion
              dur={hoveredNode === "tools" ? "1.6s" : "3.1s"}
              repeatCount="indefinite"
              path="M 425 265 C 445 265, 425 335, 450 335"
            />
          </circle>

          <circle r={hoveredNode === "agents" ? "3" : "2.2"} fill="#FFFFFF" filter="url(#photon-silver-glow)">
            <animateMotion
              dur={hoveredNode === "agents" ? "1.5s" : "2.6s"}
              repeatCount="indefinite"
              path="M 310 345 L 310 405"
            />
          </circle>
        </svg>

        {/* ── 1. Top-Left: MEMORY Card ── */}
        <div
          className="absolute top-[25px] left-[15px] z-20 w-[155px]"
          onMouseEnter={() => setHoveredNode("memory")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <HighQualityCard
            node={NODES_DATA.memory}
            isHovered={hoveredNode === "memory"}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
          />
        </div>

        {/* ── 2. Top-Right: RAG ENGINE Card ── */}
        <div
          className="absolute top-[25px] right-[15px] z-20 w-[155px]"
          onMouseEnter={() => setHoveredNode("rag")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <HighQualityCard
            node={NODES_DATA.rag}
            isHovered={hoveredNode === "rag"}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
          />
        </div>

        {/* ── 3. Central AI CORE Card (Deep Silver-Purple Frosted Glassmorphism) ── */}
        <div
          className="absolute top-[115px] z-30 w-[230px]"
          style={{
            left: "calc(50% - 115px)",
            transform: "translateZ(28px)",
          }}
          onMouseEnter={() => setHoveredNode("core")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div
            className={cn(
              "w-full rounded-3xl p-5 transition-all duration-300 cursor-pointer text-center relative overflow-hidden flex flex-col items-center backdrop-blur-2xl backdrop-saturate-150 group",
              isLightMode
                ? "bg-gradient-to-b from-white/90 via-purple-50/40 to-white/90 border border-purple-200/80 shadow-[0_0_25px_rgba(192,132,252,0.35),0_12px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:border-purple-300 hover:shadow-[0_0_40px_rgba(192,132,252,0.55),0_16px_40px_rgba(0,0,0,0.12)]"
                : "bg-gradient-to-b from-[#1a1728]/85 via-[#12111d]/90 to-[#0a0d14]/90 border border-white/30 hover:border-purple-300/60 shadow-[0_0_35px_rgba(168,85,247,0.28),0_0_70px_rgba(255,255,255,0.2),0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.5),inset_0_0_16px_rgba(168,85,247,0.08)] hover:shadow-[0_0_55px_rgba(192,132,252,0.45),0_0_95px_rgba(255,255,255,0.35),0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.85)]",
              isCoreHovered ? "scale-[1.03] -translate-y-1" : "scale-100"
            )}
          >
            {/* Top Crisp Specular Silver Rim Light */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

            {/* Corner Glass Ambient Soft Purple Sheen */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-purple-500/[0.1] rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-violet-500/[0.08] rounded-full blur-xl pointer-events-none" />

            {/* Core Neural Icon Housing with Liquid Silver-Purple Halo Rings */}
            <div className="relative w-14 h-14 mb-2.5 flex items-center justify-center">
              {/* Outer Glowing Silver Orbitals */}
              <div className="absolute inset-0 rounded-full border border-white/40 shadow-[0_0_12px_rgba(192,132,252,0.4)] animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-1 rounded-full border border-dashed border-purple-300/30 animate-[spin_25s_linear_infinite_reverse]" />

              {/* Core Icon Badge */}
              <div
                className={cn(
                  "relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-all duration-300",
                  isLightMode
                    ? "bg-gradient-to-b from-white to-purple-50 border-purple-200 text-slate-800 shadow-[0_0_15px_rgba(192,132,252,0.4),inset_0_1px_1px_rgba(255,255,255,1)]"
                    : "bg-gradient-to-b from-white/[0.24] via-purple-500/[0.1] to-white/[0.06] border-white/40 text-white shadow-[0_0_20px_rgba(192,132,252,0.35),inset_0_1px_2px_rgba(255,255,255,0.6)]"
                )}
              >
                <Cpu className="w-5 h-5 text-white animate-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <Sparkles className="w-2.5 h-2.5 text-purple-200 absolute -top-0.5 -right-0.5 drop-shadow-[0_0_5px_rgba(216,180,254,0.9)]" />
              </div>
            </div>

            {/* AI CORE Typography with Silver & Subtle Soft Purple Sheen */}
            <h3
              className={cn(
                "text-base sm:text-lg font-bold font-display tracking-tight mb-0.5",
                isLightMode
                  ? "text-slate-900"
                  : "text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-purple-200 drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
              )}
            >
              AI CORE
            </h3>
            <div
              className={cn(
                "text-[9px] font-mono font-bold tracking-widest uppercase mb-1.5",
                isLightMode
                  ? "text-purple-600"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200 drop-shadow-[0_0_6px_rgba(192,132,252,0.5)]"
              )}
            >
              LLM ORCHESTRATION
            </div>
            <p className={cn("text-[10.5px] leading-snug font-sans max-w-[190px]", isLightMode ? "text-slate-600" : "text-slate-300/90")}>
              Central intelligence layer that connects memory, knowledge, tools and agents.
            </p>
          </div>
        </div>

        {/* ── 4. Bottom-Left: API LAYER Card ── */}
        <div
          className="absolute top-[265px] left-[15px] z-20 w-[155px]"
          onMouseEnter={() => setHoveredNode("api")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <HighQualityCard
            node={NODES_DATA.api}
            isHovered={hoveredNode === "api"}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
          />
        </div>

        {/* ── 5. Bottom-Right: TOOLS Card ── */}
        <div
          className="absolute top-[265px] right-[15px] z-20 w-[155px]"
          onMouseEnter={() => setHoveredNode("tools")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <HighQualityCard
            node={NODES_DATA.tools}
            isHovered={hoveredNode === "tools"}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
          />
        </div>

        {/* ── 6. Bottom-Center: AGENTS Card ── */}
        <div
          className="absolute top-[405px] z-20 w-[210px]"
          style={{
            left: "calc(50% - 105px)",
          }}
          onMouseEnter={() => setHoveredNode("agents")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <HighQualityCard
            node={NODES_DATA.agents}
            isHovered={hoveredNode === "agents"}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
            isCenter
          />
        </div>
      </div>

      {/* ── 2. Mobile Native Architecture Flow (< sm: 640px) ── */}
      <div className="sm:hidden w-full px-3 flex flex-col items-center gap-2.5">
        {/* Mobile AI Core */}
        <div
          className={cn(
            "w-full max-w-[320px] rounded-2xl p-4 border text-center flex flex-col items-center relative overflow-hidden backdrop-blur-2xl backdrop-saturate-150",
            isLightMode
              ? "bg-white/90 border-purple-200 shadow-[0_0_20px_rgba(192,132,252,0.3),0_6px_20px_rgba(0,0,0,0.06)]"
              : "bg-gradient-to-b from-[#1a1728]/90 to-[#0a0d14]/90 border-white/30 shadow-[0_0_25px_rgba(168,85,247,0.25),0_8px_24px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.4)]"
          )}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 border backdrop-blur-md",
              isLightMode
                ? "bg-white border-purple-200 text-slate-800"
                : "bg-white/[0.16] border-white/30 text-white shadow-[0_0_12px_rgba(192,132,252,0.25)]"
            )}
          >
            <Cpu className="w-5 h-5 text-white animate-pulse" />
          </div>
          <h3
            className={cn(
              "text-sm font-bold font-display tracking-tight",
              isLightMode
                ? "text-slate-900"
                : "text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200"
            )}
          >
            AI CORE
          </h3>
          <div className="text-[8.5px] font-mono font-bold tracking-widest text-purple-300 uppercase mb-1">
            LLM ORCHESTRATION
          </div>
          <p className={cn("text-[9.5px] leading-relaxed font-sans", isLightMode ? "text-slate-600" : "text-slate-300")}>
            Central intelligence layer connecting memory, knowledge, tools and agents.
          </p>
        </div>

        {/* Silver-Purple Pulse Connector */}
        <div className="w-[1.5px] h-3 bg-gradient-to-b from-purple-300/80 via-white/60 to-purple-400/20 rounded-full shadow-[0_0_6px_rgba(192,132,252,0.4)]" />

        {/* 2-Col Grid: Memory & RAG */}
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-[340px]">
          <MobileHighQualityCard node={NODES_DATA.memory} isLightMode={isLightMode} />
          <MobileHighQualityCard node={NODES_DATA.rag} isLightMode={isLightMode} />
        </div>

        {/* Silver-Purple Pulse Connector */}
        <div className="w-[1.5px] h-3 bg-gradient-to-b from-purple-300/80 via-white/60 to-purple-400/20 rounded-full shadow-[0_0_6px_rgba(192,132,252,0.4)]" />

        {/* 2-Col Grid: API & Tools */}
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-[340px]">
          <MobileHighQualityCard node={NODES_DATA.api} isLightMode={isLightMode} />
          <MobileHighQualityCard node={NODES_DATA.tools} isLightMode={isLightMode} />
        </div>

        {/* Silver-Purple Pulse Connector */}
        <div className="w-[1.5px] h-3 bg-gradient-to-b from-purple-300/80 via-white/60 to-purple-400/20 rounded-full shadow-[0_0_6px_rgba(192,132,252,0.4)]" />

        {/* Agents Card */}
        <div className="w-full max-w-[320px]">
          <MobileHighQualityCard node={NODES_DATA.agents} isLightMode={isLightMode} isFull />
        </div>
      </div>
    </div>
  );
}

function HighQualityCard({
  node,
  isHovered,
  isCoreHovered,
  isLightMode,
  isCenter = false,
}: {
  node: NodeItem;
  isHovered: boolean;
  isCoreHovered: boolean;
  isLightMode: boolean;
  isCenter?: boolean;
}) {
  const Icon = node.icon;
  return (
    <div
      className={cn(
        "rounded-2xl p-3.5 transition-all duration-300 cursor-pointer relative flex flex-col items-center text-center w-full overflow-hidden backdrop-blur-2xl backdrop-saturate-150 group",
        isLightMode
          ? "bg-gradient-to-b from-white/90 via-purple-50/30 to-white/90 border border-purple-200/70 shadow-[0_0_18px_rgba(192,132,252,0.25),0_6px_20px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)]"
          : "bg-gradient-to-b from-[#191726]/80 via-[#12111d]/85 to-[#0a0d14]/85 border border-white/20 shadow-[0_0_22px_rgba(168,85,247,0.18),0_0_45px_rgba(203,213,225,0.12),0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_0_12px_rgba(168,85,247,0.04)]",
        isHovered
          ? isLightMode
            ? "border-purple-300 shadow-[0_0_28px_rgba(192,132,252,0.45),0_10px_28px_rgba(0,0,0,0.1)] -translate-y-1 scale-[1.02]"
            : "border-purple-200/60 shadow-[0_0_32px_rgba(192,132,252,0.35),0_0_65px_rgba(255,255,255,0.3),0_12px_32px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.55)] -translate-y-1 scale-[1.02]"
          : isCoreHovered
          ? isLightMode
            ? "border-purple-300/80 shadow-[0_0_22px_rgba(192,132,252,0.35)]"
            : "border-purple-300/40 shadow-[0_0_25px_rgba(192,132,252,0.25)]"
          : ""
      )}
    >
      {/* Top Specular Silver Rim Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />

      {/* Subtle Corner Glass Sheen with Soft Purple Hue */}
      <div className="absolute -top-6 -right-6 w-16 h-16 bg-purple-500/[0.08] rounded-full blur-md pointer-events-none" />

      <div
        className={cn(
          "w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 border transition-all duration-300 backdrop-blur-md",
          isLightMode
            ? "bg-purple-50/80 border-purple-200 text-slate-800 shadow-sm"
            : "bg-gradient-to-b from-white/[0.2] via-purple-500/[0.08] to-white/[0.04] border-white/30 text-white shadow-[0_0_12px_rgba(192,132,252,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)]",
          isHovered ? "scale-110 border-purple-300/60 shadow-[0_0_18px_rgba(192,132,252,0.4)]" : ""
        )}
      >
        <Icon className="w-4 h-4 text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]" />
      </div>
      <h4
        className={cn(
          "text-[11px] font-bold font-mono tracking-wider mb-0.5 uppercase",
          isLightMode
            ? "text-slate-900"
            : "text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
        )}
      >
        {node.title}
      </h4>
      <p className={cn("text-[10px] leading-snug font-sans", isLightMode ? "text-slate-600" : "text-slate-300/90")}>
        {node.description}
      </p>
    </div>
  );
}

function MobileHighQualityCard({
  node,
  isLightMode,
  isFull = false,
}: {
  node: NodeItem;
  isLightMode: boolean;
  isFull?: boolean;
}) {
  const Icon = node.icon;
  return (
    <div
      className={cn(
        "rounded-xl p-2.5 border transition-all flex flex-col items-center text-center relative overflow-hidden backdrop-blur-2xl backdrop-saturate-150",
        isLightMode
          ? "bg-white/90 border-purple-200 shadow-[0_0_14px_rgba(192,132,252,0.2)]"
          : "bg-gradient-to-b from-[#191726]/85 to-[#0a0d14]/85 border-white/25 shadow-[0_0_18px_rgba(168,85,247,0.15),0_6px_18px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
      <div
        className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center mb-1 border shrink-0 backdrop-blur-md",
          isLightMode
            ? "bg-purple-50 border-purple-200 text-slate-800"
            : "bg-white/[0.16] border-white/30 text-white shadow-[0_0_8px_rgba(192,132,252,0.2)]"
        )}
      >
        <Icon className="w-3.5 h-3.5 text-white" />
      </div>
      <h4
        className={cn(
          "text-[10px] font-bold font-mono tracking-wide uppercase mb-0.5",
          isLightMode ? "text-slate-900" : "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
        )}
      >
        {node.title}
      </h4>
      <p className={cn("text-[9px] leading-tight font-sans", isLightMode ? "text-slate-600" : "text-slate-300")}>
        {node.description}
      </p>
    </div>
  );
}
