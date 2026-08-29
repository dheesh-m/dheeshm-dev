"use client";

import { useRef, useEffect, useCallback, useState, memo } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

// ── 3D Vector & Matrix Math ──────────────────────────────────────────────────
interface Vec3 {
  x: number;
  y: number;
  z: number;
}

type Mat3 = [
  number, number, number,
  number, number, number,
  number, number, number
];

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
  return {
    x: m[0] * v.x + m[1] * v.y + m[2] * v.z,
    y: m[3] * v.x + m[4] * v.y + m[5] * v.z,
    z: m[6] * v.x + m[7] * v.y + m[8] * v.z,
  };
}

// 3 distinct 3D orbital planes creating authentic atomic motion
const PLANE_MATS: Mat3[] = [
  mulMat(rotateZ(0.38), rotateX(Math.PI / 5.2)),
  mulMat(rotateY(Math.PI / 3.4), rotateX(Math.PI / 2.3)),
  mulMat(rotateZ(-0.45), mulMat(rotateY(Math.PI / 2.8), rotateX(-Math.PI / 6.5))),
];

// 5 Satellite Nodes matching the reference design layout
interface NodeDefinition {
  id: string;
  label: string;
  sublabel?: string;
  iconType: "user" | "message" | "box" | "code" | "database";
  orbitPlane: number;
  startAngle: number;
  speed: number;
  radiusMultiplier: number;
  accentDark: string;
  accentLight: string;
}

const HERO_NODES: NodeDefinition[] = [
  {
    id: "agents",
    label: "AGENTS",
    iconType: "user",
    orbitPlane: 0,
    startAngle: -Math.PI * 0.45,
    speed: 0.14,
    radiusMultiplier: 1.05,
    accentDark: "#94a3b8",
    accentLight: "#394E6E",
  },
  {
    id: "rag",
    label: "RAG",
    iconType: "message",
    orbitPlane: 1,
    startAngle: Math.PI * 0.95,
    speed: -0.12,
    radiusMultiplier: 0.95,
    accentDark: "#94a3b8",
    accentLight: "#394E6E",
  },
  {
    id: "tools",
    label: "TOOLS",
    sublabel: "VECTOR DB",
    iconType: "box",
    orbitPlane: 1,
    startAngle: -Math.PI * 0.05,
    speed: 0.13,
    radiusMultiplier: 1.08,
    accentDark: "#94a3b8",
    accentLight: "#394E6E",
  },
  {
    id: "api",
    label: "API",
    iconType: "code",
    orbitPlane: 2,
    startAngle: Math.PI * 0.35,
    speed: -0.11,
    radiusMultiplier: 1.02,
    accentDark: "#94a3b8",
    accentLight: "#394E6E",
  },
  {
    id: "memory",
    label: "MEMORY",
    iconType: "database",
    orbitPlane: 2,
    startAngle: Math.PI * 0.72,
    speed: 0.12,
    radiusMultiplier: 0.96,
    accentDark: "#94a3b8",
    accentLight: "#394E6E",
  },
];

const FOCAL = 520;
const CAM_Z = 600;

function project(v: Vec3, cx: number, cy: number) {
  const dz = CAM_Z - v.z;
  const scale = dz > 10 ? FOCAL / dz : 0;
  return { sx: cx + v.x * scale, sy: cy + v.y * scale, scale, z: v.z };
}

// Precomputed Unit Ellipse points (36 segments is buttery smooth and eliminates trigonometric runtime load)
const ELLIPSE_SEGS = 36;
const UNIT_ELLIPSE: Array<{ cos: number; sin: number }> = Array.from(
  { length: ELLIPSE_SEGS + 1 },
  (_, i) => {
    const t = (i / ELLIPSE_SEGS) * Math.PI * 2;
    return { cos: Math.cos(t), sin: Math.sin(t) };
  }
);

function ellipsePts(mat: Mat3, rx: number, ry: number): Vec3[] {
  const pts: Vec3[] = new Array(ELLIPSE_SEGS + 1);
  for (let i = 0; i <= ELLIPSE_SEGS; i++) {
    const u = UNIT_ELLIPSE[i];
    pts[i] = applyMat(mat, { x: u.cos * rx, y: u.sin * ry, z: 0 });
  }
  return pts;
}

// ── Icon Path Renderers ──────────────────────────────────────────────────────
function drawUserIcon(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Head circle
  ctx.beginPath();
  ctx.arc(x, y - s * 0.28, s * 0.28, 0, Math.PI * 2);
  ctx.stroke();

  // Shoulder arch
  ctx.beginPath();
  ctx.arc(x, y + s * 0.48, s * 0.52, Math.PI * 1.15, Math.PI * 1.85, false);
  ctx.stroke();
  ctx.restore();
}

function drawMessageIcon(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const w = s * 0.9;
  const h = s * 0.7;
  const r = 2.5;

  ctx.beginPath();
  ctx.moveTo(x - w / 2 + r, y - h / 2);
  ctx.lineTo(x + w / 2 - r, y - h / 2);
  ctx.quadraticCurveTo(x + w / 2, y - h / 2, x + w / 2, y - h / 2 + r);
  ctx.lineTo(x + w / 2, y + h / 2 - r);
  ctx.quadraticCurveTo(x + w / 2, y + h / 2, x + w / 2 - r, y + h / 2);
  ctx.lineTo(x - w / 6, y + h / 2);
  ctx.lineTo(x - w / 2.5, y + h / 2 + s * 0.28);
  ctx.lineTo(x - w / 2.8, y + h / 2);
  ctx.lineTo(x - w / 2 + r, y + h / 2);
  ctx.quadraticCurveTo(x - w / 2, y + h / 2, x - w / 2, y + h / 2 - r);
  ctx.lineTo(x - w / 2, y - h / 2 + r);
  ctx.quadraticCurveTo(x - w / 2, y - h / 2, x - w / 2 + r, y - h / 2);
  ctx.stroke();

  // 2 inner chat lines
  ctx.beginPath();
  ctx.moveTo(x - w * 0.28, y - h * 0.12);
  ctx.lineTo(x + w * 0.28, y - h * 0.12);
  ctx.moveTo(x - w * 0.28, y + h * 0.16);
  ctx.lineTo(x + w * 0.12, y + h * 0.16);
  ctx.stroke();
  ctx.restore();
}

function drawBoxIcon(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const r = s * 0.58;
  const h = r * 0.5;

  // Isometric 3D cube
  // Top Face
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.lineTo(x + r * 0.86, y - h);
  ctx.lineTo(x, y);
  ctx.lineTo(x - r * 0.86, y - h);
  ctx.closePath();
  ctx.stroke();

  // Left Face
  ctx.beginPath();
  ctx.moveTo(x - r * 0.86, y - h);
  ctx.lineTo(x - r * 0.86, y + h);
  ctx.lineTo(x, y + r);
  ctx.lineTo(x, y);
  ctx.stroke();

  // Right Face
  ctx.beginPath();
  ctx.moveTo(x + r * 0.86, y - h);
  ctx.lineTo(x + r * 0.86, y + h);
  ctx.lineTo(x, y + r);
  ctx.stroke();

  ctx.restore();
}

function drawCodeIcon(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const w = s * 0.55;
  const h = s * 0.42;

  // Left bracket <
  ctx.beginPath();
  ctx.moveTo(x - w * 0.35, y - h);
  ctx.lineTo(x - w * 1.1, y);
  ctx.lineTo(x - w * 0.35, y + h);
  ctx.stroke();

  // Right bracket >
  ctx.beginPath();
  ctx.moveTo(x + w * 0.35, y - h);
  ctx.lineTo(x + w * 1.1, y);
  ctx.lineTo(x + w * 0.35, y + h);
  ctx.stroke();

  // Slash /
  ctx.beginPath();
  ctx.moveTo(x + w * 0.22, y - h * 1.15);
  ctx.lineTo(x - w * 0.22, y + h * 1.15);
  ctx.stroke();

  ctx.restore();
}

function drawDatabaseIcon(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const rx = s * 0.62;
  const ry = s * 0.22;
  const gap = s * 0.38;

  // Top Ellipse
  ctx.beginPath();
  ctx.ellipse(x, y - gap, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Middle Dish
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI);
  ctx.moveTo(x - rx, y - gap);
  ctx.lineTo(x - rx, y);
  ctx.moveTo(x + rx, y - gap);
  ctx.lineTo(x + rx, y);
  ctx.stroke();

  // Bottom Dish
  ctx.beginPath();
  ctx.ellipse(x, y + gap, rx, ry, 0, 0, Math.PI);
  ctx.moveTo(x - rx, y);
  ctx.lineTo(x - rx, y + gap);
  ctx.moveTo(x + rx, y);
  ctx.lineTo(x + rx, y + gap);
  ctx.stroke();

  ctx.restore();
}

function renderNodeIcon(ctx: CanvasRenderingContext2D, type: NodeDefinition["iconType"], x: number, y: number, size: number, color: string) {
  switch (type) {
    case "user":
      drawUserIcon(ctx, x, y, size, color);
      break;
    case "message":
      drawMessageIcon(ctx, x, y, size, color);
      break;
    case "box":
      drawBoxIcon(ctx, x, y, size, color);
      break;
    case "code":
      drawCodeIcon(ctx, x, y, size, color);
      break;
    case "database":
      drawDatabaseIcon(ctx, x, y, size, color);
      break;
  }
}

// ── Main Component ────────────────────────────────────────────────────────────
function OrbitalSystem3D() {
  const { isLightMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(performance.now());
  const isLightRef = useRef(isLightMode);
  const dprRef = useRef(1);

  useEffect(() => {
    isLightRef.current = isLightMode;
  }, [isLightMode]);

  // Mouse & interaction states
  const mouseRef = useRef({ x: 0, y: 0, rawX: 0, rawY: 0, isInside: false });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const hoveredNodeIdRef = useRef<string | null>(null);
  hoveredNodeIdRef.current = hoveredNodeId;

  // Node physics offsets for magnetic spring pull
  const nodePhysicsRef = useRef(
    HERO_NODES.map(() => ({
      currentOffset: { x: 0, y: 0 },
      targetOffset: { x: 0, y: 0 },
    }))
  );

  // Traveling data photons along spoke lines
  const dataPhotonsRef = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      nodeIndex: i % 5,
      progress: Math.random(),
      speed: 0.0035 + Math.random() * 0.004,
      size: 1.5 + Math.random() * 1.5,
    }))
  );

  // Orbital particles traveling along rings
  const orbitParticlesRef = useRef(
    Array.from({ length: 14 }, (_, i) => ({
      plane: i % 3,
      angle: Math.random() * Math.PI * 2,
      speed: 0.12 + Math.random() * 0.15,
      size: 1.0 + Math.random() * 1.6,
      alpha: 0.25 + Math.random() * 0.55,
    }))
  );

  // Hit targets for mouse testing
  const hitTargetsRef = useRef<Array<{ id: string; sx: number; sy: number; r: number }>>([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = dprRef.current || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const cx = W / 2;
    const cy = H / 2;
    const light = isLightRef.current;

    const t = (performance.now() - startTimeRef.current) / 1000;

    // Smooth Mouse Parallax
    smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.045;
    smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.045;
    const pmx = smoothMouseRef.current.x;
    const pmy = smoothMouseRef.current.y;

    // 3D Universe Rotation Matrix
    const autoRotY = rotateY(t * 0.04 + pmx * 0.24);
    const mouseTiltX = rotateX(-pmy * 0.20 + Math.sin(t * 0.035) * 0.06);
    const globalMat = mulMat(mouseTiltX, autoRotY);

    ctx.clearRect(0, 0, W, H);

    // ── 1. Soft Central Atmosphere Glow ──────────────────────────────────────
    const atmosR = Math.min(W, H) * 0.45;
    const atmosGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, atmosR);
    if (light) {
      atmosGrd.addColorStop(0, "rgba(57, 78, 110, 0.04)");
      atmosGrd.addColorStop(0.5, "rgba(57, 78, 110, 0.015)");
      atmosGrd.addColorStop(1, "transparent");
    } else {
      atmosGrd.addColorStop(0, "rgba(255, 255, 255, 0.03)");
      atmosGrd.addColorStop(0.5, "rgba(148, 163, 184, 0.015)");
      atmosGrd.addColorStop(1, "transparent");
    }
    ctx.fillStyle = atmosGrd;
    ctx.beginPath();
    ctx.arc(cx, cy, atmosR, 0, Math.PI * 2);
    ctx.fill();

    // ── 2. Safe Bounds & Orbital Radii (2x expansion on mobile) ────────────
    const isMobile = W < 640;
    const isTablet = W >= 640 && W < 1024;
    const baseRadiusX = isMobile ? Math.min(W * 0.46, 210) : isTablet ? W * 0.40 : Math.min(220, W * 0.38);
    const baseRadiusY = isMobile ? Math.min(H * 0.44, 180) : isTablet ? H * 0.38 : Math.min(170, H * 0.34);

    const orbitRadii = [
      { rx: baseRadiusX * (isMobile ? 1.45 : 1.08), ry: baseRadiusY * (isMobile ? 1.25 : 0.72) },
      { rx: baseRadiusX * (isMobile ? 1.20 : 0.88), ry: baseRadiusY * (isMobile ? 1.00 : 0.58) },
      { rx: baseRadiusX * (isMobile ? 0.95 : 0.68), ry: baseRadiusY * (isMobile ? 0.78 : 0.44) },
    ];

    // ── 3. Draw 3D Elliptical Magnetic Orbit Rings ───────────────────────────
    PLANE_MATS.forEach((mat, i) => {
      const { rx, ry } = orbitRadii[i];
      const pts = ellipsePts(mat, rx, ry);
      
      // Primary dashed orbit (#394E6E with defined 0.25-0.35 opacity)
      ctx.save();
      ctx.lineWidth = 0.95;
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = light ? "rgba(57, 78, 110, 0.32)" : "rgba(255, 255, 255, 0.18)";
      ctx.globalAlpha = light ? 0.35 : 0.22;

      ctx.beginPath();
      pts.forEach((p, idx) => {
        const trans = applyMat(globalMat, p);
        const { sx, sy } = project(trans, cx, cy);
        if (idx === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.closePath();
      ctx.stroke();

      // Secondary faint outer halo ring (barely visible guide)
      ctx.setLineDash([]);
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = light ? "rgba(57, 78, 110, 0.18)" : "rgba(255, 255, 255, 0.06)";
      ctx.globalAlpha = light ? 0.20 : 0.1;
      ctx.stroke();

      ctx.restore();
    });

    // ── 4. Draw Orbiting Dust Particles along Rings ───────────────────────────
    orbitParticlesRef.current.forEach((op) => {
      op.angle += op.speed * 0.012;
      const { rx, ry } = orbitRadii[op.plane];
      const ptLocal: Vec3 = {
        x: Math.cos(op.angle) * rx,
        y: Math.sin(op.angle) * ry,
        z: 0,
      };
      const inPlane = applyMat(PLANE_MATS[op.plane], ptLocal);
      const world = applyMat(globalMat, inPlane);
      const proj = project(world, cx, cy);

      ctx.save();
      ctx.fillStyle = light ? "#394E6E" : "#ffffff";
      ctx.globalAlpha = op.alpha * (light ? 0.70 : 0.25);
      ctx.beginPath();
      ctx.arc(proj.sx, proj.sy, op.size * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // ── 5. Project All 5 Satellite Nodes with Magnetic Physics ────────────────
    const newHitTargets: typeof hitTargetsRef.current = [];

    interface RenderNode {
      def: NodeDefinition;
      sx: number;
      sy: number;
      z: number;
      depth: number;
      alpha: number;
      r: number;
      isHovered: boolean;
    }

    const projectedNodes: RenderNode[] = HERO_NODES.map((def, idx) => {
      const { rx, ry } = orbitRadii[def.orbitPlane];
      const angle = def.startAngle + t * def.speed;

      // Harmonic 3D drift oscillation
      const driftX = Math.sin(t * 1.5 + def.startAngle) * 4;
      const driftY = Math.cos(t * 1.2 + def.startAngle) * 3;
      const driftZ = Math.sin(t * 1.8 + def.startAngle) * 5;

      const local: Vec3 = {
        x: Math.cos(angle) * rx * def.radiusMultiplier + driftX,
        y: Math.sin(angle) * ry * def.radiusMultiplier + driftY,
        z: driftZ,
      };

      const inPlane = applyMat(PLANE_MATS[def.orbitPlane], local);
      const world = applyMat(globalMat, inPlane);
      const proj = project(world, cx, cy);

      // Magnetic Cursor Attraction Force
      let magnetDx = 0;
      let magnetDy = 0;
      if (mouseRef.current.isInside) {
        const d = Math.hypot(mouseRef.current.rawX - proj.sx, mouseRef.current.rawY - proj.sy);
        const PROXIMITY = 100;
        if (d < PROXIMITY && d > 1) {
          const force = Math.pow(1 - d / PROXIMITY, 2) * 20;
          magnetDx = ((mouseRef.current.rawX - proj.sx) / d) * force;
          magnetDy = ((mouseRef.current.rawY - proj.sy) / d) * force;
        }
      }

      // Smooth offset spring interpolation
      const physics = nodePhysicsRef.current[idx];
      physics.targetOffset.x = magnetDx;
      physics.targetOffset.y = magnetDy;
      physics.currentOffset.x += (physics.targetOffset.x - physics.currentOffset.x) * 0.18;
      physics.currentOffset.y += (physics.targetOffset.y - physics.currentOffset.y) * 0.18;

      const finalSx = proj.sx + physics.currentOffset.x;
      const finalSy = proj.sy + physics.currentOffset.y;

      const depth = (world.z + 240) / 480;
      const alpha = Math.max(0.4, Math.min(1.0, 0.45 + depth * 0.55));
      const isHovered = hoveredNodeIdRef.current === def.id;

      // Base radius of glossy glass satellite spheres (18-22px)
      const baseR = isMobile ? 15 : isTablet ? 18 : 22;
      const r = baseR * (0.75 + depth * 0.5) * (isHovered ? 1.15 : 1.0);

      newHitTargets.push({ id: def.id, sx: finalSx, sy: finalSy, r });

      return {
        def,
        sx: finalSx,
        sy: finalSy,
        z: world.z,
        depth,
        alpha,
        r,
        isHovered,
      };
    });

    // ── 6. Draw Spoke Energy Lines from LLM Core -> Nodes ────────────────────
    projectedNodes.forEach((node) => {
      ctx.save();
      const isEnergized = node.isHovered;
      ctx.strokeStyle = light
        ? isEnergized ? "rgba(57, 78, 110, 0.85)" : "rgba(57, 78, 110, 0.32)"
        : isEnergized ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = isEnergized ? 1.6 : 0.95;
      ctx.globalAlpha = isEnergized ? 0.95 : (0.25 + node.depth * 0.20);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(node.sx, node.sy);
      ctx.stroke();

      if (isEnergized) {
        ctx.strokeStyle = light ? "rgba(57, 78, 110, 0.25)" : "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      ctx.restore();
    });

    // ── 7. Draw Traveling Data Photons along Spoke Lines ──────────────────────
    dataPhotonsRef.current.forEach((p) => {
      const node = projectedNodes[p.nodeIndex];
      p.progress += p.speed * 0.85;
      if (p.progress >= 1) p.progress = 0;

      const px = cx + (node.sx - cx) * p.progress;
      const py = cy + (node.sy - cy) * p.progress;

      ctx.save();
      ctx.fillStyle = light ? "#394E6E" : "#ffffff";
      ctx.globalAlpha = light ? 0.85 : 0.40;
      ctx.beginPath();
      ctx.arc(px, py, p.size * 0.75, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // ── 8. Global Depth-Sorting of Core & Satellite Nodes ─────────────────────
    type HeroZItem = 
      | { type: "core"; z: 0 }
      | { type: "satellite"; node: RenderNode; z: number };

    const zItems: HeroZItem[] = [
      { type: "core", z: 0 },
      ...projectedNodes.map(node => ({ type: "satellite" as const, node, z: node.z })),
    ];

    zItems.sort((a, b) => a.z - b.z);

    zItems.forEach((item) => {
      if (item.type === "core") {
        // Draw Central LLM Core
        const coreR = (isMobile ? 26 : isTablet ? 30 : 36) * (1 + Math.sin(t * 1.4) * 0.03);
        drawCentralLLMCore(ctx, cx, cy, coreR, light, t);
      } else {
        // Draw Glossy Glass Satellite Node
        const node = item.node;
        drawGlossySatelliteSphere(ctx, node.sx, node.sy, node.r, node.def, light, node.alpha, node.isHovered);
        drawSatelliteLabels(ctx, node.sx, node.sy, node.r, node.def, light, node.alpha, node.isHovered, isMobile);
      }
    });

    hitTargetsRef.current = newHitTargets;
    rafRef.current = requestAnimationFrame(draw);
  }, []);

  // ── Drawing Sub-Routines ───────────────────────────────────────────────────

  function drawCentralLLMCore(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    light: boolean,
    t: number
  ) {
    ctx.save();

    // 1. Subtle, restrained ambient bloom (#394E6E)
    const bloomR = r * 1.6;
    const bloomGrd = ctx.createRadialGradient(x, y, r * 0.5, x, y, bloomR);
    if (light) {
      bloomGrd.addColorStop(0, "rgba(57, 78, 110, 0.06)");
      bloomGrd.addColorStop(0.6, "rgba(57, 78, 110, 0.02)");
      bloomGrd.addColorStop(1, "transparent");
    } else {
      bloomGrd.addColorStop(0, "rgba(255, 255, 255, 0.05)");
      bloomGrd.addColorStop(0.6, "rgba(148, 163, 184, 0.02)");
      bloomGrd.addColorStop(1, "transparent");
    }
    ctx.fillStyle = bloomGrd;
    ctx.beginPath();
    ctx.arc(x, y, bloomR, 0, Math.PI * 2);
    ctx.fill();

    // 2. Rotating orbital ring around central sphere
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(t * 0.4);
    ctx.scale(1, 0.42);
    ctx.strokeStyle = light ? "rgba(57, 78, 110, 0.25)" : "rgba(255, 255, 255, 0.28)";
    ctx.lineWidth = 0.9;
    ctx.globalAlpha = light ? 0.35 : 0.3;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 3. 3D Glass / Chrome Sphere Body (#394E6E steel-blue system)
    const sphereGrd = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, 0, x, y, r);
    if (light) {
      sphereGrd.addColorStop(0, "#6A82A5");
      sphereGrd.addColorStop(0.35, "#4B638A");
      sphereGrd.addColorStop(0.75, "#394E6E");
      sphereGrd.addColorStop(1, "#2B3C56");
    } else {
      sphereGrd.addColorStop(0, "#ffffff");
      sphereGrd.addColorStop(0.15, "#94a3b8");
      sphereGrd.addColorStop(0.40, "#334155");
      sphereGrd.addColorStop(0.72, "#0f172a");
      sphereGrd.addColorStop(1, "#030712");
    }
    ctx.fillStyle = sphereGrd;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // 4. Luminous rim edge highlight
    ctx.strokeStyle = light ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.88)";
    ctx.lineWidth = 1.3;
    ctx.stroke();

    // 5. Specular Reflection Arc (High-gloss glass look)
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x - r * 0.28, y - r * 0.28, r * 0.38, r * 0.22, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fill();
    ctx.restore();

    // 6. Central Bold LLM Typography
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${Math.round(r * 0.56)}px "Manrope", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = "1px";

    // Fast-path text shadow: Sub-pixel pass on mobile, minimal blur on desktop
    if (!light) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
      ctx.fillText("LLM", x + 1, y + 1);
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillText("LLM", x, y);

    ctx.restore();
  }

  function drawGlossySatelliteSphere(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    def: NodeDefinition,
    light: boolean,
    alpha: number,
    isHovered: boolean
  ) {
    ctx.save();
    ctx.globalAlpha = isHovered ? 1.0 : alpha;

    // 1. Ambient Halo (minimal, restrained #394E6E)
    const haloR = r * (isHovered ? 1.5 : 1.3);
    const haloGrd = ctx.createRadialGradient(x, y, r * 0.5, x, y, haloR);
    haloGrd.addColorStop(0, light ? "rgba(57, 78, 110, 0.08)" : "rgba(255, 255, 255, 0.08)");
    haloGrd.addColorStop(1, "transparent");
    ctx.fillStyle = haloGrd;
    ctx.beginPath();
    ctx.arc(x, y, haloR, 0, Math.PI * 2);
    ctx.fill();

    // 2. Glossy Glass Sphere Body (#394E6E steel-blue system)
    const sphereGrd = ctx.createRadialGradient(x - r * 0.32, y - r * 0.32, 0, x, y, r);
    if (light) {
      sphereGrd.addColorStop(0, "#8DA4C4");
      sphereGrd.addColorStop(0.35, "#5B759E");
      sphereGrd.addColorStop(0.75, "#445C80");
      sphereGrd.addColorStop(1, "#394E6E");
    } else {
      sphereGrd.addColorStop(0, "#ffffff");
      sphereGrd.addColorStop(0.20, "#64748b");
      sphereGrd.addColorStop(0.55, "#1e293b");
      sphereGrd.addColorStop(0.85, "#0f172a");
      sphereGrd.addColorStop(1, "#020617");
    }
    ctx.fillStyle = sphereGrd;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // 3. Crisp Glass Border
    ctx.strokeStyle = light
      ? (isHovered ? "#2B3C56" : "rgba(255, 255, 255, 0.85)")
      : (isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.75)");
    ctx.lineWidth = isHovered ? 1.6 : 1.1;
    ctx.stroke();

    // 4. Specular Shine
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x - r * 0.25, y - r * 0.25, r * 0.32, r * 0.18, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.fill();
    ctx.restore();

    // 5. Draw Icon inside the sphere
    const iconSize = r * 0.85;
    const iconColor = light
      ? (isHovered ? "#ffffff" : "#ffffff")
      : (isHovered ? "#ffffff" : "#f8fafc");
    renderNodeIcon(ctx, def.iconType, x, y, iconSize, iconColor);

    ctx.restore();
  }

  function drawSatelliteLabels(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    def: NodeDefinition,
    light: boolean,
    alpha: number,
    isHovered: boolean,
    isMobile: boolean
  ) {
    ctx.save();
    ctx.globalAlpha = isHovered ? 1.0 : Math.min(1.0, alpha * 1.3);

    ctx.font = `bold ${isMobile ? 8.5 : 10.5}px "Manrope", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.letterSpacing = "0.8px";

    // Fast-path text shadow for 60fps mobile
    if (!light) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
      ctx.fillText(def.label, x + 0.8, y + r + 5.8);
    } else {
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillText(def.label, x + 0.8, y + r + 5.8);
    }

    ctx.fillStyle = isHovered
      ? (light ? "#171A1F" : "#ffffff")
      : (light ? "#334155" : "#f1f5f9");
    ctx.fillText(def.label, x, y + r + 5);

    // Sublabel (e.g. VECTOR DB under TOOLS)
    if (def.sublabel) {
      ctx.font = `600 ${isMobile ? 7 : 8}px "JetBrains Mono", monospace`;
      ctx.letterSpacing = "0.6px";
      if (!light) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillText(def.sublabel, x + 0.6, y + r + (isMobile ? 16.6 : 19.6));
      }
      ctx.fillStyle = isHovered
        ? (light ? "#394E6E" : "#cbd5e1")
        : (light ? "#66717D" : "#94a3b8");
      ctx.fillText(def.sublabel, x, y + r + (isMobile ? 16 : 19));
    }

    ctx.restore();
  }

  // ── Resize Observer ────────────────────────────────────────────────────────
  const containerRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isVisible = true;

    const resize = () => {
      const isMobileScreen = window.innerWidth < 640;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobileScreen ? 1.5 : 2);
      dprRef.current = dpr;
      const rect = container.getBoundingClientRect();
      containerRectRef.current = rect;
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && !document.hidden) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else if (isVisible) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  // ── Mouse & Touch Event Handlers ───────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    let rect = containerRectRef.current;
    if (!rect) {
      rect = containerRef.current?.getBoundingClientRect() ?? null;
      containerRectRef.current = rect;
    }
    if (!rect) return;

    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    mouseRef.current.rawX = clientX;
    mouseRef.current.rawY = clientY;
    mouseRef.current.isInside = true;
    mouseRef.current.x = (clientX / rect.width - 0.5) * 2;
    mouseRef.current.y = -(clientY / rect.height - 0.5) * 2;

    // Hit-testing
    let found: string | null = null;
    for (const target of hitTargetsRef.current) {
      const d = Math.hypot(clientX - target.sx, clientY - target.sy);
      if (d <= target.r + 12) {
        found = target.id;
        break;
      }
    }

    if (found) {
      if (hoveredNodeIdRef.current !== found) {
        hoveredNodeIdRef.current = found;
        setHoveredNodeId(found);
      }
      if (containerRef.current) containerRef.current.style.cursor = "pointer";
    } else {
      if (hoveredNodeIdRef.current !== null) {
        hoveredNodeIdRef.current = null;
        setHoveredNodeId(null);
      }
      if (containerRef.current) containerRef.current.style.cursor = "default";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.isInside = false;
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
    hoveredNodeIdRef.current = null;
    setHoveredNodeId(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
}

export default memo(OrbitalSystem3D);
