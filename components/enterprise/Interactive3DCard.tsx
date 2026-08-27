"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for buttery 60fps tilt response without jitter
  const springConfig = { stiffness: 280, damping: 22 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  // Glare position motion values
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const IconComponent = iconMap[item.iconName] || Brain;

  // Handle mouse move for 3D tilt & dynamic specular glare
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Normalized coordinates (-0.5 to 0.5)
      const normX = x - 0.5;
      const normY = y - 0.5;

      // Maximum ±6 degrees rotation
      mouseX.set(normX * 12);
      mouseY.set(-normY * 12);

      // Glare position in percent
      glareX.set(x * 100);
      glareY.set(y * 100);
    },
    [mouseX, mouseY, glareX, glareY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onCardHover();
  }, [onCardHover]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Smoothly return to neutral
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div className="relative group/card flex flex-col items-center w-full">
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
        className="perspective-1200 relative w-full h-[360px] sm:h-[390px] md:h-[410px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-[22px]"
      >
        {/* Tilt Wrapper (tracks mouse tilt & hover scale/lift) */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            scale: isHovered ? 1.018 : 1,
            y: isHovered ? -6 : 0,
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
            className="w-full h-full preserve-3d relative rounded-[22px]"
          >
            {/* ══════════════════════════════════════════════════════════════════
                FRONT FACE
                ══════════════════════════════════════════════════════════════════ */}
            <div
              className={cn(
                "absolute inset-0 backface-hidden preserve-3d rounded-[22px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden",
                "flip-card-glass bg-[#0d0d16]/85 backdrop-blur-2xl border transition-all duration-300",
                isActive
                  ? "border-white/25 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]"
                  : "border-white/10 hover:border-white/20 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.6)]"
              )}
              style={{
                boxShadow: isHovered || isActive
                  ? `0 20px 48px -12px ${item.glowColor}, 0 0 24px -6px ${item.glowColor}, inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)`
                  : "0 16px 36px -12px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Dynamic Ambient Edge Highlight */}
              <div
                className="absolute inset-0 rounded-[22px] pointer-events-none opacity-30 group-hover/card:opacity-75 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${item.glowColor}, transparent 70%)`,
                }}
              />

              {/* Specular Glare Reflection Layer */}
              <motion.div
                className="absolute inset-0 rounded-[22px] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(600px circle at ${glareX.get()}% ${glareY.get()}%, rgba(255, 255, 255, 0.08), transparent 45%)`,
                }}
              />

              {/* Front Top: Number & Glowing Neon Icon Badge */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="font-mono text-xs font-medium text-gray-500 flip-number tracking-wider">
                  {item.id}
                </span>

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover/card:scale-110"
                  style={{
                    backgroundColor: item.badgeBg,
                    borderColor: item.badgeBorder,
                    boxShadow: `0 0 16px -2px ${item.glowColor}`,
                  }}
                >
                  <IconComponent
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color: item.accentColor }}
                  />
                </div>
              </div>

              {/* Front Middle: Title & Description */}
              <div className="relative z-10 my-auto flex flex-col pt-2">
                <h3 className="text-sm sm:text-base md:text-lg font-medium text-white tracking-tight font-display leading-snug mb-2 sm:mb-2.5 flip-title">
                  {item.title}
                </h3>
                <p className="text-[11.5px] sm:text-[13px] text-gray-400 font-sans leading-relaxed line-clamp-4 sm:line-clamp-none flip-desc">
                  {item.frontDescription}
                </p>
              </div>

              {/* Front Bottom: Explore Action Pill */}
              <div className="relative z-10 pt-2 flex items-center justify-between">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono text-gray-300 bg-white/[0.04] border border-white/10 group-hover/card:border-white/20 group-hover/card:bg-white/[0.08] group-hover/card:text-white transition-all duration-300 flip-btn"
                  style={{
                    boxShadow: isHovered ? `0 0 12px -2px ${item.glowColor}` : "none",
                  }}
                >
                  <span>Explore</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover/card:translate-x-1"
                    style={{ color: item.accentColor }}
                  />
                </div>

                {/* Subtle active pulse indicator */}
                {isActive && (
                  <span className="flex h-2 w-2 relative">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: item.accentColor }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ backgroundColor: item.accentColor }}
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
                "absolute inset-0 backface-hidden preserve-3d rounded-[22px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden",
                "flip-card-glass bg-[#0b0c14]/90 backdrop-blur-2xl border transition-all duration-300",
                isActive
                  ? "border-white/25 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]"
                  : "border-white/10 hover:border-white/20 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.6)]"
              )}
              style={{
                transform: "rotateY(180deg)",
                boxShadow: isHovered || isActive
                  ? `0 20px 48px -12px ${item.glowColor}, 0 0 24px -6px ${item.glowColor}, inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)`
                  : "0 16px 36px -12px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Subtle Watermark Icon in background */}
              <div className="absolute -bottom-5 -right-5 opacity-[0.05] pointer-events-none text-white select-none">
                <IconComponent className="w-32 h-32" />
              </div>

              {/* Dynamic Ambient Edge Highlight */}
              <div
                className="absolute inset-0 rounded-[22px] pointer-events-none opacity-40 group-hover/card:opacity-80 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${item.glowColor}, transparent 70%)`,
                }}
              />

              {/* Back Top: Number & Category Title */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-2.5">
                <span className="font-mono text-xs font-medium text-gray-500 flip-number">
                  {item.id}
                </span>
                <span
                  className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: item.badgeBg,
                    borderColor: item.badgeBorder,
                    color: item.accentColor,
                  }}
                >
                  {item.backHeading}
                </span>
              </div>

              {/* Back Middle: Checklist Highlights */}
              <div className="relative z-10 my-auto flex flex-col gap-2 pt-2">
                <div className="text-xs sm:text-sm font-semibold text-white tracking-tight font-display mb-1 flip-title">
                  {item.title}
                </div>
                <div className="flex flex-col gap-1.5">
                  {item.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-[11.5px] sm:text-xs text-gray-300/90 font-sans leading-snug flip-highlight"
                    >
                      <span
                        className="font-bold flex-shrink-0 text-xs"
                        style={{ color: item.accentColor }}
                      >
                        ✓
                      </span>
                      <span className="truncate">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back Bottom: Return / Code CTA Pill */}
              <div className="relative z-10 pt-2 flex items-center justify-between">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono text-gray-300 bg-white/[0.04] border border-white/10 group-hover/card:border-white/20 group-hover/card:bg-white/[0.08] group-hover/card:text-white transition-all duration-300 flip-btn"
                  style={{
                    boxShadow: isHovered ? `0 0 12px -2px ${item.glowColor}` : "none",
                  }}
                >
                  <span>Explore</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover/card:translate-x-1"
                    style={{ color: item.accentColor }}
                  />
                </div>

                <span className="text-[10px] font-mono text-gray-500 tracking-tight">
                  Click to flip
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          GROUND FLOOR MIRROR REFLECTION (Apple Spatial / Showroom Depth)
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className="w-[85%] h-8 mt-1 rounded-full opacity-25 blur-md pointer-events-none transition-all duration-500 group-hover/card:opacity-50 group-hover/card:scale-105"
        style={{
          background: `radial-gradient(ellipse at center, ${item.glowColor} 0%, transparent 75%)`,
        }}
      />
    </div>
  );
}
