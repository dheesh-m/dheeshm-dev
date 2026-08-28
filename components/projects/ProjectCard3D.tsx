"use client";

import { useRef, useState, useCallback, memo } from "react";
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
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0b12] dark:bg-[#07070c] overflow-hidden p-3.5 gap-2 select-none">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_70%)] pointer-events-none" />

    {/* 01 Leaf Upload Step */}
    <motion.div
      className="w-full max-w-[200px] border border-slate-200 dark:border-white/10 rounded-lg p-2 bg-white/90 dark:bg-[#0f1016]/90 backdrop-blur-md relative overflow-hidden"
      animate={on ? { borderColor: ["rgba(255,255,255,0.1)", "rgba(167,139,250,0.4)", "rgba(255,255,255,0.1)"] } : {}}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <div className="text-[8px] font-mono uppercase tracking-widest text-[#64748B] mb-1">01 · LEAF UPLOAD</div>
      <div className="flex items-center justify-between text-[9px] font-mono text-[#CBD5E1]">
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

    <div className="w-px h-2.5 bg-gradient-to-b from-[#8B5CF6]/40 to-transparent" />

    {/* 02 Prediction Record */}
    <motion.div
      className="w-full max-w-[220px] border border-slate-200 dark:border-white/10 rounded-lg p-2 bg-white/90 dark:bg-[#0f1016]/90 backdrop-blur-md"
      initial={{ opacity: 0.9 }}
      animate={on ? { opacity: [0.9, 1, 0.9] } : {}}
      transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
    >
      <div className="text-[8px] font-mono uppercase tracking-widest text-[#64748B] mb-1">02 · PREDICTION RECORD</div>
      <div className="flex justify-between items-center mb-1">
        <div className="flex flex-col">
          <span className="text-[7.5px] text-[#64748B] uppercase tracking-wider">Condition</span>
          <span className="text-[10.5px] font-semibold text-white">Tomato — Early Blight</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[7.5px] text-[#64748B] uppercase tracking-wider">Confidence</span>
          <span className="text-[11px] font-mono font-bold text-emerald-400">91.4%</span>
        </div>
      </div>
      <div className="text-[7.5px] font-mono text-[#94A3B8] border-t border-slate-200 dark:border-white/10 pt-0.5">
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  }, []);

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
    setIsHovered(false);
    rectRef.current = null;
    tiltX.set(0);
    tiltY.set(0);
    mouseX.set(50);
    mouseY.set(50);
  }, [tiltX, tiltY, mouseX, mouseY]);

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
        className={cn(
          "absolute -inset-2 sm:-inset-3 rounded-[28px] pointer-events-none transition-all duration-700 -z-10",
          isHovered ? "opacity-100 scale-105" : "opacity-35 scale-95"
        )}
        style={{
          background: isHovered
            ? "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.22) 0%, rgba(109, 40, 217, 0.10) 45%, rgba(15, 16, 22, 0) 75%)"
            : "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, rgba(109, 40, 217, 0.02) 50%, rgba(15, 16, 22, 0) 75%)",
          filter: "blur(28px)",
        }}
      />

      <div
        ref={cardRef}
        className="relative w-full h-[450px] sm:h-[480px] lg:h-[505px] perspective-1200 cursor-pointer select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {/* Tilt Wrapper */}
        <motion.div
          style={{
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 0 : rotateY,
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
          }}
          animate={{
            scale: isHovered ? 1.02 : 1,
            y: isHovered ? -5 : 0,
          }}
          transition={{
            scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
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
              className={cn(
                "absolute inset-0 w-full h-full rounded-2xl bg-[#0f1016]/80 backdrop-blur-2xl border transition-colors duration-500 flex flex-col justify-between overflow-hidden backface-hidden",
                isHovered
                  ? "border-[#A78BFA]/35 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85),0_0_20px_rgba(139,92,246,0.12)]"
                  : "border-white/[0.14] hover:border-white/25 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.75)]"
              )}
            >
              {/* Magic Bento Internal Spotlight */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-30"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: useTransform(
                    [smoothMouseX, smoothMouseY],
                    ([x, y]) =>
                      `radial-gradient(420px circle at ${x}% ${y}%, rgba(167, 139, 250, 0.12), rgba(109, 40, 217, 0.05) 40%, transparent 70%)`
                  ),
                }}
              />

              {/* Top Edge Specular Highlight */}
              <div
                className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-30"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 30%, rgba(167, 139, 250, 0.4) 50%, rgba(255, 255, 255, 0.25) 70%, transparent 100%)",
                }}
              />

              {/* ── TOP IMAGE / DIAGRAM AREA (~40% of height) ─────────────────── */}
              <div className="relative w-full h-[150px] sm:h-[180px] lg:h-[190px] border-b border-white/[0.10] overflow-hidden rounded-t-2xl">
                <ProjectVisual
                  id={project.id}
                  imageUrl={project.imageUrl}
                  title={project.title}
                  isHovered={isHovered}
                />

                {/* Top-Left: Project Number Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20">
                  <span className="px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#CBD5E1] bg-black/75 backdrop-blur-md rounded-md border border-white/15 shadow-sm">
                    {projectNum}
                  </span>
                </div>

                {/* Bottom-Left: Floating Refined Icon Badge */}
                <div className="absolute bottom-2 left-2.5 sm:bottom-2.5 sm:left-3 z-20 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-[#0f1016]/90 backdrop-blur-md border border-white/[0.12] shadow-[0_4px_12px_rgba(0,0,0,0.3)] group-hover:scale-105 group-hover:border-[#8B5CF6]/40 transition-all">
                  <ProjectIcon name={project.iconName} />
                </div>

                {/* Bottom-Right: Category Badge */}
                {project.categoryBadge && (
                  <div className="absolute bottom-2 right-2.5 sm:bottom-2.5 sm:right-3 z-20">
                    <span className="px-1.5 sm:px-2 py-0.5 text-[7.5px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider text-[#CBD5E1] bg-[#0f1016]/90 backdrop-blur-md rounded border border-white/[0.12]">
                      {project.categoryBadge}
                    </span>
                  </div>
                )}
              </div>

              {/* ── CONTENT AREA (~60% of height) ─────────────────────────────── */}
              <div className="p-4 sm:p-4.5 lg:p-5 flex flex-col flex-grow justify-between relative z-10">
                {/* Title & Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#CBD5E1] group-hover:text-white tracking-tight font-display mb-1.5 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-[12.5px] lg:text-[13px] text-[#94A3B8] leading-relaxed font-sans line-clamp-2 sm:line-clamp-3 mb-2.5 sm:mb-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono rounded bg-white/[0.04] border border-white/[0.10] text-[#CBD5E1] group-hover:border-[#8B5CF6]/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Row */}
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold pt-1 border-t border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    {project.githubUrl === "private" ? (
                      <div className="flex items-center gap-1 text-[11px] text-[#64748B]">
                        <Lock className="w-3 h-3 text-[#64748B]" />
                        <span>Private source</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-[11px] text-[#94A3B8] group-hover:text-white transition-colors">
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
                        className="flex items-center gap-1 text-[11px] font-semibold text-[#A78BFA] hover:text-white transition-colors hover:underline"
                      >
                        <span>Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[11.5px] font-bold text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span>View More</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════════
                BACK FACE OF CARD ("WHAT I BUILT")
               ══════════════════════════════════════════════════════════════════════ */}
            <div
              className={cn(
                "absolute inset-0 w-full h-full rounded-2xl bg-[#0f1016]/85 backdrop-blur-2xl border border-white/[0.14] p-4 sm:p-5 flex flex-col justify-between overflow-hidden backface-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)]",
                isHovered && "border-[#A78BFA]/35"
              )}
              style={{
                transform: "rotateY(180deg)",
              }}
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.10] pb-2 mb-2.5 sm:mb-3">
                  <span className="px-2 py-0.5 text-[9px] sm:text-[9.5px] font-mono font-bold tracking-widest text-[#CBD5E1] bg-white/5 rounded border border-white/10">
                    {projectNum} · WHAT I BUILT
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#64748B]">
                    <RotateCcw className="w-3 h-3" />
                    <span>Return</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-[#CBD5E1] font-display mb-2 sm:mb-2.5">
                  {project.title}
                </h4>

                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-[12.5px] text-[#94A3B8] font-sans leading-relaxed">
                  {project.whatIBuilt?.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A78BFA] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#64748B]">
                  Click to flip back
                </span>
                <span className="text-[10px] font-mono text-[#A78BFA] hover:underline">
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
        className="w-[85%] h-8 mt-1 rounded-full opacity-25 blur-md pointer-events-none transition-all duration-500 group-hover/card:opacity-50 group-hover/card:scale-105"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 75%)",
        }}
      />
    </div>
  );
}

export default memo(ProjectCard3D);
