"use client";

import { useMemo, useState } from "react";
import { systemTechnologies, aiTechnologies, Technology } from "@/data/technologies";
import SystemHub from "./SystemHub";
import NetworkCanvas from "./NetworkCanvas";
import TechnologyInfoCard from "../glossary/TechnologyInfoCard";

export default function SystemCluster() {
  const [activeNode, setActiveNode] = useState<Technology | null>(null);
  const [activeHub, setActiveHub] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  // Group technologies by category
  const categories = useMemo(() => {
    const ai = aiTechnologies;
    const backend = systemTechnologies.filter(t => t.category === "Backend & APIs");
    const data = systemTechnologies.filter(t => t.category === "Data & Cloud Infra");
    const fullstack = systemTechnologies.filter(t => t.category === "Full-Stack");
    return { ai, backend, data, fullstack };
  }, []);

  const handleNodeHover = (tech: Technology | null, rect: DOMRect | null) => {
    setActiveNode(tech);
    if (rect) {
      setHoverPosition({ x: rect.left, y: rect.top });
    } else {
      setHoverPosition(null);
    }
  };

  const handleHubHover = (category: string | null) => {
    setActiveHub(category);
  };

  return (
    <div className="relative w-full min-h-[2200px] md:min-h-[1400px] lg:min-h-[1000px] flex items-center justify-center mt-12 mb-20 overflow-x-clip">
      
      {/* Network Background Connections (Canvas) */}
      <NetworkCanvas activeNode={activeNode} activeHub={activeHub} />

      {/* 4 Main Hubs */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-20 flex flex-col lg:grid lg:grid-cols-2 gap-y-32 lg:gap-y-16 lg:gap-x-12 items-center justify-items-center">
        
        <div className="w-full flex justify-center lg:justify-end lg:pr-8">
          <SystemHub 
            category="AI / LLM Engineering"
            title="AI & LLM Infra"
            technologies={categories.ai}
            positionClass=""
            activeNode={activeNode}
            activeHub={activeHub}
            onNodeHover={handleNodeHover}
            onHubHover={handleHubHover}
          />
        </div>
        
        <div className="w-full flex justify-center lg:justify-start lg:pl-8">
          <SystemHub 
            category="Data & Cloud Infra"
            title="Data & Cloud"
            technologies={categories.data}
            positionClass=""
            activeNode={activeNode}
            activeHub={activeHub}
            onNodeHover={handleNodeHover}
            onHubHover={handleHubHover}
          />
        </div>

        <div className="w-full flex justify-center lg:justify-end lg:pr-8">
          <SystemHub 
            category="Backend & APIs"
            title="Backend & APIs"
            technologies={categories.backend}
            positionClass=""
            activeNode={activeNode}
            activeHub={activeHub}
            onNodeHover={handleNodeHover}
            onHubHover={handleHubHover}
          />
        </div>

        <div className="w-full flex justify-center lg:justify-start lg:pl-8">
          <SystemHub 
            category="Full-Stack"
            title="Full-Stack"
            technologies={categories.fullstack}
            positionClass=""
            activeNode={activeNode}
            activeHub={activeHub}
            onNodeHover={handleNodeHover}
            onHubHover={handleHubHover}
          />
        </div>

      </div>

      <TechnologyInfoCard technology={activeNode} position={hoverPosition} />
    </div>
  );
}
