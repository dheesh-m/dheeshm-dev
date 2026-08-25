"use client";

import ParticleNetwork from "./ParticleNetwork";

export default function NeuralBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      
      {/* Layer 2: Radial Lighting / Glows */}
      {/* Brighter concentration toward the top right, deep charcoal elsewhere */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-[#1C1C1C]/40 blur-[120px]" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#151515]/50 blur-[100px]" />
      <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] rounded-full bg-[#2A2A2A]/20 blur-[150px]" />

      {/* Layer 3: Very faint fixed CSS grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

      {/* Layer 4 & 5: Particle Network (Includes both blurred distant and sharp foreground connections) */}
      <div className="absolute inset-0">
        {/* We can run two instances with different opacities/blurs to simulate depth, or just one for performance. 
            Let's use one crisp layer and a CSS blurred duplicate for depth. */}
        <div className="absolute inset-0 blur-[3px] opacity-40 scale-105">
          <ParticleNetwork />
        </div>
        <div className="absolute inset-0 opacity-80">
          <ParticleNetwork />
        </div>
      </div>
      
      {/* Edge darkening overlay */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
