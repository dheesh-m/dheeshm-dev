"use client";

import MoltenMetal from "@/components/MoltenMetal";
import PlayerProfileCard from "@/components/profile/PlayerProfileCard";
import EngineeringIntelligenceSection from "@/components/profile/EngineeringIntelligenceSection";

export default function KnowMeMorePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#030206] text-white select-none">
      {/* ── Official React Bits MoltenMetal Full-Page WebGL Background ── */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto">
        <MoltenMetal
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#FFFFFF"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode="molten"
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseStrength={0.3}
          opacity={1}
        />
      </div>

      {/* ── Scrollable Content Area with Profile Card & Engineering Intelligence ── */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start pt-8 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 gap-10 sm:gap-14">
        {/* 1. Self-contained Player Profile Card (Silver Cyberpunk) */}
        <PlayerProfileCard />

        {/* 2. Engineering Intelligence Section */}
        <EngineeringIntelligenceSection />

        {/* Natural spacing container ready for future cards/sections */}
        <div className="w-full max-w-6xl mt-6 sm:mt-8" />
      </div>
    </main>
  );
}
