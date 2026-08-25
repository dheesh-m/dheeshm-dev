"use client";

import { motion, AnimatePresence, MotionValue, useTransform, useMotionValue } from "framer-motion";
import { useState } from "react";

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

export default function SystemNode({ id, label, x, y, title, description, tech, isCenter, globalRotation }: SystemNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Provide a default motion value if none is passed
  const defaultRotation = useMotionValue(0);
  const rotationToUse = globalRotation || defaultRotation;

  // Counter-rotate the node so the text and tooltip stay upright
  const counterRotation = useTransform(rotationToUse, (r: number) => -r);

  return (
    <motion.g
      style={{ x, y, rotate: counterRotation }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      {/* Invisible stabilizer to lock the bounding box center to 0,0 */}
      {/* This prevents the transform-origin from shifting when the tooltip renders */}
      <circle cx={0} cy={0} r={400} fill="transparent" pointerEvents="none" />

      {/* Ambient glow for center node */}
      {isCenter && (
        <motion.circle
          r={60}
          fill="rgba(255, 255, 255, 0.05)"
          style={{ filter: "blur(15px)" }}
          pointerEvents="none"
        />
      )}

      {/* Hover glow for peripheral nodes */}
      {!isCenter && isHovered && (
        <motion.circle
          r={45}
          fill="rgba(255, 255, 255, 0.1)"
          style={{ filter: "blur(12px)" }}
          pointerEvents="none"
        />
      )}

      {/* Capsule Node via foreignObject */}
      <foreignObject x={-100} y={-30} width={200} height={60} className="overflow-visible pointer-events-none">
        <div className="w-full h-full flex items-center justify-center pointer-events-none">
          <motion.div
            className={`relative pointer-events-auto flex items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-500 ${
              isCenter 
                ? "px-5 py-2.5 bg-[#050505]/90 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]" 
                : "px-3 py-1.5 bg-[rgba(255,255,255,0.035)] border-[rgba(255,255,255,0.1)]"
            }`}
            animate={{
              scale: isHovered ? 1.05 : 1,
              borderColor: isHovered 
                ? "rgba(255, 255, 255, 0.4)" 
                : (isCenter ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"),
              backgroundColor: isHovered && !isCenter 
                ? "rgba(255, 255, 255, 0.08)" 
                : (isCenter ? "rgba(10, 10, 10, 0.9)" : "rgba(255, 255, 255, 0.035)")
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {isCenter && (
              <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]" />
            )}
            <span className={`whitespace-nowrap tracking-widest uppercase transition-colors duration-500 ${isCenter ? "text-[#F5F5F5] text-xs font-display" : "text-[10px] font-mono text-[#A1A1AA]"} ${isHovered && !isCenter ? "text-white" : ""}`}>
              {label}
            </span>
          </motion.div>
        </div>
      </foreignObject>

      {/* HTML tooltip rendered via foreignObject */}
      <AnimatePresence>
        {isHovered && (
          <motion.foreignObject
            x={45}
            y={-60}
            width={280}
            height={200}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 45, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-none z-50"
          >
            <div className="glass-panel p-4 rounded-xl border-white/10 bg-[#101010]/95 shadow-2xl">
              <div className="text-xs font-mono text-white mb-1">{label}</div>
              <div className="text-sm font-semibold text-white mb-2 leading-tight">{title}</div>
              <div className="text-[11px] text-gray-400 mb-3 leading-relaxed">{description}</div>
              <div className="flex flex-wrap gap-1.5">
                {tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-gray-300 border border-white/10 font-mono">
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
