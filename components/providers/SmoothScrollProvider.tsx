"use client";

/**
 * SmoothScrollProvider — Lenis-based buttery scroll.
 *
 * Lenis is the same engine used by Vercel, Linear, Framer, and dozens of
 * award-winning sites. It intercepts native scroll, applies exponential easing,
 * and synchronises with framer-motion's scroll progress values so parallax
 * and scroll-linked animations feel identical to before.
 *
 * Reduced-motion users: Lenis is configured with `duration: 0` when
 * `prefers-reduced-motion: reduce` is detected, keeping scroll instant.
 */

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Respect OS reduced-motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      // Vercel uses ~1.2–1.4 duration with the default exponential ease
      duration: prefersReduced ? 0 : 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // touchMultiplier: 1 — keep native on touch so iOS rubber-band works
      touchMultiplier: prefersReduced ? 0 : 1,
      wheelMultiplier: 1,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // RAF loop — Lenis needs to be ticked every frame
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    // Expose to window so framer-motion scroll hooks can read the real position
    // (framer-motion's useScroll uses native scrollY, which Lenis syncs)
    (window as any).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
}
