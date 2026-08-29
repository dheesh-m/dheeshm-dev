import { memo } from "react";
import ParticleNetwork from "./ParticleNetwork";

function NeuralBackground() {
  return (
    <div
      aria-hidden="true"
      className="neural-bg-root fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* ── DARK MODE AMBIENT ELEMENTS ── */}
      <div className="ambient-glow absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-[#1C1C1C]/40 blur-[120px]" />
      <div className="ambient-glow absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#151515]/50 blur-[100px]" />
      <div className="ambient-glow absolute top-[40%] right-[30%] w-[400px] h-[400px] rounded-full bg-[#2A2A2A]/20 blur-[150px]" />
      <div className="ambient-glow absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      <div className="ambient-vignette absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />

      {/* ── LIGHT MODE ATMOSPHERE & GLOWS ── */}
      <div className="light-ambient-glow absolute top-[-5%] left-[-5%] w-[750px] h-[750px] rounded-full bg-[#394E6E]/[0.05] blur-[160px] pointer-events-none" />
      <div className="light-ambient-glow absolute top-[15%] right-[5%] w-[650px] h-[650px] rounded-full bg-[#394E6E]/[0.04] blur-[150px] pointer-events-none" />
      <div className="light-ambient-glow absolute bottom-[10%] left-[25%] w-[550px] h-[550px] rounded-full bg-[#394E6E]/[0.03] blur-[140px] pointer-events-none" />

      {/* ── LIGHT MODE TECHNICAL GRID (Visible across entire viewport) ── */}
      <div className="light-grid-overlay absolute inset-0 pointer-events-none" />

      {/* ── ANIMATED PARTICLES & CONSTELLATIONS ── */}
      <div className="absolute inset-0 z-10">
        <ParticleNetwork />
      </div>
    </div>
  );
}

export default memo(NeuralBackground);
