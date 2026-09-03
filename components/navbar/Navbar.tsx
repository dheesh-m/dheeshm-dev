"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { NAV_ITEMS } from "./navItems";
import { useTheme } from "@/components/providers/ThemeProvider";

const MOBILE_MENU_ID = "primary-mobile-menu";

interface NavbarProps {
  activeSection?: string;
  onSelectSection?: (key: string) => void;
}

export default function Navbar({
  activeSection = "home",
  onSelectSection,
}: NavbarProps) {
  const { isLightMode } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Exact scroll detection: switches between RESTING and SCROLLED state at scrollY > 2
  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 2;
      setScrolled((prev) => {
        if (prev === next) return prev;
        return next;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also sync with Lenis smooth scroll if present
    let lenisUnsub: (() => void) | undefined;
    const checkLenis = () => {
      const lenis = (window as any).__lenis;
      if (lenis && typeof lenis.on === "function") {
        lenis.on("scroll", handleScroll);
        lenisUnsub = () => lenis.off("scroll", handleScroll);
      }
    };
    checkLenis();
    const timer = setTimeout(checkLenis, 150);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      lenisUnsub?.();
    };
  }, []);

  const handleItemClick = (key: string) => {
    setMobileOpen(false);
    onSelectSection?.(key);
  };

  return (
    <>
      {/* 
        Single source of truth for motion: .navbar-motion-root.resting vs .navbar-motion-root.scrolled
        - RESTING: transform: translate3d(0, 10px, 0) scale(0.97), opacity: 0.78
        - SCROLLED: transform: translate3d(0, 0px, 0) scale(1), opacity: 1
      */}
      <header
        className={cn(
          "navbar-motion-root fixed left-0 right-0 top-5 sm:top-6 z-[100] flex justify-center px-4 sm:px-6 lg:px-12 pointer-events-none",
          scrolled ? "scrolled" : "resting"
        )}
      >
        <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto relative">
          
          {/* ── 1. Left: Monogram Logo (DM) ── */}
          <button
            onClick={() => handleItemClick("home")}
            className="group flex items-center gap-2 outline-none select-none cursor-pointer z-10"
            aria-label="Dheesh Medekar - Back to Home"
          >
            <span className={cn(
              "font-mono font-bold text-lg sm:text-xl tracking-tight group-hover:scale-105 transition-transform duration-200",
              isLightMode ? "text-[#E50909]" : "text-white"
            )}>
              dhees_h
            </span>
          </button>

          {/* ── 2. Navigation Container (Depth Elevation Matching Image 1 & Image 2) ── */}
          <div className="hidden md:flex items-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <nav
              aria-label="Primary"
              className={cn(
                "flex items-center gap-1.5 p-1.5 sm:p-2 rounded-full transition-all duration-300 ease-out",
                scrolled
                  ? isLightMode
                    ? "bg-white/90 border border-black/15 shadow-[0_12px_36px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl"
                    : "bg-[#090C17]/85 border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.55),0_2px_8px_rgba(255,255,255,0.05)] backdrop-blur-xl"
                  : isLightMode
                    ? "bg-white/40 border border-black/[0.06] shadow-none backdrop-blur-sm"
                    : "bg-white/[0.04] border border-white/10 shadow-none backdrop-blur-sm",
                isLightMode ? "text-[#111111]" : "text-white"
              )}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleItemClick(item.key)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative z-10 flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-mono font-medium transition-all duration-200 outline-none select-none cursor-pointer",
                      isActive
                        ? isLightMode
                          ? "text-[#E50909] bg-red-500/[0.06] border border-red-500/20 font-bold"
                          : "text-white bg-white/[0.14] border border-white/25 shadow-sm"
                        : isLightMode
                          ? "text-[#343A40] hover:text-[#111111] hover:bg-black/[0.03] border border-transparent"
                          : "text-[#94A3B8] hover:text-white hover:bg-white/[0.06] border border-transparent"
                    )}
                  >
                    <span className={cn(
                      "text-[10px] font-bold transition-colors", 
                      isActive 
                        ? isLightMode ? "text-[#E50909]" : "text-[#950606]" 
                        : isLightMode ? "text-[#667085]" : "text-[#64748B]"
                    )}>
                      {item.id}
                    </span>
                    <span>{item.label}</span>
                    {isActive && isLightMode && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E50909] ml-0.5" />
                    )}
                  </button>
                );
              })}

              {/* Theme Toggle placed right next to Contact inside the pill */}
              <div className={cn(
                "pl-1 pr-0.5 border-l flex items-center",
                isLightMode ? "border-black/10" : "border-white/10"
              )}>
                <ThemeToggle />
              </div>
            </nav>
          </div>

          {/* ── 3. Right: Mobile / Tablet Menu Button ── */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className={cn(
                "flex h-9 w-9 flex-col items-center justify-center rounded-full transition-all duration-300 cursor-pointer border",
                scrolled
                  ? isLightMode
                    ? "border-black/15 bg-white/90 text-[#111111] backdrop-blur-xl shadow-md"
                    : "border-white/20 bg-[#090C17]/85 text-white backdrop-blur-xl shadow-lg"
                  : isLightMode
                    ? "border-black/[0.06] bg-white/40 text-[#111111] backdrop-blur-sm shadow-none"
                    : "border-white/10 bg-white/[0.04] text-white backdrop-blur-sm shadow-none"
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_MENU_ID}
            >
              <span
                className={cn(
                  "block h-[1.5px] w-4.5 rounded-full transition-transform duration-300",
                  isLightMode ? "bg-[#111111]" : "bg-white",
                  mobileOpen ? "translate-y-1 rotate-45" : "-translate-y-1"
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-4.5 rounded-full transition-opacity duration-300",
                  isLightMode ? "bg-[#111111]" : "bg-white",
                  mobileOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-4.5 rounded-full transition-transform duration-300",
                  isLightMode ? "bg-[#111111]" : "bg-white",
                  mobileOpen ? "-translate-y-px -rotate-45" : "translate-y-1"
                )}
              />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile Drawer Navigation ── */}
      <MobileMenu
        id={MOBILE_MENU_ID}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeItem={activeSection}
        onNavigate={(key) => handleItemClick(key)}
      />
    </>
  );
}
