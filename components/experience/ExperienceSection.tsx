"use client";

import { motion } from "framer-motion";
import ExperienceAccordion from "./ExperienceAccordion";
import SectionLabel from "../ui/SectionLabel";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function ExperienceSection() {
  const { isLightMode } = useTheme();

  return (
    <section id="experience" className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-20 flex flex-col items-center"
        >
          <SectionLabel number="05" text="EXPERIENCE" />
          <h2 
            className={cn(
              "text-[clamp(2.5rem,10vw,5rem)] font-normal tracking-tight leading-[0.95] mb-4 transition-colors",
              isLightMode ? "text-[#111111]" : "text-white"
            )}
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            Professional Experience
          </h2>
          <p className={cn(
            "text-sm sm:text-base font-normal",
            isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
          )}>
            Building products. Solving problems. Creating impact.
          </p>
        </motion.div>

        {/* Experience List */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <ExperienceAccordion />
        </motion.div>

      </div>
    </section>
  );
}
