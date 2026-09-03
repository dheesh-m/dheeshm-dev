"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { EMAIL, SOCIALS } from "@/data/socials";

interface FooterProps {
  onBackToTop?: () => void;
}

export default function Footer({ onBackToTop }: FooterProps) {
  const scrollToTop = () => {
    if (onBackToTop) {
      onBackToTop();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full relative z-20 mt-auto overflow-hidden bg-[#05060B] border-t border-white/[0.08]">
      {/* ── 1. Cinematic Atmospheric Background (Black → Deep Red Horizon) ── */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Deep Crimson Ambient Horizon Glow */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-full w-full opacity-90"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 88%, rgba(185, 28, 28, 0.42) 0%, rgba(127, 29, 29, 0.22) 40%, rgba(5, 6, 11, 0) 80%)"
          }}
        />
        {/* Soft lower ambient glow strip */}
        <div 
          className="absolute bottom-14 sm:bottom-16 left-0 right-0 h-16 sm:h-20 w-full opacity-60 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(185, 28, 28, 0.25) 60%, transparent 100%)"
          }}
        />
        {/* Horizon hairline accent */}
        <div 
          className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] opacity-40"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.6) 50%, transparent 100%)"
          }}
        />
      </div>

      {/* ── 2. Main Cinematic Signature Area ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-14 pb-12 sm:pt-20 sm:pb-16 flex flex-col items-center justify-center text-center select-none">
        <h2 
          className="w-full text-center font-bold uppercase text-[#F4F6FA] tracking-[0.03em] sm:tracking-[0.05em] leading-none whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-300"
          style={{
            fontSize: "clamp(1.75rem, 6.2vw, 5.75rem)",
            fontFamily: "var(--font-work-sans), sans-serif",
          }}
        >
          DHEESH MEDEKAR
        </h2>
      </div>

      {/* ── 3. Footer Metadata & Controls Bar ── */}
      <div className="relative z-10 w-full border-t border-white/[0.08] bg-[#05060B]/70 backdrop-blur-md py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Monogram Logo + Copyright */}
          <div className="flex items-center gap-3">
            <span className="font-black text-base tracking-tighter text-white">
              DM
            </span>
            <span className="text-xs text-[#64748B] font-mono">
              © {new Date().getFullYear()} Dheesh Medekar. All rights reserved.
            </span>
          </div>

          {/* Center: Legal Links */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#94A3B8]">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>

          {/* Right: Social Icons + Back to Top */}
          <div className="flex items-center gap-2.5">
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] flex items-center justify-center text-white/70 hover:text-white transition-all"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] flex items-center justify-center text-white/70 hover:text-white transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] flex items-center justify-center text-white/70 hover:text-white transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/15 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer ml-1"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
