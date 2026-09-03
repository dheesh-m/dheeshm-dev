"use client";

import React from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function ProjectsView() {
  const { isLightMode } = useTheme();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-32 pb-14 sm:pb-16 min-h-screen flex flex-col justify-center">
      {/* ── Section Header (Centered) ── */}
      <div className="flex flex-col items-center text-center mx-auto mb-6 sm:mb-10 lg:mb-12 max-w-2xl">
        <div className={cn(
          "inline-flex items-center gap-2 px-3.5 py-1 rounded-full backdrop-blur-md mb-3 sm:mb-4 transition-colors",
          isLightMode 
            ? "bg-red-500/[0.05] border border-red-500/20 text-[#E50909]" 
            : "bg-white/[0.04] border border-white/10 text-white/80"
        )}>
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]"
          )} />
          <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
            04 / FEATURED PROJECTS
          </span>
        </div>

        <h2 
          className={cn(
            "text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-2 transition-colors",
            isLightMode ? "text-[#111111]" : "text-white"
          )}
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          Engineering Systems
        </h2>
        <p className={cn(
          "text-xs sm:text-sm md:text-base font-normal transition-colors",
          isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
        )}>
          Real-world systems. Real impact.
        </p>
      </div>

      {/* ── Responsive Projects Grid (Optimized for Mobile, Tablet & Desktop) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-md sm:max-w-none mx-auto">
        {projects.map((project) => {
          return (
            <div
              key={project.id}
              className={cn(
                "group relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 lg:p-5 flex flex-col justify-between border transition-all duration-300 active:scale-[0.99] sm:active:scale-100",
                isLightMode
                  ? "bg-white border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-black/25 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                  : "bg-white/[0.03] border-white/10 backdrop-blur-xl hover:border-white/25 hover:bg-white/[0.06] shadow-lg"
              )}
            >
              {/* Media Preview Box — Unified 16:10 dimensions across all cards */}
              <div className={cn(
                "relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 flex items-center justify-center",
                isLightMode ? "bg-slate-100" : "bg-[#080912]"
              )}>
                {project.id === "humanoid" && (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />
                )}
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                    className={cn(
                      "transition-transform duration-500 group-hover:scale-105",
                      project.id === "humanoid"
                        ? "object-contain object-center"
                        : "object-cover object-center"
                    )}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-500 font-mono text-xs">
                    {project.title}
                  </div>
                )}

                {/* Number Badge */}
                <div className={cn(
                  "absolute top-2 left-2 sm:top-2.5 sm:left-2.5 px-2 py-0.5 sm:px-2.5 rounded backdrop-blur-md shadow-sm border",
                  isLightMode
                    ? "bg-white/95 border-black/10 text-[#111111]"
                    : "bg-black/75 border-white/15 text-white"
                )}>
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-wider">
                    {project.number}
                  </span>
                </div>

                {/* Category Badge */}
                <div className={cn(
                  "absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 px-2 py-0.5 sm:px-2.5 rounded backdrop-blur-md shadow-sm border",
                  isLightMode
                    ? "bg-white/95 border-black/10 text-[#E50909]"
                    : "bg-black/75 border-white/15 text-[#950606]"
                )}>
                  <span className={cn(
                    "font-mono text-[8.5px] sm:text-[9px] font-bold tracking-wider uppercase",
                    isLightMode ? "text-[#E50909]" : "text-[#950606]"
                  )}>
                    {project.categoryBadge}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col flex-1 mb-3 sm:mb-4">
                <h3 className={cn(
                  "text-[15px] sm:text-base lg:text-lg font-bold tracking-tight mb-1 sm:mb-1.5 transition-colors",
                  isLightMode ? "text-[#111111]" : "text-white"
                )}>
                  {project.title}
                </h3>
                <p className={cn(
                  "text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal transition-colors",
                  isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
                )}>
                  {project.description}
                </p>
              </div>

              {/* Technologies Pills */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      "px-2 py-0.5 rounded text-[9px] sm:text-[9.5px] font-mono font-medium tracking-wide transition-colors",
                      isLightMode
                        ? "bg-white border border-black/10 text-[#343A40]"
                        : "bg-white/[0.04] border border-white/10 text-white/70"
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links Bar (Accessible Touch Friendly Targets) */}
              <div className={cn(
                "flex items-center justify-between pt-2.5 sm:pt-3 border-t text-[11px] sm:text-xs font-mono transition-colors",
                isLightMode ? "border-black/[0.06]" : "border-white/10"
              )}>
                {project.githubUrl && project.githubUrl !== "private" ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(
                      "inline-flex items-center gap-1.5 py-1 px-1 -mx-1 rounded transition-colors",
                      isLightMode ? "text-[#475467] hover:text-[#111111] active:text-[#111111]" : "text-white/60 hover:text-white active:text-white"
                    )}
                  >
                    <GithubIcon className={cn("w-3.5 h-3.5", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                    <span>Source</span>
                  </a>
                ) : (
                  <span className={cn(
                    "inline-flex items-center gap-1.5 py-1",
                    isLightMode ? "text-[#98A2B3]" : "text-white/40"
                  )}>
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Private</span>
                  </span>
                )}

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(
                      "inline-flex items-center gap-1 py-1 px-1.5 -mx-1.5 rounded font-semibold transition-colors",
                      isLightMode ? "text-[#111111] hover:text-[#E50909] active:text-[#E50909]" : "text-white hover:text-[#950606] active:text-[#950606]"
                    )}
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className={cn("w-3.5 h-3.5", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                  </a>
                ) : (
                  <span className={cn(
                    "inline-flex items-center gap-1 py-1 font-semibold",
                    isLightMode ? "text-[#343A40] hover:text-[#E50909]" : "text-white/70 hover:text-white"
                  )}>
                    <span>Case Study</span>
                    <ArrowRight className={cn("w-3.5 h-3.5", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
