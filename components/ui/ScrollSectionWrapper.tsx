"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

interface ScrollSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function ScrollSectionWrapper({
  children,
  className = "",
  id,
  isFirst = false,
  isLast = false,
}: ScrollSectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isFirst
      ? ["start start", "end start"]
      : isLast
      ? ["start end", "end end"]
      : ["start end", "end start"],
  });

  // ── Physics-Based Spring Smoothing (Eliminates mouse-wheel stepping & jitter) ──
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.1,
    restDelta: 0.001,
  });

  // ── First Section (Hero) ──────────────────────────────────────────────────
  // Smoothly shrinks: scale 1.00 -> 0.86, opacity 1.00 -> 0, translateY 0 -> -80px
  const heroY = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 0.85, 1],
    [0, -15, -38, -62, -80]
  );
  const heroScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 0.85, 1],
    [1.0, 0.97, 0.93, 0.89, 0.86]
  );
  const heroOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 0.85, 1],
    [1.0, 0.85, 0.6, 0.28, 0]
  );

  // ── Intermediate Sections ────────────────────────────────────────────────
  // Incoming: translateY: 50px -> 0, scale: 0.94 -> 1.00, opacity: 0 -> 1
  // Outgoing: translateY: 0 -> -80px, scale: 1.00 -> 0.86, opacity: 1 -> 0
  const normalY = useTransform(
    smoothProgress,
    [0, 0.16, 0.3, 0.55, 0.72, 0.86, 1],
    [50, 20, 0, 0, -22, -52, -80]
  );
  const normalScale = useTransform(
    smoothProgress,
    [0, 0.16, 0.3, 0.55, 0.72, 0.86, 1],
    [0.94, 0.97, 1.0, 1.0, 0.96, 0.91, 0.86]
  );
  const normalOpacity = useTransform(
    smoothProgress,
    [0, 0.16, 0.3, 0.55, 0.72, 0.86, 1],
    [0, 0.62, 1.0, 1.0, 0.8, 0.42, 0]
  );

  // ── Final Section (Contact) ──────────────────────────────────────────────
  // Enters smoothly and stays settled at document end
  const lastY = useTransform(
    smoothProgress,
    [0, 0.25, 0.65, 1],
    [50, 20, 0, 0]
  );
  const lastScale = useTransform(
    smoothProgress,
    [0, 0.25, 0.65, 1],
    [0.94, 0.97, 1.0, 1.0]
  );
  const lastOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.6, 1],
    [0, 0.55, 1.0, 1.0]
  );

  const y = prefersReduced ? 0 : isFirst ? heroY : isLast ? lastY : normalY;
  const scale = prefersReduced ? 1 : isFirst ? heroScale : isLast ? lastScale : normalScale;
  const opacity = prefersReduced ? 1 : isFirst ? heroOpacity : isLast ? lastOpacity : normalOpacity;

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{
        y,
        scale,
        opacity,
        transformOrigin: "center 25%",
        willChange: "transform, opacity",
      }}
      className={`relative w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
