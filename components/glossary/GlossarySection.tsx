"use client";

import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import TechBackground from "./TechBackground";
import TechnologyConstellation from "./TechnologyConstellation";

export default function GlossarySection() {
  return (
    <section id="glossary" className="relative w-full py-20 md:py-28 overflow-hidden">
      <TechBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel text="TECHNOLOGY CONSTELLATION" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-[clamp(2.5rem,10vw,5rem)] font-light tracking-[-0.04em] leading-[0.95] text-white font-display mb-6">
            Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">Core</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl text-lg">
            Hover over nodes to explore the interconnected technologies I use to build scalable AI systems.
          </p>
        </motion.div>

        <TechnologyConstellation />
      </div>
    </section>
  );
}
