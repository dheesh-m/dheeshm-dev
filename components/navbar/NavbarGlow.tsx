"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function NavbarGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      // Check if mouse is inside
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        setIsHovered(true);
        mouseX.set(x);
        mouseY.set(y);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-0"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              180px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 189, 248, 0.08),
              transparent 70%
            )
          `,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ opacity: { duration: 0.5 } }}
      />
    </div>
  );
}
