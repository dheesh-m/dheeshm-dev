import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-zinc-500">
        ERROR / 404
      </p>
      <h1 className="font-display text-[clamp(2.5rem,10vw,4rem)] font-light leading-none tracking-[-0.04em] text-white">
        Page not found
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-zinc-400">
        That route does not exist. It may have been moved or never existed at
        all.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full border border-white/15 px-6 py-3 font-mono text-xs tracking-widest text-[#F5F5F5] transition-colors hover:border-white/30 hover:bg-white/5"
      >
        {"// BACK HOME"}
      </Link>
    </main>
  );
}
