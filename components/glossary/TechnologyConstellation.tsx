"use client";

import { aiTechnologies } from "@/data/technologies";
import OrbitSystem from "./OrbitSystem";

export default function TechnologyConstellation() {
  return (
    <div className="w-full relative py-20 flex justify-center items-center">
      <OrbitSystem 
        centerLabel="AI / LLM Engineering" 
        technologies={aiTechnologies} 
      />
    </div>
  );
}
