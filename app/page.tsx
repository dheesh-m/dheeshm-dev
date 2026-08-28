"use client";

import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Enterprise from "@/components/enterprise/Enterprise";
import Projects from "@/components/projects/Projects";
import GlossarySection from "@/components/glossary/GlossarySection";
import SystemsSection from "@/components/systems/SystemsSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import NeuralBackground from "@/components/background/NeuralBackground";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import ScrollSectionWrapper from "@/components/ui/ScrollSectionWrapper";
import GhostCursor from "@/components/ui/GhostCursor";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SAME_AS, EMAIL } from "@/data/socials";
import { SITE_URL } from "@/lib/siteUrl";

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

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-white/20 overflow-x-hidden">
      <script
        type="application/ld+json"
        // Static, author-controlled object; no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* 1. Background layer */}
      <NeuralBackground />

      {/* 2. GhostCursor atmospheric layer (BEHIND all UI, cards, and typography: z-[1]) */}
      <GhostCursor
        color={isLightMode ? "#394E6E" : "#A855F7"}
        brightness={1.1}
        edgeIntensity={0}
        trailLength={50}
        inertia={0.5}
        grainIntensity={0.04}
        bloomStrength={0.15}
        bloomRadius={0.8}
        bloomThreshold={0.02}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
        zIndex={1}
      />

      {/* 3. Portfolio Content & UI */}
      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full mx-auto overflow-x-hidden">
        <ScrollSectionWrapper isFirst>
          <Hero />
        </ScrollSectionWrapper>

        <ScrollSectionWrapper>
          <About />
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
    </div>
  );
}
