"use client";

import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import TechBackground from "./TechBackground";
import TechnologyConstellation from "./TechnologyConstellation";

export default function GlossarySection() {
  return (
    <section id="glossary" className="relative w-full py-20 md:py-28 overflow-hidden">
      <TechBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel text="TECHNOLOGY CONSTELLATION" />

        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,10vw,5rem)] font-light tracking-[-0.04em] leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] via-[#334155] to-[#394E6E] dark:from-[#8A8A8A] dark:via-[#D1D5DB] dark:to-[#FFFFFF] font-display mb-6"
          >
            Neural Core
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-400 font-sans max-w-2xl text-lg"
          >
            Hover over nodes to explore the interconnected technologies I use to build scalable AI systems.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <TechnologyConstellation />
        </motion.div>
      </div>
    </section>
  );
}


