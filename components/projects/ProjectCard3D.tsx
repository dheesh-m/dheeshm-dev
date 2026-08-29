"use client";

import { useRef, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/types";
import {
  Leaf,
  Bot,
  Zap,
  FlaskConical,
  Film,
  Lock,
  ExternalLink,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectCard3DProps {
  project: Project;
  index: number;
  isFlipped: boolean;
  onFlipToggle: (id: string) => void;
}

// ── FarmLens Diagram Visual Component ─────────────────────────────────────────
const FarmLensDiagram = ({ on }: { on: boolean }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0b12] dark:bg-[#07070c] overflow-hidden p-2 sm:p-3.5 gap-1 sm:gap-2 select-none">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_70%)] pointer-events-none" />

    {/* 01 Leaf Upload Step */}
    <motion.div
      className="w-full max-w-[170px] sm:max-w-[200px] border border-slate-200 dark:border-white/10 rounded-md sm:rounded-lg p-1.5 sm:p-2 bg-white/90 dark:bg-[#0f1016]/90 backdrop-blur-md relative overflow-hidden"
      animate={on ? { borderColor: ["rgba(255,255,255,0.1)", "rgba(167,139,250,0.4)", "rgba(255,255,255,0.1)"] } : {}}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <div className="text-[7.5px] sm:text-[8px] font-mono uppercase tracking-widest text-[#64748B] mb-0.5 sm:mb-1">01 · LEAF UPLOAD</div>
      <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#CBD5E1]">
        <span className="font-semibold text-white">Image</span>
        <span className="text-[#64748B]">→</span>
        <span>Preprocess</span>
        <span className="text-[#64748B]">→</span>
        <span className="font-bold text-white">Infer</span>
      </div>

      <motion.div
        className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#A78BFA]/70 to-transparent pointer-events-none"
        animate={on ? { top: ["0%", "100%", "0%"] } : { top: "0%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>

    <div className="w-px h-1.5 sm:h-2.5 bg-gradient-to-b from-[#8B5CF6]/40 to-transparent" />

    {/* 02 Prediction Record */}
    <motion.div
      className="w-full max-w-[190px] sm:max-w-[220px] border border-slate-200 dark:border-white/10 rounded-md sm:rounded-lg p-1.5 sm:p-2 bg-white/90 dark:bg-[#0f1016]/90 backdrop-blur-md"
      initial={{ opacity: 0.9 }}
      animate={on ? { opacity: [0.9, 1, 0.9] } : {}}
      transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
    >
      <div className="text-[7.5px] sm:text-[8px] font-mono uppercase tracking-widest text-[#64748B] mb-0.5 sm:mb-1">02 · PREDICTION RECORD</div>
      <div className="flex justify-between items-center mb-0.5 sm:mb-1">
        <div className="flex flex-col">
          <span className="text-[7px] sm:text-[7.5px] text-[#64748B] uppercase tracking-wider">Condition</span>
          <span className="text-[9.5px] sm:text-[10.5px] font-semibold text-white">Tomato — Early Blight</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[7px] sm:text-[7.5px] text-[#64748B] uppercase tracking-wider">Confidence</span>
          <span className="text-[9.5px] sm:text-[11px] font-mono font-bold text-emerald-400">91.4%</span>
        </div>
      </div>
      <div className="text-[7px] sm:text-[7.5px] font-mono text-[#94A3B8] border-t border-slate-200 dark:border-white/10 pt-0.5">
        Treatment recommended · logged
      </div>
    </motion.div>
  </div>
);

// ── Visual Selector ───────────────────────────────────────────────────────────
const ProjectVisual = ({ id, imageUrl, title, isHovered }: { id: string; imageUrl?: string; title: string; isHovered: boolean }) => {
  if (id === "farmlens") {
    return <FarmLensDiagram on={isHovered} />;
  }

  const src = imageUrl || (id === "humanoid" ? "/humanoid-head.jpg" : id === "apt" ? "/apt-transit.jpg" : "/movie-ai-recommendation.png");

  return (
    <div className="absolute inset-0 bg-[#0a0b12] dark:bg-[#07070c] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06),transparent_70%)] z-10 pointer-events-none" />

      <motion.img
        src={src}
        alt={title}
        className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
        animate={{ scale: isHovered ? 1.04 : 1.0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1016] via-transparent to-transparent opacity-60 z-10" />
    </div>
  );
};

const ProjectIcon = ({ name }: { name?: string }) => {
  switch (name) {
    case "leaf":
      return <Leaf className="w-3.5 h-3.5 text-gray-700 dark:text-[#A78BFA]" />;
    case "bot":
      return <Bot className="w-3.5 h-3.5 text-gray-700 dark:text-[#A78BFA]" />;
    case "zap":
      return <Zap className="w-3.5 h-3.5 text-gray-700 dark:text-[#A78BFA]" />;
    case "flask":
      return <FlaskConical className="w-3.5 h-3.5 text-gray-700 dark:text-[#A78BFA]" />;
    case "film":
      return <Film className="w-3.5 h-3.5 text-gray-700 dark:text-[#A78BFA]" />;
    default:
      return <Film className="w-3.5 h-3.5 text-gray-700 dark:text-[#A78BFA]" />;
  }
};

function ProjectCard3D({ project, index, isFlipped, onFlipToggle }: ProjectCard3DProps) {
  const { isLightMode } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  // ── Ref-based hover — no React re-render on mouse enter/leave ──
  const isHoveredRef = useRef(false);

  // Smooth cursor tracking across the card (0 to 100%)
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const springConfig = { stiffness: 220, damping: 24, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Restrained 3D tilt (max ±3.5°)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltY, springConfig);
  const rotateY = useSpring(tiltX, springConfig);

  // Motion values for scale/lift — driven by hover without setState
  const hoverScale = useMotionValue(1);
  const hoverY = useMotionValue(0);
  const smoothScale = useSpring(hoverScale, { stiffness: 280, damping: 26, mass: 0.15 });
  const smoothLiftY = useSpring(hoverY, { stiffness: 280, damping: 26, mass: 0.15 });
  const spotlightOpacity = useMotionValue(0);
  const smoothSpotlight = useSpring(spotlightOpacity, { stiffness: 200, damping: 22, mass: 0.1 });

  const rectRef = useRef<DOMRect | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const frontFaceRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    hoverScale.set(1.02);
    hoverY.set(-5);
    spotlightOpacity.set(1);
    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.transform = "scale(1.05)";
    }
    if (frontFaceRef.current) {
      frontFaceRef.current.style.borderColor = "rgba(167, 139, 250, 0.35)";
    }
  }, [hoverScale, hoverY, spotlightOpacity]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    let rect = rectRef.current;
    if (!rect && cardRef.current) {
      rect = cardRef.current.getBoundingClientRect();
      rectRef.current = rect;
    }
    if (!rect) return;

    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(px);
    mouseY.set(py);

    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(normX * 5.0);
    tiltY.set(-normY * 5.0);
  }, [mouseX, mouseY, tiltX, tiltY]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    rectRef.current = null;
    tiltX.set(0);
    tiltY.set(0);
    mouseX.set(50);
    mouseY.set(50);
    hoverScale.set(1);
    hoverY.set(0);
    spotlightOpacity.set(0);
    if (glowRef.current) {
      glowRef.current.style.opacity = "0.35";
      glowRef.current.style.transform = "scale(0.95)";
    }
    if (frontFaceRef.current) {
      frontFaceRef.current.style.borderColor = "";
    }
  }, [tiltX, tiltY, mouseX, mouseY, hoverScale, hoverY, spotlightOpacity]);

  const handleCardClick = useCallback(() => {
    onFlipToggle(project.id);
  }, [onFlipToggle, project.id]);

  const projectNum = project.number || `0${index + 1}`;

  return (
    <div className="relative group/card flex flex-col items-center w-full">
      {/* ══════════════════════════════════════════════════════════════════
          LAYER 0: DIFFUSE ATMOSPHERIC VIOLET/SMOKE GLOW BEHIND CARD (Magic Bento)
          ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={glowRef}
        className="absolute -inset-2 sm:-inset-3 rounded-[28px] pointer-events-none -z-10"
        style={{
          opacity: 0.35,
          transform: "scale(0.95)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.22) 0%, rgba(109, 40, 217, 0.10) 45%, rgba(15, 16, 22, 0) 75%)",
          filter: "blur(28px)",
        }}
      />

      <div
        ref={cardRef}
        className="relative w-full h-[320px] sm:h-[430px] lg:h-[505px] perspective-1200 cursor-pointer select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {/* Tilt Wrapper — scale/lift driven by motion values, no animate={} prop needed */}
        <motion.div
          style={{
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 0 : rotateY,
            scale: smoothScale,
            y: smoothLiftY,
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Flip Wrapper */}
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full h-full rounded-2xl preserve-3d"
          >
            {/* ══════════════════════════════════════════════════════════════════════
                FRONT FACE OF CARD
               ══════════════════════════════════════════════════════════════════════ */}
            <div
              ref={frontFaceRef}
              className={cn(
                "absolute inset-0 w-full h-full rounded-2xl border flex flex-col justify-between overflow-hidden backface-hidden transition-[background-color,border-color,box-shadow] duration-300",
                isLightMode
                  ? "bg-[#E7E8EB] backdrop-blur-2xl border-violet-400/50 shadow-[0_0_22px_rgba(139,92,246,0.22),0_6px_24px_rgba(57,78,110,0.08)] hover:border-violet-500 hover:shadow-[0_0_32px_rgba(139,92,246,0.35)]"
                  : "bg-[#0f1016]/90 backdrop-blur-2xl border-violet-500/45 shadow-[0_0_28px_rgba(168,85,247,0.32),0_16px_40px_-15px_rgba(0,0,0,0.85)] hover:border-violet-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.5),0_20px_50px_rgba(0,0,0,0.9)]"
              )}
            >
              {/* Magic Bento Internal Spotlight */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none z-30"
                style={{
                  opacity: smoothSpotlight,
                  background: useTransform(
                    [smoothMouseX, smoothMouseY],
                    ([x, y]) =>
                      `radial-gradient(420px circle at ${x}% ${y}%, rgba(167, 139, 250, 0.12), rgba(109, 40, 217, 0.05) 40%, transparent 70%)`
                  ),
                }}
              />

              {/* Top Edge Specular Highlight */}
              <div
                className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl pointer-events-none opacity-40 dark:opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-30"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 30%, rgba(167, 139, 250, 0.4) 50%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)",
                }}
              />

              {/* ── TOP IMAGE / DIAGRAM AREA ─────────────────── */}
              <div className="relative w-full h-[120px] sm:h-[160px] lg:h-[190px] border-b border-black/10 dark:border-white/[0.10] overflow-hidden rounded-t-2xl">
                <ProjectVisual
                  id={project.id}
                  imageUrl={project.imageUrl}
                  title={project.title}
                  isHovered={isHoveredRef.current}
                />

                {/* Top-Left: Project Number Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20">
                  <span className={cn(
                    "px-2 sm:px-2.5 py-0.5 text-[8.5px] sm:text-[10px] font-mono font-bold tracking-widest rounded-md border shadow-sm",
                    isLightMode
                      ? "text-[#15171B] bg-white/90 border-slate-300"
                      : "text-[#CBD5E1] bg-black/75 border-white/15 backdrop-blur-md"
                  )}>
                    {projectNum}
                  </span>
                </div>

                {/* Bottom-Left: Floating Refined Icon Badge */}
                <div className={cn(
                  "absolute bottom-1.5 left-2 sm:bottom-2.5 sm:left-3 z-20 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg border shadow-sm group-hover:scale-105 group-hover:border-[#8B5CF6]/40 transition-[transform,border-color] duration-200",
                  isLightMode
                    ? "bg-white/90 border-slate-300 text-[#15171B]"
                    : "bg-[#0f1016]/90 border-white/[0.12] text-gray-300 backdrop-blur-md"
                )}>
                  <ProjectIcon name={project.iconName} />
                </div>

                {/* Bottom-Right: Category Badge */}
                {project.categoryBadge && (
                  <div className="absolute bottom-1.5 right-2 sm:bottom-2.5 sm:right-3 z-20">
                    <span className={cn(
                      "px-1.5 sm:px-2 py-0.5 text-[7px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider rounded border",
                      isLightMode
                        ? "text-[#15171B] bg-white/90 border-slate-300"
                        : "text-[#CBD5E1] bg-[#0f1016]/90 border-white/[0.12] backdrop-blur-md"
                    )}>
                      {project.categoryBadge}
                    </span>
                  </div>
                )}
              </div>

              {/* ── CONTENT AREA ─────────────────────────────── */}
              <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow justify-between relative z-10">
                {/* Title & Description */}
                <div>
                  <h3 className={cn(
                    "text-[13.5px] sm:text-base lg:text-lg font-bold tracking-tight font-display mb-1 transition-colors leading-snug",
                    isLightMode
                      ? "text-[#0F172A] group-hover:text-[#8B5CF6]"
                      : "text-[#CBD5E1] group-hover:text-white"
                  )}>
                    {project.title}
                  </h3>
                  <p className={cn(
                    "text-[11px] sm:text-[12.5px] lg:text-[13px] leading-snug sm:leading-relaxed font-sans line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-2.5",
                    isLightMode ? "text-[#1E293B]" : "text-[#94A3B8]"
                  )}>
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-2.5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        "px-1.5 sm:px-2 py-0.5 text-[8.5px] sm:text-[9.5px] font-mono rounded font-medium transition-colors",
                        isLightMode
                          ? "bg-[#CBD5E1]/60 border border-[#94A3B8]/60 text-[#0F172A]"
                          : "bg-white/[0.04] border border-white/[0.10] text-[#CBD5E1] group-hover:border-[#8B5CF6]/30"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Row */}
                <div className={cn(
                  "flex items-center justify-between text-[10.5px] sm:text-xs font-semibold pt-1 border-t",
                  isLightMode ? "border-black/10" : "border-white/[0.08]"
                )}>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    {project.githubUrl === "private" ? (
                      <div className={cn(
                        "flex items-center gap-1 text-[10px] sm:text-[11px]",
                        isLightMode ? "text-[#59616D]" : "text-[#64748B]"
                      )}>
                        <Lock className="w-3 h-3" />
                        <span>Private source</span>
                      </div>
                    ) : (
                      <div className={cn(
                        "flex items-center gap-1 text-[10px] sm:text-[11px] transition-colors",
                        isLightMode
                          ? "text-[#1E293B] hover:text-[#8B5CF6]"
                          : "text-[#94A3B8] group-hover:text-white"
                      )}>
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </div>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          "flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold transition-colors hover:underline",
                          isLightMode ? "text-[#2563EB]" : "text-[#A78BFA] hover:text-white"
                        )}
                      >
                        <span>Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className={cn(
                    "flex items-center gap-1 text-[10.5px] sm:text-[11.5px] font-bold transition-colors",
                    isLightMode
                      ? "text-[#0F172A] group-hover:text-[#8B5CF6]"
                      : "text-[#CBD5E1] group-hover:text-white"
                  )}>
                    <span>View More</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════════
                BACK FACE OF CARD ("WHAT I BUILT")
               ══════════════════════════════════════════════════════════════════════ */}
            <div
              className={cn(
                "absolute inset-0 w-full h-full rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden backface-hidden border transition-all duration-300",
                isLightMode
                  ? "bg-[#E7E8EB] backdrop-blur-2xl border-violet-400/50 shadow-[0_0_22px_rgba(139,92,246,0.22),0_6px_24px_rgba(57,78,110,0.08)]"
                  : "bg-[#0f1016]/90 backdrop-blur-2xl border-violet-500/45 shadow-[0_0_28px_rgba(168,85,247,0.32),0_16px_40px_rgba(0,0,0,0.85)] group-hover:border-violet-400"
              )}
              style={{
                transform: "rotateY(180deg)",
              }}
            >
              {/* Header */}
              <div>
                <div className={cn(
                  "flex items-center justify-between border-b pb-1.5 sm:pb-2 mb-2 sm:mb-3",
                  isLightMode ? "border-black/10" : "border-white/[0.10]"
                )}>
                  <span className={cn(
                    "px-2 py-0.5 text-[8.5px] sm:text-[9.5px] font-mono font-bold tracking-widest rounded border",
                    isLightMode
                      ? "text-[#0F172A] bg-white/80 border-slate-300"
                      : "text-[#CBD5E1] bg-white/5 border-white/10"
                  )}>
                    {projectNum} · WHAT I BUILT
                  </span>
                  <div className={cn(
                    "flex items-center gap-1 text-[9.5px] sm:text-[10px] font-mono",
                    isLightMode ? "text-[#59616D]" : "text-[#64748B]"
                  )}>
                    <RotateCcw className="w-3 h-3" />
                    <span>Return</span>
                  </div>
                </div>

                <h4 className={cn(
                  "text-sm sm:text-base font-bold font-display mb-1.5 sm:mb-2",
                  isLightMode ? "text-[#0F172A]" : "text-[#CBD5E1]"
                )}>
                  {project.title}
                </h4>

                <div className={cn(
                  "space-y-1 sm:space-y-1.5 text-[11px] sm:text-[12.5px] font-sans leading-snug sm:leading-relaxed",
                  isLightMode ? "text-[#1E293B]" : "text-[#94A3B8]"
                )}>
                  {project.whatIBuilt?.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className={cn(
                "pt-1.5 sm:pt-2 border-t flex items-center justify-between",
                isLightMode ? "border-black/10" : "border-white/[0.08]"
              )}>
                <span className={cn(
                  "text-[9px] sm:text-[10px] font-mono",
                  isLightMode ? "text-[#59616D]" : "text-[#64748B]"
                )}>
                  Click to flip back
                </span>
                <span className={cn(
                  "text-[9px] sm:text-[10px] font-mono hover:underline",
                  isLightMode ? "text-[#2563EB]" : "text-[#A78BFA]"
                )}>
                  Close Details →
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          GROUND FLOOR MIRROR REFLECTION WITH VIOLET AMBIENT TINT
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className="w-[85%] h-3 sm:h-8 mt-0.5 sm:mt-1 rounded-full opacity-25 blur-md pointer-events-none transition-[opacity,transform] duration-300 group-hover/card:opacity-50 group-hover/card:scale-105"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 75%)",
        }}
      />
    </div>
  );
}

export default memo(ProjectCard3D);
