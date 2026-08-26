"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

const RING_IDLE_BORDER = "rgba(147, 51, 234, 0.75)";
const RING_IDLE_BG = "rgba(255, 255, 255, 0.12)";
const RING_IDLE_SHADOW = "0 0 10px rgba(168, 85, 247, 0.6), 0 0 22px rgba(147, 51, 234, 0.35), inset 0 0 8px rgba(168, 85, 247, 0.25)";

const RING_HOVER_BORDER = "rgba(192, 132, 252, 0.95)";
const RING_HOVER_BG = "rgba(168, 85, 247, 0.22)";
const RING_HOVER_SHADOW = "0 0 16px rgba(192, 132, 252, 0.9), 0 0 32px rgba(168, 85, 247, 0.6), inset 0 0 12px rgba(192, 132, 252, 0.4)";

const FINE_POINTER = "(pointer: fine)";

function subscribeToPointer(onChange: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribeToPointer,
    useCallback(() => window.matchMedia(FINE_POINTER).matches, []),
    useCallback(() => false, [])
  );

  const frameRef = useRef(0);
  const mouse = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const appliedHover = useRef<boolean | null>(null);
  const visible = useRef(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    return () => root.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    let idleFrames = 0;

    const setVisible = (next: boolean) => {
      if (visible.current === next) return;
      visible.current = next;
      const opacity = next ? "1" : "0";
      if (dotRef.current) dotRef.current.style.opacity = opacity;
      if (ringRef.current) ringRef.current.style.opacity = opacity;
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setVisible(true);
      idleFrames = 0;
      start();
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest) return;
      isHovering.current = !!target.closest(
        "a, button, [role='button'], input, textarea, select, summary, label"
      );
    };

    const onPointerLeaveWindow = () => setVisible(false);

    const update = () => {
      const m = mouse.current;
      const d = dot.current;
      const r = ring.current;

      // Direct follow for dot = immediate zero-lag response
      d.x += (m.x - d.x) * 0.95;
      d.y += (m.y - d.y) * 0.95;
      // Snappy smooth follow for outer ring
      r.x += (m.x - r.x) * 0.45;
      r.y += (m.y - r.y) * 0.45;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${d.x}px, ${d.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        const hovering = isHovering.current;
        const scale = hovering ? 1.4 : 1;
        ringRef.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0) translate(-50%, -50%) scale(${scale})`;

        if (appliedHover.current !== hovering) {
          appliedHover.current = hovering;
          ringRef.current.style.borderColor = hovering
            ? RING_HOVER_BORDER
            : RING_IDLE_BORDER;
          ringRef.current.style.backgroundColor = hovering
            ? RING_HOVER_BG
            : RING_IDLE_BG;
          ringRef.current.style.boxShadow = hovering
            ? RING_HOVER_SHADOW
            : RING_IDLE_SHADOW;
        }
      }

      const settled =
        Math.abs(m.x - r.x) < 0.1 &&
        Math.abs(m.y - r.y) < 0.1 &&
        Math.abs(m.x - d.x) < 0.1 &&
        Math.abs(m.y - d.y) < 0.1;

      if (settled && ++idleFrames > 8) {
        frameRef.current = 0;
        return;
      }

      frameRef.current = requestAnimationFrame(update);
    };

    const start = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerleave", onPointerLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerleave", onPointerLeaveWindow);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer Ring: neon purple aura + dark charcoal/black border */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          opacity: 0,
          border: `1.5px solid ${RING_IDLE_BORDER}`,
          backgroundColor: RING_IDLE_BG,
          boxShadow: RING_IDLE_SHADOW,
        }}
        className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[99999] backdrop-blur-[1px] transition-[background-color,border-color,box-shadow,opacity,transform] duration-200 ease-out will-change-transform"
      />
      {/* Inner Dot: electric neon purple (#A855F7) + intense multi-layer neon glow */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          opacity: 0,
          backgroundColor: "#C084FC",
          boxShadow: "0 0 6px #C084FC, 0 0 12px #A855F7, 0 0 20px #9333EA, 0 0 32px rgba(147, 51, 234, 0.85)",
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[99999] will-change-transform transition-opacity duration-200"
      />
    </>
  );
}
