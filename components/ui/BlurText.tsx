"use client";

import { motion, type Transition, type Easing } from "framer-motion";
import React, { useEffect, useRef, useState, useMemo, ElementType } from "react";

import { cn } from "@/lib/utils";

export type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  style?: React.CSSProperties;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as = "p",
  style,
}) => {
  const lines = useMemo(() => {
    return text.split("\n").map((line) => (animateBy === "words" ? line.split(" ") : line.split("")));
  }, [text, animateBy]);

  const totalItems = useMemo(() => lines.reduce((acc, curr) => acc + curr.length, 0), [lines]);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  const Component = as as ElementType;

  return (
    <Component
      ref={ref}
      className={cn("blur-text flex flex-wrap justify-center", className)}
      style={style}
    >
      {lines.map((lineItems, lineIdx) => (
        <React.Fragment key={lineIdx}>
          {lineIdx > 0 && <span className="basis-full w-full h-0" aria-hidden="true" />}
          {lineItems.map((segment, itemIdx) => {
            let globalIndex = 0;
            for (let i = 0; i < lineIdx; i++) {
              globalIndex += lines[i].length;
            }
            globalIndex += itemIdx;

            const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
            const spanTransition: Transition = {
              duration: totalDuration,
              times,
              delay: (globalIndex * delay) / 1000,
              ease: easing,
            };

            return (
              <motion.span
                key={globalIndex}
                initial={fromSnapshot}
                animate={inView ? animateKeyframes : fromSnapshot}
                transition={spanTransition}
                onAnimationComplete={globalIndex === totalItems - 1 ? onAnimationComplete : undefined}
                style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
              >
                {segment === " " ? "\u00A0" : segment}
                {animateBy === "words" && itemIdx < lineItems.length - 1 && "\u00A0"}
              </motion.span>
            );
          })}
        </React.Fragment>
      ))}
    </Component>
  );
};

export default BlurText;
