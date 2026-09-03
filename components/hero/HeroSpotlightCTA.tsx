"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface HeroSpotlightCTAProps {
  href?: string;
  className?: string;
}

export default function HeroSpotlightCTA({
  href = "/know-me-more",
  className = "",
}: HeroSpotlightCTAProps) {
  const { isLightMode } = useTheme();
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <Link
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative inline-flex h-11 sm:h-12 items-center justify-center gap-2 px-5 sm:px-6 rounded-lg text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 outline-none select-none overflow-hidden shrink-0 border",
        isLightMode
          ? "bg-white/90 backdrop-blur-md border-slate-300 text-[#0F172A] shadow-sm hover:border-[#22D3EE]/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          : "bg-[#0A0C19]/90 backdrop-blur-md border-white/15 text-[#F4F6FA] shadow-[0_0_14px_rgba(34,211,238,0.08)] hover:border-[#22D3EE]/50 hover:shadow-[0_0_24px_rgba(34,211,238,0.3),0_0_12px_rgba(139,92,246,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)]",
        "focus-visible:ring-2 focus-visible:ring-[#22D3EE]/50",
        className
      )}
    >
      {/* ── Cursor-following Aurora Spotlight Overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out"
        style={{
          opacity,
          background: isLightMode
            ? `radial-gradient(140px circle at ${position.x}px ${position.y}px, rgba(34, 211, 238, 0.15) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 80%)`
            : `radial-gradient(140px circle at ${position.x}px ${position.y}px, rgba(34, 211, 238, 0.22) 0%, rgba(139, 92, 246, 0.14) 45%, rgba(217, 70, 239, 0.06) 70%, transparent 85%)`,
        }}
      />

      {/* ── Subtle Top Aurora Specular Rim ── */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isLightMode
            ? "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.5) 50%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(34,211,238,0.6) 50%, rgba(255,255,255,0.3) 80%, transparent 100%)",
        }}
      />

      {/* ✦ Aurora Sparkle Icon */}
      <Sparkles
        className={cn(
          "w-3.5 h-3.5 transition-all duration-200 group-hover:scale-110 group-hover:rotate-12",
          isLightMode
            ? "text-indigo-600 group-hover:text-cyan-600"
            : "text-[#22D3EE] group-hover:text-[#67e8f9] drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
        )}
      />

      {/* Text */}
      <span className="relative z-10 font-sans tracking-wide">
        ABOUT ME
      </span>

      {/* → Arrow */}
      <ArrowRight
        className={cn(
          "w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:translate-x-1",
          isLightMode
            ? "text-indigo-600 group-hover:text-cyan-600"
            : "text-[#38BDF8] group-hover:text-white"
        )}
      />
    </Link>
  );
}

