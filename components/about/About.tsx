"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useCallback } from "react";
import SectionLabel from "../ui/SectionLabel";
import BorderGlow from "../ui/BorderGlow";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function About() {
  const { isLightMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const sideCardRef = useRef<HTMLDivElement>(null);
  // ── Ref-based hover — no React re-render on card hover ──
  const glowRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const springConfig = { stiffness: 220, damping: 24, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const spotlightOpacity = useMotionValue(0);
  const smoothSpotlight = useSpring(spotlightOpacity, { stiffness: 200, damping: 22, mass: 0.1 });

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (sideCardRef.current) {
      rectRef.current = sideCardRef.current.getBoundingClientRect();
      sideCardRef.current.style.borderColor = "rgba(167, 139, 250, 0.35)";
      sideCardRef.current.style.transform = "translateY(-4px)";
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.transform = "scale(1.05)";
    }
    spotlightOpacity.set(1);
  }, [spotlightOpacity]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    let rect = rectRef.current;
    if (!rect && sideCardRef.current) {
      rect = sideCardRef.current.getBoundingClientRect();
      rectRef.current = rect;
    }
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(px);
    mouseY.set(py);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    if (sideCardRef.current) {
      sideCardRef.current.style.borderColor = "";
      sideCardRef.current.style.transform = "";
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = "0.35";
      glowRef.current.style.transform = "scale(0.95)";
    }
    spotlightOpacity.set(0);
    mouseX.set(50);
    mouseY.set(50);
  }, [mouseX, mouseY, spotlightOpacity]);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center w-full">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-16 md:mb-24 flex flex-col items-center"
        >
          <SectionLabel number="02" text="ABOUT ME" />
          <h2 className="text-[clamp(2.3rem,9vw,5rem)] font-light tracking-[-0.04em] leading-[0.95] font-display mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#171A1F] via-[#334155] to-[#394E6E] dark:from-[#8A8A8A] dark:via-[#D1D5DB] dark:to-[#FFFFFF]">
            Engineering<br />
            Intelligence
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start w-full">
          
          {/* Main Bio / Philosophy Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-8 flex flex-col gap-4 sm:gap-6 text-sm sm:text-base md:text-xl font-light leading-relaxed text-[#394E6E] dark:text-[#94A3B8]"
          >
            <p>
              I bridge the gap between high-level architectural design and low-level engineering execution. With a strong foundation in scalable architectures and AI-driven workflows, I build software that performs reliably in mission-critical environments.
            </p>
            <p>
              My expertise spans large language model orchestration, retrieval-augmented generation pipelines, and high-concurrency backend services. I prioritize clean interfaces, rigorous type safety, and real-time responsiveness.
            </p>
            <p>
              Whether deploying automated data pipelines, constructing full-stack systems, or fine-tuning neural interfaces, I focus on velocity, resilience, and maintainable software patterns.
            </p>
          </motion.div>

          {/* Side Summary / Metrics Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 w-full"
          >
            <div className="relative group/sidecard w-full">
              {/* Ambient Glow */}
              <div
                ref={glowRef}
                className="absolute -inset-2 rounded-[28px] pointer-events-none -z-10"
                style={{
                  opacity: 0.35,
                  transform: "scale(0.95)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                  background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.22) 0%, rgba(109, 40, 217, 0.10) 45%, transparent 75%)",
                  filter: "blur(28px)",
                }}
              />

              <BorderGlow
                edgeSensitivity={25}
                glowRadius={40}
                glowIntensity={1.0}
                coneSpread={25}
                borderRadius={24}
                animated={false}
                fillOpacity={0.4}
                backgroundColor={isLightMode ? "#E7E8EB" : "#0f1016"}
                glowColor={isLightMode ? "210 80 65" : "280 85 75"}
                colors={
                  isLightMode
                    ? ["#60a5fa", "#38bdf8", "#818cf8"]
                    : ["#c084fc", "#f472b6", "#38bdf8"]
                }
                className={cn(
                  "p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl sticky top-28 sm:top-32 overflow-hidden shadow-2xl transition-all duration-300 w-full",
                  isLightMode
                    ? "border-[#D0D5DD] text-[#15171B] shadow-[0_4px_20px_rgba(57,78,110,0.04)]"
                    : "border-white/[0.14] text-white"
                )}
              >
                <div
                  ref={sideCardRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full"
                >
                  {/* Magic Bento Internal Spotlight — driven by motion value */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                    style={{ opacity: smoothSpotlight,
                      background: useTransform(
                        [smoothMouseX, smoothMouseY],
                        ([x, y]) =>
                          `radial-gradient(350px circle at ${x}% ${y}%, rgba(167, 139, 250, 0.12), rgba(109, 40, 217, 0.05) 40%, transparent 70%)`
                      ),
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
                          <span className={cn(
                            "text-sm font-semibold tracking-wide transition-colors",
                            isLightMode
                              ? "text-[#15171B] group-hover:text-[#8B5CF6]"
                              : "text-[#CBD5E1] group-hover:text-white"
                          )}>
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BorderGlow>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
