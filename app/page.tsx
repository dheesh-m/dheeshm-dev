import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Enterprise from "@/components/enterprise/Enterprise";
import Projects from "@/components/projects/Projects";
import GlossarySection from "@/components/glossary/GlossarySection";
import SystemsSection from "@/components/systems/SystemsSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import NeuralBackground from "@/components/background/NeuralBackground";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-white/20">
      {/* Neural Background System */}
      <NeuralBackground />

      <Navbar />
      
      <main className="relative z-10 flex flex-col items-center w-full mx-auto">
        <Hero />
        <About />
        <Enterprise />
        <GlossarySection />
        <Projects />
        <SystemsSection />
        <ExperienceSection />
        <Footer />
      </main>
    </div>
  );
}

