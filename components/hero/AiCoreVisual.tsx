"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Cpu, Sparkles, Database, Code2, FileText, Box, UserCheck } from "lucide-react";

export default function AiCoreVisual() {
  const { isLightMode } = useTheme();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setActiveNode(null);
  };

  const NODES = [
    { id: "memory", label: "MEMORY", icon: Database, x: "18%", y: "22%" },
    { id: "rag", label: "RAG", icon: FileText, x: "82%", y: "22%" },
    { id: "api", label: "API", icon: Code2, x: "18%", y: "78%" },
    { id: "tools", label: "TOOLS", icon: Box, x: "82%", y: "78%" },
    { id: "agents", label: "AGENTS", icon: UserCheck, x: "50%", y: "88%" },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{ perspective: 1000 }}
    >
      {/* ── Outer Atmospheric Bloom ── */}
      <div
        className={cn(
          "absolute w-[320px] h-[320px] rounded-full blur-[70px] pointer-events-none transition-opacity duration-700",
          isLightMode
            ? "bg-gradient-to-tr from-violet-200/40 via-indigo-200/30 to-blue-200/40"
            : "bg-gradient-to-tr from-purple-800/25 via-violet-700/30 to-blue-800/20"
        )}
      />

      {/* ── 3D Floating Holographic AI Core ── */}
      <div
        className="relative w-[340px] h-[340px] flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* SVG Connecting Flux Rays */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 340 340">
          <defs>
            <linearGradient id="hero-flux-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="hero-flux-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>

          {/* Core spoke rays */}
          <line x1="170" y1="170" x2="61" y2="75" stroke="url(#hero-flux-1)" strokeWidth="1.2" opacity="0.45" strokeDasharray="3 3" />
          <line x1="170" y1="170" x2="279" y2="75" stroke="url(#hero-flux-2)" strokeWidth="1.2" opacity="0.45" strokeDasharray="3 3" />
          <line x1="170" y1="170" x2="61" y2="265" stroke="url(#hero-flux-1)" strokeWidth="1.2" opacity="0.45" strokeDasharray="3 3" />
          <line x1="170" y1="170" x2="279" y2="265" stroke="url(#hero-flux-2)" strokeWidth="1.2" opacity="0.45" strokeDasharray="3 3" />
          <line x1="170" y1="170" x2="170" y2="299" stroke="url(#hero-flux-1)" strokeWidth="1.2" opacity="0.45" strokeDasharray="3 3" />
        </svg>

        {/* Outer Rotating Concentric Gyro Rings */}
        <div
          className="absolute w-72 h-72 rounded-full border border-violet-500/20 dark:border-violet-400/20 animate-[spin_25s_linear_infinite]"
          style={{ transform: "rotateX(65deg) rotateY(15deg)" }}
        />
        <div
          className="absolute w-64 h-64 rounded-full border border-dashed border-indigo-400/30 dark:border-indigo-400/30 animate-[spin_18s_linear_infinite_reverse]"
          style={{ transform: "rotateY(60deg) rotateX(20deg)" }}
        />

        {/* ── Central Radiant AI Core Orb ── */}
        <div
          className={cn(
            "relative z-20 w-32 h-32 rounded-3xl p-3 flex flex-col items-center justify-center backdrop-blur-2xl border transition-all duration-300 shadow-2xl cursor-pointer",
            isLightMode
              ? "bg-white/90 border-slate-200 shadow-[0_12px_36px_rgba(57,78,110,0.15)] hover:border-violet-400"
              : "bg-[#120C26]/90 border-violet-500/40 shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:border-violet-400/80"
          )}
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-600 text-white mb-1.5 shadow-lg">
            <Cpu className="w-6 h-6 animate-pulse" />
            <Sparkles className="w-3 h-3 text-pink-300 absolute -top-1 -right-1" />
          </div>
          <span className={cn("text-xs font-bold font-display tracking-tight", isLightMode ? "text-slate-900" : "text-white")}>
            AI CORE
          </span>
          <span className="text-[8.5px] font-mono tracking-widest text-violet-500 dark:text-violet-300 uppercase">
            ORCHESTRATION
          </span>
        </div>

        {/* ── 5 Satellite Glass Nodes ── */}
        {NODES.map((node) => {
          const Icon = node.icon;
          const isHovered = activeNode === node.id;
          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 z-20 px-2.5 py-1.5 rounded-xl backdrop-blur-xl border transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-md",
                isLightMode
                  ? "bg-white/85 border-slate-200 text-slate-800"
                  : "bg-[#0E0A1E]/85 border-white/15 text-white",
                isHovered ? "scale-110 border-violet-400 -translate-y-1 shadow-[0_0_18px_rgba(139,92,246,0.4)]" : ""
              )}
              style={{
                left: node.x,
                top: node.y,
                transform: `translate(-50%, -50%) translateZ(${isHovered ? "35px" : "15px"})`,
              }}
            >
              <Icon className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[9.5px] font-mono font-bold tracking-wider">{node.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
