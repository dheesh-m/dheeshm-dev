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
      {/* Cyber Speech Bubble Box with Silver / Platinum Styling */}
      <div className="relative p-4 sm:p-5 rounded-2xl bg-[#0d0f14]/90 backdrop-blur-xl border border-slate-400/35 shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.06)] min-h-[90px] flex items-center">
        {/* Subtle Silver Corner Accents */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-slate-200 rounded-tl" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-slate-200 rounded-br" />

        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="text-xs sm:text-[13px] font-mono leading-relaxed text-slate-200 italic"
          >
            &ldquo;{MESSAGES[index]}&rdquo;
          </motion.p>
        </AnimatePresence>

        {/* Speech Bubble Tail pointing down towards Deadpool Mascot */}
        <div
          className="absolute -bottom-2.5 left-10 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-slate-400/40"
        />
        <div
          className="absolute -bottom-2 left-10 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-[#0d0f14]"
        />
      </div>
    </div>
  );
}
