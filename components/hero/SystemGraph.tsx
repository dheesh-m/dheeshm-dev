"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import SystemNode from "./SystemNode";

// Desktop Nodes & Connections
const NODES = [
  { id: "llm", label: "LLM", x: 300, y: 250, isCenter: true, title: "CORE INTELLIGENCE", description: "The central reasoning engine that powers the autonomous workflows.", tech: ["OpenAI", "Anthropic", "Llama 3"] },
  { id: "rag", label: "RAG", x: 100, y: 150, title: "RETRIEVAL-AUGMENTED GENERATION", description: "Retrieves relevant context before generation using embeddings + vector search.", tech: ["Embeddings", "LangChain"] },
  { id: "tools", label: "TOOLS", x: 500, y: 150, title: "TOOL CALLING", description: "Allows the LLM to interact with external systems, APIs, and databases.", tech: ["Function Calling", "MCP"] },
  { id: "memory", label: "MEMORY", x: 300, y: 80, title: "STATE & MEMORY", description: "Long-term and short-term conversational context.", tech: ["Redis", "PostgreSQL"] },
  { id: "agents", label: "AGENTS", x: 300, y: 420, title: "AUTONOMOUS WORKFLOWS", description: "Reason → Tool → Observe → Iterate. Multi-agent orchestration.", tech: ["LangGraph", "AutoGen"] },
  { id: "vector", label: "VECTOR DB", x: 100, y: 350, title: "SEMANTIC SEARCH", description: "High-dimensional vector storage for similarity search.", tech: ["Qdrant", "Pinecone"] },
  { id: "api", label: "API", x: 500, y: 350, title: "PRODUCTION INTERFACE", description: "Real-time streaming and REST endpoints.", tech: ["FastAPI", "WebSockets"] },
];

const CONNECTIONS = [
  { source: "llm", target: "rag" },
  { source: "llm", target: "tools" },
  { source: "llm", target: "memory" },
  { source: "llm", target: "agents" },
  { source: "llm", target: "vector" },
  { source: "llm", target: "api" },
  { source: "rag", target: "vector" },
  { source: "agents", target: "tools" },
];

// Mobile Nodes (Tighter layout, taller viewBox)
const MOBILE_NODES = [
  { ...NODES[0], x: 200, y: 300 }, // LLM (Center)
  { ...NODES[1], x: 60, y: 160 },  // RAG
  { ...NODES[2], x: 340, y: 160 }, // TOOLS
  { ...NODES[3], x: 200, y: 80 },  // MEMORY
  { ...NODES[4], x: 200, y: 520 }, // AGENTS
  { ...NODES[5], x: 60, y: 440 },  // VECTOR
  { ...NODES[6], x: 340, y: 440 }, // API
];

export default function SystemGraph() {
  const rotation = useMotionValue(0);

  // Slow orbital rotation
  useAnimationFrame((time) => {
    rotation.set((time / 150) % 360);
  });

  const renderGraph = (nodes: typeof NODES, cx: number, cy: number, isMobile: boolean) => (
    <svg viewBox={isMobile ? "0 0 400 600" : "0 0 600 500"} className="w-full h-full overflow-visible">
      {/* Atmospheric Depth / Glow */}
      <radialGradient id={`hero-glow-${isMobile ? 'm' : 'd'}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
        <stop offset="40%" stopColor="rgba(255, 255, 255, 0.02)" />
        <stop offset="100%" stopColor="rgba(16, 16, 16, 0)" />
      </radialGradient>
      <circle cx={cx} cy={cy} r={isMobile ? 200 : 280} fill={`url(#hero-glow-${isMobile ? 'm' : 'd'})`} pointerEvents="none" />

      {/* Orbital Rings */}
      <circle cx={cx} cy={cy} r={isMobile ? 90 : 120} fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth={1} pointerEvents="none" />
      <circle cx={cx} cy={cy} r={isMobile ? 140 : 170} fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth={1} strokeDasharray="4 4" pointerEvents="none" />
      <circle cx={cx} cy={cy} r={isMobile ? 190 : 223} fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth={1} pointerEvents="none" />

      {/* Connections */}
      {CONNECTIONS.map((conn, i) => {
        const sourceNode = nodes.find((n) => n.id === conn.source)!;
        const targetNode = nodes.find((n) => n.id === conn.target)!;
        const path = `M ${sourceNode.x} ${sourceNode.y} L ${targetNode.x} ${targetNode.y}`;
        
        return (
          <g key={`${conn.source}-${conn.target}`}>
            {/* Faint base line */}
            <path
              d={path}
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth={1}
            />
            {/* Glowing animated line */}
            <motion.path
              d={path}
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, delay: 1 + i * 0.15, ease: "easeInOut" }}
            />
            {/* Glowing particle along path - reduced on mobile */}
            {!isMobile && (
              <motion.circle
                r={1.5}
                fill="rgba(255, 255, 255, 1)"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 4 + (i % 2), repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                style={{ 
                  offsetPath: `path("${path}")`,
                  filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))"
                }}
              />
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <SystemNode key={node.id} {...node} globalRotation={rotation} />
      ))}
    </svg>
  );

  return (
    <div className="relative w-full aspect-square md:aspect-auto max-w-[600px] flex items-center justify-center">
      <motion.div 
        style={{ rotate: rotation }} 
        className="w-full h-full"
      >
        {/* Desktop Layout */}
        <div className="hidden md:block w-full h-full">
          {renderGraph(NODES, 300, 250, false)}
        </div>
        
        {/* Mobile Layout */}
        <div className="block md:hidden w-full h-full">
          {renderGraph(MOBILE_NODES, 200, 300, true)}
        </div>
      </motion.div>
    </div>
  );
}
