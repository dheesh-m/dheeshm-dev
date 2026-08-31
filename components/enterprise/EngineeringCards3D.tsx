"use client";

import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { enterpriseData, EnterpriseSection } from "@/data/enterpriseData";
import Interactive3DCard from "./Interactive3DCard";

interface EngineeringCards3DProps {
  activeId: string;
  onSelectCard: (id: string) => void;
}

function EngineeringCards3D({
  activeId,
  onSelectCard,
}: EngineeringCards3DProps) {
  // Independent flip state for each card (no domino cascade)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleCardClick = useCallback(
    (item: EnterpriseSection) => {
      setFlippedCards((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
      onSelectCard(item.id);
    },
    [onSelectCard]
  );

  const handleCardHover = useCallback(
    (item: EnterpriseSection) => {
      if (activeId !== item.id) {
        onSelectCard(item.id);
      }
    },
    [activeId, onSelectCard]
  );

  return (
    <div className="w-full relative mt-4 sm:mt-8 mb-6 sm:mb-10">
      {/* 4-Card Responsive Grid: Single row on desktop (lg:grid-cols-4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 items-stretch">
        {enterpriseData.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.75,
              delay: i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full h-full"
          >
            <Interactive3DCard
              item={item}
              index={i}
              isFlipped={Boolean(flippedCards[item.id])}
              flipDelay={0}
              isActive={activeId === item.id}
              onCardClick={() => handleCardClick(item)}
              onCardHover={() => handleCardHover(item)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default memo(EngineeringCards3D);
