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
  accent: string;
  glow: string;
}

const NODES_DATA: Record<Exclude<NodeId, "core">, NodeItem> = {
  memory: {
    id: "memory",
    title: "MEMORY",
    description: "Long-term & short-term memory storage for context and learning.",
    icon: Database,
    accent: "#8B5CF6", // Violet
    glow: "rgba(139, 92, 246, 0.25)",
  },
  rag: {
    id: "rag",
    title: "RAG ENGINE",
    description: "Retrieval augmented generation for accurate, relevant and context-aware responses.",
    icon: FileText,
    accent: "#22D3EE", // Cyan
    glow: "rgba(34, 211, 238, 0.25)",
  },
  api: {
    id: "api",
    title: "API LAYER",
    description: "Robust APIs to connect services, applications and external systems.",
    icon: Code2,
    accent: "#38BDF8", // Electric Blue
    glow: "rgba(56, 189, 248, 0.25)",
  },
  tools: {
    id: "tools",
    title: "TOOLS",
    description: "Integrated tools & functions to extend capabilities and execute real-world actions.",
    icon: Box,
    accent: "#D946EF", // Magenta
    glow: "rgba(217, 70, 239, 0.25)",
  },
  agents: {
    id: "agents",
    title: "AGENTS",
    description: "Autonomous agents that plan, reason and take action to solve complex problems.",
    icon: UserCheck,
    accent: "#A78BFA", // Bright Violet
    glow: "rgba(167, 139, 250, 0.25)",
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
      {/* ── Atmospheric Ambient Aurora Glow Behind Network ── */}
      <div
        className={cn(
          "absolute w-[460px] h-[460px] rounded-full blur-[90px] pointer-events-none transition-all duration-700 -z-10",
          isLightMode
            ? "bg-gradient-to-tr from-[#38BDF8]/20 via-[#8B5CF6]/25 to-[#D946EF]/20 opacity-70"
            : "bg-gradient-to-tr from-[#22D3EE]/10 via-[#8B5CF6]/15 to-[#D946EF]/10 opacity-75",
          isCoreHovered ? "scale-115 opacity-100 blur-[100px]" : "scale-100"
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
        {/* ── SVG Connection Network with Dynamic Aurora Shimmer ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 620 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Left Connectors: Cyan -> Electric Blue -> Violet */}
            <linearGradient id="aurora-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
            </linearGradient>

            {/* Right Connectors: Violet -> Magenta -> Cyan */}
            <linearGradient id="aurora-grad-right" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#D946EF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
            </linearGradient>

            {/* Agents Bottom Connector: Violet -> Electric Blue -> Cyan */}
            <linearGradient id="aurora-grad-agents" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.8" />
            </linearGradient>

            {/* Aurora Line Glow Filter */}
            <filter id="aurora-line-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.0" result="blur1" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Photon Glow Filter */}
            <filter id="aurora-photon-glow" x="-50%" y="-50%" width="200%" height="200%">
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
            stroke="url(#aurora-grad-left)"
            strokeWidth={hoveredNode === "memory" || isCoreHovered ? 2.2 : 1.2}
            opacity={hoveredNode === "memory" || isCoreHovered ? 0.95 : 0.45}
            filter="url(#aurora-line-glow)"
            className="transition-all duration-300"
          />

          {/* 2. Path: AI CORE -> RAG ENGINE */}
          <path
            d="M 450 95 C 425 95, 445 185, 425 185"
            stroke="url(#aurora-grad-right)"
            strokeWidth={hoveredNode === "rag" || isCoreHovered ? 2.2 : 1.2}
            opacity={hoveredNode === "rag" || isCoreHovered ? 0.95 : 0.45}
            filter="url(#aurora-line-glow)"
            className="transition-all duration-300"
          />

          {/* 3. Path: API LAYER -> AI CORE */}
          <path
            d="M 170 335 C 195 335, 175 265, 195 265"
            stroke="url(#aurora-grad-left)"
            strokeWidth={hoveredNode === "api" || isCoreHovered ? 2.2 : 1.2}
            opacity={hoveredNode === "api" || isCoreHovered ? 0.95 : 0.45}
            filter="url(#aurora-line-glow)"
            className="transition-all duration-300"
          />

          {/* 4. Path: AI CORE -> TOOLS */}
          <path
            d="M 450 335 C 425 335, 445 265, 425 265"
            stroke="url(#aurora-grad-right)"
            strokeWidth={hoveredNode === "tools" || isCoreHovered ? 2.2 : 1.2}
            opacity={hoveredNode === "tools" || isCoreHovered ? 0.95 : 0.45}
            filter="url(#aurora-line-glow)"
            className="transition-all duration-300"
          />

          {/* 5. Path: AI CORE -> AGENTS */}
          <path
            d="M 310 345 L 310 405"
            stroke="url(#aurora-grad-agents)"
            strokeWidth={hoveredNode === "agents" || isCoreHovered ? 2.2 : 1.2}
            opacity={hoveredNode === "agents" || isCoreHovered ? 0.95 : 0.45}
            filter="url(#aurora-line-glow)"
            className="transition-all duration-300"
          />

          {/* ── Traveling Light Data Photons (Cyan, Violet, Magenta) ── */}
          <circle
            r={hoveredNode === "memory" ? "3" : "2.2"}
            fill="#22D3EE"
            filter="url(#aurora-photon-glow)"
          >
            <animateMotion
              dur={hoveredNode === "memory" ? "1.6s" : "2.8s"}
              repeatCount="indefinite"
              path="M 170 95 C 195 95, 175 185, 195 185"
            />
          </circle>

          <circle
            r={hoveredNode === "rag" ? "3" : "2.2"}
            fill="#D946EF"
            filter="url(#aurora-photon-glow)"
          >
            <animateMotion
              dur={hoveredNode === "rag" ? "1.6s" : "3.0s"}
              repeatCount="indefinite"
              path="M 425 185 C 445 185, 425 95, 450 95"
            />
          </circle>

          <circle
            r={hoveredNode === "api" ? "3" : "2.2"}
            fill="#38BDF8"
            filter="url(#aurora-photon-glow)"
          >
            <animateMotion
              dur={hoveredNode === "api" ? "1.6s" : "2.9s"}
              repeatCount="indefinite"
              path="M 170 335 C 195 335, 175 265, 195 265"
            />
          </circle>

          <circle
            r={hoveredNode === "tools" ? "3" : "2.2"}
            fill="#A78BFA"
            filter="url(#aurora-photon-glow)"
          >
            <animateMotion
              dur={hoveredNode === "tools" ? "1.6s" : "3.1s"}
              repeatCount="indefinite"
              path="M 425 265 C 445 265, 425 335, 450 335"
            />
          </circle>

          <circle
            r={hoveredNode === "agents" ? "3" : "2.2"}
            fill="#22D3EE"
            filter="url(#aurora-photon-glow)"
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

        {/* ── 3. Central AI CORE Card (Primary Focal Point) ── */}
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
              ? "bg-white/95 border border-slate-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              : "bg-[#0A0C19]/90 border border-white/[0.16] shadow-[0_0_24px_rgba(34,211,238,0.2),0_8px_24px_rgba(0,0,0,0.8)]"
          )}
        >
          {/* Top Specular Rim */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

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
                : "border-[#22D3EE]/40 bg-[#0A0C19] text-white shadow-[0_0_12px_rgba(34,211,238,0.3)]"
            )}
          >
            <Cpu className="w-5 h-5 text-white animate-pulse" />
          </div>
          <h3
            className={cn(
              "relative z-10 text-sm font-bold font-display tracking-wider uppercase",
              isLightMode ? "text-slate-900" : "text-[#F4F6FA]"
            )}
          >
            AI CORE
          </h3>
          <div
            className={cn(
              "relative z-10 text-[8.5px] font-mono font-bold tracking-widest uppercase mb-1",
              isLightMode ? "text-[#4f46e5]" : "text-[#38BDF8]"
            )}
          >
            LLM ORCHESTRATION
          </div>
          <p
            className={cn(
              "relative z-10 text-[9.5px] leading-relaxed font-sans",
              isLightMode ? "text-slate-600 font-normal" : "text-[#A8B0BF] font-light"
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
              ? "bg-gradient-to-b from-[#4f46e5] to-teal-500"
              : "bg-gradient-to-b from-[#22D3EE] via-[#8B5CF6] to-transparent shadow-[0_0_6px_#22D3EE]"
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
              ? "bg-gradient-to-b from-[#4f46e5] to-teal-500"
              : "bg-gradient-to-b from-[#22D3EE] via-[#8B5CF6] to-transparent shadow-[0_0_6px_#22D3EE]"
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
              ? "bg-gradient-to-b from-[#4f46e5] to-teal-500"
              : "bg-gradient-to-b from-[#22D3EE] via-[#8B5CF6] to-transparent shadow-[0_0_6px_#22D3EE]"
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
// CORNER BRACKET (L-Shape in Idle -> Glowing Box in Hover)
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
        "absolute w-2.5 h-2.5 pointer-events-none transition-all duration-300 z-20",
        posClasses,
        isLightMode
          ? isHovered
            ? "border-[#4f46e5] bg-[#4f46e5]/15 shadow-[0_0_6px_rgba(79,70,229,0.5)]"
            : "border-slate-400/60 bg-transparent"
          : isHovered
          ? "border-[#22D3EE] bg-[#22D3EE]/20 shadow-[0_0_8px_#22D3EE]"
          : "border-white/[0.22] bg-transparent"
      )}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SURROUNDING NODES (Dark Glass + Aurora Glow + Crisp Text)
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

    const maxTilt = 7;
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
                "bg-white/92 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
                isHovered
                  ? "border-[#4f46e5]/40 shadow-[0_16px_36px_rgba(79,70,229,0.14)] bg-white/98"
                  : isCoreHovered
                  ? "border-slate-300 shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
                  : ""
              )
            : cn(
                "bg-[#0A0C19]/90 backdrop-blur-xl border border-white/[0.14]",
                isHovered
                  ? "border-white/30"
                  : isCoreHovered
                  ? "border-white/20"
                  : ""
              )
        )}
        style={{
          boxShadow: !isLightMode
            ? isHovered
              ? `0 0 24px ${node.glow}, 0 16px 40px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.2)`
              : `0 0 16px rgba(139, 92, 246, 0.12), 0 8px 30px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.12)`
            : undefined,
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
              : "bg-gradient-to-r from-transparent via-white/35 to-transparent"
          )}
        />

        {/* ── 2. Atmospheric Aurora Ambient Glow (Appears on Hover) ── */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500 z-0",
            isLightMode
              ? "bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.12)_0%,rgba(139,92,246,0.06)_50%,transparent_75%)]"
              : "bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.12)_0%,rgba(139,92,246,0.08)_45%,transparent_75%)]",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* ── 3. Cyber Corner Brackets ── */}
        <CyberCorner position="tl" isHovered={isHovered} isLightMode={isLightMode} />
        <CyberCorner position="tr" isHovered={isHovered} isLightMode={isLightMode} />
        <CyberCorner position="bl" isHovered={isHovered} isLightMode={isLightMode} />
        <CyberCorner position="br" isHovered={isHovered} isLightMode={isLightMode} />

        {/* ── 4. Dynamic Cursor-Tracking Glare Highlight ── */}
        <div
          className="absolute inset-0 rounded-[18px] pointer-events-none z-15 transition-opacity duration-300"
          style={{
            background: isLightMode
              ? "radial-gradient(circle at calc(var(--node-glare-x, 50) * 1%) calc(var(--node-glare-y, 50) * 1%), rgba(255, 255, 255, 0.5) 0%, rgba(79, 70, 229, 0.08) 30%, transparent 65%)"
              : "radial-gradient(circle at calc(var(--node-glare-x, 50) * 1%) calc(var(--node-glare-y, 50) * 1%), rgba(255, 255, 255, 0.18) 0%, rgba(34, 211, 238, 0.1) 30%, transparent 65%)",
            opacity: "var(--node-glare-opacity, 0)",
          }}
        />

        {/* ── 5. Tiny Floating Specular Light Beads ── */}
        <div
          className={cn(
            "absolute top-[22%] left-[18%] w-1 h-1 rounded-full pointer-events-none transition-opacity duration-300 z-10",
            isLightMode
              ? "bg-[#0d9488] shadow-[0_0_4px_#0d9488]"
              : "bg-[#22D3EE] shadow-[0_0_6px_#22D3EE]",
            isHovered ? "opacity-90 animate-pulse" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute bottom-[26%] right-[18%] w-1 h-1 rounded-full pointer-events-none transition-opacity duration-300 z-10",
            isLightMode
              ? "bg-[#4f46e5] shadow-[0_0_4px_#4f46e5]"
              : "bg-[#D946EF] shadow-[0_0_6px_#D946EF]",
            isHovered ? "opacity-90 animate-pulse" : "opacity-0"
          )}
        />

        {/* ── 6. Card Content (Clean, Well-Spaced, No "INTERACTIVE 3D" Text) ── */}
        <div className="relative z-20 flex flex-col items-center w-full py-1">
          <div
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center mb-2 border transition-all duration-300",
              isLightMode
                ? isHovered
                  ? "bg-indigo-50 border-[#4f46e5]/50 text-[#4f46e5] shadow-[0_0_12px_rgba(79,70,229,0.25)] scale-105"
                  : "bg-slate-50/90 border-slate-200/80 text-slate-700"
                : isHovered
                ? "bg-white/[0.08] border-white/30 text-white scale-105"
                : "bg-white/[0.04] border-white/[0.12] text-[#CBD5E1]"
            )}
            style={{
              boxShadow: !isLightMode && isHovered ? `0 0 12px ${node.glow}` : undefined,
            }}
          >
            <Icon
              className="w-4 h-4 transition-colors"
              style={{ color: !isLightMode ? node.accent : undefined }}
            />
          </div>

          <h4
            className={cn(
              "text-[11px] font-bold font-mono tracking-wider mb-1 uppercase transition-colors",
              isLightMode ? "text-slate-900" : "text-[#F4F6FA]"
            )}
          >
            {node.title}
          </h4>

          <p
            className={cn(
              "text-[10px] leading-relaxed font-sans transition-colors max-w-[135px]",
              isLightMode ? "text-slate-600 font-normal" : "text-[#A8B0BF] font-light"
            )}
          >
            {node.description}
          </p>
        </div>
      </div>
    </div>
  );
}

const ExactCyberCard = InteractiveNodeCard;

// ═══════════════════════════════════════════════════════════════════════
// CENTRAL AI CORE CARD (Stronger Violet/Cyan Aurora Illumination)
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
                "bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.08)]",
                isHovered
                  ? "border-[#4f46e5]/50 shadow-[0_20px_45px_rgba(79,70,229,0.18)] bg-white"
                  : ""
              )
            : cn(
                "bg-[#0A0C19]/95 backdrop-blur-2xl border border-white/[0.18]",
                isHovered
                  ? "border-[#22D3EE]/70"
                  : ""
              )
        )}
        style={{
          boxShadow: !isLightMode
            ? isHovered
              ? "0 0 35px rgba(34, 211, 238, 0.35), 0 0 18px rgba(139, 92, 246, 0.3), 0 20px 50px rgba(0,0,0,0.9), inset 0 1px 2px rgba(255,255,255,0.3)"
              : "0 0 24px rgba(34, 211, 238, 0.22), 0 0 14px rgba(139, 92, 246, 0.18), 0 12px 36px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.15)"
            : undefined,
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
              : "bg-gradient-to-r from-transparent via-white/40 to-transparent"
          )}
        />

        {/* ── 2. Atmospheric Violet & Cyan Aurora Core Glow ── */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500 z-0",
            isLightMode
              ? "bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.15)_0%,rgba(139,92,246,0.08)_50%,transparent_80%)]"
              : "bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.18)_0%,rgba(139,92,246,0.14)_45%,rgba(217,70,239,0.06)_70%,transparent_80%)]",
            isHovered ? "opacity-100" : "opacity-80"
          )}
        />

        {/* ── 3. Cyber Corner Brackets ── */}
        <CyberCorner position="tl" isHovered={isHovered} isLightMode={isLightMode} />
        <CyberCorner position="tr" isHovered={isHovered} isLightMode={isLightMode} />
        <CyberCorner position="bl" isHovered={isHovered} isLightMode={isLightMode} />
        <CyberCorner position="br" isHovered={isHovered} isLightMode={isLightMode} />

        {/* ── 4. Dynamic Cursor-Tracking Glare Highlight ── */}
        <div
          className="absolute inset-0 rounded-[22px] pointer-events-none z-15 transition-opacity duration-300"
          style={{
            background: isLightMode
              ? "radial-gradient(circle at calc(var(--core-glare-x, 50) * 1%) calc(var(--core-glare-y, 50) * 1%), rgba(255, 255, 255, 0.6) 0%, rgba(79, 70, 229, 0.1) 35%, transparent 70%)"
              : "radial-gradient(circle at calc(var(--core-glare-x, 50) * 1%) calc(var(--core-glare-y, 50) * 1%), rgba(255, 255, 255, 0.22) 0%, rgba(34, 211, 238, 0.12) 35%, transparent 70%)",
            opacity: "var(--core-glare-opacity, 0)",
          }}
        />

        {/* ── 5. Tiny Floating Specular Light Beads ── */}
        <div
          className={cn(
            "absolute top-[20%] left-[20%] w-1 h-1 rounded-full pointer-events-none transition-opacity duration-300 z-10",
            isLightMode
              ? "bg-[#0d9488] shadow-[0_0_5px_#0d9488]"
              : "bg-[#22D3EE] shadow-[0_0_6px_#22D3EE]",
            isHovered ? "opacity-90 animate-pulse" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute bottom-[22%] right-[22%] w-1 h-1 rounded-full pointer-events-none transition-opacity duration-300 z-10",
            isLightMode
              ? "bg-[#4f46e5] shadow-[0_0_5px_#4f46e5]"
              : "bg-[#D946EF] shadow-[0_0_6px_#D946EF]",
            isHovered ? "opacity-90 animate-pulse" : "opacity-0"
          )}
        />

        {/* ── 6. Core Neural Icon Housing with Aurora Orbital Rings ── */}
        <div className="relative z-20 flex flex-col items-center w-full py-1">
          <div className="relative w-14 h-14 mb-3 flex items-center justify-center">
            {/* Outer Glowing Orbitals */}
            <div
              className={cn(
                "absolute inset-0 rounded-full border animate-[spin_20s_linear_infinite]",
                isLightMode
                  ? "border-[#4f46e5]/30 shadow-[0_0_8px_rgba(79,70,229,0.25)]"
                  : "border-[#8B5CF6]/40 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
              )}
            />
            <div
              className={cn(
                "absolute inset-1 rounded-full border border-dashed animate-[spin_25s_linear_infinite_reverse]",
                isLightMode ? "border-slate-300" : "border-[#22D3EE]/35"
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
                  ? "bg-white/[0.12] border-[#22D3EE]/60 text-white shadow-[0_0_20px_rgba(34,211,238,0.45)] scale-105"
                  : "bg-white/[0.06] border-white/[0.18] text-white shadow-[0_0_12px_rgba(34,211,238,0.25)]"
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
                    : "text-[#22D3EE] drop-shadow-[0_0_5px_#22D3EE]"
                )}
              />
            </div>
          </div>

          {/* AI CORE Typography */}
          <h3
            className={cn(
              "text-base sm:text-lg font-extrabold font-display tracking-wider mb-0.5 uppercase transition-colors",
              isLightMode ? "text-slate-900" : "text-[#F4F6FA]"
            )}
          >
            AI CORE
          </h3>
          <div
            className={cn(
              "text-[9px] font-mono font-bold tracking-widest uppercase mb-2 transition-colors",
              isLightMode ? "text-[#4f46e5]" : "text-[#38BDF8]"
            )}
          >
            LLM ORCHESTRATION
          </div>
          <p
            className={cn(
              "text-[10.5px] leading-relaxed font-sans max-w-[190px] transition-colors",
              isLightMode ? "text-slate-600 font-normal" : "text-[#A8B0BF] font-light"
            )}
          >
            Central intelligence layer that connects memory, knowledge, tools and agents.
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MOBILE NODE CARD
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
          : "border border-white/[0.14] bg-[#0A0C19]/90 shadow-[0_6px_18px_rgba(0,0,0,0.7)]"
      )}
    >
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
            : "border-white/[0.14] bg-white/[0.04] text-white"
        )}
      >
        <Icon
          className="w-3.5 h-3.5"
          style={{ color: !isLightMode ? node.accent : undefined }}
        />
      </div>
      <h4
        className={cn(
          "relative z-10 text-[10px] font-bold font-mono tracking-wide uppercase mb-0.5",
          isLightMode ? "text-slate-900" : "text-[#F4F6FA]"
        )}
      >
        {node.title}
      </h4>
      <p
        className={cn(
          "relative z-10 text-[9px] leading-tight font-sans",
          isLightMode ? "text-slate-600 font-normal" : "text-[#A8B0BF] font-light"
        )}
      >
        {node.description}
      </p>
    </div>
  );
}
