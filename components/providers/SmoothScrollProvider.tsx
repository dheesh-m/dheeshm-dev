"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

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

    // On mobile touch devices, preserve 100% native compositor scrolling for instant touch response
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      return;
    }

    // High-precision smooth glide with exponential decay
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Snappy response with luxurious glide
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
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
      }, 150);
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      clearTimeout(isScrollingTimer);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).__lenis;
      delete (window as any).__isScrolling;
    };
  }, []);

  return <>{children}</>;
}
