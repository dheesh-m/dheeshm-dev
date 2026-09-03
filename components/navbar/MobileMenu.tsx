"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./navItems";
import { useTheme } from "@/components/providers/ThemeProvider";

interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onNavigate: (label: string, href?: string) => void;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

export default function MobileMenu({
  id,
  isOpen,
  onClose,
  activeItem,
  onNavigate,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { isLightMode } = useTheme();

  // Escape key & focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    // Auto focus first link
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          id={id}
          ref={panelRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed inset-0 z-[90] backdrop-blur-xl md:hidden flex flex-col justify-center items-center",
            isLightMode ? "bg-[#f7f6fb]/95" : "bg-[#050505]/95"
          )}
        >
          <nav
            aria-label="Mobile"
            className="flex flex-col items-start gap-6 w-full max-w-[280px]"
          >
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeItem === item.key;
              return (
                <motion.button
                  key={item.key}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => {
                    onNavigate(item.key);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group relative flex items-center gap-4 w-full text-left outline-none cursor-pointer"
                >
                  <span
                    className={cn(
                      "text-xs font-mono font-medium transition-colors",
                      isActive
                        ? "text-[#EF4444] font-bold"
                        : "text-[#64748B] group-hover:text-white"
                    )}
                  >
                    {item.id}
                  </span>
                  <span
                    className={cn(
                      "text-xl font-sans font-bold tracking-tight transition-colors",
                      isActive
                        ? "text-white font-bold"
                        : "text-[#94A3B8] group-hover:text-white"
                    )}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="mobile-active"
                      className="absolute -left-5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444]"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
