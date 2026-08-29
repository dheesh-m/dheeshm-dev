"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "I'm like Deadpool. I break the problem, not the code. Well... sometimes the code too.",
  "I don't just write code. I build solutions that scale.",
  "Break the problem down. Then build the resilient system.",
  "Think different. Build faster. Ship with high impact.",
  "Clean architectures. Mission-critical reliability.",
  "With great code, comes great responsibility.",
];

export default function SpeechBubble({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Cyber Speech Bubble Box with Transparent Glassmorphic Rectangular Styling */}
      <div className="relative p-3 sm:p-3.5 rounded-lg bg-white/[0.04] backdrop-blur-md border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.3)] min-h-[70px] flex items-center">
        {/* Subtle Silver Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/60" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/60" />

        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 4, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, filter: "blur(3px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-[11px] sm:text-xs font-mono leading-relaxed text-slate-200 italic"
          >
            &ldquo;{MESSAGES[index]}&rdquo;
          </motion.p>
        </AnimatePresence>

        {/* Speech Bubble Tail */}
        <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white/20" />
        <div className="absolute -bottom-1.5 left-8 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-slate-900/60" />
      </div>
    </div>
  );
}
