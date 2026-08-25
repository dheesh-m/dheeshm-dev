"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { EnterpriseSection } from "@/data/enterpriseData";

interface CodeEditorProps {
  activeItem: EnterpriseSection;
}

export default function CodeEditor({ activeItem }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll reveal effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center center"]
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const y = useSpring(rawY, { stiffness: 100, damping: 20 });
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 });
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(20% 0% 20% 0%)", "inset(0% 0% 0% 0%)"]);

  return (
    <motion.div
      ref={containerRef}
      style={{ y, opacity, clipPath }}
      className="w-full max-w-4xl mx-auto mt-16 lg:mt-24"
    >
      <div className="flex flex-col items-center justify-center mb-8">
        <span className="text-[10px] font-mono text-white tracking-[0.2em] mb-2 uppercase">System Implementation</span>
        <div className="h-12 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      <div className="relative rounded-xl border border-white/10 bg-[#101010]/80 backdrop-blur-md overflow-hidden shadow-2xl">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#030712]/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <div className="text-[11px] font-mono text-gray-500">
            {activeItem.id === "01" ? "system.ts" : activeItem.id === "02" ? "app.ts" : activeItem.id === "03" ? "server.ts" : "experiment.py"}
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Editor Content */}
        <div className="p-6 overflow-x-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[10px] sm:text-xs md:text-sm leading-relaxed whitespace-pre"
            >
              {activeItem.code.map((line, i) => (
                <div key={i} className="table-row">
                  <div className="table-cell select-none pr-6 text-right text-gray-600/50 text-xs">{String(i + 1).padStart(2, '0')}</div>
                  <div className="table-cell">
                    <CodeLine line={line} />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// Simple syntax highlighting component
function CodeLine({ line }: { line: string }) {
  if (!line.trim()) return <span>&nbsp;</span>;

  const blueKeywords = ['import', 'from', 'const', 'new', 'class', 'return', 'this', 'let', 'var', 'export', 'default', 'function'];
  const purpleKeywords = ['if', 'else', 'for', 'while', 'switch', 'case', 'break', 'await', 'async'];
  const symbols = ['{', '}', '(', ')', '[', ']', '=', ':', ',', '.', ';', '<', '>', '+', '-', '*', '/'];

  // This is a naive visual parser just to look like code
  const tokens = line.split(/(\s+|[{}(),=:[\];.<>+\-*/])/g).filter(Boolean);

  return (
    <>
      {tokens.map((token, i) => {
        let colorClass = "text-[#d4d4d4]";
        
        if (/^\s+$/.test(token)) {
          return <span key={i}>{token}</span>;
        }

        // Next non-whitespace token to check if it's a function call
        let nextNonWs = "";
        for (let j = i + 1; j < tokens.length; j++) {
          if (!/^\s+$/.test(tokens[j])) {
            nextNonWs = tokens[j];
            break;
          }
        }

        if (blueKeywords.includes(token)) {
          colorClass = "text-[#569cd6]";
        } else if (purpleKeywords.includes(token)) {
          colorClass = "text-[#c586c0]";
        } else if (symbols.includes(token)) {
          colorClass = "text-[#d4d4d4]";
        } else if (token.startsWith("'") || token.startsWith('"') || token.startsWith('`')) {
          colorClass = "text-[#ce9178]";
        } else if (/^[A-Z][a-zA-Z]*$/.test(token)) {
          colorClass = "text-[#4ec9b0]";
        } else if (!isNaN(Number(token)) && token !== "") {
          colorClass = "text-[#b5cea8]";
        } else if (nextNonWs === '(') {
          colorClass = "text-[#dcdcaa]";
        } else {
          colorClass = "text-[#9cdcfe]";
        }

        return <span key={i} className={colorClass}>{token}</span>;
      })}
    </>
  );
}
