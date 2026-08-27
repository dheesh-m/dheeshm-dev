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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-[clamp(2.5rem,10vw,5rem)] font-light tracking-[-0.04em] leading-[0.95] font-display mb-6">
            <span className="text-[#171A1F] dark:text-white">Professional</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] via-[#334155] to-[#5F7692] dark:from-[#8A8A8A] dark:to-[#FFFFFF]">
              Experience
            </span>
          </h2>
        </motion.div>

        {/* Experience List */}
        <div className="w-full">
          <ExperienceAccordion />
        </div>

      </div>

      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}
