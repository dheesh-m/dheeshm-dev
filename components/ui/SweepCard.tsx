"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import BorderGlow from "./BorderGlow";

interface SweepCardProps {
  children: ReactNode;
  className?: string;
  borderRadius?: number;
}

export default function SweepCard({
  children,
  className,
  borderRadius = 24,
}: SweepCardProps) {
  const { isLightMode } = useTheme();

  return (
    <BorderGlow
      edgeSensitivity={25}
      glowRadius={40}
      glowIntensity={1.0}
      coneSpread={25}
      borderRadius={borderRadius}
      animated={false}
      fillOpacity={0.4}
      backgroundColor={isLightMode ? "#E7E8EB" : "#0d0d12"}
      glowColor={isLightMode ? "210 80 65" : "280 85 75"}
      colors={
        isLightMode
          ? ["#60a5fa", "#38bdf8", "#818cf8"]
          : ["#c084fc", "#f472b6", "#38bdf8"]
      }
      className={cn(
        "h-full w-full overflow-hidden transition-all duration-300 group/card",
        isLightMode
          ? "border-slate-300/80 shadow-[0_4px_20px_rgba(57,78,110,0.04)]"
          : "border-white/10 shadow-2xl",
        className
      )}
    >
      <div className="relative z-10 h-full w-full flex flex-col transform transition-transform duration-300 group-hover/card:-translate-y-0.5">
        {children}
      </div>
    </BorderGlow>
  );
}
