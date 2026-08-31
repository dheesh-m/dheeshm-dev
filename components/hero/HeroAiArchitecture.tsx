"use client";

import { useState, useRef, useCallback } from "react";
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
  const canvasRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const tiltX = x * 3.5;
    const tiltY = -y * 3.5;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (canvasRef.current) {
        canvasRef.current.style.transform = `rotateY(${tiltX.toFixed(2)}deg) rotateX(${tiltY.toFixed(2)}deg)`;
      }
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (canvasRef.current) {
      canvasRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
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
      {/* ── Atmospheric Ambient Glow Behind Network ── */}
      <div
        className={cn(
          "absolute w-[440px] h-[440px] rounded-full blur-[85px] pointer-events-none transition-all duration-700 -z-10",
          isLightMode
            ? "bg-gradient-to-tr from-teal-300/20 via-indigo-200/30 to-purple-200/25 opacity-80"
            : "bg-gradient-to-tr from-emerald-500/[0.08] via-cyan-500/[0.06] to-indigo-600/[0.08] opacity-80",
          isCoreHovered ? "scale-115 opacity-100 blur-[95px]" : "scale-100"
        )}
      />

      {/* ── 1. Desktop & Tablet Spatial Canvas ── */}
      <div
        ref={canvasRef}
        className="hidden sm:block relative w-[620px] h-[520px] scale-[0.78] md:scale-[0.88] lg:scale-100 origin-center transition-transform duration-300 ease-out"
        style={{
          perspective: 1200,
          transform: "rotateY(0deg) rotateX(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── SVG Connection Network with Dynamic Light/Dark Shimmer ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 620 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cyber-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isLightMode ? "#6366F1" : "#475569"} />
              <stop offset="35%" stopColor={isLightMode ? "#4F46E5" : "#5C67FF"} />
              <stop offset="60%" stopColor={isLightMode ? "#0D9488" : "#00FFAA"} />
              <stop offset="100%" stopColor={isLightMode ? "#64748B" : "#94A3B8"} />
            </linearGradient>
            <linearGradient id="cyber-grad-right" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isLightMode ? "#6366F1" : "#475569"} />
              <stop offset="35%" stopColor={isLightMode ? "#4F46E5" : "#5C67FF"} />
              <stop offset="60%" stopColor={isLightMode ? "#0D9488" : "#00FFAA"} />
              <stop offset="100%" stopColor={isLightMode ? "#64748B" : "#94A3B8"} />
            </linearGradient>
            <linearGradient id="cyber-grad-agents" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isLightMode ? "#64748B" : "#94A3B8"} />
              <stop offset="40%" stopColor={isLightMode ? "#0D9488" : "#00FFAA"} />
              <stop offset="70%" stopColor={isLightMode ? "#4F46E5" : "#5C67FF"} />
              <stop offset="100%" stopColor={isLightMode ? "#6366F1" : "#475569"} />
            </linearGradient>

            {/* Cyber Line Glow Filter */}
            <filter id="cyber-line-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation={isLightMode ? "1.5" : "2.2"} result="blur1" />
              <feGaussianBlur stdDeviation={isLightMode ? "0.8" : "1.0"} result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Photon Glow */}
            <filter id="photon-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.0" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Path: MEMORY -> AI CORE */}
          <path
            d="M 170 95 C 195 95, 175 185, 195 185"
            stroke="url(#cyber-grad-left)"
            strokeWidth={hoveredNode === "memory" || isCoreHovered ? 2.4 : isLightMode ? 1.8 : 1.3}
            opacity={hoveredNode === "memory" || isCoreHovered ? 1 : isLightMode ? 0.7 : 0.45}
            filter="url(#cyber-line-glow)"
            className="transition-all duration-300"
          />

          {/* 2. Path: AI CORE -> RAG ENGINE */}
          <path
            d="M 450 95 C 425 95, 445 185, 425 185"
            stroke="url(#cyber-grad-right)"
            strokeWidth={hoveredNode === "rag" || isCoreHovered ? 2.4 : isLightMode ? 1.8 : 1.3}
            opacity={hoveredNode === "rag" || isCoreHovered ? 1 : isLightMode ? 0.7 : 0.45}
            filter="url(#cyber-line-glow)"
            className="transition-all duration-300"
          />

          {/* 3. Path: API LAYER -> AI CORE */}
          <path
            d="M 170 335 C 195 335, 175 265, 195 265"
            stroke="url(#cyber-grad-left)"
            strokeWidth={hoveredNode === "api" || isCoreHovered ? 2.4 : isLightMode ? 1.8 : 1.3}
            opacity={hoveredNode === "api" || isCoreHovered ? 1 : isLightMode ? 0.7 : 0.45}
            filter="url(#cyber-line-glow)"
            className="transition-all duration-300"
          />

          {/* 4. Path: AI CORE -> TOOLS */}
          <path
            d="M 450 335 C 425 335, 445 265, 425 265"
            stroke="url(#cyber-grad-right)"
            strokeWidth={hoveredNode === "tools" || isCoreHovered ? 2.4 : isLightMode ? 1.8 : 1.3}
            opacity={hoveredNode === "tools" || isCoreHovered ? 1 : isLightMode ? 0.7 : 0.45}
            filter="url(#cyber-line-glow)"
            className="transition-all duration-300"
          />

          {/* 5. Path: AI CORE -> AGENTS */}
          <path
            d="M 310 345 L 310 405"
            stroke="url(#cyber-grad-agents)"
            strokeWidth={hoveredNode === "agents" || isCoreHovered ? 2.4 : isLightMode ? 1.8 : 1.3}
            opacity={hoveredNode === "agents" || isCoreHovered ? 1 : isLightMode ? 0.7 : 0.45}
            filter="url(#cyber-line-glow)"
            className="transition-all duration-300"
          />

          {/* ── Traveling Light Data Photons ── */}
          <circle
            r={hoveredNode === "memory" ? "3.2" : "2.4"}
            fill={isLightMode ? "#4F46E5" : "#FFFFFF"}
            filter="url(#photon-glow)"
          >
            <animateMotion
              dur={hoveredNode === "memory" ? "1.6s" : "2.8s"}
              repeatCount="indefinite"
              path="M 170 95 C 195 95, 175 185, 195 185"
            />
          </circle>

          <circle
            r={hoveredNode === "rag" ? "3.2" : "2.4"}
            fill={isLightMode ? "#4F46E5" : "#FFFFFF"}
            filter="url(#photon-glow)"
          >
            <animateMotion
              dur={hoveredNode === "rag" ? "1.6s" : "3.0s"}
              repeatCount="indefinite"
              path="M 425 185 C 445 185, 425 95, 450 95"
            />
          </circle>

          <circle
            r={hoveredNode === "api" ? "3.2" : "2.4"}
            fill={isLightMode ? "#4F46E5" : "#FFFFFF"}
            filter="url(#photon-glow)"
          >
            <animateMotion
              dur={hoveredNode === "api" ? "1.6s" : "2.9s"}
              repeatCount="indefinite"
              path="M 170 335 C 195 335, 175 265, 195 265"
            />
          </circle>

          <circle
            r={hoveredNode === "tools" ? "3.2" : "2.4"}
            fill={isLightMode ? "#4F46E5" : "#FFFFFF"}
            filter="url(#photon-glow)"
          >
            <animateMotion
              dur={hoveredNode === "tools" ? "1.6s" : "3.1s"}
              repeatCount="indefinite"
              path="M 425 265 C 445 265, 425 335, 450 335"
            />
          </circle>

          <circle
            r={hoveredNode === "agents" ? "3.2" : "2.4"}
            fill={isLightMode ? "#4F46E5" : "#FFFFFF"}
            filter="url(#photon-glow)"
          >
            <animateMotion
              dur={hoveredNode === "agents" ? "1.5s" : "2.6s"}
              repeatCount="indefinite"
              path="M 310 345 L 310 405"
            />
          </circle>
        </svg>

        {/* ── 1. Top-Left: MEMORY Card ── */}
        <div className="absolute top-[25px] left-[15px] z-20 w-[155px]">
          <ExactCyberCard
            node={NODES_DATA.memory}
            onHoverChange={(hovered) => setHoveredNode(hovered ? "memory" : null)}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
          />
        </div>

        {/* ── 2. Top-Right: RAG ENGINE Card ── */}
        <div className="absolute top-[25px] right-[15px] z-20 w-[155px]">
          <ExactCyberCard
            node={NODES_DATA.rag}
            onHoverChange={(hovered) => setHoveredNode(hovered ? "rag" : null)}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
          />
        </div>

        {/* ── 3. Central AI CORE Card (Larger Hub) ── */}
        <div
          className="absolute top-[115px] z-30 w-[230px]"
          style={{
            left: "calc(50% - 115px)",
          }}
        >
          <ExactCyberAiCoreCard
            onHoverChange={(hovered) => setHoveredNode(hovered ? "core" : null)}
            isLightMode={isLightMode}
          />
        </div>

        {/* ── 4. Bottom-Left: API LAYER Card ── */}
        <div className="absolute top-[265px] left-[15px] z-20 w-[155px]">
          <ExactCyberCard
            node={NODES_DATA.api}
            onHoverChange={(hovered) => setHoveredNode(hovered ? "api" : null)}
            isCoreHovered={isCoreHovered}
            isLightMode={isLightMode}
          />
        </div>

        {/* ── 5. Bottom-Right: TOOLS Card ── */}
        <div className="absolute top-[265px] right-[15px] z-20 w-[155px]">
          <ExactCyberCard
            node={NODES_DATA.tools}
            onHoverChange={(hovered) => setHoveredNode(hovered ? "tools" : null)}
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
        >
          <ExactCyberCard
            node={NODES_DATA.agents}
            onHoverChange={(hovered) => setHoveredNode(hovered ? "agents" : null)}
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
            "w-full max-w-[320px] rounded-[18px] p-4 text-center flex flex-col items-center relative overflow-hidden transition-all duration-300",
            isLightMode
              ? "bg-white/95 border border-slate-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.03)]"
              : "bg-[#11131a] border border-[#2a2f3d] shadow-[0_8px_24px_rgba(0,0,0,0.8)]"
          )}
        >
          {/* Subtle Horizontal Lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: isLightMode
                ? "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 0, 0, 0.02) 3px, rgba(0, 0, 0, 0.02) 4px)"
                : "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255, 255, 255, 0.02) 3px, rgba(255, 255, 255, 0.02) 4px)",
            }}
          />
          {/* Corner Brackets */}
          <CyberCorner position="tl" isHovered={false} isLightMode={isLightMode} />
          <CyberCorner position="tr" isHovered={false} isLightMode={isLightMode} />
          <CyberCorner position="bl" isHovered={false} isLightMode={isLightMode} />
          <CyberCorner position="br" isHovered={false} isLightMode={isLightMode} />

          <div
            className={cn(
              "relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 border transition-colors",
              isLightMode
                ? "border-indigo-200 bg-indigo-50/90 text-[#4f46e5]"
                : "border-[#3e476c] bg-[#1a1e2b] text-white"
            )}
          >
            <Cpu className={cn("w-5 h-5 animate-pulse", isLightMode ? "text-[#4f46e5]" : "text-white")} />
          </div>
          <h3
            className={cn(
              "relative z-10 text-sm font-bold font-display tracking-wider uppercase",
              isLightMode ? "text-slate-900" : "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            )}
          >
            AI CORE
          </h3>
          <div
            className={cn(
              "relative z-10 text-[8.5px] font-mono font-bold tracking-widest uppercase mb-1",
              isLightMode ? "text-[#4f46e5]" : "text-[#5c67ff]"
            )}
          >
            LLM ORCHESTRATION
          </div>
          <p
            className={cn(
              "relative z-10 text-[9.5px] leading-relaxed font-sans",
              isLightMode ? "text-slate-600 font-normal" : "text-slate-300 font-light"
            )}
          >
            Central intelligence layer that connects memory, knowledge, tools and agents.
          </p>
        </div>

        {/* Pulse Connector */}
        <div
          className={cn(
            "w-[1.5px] h-3 rounded-full",
            isLightMode
              ? "bg-gradient-to-b from-[#4f46e5] to-teal-500 shadow-[0_0_4px_rgba(79,70,229,0.4)]"
              : "bg-gradient-to-b from-[#5c67ff]/80 via-white/50 to-transparent shadow-[0_0_6px_#5c67ff]"
          )}
        />

        {/* 2-Col Grid: Memory & RAG */}
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-[340px]">
          <MobileExactCard node={NODES_DATA.memory} isLightMode={isLightMode} />
          <MobileExactCard node={NODES_DATA.rag} isLightMode={isLightMode} />
        </div>

        {/* Pulse Connector */}
        <div
          className={cn(
            "w-[1.5px] h-3 rounded-full",
            isLightMode
              ? "bg-gradient-to-b from-[#4f46e5] to-teal-500 shadow-[0_0_4px_rgba(79,70,229,0.4)]"
              : "bg-gradient-to-b from-[#5c67ff]/80 via-white/50 to-transparent shadow-[0_0_6px_#5c67ff]"
          )}
        />

        {/* 2-Col Grid: API & Tools */}
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-[340px]">
          <MobileExactCard node={NODES_DATA.api} isLightMode={isLightMode} />
          <MobileExactCard node={NODES_DATA.tools} isLightMode={isLightMode} />
        </div>

        {/* Pulse Connector */}
        <div
          className={cn(
            "w-[1.5px] h-3 rounded-full",
            isLightMode
              ? "bg-gradient-to-b from-[#4f46e5] to-teal-500 shadow-[0_0_4px_rgba(79,70,229,0.4)]"
              : "bg-gradient-to-b from-[#5c67ff]/80 via-white/50 to-transparent shadow-[0_0_6px_#5c67ff]"
          )}
        />

        {/* Agents Card */}
        <div className="w-full max-w-[320px]">
          <MobileExactCard node={NODES_DATA.agents} isLightMode={isLightMode} isFull />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// EXACT CORNER BRACKET (L-Shape in Idle -> Glowing Box in Hover)
// ═══════════════════════════════════════════════════════════════════════

function CyberCorner({
  position,
  isHovered,
  isLightMode,
}: {
  position: "tl" | "tr" | "bl" | "br";
  isHovered: boolean;
  isLightMode: boolean;
}) {
  const posClasses = {
    tl: "top-2 left-2 border-t-2 border-l-2 rounded-tl-[3px]",
    tr: "top-2 right-2 border-t-2 border-r-2 rounded-tr-[3px]",
    bl: "bottom-2 left-2 border-b-2 border-l-2 rounded-bl-[3px]",
    br: "bottom-2 right-2 border-b-2 border-r-2 rounded-br-[3px]",
  }[position];

  return (
    <div
      className={cn(
        "absolute w-3 h-3 pointer-events-none transition-all duration-300 z-20",
        posClasses,
        isLightMode
          ? isHovered
            ? "border-[#4f46e5] bg-[#4f46e5]/15 shadow-[0_0_8px_rgba(79,70,229,0.5),inset_0_0_3px_#4f46e5]"
            : "border-slate-400/60 bg-transparent"
          : isHovered
          ? "border-[#5c67ff] bg-[#5c67ff]/25 shadow-[0_0_10px_#5c67ff,inset_0_0_4px_#5c67ff]"
          : "border-[#383f60] bg-transparent"
      )}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════
// EXACT CYBER ARCHITECTURE CARD (Surrounding Nodes)
// ═══════════════════════════════════════════════════════════════════════

function InteractiveNodeCard({
  node,
  onHoverChange,
  isCoreHovered,
  isLightMode,
  isCenter = false,
}: {
  node: NodeItem;
  onHoverChange: (hovered: boolean) => void;
  isCoreHovered: boolean;
  isLightMode: boolean;
  isCenter?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const normX = (clientX / rect.width - 0.5) * 2;
    const normY = (clientY / rect.height - 0.5) * 2;

    const maxTilt = 8;
    const tiltX = -normY * maxTilt;
    const tiltY = normX * maxTilt;
    const glareX = (clientX / rect.width) * 100;
    const glareY = (clientY / rect.height) * 100;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--node-tilt-x", `${tiltX.toFixed(2)}deg`);
      el.style.setProperty("--node-tilt-y", `${tiltY.toFixed(2)}deg`);
      el.style.setProperty("--node-glare-x", glareX.toFixed(1));
      el.style.setProperty("--node-glare-y", glareY.toFixed(1));
      el.style.setProperty("--node-glare-opacity", "0.85");
      rafRef.current = null;
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHoverChange(true);
  }, [onHoverChange]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    onHoverChange(false);
    if (!cardRef.current) return;
    const el = cardRef.current;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    el.style.setProperty("--node-tilt-x", "0deg");
    el.style.setProperty("--node-tilt-y", "0deg");
    el.style.setProperty("--node-glare-opacity", "0");
  }, [onHoverChange]);

  const Icon = node.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full select-none cursor-pointer"
      style={{
        perspective: 900,
        ["--node-tilt-x" as string]: "0deg",
        ["--node-tilt-y" as string]: "0deg",
        ["--node-glare-x" as string]: "50",
        ["--node-glare-y" as string]: "50",
        ["--node-glare-opacity" as string]: "0",
      }}
    >
      <div
        className={cn(
          "relative w-full rounded-[18px] p-3.5 flex flex-col items-center text-center overflow-hidden transition-all duration-300 group",
          isLightMode
            ? cn(
                "bg-white/92 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.02)]",
                isHovered
                  ? "border-[#4f46e5]/40 shadow-[0_16px_36px_rgba(79,70,229,0.14),0_0_20px_rgba(13,148,136,0.12)] bg-white/98"
                  : isCoreHovered
                  ? "border-slate-300 shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
                  : ""
              )
            : cn(
                "bg-[#11131a] border border-[#282c3c] shadow-[0_8px_30px_rgba(0,0,0,0.7)]",
                isHovered
                  ? "border-[#3e4766] shadow-[0_16px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(92,103,255,0.22)]"
                  : isCoreHovered
                  ? "border-[#343b54]"
                  : ""
              )
        )}
        style={{
          transform: isHovered
            ? "rotateX(var(--node-tilt-x, 0deg)) rotateY(var(--node-tilt-y, 0deg)) translateZ(16px)"
            : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease"
            : "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
          willChange: "transform",
        }}
      >
        {/* ── 1. Top Specular Rim Highlight ── */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[1.5px] pointer-events-none z-10",
            isLightMode
              ? "bg-gradient-to-r from-transparent via-white to-transparent"
              : "bg-gradient-to-r from-transparent via-slate-400/40 to-transparent"
          )}
        />

        {/* ── 2. Atmospheric Emerald / Teal Green Glow (Appears on Hover) ── */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500 z-0",
            isLightMode
              ? "bg-[radial-gradient(circle_at_50%_40%,rgba(13,148,136,0.12)_0%,rgba(79,70,229,0.06)_50%,transparent_75%)]"
              : "bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,170,0.14)_0%,rgba(16,185,129,0.06)_45%,transparent_75%)]",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* ── 3. Cyber Corner Brackets ── */}
        <CyberCorner position="tl" isHovered={isHovered} isLightMode={isLightMode} />
        <CyberCorner position="tr" isHovered={isHovered} isLightMode={isLightMode} />
        <CyberCorner position="bl" isHovered={isHovered} isLightMode={isLightMode} />
        <CyberCorner position="br" isHovered={isHovered} isLightMode={isLightMode} />

        {/* ── 4. Diagonal Glossy Glare Streak ── */}
        <div
          className={cn(
            "absolute -inset-full pointer-events-none z-15 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: isLightMode
              ? `linear-gradient(135deg, transparent 35%, rgba(255, 255, 255, 0.4) 46%, rgba(255, 255, 255, 0.75) 50%, rgba(255, 255, 255, 0.4) 54%, transparent 65%)`
              : `linear-gradient(135deg, transparent 35%, rgba(255, 255, 255, 0.08) 46%, rgba(255, 255, 255, 0.28) 50%, rgba(255, 255, 255, 0.08) 54%, transparent 65%)`,
            transform: "translate(calc(var(--node-glare-x, 50) * 0.4% - 20%), calc(var(--node-glare-y, 50) * 0.4% - 20%))",
          }}
        />

        {/* ── 5. Dynamic Cursor-Tracking Glare Highlight ── */}
        <div
          className="absolute inset-0 rounded-[18px] pointer-events-none z-15 transition-opacity duration-300"
          style={{
            background: isLightMode
              ? "radial-gradient(circle at calc(var(--node-glare-x, 50) * 1%) calc(var(--node-glare-y, 50) * 1%), rgba(255, 255, 255, 0.5) 0%, rgba(79, 70, 229, 0.08) 30%, transparent 65%)"
              : "radial-gradient(circle at calc(var(--node-glare-x, 50) * 1%) calc(var(--node-glare-y, 50) * 1%), rgba(255, 255, 255, 0.18) 0%, rgba(92, 103, 255, 0.1) 30%, transparent 65%)",
            opacity: "var(--node-glare-opacity, 0)",
          }}
        />

        {/* ── 6. Horizontal Cyber Lines Texture ── */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none z-5",
            isLightMode ? "opacity-25" : "opacity-40"
          )}
          style={{
            backgroundImage: isLightMode
              ? "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 0, 0, 0.015) 3px, rgba(0, 0, 0, 0.015) 4px)"
              : "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255, 255, 255, 0.02) 3px, rgba(255, 255, 255, 0.02) 4px)",
          }}
        />

        {/* ── 7. Tiny Green & Cyan Floating Particles ── */}
        <div
          className={cn(
            "absolute top-[22%] left-[18%] w-1 h-1 rounded-full pointer-events-none transition-opacity duration-300 z-10",
            isLightMode
              ? "bg-[#0d9488] shadow-[0_0_4px_#0d9488]"
              : "bg-[#00ffaa] shadow-[0_0_6px_#00ffaa]",
            isHovered ? "opacity-90 animate-pulse" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute bottom-[26%] right-[18%] w-1 h-1 rounded-full pointer-events-none transition-opacity duration-300 z-10",
            isLightMode
              ? "bg-[#4f46e5] shadow-[0_0_4px_#4f46e5]"
              : "bg-[#00d9ff] shadow-[0_0_6px_#00d9ff]",
            isHovered ? "opacity-90 animate-pulse" : "opacity-0"
          )}
        />

        {/* ── 8. Card Content (Elevated on Z-Axis for 3D Depth) ── */}
        <div className="relative z-20 flex flex-col items-center w-full">
          <div
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 border transition-all duration-300",
              isLightMode
                ? isHovered
                  ? "bg-indigo-50 border-[#4f46e5]/50 text-[#4f46e5] shadow-[0_0_12px_rgba(79,70,229,0.25)] scale-105"
                  : "bg-slate-50/90 border-slate-200/80 text-slate-700"
                : isHovered
                ? "bg-[#5c67ff]/20 border-[#5c67ff]/60 text-white shadow-[0_0_14px_rgba(92,103,255,0.4)] scale-105"
                : "bg-[#181b26] border-[#2f354d] text-slate-300"
            )}
          >
            <Icon
              className={cn(
                "w-4 h-4 transition-colors",
                isLightMode
                  ? isHovered
                    ? "text-[#4f46e5]"
                    : "text-slate-800"
                  : "text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
              )}
            />
          </div>

          <h4
            className={cn(
              "text-[11px] font-bold font-mono tracking-wider mb-0.5 uppercase transition-colors",
              isLightMode
                ? "text-slate-900"
                : "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.45)]"
            )}
          >
            {node.title}
          </h4>

          <p
            className={cn(
              "text-[10px] leading-snug font-sans transition-colors",
              isLightMode ? "text-slate-600 font-normal" : "text-slate-300/90 font-light"
            )}
          >
            {node.description}
          </p>

          {/* Micro Subtitle Indicator */}
          <div
            className={cn(
              "mt-2 text-[8px] font-mono tracking-widest uppercase transition-colors",
              isLightMode ? "text-slate-500 font-medium" : "text-slate-400/80"
            )}
          >
            <span>INTERACTIVE </span>
            <span className={cn("font-bold", isLightMode ? "text-[#4f46e5]" : "text-[#5c67ff]")}>
              3D
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ExactCyberCard = InteractiveNodeCard;

// ═══════════════════════════════════════════════════════════════════════
// EXACT CYBER AI CORE CARD (Central Larger Hub)
// ═══════════════════════════════════════════════════════════════════════

function ExactCyberAiCoreCard({
  onHoverChange,
  isLightMode,
}: {
  onHoverChange: (hovered: boolean) => void;
  isLightMode: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const normX = (clientX / rect.width - 0.5) * 2;
    const normY = (clientY / rect.height - 0.5) * 2;

    const maxTilt = 7;
    const tiltX = -normY * maxTilt;
    const tiltY = normX * maxTilt;
    const glareX = (clientX / rect.width) * 100;
    const glareY = (clientY / rect.height) * 100;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--core-tilt-x", `${tiltX.toFixed(2)}deg`);
      el.style.setProperty("--core-tilt-y", `${tiltY.toFixed(2)}deg`);
      el.style.setProperty("--core-glare-x", glareX.toFixed(1));
      el.style.setProperty("--core-glare-y", glareY.toFixed(1));
      el.style.setProperty("--core-glare-opacity", "0.85");
      rafRef.current = null;
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHoverChange(true);
  }, [onHoverChange]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    onHoverChange(false);
    if (!cardRef.current) return;
    const el = cardRef.current;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    el.style.setProperty("--core-tilt-x", "0deg");
    el.style.setProperty("--core-tilt-y", "0deg");
    el.style.setProperty("--core-glare-opacity", "0");
  }, [onHoverChange]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full select-none cursor-pointer"
      style={{
        perspective: 1000,
        ["--core-tilt-x" as string]: "0deg",
        ["--core-tilt-y" as string]: "0deg",
        ["--core-glare-x" as string]: "50",
        ["--core-glare-y" as string]: "50",
        ["--core-glare-opacity" as string]: "0",
      }}
    >
      <div
        className={cn(
          "w-full rounded-[22px] p-5 text-center relative overflow-hidden flex flex-col items-center transition-all duration-300 group",
          isLightMode
            ? cn(
                "bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.03)]",
                isHovered
                  ? "border-[#4f46e5]/50 shadow-[0_20px_45px_rgba(79,70,229,0.18),0_0_25px_rgba(13,148,136,0.15)] bg-white"
                  : ""
              )
            : cn(
                "bg-[#11131a] border border-[#2a2f40] shadow-[0_12px_36px_rgba(0,0,0,0.8)]",
                isHovered
                  ? "border-[#4a5580] shadow-[0_20px_55px_rgba(0,0,0,0.9),0_0_35px_rgba(92,103,255,0.3)]"
                  : ""
              )
        )}
        style={{
          transform: isHovered
            ? "rotateX(var(--core-tilt-x, 0deg)) rotateY(var(--core-tilt-y, 0deg)) translateZ(30px)"
            : "rotateX(0deg) rotateY(0deg) translateZ(28px)",
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease"
            : "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
          willChange: "transform",
        }}
      >
        {/* ── 1. Top Specular Rim Highlight ── */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[1.5px] pointer-events-none z-10",
            isLightMode
              ? "bg-gradient-to-r from-transparent via-white to-transparent"
              : "bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"
          )}
        />

        {/* ── 2. Atmospheric Emerald / Teal Green Glow (Appears on Hover) ── */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500 z-0",
            isLightMode
              ? "bg-[radial-gradient(circle_at_50%_40%,rgba(13,148,136,0.15)_0%,rgba(79,70,229,0.08)_50%,transparent_80%)]"
              : "bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,170,0.18)_0%,rgba(16,185,129,0.08)_50%,transparent_80%)]",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* ── 3. Cyber Corner Brackets ── */}
        <CyberCorner position="tl" isHovered={isHovered} isLightMode={isLightMode} />
        <CyberCorner position="tr" isHovered={isHovered} isLightMode={isLightMode} />
        <CyberCorner position="bl" isHovered={isHovered} isLightMode={isLightMode} />
        <CyberCorner position="br" isHovered={isHovered} isLightMode={isLightMode} />

        {/* ── 4. Diagonal Glossy Glare Streak ── */}
        <div
          className={cn(
            "absolute -inset-full pointer-events-none z-15 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: isLightMode
              ? `linear-gradient(135deg, transparent 35%, rgba(255, 255, 255, 0.4) 46%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.4) 54%, transparent 65%)`
              : `linear-gradient(135deg, transparent 35%, rgba(255, 255, 255, 0.08) 46%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.08) 54%, transparent 65%)`,
            transform: "translate(calc(var(--core-glare-x, 50) * 0.4% - 20%), calc(var(--core-glare-y, 50) * 0.4% - 20%))",
          }}
        />

        {/* ── 5. Dynamic Cursor-Tracking Glare Highlight ── */}
        <div
          className="absolute inset-0 rounded-[22px] pointer-events-none z-15 transition-opacity duration-300"
          style={{
            background: isLightMode
              ? "radial-gradient(circle at calc(var(--core-glare-x, 50) * 1%) calc(var(--core-glare-y, 50) * 1%), rgba(255, 255, 255, 0.6) 0%, rgba(79, 70, 229, 0.1) 35%, transparent 70%)"
              : "radial-gradient(circle at calc(var(--core-glare-x, 50) * 1%) calc(var(--core-glare-y, 50) * 1%), rgba(255, 255, 255, 0.22) 0%, rgba(92, 103, 255, 0.12) 35%, transparent 70%)",
            opacity: "var(--core-glare-opacity, 0)",
          }}
        />

        {/* ── 6. Horizontal Cyber Lines Texture ── */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none z-5",
            isLightMode ? "opacity-25" : "opacity-40"
          )}
          style={{
            backgroundImage: isLightMode
              ? "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 0, 0, 0.015) 3px, rgba(0, 0, 0, 0.015) 4px)"
              : "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255, 255, 255, 0.02) 3px, rgba(255, 255, 255, 0.02) 4px)",
          }}
        />

        {/* ── 7. Tiny Green & Cyan Floating Particles ── */}
        <div
          className={cn(
            "absolute top-[20%] left-[20%] w-1 h-1 rounded-full pointer-events-none transition-opacity duration-300 z-10",
            isLightMode
              ? "bg-[#0d9488] shadow-[0_0_5px_#0d9488]"
              : "bg-[#00ffaa] shadow-[0_0_6px_#00ffaa]",
            isHovered ? "opacity-90 animate-pulse" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute bottom-[22%] right-[22%] w-1 h-1 rounded-full pointer-events-none transition-opacity duration-300 z-10",
            isLightMode
              ? "bg-[#4f46e5] shadow-[0_0_5px_#4f46e5]"
              : "bg-[#00d9ff] shadow-[0_0_6px_#00d9ff]",
            isHovered ? "opacity-90 animate-pulse" : "opacity-0"
          )}
        />

        {/* ── 8. Core Neural Icon Housing with Liquid Cyber Orbital Rings ── */}
        <div className="relative z-20 flex flex-col items-center w-full">
          <div className="relative w-14 h-14 mb-2.5 flex items-center justify-center">
            {/* Outer Glowing Orbitals */}
            <div
              className={cn(
                "absolute inset-0 rounded-full border animate-[spin_20s_linear_infinite]",
                isLightMode
                  ? "border-[#4f46e5]/30 shadow-[0_0_8px_rgba(79,70,229,0.25)]"
                  : "border-[#5c67ff]/40 shadow-[0_0_10px_rgba(92,103,255,0.4)]"
              )}
            />
            <div
              className={cn(
                "absolute inset-1 rounded-full border border-dashed animate-[spin_25s_linear_infinite_reverse]",
                isLightMode ? "border-slate-300" : "border-white/20"
              )}
            />

            {/* Core Icon Badge */}
            <div
              className={cn(
                "relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300",
                isLightMode
                  ? isHovered
                    ? "bg-indigo-50 border-[#4f46e5]/60 text-[#4f46e5] shadow-[0_0_16px_rgba(79,70,229,0.35)] scale-105"
                    : "bg-slate-50 border-slate-200/90 text-slate-800"
                  : isHovered
                  ? "bg-[#5c67ff]/20 border-[#5c67ff]/60 text-white shadow-[0_0_20px_rgba(92,103,255,0.5)] scale-105"
                  : "bg-[#181b26] border-[#343b54] text-white"
              )}
            >
              <Cpu
                className={cn(
                  "w-5 h-5 animate-pulse transition-colors",
                  isLightMode ? "text-[#4f46e5]" : "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                )}
              />
              <Sparkles
                className={cn(
                  "w-2.5 h-2.5 absolute -top-0.5 -right-0.5",
                  isLightMode
                    ? "text-[#0d9488] drop-shadow-[0_0_3px_#0d9488]"
                    : "text-[#00ffaa] drop-shadow-[0_0_5px_#00ffaa]"
                )}
              />
            </div>
          </div>

          {/* AI CORE Typography */}
          <h3
            className={cn(
              "text-base sm:text-lg font-extrabold font-display tracking-wider mb-0.5 uppercase transition-colors",
              isLightMode
                ? "text-slate-900"
                : "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
            )}
          >
            AI CORE
          </h3>
          <div
            className={cn(
              "text-[9px] font-mono font-bold tracking-widest uppercase mb-1.5 transition-colors",
              isLightMode ? "text-[#4f46e5]" : "text-[#5c67ff] drop-shadow-[0_0_6px_rgba(92,103,255,0.6)]"
            )}
          >
            LLM ORCHESTRATION
          </div>
          <p
            className={cn(
              "text-[10.5px] leading-snug font-sans max-w-[190px] transition-colors",
              isLightMode ? "text-slate-600 font-normal" : "text-slate-300 font-light"
            )}
          >
            Central intelligence layer that connects memory, knowledge, tools and agents.
          </p>

          {/* Micro Footer Indicator */}
          <div
            className={cn(
              "mt-2.5 flex items-center gap-1.5 text-[8.5px] font-mono tracking-widest uppercase transition-colors",
              isLightMode ? "text-slate-500 font-medium" : "text-slate-400"
            )}
          >
            <span>INTERACTIVE</span>
            <span className={cn("font-bold", isLightMode ? "text-[#4f46e5]" : "text-[#5c67ff]")}>
              3D
            </span>
            <span className={cn("font-bold", isLightMode ? "text-[#7c3aed]" : "text-[#8b5cf6]")}>
              EFFECT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MOBILE EXACT CARD
// ═══════════════════════════════════════════════════════════════════════

function MobileExactCard({
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
        "rounded-[16px] p-2.5 flex flex-col items-center text-center relative overflow-hidden transition-all",
        isLightMode
          ? "border border-slate-200/90 bg-white/95 shadow-[0_6px_16px_rgba(0,0,0,0.05)]"
          : "border border-[#282c3c] bg-[#11131a] shadow-[0_6px_18px_rgba(0,0,0,0.7)]"
      )}
    >
      {/* Horizontal Cyber Lines */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          isLightMode ? "opacity-25" : "opacity-40"
        )}
        style={{
          backgroundImage: isLightMode
            ? "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 0, 0, 0.015) 3px, rgba(0, 0, 0, 0.015) 4px)"
            : "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255, 255, 255, 0.02) 3px, rgba(255, 255, 255, 0.02) 4px)",
        }}
      />
      {/* Corner Brackets */}
      <CyberCorner position="tl" isHovered={false} isLightMode={isLightMode} />
      <CyberCorner position="tr" isHovered={false} isLightMode={isLightMode} />
      <CyberCorner position="bl" isHovered={false} isLightMode={isLightMode} />
      <CyberCorner position="br" isHovered={false} isLightMode={isLightMode} />

      <div
        className={cn(
          "relative z-10 w-7 h-7 rounded-lg flex items-center justify-center mb-1 border shrink-0",
          isLightMode
            ? "border-indigo-200 bg-indigo-50/80 text-[#4f46e5]"
            : "border-[#343b54] bg-[#181b26] text-white"
        )}
      >
        <Icon className={cn("w-3.5 h-3.5", isLightMode ? "text-[#4f46e5]" : "text-white")} />
      </div>
      <h4
        className={cn(
          "relative z-10 text-[10px] font-bold font-mono tracking-wide uppercase mb-0.5",
          isLightMode ? "text-slate-900" : "text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]"
        )}
      >
        {node.title}
      </h4>
      <p
        className={cn(
          "relative z-10 text-[9px] leading-tight font-sans",
          isLightMode ? "text-slate-600 font-normal" : "text-slate-300 font-light"
        )}
      >
        {node.description}
      </p>
    </div>
  );
}
