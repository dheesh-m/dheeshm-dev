"use client";

import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/SocialIcons";
import { EMAIL, SOCIALS } from "@/data/socials";

export default function ContactView() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-16 min-h-[calc(100vh-140px)] flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Heading, Subtitle & Action Buttons */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          
          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase">
              06 / CONTACT
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.95] text-white mb-6 uppercase">
            LET&apos;S BUILD<br />
            <span className="text-white/95">SOMETHING.</span>
          </h2>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8] max-w-lg mb-8 font-normal">
            Have an interesting problem, AI system or product idea? I&apos;m always open to discussing new opportunities.
          </p>

          {/* 3 Contact Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
            <a
              href={SOCIALS.email}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-[#05060B] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white/90 hover:scale-[1.03] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <span>EMAIL ME</span>
              <ArrowUpRight className="w-4 h-4 text-[#05060B]" />
            </a>

            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:scale-[1.03]"
            >
              <LinkedinIcon className="w-4 h-4 text-white" />
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/50" />
            </a>

            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:scale-[1.03]"
            >
              <GithubIcon className="w-4 h-4 text-white" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/50" />
            </a>
          </div>

          {/* Email Copy Pill */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 text-xs font-mono text-[#94A3B8] hover:text-white transition-all duration-200 cursor-pointer"
          >
            <span>{EMAIL}</span>
            <span className="text-[10px] uppercase font-bold text-[#EF4444] ml-1">
              {copied ? "COPIED ✓" : "COPY"}
            </span>
          </button>
        </div>

        {/* Right Column: Hyperspeed ambient space */}
        <div className="hidden lg:block lg:col-span-4" />

      </div>
    </div>
  );
}
