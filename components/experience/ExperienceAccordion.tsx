"use client";

import { useState } from "react";
import { experiences } from "@/data/experience";
import ExperienceItem from "./ExperienceItem";

export default function ExperienceAccordion() {
  // Default to exp-1 being open as shown in reference
  const [activeId, setActiveId] = useState<string | null>("exp-1");

  const handleToggle = (id: string) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto pl-5 sm:pl-8">
      {/* ── Left Continuous Vertical Timeline Line (Neutral Cool-Grey) ── */}
      <div className="absolute left-[9px] sm:left-[15px] top-6 bottom-6 w-px bg-gradient-to-b from-slate-400/40 via-slate-300/20 to-transparent dark:from-white/25 dark:via-white/10 dark:to-transparent pointer-events-none" />

      {/* ── Timeline Items ── */}
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
        {experiences.map((experience, index) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            isCurrent={index === 0}
            isOpen={activeId === experience.id}
            onClick={() => handleToggle(experience.id)}
          />
        ))}
      </div>
    </div>
  );
}
