"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "./GooeyNavEffect.css";

interface GooeyNavEffectProps {
  navRef: React.RefObject<HTMLElement | null>;
  activeLabel: string;
  isLightMode: boolean;
  isScrolled: boolean;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  animationTime?: number;
  timeVariance?: number;
  emissionDelay?: number;
}

export default function GooeyNavEffect({
  navRef,
  activeLabel,
  isLightMode,
  isScrolled,
  particleCount = 14,
  particleDistances = [90, 18],
  particleR = 120,
  animationTime = 550,
  timeVariance = 250,
  emissionDelay = 50,
}: GooeyNavEffectProps) {
  const emitterRef = useRef<HTMLSpanElement>(null);
  const emissionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [pillRect, setPillRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const isInitialMount = useRef(true);
  const prevActiveRef = useRef(activeLabel);

  // Light Mode: Lighter shade of steel blue; Dark Mode: Pure White
  const blobColor = isLightMode ? "#4A6984" : "#FFFFFF";

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    const rotate = noise(r / 10);

    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(8), particleCount - i, particleCount),
      time: t,
      scale: 1.05 + noise(0.25),
      color: blobColor,
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = useCallback(
    (element: HTMLElement) => {
      const d = particleDistances;
      const r = particleR;
      const bubbleTime = animationTime * 2 + timeVariance;
      element.style.setProperty("--time", `${bubbleTime}ms`);

      // Clear any remaining particles
      const existingParticles = element.querySelectorAll(".gooey-particle");
      existingParticles.forEach((p) => {
        try {
          element.removeChild(p);
        } catch {
          // ignore
        }
      });

      for (let i = 0; i < particleCount; i++) {
        const t = animationTime + noise(timeVariance);
        const p = createParticle(i, t, d, r);

        setTimeout(() => {
          if (!element) return;
          const particle = document.createElement("span");
          const point = document.createElement("span");
          particle.className = "gooey-particle";
          particle.style.setProperty("--start-x", `${p.start[0]}px`);
          particle.style.setProperty("--start-y", `${p.start[1]}px`);
          particle.style.setProperty("--end-x", `${p.end[0]}px`);
          particle.style.setProperty("--end-y", `${p.end[1]}px`);
          particle.style.setProperty("--time", `${p.time}ms`);
          particle.style.setProperty("--scale", `${p.scale}`);
          particle.style.setProperty("--rotate", `${p.rotate}deg`);

          point.className = "gooey-point";
          point.style.setProperty("--particle-color", p.color);
          point.style.setProperty("--time", `${p.time}ms`);
          point.style.setProperty("--scale", `${p.scale}`);

          particle.appendChild(point);
          element.appendChild(particle);

          setTimeout(() => {
            try {
              if (particle.parentElement === element) {
                element.removeChild(particle);
              }
            } catch {
              // ignore
            }
          }, t);
        }, 15);
      }
    },
    [particleCount, particleDistances, particleR, animationTime, timeVariance, blobColor]
  );

  const updatePosition = useCallback(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const targetEl =
      nav.querySelector<HTMLElement>(`a[data-label="${activeLabel}"]`) ||
      nav.querySelector<HTMLElement>('a[aria-current="true"]');

    if (targetEl) {
      const navBox = nav.getBoundingClientRect();
      const itemBox = targetEl.getBoundingClientRect();

      const newX = itemBox.left - navBox.left;
      const newY = itemBox.top - navBox.top;
      const newW = itemBox.width;
      const newH = itemBox.height;

      setPillRect({
        x: newX,
        y: newY,
        width: newW,
        height: newH,
        visible: true,
      });
    }
  }, [navRef, activeLabel]);

  // Position tracking and resize observation
  useEffect(() => {
    updatePosition();

    if (!navRef.current) return;
    const observer = new ResizeObserver(() => {
      updatePosition();
    });

    observer.observe(navRef.current);
    window.addEventListener("resize", updatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
    };
  }, [updatePosition, activeLabel, isScrolled]);

  // Particle emission on active label change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevActiveRef.current = activeLabel;
      return;
    }

    if (prevActiveRef.current !== activeLabel) {
      prevActiveRef.current = activeLabel;

      if (emissionTimerRef.current) {
        clearTimeout(emissionTimerRef.current);
      }

      emissionTimerRef.current = setTimeout(() => {
        if (emitterRef.current) {
          makeParticles(emitterRef.current);
        }
      }, emissionDelay);
    }

    return () => {
      if (emissionTimerRef.current) {
        clearTimeout(emissionTimerRef.current);
      }
    };
  }, [activeLabel, makeParticles, emissionDelay]);

  return (
    <>
      {/* SVG Gooey Filter Definition with clean thresholding */}
      <svg
        className="absolute w-0 h-0 pointer-events-none opacity-0"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="gooey-nav-filter"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Layering directly behind navigation text */}
      <div className="gooey-nav-layer" aria-hidden="true">
        <div className="gooey-filter-wrapper">
          {/* Gooey morphing active pill */}
          <div
            className="gooey-pill-indicator"
            style={{
              transform: `translate3d(${pillRect.x}px, ${pillRect.y}px, 0)`,
              width: `${pillRect.width}px`,
              height: `${pillRect.height}px`,
              opacity: pillRect.visible ? 1 : 0,
              backgroundColor: blobColor,
              boxShadow: isLightMode
                ? "0 2px 10px rgba(74, 105, 132, 0.28)"
                : "0 2px 12px rgba(255, 255, 255, 0.35)",
            }}
          />

          {/* Particle Emitter tied to the active pill position */}
          <span
            ref={emitterRef}
            className="gooey-particle-emitter"
            style={{
              transform: `translate3d(${pillRect.x}px, ${pillRect.y}px, 0)`,
              width: `${pillRect.width}px`,
              height: `${pillRect.height}px`,
            }}
          />
        </div>
      </div>
    </>
  );
}
