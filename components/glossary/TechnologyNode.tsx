"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Technology } from "@/data/technologies";
import { cn } from "@/lib/utils";

interface TechnologyNodeProps {
  technology: Technology;
  radius: number;
  angleOffset: number;
  speed: number;
  isClockwise?: boolean;
  isActive: boolean;
  isRelated: boolean;
  isDimmed: boolean;
  /** Orbits only run while the section is on screen. */
  isAnimating: boolean;
  onHover: (tech: Technology | null, rect: DOMRect | null) => void;
}

function TechnologyNode({
  technology,
  radius,
  angleOffset,
  speed,
  isClockwise = true,
  isActive,
  isRelated,
  isDimmed,
  isAnimating,
  onHover
}: TechnologyNodeProps) {

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onHover(technology, e.currentTarget.getBoundingClientRect());
  };

  const handleMouseLeave = () => {
    onHover(null, null);
  };

  const direction = isClockwise ? 1 : -1;
  const duration = speed * (isActive ? 3 : 1); // Slow down significantly when active/hovered
  // `initial={false}` keeps the server and first client render identical.
  const spin = isAnimating
    ? ({ duration, repeat: Infinity, ease: "linear" } as const)
    : ({ duration: 0 } as const);

  return (
    // The wrapper acts as the rotating orbit track
    <motion.div
      className="absolute top-1/2 left-1/2 w-0 h-0"
      initial={false}
      animate={{ rotate: isAnimating ? angleOffset + 360 * direction : angleOffset }}
      transition={spin}
    >
      {/* The node is offset by the radius and counter-rotates to stay upright */}
      <motion.div
        className="absolute"
        style={{ x: radius, y: "-50%", top: "50%" }}
        initial={false}
        animate={{ rotate: isAnimating ? -(angleOffset + 360 * direction) : -angleOffset }}
        transition={spin}
      >
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative flex items-center justify-center cursor-pointer transition-[transform,opacity] duration-200 ease-out",
            isActive || isRelated ? "scale-110 z-20" : "scale-100 z-10",
            isDimmed ? "opacity-35" : "opacity-100"
          )}
        >
          {/* Node Glow (Subtle on active/related) */}
          {(isActive || isRelated) && (
            <motion.div
              layoutId={`glow-${technology.id}`}
              className="absolute inset-0 rounded-full bg-[#394E6E]/15 dark:bg-white/10 blur-sm"
            />
          )}

          {/* Distinct Node Sphere */}
          <div className={cn(
            "w-3 h-3 rounded-full transition-[transform,background-color,box-shadow] duration-200 ease-out flex items-center justify-center",
            isActive
              ? "bg-[#394E6E] dark:bg-white ring-2 ring-[#394E6E]/40 dark:ring-white/40 shadow-[0_0_8px_rgba(57,78,110,0.6)] dark:shadow-[0_0_8px_rgba(255,255,255,0.4)] scale-125"
              : isRelated
                ? "bg-[#394E6E] dark:bg-slate-300 ring-1 ring-[#394E6E]/40 dark:ring-white/20 shadow-[0_0_4px_rgba(57,78,110,0.4)] dark:shadow-[0_0_4px_rgba(255,255,255,0.2)]"
                : "bg-[#394E6E] dark:bg-white/70 ring-1 ring-[#394E6E]/30 dark:ring-white/10"
          )}>
            <div className="w-1 h-1 rounded-full bg-white dark:bg-slate-900" />
          </div>

          {/* Crisp, High-Contrast Node Label */}
          <span className={cn(
            "absolute left-4.5 whitespace-nowrap text-[11px] font-mono tracking-wider font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out px-2.5 py-0.5 rounded-md",
            isActive
              ? "text-white dark:text-white bg-[#394E6E] dark:bg-slate-900/90 shadow-md border border-[#394E6E] dark:border-white/20 scale-105"
              : isRelated
                ? "text-[#243347] dark:text-slate-200 bg-[#E9EDF1] dark:bg-black/60 shadow-sm border border-[#394E6E]/30 dark:border-white/10"
                : "text-[#394E6E] dark:text-gray-300 bg-[#EEF2F6] dark:bg-black/40 shadow-[0_1px_4px_rgba(57,78,110,0.06)] border border-[#394E6E]/25 dark:border-white/10 hover:text-[#171A1F] hover:bg-[#DCE3EC] dark:hover:text-white"
          )}>
            {technology.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default memo(TechnologyNode);
