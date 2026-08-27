"use client";

import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { Technology } from "@/data/technologies";
import SystemsUniverseCanvas from "./SystemsUniverseCanvas";
import TechnologyInfoCard from "../glossary/TechnologyInfoCard";
import {
  Brain,
  Cloud,
  Code2,
  Layers,
  Move,
  ZoomIn,
  Compass,
  MousePointerClick,
  Box,
  Sparkles,
  Activity,
  Zap,
} from "lucide-react";

export default function SystemCluster() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  const [activeNode, setActiveNode] = useState<Technology | null>(null);
  const [activeHub, setActiveHub] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  const handleNodeHover = (tech: Technology | null, rect: DOMRect | null) => {
    setActiveNode(tech);
    if (rect) {
      setHoverPosition({ x: rect.left, y: rect.top });
    } else {
      setHoverPosition(null);
    }
  };

  const handleNodeClick = (tech: Technology) => {
    setActiveNode(tech);
  };

  const handleHubHover = (hubId: string | null) => {
    setActiveHub(hubId);
  };

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center justify-center mt-2 mb-12 select-none">
      
      {/* ── Top Controls Bar (Matching Reference) ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl px-4 sm:px-6 flex justify-end mb-3"
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 p-1.5 sm:px-4 sm:py-2 rounded-full bg-white/80 dark:bg-[#0e0e18]/80 backdrop-blur-xl border border-purple-500/20 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-[10.5px] sm:text-xs font-mono text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
            <Move className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Drag to rotate</span>
          </div>
          <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
            <ZoomIn className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Scroll to zoom</span>
          </div>
          <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
            <Compass className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Hover to explore</span>
          </div>
          <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 font-semibold">
            <MousePointerClick className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Click to focus</span>
          </div>
        </div>
      </motion.div>

      {/* ── Master 3D Systems Universe Canvas Viewport ─────────────────────── */}
      <div className="relative w-full max-w-[1360px] mx-auto">
        <SystemsUniverseCanvas
          activeNode={activeNode}
          activeHub={activeHub}
          onNodeHover={handleNodeHover}
          onNodeClick={handleNodeClick}
          onHubHover={handleHubHover}
          isAnimating={isInView}
        />

        {/* ── 4 Floating System Cards (Matching Reference Layout) ───────────── */}
        {/* 1. Top-Left: AI & LLM INFRA */}
        <div 
          className="absolute top-2 left-2 sm:top-6 sm:left-6 max-w-[220px] sm:max-w-[260px] cursor-pointer group pointer-events-auto"
          onMouseEnter={() => handleHubHover("ai")}
          onMouseLeave={() => handleHubHover(null)}
        >
          <div className="p-3 sm:p-4 rounded-2xl bg-white/85 dark:bg-[#0c0c16]/85 backdrop-blur-xl border border-purple-500/25 dark:border-purple-500/20 group-hover:border-purple-500/50 shadow-[0_8px_32px_rgba(168,85,247,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] group-hover:scale-[1.03] transition-all duration-300">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold font-mono text-gray-900 dark:text-white tracking-tight">
                AI & LLM INFRA
              </h4>
            </div>
            <p className="text-[10.5px] sm:text-[11.5px] text-gray-600 dark:text-gray-400 leading-snug font-sans">
              Building intelligent systems with advanced AI models and orchestration.
            </p>
          </div>
        </div>

        {/* 2. Top-Right: DATA & CLOUD */}
        <div 
          className="absolute top-2 right-2 sm:top-6 sm:right-6 max-w-[220px] sm:max-w-[260px] cursor-pointer group pointer-events-auto"
          onMouseEnter={() => handleHubHover("data")}
          onMouseLeave={() => handleHubHover(null)}
        >
          <div className="p-3 sm:p-4 rounded-2xl bg-white/85 dark:bg-[#0c0c16]/85 backdrop-blur-xl border border-blue-500/25 dark:border-blue-500/20 group-hover:border-blue-500/50 shadow-[0_8px_32px_rgba(59,130,246,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] group-hover:scale-[1.03] transition-all duration-300">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cloud className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold font-mono text-gray-900 dark:text-white tracking-tight">
                DATA & CLOUD
              </h4>
            </div>
            <p className="text-[10.5px] sm:text-[11.5px] text-gray-600 dark:text-gray-400 leading-snug font-sans">
              Scalable data pipelines, storage, and cloud-native infrastructure.
            </p>
          </div>
        </div>

        {/* 3. Bottom-Left: BACKEND & APIS */}
        <div 
          className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 max-w-[220px] sm:max-w-[260px] cursor-pointer group pointer-events-auto"
          onMouseEnter={() => handleHubHover("backend")}
          onMouseLeave={() => handleHubHover(null)}
        >
          <div className="p-3 sm:p-4 rounded-2xl bg-white/85 dark:bg-[#0c0c16]/85 backdrop-blur-xl border border-cyan-500/25 dark:border-cyan-500/20 group-hover:border-cyan-500/50 shadow-[0_8px_32px_rgba(6,182,212,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] group-hover:scale-[1.03] transition-all duration-300">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold font-mono text-gray-900 dark:text-white tracking-tight">
                BACKEND & APIS
              </h4>
            </div>
            <p className="text-[10.5px] sm:text-[11.5px] text-gray-600 dark:text-gray-400 leading-snug font-sans">
              Robust backend systems and APIs that power everything.
            </p>
          </div>
        </div>

        {/* 4. Bottom-Right: FULL-STACK */}
        <div 
          className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6 max-w-[220px] sm:max-w-[260px] cursor-pointer group pointer-events-auto"
          onMouseEnter={() => handleHubHover("fullstack")}
          onMouseLeave={() => handleHubHover(null)}
        >
          <div className="p-3 sm:p-4 rounded-2xl bg-white/85 dark:bg-[#0c0c16]/85 backdrop-blur-xl border border-indigo-500/25 dark:border-indigo-500/20 group-hover:border-indigo-500/50 shadow-[0_8px_32px_rgba(129,140,248,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] group-hover:scale-[1.03] transition-all duration-300">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold font-mono text-gray-900 dark:text-white tracking-tight">
                FULL-STACK
              </h4>
            </div>
            <p className="text-[10.5px] sm:text-[11.5px] text-gray-600 dark:text-gray-400 leading-snug font-sans">
              Modern frontend and full-stack experiences that scale.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom Features Pill (Matching Reference) ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 flex items-center justify-center"
      >
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 py-2.5 rounded-full bg-white/80 dark:bg-[#0e0e18]/80 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-xs font-sans text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Box className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="font-medium">Interactive 3D</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="font-medium">Real-time Glow</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium">Smooth Motion</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="font-medium">Performance Optimized</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Info Tooltip for Hovered / Active Node */}
      <TechnologyInfoCard technology={activeNode} position={hoverPosition} />
    </div>
  );
}
