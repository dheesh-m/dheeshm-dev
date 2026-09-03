"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import DecryptedText from "./DecryptedText";

export default function SectionLabel({
  text,
  number,
  className = "",
}: {
  text: string;
  /** Matches the navbar's numbering. Omit for sections with no nav entry. */
  number?: string;
  className?: string;
}) {
  const { isLightMode } = useTheme();

  return (
    <div className={cn("inline-block mb-4 sm:mb-6", className)}>
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border transition-colors duration-300 select-none max-w-full backdrop-blur-md",
          isLightMode
            ? "bg-red-500/[0.05] border-red-500/20 text-[#E50909]"
            : "bg-white/[0.04] border-white/10 text-white/90"
        )}
      >
        <span 
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]"
          )} 
        />
        <span
          className={cn(
            "text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.2em] uppercase truncate",
            isLightMode ? "text-[#E50909]" : "text-white/95"
          )}
        >
          {number && <span className="mr-1.5">{number} /</span>}
          <DecryptedText
            text={text}
            animateOn="view"
            speed={35}
            maxIterations={12}
            className="tracking-[0.2em]"
            encryptedClassName="opacity-40"
          />
        </span>
      </div>
    </div>
  );
}
