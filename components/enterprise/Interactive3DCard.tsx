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

// ── Card-Specific Aurora Gradient Palette (Matching Project Cards & Diagram) ──
function getEnterpriseAuroraTheme(index: number) {
  switch (index) {
    case 0:
      return {
        accent: "#8B5CF6",         // Violet
        accentSecondary: "#22D3EE",// Cyan
        borderRest: "rgba(139, 92, 246, 0.35)",
        borderHover: "rgba(34, 211, 238, 0.65)",
        glowCenter: "rgba(139, 92, 246, 0.22)",
        glowOuter: "rgba(34, 211, 238, 0.12)",
        spotlight1: "rgba(139, 92, 246, 0.14)",
        spotlight2: "rgba(34, 211, 238, 0.06)",
        specular: "rgba(34, 211, 238, 0.45)",
      };
    case 1:
      return {
        accent: "#22D3EE",         // Cyan
        accentSecondary: "#38BDF8",// Electric Blue
        borderRest: "rgba(34, 211, 238, 0.35)",
        borderHover: "rgba(56, 189, 248, 0.65)",
        glowCenter: "rgba(34, 211, 238, 0.22)",
        glowOuter: "rgba(56, 189, 248, 0.12)",
        spotlight1: "rgba(34, 211, 238, 0.14)",
        spotlight2: "rgba(56, 189, 248, 0.06)",
        specular: "rgba(56, 189, 248, 0.45)",
      };
    case 2:
      return {
        accent: "#38BDF8",         // Electric Blue
        accentSecondary: "#22D3EE",// Cyan
        borderRest: "rgba(56, 189, 248, 0.35)",
        borderHover: "rgba(34, 211, 238, 0.65)",
        glowCenter: "rgba(56, 189, 248, 0.22)",
        glowOuter: "rgba(217, 70, 239, 0.12)",
        spotlight1: "rgba(56, 189, 248, 0.14)",
        spotlight2: "rgba(217, 70, 239, 0.06)",
        specular: "rgba(34, 211, 238, 0.45)",
      };
    case 3:
    default:
      return {
        accent: "#D946EF",         // Magenta
        accentSecondary: "#A855F7",// Purple
        borderRest: "rgba(217, 70, 239, 0.35)",
        borderHover: "rgba(168, 85, 247, 0.65)",
        glowCenter: "rgba(217, 70, 239, 0.22)",
        glowOuter: "rgba(168, 85, 247, 0.12)",
        spotlight1: "rgba(217, 70, 239, 0.14)",
        spotlight2: "rgba(34, 211, 238, 0.06)",
        specular: "rgba(168, 85, 247, 0.45)",
      };
  }
}

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
  const isHoveredRef = useRef(false);

  const theme = getEnterpriseAuroraTheme(index);

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

  const frontSpotlightBg = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x}% ${y}%, ${theme.spotlight1}, ${theme.spotlight2} 40%, transparent 70%)`
  );

  const backSpotlightBg = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${100 - (Number(x) || 50)}% ${y}%, ${theme.spotlight1}, ${theme.spotlight2} 40%, transparent 70%)`
  );

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
      glowRef.current.style.transform = "scale(1.04)";
    }
    if (frontFaceRef.current) {
      frontFaceRef.current.style.borderColor = theme.borderHover;
    }
    onCardHover();
  }, [onCardHover, hoverScale, hoverY, spotlightOpacity, theme.borderHover]);

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
      glowRef.current.style.opacity = isActive ? "1" : "0.35";
      glowRef.current.style.transform = isActive ? "scale(1.04)" : "scale(0.95)";
    }
    if (frontFaceRef.current) {
      frontFaceRef.current.style.borderColor = "";
    }
  }, [tiltX, tiltY, mouseX, mouseY, hoverScale, hoverY, spotlightOpacity, isActive]);

  return (
    <div className="relative group/card flex flex-col items-center w-full">
      {/* ══════════════════════════════════════════════════════════════════
          LAYER 0: DIFFUSE ATMOSPHERIC AURORA GRADIENT GLOW BEHIND CARD
          ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={glowRef}
        className="absolute -inset-2 sm:-inset-3 rounded-[28px] pointer-events-none -z-10"
        style={{
          opacity: isActive ? 1 : 0.35,
          transform: isActive ? "scale(1.04)" : "scale(0.95)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          background: `radial-gradient(ellipse at center, ${theme.glowCenter} 0%, ${theme.glowOuter} 45%, rgba(10, 12, 25, 0) 75%)`,
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
              duration: 0.6,
              delay: 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-full preserve-3d relative rounded-[16px] sm:rounded-[22px]"
          >
            {/* ══════════════════════════════════════════════════════════════════
                FRONT FACE (Layered Glass + Aurora Spotlight + Crisp Typography)
                ══════════════════════════════════════════════════════════════════ */}
            <div
              ref={frontFaceRef}
              className={cn(
                "absolute inset-0 backface-hidden preserve-3d rounded-[16px] sm:rounded-[22px] p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between overflow-hidden transition-[background-color,border-color,box-shadow] duration-300",
                isLightMode
                  ? "bg-[#E7E8EB] backdrop-blur-2xl border-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                  : "bg-[#0A0C19]/90 backdrop-blur-2xl border-white/[0.14]"
              )}
              style={{
                boxShadow: !isLightMode
                  ? isActive
                    ? `0 0 28px ${theme.glowCenter}, 0 0 14px ${theme.glowOuter}, 0 20px 50px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15)`
                    : `0 0 20px ${theme.glowCenter}, 0 16px 40px -15px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.15)`
                  : undefined,
                borderColor: !isLightMode ? (isActive ? theme.borderHover : theme.borderRest) : undefined,
              }}
            >
              {/* Aurora Internal Spotlight — opacity via motion value */}
              <motion.div
                className="absolute inset-0 rounded-[16px] sm:rounded-[22px] pointer-events-none"
                style={{
                  opacity: smoothSpotlight,
                  background: frontSpotlightBg,
                }}
              />

              {/* Subtle top edge Aurora specular highlight */}
              <div
                className="absolute inset-x-0 top-0 h-[1px] rounded-t-[16px] sm:rounded-t-[22px] pointer-events-none opacity-40 dark:opacity-70 group-hover/card:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 25%, ${theme.specular} 50%, rgba(255, 255, 255, 0.3) 75%, transparent 100%)`,
                }}
              />

              {/* Front Top: Number & Aurora Icon Badge */}
              <div className="relative z-10 flex items-start justify-between">
                <span className={cn(
                  "font-mono text-[11px] sm:text-xs font-medium transition-colors duration-300 tracking-wider",
                  isLightMode ? "text-[#59616D]" : "text-[#64748B] group-hover/card:text-[#94A3B8]"
                )}>
                  {item.id}
                </span>

                <div
                  className={cn(
                    "w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl flex items-center justify-center border transition-[transform,border-color,background-color] duration-200 group-hover/card:scale-105",
                    isLightMode
                      ? "border-black/10 bg-black/[0.04] text-[#15171B]"
                      : "border-white/[0.14] bg-white/[0.04] text-[#CBD5E1] group-hover/card:text-white"
                  )}
                  style={{
                    boxShadow: !isLightMode ? `0 0 10px ${theme.glowCenter}` : undefined,
                  }}
                >
                  <IconComponent
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-colors"
                    style={{ color: !isLightMode ? theme.accent : undefined }}
                  />
                </div>
              </div>

              {/* Front Middle: Title & Description */}
              <div className="relative z-10 my-auto flex flex-col pt-0.5 sm:pt-2">
                <h3 className={cn(
                  "text-[13.5px] sm:text-base md:text-lg font-medium tracking-tight font-display leading-snug mb-1 sm:mb-2 transition-colors duration-200",
                  isLightMode
                    ? "text-[#15171B] group-hover/card:text-slate-900"
                    : "text-[#F4F6FA] group-hover/card:text-white"
                )}>
                  {item.title}
                </h3>
                <p className={cn(
                  "text-[11px] sm:text-[12.5px] lg:text-[13px] font-sans leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-4 lg:line-clamp-none",
                  isLightMode ? "text-[#3F4650]" : "text-[#A8B0BF]"
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
                      ? "bg-black/[0.04] border border-black/10 text-[#15171B]"
                      : "bg-white/[0.04] border border-white/[0.12] text-[#CBD5E1] group-hover/card:border-white/25 group-hover/card:text-white"
                  )}
                >
                  <span>Explore</span>
                  <ArrowRight
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/card:text-white transition-transform duration-200 group-hover/card:translate-x-1"
                    style={{ color: !isLightMode ? theme.accentSecondary : undefined }}
                  />
                </div>

                {/* Subtle active pulse indicator */}
                {isActive && (
                  <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 relative">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: theme.accentSecondary }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2"
                      style={{ backgroundColor: theme.accent }}
                    />
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
                  ? "bg-[#E7E8EB] backdrop-blur-2xl border-slate-300"
                  : "bg-[#0A0C19]/90 backdrop-blur-2xl border-white/[0.14]"
              )}
              style={{
                transform: "rotateY(180deg)",
                boxShadow: !isLightMode
                  ? `0 0 20px ${theme.glowCenter}, 0 16px 40px rgba(0,0,0,0.85)`
                  : undefined,
                borderColor: !isLightMode ? (isActive ? theme.borderHover : theme.borderRest) : undefined,
              }}
            >
              {/* Subtle Watermark Icon in background */}
              <div className="absolute -bottom-5 -right-5 opacity-[0.04] pointer-events-none text-current select-none">
                <IconComponent className="w-24 h-24 sm:w-32 sm:h-32" />
              </div>

              {/* Aurora Internal Spotlight on Back Face */}
              <motion.div
                className="absolute inset-0 rounded-[16px] sm:rounded-[22px] pointer-events-none"
                style={{
                  opacity: smoothSpotlight,
                  background: backSpotlightBg,
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
                  isLightMode ? "text-[#15171B]" : "text-[#F4F6FA]"
                )}>
                  {item.title}
                </div>
                <div className="flex flex-col gap-0.5 sm:gap-1.5">
                  {item.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-center gap-1 sm:gap-2 text-[9.5px] sm:text-xs font-sans leading-tight sm:leading-snug",
                        isLightMode ? "text-[#3F4650]" : "text-[#A8B0BF]"
                      )}
                    >
                      <span
                        className="font-bold flex-shrink-0 text-[9px] sm:text-xs"
                        style={{ color: !isLightMode ? theme.accent : undefined }}
                      >
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
                      ? "bg-black/[0.04] border border-black/10 text-[#15171B]"
                      : "bg-white/[0.04] border border-white/[0.12] text-[#CBD5E1] group-hover/card:border-white/25 group-hover/card:text-white"
                  )}
                >
                  <span>Explore</span>
                  <ArrowRight
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/card:text-white transition-transform duration-200 group-hover/card:translate-x-1"
                    style={{ color: !isLightMode ? theme.accentSecondary : undefined }}
                  />
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
          GROUND FLOOR MIRROR REFLECTION WITH AURORA AMBIENT TINT
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className="w-[85%] h-3 sm:h-8 mt-0.5 sm:mt-1 rounded-full opacity-25 blur-md pointer-events-none transition-[opacity,transform] duration-300 group-hover/card:opacity-50 group-hover/card:scale-105"
        style={{
          background: `radial-gradient(ellipse at center, ${theme.glowCenter} 0%, rgba(255, 255, 255, 0.04) 40%, transparent 75%)`,
        }}
      />
    </div>
  );
}

export const MemoizedInteractive3DCard = React.memo(Interactive3DCard);
