"use client";

import { useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function ThemeToggle() {
  const { isLightMode, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const starRef = useRef<SVGSVGElement>(null);

  const handleClick = () => {
    if (!buttonRef.current) {
      toggleTheme();
      return;
    }

    const targetEl = starRef.current || buttonRef.current;
    const rect = targetEl.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    toggleTheme({ x, y, maxRadius });
  };

  return (
    <div className="relative group/toggle flex items-center justify-center">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="group relative flex items-center justify-center p-2 rounded-full active:scale-95 ml-1 outline-none focus-visible:ring-2 focus-visible:ring-[#4DB8FF]/60"
        aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
      >
        <div className="absolute inset-0 rounded-full theme-toggle-bg transition-colors" />

        {/* Soft atmospheric hover glow */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 scale-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: isLightMode
              ? "0 0 10px rgba(57, 78, 110, 0.25)"
              : "0 0 10px rgba(255, 255, 255, 0.3)",
          }}
        />

        {/* The 5-point star: GPU-animated directly by the physics loop */}
        <svg
          ref={starRef}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`theme-toggle-star relative z-10 transition-colors duration-200 ${
            isLightMode
              ? "text-[#171A1F] group-hover:text-[#394E6E]"
              : "text-white/80 group-hover:text-white"
          }`}
          style={{ willChange: "transform, filter" }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>

      {/* Small hover popup / tooltip */}
      <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover/toggle:opacity-100 group-hover/toggle:translate-y-0 translate-y-1 transition-all duration-200 z-50 whitespace-nowrap">
        <div className="px-2.5 py-1 rounded-full text-[10.5px] font-sans font-medium bg-white/90 dark:bg-[#121218]/90 text-[#000000] dark:text-white border border-black/10 dark:border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.15)] backdrop-blur-md">
          {isLightMode ? "Switch to dark mode" : "Switch to light mode"}
        </div>
      </div>
    </div>
  );
}
