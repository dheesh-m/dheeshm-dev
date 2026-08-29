"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { EnterpriseSection } from "@/data/enterpriseData";
import { useTheme } from "@/components/providers/ThemeProvider";

interface CodeEditorProps {
  activeItem: EnterpriseSection;
}

export default function CodeEditor({ activeItem }: CodeEditorProps) {
  const { isLightMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cycleNonce, setCycleNonce] = useState("0x4A9F");

  // Subtle background hex cycle effect every 3.5s
  useEffect(() => {
    const nonces = ["0x4A9F", "0x5E21", "0x00EA", "0xBF88", "0x1F90", "0x7FFF"];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % nonces.length;
      setCycleNonce(nonces[idx]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const getFileName = (id: string) => {
    switch (id) {
      case "01":
        return "AI_INFERENCE_CORE.CPP";
      case "02":
        return "DISTRIBUTED_NODE_CLUSTER.CPP";
      case "03":
        return "REALTIME_WS_MANAGER.CPP";
      case "04":
        return "MULTIMODAL_EXPERIMENTAL.CPP";
      default:
        return "SYSTEM_KERNEL.CPP";
    }
  };

  const getAddress = (id: string) => {
    switch (id) {
      case "01":
        return "0x7FFF5FBFFD48";
      case "02":
        return "0x7FFF5FBFEE10";
      case "03":
        return "0x7FFF5FBFF9A0";
      case "04":
        return "0x7FFF5FBFCA20";
      default:
        return "0x7FFF00000000";
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-4xl mx-auto mt-14 lg:mt-20 select-none"
    >
      {/* Console Section Header Tag */}
      <div className="flex flex-col items-center justify-center mb-6">
        <span className={`text-[10px] font-mono tracking-[0.25em] mb-2 uppercase font-semibold ${isLightMode ? "text-slate-600" : "text-gray-400"}`}>
          {isLightMode ? "[ TURBO C++ IDE // BORLAND DOS ]" : "[ C/C++ CONSOLE WORKSTATION ]"}
        </span>
        <div className={`h-8 w-px bg-gradient-to-b ${isLightMode ? "from-slate-400/60 to-transparent" : "from-white/20 to-transparent"}`} />
      </div>

      {/* ── Main Terminal / Turbo C Frame ─────────────────────────────────── */}
      <div
        className={`console-container relative rounded-lg overflow-hidden transition-all duration-300 font-mono text-[11px] sm:text-xs ${
          isLightMode
            ? "border-2 border-[#000084] bg-[#000080] shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
            : "border border-[#27272a] bg-[#050508] shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
        }`}
      >
        {/* ── Terminal Top Menu Bar ────────────────────────────────────────── */}
        {isLightMode ? (
          /* LIGHT MODE: Classic Turbo C / DOS IDE Blue Top Bar */
          <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#000084] text-white border-b border-[#000066] text-[11px] shadow-sm select-none">
            <div className="flex items-center gap-1.5 font-bold">
              <span className="text-yellow-300">═[■]═</span>
              <span className="tracking-wider text-white">C:\BORLANDC\BIN\{getFileName(activeItem.id)}</span>
              <span className="text-yellow-300">═════</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-blue-200 font-mono">
              <span className="hidden sm:inline">ADDR: {getAddress(activeItem.id)}</span>
              <span className="text-yellow-300 font-bold">[▲] [▼]</span>
            </div>
          </div>
        ) : (
          /* DARK MODE: Old-School UNIX C / C++ Workstation Title Bar */
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-[#222226] bg-[#0c0c10] text-[#a1a1aa] select-none">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 font-bold">[■]</span>
              <span className="font-semibold text-white tracking-wide">
                C:\SRC\{getFileName(activeItem.id)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-zinc-400">
              <span className="hidden sm:inline">ADDR: {getAddress(activeItem.id)}</span>
              <span>MEM: {cycleNonce}</span>
              <span className="text-zinc-300 font-semibold">[ C++20 / x86_64 ]</span>
            </div>
          </div>
        )}

        {/* ── Terminal Code Area ────────────────────────────────────────────── */}
        <div
          className={`p-4 sm:p-6 overflow-x-auto custom-scrollbar leading-relaxed transition-colors duration-300 ${
            isLightMode ? "bg-[#000080]" : "bg-[#050508]"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="whitespace-pre"
            >
              {activeItem.code.map((line, i) => (
                <div key={i} className="table-row group/line">
                  {/* Line Number */}
                  <div
                    className={`table-cell select-none pr-5 text-right font-mono text-[10.5px] sm:text-xs ${
                      isLightMode ? "text-blue-300" : "text-zinc-600"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Code Line */}
                  <div className="table-cell">
                    <ConsoleLine
                      line={line}
                      isLightMode={isLightMode}
                      isLast={i === activeItem.code.length - 1}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Terminal Bottom Status Bar ───────────────────────────────────── */}
        {isLightMode ? (
          /* LIGHT MODE: Classic Turbo C Key Navigation Footer */
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#d4d4d8] text-[#0f172a] border-t border-[#94a3b8] text-[10px] font-bold select-none">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span><span className="bg-[#000084] text-white px-1.5 py-0.5 mr-1 font-mono">F1</span> Help</span>
              <span><span className="bg-[#000084] text-white px-1.5 py-0.5 mr-1 font-mono">F2</span> Save</span>
              <span><span className="bg-[#000084] text-white px-1.5 py-0.5 mr-1 font-mono">F3</span> Open</span>
              <span><span className="bg-[#000084] text-white px-1.5 py-0.5 mr-1 font-mono">Alt+F9</span> Compile</span>
              <span className="hidden sm:inline"><span className="bg-[#000084] text-white px-1.5 py-0.5 mr-1 font-mono">F9</span> Make</span>
            </div>
            <div className="text-[#000084] font-mono">
              LINE: {activeItem.code.length} COL: 1
            </div>
          </div>
        ) : (
          /* DARK MODE: Minimal Engineering Terminal Footer */
          <div className="flex items-center justify-between px-4 py-2 border-t border-[#1f1f23] bg-[#08080c] text-[10px] text-zinc-400 select-none">
            <div className="flex items-center gap-3">
              <span className="text-zinc-300 font-semibold">STATUS: READY</span>
              <span>•</span>
              <span>THREADS: 8</span>
              <span>•</span>
              <span>COMPILER: CLANG 18.1</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-300 font-mono">SYS_ONLINE</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── C/C++ Terminal Line Lexer & Syntax Styler ───────────────────────────────
function ConsoleLine({
  line,
  isLightMode,
  isLast,
}: {
  line: string;
  isLightMode: boolean;
  isLast: boolean;
}) {
  if (!line.trim()) return <span>&nbsp;</span>;

  // 1. Terminal feedback status line
  if (line.startsWith("// TERMINAL:")) {
    return (
      <div className="flex items-center font-mono">
        <span
          className={`font-bold tracking-tight ${
            isLightMode ? "text-emerald-400" : "text-white"
          }`}
        >
          {line}
        </span>
        {isLast && <TerminalBlinkingCursor isLightMode={isLightMode} />}
      </div>
    );
  }

  // 2. Comments, Ciphertext, and Memory Dumps
  if (line.trim().startsWith("//") || line.trim().startsWith("/*")) {
    return (
      <span
        className={`font-mono tracking-tight ${
          isLightMode ? "text-emerald-400" : "text-zinc-400"
        }`}
      >
        {line}
      </span>
    );
  }

  // 3. Preprocessor Directives
  if (line.trim().startsWith("#include") || line.trim().startsWith("#define")) {
    return (
      <span
        className={`font-mono font-semibold ${
          isLightMode ? "text-cyan-300 font-bold" : "text-zinc-300"
        }`}
      >
        {line}
      </span>
    );
  }

  // C++ Token Lexer
  const tokens = line.split(/(\s+|[{}();.,:<>=+\-*\/[\]&|^!~"'\\])/g).filter(Boolean);

  const keywords = [
    "class", "struct", "template", "typename", "private", "public", "protected",
    "int", "char", "size_t", "uint8_t", "uint32_t", "uint64_t", "int8_t", "float",
    "void", "const", "return", "reinterpret_cast", "static_cast", "alignas",
    "volatile", "noexcept", "inline", "extern", "asm", "register", "auto", "if", "for"
  ];

  return (
    <span>
      {tokens.map((token, idx) => {
        if (/^\s+$/.test(token)) {
          return <span key={idx}>{token}</span>;
        }

        const trimmed = token.trim();

        // Keywords
        if (keywords.includes(trimmed)) {
          return (
            <span
              key={idx}
              className={`font-bold ${
                isLightMode ? "text-yellow-300" : "text-white"
              }`}
            >
              {token}
            </span>
          );
        }

        // Hexadecimal / Memory Pointers / Numbers (e.g. 0x0040A3F0, 0xFF, \x8E, 0, 4)
        if (
          /^0x[0-9a-fA-F]+/i.test(trimmed) ||
          /^\\[xX][0-9a-fA-F]+/i.test(trimmed) ||
          /^\d+$/.test(trimmed)
        ) {
          return (
            <span
              key={idx}
              className={`font-mono ${
                isLightMode ? "text-cyan-300" : "text-zinc-300"
              }`}
            >
              {token}
            </span>
          );
        }

        // Strings & String Literals
        if (token.startsWith('"') || token.startsWith("'")) {
          return (
            <span
              key={idx}
              className={`font-mono ${
                isLightMode ? "text-emerald-300" : "text-zinc-200"
              }`}
            >
              {token}
            </span>
          );
        }

        // Symbols & Operators
        if (/[{}();.,:<>=+\-*\/[\]&|^!~]/.test(token)) {
          return (
            <span
              key={idx}
              className={isLightMode ? "text-white font-bold" : "text-zinc-400"}
            >
              {token}
            </span>
          );
        }

        // Regular identifiers / variables
        return (
          <span
            key={idx}
            className={`font-mono ${
              isLightMode ? "text-white font-semibold" : "text-zinc-200"
            }`}
          >
            {token}
          </span>
        );
      })}
      {isLast && <TerminalBlinkingCursor isLightMode={isLightMode} />}
    </span>
  );
}

// ── Authentic Monospaced Blinking Cursor Caret ──────────────────────────────
function TerminalBlinkingCursor({ isLightMode }: { isLightMode: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block w-2 h-3.5 sm:h-4 ml-1 align-middle animate-[terminal-blink_1s_step-end_infinite] ${
        isLightMode ? "bg-emerald-400" : "bg-white"
      }`}
    />
  );
}


