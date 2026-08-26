"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

export interface ThemeBurstTriggerOptions {
  x: number;
  y: number;
  maxRadius: number;
  toLight: boolean;
  starElement?: SVGElement | HTMLElement | null;
  duration?: number;
}

export interface ThemeBurstTriggerRef {
  trigger: (options: ThemeBurstTriggerOptions) => void;
}

// Particle physics interface with real momentum & drag
interface PhysicsParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  drag: number;
  turbulenceX: number;
  turbulenceY: number;
  size: number;
  length: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

// Inward gravitational accretion filament interface
interface AccretionFilament {
  angle: number;
  initialDist: number;
  length: number;
  color: string;
}

// Exact Cubic Bézier curve evaluator: cubic-bezier(0.22, 1, 0.36, 1)
function createBezier(x1: number, y1: number, x2: number, y2: number) {
  return function (t: number): number {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let u = t;
    for (let i = 0; i < 8; i++) {
      const currentX = 3 * (1 - u) * (1 - u) * u * x1 + 3 * (1 - u) * u * u * x2 + u * u * u;
      const dx = 3 * (1 - u) * (1 - u) * x1 + 6 * (1 - u) * u * (x2 - x1) + 3 * u * u * (1 - x2);
      if (Math.abs(currentX - t) < 0.0001 || dx === 0) break;
      u -= (currentX - t) / dx;
      u = Math.max(0, Math.min(1, u));
    }
    return 3 * (1 - u) * (1 - u) * u * y1 + 3 * (1 - u) * u * u * y2 + u * u * u;
  };
}

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

const easeCosmic = createBezier(0.22, 1, 0.36, 1);

const ThemeRadialBurstOverlay = forwardRef<ThemeBurstTriggerRef, {}>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    trigger: ({ x, y, maxRadius, toLight, starElement, duration = 850 }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Exact pixel ratio and screen alignment
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      // =====================================================================
      // 1. PROCEDURAL PHYSICS GENERATION (Centered exactly at star x, y)
      // =====================================================================
      // Inward accretion filaments (0 - 100ms)
      const accretionCount = prefersReduced ? 4 : 10;
      const filaments: AccretionFilament[] = [];
      for (let i = 0; i < accretionCount; i++) {
        filaments.push({
          angle: (i / accretionCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4,
          initialDist: 24 + Math.random() * 20,
          length: 5 + Math.random() * 7,
          color: Math.random() > 0.35 ? "#BFE9FF" : "#1976FF",
        });
      }

      // Relativistic plasma particles (100ms+)
      const particleCount = prefersReduced ? 8 : 28;
      const particles: PhysicsParticle[] = [];
      const plasmaColors = [
        "#FFFFFF",
        "#BFE9FF",
        "#4DB8FF",
        "#1976FF",
        "#93C5FD",
        "#E0F2FE",
        "#FFD3A5",
      ];

      for (let i = 0; i < particleCount; i++) {
        const baseAngle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        const speed = 110 + Math.random() * 260; // Relativistic ejection velocity
        particles.push({
          x,
          y,
          vx: Math.cos(baseAngle) * speed,
          vy: Math.sin(baseAngle) * speed,
          drag: 0.91 + Math.random() * 0.03, // Drag friction
          turbulenceX: (Math.random() - 0.5) * 40,
          turbulenceY: (Math.random() - 0.5) * 40,
          size: 1.3 + Math.random() * 1.7,
          length: 4 + Math.random() * 9,
          alpha: 1,
          life: 0,
          maxLife: 0.35 + Math.random() * 0.35,
          color: plasmaColors[Math.floor(Math.random() * plasmaColors.length)],
        });
      }

      // 4 Relativistic continuous shockwave bands that ride the exact theme reveal boundary
      const totalDurationSec = duration / 1000;
      const shockwaveBands = [
        {
          start: 0.08,
          duration: totalDurationSec - 0.08,
          speedMult: 1.05,
          color: "#FFFFFF",
          glowColor: "#BFE9FF",
          strokeWidth: 2.5,
          glowBlur: 16,
          maxAlpha: 0.95,
          harmonics: { f1: 5, a1: 3.5, f2: 8, a2: 2.0 },
        },
        {
          start: 0.10,
          duration: totalDurationSec - 0.10,
          speedMult: 1.0,
          color: "#4DB8FF",
          glowColor: "#1976FF",
          strokeWidth: 3.5,
          glowBlur: 20,
          maxAlpha: 0.9,
          harmonics: { f1: 4, a1: 4.5, f2: 7, a2: 2.5 },
        },
        {
          start: 0.13,
          duration: totalDurationSec - 0.13,
          speedMult: 0.92,
          color: "#1976FF",
          glowColor: "#0D47A1",
          strokeWidth: 4.0,
          glowBlur: 24,
          maxAlpha: 0.75,
          harmonics: { f1: 3, a1: 5.5, f2: 6, a2: 3.0 },
        },
        {
          start: 0.17,
          duration: totalDurationSec - 0.17,
          speedMult: 0.82,
          color: "rgba(139, 92, 246, 0.85)", // Faint violet-blue magnetic halo
          glowColor: "#1976FF",
          strokeWidth: 5.0,
          glowBlur: 28,
          maxAlpha: 0.6,
          harmonics: { f1: 3, a1: 6.5, f2: 5, a2: 3.8 },
        },
      ];

      // =====================================================================
      // 2. UNIFIED CONTINUOUS TIME LOOP WITH DELTA TIME (60-120 FPS)
      // =====================================================================
      const startTime = performance.now();
      let lastTimestamp = startTime;

      const render = (now: number) => {
        const dt = Math.min(0.033, (now - lastTimestamp) / 1000);
        lastTimestamp = now;

        const elapsedSec = (now - startTime) / 1000;
        const progress = Math.min(1, elapsedSec / totalDurationSec);

        // Clear canvas buffer cleanly
        ctx.clearRect(0, 0, width, height);

        // -------------------------------------------------------------------
        // STAGE A: Smooth Physical Star GPU Motion (0ms -> 380ms)
        // -------------------------------------------------------------------
        if (starElement) {
          if (elapsedSec < 0.10) {
            // Gravitational compression (0 - 100ms): 1.0 -> 0.68
            const colP = elapsedSec / 0.10;
            const easeCol = 0.5 * (1 - Math.cos(colP * Math.PI));
            const starScale = 1.0 - 0.32 * easeCol;
            const blueGlow = colP * 12;
            starElement.style.transform = `scale(${starScale.toFixed(4)})`;
            starElement.style.filter = `drop-shadow(0 0 ${blueGlow.toFixed(1)}px #1976FF) brightness(${(1 + 1.2 * colP).toFixed(2)})`;
          } else if (elapsedSec < 0.38) {
            // Explosive spring rebound (100ms - 380ms): 0.68 -> 1.35 -> 1.0
            const rebP = (elapsedSec - 0.10) / 0.28;
            const spring = Math.sin(rebP * Math.PI) * Math.exp(-rebP * 3.4);
            const starScale = 1.0 + 0.35 * spring;
            const flashGlow = Math.max(0, 1 - rebP * 1.4);
            starElement.style.transform = `scale(${Math.max(1.0, starScale).toFixed(4)})`;
            starElement.style.filter = `drop-shadow(0 0 ${(20 * flashGlow).toFixed(1)}px #FFFFFF) drop-shadow(0 0 ${(32 * flashGlow).toFixed(1)}px #4DB8FF)`;
          } else {
            starElement.style.transform = "";
            starElement.style.filter = "";
          }
        }

        // -------------------------------------------------------------------
        // STAGE B: Subtle Damped Camera Micro-Impact (100ms -> 190ms)
        // -------------------------------------------------------------------
        if (!prefersReduced && typeof document !== "undefined") {
          if (elapsedSec >= 0.10 && elapsedSec < 0.19) {
            const tShake = elapsedSec - 0.10;
            const envelope = Math.exp(-tShake * 42);
            const shakeX = Math.sin(tShake * 70) * 2.2 * envelope;
            const shakeY = -Math.cos(tShake * 58 + Math.PI / 4) * 1.6 * envelope;
            document.body.style.transform = `translate3d(${shakeX.toFixed(3)}px, ${shakeY.toFixed(3)}px, 0)`;
          } else if (elapsedSec >= 0.19 && document.body.style.transform !== "") {
            document.body.style.transform = "";
          }
        }

        // -------------------------------------------------------------------
        // STAGE C: Core Collapse Inward Dust & Accretion (0ms -> 105ms)
        // -------------------------------------------------------------------
        if (elapsedSec < 0.11) {
          const colP = Math.min(1, elapsedSec / 0.10);
          const easedCol = 0.5 * (1 - Math.cos(colP * Math.PI));
          const alphaFade = smoothstep(0.0, 0.02, elapsedSec) * (1 - smoothstep(0.08, 0.10, elapsedSec));

          // Gravitational lensing dark-blue distortion field
          const lensR = Math.max(4, 34 * (1 - easedCol * 0.78));
          ctx.save();
          const lensGrad = ctx.createRadialGradient(x, y, 0, x, y, lensR);
          lensGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
          lensGrad.addColorStop(0.3, "rgba(77, 184, 255, 0.6)");
          lensGrad.addColorStop(0.7, "rgba(25, 118, 255, 0.35)");
          lensGrad.addColorStop(1, "rgba(5, 10, 30, 0)");
          ctx.fillStyle = lensGrad;
          ctx.globalAlpha = alphaFade * 0.95;
          ctx.beginPath();
          ctx.arc(x, y, lensR, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Accretion filaments pulled by gravity into star center (x, y)
          filaments.forEach((f) => {
            const currentDist = f.initialDist * (1 - easedCol);
            const fx = x + Math.cos(f.angle) * currentDist;
            const fy = y + Math.sin(f.angle) * currentDist;
            const tailX = x + Math.cos(f.angle) * (currentDist + f.length);
            const tailY = y + Math.sin(f.angle) * (currentDist + f.length);

            ctx.save();
            ctx.globalAlpha = alphaFade * 0.9;
            ctx.strokeStyle = f.color;
            ctx.lineWidth = 1.6;
            ctx.lineCap = "round";
            ctx.shadowColor = "#4DB8FF";
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(fx, fy);
            ctx.stroke();
            ctx.restore();
          });
        }

        // -------------------------------------------------------------------
        // STAGE D: Core Rebound & Blue-White Plasma Flash (90ms -> 280ms)
        // -------------------------------------------------------------------
        if (elapsedSec >= 0.09 && elapsedSec < 0.28) {
          const flashP = (elapsedSec - 0.09) / 0.19;
          const flashAlpha = Math.sin(flashP * Math.PI) * 0.96;
          const flashRadius = 10 + Math.pow(flashP, 0.55) * 54;

          ctx.save();
          const flashGrad = ctx.createRadialGradient(x, y, 0, x, y, flashRadius);
          flashGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
          flashGrad.addColorStop(0.22, "rgba(191, 233, 255, 0.92)");
          flashGrad.addColorStop(0.55, "rgba(77, 184, 255, 0.55)");
          flashGrad.addColorStop(0.85, "rgba(25, 118, 255, 0.2)");
          flashGrad.addColorStop(1, "rgba(25, 118, 255, 0)");

          ctx.fillStyle = flashGrad;
          ctx.globalAlpha = flashAlpha;
          ctx.beginPath();
          ctx.arc(x, y, flashRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // -------------------------------------------------------------------
        // STAGE E: 4 Organic Relativistic Blue Shockwave Bands (0.08s -> 0.85s)
        // Rides in 100% exact synchrony with the radial theme reveal boundary
        // -------------------------------------------------------------------
        shockwaveBands.forEach((band) => {
          if (elapsedSec >= band.start) {
            const bandElapsed = elapsedSec - band.start;
            if (bandElapsed < band.duration) {
              const rawP = bandElapsed / band.duration;
              const easedP = easeCosmic(rawP);
              const currentR = easedP * (maxRadius * band.speedMult);

              // Smooth Hermite envelope: smooth fade-in and smooth fade-out
              const fadeIn = smoothstep(0.0, 0.10, rawP);
              const fadeOut = 1 - smoothstep(0.60, 1.0, rawP);
              const alpha = fadeIn * fadeOut * band.maxAlpha;

              const strokeW = Math.max(1.2, band.strokeWidth * (1 - rawP * 0.5));
              const blur = Math.max(3, band.glowBlur * (1 - rawP * 0.4));

              if (currentR > 2 && alpha > 0.005) {
                const pointsCount = prefersReduced ? 16 : 48;
                const angleStep = (Math.PI * 2) / pointsCount;

                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = band.color;
                ctx.lineWidth = strokeW;
                ctx.shadowColor = band.glowColor;
                ctx.shadowBlur = blur;

                ctx.beginPath();
                for (let i = 0; i <= pointsCount; i++) {
                  const angle = i * angleStep;
                  // Continuous procedural harmonic distortion
                  const distortion =
                    Math.sin(angle * band.harmonics.f1 + elapsedSec * 5.0) * band.harmonics.a1 +
                    Math.cos(angle * band.harmonics.f2 - elapsedSec * 3.0) * band.harmonics.a2;

                  const dampening = Math.min(1, currentR / 35);
                  const r = Math.max(1, currentR + distortion * dampening);
                  const px = x + Math.cos(angle) * r;
                  const py = y + Math.sin(angle) * r;

                  if (i === 0) ctx.moveTo(px, py);
                  else ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
              }
            }
          }
        });

        // -------------------------------------------------------------------
        // STAGE F: Momentum-Driven Stardust Particles Physics (100ms -> 850ms)
        // -------------------------------------------------------------------
        if (elapsedSec >= 0.10) {
          particles.forEach((p) => {
            p.life += dt;
            if (p.life < p.maxLife) {
              const pLifeNorm = p.life / p.maxLife;

              // Physics integration with deltaTime
              p.x += p.vx * dt;
              p.y += p.vy * dt;

              // Drag friction
              const dragFactor = Math.pow(p.drag, dt * 60);
              p.vx *= dragFactor;
              p.vy *= dragFactor;

              // Aerodynamic micro-turbulence
              p.vx += p.turbulenceX * dt;
              p.vy += p.turbulenceY * dt;

              // Smooth Hermite life envelope
              const pIn = smoothstep(0.0, 0.08, pLifeNorm);
              const pOut = 1 - smoothstep(0.45, 1.0, pLifeNorm);
              const currentAlpha = pIn * pOut * 0.95;

              const angle = Math.atan2(p.vy, p.vx);
              const speed = Math.hypot(p.vx, p.vy);
              const dynamicLength = Math.max(p.size, (p.length * speed) / 130);

              if (currentAlpha > 0.005) {
                ctx.save();
                ctx.globalAlpha = currentAlpha;
                ctx.fillStyle = p.color;
                ctx.shadowColor = "#4DB8FF";
                ctx.shadowBlur = 6;

                // Particle head
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Motion-blur velocity streak tail
                ctx.strokeStyle = p.color;
                ctx.lineWidth = p.size * 0.85;
                ctx.lineCap = "round";
                ctx.beginPath();
                ctx.moveTo(p.x - Math.cos(angle) * dynamicLength, p.y - Math.sin(angle) * dynamicLength);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
                ctx.restore();
              }
            }
          });
        }

        // -------------------------------------------------------------------
        // CONTINUOUS RAF LOOP CONTROL
        // -------------------------------------------------------------------
        if (elapsedSec < totalDurationSec) {
          animFrameRef.current = requestAnimationFrame(render);
        } else {
          // Clean completion
          ctx.clearRect(0, 0, width, height);
          if (starElement) {
            starElement.style.transform = "";
            starElement.style.filter = "";
          }
          if (typeof document !== "undefined") {
            document.body.style.transform = "";
          }
        }
      };

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      animFrameRef.current = requestAnimationFrame(render);
    },
  }));

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[999999] w-full h-full"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
});

ThemeRadialBurstOverlay.displayName = "ThemeRadialBurstOverlay";

export default ThemeRadialBurstOverlay;
