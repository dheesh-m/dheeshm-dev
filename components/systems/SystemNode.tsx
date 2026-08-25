"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Technology } from "@/data/technologies";
import { cn } from "@/lib/utils";

interface SystemNodeProps {
  technology: Technology;
  radius: number;
  angleOffset: number;
  speed: number;
  isClockwise?: boolean;
  isActive: boolean;
  isRelated: boolean;
  isDimmed: boolean;
  isHubActive: boolean;
  onHover: (tech: Technology | null, rect: DOMRect | null) => void;
}

function SystemNode({
  technology,
  radius,
  angleOffset,
  speed,
  isClockwise = true,
  isActive,
  isRelated,
  isDimmed,
  isHubActive,
  onHover
}: SystemNodeProps) {
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onHover(technology, e.currentTarget.getBoundingClientRect());
  };

  const handleMouseLeave = () => {
    onHover(null, null);
  };

  const direction = isClockwise ? 1 : -1;
  const duration = speed * (isActive || isHubActive ? 0.5 : 1); // Speed up when active

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-0 h-0"
      initial={{ rotate: angleOffset }}
      animate={{ rotate: angleOffset + (360 * direction) }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        ease: "linear"
      }}
    >
      <motion.div
        className="absolute"
        style={{ x: radius, y: "-50%", top: "50%" }}
        initial={{ rotate: -angleOffset }}
        animate={{ rotate: -(angleOffset + (360 * direction)) }}
        transition={{ 
          duration, 
          repeat: Infinity, 
          ease: "linear"
        }}
      >
        <div
          id={`node-${technology.id}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative flex items-center justify-center cursor-crosshair transition-all duration-500",
            isActive ? "scale-110 z-20" : isRelated ? "scale-105 z-20" : "scale-100 z-10",
            isDimmed ? "opacity-30" : "opacity-100"
          )}
        >
          {/* Subtle glow layer behind the node */}
          {(isActive || isRelated) && (
            <motion.div
              layoutId={`sys-glow-${technology.id}`}
              className="absolute inset-0 rounded-full bg-white/10 blur-md pointer-events-none"
            />
          )}

          {/* Node body */}
          <div className={cn(
            "px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border bg-[rgba(255,255,255,0.035)] backdrop-blur-md transition-colors duration-500",
            isActive ? "border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-white/10" : 
            isRelated ? "border-white/20 bg-white/5" : 
            "border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.06)]"
          )}>
            <span className={cn(
              "whitespace-nowrap text-[9px] md:text-[10px] font-mono tracking-widest transition-colors duration-500",
              isActive ? "text-white font-bold" : 
              isRelated ? "text-[#F5F5F5]" : "text-[#A1A1AA]"
            )}>
              {technology.name}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default memo(SystemNode);
