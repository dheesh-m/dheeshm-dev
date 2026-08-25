"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import NavbarGlow from "./NavbarGlow";
import NavItem from "./NavItem";

const NAV_ITEMS = [
  { id: "01", label: "HOME", href: "#home" },
  { id: "02", label: "ABOUT", href: "#about" },
  { id: "03", label: "EXPERTISE", href: "#enterprise" },
  { id: "04", label: "PROJECTS", href: "#projects" },
  { id: "05", label: "SKILLS", href: "#skills" },
  { id: "06", label: "EXPERIENCE", href: "#experience" },
  { id: "07", label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("HOME");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Highly optimized scroll listener that only updates state when crossing the threshold.
  // Zero continuous React re-renders while scrolling.
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", ...NAV_ITEMS.map((item) => item.href.replace("#", ""))];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "home") setActive("HOME");
            else {
              const label = NAV_ITEMS.find((item) => item.href === `#${id}`)?.label;
              if (label) setActive(label);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (label: string, href: string) => {
    setActive(label);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center px-4 md:px-8 pointer-events-none">
        <div
          className={cn(
            "relative flex items-center justify-between overflow-hidden rounded-[20px] border pointer-events-auto",
            "transition-all duration-[700ms] ease-in-out group",
            isScrolled 
              ? "h-[54px] w-full max-w-[950px] px-5 md:px-8 bg-[rgba(14,15,17,0.85)] md:bg-transparent border-white/20 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/[0.05] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:border-white/30" 
              : "h-[60px] md:h-[68px] w-full max-w-[1400px] px-5 md:px-7 bg-[rgba(14,15,17,0.7)] md:bg-transparent border-[rgba(255,255,255,0.1)] md:border-transparent backdrop-blur-xl md:backdrop-blur-md"
          )}
        >
          {/* We only render NavbarGlow in the un-scrolled state to keep compact state clean */}
          <div className={cn("transition-opacity duration-500", isScrolled ? "opacity-0" : "opacity-100")}>
            <NavbarGlow />
          </div>
          
          {/* Logo - Collapses via CSS when scrolled */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("HOME", "#home"); }}
            className={cn(
              "relative z-10 flex items-center overflow-hidden whitespace-nowrap",
              "transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              isScrolled ? "max-w-[120px] opacity-100 mr-auto md:max-w-0 md:opacity-0 md:mr-0" : "max-w-[120px] opacity-100 mr-auto md:mr-8"
            )}
          >
            <span className="text-xl md:text-2xl font-mono text-white font-bold tracking-tight">
              DM<span className="text-zinc-400">._</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav 
            className={cn(
              "relative z-10 hidden lg:flex items-center transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              isScrolled ? "gap-4 xl:gap-6 mx-auto" : "gap-6 xl:gap-8"
            )}
          >
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                label={item.label}
                href={item.href}
                isActive={active === item.label}
                onClick={() => handleNavClick(item.label, item.href)}
                isScrolled={isScrolled}
              />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 lg:hidden flex flex-col justify-center items-center w-10 h-10 group"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-[#F5F5F5] transition-transform duration-300 ${mobileOpen ? "translate-y-1 rotate-45" : "-translate-y-1 group-hover:w-6 group-hover:bg-white"}`} />
            <span className={`block w-5 h-px bg-[#F5F5F5] transition-opacity duration-300 absolute ${mobileOpen ? "opacity-0" : "opacity-100 group-hover:w-6 group-hover:bg-white"}`} />
            <span className={`block w-5 h-px bg-[#F5F5F5] transition-transform duration-300 ${mobileOpen ? "-translate-y-px -rotate-45" : "translate-y-1 group-hover:w-6 group-hover:bg-white"}`} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} activeItem={active} />
    </>
  );
}
