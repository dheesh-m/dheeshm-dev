import { EMAIL, SOCIALS } from "@/data/socials";

/**
 * Slim site footer.
 *
 * The "LET'S BUILD SOMETHING." call to action that used to live here now lives
 * in the contact section, which owns `id="contact"`. Keeping both meant two
 * elements shared that id and the nav link landed on the footer.
 */
export default function Footer() {
  return (
    <footer className="relative z-20 w-full border-t border-white/5 bg-[#060606]/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <a
          href="#home"
          className="font-mono text-lg font-bold tracking-tight text-white"
        >
          DM<span className="text-zinc-500">._</span>
        </a>



        <p className="font-mono text-[10px] uppercase tracking-widest text-[#8A8A8A]">
          © {new Date().getFullYear()} Dheesh Medekar
        </p>
      </div>

      <span className="sr-only">{EMAIL}</span>
    </footer>
  );
}
