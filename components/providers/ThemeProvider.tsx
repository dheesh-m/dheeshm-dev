"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useRef, useCallback } from "react";
import ThemeRadialBurstOverlay, { ThemeBurstTriggerRef } from "@/components/ui/ThemeRadialBurstOverlay";

type ThemeOrigin = {
  x: number;
  y: number;
  maxRadius: number;
};

type ThemeContextType = {
  isLightMode: boolean;
  toggleTheme: (origin?: ThemeOrigin) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check local storage on mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsLightMode(true);
      document.documentElement.classList.remove("dark");
      document.body.classList.add("light-theme");
    } else {
      document.documentElement.classList.add("dark");
      document.body.classList.remove("light-theme");
    }
  }, []);

  const toggleTheme = useCallback(
    async (origin?: ThemeOrigin) => {
      const toLight = !isLightMode;

      // Sample origin coordinates
      const x = origin?.x ?? (typeof window !== "undefined" ? window.innerWidth - 120 : 0);
      const y = origin?.y ?? 40;
      const maxRadius =
        origin?.maxRadius ??
        (typeof window !== "undefined"
          ? Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
          : 1200);

      const DURATION = 700;

      // Execute synchronized View Transition radial reveal
      const doc = typeof document !== "undefined" ? (document as any) : null;
      if (doc && typeof doc.startViewTransition === "function") {
        document.documentElement.classList.add("is-theme-transitioning");

        const transition = doc.startViewTransition(() => {
          setIsLightMode(toLight);
          if (toLight) {
            document.documentElement.classList.remove("dark");
            document.body.classList.add("light-theme");
            localStorage.setItem("theme", "light");
          } else {
            document.documentElement.classList.add("dark");
            document.body.classList.remove("light-theme");
            localStorage.setItem("theme", "dark");
          }
        });

        try {
          await transition.ready;

          // The new theme smoothly expands circularly from the click point
          const anim = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: DURATION,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );

          await anim.finished;
        } catch {
          // Finished
        } finally {
          document.documentElement.classList.remove("is-theme-transitioning");
        }
      } else {
        // Fallback for browsers without View Transitions API
        setIsLightMode(toLight);
        if (toLight) {
          document.documentElement.classList.remove("dark");
          document.body.classList.add("light-theme");
          localStorage.setItem("theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          document.body.classList.remove("light-theme");
          localStorage.setItem("theme", "dark");
        }
      }
    },
    [isLightMode]
  );

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
