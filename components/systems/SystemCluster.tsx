"use client";

import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { Technology } from "@/data/technologies";
import SystemsUniverseCanvas from "./SystemsUniverseCanvas";
import TechnologyInfoCard from "../glossary/TechnologyInfoCard";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import {
  Brain,
  Cloud,
  Code2,
  Layers,
  Move,
  ZoomIn,
  Compass,
  MousePointerClick,
  LayoutGrid,
} from "lucide-react";

interface SystemClusterProps {
  onToggleView?: () => void;
}

export default function SystemCluster({ onToggleView }: SystemClusterProps) {
  const { isLightMode } = useTheme();
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
      
      {/* ── Top Controls Bar ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl px-4 sm:px-6 flex justify-center sm:justify-end mb-3"
      >
        <div className="flex items-center gap-1.5 sm:gap-4 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 dark:bg-[#0c0c14]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-[10px] sm:text-xs font-mono text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <Move className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 shrink-0" />
            <span>Drag to rotate</span>
          </div>
          <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">•</span>
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <ZoomIn className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 shrink-0" />
            <span>Scroll to zoom</span>
          </div>
          <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-gray-900 dark:text-white font-semibold">
            <MousePointerClick className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300 shrink-0" />
            <span>Tap to explore</span>
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

        {/* ── 4 Floating System Cards (Desktop Only - Avoids Mobile Overlap) ── */}
        {/* 1. Top-Left: AI & LLM INFRA */}
        <div 
          className="hidden md:block absolute top-6 left-6 max-w-[240px] lg:max-w-[260px] cursor-pointer group pointer-events-auto"
          onMouseEnter={() => handleHubHover("ai")}
          onMouseLeave={() => handleHubHover(null)}
        >
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#0c0c14]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 group-hover:border-slate-300 dark:group-hover:border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
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
          className="hidden md:block absolute top-6 right-6 max-w-[240px] lg:max-w-[260px] cursor-pointer group pointer-events-auto"
          onMouseEnter={() => handleHubHover("data")}
          onMouseLeave={() => handleHubHover(null)}
        >
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#0c0c14]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 group-hover:border-slate-300 dark:group-hover:border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cloud className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
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
          className="hidden md:block absolute bottom-6 left-6 max-w-[240px] lg:max-w-[260px] cursor-pointer group pointer-events-auto"
          onMouseEnter={() => handleHubHover("backend")}
          onMouseLeave={() => handleHubHover(null)}
        >
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#0c0c14]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 group-hover:border-slate-300 dark:group-hover:border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
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
          className="hidden md:block absolute bottom-6 right-6 max-w-[240px] lg:max-w-[260px] cursor-pointer group pointer-events-auto"
          onMouseEnter={() => handleHubHover("fullstack")}
          onMouseLeave={() => handleHubHover(null)}
        >
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#0c0c14]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 group-hover:border-slate-300 dark:group-hover:border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
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

        {/* ── View Toggle Button ── */}
        {onToggleView && (
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center justify-center">
            <button
              onClick={onToggleView}
              className={cn(
                "inline-flex items-center gap-2 px-4.5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.12)] outline-none cursor-pointer group backdrop-blur-xl",
                isLightMode
                  ? "bg-white/95 hover:bg-white text-[#171A1F] border border-slate-200 hover:border-[#394E6E]/40 hover:shadow-md active:scale-95"
                  : "bg-[#0c0c14]/90 hover:bg-white/10 text-white border border-white/20 hover:border-white/35 hover:shadow-[0_4px_24px_rgba(0,0,0,0.7)] active:scale-95"
              )}
              aria-label="Switch to Cards View"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 group-hover:text-[#394E6E] dark:group-hover:text-white transition-colors" />
              <span>CARDS ↗</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Mobile Domain Summary Cards (2-Col Grid Below Canvas on Small Screens) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mt-4 px-2 md:hidden">
        {[
          { id: "ai", icon: Brain, title: "AI & LLM INFRA", desc: "Intelligent systems with advanced AI models and orchestration." },
          { id: "data", icon: Cloud, title: "DATA & CLOUD", desc: "Scalable data pipelines, storage, and cloud-native infrastructure." },
          { id: "backend", icon: Code2, title: "BACKEND & APIS", desc: "Robust backend systems and APIs that power everything." },
          { id: "fullstack", icon: Layers, title: "FULL-STACK", desc: "Modern frontend and full-stack experiences that scale." },
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = activeHub === item.id;
          return (
            <div
              key={item.id}
              onClick={() => handleHubHover(isSelected ? null : item.id)}
              className={cn(
                "p-3.5 rounded-2xl backdrop-blur-xl border transition-all cursor-pointer",
                isSelected
                  ? isLightMode
                    ? "bg-slate-100 border-[#394E6E] shadow-sm"
                    : "bg-white/15 border-white/35 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                  : isLightMode
                    ? "bg-white/85 border-slate-200/90 shadow-sm"
                    : "bg-[#0c0c14]/85 border-white/10"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
                </div>
                <h4 className="text-xs font-bold font-mono text-gray-900 dark:text-white tracking-tight">
                  {item.title}
                </h4>
              </div>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-snug font-sans">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Floating Info Tooltip for Hovered / Active Node */}
      <TechnologyInfoCard technology={activeNode} position={hoverPosition} />
    </div>
  );
}
