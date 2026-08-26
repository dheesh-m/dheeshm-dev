"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

export default function ThemeToggle() {
  const { isLightMode, toggleTheme } = useTheme();

  return (
    <div className="relative group/toggle flex items-center justify-center">
      <button
        onClick={toggleTheme}
        className="group relative flex items-center justify-center p-2 rounded-full transition-transform hover:scale-110 active:scale-95 ml-1 outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60"
        aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
      >
        <div className="absolute inset-0 rounded-full theme-toggle-bg transition-colors" />

        {/* Soft glow on hover */}
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
          className="theme-toggle-star relative z-10 text-[#9A9A9A] group-hover:text-white dark:group-hover:text-white transition-colors duration-300"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>

      {/* Small hover popup / tooltip */}
      <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover/toggle:opacity-100 group-hover/toggle:translate-y-0 translate-y-1 transition-all duration-200 z-50 whitespace-nowrap">
        <div className="px-2.5 py-1 rounded-full text-[10.5px] font-sans font-medium bg-white/90 dark:bg-[#121218]/90 text-[#0f172a] dark:text-white border border-black/10 dark:border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.15)] backdrop-blur-md">
          {isLightMode ? "Switch to dark mode" : "Switch to light mode"}
        </div>
      </div>
    </div>
  );
}
