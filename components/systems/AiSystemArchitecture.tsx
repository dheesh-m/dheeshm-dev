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
    accentColor: "from-purple-500 to-indigo-500",
    glowColor: "rgba(168, 85, 247, 0.25)",
    borderColor: "rgba(168, 85, 247, 0.35)",
  },
  rag: {
    id: "rag",
    title: "RAG ENGINE",
    description: "Retrieval augmented generation for accurate, relevant and context-aware responses.",
    icon: FileText,
    accentColor: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.25)",
    borderColor: "rgba(59, 130, 246, 0.35)",
  },
  api: {
    id: "api",
    title: "API LAYER",
    description: "Robust APIs to connect services, applications and external systems.",
    icon: Code2,
    accentColor: "from-purple-500 to-pink-500",
    glowColor: "rgba(192, 132, 252, 0.25)",
    borderColor: "rgba(192, 132, 252, 0.35)",
  },
  tools: {
    id: "tools",
    title: "TOOLS",
    description: "Integrated tools & functions to extend capabilities and execute real-world actions.",
    icon: Box,
    accentColor: "from-blue-500 to-indigo-500",
    glowColor: "rgba(99, 102, 241, 0.25)",
    borderColor: "rgba(99, 102, 241, 0.35)",
  },
  agents: {
    id: "agents",
    title: "AGENTS",
    description: "Autonomous agents that plan, reason and take action to solve complex problems.",
    icon: UserCheck,
    accentColor: "from-pink-500 to-purple-500",
    glowColor: "rgba(236, 72, 153, 0.25)",
    borderColor: "rgba(236, 72, 153, 0.35)",
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
    description: "Deployed & tested",
  },
];

export default function AiSystemArchitecture() {
  const { isLightMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [hoveredNode, setHoveredNode] = useState<ArchitectureNodeId | null>(null);

  // Subtle 3D mouse parallax tilt effect
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
      className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center select-none py-4"
    >
      {/* ── Background Atmospheric Purple/Blue Ambient Aura ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center">
        <div
          className={cn(
            "w-[650px] h-[520px] rounded-full blur-[130px] transition-opacity duration-1000",
            isLightMode
              ? "bg-gradient-to-tr from-violet-200/30 via-indigo-200/20 to-blue-200/30 opacity-70"
              : "bg-gradient-to-tr from-purple-900/20 via-violet-800/25 to-blue-900/20 opacity-80",
            isCoreHovered ? "opacity-100 scale-110" : "scale-100"
          )}
          style={{ transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
        <div
          className={cn(
            "absolute w-[450px] h-[380px] rounded-full blur-[95px] transition-all duration-700",
            isLightMode
              ? "bg-indigo-300/20 opacity-60"
              : "bg-violet-600/15 opacity-60",
            isCoreHovered ? "scale-125 opacity-90" : "scale-100"
          )}
        />
      </div>

      {/* ── 1. Section Header (Badge, Title, Subtitle) ── */}
      <div className="text-center flex flex-col items-center justify-center max-w-3xl mx-auto mb-10 md:mb-14 px-4">
        {/* Status Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase mb-5 backdrop-blur-xl border transition-colors shadow-sm",
            isLightMode
              ? "bg-white/80 text-slate-700 border-slate-200/90 shadow-slate-200/50"
              : "bg-[#130E26]/80 text-violet-300 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_#a855f7]" />
          <span>AI SYSTEM ARCHITECTURE</span>
        </motion.div>

        {/* Display Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light tracking-[-0.035em] leading-[1.08] font-display mb-4",
            isLightMode ? "text-slate-900" : "text-white"
          )}
        >
          Built for{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-400 to-pink-500 dark:from-violet-400 dark:via-purple-300 dark:to-pink-400">
            intelligent
          </span>{" "}
          systems
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "text-sm sm:text-base md:text-[17px] font-sans max-w-2xl leading-relaxed",
            isLightMode ? "text-slate-600" : "text-slate-400"
          )}
        >
          I design and build end-to-end AI architectures that are scalable, reliable and production ready.
        </motion.p>
      </div>

      {/* ── 2. Master Architecture Spatial Diagram (Desktop & Tablet: lg+) ── */}
      <div
        className="hidden lg:block relative w-full max-w-[1120px] h-[640px] my-2 transition-transform duration-300 ease-out"
        style={{
          perspective: 1200,
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── SVG Connection Network with Dynamic Curved Paths & Traveling Data Photons ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 1120 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="grad-memory" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="grad-rag" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="grad-api" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="grad-tools" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            <linearGradient id="grad-agents" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#D946EF" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Path: MEMORY -> AI CORE */}
          <path
            id="path-memory"
            d="M 290 125 C 340 125, 340 180, 390 180"
            stroke="url(#grad-memory)"
            strokeWidth={hoveredNode === "memory" || isCoreHovered ? 2.5 : 1.5}
            opacity={hoveredNode === "memory" || isCoreHovered ? 1 : isLightMode ? 0.6 : 0.45}
            filter="url(#line-glow)"
            className="transition-all duration-300"
          />

          {/* 2. Path: AI CORE -> RAG ENGINE */}
          <path
            id="path-rag"
            d="M 830 125 C 780 125, 780 180, 730 180"
            stroke="url(#grad-rag)"
            strokeWidth={hoveredNode === "rag" || isCoreHovered ? 2.5 : 1.5}
            opacity={hoveredNode === "rag" || isCoreHovered ? 1 : isLightMode ? 0.6 : 0.45}
            filter="url(#line-glow)"
            className="transition-all duration-300"
          />

          {/* 3. Path: API LAYER -> AI CORE */}
          <path
            id="path-api"
            d="M 290 395 C 340 395, 340 280, 390 280"
            stroke="url(#grad-api)"
            strokeWidth={hoveredNode === "api" || isCoreHovered ? 2.5 : 1.5}
            opacity={hoveredNode === "api" || isCoreHovered ? 1 : isLightMode ? 0.6 : 0.45}
            filter="url(#line-glow)"
            className="transition-all duration-300"
          />

          {/* 4. Path: AI CORE -> TOOLS */}
          <path
            id="path-tools"
            d="M 830 395 C 780 395, 780 280, 730 280"
            stroke="url(#grad-tools)"
            strokeWidth={hoveredNode === "tools" || isCoreHovered ? 2.5 : 1.5}
            opacity={hoveredNode === "tools" || isCoreHovered ? 1 : isLightMode ? 0.6 : 0.45}
            filter="url(#line-glow)"
            className="transition-all duration-300"
          />

          {/* 5. Path: AI CORE -> AGENTS */}
          <path
            id="path-agents"
            d="M 560 360 L 560 450"
            stroke="url(#grad-agents)"
            strokeWidth={hoveredNode === "agents" || isCoreHovered ? 2.5 : 1.5}
            opacity={hoveredNode === "agents" || isCoreHovered ? 1 : isLightMode ? 0.6 : 0.45}
            filter="url(#line-glow)"
            className="transition-all duration-300"
          />

          {/* ── Traveling Light Data Photons ── */}
          {/* Memory -> Core */}
          <circle r={hoveredNode === "memory" ? "3.5" : "2.5"} fill="#C084FC" filter="url(#line-glow)">
            <animateMotion
              dur={hoveredNode === "memory" ? "1.8s" : "3.2s"}
              repeatCount="indefinite"
              path="M 290 125 C 340 125, 340 180, 390 180"
            />
          </circle>
          <circle r="2" fill="#E879F9" opacity="0.8">
            <animateMotion
              dur={hoveredNode === "memory" ? "1.8s" : "3.2s"}
              begin="1.2s"
              repeatCount="indefinite"
              path="M 290 125 C 340 125, 340 180, 390 180"
            />
          </circle>

          {/* Core -> RAG */}
          <circle r={hoveredNode === "rag" ? "3.5" : "2.5"} fill="#38BDF8" filter="url(#line-glow)">
            <animateMotion
              dur={hoveredNode === "rag" ? "1.8s" : "3.4s"}
              repeatCount="indefinite"
              path="M 730 180 C 780 180, 780 125, 830 125"
            />
          </circle>
          <circle r="2" fill="#67E8F9" opacity="0.8">
            <animateMotion
              dur={hoveredNode === "rag" ? "1.8s" : "3.4s"}
              begin="1.5s"
              repeatCount="indefinite"
              path="M 730 180 C 780 180, 780 125, 830 125"
            />
          </circle>

          {/* API -> Core */}
          <circle r={hoveredNode === "api" ? "3.5" : "2.5"} fill="#F472B6" filter="url(#line-glow)">
            <animateMotion
              dur={hoveredNode === "api" ? "1.8s" : "3.1s"}
              repeatCount="indefinite"
              path="M 290 395 C 340 395, 340 280, 390 280"
            />
          </circle>
          <circle r="2" fill="#C084FC" opacity="0.8">
            <animateMotion
              dur={hoveredNode === "api" ? "1.8s" : "3.1s"}
              begin="1.3s"
              repeatCount="indefinite"
              path="M 290 395 C 340 395, 340 280, 390 280"
            />
          </circle>

          {/* Core -> Tools */}
          <circle r={hoveredNode === "tools" ? "3.5" : "2.5"} fill="#818CF8" filter="url(#line-glow)">
            <animateMotion
              dur={hoveredNode === "tools" ? "1.8s" : "3.3s"}
              repeatCount="indefinite"
              path="M 730 280 C 780 280, 780 395, 830 395"
            />
          </circle>
          <circle r="2" fill="#A78BFA" opacity="0.8">
            <animateMotion
              dur={hoveredNode === "tools" ? "1.8s" : "3.3s"}
              begin="1.4s"
              repeatCount="indefinite"
              path="M 730 280 C 780 280, 780 395, 830 395"
            />
          </circle>

          {/* Core -> Agents */}
          <circle r={hoveredNode === "agents" ? "3.5" : "2.5"} fill="#EC4899" filter="url(#line-glow)">
            <animateMotion
              dur={hoveredNode === "agents" ? "1.6s" : "2.8s"}
              repeatCount="indefinite"
              path="M 560 360 L 560 450"
            />
          </circle>
          <circle r="2" fill="#F472B6" opacity="0.8">
            <animateMotion
              dur={hoveredNode === "agents" ? "1.6s" : "2.8s"}
              begin="1.1s"
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

        {/* ── 3. Central AI CORE Card (Focal Point, 3D Lifted) ── */}
        <div
          className="absolute top-[100px] left-1/2 -translate-x-1/2 z-30"
          onMouseEnter={() => setHoveredNode("core")}
          onMouseLeave={() => setHoveredNode(null)}
          style={{ transform: "translateZ(24px) translateX(-50%)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "w-[340px] rounded-3xl p-6 sm:p-7 backdrop-blur-2xl transition-all duration-400 cursor-pointer text-center relative overflow-hidden flex flex-col items-center",
              isLightMode
                ? "bg-white/85 border border-slate-200/90 shadow-[0_16px_40px_rgba(57,78,110,0.12)] hover:border-violet-500/50 hover:shadow-[0_20px_50px_rgba(139,92,246,0.2)]"
                : "bg-[#110C24]/85 border border-violet-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_35px_rgba(139,92,246,0.18)] hover:border-violet-400/60 hover:shadow-[0_24px_70px_rgba(0,0,0,0.7),0_0_55px_rgba(139,92,246,0.35)]",
              isCoreHovered ? "scale-[1.02] -translate-y-1" : "scale-100"
            )}
          >
            {/* Subtle Inner Glow Highlight */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-violet-500/5 pointer-events-none" />

            {/* Central Holographic Brain Icon Housing with Ambient Orbitals */}
            <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
              {/* Outer Slow Rotating Orbital Ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-violet-400/40 animate-[spin_18s_linear_infinite]"
                style={{ animationDirection: "normal" }}
              />
              <div
                className="absolute inset-1.5 rounded-full border border-violet-500/20 animate-[spin_24s_linear_infinite]"
                style={{ animationDirection: "reverse" }}
              />

              {/* Glowing Core Housing Circle */}
              <div
                className={cn(
                  "relative z-10 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300",
                  isLightMode
                    ? "bg-gradient-to-br from-violet-100 to-indigo-100/80 border-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                    : "bg-gradient-to-br from-[#201542] to-[#120B27] border-violet-400/50 shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                )}
              >
                {/* AI / Neural Brain Icon */}
                <div className="relative">
                  <Cpu className="w-8 h-8 text-violet-400 dark:text-violet-300 animate-pulse" />
                  <Sparkles className="w-3.5 h-3.5 text-pink-400 absolute -top-1 -right-1" />
                </div>
              </div>

              {/* Orbiting Tiny Light Particle */}
              <div className="absolute inset-0 animate-[spin_6s_linear_infinite] pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-300 shadow-[0_0_8px_#c084fc] -translate-x-1" />
              </div>
            </div>

            {/* Title & Badge */}
            <h3
              className={cn(
                "text-xl sm:text-2xl font-bold font-display tracking-tight mb-1",
                isLightMode ? "text-slate-900" : "text-white"
              )}
            >
              AI CORE
            </h3>
            <div className="text-[11px] font-mono font-semibold tracking-widest text-violet-500 dark:text-violet-300 uppercase mb-2.5">
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
            "w-full max-w-sm rounded-3xl p-5 sm:p-6 backdrop-blur-2xl transition-all text-center flex flex-col items-center",
            isLightMode
              ? "bg-white/85 border border-slate-200/90 shadow-lg"
              : "bg-[#110C24]/85 border border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.2)]"
          )}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br from-violet-500/20 to-pink-500/20 border border-violet-400/40">
            <Cpu className="w-8 h-8 text-violet-400" />
          </div>
          <h3 className={cn("text-xl font-bold font-display tracking-tight mb-1", isLightMode ? "text-slate-900" : "text-white")}>
            AI CORE
          </h3>
          <div className="text-[10px] font-mono font-semibold tracking-widest text-violet-400 uppercase mb-2">
            LLM ORCHESTRATION
          </div>
          <p className={cn("text-xs leading-relaxed font-sans", isLightMode ? "text-slate-600" : "text-slate-300")}>
            Central intelligence layer that connects memory, knowledge, tools and agents.
          </p>
        </div>

        {/* Connecting Pulse Line */}
        <div className="w-[2px] h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full" />

        {/* Top 2 Cards: Memory & RAG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl">
          <MobileCard node={ARCHITECTURE_NODES.memory} isLightMode={isLightMode} />
          <MobileCard node={ARCHITECTURE_NODES.rag} isLightMode={isLightMode} />
        </div>

        {/* Connecting Pulse Line */}
        <div className="w-[2px] h-6 bg-gradient-to-b from-indigo-500 to-pink-500 rounded-full" />

        {/* Bottom 2 Cards: API Layer & Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl">
          <MobileCard node={ARCHITECTURE_NODES.api} isLightMode={isLightMode} />
          <MobileCard node={ARCHITECTURE_NODES.tools} isLightMode={isLightMode} />
        </div>

        {/* Connecting Pulse Line */}
        <div className="w-[2px] h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />

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
          "w-full max-w-[1000px] mt-10 md:mt-14 rounded-2xl sm:rounded-full px-5 py-3 sm:py-3.5 backdrop-blur-xl border transition-all duration-300",
          isLightMode
            ? "bg-white/80 border-slate-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
            : "bg-[#0E0A1D]/75 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
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
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 hover:scale-110",
                    isLightMode
                      ? "bg-slate-100 border-slate-200 text-slate-700"
                      : "bg-white/5 border-white/10 text-violet-300"
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
        "rounded-2xl p-5 backdrop-blur-xl transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center text-center",
        isCenter ? "w-[300px]" : "w-[250px]",
        isLightMode
          ? "bg-white/85 border border-slate-200/90 shadow-[0_8px_24px_rgba(57,78,110,0.06)]"
          : "bg-[#0E0A1E]/75 border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.5)]",
        isHovered
          ? isLightMode
            ? "border-violet-400 shadow-[0_12px_30px_rgba(139,92,246,0.15)] -translate-y-1 scale-[1.02]"
            : "border-violet-400/60 shadow-[0_12px_36px_rgba(139,92,246,0.25)] -translate-y-1 scale-[1.02]"
          : isCoreHovered
          ? isLightMode
            ? "border-violet-300"
            : "border-violet-500/35"
          : ""
      )}
    >
      {/* Icon Housing */}
      <div
        className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center mb-3 border transition-transform duration-300",
          isLightMode
            ? "bg-slate-100/90 border-slate-200 text-slate-800"
            : "bg-white/5 border-white/15 text-violet-300",
          isHovered ? "scale-110" : ""
        )}
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* Node Title */}
      <h4
        className={cn(
          "text-sm font-bold font-mono tracking-wider mb-1.5 uppercase",
          isLightMode ? "text-slate-900" : "text-white"
        )}
      >
        {node.title}
      </h4>

      {/* Node Description */}
      <p
        className={cn(
          "text-[11.5px] leading-relaxed font-sans",
          isLightMode ? "text-slate-600" : "text-slate-400"
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
        "rounded-2xl p-4 backdrop-blur-xl border transition-all flex items-start gap-3.5",
        isLightMode
          ? "bg-white/85 border-slate-200/90 shadow-sm"
          : "bg-[#0E0A1E]/80 border-white/10"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
          isLightMode
            ? "bg-slate-100 border-slate-200 text-slate-800"
            : "bg-white/5 border-white/15 text-violet-300"
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col text-left">
        <h4
          className={cn(
            "text-xs font-bold font-mono tracking-wider mb-1 uppercase",
            isLightMode ? "text-slate-900" : "text-white"
          )}
        >
          {node.title}
        </h4>
        <p
          className={cn(
            "text-[11px] leading-relaxed font-sans",
            isLightMode ? "text-slate-600" : "text-slate-400"
          )}
        >
          {node.description}
        </p>
      </div>
    </div>
  );
}
