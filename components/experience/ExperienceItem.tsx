"use client";

import { useRef, useCallback, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Experience } from "@/data/experience";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin, ChevronDown } from "lucide-react";
import BorderGlow from "../ui/BorderGlow";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ExperienceItemProps {
  experience: Experience;
  isCurrent?: boolean;
  isOpen: boolean;
  onClick: () => void;
}

function ExperienceItem({ experience, isCurrent = false, isOpen, onClick }: ExperienceItemProps) {
  const { isLightMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  // ── Ref-based hover — no React re-render on mouse enter/leave ──

  // Smooth cursor tracking across the card (0 to 100%)
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const springConfig = { stiffness: 220, damping: 24, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const spotlightOpacity = useMotionValue(0);
  const smoothSpotlight = useSpring(spotlightOpacity, { stiffness: 200, damping: 22, mass: 0.1 });

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
      cardRef.current.style.borderColor = "rgba(167, 139, 250, 0.35)";
      cardRef.current.style.transform = "translateY(-2px)";
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.transform = "scale(1.01)";
    }
    spotlightOpacity.set(1);
  }, [spotlightOpacity]);

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
    rectRef.current = null;
    if (cardRef.current) {
      cardRef.current.style.borderColor = "";
      cardRef.current.style.transform = "";
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = "0.35";
      glowRef.current.style.transform = "scale(0.95)";
    }
    spotlightOpacity.set(0);
    mouseX.set(50);
    mouseY.set(50);
  }, [mouseX, mouseY, spotlightOpacity]);

  // Parse period into parts
  const isPresent = experience.period.toLowerCase().includes("present");
  const periodParts = experience.period.split("-").map((s) => s.trim());
  const startYear = periodParts[0] || "2024";

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ── Timeline Node Indicator ── */}
      <div className="absolute -left-[20px] sm:-left-[30px] top-6 -translate-y-1/2 z-20">
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
        ref={glowRef}
        className="absolute -inset-2 sm:-inset-3 rounded-[32px] pointer-events-none -z-10"
        style={{
          opacity: isOpen ? 1 : 0.35,
          transform: isOpen ? "scale(1.01)" : "scale(0.95)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.18) 0%, rgba(109, 40, 217, 0.08) 45%, rgba(15, 16, 22, 0) 75%)",
          filter: "blur(28px)",
        }}
      />

      {/* ── Experience Card with BorderGlow ── */}
      <BorderGlow
        edgeSensitivity={25}
        glowRadius={40}
        glowIntensity={1.0}
        coneSpread={25}
        borderRadius={24}
        animated={false}
        fillOpacity={0.4}
        backgroundColor={isLightMode ? "#E7E8EB" : "#0f1016"}
        glowColor={isLightMode ? "210 80 65" : "280 85 75"}
        colors={
          isLightMode
            ? ["#60a5fa", "#38bdf8", "#818cf8"]
            : ["#c084fc", "#f472b6", "#38bdf8"]
        }
        className={cn(
          "group relative flex flex-col w-full rounded-2xl sm:rounded-3xl border transition-[border-color,background-color,transform,box-shadow] duration-300 overflow-hidden cursor-pointer",
          isOpen
            ? "border-[#8B5CF6]/50 shadow-[0_10px_30px_rgba(57,78,110,0.08),0_2px_8px_rgba(0,0,0,0.04)] dark:border-[#8B5CF6]/40 dark:shadow-[0_16px_48px_rgba(0,0,0,0.85),0_0_24px_rgba(139,92,246,0.15)]"
            : "border-[#D0D5DD] hover:border-[#B8C0CC] shadow-[0_4px_20px_rgba(57,78,110,0.04),0_1px_3px_rgba(0,0,0,0.02)] dark:border-white/[0.14] dark:hover:border-white/25 dark:shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
        )}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
          className="relative w-full h-full flex flex-col"
        >
          {/* Magic Bento Internal Spotlight — driven by motion value */}
          <motion.div
            className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none z-0"
            style={{
              opacity: isOpen ? 1 : smoothSpotlight,
              background: useTransform(
                [smoothMouseX, smoothMouseY],
                ([x, y]) =>
                  `radial-gradient(500px circle at ${x}% ${y}%, rgba(167, 139, 250, 0.10), rgba(109, 40, 217, 0.03) 40%, transparent 70%)`
              ),
            }}
          />

          {/* Top Edge Specular Highlight */}
          <div
            className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl sm:rounded-t-3xl pointer-events-none opacity-40 dark:opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-10"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 30%, rgba(167, 139, 250, 0.45) 50%, rgba(255, 255, 255, 0.4) 70%, transparent 100%)",
            }}
          />

          {/* ── Card Header / Summary Row ── */}
          <div className="relative flex flex-col justify-between w-full p-3.5 sm:p-5 md:p-6 z-10">
            <div className="flex items-start justify-between gap-3 sm:gap-4 w-full">
              {/* Role & Company Title with Company Logo Badge */}
              <div className="flex items-start gap-2.5 sm:gap-3.5 flex-1 min-w-0">
                {experience.logo && (
                  <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-black/[0.04] border border-black/10 dark:bg-white/[0.04] dark:border-white/[0.12] p-1.5 shrink-0 flex items-center justify-center shadow-sm mt-0.5 group-hover:scale-105 group-hover:border-[#8B5CF6]/40 transition-[transform,border-color] duration-200">
                    <Image
                      src={experience.logo}
                      alt={`${experience.company} logo`}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] sm:text-base md:text-lg font-bold text-[#000000] dark:text-[#CBD5E1] dark:group-hover:text-white font-display tracking-tight leading-snug transition-colors">
                    {experience.role}{" "}
                    <span className="font-semibold text-[#000000] dark:text-[#94A3B8] transition-colors">
                      @ {experience.company}
                    </span>
                  </h3>

                  {/* Location & External Link */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[11px] sm:text-[12.5px] font-mono text-[#000000] dark:text-[#94A3B8] mt-1.5"
                    >
                      {experience.location && (
                        <div className="flex items-center gap-1 text-[#000000] dark:text-[#94A3B8]">
                          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#000000] dark:text-[#A78BFA] shrink-0" />
                          <span>{experience.location}</span>
                        </div>
                      )}

                      {experience.companyUrl && (
                        <a
                          href={`https://${experience.companyUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-[#000000] hover:text-black dark:text-[#A78BFA] dark:hover:text-white transition-colors hover:underline font-semibold"
                        >
                          <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#000000] dark:text-[#A78BFA] shrink-0" />
                          <span>{experience.companyUrl}</span>
                        </a>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Date & Expand Chevron Button */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 mt-0.5">
                <div className="text-[11px] sm:text-xs md:text-sm font-mono font-semibold tracking-tight text-[#000000] dark:text-[#94A3B8] whitespace-nowrap">
                  <span>{startYear}</span>
                  <span className="text-black/40 dark:text-zinc-500 mx-1">-</span>
                  {isPresent ? (
                    <span className="text-[#000000] dark:text-[#CBD5E1] font-bold">
                      Present
                    </span>
                  ) : (
                    <span className="text-[#000000] dark:text-[#94A3B8]">{periodParts[1]}</span>
                  )}
                </div>

                {/* Chevron Down Button */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/[0.04] border border-black/10 dark:bg-white/[0.04] dark:border-white/[0.12] flex items-center justify-center text-[#000000] dark:text-[#CBD5E1] group-hover:border-[#8B5CF6]/40 group-hover:bg-[#8B5CF6]/[0.08] group-hover:text-[#8B5CF6] dark:group-hover:text-white transition-[border-color,background-color,color] duration-200"
                >
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
                <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 md:px-6 md:pb-6 border-t border-black/10 dark:border-white/[0.08] relative z-10">
                  <div className="space-y-3 pt-2.5 w-full">
                    <p className="text-[13px] sm:text-[14px] text-[#000000] dark:text-[#94A3B8] leading-relaxed font-sans font-normal">
                      {experience.description}
                    </p>

                    {/* Technology Pills in Black font styling */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-full text-[10.5px] sm:text-[11.5px] font-mono font-bold bg-black/[0.06] border border-black/15 text-[#000000] hover:border-black/35 hover:bg-black/[0.09] dark:bg-white/[0.04] dark:border-white/[0.10] dark:text-[#CBD5E1] dark:hover:border-[#8B5CF6]/35 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </BorderGlow>
    </div>
  );
}

export default memo(ExperienceItem);
