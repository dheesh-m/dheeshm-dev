"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

export interface ThemeBurstTriggerOptions {
  x: number;
  y: number;
  maxRadius: number;
  toLight: boolean;
  starElement?: SVGElement | HTMLElement | null;
  onThemeSwitch?: () => void;
}

export interface ThemeBurstTriggerRef {
  trigger: (options: ThemeBurstTriggerOptions) => void;
}

// Particle physics interface
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

// Inward gravitational filament interface
interface AccretionFilament {
  angle: number;
  initialDist: number;
  speed: number;
  length: number;
  color: string;
}

// Cubic Bézier curve evaluator for physical acceleration & deceleration
function createBezier(x1: number, y1: number, x2: number, y2: number) {
  return function (t: number): number {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let u = t;
    for (let i = 0; i < 6; i++) {
      const currentX = 3 * (1 - u) * (1 - u) * u * x1 + 3 * (1 - u) * u * u * x2 + u * u * u;
      const dx = 3 * (1 - u) * (1 - u) * x1 + 6 * (1 - u) * u * (x2 - x1) + 3 * u * u * (1 - x2);
      if (Math.abs(currentX - t) < 0.001 || dx === 0) break;
      u -= (currentX - t) / dx;
      u = Math.max(0, Math.min(1, u));
    }
    return 3 * (1 - u) * (1 - u) * u * y1 + 3 * (1 - u) * u * u * y2 + u * u * u;
  };
}

const easeCollapse = createBezier(0.45, 0.0, 0.7, 0.2);
const easeShockwave = createBezier(0.12, 0.94, 0.25, 1.0);
const easeWavefront = createBezier(0.2, 0.9, 0.3, 1.0);

const ThemeRadialBurstOverlay = forwardRef<ThemeBurstTriggerRef, {}>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    trigger: ({ x, y, maxRadius, toLight, starElement, onThemeSwitch }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Match canvas pixel ratio
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      // =====================================================================
      // 1. PROCEDURAL PHYSICS GENERATION (One-time allocation, zero GC churn)
      // =====================================================================
      // Accretion filaments pulled by gravity (0 - 120ms)
      const accretionCount = prefersReduced ? 4 : 10;
      const filaments: AccretionFilament[] = [];
      for (let i = 0; i < accretionCount; i++) {
        filaments.push({
          angle: (i / accretionCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4,
          initialDist: 26 + Math.random() * 22,
          speed: 1.0 + Math.random() * 0.5,
          length: 5 + Math.random() * 8,
          color: Math.random() > 0.35 ? "#BFE9FF" : "#1976FF",
        });
      }

      // Relativistic plasma ejecta particles (120ms+)
      const particleCount = prefersReduced ? 8 : 24;
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
        // Non-uniform relativistic ejection speed
        const speed = 90 + Math.random() * 220;
        particles.push({
          x,
          y,
          vx: Math.cos(baseAngle) * speed,
          vy: Math.sin(baseAngle) * speed,
          drag: 0.91 + Math.random() * 0.04, // Varied friction
          turbulenceX: (Math.random() - 0.5) * 45,
          turbulenceY: (Math.random() - 0.5) * 45,
          size: 1.2 + Math.random() * 1.8,
          length: 4 + Math.random() * 10,
          alpha: 1,
          life: 0,
          maxLife: 0.35 + Math.random() * 0.35, // 350ms - 700ms
          color: plasmaColors[Math.floor(Math.random() * plasmaColors.length)],
        });
      }

      // 4 Relativistic shockwave bands
      const shockwaveBands = [
        {
          start: 0.12, // 120ms
          duration: 0.52,
          speedMult: 1.08,
          color: "#FFFFFF",
          glowColor: "#BFE9FF",
          strokeWidth: 2.4,
          glowBlur: 14,
          maxAlpha: 0.95,
          harmonics: { f1: 5, a1: 3.5, f2: 8, a2: 2.0 },
        },
        {
          start: 0.14, // 140ms
          duration: 0.62,
          speedMult: 0.98,
          color: "#4DB8FF",
          glowColor: "#1976FF",
          strokeWidth: 3.2,
          glowBlur: 18,
          maxAlpha: 0.9,
          harmonics: { f1: 4, a1: 4.8, f2: 7, a2: 2.6 },
        },
        {
          start: 0.17, // 170ms
          duration: 0.72,
          speedMult: 0.84,
          color: "#1976FF",
          glowColor: "#0D47A1",
          strokeWidth: 3.8,
          glowBlur: 22,
          maxAlpha: 0.75,
          harmonics: { f1: 3, a1: 5.5, f2: 6, a2: 3.2 },
        },
        {
          start: 0.21, // 210ms
          duration: 0.82,
          speedMult: 0.7,
          color: "rgba(139, 92, 246, 0.85)", // Faint violet outer magnetic halo
          glowColor: "#1976FF",
          strokeWidth: 4.8,
          glowBlur: 26,
          maxAlpha: 0.6,
          harmonics: { f1: 3, a1: 6.5, f2: 5, a2: 4.0 },
        },
      ];

      // =====================================================================
      // 2. UNIFIED CONTINUOUS TIME LOOP WITH DELTA TIME (Target 60-120 FPS)
      // =====================================================================
      const startTime = performance.now();
      let lastTimestamp = startTime;
      let hasSwitchedTheme = false;
      const totalDurationSec = 0.98; // 980ms total fluid event

      const render = (now: number) => {
        // Delta time in seconds, clamped to max 33ms to prevent frame drops from jumping
        const dt = Math.min(0.033, (now - lastTimestamp) / 1000);
        lastTimestamp = now;

        const elapsedSec = (now - startTime) / 1000;
        const progress = Math.min(1, elapsedSec / totalDurationSec);

        // Clear canvas buffer cleanly
        ctx.clearRect(0, 0, width, height);

        // -------------------------------------------------------------------
        // STAGE A: Physical Star Element Motion (0ms -> 360ms)
        // Direct GPU transform update on star element - zero React re-renders!
        // -------------------------------------------------------------------
        if (starElement) {
          if (elapsedSec < 0.12) {
            // Gravitational compression (0 - 120ms): 1.0 -> 0.70
            const collapseP = elapsedSec / 0.12;
            const starScale = 1.0 - 0.32 * easeCollapse(collapseP);
            starElement.style.transform = `scale(${starScale})`;
            starElement.style.filter = `drop-shadow(0 0 ${8 * collapseP}px #1976FF) brightness(${1 + 1.2 * collapseP})`;
          } else if (elapsedSec < 0.36) {
            // Explosive rebound (120ms - 360ms): 0.70 -> 1.35 -> 1.0
            const reboundP = (elapsedSec - 0.12) / 0.24;
            // Spring decay formula: 1 + 0.35 * exp(-reboundP * 6) * cos(reboundP * Math.PI * 2)
            const starScale = 1.0 + 0.35 * Math.exp(-reboundP * 6) * Math.cos(reboundP * Math.PI * 1.5);
            const glowIntensity = Math.max(0, 1 - reboundP);
            starElement.style.transform = `scale(${Math.max(1, starScale)})`;
            starElement.style.filter = `drop-shadow(0 0 ${16 * glowIntensity}px #FFFFFF) drop-shadow(0 0 ${28 * glowIntensity}px #4DB8FF)`;
          } else {
            starElement.style.transform = "scale(1)";
            starElement.style.filter = "";
          }
        }

        // -------------------------------------------------------------------
        // STAGE B: Subtle Camera Micro-Shake (120ms -> 180ms)
        // Decaying 2px impact shake applied directly to body transform
        // -------------------------------------------------------------------
        if (!prefersReduced && typeof document !== "undefined") {
          if (elapsedSec >= 0.12 && elapsedSec < 0.19) {
            const shakeElapsed = elapsedSec - 0.12;
            const shakeDecay = 1 - shakeElapsed / 0.07;
            const shakeX = Math.sin(shakeElapsed * 180) * 2.2 * shakeDecay;
            const shakeY = Math.cos(shakeElapsed * 150) * 1.8 * shakeDecay;
            document.body.style.transform = `translate3d(${shakeX.toFixed(2)}px, ${shakeY.toFixed(2)}px, 0)`;
          } else if (elapsedSec >= 0.19 && document.body.style.transform !== "") {
            document.body.style.transform = "";
          }
        }

        // -------------------------------------------------------------------
        // STAGE C: Core Collapse Inward Dust & Accretion (0ms -> 125ms)
        // -------------------------------------------------------------------
        if (elapsedSec < 0.13) {
          const colP = Math.min(1, elapsedSec / 0.12);
          const easedCol = easeCollapse(colP);

          // Gravitational lensing dark-blue distortion field
          const lensR = Math.max(4, 34 * (1 - easedCol * 0.75));
          ctx.save();
          const lensGrad = ctx.createRadialGradient(x, y, 0, x, y, lensR);
          lensGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
          lensGrad.addColorStop(0.3, "rgba(77, 184, 255, 0.6)");
          lensGrad.addColorStop(0.7, "rgba(25, 118, 255, 0.35)");
          lensGrad.addColorStop(1, "rgba(5, 10, 30, 0)");
          ctx.fillStyle = lensGrad;
          ctx.beginPath();
          ctx.arc(x, y, lensR, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Accretion filaments pulled by gravity into center
          filaments.forEach((f) => {
            const currentDist = f.initialDist * (1 - easedCol);
            const fx = x + Math.cos(f.angle) * currentDist;
            const fy = y + Math.sin(f.angle) * currentDist;
            const tailX = x + Math.cos(f.angle) * (currentDist + f.length);
            const tailY = y + Math.sin(f.angle) * (currentDist + f.length);

            ctx.save();
            ctx.globalAlpha = (1 - colP * 0.25) * 0.9;
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
        // STAGE D: Core Rebound & Blue-White Plasma Flash (120ms -> 340ms)
        // -------------------------------------------------------------------
        if (elapsedSec >= 0.12 && elapsedSec < 0.34) {
          const flashElapsed = elapsedSec - 0.12;
          const flashDuration = 0.22;
          const flashP = flashElapsed / flashDuration;
          const flashAlpha = Math.sin(flashP * Math.PI) * 0.95;
          const flashRadius = 12 + Math.pow(flashP, 0.55) * 52;

          ctx.save();
          const flashGrad = ctx.createRadialGradient(x, y, 0, x, y, flashRadius);
          flashGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
          flashGrad.addColorStop(0.25, "rgba(191, 233, 255, 0.9)");
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
        // STAGE E: Seamless Theme Switch Execution (at exact rebound peak 150ms)
        // -------------------------------------------------------------------
        if (elapsedSec >= 0.15 && !hasSwitchedTheme) {
          hasSwitchedTheme = true;
          if (onThemeSwitch) onThemeSwitch();
        }

        // -------------------------------------------------------------------
        // STAGE F: 4 Organic Relativistic Shockwave Bands (120ms -> 950ms)
        // -------------------------------------------------------------------
        shockwaveBands.forEach((band) => {
          if (elapsedSec >= band.start) {
            const bandElapsed = elapsedSec - band.start;
            if (bandElapsed < band.duration) {
              const rawP = bandElapsed / band.duration;
              const easedP = easeShockwave(rawP);
              const currentR = easedP * (maxRadius * band.speedMult);

              const alpha = Math.max(0, (1 - Math.pow(rawP, 1.25)) * band.maxAlpha);
              const strokeW = Math.max(1.2, band.strokeWidth * (1 - rawP * 0.5));
              const blur = Math.max(3, band.glowBlur * (1 - rawP * 0.4));

              if (currentR > 2 && alpha > 0.01) {
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
                  // Organic harmonic distortion moving with time
                  const distortion =
                    Math.sin(angle * band.harmonics.f1 + elapsedSec * 5) * band.harmonics.a1 +
                    Math.cos(angle * band.harmonics.f2 - elapsedSec * 3) * band.harmonics.a2;

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
        // STAGE G: Continuous Plasma Wavefront & Radial Theme Wash
        // -------------------------------------------------------------------
        if (elapsedSec >= 0.15 && elapsedSec < totalDurationSec) {
          const waveElapsed = elapsedSec - 0.15;
          const waveDuration = totalDurationSec - 0.15;
          const waveRawP = waveElapsed / waveDuration;
          const waveEasedP = easeWavefront(waveRawP);
          const waveRadius = waveEasedP * maxRadius;

          const waveAlpha = Math.max(0, (1 - waveRawP * 0.95) * (toLight ? 0.7 : 0.55));
          const waveRimW = Math.max(10, 32 * (1 - waveRawP * 0.5));

          if (waveRadius > 4 && waveAlpha > 0.01) {
            ctx.save();
            ctx.globalAlpha = waveAlpha;

            // Gradient rim at the wavefront
            ctx.strokeStyle = toLight
              ? waveRawP < 0.3
                ? "rgba(191, 233, 255, 0.8)"
                : "rgba(255, 245, 235, 0.45)"
              : waveRawP < 0.3
                ? "rgba(77, 184, 255, 0.65)"
                : "rgba(140, 110, 200, 0.4)";

            ctx.lineWidth = waveRimW;
            ctx.shadowColor = toLight ? "#BFE9FF" : "#1976FF";
            ctx.shadowBlur = waveRawP < 0.35 ? 14 : 6;

            ctx.beginPath();
            ctx.arc(x, y, waveRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        }

        // -------------------------------------------------------------------
        // STAGE H: Momentum-Driven Plasma Particles Physics (120ms -> 850ms)
        // -------------------------------------------------------------------
        if (elapsedSec >= 0.12) {
          particles.forEach((p) => {
            p.life += dt;
            if (p.life < p.maxLife) {
              const pLifeNorm = p.life / p.maxLife;

              // Physics integration with deltaTime:
              // position += velocity * dt
              p.x += p.vx * dt;
              p.y += p.vy * dt;

              // Apply drag friction (frame-rate independent)
              const dragFactor = Math.pow(p.drag, dt * 60);
              p.vx *= dragFactor;
              p.vy *= dragFactor;

              // Small aerodynamic turbulence
              p.vx += p.turbulenceX * dt;
              p.vy += p.turbulenceY * dt;

              const currentAlpha = Math.max(0, (1 - pLifeNorm) * 0.95);
              const angle = Math.atan2(p.vy, p.vx);
              const speed = Math.hypot(p.vx, p.vy);
              const dynamicLength = Math.max(p.size, (p.length * speed) / 140);

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
          });
        }

        // -------------------------------------------------------------------
        // LOOP CONTROL
        // -------------------------------------------------------------------
        if (elapsedSec < totalDurationSec) {
          animFrameRef.current = requestAnimationFrame(render);
        } else {
          // Clean settlement
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
