"use client";

import React from "react";
import { Briefcase, ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/experience";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function ExperienceView() {
  const { isLightMode } = useTheme();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-16 min-h-[calc(100vh-140px)] flex flex-col justify-center">
      {/* ── Section Header ── */}
      <div className="flex flex-col items-center text-center mx-auto mb-8 sm:mb-12">
        <div className={cn(
          "inline-flex items-center gap-2 px-3.5 py-1 rounded-full backdrop-blur-md mb-4 transition-colors",
          isLightMode 
            ? "bg-red-500/[0.05] border border-red-500/20 text-[#E50909]" 
            : "bg-white/[0.04] border border-white/10 text-white/80"
        )}>
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]"
          )} />
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
            05 / EXPERIENCE
          </span>
        </div>

        <h2 
          className={cn(
            "text-4xl sm:text-6xl font-normal tracking-tight mb-3 transition-colors",
            isLightMode ? "text-[#111111]" : "text-white"
          )}
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          Professional Experience
        </h2>
        <p className={cn(
          "text-sm sm:text-base max-w-2xl font-normal transition-colors",
          isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
        )}>
          Building products. Solving problems. Creating impact.
        </p>
      </div>

      {/* ── Experience Timeline ── */}
      <div className="relative flex flex-col gap-6 pl-4 sm:pl-8">
        
        {/* Vertical Timeline Line */}
        <div className={cn(
          "absolute left-0 sm:left-2 top-4 bottom-4 w-[2px] transition-colors",
          isLightMode ? "bg-red-500/30" : "bg-[#950606]/40"
        )} />

        {/* 2024: Raftaar Theme Park */}
        <div className="relative">
          {/* Timeline Dot Node */}
          <div className="absolute -left-4 sm:-left-8 top-8 -translate-x-1/2 flex items-center gap-2">
            <span className={cn(
              "w-3 h-3 rounded-full",
              isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]"
            )} />
            <span className={cn(
              "font-mono text-xs font-bold",
              isLightMode ? "text-[#111111]" : "text-white"
            )}>
              2024
            </span>
          </div>

          {/* Card Container */}
          <div className={cn(
            "p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 ml-12 sm:ml-16",
            isLightMode
              ? "bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-black/20"
              : "bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05] backdrop-blur-xl shadow-xl"
          )}>
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              
              {/* Left Col: Role & Company */}
              <div className="lg:w-1/3 flex flex-col items-start">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                    isLightMode ? "bg-red-500/[0.08] text-[#E50909]" : "bg-white/[0.08] text-[#950606]"
                  )}>
                    <Briefcase className={cn("w-4 h-4", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-base sm:text-lg font-bold tracking-tight",
                      isLightMode ? "text-[#111111]" : "text-white"
                    )}>
                      Full-Stack Developer, UI/UX
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                      <span className={isLightMode ? "text-[#475467]" : "text-[#94A3B8]"}>
                        @ Raftaar-Theme-Park
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono mt-1 text-[#667085]">
                  <span>Pune, Maharashtra</span>
                  {experiences[0]?.companyUrl && (
                    <a
                      href={`https://${experiences[0].companyUrl}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={cn("inline-flex items-center gap-0.5 hover:underline", isLightMode ? "text-[#E50909]" : "text-[#950606]")}
                    >
                      <span>{experiences[0].companyUrl}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Col: Responsibilities & Impact */}
              <div className="lg:w-2/3 flex flex-col justify-between">
                <ul className={cn(
                  "space-y-2 mb-4 text-xs sm:text-sm leading-relaxed",
                  isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
                )}>
                  <li className="flex items-start gap-2.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", isLightMode ? "bg-[#E50909]" : "bg-[#950606]")} />
                    <span>Developed responsive web applications with modern UI/UX, implementing high-performance frontend features and seamless state management.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", isLightMode ? "bg-[#E50909]" : "bg-[#950606]")} />
                    <span>Built end-to-end features, optimized user flows, and handled application workflows and data operations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", isLightMode ? "bg-[#E50909]" : "bg-[#950606]")} />
                    <span>Integrated RESTful APIs, third-party services, and deployed cloud environments via automated GitHub CI/CD pipelines.</span>
                  </li>
                </ul>

                {/* Technologies */}
                <div className={cn(
                  "flex flex-wrap gap-1.5 pt-3 border-t",
                  isLightMode ? "border-black/[0.06]" : "border-white/10"
                )}>
                  {["JavaScript", "TypeScript", "React", "Next.js", "Flutter", "Dart", "Figma", "shadcn"].map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        "px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs font-mono font-medium tracking-wide transition-colors",
                        isLightMode
                          ? "bg-white border border-black/10 text-[#343A40]"
                          : "bg-white/[0.04] border border-white/10 text-white/80"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 2025: BhoomiTrace Analytics */}
        <div className="relative">
          {/* Timeline Dot Node */}
          <div className="absolute -left-4 sm:-left-8 top-8 -translate-x-1/2 flex items-center gap-2">
            <span className={cn(
              "w-3 h-3 rounded-full",
              isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]"
            )} />
            <span className={cn(
              "font-mono text-xs font-bold",
              isLightMode ? "text-[#111111]" : "text-white"
            )}>
              2025
            </span>
          </div>

          {/* Card Container */}
          <div className={cn(
            "p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 ml-12 sm:ml-16",
            isLightMode
              ? "bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-black/20"
              : "bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05] backdrop-blur-xl shadow-xl"
          )}>
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              
              {/* Left Col: Role & Company */}
              <div className="lg:w-1/3 flex flex-col items-start">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                    isLightMode ? "bg-red-500/[0.08] text-[#E50909]" : "bg-white/[0.08] text-[#950606]"
                  )}>
                    <Briefcase className={cn("w-4 h-4", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-base sm:text-lg font-bold tracking-tight",
                      isLightMode ? "text-[#111111]" : "text-white"
                    )}>
                      Full-Stack Developer
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                      <span className={isLightMode ? "text-[#475467]" : "text-[#94A3B8]"}>
                        @ BhoomiTrace Analytics
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono mt-1 text-[#667085]">
                  <span>India</span>
                  {experiences[1]?.companyUrl && (
                    <a
                      href={`https://${experiences[1].companyUrl}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={cn("inline-flex items-center gap-0.5 hover:underline", isLightMode ? "text-[#E50909]" : "text-[#950606]")}
                    >
                      <span>{experiences[1].companyUrl}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Col: Responsibilities & Impact */}
              <div className="lg:w-2/3 flex flex-col justify-between">
                <ul className={cn(
                  "space-y-2 mb-4 text-xs sm:text-sm leading-relaxed",
                  isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
                )}>
                  <li className="flex items-start gap-2.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", isLightMode ? "bg-[#E50909]" : "bg-[#950606]")} />
                    <span>Built full-stack analytics platform with responsive UI, AI-powered property intelligence, and real-time data feeds.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", isLightMode ? "bg-[#E50909]" : "bg-[#950606]")} />
                    <span>Designed and implemented RESTful APIs for authentication, property telemetry, reports, and payments.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", isLightMode ? "bg-[#E50909]" : "bg-[#950606]")} />
                    <span>Integrated AI/LLM workflows, RAG pipelines, and vector databases for intelligent property recommendations.</span>
                  </li>
                </ul>

                {/* Technologies */}
                <div className={cn(
                  "flex flex-wrap gap-1.5 pt-3 border-t",
                  isLightMode ? "border-black/[0.06]" : "border-white/10"
                )}>
                  {["React", "Node.js", "TypeScript", "Python", "REST APIs", "LLM", "RAG", "LangGraph", "Vector DBs"].map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        "px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs font-mono font-medium tracking-wide transition-colors",
                        isLightMode
                          ? "bg-white border border-black/10 text-[#343A40]"
                          : "bg-white/[0.04] border border-white/10 text-white/80"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
