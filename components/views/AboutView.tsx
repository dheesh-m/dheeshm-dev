"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Brain, Code2, Rocket, ArrowRight, Sparkles, Target, Compass, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PROCESS_STEPS = [
  {
    step: "01",
    name: "OBSERVE",
    subtitle: "Understand Deeply",
    desc: "I observe problems from multiple angles, analyze user behavior, system patterns, and computational bottlenecks to uncover the real challenge worth solving before writing a single line of code.",
    icon: Eye,
    tags: ["System Thinking", "Constraint Mapping", "Root Variables", "User Patterns"],
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
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];
  const StepIcon = activeStep.icon;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-16 min-h-[calc(100vh-140px)] flex flex-col justify-center">
      {/* ── Section Header ── */}
      <div className="flex flex-col items-start mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444]" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase">
            02 / ENGINEERING PHILOSOPHY
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-3 uppercase">
          How I Think
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl font-normal">
          &ldquo;I don&apos;t just write code. <strong className="text-white font-medium">I build systems that solve problems.</strong>&rdquo;
        </p>
      </div>

      {/* ── 2-Column Process Stage (Left: Step list, Right: Step details card) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start mb-12">
        
        {/* Left: Step Buttons */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={cn(
                  "group relative w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer",
                  isActive
                    ? "bg-white/[0.12] border-white/30 shadow-[0_0_30px_rgba(239,68,68,0.2)] backdrop-blur-md"
                    : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Red indicator bar for active item */}
                  <span
                    className={cn(
                      "w-1 h-7 rounded-full transition-all duration-300",
                      isActive ? "bg-[#EF4444] shadow-[0_0_10px_#EF4444]" : "bg-transparent"
                    )}
                  />
                  <div className="flex items-baseline gap-3">
                    <span
                      className={cn(
                        "font-mono text-xs font-bold transition-colors",
                        isActive ? "text-[#EF4444]" : "text-[#94A3B8] group-hover:text-white"
                      )}
                    >
                      {step.step}
                    </span>
                    <span
                      className={cn(
                        "text-xl sm:text-2xl font-black tracking-wider transition-colors",
                        isActive ? "text-white" : "text-white/70 group-hover:text-white"
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
                      ? "text-white translate-x-0 opacity-100"
                      : "text-white/40 -translate-x-1 opacity-0 group-hover:opacity-80"
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
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-2xl relative overflow-hidden"
            >
              {/* Top Accent Rim */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EF4444]/60 to-transparent" />

              {/* Step Header */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                    <StepIcon className="w-5 h-5 text-[#EF4444]" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#EF4444] uppercase">
                      STEP {activeStep.step} / 04
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                      {activeStep.name} — {activeStep.subtitle}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8] font-normal mb-8">
                {activeStep.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {activeStep.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-medium tracking-wide bg-white/[0.04] border border-white/10 text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ── 3 Core Mindset Pillars (Compact Grid) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
        {CORE_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.label}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <Icon className="w-4 h-4 text-[#EF4444]" />
                <h4 className="font-mono text-xs font-bold text-white tracking-wider">
                  {pillar.label}
                </h4>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
