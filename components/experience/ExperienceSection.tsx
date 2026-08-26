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
          <SectionLabel number="06" text="EXPERIENCE" />
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Professional<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">
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
