"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import styled, { keyframes } from "styled-components";

export interface CyberCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  accent?: string; // default purple #5c67ff
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

interface CardInnerProps {
  $accent: string;
}

const CardInner = styled.div<CardInnerProps>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: #11131a;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid #282c3c;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.8),
    0 0 20px -5px ${(props) => props.$accent}18;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: #3e4766;
    box-shadow: 0 16px 50px -10px rgba(0, 0, 0, 0.9),
      0 0 30px -5px ${(props) => props.$accent}35;
  }

  @media (max-width: 640px) {
    padding: 1.2rem;
  }
`;

// Atmospheric Emerald / Teal Glow
const AtmosphericGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 40%,
    rgba(0, 255, 170, 0.14) 0%,
    rgba(16, 185, 129, 0.05) 50%,
    transparent 80%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

// Diagonal Glossy Glare Streak
interface DiagonalGlareProps {
  $x: number;
  $y: number;
}

const DiagonalGlare = styled.div<DiagonalGlareProps>`
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
    ${(props) => props.$x * 0.4 - 20}%,
    ${(props) => props.$y * 0.4 - 20}%
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

// Dynamic Glare Overlay
interface GlareProps {
  $x: number;
  $y: number;
  $opacity: number;
  $accent: string;
}

const Glare = styled.div<GlareProps>`
  position: absolute;
  inset: 0;
  border-radius: 20px;
  pointer-events: none;
  z-index: 2;
  background: radial-gradient(
    circle at ${(props) => props.$x}% ${(props) => props.$y}%,
    rgba(255, 255, 255, 0.18) 0%,
    ${(props) => props.$accent}18 30%,
    transparent 65%
  );
  opacity: ${(props) => props.$opacity};
  transition: opacity 0.3s ease;
`;

// Scanline Animation
interface ScanlineProps {
  $accent: string;
}

const Scanline = styled.div<ScanlineProps>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${(props) => props.$accent}80 30%,
    #ffffff 50%,
    ${(props) => props.$accent}80 70%,
    transparent 100%
  );
  box-shadow: 0 0 10px ${(props) => props.$accent};
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

// Corner Cyber Brackets (Matching Reference Image 1 & 2)
interface CornerProps {
  $accent: string;
}

const CornerBracket = styled.div<CornerProps>`
  position: absolute;
  width: 13px;
  height: 13px;
  pointer-events: none;
  z-index: 4;
  transition: all 0.3s ease;

  &.top-left {
    top: 10px;
    left: 10px;
    border-top: 2px solid #383f60;
    border-left: 2px solid #383f60;
    border-top-left-radius: 3px;
  }

  &.top-right {
    top: 10px;
    right: 10px;
    border-top: 2px solid #383f60;
    border-right: 2px solid #383f60;
    border-top-right-radius: 3px;
  }

  &.bottom-left {
    bottom: 10px;
    left: 10px;
    border-bottom: 2px solid #383f60;
    border-left: 2px solid #383f60;
    border-bottom-left-radius: 3px;
  }

  &.bottom-right {
    bottom: 10px;
    right: 10px;
    border-bottom: 2px solid #383f60;
    border-right: 2px solid #383f60;
    border-bottom-right-radius: 3px;
  }

  ${CardContainer}:hover & {
    border-color: ${(props) => props.$accent};
    background-color: ${(props) => props.$accent}30;
    box-shadow: 0 0 10px ${(props) => props.$accent},
      inset 0 0 4px ${(props) => props.$accent};
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

interface BadgeProps {
  $accent: string;
}

const CyberBadge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  background: ${(props) => props.$accent}18;
  border: 1px solid ${(props) => props.$accent}40;
  font-family: var(--font-mono, monospace);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #f1f5f9;
  box-shadow: 0 0 8px ${(props) => props.$accent}20;

  &::before {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${(props) => props.$accent};
    box-shadow: 0 0 6px ${(props) => props.$accent};
  }
`;

const SysId = styled.span`
  font-family: var(--font-mono, monospace);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.4);
`;

interface TitleProps {
  $accent: string;
}

const CardTitle = styled.h3<TitleProps>`
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
      0 0 24px ${(props) => props.$accent}60;
  }
`;

interface SubtitleProps {
  $accent: string;
}

const CardSubtitle = styled.p<SubtitleProps>`
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${(props) => props.$accent};
  margin: 0;
  opacity: 0.9;
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
  accent = "#5c67ff",
  size = "md",
  children,
  footer,
  className,
}: CyberCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          window.matchMedia("(hover: none) and (pointer: coarse)").matches
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normX = (clientX / rect.width - 0.5) * 2;
      const normY = (clientY / rect.height - 0.5) * 2;

      const maxTilt = 8;
      setTilt({
        x: -normY * maxTilt,
        y: normX * maxTilt,
      });

      setGlare({
        x: (clientX / rect.width) * 100,
        y: (clientY / rect.height) * 100,
        opacity: 0.75,
      });
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <CardContainer
      ref={containerRef}
      $size={size}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <CardCanvas
        style={{
          transform: isMobile
            ? "none"
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <CardInner $accent={accent}>
          {/* Cyber Corner Brackets */}
          <CornerBracket className="top-left" $accent={accent} />
          <CornerBracket className="top-right" $accent={accent} />
          <CornerBracket className="bottom-left" $accent={accent} />
          <CornerBracket className="bottom-right" $accent={accent} />

          {/* Atmospheric Green Glow */}
          <AtmosphericGlow />

          {/* Diagonal Glare Streak */}
          <DiagonalGlare $x={glare.x} $y={glare.y} />

          {/* Glare & Light Layers */}
          <Glare
            $x={glare.x}
            $y={glare.y}
            $opacity={glare.opacity}
            $accent={accent}
          />
          <Scanline $accent={accent} />
          <CyberTexture />

          {/* Glowing Ambient Particles */}
          <Particle
            $top="22%"
            $left="18%"
            $color="#00ffaa"
            $delay="0s"
          />
          <Particle
            $top="68%"
            $left="82%"
            $color="#00d9ff"
            $delay="1.2s"
          />
          <Particle
            $top="80%"
            $left="26%"
            $color={accent}
            $delay="2.1s"
          />

          {/* Card Header */}
          <HeaderWrapper>
            <TopMeta>
              {badge ? (
                <CyberBadge $accent={accent}>{badge}</CyberBadge>
              ) : (
                <SysId>SYS // {title.slice(0, 4)}</SysId>
              )}
              <SysId>SEC-01</SysId>
            </TopMeta>

            <CardTitle $accent={accent}>{title}</CardTitle>
            {subtitle && (
              <CardSubtitle $accent={accent}>{subtitle}</CardSubtitle>
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
