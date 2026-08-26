"use client";

import { motion } from "framer-motion";
import SweepCard from "../ui/SweepCard";

export default function BuildShowcase() {
  const categories = [
    { id: "01", title: "PRODUCTION AI SYSTEMS", desc: "Enterprise-grade LLM orchestration, RAG pipelines, and agentic workflows built for scale." },
    { id: "02", title: "FULL-STACK PRODUCTS", desc: "End-to-end web applications with modern frameworks, polished UI/UX, and robust backends." },
    { id: "03", title: "REAL-TIME APPLICATIONS", desc: "High-performance systems using WebSockets, WebRTC, and low-latency data streams." },
    { id: "04", title: "AI EXPERIMENTS", desc: "Exploring the cutting edge of multi-modal models, local inference, and synthetic data." },
  ];

  return (
    <div className="w-full mt-12 sm:mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative"
          >
            <SweepCard className="h-full min-h-[220px] sm:min-h-[260px] flex flex-col justify-between p-6 sm:p-8">
              <div className="text-xs font-mono text-gray-500 mb-6">{cat.id}</div>
              <div>
                <h3 className="text-lg font-light text-white mb-2.5 group-hover:text-white transition-colors tracking-tight font-display">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-sans">
                  {cat.desc}
                </p>
              </div>
            </SweepCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
