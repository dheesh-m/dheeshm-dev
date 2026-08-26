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
            "relative flex items-center justify-center cursor-pointer transition-all duration-300",
            isActive || isRelated ? "scale-110 z-20" : "scale-100 z-10",
            isDimmed ? "opacity-35" : "opacity-100"
          )}
        >
          {/* Node Glow (only on active/related) */}
          {(isActive || isRelated) && (
            <motion.div
              layoutId={`glow-${technology.id}`}
              className="absolute inset-0 rounded-full bg-purple-500/30 blur-md"
            />
          )}

          {/* Distinct Node Sphere */}
          <div className={cn(
            "w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center",
            isActive
              ? "bg-purple-600 dark:bg-purple-400 ring-4 ring-purple-400/50 shadow-[0_0_12px_rgba(147,51,234,0.8)] scale-125"
              : isRelated
                ? "bg-purple-500 dark:bg-purple-300 ring-2 ring-purple-400/40 shadow-[0_0_8px_rgba(147,51,234,0.5)]"
                : "bg-purple-600/85 dark:bg-white/85 ring-2 ring-purple-400/30 dark:ring-white/20 shadow-[0_0_6px_rgba(147,51,234,0.35)]"
          )}>
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>

          {/* Crisp, High-Contrast Node Label */}
          <span className={cn(
            "absolute left-4.5 whitespace-nowrap text-[11px] font-mono tracking-wider font-semibold transition-all duration-300 px-2 py-0.5 rounded-md",
            isActive
              ? "text-purple-950 dark:text-white bg-white/95 dark:bg-purple-950/80 shadow-md border border-purple-300 dark:border-purple-600 scale-105"
              : isRelated
                ? "text-purple-900 dark:text-purple-200 bg-white/85 dark:bg-black/60 shadow-sm border border-purple-200/60 dark:border-purple-800/40"
                : "text-[#29213f] dark:text-white/90 bg-white/75 dark:bg-black/40 shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-purple-200/40 dark:border-white/10 hover:text-purple-600 dark:hover:text-white"
          )}>
            {technology.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default memo(TechnologyNode);
