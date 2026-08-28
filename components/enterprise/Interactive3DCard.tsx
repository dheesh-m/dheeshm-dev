"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Brain, Layers, Zap, FlaskConical, ArrowRight } from "lucide-react";
import { EnterpriseSection } from "@/data/enterpriseData";
import { cn } from "@/lib/utils";

interface Interactive3DCardProps {
  item: EnterpriseSection;
  index: number;
  isFlipped: boolean;
  flipDelay: number;
  isActive: boolean;
  onCardClick: () => void;
  onCardHover: () => void;
}

const iconMap = {
  brain: Brain,
  layers: Layers,
  zap: Zap,
  flask: FlaskConical,
};

export default function Interactive3DCard({
  item,
  index,
  isFlipped,
  flipDelay,
  isActive,
  onCardClick,
  onCardHover,
}: Interactive3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth cursor tracking across the card (0 to 100%)
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  // Spring config for silky smooth, organic tilt & spotlight tracking
  const springConfig = { stiffness: 220, damping: 24, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Perspective 3D tilt (restrained to 2.5° max for cinematic feel)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltY, springConfig);
  const rotateY = useSpring(tiltX, springConfig);

  const IconComponent = iconMap[item.iconName] || Brain;
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    onCardHover();
  }, [onCardHover]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      let rect = rectRef.current;
      if (!rect && cardRef.current) {
        rect = cardRef.current.getBoundingClientRect();
        rectRef.current = rect;
      }
      if (!rect) return;

      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;

      mouseX.set(px);
      mouseY.set(py);

      // Normalized coordinates (-0.5 to 0.5) for restrained tilt
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      tiltX.set(normX * 5.0);
      tiltY.set(-normY * 5.0);
    },
    [mouseX, mouseY, tiltX, tiltY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rectRef.current = null;
    tiltX.set(0);
    tiltY.set(0);
    mouseX.set(50);
    mouseY.set(50);
  }, [tiltX, tiltY, mouseX, mouseY]);

  return (
    <div className="relative group/card flex flex-col items-center w-full">
      {/* ══════════════════════════════════════════════════════════════════
          LAYER 0: DIFFUSE ATMOSPHERIC VIOLET/SMOKE GLOW BEHIND CARD (Reference 1)
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className={cn(
          "absolute -inset-2 sm:-inset-3 rounded-[28px] pointer-events-none transition-all duration-700 -z-10",
          isHovered || isActive ? "opacity-100 scale-105" : "opacity-35 scale-95"
        )}
        style={{
          background: isHovered || isActive
            ? "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.22) 0%, rgba(109, 40, 217, 0.12) 45%, rgba(15, 16, 22, 0) 75%)"
            : "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, rgba(109, 40, 217, 0.03) 50%, rgba(15, 16, 22, 0) 75%)",
          filter: "blur(28px)",
        }}
      />

      {/* 3D Perspective Viewport */}
      <div
        ref={cardRef}
        tabIndex={0}
        role="button"
        aria-label={`Card ${item.id}: ${item.title}`}
        aria-pressed={isFlipped}
        onClick={onCardClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onCardClick();
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="perspective-1200 relative w-full h-[290px] sm:h-[340px] lg:h-[385px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/50 rounded-[18px] sm:rounded-[22px]"
      >
        {/* Tilt Wrapper (tracks mouse tilt & hover scale/lift) */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            scale: isHovered ? 1.02 : 1,
            y: isHovered ? -5 : 0,
          }}
          transition={{
            scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
          className="w-full h-full preserve-3d"
        >
          {/* Flip Wrapper (handles 180° Domino rotation) */}
          <motion.div
            style={{
              transformStyle: "preserve-3d",
            }}
            initial={false}
            animate={{
              rotateY: isFlipped ? 180 : 0,
            }}
            transition={{
              duration: 0.8,
              delay: flipDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-full preserve-3d relative rounded-[18px] sm:rounded-[22px]"
          >
            {/* ══════════════════════════════════════════════════════════════════
                FRONT FACE (Layered Glass + Magic Bento Spotlight + Refined Slate Typography)
                ══════════════════════════════════════════════════════════════════ */}
            <div
              className={cn(
                "absolute inset-0 backface-hidden preserve-3d rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 lg:p-6 flex flex-col justify-between overflow-hidden",
                "bg-[#0f1016]/80 backdrop-blur-2xl border transition-colors duration-500",
                isActive
                  ? "border-[#8B5CF6]/40 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_24px_rgba(139,92,246,0.15)]"
                  : isHovered
                  ? "border-[#A78BFA]/35 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85),0_0_20px_rgba(139,92,246,0.10)]"
                  : "border-white/[0.14] hover:border-white/25 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.75)]"
              )}
            >
              {/* Magic Bento Internal Spotlight (Tracks cursor inside the card) */}
              <motion.div
                className="absolute inset-0 rounded-[18px] sm:rounded-[22px] pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: isHovered || isActive ? 1 : 0,
                  background: useTransform(
                    [smoothMouseX, smoothMouseY],
                    ([x, y]) =>
                      `radial-gradient(420px circle at ${x}% ${y}%, rgba(167, 139, 250, 0.12), rgba(109, 40, 217, 0.05) 40%, transparent 70%)`
                  ),
                }}
              />

              {/* Subtle top edge glass specular line */}
              <div
                className="absolute inset-x-0 top-0 h-[1px] rounded-t-[18px] sm:rounded-t-[22px] pointer-events-none opacity-60 group-hover/card:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 30%, rgba(167, 139, 250, 0.4) 50%, rgba(255, 255, 255, 0.25) 70%, transparent 100%)",
                }}
              />

              {/* Front Top: Number & Restrained Violet/Glass Icon Badge */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="font-mono text-xs font-medium text-[#64748B] group-hover/card:text-[#94A3B8] transition-colors duration-300 tracking-wider">
                  {item.id}
                </span>

                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl flex items-center justify-center border border-white/[0.12] bg-white/[0.04] transition-all duration-300 group-hover/card:scale-105 group-hover/card:border-[#8B5CF6]/40 group-hover/card:bg-[#8B5CF6]/[0.08]"
                  style={{
                    boxShadow: isHovered || isActive ? "0 0 16px rgba(139, 92, 246, 0.25)" : "none",
                  }}
                >
                  <IconComponent className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300 group-hover/card:text-[#E2E8F0] transition-colors duration-300" />
                </div>
              </div>

              {/* Front Middle: Title & Description (Slate/Soft Grey Typography) */}
              <div className="relative z-10 my-auto flex flex-col pt-1 sm:pt-2">
                <h3 className="text-base sm:text-base md:text-lg font-medium text-[#CBD5E1] group-hover/card:text-white tracking-tight font-display leading-snug mb-1.5 sm:mb-2 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] text-[#94A3B8] font-sans leading-relaxed line-clamp-3 sm:line-clamp-4 lg:line-clamp-none">
                  {item.frontDescription}
                </p>
              </div>

              {/* Front Bottom: Explore Action Pill */}
              <div className="relative z-10 pt-1 sm:pt-2 flex items-center justify-between">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono text-[#CBD5E1] bg-white/[0.04] border border-white/[0.12] group-hover/card:border-[#8B5CF6]/35 group-hover/card:bg-[#8B5CF6]/[0.08] group-hover/card:text-white transition-all duration-300"
                  style={{
                    boxShadow: isHovered ? "0 0 12px rgba(139, 92, 246, 0.18)" : "none",
                  }}
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover/card:text-white transition-transform duration-300 group-hover/card:translate-x-1" />
                </div>

                {/* Subtle active pulse indicator */}
                {isActive && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6]/60 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A78BFA]" />
                  </span>
                )}
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                BACK FACE (Rotated 180deg)
                ══════════════════════════════════════════════════════════════════ */}
            <div
              className={cn(
                "absolute inset-0 backface-hidden preserve-3d rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 lg:p-6 flex flex-col justify-between overflow-hidden",
                "bg-[#0f1016]/80 backdrop-blur-2xl border transition-colors duration-500",
                isActive
                  ? "border-[#8B5CF6]/40 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_24px_rgba(139,92,246,0.15)]"
                  : isHovered
                  ? "border-[#A78BFA]/35 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85),0_0_20px_rgba(139,92,246,0.10)]"
                  : "border-white/[0.14] hover:border-white/25 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.75)]"
              )}
              style={{
                transform: "rotateY(180deg)",
              }}
            >
              {/* Subtle Watermark Icon in background */}
              <div className="absolute -bottom-5 -right-5 opacity-[0.04] pointer-events-none text-white select-none">
                <IconComponent className="w-32 h-32" />
              </div>

              {/* Magic Bento Internal Spotlight on Back Face */}
              <motion.div
                className="absolute inset-0 rounded-[18px] sm:rounded-[22px] pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: isHovered || isActive ? 1 : 0,
                  background: useTransform(
                    [smoothMouseX, smoothMouseY],
                    ([x, y]) =>
                      `radial-gradient(420px circle at ${100 - (Number(x) || 50)}% ${y}%, rgba(167, 139, 250, 0.10), rgba(109, 40, 217, 0.04) 40%, transparent 70%)`
                  ),
                }}
              />

              {/* Back Top: Number & Category Title */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-1.5 sm:pb-2.5">
                <span className="font-mono text-[11px] sm:text-xs font-medium text-[#64748B]">
                  {item.id}
                </span>
                <span className="font-mono text-[9px] sm:text-[10.5px] lg:text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 sm:px-2.5 rounded-full border border-white/[0.12] bg-white/[0.04] text-[#CBD5E1]">
                  {item.backHeading}
                </span>
              </div>

              {/* Back Middle: Checklist Highlights */}
              <div className="relative z-10 my-auto flex flex-col gap-1 sm:gap-2 pt-1 sm:pt-2">
                <div className="text-[12px] sm:text-sm font-semibold text-[#CBD5E1] tracking-tight font-display mb-0.5 sm:mb-1">
                  {item.title}
                </div>
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  {item.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-xs text-[#94A3B8] font-sans leading-snug"
                    >
                      <span className="font-bold flex-shrink-0 text-[10px] sm:text-xs text-[#A78BFA]">
                        ✓
                      </span>
                      <span className="truncate">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back Bottom: Return / Code CTA Pill */}
              <div className="relative z-10 pt-1 sm:pt-2 flex items-center justify-between">
                <div
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono text-[#CBD5E1] bg-white/[0.04] border border-white/[0.12] group-hover/card:border-[#8B5CF6]/35 group-hover/card:bg-[#8B5CF6]/[0.08] group-hover/card:text-white transition-all duration-300"
                  style={{
                    boxShadow: isHovered ? "0 0 10px rgba(139, 92, 246, 0.15)" : "none",
                  }}
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#94A3B8] group-hover/card:text-white transition-transform duration-300 group-hover/card:translate-x-1" />
                </div>

                <span className="text-[9px] sm:text-[10px] font-mono text-[#64748B] tracking-tight">
                  Click to flip
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          GROUND FLOOR MIRROR REFLECTION WITH VIOLET AMBIENT TINT
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className="w-[85%] h-8 mt-1 rounded-full opacity-25 blur-md pointer-events-none transition-all duration-500 group-hover/card:opacity-50 group-hover/card:scale-105"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 75%)",
        }}
      />
    </div>
  );
}
