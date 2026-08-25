"use client";

import { motion } from "framer-motion";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function GlassPanel({ children, className = "", hoverable = false }: GlassPanelProps) {
  return (
    <motion.div
      className={`glass-panel rounded-2xl p-6 ${hoverable ? "glass-panel-hover" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
