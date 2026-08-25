"use client";

import { motion } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full py-16 md:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      {/* Background animated lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
            style={{ top: `${15 + i * 10}%` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[clamp(2.5rem,12vw,7rem)] font-bold tracking-[-0.04em] leading-[0.9] text-white mb-6 font-sans">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A8A8A] to-[#FFFFFF]">
              LET&apos;S BUILD
              <br />
              SOMETHING.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-12 font-sans">
            Have an interesting problem, AI system or product idea? I&apos;m always open to discussing new opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="mailto:dheeshm@gmail.com"
              className="group flex h-14 items-center justify-center gap-3 px-8 rounded-xl bg-white text-[#030712] text-sm font-bold tracking-wide hover:bg-gray-200 transition-colors w-full sm:w-auto"
            >
              EMAIL ME
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </MagneticButton>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <MagneticButton
                href="https://www.linkedin.com/in/dheesh-medekar-019a8a291/"
                className="group flex h-14 items-center justify-center gap-2 px-6 rounded-xl border border-white/10 text-white text-sm font-semibold hover:border-white/20 hover:bg-white/5 transition-colors flex-1 sm:flex-none"
              >
                LINKEDIN
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 opacity-50">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </MagneticButton>
              <MagneticButton
                href="https://github.com/dheesh-m"
                className="group flex h-14 items-center justify-center gap-2 px-6 rounded-xl border border-white/10 text-white text-sm font-semibold hover:border-white/20 hover:bg-white/5 transition-colors flex-1 sm:flex-none"
              >
                GITHUB
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 opacity-50">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 text-[10px] font-mono tracking-widest text-gray-600 uppercase">
        © {new Date().getFullYear()} Dheesh Medekar
      </div>
    </section>
  );
}
