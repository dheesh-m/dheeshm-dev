"use client";

import React, { memo } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

function CentralDigitalStar({ isHovered = false }: { isHovered?: boolean }) {
  const { isLightMode } = useTheme();

  return (
    <div className="relative w-28 h-28 flex items-center justify-center pointer-events-none select-none">
      {/* ── Volumetric Multi-Layer Ambient Bloom ── */}
      <div
        className={cn(
          "absolute w-44 h-44 rounded-full blur-[40px] transition-all duration-700",
          isLightMode
            ? "bg-gradient-to-tr from-violet-300/40 via-blue-300/30 to-indigo-300/40"
            : "bg-gradient-to-tr from-purple-600/30 via-indigo-500/35 to-blue-500/25",
          isHovered ? "scale-125 opacity-100" : "scale-100 opacity-80"
        )}
      />
      <div
        className={cn(
          "absolute w-24 h-24 rounded-full blur-[20px] transition-all duration-500",
          isLightMode
            ? "bg-blue-400/30"
            : "bg-violet-400/40",
          isHovered ? "scale-115 opacity-100" : "scale-100 opacity-85"
        )}
      />

      {/* ── Outer Thin Orbital Gyro-Rings ── */}
      <div
        className={cn(
          "absolute w-28 h-28 rounded-full border border-violet-400/30 dark:border-violet-400/35 animate-[spin_24s_linear_infinite]"
        )}
        style={{ transform: "rotateX(68deg) rotateY(18deg)" }}
      />
      <div
        className={cn(
          "absolute w-24 h-24 rounded-full border border-dashed border-cyan-400/35 dark:border-cyan-400/35 animate-[spin_18s_linear_infinite_reverse]"
        )}
        style={{ transform: "rotateY(62deg) rotateX(24deg)" }}
      />
      <div
        className={cn(
          "absolute w-20 h-20 rounded-full border border-indigo-400/30 dark:border-indigo-400/30 animate-[spin_14s_linear_infinite]"
        )}
        style={{ transform: "rotateX(45deg) rotateZ(35deg)" }}
      />

      {/* ── Circulating Orbiting Light Photons ── */}
      <div className="absolute inset-0 animate-[spin_7s_linear_infinite] pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8] translate-x-1" />
      </div>
      <div className="absolute inset-0 animate-[spin_10s_linear_infinite_reverse] pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#c084fc] -translate-x-2 translate-y-8" />
      </div>

      {/* ── Radiant Digital Star Core (Miniature Energy Reactor) ── */}
      <div
        className={cn(
          "relative z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300",
          isLightMode
            ? "bg-gradient-to-br from-white via-indigo-100 to-blue-200 shadow-[0_0_25px_rgba(99,102,241,0.6),0_0_12px_rgba(255,255,255,1)] border border-white"
            : "bg-gradient-to-br from-white via-violet-200 to-indigo-400 shadow-[0_0_30px_rgba(168,85,247,0.8),0_0_15px_rgba(255,255,255,1)] border border-white/80"
        )}
      >
        {/* Core Center White Point */}
        <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] animate-pulse" />
      </div>
    </div>
  );
}

export default memo(CentralDigitalStar);
