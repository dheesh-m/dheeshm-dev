"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "framer-motion";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect OS prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // On mobile touch devices, preserve native high-performance touch response
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      return;
    }

    // High-performance smooth scroll synced with Framer Motion's animation frame pipeline
    const lenis = new Lenis({
      duration: 0.8, // Faster, snappier acceleration and smooth settle
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.4, // Faster travel per wheel notch for agile, effortless navigation
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    let isScrollingTimer: ReturnType<typeof setTimeout>;
    lenis.on("scroll", () => {
      (window as any).__isScrolling = true;
      clearTimeout(isScrollingTimer);
      isScrollingTimer = setTimeout(() => {
        (window as any).__isScrolling = false;
      }, 100);
    });

    // Synchronize Lenis raf directly into Framer Motion's frame update pipeline
    function update(time: { timestamp: number }) {
      lenis.raf(time.timestamp);
    }

    frame.update(update, true);

    return () => {
      clearTimeout(isScrollingTimer);
      cancelFrame(update);
      lenis.destroy();
      delete (window as any).__lenis;
      delete (window as any).__isScrolling;
    };
  }, []);

  return <>{children}</>;
}
