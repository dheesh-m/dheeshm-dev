"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useRef, useCallback } from "react";
import ThemeRadialBurstOverlay, { ThemeBurstTriggerRef } from "@/components/ui/ThemeRadialBurstOverlay";

type ThemeOrigin = {
  x: number;
  y: number;
  maxRadius: number;
  starElement?: SVGElement | HTMLElement | null;
};

type ThemeContextType = {
  isLightMode: boolean;
  toggleTheme: (origin?: ThemeOrigin) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLightMode, setIsLightMode] = useState(false);
  const burstRef = useRef<ThemeBurstTriggerRef>(null);

  useEffect(() => {
    // Check local storage on mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsLightMode(true);
      document.body.classList.add("light-theme");
    }
  }, []);

  const toggleTheme = useCallback(
    (origin?: ThemeOrigin) => {
      const toLight = !isLightMode;

      // Calculate origin coordinates or default to star position / center
      const x = origin?.x ?? (typeof window !== "undefined" ? window.innerWidth - 120 : 0);
      const y = origin?.y ?? 40;
      const maxRadius =
        origin?.maxRadius ??
        (typeof window !== "undefined"
          ? Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
          : 1200);

      // Trigger the unified continuous physics explosion
      burstRef.current?.trigger({
        x,
        y,
        maxRadius,
        toLight,
        starElement: origin?.starElement,
        onThemeSwitch: () => {
          setIsLightMode(toLight);
          if (toLight) {
            document.body.classList.add("light-theme");
            localStorage.setItem("theme", "light");
          } else {
            document.body.classList.remove("light-theme");
            localStorage.setItem("theme", "dark");
          }
        },
      });
    },
    [isLightMode]
  );

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      <ThemeRadialBurstOverlay ref={burstRef} />
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
