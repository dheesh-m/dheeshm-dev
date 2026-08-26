"use client";

import { motion } from "framer-motion";
import { EnterpriseSection } from "@/data/enterpriseData";
import { cn } from "@/lib/utils";
import SweepCard from "../ui/SweepCard";

interface EnterpriseCardProps {
  item: EnterpriseSection;
  isActive: boolean;
  onMouseEnter: () => void;
}

export default function EnterpriseCard({ item, isActive, onMouseEnter }: EnterpriseCardProps) {
  return (
    <div onMouseEnter={onMouseEnter} className="h-full">
      <SweepCard className={cn(
        "flex flex-col p-3.5 sm:p-6 md:p-8 transition-all duration-500 cursor-default h-full",
        isActive ? "bg-white/5" : ""
      )}>
      {/* Subtle Grid/Circuit Pattern on Hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:16px_16px]",
        isActive && "opacity-10"
      )} />

      {/* Top Header */}
      <div className="flex justify-between items-start mb-2 sm:mb-6 md:mb-10 relative z-10">
        <span className={cn(
          "font-mono text-[11px] sm:text-xs transition-colors duration-300",
          isActive ? "text-white" : "text-gray-500 group-hover:text-white"
        )}>
          {item.id}
        </span>
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -5 }}
          className="text-white"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-3.5 sm:h-3.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-auto flex flex-col">
        <h3 className="text-sm sm:text-lg md:text-xl font-medium sm:font-light tracking-tight text-white mb-1.5 sm:mb-3 font-display leading-snug">
          {item.title === "PRODUCTION AI SYSTEMS" ? (
            <>
              Production{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">
                AI Systems
              </span>
            </>
          ) : item.title === "FULL-STACK PRODUCTS" ? (
            <>
              Full-Stack{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">
                Products
              </span>
            </>
          ) : item.title === "REAL-TIME APPLICATIONS" ? (
            <>
              Real-Time{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">
                Applications
              </span>
            </>
          ) : item.title === "AI EXPERIMENTS / PROJECTS" ? (
            <>
              AI Experiments{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">
                / Projects
              </span>
            </>
          ) : (
            item.title
          )}
        </h3>
        
        <p className="text-[11.5px] sm:text-sm text-gray-400 font-sans leading-snug sm:leading-relaxed mb-2.5 sm:mb-5">
          {item.description}
        </p>

        {/* Secondary Metadata */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
          {item.technologies.map(tech => (
            <span
              key={tech}
              className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-mono text-gray-400 rounded transition-colors group-hover:bg-white/10 group-hover:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      </SweepCard>
    </div>
  );
}
