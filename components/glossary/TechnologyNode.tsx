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
            "relative flex items-center justify-center cursor-crosshair transition-all duration-300",
            isActive || isRelated ? "scale-110 z-20" : "scale-100 z-10",
            isDimmed ? "opacity-30" : "opacity-100"
          )}
        >
          {/* Node Glow (only on active/related) */}
          {(isActive || isRelated) && (
            <motion.div
              layoutId={`glow-${technology.id}`}
              className="absolute inset-0 rounded-full bg-white/20 blur-md"
            />
          )}

          {/* Node Point */}
          <div className={cn(
            "w-2 h-2 rounded-full border bg-[#101010] transition-colors duration-300",
            isActive ? "border-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" : 
            isRelated ? "border-white/60" : "border-white/30"
          )} />

          {/* Node Label */}
          <span className={cn(
            "absolute left-4 whitespace-nowrap text-[10px] font-mono tracking-widest transition-colors duration-300",
            isActive ? "text-white font-bold" : 
            isRelated ? "text-[#F5F5F5]" : "text-gray-500 hover:text-gray-300"
          )}>
            {technology.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default memo(TechnologyNode);
