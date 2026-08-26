"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Project } from "@/types";
import SweepCard from "../ui/SweepCard";
import { ExternalLink } from "lucide-react";

const HumanoidVisual = ({ on }: { on: boolean }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#09090b] overflow-hidden group/humanoid">
    {/* Background subtle radial glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15),transparent_70%)] z-10 pointer-events-none" />
    
    {/* High-res Humanoid Robot Head */}
    <motion.img
      src="/humanoid-head.jpg"
      alt="Humanoid Autonomous Robotics System"
      className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-transform duration-700 ease-out group-hover/humanoid:scale-105"
      initial={{ scale: 1 }}
      animate={on ? { scale: [1, 1.03, 1] } : { scale: 1 }}
      transition={on ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
    />

    {/* Vignette border and subtle overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#101015]/80 via-transparent to-black/20 pointer-events-none z-10" />

    {/* Subtle futuristic scanline effect on hover/active */}
    <motion.div
      className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent z-20 pointer-events-none"
      animate={on ? { top: ["0%", "100%", "0%"] } : { top: "0%" }}
      transition={on ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 0 }}
    />

    {/* High-tech diagnostic badge */}
    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-purple-300">
      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
      <span>AUTONOMOUS_CORE</span>
    </div>
  </div>
);

const APTVisual = ({ on }: { on: boolean }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#09090b] overflow-hidden group/transit">
    {/* Background subtle radial glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12),transparent_70%)] z-10 pointer-events-none" />
    
    {/* High-res APT Hardware Prototype & Architecture */}
    <motion.img
      src="/apt-transit.jpg"
      alt="APT — Autonomous Personal Transit Hardware & Architecture"
      className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-transform duration-700 ease-out group-hover/transit:scale-105"
      initial={{ scale: 1 }}
      animate={on ? { scale: [1, 1.025, 1] } : { scale: 1 }}
      transition={on ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
    />

    {/* Vignette border and subtle overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#101015]/80 via-transparent to-black/20 pointer-events-none z-10" />

    {/* Subtle futuristic scanline effect */}
    <motion.div
      className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent z-20 pointer-events-none"
      animate={on ? { top: ["0%", "100%", "0%"] } : { top: "0%" }}
      transition={on ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 0 }}
    />

    {/* Autonomous Hardware badge */}
    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono text-purple-300">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      <span>ROBOTICS_HARDWARE</span>
    </div>
  </div>
);

const APTDemoVisual = ({ on }: { on: boolean }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#0d091a] overflow-hidden group/movie">
    {/* Background subtle radial glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12),transparent_70%)] z-10 pointer-events-none" />
    
    {/* High-res TicketLoJao Screenshot */}
    <motion.img
      src="/ticketlojao.png"
      alt="AI-Powered Movie Ticket Booking Platform — TicketLoJao"
      className="w-full h-full object-cover object-top filter brightness-95 contrast-105 transition-transform duration-700 ease-out group-hover/movie:scale-105"
      initial={{ scale: 1 }}
      animate={on ? { scale: [1, 1.025, 1] } : { scale: 1 }}
      transition={on ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
    />

    {/* Vignette border and subtle overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#101015]/80 via-transparent to-black/20 pointer-events-none z-10" />

    {/* Subtle futuristic scanline effect */}
    <motion.div
      className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent z-20 pointer-events-none"
      animate={on ? { top: ["0%", "100%", "0%"] } : { top: "0%" }}
      transition={on ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 0 }}
    />

    {/* Live Web App badge */}
    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono text-purple-300">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span>TICKETLOJAO_LIVE</span>
    </div>
  </div>
);

const FarmLensVisual = ({ on }: { on: boolean }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d12] overflow-hidden p-2.5 sm:p-4 gap-2 sm:gap-3">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.06),transparent_70%)]" />
    
    {/* 01 Leaf Upload Step */}
    <motion.div 
      className="w-full max-w-[175px] sm:max-w-[200px] border border-white/10 rounded-md sm:rounded-lg p-2 sm:p-2.5 bg-white/[0.03] backdrop-blur-sm relative overflow-hidden"
      animate={on ? { borderColor: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)'] } : {}}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <div className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1 sm:mb-1.5">01 · Leaf Upload</div>
      <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono text-zinc-400">
        <span className="text-white">Image</span>
        <span className="text-zinc-600">→</span>
        <span>Preprocess</span>
        <span className="text-zinc-600">→</span>
        <span className="text-purple-300">Infer</span>
      </div>
      
      {/* Scanning effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/10 to-transparent h-[200%] w-full"
        animate={on ? { top: ['-100%', '100%'] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>

    {/* Connecting line */}
    <div className="w-px h-2.5 sm:h-3 bg-gradient-to-b from-white/20 to-white/5" />

    {/* 02 Prediction Record */}
    <motion.div 
      className="w-full max-w-[205px] sm:max-w-[230px] border border-white/10 rounded-md sm:rounded-lg p-2 sm:p-2.5 bg-white/[0.03] backdrop-blur-sm"
      initial={{ opacity: 0.7 }}
      animate={on ? { opacity: [0.7, 1, 0.7] } : {}}
      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
    >
      <div className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1 sm:mb-1.5">02 · Prediction Record</div>
      
      <div className="flex justify-between items-end mb-1 sm:mb-1.5">
        <div className="flex flex-col">
          <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest">Condition</span>
          <span className="text-[11px] sm:text-xs text-white">Tomato — Early Blight</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest">Confidence</span>
          <span className="text-[11px] sm:text-xs text-emerald-400 font-mono">91.4%</span>
        </div>
      </div>
      
      <div className="text-[8px] sm:text-[9px] font-mono text-zinc-500 border-t border-white/10 pt-1 mt-1">
        Treatment recommended · logged
      </div>
    </motion.div>
  </div>
);

const getProjectVisual = (id: string, on: boolean) => {
  switch (id) {
    case "farmlens": return <FarmLensVisual on={on} />;
    case "humanoid": return <HumanoidVisual on={on} />;
    case "apt": return <APTVisual on={on} />;
    case "apt-demo": return <APTDemoVisual on={on} />;
    default: return null;
  }
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Each card's decorative loops idle until it is near the viewport.
  const isInView = useInView(ref, { margin: "200px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const hasExtraContent = !!(
    project.problem || 
    project.outcome || 
    project.architecture || 
    project.engineeringFocus
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
      className="group-hover/grid:opacity-40 hover:!opacity-100 transition-opacity duration-500 ease-out h-full"
    >
      <SweepCard className="h-full flex flex-col group/card !max-w-none transition-all duration-500 rounded-[18px] sm:rounded-[24px]">
        
        {/* Abstract Visual Area */}
        <div className="w-full aspect-[16/10] sm:aspect-[16/9] relative border-b border-white/10 overflow-hidden rounded-t-[18px] sm:rounded-t-[24px]">
          <motion.div 
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {getProjectVisual(project.id, isInView)}
          </motion.div>
          
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
            <span className="px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#F5F5F5] bg-black/60 backdrop-blur-md rounded border border-white/10">
              0{index + 1}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
          <motion.h3 
            className="text-lg sm:text-xl md:text-2xl font-light text-[#F5F5F5] tracking-tight mb-1.5 sm:mb-3 group-hover/card:text-white transition-colors font-display"
          >
            {project.title}
          </motion.h3>

          <div className={`text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans mb-3 sm:mb-6 ${!isExpanded ? "line-clamp-3" : ""}`}>
            {project.description}
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-6">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-mono bg-white/5 border border-white/10 text-[#9A9A9A] rounded group-hover/card:border-white/20 group-hover/card:bg-white/10 group-hover/card:text-white transition-colors">
                {tech}
              </span>
            ))}
          </div>

          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            className="overflow-hidden"
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-4 sm:gap-6 pb-4 sm:pb-6">
              {project.flows && project.flows.length > 0 && (
                <div className="flex flex-col gap-4 sm:gap-6 mb-2 border-b border-white/10 pb-4 sm:pb-6">
                  {project.flows.map((flow, i) => (
                    <div key={i}>
                      <h4 className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-zinc-500 mb-1.5 font-mono">{flow.title}</h4>
                      <p className="text-[9.5px] sm:text-[10px] text-zinc-300 font-mono flex items-center flex-wrap">
                        {flow.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {project.problem && (
                <div>
                  <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 font-mono">Problem</h4>
                  <p className="text-[11.5px] sm:text-xs text-zinc-400 leading-relaxed">{project.problem}</p>
                </div>
              )}
              {project.outcome && (
                <div>
                  <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 font-mono">Outcome</h4>
                  <p className="text-[11.5px] sm:text-xs text-zinc-400 leading-relaxed">{project.outcome}</p>
                </div>
              )}
              {project.architecture && (
                <div>
                  <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 font-mono">Architecture</h4>
                  <p className="text-[11.5px] sm:text-xs text-zinc-400 leading-relaxed">{project.architecture}</p>
                </div>
              )}
              {project.engineeringFocus && (
                <div>
                  <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 font-mono">Engineering Focus</h4>
                  <ul className="text-[11.5px] sm:text-xs text-zinc-400 leading-relaxed flex flex-col gap-1">
                    {project.engineeringFocus.map((focus, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-zinc-600">—</span> <span>{focus}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          <div className="flex items-center flex-wrap gap-3 sm:gap-4 mt-auto border-t border-white/10 pt-3.5 sm:pt-6">
            {project.githubUrl && project.githubUrl !== "private" && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors group/link py-1 min-h-[36px]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/link:text-white transition-colors">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>Source</span>
              </a>
            )}
            
            {project.githubUrl === "private" && (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 py-1 min-h-[36px]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Private source</span>
              </div>
            )}

            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              {hasExtraContent && (
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs font-semibold text-white hover:text-zinc-300 transition-colors py-1 min-h-[36px]"
                >
                  {isExpanded ? "View Less ↑" : "View More →"}
                </button>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors group/link py-1 min-h-[36px]">
                  <span>{project.customLiveText || "View Live"}</span>
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/link:text-white transition-colors transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </SweepCard>
    </motion.div>
  );
}
