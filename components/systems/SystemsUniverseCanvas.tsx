"use client";

import { memo, useRef, useEffect, useCallback, useState } from "react";
import { Technology, systemTechnologies, aiTechnologies } from "@/data/technologies";
import { useTheme } from "@/components/providers/ThemeProvider";

// ── 3D Geometry & Matrix Math ────────────────────────────────────────────────
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

// 3 distinct 3D orbital plane orientations per satellite hub (Preserving authentic atom motion)
const ORBIT_PLANES: Mat3[] = [
  mulMat(rotateZ(0.42), rotateX(Math.PI / 4.8)),
  mulMat(rotateY(Math.PI / 3.2), rotateX(Math.PI / 2.1)),
  mulMat(rotateZ(-0.48), mulMat(rotateY(Math.PI / 2.5), rotateX(-Math.PI / 6.2))),
];

const FOCAL = 760;
const CAM_Z = 880;

function project(v: Vec3, cx: number, cy: number, zoom: number = 1) {
  const dz = CAM_Z - v.z;
  const scale = dz > 10 ? (FOCAL / dz) * zoom : 0;
  return {
    sx: cx + v.x * scale,
    sy: cy + v.y * scale,
    scale,
    z: v.z,
  };
}

// Precomputed Unit Ellipse points (36 segments for 60fps mobile execution)
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

// ── Hub Configurations ───────────────────────────────────────────────────────
interface HubMeta {
  id: string;
  category: string;
  code: string;
  title: string;
  subtitle: string;
  accentColor: string;
  glowColor: string;
  sphereColorDark: string;
  sphereColorLight: string;
  relX: number;
  relY: number;
  technologies: Technology[];
}

interface SystemsUniverseCanvasProps {
  activeNode: Technology | null;
  activeHub: string | null;
  onNodeHover: (tech: Technology | null, rect: DOMRect | null) => void;
  onNodeClick: (tech: Technology) => void;
  onHubHover: (hubId: string | null) => void;
  isAnimating: boolean;
}

function SystemsUniverseCanvas({
  activeNode,
  activeHub,
  onNodeHover,
  onNodeClick,
  onHubHover,
  isAnimating,
}: SystemsUniverseCanvasProps) {
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

  // Mouse, drag, and zoom state
  const mouseRef = useRef({ x: 0, y: 0, rawX: 0, rawY: 0, isInside: false });
  const smoothMouseRef = useRef({ x: 0, y: 0 });

  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0, y: 0 }); // Global manual rotation from drag
  const rotVelRef = useRef({ x: 0, y: 0 }); // Momentum velocity

  const zoomRef = useRef(1);
  const targetZoomRef = useRef(1);

  const activeNodeRef = useRef(activeNode);
  const activeHubRef = useRef(activeHub);
  activeNodeRef.current = activeNode;
  activeHubRef.current = activeHub;

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const hoveredNodeIdRef = useRef<string | null>(null);
  hoveredNodeIdRef.current = hoveredNodeId;

  // Exact 4 clusters matching reference layout with restrained graphite/silver palette
  const hubsRef = useRef<HubMeta[]>([
    {
      id: "ai",
      category: "AI / LLM Engineering",
      code: "LLM",
      title: "AI & LLM INFRA",
      subtitle: "LLM ORCHESTRATION",
      accentColor: "#cbd5e1",
      glowColor: "rgba(203, 213, 225, 0.18)",
      sphereColorDark: "#334155",
      sphereColorLight: "#394E6E",
      relX: -1,
      relY: -0.74,
      technologies: aiTechnologies,
    },
    {
      id: "data",
      category: "Data & Cloud Infra",
      code: "DATA",
      title: "DATA & CLOUD",
      subtitle: "DATA PIPELINES & CLOUD",
      accentColor: "#94a3b8",
      glowColor: "rgba(148, 163, 184, 0.18)",
      sphereColorDark: "#1e293b",
      sphereColorLight: "#394E6E",
      relX: 1,
      relY: -0.70,
      technologies: systemTechnologies.filter(t => t.category === "Data & Cloud Infra"),
    },
    {
      id: "backend",
      category: "Backend & APIs",
      code: "API",
      title: "BACKEND & APIS",
      subtitle: "HIGH-PERFORMANCE APIs",
      accentColor: "#cbd5e1",
      glowColor: "rgba(203, 213, 225, 0.18)",
      sphereColorDark: "#1e293b",
      sphereColorLight: "#394E6E",
      relX: -1,
      relY: 0.74,
      technologies: systemTechnologies.filter(t => t.category === "Backend & APIs"),
    },
    {
      id: "fullstack",
      category: "Full-Stack",
      code: "STACK",
      title: "FULL-STACK",
      subtitle: "MODERN WEB EXPERIENCES",
      accentColor: "#a1a1aa",
      glowColor: "rgba(161, 161, 170, 0.18)",
      sphereColorDark: "#334155",
      sphereColorLight: "#394E6E",
      relX: 1,
      relY: 0.74,
      technologies: systemTechnologies.filter(t => t.category === "Full-Stack"),
    },
  ]);

  // Node configurations for orbital 3D physics per hub (Maximized angular separation)
  const nodeConfigsRef = useRef(
    (() => {
      const allConfigs: Array<{
        tech: Technology;
        hubId: string;
        orbit: number;
        startAngle: number;
        speed: number;
        radiusMultiplier: number;
        // Magnetic physics state
        currentOffset: { x: number; y: number; z: number };
        targetOffset: { x: number; y: number; z: number };
        vel: { x: number; y: number; z: number };
      }> = [];

      hubsRef.current.forEach((hub) => {
        const orbitGroups: number[][] = [[], [], []];
        hub.technologies.forEach((_, i) => {
          orbitGroups[i % 3].push(i);
        });

        hub.technologies.forEach((tech, i) => {
          const orbit = i % 3;
          const group = orbitGroups[orbit];
          const indexInOrbit = group.indexOf(i);
          const countInOrbit = Math.max(1, group.length);

          // Perfectly distributed angles around the full 360 ellipse
          const angleStep = (Math.PI * 2) / countInOrbit;
          const orbitPhase = orbit * (Math.PI / 3) + 0.2;
          const startAngle = indexInOrbit * angleStep + orbitPhase;
          
          // Outer and inner orbits rotate in opposite directions for rich dynamic atom interplay
          const dir = orbit === 1 ? -1 : 1;
          const speed = dir * (0.08 + orbit * 0.018);

          allConfigs.push({
            tech,
            hubId: hub.id,
            orbit,
            startAngle,
            speed,
            radiusMultiplier: orbit === 0 ? 1.15 : orbit === 1 ? 1.0 : 0.88,
            currentOffset: { x: 0, y: 0, z: 0 },
            targetOffset: { x: 0, y: 0, z: 0 },
            vel: { x: 0, y: 0, z: 0 },
          });
        });
      });

      return allConfigs;
    })()
  );

  // Traveling conduit energy photons
  const conduitPhotonsRef = useRef(
    Array.from({ length: 14 }, (_, i) => ({
      hubIndex: i % 4,
      progress: Math.random(),
      speed: 0.0025 + Math.random() * 0.0035,
      direction: Math.random() > 0.3 ? 1 : -1,
      size: 1.5 + Math.random() * 1.5,
    }))
  );

  // Ambient cosmic dust particles around singularity
  const cosmicDustRef = useRef(
    Array.from({ length: 24 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 30 + Math.random() * 160,
      speed: 0.05 + Math.random() * 0.12,
      tilt: Math.random() * Math.PI,
      size: 0.8 + Math.random() * 1.6,
      alpha: 0.15 + Math.random() * 0.45,
    }))
  );

  // Hit targets for mouse click / hover
  const hitTargetsRef = useRef<
    Array<{
      tech: Technology;
      hubId: string;
      sx: number;
      sy: number;
      r: number;
    }>
  >([]);

  // ── Main Render Loop ───────────────────────────────────────────────────────
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

    // Time calculations
    const t = (performance.now() - startTimeRef.current) / 1000;

    // Smooth Zoom interpolation
    zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.08;
    const zoom = zoomRef.current;

    // Drag inertia & momentum deceleration
    if (!isDraggingRef.current) {
      rotRef.current.x += rotVelRef.current.x;
      rotRef.current.y += rotVelRef.current.y;
      rotVelRef.current.x *= 0.93;
      rotVelRef.current.y *= 0.93;
    }

    // Parallax mouse follow
    smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.045;
    smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.045;
    const pmx = smoothMouseRef.current.x;
    const pmy = smoothMouseRef.current.y;

    // Upright global universe matrix: drag-to-rotate + subtle parallax
    const rotYMat = rotateY(rotRef.current.y + pmx * 0.15);
    const rotXMat = rotateX(-pmy * 0.12 + rotRef.current.x);
    const globalUniverseMat = mulMat(rotXMat, rotYMat);

    ctx.clearRect(0, 0, W, H);

    // Adaptive spacing based on canvas dimensions (Expanded for clear separation)
    const isMobile = W < 640;
    const isTablet = W >= 640 && W < 1024;
    const spanX = isMobile ? W * 0.44 : isTablet ? W * 0.38 : Math.min(500, W * 0.34);
    const spanY = isMobile ? H * 0.40 : isTablet ? H * 0.34 : Math.min(290, H * 0.28);

    // Central Singularity position
    const coreWorld = applyMat(globalUniverseMat, { x: 0, y: 0, z: 0 });
    const coreProj = project(coreWorld, cx, cy, zoom);

    // Calculate Satellite Hub World Coordinates
    const hubs = hubsRef.current.map((hub) => {
      const hx = hub.relX * spanX;
      const hy = hub.relY * spanY;
      const worldPos = applyMat(globalUniverseMat, { x: hx, y: hy, z: 0 });
      const proj = project(worldPos, cx, cy, zoom);
      const isHubActive = activeHubRef.current === hub.category || activeHubRef.current === hub.id;
      return {
        ...hub,
        hx,
        hy,
        worldPos,
        proj,
        isHubActive,
      };
    });

    // ── 1. Draw Central Cosmic Accretion Glow (Restrained) ──────────────────
    const corePulse = 1 + Math.sin(t * 1.4) * 0.04;
    const coreR = (isMobile ? 24 : 28) * zoom * corePulse;

    // Layered central energy aura (Reduced by 75%)
    const auraR = coreR * 2.2;
    const auraGrd = ctx.createRadialGradient(coreProj.sx, coreProj.sy, 0, coreProj.sx, coreProj.sy, auraR);
    if (light) {
      auraGrd.addColorStop(0, "rgba(57, 78, 110, 0.04)");
      auraGrd.addColorStop(0.5, "rgba(57, 78, 110, 0.015)");
      auraGrd.addColorStop(1, "transparent");
    } else {
      auraGrd.addColorStop(0, "rgba(255, 255, 255, 0.04)");
      auraGrd.addColorStop(0.5, "rgba(148, 163, 184, 0.015)");
      auraGrd.addColorStop(1, "transparent");
    }
    ctx.fillStyle = auraGrd;
    ctx.beginPath();
    ctx.arc(coreProj.sx, coreProj.sy, auraR, 0, Math.PI * 2);
    ctx.fill();

    // ── 2. Draw 4 Curved Magnetic Energy Conduits (Core -> Satellite Hubs) ───
    hubs.forEach((hub, hIdx) => {
      ctx.save();
      const isEnergized = hub.isHubActive || (activeNodeRef.current && hub.technologies.some(t => t.id === activeNodeRef.current?.id));
      
      // Compute smooth cubic Bezier curve control points
      const startX = coreProj.sx;
      const startY = coreProj.sy;
      const endX = hub.proj.sx;
      const endY = hub.proj.sy;

      // Magnetic curve arc curvature
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      const perpX = -(endY - startY) * 0.12 * (hIdx % 2 === 0 ? 1 : -1);
      const perpY = (endX - startX) * 0.12 * (hIdx % 2 === 0 ? 1 : -1);

      const cp1X = startX + (midX - startX) * 0.6 + perpX;
      const cp1Y = startY + (midY - startY) * 0.6 + perpY;
      const cp2X = endX - (endX - midX) * 0.6 + perpX * 0.8;
      const cp2Y = endY - (endY - midY) * 0.8 + perpY * 0.8;

      // Base Conduit Line (#394E6E with defined 0.30-0.40 opacity)
      ctx.strokeStyle = light
        ? isEnergized ? "rgba(57, 78, 110, 0.85)" : "rgba(57, 78, 110, 0.35)"
        : isEnergized ? "rgba(255, 255, 255, 0.65)" : "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = (isEnergized ? 1.8 : 1.0) * zoom;
      ctx.globalAlpha = isEnergized ? 0.95 : (light ? 0.45 : 0.3);

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
      ctx.stroke();

      // Outer subtle glow for energized conduits
      if (isEnergized) {
        ctx.strokeStyle = light ? "rgba(57, 78, 110, 0.25)" : "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 3.5 * zoom;
        ctx.globalAlpha = 0.30;
        ctx.stroke();
      }

      ctx.restore();
    });

    // ── 3. Draw Traveling Energy Photons along Conduits ───────────────────────
    conduitPhotonsRef.current.forEach((p) => {
      const hub = hubs[p.hubIndex];
      p.progress += p.speed * 0.85;
      if (p.progress >= 1) p.progress = 0;

      const prg = p.direction === 1 ? p.progress : 1 - p.progress;

      // Evaluate Cubic Bezier point at progress `prg`
      const startX = coreProj.sx;
      const startY = coreProj.sy;
      const endX = hub.proj.sx;
      const endY = hub.proj.sy;

      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      const perpX = -(endY - startY) * 0.12 * (p.hubIndex % 2 === 0 ? 1 : -1);
      const perpY = (endX - startX) * 0.12 * (p.hubIndex % 2 === 0 ? 1 : -1);

      const cp1X = startX + (midX - startX) * 0.6 + perpX;
      const cp1Y = startY + (midY - startY) * 0.6 + perpY;
      const cp2X = endX - (endX - midX) * 0.6 + perpX * 0.8;
      const cp2Y = endY - (endY - midY) * 0.8 + perpY * 0.8;

      const omt = 1 - prg;
      const px = omt * omt * omt * startX + 3 * omt * omt * prg * cp1X + 3 * omt * prg * prg * cp2X + prg * prg * prg * endX;
      const py = omt * omt * omt * startY + 3 * omt * omt * prg * cp1Y + 3 * omt * prg * prg * cp2Y + prg * prg * prg * endY;

      ctx.save();
      ctx.fillStyle = light ? "#394E6E" : "#ffffff";
      ctx.globalAlpha = light ? 0.85 : 0.45;
      ctx.beginPath();
      ctx.arc(px, py, p.size * 0.75 * zoom, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    // ── 4. Calculate All 3D Nodes with Magnetic Orbit Physics & Mouse Pull ────
    const currentHitTargets: typeof hitTargetsRef.current = [];

    // Orbital radius hierarchy per hub (Wider realistic 3D atom field expanded by ~1.6x)
    const baseHubRadius = isMobile ? 110 : isTablet ? 125 : 145;
    const hubOrbitRadii = [
      { rx: baseHubRadius * 1.35, ry: baseHubRadius * 0.82 },
      { rx: baseHubRadius * 1.05, ry: baseHubRadius * 0.62 },
      { rx: baseHubRadius * 0.78, ry: baseHubRadius * 0.45 },
    ];

    interface RenderableNode {
      tech: Technology;
      hub: typeof hubs[0];
      world: Vec3;
      proj: { sx: number; sy: number; scale: number; z: number };
      depth: number;
      alpha: number;
      r: number;
      isHovered: boolean;
      isActive: boolean;
      fontSize: number;
    }

    const projectedNodes: RenderableNode[] = nodeConfigsRef.current.map((cfg) => {
      const hub = hubs.find(h => h.id === cfg.hubId)!;
      const { rx, ry } = hubOrbitRadii[cfg.orbit];

      // 3D Orbital Angle (Continuous atom motion)
      const angle = cfg.startAngle + t * cfg.speed;

      // Magnetic Drift Simulation (Natural PULL -> DRIFT -> CORRECT -> FLOW)
      const driftHarmonicX = Math.sin(t * 1.4 + cfg.startAngle) * 5;
      const driftHarmonicY = Math.cos(t * 1.1 + cfg.startAngle) * 4;
      const driftHarmonicZ = Math.sin(t * 1.7 + cfg.startAngle * 2) * 6;

      const local: Vec3 = {
        x: Math.cos(angle) * rx * cfg.radiusMultiplier + driftHarmonicX,
        y: Math.sin(angle) * ry * cfg.radiusMultiplier + driftHarmonicY,
        z: driftHarmonicZ,
      };

      // Transform onto specific 3D orbital plane
      const inPlane = applyMat(ORBIT_PLANES[cfg.orbit], local);

      // Place relative to Hub in global space
      const inUniverse: Vec3 = {
        x: hub.hx + inPlane.x,
        y: hub.hy + inPlane.y,
        z: inPlane.z,
      };

      // Apply global universe rotation
      const world = applyMat(globalUniverseMat, inUniverse);
      const proj = project(world, cx, cy, zoom);

      // Magnetic Mouse Proximity Attraction
      let magnetDx = 0;
      let magnetDy = 0;
      if (mouseRef.current.isInside) {
        const mouseDist = Math.hypot(mouseRef.current.rawX - proj.sx, mouseRef.current.rawY - proj.sy);
        const PROXIMITY_RADIUS = 110;
        if (mouseDist < PROXIMITY_RADIUS && mouseDist > 1) {
          const force = Math.pow(1 - mouseDist / PROXIMITY_RADIUS, 2) * 22;
          magnetDx = ((mouseRef.current.rawX - proj.sx) / mouseDist) * force;
          magnetDy = ((mouseRef.current.rawY - proj.sy) / mouseDist) * force;
        }
      }

      // Smooth magnetic offset spring interpolation
      cfg.targetOffset.x = magnetDx;
      cfg.targetOffset.y = magnetDy;
      cfg.currentOffset.x += (cfg.targetOffset.x - cfg.currentOffset.x) * 0.18;
      cfg.currentOffset.y += (cfg.targetOffset.y - cfg.currentOffset.y) * 0.18;

      const finalSx = proj.sx + cfg.currentOffset.x;
      const finalSy = proj.sy + cfg.currentOffset.y;

      const depth = (world.z + 300) / 600;
      const alpha = Math.max(0.35, Math.min(1.0, 0.4 + depth * 0.6));
      
      const isHovered = hoveredNodeIdRef.current === cfg.tech.id || activeNodeRef.current?.id === cfg.tech.id;
      const isActive = activeNodeRef.current?.id === cfg.tech.id;

      // Closer nodes are larger, hovered nodes scale up to ~1.25x
      const baseR = isMobile ? 5.5 : isTablet ? 7.0 : 8.5;
      const depthScale = (0.75 + depth * 0.55) * zoom;
      const hoverScale = isHovered ? 1.25 : 1.0;
      const r = Math.max(4.0, baseR * depthScale * hoverScale);

      const fontSize = isMobile ? 10.0 : isTablet ? 11.0 : 12.0;

      return {
        tech: cfg.tech,
        hub,
        world,
        proj: { sx: finalSx, sy: finalSy, scale: proj.scale, z: world.z },
        depth,
        alpha,
        r,
        isHovered,
        isActive,
        fontSize,
      };
    });

    // ── 5. Draw 3D Orbital Rings per Hub ─────────────────────────────────────
    hubs.forEach((hub) => {
      ctx.save();
      ctx.lineWidth = 0.85 * zoom;
      ctx.setLineDash([5, 4]);

      ORBIT_PLANES.forEach((mat, i) => {
        const { rx, ry } = hubOrbitRadii[i];
        const pts = ellipsePts(mat, rx, ry);
        
        ctx.beginPath();
        pts.forEach((p, idx) => {
          const inUniverse: Vec3 = {
            x: hub.hx + p.x,
            y: hub.hy + p.y,
            z: p.z,
          };
          const trans = applyMat(globalUniverseMat, inUniverse);
          const { sx, sy } = project(trans, cx, cy, zoom);
          if (idx === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        });
        ctx.closePath();

        ctx.strokeStyle = light ? "rgba(57, 78, 110, 0.32)" : "rgba(255, 255, 255, 0.14)";
        ctx.globalAlpha = light ? 0.35 : 0.2;
        ctx.stroke();
      });

      ctx.setLineDash([]);
      ctx.restore();
    });

    // ── 6. Draw Spoke Connection Lines (Hub Core -> Satellite Nodes) ─────────
    projectedNodes.forEach((node) => {
      ctx.save();
      const isEnergized = node.isHovered || node.isActive;
      ctx.strokeStyle = light
        ? isEnergized ? "rgba(57, 78, 110, 0.85)" : "rgba(57, 78, 110, 0.30)"
        : isEnergized ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = (isEnergized ? 1.5 : 0.85) * zoom;
      ctx.globalAlpha = isEnergized ? 0.95 : (0.25 + node.depth * 0.20);

      ctx.beginPath();
      ctx.moveTo(node.hub.proj.sx, node.hub.proj.sy);
      ctx.lineTo(node.proj.sx, node.proj.sy);
      ctx.stroke();
      ctx.restore();
    });

    // ── 7. Global Z-Sorting: Depth-Ordered Rendering of Cores & Nodes ────────
    type ZItem = 
      | { type: "hub_core"; hub: typeof hubs[0]; z: number }
      | { type: "singularity"; z: number }
      | { type: "node"; node: RenderableNode; z: number };

    const zItems: ZItem[] = [
      { type: "singularity", z: coreWorld.z },
      ...hubs.map(hub => ({ type: "hub_core" as const, hub, z: hub.worldPos.z })),
      ...projectedNodes.map(node => ({ type: "node" as const, node, z: node.proj.z })),
    ];

    zItems.sort((a, b) => a.z - b.z);

    // Draw sorted elements
    zItems.forEach((item) => {
      if (item.type === "singularity") {
        // Draw Central Singularity Core
        drawCentralSingularity(ctx, coreProj.sx, coreProj.sy, coreR, light, t);
      } else if (item.type === "hub_core") {
        // Draw Hub Central Sphere (LLM, DATA, API, STACK)
        const hubR = (isMobile ? 18 : 22) * zoom;
        drawHubCore(ctx, item.hub.proj.sx, item.hub.proj.sy, hubR, item.hub, light, isMobile);
      } else if (item.type === "node") {
        const node = item.node;
        // Draw Technology Node Sphere & Label
        drawNodeSphere(
          ctx,
          node.proj.sx,
          node.proj.sy,
          node.r,
          node.hub.accentColor,
          node.hub.glowColor,
          node.alpha,
          node.isHovered,
          light
        );

        drawNodeLabel(
          ctx,
          node.tech.name,
          node.proj.sx,
          node.proj.sy,
          node.r,
          node.alpha,
          node.isHovered,
          light,
          node.fontSize
        );

        currentHitTargets.push({
          tech: node.tech,
          hubId: node.hub.id,
          sx: node.proj.sx,
          sy: node.proj.sy,
          r: node.r,
        });
      }
    });

    // ── 8. Draw Swirling Accretion Dust Particles around Singularity ─────────
    cosmicDustRef.current.forEach((d) => {
      d.angle += d.speed * 0.035;
      const dx = Math.cos(d.angle) * d.radius;
      const dy = Math.sin(d.angle) * d.radius * 0.45;
      const dustTrans = applyMat(globalUniverseMat, { x: dx, y: dy, z: Math.sin(d.angle * 2) * 15 });
      const dp = project(dustTrans, cx, cy, zoom);

      ctx.save();
      ctx.fillStyle = light ? "#394E6E" : "#ffffff";
      ctx.globalAlpha = d.alpha * (light ? 0.45 : 0.35);
      ctx.beginPath();
      ctx.arc(dp.sx, dp.sy, d.size * 0.7 * zoom, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    hitTargetsRef.current = currentHitTargets;

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  // ── Drawing Sub-Routines ───────────────────────────────────────────────────
  function drawCentralSingularity(
    ctx: CanvasRenderingContext2D,
    sx: number,
    sy: number,
    r: number,
    light: boolean,
    t: number
  ) {
    ctx.save();

    // Dynamic rotating energy rings on multiple axes (#394E6E in light mode)
    for (let i = 0; i < 3; i++) {
      const ringAngle = t * (0.5 + i * 0.25) * (i % 2 === 0 ? 1 : -1);
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(ringAngle);
      ctx.scale(1, 0.45 + i * 0.2);

      ctx.strokeStyle = light
        ? "rgba(57, 78, 110, 0.25)"
        : "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 0.9;
      ctx.globalAlpha = light ? 0.35 : 0.35;
      ctx.beginPath();
      ctx.arc(0, 0, r * (1.5 + i * 0.35), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Core Singularity Body with 3D radial shading (#394E6E based)
    const coreGrd = ctx.createRadialGradient(sx - r * 0.25, sy - r * 0.25, 0, sx, sy, r);
    if (light) {
      coreGrd.addColorStop(0, "#ffffff");
      coreGrd.addColorStop(0.3, "#E2E8F0");
      coreGrd.addColorStop(0.7, "#8DA4C4");
      coreGrd.addColorStop(1, "#394E6E");
    } else {
      coreGrd.addColorStop(0, "#ffffff");
      coreGrd.addColorStop(0.2, "#94a3b8");
      coreGrd.addColorStop(0.55, "#334155");
      coreGrd.addColorStop(0.85, "#0f172a");
      coreGrd.addColorStop(1, "#020617");
    }

    ctx.fillStyle = coreGrd;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();

    // Center Hot Singularity Point
    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(sx, sy, r * 0.28, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawHubCore(
    ctx: CanvasRenderingContext2D,
    sx: number,
    sy: number,
    r: number,
    hub: HubMeta,
    light: boolean,
    isMobile: boolean
  ) {
    ctx.save();

    // Ambient Halo (Subtle & restrained #394E6E)
    const haloGrd = ctx.createRadialGradient(sx, sy, r * 0.6, sx, sy, r * 1.4);
    haloGrd.addColorStop(0, light ? "rgba(57, 78, 110, 0.08)" : "rgba(255, 255, 255, 0.08)");
    haloGrd.addColorStop(1, "transparent");
    ctx.fillStyle = haloGrd;
    ctx.beginPath();
    ctx.arc(sx, sy, r * 1.4, 0, Math.PI * 2);
    ctx.fill();

    // 3D Glass Sphere Body (#394E6E steel-blue system)
    const sphereGrd = ctx.createRadialGradient(sx - r * 0.3, sy - r * 0.3, 0, sx, sy, r);
    if (light) {
      sphereGrd.addColorStop(0, "#8DA4C4");
      sphereGrd.addColorStop(0.35, "#5B759E");
      sphereGrd.addColorStop(0.70, "#445C80");
      sphereGrd.addColorStop(1, "#394E6E");
    } else {
      sphereGrd.addColorStop(0, "#ffffff");
      sphereGrd.addColorStop(0.25, "#64748b");
      sphereGrd.addColorStop(0.60, "#1e293b");
      sphereGrd.addColorStop(1, "#0b0f19");
    }
    ctx.fillStyle = sphereGrd;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();

    // Core Rim stroke
    ctx.strokeStyle = light ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.75)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Core Code Label (LLM, DATA, API, STACK)
    ctx.font = `bold ${isMobile ? 11 : 13}px "Manrope", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.98;
    ctx.letterSpacing = "0.8px";

    // Fast-path text shadow for 60fps mobile
    if (!light) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
      ctx.fillText(hub.code, sx + 0.8, sy + 0.8);
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillText(hub.code, sx, sy);

    // Subtle Subtitle under core (e.g. LLM ORCHESTRATION)
    if (hub.subtitle) {
      ctx.font = `bold ${isMobile ? 7 : 8}px "JetBrains Mono", monospace`;
      ctx.letterSpacing = "0.6px";
      if (!light) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillText(hub.subtitle, sx + 0.6, sy + r + (isMobile ? 9.6 : 12.6));
      }
      ctx.fillStyle = light ? "#394E6E" : "#cbd5e1";
      ctx.fillText(hub.subtitle, sx, sy + r + (isMobile ? 9 : 12));
    }

    ctx.restore();
  }

  function drawNodeSphere(
    ctx: CanvasRenderingContext2D,
    sx: number,
    sy: number,
    r: number,
    accentColor: string,
    glowColor: string,
    alpha: number,
    isHovered: boolean,
    light: boolean
  ) {
    ctx.save();
    ctx.globalAlpha = isHovered ? 1.0 : alpha;

    // Outer Glow (Minimal #394E6E)
    const haloRadius = r * (isHovered ? 1.6 : 1.35);
    const haloGrd = ctx.createRadialGradient(sx, sy, 0, sx, sy, haloRadius);
    haloGrd.addColorStop(0, light ? "rgba(57, 78, 110, 0.08)" : "rgba(255, 255, 255, 0.08)");
    haloGrd.addColorStop(1, "transparent");
    ctx.fillStyle = haloGrd;
    ctx.beginPath();
    ctx.arc(sx, sy, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    // 3D Luminous Sphere with specular reflection (#394E6E based)
    const sphereGrd = ctx.createRadialGradient(sx - r * 0.35, sy - r * 0.35, 0, sx, sy, r);
    if (light) {
      sphereGrd.addColorStop(0, "#ffffff");
      sphereGrd.addColorStop(0.35, "#E2E8F0");
      sphereGrd.addColorStop(0.70, "#8DA4C4");
      sphereGrd.addColorStop(1, "#394E6E");
    } else {
      sphereGrd.addColorStop(0, "#ffffff");
      sphereGrd.addColorStop(0.30, "#94a3b8");
      sphereGrd.addColorStop(0.70, "#334155");
      sphereGrd.addColorStop(1, "#0f172a");
    }

    ctx.fillStyle = sphereGrd;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();

    if (isHovered) {
      ctx.strokeStyle = light ? "#2B3C56" : "#ffffff";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawNodeLabel(
    ctx: CanvasRenderingContext2D,
    text: string,
    sx: number,
    sy: number,
    r: number,
    alpha: number,
    isHovered: boolean,
    light: boolean,
    fontSize: number
  ) {
    ctx.save();
    ctx.globalAlpha = isHovered ? 1.0 : Math.min(1.0, alpha * 1.45);
    ctx.font = `bold ${fontSize}px "Manrope", system-ui, -apple-system, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.letterSpacing = "0.35px";

    // Fast-path text shadow for 60fps mobile
    if (!light) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
      ctx.fillText(text.toUpperCase(), sx + 0.8, sy + r + 4.8);
    } else {
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fillText(text.toUpperCase(), sx + 0.8, sy + r + 4.8);
    }

    ctx.fillStyle = isHovered
      ? (light ? "#0f172a" : "#ffffff")
      : (light ? "#0f172a" : "#f1f5f9");
    ctx.fillText(text.toUpperCase(), sx, sy + r + 4);

    ctx.restore();
  }

  // ── Resize Observer & Animation Gate ───────────────────────────────────────
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
        if (isVisible && isAnimating && !document.hidden) {
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
      } else if (isVisible && isAnimating) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    if (isAnimating) {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw, isAnimating]);

  // ── Interaction Event Handlers (Mouse, Drag, Zoom, Touch) ──────────────────
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    rotVelRef.current = { x: 0, y: 0 };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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

      // Handle drag rotation
      if (isDraggingRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        dragStartRef.current = { x: e.clientX, y: e.clientY };

        const rotDeltaY = (dx / rect.width) * Math.PI * 1.4;
        const rotDeltaX = (dy / rect.height) * Math.PI * 1.4;

        rotRef.current.y += rotDeltaY;
        rotRef.current.x -= rotDeltaX;

        rotVelRef.current = { x: -rotDeltaX * 0.6, y: rotDeltaY * 0.6 };
        return;
      }

      // Parallax values [-1, 1]
      mouseRef.current.x = (clientX / rect.width - 0.5) * 2;
      mouseRef.current.y = -(clientY / rect.height - 0.5) * 2;

      // Hit-testing against 3D nodes
      let found: Technology | null = null;
      let foundHubId: string | null = null;

      for (const target of hitTargetsRef.current) {
        const d = Math.hypot(clientX - target.sx, clientY - target.sy);
        if (d <= target.r + 14) {
          found = target.tech;
          foundHubId = target.hubId;
          break;
        }
      }

      if (found) {
        if (hoveredNodeIdRef.current !== found.id) {
          hoveredNodeIdRef.current = found.id;
          setHoveredNodeId(found.id);
          onNodeHover(found, rect);
          onHubHover(foundHubId);
        }
        if (containerRef.current) containerRef.current.style.cursor = "pointer";
      } else {
        if (hoveredNodeIdRef.current !== null) {
          hoveredNodeIdRef.current = null;
          setHoveredNodeId(null);
          onNodeHover(null, null);
          onHubHover(null);
        }
        if (containerRef.current) containerRef.current.style.cursor = isDraggingRef.current ? "grabbing" : "grab";
      }
    },
    [onNodeHover, onHubHover]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    if (containerRef.current) containerRef.current.style.cursor = "grab";
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDraggingRef.current = false;
    mouseRef.current.isInside = false;
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
    setHoveredNodeId(null);
    onNodeHover(null, null);
    onHubHover(null);
  }, [onNodeHover, onHubHover]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      let rect = containerRectRef.current;
      if (!rect) {
        rect = containerRef.current?.getBoundingClientRect() ?? null;
        containerRectRef.current = rect;
      }
      if (!rect) return;

      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      for (const target of hitTargetsRef.current) {
        const d = Math.hypot(clientX - target.sx, clientY - target.sy);
        if (d <= target.r + 16) {
          onNodeClick(target.tech);
          break;
        }
      }
    },
    [onNodeClick]
  );

  // Smooth scroll-to-zoom (Without hijacking page scroll)
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > 4) {
      const zoomDelta = -e.deltaY * 0.0012;
      targetZoomRef.current = Math.max(0.75, Math.min(1.45, targetZoomRef.current + zoomDelta));
    }
  }, []);

  // ── Mobile Touch Support ──────────────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      isDraggingRef.current = true;
      dragStartRef.current = { x: touch.clientX, y: touch.clientY };
      rotVelRef.current = { x: 0, y: 0 };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      let rect = containerRectRef.current;
      if (!rect) {
        rect = containerRef.current?.getBoundingClientRect() ?? null;
        containerRectRef.current = rect;
      }
      if (!rect) return;

      const touch = e.touches[0];
      const dx = touch.clientX - dragStartRef.current.x;
      const dy = touch.clientY - dragStartRef.current.y;
      dragStartRef.current = { x: touch.clientX, y: touch.clientY };

      const rotDeltaY = (dx / rect.width) * Math.PI * 1.4;
      const rotDeltaX = (dy / rect.height) * Math.PI * 1.4;

      rotRef.current.y += rotDeltaY;
      rotRef.current.x -= rotDeltaX;

      rotVelRef.current = { x: -rotDeltaX * 0.6, y: rotDeltaY * 0.6 };
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      isDraggingRef.current = false;
      if (e.changedTouches.length === 1) {
        let rect = containerRectRef.current;
        if (!rect) {
          rect = containerRef.current?.getBoundingClientRect() ?? null;
          containerRectRef.current = rect;
        }
        if (!rect) return;
        const touch = e.changedTouches[0];
        const clientX = touch.clientX - rect.left;
        const clientY = touch.clientY - rect.top;
        for (const target of hitTargetsRef.current) {
          const d = Math.hypot(clientX - target.sx, clientY - target.sy);
          if (d <= target.r + 22) {
            onNodeClick(target.tech);
            onNodeHover(target.tech, rect);
            onHubHover(target.hubId);
            break;
          }
        }
      }
    },
    [onNodeClick, onNodeHover, onHubHover]
  );

  return (
    <div
      ref={containerRef}
      style={{ touchAction: "pan-y" }}
      className="relative w-full h-[520px] xs:h-[580px] sm:h-[680px] lg:h-[780px] select-none cursor-grab active:cursor-grabbing overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
}

export default memo(SystemsUniverseCanvas);
