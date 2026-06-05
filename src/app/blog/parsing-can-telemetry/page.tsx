"use client";

import React from "react";
import { Clock, ArrowLeft, Heart, Share2, Sparkles, Cpu, Layers } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function BlogSinglePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-background text-foreground">
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] left-[5%] opacity-40" />
      <div className="spotlight-champagne top-[30%] right-[10%] opacity-30" />

      {/* Navigation */}
      <Navigation />

      {/* Post container */}
      <article className="pt-32 pb-24 max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Back Link */}
        <Link href="/blog" className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-primary transition-colors mb-8 group w-fit font-semibold">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Journal</span>
        </Link>

        {/* Post Header */}
        <header className="flex flex-col gap-6 pb-8 border-b border-foreground/5 mb-10">
          <div className="flex justify-between items-center text-[10px] text-foreground/40 font-mono">
            <span className="bg-primary/10 text-primary border border-primary/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              TELEMATICS
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>8 min read</span>
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            Parsing CAN J1939 Telemetry Signals at Scale
          </h1>

          {/* Author Card */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary">
                DC
              </div>
              <div>
                <h4 className="font-bold text-foreground text-xs leading-none">David Chen</h4>
                <span className="text-[10px] text-foreground/40 font-medium block mt-1">Telemetry Ingestion Lead, Fleety Inc.</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-foreground/40 text-xs">
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
                <span>98 Likes</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </header>

        {/* Post Content */}
        <section className="flex flex-col gap-6 text-sm md:text-base text-foreground/80 leading-relaxed">
          <p>
            Automotive telemetry systems rely heavily on the Controller Area Network (CAN) bus protocol. In heavy-duty commercial vehicles, the standard protocol is SAE J1939. Operating at 250 kbps or 500 kbps, the CAN bus broadcasts thousands of continuous signal frames containing vital mechanical details like engine coolant temperature, fuel flow rates, odometer numbers, and active Diagnostic Trouble Codes (DTCs).
          </p>
          <p>
            When managing thousands of active vehicle gateways simultaneously, collecting and parsing these binary signal payloads under 10 milliseconds without clogging your network ingest pipeline is a massive engineering challenge.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-foreground mt-4">1. Demystifying the J1939 Frame</h2>
          <p>
            J1939 packets utilize 29-bit identifiers. Instead of individual addresses, signals are grouped into Parameter Group Numbers (PGNs). Each PGN is composed of multiple Suspect Parameter Numbers (SPNs) representing individual telemetry parameters like Engine Speed (RPM).
          </p>

          <Card className="my-4 p-6 border-primary/10 bg-primary/[0.01]">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-2">
              <Cpu className="w-4 h-4 text-primary" /> Ingestion Buffer Management
            </h3>
            <p className="text-xs text-foreground/60 leading-relaxed">
              To handle raw broadcasts, Fleety edge gateways filter non-essential PGN frames directly in hardware microcontrollers before streaming. Essential frames are encapsulated into compressed binary packets and routed to WebSockets.
            </p>
          </Card>

          <h2 className="text-lg md:text-xl font-bold text-foreground mt-4">2. High-Performance Decoders</h2>
          <p>
            At the ingestion cloud nodes, we deploy compiled Rust decoders to parse the binary payload offsets asynchronously. This avoids JavaScript main-thread blocks and keeps server CPU ingestion latencies close to zero.
          </p>

          <div className="bg-black/40 rounded-2xl p-4 border border-foreground/5 font-mono text-xs text-foreground/90 overflow-x-auto relative my-4">
            <div className="absolute top-2 right-2 text-[9px] text-foreground/30 uppercase">Rust Parser Snippet</div>
            <pre className="leading-relaxed">
{`fn parse_engine_speed(payload: &[u8; 8]) -> f32 {
    // SPN 190: Engine Speed is located at byte index 3 and 4 of PGN 61444
    let raw = ((payload[4] as u16) << 8) | (payload[3] as u16);
    // Resolution: 0.125 RPM per bit, Offset: 0
    (raw as f32) * 0.125
}`}
            </pre>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-foreground mt-4">Summary</h2>
          <p>
            By implementing hardware-level telemetry filtering at edge gateways and executing compiled async binary parsers in the cloud, logistics providers can monitor fleet mechanical health instantly, predicting and avoiding road breakdowns.
          </p>
        </section>

      </article>

      {/* Footer */}
      <Footer />
    </main>
  );
}
