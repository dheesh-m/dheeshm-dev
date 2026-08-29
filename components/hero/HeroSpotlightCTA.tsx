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

  const spotlightColor = isLightMode
    ? "rgba(124, 58, 237, 0.16)"
    : "rgba(168, 85, 247, 0.28)";

  return (
    <Link
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative inline-flex h-11 sm:h-12 items-center justify-center gap-2 px-5 sm:px-6 rounded-lg text-xs sm:text-sm font-semibold tracking-wide transition-[border-color,box-shadow,transform,background-color] duration-200 outline-none select-none overflow-hidden shrink-0 border",
        isLightMode
          ? "bg-white/90 backdrop-blur-md border-slate-300 text-[#0F172A] shadow-sm hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.18)]"
          : "bg-[#0c0d14]/90 backdrop-blur-md border-white/15 text-white shadow-sm hover:border-violet-400/60 hover:shadow-[0_0_24px_rgba(168,85,247,0.28)]",
        "focus-visible:ring-2 focus-visible:ring-violet-500/50",
        className
      )}
    >
      {/* ── Pointer-following Spotlight Overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out"
        style={{
          opacity,
          background: `radial-gradient(130px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Subtle Top Specular Rim */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] pointer-events-none opacity-30 group-hover:opacity-70 transition-opacity duration-300"
        style={{
          background: isLightMode
            ? "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.4) 50%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
        }}
      />

      {/* ✦ Spark Icon */}
      <Sparkles
        className={cn(
          "w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12",
          isLightMode ? "text-violet-600" : "text-violet-400"
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
          isLightMode ? "text-violet-600" : "text-violet-300"
        )}
      />
    </Link>
  );
}
