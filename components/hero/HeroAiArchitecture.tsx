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
      {/* ── Toned-Down Subtle Atmospheric Ambient Glow (Silver-Violet) ── */}
      <div
        className={cn(
          "absolute w-[380px] h-[380px] rounded-full blur-[60px] pointer-events-none transition-all duration-700 -z-10",
          isLightMode
            ? "bg-gradient-to-tr from-slate-200/40 via-violet-100/30 to-slate-200/40 opacity-60"
            : "bg-gradient-to-tr from-slate-800/15 via-violet-900/20 to-slate-800/15 opacity-70",
          isCoreHovered ? "scale-110 opacity-85" : "scale-100"
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
        {/* ── SVG Connection Network with Crisp Silver-Gloss Lines ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 620 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="silver-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="silver-grad-right" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="silver-grad-agents" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="50%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            <filter id="crisp-line-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Path: MEMORY -> AI CORE */}
          <path
            d="M 170 95 C 195 95, 175 185, 195 185"
            stroke="url(#silver-grad-left)"
            strokeWidth={hoveredNode === "memory" || isCoreHovered ? 1.8 : 1.2}
            opacity={hoveredNode === "memory" || isCoreHovered ? 0.95 : isLightMode ? 0.55 : 0.4}
            filter="url(#crisp-line-glow)"
            className="transition-all duration-300"
          />

          {/* 2. Path: AI CORE -> RAG ENGINE */}
          <path
            d="M 450 95 C 425 95, 445 185, 425 185"
            stroke="url(#silver-grad-right)"
            strokeWidth={hoveredNode === "rag" || isCoreHovered ? 1.8 : 1.2}
            opacity={hoveredNode === "rag" || isCoreHovered ? 0.95 : isLightMode ? 0.55 : 0.4}
            filter="url(#crisp-line-glow)"
            className="transition-all duration-300"
          />

          {/* 3. Path: API LAYER -> AI CORE */}
          <path
            d="M 170 335 C 195 335, 175 265, 195 265"
            stroke="url(#silver-grad-left)"
            strokeWidth={hoveredNode === "api" || isCoreHovered ? 1.8 : 1.2}
            opacity={hoveredNode === "api" || isCoreHovered ? 0.95 : isLightMode ? 0.55 : 0.4}
            filter="url(#crisp-line-glow)"
            className="transition-all duration-300"
          />

          {/* 4. Path: AI CORE -> TOOLS */}
          <path
            d="M 450 335 C 425 335, 445 265, 425 265"
            stroke="url(#silver-grad-right)"
            strokeWidth={hoveredNode === "tools" || isCoreHovered ? 1.8 : 1.2}
            opacity={hoveredNode === "tools" || isCoreHovered ? 0.95 : isLightMode ? 0.55 : 0.4}
            filter="url(#crisp-line-glow)"
            className="transition-all duration-300"
          />

          {/* 5. Path: AI CORE -> AGENTS */}
          <path
            d="M 310 345 L 310 405"
            stroke="url(#silver-grad-agents)"
            strokeWidth={hoveredNode === "agents" || isCoreHovered ? 1.8 : 1.2}
            opacity={hoveredNode === "agents" || isCoreHovered ? 0.95 : isLightMode ? 0.55 : 0.4}
            filter="url(#crisp-line-glow)"
            className="transition-all duration-300"
          />

          {/* ── Traveling Light Data Photons (Crisp Silver-Violet) ── */}
          <circle r={hoveredNode === "memory" ? "2.5" : "2"} fill="#F1F5F9" filter="url(#crisp-line-glow)">
            <animateMotion
              dur={hoveredNode === "memory" ? "1.6s" : "2.8s"}
              repeatCount="indefinite"
              path="M 170 95 C 195 95, 175 185, 195 185"
            />
          </circle>

          <circle r={hoveredNode === "rag" ? "2.5" : "2"} fill="#F1F5F9" filter="url(#crisp-line-glow)">
            <animateMotion
              dur={hoveredNode === "rag" ? "1.6s" : "3.0s"}
              repeatCount="indefinite"
              path="M 425 185 C 445 185, 425 95, 450 95"
            />
          </circle>

          <circle r={hoveredNode === "api" ? "2.5" : "2"} fill="#F1F5F9" filter="url(#crisp-line-glow)">
            <animateMotion
              dur={hoveredNode === "api" ? "1.6s" : "2.9s"}
              repeatCount="indefinite"
              path="M 170 335 C 195 335, 175 265, 195 265"
            />
          </circle>

          <circle r={hoveredNode === "tools" ? "2.5" : "2"} fill="#F1F5F9" filter="url(#crisp-line-glow)">
            <animateMotion
              dur={hoveredNode === "tools" ? "1.6s" : "3.1s"}
              repeatCount="indefinite"
              path="M 425 265 C 445 265, 425 335, 450 335"
            />
          </circle>

          <circle r={hoveredNode === "agents" ? "2.5" : "2"} fill="#F1F5F9" filter="url(#crisp-line-glow)">
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

        {/* ── 3. Central AI CORE Card (High-Quality Silver Gloss) ── */}
        <div
          className="absolute top-[115px] z-30 w-[230px]"
          style={{
            left: "calc(50% - 115px)",
            transform: "translateZ(26px)",
          }}
          onMouseEnter={() => setHoveredNode("core")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div
            className={cn(
              "w-full rounded-3xl p-5 transition-all duration-300 cursor-pointer text-center relative overflow-hidden flex flex-col items-center",
              isLightMode
                ? "bg-white/95 border border-violet-400/60 shadow-[0_0_20px_rgba(139,92,246,0.2),0_12px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] hover:border-violet-500"
                : "bg-gradient-to-b from-[#161822]/95 to-[#0e1017]/95 border border-violet-500/50 shadow-[0_0_25px_rgba(168,85,247,0.32),0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-violet-400 hover:shadow-[0_0_38px_rgba(168,85,247,0.5),0_20px_50px_rgba(0,0,0,0.8)]",
              isCoreHovered ? "scale-[1.02] -translate-y-1" : "scale-100"
            )}
          >
            {/* Crisp Top Rim Light */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Core Neural Icon Housing with Silver-Gloss Ring */}
            <div className="relative w-14 h-14 mb-2.5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-1 rounded-full border border-dashed border-white/15 animate-[spin_25s_linear_infinite_reverse]" />

              <div
                className={cn(
                  "relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center border transition-all",
                  isLightMode
                    ? "bg-slate-100 border-slate-300 text-slate-800 shadow-sm"
                    : "bg-gradient-to-b from-white/[0.1] to-white/[0.04] border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                )}
              >
                <Cpu className="w-5 h-5 text-slate-100 animate-pulse" />
                <Sparkles className="w-2.5 h-2.5 text-violet-300 absolute -top-0.5 -right-0.5" />
              </div>
            </div>

            <h3 className={cn("text-base sm:text-lg font-bold font-display tracking-tight mb-0.5", isLightMode ? "text-slate-900" : "text-white")}>
              AI CORE
            </h3>
            <div className="text-[9px] font-mono font-semibold tracking-widest text-violet-400 dark:text-slate-300 uppercase mb-1.5">
              LLM ORCHESTRATION
            </div>
            <p className={cn("text-[10.5px] leading-snug font-sans max-w-[190px]", isLightMode ? "text-slate-600" : "text-slate-300")}>
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
            "w-full max-w-[320px] rounded-2xl p-4 border text-center flex flex-col items-center shadow-lg relative overflow-hidden",
            isLightMode
              ? "bg-white/95 border-slate-300"
              : "bg-gradient-to-b from-[#161822]/95 to-[#0e1017]/95 border-white/[0.15] shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
          )}
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 bg-white/[0.08] border border-white/20">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <h3 className={cn("text-sm font-bold font-display tracking-tight", isLightMode ? "text-slate-900" : "text-white")}>
            AI CORE
          </h3>
          <div className="text-[8.5px] font-mono font-semibold tracking-widest text-slate-300 uppercase mb-1">
            LLM ORCHESTRATION
          </div>
          <p className={cn("text-[9.5px] leading-relaxed font-sans", isLightMode ? "text-slate-600" : "text-slate-300")}>
            Central intelligence layer connecting memory, knowledge, tools and agents.
          </p>
        </div>

        {/* Pulse Connector */}
        <div className="w-[1px] h-3 bg-gradient-to-b from-white/40 to-white/10 rounded-full" />

        {/* 2-Col Grid: Memory & RAG */}
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-[340px]">
          <MobileHighQualityCard node={NODES_DATA.memory} isLightMode={isLightMode} />
          <MobileHighQualityCard node={NODES_DATA.rag} isLightMode={isLightMode} />
        </div>

        {/* Pulse Connector */}
        <div className="w-[1px] h-3 bg-gradient-to-b from-white/40 to-white/10 rounded-full" />

        {/* 2-Col Grid: API & Tools */}
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-[340px]">
          <MobileHighQualityCard node={NODES_DATA.api} isLightMode={isLightMode} />
          <MobileHighQualityCard node={NODES_DATA.tools} isLightMode={isLightMode} />
        </div>

        {/* Pulse Connector */}
        <div className="w-[1px] h-3 bg-gradient-to-b from-white/40 to-white/10 rounded-full" />

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
        "rounded-2xl p-3.5 transition-all duration-300 cursor-pointer relative flex flex-col items-center text-center w-full overflow-hidden",
        isLightMode
          ? "bg-white/95 border border-violet-300/60 shadow-[0_0_15px_rgba(139,92,246,0.12),0_6px_20px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]"
          : "bg-gradient-to-b from-[#141620]/95 to-[#0b0c13]/95 border border-violet-500/35 shadow-[0_0_18px_rgba(168,85,247,0.22),0_8px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.14)]",
        isHovered
          ? isLightMode
            ? "border-violet-400 shadow-[0_0_24px_rgba(139,92,246,0.25),0_8px_24px_rgba(0,0,0,0.12)] -translate-y-1 scale-[1.02]"
            : "border-violet-400/80 shadow-[0_0_28px_rgba(168,85,247,0.45),0_10px_30px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.22)] -translate-y-1 scale-[1.02]"
          : isCoreHovered
          ? isLightMode
            ? "border-violet-400/80 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
            : "border-violet-400/60 shadow-[0_0_22px_rgba(168,85,247,0.35)]"
          : ""
      )}
    >
      {/* Top Subtle Silver Highlight Rim */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      <div
        className={cn(
          "w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 border transition-transform duration-300",
          isLightMode
            ? "bg-slate-100 border-slate-300 text-slate-800"
            : "bg-white/[0.06] border-white/15 text-slate-200",
          isHovered ? "scale-110" : ""
        )}
      >
        <Icon className="w-4 h-4" />
      </div>
      <h4 className={cn("text-[11px] font-bold font-mono tracking-wider mb-0.5 uppercase", isLightMode ? "text-slate-900" : "text-white")}>
        {node.title}
      </h4>
      <p className={cn("text-[10px] leading-snug font-sans", isLightMode ? "text-slate-600" : "text-slate-300")}>
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
        "rounded-xl p-2.5 border transition-all flex flex-col items-center text-center relative overflow-hidden",
        isLightMode
          ? "bg-white/95 border-violet-300/60 shadow-[0_0_12px_rgba(139,92,246,0.1)]"
          : "bg-gradient-to-b from-[#141620]/95 to-[#0b0c13]/95 border-violet-500/35 shadow-[0_0_14px_rgba(168,85,247,0.2)]"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <div
        className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center mb-1 border shrink-0",
          isLightMode
            ? "bg-slate-100 border-slate-300 text-slate-800"
            : "bg-white/[0.06] border-white/15 text-slate-200"
        )}
      >
        <Icon className="w-3.5 h-3.5" />
      </div>
      <h4 className={cn("text-[10px] font-bold font-mono tracking-wide uppercase mb-0.5", isLightMode ? "text-slate-900" : "text-white")}>
        {node.title}
      </h4>
      <p className={cn("text-[9px] leading-tight font-sans", isLightMode ? "text-slate-600" : "text-slate-300")}>
        {node.description}
      </p>
    </div>
  );
}
