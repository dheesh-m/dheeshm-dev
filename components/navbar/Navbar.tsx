"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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

  const handleItemClick = (key: string) => {
    setMobileOpen(false);
    onSelectSection?.(key);
  };

  return (
    <>
      <header className="fixed top-4 sm:top-6 left-0 right-0 z-[100] flex justify-center px-4 sm:px-6 lg:px-12 pointer-events-none">
        <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">
          
          {/* ── 1. Left: Monogram Logo (DM) ── */}
          <button
            onClick={() => handleItemClick("home")}
            className="group flex items-center gap-2 outline-none select-none cursor-pointer"
            aria-label="Dheesh Medekar - Back to Home"
          >
            <span className="font-black text-xl sm:text-2xl tracking-tighter text-white group-hover:scale-105 transition-transform duration-200">
              DM
            </span>
          </button>

          {/* ── 2. Center: Floating Dark Glass Navigation Pill ── */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-[#0F111A]/80 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleItemClick(item.key)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative z-10 flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 outline-none select-none cursor-pointer",
                    isActive
                      ? "text-white bg-white/[0.12] border border-white/20 shadow-sm"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04] border border-transparent"
                  )}
                >
                  <span className={cn("text-[10px] font-bold transition-colors", isActive ? "text-[#EF4444]" : "text-[#64748B]")}>
                    {item.id}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ── 3. Right: Theme Toggle + Mobile Menu Trigger ── */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-9 w-9 flex-col items-center justify-center md:hidden rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md text-white transition-all cursor-pointer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_MENU_ID}
            >
              <span
                className={cn(
                  "block h-[1.5px] w-4.5 rounded-full bg-white transition-transform duration-300",
                  mobileOpen ? "translate-y-1 rotate-45" : "-translate-y-1"
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-4.5 rounded-full bg-white transition-opacity duration-300",
                  mobileOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-4.5 rounded-full bg-white transition-transform duration-300",
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
