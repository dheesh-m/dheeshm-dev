"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Technology } from "@/data/technologies";

interface TechnologyInfoCardProps {
  technology: Technology | null;
  position: { x: number; y: number } | null;
}

export default function TechnologyInfoCard({ technology, position }: TechnologyInfoCardProps) {
  return (
    <AnimatePresence>
      {technology && position && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            left: position.x + 30, // Offset from mouse/node
            top: position.y - 40,
          }}
          className="fixed z-50 w-72 pointer-events-none"
        >
          <div className="bg-white/95 dark:bg-[#050505]/90 backdrop-blur-xl border border-[#D9DEE4] dark:border-white/10 rounded-xl p-5 shadow-[0_12px_36px_rgba(57,78,110,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#394E6E] dark:bg-white shadow-[0_0_8px_rgba(57,78,110,0.8)] dark:shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <h4 className="text-[#171A1F] dark:text-white font-mono font-bold tracking-tight text-sm">
                {technology.name}
              </h4>
            </div>
            
            <p className="text-[#66717D] dark:text-gray-400 text-xs leading-relaxed mb-4 font-sans">
              {technology.description}
            </p>

            <div className="space-y-1">
              <span className="text-[9px] font-mono text-[#394E6E] dark:text-[#F5F5F5] uppercase tracking-widest font-bold">
                Primary Uses
              </span>
              <ul className="text-[#334155] dark:text-gray-500 text-[11px] font-mono list-disc list-inside">
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
