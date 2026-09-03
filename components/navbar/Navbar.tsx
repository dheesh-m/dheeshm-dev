"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { NAV_ITEMS } from "./navItems";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SITE_URL } from "@/lib/siteUrl";

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

  // ── Step 1 & 2: Derive Brand Wordmark from Domain ────────────────────────────
  const domainParts = useMemo(() => {
    try {
      const host = new URL(SITE_URL).hostname.replace(/^www\./, "");
      if (host && host !== "localhost" && host.includes(".")) {
        const idx = host.lastIndexOf(".");
        return {
          stem: host.slice(0, idx),
          tld: host.slice(idx),
        };
      }
    } catch {}
    return { stem: "dhees", tld: "_h" };
  }, []);

  // ── Step 3: Two Scroll States (past ~32px contracts into floating glass pill) ──
  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 32;
      setScrolled((prev) => (prev === next ? prev : next));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Sync with Lenis smooth scroll if present
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

  // ── Step 5: Sliding Hover Pill (Manual Measurement into Map) ─────────────────
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [pillStyle, setPillStyle] = useState<{
    x: number;
    width: number;
    opacity: number;
  }>({ x: 0, width: 0, opacity: 0 });
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const updatePillPosition = useCallback(
    (targetKey: string | null) => {
      if (!targetKey) {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const el = linkRefs.current.get(targetKey);
      if (!el || !navRef.current) {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const navRect = navRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const x = elRect.left - navRect.left;
      const width = elRect.width;

      setPillStyle({
        x,
        width,
        opacity: 1,
      });
    },
    []
  );

  // Update whenever hovered item or activeSection changes
  useEffect(() => {
    const keyToHighlight = hoveredKey || activeSection;
    updatePillPosition(keyToHighlight);
  }, [hoveredKey, activeSection, updatePillPosition]);

  // Re-measure on nav container resize (font load, viewport resize)
  useEffect(() => {
    if (!navRef.current) return;
    const ro = new ResizeObserver(() => {
      const keyToHighlight = hoveredKey || activeSection;
      updatePillPosition(keyToHighlight);
    });
    ro.observe(navRef.current);
    return () => ro.disconnect();
  }, [hoveredKey, activeSection, updatePillPosition]);

  // Event delegation on <nav> for pointerover and pointerleave (with touch guard)
  const handlePointerOver = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    const target = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-nav-key]");
    if (target) {
      const key = target.dataset.navKey;
      if (key) setHoveredKey(key);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    setHoveredKey(null);
  };

  const handleItemClick = (key: string) => {
    setMobileOpen(false);
    onSelectSection?.(key);
  };

  return (
    <>
      {/* 
        ════════════════════════════════════════════════════════════════════════
        STEP 2 & 3: FIXED TRANSPARENT HEADER FRAME
        - Header padding transitions on scroll to inset the pill from viewport edges
        - Shell retains auto margins and stays perfectly centered
        ════════════════════════════════════════════════════════════════════════
      */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] flex justify-center w-full pointer-events-none transition-[padding] duration-[320ms] ease-out",
          scrolled
            ? "pt-3 px-3 sm:px-4 lg:px-8"
            : "pt-5 sm:pt-6 px-4 sm:px-6 lg:px-12"
        )}
      >
        {/* 
          ══════════════════════════════════════════════════════════════════════
          STEP 2, 3 & 4: LIQUID GLASS SHELL
          - At scrollY 0: max-w-7xl, square corners, fully transparent
          - Past ~32px: contracts into max-w-5xl, rounded-full, 3-layer glass recipe
          ══════════════════════════════════════════════════════════════════════
        */}
        <div
          className={cn(
            "liquid-glass-shell w-full flex items-center justify-between pointer-events-auto relative",
            scrolled
              ? "scrolled max-w-5xl rounded-full py-1.5 sm:py-2 px-3 sm:px-5"
              : "resting max-w-7xl rounded-none py-1 sm:py-1.5 px-0",
            isLightMode ? "light-theme" : "dark-theme"
          )}
        >
          {/* ── 1. Brand (Left): Wordmark Split at TLD ── */}
          <button
            onClick={() => handleItemClick("home")}
            className="group flex items-center gap-0.5 outline-none select-none cursor-pointer z-10 shrink-0 py-1"
            aria-label="Dheesh Medekar - Portfolio Home"
          >
            <span
              className={cn(
                "font-mono font-bold text-lg sm:text-xl tracking-tight transition-colors duration-200",
                isLightMode ? "text-[#111111]" : "text-white"
              )}
            >
              {domainParts.stem}
            </span>
            <span className="font-mono font-bold text-lg sm:text-xl tracking-tight text-[#E50909]">
              {domainParts.tld}
            </span>
          </button>

          {/* ── 2. Nav Links (Centered): Nested Tray & Sliding Pill ── */}
          <div
            className={cn(
              "hidden md:flex items-center",
              // Step 6: Absolutely centered at second-largest breakpoint (xl: >= 1280px);
              // at md/lg drops pin and uses margin-inline: auto so it never collides with actions
              "xl:absolute xl:left-1/2 xl:-translate-x-1/2 mx-auto xl:mx-0"
            )}
          >
            <nav
              ref={navRef}
              onPointerOver={handlePointerOver}
              onPointerLeave={handlePointerLeave}
              aria-label="Primary navigation"
              className={cn(
                "liquid-glass-tray relative flex items-center gap-1 p-1 sm:p-1.5 rounded-full select-none",
                isLightMode ? "light-theme" : "dark-theme"
              )}
            >
              {/* Step 5: Sliding Hover Pill (Always mounted raised chip) */}
              <div
                className={cn(
                  "liquid-glass-hover-pill",
                  isLightMode ? "light-theme" : "dark-theme"
                )}
                style={{
                  transform: `translate3d(${pillStyle.x}px, 0, 0)`,
                  width: `${pillStyle.width}px`,
                  opacity: pillStyle.opacity,
                }}
                aria-hidden="true"
              />

              {/* Nav Items */}
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    data-nav-key={item.key}
                    ref={(el) => {
                      if (el) linkRefs.current.set(item.key, el);
                      else linkRefs.current.delete(item.key);
                    }}
                    onClick={() => handleItemClick(item.key)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative z-10 flex items-center gap-1.5 rounded-full px-3 sm:px-3.5 py-1 sm:py-1.5 text-xs font-mono font-medium transition-colors duration-200 outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-red-500/50",
                      isActive
                        ? isLightMode
                          ? "text-[#111111] font-bold"
                          : "text-white font-bold"
                        : isLightMode
                        ? "text-[#475467] hover:text-[#111111]"
                        : "text-[#94A3B8] hover:text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[10px] font-bold transition-colors duration-200",
                        isActive
                          ? "text-[#E50909]"
                          : isLightMode
                          ? "text-[#667085]"
                          : "text-[#64748B]"
                      )}
                    >
                      {item.id}
                    </span>
                    <span>{item.label}</span>
                    {isActive && isLightMode && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E50909] ml-0.5" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ── 3. Actions (Right): Theme Toggle & Mobile Menu Trigger ── */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0 z-10">
            <ThemeToggle />
          </div>

          {/* Mobile Actions: Theme Toggle + Animated Hamburger Button */}
          <div className="flex md:hidden items-center gap-2 ml-auto z-10">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className={cn(
                "flex h-9 w-9 flex-col items-center justify-center rounded-full transition-all duration-300 cursor-pointer border",
                scrolled
                  ? isLightMode
                    ? "border-black/15 bg-white/90 text-[#111111] shadow-sm"
                    : "border-white/20 bg-[#090C17]/85 text-white shadow-md"
                  : isLightMode
                  ? "border-black/[0.08] bg-white/50 text-[#111111]"
                  : "border-white/10 bg-white/[0.04] text-white"
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

      {/* ── Mobile Drawer Navigation (Reused from existing system) ── */}
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
