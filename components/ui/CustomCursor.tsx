"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

const FINE_POINTER = "(pointer: fine)";

function subscribeToPointer(onChange: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function CustomCursor() {
  const { isLightMode } = useTheme();
  const isLightRef = useRef(isLightMode);
  useEffect(() => {
    isLightRef.current = isLightMode;
  }, [isLightMode]);

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
  const appliedLight = useRef<boolean | null>(null);
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
      if (!visible.current) {
        dot.current.x = e.clientX;
        dot.current.y = e.clientY;
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
        setVisible(true);
      }
      idleFrames = 0;
      start();
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest) return;
      isHovering.current = !!target.closest(
        "a, button, [role='button'], input, textarea, select, summary, label, .cursor-pointer, .cursor-crosshair"
      );
    };

    const onPointerLeaveWindow = () => setVisible(false);

    const update = () => {
      const m = mouse.current;
      const d = dot.current;
      const r = ring.current;
      const light = isLightRef.current;

      // 1. Direct instantaneous follow for dot (zero latency)
      d.x = m.x;
      d.y = m.y;

      // 2. High follow-factor for outer ring (tight response + subtle micro-smoothing)
      r.x += (m.x - r.x) * 0.84;
      r.y += (m.y - r.y) * 0.84;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${d.x}px, ${d.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.backgroundColor = light ? "#1e1b4b" : "#ffffff";
        dotRef.current.style.boxShadow = light
          ? "0 0 5px rgba(147, 51, 234, 0.45), 0 0 1px #1e1b4b"
          : "0 0 6px rgba(168, 85, 247, 0.8), 0 0 2px #ffffff";
      }

      if (ringRef.current) {
        const hovering = isHovering.current;
        const scale = hovering ? 1.35 : 1.0;
        ringRef.current.style.transform = `translate3d(${r.x.toFixed(2)}px, ${r.y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale})`;

        if (appliedHover.current !== hovering || appliedLight.current !== light) {
          appliedHover.current = hovering;
          appliedLight.current = light;

          if (light) {
            ringRef.current.style.borderColor = hovering
              ? "rgba(147, 51, 234, 0.75)"
              : "rgba(147, 51, 234, 0.35)";
            ringRef.current.style.backgroundColor = hovering
              ? "rgba(147, 51, 234, 0.10)"
              : "rgba(147, 51, 234, 0.03)";
            ringRef.current.style.boxShadow = hovering
              ? "0 0 12px rgba(147, 51, 234, 0.4)"
              : "0 0 6px rgba(147, 51, 234, 0.15)";
          } else {
            // Dark mode (visible white / purple glow ring)
            ringRef.current.style.borderColor = hovering
              ? "rgba(168, 85, 247, 0.9)"
              : "rgba(255, 255, 255, 0.35)";
            ringRef.current.style.backgroundColor = hovering
              ? "rgba(168, 85, 247, 0.15)"
              : "rgba(255, 255, 255, 0.04)";
            ringRef.current.style.boxShadow = hovering
              ? "0 0 14px rgba(168, 85, 247, 0.65)"
              : "0 0 8px rgba(255, 255, 255, 0.2)";
          }
        }
      }

      const settled =
        Math.abs(m.x - r.x) < 0.05 &&
        Math.abs(m.y - r.y) < 0.05 &&
        Math.abs(m.x - d.x) < 0.05 &&
        Math.abs(m.y - d.y) < 0.05;

      if (settled && ++idleFrames > 5) {
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
      {/* Outer Ring: NO CSS transform transition to eliminate double lag */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          opacity: 0,
        }}
        className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[99999] backdrop-blur-[1px] transition-[background-color,border-color,box-shadow,opacity] duration-150 ease-out will-change-transform border-[1.5px]"
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          opacity: 0,
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[99999] will-change-transform transition-opacity duration-150"
      />
    </>
  );
}
