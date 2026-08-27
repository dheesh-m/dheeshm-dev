"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { enterpriseData, EnterpriseSection } from "@/data/enterpriseData";
import Interactive3DCard from "./Interactive3DCard";

interface EngineeringCards3DProps {
  activeId: string;
  onSelectCard: (id: string) => void;
}

export default function EngineeringCards3D({
  activeId,
  onSelectCard,
}: EngineeringCards3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Compute domino delay for each card (80-120ms stagger)
  const getDelay = useCallback(
    (cardIndex: number) => {
      if (prefersReducedMotion) return 0;
      const STAGGER = 0.095; // 95ms between domino cascade steps

      if (!isFlipped) {
        // Flipping to BACK: clicked card starts first, then cascades forward
        const step = (cardIndex - clickedIndex + 4) % 4;
        return step * STAGGER;
      } else {
        // Flipping back to FRONT (Reverse sequence: 04 → 03 → 02 → 01)
        const step = 3 - cardIndex;
        return step * STAGGER;
      }
    },
    [isFlipped, clickedIndex, prefersReducedMotion]
  );

  const handleCardClick = useCallback(
    (index: number, item: EnterpriseSection) => {
      setClickedIndex(index);
      setIsFlipped((prev) => !prev);
      onSelectCard(item.id);
    },
    [onSelectCard]
  );

  const handleCardHover = useCallback(
    (item: EnterpriseSection) => {
      onSelectCard(item.id);
    },
    [onSelectCard]
  );

  return (
    <div className="w-full relative mt-4 sm:mt-8 mb-6 sm:mb-10">
      {/* 4-Card Responsive Grid: Single row on desktop (lg:grid-cols-4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 items-stretch">
        {enterpriseData.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-full"
          >
            <Interactive3DCard
              item={item}
              index={i}
              isFlipped={isFlipped}
              flipDelay={getDelay(i)}
              isActive={activeId === item.id}
              onCardClick={() => handleCardClick(i, item)}
              onCardHover={() => handleCardHover(item)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
