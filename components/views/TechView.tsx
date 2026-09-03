"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Database, Server, Layout, Sparkles, Layers, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechCluster {
  title: string;
  category: string;
  icon: any;
  technologies: string[];
}

const CLUSTERS: TechCluster[] = [
  {
    title: "AI / LLM ENGINEERING",
    category: "ai",
    icon: Brain,
    technologies: [
      "LLM ORCHESTRATION",
      "RAG PIPELINES",
      "VECTOR RETRIEVAL",
      "EMBEDDINGS",
      "AUTONOMOUS AGENTS",
      "LANGGRAPH / LANGCHAIN",
      "PROMPT ENGINEERING",
      "VOICE AI / ASR / TTS",
    ],
  },
  {
    title: "DATA & CLOUD",
    category: "cloud",
    icon: Database,
    technologies: [
      "POSTGRESQL",
      "PINECONE / QDRANT",
      "VECTOR DATABASES",
      "DOCKER / CONTAINERS",
      "AWS (EC2, S3, LAMBDA)",
      "GCP / CLOUD RUN",
      "REDIS CACHING",
    ],
  },
  {
    title: "BACKEND ARCHITECTURE",
    category: "backend",
    icon: Server,
    technologies: [
      "PYTHON",
      "FASTAPI / FLASK",
      "HIGH-CONCURRENCY REST APIS",
      "WEBSOCKETS / REAL-TIME",
      "ASYNCIO ENGINE",
      "SQLALCHEMY / PRISMA",
      "DISTRIBUTED SYSTEMS",
    ],
  },
  {
    title: "FRONTEND & SYSTEMS",
    category: "frontend",
    icon: Layout,
    technologies: [
      "REACT / NEXT.JS",
      "TYPESCRIPT",
      "TAILWIND CSS",
      "FRAMER MOTION",
      "STATE MANAGEMENT",
      "RESPONSIVE UI/UX",
      "WEBGL / SHADERS",
    ],
  },
];

export default function TechView() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-16 min-h-[calc(100vh-140px)] flex flex-col justify-center">
      {/* ── Section Header ── */}
      <div className="flex flex-col items-start mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444]" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase">
            03 / TECHNOLOGY ECOSYSTEM
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-3 uppercase">
          Systems I Build With
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl font-normal">
          The technologies, frameworks and platforms that power my intelligent solutions.
        </p>
      </div>

      {/* ── Central Node & 4-Quadrant Tech Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 relative">
        {/* Central Core Indicator badge (desktop overlay) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[#05060B]/90 border border-[#EF4444]/40 shadow-[0_0_30px_rgba(239,68,68,0.3)] flex flex-col items-center justify-center text-center backdrop-blur-md">
            <span className="text-xs font-black text-white leading-tight">AI</span>
            <span className="text-[8px] font-mono tracking-wider text-[#EF4444] font-bold">CORE</span>
          </div>
        </div>

        {CLUSTERS.map((cluster) => {
          const Icon = cluster.icon;
          const isHighlighted = activeCategory === null || activeCategory === cluster.category;
          return (
            <div
              key={cluster.title}
              onMouseEnter={() => setActiveCategory(cluster.category)}
              onMouseLeave={() => setActiveCategory(null)}
              className={cn(
                "p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between",
                isHighlighted
                  ? "bg-white/[0.04] border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                  : "bg-white/[0.02] border-white/[0.06] opacity-60"
              )}
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#EF4444]" />
                </div>
                <h3 className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white">
                  {cluster.title}
                </h3>
              </div>

              {/* Technologies Pills Grid */}
              <div className="flex flex-wrap gap-2">
                {cluster.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10.5px] sm:text-xs font-mono font-medium tracking-wide bg-white/[0.03] border border-white/[0.08] text-white/80 hover:border-[#EF4444]/50 hover:bg-[#EF4444]/10 hover:text-white transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
