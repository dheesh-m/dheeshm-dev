"use client";

import { motion, AnimatePresence, MotionValue, useTransform, useMotionValue } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

interface SystemNodeProps {
  id: string;
  label: string;
  x: number;
  y: number;
  title: string;
  description: string;
  tech: string[];
  isCenter?: boolean;
  globalRotation?: MotionValue<number>;
}

export default function SystemNode({ label, x, y, title, description, tech, isCenter, globalRotation }: SystemNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isLightMode } = useTheme();
  
  const defaultRotation = useMotionValue(0);
  const rotationToUse = globalRotation || defaultRotation;

  // Counter-rotate so text stays upright
  const counterRotation = useTransform(rotationToUse, (r: number) => -r);

  // Dynamic pill sizing
  const width = isCenter ? 72 : Math.max(54, label.length * 8.2 + 22);
  const height = isCenter ? 32 : 25;
  const rx = height / 2;

  return (
    <motion.g
      style={{ x, y, rotate: counterRotation }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
      className="cursor-pointer select-none"
    >
      {/* Invisible hit-area circle */}
      <circle cx={0} cy={0} r={35} fill="transparent" />

      {/* Ambient glow for center node */}
      {isCenter && (
        <circle
          cx={0}
          cy={0}
          r={50}
          fill={isLightMode ? "rgba(168, 85, 247, 0.25)" : "rgba(255, 255, 255, 0.08)"}
          style={{ filter: "blur(12px)" }}
          pointerEvents="none"
        />
      )}

      {/* Hover glow for peripheral nodes */}
      {!isCenter && isHovered && (
        <circle
          cx={0}
          cy={0}
          r={40}
          fill={isLightMode ? "rgba(168, 85, 247, 0.25)" : "rgba(255, 255, 255, 0.15)"}
          style={{ filter: "blur(10px)" }}
          pointerEvents="none"
        />
      )}

      {/* Center animated pulse ring */}
      {isCenter && (
        <circle
          cx={0}
          cy={0}
          r={24}
          fill="none"
          stroke={isLightMode ? "rgba(168, 85, 247, 0.5)" : "rgba(255, 255, 255, 0.2)"}
          strokeWidth={1}
          className="animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"
        />
      )}

      {/* Pure SVG Capsule Pill: 100% Reliable across iOS Safari, Chrome, and all mobile screens */}
      <motion.g
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <rect
          x={-width / 2}
          y={-height / 2}
          width={width}
          height={height}
          rx={rx}
          ry={rx}
          fill={
            isHovered && !isCenter
              ? (isLightMode ? "rgba(243, 240, 255, 0.98)" : "rgba(255, 255, 255, 0.12)")
              : (isCenter
                  ? (isLightMode ? "#FFFFFF" : "rgba(15, 15, 18, 0.95)")
                  : (isLightMode ? "rgba(255, 255, 255, 0.95)" : "rgba(20, 20, 24, 0.9)"))
          }
          stroke={
            isHovered
              ? (isLightMode ? "rgba(168, 85, 247, 0.8)" : "rgba(255, 255, 255, 0.5)")
              : (isCenter
                  ? (isLightMode ? "rgba(168, 85, 247, 0.6)" : "rgba(255, 255, 255, 0.3)")
                  : (isLightMode ? "rgba(160, 150, 210, 0.45)" : "rgba(255, 255, 255, 0.12)"))
          }
          strokeWidth={isCenter ? 1.5 : 1}
          style={{
            filter: isLightMode 
              ? "drop-shadow(0 2px 6px rgba(139, 92, 246, 0.1))" 
              : "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))"
          }}
        />

        <text
          x={0}
          y={1}
          dominantBaseline="middle"
          textAnchor="middle"
          fill={
            isHovered && !isCenter
              ? (isLightMode ? "#8B5CF6" : "#FFFFFF")
              : (isCenter
                  ? (isLightMode ? "#0F172A" : "#FFFFFF")
                  : (isLightMode ? "#1E293B" : "#D4D4D8"))
          }
          fontSize={isCenter ? 11 : 9.5}
          fontWeight={isCenter ? "800" : "700"}
          letterSpacing="0.08em"
          style={{
            fontFamily: "var(--font-display), var(--font-sans), sans-serif",
            textTransform: "uppercase"
          }}
        >
          {label}
        </text>
      </motion.g>

      {/* HTML tooltip rendered on hover (desktop) */}
      <AnimatePresence>
        {isHovered && (
          <motion.foreignObject
            x={width / 2 + 10}
            y={-60}
            width={260}
            height={180}
            initial={{ opacity: 0, x: width / 2 + 5, scale: 0.95 }}
            animate={{ opacity: 1, x: width / 2 + 10, scale: 1 }}
            exit={{ opacity: 0, x: width / 2 + 5, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-none z-50 overflow-visible"
          >
            <div className={`p-4 rounded-xl border shadow-2xl backdrop-blur-xl ${isLightMode ? "bg-white/95 border-purple-200 text-gray-900 shadow-purple-500/10" : "bg-[#101010]/95 border-white/10 text-white shadow-black/80"}`}>
              <div className="text-xs font-mono mb-1 text-purple-500 font-bold">{label}</div>
              <div className="text-sm font-semibold mb-1.5 leading-tight">{title}</div>
              <div className={`text-[11px] mb-3 leading-relaxed ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>{description}</div>
              <div className="flex flex-wrap gap-1.5">
                {tech.map((t) => (
                  <span key={t} className={`px-2 py-0.5 rounded text-[10px] font-mono border ${isLightMode ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-white/10 text-gray-300 border-white/10"}`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.foreignObject>
        )}
      </AnimatePresence>
    </motion.g>
  );
}
