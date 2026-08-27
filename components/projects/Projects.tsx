"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import SectionLabel from "../ui/SectionLabel";
import ProjectsDominoGrid from "./ProjectsDominoGrid";
import { MousePointer } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Row with Top-Right Interaction Guide */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8 }}
            >
              <SectionLabel number="04" text="FEATURED PROJECTS" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] font-display">
                <span className="text-[#171A1F] dark:text-white">Engineering</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] via-[#334155] to-[#5F7692] dark:from-[#8A8A8A] dark:to-[#FFFFFF]">
                  Systems
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Top-Right Interaction Hint */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#0c0c14]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 text-[11px] font-mono text-gray-700 dark:text-gray-300 w-fit shadow-sm"
          >
            <MousePointer className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
            <span>Hover to tilt • Click to flip • Domino effect</span>
          </motion.div>
        </div>

        {/* 4-Card 3D Interactive Grid & Domino Cascade */}
        <ProjectsDominoGrid projects={projects} />
      </div>
    </section>
  );
}
