"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const requestRef = useRef<number>(0);
  const mouse = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize on devices with a fine pointer (mouse)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    setIsPointer(hasPointer);
    setIsMounted(true);

    if (!hasPointer) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      isHovering.current = !!isInteractive;
    };

    const update = () => {
      // Dot follows immediately with a fast spring
      dot.current.x += (mouse.current.x - dot.current.x) * 0.4;
      dot.current.y += (mouse.current.y - dot.current.y) * 0.4;

      // Ring follows with a lag
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      if (ringRef.current) {
        const scale = isHovering.current ? 1.4 : 1;
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        
        // Subtle border transition
        ringRef.current.style.borderColor = isHovering.current ? "rgba(255, 255, 255, 0.3)" : "rgba(161, 161, 170, 0.3)"; 
        ringRef.current.style.backgroundColor = isHovering.current ? "rgba(255, 255, 255, 0.03)" : "transparent";
      }

      requestRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (!isMounted || !isPointer) return null;

  return (
    <>
      <style>{`
        /* Hide default cursor on devices where this component renders */
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-zinc-500/30 pointer-events-none z-[99999] transition-[background-color,border-color,transform] duration-[250ms] ease-out will-change-transform"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#E5E7EB] pointer-events-none z-[99999] will-change-transform shadow-[0_0_8px_rgba(255,255,255,0.7)]"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
