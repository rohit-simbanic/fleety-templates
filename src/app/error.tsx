"use client";

import React, { useEffect } from "react";
import { ShieldAlert, RefreshCw, Compass } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log telemetry error to console
    console.error("Telemetry System Failure:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] bg-radial from-primary/5 to-transparent filter blur-3xl pointer-events-none" />

      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 animate-bounce shrink-0 relative z-10">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <h1 className="text-xl md:text-2xl font-black text-foreground tracking-tight relative z-10">
        System Node Exception
      </h1>

      <p className="text-xs md:text-sm text-foreground/50 max-w-sm leading-relaxed mt-2 relative z-10">
        An unhandled telematics pipeline error occurred while compiling this view. The dispatch signal has been lost.
      </p>

      <div className="flex gap-3 mt-8 relative z-10 w-full justify-center">
        <Link href="/">
          <Button variant="outline" className="py-2.5 px-4 text-xs">
            <Compass className="w-4 h-4 mr-1.5" /> Return Map
          </Button>
        </Link>
        <Button onClick={reset} variant="primary" className="py-2.5 px-4 text-xs">
          <RefreshCw className="w-4 h-4 mr-1.5" /> Reconnect Gateway
        </Button>
      </div>
    </div>
  );
}
