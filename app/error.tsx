"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-zinc-500">
        ERROR / RUNTIME
      </p>
      <h1 className="font-display text-[clamp(2rem,8vw,3.25rem)] font-light leading-none tracking-[-0.04em] text-white">
        Something went wrong
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-zinc-400">
        An unexpected error occurred while rendering this page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 rounded-full border border-white/15 px-6 py-3 font-mono text-xs tracking-widest text-[#F5F5F5] transition-colors hover:border-white/30 hover:bg-white/5"
      >
        {"// TRY AGAIN"}
      </button>
    </main>
  );
}
