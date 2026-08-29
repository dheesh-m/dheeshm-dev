"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import BorderGlow from "./BorderGlow";
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
      <BorderGlow
        edgeSensitivity={30}
        glowRadius={30}
        glowIntensity={1.0}
        coneSpread={25}
        borderRadius={30}
        animated={false}
        fillOpacity={0.4}
        backgroundColor={isLightMode ? "#F1F5F9" : "#120F17"}
        glowColor={isLightMode ? "210 80 65" : "280 85 75"}
        colors={
          isLightMode
            ? ["#60a5fa", "#38bdf8", "#818cf8"]
            : ["#c084fc", "#f472b6", "#38bdf8"]
        }
        className={cn(
          "inline-flex items-center px-3.5 sm:px-5 py-1.5 sm:py-2 transition-colors duration-300 shadow-sm select-none max-w-full",
          isLightMode
            ? "border-slate-300/80 text-[#1E293B]"
            : "border-white/15 text-white/95"
        )}
      >
        <div className="inline-flex items-center gap-2 sm:gap-2.5">
          <div
            className={cn(
              "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse shrink-0",
              isLightMode
                ? "bg-[#1E293B] shadow-[0_0_6px_rgba(30,41,59,0.4)]"
                : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
            )}
          />
          <span
            className={cn(
              "text-[11px] sm:text-[13px] font-mono font-bold tracking-[0.16em] sm:tracking-[0.22em] uppercase truncate",
              isLightMode ? "text-[#1E293B]" : "text-white/95"
            )}
          >
            <DecryptedText
              text={number ? `${number} / ${text}` : text}
              animateOn="inViewHover"
              speed={60}
              maxIterations={12}
              sequential={true}
              className={isLightMode ? "text-[#1E293B]" : "text-white/95"}
              encryptedClassName="text-violet-400 opacity-80"
            />
          </span>
        </div>
      </BorderGlow>
    </div>
  );
}
