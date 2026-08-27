"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { enterpriseData } from "@/data/enterpriseData";
import SectionLabel from "../ui/SectionLabel";
import EngineeringCards3D from "./EngineeringCards3D";
import CodeEditor from "./CodeEditor";

export default function Enterprise() {
  const [activeId, setActiveId] = useState(enterpriseData[0].id);

  const activeItem = enterpriseData.find(item => item.id === activeId) || enterpriseData[0];

  return (
    <section id="expertise" className="relative w-full py-12 sm:py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel number="03" text="MY EXPERTISE" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-[clamp(2rem,8vw,4.5rem)] font-light tracking-[-0.04em] leading-none mb-3 sm:mb-4 font-display text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] via-[#334155] to-[#394E6E] dark:from-[#8A8A8A] dark:via-[#D1D5DB] dark:to-[#FFFFFF]">
              Engineering Systems
            </h2>
            <p className="text-gray-400 font-sans max-w-2xl text-sm sm:text-base">
              Hover over cards for 3D perspective or click to reveal system architectures and implementation details.
            </p>
          </div>


        </motion.div>

        {/* 3D Interactive Domino Flip Cards Row */}
        <EngineeringCards3D
          activeId={activeId}
          onSelectCard={setActiveId}
        />

        {/* Code Editor Visual Effect */}
        <CodeEditor activeItem={activeItem} />
      </div>
    </section>
  );
}
