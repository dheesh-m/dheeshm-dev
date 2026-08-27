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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              stiffness: 220,
              damping: 20,
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
