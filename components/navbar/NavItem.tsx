"use client";

import { cn } from "@/lib/utils";

interface NavItemProps {
  id: string;
  label: string;
  title: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
  isScrolled?: boolean;
}

export default function NavItem({
  title,
  href,
  isActive,
  onClick,
  isScrolled,
}: NavItemProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "relative flex items-center justify-center px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 whitespace-nowrap outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-purple-400/60",
        isActive
          ? isScrolled
            ? "text-blue-600 dark:text-purple-300 font-semibold bg-white/60 dark:bg-white/15 shadow-sm"
            : "text-white font-semibold bg-white/20 shadow-sm"
          : isScrolled
          ? "text-[#1e293b] dark:text-zinc-300 hover:text-blue-600 dark:hover:text-purple-300 hover:bg-white/50 dark:hover:bg-white/15 hover:shadow-sm"
          : "text-white/85 hover:text-white hover:bg-white/20 hover:shadow-sm"
      )}
    >
      {title}
    </a>
  );
}
