"use client";

import { useEffect, useRef } from "react";
import {
  Technology,
  systemTechnologies,
  aiTechnologies,
} from "@/data/technologies";

const allTechnologies = [...aiTechnologies, ...systemTechnologies];
const categoryById = new Map(allTechnologies.map((t) => [t.id, t.category]));

// Unique undirected pairs, resolved once at module scope rather than
// re-deriving them (and running an O(n) lookup per pair) every frame.
const LINK_PAIRS: Array<{ a: string; b: string; catA: string; catB: string }> =
  [];
for (const tech of allTechnologies) {
  for (const relatedId of tech.related) {
    if (tech.id > relatedId) continue;
    const catB = categoryById.get(relatedId);
    if (!catB) continue;
    LINK_PAIRS.push({
      a: tech.id,
      b: relatedId,
      catA: tech.category,
      catB,
    });
  }
}

interface NetworkCanvasProps {
  activeNode: Technology | null;
  activeHub: string | null;
}

interface Particle {
  sourceId: string;
  targetId: string;
  progress: number;
  speed: number;
}

export default function NetworkCanvas({
  activeNode,
  activeHub,
}: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Hover state is read through refs inside the loop. Keeping it in the effect
  // deps rebuilt every listener and reset every particle on each hover.
  const activeNodeRef = useRef(activeNode);
  const activeHubRef = useRef(activeHub);

  useEffect(() => {
    activeNodeRef.current = activeNode;
    activeHubRef.current = activeHub;
  }, [activeNode, activeHub]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frameId = 0;
    let running = false;
    let inView = false;
    let width = 0;
    let height = 0;

    // Resolved once; these ids are stable for the life of the section.
    const nodeEls = new Map<string, HTMLElement>();
    const refreshNodeEls = () => {
      nodeEls.clear();
      for (const tech of allTechnologies) {
        const el = document.getElementById(`node-${tech.id}`);
        if (el) nodeEls.set(tech.id, el);
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const spawnRandomParticle = () => {
      const source =
        allTechnologies[Math.floor(Math.random() * allTechnologies.length)];
      if (source.related.length === 0) return;
      particlesRef.current.push({
        sourceId: source.id,
        targetId:
          source.related[Math.floor(Math.random() * source.related.length)],
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      });
    };

    const positions = new Map<string, { x: number; y: number }>();

    const measure = () => {
      positions.clear();
      // All reads happen consecutively with no interleaved writes, so the
      // browser flushes layout once rather than per element.
      const containerRect = canvas.getBoundingClientRect();
      for (const [id, el] of nodeEls) {
        const rect = el.getBoundingClientRect();
        positions.set(id, {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        });
      }
    };

    const draw = () => {
      const activeNodeNow = activeNodeRef.current;
      const activeHubNow = activeHubRef.current;
      ctx.clearRect(0, 0, width, height);

      for (const pair of LINK_PAIRS) {
        const sourcePos = positions.get(pair.a);
        const targetPos = positions.get(pair.b);
        if (!sourcePos || !targetPos) continue;

        const isActiveLine =
          !!activeNodeNow &&
          (activeNodeNow.id === pair.a ||
            activeNodeNow.id === pair.b ||
            (activeNodeNow.related.includes(pair.a) &&
              activeNodeNow.related.includes(pair.b)));
        const isRelatedToHub =
          !!activeHubNow &&
          (pair.catA === activeHubNow || pair.catB === activeHubNow);

        if (isActiveLine) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 1.5;
        } else if (isRelatedToHub) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
          ctx.lineWidth = 1;
        } else if (activeNodeNow || activeHubNow) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
          ctx.lineWidth = 1;
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
          ctx.lineWidth = 1;
        }

        ctx.beginPath();
        ctx.moveTo(sourcePos.x, sourcePos.y);
        ctx.lineTo(targetPos.x, targetPos.y);
        ctx.stroke();
      }

      const list = particlesRef.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        const isHovered =
          !!activeNodeNow &&
          (activeNodeNow.id === p.sourceId || activeNodeNow.id === p.targetId);

        p.progress += isHovered ? p.speed * 2.5 : p.speed;
        if (p.progress >= 1) {
          list.splice(i, 1);
          spawnRandomParticle();
          continue;
        }

        const sourcePos = positions.get(p.sourceId);
        const targetPos = positions.get(p.targetId);
        if (!sourcePos || !targetPos) continue;

        const x = sourcePos.x + (targetPos.x - sourcePos.x) * p.progress;
        const y = sourcePos.y + (targetPos.y - sourcePos.y) * p.progress;

        ctx.beginPath();
        ctx.arc(x, y, isHovered ? 2 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = isHovered
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(255, 255, 255, 0.2)";
        ctx.fill();

        if (isHovered) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      if (Math.random() < 0.02 && list.length < 40) spawnRandomParticle();
    };

    const render = () => {
      measure();
      draw();
      frameId = requestAnimationFrame(render);
    };

    const start = () => {
      if (running || reduceMotion || !inView || document.hidden) return;
      running = true;
      frameId = requestAnimationFrame(render);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frameId);
    };

    resize();
    refreshNodeEls();
    particlesRef.current = [];
    for (let i = 0; i < 20; i++) spawnRandomParticle();

    // The section sits far down the page; without this the loop ran the whole
    // time the page was open, whether or not it was on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          refreshNodeEls();
          if (reduceMotion) {
            measure();
            draw();
          } else {
            start();
          }
        } else {
          stop();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(canvas);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        refreshNodeEls();
        if (reduceMotion && inView) {
          measure();
          draw();
        }
      }, 150);
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      observer.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
