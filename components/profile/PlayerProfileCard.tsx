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
  { step: "OBSERVE", desc: "Understand the problem", icon: Eye },
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
    // Max tilt 2.5 degrees for subtle premium 3D
    setRotate({
      x: -y * 2.5,
      y: x * 2.5,
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
      className="relative w-full max-w-6xl mx-auto rounded-[24px] sm:rounded-[32px] bg-[#07090d]/90 backdrop-blur-2xl border border-slate-400/35 hover:border-slate-200/60 p-5 sm:p-8 lg:p-10 text-white shadow-[0_0_60px_rgba(255,255,255,0.08),0_0_30px_rgba(203,213,225,0.06)] hover:shadow-[0_0_80px_rgba(255,255,255,0.15)] transition-shadow duration-500 select-none overflow-hidden"
    >
      {/* ── Silver / Metallic Ambient Glow Layers ── */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full bg-slate-300/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-white/8 blur-[100px]" />

      {/* ── Silver Corner Notches ── */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-300 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-300 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-300 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-300 rounded-br-lg pointer-events-none" />

      {/* ── Top Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-slate-400/20">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-slate-400/40 hover:border-slate-200 text-xs sm:text-[13px] font-mono text-slate-200 hover:text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-300 transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-white" />
          <span>Back to Home</span>
        </Link>

        <div className="text-right font-mono text-[11px] sm:text-xs text-slate-300 tracking-wide">
          &ldquo;With great code, comes great responsibility.&rdquo;
          <span className="block text-[10px] text-slate-400 mt-0.5">— Spidey Logic</span>
        </div>
      </div>

      {/* ── Main Two-Column Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-6 sm:pt-8 items-start">
        
        {/* ════════ LEFT COLUMN: PLAYER CARD & MASCOT ════════ */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          
          {/* Player Identity Panel (Silver / Obsidian) */}
          <div className="relative rounded-2xl bg-[#0d0f14]/85 border border-slate-400/30 hover:border-slate-300/50 p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)] overflow-hidden transition-colors">
            {/* Corner Tag Header */}
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-300 mb-5 border-b border-slate-400/15 pb-2 uppercase">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200 shadow-[0_0_8px_#ffffff]" />
                PLAYER CARD
              </span>
              <span className="text-[9px] text-slate-500 font-mono tracking-normal">||| | ||||| | ||</span>
            </div>

            {/* Avatar & Name Area */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 text-center sm:text-left lg:text-center mb-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0">
                <DeadpoolMascot isAvatar />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 drop-shadow-sm">
                  DHEESH <span className="text-slate-300">MEDEKAR</span>
                </h2>
                <div className="flex flex-col gap-0.5 mt-2 font-mono text-[10.5px] tracking-wider text-slate-300 font-medium uppercase">
                  <span>AI / ML Engineer</span>
                  <span>Backend Developer</span>
                  <span>Full Stack Developer</span>
                </div>
              </div>
            </div>

            {/* Info Breakdown List */}
            <div className="flex flex-col gap-3.5 text-xs border-t border-slate-400/15 pt-4">
              <div>
                <div className="text-[9.5px] font-mono tracking-widest text-slate-400 uppercase mb-1">
                  CURRENT MISSION
                </div>
                <p className="text-slate-300 leading-relaxed text-[11.5px] font-light">
                  Building intelligent systems that solve real-world problems.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <div className="text-[9.5px] font-mono tracking-widest text-slate-400 uppercase mb-0.5">
                    LOCATION
                  </div>
                  <div className="flex items-center gap-1 text-[11.5px] text-slate-300 font-mono">
                    <Globe className="w-3 h-3 text-slate-300 shrink-0" />
                    <span>Earth</span>
                  </div>
                </div>

                <div>
                  <div className="text-[9.5px] font-mono tracking-widest text-slate-400 uppercase mb-0.5">
                    STATUS
                  </div>
                  <div className="flex items-center gap-1.5 text-[11.5px] text-slate-200 font-mono">
                    <span className="w-2 h-2 rounded-full bg-slate-200 shadow-[0_0_8px_#ffffff] animate-ping" />
                    <span className="text-slate-200 font-medium">Building</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Speech Bubble & Floating Mascot */}
          <div className="flex flex-col gap-3">
            <SpeechBubble />
            <div className="w-full flex justify-center pt-2">
              <div className="w-48 sm:w-56">
                <DeadpoolMascot />
              </div>
            </div>
          </div>

        </div>

        {/* ════════ RIGHT COLUMN: STATS, SKILLS, ANALYTICS, APPROACH ════════ */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          
          {/* 1. PLAYER STATS (Top Row 4-Columns: Silver / Metallic Platinum) */}
          <div className="rounded-2xl bg-[#0d0f14]/85 backdrop-blur-xl border border-slate-400/30 hover:border-slate-300/50 p-4 sm:p-5 shadow-[0_4px_30px_rgba(0,0,0,0.6),0_0_24px_rgba(255,255,255,0.06)] transition-all duration-300">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-300 mb-3.5 uppercase">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200 shadow-[0_0_8px_#ffffff]" />
                PLAYER STATS
              </span>
              <span className="text-[9px] text-slate-500 font-mono">SYS-LVL // 04</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex flex-col items-center sm:items-start p-3.5 rounded-xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-slate-400/25 text-center sm:text-left hover:border-slate-200/60 hover:bg-white/[0.1] shadow-sm hover:shadow-[0_0_16px_rgba(255,255,255,0.14)] transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors mb-2" />
                    <div className="text-xl sm:text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-300 tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]">
                      {s.value}
                    </div>
                    <div className="text-[9px] font-mono text-slate-300 tracking-wider uppercase mt-1 leading-tight group-hover:text-white transition-colors">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. SKILLS & WEAPONS (Silver Cyberpunk Chips) */}
          <div className="rounded-2xl bg-[#0d0f14]/85 backdrop-blur-xl border border-slate-400/30 hover:border-slate-300/50 p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <div className="text-[10px] font-mono tracking-widest text-slate-300 mb-3.5 uppercase">
              SKILLS &amp; WEAPONS
            </div>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <div
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-slate-400/25 hover:border-slate-200/80 hover:bg-white/[0.14] text-xs font-mono text-slate-200 hover:text-white shadow-sm hover:shadow-[0_0_14px_rgba(255,255,255,0.18)] transition-all duration-200 cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* 3. 3-CARD ROW: ANALYTICS + HOBBIES + LANGUAGES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card A: Analytics */}
            <div className="rounded-2xl bg-[#0d0f14]/85 backdrop-blur-xl border border-slate-400/30 hover:border-slate-300/50 p-4 flex flex-col items-center shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
              <div className="w-full text-left text-[10px] font-mono tracking-widest text-slate-300 mb-2 uppercase">
                ANALYTICS
              </div>
              <div className="w-full flex items-center justify-center my-auto py-2">
                <RadarChart />
              </div>
            </div>

            {/* Card B: Hobbies */}
            <div className="rounded-2xl bg-[#0d0f14]/85 backdrop-blur-xl border border-slate-400/30 hover:border-slate-300/50 p-4 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
              <div className="text-[10px] font-mono tracking-widest text-slate-300 mb-3 uppercase">
                HOBBIES
              </div>
              <div className="flex flex-col gap-2.5">
                {HOBBIES.map((h) => {
                  const Icon = h.icon;
                  return (
                    <div key={h.title} className="flex items-start gap-2.5 group">
                      <div className="w-6 h-6 rounded-md bg-white/[0.07] border border-slate-400/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-slate-200 transition-colors">
                        <Icon className="w-3.5 h-3.5 text-slate-300 group-hover:text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white tracking-wide">
                          {h.title}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-snug">
                          {h.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card C: Languages */}
            <div className="rounded-2xl bg-[#0d0f14]/85 backdrop-blur-xl border border-slate-400/30 hover:border-slate-300/50 p-4 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
              <div className="text-[10px] font-mono tracking-widest text-slate-300 mb-3 uppercase">
                LANGUAGES
              </div>
              <div className="flex flex-col gap-2.5">
                {LANGUAGES.map((l) => (
                  <div key={l.name} className="flex flex-col gap-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-300">{l.name}</span>
                      <span className="text-slate-200 font-semibold">{l.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden border border-slate-700/50">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-slate-400 via-slate-200 to-white shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                        style={{ width: `${l.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 4. BOTTOM ROW: MY APPROACH + HOW I WORK */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Left: My Approach */}
            <div className="md:col-span-7 rounded-2xl bg-[#0d0f14]/85 backdrop-blur-xl border border-slate-400/30 hover:border-slate-300/50 p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
              <div className="text-[10px] font-mono tracking-widest text-slate-300 mb-3.5 uppercase">
                MY APPROACH
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {APPROACH_STEPS.map((st) => {
                  const Icon = st.icon;
                  return (
                    <div
                      key={st.step}
                      className="flex flex-col items-center p-2.5 rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-slate-400/25 hover:border-slate-200/50 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-slate-400/40 flex items-center justify-center mb-2 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:border-slate-200 transition-colors">
                        <Icon className="w-3.5 h-3.5 text-slate-300 group-hover:text-white" />
                      </div>
                      <div className="text-[11px] font-bold font-mono text-white tracking-wider">
                        {st.step}
                      </div>
                      <div className="text-[9.5px] text-slate-400 font-light mt-0.5 leading-tight">
                        {st.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: How I Work */}
            <div className="md:col-span-5 rounded-2xl bg-[#0d0f14]/85 backdrop-blur-xl border border-slate-400/30 hover:border-slate-300/50 p-4 sm:p-5 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-300 mb-2 uppercase">
                  <span>HOW I WORK</span>
                  <Radio className="w-3 h-3 text-slate-300 animate-pulse" />
                </div>
                <p className="text-xs sm:text-[12.5px] font-light text-slate-300 leading-relaxed">
                  I bring the creativity of Deadpool, the responsibility of Spidey, and the engineering mindset of Tony Stark. I don&apos;t just write code — I build solutions that matter. Smart, scalable, and a little bit badass.
                </p>
              </div>
              <div className="flex items-center justify-end pt-3">
                <div className="w-6 h-6 rounded-full border border-slate-400/40 bg-white/[0.08] flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.18)]">
                  <span className="text-[10px]">⚔️</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
