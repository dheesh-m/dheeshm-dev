"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface ConnectionLineProps {
  radius: number;
  angleOffset: number;
  speed: number;
  isClockwise: boolean;
  isActive: boolean;
  isRelated: boolean;
  /** Orbits only run while the section is on screen. */
  isAnimating: boolean;
}

function ConnectionLine({
  radius,
  angleOffset,
  speed,
  isClockwise,
  isActive,
  isRelated,
  isAnimating
}: ConnectionLineProps) {
  const direction = isClockwise ? 1 : -1;
  const duration = speed * (isActive ? 3 : 1);
  const spin = isAnimating
    ? ({ duration, repeat: Infinity, ease: "linear" } as const)
    : ({ duration: 0 } as const);

  // We rotate a line that extends from center (0,0) to the node's radius
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none"
      initial={false}
      animate={{ rotate: isAnimating ? angleOffset + 360 * direction : angleOffset }}
      transition={spin}
    >
      <div 
        className="absolute top-0 left-0 h-[1px] origin-left"
        style={{ 
          width: radius, 
          backgroundColor: isActive || isRelated
            ? "rgba(95, 118, 146, 0.6)"
            : "rgba(113, 136, 163, 0.2)",
          transition: "background-color 0.3s ease"
        }}
      >
        {/* Animated Data Particle moving along the line */}
        {isAnimating && (isActive || isRelated) && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#5F7692] dark:bg-white shadow-[0_0_8px_rgba(95,118,146,0.6)]"
            initial={{ left: 0, opacity: 0 }}
            animate={{ left: radius, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default memo(ConnectionLine);
