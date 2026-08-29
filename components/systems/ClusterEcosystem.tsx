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
  theme: "purple" | "blue" | "indigo" | "cyan" | "red";
  technologies: OrbitTechItem[];
  onHoverTech?: (techId: string | null) => void;
  isHoveredOverall?: boolean;
}

export default function ClusterEcosystem({
  id,
  badge,
  centralTitle,
  centralSubtitle,
  centralIcon: CentralIcon,
  theme,
  technologies,
  onHoverTech,
  isHoveredOverall = false,
}: ClusterProps) {
  const { isLightMode } = useTheme();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const isPurple = theme === "purple" || theme === "indigo";
  const isRed = theme === "red";

  const handleCardEnter = (techId: string) => {
    setHoveredCardId(techId);
    onHoverTech?.(techId);
  };

  const handleCardLeave = () => {
    setHoveredCardId(null);
    onHoverTech?.(null);
  };

  // Color tokens based on theme
  const getGradientColors = () => {
    if (isRed) {
      return {
        c1: "#EF4444",
        c2: "#F43F5E",
        c3: "#DC2626",
        c4: "#FB7185",
        c5: "#E11D48",
        p1: "#FDA4AF",
        p2: "#FB7185",
        glow: "rgba(244, 63, 94, 0.22)",
      };
    }
    if (isPurple) {
      return {
        c1: "#A855F7",
        c2: "#C084FC",
        c3: "#6366F1",
        c4: "#EC4899",
        c5: "#8B5CF6",
        p1: "#F472B6",
        p2: "#C084FC",
        glow: "rgba(168, 85, 247, 0.18)",
      };
    }
    return {
      c1: "#38BDF8",
      c2: "#60A5FA",
      c3: "#06B6D4",
      c4: "#06B6D4",
      c5: "#3B82F6",
      p1: "#38BDF8",
      p2: "#67E8F9",
      glow: "rgba(56, 189, 248, 0.18)",
    };
  };

  const colors = getGradientColors();

  return (
    <div className="relative w-[480px] h-[340px] flex items-center justify-center select-none">
      {/* ── 1. Top Cluster Badge ── */}
      <div className="absolute top-2 left-6 z-30">
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono font-semibold tracking-wider uppercase backdrop-blur-xl border transition-all",
            isLightMode
              ? isRed
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : isPurple
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
              : isRed
              ? "bg-[#200A12]/85 text-rose-300 border-rose-500/35 shadow-[0_0_12px_rgba(244,63,94,0.2)]"
              : isPurple
              ? "bg-[#18112C]/80 text-violet-300 border-violet-500/30 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
              : "bg-[#0E1B2C]/80 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(56,189,248,0.15)]"
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full animate-pulse",
              isRed ? "bg-rose-400" : isPurple ? "bg-violet-400" : "bg-cyan-400"
            )}
          />
          <span>{badge}</span>
        </div>
      </div>

      {/* ── 2. Atmospheric Ambient Cluster Glow ── */}
      <div
        className={cn(
          "absolute w-[360px] h-[260px] rounded-full blur-[70px] pointer-events-none transition-all duration-700 -z-10",
          isLightMode
            ? isRed
              ? "bg-rose-200/30"
              : isPurple
              ? "bg-purple-200/30"
              : "bg-blue-200/30"
            : isRed
            ? "bg-rose-950/30"
            : isPurple
            ? "bg-purple-900/25"
            : "bg-blue-900/25",
          hoveredCardId || isHoveredOverall ? "scale-115 opacity-100" : "scale-100 opacity-60"
        )}
      />

      {/* ── 3. Multi-Layer Concentric Elliptical Orbital Rings (SVG) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        viewBox="0 0 480 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`orbit-grad-${id}-1`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.c1} stopOpacity="0.85" />
            <stop offset="50%" stopColor={colors.c2} stopOpacity="0.45" />
            <stop offset="100%" stopColor={colors.c3} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={`orbit-grad-${id}-2`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.c4} stopOpacity="0.75" />
            <stop offset="100%" stopColor={colors.c5} stopOpacity="0.75" />
          </linearGradient>
          <filter id={`orbit-glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbit Ring 1 (Inner Ellipse) */}
        <ellipse
          cx="240"
          cy="170"
          rx="155"
          ry="78"
          stroke={`url(#orbit-grad-${id}-1)`}
          strokeWidth={hoveredCardId ? "1.6" : "1.1"}
          strokeDasharray={isLightMode ? "4 4" : "none"}
          opacity={isLightMode ? 0.5 : 0.4}
          filter={`url(#orbit-glow-${id})`}
          className="transition-all duration-300"
        />

        {/* Orbit Ring 2 (Outer Ellipse with slight angle) */}
        <ellipse
          cx="240"
          cy="170"
          rx="210"
          ry="115"
          stroke={`url(#orbit-grad-${id}-2)`}
          strokeWidth={hoveredCardId ? "1.6" : "1.0"}
          strokeDasharray="6 6"
          opacity={isLightMode ? 0.45 : 0.35}
          filter={`url(#orbit-glow-${id})`}
          className="transition-all duration-300"
        />

        {/* Orbit Ring 3 (Outer Halo Guide) */}
        <ellipse
          cx="240"
          cy="170"
          rx="235"
          ry="130"
          stroke={colors.glow}
          strokeWidth="0.8"
          opacity={isLightMode ? 0.3 : 0.2}
        />

        {/* ── Traveling Photons on Orbits ── */}
        <circle r="2" fill={colors.p1} filter={`url(#orbit-glow-${id})`}>
          <animateMotion
            dur="6.5s"
            repeatCount="indefinite"
            path="M 85 170 A 155 78 0 1 1 395 170 A 155 78 0 1 1 85 170"
          />
        </circle>
        <circle r="2" fill={colors.p2} filter={`url(#orbit-glow-${id})`}>
          <animateMotion
            dur="9.5s"
            repeatCount="indefinite"
            path="M 30 170 A 210 115 0 1 0 450 170 A 210 115 0 1 0 30 170"
          />
        </circle>
      </svg>

      {/* ── 4. Central Technology Floating Disc/Sphere ── */}
      <div
        className={cn(
          "relative z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group",
          isLightMode
            ? isRed
              ? "bg-white/95 border border-rose-300 shadow-[0_8px_30px_rgba(244,63,94,0.15)] hover:border-rose-400"
              : isPurple
              ? "bg-white/95 border border-purple-300 shadow-[0_8px_30px_rgba(168,85,247,0.15)] hover:border-purple-400"
              : "bg-white/95 border border-blue-300 shadow-[0_8px_30px_rgba(56,189,248,0.15)] hover:border-blue-400"
            : isRed
            ? "bg-gradient-to-b from-[#2C0C16]/95 to-[#130509]/95 border border-rose-400/40 shadow-[0_0_35px_rgba(244,63,94,0.35)] hover:border-rose-300 hover:shadow-[0_0_45px_rgba(244,63,94,0.55)]"
            : isPurple
            ? "bg-gradient-to-b from-[#1E1438]/95 to-[#0E091D]/95 border border-violet-400/40 shadow-[0_0_35px_rgba(168,85,247,0.3)] hover:border-violet-300 hover:shadow-[0_0_45px_rgba(168,85,247,0.5)]"
            : "bg-gradient-to-b from-[#10243E]/95 to-[#081220]/95 border border-cyan-400/40 shadow-[0_0_35px_rgba(56,189,248,0.3)] hover:border-cyan-300 hover:shadow-[0_0_45px_rgba(56,189,248,0.5)]",
          hoveredCardId ? "scale-[1.03]" : "scale-100"
        )}
      >
        {/* Specular Edge Highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none rounded-full" />

        {/* Central Icon */}
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-transform group-hover:scale-110",
            isLightMode
              ? isRed
                ? "bg-rose-100 text-rose-700"
                : isPurple
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
              : isRed
              ? "bg-rose-500/20 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.4)]"
              : isPurple
              ? "bg-violet-500/20 text-violet-300 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
              : "bg-cyan-500/20 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
          )}
        >
          <CentralIcon className="w-4 h-4" />
        </div>

        {/* Central Title */}
        <span
          className={cn(
            "text-xs sm:text-[13px] font-bold font-mono tracking-wider leading-none mb-1 uppercase",
            isLightMode ? "text-slate-900" : "text-white"
          )}
        >
          {centralTitle}
        </span>

        {/* Central Subtitle */}
        <span
          className={cn(
            "text-[7.5px] sm:text-[8.5px] font-mono font-semibold tracking-widest uppercase leading-tight px-1",
            isLightMode
              ? "text-slate-500"
              : isRed
              ? "text-rose-300/90"
              : isPurple
              ? "text-violet-300/90"
              : "text-cyan-300/90"
          )}
        >
          {centralSubtitle}
        </span>
      </div>

      {/* ── 5. Orbiting Floating Technology Cards ── */}
      {technologies.map((tech) => {
        const Icon = tech.icon;
        const isHovered = hoveredCardId === tech.id;
        return (
          <div
            key={tech.id}
            onMouseEnter={() => handleCardEnter(tech.id)}
            onMouseLeave={handleCardLeave}
            className={cn(
              "absolute z-20 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl backdrop-blur-xl border transition-all duration-300 cursor-pointer flex items-center gap-1.5 shadow-md",
              isLightMode
                ? "bg-white/95 border-slate-300 text-slate-900 shadow-sm"
                : "bg-[#0E0F18]/90 border-white/[0.14] text-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.6)]",
              isHovered
                ? isRed
                  ? "border-rose-400 text-white shadow-[0_0_18px_rgba(244,63,94,0.45)] -translate-y-2 scale-105"
                  : isPurple
                  ? "border-violet-400 text-white shadow-[0_0_18px_rgba(168,85,247,0.45)] -translate-y-2 scale-105"
                  : "border-cyan-400 text-white shadow-[0_0_18px_rgba(56,189,248,0.45)] -translate-y-2 scale-105"
                : isRed
                ? "hover:border-rose-400/50"
                : "hover:border-white/30"
            )}
            style={{
              left: tech.x,
              top: tech.y,
            }}
          >
            {/* Top Specular Rim */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

            <div
              className={cn(
                "w-4 h-4 rounded-md flex items-center justify-center shrink-0 transition-transform",
                isLightMode
                  ? "text-slate-700"
                  : isRed
                  ? "text-rose-300"
                  : isPurple
                  ? "text-violet-300"
                  : "text-cyan-300",
                isHovered ? "scale-115" : ""
              )}
            >
              <Icon className="w-3.5 h-3.5" />
            </div>

            <span className="text-[10px] sm:text-[10.5px] font-mono font-semibold tracking-wide whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
