"use client";

import React from "react";

interface DeadpoolMascotProps {
  className?: string;
  isAvatar?: boolean;
}

export default function DeadpoolMascot({
  className = "",
  isAvatar = false,
}: DeadpoolMascotProps) {
  if (isAvatar) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Cyber Glow Ring (Silver / Platinum) */}
          <circle cx="60" cy="60" r="54" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 3" opacity="0.6" />
          <circle cx="60" cy="60" r="50" fill="url(#avatar-silver-grad)" stroke="#FFFFFF" strokeWidth="2" />
          
          <defs>
            <radialGradient id="avatar-silver-grad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <linearGradient id="suit-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF334B" />
              <stop offset="50%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>
            <linearGradient id="suit-black" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E1B24" />
              <stop offset="100%" stopColor="#0B090E" />
            </linearGradient>
          </defs>

          {/* Swords Handle Back */}
          <path d="M 28 22 L 40 38" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
          <path d="M 92 22 L 80 38" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
          <rect x="24" y="18" width="8" height="5" rx="1" fill="#DC2626" transform="rotate(-40 28 20)" />
          <rect x="88" y="18" width="8" height="5" rx="1" fill="#DC2626" transform="rotate(40 92 20)" />

          {/* Head Base (Cute Chibi Shape) */}
          <ellipse cx="60" cy="62" rx="34" ry="32" fill="url(#suit-red)" stroke="#991B1B" strokeWidth="1.5" />
          
          {/* Black Mask Eye Patches */}
          <path
            d="M 36 48 C 34 58, 38 74, 52 74 C 55 74, 56 62, 54 52 C 52 44, 42 42, 36 48 Z"
            fill="url(#suit-black)"
            stroke="#050505"
            strokeWidth="1.5"
          />
          <path
            d="M 84 48 C 86 58, 82 74, 68 74 C 65 74, 64 62, 66 52 C 68 44, 78 42, 84 48 Z"
            fill="url(#suit-black)"
            stroke="#050505"
            strokeWidth="1.5"
          />

          {/* Expressive White Eyes */}
          <ellipse cx="46" cy="58" rx="6.5" ry="9" fill="#FFFFFF" transform="rotate(-10 46 58)" />
          <ellipse cx="74" cy="58" rx="6.5" ry="9" fill="#FFFFFF" transform="rotate(10 74 58)" />

          {/* Eye Glow & Highlights */}
          <circle cx="48" cy="55" r="2.5" fill="#FFFFFF" />
          <circle cx="72" cy="55" r="2.5" fill="#FFFFFF" />

          {/* Head Seam Line */}
          <path d="M 60 30 C 60 40, 60 50, 60 56" stroke="#450A0A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // Full-body Chibi Mascot lying down/hovering playfully
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Floating Ambient Shadow Underneath with Soft Silver Glow */}
      <div className="absolute -bottom-2 w-3/4 h-3 rounded-full bg-slate-300/20 blur-md animate-mascot-shadow" />

      {/* Chibi Deadpool Character with smooth 4-6s float */}
      <div className="relative animate-mascot-float">
        <svg
          viewBox="0 0 200 130"
          className="w-full h-auto drop-shadow-[0_4px_25px_rgba(255,255,255,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="body-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF334B" />
              <stop offset="50%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>
            <linearGradient id="body-black" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2D2836" />
              <stop offset="100%" stopColor="#0E0C12" />
            </linearGradient>
            <linearGradient id="sword-silver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>

          {/* Katanas on Back */}
          <path d="M 30 75 L 85 20" stroke="url(#sword-silver)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 45 85 L 100 30" stroke="url(#sword-silver)" strokeWidth="4.5" strokeLinecap="round" />
          <rect x="22" y="73" width="12" height="6" rx="2" fill="#CBD5E1" transform="rotate(-45 28 76)" />
          <rect x="37" y="83" width="12" height="6" rx="2" fill="#CBD5E1" transform="rotate(-45 43 86)" />

          {/* Lower Body / Legs (Resting Pose) */}
          <ellipse cx="60" cy="98" rx="36" ry="16" fill="url(#body-red)" />
          {/* Black Side Panels on Torso */}
          <path d="M 38 92 C 45 88, 55 88, 65 92 C 55 106, 42 104, 38 92 Z" fill="url(#body-black)" />

          {/* Cute Chibi Feet Kicking Up */}
          <ellipse cx="26" cy="86" rx="11" ry="8" fill="url(#body-black)" transform="rotate(-30 26 86)" />
          <ellipse cx="38" cy="80" rx="10" ry="7" fill="url(#body-red)" stroke="#991B1B" strokeWidth="1" transform="rotate(-40 38 80)" />

          {/* Utility Belt */}
          <path d="M 52 102 C 65 100, 78 100, 88 102" stroke="#1E1B24" strokeWidth="5" strokeLinecap="round" />
          <circle cx="70" cy="101" r="5.5" fill="#CBD5E1" stroke="#000" strokeWidth="1.5" />

          {/* Chibi Arms Prop / Propping Head */}
          <path d="M 98 94 C 110 98, 125 96, 135 90" stroke="url(#body-red)" strokeWidth="14" strokeLinecap="round" />
          <circle cx="132" cy="88" r="9" fill="url(#body-black)" />

          {/* Large Chibi Head */}
          <ellipse cx="140" cy="56" rx="42" ry="38" fill="url(#body-red)" stroke="#991B1B" strokeWidth="1.5" />

          {/* Black Mask Eye Patches */}
          <path
            d="M 112 40 C 108 52, 114 72, 130 72 C 135 72, 136 56, 134 44 C 132 34, 120 32, 112 40 Z"
            fill="url(#body-black)"
            stroke="#0A080E"
            strokeWidth="2"
          />
          <path
            d="M 170 40 C 174 52, 168 72, 152 72 C 147 72, 146 56, 148 44 C 150 34, 162 32, 170 40 Z"
            fill="url(#body-black)"
            stroke="#0A080E"
            strokeWidth="2"
          />

          {/* Big Expressive Chibi Eyes */}
          <ellipse cx="123" cy="53" rx="8" ry="11" fill="#FFFFFF" transform="rotate(-8 123 53)" />
          <ellipse cx="158" cy="53" rx="8" ry="11" fill="#FFFFFF" transform="rotate(8 158 53)" />

          {/* Sparkles / Specular Eye Reflections */}
          <circle cx="126" cy="49" r="3" fill="#FFFFFF" />
          <circle cx="155" cy="49" r="3" fill="#FFFFFF" />
          <circle cx="120" cy="56" r="1.5" fill="#FFFFFF" />
          <circle cx="161" cy="56" r="1.5" fill="#FFFFFF" />

          {/* Head Stitch/Seam Line */}
          <path d="M 140 18 C 140 28, 140 36, 140 42" stroke="#450A0A" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
