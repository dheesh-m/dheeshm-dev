"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, ArrowUpRight, Sparkles, Layers, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function ProjectsView() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-16 min-h-[calc(100vh-140px)] flex flex-col justify-center">
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase">
              04 / FEATURED PROJECTS
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-2 uppercase">
            Engineering Systems
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-normal">
            Real-world systems. Real impact.
          </p>
        </div>

        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-white/70">
          <Sparkles className="w-3.5 h-3.5 text-[#EF4444]" />
          <span>Hover to explore details</span>
        </div>
      </div>

      {/* ── 4-Column Projects Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {projects.map((project) => {
          const isApt = project.id === "apt";
          const isHumanoid = project.id === "humanoid";
          const isMovie = project.id === "ticketlojao";
          const isFarmLens = project.id === "farmlens";

          const projectImage = project.imageUrl || (isFarmLens ? "/ai-experiments.jpg" : "/apt-transit.jpg");

          return (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06] backdrop-blur-xl p-4 sm:p-5 transition-all duration-300 shadow-xl overflow-hidden"
            >
              {/* Top Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-4 bg-black/40 border border-white/10">
                <Image
                  src={projectImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Number Badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 border border-white/15 backdrop-blur-md">
                  <span className="font-mono text-[10px] font-bold text-white tracking-wider">
                    {project.number}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-md bg-black/70 border border-white/15 backdrop-blur-md">
                  <span className="font-mono text-[9px] font-bold text-[#EF4444] tracking-wider uppercase">
                    {project.categoryBadge}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col flex-1 mb-4">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3 font-normal">
                  {project.description}
                </p>
              </div>

              {/* Technologies Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[9.5px] font-mono font-medium tracking-wide bg-white/[0.04] border border-white/10 text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                {project.githubUrl && project.githubUrl !== "private" ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-white/40">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Private</span>
                  </span>
                )}

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#EF4444] transition-colors"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-white/50">
                    <span>Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
