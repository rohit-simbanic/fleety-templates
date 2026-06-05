"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-[#060609] flex flex-col items-center justify-center gap-6 select-none">
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-radial from-primary/10 to-transparent filter blur-3xl pointer-events-none" />

      {/* Orbit Loading Animation */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-primary/20 border-t-primary rounded-full"
        />
        {/* Middle Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-2 border-secondary/20 border-b-secondary rounded-full"
        />
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border-2 border-primary/10 border-r-primary/50 rounded-full"
        />
        {/* Center Logo 'F' */}
        <span className="text-xl font-black text-foreground font-mono">F</span>
      </div>

      <div className="flex flex-col gap-1.5 text-center relative z-10">
        <h3 className="text-xs font-bold text-foreground tracking-widest uppercase">Connecting Gateways</h3>
        <p className="text-[10px] text-foreground/40 font-mono tracking-wide animate-pulse">
          Buffering telemetry nodes...
        </p>
      </div>
    </div>
  );
}
