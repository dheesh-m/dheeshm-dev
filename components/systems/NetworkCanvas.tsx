"use client";

import { useEffect, useRef } from "react";
import { Technology, systemTechnologies, aiTechnologies } from "@/data/technologies";

const allTechnologies = [...aiTechnologies, ...systemTechnologies];

interface NetworkCanvasProps {
  activeNode: Technology | null;
  activeHub: string | null;
}

interface Particle {
  id: string;
  sourceId: string;
  targetId: string;
  progress: number;
  speed: number;
}

export default function NetworkCanvas({ activeNode, activeHub }: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize some particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 20; i++) {
        spawnRandomParticle();
      }
    };

    const spawnRandomParticle = () => {
      const source = allTechnologies[Math.floor(Math.random() * allTechnologies.length)];
      if (source.related.length > 0) {
        const targetId = source.related[Math.floor(Math.random() * source.related.length)];
        particlesRef.current.push({
          id: Math.random().toString(36).substr(2, 9),
          sourceId: source.id,
          targetId: targetId,
          progress: Math.random(), // Start at random progress
          speed: 0.002 + Math.random() * 0.003
        });
      }
    };

    initParticles();

    // The render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Get all node positions
      const positions: Record<string, { x: number, y: number }> = {};
      const containerRect = canvas.getBoundingClientRect();

      allTechnologies.forEach(tech => {
        const el = document.getElementById(`node-${tech.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          positions[tech.id] = {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top
          };
        }
      });

      // Draw lines
      ctx.lineWidth = 1;
      
      allTechnologies.forEach(tech => {
        const sourcePos = positions[tech.id];
        if (!sourcePos) return;

        tech.related.forEach(relatedId => {
          const targetPos = positions[relatedId];
          if (!targetPos) return;

          // Avoid drawing twice (A -> B and B -> A)
          if (tech.id > relatedId) return;

          const isActiveLine = activeNode && (activeNode.id === tech.id || activeNode.id === relatedId || activeNode.related.includes(tech.id) && activeNode.related.includes(relatedId));
          const isRelatedToHub = activeHub && (tech.category === activeHub || allTechnologies.find(t => t.id === relatedId)?.category === activeHub);

          if (isActiveLine) {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"; // Active neutral
            ctx.lineWidth = 1.5;
          } else if (isRelatedToHub) {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.lineWidth = 1;
          } else if (activeNode || activeHub) {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.02)"; // Dimmed
            ctx.lineWidth = 1;
          } else {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"; // Normal
            ctx.lineWidth = 1;
          }

          ctx.beginPath();
          ctx.moveTo(sourcePos.x, sourcePos.y);
          ctx.lineTo(targetPos.x, targetPos.y);
          ctx.stroke();
        });
      });

      // Update and draw particles
      const activeColor = "rgba(255, 255, 255, 0.8)";
      const normalColor = "rgba(255, 255, 255, 0.2)"; // Neutral
      
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        
        // Boost speed if active
        const isHovered = activeNode && (activeNode.id === p.sourceId || activeNode.id === p.targetId);
        const currentSpeed = isHovered ? p.speed * 2.5 : p.speed;
        
        p.progress += currentSpeed;

        if (p.progress >= 1) {
          particlesRef.current.splice(i, 1);
          spawnRandomParticle();
          continue;
        }

        const sourcePos = positions[p.sourceId];
        const targetPos = positions[p.targetId];

        if (sourcePos && targetPos) {
          const x = sourcePos.x + (targetPos.x - sourcePos.x) * p.progress;
          const y = sourcePos.y + (targetPos.y - sourcePos.y) * p.progress;

          ctx.beginPath();
          ctx.arc(x, y, isHovered ? 2 : 1.5, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? activeColor : normalColor;
          ctx.fill();
          
          if (isHovered) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Add occasional new particles
      if (Math.random() < 0.02 && particlesRef.current.length < 40) {
        spawnRandomParticle();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeNode, activeHub]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
