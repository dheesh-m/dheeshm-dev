"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface ConnectionLineProps {
  radius: number;
  isActive: boolean;
  isRelated: boolean;
  isPaused: boolean;
  lineRef: (el: HTMLDivElement | null) => void;
}

function ConnectionLine({
  radius,
  isActive,
  isRelated,
  isPaused,
  lineRef,
}: ConnectionLineProps) {
  return (
    <div
      ref={lineRef}
      className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none origin-center will-change-transform"
    >
      <div
        className="absolute top-0 left-0 h-[1px] origin-left"
        style={{
          width: radius,
          backgroundColor: isActive || isRelated
            ? "rgba(57, 78, 110, 0.85)"
            : "rgba(57, 78, 110, 0.35)",
          transition: "background-color 0.3s ease",
        }}
      >
        {/* Animated Data Particle moving along the line */}
        {(isActive || isRelated) && (
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#394E6E] dark:bg-white shadow-[0_0_8px_rgba(57,78,110,0.8)] dark:shadow-[0_0_8px_rgba(255,255,255,0.8)]",
              "animate-[pulseParticle_2s_linear_infinite]"
            )}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default memo(ConnectionLine);
