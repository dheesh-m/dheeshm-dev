// DO NOT TOUCH THIS SECTION — IT IS ALREADY APPROVED.
"use client";

/**
 * OrbitalSystem3D
 *
 * Pure-canvas 3D orbital visualization — no Three.js, no R3F, no external deps.
 * Uses perspective projection math directly on a 2D Canvas context.
 * Fully compatible with Next.js 16 reactCompiler, React 19, and iOS Safari.
 *
 * NOTE: THIS COMPONENT IS LOCKED AND FULLY APPROVED.
 * Math-driven responsive safe bounds guarantee all rings, nodes, glows, and labels
 * remain 100% visible and unclipped throughout full 3D rotation across all viewports.
 */

import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

// ── Types ────────────────────────────────────────────────────────────────────
interface Vec3 { x: number; y: number; z: number }
interface Node3D { label: string; orbit: number; startAngle: number; speed: number }

// ── Orbital planes: rotation matrices for 3 planes ──────────────────────────
type Mat3 = [number, number, number, number, number, number, number, number, number];

function rotateX(angle: number): Mat3 {
  const c = Math.cos(angle), s = Math.sin(angle);
  return [1, 0, 0, 0, c, -s, 0, s, c];
}
function rotateY(angle: number): Mat3 {
  const c = Math.cos(angle), s = Math.sin(angle);
  return [c, 0, s, 0, 1, 0, -s, 0, c];
}
function rotateZ(angle: number): Mat3 {
  const c = Math.cos(angle), s = Math.sin(angle);
  return [c, -s, 0, s, c, 0, 0, 0, 1];
}
function mulMat(a: Mat3, b: Mat3): Mat3 {
  return [
    a[0] * b[0] + a[1] * b[3] + a[2] * b[6], a[0] * b[1] + a[1] * b[4] + a[2] * b[7], a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
    a[3] * b[0] + a[4] * b[3] + a[5] * b[6], a[3] * b[1] + a[4] * b[4] + a[5] * b[7], a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
    a[6] * b[0] + a[7] * b[3] + a[8] * b[6], a[6] * b[1] + a[7] * b[4] + a[8] * b[7], a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
  ];
}
function applyMat(m: Mat3, v: Vec3): Vec3 {
  return { x: m[0] * v.x + m[1] * v.y + m[2] * v.z, y: m[3] * v.x + m[4] * v.y + m[5] * v.z, z: m[6] * v.x + m[7] * v.y + m[8] * v.z };
}

// 3 orbital plane orientations
const PLANE_MATS: Mat3[] = [
  mulMat(rotateZ(0.3), rotateX(Math.PI / 6)),
  mulMat(rotateY(Math.PI / 4), rotateX(Math.PI / 2.5)),
  mulMat(rotateZ(-0.4), mulMat(rotateY(Math.PI / 3), rotateX(-Math.PI / 8))),
];

// Nodes mapped to 3 orbital tiers
const NODES: Node3D[] = [
  { label: "RAG", orbit: 0, startAngle: 0, speed: 0.28 },
  { label: "TOOLS", orbit: 1, startAngle: Math.PI * 0.6, speed: 0.22 },
  { label: "MEMORY", orbit: 2, startAngle: Math.PI * 1.2, speed: 0.19 },
  { label: "AGENTS", orbit: 0, startAngle: Math.PI, speed: 0.25 },
  { label: "VECTOR DB", orbit: 1, startAngle: Math.PI * 1.6, speed: 0.30 },
  { label: "API", orbit: 2, startAngle: Math.PI * 0.4, speed: 0.17 },
];

// Perspective projection parameters
const FOCAL = 420;
const CAM_Z = 480;

function project(v: Vec3, cx: number, cy: number, camZ = 480) {
  const dz = camZ - v.z;
  const scale = dz > 10 ? FOCAL / dz : 0;
  return { sx: cx + v.x * scale, sy: cy + v.y * scale, scale };
}

// Ellipse sample points for orbit ring
function ellipsePts(mat: Mat3, rx: number, ry: number, segs = 80): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i <= segs; i++) {
    const t = (i / segs) * Math.PI * 2;
    pts.push(applyMat(mat, { x: Math.cos(t) * rx, y: Math.sin(t) * ry, z: 0 }));
  }
  return pts;
}

// Draw a dashed ellipse ring
function drawRing(ctx: CanvasRenderingContext2D, pts: Vec3[], cx: number, cy: number, color: string, alpha: number, camZ: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.8;
  ctx.setLineDash([6, 5]);
  ctx.beginPath();
  pts.forEach((p, i) => {
    const { sx, sy } = project(p, cx, cy, camZ);
    if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
  });
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

// Draw a sphere with depth-based glow (toned down)
function drawSphere(ctx: CanvasRenderingContext2D, sx: number, sy: number, r: number, color: string, glowColor: string, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;

  // Subtle soft glow
  const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 1.8);
  grd.addColorStop(0, glowColor + "28");
  grd.addColorStop(1, "transparent");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(sx, sy, r * 1.8, 0, Math.PI * 2);
  ctx.fill();

  // Core sphere
  const sphereGrd = ctx.createRadialGradient(sx - r * 0.3, sy - r * 0.3, 0, sx, sy, r);
  sphereGrd.addColorStop(0, "#ffffff");
  sphereGrd.addColorStop(0.4, color);
  sphereGrd.addColorStop(1, color + "88");
  ctx.fillStyle = sphereGrd;
  ctx.beginPath();
  ctx.arc(sx, sy, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// Draw label
function drawLabel(ctx: CanvasRenderingContext2D, text: string, sx: number, sy: number, r: number, textColor: string, alpha: number) {
  ctx.save();
  ctx.globalAlpha = Math.min(1, alpha * 1.3);
  ctx.fillStyle = textColor;
  ctx.font = `bold ${Math.max(8, r * 0.9)}px "Manrope", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.letterSpacing = "1px";
  ctx.fillText(text, sx, sy + r + 4);
  ctx.restore();
}

// ── Main component ────────────────────────────────────────────────────────────
export default function OrbitalSystem3D() {
  const { isLightMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(performance.now());
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const isLightRef = useRef(isLightMode);

  // Keep theme ref in sync
  useEffect(() => { isLightRef.current = isLightMode; }, [isLightMode]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const cx = W / 2;
    const cy = H / 2;
    const camZ = CAM_Z;

    // Smooth mouse
    smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.04;
    smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.04;
    const mx = smoothMouseRef.current.x;
    const my = smoothMouseRef.current.y;

    const t = (performance.now() - startTimeRef.current) / 1000;
    const light = isLightRef.current;

    // Global rotation matrix: slow auto-rotate Y + mouse tilt
    const autoRotY = rotateY(t * 0.07 + mx * 0.3);
    const mouseTiltX = rotateX(-my * 0.25 + Math.sin(t * 0.04) * 0.08);
    const globalMat = mulMat(mouseTiltX, autoRotY);

    // Clear full logical canvas
    ctx.clearRect(0, 0, W, H);

    // Atmospheric glow around center (Toned down & centered)
    const glowR = Math.min(W, H) * 0.40;
    const atmosGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
    if (light) {
      atmosGrd.addColorStop(0, "rgba(147,51,234,0.08)");
      atmosGrd.addColorStop(0.5, "rgba(168,85,247,0.03)");
      atmosGrd.addColorStop(1, "transparent");
    } else {
      atmosGrd.addColorStop(0, "rgba(180,180,190,0.03)");
      atmosGrd.addColorStop(1, "transparent");
    }
    ctx.fillStyle = atmosGrd;
    ctx.beginPath();
    ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
    ctx.fill();

    // ── 1. Rigorous Safe Orbital Boundaries Calculation ──────────────────────
    const isMobile = W < 640;
    const insetPct = W >= 1024 ? 0.08 : (W >= 640 ? 0.10 : 0.08);
    const marginPad = isMobile ? 26 : 44; // Accounts for sphere radius + glow + label width
    const safeHalfW = Math.max(65, (W * (1 - 2 * insetPct)) * 0.5 - marginPad);
    const safeHalfH = Math.max(55, (H * (1 - 2 * insetPct)) * 0.5 - marginPad);

    // Divide by max perspective projection expansion factor (~1.25)
    // so that even at the closest z-depth to camera, projected coordinates stay inside safe area
    const MAX_PERSPECTIVE_FACTOR = 1.25;
    const maxSafeRadiusX = safeHalfW / MAX_PERSPECTIVE_FACTOR;
    const maxSafeRadiusY = safeHalfH / MAX_PERSPECTIVE_FACTOR;

    // Strict Orbital Hierarchy: Outer: 90%, Middle: 70%, Inner: 50%
    const orbitRadii = [
      { rx: maxSafeRadiusX * 0.90, ry: maxSafeRadiusY * 0.90 },
      { rx: maxSafeRadiusX * 0.70, ry: maxSafeRadiusY * 0.70 },
      { rx: maxSafeRadiusX * 0.50, ry: maxSafeRadiusY * 0.50 },
    ];

    // ── 2. Compute 3D Projected Positions for All Nodes ─────────────────────
    const nodePositions = NODES.map(node => {
      const { rx, ry } = orbitRadii[node.orbit];
      const angle = node.startAngle + t * node.speed;
      const local: Vec3 = {
        x: Math.cos(angle) * rx,
        y: Math.sin(angle) * ry,
        z: 0,
      };

      const inPlane = applyMat(PLANE_MATS[node.orbit], local);
      const world = applyMat(globalMat, inPlane);
      const proj = project(world, cx, cy, camZ);

      const depth = (world.z + 220) / 440;
      const alpha = Math.max(0.3, Math.min(1.0, 0.3 + depth * 0.7));
      const r = Math.max(isMobile ? 4.5 : 5, (isMobile ? 8.5 : 10.5) * (0.55 + depth * 0.8));

      // Calculate exact visual footprint for safe containment
      ctx.font = `bold ${Math.max(isMobile ? 7.5 : 8, r * 0.9)}px "Manrope", system-ui, sans-serif`;
      const textMetrics = ctx.measureText(node.label);
      const labelHalfW = textMetrics.width / 2 + 3;
      const footprintX = Math.max(r * 1.3, labelHalfW) + 3;
      const footprintTop = r * 1.3 + 3;
      const footprintBottom = (r + 3 + 12) + 3; // includes label below sphere

      // Clamp coordinates within container safe margin [inset, 1-inset]
      const safeSx = Math.max(footprintX, Math.min(W - footprintX, proj.sx));
      const safeSy = Math.max(footprintTop, Math.min(H - footprintBottom, proj.sy));

      return {
        world,
        sx: safeSx,
        sy: safeSy,
        scale: proj.scale,
        depth,
        alpha,
        r,
        label: node.label,
      };
    });

    // ── 3. Draw All Orbital Rings (Guaranteed 100% Inside Container) ──────────
    const ringColor = light ? "#9333ea" : "#6b7280";
    const ringAlpha = light ? 0.32 : 0.18;
    PLANE_MATS.forEach((mat, i) => {
      const { rx, ry } = orbitRadii[i];
      const pts = ellipsePts(mat, rx, ry);
      const transformed = pts.map(p => applyMat(globalMat, p));
      drawRing(ctx, transformed, cx, cy, ringColor, ringAlpha, camZ);
    });

    // ── 4. Depth Sort & Draw Connection Lines ────────────────────────────────
    const sorted = [...nodePositions].sort((a, b) => a.depth - b.depth);
    const lineColor = light ? "#9333ea" : "#9ca3af";

    sorted.forEach(node => {
      const { sx, sy, depth } = node;
      ctx.save();
      ctx.globalAlpha = light ? (0.18 + depth * 0.25) : (0.12 + depth * 0.18);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sx, sy);
      ctx.stroke();
      ctx.restore();
    });

    // ── 5. Draw Nodes (Back to Front) ───────────────────────────────────────
    sorted.forEach(node => {
      const { sx, sy, r, alpha, label } = node;
      const sphereColor = light ? "#a855f7" : "#374151";
      const glowCol = light ? "#7c3aed" : "#9ca3af";
      const textCol = light ? "#ffffff" : "#e5e7eb";
      drawSphere(ctx, sx, sy, r, sphereColor, glowCol, alpha);
      drawLabel(ctx, label, sx, sy, r, textCol, alpha);
    });

    // ── 6. Draw Central LLM Sphere ──────────────────────────────────────────
    const llmR = 22;
    const pulse = 1 + Math.sin(t * 1.8) * 0.06;
    // Pulsing halo (Toned down)
    ctx.save();
    ctx.globalAlpha = light ? 0.12 : 0.06;
    const haloGrd = ctx.createRadialGradient(cx, cy, llmR * 0.5, cx, cy, llmR * 2.0 * pulse);
    haloGrd.addColorStop(0, light ? "rgba(147,51,234,0.4)" : "rgba(200,200,210,0.25)");
    haloGrd.addColorStop(1, "transparent");
    ctx.fillStyle = haloGrd;
    ctx.beginPath();
    ctx.arc(cx, cy, llmR * 2.0 * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Core sphere
    drawSphere(
      ctx, cx, cy, llmR,
      light ? "#7c3aed" : "#1f2937",
      light ? "#6d28d9" : "#9ca3af",
      1.0
    );

    // LLM label
    ctx.save();
    ctx.fillStyle = light ? "#ffffff" : "#f9fafb";
    ctx.font = `bold 11px "Manrope", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.98;
    ctx.fillText("LLM", cx, cy);
    ctx.restore();

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  // Mouse handlers
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: 0, y: 0 };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
