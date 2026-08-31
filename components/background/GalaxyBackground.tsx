"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import Galaxy from "./Galaxy";

export default function GalaxyBackground() {
  const { isLightMode } = useTheme();

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-colors duration-500 ${
        isLightMode ? "bg-[#ffffff]" : "bg-[#050508]"
      }`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div className="w-full h-full absolute inset-0">
        <Galaxy
          key={isLightMode ? "light" : "dark"}
          starSpeed={0.3}
          density={3}
          hueShift={185}
          speed={1}
          glowIntensity={0.1}
          saturation={1}
          mouseRepulsion={false}
          repulsionStrength={0}
          twinkleIntensity={1}
          rotationSpeed={0.05}
          transparent={false}
          lightMode={isLightMode}
        />
      </div>
    </div>
  );
}
