"use client";

import React from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#060609] text-[#f3f3f6] flex flex-col items-center justify-center p-6 text-center select-none font-sans relative overflow-hidden">
        {/* Background spotlights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-radial from-[#ff6b00]/5 to-transparent filter blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-[#ff6b00]/10 border border-[#ff6b00]/20 flex items-center justify-center text-[#ff6b00] mb-4 animate-bounce shrink-0 relative z-10">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h1 className="text-xl md:text-2xl font-black tracking-tight relative z-10">
          Global Core Crash
        </h1>

        <p className="text-xs md:text-sm text-white/50 max-w-sm leading-relaxed mt-2 relative z-10">
          A fatal crash occurred in the root portal. Telemetry processing threads have collapsed.
        </p>

        <div className="flex gap-3 mt-8 relative z-10 w-full justify-center">
          <Button onClick={reset} variant="primary" className="py-2.5 px-6 text-xs bg-[#ff6b00] hover:bg-[#ff6b00]/95 text-white">
            <RefreshCw className="w-4 h-4 mr-1.5" /> Reload Master Hub
          </Button>
        </div>
      </body>
    </html>
  );
}
