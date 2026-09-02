"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Pattern from "@/components/background/Pattern";
import ScrollSectionWrapper from "@/components/ui/ScrollSectionWrapper";
import PortfolioLoader from "@/components/ui/PortfolioLoader";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SAME_AS, EMAIL } from "@/data/socials";
import { SITE_URL } from "@/lib/siteUrl";

// Below-the-fold sections dynamically imported for instant initial paint
const Enterprise = dynamic(() => import("@/components/enterprise/Enterprise"), { ssr: true });
const GlossarySection = dynamic(() => import("@/components/glossary/GlossarySection"), { ssr: true });
const Projects = dynamic(() => import("@/components/projects/Projects"), { ssr: true });
const SystemsSection = dynamic(() => import("@/components/systems/SystemsSection"), { ssr: true });
const ExperienceSection = dynamic(() => import("@/components/experience/ExperienceSection"), { ssr: true });
const Contact = dynamic(() => import("@/components/contact/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/footer/Footer"), { ssr: true });

// Client-only canvas / overlay effects
const SplashCursor = dynamic(() => import("@/components/ui/SplashCursor"), { ssr: false });
const GradualBlur = dynamic(() => import("@/components/ui/GradualBlur"), { ssr: false });

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dheesh Medekar",
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  jobTitle: "AI / Software Engineer",
  description:
    "I build intelligent systems, real-time applications and full-stack products.",
  sameAs: SAME_AS,
  knowsAbout: [
    "LLM Engineering",
    "Retrieval-Augmented Generation",
    "Backend APIs",
    "Full-Stack Development",
  ],
};

export default function Home() {
  const { isLightMode } = useTheme();
  const [isPageReady, setIsPageReady] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-white/20 overflow-x-hidden">
      {/* Initial Entry Loader / Intro Transition */}
      <PortfolioLoader onStartExit={() => setIsPageReady(true)} />

      <script
        type="application/ld+json"
        // Static, author-controlled object; no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* 1. Background layer (Dedicated full-viewport Pattern Starfield) */}
      <div className="page-background">
        <Pattern />
      </div>

      {/* 2. SplashCursor global WebGL fluid simulation layer (BEHIND UI, cards, and typography: z-[1]) */}
      <SplashCursor
        COLOR={isLightMode ? "#5B6F86" : "#A855F7"}
        RAINBOW_MODE={true}
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={720}
        PRESSURE_ITERATIONS={12}
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        CURL={2.5}
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={4500}
        SHADING={true}
        TRANSPARENT={true}
      />

      {/* 3. Portfolio Content & UI — Smooth soft zoom-in reveal upon loader exit */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={
          isPageReady
            ? { scale: 1, opacity: 1 }
            : { scale: 0.94, opacity: 0 }
        }
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: "50% 25vh" }}
        className="w-full"
      >
        <Navbar />

        <main className="relative z-10 flex flex-col items-center w-full mx-auto overflow-x-hidden">
          <ScrollSectionWrapper isFirst>
            <Hero />
          </ScrollSectionWrapper>

          <ScrollSectionWrapper>
            <Enterprise />
          </ScrollSectionWrapper>

          <ScrollSectionWrapper>
            <GlossarySection />
          </ScrollSectionWrapper>

          <ScrollSectionWrapper>
            <Projects />
          </ScrollSectionWrapper>

          <ScrollSectionWrapper>
            <SystemsSection />
          </ScrollSectionWrapper>

          <ScrollSectionWrapper>
            <ExperienceSection />
          </ScrollSectionWrapper>

          <ScrollSectionWrapper isLast>
            <Contact />
          </ScrollSectionWrapper>
        </main>

        <Footer />
      </motion.div>

      {/* 4. Global Persistent Viewport Bottom Gradual Blur */}
      <GradualBlur
        target="page"
        position="bottom"
        height="7rem"
        mobileHeight="4.5rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
        zIndex={35}
        fadeAtDocumentBottom={true}
      />
    </div>
  );
}
