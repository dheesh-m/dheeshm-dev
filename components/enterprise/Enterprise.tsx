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
      {/* ── Subtle Atmospheric Aurora Gradient Clouds behind section ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-1/3 left-1/4 w-[500px] h-[350px] rounded-full opacity-[0.07] dark:opacity-[0.14] blur-[90px]"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, #22D3EE 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-[450px] h-[300px] rounded-full opacity-[0.05] dark:opacity-[0.10] blur-[80px]"
          style={{
            background: "radial-gradient(circle, #D946EF 0%, #38BDF8 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionLabel number="02" text="MY EXPERTISE" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <h2 
                className="text-[clamp(2rem,8vw,4.5rem)] font-bold tracking-[-0.04em] leading-none mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] via-[#334155] to-[#394E6E] dark:from-[#94A3B8] dark:via-[#F1F5F9] dark:to-[#CBD5E1] font-primary"
                style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700 }}
              >
                Engineering Systems
              </h2>
              <p 
                className="text-[#94A3B8] max-w-2xl text-sm sm:text-base font-body"
                style={{ fontFamily: "var(--font-josefin), sans-serif", lineHeight: 1.6 }}
              >
                Hover over cards for reactive 3D perspective or click to reveal system architectures and implementation details.
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
