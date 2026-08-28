"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import SectionLabel from "../ui/SectionLabel";
import { cn } from "@/lib/utils";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sideCardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const springConfig = { stiffness: 220, damping: 24, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sideCardRef.current) return;
    const rect = sideCardRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(px);
    mouseY.set(py);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} id="about" className="relative w-full pt-16 sm:pt-24 md:pt-32 pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel number="02" text="ABOUT" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-8 relative">
          {/* Main Statement */}
          <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-8">
            <h2 className="text-[clamp(2.2rem,9vw,5rem)] font-light tracking-[-0.04em] leading-[0.95] font-display text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] via-[#334155] to-[#394E6E] dark:from-[#94A3B8] dark:via-[#F1F5F9] dark:to-[#CBD5E1]">
              I build systems
              <br />
              that connect
              <br />
              intelligence
              <br />
              to software.
            </h2>

            <p className="text-base sm:text-lg text-[#64748B] dark:text-[#94A3B8] max-w-2xl leading-relaxed font-sans mt-2 sm:mt-4">
              My focus is bridging the gap between cutting-edge AI models and reliable, scalable product interfaces. Whether it&apos;s designing a complex multi-agent reasoning loop or polishing a real-time web interface, I approach engineering with a focus on architecture, performance, and user experience.
            </p>
          </div>

          {/* Side Panel (Magic Bento Card) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="relative group/sidecard">
              {/* Ambient Glow */}
              <div
                className={cn(
                  "absolute -inset-2 rounded-[28px] pointer-events-none transition-all duration-700 -z-10",
                  isHovered ? "opacity-100 scale-105" : "opacity-35 scale-95"
                )}
                style={{
                  background: isHovered
                    ? "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.22) 0%, rgba(109, 40, 217, 0.10) 45%, transparent 75%)"
                    : "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, rgba(109, 40, 217, 0.02) 50%, transparent 75%)",
                  filter: "blur(28px)",
                }}
              />

              <div
                ref={sideCardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  mouseX.set(50);
                  mouseY.set(50);
                }}
                className={cn(
                  "relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0f1016]/80 backdrop-blur-2xl border transition-all duration-500 sticky top-32 overflow-hidden",
                  isHovered
                    ? "border-[#A78BFA]/35 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85),0_0_20px_rgba(139,92,246,0.12)] -translate-y-1"
                    : "border-white/[0.14] shadow-[0_16px_40px_-15px_rgba(0,0,0,0.75)]"
                )}
              >
                {/* Magic Bento Internal Spotlight */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-0"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: useTransform(
                      [smoothMouseX, smoothMouseY],
                      ([x, y]) =>
                        `radial-gradient(350px circle at ${x}% ${y}%, rgba(167, 139, 250, 0.12), rgba(109, 40, 217, 0.05) 40%, transparent 70%)`
                    ),
                  }}
                />

                {/* Top Edge Specular Line */}
                <div
                  className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl pointer-events-none opacity-60 group-hover/sidecard:opacity-100 transition-opacity duration-500 z-10"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 30%, rgba(167, 139, 250, 0.4) 50%, rgba(255, 255, 255, 0.25) 70%, transparent 100%)",
                  }}
                />

                <div className="relative z-10">
                  <div className="text-[10px] font-mono tracking-widest text-[#64748B] mb-6 uppercase">
                    Currently Building
                  </div>
                  <ul className="flex flex-col gap-4">
                    {[
                      { label: "AI SYSTEMS" },
                      { label: "REAL-TIME APPS" },
                      { label: "FULL-STACK PRODUCTS" }
                    ].map((item) => (
                      <li key={item.label} className="flex items-center gap-4 group cursor-default">
                        <div className="w-2 h-2 rounded-full bg-[#A78BFA]/40 group-hover:bg-[#A78BFA] group-hover:scale-125 transition-all shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
                        <span className="text-sm font-semibold tracking-wide text-[#CBD5E1] group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
