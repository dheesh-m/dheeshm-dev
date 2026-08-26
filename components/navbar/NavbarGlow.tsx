"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Cursor-following glow for the navbar pill.
 *
 * Listens on its own parent rather than `window`, and drives everything through
 * MotionValues, so pointer movement causes no React re-renders and the element
 * is measured on enter/resize instead of on every event.
 */
export default function NavbarGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const background = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.06), transparent 70%)`;

  useEffect(() => {
    const el = containerRef.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    // Coarse pointers never hover; skip the listeners entirely on touch.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let rect: DOMRect | null = null;

    const measure = () => {
      rect = host.getBoundingClientRect();
    };

    const handleEnter = () => {
      measure();
      opacity.set(1);
    };

    const handleMove = (event: PointerEvent) => {
      if (!rect) measure();
      if (!rect) return;
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    };

    const handleLeave = () => {
      opacity.set(0);
      rect = null;
    };

    host.addEventListener("pointerenter", handleEnter);
    host.addEventListener("pointermove", handleMove, { passive: true });
    host.addEventListener("pointerleave", handleLeave);
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      host.removeEventListener("pointerenter", handleEnter);
      host.removeEventListener("pointermove", handleMove);
      host.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("resize", measure);
    };
  }, [mouseX, mouseY, opacity]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden rounded-[20px] pointer-events-none z-0"
    >
      <motion.div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background, opacity }}
      />
    </div>
  );
}
