"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SweepCardProps {
  children: ReactNode;
  className?: string;
}

export default function SweepCard({ children, className }: SweepCardProps) {
  return (
    <div className={cn("relative group overflow-visible rounded-[24px] h-full", className)}>
      {/* 
        Glow Layer: Soft illumination outside. 
        It spins continuously and is slightly blurred, spreading light outside the card.
      */}
      <div className="absolute -inset-[3px] rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div 
          className="absolute inset-0 bg-[conic-gradient(from_var(--sweep-angle)_at_50%_50%,transparent_0%,transparent_80%,rgba(255,255,255,0.15)_95%,rgba(255,255,255,0.4)_100%)] animate-sweep blur-xl rounded-[24px]" 
        />
      </div>
      
      {/* 
        Border Layer: Crisp sweeping line.
        Slightly inset from the glow so it acts as a sharp border underneath the actual content.
      */}
      <div className="absolute -inset-[1px] rounded-[24px] overflow-hidden opacity-30 group-hover:opacity-100 transition-opacity duration-1000">
        <div 
          className="absolute -inset-[100%] bg-[conic-gradient(from_var(--sweep-angle)_at_50%_50%,transparent_0%,transparent_85%,rgba(255,255,255,0.4)_95%,rgba(255,255,255,1)_100%)] animate-sweep" 
        />
      </div>

      {/* 
        Card Content / Glass Background 
        Sits exactly on top of the container, allowing the 1px border layer to show from behind.
      */}
      <div 
        className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-xl rounded-[24px] border border-white/5 group-hover:bg-[#101010]/95 transition-colors duration-1000 shadow-2xl" 
      />
      
      {/* Actual Content Wrapper */}
      <div className="relative z-10 h-full transform transition-transform duration-1000 group-hover:-translate-y-1">
        {children}
      </div>
    </div>
  );
}
