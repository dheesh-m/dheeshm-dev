"use client";

import React from "react";

interface Metric {
  label: string;
  value: number; // 0 to 100
}

const METRICS: Metric[] = [
  { label: "Problem Solving", value: 96 },
  { label: "System Design", value: 92 },
  { label: "AI/ML Knowledge", value: 95 },
  { label: "Creativity", value: 90 },
  { label: "Leadership", value: 85 },
];

export default function RadarChart({ className = "" }: { className?: string }) {
  const size = 260;
  const center = size / 2;
  const radius = 85;
  const total = METRICS.length;

  const getCoordinates = (index: number, val: number, r: number = radius) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const factor = val / 100;
    const x = center + r * factor * Math.cos(angle);
    const y = center + r * factor * Math.sin(angle);
    return { x, y, angle };
  };

  // Polygon points for grid levels (25%, 50%, 75%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  // Polygon points for data values
  const dataPoints = METRICS.map((m, i) => getCoordinates(i, m.value, radius));
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full max-w-[260px] overflow-visible">
        <defs>
          <radialGradient id="silver-radar-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#CBD5E1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#64748B" stopOpacity="0.08" />
          </radialGradient>
          <filter id="silver-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric Web Grid Polygons */}
        {gridLevels.map((lvl) => {
          const pts = METRICS.map((_, i) => {
            const { x, y } = getCoordinates(i, 100, radius * lvl);
            return `${x},${y}`;
          }).join(" ");
          return (
            <polygon
              key={lvl}
              points={pts}
              fill="none"
              stroke="#94A3B8"
              strokeWidth={lvl === 1.0 ? "1" : "0.75"}
              strokeOpacity={lvl === 1.0 ? 0.45 : 0.2}
              strokeDasharray={lvl < 1.0 ? "3 3" : undefined}
            />
          );
        })}

        {/* Axis Spokes from Center to Vertices */}
        {METRICS.map((_, i) => {
          const { x, y } = getCoordinates(i, 100, radius);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#94A3B8"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
          );
        })}

        {/* Data Shape with Silver/Platinum Fill and Luminous Border */}
        <polygon
          points={dataPath}
          fill="url(#silver-radar-fill)"
          stroke="#E2E8F0"
          strokeWidth="2"
          filter="url(#silver-glow)"
          className="transition-all duration-500 ease-out"
        />

        {/* Data Vertices Points with Specular Highlights */}
        {dataPoints.map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx={pt.x} cy={pt.y} r="7" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
          </g>
        ))}

        {/* Text Labels at Vertices */}
        {METRICS.map((m, i) => {
          const { angle } = getCoordinates(i, 100, radius);
          const labelDist = radius + 22;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          let textAnchor: "middle" | "start" | "end" = "middle";
          if (Math.cos(angle) > 0.3) textAnchor = "start";
          else if (Math.cos(angle) < -0.3) textAnchor = "end";

          return (
            <text
              key={m.label}
              x={lx}
              y={ly + 4}
              textAnchor={textAnchor}
              className="text-[9.5px] font-mono uppercase tracking-wider fill-slate-300 font-semibold"
            >
              {m.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
