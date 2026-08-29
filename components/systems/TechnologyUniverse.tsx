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
  Rocket,
  ShieldCheck,
  Lock,
} from "lucide-react";

// ── 1. Technology Items per Cluster ──────────────────────────────────────────

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
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setActiveCluster(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center select-none py-8"
    >
      {/* ── Background Deep Atmosphere & Stars ── */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        {/* Subtle Violet & Crimson Nebula Glow */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[140px] transition-opacity duration-1000",
            isLightMode
              ? "bg-gradient-to-tr from-purple-100/40 via-rose-100/30 to-indigo-100/40 opacity-70"
              : "bg-gradient-to-tr from-purple-950/20 via-rose-950/20 to-violet-950/20 opacity-80"
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
              ? "bg-white/80 text-slate-700 border-slate-200"
              : "bg-[#120B24]/80 text-violet-300 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_#a855f7]" />
          <span>MY TECH UNIVERSE</span>
        </motion.div>

        {/* Display Title - Pure White & Consistent Typography across all words */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal tracking-[-0.035em] leading-[1.08] font-display mb-3",
            isLightMode ? "text-slate-900" : "text-white"
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
            isLightMode ? "text-slate-600" : "text-slate-400"
          )}
        >
          A constellation of tools, frameworks and platforms that power the systems I build.
        </motion.p>
      </div>

      {/* ── 2. Master 3D Spatial Universe (Desktop: lg+) ── */}
      <div
        className="hidden lg:block relative w-full max-w-[1240px] h-[780px] my-2 transition-transform duration-300 ease-out"
        style={{
          perspective: 1200,
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── SVG 4-Lobe Gravitational Energy Flux Lines ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 1240 780"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="flux-grad-topleft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="flux-grad-topright" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="flux-grad-botleft" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="flux-grad-botright" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.85" />
            </linearGradient>
            <filter id="universe-flux-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
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
            stroke="url(#flux-grad-topleft)"
            strokeWidth="1.2"
            opacity={isLightMode ? 0.45 : 0.35}
            strokeDasharray="4 4"
            filter="url(#universe-flux-glow)"
          />
          {/* Loop to Top-Right Data Cluster (Center x: 940, y: 200) [RED] */}
          <path
            d="M 620 390 C 720 390, 820 200, 940 200"
            stroke="url(#flux-grad-topright)"
            strokeWidth="1.2"
            opacity={isLightMode ? 0.45 : 0.35}
            strokeDasharray="4 4"
            filter="url(#universe-flux-glow)"
          />
          {/* Loop to Bottom-Left Backend Cluster (Center x: 300, y: 580) */}
          <path
            d="M 620 390 C 520 390, 420 580, 300 580"
            stroke="url(#flux-grad-botleft)"
            strokeWidth="1.2"
            opacity={isLightMode ? 0.45 : 0.35}
            strokeDasharray="4 4"
            filter="url(#universe-flux-glow)"
          />
          {/* Loop to Bottom-Right Frontend Cluster (Center x: 940, y: 580) [RED] */}
          <path
            d="M 620 390 C 720 390, 820 580, 940 580"
            stroke="url(#flux-grad-botright)"
            strokeWidth="1.2"
            opacity={isLightMode ? 0.45 : 0.35}
            strokeDasharray="4 4"
            filter="url(#universe-flux-glow)"
          />

          {/* 4 Outer Figure-8 Magnetic Field Lines connecting pairs */}
          <path
            d="M 300 200 C 620 120, 620 660, 940 580"
            stroke="rgba(168,85,247,0.18)"
            strokeWidth="0.8"
          />
          <path
            d="M 940 200 C 620 120, 620 660, 300 580"
            stroke="rgba(244,63,94,0.22)"
            strokeWidth="0.8"
          />
        </svg>

        {/* ── 1. Top-Left: AI / ML Ecosystem ── */}
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
            theme="purple"
            technologies={AI_CLUSTER_TECHS}
            isHoveredOverall={activeCluster === "ai"}
          />
        </div>

        {/* ── 2. Top-Right: DATA & CLOUD Ecosystem (RED) ── */}
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
            theme="red"
            technologies={DATA_CLUSTER_TECHS}
            isHoveredOverall={activeCluster === "data"}
          />
        </div>

        {/* ── 3. Central Digital Star (Miniature Digital Reactor - Perfectly Centered) ── */}
        <div
          className="absolute top-1/2 left-1/2 z-30"
          style={{ transform: "translate(-50%, -50%) translateZ(30px)" }}
        >
          <CentralDigitalStar isHovered={activeCluster !== null} />
        </div>

        {/* ── 4. Bottom-Left: BACKEND Ecosystem ── */}
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
            theme="indigo"
            technologies={BACKEND_CLUSTER_TECHS}
            isHoveredOverall={activeCluster === "backend"}
          />
        </div>

        {/* ── 5. Bottom-Right: FRONTEND Ecosystem (RED) ── */}
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
            theme="red"
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
          badge="AI / ML"
          centralTitle="LLM"
          centralSubtitle="LLM ORCHESTRATION"
          icon={Brain}
          theme="purple"
          technologies={AI_CLUSTER_TECHS}
          isLightMode={isLightMode}
        />

        {/* 2. DATA & CLOUD Cluster (RED) */}
        <MobileClusterCard
          badge="DATA & CLOUD"
          centralTitle="DATA"
          centralSubtitle="PIPELINES & CLOUD"
          icon={Database}
          theme="red"
          technologies={DATA_CLUSTER_TECHS}
          isLightMode={isLightMode}
        />

        {/* 3. BACKEND Cluster */}
        <MobileClusterCard
          badge="BACKEND"
          centralTitle="API"
          centralSubtitle="HIGH-PERFORMANCE APIS"
          icon={Code2}
          theme="indigo"
          technologies={BACKEND_CLUSTER_TECHS}
          isLightMode={isLightMode}
        />

        {/* 4. FRONTEND Cluster (RED) */}
        <MobileClusterCard
          badge="FRONTEND"
          centralTitle="TYPESTACK"
          centralSubtitle="MODERN WEB EXPERIENCES"
          icon={Layout}
          theme="red"
          technologies={FRONTEND_CLUSTER_TECHS}
          isLightMode={isLightMode}
        />
      </div>
    </div>
  );
}

// ── Mobile Cluster Component ─────────────────────────────────────────────────
function MobileClusterCard({
  badge,
  centralTitle,
  centralSubtitle,
  icon: CentralIcon,
  theme,
  technologies,
  isLightMode,
}: {
  badge: string;
  centralTitle: string;
  centralSubtitle: string;
  icon: typeof Brain;
  theme: "purple" | "blue" | "indigo" | "cyan" | "red";
  technologies: OrbitTechItem[];
  isLightMode: boolean;
}) {
  const isPurple = theme === "purple" || theme === "indigo";
  const isRed = theme === "red";

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl p-4 sm:p-5 border transition-all flex flex-col items-center text-center shadow-lg relative overflow-hidden",
        isLightMode
          ? isRed
            ? "bg-white/95 border-rose-300"
            : "bg-white/95 border-slate-300"
          : isRed
          ? "bg-gradient-to-b from-[#200912]/95 to-[#0b0508]/95 border-rose-500/30"
          : "bg-gradient-to-b from-[#141622]/95 to-[#0b0d16]/95 border-white/[0.12]"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* Badge */}
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9.5px] font-mono font-semibold tracking-wider uppercase mb-3 border",
          isLightMode
            ? isRed
              ? "bg-rose-50 text-rose-700 border-rose-200"
              : isPurple
              ? "bg-purple-50 text-purple-700 border-purple-200"
              : "bg-blue-50 text-blue-700 border-blue-200"
            : isRed
            ? "bg-[#220B14]/85 text-rose-300 border-rose-500/35"
            : isPurple
            ? "bg-[#18112C]/80 text-violet-300 border-violet-500/30"
            : "bg-[#0E1B2C]/80 text-cyan-300 border-cyan-500/30"
        )}
      >
        <span className={cn("w-1 h-1 rounded-full", isRed ? "bg-rose-400" : isPurple ? "bg-violet-400" : "bg-cyan-400")} />
        <span>{badge}</span>
      </div>

      {/* Central Node Visual */}
      <div
        className={cn(
          "w-16 h-16 rounded-full flex flex-col items-center justify-center mb-3 border shadow-md",
          isLightMode
            ? isRed
              ? "bg-rose-50 border-rose-300 text-rose-800"
              : "bg-slate-100 border-slate-300 text-slate-800"
            : isRed
            ? "bg-[#280E18] border-rose-400/40 text-rose-300 shadow-[0_0_18px_rgba(244,63,94,0.35)]"
            : isPurple
            ? "bg-[#1C1236] border-violet-400/40 text-violet-300 shadow-[0_0_18px_rgba(168,85,247,0.35)]"
            : "bg-[#0F223B] border-cyan-400/40 text-cyan-300 shadow-[0_0_18px_rgba(56,189,248,0.35)]"
        )}
      >
        <CentralIcon className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-bold font-mono uppercase">{centralTitle}</span>
      </div>

      {/* Tech Tags Wrap */}
      <div className="flex flex-wrap gap-1.5 justify-center mt-1">
        {technologies.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold border flex items-center gap-1.5",
                isLightMode
                  ? "bg-slate-100/90 border-slate-300 text-slate-800"
                  : isRed
                  ? "bg-rose-950/20 border-rose-500/20 text-rose-100"
                  : "bg-white/[0.06] border-white/[0.12] text-slate-200"
              )}
            >
              <Icon className="w-3 h-3 text-slate-400" />
              <span>{t.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
