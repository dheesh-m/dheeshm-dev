"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Crosshair,
  Zap,
  Brain,
  BarChart3,
  Globe,
  Radio,
  Eye,
  Sparkles,
  Code2,
  Target,
  Bot,
  Bike,
  Dumbbell,
  Film,
} from "lucide-react";
import DeadpoolMascot from "./DeadpoolMascot";
import RadarChart from "./RadarChart";
import SpeechBubble from "./SpeechBubble";

const STATS = [
  { value: "10+", label: "PROJECTS COMPLETED", icon: Crosshair },
  { value: "2+", label: "YEARS OF EXPERIENCE", icon: Zap },
  { value: "15+", label: "TECHNOLOGIES MASTERED", icon: Brain },
  { value: "100%", label: "PASSION FOR SOLVING PROBLEMS", icon: BarChart3 },
];

const SKILLS = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Docker",
  "FastAPI",
  "LangChain",
  "OpenAI",
  "RAG",
  "Vector DB",
  "Git",
  "Tailwind CSS",
];

const HOBBIES = [
  { title: "Robotics", desc: "Building autonomous systems", icon: Bot },
  { title: "Motorcycling", desc: "Speed. Focus. Freedom.", icon: Bike },
  { title: "Fitness", desc: "Discipline builds everything.", icon: Dumbbell },
  { title: "Sci-Fi & Comics", desc: "Comic logic. Real world impact.", icon: Film },
];

const LANGUAGES = [
  { name: "Python", pct: 95 },
  { name: "TypeScript", pct: 92 },
  { name: "JavaScript", pct: 90 },
  { name: "SQL", pct: 85 },
  { name: "C++", pct: 78 },
  { name: "Go", pct: 72 },
];

const APPROACH_STEPS = [
  { step: "OBSERVE", desc: "Understand problem", icon: Eye },
  { step: "THINK", desc: "Break it down", icon: Sparkles },
  { step: "BUILD", desc: "Create & iterate", icon: Code2 },
  { step: "IMPACT", desc: "Solve & scale", icon: Target },
];

export default function PlayerProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Max tilt 2 degrees
    setRotate({
      x: -y * 2.0,
      y: x * 2.0,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.3s ease-out",
      }}
      className="relative w-full max-w-[880px] mx-auto rounded-xl bg-black/35 backdrop-blur-2xl border border-white/20 hover:border-white/35 p-4 sm:p-5 lg:p-6 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.06)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.12)] transition-all duration-300 select-none overflow-hidden"
    >
      {/* ── Subtle Glass Ambient Shimmer ── */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-60 h-60 rounded-full bg-white/[0.04] blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-white/[0.04] blur-[80px]" />

      {/* ── Cyber Rectangular Corner Accents ── */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/70 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/70 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/70 pointer-events-none" />

      {/* ── Top Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 sm:pb-4 border-b border-white/10">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.12] border border-white/20 hover:border-white/40 text-[11px] font-mono text-white/90 shadow-sm transition-all duration-200"
        >
          <ArrowLeft className="w-3 h-3 text-white/70 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-white" />
          <span>Back to Home</span>
        </Link>

        <div className="text-right font-mono text-[10px] sm:text-[11px] text-white/80 tracking-wide">
          &ldquo;With great code, comes great responsibility.&rdquo;
          <span className="block text-[9px] text-white/50 mt-0.5">— Spidey Logic</span>
        </div>
      </div>

      {/* ── Main Two-Column Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 pt-3.5 sm:pt-4 items-start">
        
        {/* ════════ LEFT COLUMN: PLAYER CARD & MASCOT ════════ */}
        <div className="lg:col-span-4 flex flex-col gap-3.5 w-full">
          
          {/* Player Identity Panel (Transparent Glassmorphism) */}
          <div className="relative rounded-lg bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 p-3.5 sm:p-4 shadow-sm transition-colors">
            {/* Corner Tag Header */}
            <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-slate-300 mb-3.5 border-b border-white/10 pb-1.5 uppercase">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                PLAYER CARD
              </span>
              <span className="text-[8px] text-white/40 font-mono tracking-normal">||| | |||||</span>
            </div>

            {/* Avatar & Name Area */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 text-center sm:text-left lg:text-center mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                <DeadpoolMascot isAvatar />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-display tracking-tight text-white drop-shadow-sm">
                  DHEESH <span className="text-slate-300">MEDEKAR</span>
                </h2>
                <div className="flex flex-col gap-0.5 mt-1 font-mono text-[9.5px] tracking-wider text-white/75 font-medium uppercase">
                  <span>AI / ML Engineer</span>
                  <span>Backend Developer</span>
                  <span>Full Stack Developer</span>
                </div>
              </div>
            </div>

            {/* Info Breakdown List */}
            <div className="flex flex-col gap-2.5 text-[11px] border-t border-white/10 pt-3">
              <div>
                <div className="text-[8.5px] font-mono tracking-widest text-white/60 uppercase mb-0.5">
                  CURRENT MISSION
                </div>
                <p className="text-white/80 leading-snug text-[10.5px] font-light">
                  Building intelligent systems that solve real-world problems.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <div>
                  <div className="text-[8.5px] font-mono tracking-widest text-white/60 uppercase mb-0.5">
                    LOCATION
                  </div>
                  <div className="flex items-center gap-1 text-[10.5px] text-white/80 font-mono">
                    <Globe className="w-2.5 h-2.5 text-slate-300 shrink-0" />
                    <span>Earth</span>
                  </div>
                </div>

                <div>
                  <div className="text-[8.5px] font-mono tracking-widest text-white/60 uppercase mb-0.5">
                    STATUS
                  </div>
                  <div className="flex items-center gap-1 text-[10.5px] text-white font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff] animate-ping" />
                    <span className="text-white/90 font-medium">Building</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Speech Bubble & Floating Mascot */}
          <div className="flex flex-col gap-2">
            <SpeechBubble />
            <div className="w-full flex justify-center pt-1">
              <div className="w-36 sm:w-40">
                <DeadpoolMascot />
              </div>
            </div>
          </div>

        </div>

        {/* ════════ RIGHT COLUMN: STATS, SKILLS, ANALYTICS, APPROACH ════════ */}
        <div className="lg:col-span-8 flex flex-col gap-3.5 w-full">
          
          {/* 1. PLAYER STATS (Transparent Glass Grid) */}
          <div className="rounded-lg bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 p-3 sm:p-3.5 shadow-sm transition-all duration-300">
            <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-slate-300 mb-2.5 uppercase">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                PLAYER STATS
              </span>
              <span className="text-[8px] text-white/40 font-mono">SYS-LVL // 04</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              {STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex flex-col items-center sm:items-start p-2.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-center sm:text-left hover:border-white/25 hover:bg-white/[0.07] transition-all duration-200 group"
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-colors mb-1.5" />
                    <div className="text-base sm:text-lg font-bold font-mono text-white tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-[8px] font-mono text-white/70 tracking-wider uppercase mt-0.5 leading-tight group-hover:text-white transition-colors">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. SKILLS & WEAPONS */}
          <div className="rounded-lg bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 p-3 sm:p-3.5 shadow-sm">
            <div className="text-[9px] font-mono tracking-widest text-slate-300 mb-2.5 uppercase">
              SKILLS &amp; WEAPONS
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SKILLS.map((skill) => (
                <div
                  key={skill}
                  className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.08] text-[10px] font-mono text-white/90 shadow-sm transition-all duration-200 cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* 3. 3-CARD ROW: ANALYTICS + HOBBIES + LANGUAGES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            
            {/* Card A: Analytics */}
            <div className="rounded-lg bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 p-2.5 flex flex-col items-center shadow-sm">
              <div className="w-full text-left text-[9px] font-mono tracking-widest text-slate-300 mb-1 uppercase">
                ANALYTICS
              </div>
              <div className="w-full flex items-center justify-center my-auto py-1">
                <RadarChart size={170} />
              </div>
            </div>

            {/* Card B: Hobbies */}
            <div className="rounded-lg bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 p-2.5 flex flex-col justify-between shadow-sm">
              <div className="text-[9px] font-mono tracking-widest text-slate-300 mb-2 uppercase">
                HOBBIES
              </div>
              <div className="flex flex-col gap-2">
                {HOBBIES.map((h) => {
                  const Icon = h.icon;
                  return (
                    <div key={h.title} className="flex items-start gap-2 group">
                      <div className="w-5 h-5 rounded bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-white/30 transition-colors">
                        <Icon className="w-2.5 h-2.5 text-slate-300 group-hover:text-white" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-white tracking-wide">
                          {h.title}
                        </div>
                        <div className="text-[9px] text-white/60 leading-snug">
                          {h.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card C: Languages */}
            <div className="rounded-lg bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 p-2.5 flex flex-col justify-between shadow-sm">
              <div className="text-[9px] font-mono tracking-widest text-slate-300 mb-2 uppercase">
                LANGUAGES
              </div>
              <div className="flex flex-col gap-2">
                {LANGUAGES.map((l) => (
                  <div key={l.name} className="flex flex-col gap-0.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-white/80">{l.name}</span>
                      <span className="text-white font-semibold">{l.pct}%</span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-slate-400 via-slate-200 to-white shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                        style={{ width: `${l.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 4. BOTTOM ROW: MY APPROACH + HOW I WORK */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            
            {/* Left: My Approach */}
            <div className="md:col-span-7 rounded-lg bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 p-3 shadow-sm">
              <div className="text-[9px] font-mono tracking-widest text-slate-300 mb-2.5 uppercase">
                MY APPROACH
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center">
                {APPROACH_STEPS.map((st) => {
                  const Icon = st.icon;
                  return (
                    <div
                      key={st.step}
                      className="flex flex-col items-center p-2 rounded-md bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-colors group"
                    >
                      <div className="w-5 h-5 rounded bg-white/[0.06] border border-white/15 flex items-center justify-center mb-1 shadow-sm group-hover:border-white/30 transition-colors">
                        <Icon className="w-2.5 h-2.5 text-slate-300 group-hover:text-white" />
                      </div>
                      <div className="text-[10px] font-bold font-mono text-white tracking-wider">
                        {st.step}
                      </div>
                      <div className="text-[8.5px] text-white/60 font-light mt-0.5 leading-tight">
                        {st.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: How I Work */}
            <div className="md:col-span-5 rounded-lg bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 p-3 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-slate-300 mb-1.5 uppercase">
                  <span>HOW I WORK</span>
                  <Radio className="w-2.5 h-2.5 text-slate-300 animate-pulse" />
                </div>
                <p className="text-[11px] font-light text-white/80 leading-relaxed">
                  I bring the creativity of Deadpool, the responsibility of Spidey, and the engineering mindset of Tony Stark. I build solutions that matter. Smart, scalable, and a little bit badass.
                </p>
              </div>
              <div className="flex items-center justify-end pt-2">
                <div className="w-5 h-5 rounded-full border border-white/20 bg-white/[0.06] flex items-center justify-center shadow-sm">
                  <span className="text-[9px]">⚔️</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
