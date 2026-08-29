"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Position {
  x: number;
  y: number;
}

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(168, 85, 247, 0.22)",
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!divRef.current || isFocused) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [isFocused]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setOpacity(0.6);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setOpacity(0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(0.6);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative rounded-xl border overflow-hidden", className)}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out"
        style={{
          opacity,
          background: `radial-gradient(180px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {children}
    </div>
  );
};

export default SpotlightCard;
