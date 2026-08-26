"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import { EMAIL, SOCIALS } from "@/data/socials";

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
      // Clipboard can be blocked (insecure origin, denied permission); the
      // mailto action next to this button still works.
      setCopied(false);
    }
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full flex flex-col items-center justify-center py-20 md:py-32 overflow-hidden min-h-[70vh] z-20"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[1000px] h-[300px] bg-white/[0.03] blur-[120px] rounded-[100%]" />

        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30"
            style={{ top: `${15 + i * 10}%` }}
            animate={isInView ? { x: ["-100%", "100%"] } : { x: "-100%" }}
            transition={
              isInView
                ? {
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }
                : { duration: 0 }
            }
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[11px] tracking-[0.3em] text-zinc-500 mb-6 sm:mb-8">
            07 / CONTACT
          </p>

          <h2 className="text-[clamp(2.2rem,10vw,6.5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white mb-6 font-sans">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">
              LET&apos;S BUILD
              <br />
              SOMETHING.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-8 sm:mb-10 font-sans px-2">
            Have an interesting problem, AI system or product idea? I&apos;m
            always open to discussing new opportunities.
          </p>

          {/* Availability */}
          <p className="flex items-center justify-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase mb-10 sm:mb-12">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Open to new opportunities
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <MagneticButton
              href={SOCIALS.email}
              className="contact-btn-primary group flex h-12 sm:h-14 items-center justify-center gap-3 px-8 rounded-xl bg-white text-[#030712] text-sm font-bold tracking-wide hover:bg-gray-200 transition-colors w-full sm:w-auto shadow-sm"
            >
              EMAIL ME
              <ArrowIcon className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </MagneticButton>

            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <MagneticButton
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="contact-btn-secondary group flex h-12 sm:h-14 items-center justify-center gap-2 px-5 sm:px-6 rounded-xl border border-white/10 text-white text-sm font-semibold hover:border-white/20 hover:bg-white/5 transition-colors flex-1 sm:flex-none shadow-sm"
              >
                LINKEDIN
                <ArrowIcon className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                href={SOCIALS.github}
                target="_blank"
                rel="noreferrer noopener"
                className="contact-btn-secondary group flex h-12 sm:h-14 items-center justify-center gap-2 px-5 sm:px-6 rounded-xl border border-white/10 text-white text-sm font-semibold hover:border-white/20 hover:bg-white/5 transition-colors flex-1 sm:flex-none shadow-sm"
              >
                GITHUB
                <ArrowIcon className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
            </div>
          </div>

          {/* Copy-to-clipboard */}
          <button
            type="button"
            onClick={copyEmail}
            className="contact-email-btn mt-8 inline-flex items-center gap-3 rounded-lg border border-white/10 px-4 py-2.5 font-mono text-xs tracking-widest text-zinc-400 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 max-w-full truncate shadow-sm"
          >
            {EMAIL}
            <span
              aria-hidden="true"
              className={copied ? "text-emerald-400" : "text-zinc-600"}
            >
              {copied ? "COPIED" : "COPY"}
            </span>
          </button>
          {/* Announced to screen readers without shifting layout. */}
          <span aria-live="polite" className="sr-only">
            {copied ? `${EMAIL} copied to clipboard` : ""}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
