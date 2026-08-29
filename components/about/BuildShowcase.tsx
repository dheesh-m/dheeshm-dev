"use client";

import SweepCard from "../ui/SweepCard";

export default function BuildShowcase() {
  const categories = [
    { id: "01", title: "PRODUCTION AI SYSTEMS", desc: "Enterprise-grade LLM orchestration, RAG pipelines, and agentic workflows built for scale." },
    { id: "02", title: "FULL-STACK PRODUCTS", desc: "End-to-end web applications with modern frameworks, polished UI/UX, and robust backends." },
    { id: "03", title: "REAL-TIME APPLICATIONS", desc: "High-performance systems using WebSockets, WebRTC, and low-latency data streams." },
    { id: "04", title: "AI EXPERIMENTS", desc: "Exploring the cutting edge of multi-modal models, local inference, and synthetic data." },
  ];

  return (
    <div className="w-full mt-8 sm:mt-16 lg:mt-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group relative h-full"
          >
            <SweepCard className="h-full min-h-[145px] sm:min-h-[220px] lg:min-h-[260px] flex flex-col justify-between p-3.5 sm:p-6 lg:p-8 rounded-[16px] sm:rounded-[24px]">
              <div className="text-[10px] sm:text-xs font-mono text-gray-500 mb-2 sm:mb-6">{cat.id}</div>
              <div>
                <h3 className="text-xs sm:text-base lg:text-lg font-medium sm:font-light text-white mb-1 sm:mb-2.5 group-hover:text-white transition-colors tracking-tight font-display leading-snug">
                  {cat.title}
                </h3>
                <p className="text-[11px] sm:text-sm text-gray-400 leading-snug sm:leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                  {cat.desc}
                </p>
              </div>
            </SweepCard>
          </div>
        ))}
      </div>
    </div>
  );
}
