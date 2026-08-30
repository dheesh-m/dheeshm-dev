"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import {
  Database,
  FileText,
  Code2,
  Box,
  UserCheck,
  Cpu,
  ShieldCheck,
  Zap,
  Lock,
  Cloud,
  Sparkles,
} from "lucide-react";

type ArchitectureNodeId = "memory" | "rag" | "api" | "tools" | "agents" | "core";

interface NodeData {
  id: ArchitectureNodeId;
  title: string;
  subtitle?: string;
  description: string;
  icon: typeof Database;
  accentColor: string;
  glowColor: string;
  borderColor: string;
}

const ARCHITECTURE_NODES: Record<Exclude<ArchitectureNodeId, "core">, NodeData> = {
  memory: {
    id: "memory",
    title: "MEMORY",
    description: "Long-term & short-term memory storage for context and learning.",
    icon: Database,
    accentColor: "from-purple-200 to-white",
    glowColor: "rgba(192, 132, 252, 0.3)",
    borderColor: "rgba(192, 132, 252, 0.35)",
  },
  rag: {
    id: "rag",
    title: "RAG ENGINE",
    description: "Retrieval augmented generation for accurate, relevant and context-aware responses.",
    icon: FileText,
    accentColor: "from-purple-200 to-white",
    glowColor: "rgba(192, 132, 252, 0.3)",
    borderColor: "rgba(192, 132, 252, 0.35)",
  },
  api: {
    id: "api",
    title: "API LAYER",
    description: "Robust APIs to connect services, applications and external systems.",
    icon: Code2,
    accentColor: "from-purple-200 to-white",
    glowColor: "rgba(192, 132, 252, 0.3)",
    borderColor: "rgba(192, 132, 252, 0.35)",
  },
  tools: {
    id: "tools",
    title: "TOOLS",
    description: "Integrated tools & functions to extend capabilities and execute real-world actions.",
    icon: Box,
    accentColor: "from-purple-200 to-white",
    glowColor: "rgba(192, 132, 252, 0.3)",
    borderColor: "rgba(192, 132, 252, 0.35)",
  },
  agents: {
    id: "agents",
    title: "AGENTS",
    description: "Autonomous agents that plan, reason and take action to solve complex problems.",
    icon: UserCheck,
    accentColor: "from-purple-200 to-white",
    glowColor: "rgba(192, 132, 252, 0.3)",
    borderColor: "rgba(192, 132, 252, 0.35)",
  },
};

const CAPABILITIES = [
  {
    icon: ShieldCheck,
    title: "Scalable",
    description: "Built to grow",
  },
  {
    icon: Zap,
    title: "Real-time",
    description: "Low latency",
  },
  {
    icon: Lock,
    title: "Secure",
    description: "Enterprise grade",
  },
  {
    icon: Cloud,
    title: "Production Ready",
    description: "Cloud native",
  },
];

export default function AiSystemArchitecture() {
  const { isLightMode } = useTheme();
  const [hoveredNode, setHoveredNode] = useState<ArchitectureNodeId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // 3D Spatial Tilt state on mouse movement
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
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
      className="relative w-full min-h-[700px] flex flex-col items-center justify-center select-none py-12 px-4 sm:px-6 overflow-hidden"
    >
      {/* ── Luminous Silver-Purple Ambient Nebula Glow ── */}
      <div
        className={cn(
          "absolute w-[520px] h-[520px] rounded-full blur-[90px] pointer-events-none transition-all duration-700 -z-10",
          isLightMode
            ? "bg-gradient-to-tr from-purple-200/40 via-slate-100/50 to-violet-200/40 opacity-70"
            : "bg-gradient-to-tr from-violet-600/[0.14] via-slate-300/[0.1] to-purple-500/[0.12] opacity-85",
          isCoreHovered ? "scale-120 opacity-100 blur-[100px]" : "scale-100"
        )}
      />

      {/* ── 1. Header Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center mb-10 md:mb-14 z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-300/30 bg-purple-500/[0.08] backdrop-blur-md text-[11px] font-mono font-semibold tracking-wider text-purple-200 mb-3 shadow-[0_0_12px_rgba(192,132,252,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          ENTERPRISE ARCHITECTURE
        </div>
        <h2
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight mb-3",
            isLightMode
              ? "text-slate-900"
              : "text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-purple-200 drop-shadow-[0_0_15px_rgba(192,132,252,0.25)]"
          )}
        >
          AI System Ecosystem
        </h2>
        <p
          className={cn(
            "text-sm sm:text-base max-w-xl font-sans",
            isLightMode ? "text-slate-600" : "text-slate-400"
          )}
        >
          Full-stack autonomous intelligence stack powered by real-time RAG, memory persistence, dynamic tools and multi-agent coordination.
        </p>
      </motion.div>

      {/* ── 2. Spatial 3D Desktop & Tablet Interactive Canvas ── */}
      <div
        className="hidden lg:block relative w-[1100px] h-[580px] origin-center transition-transform duration-300 ease-out"
        style={{
          perspective: 1200,
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── SVG Connection Network with Pure Glowing Silver Paths ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 1100 580"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sys-silver-purple-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="35%" stopColor="#C084FC" />
              <stop offset="60%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="sys-silver-purple-grad-right" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="35%" stopColor="#A855F7" />
              <stop offset="60%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="sys-silver-purple-grad-agents" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="40%" stopColor="#D8B4FE" />
              <stop offset="70%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            {/* Silver-Purple Glow Filter */}
            <filter id="sys-silver-line-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur1" />
              <feGaussianBlur stdDeviation="1.2" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Bright Silver Photon Glow */}
            <filter id="sys-photon-silver-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Path: MEMORY -> AI CORE */}
          <path
            id="path-memory"
            d="M 290 125 C 340 125, 340 180, 390 180"
            stroke="url(#sys-silver-purple-grad-left)"
            strokeWidth={hoveredNode === "memory" || isCoreHovered ? 2.5 : 1.5}
            opacity={hoveredNode === "memory" || isCoreHovered ? 1 : isLightMode ? 0.65 : 0.48}
            filter="url(#sys-silver-line-glow)"
            className="transition-all duration-300"
          />

          {/* 2. Path: AI CORE -> RAG ENGINE */}
          <path
            id="path-rag"
            d="M 830 125 C 780 125, 780 180, 730 180"
            stroke="url(#sys-silver-purple-grad-right)"
            strokeWidth={hoveredNode === "rag" || isCoreHovered ? 2.5 : 1.5}
            opacity={hoveredNode === "rag" || isCoreHovered ? 1 : isLightMode ? 0.65 : 0.48}
            filter="url(#sys-silver-line-glow)"
            className="transition-all duration-300"
          />

          {/* 3. Path: API LAYER -> AI CORE */}
          <path
            id="path-api"
            d="M 290 395 C 340 395, 340 280, 390 280"
            stroke="url(#sys-silver-purple-grad-left)"
            strokeWidth={hoveredNode === "api" || isCoreHovered ? 2.5 : 1.5}
            opacity={hoveredNode === "api" || isCoreHovered ? 1 : isLightMode ? 0.65 : 0.48}
            filter="url(#sys-silver-line-glow)"
            className="transition-all duration-300"
          />

          {/* 4. Path: AI CORE -> TOOLS */}
          <path
            id="path-tools"
            d="M 830 395 C 780 395, 780 280, 730 280"
            stroke="url(#sys-silver-purple-grad-right)"
            strokeWidth={hoveredNode === "tools" || isCoreHovered ? 2.5 : 1.5}
            opacity={hoveredNode === "tools" || isCoreHovered ? 1 : isLightMode ? 0.65 : 0.48}
            filter="url(#sys-silver-line-glow)"
            className="transition-all duration-300"
          />

          {/* 5. Path: AI CORE -> AGENTS */}
          <path
            id="path-agents"
            d="M 560 360 L 560 450"
            stroke="url(#sys-silver-purple-grad-agents)"
            strokeWidth={hoveredNode === "agents" || isCoreHovered ? 2.5 : 1.5}
            opacity={hoveredNode === "agents" || isCoreHovered ? 1 : isLightMode ? 0.65 : 0.48}
            filter="url(#sys-silver-line-glow)"
            className="transition-all duration-300"
          />

          {/* ── Traveling Light Data Photons (Silver/Purple) ── */}
          <circle r={hoveredNode === "memory" ? "3.5" : "2.5"} fill="#FFFFFF" filter="url(#sys-photon-silver-glow)">
            <animateMotion
              dur={hoveredNode === "memory" ? "1.8s" : "3.2s"}
              repeatCount="indefinite"
              path="M 290 125 C 340 125, 340 180, 390 180"
            />
          </circle>

          <circle r={hoveredNode === "rag" ? "3.5" : "2.5"} fill="#FFFFFF" filter="url(#sys-photon-silver-glow)">
            <animateMotion
              dur={hoveredNode === "rag" ? "1.8s" : "3.4s"}
              repeatCount="indefinite"
              path="M 730 180 C 780 180, 780 125, 830 125"
            />
          </circle>

          <circle r={hoveredNode === "api" ? "3.5" : "2.5"} fill="#FFFFFF" filter="url(#sys-photon-silver-glow)">
            <animateMotion
              dur={hoveredNode === "api" ? "1.8s" : "3.1s"}
              repeatCount="indefinite"
              path="M 290 395 C 340 395, 340 280, 390 280"
            />
          </circle>

          <circle r={hoveredNode === "tools" ? "3.5" : "2.5"} fill="#FFFFFF" filter="url(#sys-photon-silver-glow)">
            <animateMotion
              dur={hoveredNode === "tools" ? "1.8s" : "3.3s"}
              repeatCount="indefinite"
              path="M 730 280 C 780 280, 780 395, 830 395"
            />
          </circle>

          <circle r={hoveredNode === "agents" ? "3.5" : "2.5"} fill="#FFFFFF" filter="url(#sys-photon-silver-glow)">
            <animateMotion
              dur={hoveredNode === "agents" ? "1.6s" : "2.8s"}
              repeatCount="indefinite"
              path="M 560 360 L 560 450"
            />
          </circle>
        </svg>

        {/* ── 1. Top-Left: MEMORY Card ── */}
        <div
          className="absolute top-[40px] left-[40px] z-20"
          onMouseEnter={() => setHoveredNode("memory")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <ArchitectureCard
            node={ARCHITECTURE_NODES.memory}
            isHovered={hoveredNode === "memory"}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
            delay={0.2}
            isInView={isInView}
          />
        </div>

        {/* ── 2. Top-Right: RAG ENGINE Card ── */}
        <div
          className="absolute top-[40px] right-[40px] z-20"
          onMouseEnter={() => setHoveredNode("rag")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <ArchitectureCard
            node={ARCHITECTURE_NODES.rag}
            isHovered={hoveredNode === "rag"}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
            delay={0.25}
            isInView={isInView}
          />
        </div>

        {/* ── 3. Central AI CORE Card (Deep Silver-Purple Frosted Glassmorphism) ── */}
        <div
          className="absolute top-[100px] left-1/2 -translate-x-1/2 z-30"
          onMouseEnter={() => setHoveredNode("core")}
          onMouseLeave={() => setHoveredNode(null)}
          style={{ transform: "translateZ(26px) translateX(-50%)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "w-[340px] rounded-3xl p-6 sm:p-7 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 cursor-pointer text-center relative overflow-hidden flex flex-col items-center group",
              isLightMode
                ? "bg-gradient-to-b from-white/90 via-purple-50/40 to-white/90 border border-purple-200/80 shadow-[0_0_25px_rgba(192,132,252,0.35),0_16px_40px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:border-purple-300 hover:shadow-[0_0_40px_rgba(192,132,252,0.55),0_20px_50px_rgba(0,0,0,0.12)]"
                : "bg-gradient-to-b from-[#1a1728]/85 via-[#12111d]/90 to-[#0a0d14]/90 border border-white/30 hover:border-purple-300/60 shadow-[0_0_35px_rgba(168,85,247,0.28),0_0_70px_rgba(255,255,255,0.2),0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.5),inset_0_0_16px_rgba(168,85,247,0.08)] hover:shadow-[0_0_55px_rgba(192,132,252,0.45),0_0_95px_rgba(255,255,255,0.35),0_24px_70px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.85)]",
              isCoreHovered ? "scale-[1.03] -translate-y-1" : "scale-100"
            )}
          >
            {/* Top Crisp Specular Silver Rim Light */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

            {/* Corner Glass Ambient Soft Purple Sheen */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/[0.1] rounded-full blur-xl pointer-events-none" />

            {/* Central Liquid Silver-Purple Orbital Rings */}
            <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
              {/* Outer Slow Rotating Silver-Purple Orbital Ring */}
              <div
                className="absolute inset-0 rounded-full border border-white/40 shadow-[0_0_12px_rgba(192,132,252,0.4)] animate-[spin_20s_linear_infinite]"
                style={{ animationDirection: "normal" }}
              />
              <div
                className="absolute inset-1.5 rounded-full border border-dashed border-purple-300/30 animate-[spin_25s_linear_infinite]"
                style={{ animationDirection: "reverse" }}
              />

              {/* Glowing Core Housing Circle */}
              <div
                className={cn(
                  "relative z-10 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300",
                  isLightMode
                    ? "bg-gradient-to-b from-white to-purple-50 border-purple-200 text-slate-800 shadow-[0_0_15px_rgba(192,132,252,0.4),inset_0_1px_1px_rgba(255,255,255,1)]"
                    : "bg-gradient-to-b from-white/[0.24] via-purple-500/[0.1] to-white/[0.06] border-white/40 text-white shadow-[0_0_20px_rgba(192,132,252,0.35),inset_0_1px_2px_rgba(255,255,255,0.6)]"
                )}
              >
                <Cpu className="w-8 h-8 text-white animate-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <Sparkles className="w-3.5 h-3.5 text-purple-200 absolute -top-0.5 -right-0.5 drop-shadow-[0_0_5px_rgba(216,180,254,0.9)]" />
              </div>

              {/* Orbiting Tiny Light Particle */}
              <div className="absolute inset-0 animate-[spin_6s_linear_infinite] pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#c084fc] -translate-x-1" />
              </div>
            </div>

            {/* Title & Badge */}
            <h3
              className={cn(
                "text-xl sm:text-2xl font-bold font-display tracking-tight mb-1",
                isLightMode
                  ? "text-slate-900"
                  : "text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-purple-200 drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
              )}
            >
              AI CORE
            </h3>
            <div
              className={cn(
                "text-[11px] font-mono font-bold tracking-widest uppercase mb-2.5",
                isLightMode
                  ? "text-purple-600"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200 drop-shadow-[0_0_6px_rgba(192,132,252,0.5)]"
              )}
            >
              LLM ORCHESTRATION
            </div>

            {/* Description */}
            <p
              className={cn(
                "text-xs leading-relaxed font-sans max-w-[260px]",
                isLightMode ? "text-slate-600" : "text-slate-300/90"
              )}
            >
              Central intelligence layer that connects memory, knowledge, tools and agents.
            </p>
          </motion.div>
        </div>

        {/* ── 4. Bottom-Left: API LAYER Card ── */}
        <div
          className="absolute top-[310px] left-[40px] z-20"
          onMouseEnter={() => setHoveredNode("api")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <ArchitectureCard
            node={ARCHITECTURE_NODES.api}
            isHovered={hoveredNode === "api"}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
            delay={0.3}
            isInView={isInView}
          />
        </div>

        {/* ── 5. Bottom-Right: TOOLS Card ── */}
        <div
          className="absolute top-[310px] right-[40px] z-20"
          onMouseEnter={() => setHoveredNode("tools")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <ArchitectureCard
            node={ARCHITECTURE_NODES.tools}
            isHovered={hoveredNode === "tools"}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
            delay={0.35}
            isInView={isInView}
          />
        </div>

        {/* ── 6. Bottom-Center: AGENTS Card (Below AI Core) ── */}
        <div
          className="absolute top-[450px] left-1/2 -translate-x-1/2 z-20"
          onMouseEnter={() => setHoveredNode("agents")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <ArchitectureCard
            node={ARCHITECTURE_NODES.agents}
            isHovered={hoveredNode === "agents"}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
            delay={0.4}
            isInView={isInView}
            isCenter
          />
        </div>
      </div>

      {/* ── 3. Mobile / Tablet Responsive Architecture Flow (< lg screens) ── */}
      <div className="lg:hidden w-full px-4 flex flex-col items-center gap-4 my-2">
        {/* Mobile AI Core */}
        <div
          className={cn(
            "w-full max-w-sm rounded-2xl p-5 border text-center flex flex-col items-center relative overflow-hidden backdrop-blur-2xl backdrop-saturate-150",
            isLightMode
              ? "bg-white/90 border-purple-200 shadow-[0_0_20px_rgba(192,132,252,0.3),0_8px_24px_rgba(0,0,0,0.06)]"
              : "bg-gradient-to-b from-[#1a1728]/90 to-[#0a0d14]/90 border-white/30 shadow-[0_0_25px_rgba(168,85,247,0.25),0_12px_32px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.4)]"
          )}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center mb-2 border backdrop-blur-md",
              isLightMode
                ? "bg-white border-purple-200 text-slate-800"
                : "bg-white/[0.16] border-white/30 text-white shadow-[0_0_12px_rgba(192,132,252,0.25)]"
            )}
          >
            <Cpu className="w-6 h-6 text-white animate-pulse" />
          </div>
          <h3
            className={cn(
              "text-lg font-bold font-display tracking-tight mb-0.5",
              isLightMode ? "text-slate-900" : "text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200"
            )}
          >
            AI CORE
          </h3>
          <div className="text-[9.5px] font-mono font-bold tracking-widest text-purple-300 uppercase mb-1.5">
            LLM ORCHESTRATION
          </div>
          <p className={cn("text-xs leading-relaxed font-sans", isLightMode ? "text-slate-600" : "text-slate-300")}>
            Central intelligence layer connecting memory, knowledge, tools and agents.
          </p>
        </div>

        {/* Connecting Silver-Purple Pulse Line */}
        <div className="w-[1.5px] h-6 bg-gradient-to-b from-purple-300/80 via-white/60 to-purple-400/20 rounded-full shadow-[0_0_6px_rgba(192,132,252,0.4)]" />

        {/* Top 2 Cards: Memory & RAG Engine */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl">
          <MobileCard node={ARCHITECTURE_NODES.memory} isLightMode={isLightMode} />
          <MobileCard node={ARCHITECTURE_NODES.rag} isLightMode={isLightMode} />
        </div>

        {/* Connecting Silver-Purple Pulse Line */}
        <div className="w-[1.5px] h-6 bg-gradient-to-b from-purple-300/80 via-white/60 to-purple-400/20 rounded-full shadow-[0_0_6px_rgba(192,132,252,0.4)]" />

        {/* Bottom 2 Cards: API Layer & Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl">
          <MobileCard node={ARCHITECTURE_NODES.api} isLightMode={isLightMode} />
          <MobileCard node={ARCHITECTURE_NODES.tools} isLightMode={isLightMode} />
        </div>

        {/* Connecting Silver-Purple Pulse Line */}
        <div className="w-[1.5px] h-6 bg-gradient-to-b from-purple-300/80 via-white/60 to-purple-400/20 rounded-full shadow-[0_0_6px_rgba(192,132,252,0.4)]" />

        {/* Agents Card */}
        <div className="w-full max-w-sm">
          <MobileCard node={ARCHITECTURE_NODES.agents} isLightMode={isLightMode} />
        </div>
      </div>

      {/* ── 4. Bottom Capability Strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "w-full max-w-[1000px] mt-10 md:mt-14 rounded-2xl sm:rounded-full px-5 py-3 sm:py-3.5 backdrop-blur-2xl backdrop-saturate-150 border transition-all duration-300",
          isLightMode
            ? "bg-white/80 border-purple-200/80 shadow-[0_0_20px_rgba(192,132,252,0.25),0_8px_24px_rgba(0,0,0,0.04)]"
            : "bg-[#141221]/75 border-white/20 shadow-[0_0_25px_rgba(192,132,252,0.18),0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)]"
        )}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-2 items-center justify-between">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className={cn(
                  "flex items-center gap-3 px-2 sm:px-4 py-1",
                  i !== 0 ? "md:border-l md:border-white/10 dark:md:border-white/10" : ""
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 hover:scale-110 backdrop-blur-md",
                    isLightMode
                      ? "bg-purple-50 border-purple-200 text-purple-700"
                      : "bg-white/[0.1] border-white/20 text-purple-200 shadow-[0_0_10px_rgba(192,132,252,0.2)]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span
                    className={cn(
                      "text-xs sm:text-[13px] font-bold font-mono tracking-tight",
                      isLightMode ? "text-slate-900" : "text-white"
                    )}
                  >
                    {cap.title}
                  </span>
                  <span
                    className={cn(
                      "text-[10.5px] sm:text-[11px] font-sans",
                      isLightMode ? "text-slate-500" : "text-slate-400"
                    )}
                  >
                    {cap.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

// ── Supporting Architecture Card Component (Desktop) ─────────────────────────
interface ArchitectureCardProps {
  node: NodeData;
  isHovered: boolean;
  isCoreHovered: boolean;
  isLightMode: boolean;
  delay: number;
  isInView: boolean;
  isCenter?: boolean;
}

function ArchitectureCard({
  node,
  isHovered,
  isCoreHovered,
  isLightMode,
  delay,
  isInView,
  isCenter = false,
}: ArchitectureCardProps) {
  const Icon = node.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-2xl p-5 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center text-center group",
        isCenter ? "w-[300px]" : "w-[250px]",
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
      <div className="absolute -top-8 -right-8 w-20 h-20 bg-purple-500/[0.08] rounded-full blur-md pointer-events-none" />

      {/* Icon Housing */}
      <div
        className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center mb-3 border transition-all duration-300 backdrop-blur-md",
          isLightMode
            ? "bg-purple-50/80 border-purple-200 text-slate-800 shadow-sm"
            : "bg-gradient-to-b from-white/[0.2] via-purple-500/[0.08] to-white/[0.04] border-white/30 text-white shadow-[0_0_12px_rgba(192,132,252,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)]",
          isHovered ? "scale-110 border-purple-300/60 shadow-[0_0_18px_rgba(192,132,252,0.4)]" : ""
        )}
      >
        <Icon className="w-5 h-5 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]" />
      </div>

      {/* Node Title */}
      <h4
        className={cn(
          "text-sm font-bold font-mono tracking-wider mb-1.5 uppercase",
          isLightMode
            ? "text-slate-900"
            : "text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
        )}
      >
        {node.title}
      </h4>

      {/* Node Description */}
      <p
        className={cn(
          "text-[11.5px] leading-relaxed font-sans",
          isLightMode ? "text-slate-600" : "text-slate-300/90"
        )}
      >
        {node.description}
      </p>
    </motion.div>
  );
}

// ── Mobile Card Component ───────────────────────────────────────────────────
function MobileCard({ node, isLightMode }: { node: NodeData; isLightMode: boolean }) {
  const Icon = node.icon;
  return (
    <div
      className={cn(
        "rounded-2xl p-4 backdrop-blur-2xl backdrop-saturate-150 border transition-all flex items-start gap-3.5 relative overflow-hidden",
        isLightMode
          ? "bg-white/90 border-purple-200 shadow-[0_0_14px_rgba(192,132,252,0.2)]"
          : "bg-gradient-to-b from-[#191726]/85 to-[#0a0d14]/85 border-white/25 shadow-[0_0_18px_rgba(168,85,247,0.15),0_6px_18px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border backdrop-blur-md",
          isLightMode
            ? "bg-purple-50 border-purple-200 text-slate-800"
            : "bg-white/[0.16] border-white/30 text-white shadow-[0_0_8px_rgba(192,132,252,0.2)]"
        )}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col text-left">
        <h4
          className={cn(
            "text-xs font-bold font-mono tracking-wider mb-1 uppercase",
            isLightMode ? "text-slate-900" : "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
          )}
        >
          {node.title}
        </h4>
        <p
          className={cn(
            "text-[11px] leading-relaxed font-sans",
            isLightMode ? "text-slate-600" : "text-slate-300"
          )}
        >
          {node.description}
        </p>
      </div>
    </div>
  );
}
