"use client";

import React, { useState } from "react";
import { ArrowUp, Mail, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { EMAIL, SOCIALS } from "@/data/socials";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface FooterProps {
  onBackToTop?: () => void;
}

export default function Footer({ onBackToTop }: FooterProps) {
  const [modalContent, setModalContent] = useState<"privacy" | "terms" | null>(null);
  const { isLightMode } = useTheme();

  const scrollToTop = () => {
    if (onBackToTop) {
      onBackToTop();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className={cn("w-full relative z-20 mt-auto overflow-hidden", isLightMode ? "bg-[#FFFFFF]" : "")}>

      {/* ══════════════════════════════════════════════════════════════════════
          LIGHT MODE FOOTER: MATCHES THE ORIGINAL REFERENCE IMAGE PIXEL-PERFECT
      ══════════════════════════════════════════════════════════════════════ */}
      {isLightMode && (
        <div className="w-full flex flex-col bg-[#FFFFFF]">
          {/* Top Divider Hairline */}
          <div className="w-full h-[1px] bg-black/[0.08]" />

          {/* Main Signature & Racing Trails Canvas */}
          <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[430px] flex items-center justify-center overflow-hidden select-none">
            
            {/* ── Background Racing Trajectory Trails ── */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {/* Left Speed Trails */}
              <svg
                className="absolute left-0 top-0 w-[48%] h-full pointer-events-none"
                viewBox="0 0 650 380"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="fadeRedLeft" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E50909" stopOpacity="0.85" />
                    <stop offset="35%" stopColor="#E50909" stopOpacity="0.75" />
                    <stop offset="70%" stopColor="#E50909" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#E50909" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="fadeRedSoftLeft" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E50909" stopOpacity="0.6" />
                    <stop offset="40%" stopColor="#E50909" stopOpacity="0.45" />
                    <stop offset="75%" stopColor="#E50909" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#E50909" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="fadeGreyLeft" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.35" />
                    <stop offset="50%" stopColor="#D1D5DB" stopOpacity="0.25" />
                    <stop offset="85%" stopColor="#E5E7EB" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Outer Red Racing Lines */}
                <path
                  d="M -20 380 C 40 240, 80 150, 220 130 C 320 115, 440 112, 630 112"
                  stroke="url(#fadeRedLeft)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M -35 380 C 30 250, 70 160, 200 136 C 300 120, 420 118, 610 118"
                  stroke="url(#fadeRedLeft)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M 5 380 C 60 260, 95 175, 230 142 C 330 124, 450 122, 620 122"
                  stroke="url(#fadeRedSoftLeft)"
                  strokeWidth="1.0"
                  strokeLinecap="round"
                />

                {/* Inner Grey Perspective Track Markings */}
                <path
                  d="M -10 380 C 40 220, 80 140, 210 122 C 310 108, 430 106, 600 106"
                  stroke="url(#fadeGreyLeft)"
                  strokeWidth="0.8"
                />
                <path
                  d="M 30 380 C 90 280, 120 200, 250 155 C 340 132, 460 128, 630 128"
                  stroke="url(#fadeGreyLeft)"
                  strokeWidth="0.8"
                />
                <path
                  d="M 70 380 C 130 295, 160 220, 280 170 C 370 142, 480 136, 640 136"
                  stroke="url(#fadeGreyLeft)"
                  strokeWidth="0.7"
                />
                <path
                  d="M 110 380 C 170 310, 200 240, 310 185 C 400 152, 500 144, 650 144"
                  stroke="url(#fadeGreyLeft)"
                  strokeWidth="0.6"
                />
              </svg>

              {/* Right Speed Trails (Mirrored horizontally) */}
              <svg
                className="absolute right-0 top-0 w-[48%] h-full pointer-events-none scale-x-[-1]"
                viewBox="0 0 650 380"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="fadeRedRight" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E50909" stopOpacity="0.85" />
                    <stop offset="35%" stopColor="#E50909" stopOpacity="0.75" />
                    <stop offset="70%" stopColor="#E50909" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#E50909" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="fadeRedSoftRight" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E50909" stopOpacity="0.6" />
                    <stop offset="40%" stopColor="#E50909" stopOpacity="0.45" />
                    <stop offset="75%" stopColor="#E50909" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#E50909" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="fadeGreyRight" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.35" />
                    <stop offset="50%" stopColor="#D1D5DB" stopOpacity="0.25" />
                    <stop offset="85%" stopColor="#E5E7EB" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Outer Red Racing Lines */}
                <path
                  d="M -20 380 C 40 240, 80 150, 220 130 C 320 115, 440 112, 630 112"
                  stroke="url(#fadeRedRight)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M -35 380 C 30 250, 70 160, 200 136 C 300 120, 420 118, 610 118"
                  stroke="url(#fadeRedRight)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M 5 380 C 60 260, 95 175, 230 142 C 330 124, 450 122, 620 122"
                  stroke="url(#fadeRedSoftRight)"
                  strokeWidth="1.0"
                  strokeLinecap="round"
                />

                {/* Inner Grey Perspective Track Markings */}
                <path
                  d="M -10 380 C 40 220, 80 140, 210 122 C 310 108, 430 106, 600 106"
                  stroke="url(#fadeGreyRight)"
                  strokeWidth="0.8"
                />
                <path
                  d="M 30 380 C 90 280, 120 200, 250 155 C 340 132, 460 128, 630 128"
                  stroke="url(#fadeGreyRight)"
                  strokeWidth="0.8"
                />
                <path
                  d="M 70 380 C 130 295, 160 220, 280 170 C 370 142, 480 136, 640 136"
                  stroke="url(#fadeGreyRight)"
                  strokeWidth="0.7"
                />
                <path
                  d="M 110 380 C 170 310, 200 240, 310 185 C 400 152, 500 144, 650 144"
                  stroke="url(#fadeGreyRight)"
                  strokeWidth="0.6"
                />
              </svg>
            </div>

            {/* ── Main Name Heading (Razor-Sharp, Perfectly Centered, Editorial Scale) ── */}
            <div className="relative z-10 max-w-[1100px] mx-auto px-4 text-center">
              <h2
                className="font-normal leading-none whitespace-nowrap text-center"
                style={{
                  fontSize: "clamp(64px, 6.5vw, 118px)",
                  fontFamily: "var(--font-work-sans), sans-serif",
                  letterSpacing: "0.01em",
                }}
              >
                <span className="text-[#111111]">Dheesh</span>
                <span className="inline-block w-[0.3em]" />
                <span className="text-[#E50909]">Medekar</span>
              </h2>
            </div>
          </div>

          {/* Bottom Divider Hairline */}
          <div className="w-full h-[1px] bg-black/[0.08]" />

          {/* ── Bottom Utility Row (Clean Single Baseline) ── */}
          <div className="w-full bg-[#FFFFFF]">
            <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              
              {/* Left Side: Circular N Badge + dheesh_h Pill + Copyright */}
              <div className="flex items-center gap-3 sm:gap-4.5 shrink-0">
                {/* Circular N Mark */}
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-black/15 bg-white flex items-center justify-center shrink-0">
                  <span className="font-sans text-xs font-semibold text-[#111111] leading-none">N</span>
                  <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-[#E50909]" />
                </div>

                {/* Compact dheesh_h Pill */}
                <div className="px-2.5 py-1 rounded-md border border-black/15 bg-white shrink-0">
                  <span className="font-mono text-xs font-bold text-[#111111] tracking-tight">dheesh_h</span>
                </div>

                {/* Copyright Text */}
                <span className="text-xs text-[#475467] font-sans whitespace-nowrap">
                  © {new Date().getFullYear()} Dheesh Medekar. All rights reserved.
                </span>
              </div>

              {/* Center: Legal Links with Red Dot */}
              <div className="flex items-center gap-2 text-xs text-[#475467] font-sans">
                <button
                  onClick={() => setModalContent("privacy")}
                  className="hover:text-[#111111] transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Privacy Policy
                </button>
                <span className="text-[#E50909] font-bold text-xs mx-0.5">•</span>
                <button
                  onClick={() => setModalContent("terms")}
                  className="hover:text-[#111111] transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Terms of Service
                </button>
              </div>

              {/* Right Side: 4 Minimal Outlined Square Buttons */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                {/* LinkedIn with 'in' typography */}
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-black/15 bg-white flex items-center justify-center text-[#111111] hover:border-black/35 hover:bg-black/[0.02] transition-all"
                >
                  <span className="font-bold font-sans text-xs sm:text-sm">in</span>
                </a>

                {/* GitHub */}
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-black/15 bg-white flex items-center justify-center text-[#111111] hover:border-black/35 hover:bg-black/[0.02] transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[#111111]" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${EMAIL}`}
                  aria-label="Email"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-black/15 bg-white flex items-center justify-center text-[#111111] hover:border-black/35 hover:bg-black/[0.02] transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#111111]" />
                </a>

                {/* Back to Top */}
                <button
                  onClick={scrollToTop}
                  aria-label="Back to top"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-black/15 bg-white flex items-center justify-center text-[#111111] hover:border-black/35 hover:bg-black/[0.02] transition-all cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-[#111111]" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          DARK MODE FOOTER: SEAMLESS ATMOSPHERIC HORIZON GRADIENT (UNCHANGED)
      ══════════════════════════════════════════════════════════════════════ */}
      {!isLightMode && (
        <div className="w-full relative">
          {/* Background Layers */}
          <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, transparent 0%, #05060B 8%, #050505 18%, #150507 50%, #28080c 75%, #380a10 100%)"
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-full w-full opacity-90"
              style={{
                background: "radial-gradient(ellipse 90% 70% at 50% 95%, rgba(220,38,38,0.40) 0%, rgba(153,27,27,0.28) 35%, rgba(69,10,10,0.12) 70%, transparent 100%)"
              }}
            />
            <div
              className="absolute bottom-6 sm:bottom-8 left-0 right-0 h-24 sm:h-32 w-full opacity-70 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, transparent 0%, rgba(220,38,38,0.22) 60%, rgba(153,27,27,0.05) 100%)"
              }}
            />
            <div
              className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] opacity-45"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.65) 50%, transparent 100%)"
              }}
            />
          </div>

          {/* Main Cinematic Signature */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12 sm:pt-24 sm:pb-16 flex items-center justify-center text-center select-none">
            <h2
              className="w-full text-center font-normal text-[#F4F6FA] tracking-[0.03em] sm:tracking-[0.05em] leading-none whitespace-nowrap overflow-visible flex items-center justify-center transition-colors duration-300"
              style={{
                fontSize: "clamp(1.5rem, 5.6vw, 5.25rem)",
                fontFamily: "var(--font-work-sans), sans-serif",
              }}
            >
              Dheesh Medekar
            </h2>
          </div>

          {/* Footer Metadata & Controls Bar */}
          <div className="relative z-10 w-full pb-8 pt-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Monogram Logo + Copyright */}
              <div className="flex items-center gap-3">
                <span className="font-bold text-xs sm:text-sm tracking-tight text-white bg-white/10 px-2.5 py-0.5 rounded border border-white/10 font-mono">
                  dhees_h
                </span>
                <span className="text-xs text-zinc-300 font-sans tracking-wide">
                  © {new Date().getFullYear()} Dheesh Medekar. All rights reserved.
                </span>
              </div>

              {/* Center Legal Links */}
              <div className="flex items-center gap-3 text-xs font-sans text-zinc-300">
                <button
                  onClick={() => setModalContent("privacy")}
                  className="hover:text-white transition-colors cursor-pointer text-xs bg-transparent border-none p-0"
                >
                  Privacy Policy
                </button>
                <span className="text-zinc-500">•</span>
                <button
                  onClick={() => setModalContent("terms")}
                  className="hover:text-white transition-colors cursor-pointer text-xs bg-transparent border-none p-0"
                >
                  Terms of Service
                </button>
              </div>

              {/* Right Social Icons + Back to Top */}
              <div className="flex items-center gap-2">
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 hover:border-white/25 hover:bg-white/[0.12] flex items-center justify-center text-white/80 hover:text-white transition-all shadow-sm"
                >
                  <span className="font-bold font-sans text-xs text-white">in</span>
                </a>
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 hover:border-white/25 hover:bg-white/[0.12] flex items-center justify-center text-white/80 hover:text-white transition-all shadow-sm"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  aria-label="Email"
                  className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 hover:border-white/25 hover:bg-white/[0.12] flex items-center justify-center text-white/80 hover:text-white transition-all shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={scrollToTop}
                  aria-label="Back to top"
                  className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 hover:border-white/25 hover:bg-white/[0.12] flex items-center justify-center text-white/80 hover:text-white transition-all shadow-sm cursor-pointer ml-1"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Legal Modals ── */}
      <AnimatePresence>
        {modalContent && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border max-h-[85vh] overflow-y-auto custom-scrollbar bg-[#090C17] border-white/20 text-[#F4F6FA]"
            >
              <button
                onClick={() => setModalContent(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-zinc-400 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {modalContent === "privacy" ? (
                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-4">Privacy Policy</h3>
                  <div className="space-y-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    <p>This portfolio is a personal showcase designed to highlight my engineering projects, skills, and background.</p>
                    <p><strong className="text-white">Data Collection:</strong> We do not collect personal data, sell user telemetry, or use tracking cookies.</p>
                    <p><strong className="text-white">Contact:</strong> If you reach out via email, your address will only be used to reply to your inquiry.</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-4">Terms of Service</h3>
                  <div className="space-y-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    <p>Welcome to Dheesh Medekar&apos;s personal portfolio.</p>
                    <p><strong className="text-white">Intellectual Property:</strong> The code, project showcases, and design implementations presented on this portfolio are the creative work of Dheesh Medekar unless cited otherwise.</p>
                    <p><strong className="text-white">Usage:</strong> You are welcome to browse the project architectures for educational and review purposes.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
