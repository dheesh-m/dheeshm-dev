"use client";

import { motion } from "framer-motion";
import { EXPERTISE_CARDS } from "@/data/expertiseCards";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Orbit } from "lucide-react";

interface ExpertiseCardGridProps {
  onToggleView?: () => void;
}

export default function ExpertiseCardGrid({ onToggleView }: ExpertiseCardGridProps) {
  const { isLightMode } = useTheme();

  return (
    <div className="w-full max-w-7xl mx-auto py-4 sm:py-6">
      {/* 3-Column Responsive Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {EXPERTISE_CARDS.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "relative rounded-[20px] sm:rounded-[22px] p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 group",
              isLightMode
                ? "bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_30px_rgba(57,78,110,0.06)] hover:border-[#394E6E]/35 hover:shadow-[0_16px_40px_rgba(57,78,110,0.12)] hover:-translate-y-1"
                : "bg-[#0C0E14]/85 backdrop-blur-xl border border-white/10 shadow-[0_14px_40px_rgba(0,0,0,0.6)] hover:border-white/25 hover:shadow-[0_20px_48px_rgba(0,0,0,0.85)] hover:-translate-y-1"
            )}
          >
            {/* Header: Title & Description */}
            <div className="mb-4 sm:mb-6">
              <h3
                className={cn(
                  "text-base sm:text-xl font-bold tracking-tight font-display mb-1.5 sm:mb-2 transition-colors",
                  isLightMode ? "text-[#171A1F] group-hover:text-[#394E6E]" : "text-white group-hover:text-zinc-100"
                )}
              >
                {card.title}
              </h3>
              <p
                className={cn(
                  "text-xs sm:text-[13px] leading-relaxed font-sans min-h-0 sm:min-h-[36px]",
                  isLightMode ? "text-[#66717D]" : "text-gray-400"
                )}
              >
                {card.description}
              </p>
            </div>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
              {card.technologies.map((tech) => (
                <span
                  key={tech}
                  className={cn(
                    "px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-mono transition-all duration-200",
                    isLightMode
                      ? "bg-slate-100 text-[#334155] border border-slate-200/80 group-hover:border-[#394E6E]/25"
                      : "bg-white/[0.04] text-gray-300 border border-white/10 group-hover:border-white/20 group-hover:text-white"
                  )}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Centered Return Toggle Button in Cards View */}
      {onToggleView && (
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <button
            onClick={onToggleView}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 shadow-md outline-none cursor-pointer group backdrop-blur-xl",
              isLightMode
                ? "bg-white/95 hover:bg-white text-[#171A1F] border border-slate-200 hover:border-[#394E6E]/40 hover:shadow-lg active:scale-95"
                : "bg-[#0c0c14]/90 hover:bg-white/10 text-white border border-white/20 hover:border-white/35 hover:shadow-[0_4px_24px_rgba(0,0,0,0.7)] active:scale-95"
            )}
            aria-label="Switch to Constellation View"
          >
            <Orbit className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 group-hover:text-[#394E6E] dark:group-hover:text-white transition-colors" />
            <span>CONSTELLATION ↗</span>
          </button>
        </div>
      )}
    </div>
  );
}

