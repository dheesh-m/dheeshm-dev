"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";
import { NAV_ITEMS, SECTION_IDS } from "./navItems";
import { useTheme } from "@/components/providers/ThemeProvider";

const MOBILE_MENU_ID = "primary-mobile-menu";

export default function Navbar() {
  const { isLightMode } = useTheme();
  const [active, setActive] = useState("HOME");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const activeRef = useRef("HOME");
  activeRef.current = active;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const next = window.scrollY > 16;
        if (isScrolledRef.current !== next) {
          isScrolledRef.current = next;
          setIsScrolled(next);
        }
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const ratios = new Map<string, number>();
    const labelById = new Map(
      NAV_ITEMS.map((item) => [item.href.slice(1), item.label])
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        }

        let bestId = "";
        let bestRatio = 0;
        for (const id of SECTION_IDS) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        const label = labelById.get(bestId);
        if (label && activeRef.current !== label) {
          activeRef.current = label;
          setActive(label);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((label: string, href?: string) => {
    setActive(label);
    setMobileOpen(false);
    if (href && href.startsWith("#")) {
      const targetId = href.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(el, { offset: -70 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <header className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center px-4 sm:px-8 pointer-events-none">
        <motion.div
          layout
          initial={false}
          animate={{
            maxWidth: isScrolled ? "980px" : "1200px",
            paddingLeft: isScrolled ? "18px" : "24px",
            paddingRight: isScrolled ? "18px" : "24px",
            paddingTop: isScrolled ? "8px" : "10px",
            paddingBottom: isScrolled ? "8px" : "10px",
          }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn(
            "relative flex w-full items-center justify-between pointer-events-auto rounded-full transition-[background-color,border-color,box-shadow] duration-250 ease-out",
            isScrolled
              ? isLightMode
                ? "bg-white/40 backdrop-blur-2xl backdrop-saturate-[190%] border border-white/50 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12),0_2px_10px_rgba(0,0,0,0.04)]"
                : "bg-[#0f0f16]/65 backdrop-blur-2xl backdrop-saturate-[190%] border border-white/15 shadow-[0_20px_48px_-8px_rgba(0,0,0,0.6)]"
              : "bg-transparent border border-transparent shadow-none"
          )}
        >
          {/* ── 1. Left: Brand / Logo ────────────────────────────────────────── */}
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("HOME", "#home");
              }}
              className="flex items-center group outline-none select-none"
            >
              {/* Brand Name */}
              <span
                className={cn(
                  "brand-logo font-display text-base sm:text-lg font-bold tracking-tight transition-colors duration-200",
                  isLightMode ? "text-[#000000]" : "text-[#ffffff]"
                )}
              >
                dhees_h
              </span>
            </a>
          </div>

          {/* ── 2. Center: Compact Navigation Pill ──────────────────────────── */}
          <nav
            aria-label="Primary"
            className={cn(
              "hidden md:flex items-center rounded-full transition-[background-color,border-color,box-shadow,padding,gap] duration-250 ease-out",
              isScrolled
                ? isLightMode
                  ? "bg-white/35 backdrop-blur-xl backdrop-saturate-[180%] border border-white/45 px-1.5 py-1 shadow-inner gap-0.5"
                  : "bg-white/10 backdrop-blur-xl backdrop-saturate-[180%] border border-white/15 px-1.5 py-1 shadow-inner gap-0.5"
                : isLightMode
                  ? "bg-white/15 backdrop-blur-2xl backdrop-saturate-[180%] border border-white/35 px-2 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] gap-1"
                  : "bg-white/10 backdrop-blur-2xl backdrop-saturate-[180%] border border-white/20 px-2 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.3)] gap-1"
            )}
          >
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                label={item.label}
                title={item.title}
                href={item.href}
                isActive={active === item.label}
                onClick={() => handleNavClick(item.label, item.href)}
                isScrolled={isScrolled}
              />
            ))}
          </nav>

          {/* ── 3. Right: CTA & Controls ────────────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* iOS 26 Glass CTA Pill */}
            <a
              href="#contact"
              className={cn(
                "navbar-cta-resume hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[13px] font-sans font-medium transition-[color,background-color,border-color,box-shadow] duration-200 ease-out whitespace-nowrap outline-none",
                isLightMode
                  ? isScrolled
                    ? "bg-white/75 text-[#000000] border border-white/50 shadow-sm hover:bg-white hover:shadow"
                    : "bg-white/30 backdrop-blur-xl text-[#000000] border border-white/35 shadow-sm hover:bg-white/40"
                  : isScrolled
                    ? "bg-white/15 text-[#ffffff] border border-white/20 shadow-sm hover:bg-white/25 hover:shadow"
                    : "bg-white/10 backdrop-blur-xl text-[#ffffff] border border-white/20 shadow-sm hover:bg-white/20"
              )}
            >
              Resume
            </a>

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className={cn(
                "flex h-9 w-9 flex-col items-center justify-center md:hidden rounded-full border transition-[color,background-color,border-color] duration-200 ease-out",
                isLightMode
                  ? isScrolled
                    ? "bg-white/40 border-white/40 text-[#000000]"
                    : "bg-white/20 backdrop-blur-md border-white/30 text-[#000000]"
                  : isScrolled
                    ? "bg-white/10 border-white/20 text-[#ffffff]"
                    : "bg-white/10 backdrop-blur-md border-white/20 text-[#ffffff]"
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_MENU_ID}
            >
              <span
                className={cn(
                  "block h-[1.5px] w-4.5 rounded-full transition-transform duration-300",
                  isLightMode ? "bg-[#000000]" : "bg-[#ffffff]",
                  mobileOpen ? "translate-y-1 rotate-45" : "-translate-y-1"
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-4.5 rounded-full transition-opacity duration-300",
                  isLightMode ? "bg-[#000000]" : "bg-[#ffffff]",
                  mobileOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-4.5 rounded-full transition-transform duration-300",
                  isLightMode ? "bg-[#000000]" : "bg-[#ffffff]",
                  mobileOpen ? "-translate-y-px -rotate-45" : "translate-y-1"
                )}
              />
            </button>
          </div>
        </motion.div>
      </header>

      <MobileMenu
        id={MOBILE_MENU_ID}
        isOpen={mobileOpen}
        onClose={closeMobile}
        activeItem={active}
        onNavigate={handleNavClick}
      />
    </>
  );
}
