"use client";

import { memo, useRef, useEffect, useCallback, useState } from "react";
import { Technology } from "@/data/technologies";
import { useTheme } from "@/components/providers/ThemeProvider";

// ── Types ────────────────────────────────────────────────────────────────────
interface Vec3 { x: number; y: number; z: number }
type Mat3 = [number, number, number, number, number, number, number, number, number];

interface SystemHubProps {
  category: string;
  title: string;
  technologies: Technology[];
  positionClass?: string;
  activeNode: Technology | null;
  activeHub: string | null;
  onNodeHover: (tech: Technology | null, rect: DOMRect | null) => void;
  onHubHover: (category: string | null) => void;
  isAnimating: boolean;
}

// ── 3D Matrix Math ───────────────────────────────────────────────────────────
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

// 3 orbital plane orientations matching the Hero section style
const ORBIT_PLANES: Mat3[] = [
  mulMat(rotateZ(0.3), rotateX(Math.PI / 6)),
  mulMat(rotateY(Math.PI / 4), rotateX(Math.PI / 2.5)),
  mulMat(rotateZ(-0.4), mulMat(rotateY(Math.PI / 3), rotateX(-Math.PI / 8))),
];

const FOCAL = 440;
const CAM_Z = 500;

function project(v: Vec3, cx: number, cy: number) {
  const dz = CAM_Z - v.z;
  const scale = dz > 10 ? FOCAL / dz : 0;
  return {
    sx: cx + v.x * scale,
    sy: cy + v.y * scale,
    scale,
    z: v.z,
  };
}

function ellipsePts(mat: Mat3, rx: number, ry: number, segs = 80): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i <= segs; i++) {
    const t = (i / segs) * Math.PI * 2;
    pts.push(applyMat(mat, { x: Math.cos(t) * rx, y: Math.sin(t) * ry, z: 0 }));
  }
  return pts;
}

function getCenterCode(cat: string): string {
  if (cat.includes("AI") || cat.includes("LLM")) return "LLM";
  if (cat.includes("Data") || cat.includes("Cloud")) return "DATA";
  if (cat.includes("Backend") || cat.includes("API")) return "API";
  if (cat.includes("Full")) return "STACK";
  return "CORE";
}

function SystemHub({
  category,
  title,
  technologies,
  activeNode,
  activeHub,
  onNodeHover,
  onHubHover,
  isAnimating,
}: SystemHubProps) {
  const { isLightMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(performance.now());
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const isLightRef = useRef(isLightMode);

  // Sync theme ref
  useEffect(() => {
    isLightRef.current = isLightMode;
  }, [isLightMode]);

  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);

  const activeNodeRef = useRef(activeNode);
  const hoveredTechIdRef = useRef<string | null>(null);
  activeNodeRef.current = activeNode;
  hoveredTechIdRef.current = hoveredTechId;

  // Node configuration with evenly distributed start angles and non-overlapping orbits
  const nodeConfigs = useRef(
    (() => {
      const orbitGroups: number[][] = [[], [], []];
      technologies.forEach((_, i) => {
        orbitGroups[i % 3].push(i);
      });

      return technologies.map((tech, i) => {
        const orbit = i % 3;
        const group = orbitGroups[orbit];
        const indexInOrbit = group.indexOf(i);
        const countInOrbit = Math.max(1, group.length);

        // Evenly space angles per orbit with a phase shift per orbit
        const phaseShift = (orbit * Math.PI * 2) / 3 + 0.4;
        const startAngle = (indexInOrbit / countInOrbit) * Math.PI * 2 + phaseShift;
        // Alternate directions and vary speeds so nodes stay nicely separated in 3D
        const dir = orbit === 1 ? -1 : 1;
        const speed = dir * (0.13 + orbit * 0.025 + indexInOrbit * 0.012);

        return {
          tech,
          orbit,
          startAngle,
          speed,
        };
      });
    })()
  );

  // Hit targets for mouse hover
  const hitTargetsRef = useRef<
    Array<{
      tech: Technology;
      sx: number;
      sy: number;
      r: number;
    }>
  >([]);

  const centerCode = getCenterCode(category);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const cx = W / 2;
    const cy = (H - 24) / 2; // Offset center slightly upward to leave clearance for bottom title
    const light = isLightRef.current;

    // Smooth mouse parallax
    smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.04;
    smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.04;
    const mx = smoothMouseRef.current.x;
    const my = smoothMouseRef.current.y;

    const t = (performance.now() - startTimeRef.current) / 1000;

    // Global rotation matrix: slow auto-rotate Y + mouse tilt
    const autoRotY = rotateY(t * 0.07 + mx * 0.3);
    const mouseTiltX = rotateX(-my * 0.25 + Math.sin(t * 0.04) * 0.08);
    const globalMat = mulMat(mouseTiltX, autoRotY);

    ctx.clearRect(0, 0, W, H);

    // ── Atmospheric glow around center (Subtle #394E6E in light mode) ─────────
    const glowR = Math.min(W, H) * 0.40;
    const atmosGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
    if (light) {
      atmosGrd.addColorStop(0, "rgba(57, 78, 110, 0.05)");
      atmosGrd.addColorStop(0.5, "rgba(57, 78, 110, 0.015)");
      atmosGrd.addColorStop(1, "transparent");
    } else {
      atmosGrd.addColorStop(0, "rgba(180, 180, 190, 0.03)");
      atmosGrd.addColorStop(1, "transparent");
    }
    ctx.fillStyle = atmosGrd;
    ctx.beginPath();
    ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
    ctx.fill();

    // ── Safe Dynamic Boundary Calculation (Expanded for Mobile) ───────────────
    const isMobile = W < 640;
    const insetPct = W >= 1024 ? 0.08 : (W >= 640 ? 0.08 : 0.03);
    const marginPad = isMobile ? 16 : 38;
    const safeHalfW = Math.max(105, (W * (1 - 2 * insetPct)) * 0.5 - marginPad);
    const safeHalfH = Math.max(90, (H * (1 - 2 * insetPct)) * 0.5 - marginPad);

    const MAX_PERSPECTIVE_FACTOR = isMobile ? 1.15 : 1.25;
    const maxSafeRadiusX = safeHalfW / MAX_PERSPECTIVE_FACTOR;
    const maxSafeRadiusY = safeHalfH / MAX_PERSPECTIVE_FACTOR;

    // Strict Orbital Hierarchy: Outer: 94%, Middle: 68%, Inner: 44%
    const orbitRadii = [
      { rx: maxSafeRadiusX * 0.94, ry: maxSafeRadiusY * 0.94 },
      { rx: maxSafeRadiusX * 0.68, ry: maxSafeRadiusY * 0.68 },
      { rx: maxSafeRadiusX * 0.44, ry: maxSafeRadiusY * 0.44 },
    ];

    // ── 1. Calculate 3D Projected Positions with Strict Boundary Clamping ────
    const currentHitTargets: typeof hitTargetsRef.current = [];

    const projectedNodes = nodeConfigs.current.map((cfg) => {
      const { rx, ry } = orbitRadii[cfg.orbit];
      const angle = cfg.startAngle + t * cfg.speed;
      const local: Vec3 = {
        x: Math.cos(angle) * rx,
        y: Math.sin(angle) * ry,
        z: 0,
      };

      const inPlane = applyMat(ORBIT_PLANES[cfg.orbit], local);
      const world = applyMat(globalMat, inPlane);
      const proj = project(world, cx, cy);

      const depth = (world.z + 220) / 440;
      const alpha = Math.max(0.35, Math.min(1.0, 0.35 + depth * 0.65));
      const r = Math.max(isMobile ? 3.8 : 5.5, (isMobile ? 6.8 : 10.5) * (0.6 + depth * 0.75));

      // Calculate exact visual footprint for safe containment
      const fontSize = isMobile ? Math.max(7, Math.min(8.5, r * 0.9)) : Math.max(8.5, r * 0.95);
      ctx.font = `bold ${fontSize}px "Manrope", system-ui, sans-serif`;
      const textMetrics = ctx.measureText(cfg.tech.name.toUpperCase());
      const labelHalfW = textMetrics.width / 2 + 3;
      const footprintX = Math.max(r * 1.3, labelHalfW) + 3;
      const footprintTop = r * 1.3 + 3;
      const footprintBottom = (r + 3 + 12) + 3;

      // Clamp coordinates within container safe margin
      const safeMinX = footprintX;
      const safeMaxX = W - footprintX;
      const safeMinY = footprintTop;
      const safeMaxY = H - footprintBottom - (isMobile ? 18 : 26);

      const safeSx = Math.max(safeMinX, Math.min(safeMaxX, proj.sx));
      const safeSy = Math.max(safeMinY, Math.min(safeMaxY, proj.sy));

      const isHovered =
        hoveredTechIdRef.current === cfg.tech.id ||
        activeNodeRef.current?.id === cfg.tech.id;

      return {
        tech: cfg.tech,
        world,
        sx: safeSx,
        sy: safeSy,
        depth,
        alpha,
        r,
        fontSize,
        isHovered,
      };
    });

    // ── 2. Draw Orbital Rings (#394E6E on Light, Grey on Dark) ────────
    ctx.save();
    ctx.globalAlpha = light ? 0.32 : 0.18;
    ctx.strokeStyle = light ? "#394E6E" : "#6b7280";
    ctx.lineWidth = 0.95;
    ctx.setLineDash([6, 5]);

    ORBIT_PLANES.forEach((mat, i) => {
      const { rx, ry } = orbitRadii[i];
      const pts = ellipsePts(mat, rx, ry);
      ctx.beginPath();
      pts.forEach((p, idx) => {
        const trans = applyMat(globalMat, p);
        const { sx, sy } = project(trans, cx, cy);
        if (idx === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.closePath();
      ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.restore();

    // ── 3. Draw Connection Lines (#394E6E on Light, Grey on Dark) ─────────
    const sortedNodes = [...projectedNodes].sort((a, b) => a.depth - b.depth);
    const lineColor = light ? "#394E6E" : "#9ca3af";

    sortedNodes.forEach((node) => {
      ctx.save();
      const baseLineAlpha = light ? (0.25 + node.depth * 0.15) : (0.12 + node.depth * 0.18);
      ctx.globalAlpha = node.isHovered ? 0.90 : baseLineAlpha;
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = node.isHovered ? 1.6 : 0.95;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(node.sx, node.sy);
      ctx.stroke();
      ctx.restore();
    });

    // ── 4. Draw Nodes (#394E6E system on Light, Technical Grey on Dark) ─────
    const nodeSphereColor = light ? "#394E6E" : "#374151";
    const nodeGlowColor = light ? "#394E6E" : "#9ca3af";
    const nodeTextColor = light ? "#171A1F" : "#e5e7eb";

    sortedNodes.forEach((node) => {
      // Draw Sphere
      drawSphere(ctx, node.sx, node.sy, node.r, nodeSphereColor, nodeGlowColor, node.alpha);

      // Draw Floating Label
      drawLabel(ctx, node.tech.name, node.sx, node.sy, node.r, node.alpha, nodeTextColor, node.fontSize);

      currentHitTargets.push({
        tech: node.tech,
        sx: node.sx,
        sy: node.sy,
        r: node.r,
      });
    });

    // ── 5. Draw Central Core Sphere ──────────────────────────────────────────
    const coreR = isMobile ? 19 : 24;
    const pulse = 1 + Math.sin(t * 1.8) * 0.06;

    // Pulsing outer halo
    ctx.save();
    ctx.globalAlpha = light ? 0.12 : 0.06;
    const haloGrd = ctx.createRadialGradient(cx, cy, coreR * 0.5, cx, cy, coreR * 2.0 * pulse);
    haloGrd.addColorStop(0, light ? "rgba(57, 78, 110, 0.25)" : "rgba(200, 200, 210, 0.25)");
    haloGrd.addColorStop(1, "transparent");
    ctx.fillStyle = haloGrd;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * 2.0 * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Central Sphere (Steel-Blue on Light, Charcoal/Grey on Dark)
    drawSphere(
      ctx, cx, cy, coreR,
      light ? "#394E6E" : "#1f2937",
      light ? "#2B3C56" : "#9ca3af",
      1.0
    );

    // Central Text
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${isMobile ? 10 : 11.5}px "Manrope", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.98;
    ctx.fillText(centerCode, cx, cy);
    ctx.restore();

    hitTargetsRef.current = currentHitTargets;

    rafRef.current = requestAnimationFrame(draw);
  }, [centerCode]);

  // ── Drawing Helpers ────────────────────────────────────────────────────────
  function drawSphere(
    ctx: CanvasRenderingContext2D,
    sx: number,
    sy: number,
    r: number,
    color: string,
    glowColor: string,
    alpha: number
  ) {
    ctx.save();
    ctx.globalAlpha = alpha;

    // Ambient Glow (Toned down)
    const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 1.8);
    grd.addColorStop(0, glowColor + "28");
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(sx, sy, r * 1.8, 0, Math.PI * 2);
    ctx.fill();

    // 3D Spherical Core
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

  function drawLabel(
    ctx: CanvasRenderingContext2D,
    text: string,
    sx: number,
    sy: number,
    r: number,
    alpha: number,
    textColor: string,
    fontSize: number = 8.5
  ) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, alpha * 1.3);
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px "Manrope", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.letterSpacing = "0.5px";
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 1;
    ctx.fillText(text.toUpperCase(), sx, sy + r + 3.5);
    ctx.restore();
  }

  // ── Resize Observer & Animation Gate ───────────────────────────────────────
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

    if (isAnimating) {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw, isAnimating]);

  // ── Mouse & Touch Event Handlers ───────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Parallax values [-1, 1]
      mouseRef.current = {
        x: (mouseX / rect.width - 0.5) * 2,
        y: -(mouseY / rect.height - 0.5) * 2,
      };

      // Check hit testing against nodes
      let found: Technology | null = null;
      for (const target of hitTargetsRef.current) {
        const d = Math.hypot(mouseX - target.sx, mouseY - target.sy);
        if (d <= target.r + 14) {
          found = target.tech;
          break;
        }
      }

      if (found) {
        if (hoveredTechIdRef.current !== found.id) {
          hoveredTechIdRef.current = found.id;
          setHoveredTechId(found.id);
          onNodeHover(found, rect);
        }
        if (containerRef.current) containerRef.current.style.cursor = "pointer";
      } else {
        if (hoveredTechIdRef.current !== null) {
          hoveredTechIdRef.current = null;
          setHoveredTechId(null);
          onNodeHover(null, null);
        }
        if (containerRef.current) containerRef.current.style.cursor = "default";
      }
    },
    [onNodeHover]
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: 0, y: 0 };
    setHoveredTechId(null);
    onNodeHover(null, null);
    onHubHover(null);
  }, [onNodeHover, onHubHover]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center w-full max-w-[560px] h-[380px] sm:h-[440px] lg:h-[480px] select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onHubHover(category)}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />

      {/* Adaptive Bottom Category Badge */}
      <div className="absolute bottom-2 z-20 pointer-events-none">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/90 dark:bg-[#121218]/90 backdrop-blur-md border border-[#394E6E]/25 dark:border-white/15 shadow-[0_4px_16px_rgba(57,78,110,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)] text-[#171A1F] dark:text-white/90 text-[11px] font-bold font-mono tracking-widest uppercase">
          {title}
        </span>
      </div>
    </div>
  );
}

export default memo(SystemHub);
