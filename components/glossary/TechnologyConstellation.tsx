"use client";

import { aiTechnologies } from "@/data/technologies";
import OrbitSystem from "./OrbitSystem";

export default function TechnologyConstellation() {
  return (
    <div className="w-full relative py-6 sm:py-14 md:py-20 flex justify-center items-center overflow-visible">
      <OrbitSystem 
        centerLabel="AI / LLM Engineering" 
        technologies={aiTechnologies} 
      />
    </div>
  );
}
