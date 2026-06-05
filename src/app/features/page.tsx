"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Truck, BarChart2, ShieldAlert, Award, Clock, ArrowRight, Zap, Check } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Calligraphy from "@/components/ui/Calligraphy";

export default function FeaturesPage() {
  const [activeTelemetry, setActiveTelemetry] = useState({
    speed: 68,
    rpm: 2400,
    temp: 185,
    fuel: 82,
  });

  // Simulator updates
  const randomizeTelemetry = () => {
    setActiveTelemetry({
      speed: Math.floor(Math.random() * 21) + 55, // 55 to 75
      rpm: Math.floor(Math.random() * 801) + 2000, // 2000 to 2800
      temp: Math.floor(Math.random() * 21) + 175, // 175 to 195
      fuel: Math.max(10, activeTelemetry.fuel - 1),
    });
  };

  const featureDetails = [
    {
      title: "Real-time Vehicle Tracking",
      icon: Compass,
      desc: "Receive sub-second updates containing driver metrics, GPS coordinates, and speed parameters directly in the dispatch center.",
      specs: ["High-resolution GPS positioning", "OBD-II telematics mapping", "Sub-second refresh rates", "WebSocket active link streams"],
    },
    {
      title: "Deep Learning Route AI",
      icon: BarChart2,
      desc: "Automatically configure dispatch shift timings, bypass traffic congestion triggers, and select highly optimized paths.",
      specs: ["Trillions of route path calculations", "Dynamic traffic reassignment", "Staggered dispatcher scheduling", "Fuel and mileage optimization"],
    },
    {
      title: "Asset Geofence Protection",
      icon: ShieldAlert,
      desc: "Draw precise virtual parameters around route corridors, triggering automated dispatch alerts if a truck exits parameters.",
      specs: ["Polygonal customized geofences", "Instant mobile notifications", "Remote diagnostic shutdown", "Asset security locking triggers"],
    },
  ];

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] right-[10%] opacity-60" />
      <div className="spotlight-champagne bottom-[20%] left-[5%] opacity-40" />

      {/* Navigation */}
      <Navigation />

      {/* 1. HERO HEADER */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-6">
        <span className="text-primary font-bold text-xs uppercase tracking-widest">TECHNICAL CAPABILITIES</span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground text-glow max-w-3xl">
          Everything required to <Calligraphy>optimize</Calligraphy> your operations
        </h1>
        <p className="text-sm md:text-base text-foreground/60 max-w-xl mx-auto">
          An advanced telematics ecosystem mapping driver telemetry, vehicle health, and smart automated dispatch.
        </p>
      </section>

      {/* 2. DYNAMIC TELEMETRY SIMULATOR */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-12">
        <Card className="p-6 md:p-10 border-primary/10 max-w-4xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-bold text-base md:text-lg text-foreground">Interactive Telematics Simulator</h3>
              <p className="text-xs text-foreground/50">Simulate sub-second OBD-II feeds transmitting live logistics coordinates.</p>
            </div>
            <Button onClick={randomizeTelemetry} className="py-2.5 px-5">
              Transmit New Telemetry Feed
            </Button>
          </div>

          {/* Telemetry Display dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-background/50 border border-foreground/5 p-6 rounded-2xl">
            <div className="flex flex-col gap-1 items-center">
              <span className="text-[10px] font-bold text-foreground/40 uppercase">AVG SPEED</span>
              <span className="text-2xl font-black text-primary font-mono">{activeTelemetry.speed} MPH</span>
              <span className="text-[9px] text-green-400 font-mono">Live In Transit</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-[10px] font-bold text-foreground/40 uppercase">ENGINE RPM</span>
              <span className="text-2xl font-black text-foreground font-mono">{activeTelemetry.rpm} RPM</span>
              <span className="text-[9px] text-foreground/40 font-mono">Telemetry Feed</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-[10px] font-bold text-foreground/40 uppercase">ENGINE TEMP</span>
              <span className="text-2xl font-black text-foreground font-mono">{activeTelemetry.temp}° F</span>
              <span className="text-[9px] text-foreground/40 font-mono">CAN-bus link</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-[10px] font-bold text-foreground/40 uppercase">FUEL LEVEL</span>
              <span className="text-2xl font-black text-foreground font-mono">{activeTelemetry.fuel}%</span>
              <div className="w-16 h-1.5 bg-foreground/10 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-green-400" style={{ width: `${activeTelemetry.fuel}%` }} />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 3. FEATURE IN-DEPTH BLOCK GRID */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        {featureDetails.map((f, idx) => {
          const Icon = f.icon;
          const isEven = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Text detail */}
              <div className={`lg:col-span-6 flex flex-col gap-6 ${isEven ? "" : "lg:order-2"}`}>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                  {f.title}
                </h2>
                <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                  {f.desc}
                </p>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {f.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic Card */}
              <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-1"}`}>
                <Card className="aspect-video bg-background/30 p-6 flex flex-col justify-between border-foreground/5">
                  <div className="flex justify-between items-center text-[10px] text-foreground/40 font-mono">
                    <span className="flex items-center gap-1.5 uppercase font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                      Live Feed
                    </span>
                    <span>Corridor: NYC-MIA</span>
                  </div>
                  
                  {/* Vector SVG path lines */}
                  <svg viewBox="0 0 400 150" className="w-full text-primary opacity-80 h-28 my-auto">
                    <path d="M 10,140 Q 100,20 200,80 T 390,10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                    <g>
                      <circle cx="200" cy="80" r="6" className="fill-primary" />
                      <circle cx="200" cy="80" r="12" className="stroke-primary fill-none animate-ping" />
                    </g>
                  </svg>

                  <span className="text-[10px] text-foreground/40 font-mono text-right">
                    Telemetry lock: GPS parameters secured.
                  </span>
                </Card>
              </div>
            </div>
          );
        })}
      </section>

      {/* 4. PREMIUM CONVERSION FOOTER SECTION */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <Card className="text-center p-8 md:p-16 flex flex-col items-center gap-6 max-w-5xl mx-auto border-primary/10">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">JOIN FLEETY CLOUD</span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground max-w-xl leading-snug">
            Ready to secure sub-second dispatch control?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full">
            <Link href="/register" className="w-full sm:w-auto flex justify-center">
              <Button variant="primary" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto flex justify-center">
              <Button variant="outline" className="w-full sm:w-auto">
                Compare Pricing Tiers
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
