"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface OrbitTechItem {
  id: string;
  name: string;
  icon: LucideIcon;
  x: string;
  y: string;
  orbitIndex?: number;
}

export interface ClusterProps {
  id: string;
  badge: string;
  centralTitle: string;
  centralSubtitle: string;
  centralIcon: LucideIcon;
  theme?: "purple" | "blue" | "indigo" | "cyan" | "red";
  technologies: OrbitTechItem[];
  onHoverTech?: (techId: string | null) => void;
  isHoveredOverall?: boolean;
}

// ── Aurora Palette per Orbit System (Interconnected Variations of the Same Spectrum) ──
function getAuroraSystemConfig(id: string) {
  switch (id) {
    case "ai":
    case "llm":
      return {
        c1: "#8B5CF6", // Violet
        c2: "#38BDF8", // Electric Blue
        c3: "#22D3EE", // Cyan
        c4: "#22D3EE",
        c5: "#A855F7",
        glow: "rgba(139, 92, 246, 0.22)",
        glowHover: "rgba(34, 211, 238, 0.38)",
        ambient: "bg-gradient-to-tr from-[#8B5CF6]/20 via-[#38BDF8]/15 to-[#22D3EE]/10",
        accent: "#8B5CF6",
        accentLight: "#A78BFA",
        border: "border-[#8B5CF6]/40 hover:border-[#22D3EE]/70",
        badgeGlow: "shadow-[0_0_12px_rgba(139,92,246,0.25)]",
        badgeDot: "bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6]",
        p1: "#22D3EE",
        p2: "#8B5CF6",
        pillColors: ["#8B5CF6", "#22D3EE", "#38BDF8", "#A78BFA", "#C084FC", "#818CF8", "#22D3EE", "#A78BFA"],
      };
    case "data":
      return {
        c1: "#A855F7", // Purple
        c2: "#D946EF", // Magenta
        c3: "#EC4899", // Pink
        c4: "#EC4899",
        c5: "#C084FC",
        glow: "rgba(217, 70, 239, 0.22)",
        glowHover: "rgba(236, 72, 153, 0.38)",
        ambient: "bg-gradient-to-tr from-[#A855F7]/20 via-[#D946EF]/15 to-[#EC4899]/10",
        accent: "#D946EF",
        accentLight: "#F472B6",
        border: "border-[#D946EF]/40 hover:border-[#EC4899]/70",
        badgeGlow: "shadow-[0_0_12px_rgba(217,70,239,0.25)]",
        badgeDot: "bg-[#D946EF] shadow-[0_0_6px_#D946EF]",
        p1: "#EC4899",
        p2: "#D946EF",
        pillColors: ["#D946EF", "#EC4899", "#A855F7", "#F472B6", "#C084FC", "#FB7185"],
      };
    case "backend":
    case "api":
      return {
        c1: "#38BDF8", // Electric Blue
        c2: "#22D3EE", // Cyan
        c3: "#8B5CF6", // Violet
        c4: "#8B5CF6",
        c5: "#38BDF8",
        glow: "rgba(56, 189, 248, 0.22)",
        glowHover: "rgba(34, 211, 238, 0.38)",
        ambient: "bg-gradient-to-tr from-[#38BDF8]/20 via-[#22D3EE]/15 to-[#8B5CF6]/10",
        accent: "#38BDF8",
        accentLight: "#38BDF8",
        border: "border-[#38BDF8]/40 hover:border-[#22D3EE]/70",
        badgeGlow: "shadow-[0_0_12px_rgba(56,189,248,0.25)]",
        badgeDot: "bg-[#38BDF8] shadow-[0_0_6px_#38BDF8]",
        p1: "#38BDF8",
        p2: "#22D3EE",
        pillColors: ["#38BDF8", "#22D3EE", "#8B5CF6", "#60A5FA", "#818CF8"],
      };
    case "frontend":
    case "typestack":
    default:
      return {
        c1: "#22D3EE", // Cyan
        c2: "#38BDF8", // Electric Blue
        c3: "#A855F7", // Purple
        c4: "#A855F7",
        c5: "#22D3EE",
        glow: "rgba(34, 211, 238, 0.22)",
        glowHover: "rgba(168, 85, 247, 0.38)",
        ambient: "bg-gradient-to-tr from-[#22D3EE]/20 via-[#38BDF8]/15 to-[#A855F7]/10",
        accent: "#22D3EE",
        accentLight: "#A78BFA",
        border: "border-[#22D3EE]/40 hover:border-[#A855F7]/70",
        badgeGlow: "shadow-[0_0_12px_rgba(34,211,238,0.25)]",
        badgeDot: "bg-[#22D3EE] shadow-[0_0_6px_#22D3EE]",
        p1: "#22D3EE",
        p2: "#A855F7",
        pillColors: ["#22D3EE", "#38BDF8", "#A855F7"],
      };
  }
}

function ClusterEcosystem({
  id,
  badge,
  centralTitle,
  centralSubtitle,
  centralIcon: CentralIcon,
  technologies,
  onHoverTech,
  isHoveredOverall = false,
}: ClusterProps) {
  const { isLightMode } = useTheme();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const cfg = getAuroraSystemConfig(id);

  const handleCardEnter = (techId: string) => {
    setHoveredCardId(techId);
    onHoverTech?.(techId);
  };

  const handleCardLeave = () => {
    setHoveredCardId(null);
    onHoverTech?.(null);
  };

  return (
    <div className="relative w-[480px] h-[340px] flex items-center justify-center select-none">
      {/* ── 1. Top Category Badge (Dark Glass + Translucent Border + Aurora Glow) ── */}
      <div className="absolute top-2 left-6 z-30">
        <div
          className={cn(
            "relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono font-semibold tracking-wider uppercase backdrop-blur-xl border transition-all duration-300 overflow-hidden",
            isLightMode
              ? "bg-white/90 border-[#D6DAE3] text-slate-800 shadow-sm"
              : "bg-[#0A0C19]/85 border-white/[0.14] text-[#D6DAE3]",
            !isLightMode && cfg.badgeGlow
          )}
        >
          {/* Top Specular Rim */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Luminous Pulsing Aurora Dot */}
          <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", cfg.badgeDot)} />
          <span className="relative z-10">{badge}</span>
        </div>
      </div>

      {/* ── 2. Atmospheric Ambient Cluster Glow (Faint Cosmic Aurora Cloud) ── */}
      <div
        className={cn(
          "absolute w-[360px] h-[260px] rounded-full blur-[75px] pointer-events-none transition-all duration-700 -z-10",
          isLightMode ? "bg-[#38BDF8]/15" : cfg.ambient,
          hoveredCardId || isHoveredOverall ? "scale-115 opacity-90" : "scale-100 opacity-50"
        )}
      />

      {/* ── 3. Multi-Layer Concentric Elliptical Orbital Rings (Aurora Gradients) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        viewBox="0 0 480 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`orbit-grad-${id}-1`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={cfg.c1} stopOpacity="0.85" />
            <stop offset="35%" stopColor={cfg.c2} stopOpacity="0.60" />
            <stop offset="70%" stopColor={cfg.c3} stopOpacity="0.35" />
            <stop offset="100%" stopColor={cfg.c1} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={`orbit-grad-${id}-2`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={cfg.c4} stopOpacity="0.75" />
            <stop offset="50%" stopColor={cfg.c2} stopOpacity="0.30" />
            <stop offset="100%" stopColor={cfg.c5} stopOpacity="0.75" />
          </linearGradient>
          <filter id={`orbit-glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbit Ring 1 (Inner Ellipse - Primary Aurora Stroke) */}
        <ellipse
          cx="240"
          cy="170"
          rx="155"
          ry="78"
          stroke={`url(#orbit-grad-${id}-1)`}
          strokeWidth={hoveredCardId ? "1.5" : "1.1"}
          strokeDasharray={isLightMode ? "4 4" : "none"}
          opacity={isLightMode ? 0.6 : 0.45}
          filter={`url(#orbit-glow-${id})`}
          className="transition-all duration-300"
        />

        {/* Orbit Ring 2 (Outer Ellipse - Faint Secondary Ring) */}
        <ellipse
          cx="240"
          cy="170"
          rx="210"
          ry="115"
          stroke={`url(#orbit-grad-${id}-2)`}
          strokeWidth={hoveredCardId ? "1.4" : "0.95"}
          strokeDasharray="6 6"
          opacity={isLightMode ? 0.5 : 0.38}
          filter={`url(#orbit-glow-${id})`}
          className="transition-all duration-300"
        />

        {/* Orbit Ring 3 (Outer Halo Guide - Subtle Atmospheric Ring) */}
        <ellipse
          cx="240"
          cy="170"
          rx="235"
          ry="130"
          stroke={cfg.glow}
          strokeWidth="0.8"
          opacity={isLightMode ? 0.4 : 0.25}
        />

        {/* ── Traveling Photons on Orbits (Aurora Energy Particles) ── */}
        <circle r="2" fill={cfg.p1} filter={`url(#orbit-glow-${id})`}>
          <animateMotion
            dur="6.5s"
            repeatCount="indefinite"
            path="M 85 170 A 155 78 0 1 1 395 170 A 155 78 0 1 1 85 170"
          />
        </circle>
        <circle r="2" fill={cfg.p2} filter={`url(#orbit-glow-${id})`}>
          <animateMotion
            dur="9.5s"
            repeatCount="indefinite"
            path="M 30 170 A 210 115 0 1 0 450 170 A 210 115 0 1 0 30 170"
          />
        </circle>
      </svg>

      {/* ── 4. Central Major Node Floating Disc/Sphere (Dark Translucent + Aurora Glass) ── */}
      <div
        className={cn(
          "relative z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group overflow-hidden border",
          isLightMode
            ? "bg-white/95 border-slate-300 shadow-[0_10px_30px_rgba(0,0,0,0.08),0_0_20px_rgba(139,92,246,0.18)] hover:border-slate-400"
            : "bg-[#0A0C19]/90 border-white/[0.16] shadow-[0_0_24px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.6)]",
          !isLightMode && cfg.border,
          hoveredCardId ? "scale-[1.03]" : "scale-100"
        )}
        style={{
          boxShadow: !isLightMode
            ? `0 0 20px ${hoveredCardId ? cfg.glowHover : cfg.glow}, 0 10px 30px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.45), inset 0 -2px 5px rgba(0,0,0,0.6)`
            : undefined,
        }}
      >
        {/* Subtle Radial / Linear Aurora Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 20%, ${cfg.c1} 0%, ${cfg.c2} 50%, transparent 80%)`,
          }}
        />

        {/* Specular Edge Highlight Arc */}
        <div className="absolute inset-x-2 top-0.5 h-[45%] bg-gradient-to-b from-white/35 via-white/8 to-transparent pointer-events-none rounded-t-full" />

        {/* Central Icon Pod (Aurora Glass Medallion) */}
        <div
          className={cn(
            "relative z-10 w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-transform group-hover:scale-110 border",
            isLightMode
              ? "bg-slate-100 text-slate-800 border-slate-300 shadow-sm"
              : "bg-white/[0.08] border-white/[0.18] text-white"
          )}
          style={{
            boxShadow: !isLightMode ? `0 0 10px ${cfg.glow}` : undefined,
          }}
        >
          <CentralIcon
            className="w-4 h-4"
            style={{ color: !isLightMode ? cfg.accentLight : undefined }}
          />
        </div>

        {/* Central Title (Primary Text: #F4F6FA) */}
        <span
          className={cn(
            "relative z-10 text-xs sm:text-[13px] font-bold font-mono tracking-wider leading-none mb-1 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]",
            isLightMode ? "text-slate-900" : "text-[#F4F6FA]"
          )}
        >
          {centralTitle}
        </span>

        {/* Central Subtitle (Secondary Text: #A8B0BF) */}
        <span
          className={cn(
            "relative z-10 text-[7.5px] sm:text-[8.5px] font-mono font-semibold tracking-widest uppercase leading-tight px-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]",
            isLightMode ? "text-slate-600" : "text-[#A8B0BF]"
          )}
        >
          {centralSubtitle}
        </span>
      </div>

      {/* ── 5. Orbiting Floating Technology Pills (Dark Glass + Aurora Glow) ── */}
      {technologies.map((tech, idx) => {
        const Icon = tech.icon;
        const isHovered = hoveredCardId === tech.id;
        const pillAccent = cfg.pillColors[idx % cfg.pillColors.length];

        return (
          <div
            key={tech.id}
            onMouseEnter={() => handleCardEnter(tech.id)}
            onMouseLeave={handleCardLeave}
            className={cn(
              "absolute z-20 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl backdrop-blur-xl border transition-all duration-300 cursor-pointer flex items-center gap-1.5 group overflow-hidden",
              isLightMode
                ? "bg-white/95 border-slate-300 text-slate-900 shadow-sm"
                : "bg-[#0A0C19]/85 border-white/[0.12] text-[#F4F6FA] shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]",
              isHovered
                ? isLightMode
                  ? "border-slate-400 shadow-md -translate-y-2 scale-105"
                  : "-translate-y-2 scale-105 text-white"
                : "hover:border-white/30"
            )}
            style={{
              left: tech.x,
              top: tech.y,
              boxShadow:
                !isLightMode && isHovered
                  ? `0 0 16px ${cfg.glowHover}, 0 8px 24px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.5)`
                  : !isLightMode
                  ? `0 4px 16px rgba(0,0,0,0.6), 0 0 8px ${cfg.glow}, inset 0 1px 1px rgba(255,255,255,0.2)`
                  : undefined,
              borderColor: !isLightMode && isHovered ? pillAccent : undefined,
            }}
          >
            {/* Top Specular Rim Reflection */}
            <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-t-xl" />

            {/* Icon (Aurora Tone along spectrum) */}
            <div
              className={cn(
                "w-4 h-4 rounded-md flex items-center justify-center shrink-0 transition-transform relative z-10",
                isHovered ? "scale-115" : ""
              )}
            >
              <Icon
                className="w-3.5 h-3.5 transition-colors"
                style={{ color: !isLightMode ? pillAccent : undefined }}
              />
            </div>

            {/* Label (Primary Text: #F4F6FA) */}
            <span className="relative z-10 text-[10px] sm:text-[10.5px] font-mono font-semibold tracking-wide whitespace-nowrap text-[#F4F6FA] group-hover:text-white transition-colors">
              {tech.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(ClusterEcosystem);
