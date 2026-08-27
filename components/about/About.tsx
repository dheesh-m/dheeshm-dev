"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "../ui/SectionLabel";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={containerRef} id="about" className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel number="02" text="ABOUT" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-8 relative">
          {/* Main Statement */}
          <motion.div 
            style={{ y: textY }}
            className="lg:col-span-8 flex flex-col gap-8"
          >
            <h2 className="text-[clamp(2.5rem,10vw,5rem)] font-light tracking-[-0.04em] leading-[0.95] text-white font-display">
              I build systems
              <br />
              <span className="text-gray-500">that connect</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">intelligence</span>
              <br />
              <span className="text-gray-500">to software.</span>
            </h2>
            
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed font-sans mt-4">
              My focus is bridging the gap between cutting-edge AI models and reliable, scalable product interfaces. Whether it&apos;s designing a complex multi-agent reasoning loop or polishing a real-time web interface, I approach engineering with a focus on architecture, performance, and user experience.
            </p>
          </motion.div>

          {/* Side Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="glass-panel p-8 rounded-2xl sticky top-32">
              <div className="text-[10px] font-mono tracking-widest text-gray-500 mb-6 uppercase">
                Currently Building
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  { label: "AI SYSTEMS" },
                  { label: "REAL-TIME APPS" },
                  { label: "FULL-STACK PRODUCTS" }
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-4 group cursor-default">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:scale-150 transition-transform relative">
                      <div className={`absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <span className="text-sm font-semibold tracking-wide text-gray-300 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
