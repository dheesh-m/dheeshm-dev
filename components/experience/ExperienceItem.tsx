"use client";

import { useRef, useState, useCallback, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Experience } from "@/data/experience";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin, ChevronDown } from "lucide-react";

interface ExperienceItemProps {
  experience: Experience;
  isCurrent?: boolean;
  isOpen: boolean;
  onClick: () => void;
}

function ExperienceItem({ experience, isCurrent = false, isOpen, onClick }: ExperienceItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth cursor tracking across the card (0 to 100%)
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const springConfig = { stiffness: 220, damping: 24, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rectRef.current = null;
    mouseX.set(50);
    mouseY.set(50);
  }, [mouseX, mouseY]);

  // Parse period into parts
  const isPresent = experience.period.toLowerCase().includes("present");
  const periodParts = experience.period.split("-").map((s) => s.trim());
  const startYear = periodParts[0] || "2024";

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ── Timeline Node Indicator ── */}
      <div className="absolute -left-[24px] sm:-left-[32px] top-6 -translate-y-1/2 z-20">
        {isCurrent ? (
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#181a24] border-2 border-[#8B5CF6] flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.4)]">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#A78BFA] shadow-sm" />
          </div>
        ) : (
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-200 dark:bg-[#1a1b22] border-2 border-slate-300 dark:border-white/20 flex items-center justify-center">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-400 dark:bg-white/40" />
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          LAYER 0: DIFFUSE ATMOSPHERIC VIOLET GLOW BEHIND CARD (Magic Bento)
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className={cn(
          "absolute -inset-2 sm:-inset-3 rounded-[32px] pointer-events-none transition-all duration-700 -z-10",
          isHovered || isOpen ? "opacity-100 scale-[1.01]" : "opacity-35 scale-95"
        )}
        style={{
          background: isHovered || isOpen
            ? "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.18) 0%, rgba(109, 40, 217, 0.08) 45%, rgba(15, 16, 22, 0) 75%)"
            : "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.06) 0%, rgba(109, 40, 217, 0.02) 50%, rgba(15, 16, 22, 0) 75%)",
          filter: "blur(28px)",
        }}
      />

      {/* ── Experience Card (Magic Bento Glass) ── */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={cn(
          "group relative flex flex-col w-full rounded-2xl sm:rounded-3xl border transition-all duration-500 overflow-hidden cursor-pointer",
          // Dark Mode: Dark layered glass
          "dark:bg-[#0f1016]/80 dark:backdrop-blur-2xl",
          // Light Mode
          "bg-[#FAFBFC]/95 backdrop-blur-2xl border-[#D9DEE4] shadow-[0_8px_30px_rgba(57,78,110,0.05)]",
          isOpen
            ? "border-[#8B5CF6]/40 shadow-[0_16px_48px_rgba(0,0,0,0.85),0_0_24px_rgba(139,92,246,0.15)]"
            : isHovered
            ? "border-[#A78BFA]/35 shadow-[0_16px_44px_rgba(0,0,0,0.75),0_0_20px_rgba(139,92,246,0.10)] -translate-y-0.5"
            : "dark:border-white/[0.14] dark:hover:border-white/25 dark:shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
        )}
      >
        {/* Magic Bento Internal Spotlight */}
        <motion.div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered || isOpen ? 1 : 0,
            background: useTransform(
              [smoothMouseX, smoothMouseY],
              ([x, y]) =>
                `radial-gradient(500px circle at ${x}% ${y}%, rgba(167, 139, 250, 0.12), rgba(109, 40, 217, 0.04) 40%, transparent 70%)`
            ),
          }}
        />

        {/* Top Edge Specular Highlight */}
        <div
          className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl sm:rounded-t-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 30%, rgba(167, 139, 250, 0.4) 50%, rgba(255, 255, 255, 0.25) 70%, transparent 100%)",
          }}
        />

        {/* ── Card Header / Summary Row ── */}
        <div className="relative flex flex-col justify-between w-full p-4 sm:p-6 md:p-7 z-10">
          <div className="flex items-start justify-between gap-2.5 sm:gap-4 w-full">
            {/* Role & Company Title with Company Logo Badge */}
            <div className="flex items-start gap-2.5 sm:gap-3.5 flex-1 min-w-0">
              {experience.logo && (
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] border border-white/[0.12] p-1 shrink-0 flex items-center justify-center shadow-sm mt-0.5 group-hover:scale-105 group-hover:border-[#8B5CF6]/40 transition-all">
                  <Image
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    width={36}
                    height={36}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-[14.5px] sm:text-lg md:text-xl font-bold text-[#171A1F] dark:text-[#CBD5E1] group-hover:text-white font-display tracking-tight leading-snug transition-colors">
                  {experience.role}{" "}
                  <span className="font-medium text-[#394E6E] dark:text-[#94A3B8] transition-colors">
                    @ {experience.company}
                  </span>
                </h3>

                {/* Location & External Link */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap items-center gap-2.5 sm:gap-5 text-[11px] sm:text-[13px] font-mono text-[#66717D] dark:text-[#94A3B8] mt-2"
                  >
                    {experience.location && (
                      <div className="flex items-center gap-1 text-[#66717D] dark:text-[#94A3B8]">
                        <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A78BFA] shrink-0" />
                        <span>{experience.location}</span>
                      </div>
                    )}

                    {experience.companyUrl && (
                      <a
                        href={`https://${experience.companyUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-[#66717D] dark:text-[#A78BFA] hover:text-[#171A1F] dark:hover:text-white transition-colors hover:underline"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A78BFA] shrink-0" />
                        <span>{experience.companyUrl}</span>
                      </a>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Date & Expand Chevron Button */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 mt-0.5">
              <div className="text-[11px] sm:text-sm font-mono font-medium tracking-tight sm:tracking-wide text-[#66717D] dark:text-[#94A3B8] whitespace-nowrap">
                <span>{startYear}</span>
                <span className="text-gray-400 mx-1 sm:mx-1.5">-</span>
                {isPresent ? (
                  <span className="text-[#171A1F] dark:text-[#CBD5E1] font-bold">
                    Present
                  </span>
                ) : (
                  <span>{periodParts[1]}</span>
                )}
              </div>

              {/* Chevron Down Button */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] border border-white/[0.12] flex items-center justify-center text-[#66717D] dark:text-[#CBD5E1] group-hover:border-[#8B5CF6]/40 group-hover:bg-[#8B5CF6]/[0.08] transition-all"
              >
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Expanded Content (Smooth Height & Fade Transition) ── */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-6 md:px-7 pb-5 sm:pb-8 pt-1 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-6 md:gap-10 border-t border-[#D9DEE4] dark:border-white/[0.08] relative z-10">
                
                {/* Left Column: Description & Tech Pills */}
                <div className="flex-1 space-y-4 sm:space-y-5 pt-3 w-full">
                  <p className="text-xs sm:text-[13.5px] md:text-sm text-[#66717D] dark:text-[#94A3B8] leading-relaxed sm:leading-loose font-sans">
                    {experience.description}
                  </p>

                  {/* Technology Pills in clean slate styling */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium bg-white/[0.04] border border-white/[0.10] text-[#CBD5E1] hover:border-[#8B5CF6]/35 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Company Logo Emblem with Concentric Orbital Rings */}
                {experience.logo && (
                  <div className="flex shrink-0 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 items-center justify-center relative my-2 sm:my-auto self-center sm:self-auto">
                    <div className="absolute inset-0 rounded-full border border-dashed border-white/15 animate-[spin_25s_linear_infinite]" />
                    <div className="absolute inset-2 sm:inset-3 rounded-full border border-white/10" />
                    
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#0f1016]/90 backdrop-blur-md border border-white/15 p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        width={64}
                        height={64}
                        sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 64px"
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default memo(ExperienceItem);
