"use client";

import { cn } from "@/lib/utils";

interface NavItemProps {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
  isScrolled?: boolean;
}

export default function NavItem({
  id,
  label,
  href,
  isActive,
  onClick,
  isScrolled,
}: NavItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "relative flex flex-col items-center justify-center group rounded-full",
        "outline-none focus-visible:ring-2 focus-visible:ring-white/60",
        "transition-[padding] duration-[400ms] ease-out",
        isScrolled ? "py-1.5 px-3" : "py-2 px-3.5"
      )}
    >
      <span
        className={cn(
          "text-[10px] md:text-[11px] font-sans font-medium mb-0.5 transition-colors duration-300 whitespace-nowrap",
          isActive ? "text-white font-semibold" : "text-zinc-500 group-hover:text-white"
        )}
      >
        {id}
      </span>

      <span
        className={cn(
          "text-[12.5px] md:text-[14px] font-display font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap",
          isActive
            ? "text-[#F5F5F5] font-bold"
            : "text-zinc-400 group-hover:text-[#F5F5F5]"
        )}
      >
        {"// " + label}
      </span>

      {/* Underline indicator */}
      <span
        aria-hidden="true"
        className={cn(
          "nav-active-indicator absolute -bottom-1 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-white origin-center transition-all duration-300",
          isActive
            ? "scale-x-100 opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.7)]"
            : "scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-40"
        )}
      />
    </a>
  );
}
