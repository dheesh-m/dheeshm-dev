"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function NavbarGhostCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Velocity-reactive trail spring physics
  const springConfig = { stiffness: 220, damping: 26, mass: 0.18 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Trail lag node
  const trailSpringConfig = { stiffness: 140, damping: 22, mass: 0.28 };
  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const header = containerRef.current?.parentElement;
    if (!header) return;
    const rect = header.getBoundingClientRect();

    // Check if pointer is within or near the navbar region (with 20px padding)
    if (
      e.clientX >= rect.left - 20 &&
      e.clientX <= rect.right + 20 &&
      e.clientY >= rect.top - 15 &&
      e.clientY <= rect.bottom + 25
    ) {
      setIsHovered(true);
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      mouseX.set(relX);
      mouseY.set(relY);
    } else {
      setIsHovered(false);
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 rounded-full pointer-events-none overflow-hidden z-0"
    >
      {/* ── 1. Diffuse Trailing Smoke Cloud (Secondary Violet #8B5CF6 / #6D4AFF) ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          width: 220,
          height: 120,
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovered ? 0.45 : 0,
          background: "radial-gradient(ellipse at center, rgba(109, 74, 255, 0.18) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 75%)",
          filter: "blur(24px)",
        }}
      />

      {/* ── 2. Primary Ghost Cursor Aura (#6D4AFF at low opacity + subtle #A78BFA highlight) ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          width: 140,
          height: 80,
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovered ? 0.65 : 0,
          background: "radial-gradient(circle at center, rgba(167, 139, 250, 0.22) 0%, rgba(109, 74, 255, 0.14) 35%, rgba(109, 74, 255, 0.04) 60%, transparent 80%)",
          filter: "blur(14px)",
        }}
      />
    </div>
  );
}

export default memo(NavbarGhostCursor);
