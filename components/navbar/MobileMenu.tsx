"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./navItems";

interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onNavigate: (label: string) => void;
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

  // Escape to close, focus trapped inside the panel, and the page behind it
  // locked so it cannot scroll under the overlay.
  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    body.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
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
          className="fixed inset-0 z-[90] bg-[#050505]/95 backdrop-blur-xl lg:hidden flex flex-col justify-center items-center"
        >
          <nav
            aria-label="Mobile"
            className="flex flex-col items-start gap-6 w-full max-w-[280px]"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                aria-current={activeItem === item.label ? "true" : undefined}
                onClick={() => onNavigate(item.label)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative flex items-center gap-4 w-full rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#030712]"
              >
                <span
                  className={cn(
                    "text-sm font-sans font-medium transition-colors",
                    activeItem === item.label
                      ? "text-white"
                      : "text-gray-500 group-hover:text-white"
                  )}
                >
                  {item.id}
                </span>
                <span
                  className={cn(
                    "text-2xl font-display font-bold tracking-tight transition-colors",
                    activeItem === item.label
                      ? "text-white font-bold"
                      : "text-gray-400 group-hover:text-white"
                  )}
                >
                  {"// " + item.label}
                </span>

                {activeItem === item.label && (
                  <motion.div
                    layoutId="mobile-active"
                    className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
