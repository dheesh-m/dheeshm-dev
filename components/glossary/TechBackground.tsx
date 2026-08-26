"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";

function TechBackground() {
  const ref = useRef<HTMLDivElement>(null);
  // Decorative only, so it idles entirely while the section is off screen.
  const isInView = useInView(ref, { margin: "200px" });

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Floating diagnostic logs */}
      <motion.div 
        className="absolute top-[15%] left-[5%] text-[10px] font-mono text-white/10 whitespace-pre"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0.05, 0.15, 0.05] } : { opacity: 0.05 }}
        transition={isInView ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
      >
        {`> initializing_vector_index
> loading_embeddings (dim=1536)
> model_router: active
> connection_pool: 24/50`}
      </motion.div>

      <motion.div 
        className="absolute bottom-[20%] right-[10%] text-[10px] font-mono text-white/10 whitespace-pre text-right"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0.05, 0.15, 0.05] } : { opacity: 0.05 }}
        transition={isInView ? { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 } : { duration: 0 }}
      >
        {`[sys_state]: optimal
> tool_call({ "query": "latency" })
> websocket.connected
> inference.ready`}
      </motion.div>

      {/* Binary / Hex streams */}
      <div className="absolute top-[40%] right-[5%] text-[8px] font-mono text-white/5 opacity-50 flex flex-col gap-1 tracking-widest">
        <span>01 10 01 110 001</span>
        <span>0101 1010 0011</span>
        <span>0011 0100 1111</span>
      </div>

      <div className="absolute bottom-[30%] left-[8%] text-[8px] font-mono text-white/5 opacity-50 flex flex-col gap-1 tracking-widest">
        <span>0xFA81 0x1B2C</span>
        <span>0x99A0 0x81F2</span>
      </div>

      {/* Faint scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-white/10"
        initial={{ top: 0, opacity: 0 }}
        animate={isInView ? { top: "100%", opacity: [0, 1, 1, 0] } : { top: 0, opacity: 0 }}
        transition={isInView ? { duration: 15, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      />
    </div>
  );
}

export default memo(TechBackground);
