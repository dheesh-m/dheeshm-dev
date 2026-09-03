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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (key: string) => {
    setMobileOpen(false);
    onSelectSection?.(key);
  };

  return (
    <>
      <header 
        className={cn(
          "fixed left-0 right-0 z-[100] flex justify-center px-4 sm:px-6 lg:px-12 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled ? "top-3 sm:top-4" : "top-6 sm:top-8"
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
              "font-black text-2xl tracking-tighter group-hover:scale-105 transition-transform duration-200",
              isLightMode ? "text-[#E50909]" : "text-white"
            )}>
              DM
            </span>
          </button>

          {/* ── 2. Navigation Container (Always Center-Aligned) ── */}
          <div className="hidden md:flex items-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <nav
              aria-label="Primary"
              className={cn(
                "flex items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "backdrop-blur-2xl border shadow-[0_4px_24px_rgba(0,0,0,0.04)]",
                isLightMode 
                  ? "bg-white/95 border-black/10 text-[#111111]" 
                  : "bg-[#090C17]/80 border-white/15 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
                isScrolled 
                  ? "gap-1 p-1.5" 
                  : "gap-1.5 p-1.5 sm:p-2"
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
                      "relative z-10 flex items-center gap-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 outline-none select-none cursor-pointer",
                      isScrolled ? "px-3 py-1.5" : "px-3.5 sm:px-4 py-1.5 sm:py-2",
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
                "flex h-9 w-9 flex-col items-center justify-center rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm border",
                isLightMode 
                  ? "border-black/15 bg-white text-[#111111] hover:bg-black/5" 
                  : "border-white/15 bg-white/[0.06] text-white hover:bg-white/10"
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
