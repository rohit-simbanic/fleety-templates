"use client";

import React from "react";
import Link from "next/link";
import { Compass, ArrowRight, ShieldAlert } from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col justify-between overflow-hidden">
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] left-[10%] opacity-60" />
      <div className="spotlight-champagne bottom-[20%] right-[10%] opacity-40" />

      {/* Sticky navigation */}
      <Navigation />

      {/* Main 404 view */}
      <section className="flex-1 flex flex-col items-center justify-center pt-40 pb-20 px-6 max-w-7xl mx-auto text-center gap-6 relative z-10 select-none">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary animate-pulse mb-2">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h1 className="text-7xl md:text-9xl font-black tracking-tight text-primary text-glow font-mono leading-none">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mt-2">
          Ingestion Gateway Disconnected
        </h2>

        <p className="text-xs md:text-sm text-foreground/60 max-w-md leading-relaxed mx-auto">
          The telemetry packet or dispatch route you requested is unavailable or has been decommissioned from the Master Ingestion Hub.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-6 w-full">
          <Link href="/">
            <Button variant="outline" className="py-3 px-6 text-xs md:text-sm">
              <Compass className="w-4 h-4 mr-1.5" /> Return to Map
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="primary" className="py-3 px-6 text-xs md:text-sm">
              <span>Enter Admin Center</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
