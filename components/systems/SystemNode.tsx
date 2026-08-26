"use client";

import { memo } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, useMotionTemplate, MotionValue } from "framer-motion";
import { Technology } from "@/data/technologies";
import { cn } from "@/lib/utils";

interface SystemNodeProps {
  technology: Technology;
  radius: number;
  angleOffset: number;
  speed: number;
  isClockwise?: boolean;
  isActive: boolean;
  isRelated: boolean;
  isDimmed: boolean;
  isHubActive: boolean;
  /** Orbits only run while the section is on screen. */
  isAnimating: boolean;
  onHover: (tech: Technology | null, rect: DOMRect | null) => void;
  rotX: MotionValue<number>;
  rotY: MotionValue<number>;
  rotZ: MotionValue<number>;
}

function SystemNode({
  technology,
  radius,
  angleOffset,
  speed,
  isClockwise = true,
  isActive,
  isRelated,
  isDimmed,
  isHubActive,
  isAnimating,
  onHover,
  rotX,
  rotY,
  rotZ
}: SystemNodeProps) {

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onHover(technology, e.currentTarget.getBoundingClientRect());
  };

  const handleMouseLeave = () => {
    onHover(null, null);
  };

  const currentAngle = useMotionValue(angleOffset);
  const invAngle = useTransform(currentAngle, a => -a);

  const invX = useTransform(rotX, x => -x);
  const invY = useTransform(rotY, y => -y);
  const invZ = useTransform(rotZ, z => -z);
  const counterRotate = useMotionTemplate`rotateY(${invAngle}deg) rotateZ(${invZ}deg) rotateY(${invY}deg) rotateX(${invX}deg)`;

  const opacity = useMotionValue(1);

  useAnimationFrame((time, delta) => {
    if (!isAnimating) return;

    // Update local orbit angle
    const direction = isClockwise ? 1 : -1;
    const speedMult = (isActive || isHubActive ? 1.5 : 1) * speed * 0.001;
    currentAngle.set(currentAngle.get() + (delta * speedMult * direction));

    // Calculate global Z depth to set opacity
    const angleRad = (currentAngle.get() * Math.PI) / 180;
    const localX = Math.cos(angleRad) * radius;
    const localZ = Math.sin(angleRad) * radius;

    const rx = (rotX.get() * Math.PI) / 180;
    const ry = (rotY.get() * Math.PI) / 180;

    const z1 = localZ * Math.cos(rx);
    const x1 = localX;
    const globalZ = z1 * Math.cos(ry) - x1 * Math.sin(ry);

    const depth = (globalZ + radius) / (radius * 2); // 0 to 1
    opacity.set(0.60 + depth * 0.40); // 0.60 to 1.0 based on depth
  });

  const nodeTransform = useMotionTemplate`translate(-50%, -50%) rotateY(${currentAngle}deg) translateZ(${radius}px)`;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        transformStyle: "preserve-3d",
        transform: nodeTransform
      }}
    >
      <motion.div
        style={{
          transform: counterRotate,
          opacity: opacity
        }}
        className="flex items-center justify-center"
      >
        <div
          id={`node-${technology.id}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative flex items-center justify-center cursor-crosshair transition-all duration-500",
            isActive ? "scale-110 z-20" : isRelated ? "scale-105 z-20" : "scale-100 z-10",
            isDimmed ? "opacity-30" : "opacity-100"
          )}
        >
          {/* Subtle glow layer behind the node */}
          {(isActive || isRelated) && (
            <motion.div
              layoutId={`sys-glow-${technology.id}`}
              className="absolute inset-0 rounded-full bg-[rgba(120,90,220,0.35)] blur-md pointer-events-none"
            />
          )}

          {/* Node body */}
          <div className="flex flex-col items-center gap-1.5 select-none">
            {/* Small 3D Purple Sphere */}
            <div className={cn(
              "w-4.5 h-4.5 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-[#e9d5ff] via-[#8b5cf6] to-[#5b21b6] relative transition-all duration-500",
              isActive
                ? "scale-125 shadow-[0_0_20px_rgba(139,92,246,0.9)]"
                : isRelated
                  ? "scale-110 shadow-[0_0_15px_rgba(139,92,246,0.7)]"
                  : "shadow-[0_0_8px_rgba(139,92,246,0.35)] hover:scale-110"
            )}>
              {/* Specular highlight */}
              <div className="absolute top-[12%] left-[12%] w-[25%] h-[25%] rounded-full bg-white/70 blur-[0.5px]" />
            </div>

            {/* Label floating below */}
            <span className={cn(
              "whitespace-nowrap text-[9px] md:text-[10px] font-bold font-mono tracking-widest uppercase transition-all duration-500",
              isActive
                ? "text-white drop-shadow-[0_0_6px_rgba(139,92,246,0.8)]"
                : isRelated
                  ? "text-[#f3e8ff]"
                  : "text-gray-300/90"
            )}>
              {technology.name}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default memo(SystemNode);
