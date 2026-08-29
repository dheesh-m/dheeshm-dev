"use client";

import { memo } from "react";
import { Technology } from "@/data/technologies";
import { cn } from "@/lib/utils";

interface TechnologyNodeProps {
  technology: Technology;
  radius: number;
  isActive: boolean;
  isRelated: boolean;
  isDimmed: boolean;
  trackRef: (el: HTMLDivElement | null) => void;
  counterRef: (el: HTMLDivElement | null) => void;
  onHover: (tech: Technology | null, rect: DOMRect | null, isMouse: boolean) => void;
}

function TechnologyNode({
  technology,
  radius,
  isActive,
  isRelated,
  isDimmed,
  trackRef,
  counterRef,
  onHover,
}: TechnologyNodeProps) {
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    const isMouse =
      e.pointerType === "mouse" ||
      (typeof window !== "undefined" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    onHover(technology, e.currentTarget.getBoundingClientRect(), isMouse);
  };

  const handlePointerLeave = () => {
    onHover(null, null, false);
  };

  return (
    /* 1. The wrapper acts as the rotating orbit track */
    <div
      ref={trackRef}
      className="absolute top-1/2 left-1/2 w-0 h-0 origin-center will-change-transform pointer-events-none"
    >
      {/* 2. The node is offset by the radius and counter-rotates to stay upright */}
      <div
        ref={counterRef}
        className="absolute top-1/2 origin-center will-change-transform pointer-events-auto"
        style={{
          transform: `translate(${radius}px, -50%)`,
        }}
      >
        <div
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          className={cn(
            "relative flex items-center justify-center cursor-pointer transition-[transform,opacity] duration-200 ease-out select-none",
            isActive || isRelated ? "scale-110 z-30" : "scale-100 z-10",
            isDimmed ? "opacity-35" : "opacity-100"
          )}
        >
          {/* Node Glow (Subtle on active/related) */}
          {(isActive || isRelated) && (
            <div
              className="absolute inset-0 rounded-full bg-[#394E6E]/20 dark:bg-cyan-400/25 blur-md"
            />
          )}

          {/* Distinct Node Sphere */}
          <div
            className={cn(
              "w-3 h-3 rounded-full transition-[transform,background-color,box-shadow] duration-200 ease-out flex items-center justify-center",
              isActive
                ? "bg-[#394E6E] dark:bg-white ring-2 ring-[#394E6E]/40 dark:ring-cyan-400/60 shadow-[0_0_12px_rgba(57,78,110,0.8)] dark:shadow-[0_0_12px_rgba(56,189,248,0.7)] scale-125"
                : isRelated
                ? "bg-[#394E6E] dark:bg-slate-300 ring-1 ring-[#394E6E]/40 dark:ring-white/20 shadow-[0_0_4px_rgba(57,78,110,0.4)] dark:shadow-[0_0_4px_rgba(255,255,255,0.2)]"
                : "bg-[#394E6E] dark:bg-white/70 ring-1 ring-[#394E6E]/30 dark:ring-white/10"
            )}
          >
            <div className="w-1 h-1 rounded-full bg-white dark:bg-slate-900" />
          </div>

          {/* Crisp, High-Contrast Node Label */}
          <span
            className={cn(
              "absolute left-4.5 whitespace-nowrap text-[11px] font-mono tracking-wider font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out px-2.5 py-0.5 rounded-md",
              isActive
                ? "text-white dark:text-white bg-[#394E6E] dark:bg-slate-900/95 shadow-lg border border-[#394E6E] dark:border-cyan-400/50 scale-105"
                : isRelated
                ? "text-[#243347] dark:text-slate-200 bg-[#E9EDF1] dark:bg-black/60 shadow-sm border border-[#394E6E]/30 dark:border-white/10"
                : "text-[#394E6E] dark:text-gray-300 bg-[#EEF2F6] dark:bg-black/40 shadow-[0_1px_4px_rgba(57,78,110,0.06)] border border-[#394E6E]/25 dark:border-white/10 hover:text-[#171A1F] hover:bg-[#DCE3EC] dark:hover:text-white"
            )}
          >
            {technology.name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(TechnologyNode);
