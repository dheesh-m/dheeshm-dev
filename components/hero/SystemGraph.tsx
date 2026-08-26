"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import OrbitalSystem3D from "./OrbitalSystem3D";

const DESKTOP_QUERY = "(min-width: 640px)";

function subscribeToBreakpoint(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

// ── Lightweight 2D SVG fallback for small mobile screens ─────────────────────
const MOBILE_NODES = [
  { id: "llm",    label: "LLM",       x: 200, y: 250, isCenter: true },
  { id: "rag",    label: "RAG",       x: 80,  y: 140 },
  { id: "tools",  label: "TOOLS",     x: 320, y: 140 },
  { id: "memory", label: "MEMORY",    x: 200, y: 70  },
  { id: "agents", label: "AGENTS",    x: 200, y: 430 },
  { id: "vector", label: "VECTOR DB", x: 80,  y: 360 },
  { id: "api",    label: "API",       x: 320, y: 360 },
];

const MOBILE_CONN = [
  ["llm","rag"],["llm","tools"],["llm","memory"],
  ["llm","agents"],["llm","vector"],["llm","api"],
];

function MobileSVG({ isLight }: { isLight: boolean }) {
  const cx = 200, cy = 250;
  return (
    <svg viewBox="0 0 400 500" className="w-full h-full overflow-visible">
      <defs>
        <radialGradient id="m-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={isLight ? "rgba(168,85,247,0.28)" : "rgba(100,60,200,0.12)"} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={180} fill="url(#m-glow)" />
      <circle cx={cx} cy={cy} r={80}  fill="none" stroke={isLight ? "rgba(160,150,210,0.25)" : "rgba(255,255,255,0.04)"} strokeWidth={1} />
      <circle cx={cx} cy={cy} r={130} fill="none" stroke={isLight ? "rgba(160,150,210,0.30)" : "rgba(255,255,255,0.08)"} strokeWidth={1} strokeDasharray="4 4" />
      <circle cx={cx} cy={cy} r={180} fill="none" stroke={isLight ? "rgba(160,150,210,0.20)" : "rgba(255,255,255,0.04)"} strokeWidth={1} />
      {MOBILE_CONN.map(([s,t]) => {
        const sn = MOBILE_NODES.find(n=>n.id===s)!, tn = MOBILE_NODES.find(n=>n.id===t)!;
        return <line key={`${s}-${t}`} x1={sn.x} y1={sn.y} x2={tn.x} y2={tn.y} stroke={isLight ? "rgba(167,139,250,0.35)" : "rgba(255,255,255,0.07)"} strokeWidth={1} />;
      })}
      {MOBILE_NODES.map(node => {
        const w = node.isCenter ? 56 : Math.max(46, node.label.length*7.5+18), h = node.isCenter ? 28 : 22, rx = h/2;
        return (
          <g key={node.id}>
            <rect x={node.x-w/2} y={node.y-h/2} width={w} height={h} rx={rx} ry={rx}
              fill={node.isCenter ? (isLight ? "#FFFFFF" : "rgba(15,15,24,0.95)") : (isLight ? "rgba(255,255,255,0.92)" : "rgba(20,20,30,0.9)")}
              stroke={node.isCenter ? (isLight ? "rgba(168,85,247,0.6)" : "rgba(255,255,255,0.3)") : (isLight ? "rgba(160,150,210,0.4)" : "rgba(255,255,255,0.12)")}
              strokeWidth={node.isCenter ? 1.5 : 1}
            />
            <text x={node.x} y={node.y+1} dominantBaseline="middle" textAnchor="middle"
              fill={node.isCenter ? (isLight ? "#0F172A" : "#FFFFFF") : (isLight ? "#1E293B" : "#D4D4D8")}
              fontSize={node.isCenter ? 10 : 8.5} fontWeight="700" letterSpacing="1"
              style={{ fontFamily: "var(--font-display), sans-serif", textTransform: "uppercase" }}>
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function SystemGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLightMode } = useTheme();

  const isDesktop = useSyncExternalStore(
    subscribeToBreakpoint,
    useCallback(() => window.matchMedia(DESKTOP_QUERY).matches, []),
    useCallback(() => true, [])
  );

  return (
    <div ref={containerRef} className="w-full h-full">
      {isDesktop ? (
        <OrbitalSystem3D />
      ) : (
        <div className="w-full h-full max-w-[380px] mx-auto">
          <MobileSVG isLight={isLightMode} />
        </div>
      )}
    </div>
  );
}
