"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import SectionLabel from "../ui/SectionLabel";
import ProjectCard from "./ProjectCard";

export default function Projects() {

  return (
    <section id="projects" className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel number="04" text="PROJECTS" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-light tracking-[-0.04em] text-white mb-4 font-display">
            Things <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">I&apos;ve Built</span>
          </h2>
        </motion.div>

        <div className="flex flex-col w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 group/grid">
            {projects.map((project, i) => (
              <div 
                key={project.id}
                className={`h-full ${project.id === "apt" ? "lg:col-start-2" : ""}`}
              >
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
