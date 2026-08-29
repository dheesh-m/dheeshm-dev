"use client";

import { motion } from "framer-motion";
import ExperienceAccordion from "./ExperienceAccordion";
import SectionLabel from "../ui/SectionLabel";

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <SectionLabel number="05" text="EXPERIENCE" />
          <h2 className="text-[clamp(2.5rem,10vw,5rem)] font-light tracking-[-0.04em] leading-[0.95] font-display mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] via-[#334155] to-[#394E6E] dark:from-[#8A8A8A] dark:via-[#D1D5DB] dark:to-[#FFFFFF]">
            Professional<br />
            Experience
          </h2>
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

      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}
