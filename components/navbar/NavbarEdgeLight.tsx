"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

export default function NavbarEdgeLight() {
  const { isLightMode } = useTheme();

  return (
    <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden z-20">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          {/* Subtle White Beam Streak Gradient */}
          <linearGradient id="edge-light-beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="85%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Light Mode Steel-Blue Beam */}
          <linearGradient id="edge-light-beam-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#394E6E" stopOpacity="0" />
            <stop offset="40%" stopColor="#394E6E" stopOpacity="0.35" />
            <stop offset="85%" stopColor="#394E6E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#394E6E" stopOpacity="0" />
          </linearGradient>

          {/* Subtle Glow Filter */}
          <filter id="edge-light-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Traveling Single Light Streak Overlay */}
        <rect
          x="0.75"
          y="0.75"
          width="calc(100% - 1.5px)"
          height="calc(100% - 1.5px)"
          rx="9999"
          pathLength="100"
          fill="none"
          stroke={isLightMode ? "url(#edge-light-beam-light)" : "url(#edge-light-beam)"}
          strokeWidth="1.5"
          filter="url(#edge-light-glow)"
          className="navbar-traveling-beam"
        />
      </svg>
    </div>
  );
}
