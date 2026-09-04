"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import { EMAIL, SOCIALS } from "@/data/socials";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import SectionLabel from "../ui/SectionLabel";

const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M7 17l9.2-9.2M17 17V7H7" />
  </svg>
);

export default function Contact() {
  const { isLightMode } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "200px" });
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full flex flex-col items-center justify-center py-14 sm:py-20 md:py-32 overflow-hidden min-h-[60vh] sm:min-h-[70vh] z-20"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[1000px] h-[300px] bg-white/[0.03] blur-[120px] rounded-[100%]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center w-full">
        <div>
          <SectionLabel number="06" text="CONTACT" />

          <motion.h2
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "text-[clamp(1.85rem,7vw,4.5rem)] font-bold tracking-tight leading-tight mb-4 sm:mb-6 whitespace-normal break-words max-w-full transition-colors duration-300 font-primary",
              isLightMode ? "text-[#111111]" : "text-white"
            )}
            style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 750 }}
          >
            LET&apos;S BUILD SOMETHING.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "text-sm sm:text-lg md:text-xl max-w-xl mx-auto mb-6 sm:mb-10 font-normal px-2 transition-colors font-body",
              isLightMode ? "text-[#475467]" : "text-[#94A3B8]"
            )}
            style={{ fontFamily: "var(--font-josefin), sans-serif", lineHeight: 1.6 }}
          >
            Have an interesting problem, AI system or product idea? I&apos;m
            always open to discussing new opportunities.
          </motion.p>

          {/* Availability */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "flex items-center justify-center gap-2 font-mono text-[10.5px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.2em] uppercase mb-8 sm:mb-12 transition-colors",
              isLightMode ? "text-[#667085]" : "text-zinc-500"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full inline-block shrink-0",
                isLightMode ? "bg-[#E50909] shadow-[0_0_6px_#E50909]" : "bg-[#950606] shadow-[0_0_6px_#950606]"
              )}
            />
            Open to new opportunities
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full"
          >
            <MagneticButton
              href={SOCIALS.email}
              className={cn(
                "contact-btn-primary group flex h-11 sm:h-14 items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 rounded-full text-white text-xs sm:text-sm font-bold tracking-wide transition-all w-full sm:w-auto",
                isLightMode 
                  ? "bg-[#E50909] hover:bg-[#CC0808] shadow-[0_4px_14px_rgba(229,9,9,0.25)]" 
                  : "bg-[#950606] hover:bg-[#7D0505] shadow-[0_4px_14px_rgba(149,6,6,0.35)]"
              )}
            >
              EMAIL ME
              <ArrowIcon className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </MagneticButton>

            <div className="flex items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
              <MagneticButton
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "contact-btn-secondary group flex h-11 sm:h-14 items-center justify-center gap-2 px-4 sm:px-6 rounded-full text-xs sm:text-sm font-semibold transition-all flex-1 sm:flex-none shadow-sm",
                  isLightMode
                    ? "bg-white text-[#111111] border border-black/15 hover:bg-black/[0.03]"
                    : "border border-white/10 text-white hover:border-white/20 hover:bg-white/5"
                )}
              >
                LINKEDIN
                <ArrowIcon className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                href={SOCIALS.github}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "contact-btn-secondary group flex h-11 sm:h-14 items-center justify-center gap-2 px-4 sm:px-6 rounded-full text-xs sm:text-sm font-semibold transition-all flex-1 sm:flex-none shadow-sm",
                  isLightMode
                    ? "bg-white text-[#111111] border border-black/15 hover:bg-black/[0.03]"
                    : "border border-white/10 text-white hover:border-white/20 hover:bg-white/5"
                )}
              >
                GITHUB
                <ArrowIcon className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
            </div>
          </motion.div>

          {/* Copy-to-clipboard */}
          <motion.button
            type="button"
            onClick={copyEmail}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "contact-email-btn mt-6 sm:mt-8 inline-flex items-center gap-2.5 sm:gap-3 rounded-xl border px-4 py-2 sm:py-2.5 font-mono text-[10.5px] sm:text-xs tracking-widest transition-all max-w-full truncate shadow-sm cursor-pointer",
              isLightMode
                ? "bg-white border-black/10 text-[#343A40] hover:border-black/20"
                : "border-white/10 text-zinc-400 hover:border-white/25 hover:bg-white/5 hover:text-white"
            )}
          >
            <span className="truncate">{EMAIL}</span>
            <span
              aria-hidden="true"
              className={cn("font-bold uppercase", isLightMode ? "text-[#E50909]" : "text-[#950606]")}
            >
              {copied ? "COPIED ✓" : "COPY"}
            </span>
          </motion.button>
          <span aria-live="polite" className="sr-only">
            {copied ? `${EMAIL} copied to clipboard` : ""}
          </span>
        </div>
      </div>
    </section>
  );
}
