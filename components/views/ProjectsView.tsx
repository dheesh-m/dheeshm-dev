"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import AccordionGallery, { AccordionGalleryItem } from "@/components/ui/AccordionGallery";

export default function ProjectsView() {
  const { isLightMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Transform real projects into AccordionGallery items
  const galleryItems: AccordionGalleryItem[] = useMemo(() => {
    return projects.map((project) => ({
      id: project.id,
      image: project.imageUrl || "",
      label: project.title,
      alt: `${project.title} project`,
      number: project.number,
      categoryBadge: project.categoryBadge,
      containImage: project.id === "humanoid",
    }));
  }, []);

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-32 pb-14 sm:pb-16 min-h-screen flex flex-col justify-center select-none">
      
      {/* ── 1. Section Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center mx-auto mb-8 sm:mb-12 max-w-2xl">
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1 rounded-full backdrop-blur-md mb-3 sm:mb-4 transition-colors",
            isLightMode
              ? "bg-red-500/[0.05] border border-red-500/20 text-[#E50909]"
              : "bg-white/[0.04] border border-white/10 text-white/80"
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              isLightMode
                ? "bg-[#E50909] shadow-[0_0_8px_#E50909]"
                : "bg-[#950606] shadow-[0_0_8px_#950606]"
            )}
          />
          <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
            04 / FEATURED PROJECTS
          </span>
        </div>

        <h2
          className={cn(
            "text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-2 transition-colors font-primary",
            isLightMode ? "text-[#111111]" : "text-white"
          )}
          style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700 }}
        >
          Engineering Systems
        </h2>
        <p
          className={cn(
            "text-xs sm:text-sm md:text-base font-normal transition-colors font-body",
            isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
          )}
          style={{ fontFamily: "var(--font-josefin), sans-serif", lineHeight: 1.6 }}
        >
          Real-world systems. Real impact.
        </p>
      </div>

      {/* ── 2. Visual Accordion Gallery (React Bits GSAP Accordion Gallery) ── */}
      <div className="w-full mb-8 sm:mb-10">
        <AccordionGallery
          items={galleryItems}
          defaultIndex={0}
          activeIndex={activeIndex}
          onActiveChange={setActiveIndex}
          height={440}
          gap={12}
          radius={22}
          expandRatio={0.50}
          tilt={5}
          parallax={0.35}
          duration={0.55}
          accentColor="#E50909"
          isLightMode={isLightMode}
          trigger="hover"
        />
      </div>

      {/* ── 3. Connected Project Details & Action Card ──────────────────────── */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "w-full rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 lg:p-10 border transition-all duration-300 relative overflow-hidden",
              isLightMode
                ? "bg-white/85 border-black/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl"
                : "bg-[#090C17]/80 border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
            )}
          >
            {/* Top Navigation Row: Step Switcher Tabs + Active Category Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-black/[0.06] dark:border-white/10">
              {/* Project Quick Selector Tabs */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {projects.map((proj, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={cn(
                        "px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer border select-none",
                        isSelected
                          ? isLightMode
                            ? "bg-[#E50909] text-white border-[#E50909] shadow-sm"
                            : "bg-[#E50909] text-white border-[#E50909] shadow-[0_0_12px_rgba(229,9,9,0.5)]"
                          : isLightMode
                          ? "bg-black/[0.03] text-[#475467] border-black/10 hover:border-black/20 hover:text-[#111111]"
                          : "bg-white/[0.04] text-white/70 border-white/10 hover:border-white/20 hover:text-white"
                      )}
                    >
                      {proj.number} <span className="hidden sm:inline font-sans font-normal ml-1">{proj.title.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Category Badge */}
              <div
                className={cn(
                  "px-3 py-1 rounded-md border text-[9.5px] sm:text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md",
                  isLightMode
                    ? "bg-red-500/[0.06] border-red-500/20 text-[#E50909]"
                    : "bg-red-500/[0.08] border-red-500/20 text-[#E50909]"
                )}
              >
                {activeProject.categoryBadge}
              </div>
            </div>

            {/* Title & Description Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-6 sm:mb-8">
              <div className="lg:col-span-5">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-mono text-sm font-bold text-[#E50909]">
                    {activeProject.number}
                  </span>
                  <h3
                    className={cn(
                      "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-primary",
                      isLightMode ? "text-[#111111]" : "text-white"
                    )}
                    style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700 }}
                  >
                    {activeProject.title}
                  </h3>
                </div>
                <p
                  className={cn(
                    "text-xs sm:text-sm font-primary font-semibold tracking-wide uppercase",
                    isLightMode ? "text-[#E50909]" : "text-[#E50909]"
                  )}
                >
                  {activeProject.category}
                </p>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-4">
                <p
                  className={cn(
                    "text-sm sm:text-base leading-relaxed font-normal font-body",
                    isLightMode ? "text-[#343A40]" : "text-[#CBD5E1]"
                  )}
                  style={{ fontFamily: "var(--font-josefin), sans-serif", lineHeight: 1.6 }}
                >
                  {activeProject.description}
                </p>

                {/* Technology Pills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-medium tracking-wide border transition-colors",
                        isLightMode
                          ? "bg-black/[0.03] border-black/10 text-[#343A40]"
                          : "bg-white/[0.04] border-white/10 text-white/80"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer: Direct Action Links */}
            <div
              className={cn(
                "flex flex-wrap items-center justify-between gap-4 pt-4 border-t text-xs sm:text-sm font-mono",
                isLightMode ? "border-black/[0.06]" : "border-white/10"
              )}
            >
              <div className="flex items-center gap-4">
                {activeProject.githubUrl && activeProject.githubUrl !== "private" ? (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(
                      "inline-flex items-center gap-2 py-1 px-2.5 rounded-lg border transition-all duration-200 cursor-pointer",
                      isLightMode
                        ? "bg-white border-black/10 text-[#111111] hover:border-black/25 hover:shadow-sm"
                        : "bg-white/[0.05] border-white/10 text-white hover:border-white/25 hover:bg-white/[0.09]"
                    )}
                  >
                    <GithubIcon className={cn("w-4 h-4", isLightMode ? "text-[#E50909]" : "text-[#E50909]")} />
                    <span>View Source</span>
                  </a>
                ) : (
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 py-1 px-2.5 rounded-lg border",
                      isLightMode
                        ? "bg-black/[0.02] border-black/5 text-[#98A2B3]"
                        : "bg-white/[0.02] border-white/5 text-white/40"
                    )}
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Private Repository</span>
                  </span>
                )}

                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(
                      "inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg font-semibold border transition-all duration-200 cursor-pointer",
                      isLightMode
                        ? "bg-red-500/[0.06] border-red-500/20 text-[#E50909] hover:bg-red-500/[0.12]"
                        : "bg-red-500/[0.1] border-red-500/30 text-[#E50909] hover:bg-red-500/[0.18]"
                    )}
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 py-1 text-xs font-semibold cursor-pointer transition-colors",
                    isLightMode ? "text-[#111111] hover:text-[#E50909]" : "text-white/80 hover:text-white"
                  )}
                >
                  <span>Project Overview</span>
                  <ArrowRight className="w-4 h-4 text-[#E50909]" />
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
