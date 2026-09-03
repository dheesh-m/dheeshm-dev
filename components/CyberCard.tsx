"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import styled, { keyframes } from "styled-components";

export interface CyberCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  accent?: string;
  size?: "sm" | "md" | "lg" | "wide";
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

// ── Keyframe Animations ──
const scanlineAnim = keyframes`
  0% {
    top: -5%;
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    top: 105%;
    opacity: 0;
  }
`;

const pulseDot = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.85);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.15);
  }
`;

// ── Styled Components ──

interface ContainerProps {
  $size?: "sm" | "md" | "lg" | "wide";
}

const CardContainer = styled.div<ContainerProps>`
  position: relative;
  perspective: 1000px;
  width: 100%;
  max-width: ${(props) => {
    switch (props.$size) {
      case "sm":
        return "320px";
      case "lg":
        return "460px";
      case "wide":
        return "100%";
      case "md":
      default:
        return "380px";
    }
  }};
  min-height: ${(props) => (props.$size === "wide" ? "auto" : "330px")};
  margin: 0 auto;
  user-select: none;
  isolation: isolate;

  @media (max-width: 640px) {
    max-width: 100%;
    min-height: auto;
  }
`;

const CardCanvas = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: rgba(10, 12, 25, 0.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.85),
    0 0 25px -5px rgba(139, 92, 246, 0.18),
    0 0 15px -5px rgba(34, 211, 238, 0.15);
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: rgba(34, 211, 238, 0.45);
    box-shadow: 0 16px 50px -10px rgba(0, 0, 0, 0.95),
      0 0 30px -5px rgba(34, 211, 238, 0.35),
      0 0 20px -5px rgba(139, 92, 246, 0.25),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 640px) {
    padding: 1.2rem;
  }
`;

// Atmospheric Multi-Color Aurora Glow Behind/Inside Card
const AtmosphericGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at 50% 35%,
    rgba(34, 211, 238, 0.16) 0%,
    rgba(139, 92, 246, 0.12) 45%,
    rgba(217, 70, 239, 0.06) 70%,
    transparent 85%
  );
  opacity: 0.6;
  transition: opacity 0.4s ease;
  z-index: 0;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

// Top Specular Aurora Light Rim
const TopSpecularRim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 20%,
    rgba(34, 211, 238, 0.6) 50%,
    rgba(255, 255, 255, 0.3) 80%,
    transparent 100%
  );
  opacity: 0.5;
  transition: opacity 0.3s ease;
  z-index: 4;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

// Diagonal Glossy Glare Streak
const DiagonalGlare = styled.div`
  position: absolute;
  inset: -100%;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(
    135deg,
    transparent 35%,
    rgba(255, 255, 255, 0.06) 46%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0.06) 54%,
    transparent 65%
  );
  transform: translate(
    calc(var(--glare-x, 50) * 0.4% - 20%),
    calc(var(--glare-y, 50) * 0.4% - 20%)
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

// Dynamic Glare Overlay
const Glare = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 20px;
  pointer-events: none;
  z-index: 2;
  background: radial-gradient(
    circle at calc(var(--glare-x, 50) * 1%) calc(var(--glare-y, 50) * 1%),
    rgba(255, 255, 255, 0.2) 0%,
    rgba(34, 211, 238, 0.15) 30%,
    rgba(139, 92, 246, 0.08) 50%,
    transparent 70%
  );
  opacity: var(--glare-opacity, 0);
  transition: opacity 0.3s ease;
`;

// Scanline Animation
const Scanline = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(34, 211, 238, 0.7) 30%,
    #ffffff 50%,
    rgba(139, 92, 246, 0.7) 70%,
    transparent 100%
  );
  box-shadow: 0 0 10px #22d3ee;
  animation: ${scanlineAnim} 4s linear infinite;
  pointer-events: none;
  z-index: 3;
`;

// Horizontal Cyber Texture
const CyberTexture = styled.div`
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(255, 255, 255, 0.015) 3px,
    rgba(255, 255, 255, 0.015) 4px
  );
  pointer-events: none;
  opacity: 0.5;
  z-index: 1;
`;

// Corner Cyber Brackets with Aurora Glow
const CornerBracket = styled.div`
  position: absolute;
  width: 13px;
  height: 13px;
  pointer-events: none;
  z-index: 4;
  transition: all 0.3s ease;

  &.top-left {
    top: 10px;
    left: 10px;
    border-top: 2px solid rgba(148, 163, 184, 0.4);
    border-left: 2px solid rgba(148, 163, 184, 0.4);
    border-top-left-radius: 3px;
  }

  &.top-right {
    top: 10px;
    right: 10px;
    border-top: 2px solid rgba(148, 163, 184, 0.4);
    border-right: 2px solid rgba(148, 163, 184, 0.4);
    border-top-right-radius: 3px;
  }

  &.bottom-left {
    bottom: 10px;
    left: 10px;
    border-bottom: 2px solid rgba(148, 163, 184, 0.4);
    border-left: 2px solid rgba(148, 163, 184, 0.4);
    border-bottom-left-radius: 3px;
  }

  &.bottom-right {
    bottom: 10px;
    right: 10px;
    border-bottom: 2px solid rgba(148, 163, 184, 0.4);
    border-right: 2px solid rgba(148, 163, 184, 0.4);
    border-bottom-right-radius: 3px;
  }

  ${CardContainer}:hover & {
    border-color: #22d3ee;
    background-color: rgba(34, 211, 238, 0.25);
    box-shadow: 0 0 10px #22d3ee, inset 0 0 4px #8b5cf6;
  }
`;

// Glowing Particle Dots
interface ParticleProps {
  $top: string;
  $left: string;
  $color: string;
  $delay: string;
}

const Particle = styled.div<ParticleProps>`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  box-shadow: 0 0 6px ${(props) => props.$color};
  animation: ${pulseDot} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay};
  pointer-events: none;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

// Card Header Typography
const HeaderWrapper = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.85rem;
`;

const TopMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CyberBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  background: rgba(34, 211, 238, 0.12);
  border: 1px solid rgba(34, 211, 238, 0.35);
  font-family: var(--font-mono, monospace);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #f1f5f9;
  box-shadow: 0 0 8px rgba(34, 211, 238, 0.2);

  &::before {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #22d3ee;
    box-shadow: 0 0 6px #22d3ee;
  }
`;

const SysId = styled.span`
  font-family: var(--font-mono, monospace);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.4);
`;

const CardTitle = styled.h3`
  font-size: clamp(1.15rem, 2.2vw, 1.45rem);
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.45);
  transition: text-shadow 0.3s ease;

  ${CardContainer}:hover & {
    text-shadow: 0 0 14px rgba(255, 255, 255, 0.8),
      0 0 24px rgba(34, 211, 238, 0.6);
  }
`;

const CardSubtitle = styled.p`
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #38bdf8;
  margin: 0;
  opacity: 0.95;
`;

const CardDescription = styled.p`
  font-size: 0.8rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.75);
  margin: 0.35rem 0 0 0;
  font-weight: 300;
`;

const ContentBody = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FooterWrapper = styled.div`
  position: relative;
  z-index: 5;
  margin-top: 1rem;
  padding-top: 0.65rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export default function CyberCard({
  title,
  subtitle,
  description,
  badge,
  size = "md",
  children,
  footer,
  className,
}: CyberCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current =
        window.innerWidth < 768 ||
        window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobileRef.current || !containerRef.current) return;
      const el = containerRef.current;
      const rect = el.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normX = (clientX / rect.width - 0.5) * 2;
      const normY = (clientY / rect.height - 0.5) * 2;

      const maxTilt = 8;
      const tiltX = -normY * maxTilt;
      const tiltY = normX * maxTilt;
      const glareX = (clientX / rect.width) * 100;
      const glareY = (clientY / rect.height) * 100;

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
        el.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
        el.style.setProperty("--glare-x", glareX.toFixed(1));
        el.style.setProperty("--glare-y", glareY.toFixed(1));
        el.style.setProperty("--glare-opacity", "0.75");
        rafRef.current = null;
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--glare-opacity", "0");
  }, []);

  return (
    <CardContainer
      ref={containerRef}
      $size={size}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ["--tilt-x" as string]: "0deg",
        ["--tilt-y" as string]: "0deg",
        ["--glare-x" as string]: "50",
        ["--glare-y" as string]: "50",
        ["--glare-opacity" as string]: "0",
      }}
    >
      <CardCanvas
        style={{
          transform: "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
        }}
      >
        <CardInner>
          {/* Top Specular Rim */}
          <TopSpecularRim />

          {/* Cyber Corner Brackets */}
          <CornerBracket className="top-left" />
          <CornerBracket className="top-right" />
          <CornerBracket className="bottom-left" />
          <CornerBracket className="bottom-right" />

          {/* Atmospheric Aurora Multi-Color Glow */}
          <AtmosphericGlow />

          {/* Diagonal Glare Streak */}
          <DiagonalGlare />

          {/* Glare & Light Layers */}
          <Glare />
          <Scanline />
          <CyberTexture />

          {/* Glowing Ambient Aurora Particles */}
          <Particle
            $top="22%"
            $left="18%"
            $color="#22d3ee"
            $delay="0s"
          />
          <Particle
            $top="68%"
            $left="82%"
            $color="#8b5cf6"
            $delay="1.2s"
          />
          <Particle
            $top="80%"
            $left="26%"
            $color="#d946ef"
            $delay="2.1s"
          />

          {/* Card Header */}
          <HeaderWrapper>
            <TopMeta>
              {badge ? (
                <CyberBadge>{badge}</CyberBadge>
              ) : (
                <SysId>SYS // {title.slice(0, 4)}</SysId>
              )}
              <SysId>SEC-01</SysId>
            </TopMeta>

            <CardTitle>{title}</CardTitle>
            {subtitle && (
              <CardSubtitle>{subtitle}</CardSubtitle>
            )}
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </HeaderWrapper>

          {/* Configurable Body Content */}
          {children && <ContentBody>{children}</ContentBody>}

          {/* Configurable Footer */}
          {footer && <FooterWrapper>{footer}</FooterWrapper>}
        </CardInner>
      </CardCanvas>
    </CardContainer>
  );
}
