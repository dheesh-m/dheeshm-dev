"use client";

import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Brain, Layers, Zap, FlaskConical, ArrowRight } from "lucide-react";
import { EnterpriseSection } from "@/data/enterpriseData";
import { useTheme } from "@/components/providers/ThemeProvider";
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
  const { isLightMode } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  // ── Ref-based hover — avoids React re-renders on every mouse enter/leave ──
  const isHoveredRef = useRef(false);

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

  // Scale/lift driven by motion values — no animate={} needed
  const hoverScale = useMotionValue(1);
  const hoverY = useMotionValue(0);
  const smoothScale = useSpring(hoverScale, { stiffness: 280, damping: 26, mass: 0.15 });
  const smoothLiftY = useSpring(hoverY, { stiffness: 280, damping: 26, mass: 0.15 });
  const spotlightOpacity = useMotionValue(0);
  const smoothSpotlight = useSpring(spotlightOpacity, { stiffness: 200, damping: 22, mass: 0.1 });

  const IconComponent = iconMap[item.iconName] || Brain;
  const rectRef = useRef<DOMRect | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const frontFaceRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    hoverScale.set(1.02);
    hoverY.set(-5);
    spotlightOpacity.set(1);
    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.transform = "scale(1.05)";
    }
    if (frontFaceRef.current) {
      frontFaceRef.current.style.borderColor = "rgba(167, 139, 250, 0.35)";
    }
    onCardHover();
  }, [onCardHover, hoverScale, hoverY, spotlightOpacity]);

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
    isHoveredRef.current = false;
    rectRef.current = null;
    tiltX.set(0);
    tiltY.set(0);
    mouseX.set(50);
    mouseY.set(50);
    hoverScale.set(1);
    hoverY.set(0);
    spotlightOpacity.set(0);
    if (glowRef.current) {
      glowRef.current.style.opacity = "0.35";
      glowRef.current.style.transform = "scale(0.95)";
    }
    if (frontFaceRef.current) {
      frontFaceRef.current.style.borderColor = "";
    }
  }, [tiltX, tiltY, mouseX, mouseY, hoverScale, hoverY, spotlightOpacity]);

  return (
    <div className="relative group/card flex flex-col items-center w-full">
      {/* ══════════════════════════════════════════════════════════════════
          LAYER 0: DIFFUSE ATMOSPHERIC VIOLET/SMOKE GLOW BEHIND CARD
          ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={glowRef}
        className="absolute -inset-2 sm:-inset-3 rounded-[28px] pointer-events-none -z-10"
        style={{
          opacity: isActive ? 1 : 0.35,
          transform: isActive ? "scale(1.05)" : "scale(0.95)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.22) 0%, rgba(109, 40, 217, 0.12) 45%, rgba(15, 16, 22, 0) 75%)",
          filter: "blur(28px)",
        }}
      />

      {/* 3D Perspective Viewport — compact proportional height on mobile */}
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
        className="perspective-1200 relative w-full h-[180px] sm:h-[280px] lg:h-[380px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/50 rounded-[16px] sm:rounded-[22px]"
      >
        {/* Tilt Wrapper — scale/lift via motion values, no animate={} re-render */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            scale: smoothScale,
            y: smoothLiftY,
            transformStyle: "preserve-3d",
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
            className="w-full h-full preserve-3d relative rounded-[16px] sm:rounded-[22px]"
          >
            {/* ══════════════════════════════════════════════════════════════════
                FRONT FACE (Layered Glass + Magic Bento Spotlight + Refined Slate Typography)
                ══════════════════════════════════════════════════════════════════ */}
            <div
              ref={frontFaceRef}
              className={cn(
                "absolute inset-0 backface-hidden preserve-3d rounded-[16px] sm:rounded-[22px] p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between overflow-hidden transition-[background-color,border-color,box-shadow] duration-300",
                isLightMode
                  ? "bg-[#E7E8EB] backdrop-blur-2xl"
                  : "bg-[#0f1016]/80 backdrop-blur-2xl",
                isActive
                  ? isLightMode
                    ? "border-[#8B5CF6]/50 shadow-[0_10px_30px_rgba(57,78,110,0.08),0_2px_8px_rgba(0,0,0,0.04)]"
                    : "border-[#8B5CF6]/40 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_24px_rgba(139,92,246,0.15)]"
                  : isLightMode
                    ? "border-[#D0D5DD] shadow-[0_4px_20px_rgba(57,78,110,0.04)]"
                    : "border-white/[0.14] shadow-[0_16px_40px_-15px_rgba(0,0,0,0.75)]"
              )}
            >
              {/* Magic Bento Internal Spotlight — opacity via motion value */}
              <motion.div
                className="absolute inset-0 rounded-[16px] sm:rounded-[22px] pointer-events-none"
                style={{
                  opacity: isActive ? smoothSpotlight : smoothSpotlight,
                  background: useTransform(
                    [smoothMouseX, smoothMouseY],
                    ([x, y]) =>
                      `radial-gradient(420px circle at ${x}% ${y}%, rgba(167, 139, 250, 0.12), rgba(109, 40, 217, 0.05) 40%, transparent 70%)`
                  ),
                }}
              />

              {/* Subtle top edge glass specular line */}
              <div
                className="absolute inset-x-0 top-0 h-[1px] rounded-t-[16px] sm:rounded-t-[22px] pointer-events-none opacity-40 dark:opacity-60 group-hover/card:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 30%, rgba(167, 139, 250, 0.4) 50%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)",
                }}
              />

              {/* Front Top: Number & Restrained Violet/Glass Icon Badge */}
              <div className="relative z-10 flex items-start justify-between">
                <span className={cn(
                  "font-mono text-[11px] sm:text-xs font-medium transition-colors duration-300 tracking-wider",
                  isLightMode ? "text-[#59616D]" : "text-[#64748B] group-hover/card:text-[#94A3B8]"
                )}>
                  {item.id}
                </span>

                <div
                  className={cn(
                    "w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl flex items-center justify-center border transition-[transform,border-color,background-color] duration-200 group-hover/card:scale-105 group-hover/card:border-[#8B5CF6]/40 group-hover/card:bg-[#8B5CF6]/[0.08]",
                    isLightMode
                      ? "border-black/10 bg-black/[0.04] text-[#15171B]"
                      : "border-white/[0.12] bg-white/[0.04] text-gray-300 group-hover/card:text-[#E2E8F0]"
                  )}
                  style={{
                    boxShadow: isActive ? "0 0 16px rgba(139, 92, 246, 0.25)" : "none",
                  }}
                >
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                </div>
              </div>

              {/* Front Middle: Title & Description (Slate/Soft Grey Typography) */}
              <div className="relative z-10 my-auto flex flex-col pt-0.5 sm:pt-2">
                <h3 className={cn(
                  "text-[13.5px] sm:text-base md:text-lg font-medium tracking-tight font-display leading-snug mb-1 sm:mb-2 transition-colors duration-200",
                  isLightMode
                    ? "text-[#15171B] group-hover/card:text-[#8B5CF6]"
                    : "text-[#CBD5E1] group-hover/card:text-white"
                )}>
                  {item.title}
                </h3>
                <p className={cn(
                  "text-[11px] sm:text-[12.5px] lg:text-[13px] font-sans leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-4 lg:line-clamp-none",
                  isLightMode ? "text-[#3F4650]" : "text-[#94A3B8]"
                )}>
                  {item.frontDescription}
                </p>
              </div>

              {/* Front Bottom: Explore Action Pill */}
              <div className="relative z-10 pt-0.5 sm:pt-2 flex items-center justify-between">
                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10.5px] sm:text-xs font-mono transition-[border-color,background-color,color] duration-200",
                    isLightMode
                      ? "bg-black/[0.04] border border-black/10 text-[#15171B] group-hover/card:border-[#8B5CF6]/40 group-hover/card:text-[#8B5CF6]"
                      : "bg-white/[0.04] border border-white/[0.12] text-[#CBD5E1] group-hover/card:border-[#8B5CF6]/35 group-hover/card:bg-[#8B5CF6]/[0.08] group-hover/card:text-white"
                  )}
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B5CF6] group-hover/card:text-current transition-transform duration-200 group-hover/card:translate-x-1" />
                </div>

                {/* Subtle active pulse indicator */}
                {isActive && (
                  <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6]/60 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#A78BFA]" />
                  </span>
                )}
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                BACK FACE (Rotated 180deg)
                ══════════════════════════════════════════════════════════════════ */}
            <div
              className={cn(
                "absolute inset-0 backface-hidden preserve-3d rounded-[16px] sm:rounded-[22px] p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between overflow-hidden transition-[background-color,border-color,box-shadow] duration-300",
                isLightMode
                  ? "bg-[#E7E8EB] backdrop-blur-2xl"
                  : "bg-[#0f1016]/80 backdrop-blur-2xl",
                isActive
                  ? isLightMode
                    ? "border-[#8B5CF6]/50 shadow-[0_10px_30px_rgba(57,78,110,0.08),0_2px_8px_rgba(0,0,0,0.04)]"
                    : "border-[#8B5CF6]/40 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_24px_rgba(139,92,246,0.15)]"
                  : isLightMode
                    ? "border-[#D0D5DD] shadow-[0_4px_20px_rgba(57,78,110,0.04)]"
                    : "border-white/[0.14] shadow-[0_16px_40px_-15px_rgba(0,0,0,0.75)]"
              )}
              style={{
                transform: "rotateY(180deg)",
              }}
            >
              {/* Subtle Watermark Icon in background */}
              <div className="absolute -bottom-5 -right-5 opacity-[0.04] pointer-events-none text-current select-none">
                <IconComponent className="w-24 h-24 sm:w-32 sm:h-32" />
              </div>

              {/* Magic Bento Internal Spotlight on Back Face */}
              <motion.div
                className="absolute inset-0 rounded-[16px] sm:rounded-[22px] pointer-events-none"
                style={{
                  opacity: isActive ? smoothSpotlight : smoothSpotlight,
                  background: useTransform(
                    [smoothMouseX, smoothMouseY],
                    ([x, y]) =>
                      `radial-gradient(420px circle at ${100 - (Number(x) || 50)}% ${y}%, rgba(167, 139, 250, 0.10), rgba(109, 40, 217, 0.04) 40%, transparent 70%)`
                  ),
                }}
              />

              {/* Back Top: Number & Category Title */}
              <div className={cn(
                "relative z-10 flex items-center justify-between border-b pb-1 sm:pb-2.5",
                isLightMode ? "border-black/10" : "border-white/[0.08]"
              )}>
                <span className={cn(
                  "font-mono text-[10px] sm:text-xs font-medium",
                  isLightMode ? "text-[#59616D]" : "text-[#64748B]"
                )}>
                  {item.id}
                </span>
                <span className={cn(
                  "font-mono text-[8.5px] sm:text-[10.5px] lg:text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 sm:px-2.5 rounded-full border",
                  isLightMode
                    ? "border-black/10 bg-black/[0.04] text-[#15171B]"
                    : "border-white/[0.12] bg-white/[0.04] text-[#CBD5E1]"
                )}>
                  {item.backHeading}
                </span>
              </div>

              {/* Back Middle: Checklist Highlights */}
              <div className="relative z-10 my-auto flex flex-col gap-0.5 sm:gap-2 pt-0.5 sm:pt-2">
                <div className={cn(
                  "text-[11.5px] sm:text-sm font-semibold tracking-tight font-display mb-0.5 sm:mb-1",
                  isLightMode ? "text-[#15171B]" : "text-[#CBD5E1]"
                )}>
                  {item.title}
                </div>
                <div className="flex flex-col gap-0.5 sm:gap-1.5">
                  {item.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-center gap-1 sm:gap-2 text-[9.5px] sm:text-xs font-sans leading-tight sm:leading-snug",
                        isLightMode ? "text-[#3F4650]" : "text-[#94A3B8]"
                      )}
                    >
                      <span className="font-bold flex-shrink-0 text-[9px] sm:text-xs text-[#8B5CF6]">
                        ✓
                      </span>
                      <span className="truncate">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back Bottom: Return / Code CTA Pill */}
              <div className="relative z-10 pt-0.5 sm:pt-2 flex items-center justify-between">
                <div
                  className={cn(
                    "inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[9.5px] sm:text-xs font-mono transition-[border-color,background-color,color] duration-200",
                    isLightMode
                      ? "bg-black/[0.04] border border-black/10 text-[#15171B] group-hover/card:border-[#8B5CF6]/40 group-hover/card:text-[#8B5CF6]"
                      : "bg-white/[0.04] border border-white/[0.12] text-[#CBD5E1] group-hover/card:border-[#8B5CF6]/35 group-hover/card:bg-[#8B5CF6]/[0.08] group-hover/card:text-white"
                  )}
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B5CF6] group-hover/card:text-current transition-transform duration-200 group-hover/card:translate-x-1" />
                </div>

                <span className={cn(
                  "text-[8.5px] sm:text-[10px] font-mono tracking-tight",
                  isLightMode ? "text-[#59616D]" : "text-[#64748B]"
                )}>
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
        className="w-[85%] h-3 sm:h-8 mt-0.5 sm:mt-1 rounded-full opacity-25 blur-md pointer-events-none transition-[opacity,transform] duration-300 group-hover/card:opacity-50 group-hover/card:scale-105"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 75%)",
        }}
      />
    </div>
  );
}
