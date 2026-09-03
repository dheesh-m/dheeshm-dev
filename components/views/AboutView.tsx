"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Brain, Code2, Rocket, ArrowRight, Target, Compass, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const PROCESS_STEPS = [
  {
    step: "01",
    name: "OBSERVE",
    subtitle: "Understand Deeply",
    desc: "I observe problems from multiple angles, analyze user behavior, system patterns and constraints to uncover the real challenge worth solving.",
    icon: Eye,
    tags: ["Research", "User Insights", "Data", "Empathy"],
  },
  {
    step: "02",
    name: "THINK",
    subtitle: "Architect & Deconstruct",
    desc: "Deconstruct the complex problem into modular first-principles components. I design resilient data flows, state machines, and fail-safe LLM/backend pipelines that scale under high concurrency.",
    icon: Brain,
    tags: ["First Principles", "System Design", "Failure Modes", "API Contracts"],
  },
  {
    step: "03",
    name: "BUILD",
    subtitle: "Engineered for Resilience",
    desc: "Execute with precision and craftsmanship. I implement end-to-end features with strict type safety, defensive error handling, structured telemetry, and clean modular code.",
    icon: Code2,
    tags: ["Type Safety", "Defensive Coding", "Fast Iteration", "Performance"],
  },
  {
    step: "04",
    name: "SHIP",
    subtitle: "Measure & Iterate",
    desc: "Deploy to production with automated CI/CD pipelines, monitor real-world inference latencies and telemetry, and continuously optimize user experience with rapid feedback loops.",
    icon: Rocket,
    tags: ["CI/CD Pipelines", "Telemetry", "Production SLAs", "Continuous Impact"],
  },
];

const CORE_PILLARS = [
  {
    icon: Target,
    label: "SYSTEMS OVER CODE",
    desc: "Code is a liability; architecture is the asset. I build maintainable, decoupled systems designed for long-term evolution.",
  },
  {
    icon: Compass,
    label: "FIRST PRINCIPLES",
    desc: "Breaking difficult problems down to their fundamental truths rather than copying standard boilerplate.",
  },
  {
    icon: CheckCircle2,
    label: "END-TO-END OWNERSHIP",
    desc: "From initial napkin architecture to high-availability production deployment and post-launch monitoring.",
  },
];

export default function AboutView() {
  const { isLightMode } = useTheme();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];
  const StepIcon = activeStep.icon;

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
            02 / ENGINEERING PHILOSOPHY
          </span>
        </div>

        <h2 
          className={cn(
            "text-4xl sm:text-6xl font-normal tracking-tight mb-3 transition-colors",
            isLightMode ? "text-[#111111]" : "text-white"
          )}
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          How I Think
        </h2>
        <p className={cn(
          "text-sm sm:text-base max-w-2xl font-normal transition-colors",
          isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
        )}>
          &ldquo;I don&apos;t just write code. <strong className={isLightMode ? "text-[#E50909] font-semibold" : "text-[#950606] font-semibold"}>I build systems that solve problems.</strong>&rdquo;
        </p>
      </div>

      {/* ── 2-Column Process Stage (Left: Step list, Right: Step details card) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start mb-12">
        
        {/* Left: Step List Buttons */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={cn(
                  "group relative w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer",
                  isLightMode
                    ? isActive
                      ? "bg-white border-red-500/30 shadow-[0_4px_20px_rgba(229,9,9,0.08)]"
                      : "bg-white/80 border-black/[0.08] hover:bg-white hover:border-black/20"
                    : isActive
                      ? "bg-white/[0.12] border-white/30 shadow-[0_0_30px_rgba(149,6,6,0.25)] backdrop-blur-md"
                      : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "w-1.5 h-7 rounded-full transition-all duration-300",
                      isActive 
                        ? isLightMode ? "bg-[#E50909] shadow-[0_0_10px_#E50909]" : "bg-[#950606] shadow-[0_0_10px_#950606]" 
                        : "bg-transparent"
                    )}
                  />
                  <div className="flex items-baseline gap-3">
                    <span
                      className={cn(
                        "font-mono text-xs font-bold transition-colors",
                        isActive 
                          ? isLightMode ? "text-[#E50909]" : "text-[#950606]" 
                          : isLightMode ? "text-[#98A2B3]" : "text-[#94A3B8]"
                      )}
                    >
                      {step.step}
                    </span>
                    <span
                      className={cn(
                        "text-xl sm:text-2xl font-bold tracking-wide transition-colors",
                        isActive 
                          ? isLightMode ? "text-[#E50909]" : "text-[#950606]" 
                          : isLightMode ? "text-[#98A2B3] group-hover:text-[#111111]" : "text-white/70 group-hover:text-white"
                      )}
                    >
                      {step.name}
                    </span>
                  </div>
                </div>

                <ArrowRight
                  className={cn(
                    "w-4 h-4 transition-all duration-300",
                    isActive
                      ? isLightMode ? "text-[#E50909] translate-x-0 opacity-100" : "text-[#950606] translate-x-0 opacity-100"
                      : "text-zinc-400 -translate-x-1 opacity-0 group-hover:opacity-80"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Right: Active Explanation Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "p-6 sm:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden",
                isLightMode
                  ? "bg-white border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
                  : "bg-white/[0.04] border-white/15 backdrop-blur-xl shadow-2xl"
              )}
            >
              {/* Header Icon + Step Badge */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  isLightMode ? "bg-red-500/[0.08] text-[#E50909]" : "bg-white/[0.08] text-[#950606]"
                )}>
                  <StepIcon className={cn("w-5 h-5", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                </div>
                <div>
                  <span className={cn(
                    "font-mono text-[10.5px] font-bold tracking-widest uppercase block",
                    isLightMode ? "text-[#E50909]" : "text-[#950606]"
                  )}>
                    STEP {activeStep.step} / 04
                  </span>
                  <h3 className={cn(
                    "text-xl sm:text-2xl font-bold tracking-tight",
                    isLightMode ? "text-[#111111]" : "text-white"
                  )}>
                    {activeStep.name} — {activeStep.subtitle}
                  </h3>
                </div>
              </div>

              {/* Description Paragraph */}
              <p className={cn(
                "text-sm sm:text-base leading-relaxed mb-6 font-normal",
                isLightMode ? "text-[#475467]" : "text-[#D1D5DB]"
              )}>
                {activeStep.desc}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/[0.06] dark:border-white/10">
                {activeStep.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-colors",
                      isLightMode
                        ? "bg-white border border-black/10 text-[#343A40]"
                        : "bg-white/[0.04] border border-white/10 text-white/80"
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ── 3 Core Pillars ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {CORE_PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className={cn(
                "p-5 sm:p-6 rounded-2xl border transition-all duration-300",
                isLightMode
                  ? "bg-white border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-black/20"
                  : "bg-white/[0.04] border-white/10 backdrop-blur-md hover:border-white/20"
              )}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <Icon className={cn("w-4 h-4", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
                <h4 className={cn(
                  "font-mono text-xs font-bold tracking-wider",
                  isLightMode ? "text-[#111111]" : "text-white"
                )}>
                  {pillar.label}
                </h4>
              </div>
              <p className={cn(
                "text-xs sm:text-sm leading-relaxed",
                isLightMode ? "text-[#667085]" : "text-[#94A3B8]"
              )}>
                {pillar.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
