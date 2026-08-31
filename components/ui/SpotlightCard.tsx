"use client";

import React, { useRef, useCallback, memo } from "react";
import { cn } from "@/lib/utils";

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
  const overlayRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!divRef.current || !overlayRef.current || isFocusedRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (overlayRef.current) {
          overlayRef.current.style.background = `radial-gradient(180px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`;
        }
        rafRef.current = null;
      });
    },
    [spotlightColor]
  );

  const handleFocus = useCallback(() => {
    isFocusedRef.current = true;
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "0.6";
    }
  }, []);

  const handleBlur = useCallback(() => {
    isFocusedRef.current = false;
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "0";
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "0.6";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isFocusedRef.current && overlayRef.current) {
      overlayRef.current.style.opacity = "0";
    }
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
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out will-change-transform"
        style={{
          background: `radial-gradient(180px circle at 50% 50%, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {children}
    </div>
  );
};

export default memo(SpotlightCard);

