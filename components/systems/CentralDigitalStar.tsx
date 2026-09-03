"use client";

import React, { memo } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

function CentralDigitalStar({ isHovered = false }: { isHovered?: boolean }) {
  const { isLightMode } = useTheme();

  return (
    <div className="relative w-28 h-28 flex items-center justify-center pointer-events-none select-none">
      {/* ── Volumetric Multi-Layer Aurora Ambient Bloom ── */}
      {/* Outer Halo: Violet & Magenta */}
      <div
        className={cn(
          "absolute w-48 h-48 rounded-full blur-[44px] transition-all duration-700",
          isLightMode
            ? "bg-gradient-to-tr from-[#8B5CF6]/30 via-[#38BDF8]/25 to-[#D946EF]/25"
            : "bg-gradient-to-tr from-[#8B5CF6]/25 via-[#22D3EE]/20 to-[#D946EF]/20",
          isHovered ? "scale-130 opacity-100" : "scale-100 opacity-75"
        )}
      />
      {/* Mid Aura: Cyan & Electric Blue */}
      <div
        className={cn(
          "absolute w-32 h-32 rounded-full blur-[22px] transition-all duration-500",
          isLightMode
            ? "bg-gradient-to-tr from-[#22D3EE]/40 via-[#8B5CF6]/35 to-[#EC4899]/30"
            : "bg-gradient-to-tr from-[#22D3EE]/30 via-[#38BDF8]/25 to-[#8B5CF6]/25",
          isHovered ? "scale-120 opacity-100" : "scale-100 opacity-80"
        )}
      />
      {/* Inner Radiant Halo: Lavender / White */}
      <div
        className={cn(
          "absolute w-16 h-16 rounded-full blur-[10px] transition-all duration-300",
          isLightMode ? "bg-[#38BDF8]/50" : "bg-[#22D3EE]/40",
          isHovered ? "scale-115 opacity-100" : "scale-100 opacity-85"
        )}
      />

      {/* ── Outer Thin Orbital Gyro-Rings (Aurora-Toned Precision Rings) ── */}
      <div
        className={cn(
          "absolute w-28 h-28 rounded-full border border-[#8B5CF6]/40 dark:border-[#8B5CF6]/35 shadow-[0_0_12px_rgba(139,92,246,0.25)] animate-[spin_24s_linear_infinite]"
        )}
        style={{ transform: "rotateX(68deg) rotateY(18deg)" }}
      />
      <div
        className={cn(
          "absolute w-24 h-24 rounded-full border border-dashed border-[#22D3EE]/45 dark:border-[#22D3EE]/40 shadow-[0_0_10px_rgba(34,211,238,0.25)] animate-[spin_18s_linear_infinite_reverse]"
        )}
        style={{ transform: "rotateY(62deg) rotateX(24deg)" }}
      />
      <div
        className={cn(
          "absolute w-20 h-20 rounded-full border border-[#D946EF]/35 dark:border-[#D946EF]/30 shadow-[0_0_10px_rgba(217,70,239,0.2)] animate-[spin_14s_linear_infinite]"
        )}
        style={{ transform: "rotateX(45deg) rotateZ(35deg)" }}
      />

      {/* ── Circulating Orbiting Light Photons (Cyan & Magenta Specular Points) ── */}
      <div className="absolute inset-0 animate-[spin_7s_linear_infinite] pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE,0_0_14px_rgba(34,211,238,0.85)] translate-x-1" />
      </div>
      <div className="absolute inset-0 animate-[spin_10s_linear_infinite_reverse] pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#D946EF] shadow-[0_0_8px_#D946EF,0_0_12px_rgba(217,70,239,0.85)] -translate-x-2 translate-y-8" />
      </div>

      {/* ── Radiant Digital Star Core (White/Lavender Center with Aurora Rim) ── */}
      <div
        className={cn(
          "relative z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 relative overflow-hidden",
          isLightMode
            ? "bg-gradient-to-br from-white via-[#EDE9FE] to-[#C4B5FD] border border-[#22D3EE]/60"
            : "bg-gradient-to-br from-white via-[#E0E7FF] to-[#A78BFA] border border-[#22D3EE]/70"
        )}
        style={{
          boxShadow: isLightMode
            ? "0 0 25px rgba(255,255,255,0.95), 0 0 16px rgba(34,211,238,0.7), 0 0 32px rgba(139,92,246,0.4), inset 0 1px 2px #ffffff, inset 0 -2px 4px rgba(139,92,246,0.4)"
            : "0 0 30px rgba(255,255,255,0.95), 0 0 18px rgba(34,211,238,0.8), 0 0 36px rgba(139,92,246,0.5), inset 0 1px 2px #ffffff, inset 0 -2px 4px rgba(139,92,246,0.6)"
        }}
      >
        {/* Glossy top bevel reflection */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 via-white/25 to-transparent pointer-events-none rounded-t-full" />
        
        {/* Core Center White Point */}
        <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_22px_#38BDF8] animate-pulse relative z-10" />
      </div>
    </div>
  );
}

export default memo(CentralDigitalStar);
