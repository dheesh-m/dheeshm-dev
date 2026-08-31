"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { useTheme } from "@/components/providers/ThemeProvider";

const ringPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.6;
  }
`;

const patternRotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const energyFlow = keyframes`
  0% {
    transform: scaleX(0) translateX(0);
    opacity: 0;
  }
  50% {
    transform: scaleX(1) translateX(50%);
    opacity: 1;
  }
  100% {
    transform: scaleX(0) translateX(100%);
    opacity: 0;
  }
`;

const particleBurst = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(
        calc(cos(var(--angle)) * 22px),
        calc(sin(var(--angle)) * 22px)
      )
      scale(0);
    opacity: 0;
  }
`;

const cosmosPan = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 200%;
  }
`;

const glowFollow = keyframes`
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }
`;

const Switch = () => {
  const { isLightMode, toggleTheme } = useTheme();

  return (
    <StyledWrapper>
      <label className="cosmic-toggle" aria-label="Cosmic Theme Toggle">
        <input
          className="toggle"
          type="checkbox"
          checked={!isLightMode}
          onChange={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const maxRadius = Math.hypot(
              Math.max(x, window.innerWidth - x),
              Math.max(y, window.innerHeight - y)
            );
            toggleTheme({ x, y, maxRadius });
          }}
        />
        <div className="slider">
          <div className="cosmos" />
          <div className="energy-line" />
          <div className="energy-line" />
          <div className="energy-line" />
          <div className="toggle-orb">
            <div className="inner-orb" />
            <div className="ring" />
          </div>
          <div className="particles">
            <div style={{ ["--angle" as string]: "30deg" }} className="particle" />
            <div style={{ ["--angle" as string]: "60deg" }} className="particle" />
            <div style={{ ["--angle" as string]: "90deg" }} className="particle" />
            <div style={{ ["--angle" as string]: "120deg" }} className="particle" />
            <div style={{ ["--angle" as string]: "150deg" }} className="particle" />
            <div style={{ ["--angle" as string]: "180deg" }} className="particle" />
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  flex-shrink: 0;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;

  .cosmic-toggle {
    position: relative;
    width: 58px;
    height: 29px;
    display: block;
    cursor: pointer;
  }

  .toggle {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #1a1a2e, #16213e);
    border-radius: 15px;
    transition: background 0.5s ease, box-shadow 0.3s ease, transform 0.3s ease;
    box-shadow:
      0 0 12px rgba(0, 0, 0, 0.6),
      inset 0 0 8px rgba(255, 255, 255, 0.08);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .cosmos {
    position: absolute;
    inset: 0;
    background: radial-gradient(1px 1px at 10% 15%, #fff 100%, transparent),
      radial-gradient(1px 1px at 25% 25%, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 35% 75%, #fff 100%, transparent),
      radial-gradient(1px 1px at 50% 40%, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 65% 20%, #fff 100%, transparent),
      radial-gradient(1px 1px at 75% 85%, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 85% 50%, #fff 100%, transparent),
      radial-gradient(1px 1px at 90% 15%, #fff 100%, transparent);
    background-size: 200% 200%;
    opacity: 0.25;
    transition: opacity 0.5s;
  }

  .toggle-orb {
    position: absolute;
    height: 23px;
    width: 23px;
    left: 2.5px;
    bottom: 2.5px;
    background: linear-gradient(145deg, #ff6b6b, #4ecdc4);
    border-radius: 50%;
    transition: transform 0.55s cubic-bezier(0.68, -0.55, 0.265, 1.55),
      background 0.5s ease, filter 0.3s ease, box-shadow 0.3s ease;
    z-index: 2;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  }

  .inner-orb {
    position: absolute;
    inset: 2px;
    border-radius: 50%;
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    transition: background 0.5s ease, transform 0.5s ease;
    overflow: hidden;
  }

  .inner-orb::before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(0, 0, 0, 0.12) 10deg,
      transparent 20deg
    );
    animation: ${patternRotate} 10s linear infinite;
  }

  .ring {
    position: absolute;
    inset: -1.5px;
    border: 1.5px solid rgba(255, 255, 255, 0.18);
    border-radius: 50%;
    transition: border-color 0.5s;
  }

  .toggle:checked + .slider {
    background: linear-gradient(45deg, #16213e, #1a1a2e);
  }

  .toggle:checked + .slider .toggle-orb {
    transform: translateX(29px) rotate(360deg);
    background: linear-gradient(145deg, #4ecdc4, #45b7af);
    box-shadow:
      0 0 10px rgba(78, 205, 196, 0.6),
      0 0 20px rgba(78, 205, 196, 0.3);
  }

  .toggle:checked + .slider .inner-orb {
    background: linear-gradient(145deg, #45b7af, #3da89f);
    transform: scale(0.9);
  }

  .toggle:checked + .slider .ring {
    border-color: rgba(78, 205, 196, 0.45);
    animation: ${ringPulse} 2s infinite;
  }

  .energy-line {
    position: absolute;
    width: 100%;
    height: 1.5px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(78, 205, 196, 0.7),
      transparent
    );
    transform-origin: left;
    opacity: 0;
    transition: opacity 0.5s;
  }

  .energy-line:nth-child(1) {
    top: 20%;
    transform: rotate(15deg);
  }

  .energy-line:nth-child(2) {
    top: 50%;
    transform: rotate(0deg);
  }

  .energy-line:nth-child(3) {
    top: 80%;
    transform: rotate(-15deg);
  }

  .toggle:checked + .slider .energy-line {
    opacity: 1;
    animation: ${energyFlow} 2s linear infinite;
  }

  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .particle {
    position: absolute;
    width: 2.5px;
    height: 2.5px;
    background: #4ecdc4;
    border-radius: 50%;
    opacity: 0;
  }

  .toggle:checked + .slider .particle {
    animation: ${particleBurst} 1s ease-out infinite;
  }

  .particle:nth-child(1) {
    left: 20%;
    animation-delay: 0s;
  }

  .particle:nth-child(2) {
    left: 40%;
    animation-delay: 0.2s;
  }

  .particle:nth-child(3) {
    left: 60%;
    animation-delay: 0.4s;
  }

  .particle:nth-child(4) {
    left: 80%;
    animation-delay: 0.6s;
  }

  .particle:nth-child(5) {
    left: 30%;
    animation-delay: 0.8s;
  }

  .particle:nth-child(6) {
    left: 70%;
    animation-delay: 1s;
  }

  .slider:hover .toggle-orb {
    filter: brightness(1.2);
    box-shadow:
      0 0 12px rgba(78, 205, 196, 0.6),
      0 0 24px rgba(78, 205, 196, 0.4);
  }

  .slider:hover .cosmos {
    opacity: 0.45;
    animation: ${cosmosPan} 20s linear infinite;
  }

  .toggle:active + .slider .toggle-orb {
    transform: scale(0.92);
  }

  .cosmic-toggle:hover .slider {
    box-shadow:
      0 0 16px rgba(78, 205, 196, 0.25),
      0 4px 12px rgba(0, 0, 0, 0.5),
      inset 0 0 10px rgba(255, 255, 255, 0.1);
  }

  .toggle:checked + .slider::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(78, 205, 196, 0.25),
      transparent 60%
    );
    opacity: 0;
    animation: ${glowFollow} 2s linear infinite;
  }

  @media (max-width: 640px) {
    .cosmic-toggle {
      width: 50px;
      height: 25px;
    }
    .slider {
      border-radius: 13px;
    }
    .toggle-orb {
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
    }
    .toggle:checked + .slider .toggle-orb {
      transform: translateX(25px) rotate(360deg);
    }
  }
`;

export default Switch;
