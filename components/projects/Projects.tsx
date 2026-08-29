"use client";

import { projects } from "@/data/projects";
import SectionLabel from "../ui/SectionLabel";
import ProjectsDominoGrid from "./ProjectsDominoGrid";
import { MousePointer } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Row — entrance handled by parent ScrollSectionWrapper */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <SectionLabel number="04" text="FEATURED PROJECTS" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] font-display text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] via-[#334155] to-[#394E6E] dark:from-[#8A8A8A] dark:via-[#D1D5DB] dark:to-[#FFFFFF]">
              Engineering Systems
            </h2>
          </div>

          {/* Interaction Hint */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#0c0c14]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 text-[10px] sm:text-[11px] font-mono text-gray-700 dark:text-gray-300 w-fit shadow-sm">
            <MousePointer className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 shrink-0" />
            <span className="hidden sm:inline">Hover to tilt • Click to flip • Domino effect</span>
            <span className="sm:hidden">Tap card to flip • Domino effect</span>
          </div>
        </div>

        {/* 4-Card 3D Interactive Grid & Domino Cascade */}
        <ProjectsDominoGrid projects={projects} />
      </div>
    </section>
  );
}
