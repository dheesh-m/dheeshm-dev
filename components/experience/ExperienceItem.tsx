"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Experience } from "@/data/experience";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin } from "lucide-react";

interface ExperienceItemProps {
  experience: Experience;
  isOpen: boolean;
  onClick: () => void;
}

export default function ExperienceItem({ experience, isOpen, onClick }: ExperienceItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Decorative rings spin only while the expanded item is actually on screen.
  const isInView = useInView(ref, { margin: "200px" });
  const spinning = isOpen && isInView;

  return (
    <motion.div
      ref={ref}
      initial={false}
      className={cn(
        "group relative flex flex-col w-full rounded-[20px] border transition-all duration-500 overflow-hidden",
        isOpen 
          ? "bg-[rgba(14,15,17,0.94)] backdrop-blur-xl border-[rgba(255,255,255,0.18)] shadow-[0_12px_40px_rgba(0,0,0,0.6)]" 
          : "bg-[rgba(14,15,17,0.88)] backdrop-blur-xl border-[rgba(255,255,255,0.14)] shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(20,21,24,0.92)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.04)]"
      )}
    >
      {/* Header / Trigger */}
      <button
        onClick={onClick}
        className="relative flex items-center justify-between w-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 text-left focus:outline-none z-10"
      >
        {/* Background Highlight on Open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              layoutId={`exp-bg-${experience.id}`}
              className="absolute inset-0 bg-[rgba(255,255,255,0.035)] z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex items-start justify-between w-full gap-3 sm:gap-4">
          <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-1.5 md:gap-4">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight font-display">
                {experience.role} <span className="text-[#B5B5B5] font-normal block sm:inline mt-0.5 sm:mt-0">@ {experience.company}</span>
              </h3>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-xs sm:text-sm font-mono text-[#A5A5A5] font-semibold tracking-widest whitespace-nowrap">
                {experience.period}
              </span>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center w-6 h-6 mt-0.5 sm:mt-1 text-white/50 group-hover:text-white transition-colors shrink-0">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              +
            </motion.div>
            <motion.div
              animate={{ rotate: isOpen ? 0 : -180, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute text-white text-lg leading-none"
            >
              −
            </motion.div>
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-2">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="flex-1 space-y-4 sm:space-y-5 relative z-10">
                  
                  {/* Metadata: Location & Link */}
                  <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-[#8A8A8A]">
                    {experience.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-zinc-500" />
                        {experience.location}
                      </div>
                    )}
                    {experience.companyUrl && (
                      <a 
                        href={`https://${experience.companyUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-zinc-400" />
                        {experience.companyUrl}
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[#A5A5A5] leading-loose text-[15px]">
                    {experience.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-[10px] font-mono text-[#D4D4D4] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Optional visual graphic on the right */}
                <div className={`flex shrink-0 w-24 h-24 md:w-32 md:h-32 items-center justify-center relative ${experience.logo ? 'opacity-90' : 'opacity-15'} mx-auto md:mx-0 mt-4 md:mt-0`}>
                  <motion.div 
                    className="absolute inset-0 border border-white/10 rounded-full pointer-events-none"
                    animate={spinning ? { rotate: 360, scale: [1, 1.05, 1] } : { rotate: 0, scale: 1 }}
                    transition={spinning ? { duration: 10, repeat: Infinity, ease: "linear" } : { duration: 0 }}
                  />
                  <motion.div 
                    className="absolute inset-4 border border-white/5 rounded-full pointer-events-none"
                    animate={spinning ? { rotate: -360, scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 }}
                    transition={spinning ? { duration: 15, repeat: Infinity, ease: "linear" } : { duration: 0 }}
                  />
                  {experience.logo ? (
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex items-center justify-center bg-transparent border border-white/5 shadow-sm">
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        width={64}
                        height={64}
                        sizes="64px"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-[10px] md:text-xs font-mono text-white/20">EXP</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
