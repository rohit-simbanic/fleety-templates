"use client";

import React from "react";
import { Clock, ArrowLeft, BookOpen, Share2, Heart, Sparkles, Cpu, Layers } from "lucide-react";
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
              ROUTING
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>6 min read</span>
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            Recurving Logic: The Future of AI Route Optimization
          </h1>

          {/* Author Card */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary">
                SM
              </div>
              <div>
                <h4 className="font-bold text-foreground text-xs leading-none">Sophie Moore</h4>
                <span className="text-[10px] text-foreground/40 font-medium block mt-1">Lead Operations Officer, Fleety Inc.</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-foreground/40 text-xs">
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
                <span>142 Likes</span>
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
            In modern logistics, route optimization has historically been treated as a static puzzle—the Traveling Salesperson Problem (TSP) resolved at the beginning of a dispatch shift. Yet, the physical reality of highway networks is continuously fluid. Traffic anomalies, sudden storm buffers, and vehicle sensor alerts change route parameters dynamically.
          </p>
          <p>
            To resolve these challenges, we built **Recurving Logic**—a recursive feedback engine that matches active OBD-II telematics streams directly with heuristic neural network paths.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-foreground mt-4">1. The Telematics Loop</h2>
          <p>
            Traditional route planners isolate routing software from vehicle hardware. Fleety bridges this latency by connecting directly to the vehicle's J1939 CAN-bus telemetry via secure WebSockets.
          </p>

          <Card className="my-4 p-6 border-primary/10 bg-primary/[0.01]">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-primary" /> Core Optimization Formula
            </h3>
            <p className="text-xs text-foreground/60 leading-relaxed">
              Our routing engine calculates transit permutations in under 12 milliseconds. The algorithm continually scores paths by minimizing:
              <span className="font-mono text-primary font-bold block mt-2 text-center text-sm">
                Cost = ∑(Distance × Traffic_Delay) + (Hardware_Wear × Fuel_Loss)
              </span>
            </p>
          </Card>

          <h2 className="text-lg md:text-xl font-bold text-foreground mt-4">2. Bypassing Congestion Recursively</h2>
          <p>
            When a truck is in transit, the gateway monitors surrounding traffic latency. If a delay trigger exceeds 8 minutes, the AI router recalculates trillions of alternative coordinates, staging route reassignments under 15 milliseconds.
          </p>
          <p>
            This continuous evaluation eliminates deadhead miles, cuts fuel consumption by an average of 18%, and preserves dispatcher SLAs across intercontinental corridors.
          </p>

          <div className="bg-black/40 rounded-2xl p-4 border border-foreground/5 font-mono text-xs text-foreground/90 overflow-x-auto relative my-4">
            <div className="absolute top-2 right-2 text-[9px] text-foreground/30 uppercase">API Example</div>
            <pre className="leading-relaxed">
{`GET /v1/routing/optimize?vehicle_id=T-102
Response: {
  "activeRoute": "Route-NY-BOS-v3",
  "mileageSavings": "14.2 miles",
  "etaAdjustment": "-12.4 minutes",
  "rerouteTriggered": true
}`}
            </pre>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-foreground mt-4">Summary</h2>
          <p>
            By merging hardware telematics parameters with AI path solvers, Fleety eliminates route planning latencies. Logistics networks can operate fluidly, continually adjusting schedules in real-time.
          </p>
        </section>

      </article>

      {/* Footer */}
      <Footer />
    </main>
  );
}
