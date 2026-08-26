"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

const SPRING = { stiffness: 150, damping: 15, mass: 0.1 };

/**
 * Magnetic hover button.
 *
 * Pointer tracking runs through MotionValues rather than component state; the
 * previous version called setState on every mousemove, re-rendering the whole
 * subtree for each pointer event.
 */
export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const handleEnter = useCallback(() => {
    rectRef.current = buttonRef.current?.getBoundingClientRect() ?? null;
  }, []);

  const handleMove = useCallback(
    (e: React.PointerEvent) => {
      // Measured on enter instead of on every move.
      const rect = rectRef.current ?? buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      rectRef.current = rect;
      rawX.set((e.clientX - (rect.left + rect.width / 2)) * 0.1);
      rawY.set((e.clientY - (rect.top + rect.height / 2)) * 0.1);
    },
    [rawX, rawY]
  );

  const handleLeave = useCallback(() => {
    rectRef.current = null;
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const shared = {
    onPointerEnter: handleEnter,
    onPointerMove: handleMove,
    onPointerLeave: handleLeave,
    onClick,
    className,
    // x/y compose with whileHover's scale on the same element, so children
    // stay direct descendants and the caller's flex layout is preserved.
    style: { x, y },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        {...shared}
        href={href}
        target={target}
        rel={rel}
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...shared}
      type="button"
      ref={buttonRef as React.Ref<HTMLButtonElement>}
    >
      {children}
    </motion.button>
  );
}
