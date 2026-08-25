"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    
    // Very slow movement
    this.vx = (Math.random() - 0.5) * 0.15;
    this.vy = (Math.random() - 0.5) * 0.15;
    
    // Tiny nodes
    this.radius = Math.random() * 1.5 + 0.5;
    
    // Nodes towards the right side can be slightly brighter based on user preference
    const xRatio = this.x / canvasWidth;
    this.baseAlpha = (Math.random() * 0.4 + 0.1) * (0.5 + xRatio * 0.5);
  }

  update(mouseX: number, mouseY: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < 0) this.x = this.canvasWidth;
    if (this.x > this.canvasWidth) this.x = 0;
    if (this.y < 0) this.y = this.canvasHeight;
    if (this.y > this.canvasHeight) this.y = 0;

    // Subtle parallax / repulsion from mouse
    if (mouseX !== 0 && mouseY !== 0) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 150) {
        // Very subtle push
        this.x -= (dx / dist) * 0.2;
        this.y -= (dy / dist) * 0.2;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.baseAlpha})`;
    ctx.fill();
  }
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Handle Reduced Motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const init = () => {
      // Set actual size in memory (scaled to account for extra pixel ratio)
      const dpr = window.devicePixelRatio || 1;
      // Get CSS size
      const rect = canvas.getBoundingClientRect();
      
      // Set actual size in memory (scaled to account for extra pixel ratio)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Normalize coordinate system to use css pixels
      ctx.scale(dpr, dpr);
      
      const width = rect.width;
      const height = rect.height;

      // Responsive particle count
      const area = width * height;
      const particleDensity = 15000; // 1 particle per 15k pixels
      const count = Math.min(Math.floor(area / particleDensity), 250); // Cap at 250

      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Draw connections
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        if (!prefersReducedMotion) {
          particles[i].update(mouseX, mouseY);
        }
        
        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 120;
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.2; // Max opacity 0.2
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(200, 210, 255, ${opacity})`;
            ctx.stroke();
          }
        }
        
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize and start
    init();
    animate();

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
