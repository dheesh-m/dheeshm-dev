"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "01", label: "HOME", href: "#home" },
  { id: "02", label: "ABOUT", href: "#about" },
  { id: "03", label: "EXPERTISE", href: "#enterprise" },
  { id: "04", label: "PROJECTS", href: "#projects" },
  { id: "05", label: "SKILLS", href: "#skills" },
  { id: "06", label: "EXPERIENCE", href: "#experience" },
  { id: "07", label: "CONTACT", href: "#contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
}

export default function MobileMenu({ isOpen, onClose, activeItem }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-[#030712]/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center"
        >
          <nav className="flex flex-col items-start gap-6 w-full max-w-[280px]">
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                  onClose();
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative flex items-center gap-4 w-full"
              >
                <span className={cn(
                  "text-sm font-mono transition-colors",
                  activeItem === item.label ? "text-white" : "text-gray-500 group-hover:text-white"
                )}>
                  {item.id}
                </span>
                <span className={cn(
                  "text-2xl font-mono tracking-widest transition-colors",
                  activeItem === item.label ? "text-white font-bold" : "text-gray-400 group-hover:text-white"
                )}>
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
