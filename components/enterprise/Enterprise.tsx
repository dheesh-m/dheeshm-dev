"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { enterpriseData } from "@/data/enterpriseData";
import SectionLabel from "../ui/SectionLabel";
import EnterpriseCard from "./EnterpriseCard";
import CodeEditor from "./CodeEditor";

export default function Enterprise() {
  const [activeId, setActiveId] = useState(enterpriseData[0].id);

  const activeItem = enterpriseData.find(item => item.id === activeId) || enterpriseData[0];

  return (
    <section id="expertise" className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
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
          className="mb-16"
        >
          <h2 className="text-[clamp(2.5rem,10vw,4.5rem)] font-light tracking-[-0.04em] text-white leading-none mb-6 font-display">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">Systems</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl text-lg">
            Hover over the areas below to explore the architecture and implementation details of the systems I build.
          </p>
        </motion.div>

        {/* Technical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
          {enterpriseData.map((item) => (
            <div key={item.id} className="bg-background">
              <EnterpriseCard 
                item={item} 
                isActive={activeId === item.id} 
                onMouseEnter={() => setActiveId(item.id)} 
              />
            </div>
          ))}
        </div>

        {/* Code Editor Visual Effect */}
        <CodeEditor activeItem={activeItem} />
      </div>
    </section>
  );
}
