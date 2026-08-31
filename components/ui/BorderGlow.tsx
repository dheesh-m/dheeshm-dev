"use client";

import React, {
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";

export interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
  style?: CSSProperties;
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
}

function buildBoxShadow(glowColor: string, intensity: number): string {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers: [number, number, number, number, number, boolean][] = [
    [0, 0, 0, 1, 100, true],
    [0, 0, 1, 0, 60, true],
    [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true],
    [0, 0, 15, 0, 30, true],
    [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false],
    [0, 0, 3, 0, 50, false],
    [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false],
    [0, 0, 25, 2, 20, false],
    [0, 0, 50, 2, 10, false],
  ];
  return layers
    .map(([x, y, blur, spread, alpha, inset]) => {
      const a = Math.min(alpha * intensity, 100);
      return `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
    })
    .join(", ");
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function easeInCubic(x: number) {
  return x * x * x;
}

interface AnimateOpts {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (t: number) => number;
  onUpdate: (v: number) => void;
  onEnd?: () => void;
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: AnimateOpts) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

const GRADIENT_POSITIONS = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors: string[]): string[] {
  const gradients: string[] = [];
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

function isLightColor(color: string): boolean {
  const value = color.trim().replace("#", "");
  if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(value)) return false;
  const hex =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
  return red * 0.2126 + green * 0.7152 + blue * 0.0722 > 180;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#120F17",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  fillOpacity = 0.5,
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);
  const sweepActiveRef = useRef(false);

  const getCenterOfElement = useCallback((el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback(
    (el: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      let kx = Infinity;
      let ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    },
    [getCenterOfElement]
  );

  const getCursorAngle = useCallback(
    (el: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      const radians = Math.atan2(dy, dx);
      let degrees = radians * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    },
    [getCenterOfElement]
  );

  const colorSensitivity = edgeSensitivity + 20;

  const updateCssValues = useCallback(
    (angle: number, edgeProx: number, isVisible: boolean) => {
      const card = cardRef.current;
      if (!card) return;
      const borderOpacity = isVisible
        ? Math.max(0, (edgeProx * 100 - colorSensitivity) / (100 - colorSensitivity))
        : 0;
      const glowOpacity = isVisible
        ? Math.max(0, (edgeProx * 100 - edgeSensitivity) / (100 - edgeSensitivity))
        : 0;

      card.style.setProperty("--border-angle", `${angle.toFixed(2)}deg`);
      card.style.setProperty("--border-opacity", borderOpacity.toFixed(3));
      card.style.setProperty("--fill-opacity", (borderOpacity * fillOpacity).toFixed(3));
      card.style.setProperty("--glow-opacity", glowOpacity.toFixed(3));
    },
    [colorSensitivity, edgeSensitivity, fillOpacity]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const edgeProx = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updateCssValues(angle, edgeProx, true);
        rafRef.current = null;
      });
    },
    [getEdgeProximity, getCursorAngle, updateCssValues]
  );

  const handlePointerEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (!sweepActiveRef.current) {
      updateCssValues(45, 0, false);
    }
  }, [updateCssValues]);

  useEffect(() => {
    if (!animated) return;
    const angleStart = 110;
    const angleEnd = 465;
    sweepActiveRef.current = true;

    let currentAngle = angleStart;
    let currentProx = 0;

    const applyAnimated = () => {
      updateCssValues(currentAngle, currentProx, true);
    };

    animateValue({
      duration: 500,
      onUpdate: (v) => {
        currentProx = v / 100;
        applyAnimated();
      },
    });
    animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: (v) => {
        currentAngle = (angleEnd - angleStart) * (v / 100) + angleStart;
        applyAnimated();
      },
    });
    animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: (v) => {
        currentAngle = (angleEnd - angleStart) * (v / 100) + angleStart;
        applyAnimated();
      },
    });
    animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (v) => {
        currentProx = v / 100;
        applyAnimated();
      },
      onEnd: () => {
        sweepActiveRef.current = false;
        if (!isHoveredRef.current) {
          updateCssValues(45, 0, false);
        }
      },
    });
  }, [animated, updateCssValues]);

  const meshGradients = buildMeshGradients(colors);
  const borderBg = meshGradients.map((g) => `${g} border-box`);
  const fillBg = meshGradients.map((g) => `${g} padding-box`);
  const lightSurface = isLightColor(backgroundColor);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative isolate border ${className}`}
      style={{
        background: backgroundColor,
        borderColor: lightSurface
          ? "rgb(24 24 27 / 10%)"
          : "rgb(255 255 255 / 12%)",
        borderRadius: `${borderRadius}px`,
        transform: "translate3d(0, 0, 0.01px)",
        boxShadow: lightSurface
          ? "rgb(24 24 27 / 3%) 0 1px 2px, rgb(24 24 27 / 4%) 0 8px 24px"
          : "rgba(0,0,0,0.1) 0 1px 2px, rgba(0,0,0,0.1) 0 2px 4px, rgba(0,0,0,0.1) 0 4px 8px, rgba(0,0,0,0.1) 0 8px 16px, rgba(0,0,0,0.1) 0 16px 32px, rgba(0,0,0,0.1) 0 32px 64px",
        ["--border-angle" as string]: "45deg",
        ["--border-opacity" as string]: "0",
        ["--fill-opacity" as string]: "0",
        ["--glow-opacity" as string]: "0",
        ...style,
      }}
    >
      {/* mesh gradient border */}
      <div
        className="absolute inset-0 rounded-[inherit] -z-[1] pointer-events-none transition-opacity duration-300"
        style={{
          border: "1px solid transparent",
          background: [
            `linear-gradient(${backgroundColor} 0 100%) padding-box`,
            "linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box",
            ...borderBg,
          ].join(", "),
          opacity: "var(--border-opacity, 0)",
          maskImage: `conic-gradient(from var(--border-angle, 45deg) at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          WebkitMaskImage: `conic-gradient(from var(--border-angle, 45deg) at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
        }}
      />

      {/* mesh gradient fill near edges */}
      <div
        className="absolute inset-0 rounded-[inherit] -z-[1] pointer-events-none transition-opacity duration-300"
        style={
          {
            border: "1px solid transparent",
            background: fillBg.join(", "),
            maskImage: [
              "linear-gradient(to bottom, black, black)",
              "radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
              "radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
              "radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
              "radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
              "radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
              `conic-gradient(from var(--border-angle, 45deg) at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
            ].join(", "),
            WebkitMaskImage: [
              "linear-gradient(to bottom, black, black)",
              "radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
              "radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
              "radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
              "radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
              "radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
              `conic-gradient(from var(--border-angle, 45deg) at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
            ].join(", "),
            maskComposite: "subtract, add, add, add, add, add",
            WebkitMaskComposite:
              "source-out, source-over, source-over, source-over, source-over, source-over",
            opacity: "var(--fill-opacity, 0)",
            mixBlendMode: lightSurface ? "normal" : "soft-light",
          } as CSSProperties
        }
      />

      {/* outer glow */}
      <span
        className="absolute pointer-events-none z-[1] rounded-[inherit] transition-opacity duration-300"
        style={
          {
            inset: `${-glowRadius}px`,
            maskImage: `conic-gradient(from var(--border-angle, 45deg) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
            WebkitMaskImage: `conic-gradient(from var(--border-angle, 45deg) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
            opacity: "var(--glow-opacity, 0)",
            mixBlendMode: lightSurface ? "normal" : "plus-lighter",
          } as CSSProperties
        }
      >
        <span
          className="absolute rounded-[inherit]"
          style={{
            inset: `${glowRadius}px`,
            boxShadow: buildBoxShadow(glowColor, glowIntensity),
          }}
        />
      </span>

      <div className="relative z-[1] w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default React.memo(BorderGlow);
