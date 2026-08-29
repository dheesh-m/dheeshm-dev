"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { EMAIL, SOCIALS } from "@/data/socials";
import { ArrowRight, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

// ── SVG Social Icons ────────────────────────────────────────────────────────
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const MailIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function Footer() {
  const { isLightMode } = useTheme();
  const [emailInput, setEmailInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setEmailInput("");
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { num: "01.", label: "Introduction", href: "#home" },
    { num: "02.", label: "About Me", href: "#about" },
    { num: "03.", label: "Skills", href: "#skills" },
    { num: "04.", label: "Projects", href: "#projects" },
    { num: "05.", label: "Experience", href: "#experience" },
    { num: "06.", label: "Achievements", href: "#expertise" },
    { num: "07.", label: "Contact", href: "#contact" },
  ];

  const resourceLinks = [
    { label: "GitHub", href: SOCIALS.github, external: true },
    { label: "LinkedIn", href: SOCIALS.linkedin, external: true },
    { label: "Resume", href: "#contact", external: false },
    { label: "Blog", href: "https://x.com", external: true },
    { label: "Email", href: `mailto:${EMAIL}`, external: true },
  ];

  return (
    <footer className="relative w-full overflow-hidden pt-8 sm:pt-14 md:pt-16 lg:pt-20 pb-4 sm:pb-6 md:pb-8 min-h-[360px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[620px] z-20 flex flex-col justify-between">
      {/* ══════════════════════════════════════════════════════════════════════
          LAYER 0: PIXEL-PERFECT THEMED CINEMATIC ARTWORK (LUNAR SPACE ENVIRONMENT)
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden select-none">
        {/* Dark Mode Background Artwork - Mobile */}
        <div
          className={cn(
            "sm:hidden absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-700 ease-out bg-[position:right_bottom] opacity-90",
            isLightMode ? "hidden" : "block"
          )}
          style={{
            backgroundImage: `url('/images/footer/footer-dark-mobile.webp?v=1')`,
          }}
        />
        {/* Dark Mode Background Artwork - Desktop/Tablet */}
        <div
          className={cn(
            "hidden sm:block absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-700 ease-out bg-[position:center_top]",
            isLightMode ? "opacity-0" : "opacity-100"
          )}
          style={{
            backgroundImage: `url('/images/footer/footer-dark-ultra.webp?v=1')`,
          }}
        />

        {/* Light Mode Background Artwork - Mobile */}
        <div
          className={cn(
            "sm:hidden absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-700 ease-out bg-[position:right_bottom] opacity-90",
            isLightMode ? "block" : "hidden"
          )}
          style={{
            backgroundImage: `url('/images/footer/footer-light-mobile.webp?v=1')`,
          }}
        />
        {/* Light Mode Background Artwork - Desktop/Tablet */}
        <div
          className={cn(
            "hidden sm:block absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-700 ease-out bg-[position:center_top]",
            isLightMode ? "opacity-100" : "opacity-0"
          )}
          style={{
            backgroundImage: `url('/images/footer/footer-light-ultra.webp?v=7')`,
          }}
        />

        {/* ── Soft Top Atmospheric Sky Gradient ── */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-6 sm:h-12 pointer-events-none transition-opacity duration-700",
            isLightMode
              ? "bg-gradient-to-b from-[#FAFAFA] to-transparent opacity-40"
              : "bg-gradient-to-b from-[#050505] to-transparent opacity-40"
          )}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          LAYER 1: MAIN FOOTER CONTENT & NAVIGATION GRID (RESPONSIVE & COMPACT)
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-6 pb-4 sm:pb-8 border-b border-black/10 dark:border-white/10">
          
          {/* ── Column 1: Monogram Logo & Brand Tagline (Span 3 - Above Rover) ── */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              {/* Monogram / Logo */}
              <a
                href="#home"
                className="inline-flex items-center gap-2 mb-2 sm:mb-3 group focus:outline-none"
                aria-label="Back to top"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-mono font-black text-base sm:text-xl border transition-all duration-300 shadow-md bg-white dark:bg-[#0c0c14] border-slate-300 dark:border-white/15 text-[#171A1F] dark:text-white group-hover:border-[#8B5CF6]/50 group-hover:scale-105">
                  D
                </div>
              </a>

              <h3 className="text-[13.5px] sm:text-base md:text-lg font-bold tracking-tight font-display mb-1 leading-snug text-[#0F172A] dark:text-[#F1F5F9]">
                Building intelligent systems<br />that solve real problems.
              </h3>
              <p className="text-[11.5px] sm:text-[13px] leading-relaxed max-w-xs text-[#334155] dark:text-[#94A3B8] font-sans font-medium">
                From LLM orchestration and RAG pipelines to production APIs and full-stack products.
              </p>
            </div>
          </div>

          {/* ── Column 2 & 3: Navigation + Resources (2-Columns on Mobile & Tablet, 4 cols on Desktop) ── */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-6">
            {/* Navigation Links */}
            <div>
              <h4 className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-2 sm:mb-3 text-[#0F172A] dark:text-[#A1A1AA]">
                Navigation
              </h4>
              <ul className="space-y-1 sm:space-y-1.5">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[11.5px] sm:text-[13px] font-sans font-medium transition-colors text-[#1E293B] dark:text-[#CBD5E1] hover:text-[#000000] dark:hover:text-white py-0.5"
                    >
                      <span className="font-mono text-[9.5px] sm:text-[10px] text-[#475569] dark:text-[#71717A] group-hover:text-[#8B5CF6] transition-colors font-semibold">
                        {link.num}
                      </span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-2 sm:mb-3 text-[#0F172A] dark:text-[#A1A1AA]">
                Resources
              </h4>
              <ul className="space-y-1 sm:space-y-1.5">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer noopener" : undefined}
                      className="text-[11.5px] sm:text-[13px] font-sans font-medium transition-colors inline-block text-[#1E293B] dark:text-[#CBD5E1] hover:text-[#000000] dark:hover:text-white py-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Column 4: Let's Connect (Span 3 - Left of Rocket) ── */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-1.5 sm:mb-2 text-[#0F172A] dark:text-[#A1A1AA]">
                Let&apos;s Connect
              </h4>
              <p className="text-[11.5px] sm:text-[13px] leading-relaxed mb-2 text-[#334155] dark:text-[#94A3B8] font-sans font-medium">
                Have a project in mind or want to collaborate? Reach out anytime.
              </p>

              {/* Email Form */}
              <form onSubmit={handleSubscribe} className="relative mb-2.5 w-full max-w-full sm:max-w-xs">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className={cn(
                    "w-full h-8.5 sm:h-9 px-3 pr-8 sm:pr-9 rounded-lg sm:rounded-xl text-[11.5px] sm:text-xs font-sans outline-none transition-all duration-200 border shadow-sm font-medium",
                    "bg-white/95 dark:bg-white/[0.05] backdrop-blur-md",
                    "border-slate-300 dark:border-white/10",
                    "text-[#0F172A] dark:text-white placeholder:text-[#64748B] dark:placeholder:text-[#71717A]",
                    "focus:border-[#8B5CF6] dark:focus:border-[#A78BFA]/50 focus:ring-2 focus:ring-[#8B5CF6]/20"
                  )}
                  required
                />
                <button
                  type="submit"
                  aria-label="Submit email"
                  className="absolute right-1 top-1 bottom-1 w-6.5 sm:w-7 flex items-center justify-center rounded-md sm:rounded-lg bg-black/[0.06] dark:bg-white/[0.08] hover:bg-[#8B5CF6] hover:text-white dark:hover:bg-[#8B5CF6] text-[#1E293B] dark:text-gray-300 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              {submitted && (
                <p className="text-[10.5px] sm:text-[11px] font-mono text-emerald-600 dark:text-emerald-400 -mt-1 mb-1.5 font-bold">
                  ✓ Thank you! I&apos;ll be in touch.
                </p>
              )}

              {/* Social Icons Bar */}
              <div>
                <span className="block text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-1 text-[#0F172A] dark:text-[#A1A1AA]">
                  Socials
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {[
                    { icon: GithubIcon, href: SOCIALS.github, label: "GitHub" },
                    { icon: LinkedinIcon, href: SOCIALS.linkedin, label: "LinkedIn" },
                    { icon: TwitterIcon, href: "https://x.com", label: "X / Twitter" },
                    { icon: MailIcon, href: `mailto:${EMAIL}`, label: "Email" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      aria-label={s.label}
                      className={cn(
                        "w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center border transition-all duration-200 shadow-sm",
                        "bg-white/95 dark:bg-white/[0.04] backdrop-blur-md",
                        "border-slate-300 dark:border-white/10",
                        "text-[#0F172A] dark:text-[#CBD5E1]",
                        "hover:scale-105 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6] dark:hover:text-white"
                      )}
                    >
                      <s.icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Column 5: Rocket Space (Span 2) ── Dedicated unobstructed space for the standing rocket illustration */}
          <div className="hidden lg:block lg:col-span-2 pointer-events-none" aria-hidden="true" />
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 2: FOOTER BOTTOM BAR (COPYRIGHT + VERCEL + BACK TO TOP)
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="pt-3 sm:pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-xs font-sans">
          {/* Copyright */}
          <p className="font-mono text-[10px] sm:text-[11px] text-[#475569] dark:text-[#71717A] font-semibold text-center sm:text-left">
            © {new Date().getFullYear()} Dheesh Medekar. All rights reserved.
          </p>

          {/* Vercel Badge & Back to Top Button */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <span className="text-[10px] sm:text-[11px] font-mono text-[#475569] dark:text-[#71717A] flex items-center gap-1.5">
              <span>Built with passion</span>
              <span>•</span>
              <span>Deployed with <strong className="font-bold text-[#0F172A] dark:text-white">Vercel</strong></span>
            </span>

            {/* Back to top arrow button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer",
                "bg-white/95 dark:bg-white/[0.06] backdrop-blur-md shadow-sm",
                "border-slate-300 dark:border-white/15",
                "text-[#0F172A] dark:text-white",
                "hover:scale-110 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/15"
              )}
            >
              <ArrowUp className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
