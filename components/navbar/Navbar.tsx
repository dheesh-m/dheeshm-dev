"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import NavbarGlow from "./NavbarGlow";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";
import { NAV_ITEMS, SECTION_IDS } from "./navItems";

const MOBILE_MENU_ID = "primary-mobile-menu";

// A spring reads as settling rather than sliding to a stop, which is what the
// old fixed-duration CSS ease on max-width/height felt mechanical doing.
const BAR_SPRING = {
  type: "spring",
  stiffness: 320,
  damping: 34,
  mass: 0.9,
} as const;

export default function Navbar() {
  const [active, setActive] = useState("HOME");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Only flips state when crossing the threshold, so scrolling causes no
  // continuous re-renders.
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 60);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy. Ratios persist across callbacks because IntersectionObserver
  // only reports the entries that changed, so the winner has to be chosen
  // against the full picture rather than whatever fired last.
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
          // Strict `>` keeps the earlier (topmost) section on a tie.
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        const label = labelById.get(bestId);
        if (label) setActive(label);
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Anchors navigate natively, so this is only optimistic feedback ahead of
  // the observer catching up.
  const handleNavClick = useCallback((label: string) => {
    setActive(label);
    setMobileOpen(false);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <header className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center px-4 md:px-8 pointer-events-none">
        <motion.div
          // The pill hugs its own content on desktop (`lg:w-auto`) instead of
          // being pinned to a max-width. A fixed max-width could not shrink
          // below the nav's min-content, so the bar overflowed and left a dead
          // gap at wide sizes. Height/padding/gap animate on a spring; the
          // background cross-fades in CSS.
          initial={false}
          animate={{
            height: isScrolled ? 56 : 66,
            paddingLeft: isScrolled ? 22 : 30,
            paddingRight: isScrolled ? 22 : 30,
          }}
          transition={BAR_SPRING}
          className={cn(
            "ios-glass-nav relative flex w-full max-w-full lg:w-auto items-center justify-between lg:justify-start gap-6 lg:gap-10",
            "overflow-hidden rounded-full border pointer-events-auto",
            "backdrop-blur-3xl backdrop-saturate-[190%]",
            "transition-[background-color,border-color,box-shadow] duration-500 ease-out",
            isScrolled
              ? "bg-[rgba(16,16,20,0.85)] border-white/20 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.65)]"
              : "bg-[rgba(16,16,20,0.65)] border-white/10 shadow-[0_8px_32px_-6px_rgba(0,0,0,0.4)]"
          )}
        >
          <NavbarGlow />

          <div className="relative z-10 flex items-center">
            <a
              href="#home"
              onClick={() => handleNavClick("HOME")}
              className="flex items-center whitespace-nowrap rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <motion.span
                initial={false}
                animate={{ scale: isScrolled ? 0.88 : 1 }}
                transition={BAR_SPRING}
                className="origin-left font-display text-xl font-bold tracking-tight text-white md:text-2xl"
              >
                DM<span className="text-zinc-400">._</span>
              </motion.span>
            </a>
          </div>

          {/* Desktop nav */}
          <motion.nav
            aria-label="Primary"
            initial={false}
            animate={{ gap: isScrolled ? 16 : 26 }}
            transition={BAR_SPRING}
            className="relative z-10 hidden items-center lg:flex"
          >
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                label={item.label}
                href={item.href}
                isActive={active === item.label}
                onClick={() => handleNavClick(item.label)}
                isScrolled={isScrolled}
              />
            ))}
          </motion.nav>

          <div className="relative z-10 flex items-center gap-2 lg:ml-2">
            <ThemeToggle />
            
            {/* Mobile / tablet menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-10 w-10 flex-col items-center justify-center lg:hidden group/burger ml-1"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_MENU_ID}
            >
              <span
                className={cn(
                  "navbar-burger-line block h-[1.5px] w-5 bg-white transition-transform duration-300 rounded-full",
                  mobileOpen
                    ? "translate-y-1 rotate-45"
                    : "-translate-y-1 group-hover/burger:bg-white"
                )}
              />
              <span
                className={cn(
                  "navbar-burger-line absolute block h-[1.5px] w-5 bg-white transition-opacity duration-300 rounded-full",
                  mobileOpen
                    ? "opacity-0"
                    : "opacity-100 group-hover/burger:bg-white"
                )}
              />
              <span
                className={cn(
                  "navbar-burger-line block h-[1.5px] w-5 bg-white transition-transform duration-300 rounded-full",
                  mobileOpen
                    ? "-translate-y-px -rotate-45"
                    : "translate-y-1 group-hover/burger:bg-white"
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
