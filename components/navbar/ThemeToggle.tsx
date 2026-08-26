"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex items-center justify-center p-2 rounded-full transition-transform hover:scale-110 active:scale-95 ml-2"
      aria-label="Toggle Theme"
    >
      <div className="absolute inset-0 rounded-full theme-toggle-bg transition-colors" />
      
      {/* Soft glow on hover (white glow only, no blue/pink) */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 theme-toggle-glow" />

      {/* The 5-point star */}
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="theme-toggle-star relative z-10 text-[#9A9A9A] group-hover:text-white transition-colors duration-300"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </button>
  );
}
