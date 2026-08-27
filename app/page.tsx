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
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-white/20">
      <script
        type="application/ld+json"
        // Static, author-controlled object; no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <NeuralBackground />

      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full mx-auto">
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
