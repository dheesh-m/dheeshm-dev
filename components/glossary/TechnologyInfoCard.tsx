"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Technology } from "@/data/technologies";

interface TechnologyInfoCardProps {
  technology: Technology | null;
  position: { x: number; y: number } | null;
}

export default function TechnologyInfoCard({ technology, position }: TechnologyInfoCardProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  
  // Viewport-safe coordinates
  const leftPos = position
    ? isMobile
      ? Math.max(16, Math.min(window.innerWidth - 304, (window.innerWidth - 288) / 2))
      : Math.min(Math.max(16, position.x + 20), (typeof window !== "undefined" ? window.innerWidth : 1200) - 304)
    : 0;

  const topPos = position
    ? isMobile
      ? Math.max(80, Math.min(position.y - 120, (typeof window !== "undefined" ? window.innerHeight : 800) - 240))
      : Math.max(20, Math.min(position.y - 40, (typeof window !== "undefined" ? window.innerHeight : 800) - 260))
    : 0;

  return (
    <AnimatePresence>
      {technology && position && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            left: leftPos,
            top: topPos,
          }}
          className="fixed z-50 w-[min(calc(100vw-32px),288px)] pointer-events-none"
        >
          {/* Ambient Violet Glow */}
          <div
            className="absolute -inset-2 rounded-2xl pointer-events-none -z-10"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(109, 40, 217, 0.10) 50%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          <div className="bg-[#0f1016]/90 backdrop-blur-2xl border border-white/[0.14] rounded-2xl p-5 shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(139,92,246,0.15)] relative overflow-hidden">
            {/* Top edge highlight */}
            <div
              className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 30%, rgba(167, 139, 250, 0.4) 50%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)",
              }}
            />

            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#A78BFA] shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
              <h4 className="text-[#CBD5E1] font-mono font-bold tracking-tight text-sm">
                {technology.name}
              </h4>
            </div>
            
            <p className="text-[#94A3B8] text-xs leading-relaxed mb-4 font-sans">
              {technology.description}
            </p>

            <div className="space-y-1 pt-2 border-t border-white/[0.08]">
              <span className="text-[9px] font-mono text-[#A78BFA] uppercase tracking-widest font-bold">
                Primary Uses
              </span>
              <ul className="text-[#94A3B8] text-[11px] font-mono list-disc list-inside space-y-0.5">
                {technology.useCases.slice(0, 3).map((uc, i) => (
                  <li key={i}>{uc}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
