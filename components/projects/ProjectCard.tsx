"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types";
import SweepCard from "../ui/SweepCard";
import { ExternalLink } from "lucide-react";

const HumanoidVisual = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#101010] overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
    <svg className="w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.circle cx="50" cy="30" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" 
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} />
      <circle cx="50" cy="30" r="2" fill="rgba(255,255,255,0.8)" />
      
      <motion.path d="M 50 38 L 50 60" stroke="rgba(255,255,255,0.15)" strokeWidth="1" 
        strokeDasharray="2 2" animate={{ strokeDashoffset: [0, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
      
      <circle cx="35" cy="55" r="4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <circle cx="65" cy="55" r="4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      
      <path d="M 50 45 L 35 55 M 50 45 L 65 55" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      
      <motion.circle cx="50" cy="75" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" 
        animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} strokeDasharray="4 4" />
    </svg>
  </div>
);

const APTVisual = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#101010] overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem]" />
    
    <motion.div 
      className="absolute w-[200%] h-px bg-white/10"
      animate={{ y: [-50, 150] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
    
    <div className="relative w-24 h-12 border border-white/10 rounded-full flex items-center justify-between px-3 bg-white/5 backdrop-blur-sm">
      <motion.div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
      <div className="w-8 h-0.5 bg-white/20 rounded-full" />
      <motion.div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
        animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
    </div>
  </div>
);

const APTDemoVisual = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#101010] overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
    
    <div className="flex gap-2 opacity-40 transform -skew-x-12">
      {[...Array(5)].map((_, i) => (
        <motion.div 
          key={i}
          className="w-8 h-24 border border-white/10 rounded-sm relative overflow-hidden"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        >
          <div className="absolute inset-x-0 top-1 h-2 border-y border-white/5" />
          <div className="absolute inset-x-0 bottom-1 h-2 border-y border-white/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const getProjectVisual = (id: string) => {
  switch (id) {
    case "humanoid": return <HumanoidVisual />;
    case "apt": return <APTVisual />;
    case "apt-demo": return <APTDemoVisual />;
    default: return null;
  }
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
      className="group-hover/grid:opacity-40 hover:!opacity-100 transition-opacity duration-500 ease-out h-full"
    >
      <SweepCard className="h-full flex flex-col group/card !max-w-none transition-all duration-500 rounded-[24px]">
        
        {/* Abstract Visual Area */}
        <div className="w-full aspect-[16/9] relative border-b border-white/10 overflow-hidden rounded-t-[24px]">
          <motion.div 
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {getProjectVisual(project.id)}
          </motion.div>
          
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 text-[10px] font-mono font-bold tracking-widest text-[#F5F5F5] bg-white/5 backdrop-blur-md rounded border border-white/10">
              0{index + 1}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <motion.h3 
            className="text-2xl font-light text-[#F5F5F5] tracking-tight mb-3 group-hover/card:text-white transition-colors font-display"
          >
            {project.title}
          </motion.h3>

          <p className="text-sm text-zinc-400 leading-relaxed font-sans mb-8 flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-[10px] font-mono bg-white/5 border border-white/10 text-[#9A9A9A] rounded group-hover/card:border-white/20 group-hover/card:bg-white/10 group-hover/card:text-white transition-colors">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 mt-auto border-t border-white/10 pt-6">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors group/link py-2 min-h-[44px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover/link:text-white transition-colors">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>Source</span>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors group/link ml-auto py-2 min-h-[44px]">
                <span>View Live</span>
                <ExternalLink className="w-4 h-4 group-hover/link:text-white transition-colors transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>
      </SweepCard>
    </motion.div>
  );
}
