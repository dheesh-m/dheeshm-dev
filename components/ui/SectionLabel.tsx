export default function SectionLabel({
  text,
  number,
}: {
  text: string;
  /** Matches the navbar's numbering. Omit for sections with no nav entry. */
  number?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
      <span className="text-[11px] font-mono tracking-[0.2em] text-white/90 uppercase">
        {number ? `${number} / ${text}` : text}
      </span>
    </div>
  );
}
