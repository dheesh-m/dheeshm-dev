"use client";

import { useState } from "react";
import { experiences } from "@/data/experience";
import ExperienceItem from "./ExperienceItem";

export default function ExperienceAccordion() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    // If the clicked one is already open, close it. Otherwise, open the clicked one (which automatically closes the other).
    setActiveId(prevId => prevId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      {experiences.map((experience) => (
        <ExperienceItem
          key={experience.id}
          experience={experience}
          isOpen={activeId === experience.id}
          onClick={() => handleToggle(experience.id)}
        />
      ))}
    </div>
  );
}
