"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

import DecryptedText from "./DecryptedText";

interface PortfolioLoaderProps {
  onStartExit?: () => void;
}

export default function PortfolioLoader({ onStartExit }: PortfolioLoaderProps) {
  const { isLightMode } = useTheme();
  const [mounted, setMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const startAnimation = useCallback(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const startTime = performance.now();
    // Timing milestones: snappy, sleek 1.0s entrance
    const tPhase1 = 450; // 0% -> 86% in 450ms
    const tPhase2 = 750; // 86% -> 96% in 300ms
    const tPhase3 = 950; // 96% -> 100% in 200ms

    let currentPercent = 0;
    let rafId: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;

      if (elapsed < tPhase1) {
        // Phase 1: 0 -> 86 (Deliberate Ease-Out)
        const p = elapsed / tPhase1;
        const easeOut = 1 - Math.pow(1 - p, 2.0);
        currentPercent = Math.min(86, Math.round(easeOut * 86));
      } else if (elapsed < tPhase2) {
        // Phase 2: 86 -> 96 (Slower Deliberate Transition)
        const p = (elapsed - tPhase1) / (tPhase2 - tPhase1);
        currentPercent = Math.min(96, Math.round(86 + p * 10));
      } else if (elapsed < tPhase3) {
        // Phase 3: 96 -> 100 (Final Lock-in)
        const p = (elapsed - tPhase2) / (tPhase3 - tPhase2);
        currentPercent = Math.min(100, Math.round(96 + p * 4));
      } else {
        currentPercent = 100;
      }

      if (percentTextRef.current) {
        percentTextRef.current.textContent = `${currentPercent}%`;
      }

      if (currentPercent < 100) {
        rafId = requestAnimationFrame(updateProgress);
      } else {
        // Trigger Exit Transition after brief pause at 100%
        setTimeout(() => {
          setIsExiting(true);
          onStartExit?.();

          // Full unmount after transition completes
          const exitDuration = prefersReducedMotion ? 300 : 800;
          setTimeout(() => {
            setMounted(false);
          }, exitDuration);
        }, 220);
      }
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onStartExit]);

  useEffect(() => {
    const cleanup = startAnimation();
    return cleanup;
  }, [startAnimation]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isExiting
          ? "opacity-0 pointer-events-none backdrop-blur-none"
          : "opacity-100"
      }`}
      style={{
        backgroundColor: isLightMode ? "#FAFAFA" : "#050508",
        backgroundImage: isLightMode
          ? "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.06) 0%, rgba(250,250,250,1) 75%)"
          : "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.09) 0%, rgba(5,5,8,1) 75%)",
      }}
    >
      <div
        ref={contentRef}
        className={`flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isExiting
            ? "scale-[1.08] blur-[8px] opacity-0"
            : "scale-100 blur-none opacity-100"
        }`}
      >
        {/* Main Logo / Title with DecryptedText effect */}
        <h1
          className={`font-sans text-[clamp(2.5rem,8vw,5.5rem)] font-light tracking-[0.08em] leading-none text-center ${
            isLightMode
              ? "text-[#0F172A]"
              : "text-[#F8FAFC] drop-shadow-[0_0_30px_rgba(255,255,255,0.18)]"
          }`}
        >
          <DecryptedText
            text="dhees_h"
            animateOn="view"
            speed={95}
            maxIterations={20}
            sequential={true}
            revealDirection="start"
            className={
              isLightMode
                ? "text-[#0F172A]"
                : "text-[#F8FAFC] drop-shadow-[0_0_30px_rgba(255,255,255,0.18)]"
            }
            encryptedClassName="text-red-500 dark:text-red-400 font-mono opacity-90"
          />
        </h1>

        {/* Dynamic Percentage */}
        <span
          ref={percentTextRef}
          className={`font-mono text-xs sm:text-sm font-medium tracking-[0.25em] mt-3.5 sm:mt-4 transition-colors duration-300 ${
            isLightMode ? "text-slate-500" : "text-zinc-400"
          }`}
        >
          0%
        </span>
      </div>
    </div>
  );
}
