"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "../ui/SectionLabel";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function About() {
  const { isLightMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center w-full">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-16 md:mb-24 flex flex-col items-center"
        >
          <SectionLabel number="02" text="ENGINEERING PHILOSOPHY" />
          <h2 
            className={cn(
              "text-[clamp(2.3rem,9vw,5rem)] font-normal tracking-tight leading-[0.95] mb-4 sm:mb-6 transition-colors",
              isLightMode ? "text-[#111111]" : "text-white"
            )}
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            How I Think
          </h2>
          <p className={cn(
            "text-sm sm:text-base max-w-xl font-normal",
            isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
          )}>
            &ldquo;I don&apos;t just write code. <strong className={isLightMode ? "text-[#E50909] font-semibold" : "text-[#950606] font-semibold"}>I build systems that solve problems.</strong>&rdquo;
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start w-full">
          
          {/* Main Bio / Philosophy Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "md:col-span-8 flex flex-col gap-4 sm:gap-6 text-sm sm:text-base md:text-lg font-normal leading-relaxed",
              isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
            )}
          >
            <p>
              I bridge the gap between high-level architectural design and low-level engineering execution. With a strong foundation in scalable architectures and AI-driven workflows, I build software that performs reliably in mission-critical environments.
            </p>
            <p>
              My expertise spans large language model orchestration, retrieval-augmented generation pipelines, and high-concurrency backend services. I prioritize clean interfaces, rigorous type safety, and real-time responsiveness.
            </p>
            <p>
              Whether deploying automated data pipelines, constructing full-stack systems, or fine-tuning neural interfaces, I focus on velocity, resilience, and maintainable software patterns.
            </p>
          </motion.div>

          {/* Side Summary / Metrics Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 w-full"
          >
            <div className={cn(
              "p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 w-full",
              isLightMode
                ? "bg-white border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-[#111111]"
                : "bg-white/[0.04] border-white/10 backdrop-blur-md text-white"
            )}>
              <div className="text-[10px] font-mono tracking-widest text-[#E50909] font-bold mb-6 uppercase">
                Currently Building
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  { label: "AI / LLM SYSTEMS" },
                  { label: "REAL-TIME APPS" },
                  { label: "FULL-STACK PRODUCTS" }
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3 group cursor-default">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E50909] shadow-[0_0_6px_#E50909]" />
                    <span className={cn(
                      "text-sm font-semibold tracking-wide transition-colors",
                      isLightMode ? "text-[#343A40] group-hover:text-[#111111]" : "text-[#CBD5E1] group-hover:text-white"
                    )}>
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
