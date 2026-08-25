"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItemProps {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
  isScrolled?: boolean;
}

export default function NavItem({ id, label, href, isActive, onClick, isScrolled }: NavItemProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        "relative flex flex-col items-center justify-center group",
        isScrolled ? "py-1.5 px-3" : "py-2 px-3"
      )}
    >
      <span className={cn(
        "text-[11px] md:text-xs font-mono mb-1 transition-colors duration-300 whitespace-nowrap",
        isActive ? "text-white font-bold" : "text-zinc-500 group-hover:text-white"
      )}>
        {id}
      </span>
      
      <span className={cn(
        "text-[13px] md:text-[15px] font-mono tracking-widest transition-all duration-300 whitespace-nowrap",
        isActive ? "text-[#F5F5F5] font-bold" : "text-zinc-400 group-hover:text-[#F5F5F5]"
      )}>
        {"// " + (isScrolled ? label.toLowerCase() : label)}
      </span>

      {/* Underline indicator */}
      <div
        className={cn(
          "absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-white origin-center transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          isActive ? "w-4 opacity-100" : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-100"
        )}
      />
      
      {/* Subtle hover translation */}
      <motion.div 
        className="absolute inset-0"
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </a>
  );
}
