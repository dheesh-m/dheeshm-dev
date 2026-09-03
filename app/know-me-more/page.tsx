"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  Bike,
  Dumbbell,
  Film,
  Sparkles,
  Zap,
  Brain,
  Code2,
  Target,
  Eye,
  Workflow,
  Compass,
  Flame,
  Activity,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";
import MoltenMetal from "@/components/MoltenMetal";
import CyberCard from "@/components/CyberCard";

// ── Data Definitions ──

const ROLES = [
  {
    title: "AI / ML Engineer",
    desc: "LLMs, RAG Pipelines & Intelligent Agents",
    icon: Brain,
  },
  {
    title: "Backend Developer",
    desc: "Distributed Systems, APIs & High-Concurrency Services",
    icon: Terminal,
  },
  {
    title: "Full Stack Developer",
    desc: "Modern Reactive Web Applications & Cloud Architecture",
    icon: Layers,
  },
];

const ANALYTICS_METRICS = [
  { label: "PROBLEM SOLVING", value: 96 },
  { label: "SYSTEM DESIGN", value: 94 },
  { label: "AI / ML ARCHITECTURE", value: 92 },
  { label: "CREATIVITY", value: 90 },
  { label: "LEADERSHIP", value: 88 },
];

const LANGUAGES = [
  { name: "Python", level: "Advanced", pct: 95 },
  { name: "TypeScript", level: "Advanced", pct: 92 },
  { name: "JavaScript", level: "Advanced", pct: 90 },
  { name: "SQL", level: "Proficient", pct: 86 },
  { name: "C++", level: "Proficient", pct: 78 },
  { name: "Go", level: "Intermediate", pct: 74 },
];

const HOBBIES = [
  {
    title: "Robotics",
    detail: "Autonomous Systems & Hardware",
    icon: Bot,
    tag: "HARDWARE",
  },
  {
    title: "Motorcycling",
    detail: "Speed, Precision & Focus",
    icon: Bike,
    tag: "ADRENALINE",
  },
  {
    title: "Fitness",
    detail: "Discipline & High Endurance",
    icon: Dumbbell,
    tag: "DISCIPLINE",
  },
  {
    title: "Sci-Fi & Comics",
    detail: "Futuristic Lore & Sci-Fi Realism",
    icon: Film,
    tag: "INSPIRATION",
  },
];

const THINKING_STEPS = [
  {
    step: "01",
    name: "OBSERVE",
    sub: "Understand the problem",
    desc: "Map constraints, trace edge cases & isolate root variables.",
    icon: Eye,
  },
  {
    step: "02",
    name: "THINK",
    sub: "Break it down",
    desc: "Deconstruct into modular first-principles components.",
    icon: Brain,
  },
  {
    step: "03",
    name: "BUILD",
    sub: "Create & iterate",
    desc: "Ship resilient code with tight feedback loops.",
    icon: Code2,
  },
  {
    step: "04",
    name: "IMPACT",
    sub: "Solve & scale",
    desc: "Deliver measurable real-world performance.",
    icon: Target,
  },
];

const TRAITS = [
  {
    label: "CREATIVITY",
    icon: Sparkles,
    desc: "Thinking beyond conventional patterns to find novel engineering breakthroughs.",
  },
  {
    label: "OWNERSHIP",
    icon: CheckCircle2,
    desc: "End-to-end accountability from inception to production deployment.",
  },
  {
    label: "CURIOSITY",
    icon: Compass,
    desc: "Relentless hunger to explore cutting-edge AI research and frameworks.",
  },
];

const OFF_THE_CLOCK_PILLARS = [
  {
    label: "MOTORCYCLING",
    quote: "Pure focus on the open road.",
    icon: Bike,
  },
  {
    label: "ROBOTICS",
    quote: "Tinkering with actuators & sensors.",
    icon: Bot,
  },
  {
    label: "FITNESS",
    quote: "Building physical and mental resilience.",
    icon: Dumbbell,
  },
  {
    label: "SCI-FI",
    quote: "Exploring speculative tech & fiction.",
    icon: Film,
  },
];

export default function KnowMeMorePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#030206] text-white select-none">
      {/* ── Official React Bits MoltenMetal Full-Page WebGL Background ── */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto">
        <MoltenMetal
          color1="#8B5CF6"
          color2="#22D3EE"
          color3="#D946EF"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode="molten"
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseStrength={0.3}
          opacity={1}
        />
      </div>

      {/* ── Scrollable Content Area with Cyber Cards ── */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start pt-6 sm:pt-10 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-10">
        
        {/* ── Top Header Navigation ── */}
        <header className="w-full max-w-6xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-white/10 pb-5">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/40 hover:bg-white/[0.1] border border-[#22D3EE]/30 hover:border-[#22D3EE]/60 text-xs font-mono text-white/90 shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#22D3EE] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>

            <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-cyan-200/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE] animate-pulse" />
              <span>STATUS: ONLINE</span>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
            <h1 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              KNOW ME MORE
            </h1>
            <p className="text-xs font-mono tracking-widest text-cyan-200/80 mt-0.5">
              &ldquo;Beyond the code.&rdquo;
            </p>
          </div>
        </header>

        {/* ── Asymmetrical Cyber Cards Responsive Grid (Unified Aurora Gradient System) ── */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">

          {/* ════════ 1. ROLE (Primary / Larger Card) ════════ */}
          <div className="lg:col-span-7 flex">
            <CyberCard
              title="ROLE"
              subtitle="BUILDING INTELLIGENT SYSTEMS"
              badge="PRIMARY // 01"
              size="wide"
              footer={
                <div className="flex items-center justify-between w-full text-[10px] font-mono text-white/60">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Activity className="w-3 h-3 text-[#22D3EE] animate-pulse" />
                    STATUS: ACTIVE
                  </span>
                  <span>CORE INTEL // 2026</span>
                </div>
              }
            >
              <div className="flex flex-col gap-2.5 py-1">
                {ROLES.map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <div
                      key={r.title}
                      className="group/item flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#22D3EE]/40 hover:bg-[#22D3EE]/[0.06] transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/25 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:border-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                        <Icon className="w-4 h-4 text-[#22D3EE] group-hover/item:text-white transition-colors" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono tracking-wide text-white group-hover/item:text-cyan-200">
                            {r.title}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/30">
                            0{i + 1}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/70 font-light mt-0.5 leading-snug">
                          {r.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CyberCard>
          </div>

          {/* ════════ 2. ANALYTICS (Medium Card) ════════ */}
          <div className="lg:col-span-5 flex">
            <CyberCard
              title="ANALYTICS"
              subtitle="CORE CAPABILITIES"
              badge="METRICS // 02"
              size="wide"
              footer={
                <div className="flex items-center justify-between w-full text-[10px] font-mono text-white/60">
                  <span className="text-cyan-300">BENCHMARK: PEAK</span>
                  <span>CONFIDENCE: 99.4%</span>
                </div>
              }
            >
              <div className="flex flex-col gap-3 py-1">
                {ANALYTICS_METRICS.map((m) => (
                  <div key={m.label} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[10.5px] font-mono">
                      <span className="text-white/85 tracking-wider">{m.label}</span>
                      <span className="text-cyan-300 font-bold">{m.value}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden p-[0.5px]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] via-[#8B5CF6] to-[#D946EF] shadow-[0_0_8px_rgba(34,211,238,0.7)] transition-all duration-500"
                        style={{ width: `${m.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CyberCard>
          </div>

          {/* ════════ 3. LANGUAGES (Medium Card) ════════ */}
          <div className="lg:col-span-6 flex">
            <CyberCard
              title="LANGUAGES"
              subtitle="SYNTAX & RUNTIMES"
              badge="STACK // 03"
              size="wide"
              footer={
                <div className="flex items-center justify-between w-full text-[10px] font-mono text-white/60">
                  <span className="text-cyan-300">RUNTIME: POLYGLOT</span>
                  <span>COMPILED &amp; SCRIPTED</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-2.5 py-1">
                {LANGUAGES.map((l) => (
                  <div
                    key={l.name}
                    className="flex flex-col p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#22D3EE]/40 hover:bg-[#22D3EE]/[0.06] transition-all duration-200"
                  >
                    <div className="flex justify-between items-center text-[11px] font-mono mb-1.5">
                      <span className="text-white font-bold">{l.name}</span>
                      <span className="text-[9.5px] text-cyan-300">{l.pct}%</span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] via-[#38BDF8] to-[#8B5CF6] shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                        style={{ width: `${l.pct}%` }}
                      />
                    </div>
                    <span className="text-[8.5px] font-mono text-white/50 mt-1 uppercase">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </CyberCard>
          </div>

          {/* ════════ 4. HOBBIES (Medium Card) ════════ */}
          <div className="lg:col-span-6 flex">
            <CyberCard
              title="HOBBIES"
              subtitle="OFFLINE PROTOCOLS"
              badge="EXP // 04"
              size="wide"
              footer={
                <div className="flex items-center justify-between w-full text-[10px] font-mono text-white/60">
                  <span className="text-cyan-300">STATE: ENERGIZED</span>
                  <span>PASSION DRIVEN</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-2.5 py-1">
                {HOBBIES.map((h) => {
                  const Icon = h.icon;
                  return (
                    <div
                      key={h.title}
                      className="group/hobby flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#22D3EE]/40 hover:bg-[#22D3EE]/[0.06] transition-all duration-200"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/25 flex items-center justify-center shrink-0 mt-0.5 group-hover/hobby:border-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.25)]">
                        <Icon className="w-3.5 h-3.5 text-[#22D3EE] group-hover/hobby:text-white transition-colors" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-[11px] font-bold font-mono text-white truncate group-hover/hobby:text-cyan-200">
                          {h.title}
                        </div>
                        <div className="text-[9px] text-white/60 leading-tight truncate mt-0.5">
                          {h.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CyberCard>
          </div>

          {/* ════════ 5. HOW I THINK (Medium Card) ════════ */}
          <div className="lg:col-span-6 flex">
            <CyberCard
              title="HOW I THINK"
              subtitle="COGNITIVE LOOP"
              badge="LOGIC // 05"
              size="wide"
              footer={
                <div className="flex items-center justify-between w-full text-[10px] font-mono text-white/60">
                  <span className="text-cyan-300 flex items-center gap-1">
                    <Workflow className="w-3 h-3 text-[#22D3EE]" />
                    FIRST PRINCIPLES
                  </span>
                  <span>CONTINUOUS LOOP</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-2.5 py-1">
                {THINKING_STEPS.map((st) => {
                  const Icon = st.icon;
                  return (
                    <div
                      key={st.name}
                      className="group/step flex flex-col p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#22D3EE]/40 hover:bg-[#22D3EE]/[0.06] transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="w-6 h-6 rounded-md bg-[#22D3EE]/10 border border-[#22D3EE]/25 flex items-center justify-center shadow-[0_0_6px_rgba(34,211,238,0.2)]">
                          <Icon className="w-3 h-3 text-[#22D3EE] group-hover/step:text-white" />
                        </div>
                        <span className="text-[9px] font-mono text-[#22D3EE]">
                          {st.step}
                        </span>
                      </div>
                      <div className="text-[11px] font-bold font-mono text-white tracking-wider">
                        {st.name}
                      </div>
                      <div className="text-[9.5px] text-cyan-200/90 font-medium leading-tight mt-0.5">
                        {st.sub}
                      </div>
                      <div className="text-[8.5px] text-white/50 leading-tight mt-1">
                        {st.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CyberCard>
          </div>

          {/* ════════ 6. OFF THE CLOCK (The Human Side) ════════ */}
          <div className="lg:col-span-6 flex">
            <CyberCard
              title="OFF THE CLOCK"
              subtitle="THE HUMAN SIDE"
              badge="PERSONAL // 06"
              size="wide"
              footer={
                <div className="flex items-center justify-between w-full text-[10px] font-mono text-white/60">
                  <span className="text-cyan-300">AUTHENTIC // REAL</span>
                  <span>UNPLUGGED ENERGY</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-2.5 py-1">
                {OFF_THE_CLOCK_PILLARS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.label}
                      className="group/clock flex flex-col p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#22D3EE]/40 hover:bg-[#22D3EE]/[0.06] transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded-md bg-[#22D3EE]/10 border border-[#22D3EE]/25 flex items-center justify-center shadow-[0_0_6px_rgba(34,211,238,0.2)]">
                          <Icon className="w-3 h-3 text-[#22D3EE] group-hover/clock:text-white" />
                        </div>
                        <span className="text-[10px] font-bold font-mono text-white tracking-wider">
                          {p.label}
                        </span>
                      </div>
                      <p className="text-[9.5px] text-white/70 font-light leading-snug">
                        {p.quote}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CyberCard>
          </div>

          {/* ════════ 7. MY APPROACH (Larger Horizontal / Wide Card) ════════ */}
          <div className="lg:col-span-12 flex">
            <CyberCard
              title="MY APPROACH"
              subtitle="PHILOSOPHY & EXECUTION"
              badge="CREED // 07"
              size="wide"
              footer={
                <div className="flex flex-wrap items-center justify-between gap-2 w-full text-[10.5px] font-mono text-white/60">
                  <span className="text-cyan-300 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#22D3EE]" />
                    &ldquo;With great code, comes great responsibility.&rdquo;
                  </span>
                  <span>BUILD • BREAK • IMPROVE</span>
                </div>
              }
            >
              <div className="flex flex-col gap-4 py-1">
                {/* Statement Quote */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#22D3EE]/15 via-[#8B5CF6]/10 to-transparent border border-[#22D3EE]/30">
                  <p className="text-sm sm:text-base font-mono font-medium tracking-wide text-white leading-relaxed">
                    &ldquo;I don&apos;t just write code. <span className="text-cyan-300 font-bold underline decoration-[#22D3EE]/50 underline-offset-4">I build solutions that matter.</span>&rdquo;
                  </p>
                </div>

                {/* 3 Traits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {TRAITS.map((t) => {
                    const Icon = t.icon;
                    return (
                      <div
                        key={t.label}
                        className="group/trait flex flex-col p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#22D3EE]/40 hover:bg-[#22D3EE]/[0.06] transition-all duration-200"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-6 h-6 rounded-md bg-[#22D3EE]/15 border border-[#22D3EE]/30 flex items-center justify-center shadow-[0_0_8px_rgba(34,211,238,0.25)]">
                            <Icon className="w-3 h-3 text-[#22D3EE] group-hover/trait:text-white" />
                          </div>
                          <span className="text-xs font-bold font-mono tracking-wider text-white group-hover/trait:text-cyan-200">
                            {t.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/70 font-light leading-relaxed">
                          {t.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CyberCard>
          </div>

        </div>

        {/* ── Bottom Spacing ── */}
        <div className="w-full max-w-6xl mt-8 sm:mt-12 text-center">
          <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
            DESIGNED WITH FUTURISTIC CYBER CARD SYSTEMS // 2026
          </p>
        </div>

      </div>
    </main>
  );
}
