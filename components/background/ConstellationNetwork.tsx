"use client";

import { useEffect, useRef, memo } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ConstellationNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  liveAlpha: number;
  twinkle: boolean;
  twinklePhase: number;
  twinkleSpeed: number;
  colorType: number; // 0: White/Silver, 1: Subtle Cyan Tint, 2: Subtle Violet Tint
}

const LINK_DIST = 115;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
const OPACITY_BUCKETS = 5;
const MAX_LINK_ALPHA_DARK = 0.16;
const MAX_LINK_ALPHA_LIGHT = 0.24;
const REPEL_RADIUS_SQ = 130 * 130;

// Half-neighbourhood spatial hash offsets (visiting these sees each pair exactly once)
const CELL_OFFSETS: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

function createNode(w: number, h: number): ConstellationNode {
  const r = Math.random();
  const radius = r < 0.6 ? 0.9 + Math.random() * 0.6 : 1.5 + Math.random() * 0.8;
  const baseAlpha = 0.35 + Math.random() * 0.45;
  const twinkle = Math.random() < 0.3;

  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    radius,
    baseAlpha,
    liveAlpha: baseAlpha,
    twinkle,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.008 + Math.random() * 0.012,
    colorType: Math.random() < 0.6 ? 0 : Math.random() < 0.85 ? 1 : 2,
  };
}

function ConstellationNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLightMode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frameId = 0;
    let running = false;
    let nodes: ConstellationNode[] = [];
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cells: number[][] = [];
    let tick = 0;

    let mouseX = -9999;
    let mouseY = -9999;
    let targetX = -9999;
    let targetY = -9999;
    let pointerActive = false;

    // Pre-allocated line bucket segments to eliminate garbage collection allocations per frame
    const buckets: number[][] = Array.from({ length: OPACITY_BUCKETS }, () => []);

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      if (width <= 0 || height <= 0) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 768;
      // Elegant star density: ~85–110 stars on desktop, ~35–50 on mobile
      const density = isMobile ? 1 / 18000 : 1 / 13000;
      const count = Math.min(Math.max(Math.round(width * height * density), 35), 120);

      nodes = Array.from({ length: count }, () => createNode(width, height));

      cols = Math.max(1, Math.ceil(width / LINK_DIST));
      rows = Math.max(1, Math.ceil(height / LINK_DIST));
      cells = Array.from({ length: cols * rows }, () => []);
    };

    const update = () => {
      tick++;

      // Smooth pointer tracking
      if (pointerActive) {
        mouseX += (targetX - mouseX) * 0.08;
        mouseY += (targetY - mouseY) * 0.08;
      }

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        p.x += p.vx;
        p.y += p.vy;

        // Smooth wrap-around edges
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Gentle subtle pointer repulsion
        if (pointerActive && mouseX > -100) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < REPEL_RADIUS_SQ && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 130) * 0.25;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }

        // Gentle twinkle modulation
        if (p.twinkle) {
          const wave = Math.sin(p.twinklePhase + tick * p.twinkleSpeed);
          p.liveAlpha = p.baseAlpha * (0.5 + 0.5 * ((wave + 1) / 2));
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // ── 1. SPATIAL HASHING FOR CONSTELLATION CONNECTIONS ──
      for (let i = 0; i < buckets.length; i++) buckets[i].length = 0;
      for (let i = 0; i < cells.length; i++) cells[i].length = 0;

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
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
              const pi = nodes[cellA[a]];
              for (let b = sameCell ? a + 1 : 0; b < cellB.length; b++) {
                const pj = nodes[cellB[b]];
                const dx = pi.x - pj.x;
                const dy = pi.y - pj.y;
                const distSq = dx * dx + dy * dy;
                if (distSq >= LINK_DIST_SQ) continue;

                const t = 1 - Math.sqrt(distSq) / LINK_DIST;
                const slot = Math.min(OPACITY_BUCKETS - 1, (t * OPACITY_BUCKETS) | 0);
                buckets[slot].push(pi.x, pi.y, pj.x, pj.y);
              }
            }
          }
        }
      }

      // ── 2. DRAW CONSTELLATION LINES (Batched by Opacity Bucket) ──
      ctx.lineWidth = isLightMode ? 0.75 : 0.5;
      const maxAlpha = isLightMode ? MAX_LINK_ALPHA_LIGHT : MAX_LINK_ALPHA_DARK;
      const rgb = isLightMode ? "57, 78, 110" : "190, 205, 235";

      for (let s = 0; s < OPACITY_BUCKETS; s++) {
        const seg = buckets[s];
        if (seg.length === 0) continue;

        const alpha = ((s + 0.5) / OPACITY_BUCKETS) * maxAlpha;
        ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
        ctx.beginPath();
        for (let k = 0; k < seg.length; k += 4) {
          ctx.moveTo(seg[k], seg[k + 1]);
          ctx.lineTo(seg[k + 2], seg[k + 3]);
        }
        ctx.stroke();
      }

      // ── 3. DRAW CONSTELLATION STARS / NODES ──
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (isLightMode) {
          ctx.fillStyle = `rgba(57, 78, 110, ${Math.min(p.liveAlpha * 1.1, 0.85)})`;
        } else {
          if (p.colorType === 1) {
            // Subtle Cyan Tint Star
            ctx.fillStyle = `rgba(165, 243, 252, ${p.liveAlpha})`;
          } else if (p.colorType === 2) {
            // Subtle Violet Tint Star
            ctx.fillStyle = `rgba(221, 214, 254, ${p.liveAlpha})`;
          } else {
            // Crisp White/Silver Star
            ctx.fillStyle = `rgba(255, 255, 255, ${p.liveAlpha})`;
          }
        }
        ctx.fill();
      }
    };

    const animate = () => {
      update();
      draw();
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

    init();
    if (reduceMotion) {
      draw();
    } else {
      start();
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        init();
        if (reduceMotion) draw();
      }, 150);
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      pointerActive = true;
    };

    const handlePointerLeave = () => {
      pointerActive = false;
      targetX = -9999;
      targetY = -9999;
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    if (!reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    }

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [isLightMode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
}

export default memo(ConstellationNetwork);
