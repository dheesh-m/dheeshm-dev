"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types";
import ProjectCard3D from "./ProjectCard3D";

interface ProjectsDominoGridProps {
  projects: Project[];
}

export default function ProjectsDominoGrid({ projects }: ProjectsDominoGridProps) {
  const [flippedIds, setFlippedIds] = useState<string[]>([]);

  const handleFlipToggle = useCallback(
    (id: string) => {
      setFlippedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    },
    []
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 w-full">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.8,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
          >
            <ProjectCard3D
              project={project}
              index={index}
              isFlipped={flippedIds.includes(project.id)}
              onFlipToggle={handleFlipToggle}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
