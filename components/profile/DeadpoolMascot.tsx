"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DeadpoolMascotProps {
  className?: string;
  isAvatar?: boolean;
}

const TOTAL_POSES = 8;

export default function DeadpoolMascot({
  className = "",
  isAvatar = false,
}: DeadpoolMascotProps) {
  // Random pose on mount/reload (0 to 7), then rotates smoothly
  const [poseIndex, setPoseIndex] = useState(0);

  useEffect(() => {
    // Pick random pose on initial client load
    setPoseIndex(Math.floor(Math.random() * TOTAL_POSES));

    // Rotate pose dynamically every 4.5s just like the speech messages
    const timer = setInterval(() => {
      setPoseIndex((prev) => (prev + 1) % TOTAL_POSES);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handleMascotClick = () => {
    setPoseIndex((prev) => (prev + 1) % TOTAL_POSES);
  };

  if (isAvatar) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Cyber Glow Ring (Silver / Platinum) */}
          <circle cx="60" cy="60" r="54" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.6" />
          <circle cx="60" cy="60" r="49" fill="url(#avatar-silver-grad)" stroke="#FFFFFF" strokeWidth="1.5" />
          
          <defs>
            <radialGradient id="avatar-silver-grad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <linearGradient id="suit-red-av" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF334B" />
              <stop offset="50%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>
            <linearGradient id="suit-black-av" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#27272A" />
              <stop offset="100%" stopColor="#09090B" />
            </linearGradient>
            <linearGradient id="blade-silver-av" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>

          {/* Swords Handle Back */}
          <path d="M 28 22 L 42 40" stroke="url(#blade-silver-av)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 92 22 L 78 40" stroke="url(#blade-silver-av)" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="22" y="16" width="10" height="5" rx="1.5" fill="#E11D48" transform="rotate(-40 27 18)" />
          <rect x="88" y="16" width="10" height="5" rx="1.5" fill="#E11D48" transform="rotate(40 93 18)" />

          {/* Head Base */}
          <ellipse cx="60" cy="62" rx="33" ry="30" fill="url(#suit-red-av)" stroke="#991B1B" strokeWidth="1.2" />
          
          {/* Black Mask Eye Patches */}
          <path
            d="M 37 49 C 34 59, 39 72, 51 72 C 55 72, 56 61, 54 51 C 52 44, 43 43, 37 49 Z"
            fill="url(#suit-black-av)"
            stroke="#09090B"
            strokeWidth="1.2"
          />
          <path
            d="M 83 49 C 86 59, 81 72, 69 72 C 65 72, 64 61, 66 51 C 68 44, 77 43, 83 49 Z"
            fill="url(#suit-black-av)"
            stroke="#09090B"
            strokeWidth="1.2"
          />

          {/* Expressive White Eyes */}
          <ellipse cx="46" cy="58" rx="6" ry="8" fill="#FFFFFF" transform="rotate(-8 46 58)" />
          <ellipse cx="74" cy="58" rx="6" ry="8" fill="#FFFFFF" transform="rotate(8 74 58)" />

          {/* Specular Eye Highlights */}
          <circle cx="48" cy="55" r="2" fill="#FFFFFF" />
          <circle cx="72" cy="55" r="2" fill="#FFFFFF" />

          {/* Head Center Seam */}
          <path d="M 60 32 L 60 52" stroke="#4C0519" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>
    );
  }

  // Full-body Chibi Mascot with 8 Dynamic Rotating Poses
  return (
    <div
      onClick={handleMascotClick}
      title="Click to cycle pose!"
      className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
    >
      {/* Floating Ambient Shadow Underneath */}
      <div className="absolute -bottom-1 w-28 h-2 rounded-full bg-white/10 blur-sm animate-mascot-shadow" />

      {/* Floating Animated Mascot Shell */}
      <div className="relative animate-mascot-float transition-transform duration-200 group-hover:scale-105">
        <AnimatePresence mode="wait">
          <motion.div
            key={poseIndex}
            initial={{ opacity: 0, scale: 0.92, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -4 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <svg
              viewBox="0 0 160 140"
              className="w-full h-auto drop-shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mascot-red" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF334B" />
                  <stop offset="50%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#9F1239" />
                </linearGradient>
                <linearGradient id="mascot-black" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#27272A" />
                  <stop offset="100%" stopColor="#09090B" />
                </linearGradient>
                <linearGradient id="mascot-blade" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#CBD5E1" />
                  <stop offset="100%" stopColor="#64748B" />
                </linearGradient>
                <linearGradient id="taco-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>

              {/* ── 1. COMMON BACKGROUND: Dual Crossed Katanas ── */}
              {poseIndex !== 5 && (
                <>
                  <path d="M 35 30 L 125 110" stroke="url(#mascot-blade)" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 125 30 L 35 110" stroke="url(#mascot-blade)" strokeWidth="4" strokeLinecap="round" />
                  <rect x="28" y="24" width="10" height="5" rx="1.5" fill="#E11D48" stroke="#09090B" strokeWidth="1" transform="rotate(-42 33 26)" />
                  <rect x="122" y="24" width="10" height="5" rx="1.5" fill="#E11D48" stroke="#09090B" strokeWidth="1" transform="rotate(42 127 26)" />
                </>
              )}

              {/* ── 2. POSE 5: SLEEPING / SNOOZING (Special Layout) ── */}
              {poseIndex === 5 ? (
                <g>
                  {/* Katana resting horizontally behind */}
                  <path d="M 25 105 L 135 105" stroke="url(#mascot-blade)" strokeWidth="4" strokeLinecap="round" />
                  <rect x="20" y="102" width="10" height="6" rx="1.5" fill="#E11D48" stroke="#09090B" strokeWidth="1" />

                  {/* Curled Body */}
                  <ellipse cx="65" cy="100" rx="32" ry="18" fill="url(#mascot-red)" stroke="#881337" strokeWidth="1.2" />
                  <ellipse cx="40" cy="100" rx="10" ry="7" fill="url(#mascot-black)" />

                  {/* Sleeping Head tilted resting on folded hands */}
                  <ellipse cx="102" cy="78" rx="34" ry="30" fill="url(#mascot-red)" stroke="#9F1239" strokeWidth="1.2" transform="rotate(15 102 78)" />
                  
                  {/* Mask Patches */}
                  <path d="M 80 66 C 76 76, 82 88, 94 88 C 98 88, 98 78, 96 70 C 94 64, 86 62, 80 66 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.2" />
                  <path d="M 120 72 C 124 82, 118 94, 106 94 C 102 94, 102 84, 104 76 C 106 70, 114 68, 120 72 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.2" />

                  {/* Sleeping Closed Curved Eyes (- -) */}
                  <path d="M 84 76 Q 88 80 92 76" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M 108 80 Q 112 84 116 80" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                  {/* Little folded chibi arms */}
                  <ellipse cx="88" cy="98" rx="8" ry="5" fill="url(#mascot-black)" />

                  {/* Floating Zzz letters */}
                  <motion.g
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: [0, 1, 0.8, 0], y: [-2, -14, -24, -32], x: [0, 4, 8, 12] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                  >
                    <text x="126" y="44" fill="#CBD5E1" fontSize="11" fontWeight="bold" fontFamily="monospace">Z</text>
                    <text x="135" y="32" fill="#94A3B8" fontSize="9" fontWeight="bold" fontFamily="monospace">z</text>
                    <text x="142" y="22" fill="#64748B" fontSize="7.5" fontWeight="bold" fontFamily="monospace">z</text>
                  </motion.g>
                </g>
              ) : (
                <>
                  {/* ── 3. COMMON BODY FOR ACTIVE POSES ── */}
                  <ellipse cx="80" cy="98" rx="28" ry="24" fill="url(#mascot-red)" stroke="#881337" strokeWidth="1.2" />

                  {/* Black Side Torso Panels */}
                  <path d="M 54 88 C 62 84, 70 84, 74 88 C 68 112, 58 110, 54 88 Z" fill="url(#mascot-black)" />
                  <path d="M 106 88 C 98 84, 90 84, 86 88 C 92 112, 102 110, 106 88 Z" fill="url(#mascot-black)" />

                  {/* Cute Chibi Feet Tucked Below */}
                  <ellipse cx="64" cy="118" rx="10" ry="7" fill="url(#mascot-black)" />
                  <ellipse cx="96" cy="118" rx="10" ry="7" fill="url(#mascot-black)" />
                  <ellipse cx="64" cy="116" rx="7" ry="4" fill="#E11D48" opacity="0.6" />
                  <ellipse cx="96" cy="116" rx="7" ry="4" fill="#E11D48" opacity="0.6" />

                  {/* Utility Belt & Buckle */}
                  <path d="M 55 104 C 70 106, 90 106, 105 104" stroke="url(#mascot-black)" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="80" cy="105" r="5" fill="#E11D48" stroke="#09090B" strokeWidth="1" />
                  <circle cx="78" cy="105" r="1.2" fill="#FFFFFF" />
                  <circle cx="82" cy="105" r="1.2" fill="#FFFFFF" />

                  {/* Head Shadow onto Body */}
                  <ellipse cx="80" cy="74" rx="26" ry="6" fill="#000000" opacity="0.3" />

                  {/* Oversized Cute Chibi Head */}
                  <ellipse cx="80" cy="52" rx="36" ry="33" fill="url(#mascot-red)" stroke="#9F1239" strokeWidth="1.2" />
                  <path d="M 80 19 L 80 34" stroke="#4C0519" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

                  {/* ── 4. INDIVIDUAL POSE GESTURES ── */}

                  {/* POSE 0: Cheeks Rested (Cute Pondering) */}
                  {poseIndex === 0 && (
                    <g>
                      <path d="M 52 92 C 56 100, 68 98, 72 86" stroke="url(#mascot-red)" strokeWidth="7" strokeLinecap="round" />
                      <path d="M 108 92 C 104 100, 92 98, 88 86" stroke="url(#mascot-red)" strokeWidth="7" strokeLinecap="round" />
                      <circle cx="71" cy="85" r="4.5" fill="url(#mascot-black)" />
                      <circle cx="89" cy="85" r="4.5" fill="url(#mascot-black)" />

                      <path d="M 54 38 C 50 50, 56 64, 70 64 C 75 64, 76 52, 74 42 C 72 34, 62 32, 54 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />
                      <path d="M 106 38 C 110 50, 104 64, 90 64 C 85 64, 84 52, 86 42 C 88 34, 98 32, 106 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />

                      <ellipse cx="64" cy="49" rx="6.5" ry="9" fill="#FFFFFF" transform="rotate(-8 64 49)" />
                      <ellipse cx="96" cy="49" rx="6.5" ry="9" fill="#FFFFFF" transform="rotate(8 96 49)" />
                      <circle cx="66" cy="46" r="2.5" fill="#FFFFFF" />
                      <circle cx="94" cy="46" r="2.5" fill="#FFFFFF" />
                    </g>
                  )}

                  {/* POSE 1: Peace Sign ✌️ + Playful Wink */}
                  {poseIndex === 1 && (
                    <g>
                      <path d="M 52 92 C 50 98, 56 102, 62 102" stroke="url(#mascot-red)" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="62" cy="102" r="4" fill="url(#mascot-black)" />

                      <path d="M 106 90 C 114 86, 122 72, 126 58" stroke="url(#mascot-red)" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="126" cy="56" r="4.5" fill="url(#mascot-black)" />
                      <path d="M 124 54 L 122 44" stroke="url(#mascot-black)" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 127 54 L 132 46" stroke="url(#mascot-black)" strokeWidth="3" strokeLinecap="round" />

                      <path d="M 54 38 C 50 50, 56 64, 70 64 C 75 64, 76 52, 74 42 C 72 34, 62 32, 54 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />
                      <path d="M 106 38 C 110 50, 104 64, 90 64 C 85 64, 84 52, 86 42 C 88 34, 98 32, 106 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />

                      <ellipse cx="64" cy="49" rx="6.5" ry="9" fill="#FFFFFF" transform="rotate(-8 64 49)" />
                      <circle cx="66" cy="46" r="2.5" fill="#FFFFFF" />
                      <path d="M 90 50 Q 96 42 102 50" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
                    </g>
                  )}

                  {/* POSE 2: Dual Thumbs Up 👍👍 */}
                  {poseIndex === 2 && (
                    <g>
                      <path d="M 54 94 C 42 86, 42 74, 48 68" stroke="url(#mascot-red)" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="48" cy="67" r="4.5" fill="url(#mascot-black)" />
                      <path d="M 48 67 L 48 60" stroke="url(#mascot-black)" strokeWidth="3" strokeLinecap="round" />

                      <path d="M 106 94 C 118 86, 118 74, 112 68" stroke="url(#mascot-red)" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="112" cy="67" r="4.5" fill="url(#mascot-black)" />
                      <path d="M 112 67 L 112 60" stroke="url(#mascot-black)" strokeWidth="3" strokeLinecap="round" />

                      <path d="M 54 38 C 50 50, 56 64, 70 64 C 75 64, 76 52, 74 42 C 72 34, 62 32, 54 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />
                      <path d="M 106 38 C 110 50, 104 64, 90 64 C 85 64, 84 52, 86 42 C 88 34, 98 32, 106 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />

                      <path d="M 58 50 Q 64 42 70 50" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                      <path d="M 90 50 Q 96 42 102 50" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                    </g>
                  )}

                  {/* POSE 3: Finger Guns 👉👉 */}
                  {poseIndex === 3 && (
                    <g>
                      <path d="M 56 94 C 64 92, 78 86, 88 84" stroke="url(#mascot-red)" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="88" cy="84" r="4" fill="url(#mascot-black)" />
                      <path d="M 88 84 L 98 83" stroke="url(#mascot-black)" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 88 84 L 88 78" stroke="url(#mascot-black)" strokeWidth="2.5" strokeLinecap="round" />

                      <path d="M 106 94 C 116 92, 126 88, 134 86" stroke="url(#mascot-red)" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="134" cy="86" r="4" fill="url(#mascot-black)" />
                      <path d="M 134 86 L 144 85" stroke="url(#mascot-black)" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 134 86 L 134 80" stroke="url(#mascot-black)" strokeWidth="2.5" strokeLinecap="round" />

                      <path d="M 54 38 C 50 50, 56 64, 70 64 C 75 64, 76 52, 74 42 C 72 34, 62 32, 54 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />
                      <path d="M 106 38 C 110 50, 104 64, 90 64 C 85 64, 84 52, 86 42 C 88 34, 98 32, 106 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />

                      <ellipse cx="64" cy="49" rx="7" ry="5.5" fill="#FFFFFF" transform="rotate(-6 64 49)" />
                      <ellipse cx="96" cy="49" rx="7" ry="5.5" fill="#FFFFFF" transform="rotate(6 96 49)" />
                      <circle cx="67" cy="48" r="2" fill="#FFFFFF" />
                      <circle cx="93" cy="48" r="2" fill="#FFFFFF" />
                    </g>
                  )}

                  {/* POSE 4: Wave Hello 👋 */}
                  {poseIndex === 4 && (
                    <g>
                      <path d="M 54 90 C 44 80, 36 62, 38 48" stroke="url(#mascot-red)" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="38" cy="46" r="4.5" fill="url(#mascot-black)" />
                      <circle cx="35" cy="42" r="2" fill="url(#mascot-black)" />
                      <circle cx="39" cy="40" r="2" fill="url(#mascot-black)" />
                      <circle cx="43" cy="42" r="2" fill="url(#mascot-black)" />

                      <path d="M 106 94 C 100 98, 92 98, 86 94" stroke="url(#mascot-red)" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="86" cy="94" r="4" fill="url(#mascot-black)" />

                      <path d="M 54 38 C 50 50, 56 64, 70 64 C 75 64, 76 52, 74 42 C 72 34, 62 32, 54 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />
                      <path d="M 106 38 C 110 50, 104 64, 90 64 C 85 64, 84 52, 86 42 C 88 34, 98 32, 106 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />

                      <ellipse cx="64" cy="49" rx="7" ry="9" fill="#FFFFFF" transform="rotate(-6 64 49)" />
                      <ellipse cx="96" cy="49" rx="7" ry="9" fill="#FFFFFF" transform="rotate(6 96 49)" />
                      <circle cx="66" cy="46" r="2.5" fill="#FFFFFF" />
                      <circle cx="94" cy="46" r="2.5" fill="#FFFFFF" />
                    </g>
                  )}

                  {/* POSE 6: Standing Hero Pose (Arms Crossed) 🦸‍♂️ */}
                  {poseIndex === 6 && (
                    <g>
                      {/* Crossed Arms over chest */}
                      <path d="M 52 90 C 58 100, 88 100, 108 90" stroke="url(#mascot-red)" strokeWidth="8" strokeLinecap="round" />
                      <path d="M 64 96 L 96 96" stroke="url(#mascot-black)" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="66" cy="95" r="4.5" fill="url(#mascot-black)" />
                      <circle cx="94" cy="95" r="4.5" fill="url(#mascot-black)" />

                      {/* Confident Proud Mask & Eyes */}
                      <path d="M 54 38 C 50 50, 56 64, 70 64 C 75 64, 76 52, 74 42 C 72 34, 62 32, 54 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />
                      <path d="M 106 38 C 110 50, 104 64, 90 64 C 85 64, 84 52, 86 42 C 88 34, 98 32, 106 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />

                      {/* Confident Tilted Eyes */}
                      <ellipse cx="64" cy="48" rx="6.5" ry="8" fill="#FFFFFF" transform="rotate(-12 64 48)" />
                      <ellipse cx="96" cy="48" rx="6.5" ry="8" fill="#FFFFFF" transform="rotate(12 96 48)" />
                      <circle cx="66" cy="45" r="2.5" fill="#FFFFFF" />
                      <circle cx="94" cy="45" r="2.5" fill="#FFFFFF" />
                    </g>
                  )}

                  {/* POSE 7: Chimichanga / Taco Feast 🌮 */}
                  {poseIndex === 7 && (
                    <g>
                      {/* Hands holding golden taco */}
                      <path d="M 56 94 C 64 98, 70 94, 72 88" stroke="url(#mascot-red)" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 104 94 C 96 98, 90 94, 88 88" stroke="url(#mascot-red)" strokeWidth="6" strokeLinecap="round" />
                      
                      {/* Golden Taco / Chimichanga */}
                      <path d="M 68 84 Q 80 72 92 84 Z" fill="url(#taco-gold)" stroke="#78350F" strokeWidth="1.2" />
                      <path d="M 72 82 Q 80 76 88 82" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="76" cy="80" r="1.5" fill="#DC2626" />
                      <circle cx="84" cy="80" r="1.5" fill="#DC2626" />

                      <circle cx="70" cy="86" r="3.5" fill="url(#mascot-black)" />
                      <circle cx="90" cy="86" r="3.5" fill="url(#mascot-black)" />

                      {/* Happy Sparkle Heart/Joy Eyes */}
                      <path d="M 54 38 C 50 50, 56 64, 70 64 C 75 64, 76 52, 74 42 C 72 34, 62 32, 54 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />
                      <path d="M 106 38 C 110 50, 104 64, 90 64 C 85 64, 84 52, 86 42 C 88 34, 98 32, 106 38 Z" fill="url(#mascot-black)" stroke="#09090B" strokeWidth="1.5" />

                      {/* Sparkly Happy Eyes */}
                      <ellipse cx="64" cy="49" rx="7" ry="9" fill="#FFFFFF" transform="rotate(-6 64 49)" />
                      <ellipse cx="96" cy="49" rx="7" ry="9" fill="#FFFFFF" transform="rotate(6 96 49)" />
                      <circle cx="65" cy="46" r="3" fill="#FFFFFF" />
                      <circle cx="95" cy="46" r="3" fill="#FFFFFF" />
                      <circle cx="68" cy="53" r="1.5" fill="#FFFFFF" />
                      <circle cx="92" cy="53" r="1.5" fill="#FFFFFF" />
                    </g>
                  )}
                </>
              )}
            </svg>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
