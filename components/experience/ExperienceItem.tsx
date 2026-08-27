"use client";

import { useRef, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

  // Parse period into parts
  const isPresent = experience.period.toLowerCase().includes("present");
  const periodParts = experience.period.split("-").map((s) => s.trim());
  const startYear = periodParts[0] || "2024";

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ── Timeline Node Indicator (Left of Card - Neutral Grey & Subtle Accent) ── */}
      <div className="absolute -left-[24px] sm:-left-[32px] top-6 -translate-y-1/2 z-20">
        {isCurrent ? (
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#22252b] dark:bg-[#252830] border-2 border-slate-400 dark:border-slate-300 flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.12)]">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-sm" />
          </div>
        ) : (
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-200 dark:bg-[#1a1b22] border-2 border-slate-300 dark:border-white/20 flex items-center justify-center">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-400 dark:bg-white/40" />
          </div>
        )}
      </div>

      {/* ── Experience Card (Soft Charcoal Gradient #181A1F -> #22252B in Dark, #FAFBFC in Light) ── */}
      <div
        className={cn(
          "group relative flex flex-col w-full rounded-2xl sm:rounded-3xl border transition-[border-color,background-color,box-shadow,transform] duration-300 ease-out overflow-hidden cursor-pointer",
          // Dark Mode: Charcoal gradient #181A1F -> #22252B with subtle border rgba(180, 185, 195, 0.18)
          "dark:bg-gradient-to-br dark:from-[#181A1F] dark:to-[#22252B] dark:backdrop-blur-2xl dark:border-[rgba(180,185,195,0.18)] dark:hover:border-[rgba(180,185,195,0.3)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)]",
          // Light Mode: Cool-White #FAFBFC with subtle #D9DEE4 border
          "bg-[#FAFBFC]/95 backdrop-blur-2xl border-[#D9DEE4] hover:border-[#7188A3] shadow-[0_8px_30px_rgba(113,136,163,0.05)]",
          isOpen
            ? "border-[#7188A3] dark:border-[rgba(180,185,195,0.28)] shadow-[0_16px_44px_rgba(113,136,163,0.08)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.65)]"
            : "hover:-translate-y-0.5"
        )}
        onClick={onClick}
      >
        {/* ── Card Header / Summary Row ── */}
        <div className="relative flex flex-col justify-between w-full p-5 sm:p-7 z-10">
          <div className="flex items-start justify-between gap-4 w-full">
            {/* Role & Company Title */}
            <div className="flex-1">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#171A1F] dark:text-[#f8fafc] font-display tracking-tight leading-snug">
                {experience.role}{" "}
                <span className="font-medium text-[#5F7692] dark:text-[#cbd5e1] transition-colors">
                  @ {experience.company}
                </span>
              </h3>

              {/* Location & External Link */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-[13px] font-mono text-[#66717D] dark:text-gray-400 mt-2.5"
                >
                  {experience.location && (
                    <div className="flex items-center gap-1.5 text-[#66717D] dark:text-gray-400">
                      <MapPin className="w-3.5 h-3.5 text-[#5F7692] dark:text-gray-400 shrink-0" />
                      <span>{experience.location}</span>
                    </div>
                  )}

                  {experience.companyUrl && (
                    <a
                      href={`https://${experience.companyUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[#66717D] dark:text-gray-300 hover:text-[#171A1F] dark:hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#5F7692] dark:text-gray-400 shrink-0" />
                      <span>{experience.companyUrl}</span>
                    </a>
                  )}
                </motion.div>
              )}
            </div>

            {/* Date & Expand Chevron Button */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 mt-0.5">
              <div className="text-xs sm:text-sm font-mono font-medium tracking-wide text-[#66717D] dark:text-gray-400 whitespace-nowrap">
                <span>{startYear}</span>
                <span className="text-gray-400 mx-1.5">-</span>
                {isPresent ? (
                  <span className="text-[#171A1F] dark:text-[#f1f5f9] font-bold">
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
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E9EDF1] dark:bg-white/[0.06] border border-[#D9DEE4] dark:border-white/10 flex items-center justify-center text-[#66717D] dark:text-gray-300 group-hover:bg-[#D9DEE4] dark:group-hover:bg-white/10 transition-colors"
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
              <div className="px-5 sm:px-7 pb-6 sm:pb-8 pt-1 flex flex-col md:flex-row items-start justify-between gap-6 md:gap-10 border-t border-[#D9DEE4] dark:border-white/[0.08]">
                
                {/* Left Column: Description & Tech Pills */}
                <div className="flex-1 space-y-4 sm:space-y-5 pt-3">
                  <p className="text-xs sm:text-[13.5px] md:text-sm text-[#66717D] dark:text-[#d1d5db] leading-relaxed sm:leading-loose font-sans">
                    {experience.description}
                  </p>

                  {/* Technology Pills in clean grey / slate styling */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium bg-[#E9EDF1] dark:bg-white/[0.05] border border-[#D9DEE4] dark:border-white/10 text-[#334155] dark:text-gray-300 hover:border-[#7188A3] dark:hover:border-white/25 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Company Logo Emblem in soft grey/white tones */}
                {experience.logo && (
                  <div className="hidden md:flex shrink-0 w-28 h-28 lg:w-32 lg:h-32 items-center justify-center relative my-auto">
                    {/* Concentric subtle decorative rings in soft grey/white */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-[#D9DEE4] dark:border-white/15 animate-[spin_25s_linear_infinite]" />
                    <div className="absolute inset-3 rounded-full border border-[#D9DEE4] dark:border-white/10" />
                    
                    {/* Center Logo Disc */}
                    <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#FAFBFC] dark:bg-[#1a1c23]/90 backdrop-blur-md border border-[#D9DEE4] dark:border-white/15 p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        width={64}
                        height={64}
                        sizes="64px"
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

