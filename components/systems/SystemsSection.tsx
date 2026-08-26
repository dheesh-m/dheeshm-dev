"use client";

import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import SystemCluster from "./SystemCluster";

export default function SystemsSection() {
  return (
    <section id="skills" className="relative w-full py-20 md:py-28 overflow-hidden bg-transparent">
      
      {/* Subtle Grid Background removed to show global neural background */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <SectionLabel number="05" text="SYSTEM ARCHITECTURE" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12 text-center"
        >
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white leading-none mb-6">
            Production <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">Stack</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl mx-auto text-lg">
            Hover over elements to see how my full-stack architecture interconnects.
          </p>
        </motion.div>

        <SystemCluster />
      </div>
    </section>
  );
}
