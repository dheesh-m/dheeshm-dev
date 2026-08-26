"use client";

import { memo } from "react";
import { Technology } from "@/data/technologies";
import SystemNode from "./SystemNode";
import { cn } from "@/lib/utils";

interface SystemHubProps {
  category: string;
  title: string;
  technologies: Technology[];
  positionClass: string;
  activeNode: Technology | null;
  activeHub: string | null;
  onNodeHover: (tech: Technology | null, rect: DOMRect | null) => void;
  onHubHover: (category: string | null) => void;
  isAnimating: boolean;
}

function SystemHub({
  category,
  title,
  technologies,
  positionClass,
  activeNode,
  activeHub,
  onNodeHover,
  onHubHover,
  isAnimating
}: SystemHubProps) {
  
  const isActive = activeHub === category;
  const isNodeActive = activeNode?.category === category;
  const isDimmed = activeHub !== null && activeHub !== category && !activeNode;
  const isNodeDimmed = activeNode !== null && activeNode.category !== category && !technologies.some(t => activeNode.related.includes(t.id));

  // Ring placement is derived, not accumulated. These used to be arrays
  // mutated during render (`ringIndices[ring]++`), which React Compiler
  // memoizes - so the counters were not reset between the server and client
  // passes and every node hydrated at a different angle.
  const total = technologies.length;
  // Indices 0,3,6.. land in ring 0; 1,4,7.. in ring 1; 2,5,8.. in ring 2.
  const countInRing = (ring: number) => Math.ceil((total - ring) / 3);

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] transition-opacity duration-500",
        positionClass,
        (isDimmed || isNodeDimmed) ? "opacity-30" : "opacity-100"
      )}
    >
      {/* Core Hub */}
      <div 
        id={`hub-${category}`}
        className={cn(
          "relative z-30 flex items-center justify-center px-4 py-2.5 rounded-full border bg-[#050505]/90 backdrop-blur-md cursor-crosshair transition-all duration-500",
          isActive || isNodeActive ? "border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105" : "border-white/10"
        )}
        onMouseEnter={() => onHubHover(category)}
        onMouseLeave={() => onHubHover(null)}
      >
        {/* Pulses rather than spins: this core is a stadium-shaped pill, and
            rotating a non-circular border sweeps a lens-shaped artifact. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-full border border-white/10 pointer-events-none",
            isActive || isNodeActive
              ? "animate-[ring-pulse_2s_ease-in-out_infinite]"
              : "animate-[ring-pulse_5s_ease-in-out_infinite]"
          )}
        />
        <span className="text-[#F5F5F5] text-xs font-display tracking-widest uppercase">
          {title}
        </span>
      </div>

      {/* Orbit Rings */}
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none transition-colors duration-500",
        isActive || isNodeActive ? "border-white/20" : "border-white/5"
      )} style={{ width: 180, height: 180 }} />
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none border-dashed transition-colors duration-500 opacity-30",
        isActive || isNodeActive ? "border-white/30" : "border-white/10"
      )} style={{ width: 270, height: 270 }} />
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none opacity-10 transition-colors duration-500",
        isActive || isNodeActive ? "border-white/20" : "border-white/5"
      )} style={{ width: 360, height: 360 }} />

      {/* Nodes */}
      {technologies.map((tech, index) => {
        // Distribute across 3 orbital rings
        const ring = index % 3;
        const ringIndex = Math.floor(index / 3);
        const inRing = countInRing(ring);

        // Tight orbital radiuses: 90px, 135px, 180px
        const radius = 90 + (ring * 45);

        // Offset evenly inside its own ring
        const angleOffset = (ringIndex / inRing) * 360 + (ring * 45);
        
        // Different orbital speeds based on ring
        const speed = 45 + (ring * 12);
        const isClockwise = ring % 2 === 0;

        const isTechActive = activeNode?.id === tech.id;
        const isTechRelated = activeNode ? (activeNode.related.includes(tech.id) || tech.related.includes(activeNode.id)) : false;
        
        const isTechDimmed = (activeNode !== null && !isTechActive && !isTechRelated) || 
                             (activeHub !== null && activeHub !== category && !isTechRelated);

        return (
          <SystemNode
            key={tech.id}
            isAnimating={isAnimating}
            technology={tech}
            radius={radius}
            angleOffset={angleOffset}
            speed={speed}
            isClockwise={isClockwise}
            isActive={isTechActive}
            isRelated={isTechRelated}
            isDimmed={isTechDimmed}
            isHubActive={isActive}
            onHover={onNodeHover}
          />
        );
      })}
    </div>
  );
}

export default memo(SystemHub);
