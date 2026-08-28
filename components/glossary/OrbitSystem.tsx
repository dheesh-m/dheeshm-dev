"use client";

import { useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Technology } from "@/data/technologies";
import TechnologyNode from "./TechnologyNode";
import ConnectionLine from "./ConnectionLine";
import TechnologyInfoCard from "./TechnologyInfoCard";

interface OrbitSystemProps {
  centerLabel: string;
  technologies: Technology[];
}

export default function OrbitSystem({ centerLabel, technologies }: OrbitSystemProps) {
  // One observer gates every orbit in this system.
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  const [activeNode, setActiveNode] = useState<Technology | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  // Pre-calculate orbital properties for each node so they don't change on render
  const orbitalNodes = useMemo(() => {
    return technologies.map((tech, index) => {
      // Distribute nodes across 3 concentric rings (e.g. radii 140, 210, 280)
      const ringIndex = index % 3;
      const radius = 140 + (ringIndex * 70);

      // Angle distribution (0 to 360)
      const angleOffset = (index / technologies.length) * 360;

      // Speed and direction
      const speed = 40 + (ringIndex * 15) + ((index * 7) % 10);
      const isClockwise = ringIndex % 2 === 0;

      return {
        tech,
        radius,
        angleOffset,
        speed,
        isClockwise
      };
    });
  }, [technologies]);

  const handleHover = (tech: Technology | null, rect: DOMRect | null) => {
    setActiveNode(tech);
    if (rect) {
      setHoverPosition({ x: rect.left, y: rect.top });
    } else {
      setHoverPosition(null);
    }
  };

  const activeRelated = activeNode?.related || [];

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-[800px] mx-auto flex items-center justify-center select-none scale-[0.58] xs:scale-[0.72] sm:scale-[0.86] md:scale-100 origin-center my-[-70px] xs:my-[-40px] sm:my-0">

      {/* Central Core - Steel Blue in Light Mode, Dark in Dark Mode */}
      <div className="relative z-30 flex items-center justify-center w-36 h-36 rounded-full border border-[#394E6E]/30 dark:border-white/15 bg-gradient-to-br from-[#394E6E] to-[#2B3B52] dark:from-[#0c0c14]/90 dark:to-[#0c0c14]/90 backdrop-blur-md shadow-[0_12px_36px_rgba(57,78,110,0.3)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] group">
        <div className="absolute inset-0 rounded-full border border-white/20 dark:border-white/10 animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border border-dashed border-white/30 dark:border-white/20 animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute inset-4 rounded-full bg-white/10 dark:bg-white/5 blur-sm" />
        <span className="relative z-10 text-white dark:text-white text-xs font-mono font-bold text-center px-4 leading-tight">
          {centerLabel}
        </span>
      </div>

      {/* Orbit Rings - Defined dashed rings (#394E6E in light mode) */}
      {[140, 210, 280].map((r, i) => (
        <div
          key={`ring-${i}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#394E6E]/35 dark:border-white/10 pointer-events-none"
          style={{ width: r * 2, height: r * 2 }}
        />
      ))}

      {/* Connections and Nodes */}
      {orbitalNodes.map((node) => {
        const isActive = activeNode?.id === node.tech.id;
        const isRelated = activeRelated.includes(node.tech.id) || (activeNode !== null && node.tech.related.includes(activeNode.id));
        const isDimmed = activeNode !== null && !isActive && !isRelated;

        return (
          <div key={`orbit-group-${node.tech.id}`}>
            <ConnectionLine
              radius={node.radius}
              angleOffset={node.angleOffset}
              speed={node.speed}
              isClockwise={node.isClockwise}
              isActive={isActive}
              isRelated={isRelated}
              isAnimating={isInView}
            />
            <TechnologyNode
              technology={node.tech}
              radius={node.radius}
              angleOffset={node.angleOffset}
              speed={node.speed}
              isClockwise={node.isClockwise}
              isActive={isActive}
              isRelated={isRelated}
              isDimmed={isDimmed}
              isAnimating={isInView}
              onHover={handleHover}
            />
          </div>
        );
      })}

      <TechnologyInfoCard technology={activeNode} position={hoverPosition} />
    </div>
  );
}
