"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import SystemCluster from "./SystemCluster";
import ExpertiseCardGrid from "./ExpertiseCardGrid";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { LayoutGrid, Orbit } from "lucide-react";

export default function SystemsSection() {
  const { isLightMode } = useTheme();
  const [viewMode, setViewMode] = useState<"constellation" | "cards">("constellation");

  const toggleView = () => {
    setViewMode((prev) => (prev === "constellation" ? "cards" : "constellation"));
  };

  return (
    <section id="skills" className="relative w-full py-20 md:py-28 overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 text-center flex flex-col items-center justify-center max-w-3xl mx-auto">
          <div className="flex justify-center">
            <SectionLabel number="05" text="SKILLS" />
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.2rem,8vw,4.5rem)] font-light tracking-[-0.04em] leading-tight font-display mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] via-[#334155] to-[#394E6E] dark:from-[#8A8A8A] dark:via-[#D1D5DB] dark:to-[#FFFFFF] whitespace-normal sm:whitespace-nowrap"
            >
              Engineering Systems
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#66717D] dark:text-gray-400 font-sans max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-center"
            >
              Explore the core domains powering intelligent, scalable, and real-world systems.
            </motion.p>
          </div>
        </div>

        {/* ── Animated Transition Container for Constellation vs Cards View ── */}
        <AnimatePresence mode="wait">
          {viewMode === "constellation" ? (
            <motion.div
              key="constellation-view"
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <SystemCluster onToggleView={toggleView} />
            </motion.div>
          ) : (
            <motion.div
              key="cards-view"
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <ExpertiseCardGrid onToggleView={toggleView} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
