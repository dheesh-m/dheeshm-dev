"use client";

import React from "react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { Eye, Brain, Code2, Rocket, Target, Compass, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

// Bold SuperYou-inspired fully dark-red treatments with striking high-contrast white font
const STEP_DARK_TONES = [
  {
    // 01 OBSERVE: Rich Dark Crimson Red
    bg: "rgba(130, 10, 22, 0.92)",
    border: "rgba(255, 255, 255, 0.20)",
    shadow: "0 24px 60px rgba(0, 0, 0, 0.55), 0 0 35px rgba(130, 10, 22, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.22)",
  },
  {
    // 02 THINK: Deep Blood Red
    bg: "rgba(112, 8, 18, 0.93)",
    border: "rgba(255, 255, 255, 0.18)",
    shadow: "0 24px 60px rgba(0, 0, 0, 0.55), 0 0 25px rgba(112, 8, 18, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.20)",
  },
  {
    // 03 BUILD: Dark Burgundy Red
    bg: "rgba(96, 7, 16, 0.94)",
    border: "rgba(255, 255, 255, 0.16)",
    shadow: "0 24px 60px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
  },
  {
    // 04 SHIP: Deepest Oxblood Maroon
    bg: "rgba(80, 5, 14, 0.95)",
    border: "rgba(255, 255, 255, 0.14)",
    shadow: "0 24px 60px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
  }
];

const PROCESS_STEPS = [
  {
    step: "01",
    name: "OBSERVE",
    subtitle: "Understand Deeply",
    desc: "Analyze user behavior and system constraints to uncover the real problem worth solving.",
    icon: Eye,
    tags: ["Research", "User Insights", "Data", "Empathy"],
  },
  {
    step: "02",
    name: "THINK",
    subtitle: "Architect & Deconstruct",
    desc: "Deconstruct complex problems into resilient, scalable first-principles architectures.",
    icon: Brain,
    tags: ["First Principles", "System Design", "Failure Modes", "API Contracts"],
  },
  {
    step: "03",
    name: "BUILD",
    subtitle: "Engineered for Resilience",
    desc: "Engineer clean, modular systems with strict type safety and craftsmanship.",
    icon: Code2,
    tags: ["Type Safety", "Defensive Coding", "Fast Iteration", "Performance"],
  },
  {
    step: "04",
    name: "SHIP",
    subtitle: "Measure & Iterate",
    desc: "Deploy production-grade systems with automated pipelines and rapid telemetry feedback.",
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-16 min-h-screen flex flex-col">
      {/* ── Section Header ── */}
      <div className="flex flex-col items-center text-center mx-auto mb-10 sm:mb-14">
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
            "text-4xl sm:text-6xl font-bold tracking-tight mb-3 transition-colors font-primary",
            isLightMode ? "text-[#111111]" : "text-white"
          )}
          style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700 }}
        >
          How I Think
        </h2>
        <p 
          className={cn(
            "text-sm sm:text-base max-w-2xl font-normal transition-colors font-body",
            isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
          )}
          style={{ fontFamily: "var(--font-josefin), sans-serif", lineHeight: 1.6 }}
        >
          &ldquo;I don&apos;t just write code. <strong className={isLightMode ? "text-[#E50909] font-semibold" : "text-[#E50909] font-semibold"}>I build systems that solve problems.</strong>&rdquo;
        </p>
      </div>

      {/* ── Centered Process ScrollStack ── */}
      <div className="w-full max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8">
        <ScrollStack
          itemDistance={65}
          itemScale={0.025}
          itemStackDistance={30}
          stackPosition="12%"
          scaleEndPosition="8%"
          baseScale={0.93}
          rotationAmount={0}
          blurAmount={0}
          useWindowScroll={true}
          className="w-full"
        >
          {PROCESS_STEPS.map((step, idx) => {
            const tone = STEP_DARK_TONES[idx];
            const Icon = step.icon;
            return (
              <ScrollStackItem
                key={step.step}
                itemClassName={cn(
                  "group relative w-full min-h-[290px] sm:min-h-[320px] flex flex-col justify-between p-6 sm:p-8 md:p-9 rounded-[24px] sm:rounded-[28px] border transition-colors duration-300 select-none backdrop-blur-[20px]",
                  isLightMode
                    ? "bg-white/95 border-black/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]"
                    : ""
                )}
                style={{
                  backgroundColor: isLightMode ? undefined : tone.bg,
                  borderColor: isLightMode ? undefined : tone.border,
                  boxShadow: isLightMode ? undefined : tone.shadow,
                }}
              >
                {/* Top Header: Icon + Step Badge + Title */}
                <div className="flex items-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
                  <div className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors",
                    isLightMode
                      ? "bg-red-500/[0.06] border-red-500/20 text-[#E50909]"
                      : "bg-white/15 border-white/25 text-white shadow-inner"
                  )}>
                    <Icon className={cn("w-4 h-4 sm:w-5 sm:h-5", isLightMode ? "text-[#E50909]" : "text-white")} />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "text-lg sm:text-xl md:text-2xl font-bold uppercase italic tracking-tight font-primary",
                        isLightMode ? "text-[#111111]" : "text-white"
                      )}
                      style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700 }}
                    >
                      {step.name} <span className="opacity-80 font-bold text-sm sm:text-base md:text-lg not-italic tracking-normal">— {step.subtitle}</span>
                    </h3>
                  </div>
                </div>

                {/* Body: Full Description Paragraph in High-Contrast White Font */}
                <p 
                  className={cn(
                    "text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 font-normal font-body",
                    isLightMode ? "text-[#475467]" : "text-white/95"
                  )}
                  style={{ fontFamily: "var(--font-josefin), sans-serif", lineHeight: 1.6 }}
                >
                  {step.desc}
                </p>

                {/* Footer: Category Tag Pills with White Font and Translucent Borders */}
                <div className={cn(
                  "flex flex-wrap gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t transition-colors",
                  isLightMode ? "border-black/[0.07]" : "border-white/20"
                )}>
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-primary font-bold uppercase italic tracking-wider border transition-colors",
                        isLightMode
                          ? "bg-black/[0.03] border-black/[0.08] text-[#343A40]"
                          : "bg-white/15 border-white/25 text-white shadow-sm"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>

      {/* ── 3 Core Pillars (Lower Philosophy Cards) ── */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative z-10">
        {CORE_PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className={cn(
                "p-5 sm:p-6 rounded-[18px] border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "hover:-translate-y-0.5",
                isLightMode
                  ? "bg-white/75 border-black/[0.07] hover:bg-white/90 hover:border-black/15 shadow-[0_8px_24px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-[14px]"
                  : "bg-[#0F1118]/52 border-white/10 hover:border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[16px]"
              )}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-6 h-6 rounded-md flex items-center justify-center bg-red-500/[0.08] text-[#E50909] border border-red-500/20">
                  <Icon className="w-3.5 h-3.5 text-[#E50909]" />
                </div>
                <h4 className={cn(
                  "font-primary text-xs font-bold tracking-wider",
                  isLightMode ? "text-[#111111]" : "text-white"
                )}>
                  {pillar.label}
                </h4>
              </div>
              <p 
                className={cn(
                  "text-xs sm:text-sm leading-relaxed font-body",
                  isLightMode ? "text-[#667085]" : "text-[#94A3B8]"
                )}
                style={{ fontFamily: "var(--font-josefin), sans-serif", lineHeight: 1.6 }}
              >
                {pillar.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
