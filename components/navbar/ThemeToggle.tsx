"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { isLightMode, toggleTheme } = useTheme();
  
  // Track currently illuminated lights during sequence (0 to 5)
  const [litCount, setLitCount] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all pending timeouts safely
  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // Execute Theme Toggle with Origin coordinates for View Transition radial wipe
  const triggerThemeChange = useCallback(() => {
    if (!buttonRef.current) {
      toggleTheme();
      return;
    }
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, typeof window !== "undefined" ? window.innerWidth - x : 1000),
      Math.max(y, typeof window !== "undefined" ? window.innerHeight - y : 1000)
    );
    toggleTheme({ x, y, maxRadius });
  }, [toggleTheme]);

  const handleToggle = useCallback(() => {
    // Prevent overlapping clicks / duplicate timers during active sequence
    if (isAnimating) return;

    clearAllTimers();
    setIsAnimating(true);
    setLitCount(0);

    if (!isLightMode) {
      // ════════════════════════════════════════════════════════════
      // SEQUENCE 1: DARK MODE → LIGHT MODE (Fast, Snappy F1 Sequence)
      // ════════════════════════════════════════════════════════════
      
      // Phase 1: 5 Red Lights Illuminate Sequentially (~190ms per light)
      const t1 = setTimeout(() => setLitCount(1), 30);
      const t2 = setTimeout(() => setLitCount(2), 220);
      const t3 = setTimeout(() => setLitCount(3), 410);
      const t4 = setTimeout(() => setLitCount(4), 600);
      const t5 = setTimeout(() => setLitCount(5), 790);
      timersRef.current.push(t1, t2, t3, t4, t5);

      // Phase 2: Programmatic Random Pause between 200ms and 500ms
      const randomPause = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
      const lightsOutTime = 790 + randomPause;

      // Phase 3: Lights Out (All 5 Red Lights Turn Off Simultaneously)
      const tLightsOut = setTimeout(() => {
        setLitCount(0); // Instant simultaneous shutoff
        triggerThemeChange();
        
        // Unlock toggle shortly after transition starts
        const tUnlock = setTimeout(() => {
          setIsAnimating(false);
        }, 120);
        timersRef.current.push(tUnlock);
      }, lightsOutTime);

      timersRef.current.push(tLightsOut);
    } else {
      // ════════════════════════════════════════════════════════════
      // SEQUENCE 2: LIGHT MODE → DARK MODE (Reverse Direction)
      // ════════════════════════════════════════════════════════════
      
      // Fast sequential illumination of steel-white lights (~190ms per light)
      const t1 = setTimeout(() => setLitCount(1), 30);
      const t2 = setTimeout(() => setLitCount(2), 220);
      const t3 = setTimeout(() => setLitCount(3), 410);
      const t4 = setTimeout(() => setLitCount(4), 600);
      const t5 = setTimeout(() => setLitCount(5), 790);
      timersRef.current.push(t1, t2, t3, t4, t5);

      // Programmatic Random Pause between 200ms and 500ms
      const randomPause = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
      const lightsOutTime = 790 + randomPause;

      // Phase 3: Lights Out (All 5 Lights Turn Off Simultaneously)
      const tLightsOut = setTimeout(() => {
        setLitCount(0); // All lights out simultaneously
        triggerThemeChange();
        
        const tUnlock = setTimeout(() => {
          setIsAnimating(false);
        }, 120);
        timersRef.current.push(tUnlock);
      }, lightsOutTime);

      timersRef.current.push(tLightsOut);
    }
  }, [isAnimating, isLightMode, clearAllTimers, triggerThemeChange]);

  // Keyboard accessibility handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="relative group/toggle flex items-center justify-center select-none">
      <button
        ref={buttonRef}
        type="button"
        role="switch"
        aria-checked={isLightMode}
        aria-label={
          isLightMode
            ? "F1 Starting Lights: Switch to Dark Mode"
            : "F1 Starting Lights: Switch to Light Mode"
        }
        disabled={isAnimating}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex items-center justify-between gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2",
          isLightMode
            ? "bg-[#FFFFFF] border border-black/15 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.06)] focus-visible:ring-black/40 hover:border-black/30"
            : "bg-[#090C15] border border-white/15 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.6)] focus-visible:ring-[#950606]/60 hover:border-white/30",
          isAnimating && "cursor-wait"
        )}
      >
        {/* Subtle metallic bezel rim */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {[0, 1, 2, 3, 4].map((index) => {
            const isLit = index < litCount;
            const isLastLight = index === 4;

            return (
              <span
                key={index}
                className={cn(
                  "relative block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-150",
                  // ── INACTIVE STATES ──
                  !isLit &&
                    (isLightMode
                      ? isLastLight && !isAnimating
                        // In light mode idle: 5th light shows subtle steel-blue active indicator
                        ? "bg-[#394E6E] border border-[#394E6E]/60 shadow-[0_0_5px_rgba(57,78,110,0.5)]"
                        : "bg-[#CBD5E1] border border-black/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]"
                      : isLastLight && !isAnimating
                        // In dark mode idle: 5th light shows subtle red ready indicator
                        ? "bg-[#950606] border border-[#B91C1C]/60 shadow-[0_0_6px_rgba(149,6,6,0.7)]"
                        : "bg-[#161822] border border-white/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"),
                  // ── ACTIVE ILLUMINATED STATES (DURING F1 SEQUENCE) ──
                  isLit &&
                    (!isLightMode
                      // Dark → Light: Deep Racing Green lights (dark, refined, slightly luminous)
                      ? "bg-[#14532D] border border-[#22C55E]/60 shadow-[0_0_8px_#166534,0_0_14px_rgba(22,101,52,0.7)] scale-105"
                      // Light → Dark: Clean Steel-Blue / Ice-White Lights
                      : "bg-[#394E6E] border border-[#93C5FD] shadow-[0_0_8px_rgba(57,78,110,0.7),0_0_12px_rgba(147,197,253,0.5)] scale-105")
                )}
              >
                {/* Tiny high-precision optical lens highlight */}
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full pointer-events-none transition-opacity",
                    isLit ? "bg-white opacity-90" : "bg-white/30 opacity-40"
                  )}
                />
              </span>
            );
          })}
        </div>
      </button>

      {/* Small hover tooltip indicator */}
      <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover/toggle:opacity-100 group-hover/toggle:translate-y-0 translate-y-1 transition-all duration-200 z-50 whitespace-nowrap">
        <div className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/95 dark:bg-[#090C15]/95 text-[#111111] dark:text-white border border-black/10 dark:border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.15)] backdrop-blur-md">
          {isAnimating
            ? "F1 STARTING SEQUENCE..."
            : isLightMode
            ? "SWITCH TO DARK MODE"
            : "F1 LIGHTS • SWITCH TO LIGHT"}
        </div>
      </div>
    </div>
  );
}
