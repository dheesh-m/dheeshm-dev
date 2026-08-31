"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Technology } from "@/data/technologies";

interface TechnologyInfoCardProps {
  technology: Technology | null;
  position: { x: number; y: number } | null;
}

export default function TechnologyInfoCard({ technology, position }: TechnologyInfoCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const CARD_WIDTH = typeof window !== "undefined" ? Math.min(window.innerWidth - 32, 288) : 288;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const winWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  const winHeight = typeof window !== "undefined" ? window.innerHeight : 800;

  // Viewport-safe coordinates calculation with collision handling
  let leftPos = 16;
  let topPos = 80;

  if (position) {
    if (isMobile) {
      leftPos = Math.max(16, (winWidth - CARD_WIDTH) / 2);
      topPos = Math.max(70, Math.min(position.y - 120, winHeight - 240));
    } else {
      // Desktop: check if placing to the right would overflow right edge
      const placeRight = position.x + 24;
      const placeLeft = position.x - CARD_WIDTH - 24;

      if (placeRight + CARD_WIDTH <= winWidth - 16) {
        leftPos = placeRight;
      } else if (placeLeft >= 16) {
        leftPos = placeLeft;
      } else {
        // Center within viewport bounds if tight on both sides
        leftPos = Math.max(16, Math.min(winWidth - CARD_WIDTH - 16, position.x - CARD_WIDTH / 2));
      }

      topPos = Math.max(16, Math.min(position.y - 40, winHeight - 270));
    }
  }

  const content = (
    <AnimatePresence>
      {technology && position && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: leftPos,
            top: topPos,
            width: CARD_WIDTH,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          {/* Ambient Violet Glow */}
          <div
            className="absolute -inset-2 rounded-2xl pointer-events-none -z-10"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, rgba(109, 40, 217, 0.12) 50%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          <div className="bg-[#0f1016]/95 dark:bg-[#0f1016]/95 backdrop-blur-2xl border border-white/[0.16] rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_24px_rgba(139,92,246,0.2)] relative overflow-hidden">
            {/* Top edge highlight */}
            <div
              className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 30%, rgba(167, 139, 250, 0.5) 50%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)",
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

  return createPortal(content, document.body);
}
