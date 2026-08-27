"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient particle field + deep galaxy star field.
 *
 * Renders three depth layers into a single canvas:
 *   1. galaxy  – hundreds of tiny, nearly-invisible white/grey micro-stars that
 *                drift at the same spatial velocity as the constellation system.
 *                A small fraction twinkle very subtly.
 *   2. far     – the original dim, oversized defocused particles.
 *   3. near    – the original crisp constellation nodes, linked by faint lines.
 *
 * Rendering quality:
 *   • devicePixelRatio-aware (Retina / HiDPI / 4K).
 *   • setTransform instead of scale() so re-runs don't compound the DPR.
 *   • Sub-pixel positions kept as floats throughout.
 *   • lineWidth 0.5 CSS-px → 1 physical pixel on 2× screens.
 */

const LINK_DIST = 120;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
const OPACITY_BUCKETS = 5;
const MAX_LINK_ALPHA = 0.2;
const REPEL_RADIUS_SQ = 150 * 150;

/* ── galaxy star tunables ─────────────────────────────────────────────── */
const GALAXY_DENSITY        = 1 / 2800;  // stars per CSS-px² on desktop
const GALAXY_DENSITY_MOBILE = 1 / 5200;  // reduced on small screens
const MOBILE_BREAKPOINT     = 768;        // px
const TWINKLE_FRACTION      = 0.14;       // ~14 % of stars twinkle subtly

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  colorType: number;
}

interface GalaxyStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;        // CSS px, kept tiny (0.15 – 0.85)
  alpha: number;         // base opacity
  liveAlpha: number;     // current rendered opacity (modulated by twinkle)
  twinkle: boolean;
  twinklePhase: number;
  twinkleSpeed: number;
  colorType: number;
}

function createParticle(w: number, h: number, far: boolean): Particle {
  const x = Math.random() * w;
  const xRatio = x / w;
  const baseAlpha = (Math.random() * 0.4 + 0.1) * (0.5 + xRatio * 0.5);
  const radius = Math.random() * 1.5 + 0.5;
  return {
    x,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    // The far layer reads as defocused via a larger radius at much lower
    // alpha, which costs nothing next to an actual blur filter.
    radius: far ? radius * 2.2 : radius,
    alpha: far ? baseAlpha * 0.32 : baseAlpha * 0.8,
    colorType: Math.random() < 0.7 ? 0 : Math.random() < 0.66 ? 1 : 2,
  };
}

/**
 * Create a single galaxy micro-star whose velocity is drawn from the same
 * distribution as the constellation particles so the whole scene drifts as
 * one coherent environment.
 */
function createGalaxyStar(w: number, h: number): GalaxyStar {
  // Use a quadratic curve so the majority of stars are smaller/fainter,
  // matching the visual distribution of a real starfield.
  const r = Math.pow(Math.random(), 2);
  const alpha   = r * 0.8 + 0.2;   // 0.2 – 1.0
  const radius  = r * 0.7 + 0.15;  // 0.15 – 0.85 CSS-px
  const twinkle = Math.random() < TWINKLE_FRACTION;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12,
    radius,
    alpha,
    liveAlpha: alpha,
    twinkle,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.008 + 0.003,
    colorType: Math.random() < 0.7 ? 0 : Math.random() < 0.66 ? 1 : 2,
  };
}

// Half-neighbourhood: visiting these five offsets sees each pair exactly once.
const CELL_OFFSETS: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frameId = 0;
    let running = false;
    let near: Particle[]    = [];
    let far: Particle[]     = [];
    let galaxy: GalaxyStar[] = [];
    let width  = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cells: number[][] = [];
    /** Monotonically increasing frame counter used for twinkling. */
    let tick = 0;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let pointerActive = false;

    // Reused every frame so the link pass allocates nothing steady-state.
    const buckets: number[][] = Array.from(
      { length: OPACITY_BUCKETS },
      () => []
    );

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      // setTransform, not scale: scale() multiplies onto the existing matrix,
      // so re-running this on resize compounded the DPR each time.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((width * height) / 15000), 160);
      near = Array.from({ length: count }, () =>
        createParticle(width, height, false)
      );
      far = Array.from({ length: Math.round(count * 0.4) }, () =>
        createParticle(width, height, true)
      );

      // Galaxy micro-star count scaled by area; capped lower on mobile.
      const isMobile = width < MOBILE_BREAKPOINT;
      const density  = isMobile ? GALAXY_DENSITY_MOBILE : GALAXY_DENSITY;
      const galaxyCount = Math.min(
        Math.round(width * height * density),
        isMobile ? 380 : 860
      );
      galaxy = Array.from({ length: galaxyCount }, () =>
        createGalaxyStar(width, height)
      );

      cols = Math.max(1, Math.ceil(width / LINK_DIST));
      rows = Math.max(1, Math.ceil(height / LINK_DIST));
      cells = Array.from({ length: cols * rows }, () => []);
    };

    const step = (list: Particle[], repel: boolean) => {
      for (const p of list) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        if (repel && pointerActive) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < REPEL_RADIUS_SQ && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            p.x -= (dx / dist) * 0.2;
            p.y -= (dy / dist) * 0.2;
          }
        }
      }
    };

    /**
     * Advance galaxy stars. They move identically to constellation particles
     * (wrap-around boundaries) and twinklers modulate liveAlpha via a slow sine.
     */
    const stepGalaxy = () => {
      for (const s of galaxy) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        else if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        else if (s.y > height) s.y = 0;

        if (s.twinkle) {
          // Slow sine on top of base alpha; range ≈ [alpha * 0.3, alpha * 1.0]
          const wave = Math.sin(s.twinklePhase + tick * s.twinkleSpeed);
          s.liveAlpha = s.alpha * (0.3 + 0.7 * ((wave + 1) / 2));
        }
      }
    };

    /**
     * Draw the galaxy layer.
     *
     * Two passes to achieve a "crisp white center with soft halo" without
     * blowing out the overall background brightness:
     *
     *   1. Base pass: draws all stars at their original size and low opacity
     *      to maintain the subtle deep-space texture.
     *   2. Core + Glow pass: draws a tiny, high-opacity pinpoint in the center
     *      of each star, with a tight white shadowBlur to create the halo.
     */
    const drawGalaxy = (isLight: boolean) => {
      ctx.save();

      for (const s of galaxy) {
        let renderAlpha = s.liveAlpha;

        if (isLight) {
          if (s.colorType === 0) {
            // Small stars: reduced radius
            const r = Math.max(0.45, s.radius * 0.8);
            const a = Math.min(0.65, Math.max(0.45, 0.45 + renderAlpha * 0.20));
            ctx.beginPath();
            ctx.fillStyle = `rgba(57, 78, 110, ${a})`;
            ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
            ctx.fill();
          } else if (s.colorType === 1) {
            // Normal stars: reduced radius
            const r = Math.max(0.65, s.radius * 1.0);
            const a = Math.min(0.75, Math.max(0.55, 0.55 + renderAlpha * 0.20));
            ctx.beginPath();
            ctx.fillStyle = `rgba(57, 78, 110, ${a})`;
            ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Larger / highlight stars: reduced radius
            const r = Math.max(0.85, s.radius * 1.2);
            const a = Math.min(0.80, Math.max(0.60, 0.60 + renderAlpha * 0.20));

            ctx.beginPath();
            ctx.fillStyle = `rgba(57, 78, 110, ${a})`;
            ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.strokeStyle = `rgba(57, 78, 110, ${a * 0.40})`;
            ctx.lineWidth = 0.65;
            ctx.arc(s.x, s.y, r * 1.4, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else {
          // Dark mode (100% untouched)
          ctx.beginPath();
          ctx.shadowBlur = 2;
          ctx.shadowColor = "rgba(255,255,255,0.8)";
          ctx.fillStyle = `rgba(255,255,255,${s.liveAlpha})`;
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    const drawDots = (list: Particle[], isLight: boolean) => {
      if (isLight) {
        let hasDashed = false;
        for (let i = 0; i < list.length; i++) {
          const p = list[i];
          const drawnRadius = Math.max(0.6, p.radius - 1.0);
          const isHighlightNode = p.colorType === 2 && drawnRadius > 1.4;
          const isMainNode = p.colorType === 2 || drawnRadius > 1.2;
          
          const a = isHighlightNode
            ? Math.min(0.95, Math.max(0.75, 0.75 + p.alpha * 0.20))
            : isMainNode
              ? Math.min(0.85, Math.max(0.65, 0.65 + p.alpha * 0.20))
              : Math.min(0.65, Math.max(0.45, 0.45 + p.alpha * 0.20));

          if (isMainNode && drawnRadius > 1.1) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, drawnRadius * 2.4, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(57, 78, 110, ${a * 0.35})`;
            ctx.lineWidth = 0.75;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            hasDashed = true;
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(57, 78, 110, ${a})`;
          ctx.arc(p.x, p.y, drawnRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        if (hasDashed) ctx.setLineDash([]);
      } else {
        for (let i = 0; i < list.length; i++) {
          const p = list[i];
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawLinks = (isLight: boolean) => {
      for (const bucket of buckets) bucket.length = 0;
      for (const cell of cells) cell.length = 0;

      for (let i = 0; i < near.length; i++) {
        const p = near[i];
        const cx = Math.min(cols - 1, Math.max(0, (p.x / LINK_DIST) | 0));
        const cy = Math.min(rows - 1, Math.max(0, (p.y / LINK_DIST) | 0));
        cells[cy * cols + cx].push(i);
      }

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const cellA = cells[cy * cols + cx];
          if (cellA.length === 0) continue;

          for (const [ox, oy] of CELL_OFFSETS) {
            const nx = cx + ox;
            const ny = cy + oy;
            if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
            const cellB = cells[ny * cols + nx];
            if (cellB.length === 0) continue;
            const sameCell = ox === 0 && oy === 0;

            for (let a = 0; a < cellA.length; a++) {
              const pi = near[cellA[a]];
              for (let b = sameCell ? a + 1 : 0; b < cellB.length; b++) {
                const pj = near[cellB[b]];
                const dx = pi.x - pj.x;
                const dy = pi.y - pj.y;
                const distSq = dx * dx + dy * dy;
                if (distSq >= LINK_DIST_SQ) continue;

                const t = 1 - Math.sqrt(distSq) / LINK_DIST;
                const slot = Math.min(
                  OPACITY_BUCKETS - 1,
                  (t * OPACITY_BUCKETS) | 0
                );
                buckets[slot].push(pi.x, pi.y, pj.x, pj.y);
              }
            }
          }
        }
      }

      ctx.lineWidth = isLight ? 0.85 : 0.5;
      const rgb = isLight ? "57, 78, 110" : "200, 210, 255"; // #394E6E in light mode
      for (let s = 0; s < OPACITY_BUCKETS; s++) {
        const seg = buckets[s];
        if (seg.length === 0) continue;
        
        let alpha = ((s + 0.5) / OPACITY_BUCKETS) * MAX_LINK_ALPHA;
        if (isLight) {
           // Darker, clearly defined constellation lines (0.25 - 0.40)
           alpha = 0.25 + ((s + 0.5) / OPACITY_BUCKETS) * 0.15;
        }
        ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
        ctx.beginPath();
        for (let k = 0; k < seg.length; k += 4) {
          ctx.moveTo(seg[k], seg[k + 1]);
          ctx.lineTo(seg[k + 2], seg[k + 3]);
        }
        ctx.stroke();
      }
    };

    const render = () => {
      const isLight = document.body.classList.contains("light-theme");
      ctx.clearRect(0, 0, width, height);
      // Layer order: galaxy (deepest) → far defocus → links → near nodes
      drawGalaxy(isLight);
      drawDots(far, isLight);
      drawLinks(isLight);
      drawDots(near, isLight);
    };

    const animate = () => {
      tick++;
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      stepGalaxy();
      step(far, false);
      step(near, true);
      render();
      frameId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      frameId = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frameId);
    };

    // Started eagerly on purpose. Deferring this to requestIdleCallback was
    // measured and made things worse: the background painted late and Speed
    // Index regressed from 1.6s to 3.5s on throttled mobile.
    init();
    if (reduceMotion) {
      // A single static frame; the loop is never scheduled at all.
      render();
    } else {
      start();
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        init();
        if (reduceMotion) render();
      }, 150);
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      pointerActive = true;
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    if (!reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
    }

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none animate-particle-fade"
    />
  );
}
