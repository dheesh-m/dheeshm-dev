"use client";

import { projects } from "@/data/projects";
import SectionLabel from "../ui/SectionLabel";
import ProjectsDominoGrid from "./ProjectsDominoGrid";
import { MousePointer } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function Projects() {
  const { isLightMode } = useTheme();

  return (
    <section id="projects" className="relative w-full py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Row */}
        <div className="flex flex-col items-center text-center mx-auto mb-8 sm:mb-12">
          <SectionLabel number="04" text="FEATURED PROJECTS" />
          <h2 
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2 transition-colors font-primary",
              isLightMode ? "text-[#111111]" : "text-white"
            )}
            style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700 }}
          >
            Engineering Systems
          </h2>
          <p className={cn(
            "text-sm sm:text-base font-normal font-body",
            isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
          )}
          style={{ fontFamily: "var(--font-josefin), sans-serif", lineHeight: 1.6 }}
          >
            Real-world systems. Real impact.
          </p>

          {/* Interaction Hint */}
          <div className={cn(
            "flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border text-[10px] sm:text-[11px] font-mono w-fit shadow-sm mt-4",
            isLightMode
              ? "bg-white border-black/10 text-[#343A40]"
              : "bg-[#0c0c14]/90 border-white/10 text-gray-300"
          )}>
            <MousePointer className={cn("w-3.5 h-3.5 shrink-0", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
            <span className="hidden sm:inline">Hover to explore details</span>
            <span className="sm:hidden">Tap card to explore</span>
          </div>
        </div>

        {/* 4-Card Grid */}
        <ProjectsDominoGrid projects={projects} />
      </div>
    </section>
  );
}
