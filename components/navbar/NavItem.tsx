"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";

interface NavItemProps {
  id: string;
  label: string;
  title: string;
  href: string;
  isActive: boolean;
  isBlobUnder: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isScrolled?: boolean;
}

export default function NavItem({
  label,
  title,
  href,
  isActive,
  isBlobUnder,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isScrolled,
}: NavItemProps) {
  const { isLightMode } = useTheme();

  return (
    <a
      href={href}
      data-label={label}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "relative z-10 flex items-center justify-center px-3.5 py-1.5 rounded-full text-[13px] font-sans transition-colors duration-200 ease-out whitespace-nowrap outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40",
        isLightMode
          ? isBlobUnder
            ? "text-[#FFFFFF] font-semibold"
            : "text-[#0F172A] hover:text-[#000000] font-medium"
          : isBlobUnder
          ? "text-[#09090B] font-semibold"
          : "text-[#D4D4D8] hover:text-[#FFFFFF] font-medium"
      )}
    >
      {title}
    </a>
  );
}
