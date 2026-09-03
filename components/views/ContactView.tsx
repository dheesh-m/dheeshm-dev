"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { EMAIL, SOCIALS } from "@/data/socials";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function ContactView() {
  const { isLightMode } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-16 min-h-[calc(100vh-140px)] flex flex-col justify-center items-center text-center">
      <div className="w-full max-w-4xl flex flex-col items-center text-center mx-auto">
        
        {/* Section Indicator */}
        <div className={cn(
          "inline-flex items-center gap-2 px-3.5 py-1 rounded-full backdrop-blur-md mb-6 transition-colors",
          isLightMode 
            ? "bg-red-500/[0.05] border border-red-500/20 text-[#E50909]" 
            : "bg-white/[0.04] border border-white/10 text-white/80"
        )}>
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            isLightMode ? "bg-[#E50909] shadow-[0_0_8px_#E50909]" : "bg-[#950606] shadow-[0_0_8px_#950606]"
          )} />
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
            06 / CONTACT
          </span>
        </div>

        {/* Heading */}
        <h2 
          className={cn(
            "text-5xl sm:text-7xl lg:text-[5.5rem] font-normal tracking-tight leading-[0.95] mb-6 uppercase transition-colors text-center",
            isLightMode ? "text-[#111111]" : "text-white"
          )}
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          LET&apos;S BUILD<br />
          <span>SOMETHING.</span>
        </h2>

        {/* Supporting Text */}
        <p className={cn(
          "text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-normal transition-colors text-center",
          isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
        )}>
          Have an interesting problem, AI system or product idea? I&apos;m always open to discussing new opportunities.
        </p>

        {/* 3 Contact Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
          <a
            href={SOCIALS.email}
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] cursor-pointer",
              isLightMode 
                ? "bg-[#E50909] hover:bg-[#CC0808] shadow-[0_4px_14px_rgba(229,9,9,0.25)]" 
                : "bg-[#950606] hover:bg-[#7D0505] shadow-[0_4px_14px_rgba(149,6,6,0.35)]"
            )}
          >
            <span>EMAIL ME</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>

          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:scale-[1.02]",
              isLightMode
                ? "bg-white text-[#111111] border border-black/15 hover:bg-black/[0.03] shadow-sm"
                : "bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white"
            )}
          >
            <LinkedinIcon className={cn("w-4 h-4", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
            <span>LINKEDIN</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:scale-[1.02]",
              isLightMode
                ? "bg-white text-[#111111] border border-black/15 hover:bg-black/[0.03] shadow-sm"
                : "bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white"
            )}
          >
            <GithubIcon className={cn("w-4 h-4", isLightMode ? "text-[#E50909]" : "text-[#950606]")} />
            <span>GITHUB</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* Email Copy Pill */}
        <button
          onClick={handleCopy}
          className={cn(
            "inline-flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer",
            isLightMode
              ? "bg-white border border-black/10 text-[#343A40] shadow-sm hover:border-black/20"
              : "bg-white/[0.03] border border-white/10 hover:border-white/20 text-[#94A3B8] hover:text-white"
          )}
        >
          <span>{EMAIL}</span>
          <span className={cn("text-[10px] uppercase font-bold ml-1", isLightMode ? "text-[#E50909]" : "text-[#950606]")}>
            {copied ? "COPIED ✓" : "COPY"}
          </span>
        </button>
      </div>
    </div>
  );
}
