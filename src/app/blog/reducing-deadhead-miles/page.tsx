"use client";

import React from "react";
import { Clock, ArrowLeft, Heart, Share2, Compass, Layers, Truck } from "lucide-react";
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
              ROUTING & LOGISTICS
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>7 min read</span>
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            Reducing Deadhead Miles: Dispatch Operations Guide
          </h1>

          {/* Author Card */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary">
                MV
              </div>
              <div>
                <h4 className="font-bold text-foreground text-xs leading-none">Marcus Vance</h4>
                <span className="text-[10px] text-foreground/40 font-medium block mt-1">Operations Product Manager, Fleety Inc.</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-foreground/40 text-xs">
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
                <span>132 Likes</span>
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
            In freight operations, &quot;deadhead&quot; describes driving an empty cargo truck when returning to a terminal, transferring locations, or waiting for a dispatch assignment. Because empty trucks consume fuel and incur maintenance wear without producing revenue, deadhead miles are direct profit drains.
          </p>
          <p>
            For a fleet of 100 long-haul trucks, reducing deadhead miles by just 5% can yield over $120,000 in fuel and operational savings annually. Here is how advanced dispatchers structure scheduling configurations to eliminate empty transit.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-foreground mt-4">1. Predictive Triangulation Routing</h2>
          <p>
            Instead of simple point-to-point dispatch schedules, predictive triangulation pairs active route locations with warehouse demand forecasts. The dispatch engine analyzes where a cargo truck will be unloaded 4 hours in advance and matches it to outbound freight orders in the same zone.
          </p>

          <Card className="my-4 p-6 border-primary/10 bg-primary/[0.01]">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-2">
              <Truck className="w-4 h-4 text-primary" /> Backhaul Optimization
            </h3>
            <p className="text-xs text-foreground/60 leading-relaxed">
              Backhaul optimization merges private delivery coordinates with public logistics boards. By filling empty return corridors with low-priority secondary freight orders, fleets maintain high utilization numbers.
            </p>
          </Card>

          <h2 className="text-lg md:text-xl font-bold text-foreground mt-4">2. Staggered Dispatch Shifts</h2>
          <p>
            Concentrated dispatch cycles create bottleneck delays at loading docks, forcing trucks to wait in idle queues. Staggering shifts based on live telemetry queue patterns optimizes warehouse loading docks capacity and keeps vehicle nodes moving continuously.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-foreground mt-4">Summary</h2>
          <p>
            Deadhead reduction requires seamless integration between fleet telematics mapping and active freight booking systems. With real-time predictive coordination, logistics networks convert empty miles into profitable payloads.
          </p>
        </section>

      </article>

      {/* Footer */}
      <Footer />
    </main>
  );
}
