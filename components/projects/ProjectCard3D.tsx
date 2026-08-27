"use client";

import { useRef, useState, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/types";
import {
  Leaf,
  Bot,
  Zap,
  FlaskConical,
  Lock,
  ExternalLink,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

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
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0b12] dark:bg-[#07070c] overflow-hidden p-3.5 gap-2 select-none">
    {/* Subtle radial ambient illumination */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />

    {/* 01 Leaf Upload Step */}
    <motion.div
      className="w-full max-w-[200px] border border-slate-200 dark:border-white/10 rounded-lg p-2 bg-white/90 dark:bg-white/[0.04] backdrop-blur-md relative overflow-hidden"
      animate={on ? { borderColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.25)", "rgba(255,255,255,0.1)"] } : {}}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <div className="text-[8px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">01 · LEAF UPLOAD</div>
      <div className="flex items-center justify-between text-[9px] font-mono text-gray-700 dark:text-gray-300">
        <span className="font-semibold text-gray-900 dark:text-white">Image</span>
        <span className="text-gray-400">→</span>
        <span>Preprocess</span>
        <span className="text-gray-400">→</span>
        <span className="font-bold text-gray-900 dark:text-white">Infer</span>
      </div>

      {/* Subtle scanning laser line */}
      <motion.div
        className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-slate-400/50 dark:via-white/40 to-transparent pointer-events-none"
        animate={on ? { top: ["0%", "100%", "0%"] } : { top: "0%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>

    {/* Downward connecting line */}
    <div className="w-px h-2.5 bg-gradient-to-b from-slate-300 dark:from-white/20 to-transparent" />

    {/* 02 Prediction Record */}
    <motion.div
      className="w-full max-w-[220px] border border-slate-200 dark:border-white/10 rounded-lg p-2 bg-white/90 dark:bg-white/[0.04] backdrop-blur-md"
      initial={{ opacity: 0.9 }}
      animate={on ? { opacity: [0.9, 1, 0.9] } : {}}
      transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
    >
      <div className="text-[8px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">02 · PREDICTION RECORD</div>
      <div className="flex justify-between items-center mb-1">
        <div className="flex flex-col">
          <span className="text-[7.5px] text-gray-500 uppercase tracking-wider">Condition</span>
          <span className="text-[10.5px] font-semibold text-gray-900 dark:text-white">Tomato — Early Blight</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[7.5px] text-gray-500 uppercase tracking-wider">Confidence</span>
          <span className="text-[11px] font-mono font-bold text-emerald-500 dark:text-emerald-400">91.4%</span>
        </div>
      </div>
      <div className="text-[7.5px] font-mono text-gray-500 dark:text-gray-400 border-t border-slate-200 dark:border-white/10 pt-0.5">
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

  const src = imageUrl || (id === "humanoid" ? "/humanoid-head.jpg" : id === "apt" ? "/apt-transit.jpg" : "/ai-experiments.jpg");

  return (
    <div className="absolute inset-0 bg-[#0a0b12] dark:bg-[#07070c] overflow-hidden">
      {/* Subtle radial ambient illumination */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)] z-10 pointer-events-none" />

      <motion.img
        src={src}
        alt={title}
        className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
        animate={{ scale: isHovered ? 1.03 : 1.0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Gradient vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14]/80 via-transparent to-black/20 pointer-events-none z-10" />

      {/* Restrained laser scanline */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent z-20 pointer-events-none"
        animate={isHovered ? { top: ["0%", "100%", "0%"] } : { top: "0%" }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// ── Project Icon Resolver ─────────────────────────────────────────────────────
const ProjectIcon = ({ name }: { name?: string }) => {
  switch (name) {
    case "leaf":
      return <Leaf className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />;
    case "bot":
      return <Bot className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />;
    case "zap":
      return <Zap className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />;
    case "flask":
      return <FlaskConical className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />;
    default:
      return <Leaf className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />;
  }
};

function ProjectCard3D({ project, index, isFlipped, onFlipToggle }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Motion & Spring Tilt Setup (Max ±5°)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 280,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 280,
    damping: 24,
  });

  // Spotlight coordinates (px)
  const [spotlightPos, setSpotlightPos] = useState({ x: 150, y: 150 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleCardClick = useCallback(() => {
    onFlipToggle(project.id);
  }, [onFlipToggle, project.id]);

  const projectNum = project.number || `0${index + 1}`;

  return (
    <div
      ref={cardRef}
      className="relative w-full h-[470px] sm:h-[490px] lg:h-[505px] perspective-1200 cursor-pointer select-none group"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* ── TILT WRAPPER: reacts to mouse, disabled when flipped ── */}
      <motion.div
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 0 : rotateY,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        {/* ── FLIP WRAPPER: handles click-to-flip only ── */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full h-full rounded-2xl preserve-3d"
        >
        {/* ══════════════════════════════════════════════════════════════════════
            FRONT FACE OF CARD
           ══════════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-[#FAFBFC]/95 dark:bg-[#0a0b12]/90 backdrop-blur-xl border border-[#D9DEE4] dark:border-white/10 group-hover:border-[#7188A3] dark:group-hover:border-white/20 shadow-[0_8px_30px_rgba(113,136,163,0.06)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.7)] group-hover:shadow-[0_12px_36px_rgba(113,136,163,0.12)] dark:group-hover:shadow-[0_16px_44px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden backface-hidden transition-all duration-300"
        >
          {/* Dynamic Cursor Spotlight Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
            style={{
              background: `radial-gradient(320px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.05), transparent 80%)`,
            }}
          />

          {/* ── TOP IMAGE / DIAGRAM AREA (~42% of height) ─────────────────── */}
          <div className="relative w-full h-[180px] sm:h-[190px] border-b border-[#D9DEE4] dark:border-white/10 overflow-hidden rounded-t-2xl">
            <ProjectVisual
              id={project.id}
              imageUrl={project.imageUrl}
              title={project.title}
              isHovered={isHovered}
            />

            {/* Top-Left: Project Number Badge */}
            <div className="absolute top-3 left-3 z-20">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-widest text-white bg-black/75 backdrop-blur-md rounded-md border border-white/15 shadow-sm">
                {projectNum}
              </span>
            </div>

            {/* Bottom-Left: Floating Refined Icon Badge */}
            <div className="absolute bottom-2.5 left-3 z-20 flex items-center justify-center w-7 h-7 rounded-lg bg-[#FAFBFC]/90 dark:bg-[#0c0c14]/90 backdrop-blur-md border border-[#D9DEE4] dark:border-white/15 shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform">
              <ProjectIcon name={project.iconName} />
            </div>

            {/* Bottom-Right: Category Badge */}
            {project.categoryBadge && (
              <div className="absolute bottom-2.5 right-3 z-20">
                <span className="px-2 py-0.5 text-[8.5px] font-mono font-bold uppercase tracking-wider text-[#334155] dark:text-gray-300 bg-[#FAFBFC]/90 dark:bg-[#0c0c14]/90 backdrop-blur-md rounded border border-[#D9DEE4] dark:border-white/15">
                  {project.categoryBadge}
                </span>
              </div>
            )}
          </div>

          {/* ── CONTENT AREA (~58% of height) ─────────────────────────────── */}
          <div className="p-4 sm:p-4.5 flex flex-col flex-grow justify-between">
            {/* Title & Description */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#171A1F] dark:text-white tracking-tight font-display mb-1.5 group-hover:text-[#5F7692] dark:group-hover:text-zinc-200 transition-colors">
                {project.title}
              </h3>
              <p className="text-[11.5px] sm:text-xs text-[#66717D] dark:text-gray-400 leading-relaxed font-sans line-clamp-3 mb-3">
                {project.description}
              </p>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[9px] font-mono rounded bg-[#E9EDF1] dark:bg-white/[0.04] border border-[#D9DEE4] dark:border-white/10 text-[#334155] dark:text-gray-300 group-hover:border-[#7188A3] dark:group-hover:border-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Divider Line */}
            <div className="w-full h-px bg-[#D9DEE4] dark:border-white/10 mb-2.5" />

            {/* Footer Row */}
            <div className="flex items-center justify-between text-xs font-semibold">
              {project.githubUrl === "private" ? (
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                  <Lock className="w-3 h-3 text-gray-400" />
                  <span>Private source</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[11px] text-[#66717D] dark:text-gray-400 group-hover:text-[#171A1F] dark:group-hover:text-white transition-colors">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Source</span>
                </div>
              )}

              <div className="flex items-center gap-1 text-[11.5px] font-bold text-[#171A1F] dark:text-gray-300 group-hover:text-[#5F7692] dark:group-hover:text-white transition-colors">
                <span>View More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            BACK FACE OF CARD ("WHAT I BUILT")
           ══════════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-[#FAFBFC]/95 dark:bg-[#0a0b12]/95 backdrop-blur-xl border border-[#D9DEE4] dark:border-white/20 p-5 flex flex-col justify-between overflow-hidden backface-hidden shadow-[0_12px_36px_rgba(113,136,163,0.1)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.8)]"
          style={{
            transform: "rotateY(180deg)",
          }}
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-[#D9DEE4] dark:border-white/10 pb-2 mb-3">
              <span className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-widest text-[#171A1F] dark:text-gray-300 bg-[#E9EDF1] dark:bg-white/5 rounded border border-[#D9DEE4] dark:border-white/10">
                {projectNum} · WHAT I BUILT
              </span>
              <div className="flex items-center gap-1 text-[10px] font-mono text-[#66717D] dark:text-gray-400">
                <RotateCcw className="w-3 h-3" />
                <span>Return</span>
              </div>
            </div>

            <h4 className="text-base font-bold text-[#171A1F] dark:text-white font-display mb-2.5">
              {project.title}
            </h4>

            {/* Checklist of Engineering Achievements */}
            <ul className="space-y-1.5 mb-3">
              {(project.whatIBuilt || project.engineeringFocus || []).slice(0, 5).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-[#334155] dark:text-gray-300 leading-snug">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7692] dark:text-gray-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Back Action Links */}
          <div className="pt-2.5 border-t border-[#D9DEE4] dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {project.githubUrl && project.githubUrl !== "private" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#66717D] dark:text-gray-300 hover:text-[#171A1F] dark:hover:text-white transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#171A1F] dark:text-white hover:text-[#5F7692] hover:underline"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onFlipToggle(project.id);
              }}
              className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#E9EDF1] dark:bg-white/10 text-[#171A1F] dark:text-white hover:bg-[#D9DEE4] dark:hover:bg-white/20 transition-colors font-semibold"
            >
              Flip Back ↺
            </button>
          </div>
        </div>
      </motion.div>   {/* end flip wrapper */}
      </motion.div>   {/* end tilt wrapper */}
    </div>
  );
}

export default memo(ProjectCard3D);
