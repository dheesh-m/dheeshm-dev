"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";

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
  const { isLightMode } = useTheme();

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "relative z-10 flex items-center justify-center px-3.5 py-1.5 rounded-full text-[13px] font-sans transition-colors duration-200 ease-out whitespace-nowrap outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40",
        isLightMode
          ? isActive
            ? "text-[#000000] font-semibold"
            : cn(
                "text-[#000000] font-medium",
                isScrolled
                  ? "hover:text-[#000000] hover:bg-white/40"
                  : "hover:text-[#000000] hover:bg-white/25"
              )
          : isActive
            ? "text-[#ffffff] font-semibold"
            : cn(
                "text-[#f4f4f5] font-medium",
                isScrolled
                  ? "hover:text-[#ffffff] hover:bg-white/10"
                  : "hover:text-[#ffffff] hover:bg-white/15"
              )
      )}
    >
      {title}
    </a>
  );
}
