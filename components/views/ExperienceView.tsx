"use client";

import React from "react";
import { Briefcase, ArrowUpRight, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { experiences } from "@/data/experience";

export default function ExperienceView() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-16 min-h-[calc(100vh-140px)] flex flex-col justify-center">
      {/* ── Section Header ── */}
      <div className="flex flex-col items-start mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444]" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase">
            05 / EXPERIENCE
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-3 uppercase">
          Professional Experience
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl font-normal">
          Building products. Solving problems. Creating impact.
        </p>
      </div>

      {/* ── Experience Timeline Cards ── */}
      <div className="flex flex-col gap-6">
        {/* 2024: Raftaar Theme Park */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05] backdrop-blur-xl transition-all duration-300 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            
            {/* Left Col: Year + Role & Company */}
            <div className="lg:w-1/3 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold text-white mb-3">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span>2024 —</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Full-Stack Developer, UI/UX
              </h3>

              <div className="flex items-center gap-2 mt-1 text-sm font-medium text-[#94A3B8]">
                <span>@ Raftaar-Theme-Park</span>
                {experiences[0]?.companyUrl && (
                  <a
                    href={`https://${experiences[0].companyUrl}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-0.5 text-xs text-[#EF4444] hover:underline"
                  >
                    <span>{experiences[0].companyUrl}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-[#64748B] font-mono mt-2">
                <MapPin className="w-3 h-3" />
                <span>Pune, Maharashtra</span>
              </div>
            </div>

            {/* Right Col: Responsibilities & Impact */}
            <div className="lg:w-2/3 flex flex-col justify-between">
              <ul className="space-y-2 mb-6 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                  <span>Developed responsive web applications with modern UI/UX, implementing high-performance frontend features and seamless state management.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                  <span>Built end-to-end features, optimized user flows, and handled application workflows and data operations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                  <span>Integrated RESTful APIs, third-party services, and deployed cloud environments via automated GitHub CI/CD pipelines.</span>
                </li>
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {["JavaScript", "TypeScript", "React", "Next.js", "Flutter", "Dart", "Figma", "shadcn"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs font-mono font-medium tracking-wide bg-white/[0.04] border border-white/10 text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 2025: BhoomiTrace Analytics */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05] backdrop-blur-xl transition-all duration-300 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            
            {/* Left Col: Year + Role & Company */}
            <div className="lg:w-1/3 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold text-white mb-3">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span>2025 — Present</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Full-Stack Developer
              </h3>

              <div className="flex items-center gap-2 mt-1 text-sm font-medium text-[#94A3B8]">
                <span>@ BhoomiTrace Analytics Private Limited</span>
                {experiences[1]?.companyUrl && (
                  <a
                    href={`https://${experiences[1].companyUrl}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-0.5 text-xs text-[#EF4444] hover:underline"
                  >
                    <span>{experiences[1].companyUrl}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-[#64748B] font-mono mt-2">
                <MapPin className="w-3 h-3" />
                <span>India</span>
              </div>
            </div>

            {/* Right Col: Responsibilities & Impact */}
            <div className="lg:w-2/3 flex flex-col justify-between">
              <ul className="space-y-2 mb-6 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                  <span>Built and enhanced BhoomiTrace&apos;s full-stack analytics platform with responsive UI, AI-powered property intelligence, and real-time feeds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                  <span>Designed, implemented, and scaled backend RESTful APIs for authentication (OAuth/JWT), property telemetry, reports, and payment workflows.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                  <span>Integrated AI/LLM workflows, RAG pipelines, and vector databases to generate intelligent property recommendations.</span>
                </li>
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {["React", "Node.js", "TypeScript", "Python", "REST APIs", "LLM", "RAG", "LangGraph", "Vector DBs"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs font-mono font-medium tracking-wide bg-white/[0.04] border border-white/10 text-white/80"
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
  );
}
