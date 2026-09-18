"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

interface TechItem {
  name: string;
  icon: string;
}

interface TechCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  colLeft: TechItem[];
  colRight: TechItem[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    id: "ai",
    number: "01",
    title: "AI / LLM ENGINEERING",
    subtitle: "INTELLIGENCE AT SCALE",
    tagline: "FROM MODELS TO MEANINGFUL PRODUCTS",
    colLeft: [
      { name: "LLM ORCHESTRATION", icon: "brain" },
      { name: "RAG", icon: "search" },
      { name: "VECTOR RETRIEVAL", icon: "network" },
      { name: "EMBEDDINGS", icon: "layers" },
      { name: "AGENTS", icon: "bot" },
    ],
    colRight: [
      { name: "TTS", icon: "tts" },
      { name: "ASR", icon: "mic" },
      { name: "LANGGRAPH", icon: "graph" },
      { name: "PROMPT ENGINEERING", icon: "prompt" },
      { name: "VOICE AI", icon: "voice" },
    ],
  },
  {
    id: "data",
    number: "02",
    title: "DATA & CLOUD",
    subtitle: "SCALABLE INFRASTRUCTURE",
    tagline: "DATA THAT MOVES IDEAS FORWARD",
    colLeft: [
      { name: "POSTGRESQL", icon: "postgres" },
      { name: "PINECONE", icon: "pinecone" },
      { name: "DOCKER", icon: "docker" },
    ],
    colRight: [
      { name: "AWS", icon: "aws" },
      { name: "GCP", icon: "gcp" },
      { name: "VECTOR DBS", icon: "vectordb" },
    ],
  },
  {
    id: "backend",
    number: "03",
    title: "BACKEND",
    subtitle: "ROBUST SYSTEMS",
    tagline: "RELIABLE APIS. REAL IMPACT.",
    colLeft: [
      { name: "PYTHON", icon: "python" },
      { name: "FASTAPI", icon: "fastapi" },
    ],
    colRight: [
      { name: "REST APIS", icon: "api" },
      { name: "WEBSOCKETS", icon: "websocket" },
    ],
  },
  {
    id: "frontend",
    number: "04",
    title: "FRONTEND",
    subtitle: "ENGAGING INTERFACES",
    tagline: "IDEAS INTO INTUITIVE EXPERIENCES",
    colLeft: [
      { name: "REACT", icon: "react" },
      { name: "NEXT.JS", icon: "next" },
    ],
    colRight: [
      { name: "TYPESCRIPT", icon: "typescript" },
      { name: "TAILWIND CSS", icon: "tailwind" },
    ],
  },
];

/* ── Tailored Vector Badges Matching Reference Image ────────────────────── */
function renderTechIcon(icon: string) {
  switch (icon) {
    case "brain":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
          <path d="M12 5v13" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      );
    case "network":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.59 13.51 6.83 3.98" />
          <path d="m15.41 6.51-6.82 3.98" />
        </svg>
      );
    case "layers":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 2 10 5-10 5L2 7l10-5Z" />
          <path d="m2 12 10 5 10-5" />
          <path d="m2 17 10 5 10-5" />
        </svg>
      );
    case "bot":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="12" x="3" y="6" rx="3" />
          <path d="M12 2v4" />
          <path d="M9 12h.01" />
          <path d="M15 12h.01" />
          <path d="M8 18v2" />
          <path d="M16 18v2" />
        </svg>
      );
    case "tts":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 10v4" />
          <path d="M6 6v12" />
          <path d="M10 3v18" />
          <path d="M14 8v8" />
          <path d="M18 5v14" />
          <path d="M22 10v4" />
        </svg>
      );
    case "mic":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      );
    case "graph":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="12" r="3" />
          <path d="M6 9v6" />
          <path d="M8.5 7.5 15.5 10.5" />
          <path d="M8.5 16.5 15.5 13.5" />
        </svg>
      );
    case "prompt":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="m8 10 3 2-3 2" />
          <path d="M13 14h3" />
        </svg>
      );
    case "voice":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12c2.5-4 5.5-4 8 0s5.5 4 8 0 3.5-2 4-2" />
          <path d="M2 12c2.5 4 5.5 4 8 0s5.5-4 8 0 3.5 2 4 2" opacity="0.6" />
        </svg>
      );
    case "postgres":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case "pinecone":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="6" r="1.5" />
          <circle cx="12" cy="18" r="1.5" />
          <circle cx="6" cy="12" r="1.5" />
          <circle cx="18" cy="12" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="16" cy="8" r="1.5" />
          <circle cx="8" cy="16" r="1.5" />
          <circle cx="16" cy="16" r="1.5" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14h16c.8 0 1.4-.4 1.8-1 .3-.5.2-1.3-.2-1.8C20 9 17.5 8 15 8c-.6 0-1.1.1-1.6.2C12.5 7 11 6 9 6c-.8 0-1.6.2-2.3.6C5.5 7.1 4 9 4 11v3Z" />
          <rect x="7" y="10" width="2" height="2" />
          <rect x="10" y="10" width="2" height="2" />
          <rect x="13" y="10" width="2" height="2" />
          <path d="M2 14c1.5 2 4 3 7 3s5.5-1 7-3" />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
    case "gcp":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Z" />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
      );
    case "vectordb":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="8" ry="2.5" />
          <path d="M4 5v6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5V5" />
          <path d="M4 11v6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-6" />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c3.5 0 5 1.5 5 4v2h-5a2 2 0 0 0-2 2v2H6c-2.5 0-4-1.5-4-4s1.5-4 5-4h5V2Z" />
          <path d="M12 22c-3.5 0-5-1.5-5-4v-2h5a2 2 0 0 0 2-2v-2h4c2.5 0 4 1.5 4 4s-1.5 4-5 4h-5v2Z" />
          <circle cx="8.5" cy="5" r=".75" fill="currentColor" />
          <circle cx="15.5" cy="19" r=".75" fill="currentColor" />
        </svg>
      );
    case "fastapi":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
        </svg>
      );
    case "api":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
      );
    case "websocket":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)" />
        </svg>
      );
    case "next":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 8v8" />
          <path d="m9 8 6 8" />
          <path d="M15 8v4" />
        </svg>
      );
    case "typescript":
      return (
        <div className="font-mono text-[9.5px] font-black tracking-tighter leading-none border border-current px-0.5 py-0.5 rounded">
          TS
        </div>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 12c1.5-2 3.5-3 6-3 3.5 0 5 2 6.5 2 1.5 0 2.5-.8 3.5-2-1.5 2-3.5 3-6 3-3.5 0-5-2-6.5-2-1.5 0-2.5.8-3.5 2Z" />
          <path d="M2 17c1.5-2 3.5-3 6-3 3.5 0 5 2 6.5 2 1.5 0 2.5-.8 3.5-2-1.5 2-3.5 3-6 3-3.5 0-5-2-6.5-2-1.5 0-2.5.8-3.5 2Z" />
        </svg>
      );
    default:
      return (
        <div className="w-2 h-2 rounded-full bg-current" />
      );
  }
}

export default function TechView() {
  const { isLightMode } = useTheme();
  const [activeCard, setActiveCard] = useState<string>("ai");
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Dynamic connector lines and hub vertical position
  const [lines, setLines] = useState<{ id: string; x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [hubTop, setHubTop] = useState<number | null>(null);

  useEffect(() => {
    const updateConnectors = () => {
      if (!containerRef.current || !hubRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const hubRect = hubRef.current.getBoundingClientRect();

      // Align hub vertically between Card 01 and Card 03
      const card0 = cardRefs.current[0];
      const card2 = cardRefs.current[2];
      let calculatedHubCenterY = hubRect.top + hubRect.height / 2 - containerRect.top;

      if (card0 && card2) {
        const card0Rect = card0.getBoundingClientRect();
        const card2Rect = card2.getBoundingClientRect();
        const idealY = (card0Rect.bottom + card2Rect.top) / 2 - containerRect.top;
        if (idealY > 40) {
          calculatedHubCenterY = idealY;
          setHubTop(idealY);
        }
      }

      const hubCenterX = containerRect.width / 2;
      const hubRadius = hubRect.width / 2;

      // Angles: Top-Left (-135°), Top-Right (-45°), Bottom-Left (135°), Bottom-Right (45°)
      const angles = [
        (-135 * Math.PI) / 180,
        (-45 * Math.PI) / 180,
        (135 * Math.PI) / 180,
        (45 * Math.PI) / 180,
      ];

      const newLines = TECH_CATEGORIES.map((cat, idx) => {
        const cardEl = cardRefs.current[idx];
        const angle = angles[idx];
        const x1 = hubCenterX + hubRadius * Math.cos(angle);
        const y1 = calculatedHubCenterY + hubRadius * Math.sin(angle);

        if (!cardEl) {
          return { id: cat.id, x1, y1, x2: x1, y2: y1 };
        }

        const cardRect = cardEl.getBoundingClientRect();
        let x2 = 0;
        let y2 = 0;

        if (idx === 0) {
          x2 = cardRect.right - containerRect.left;
          y2 = cardRect.bottom - containerRect.top - 14;
        } else if (idx === 1) {
          x2 = cardRect.left - containerRect.left;
          y2 = cardRect.bottom - containerRect.top - 14;
        } else if (idx === 2) {
          x2 = cardRect.right - containerRect.left;
          y2 = cardRect.top - containerRect.top + 14;
        } else {
          x2 = cardRect.left - containerRect.left;
          y2 = cardRect.top - containerRect.top + 14;
        }

        return { id: cat.id, x1, y1, x2, y2 };
      });

      setLines(newLines);
    };

    updateConnectors();

    const resizeObserver = new ResizeObserver(() => {
      updateConnectors();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateConnectors, { passive: true });
    window.addEventListener("orientationchange", updateConnectors, { passive: true });

    const timer1 = setTimeout(updateConnectors, 100);
    const timer2 = setTimeout(updateConnectors, 350);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateConnectors);
      window.removeEventListener("orientationchange", updateConnectors);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Cached card rects map for zero layout thrashing on mousemove (60+ FPS)
  const cardRectsRef = useRef<Map<string, DOMRect>>(new Map());

  const handleCardMouseEnter = (catId: string, el: HTMLDivElement) => {
    setActiveCard(catId);
    cardRectsRef.current.set(catId, el.getBoundingClientRect());
  };

  const handleMouseMove = (catId: string, e: React.MouseEvent<HTMLDivElement>) => {
    let rect = cardRectsRef.current.get(catId);
    if (!rect) {
      rect = e.currentTarget.getBoundingClientRect();
      cardRectsRef.current.set(catId, rect);
    }
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20 sm:pb-28 lg:pb-32 min-h-[100svh] flex flex-col justify-center">
      <style jsx global>{`
        @keyframes hubPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 24px rgba(229, 9, 20, 0.22), inset 0 0 14px rgba(229, 9, 20, 0.14);
          }
          50% {
            transform: scale(1.012);
            box-shadow: 0 0 42px rgba(229, 9, 20, 0.38), inset 0 0 20px rgba(229, 9, 20, 0.22);
          }
        }
        @keyframes connectorFlow {
          0% {
            stroke-dashoffset: 16;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-connector-flow {
          animation: connectorFlow 1.6s linear infinite;
        }
      `}</style>

      {/* ── 1. Compact Section Header ── */}
      <div className="flex flex-col items-center text-center mx-auto mb-4 sm:mb-6">
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full backdrop-blur-md mb-2.5 transition-colors",
            isLightMode
              ? "bg-red-500/[0.05] border border-red-500/20 text-[#E50909]"
              : "bg-white/[0.04] border border-white/10 text-white/80"
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#E50914] shadow-[0_0_8px_#E50914]"
            )}
          />
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
            03 / TECHNOLOGY ECOSYSTEM
          </span>
        </div>

        <BlurText
          as="h2"
          text="Systems I Build With"
          delay={120}
          animateBy="words"
          direction="top"
          stepDuration={0.35}
          threshold={0.1}
          className={cn(
            "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1.5 transition-colors font-primary",
            isLightMode ? "text-[#111111]" : "text-white"
          )}
          style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700 }}
        />
        <p
          className={cn(
            "text-xs sm:text-[13px] max-w-lg font-normal transition-colors font-body",
            isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
          )}
          style={{ fontFamily: "var(--font-josefin), sans-serif", lineHeight: 1.4 }}
        >
          The technologies, frameworks and platforms that power my solutions.
        </p>
      </div>

      {/* ── 2. Balanced Proportional Technology Ecosystem Canvas ── */}
      <div ref={containerRef} className="relative w-full max-w-[1260px] mx-auto select-none">
        
        {/* SVG Dynamic Connector Lines (Desktop Only) */}
        <svg
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          fill="none"
        >
          <defs>
            <filter id="glow-red-node" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {lines.map((line) => {
            const isLineActive = activeCard === line.id;
            const pathD = `M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`;

            return (
              <g key={line.id}>
                {/* Background ambient glow line */}
                {isLineActive && (
                  <path
                    d={pathD}
                    stroke="#E50914"
                    strokeWidth="2.5"
                    opacity="0.28"
                    strokeLinecap="round"
                  />
                )}

                {/* Dashed connector line */}
                <path
                  d={pathD}
                  stroke={isLineActive ? "#E50914" : isLightMode ? "rgba(229, 9, 20, 0.45)" : "rgba(185, 28, 28, 0.42)"}
                  strokeWidth={isLineActive ? "1.5" : "1"}
                  strokeDasharray="3 4"
                  className={cn("transition-colors duration-300", isLineActive && "animate-connector-flow")}
                />

                {/* Traveling system flow particle */}
                <circle r={isLineActive ? "2.8" : "2.2"} fill="#E50914" filter="url(#glow-red-node)">
                  <animateMotion
                    dur={isLineActive ? "4s" : "5.5s"}
                    repeatCount="indefinite"
                    path={pathD}
                  />
                </circle>

                {/* Central perimeter hub node */}
                <circle
                  cx={line.x1}
                  cy={line.y1}
                  r={isLineActive ? "3.8" : "2.8"}
                  fill="#E50914"
                  className="transition-all duration-300"
                  style={{
                    filter: isLineActive ? "drop-shadow(0 0 6px #E50914)" : "drop-shadow(0 0 3px #E50914)",
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* ── Desktop Central AI Hub (Proportional 140px Diameter) ── */}
        <div
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
          style={{
            top: hubTop ? `${hubTop}px` : "48%",
          }}
        >
          <div
            ref={hubRef}
            className="relative rounded-full flex flex-col items-center justify-center p-2.5 select-none"
            style={{
              width: "140px",
              height: "140px",
              animation: "hubPulse 5.5s ease-in-out infinite",
            }}
          >
            {/* Outer faint dashed circular orbit ring */}
            <div className="absolute -inset-4 rounded-full border border-dashed border-red-500/20 pointer-events-none" />

            {/* Glowing outer red ring */}
            <div className="absolute inset-0 rounded-full border border-red-500/40 pointer-events-none" />

            {/* Subtle secondary inner ring */}
            <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />

            {/* Side technical bracket markers '[' and ']' */}
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-red-500/60 text-base font-bold select-none pointer-events-none">[</span>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-red-500/60 text-base font-bold select-none pointer-events-none">]</span>

            {/* Cardinal tick notches */}
            <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-[#E50914]/80 rounded-sm" />
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-[#E50914]/80 rounded-sm" />
            <div className="absolute left-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-[#E50914]/80 rounded-sm" />
            <div className="absolute right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-[#E50914]/80 rounded-sm" />

            {/* Hub Glass Surface */}
            <div
              className={cn(
                "absolute inset-0 rounded-full backdrop-blur-xl transition-colors",
                isLightMode ? "bg-white/94" : "bg-[#080911]/95"
              )}
            />

            {/* Central Typography Hierarchy */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <span
                className={cn(
                  "text-2xl lg:text-3xl font-black tracking-wider leading-none mb-0.5 font-primary",
                  isLightMode ? "text-[#111111]" : "text-white"
                )}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 900,
                  textShadow: isLightMode ? "none" : "0 0 14px rgba(255,255,255,0.25)",
                }}
              >
                AI
              </span>
              <div className="flex items-center gap-1 my-0.5">
                <span className="w-1 h-1 rounded-full bg-[#E50914] shadow-[0_0_3px_#E50914]" />
                <span className="text-[9px] font-mono tracking-[0.22em] font-bold text-[#E50914] leading-tight">
                  LLM
                </span>
                <span className="w-1 h-1 rounded-full bg-[#E50914] shadow-[0_0_3px_#E50914]" />
              </div>
              <span
                className={cn(
                  "text-[7.5px] font-mono tracking-[0.24em] font-semibold uppercase leading-tight",
                  isLightMode ? "text-zinc-600" : "text-zinc-300"
                )}
              >
                ENGINEERING
              </span>
            </div>
          </div>
        </div>

        {/* ── 4 Category Cards (Proportional, Fitting Both Desktop & Mobile Viewports) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-12 gap-y-5 lg:gap-y-6 items-start relative z-10">
          {TECH_CATEGORIES.map((cat, idx) => {
            const isActive = activeCard === cat.id;

            return (
              <React.Fragment key={cat.id}>
                {/* Mobile Hub inserted between Card 02 and Card 03 */}
                {idx === 2 && (
                  <div className="flex lg:hidden justify-center my-2">
                    <div className="relative w-24 h-24 rounded-full flex flex-col items-center justify-center p-2 border border-red-500/40 bg-[#080911]/95 backdrop-blur-xl shadow-[0_0_25px_rgba(229,9,20,0.3)]">
                      <span className="text-xl font-black text-white font-primary leading-none">AI</span>
                      <div className="flex items-center gap-1 my-0.5">
                        <span className="w-1 h-1 rounded-full bg-[#E50914]" />
                        <span className="text-[8.5px] font-mono tracking-widest font-bold text-[#E50914] leading-tight">LLM</span>
                        <span className="w-1 h-1 rounded-full bg-[#E50914]" />
                      </div>
                      <span className="text-[7px] font-mono tracking-wider font-semibold text-zinc-300 uppercase leading-tight">ENGINEERING</span>
                    </div>
                  </div>
                )}

                <div
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  onMouseEnter={(e) => handleCardMouseEnter(cat.id, e.currentTarget)}
                  onMouseMove={(e) => handleMouseMove(cat.id, e)}
                  className={cn(
                    "group relative rounded-[18px] xl:rounded-[20px] px-5 py-4 xl:px-6 xl:py-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden",
                    "backdrop-blur-xl select-none flex flex-col justify-between w-full self-start",
                    isActive ? "-translate-y-0.5" : "hover:-translate-y-0.5",
                    isLightMode
                      ? cn(
                          "bg-white/88 shadow-[0_8px_24px_rgba(0,0,0,0.04)]",
                          isActive
                            ? "border border-red-500/70 shadow-[0_0_24px_rgba(229,9,20,0.18),0_10px_28px_rgba(0,0,0,0.05)]"
                            : "border border-black/[0.08] hover:border-black/20"
                        )
                      : cn(
                          "bg-[#0A0C14]/80 shadow-[0_10px_32px_rgba(0,0,0,0.55)]",
                          isActive
                            ? "border border-red-500/80 shadow-[0_0_28px_rgba(229,9,20,0.22),0_14px_36px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.18)]"
                            : "border border-white/[0.14] hover:border-white/25"
                        )
                  )}
                  style={{
                    backgroundImage: `radial-gradient(circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229, 9, 20, ${isActive ? "0.12" : "0.04"}), transparent 75%)`,
                  }}
                >
                  {/* Top-left Red Accent Corner Flare (Active Card Visual Signature) */}
                  {isActive && (
                    <div
                      className="absolute -top-[1px] -left-[1px] w-24 h-24 pointer-events-none rounded-tl-[20px]"
                      style={{
                        background: "radial-gradient(circle at top left, rgba(229, 9, 20, 0.4), transparent 70%)",
                      }}
                    />
                  )}

                  <div>
                    {/* ── Top Header Row: Category Number + Title + Subtitle + Arrow ── */}
                    <div className="flex items-center justify-between gap-2.5 mb-2.5">
                      {/* Left: Red status dot + Number + Title */}
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300",
                            isActive ? "bg-[#E50914] shadow-[0_0_8px_#E50914]" : "bg-red-500/60"
                          )}
                        />
                        <span className="font-mono text-sm xl:text-base font-bold text-[#E50914] tracking-wider">
                          {cat.number}
                        </span>
                        <h3
                          className={cn(
                            "text-sm sm:text-base xl:text-[17px] font-bold uppercase tracking-wider font-primary transition-colors",
                            isLightMode ? "text-[#111111]" : "text-white"
                          )}
                          style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700 }}
                        >
                          {cat.title}
                        </h3>
                      </div>

                      {/* Right: Subtitle metadata + ArrowUpRight */}
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "hidden sm:inline-block font-mono text-[8.5px] xl:text-[9.5px] tracking-widest uppercase transition-colors",
                            isActive ? "text-zinc-300" : "text-zinc-400"
                          )}
                        >
                          {cat.subtitle}
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "w-3.5 h-3.5 transition-all duration-300",
                            isActive ? "text-[#E50914] translate-x-0.5 -translate-y-0.5" : "text-zinc-400 group-hover:text-zinc-200"
                          )}
                        />
                      </div>
                    </div>

                    {/* Thin Divider Line */}
                    <div
                      className={cn(
                        "w-full h-px mb-2.5 transition-colors",
                        isLightMode ? "bg-black/[0.08]" : "bg-white/[0.08]"
                      )}
                    />

                    {/* ── 2-Column Technologies Grid (Compact, Crisp, Elegant) ── */}
                    <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 xl:gap-x-8 gap-y-1.5 mb-1">
                      {/* Left Column */}
                      <div className="flex flex-col gap-1.5">
                        {cat.colLeft.map((item) => (
                          <div key={item.name} className="flex items-center gap-2.5 group/item cursor-default py-0.5">
                            <div
                              className={cn(
                                "w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-md flex items-center justify-center shrink-0 border transition-all duration-300",
                                isLightMode
                                  ? "bg-red-500/[0.06] border-red-500/20 text-[#E50914] group-hover/item:border-red-500/40 group-hover/item:bg-red-500/[0.12]"
                                  : "bg-[#160709]/80 border-red-500/25 text-[#E50914] group-hover/item:border-red-500/50 group-hover/item:bg-red-950/40 group-hover/item:shadow-[0_0_10px_rgba(229,9,20,0.25)]"
                              )}
                              style={{ width: "28px", height: "28px" }}
                            >
                              {renderTechIcon(item.icon)}
                            </div>
                            <span
                              className={cn(
                                "font-mono text-[11px] sm:text-[11.5px] xl:text-[12px] font-semibold tracking-wide transition-colors leading-tight truncate",
                                isLightMode
                                  ? "text-[#343A40] group-hover/item:text-[#111111]"
                                  : "text-zinc-200 group-hover/item:text-white"
                              )}
                            >
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Right Column */}
                      <div className="flex flex-col gap-1.5">
                        {cat.colRight.map((item) => (
                          <div key={item.name} className="flex items-center gap-2.5 group/item cursor-default py-0.5">
                            <div
                              className={cn(
                                "w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-md flex items-center justify-center shrink-0 border transition-all duration-300",
                                isLightMode
                                  ? "bg-red-500/[0.06] border-red-500/20 text-[#E50914] group-hover/item:border-red-500/40 group-hover/item:bg-red-500/[0.12]"
                                  : "bg-[#160709]/80 border-red-500/25 text-[#E50914] group-hover/item:border-red-500/50 group-hover/item:bg-red-950/40 group-hover/item:shadow-[0_0_10px_rgba(229,9,20,0.25)]"
                              )}
                              style={{ width: "28px", height: "28px" }}
                            >
                              {renderTechIcon(item.icon)}
                            </div>
                            <span
                              className={cn(
                                "font-mono text-[11px] sm:text-[11.5px] xl:text-[12px] font-semibold tracking-wide transition-colors leading-tight truncate",
                                isLightMode
                                  ? "text-[#343A40] group-hover/item:text-[#111111]"
                                  : "text-zinc-200 group-hover/item:text-white"
                              )}
                            >
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Card Footer: Category Tagline + EXPLORE Indicator ── */}
                  <div
                    className={cn(
                      "mt-2.5 pt-2 border-t flex items-center justify-between transition-colors",
                      isLightMode ? "border-black/[0.06]" : "border-white/[0.08]"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[9px] xl:text-[9.5px] tracking-wider uppercase transition-colors truncate max-w-[70%]",
                        isLightMode ? "text-zinc-500" : "text-zinc-400"
                      )}
                    >
                      {cat.tagline}
                    </span>
                    <div className="flex items-center gap-1 font-mono text-[10px] xl:text-[10.5px] font-bold text-[#E50914] tracking-wider transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* ── Reference Bottom Signature Line ── */}
        <div className="w-full flex items-center justify-between pt-4 mt-5 border-t border-white/[0.08] text-[9.5px] xl:text-[10px] font-mono tracking-widest uppercase">
          <span className="text-[#E50914] font-bold">
            — DHEESH MEDEKAR
          </span>
          <span className={cn(isLightMode ? "text-zinc-400" : "text-zinc-500")}>
            BUILD &gt; LEARN &gt; IMPACT
          </span>
        </div>
      </div>
    </div>
  );
}
