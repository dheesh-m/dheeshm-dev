"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import CentralDigitalStar from "./CentralDigitalStar";
import ClusterEcosystem, { OrbitTechItem } from "./ClusterEcosystem";
import {
  Brain,
  Database,
  Code2,
  Layout,
  GitBranch,
  Search,
  Volume2,
  Mic,
  Terminal,
  Server,
  Box,
  Container,
  Cloud,
  Globe,
  Radio,
  Zap,
  Wifi,
  Sparkles,
  Layers,
} from "lucide-react";

// ── 1. Technology Items per Cluster (Exact Structural Reference) ────────────

const AI_CLUSTER_TECHS: OrbitTechItem[] = [
  { id: "vector-retrieval", name: "VECTOR RETRIEVAL", icon: Database, x: "24%", y: "22%" },
  { id: "llm-orchestration", name: "LLM ORCHESTRATION", icon: Layers, x: "12%", y: "48%" },
  { id: "rag", name: "RAG", icon: Search, x: "14%", y: "76%" },
  { id: "tts", name: "TTS", icon: Volume2, x: "58%", y: "24%" },
  { id: "langgraph", name: "LANGGRAPH", icon: GitBranch, x: "82%", y: "24%" },
  { id: "embeddings-asr", name: "EMBEDDINGS & ASR", icon: Sparkles, x: "68%", y: "48%" },
  { id: "voice-ai", name: "VOICE AI", icon: Mic, x: "62%", y: "76%" },
  { id: "prompt-eng", name: "PROMPT ENGINEERING", icon: Terminal, x: "36%", y: "82%" },
];

const DATA_CLUSTER_TECHS: OrbitTechItem[] = [
  { id: "pinecone", name: "PINECONE", icon: Database, x: "50%", y: "20%" },
  { id: "postgresql", name: "POSTGRESQL", icon: Server, x: "22%", y: "48%" },
  { id: "docker", name: "DOCKER", icon: Container, x: "30%", y: "78%" },
  { id: "vector-dbs", name: "VECTOR DBS", icon: Box, x: "78%", y: "45%" },
  { id: "aws", name: "AWS", icon: Cloud, x: "68%", y: "74%" },
  { id: "gcp", name: "GCP", icon: Globe, x: "88%", y: "76%" },
];

const BACKEND_CLUSTER_TECHS: OrbitTechItem[] = [
  { id: "nodejs", name: "NODE.JS", icon: Server, x: "42%", y: "24%" },
  { id: "python", name: "PYTHON", icon: Terminal, x: "16%", y: "68%" },
  { id: "rest-apis", name: "REST APIS", icon: Radio, x: "70%", y: "52%" },
  { id: "fastapi", name: "FASTAPI", icon: Zap, x: "38%", y: "82%" },
  { id: "websockets", name: "WEBSOCKETS", icon: Wifi, x: "68%", y: "80%" },
];

const FRONTEND_CLUSTER_TECHS: OrbitTechItem[] = [
  { id: "react", name: "REACT", icon: Sparkles, x: "24%", y: "65%" },
  { id: "nextjs", name: "NEXT.JS", icon: Layers, x: "78%", y: "65%" },
  { id: "typescript", name: "TYPESCRIPT", icon: Code2, x: "50%", y: "24%" },
];

export default function TechnologyUniverse() {
  const { isLightMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const tiltX = x * 6;
    const tiltY = -y * 6;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (canvasRef.current) {
        canvasRef.current.style.transform = `rotateY(${tiltX.toFixed(2)}deg) rotateX(${tiltY.toFixed(2)}deg)`;
      }
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (canvasRef.current) {
      canvasRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
    setActiveCluster(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center select-none py-8"
    >
      {/* ── Background Faint Cosmic Aurora Ambient Clouds (Preserves Stars) ── */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        {/* Top-Left: Violet/Cyan Aurora Cloud */}
        <div
          className={cn(
            "absolute top-[15%] left-[10%] w-[420px] h-[320px] rounded-full blur-[130px] transition-opacity duration-1000 pointer-events-none",
            isLightMode ? "bg-[#8B5CF6]/15 opacity-60" : "bg-[#8B5CF6]/12 opacity-70"
          )}
        />
        {/* Top-Right: Magenta/Pink Aurora Cloud */}
        <div
          className={cn(
            "absolute top-[15%] right-[10%] w-[420px] h-[320px] rounded-full blur-[130px] transition-opacity duration-1000 pointer-events-none",
            isLightMode ? "bg-[#D946EF]/15 opacity-60" : "bg-[#D946EF]/10 opacity-70"
          )}
        />
        {/* Bottom-Left: Electric Blue/Cyan Aurora Cloud */}
        <div
          className={cn(
            "absolute bottom-[15%] left-[10%] w-[420px] h-[320px] rounded-full blur-[130px] transition-opacity duration-1000 pointer-events-none",
            isLightMode ? "bg-[#38BDF8]/15 opacity-60" : "bg-[#38BDF8]/10 opacity-70"
          )}
        />
        {/* Bottom-Right: Cyan/Violet Aurora Cloud */}
        <div
          className={cn(
            "absolute bottom-[15%] right-[10%] w-[420px] h-[320px] rounded-full blur-[130px] transition-opacity duration-1000 pointer-events-none",
            isLightMode ? "bg-[#22D3EE]/15 opacity-60" : "bg-[#22D3EE]/10 opacity-70"
          )}
        />
        {/* Central Core Ambient Halo */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] rounded-full blur-[110px] transition-opacity duration-1000 pointer-events-none",
            isLightMode ? "bg-[#8B5CF6]/15 opacity-50" : "bg-[#8B5CF6]/12 opacity-60"
          )}
        />
      </div>

      {/* ── 1. Section Header ── */}
      <div className="text-center flex flex-col items-center justify-center max-w-3xl mx-auto mb-6 md:mb-10 px-4">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase mb-4 backdrop-blur-xl border transition-colors shadow-sm",
            isLightMode
              ? "bg-white/90 text-slate-800 border-[#D6DAE3] shadow-sm"
              : "bg-[#0A0C19]/80 text-[#F4F6FA] border-white/[0.14] shadow-[0_0_14px_rgba(139,92,246,0.18),inset_0_1px_1px_rgba(255,255,255,0.2)]"
          )}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
          <span>Core Capabilities</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal tracking-[-0.035em] leading-[1.08] font-display mb-3",
            isLightMode ? "text-slate-900" : "text-[#F4F6FA]"
          )}
        >
          Technologies I Work With
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "text-sm sm:text-base font-sans max-w-xl leading-relaxed",
            isLightMode ? "text-slate-600" : "text-[#A8B0BF]"
          )}
        >
          A constellation of tools, frameworks and platforms that power the systems I build.
        </motion.p>
      </div>

      {/* ── 2. Master 3D Spatial Universe (Desktop: lg+) ── */}
      <div
        ref={canvasRef}
        className="hidden lg:block relative w-full max-w-[1240px] h-[780px] my-2 transition-transform duration-300 ease-out"
        style={{
          perspective: 1200,
          transform: "rotateY(0deg) rotateX(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── SVG 4-Lobe Gravitational Energy Flux Lines (Aurora Gradient Spectrum) ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 1240 780"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Top-Left AI Loop: White -> Violet -> Blue -> Cyan */}
            <linearGradient id="flux-grad-aurora-tl" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#8B5CF6" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.85" />
            </linearGradient>

            {/* Top-Right DATA Loop: White -> Purple -> Magenta -> Pink */}
            <linearGradient id="flux-grad-aurora-tr" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#A855F7" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#D946EF" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.85" />
            </linearGradient>

            {/* Bottom-Left BACKEND Loop: White -> Blue -> Cyan -> Violet */}
            <linearGradient id="flux-grad-aurora-bl" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#22D3EE" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.85" />
            </linearGradient>

            {/* Bottom-Right FRONTEND Loop: White -> Cyan -> Blue -> Purple */}
            <linearGradient id="flux-grad-aurora-br" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#22D3EE" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.85" />
            </linearGradient>

            {/* Crossover Figure-8 Gradients */}
            <linearGradient id="flux-cross-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#D946EF" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="flux-cross-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
            </linearGradient>

            <filter id="universe-flux-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Magnetic Flux Loops between Center (x: 620, y: 390) and 4 Clusters */}
          {/* Loop to Top-Left AI Cluster (Center x: 300, y: 200) */}
          <path
            d="M 620 390 C 520 390, 420 200, 300 200"
            stroke="url(#flux-grad-aurora-tl)"
            strokeWidth="1.2"
            opacity={isLightMode ? 0.6 : 0.48}
            strokeDasharray="4 4"
            filter="url(#universe-flux-glow)"
          />
          {/* Loop to Top-Right Data Cluster (Center x: 940, y: 200) */}
          <path
            d="M 620 390 C 720 390, 820 200, 940 200"
            stroke="url(#flux-grad-aurora-tr)"
            strokeWidth="1.2"
            opacity={isLightMode ? 0.6 : 0.48}
            strokeDasharray="4 4"
            filter="url(#universe-flux-glow)"
          />
          {/* Loop to Bottom-Left Backend Cluster (Center x: 300, y: 580) */}
          <path
            d="M 620 390 C 520 390, 420 580, 300 580"
            stroke="url(#flux-grad-aurora-bl)"
            strokeWidth="1.2"
            opacity={isLightMode ? 0.6 : 0.48}
            strokeDasharray="4 4"
            filter="url(#universe-flux-glow)"
          />
          {/* Loop to Bottom-Right Frontend Cluster (Center x: 940, y: 580) */}
          <path
            d="M 620 390 C 720 390, 820 580, 940 580"
            stroke="url(#flux-grad-aurora-br)"
            strokeWidth="1.2"
            opacity={isLightMode ? 0.6 : 0.48}
            strokeDasharray="4 4"
            filter="url(#universe-flux-glow)"
          />

          {/* 4 Outer Figure-8 Magnetic Field Lines connecting pairs (Subtle Aurora Tones) */}
          <path
            d="M 300 200 C 620 120, 620 660, 940 580"
            stroke="url(#flux-cross-1)"
            strokeWidth="0.85"
            opacity={isLightMode ? 0.35 : 0.22}
          />
          <path
            d="M 940 200 C 620 120, 620 660, 300 580"
            stroke="url(#flux-cross-2)"
            strokeWidth="0.85"
            opacity={isLightMode ? 0.35 : 0.22}
          />
        </svg>

        {/* ── 1. Top-Left: AI / ML Ecosystem (LLM: Indigo -> Violet -> Cyan) ── */}
        <div
          className="absolute top-[20px] left-[40px] z-20"
          onMouseEnter={() => setActiveCluster("ai")}
          onMouseLeave={() => setActiveCluster(null)}
        >
          <ClusterEcosystem
            id="ai"
            badge="AI / ML"
            centralTitle="LLM"
            centralSubtitle="LLM ORCHESTRATION"
            centralIcon={Brain}
            technologies={AI_CLUSTER_TECHS}
            isHoveredOverall={activeCluster === "ai"}
          />
        </div>

        {/* ── 2. Top-Right: DATA & CLOUD Ecosystem (DATA: Violet -> Magenta -> Pink) ── */}
        <div
          className="absolute top-[20px] right-[40px] z-20"
          onMouseEnter={() => setActiveCluster("data")}
          onMouseLeave={() => setActiveCluster(null)}
        >
          <ClusterEcosystem
            id="data"
            badge="DATA & CLOUD"
            centralTitle="DATA"
            centralSubtitle="PIPELINES & CLOUD"
            centralIcon={Database}
            technologies={DATA_CLUSTER_TECHS}
            isHoveredOverall={activeCluster === "data"}
          />
        </div>

        {/* ── 3. Central Digital Star (Primary Aurora Light Source - Center) ── */}
        <div
          className="absolute top-1/2 left-1/2 z-30"
          style={{ transform: "translate(-50%, -50%) translateZ(30px)" }}
        >
          <CentralDigitalStar isHovered={activeCluster !== null} />
        </div>

        {/* ── 4. Bottom-Left: BACKEND Ecosystem (API: Blue -> Cyan -> Violet) ── */}
        <div
          className="absolute bottom-[20px] left-[40px] z-20"
          onMouseEnter={() => setActiveCluster("backend")}
          onMouseLeave={() => setActiveCluster(null)}
        >
          <ClusterEcosystem
            id="backend"
            badge="BACKEND"
            centralTitle="API"
            centralSubtitle="HIGH-PERFORMANCE APIS"
            centralIcon={Code2}
            technologies={BACKEND_CLUSTER_TECHS}
            isHoveredOverall={activeCluster === "backend"}
          />
        </div>

        {/* ── 5. Bottom-Right: FRONTEND Ecosystem (TYPESTACK: Cyan -> Blue -> Violet) ── */}
        <div
          className="absolute bottom-[20px] right-[40px] z-20"
          onMouseEnter={() => setActiveCluster("frontend")}
          onMouseLeave={() => setActiveCluster(null)}
        >
          <ClusterEcosystem
            id="frontend"
            badge="FRONTEND"
            centralTitle="TYPESTACK"
            centralSubtitle="MODERN WEB EXPERIENCES"
            centralIcon={Layout}
            technologies={FRONTEND_CLUSTER_TECHS}
            isHoveredOverall={activeCluster === "frontend"}
          />
        </div>
      </div>

      {/* ── 3. Mobile / Tablet Stack View (< lg: 1024px) ── */}
      <div className="lg:hidden w-full px-4 flex flex-col items-center gap-6 my-4">
        {/* Central Star on Mobile */}
        <div className="my-2">
          <CentralDigitalStar />
        </div>

        {/* 1. AI/ML Cluster */}
        <MobileClusterCard
          id="ai"
          badge="AI / ML"
          centralTitle="LLM"
          centralSubtitle="LLM ORCHESTRATION"
          icon={Brain}
          technologies={AI_CLUSTER_TECHS}
          isLightMode={isLightMode}
        />

        {/* 2. DATA & CLOUD Cluster */}
        <MobileClusterCard
          id="data"
          badge="DATA & CLOUD"
          centralTitle="DATA"
          centralSubtitle="PIPELINES & CLOUD"
          icon={Database}
          technologies={DATA_CLUSTER_TECHS}
          isLightMode={isLightMode}
        />

        {/* 3. BACKEND Cluster */}
        <MobileClusterCard
          id="backend"
          badge="BACKEND"
          centralTitle="API"
          centralSubtitle="HIGH-PERFORMANCE APIS"
          icon={Code2}
          technologies={BACKEND_CLUSTER_TECHS}
          isLightMode={isLightMode}
        />

        {/* 4. FRONTEND Cluster */}
        <MobileClusterCard
          id="frontend"
          badge="FRONTEND"
          centralTitle="TYPESTACK"
          centralSubtitle="MODERN WEB EXPERIENCES"
          icon={Layout}
          technologies={FRONTEND_CLUSTER_TECHS}
          isLightMode={isLightMode}
        />
      </div>
    </div>
  );
}

// ── Mobile Cluster Component (Aurora Glass Aesthetic) ───────────────────────
function MobileClusterCard({
  id,
  badge,
  centralTitle,
  centralSubtitle,
  icon: CentralIcon,
  technologies,
  isLightMode,
}: {
  id: string;
  badge: string;
  centralTitle: string;
  centralSubtitle: string;
  icon: typeof Brain;
  technologies: OrbitTechItem[];
  isLightMode: boolean;
}) {
  const isData = id === "data";
  const isAi = id === "ai";
  const isBackend = id === "backend";

  const accentColor = isData ? "#D946EF" : isAi ? "#8B5CF6" : isBackend ? "#38BDF8" : "#22D3EE";
  const glowColor = isData ? "rgba(217,70,239,0.2)" : isAi ? "rgba(139,92,246,0.2)" : "rgba(34,211,238,0.2)";

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl p-4 sm:p-5 border transition-all flex flex-col items-center text-center shadow-lg relative overflow-hidden",
        isLightMode
          ? "bg-white/95 border-slate-300 shadow-md"
          : "bg-[#0A0C19]/90 border-white/[0.14]"
      )}
      style={{
        boxShadow: !isLightMode ? `0 4px 20px rgba(0,0,0,0.7), 0 0 16px ${glowColor}, inset 0 1px 2px rgba(255,255,255,0.25)` : undefined,
      }}
    >
      {/* Specular Top Rim */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* Category Badge */}
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9.5px] font-mono font-semibold tracking-wider uppercase mb-3 border",
          isLightMode
            ? "bg-slate-100 text-slate-800 border-slate-300"
            : "bg-[#0A0C19]/85 text-[#D6DAE3] border-white/[0.14]"
        )}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
        />
        <span>{badge}</span>
      </div>

      {/* Central Node Visual (Aurora Glass Disc) */}
      <div
        className={cn(
          "w-16 h-16 rounded-full flex flex-col items-center justify-center mb-3 border relative overflow-hidden",
          isLightMode
            ? "bg-gradient-to-b from-white to-slate-200 border-slate-300 text-slate-800"
            : "bg-[#0A0C19] border-white/[0.18] text-[#F4F6FA]"
        )}
        style={{
          boxShadow: !isLightMode ? `0 0 14px ${glowColor}, inset 0 1px 2px rgba(255,255,255,0.4)` : undefined,
        }}
      >
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 via-white/5 to-transparent pointer-events-none rounded-t-full" />
        <CentralIcon className="w-5 h-5 mb-0.5 relative z-10" style={{ color: accentColor }} />
        <span className="text-[9.5px] font-bold font-mono uppercase relative z-10 text-[#F4F6FA]">{centralTitle}</span>
      </div>

      {/* Tech Tags Wrap */}
      <div className="flex flex-wrap gap-1.5 justify-center mt-1">
        {technologies.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold border flex items-center gap-1.5 relative overflow-hidden",
                isLightMode
                  ? "bg-slate-100 border-slate-300 text-slate-800"
                  : "bg-[#0A0C19]/85 border-white/[0.12] text-[#F4F6FA] shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              )}
            >
              <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
              <Icon className="w-3 h-3 relative z-10" style={{ color: accentColor }} />
              <span className="relative z-10">{t.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
