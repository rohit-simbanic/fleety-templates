"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Truck, BarChart2, Zap, Settings, ShieldAlert, Navigation as NavIcon, Users, FileText, ArrowRight, Star, Activity, HardDrive, Terminal, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Calligraphy from "@/components/ui/Calligraphy";

export default function DemoTelematicsPage() {
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    "System Initialized. Socket connection listening on port 8080...",
    "Gateway NY-8 established active connection with Truck T-102.",
    "Brake pressure warning triggered on Truck T-409 (LA Hub).",
    "Telemetry frame received: T-992 coordinates updated."
  ]);

  const [activeMetrics, setActiveMetrics] = useState({
    avgSpeed: 64,
    fuelIntegrity: 98.6,
    activeAlerts: 2,
    sensorBandwidth: 14.2
  });

  // Simulator loop for telemetry diagnostics
  useEffect(() => {
    const logPool = [
      "T-102: Engine load stable at 46% capacity.",
      "T-409: Rerouting complete. AI bypassed weather trigger in Denver.",
      "T-992: Diagnostic OK. Tire pressure at 112 PSI.",
      "OBD-II Frame Parsed: Fuel flow rate 1.4 GPH on T-082.",
      "SLA status: Telemetry package delivery latency is 8ms.",
      "Gateway ATL-3: Authorized vehicle payload signature registered."
    ];

    const interval = setInterval(() => {
      // Rotate logs
      setTelemetryLogs((prev) => {
        const nextLogs = [...prev.slice(1), logPool[Math.floor(Math.random() * logPool.length)]];
        return nextLogs;
      });

      // Update metrics slightly
      setActiveMetrics((prev) => ({
        avgSpeed: Math.floor(Math.random() * 5) + 62,
        fuelIntegrity: parseFloat((98.0 + Math.random() * 1.5).toFixed(1)),
        activeAlerts: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : prev.activeAlerts,
        sensorBandwidth: parseFloat((14.0 + Math.random() * 0.8).toFixed(1))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-background text-foreground">
      
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] left-[5%] opacity-60" />
      <div className="spotlight-champagne top-[30%] right-[10%] opacity-40" />

      {/* Navigation */}
      <Navigation />

      {/* 1. HERO HUD HEADER */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold select-none"
        >
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>REAL-TIME CAN-BUS TELEMETRY ACTIVE</span>
        </motion.div>

        <div className="max-w-4xl flex flex-col gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground text-glow"
          >
            Sub-second telemetry for <Calligraphy>uncompromised</Calligraphy> security
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto"
          >
            Track heavy-duty truck diagnostics, fuel flows, tire parameters, and location alerts in under 10 milliseconds via secure WebSockets.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <Link href="/register">
            <Button variant="primary" className="py-3.5 px-7">
              Connect OBD Gateway
              <Zap className="w-4 h-4 ml-0.5" />
            </Button>
          </Link>
          <Link href="/features">
            <Button variant="outline" className="py-3.5 px-7">
              View API Specs
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* 2. DYNAMIC HUD CONSOLE GRID */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* HUD Monitor Controls (7-cols) */}
          <Card className="col-span-12 lg:col-span-7 flex flex-col gap-6 p-6 md:p-8">
            <div className="flex justify-between items-center pb-4 border-b border-foreground/5">
              <div>
                <h3 className="font-bold text-base md:text-lg text-foreground">Active Telematics Stream</h3>
                <p className="text-xs text-foreground/50">Simulated WebSocket payload parser.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-mono text-foreground/60">LINK OK</span>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Avg Speed", val: `${activeMetrics.avgSpeed} MPH`, label: "GPS telematics" },
                { name: "Fuel Integrity", val: `${activeMetrics.fuelIntegrity}%`, label: "No anomalies" },
                { name: "Active Alerts", val: `${activeMetrics.activeAlerts}`, label: "Needs review", isWarn: activeMetrics.activeAlerts > 1 },
                { name: "Data Rate", val: `${activeMetrics.sensorBandwidth} MS/s`, label: "Active buffers" }
              ].map((m, idx) => (
                <div key={idx} className="glass rounded-xl p-4 border border-foreground/5 flex flex-col gap-1 text-center justify-center">
                  <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider">{m.name}</span>
                  <span className={`text-xl font-black font-mono ${m.isWarn ? 'text-primary' : 'text-foreground'}`}>{m.val}</span>
                  <span className="text-[9px] text-foreground/40 font-medium block mt-0.5">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Terminal logs */}
            <div className="flex flex-col gap-2.5 bg-black/40 rounded-2xl p-4 border border-foreground/5 font-mono text-[10px] md:text-xs">
              <div className="flex items-center justify-between text-foreground/40 pb-2 border-b border-foreground/5">
                <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-primary" /> Gateway Log Viewer</span>
                <span className="text-[9px]">UTC BUFFER: ACTIVE</span>
              </div>
              <div className="flex flex-col gap-2 min-h-[100px] select-none text-foreground/75">
                <AnimatePresence>
                  {telemetryLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-2 items-start"
                    >
                      <span className="text-primary font-bold">{`>`}</span>
                      <span className="leading-snug">{log}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </Card>

          {/* Interactive Radar Visualizer (5-cols) */}
          <Card className="col-span-12 lg:col-span-5 flex flex-col justify-between p-6 md:p-8 min-h-[400px]">
            <div className="flex flex-col gap-1.5 pb-4 border-b border-foreground/5">
              <h3 className="font-bold text-base md:text-lg text-foreground">Spatial Radar Layer</h3>
              <p className="text-xs text-foreground/50">Geofence boundaries & live telemetry nodes.</p>
            </div>

            {/* Vector SVG Radar Map */}
            <div className="relative w-full h-[220px] rounded-2xl bg-black/30 border border-foreground/5 overflow-hidden flex items-center justify-center p-4 my-4">
              {/* Radar sweep */}
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,107,0,0.1)_0deg,transparent_120deg)] animate-[spin_5s_linear_infinite] pointer-events-none" />
              
              {/* Grid circle indicators */}
              <div className="absolute w-44 h-44 rounded-full border border-primary/5 pointer-events-none" />
              <div className="absolute w-28 h-28 rounded-full border border-primary/10 pointer-events-none animate-pulse" />
              <div className="absolute w-12 h-12 rounded-full border border-primary/20 pointer-events-none" />

              <svg viewBox="0 0 400 200" className="w-full h-full relative z-10 text-primary">
                {/* Geofence Ring path */}
                <path
                  d="M 120,40 Q 220,10 320,60 T 260,160 T 100,120 Z"
                  fill="rgba(255,107,0,0.02)"
                  stroke="rgba(255,107,0,0.3)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />

                {/* Nodes */}
                {[
                  { x: 150, y: 70, id: "T-102", active: true },
                  { x: 280, y: 90, id: "T-992", active: true },
                  { x: 340, y: 150, id: "T-409", active: false, warn: true }
                ].map((node, i) => (
                  <g key={i}>
                    {node.warn ? (
                      <>
                        <circle cx={node.x} cy={node.y} r="8" className="fill-red-500/20" />
                        <circle cx={node.x} cy={node.y} r="3" className="fill-red-500" />
                      </>
                    ) : (
                      <>
                        <circle cx={node.x} cy={node.y} r="6" className="fill-primary/20" />
                        <circle cx={node.x} cy={node.y} r="2.5" className="fill-primary" />
                      </>
                    )}
                    <text x={node.x + 8} y={node.y + 3} fill="currentColor" className="text-[8px] font-bold font-mono fill-foreground/50 select-none">
                      {node.id} {node.warn && "⚠"}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="text-[10px] text-foreground/40 font-mono text-center pt-2 border-t border-foreground/5">
              Target lock: 3 active assets tracking within geofence parameters.
            </div>
          </Card>

        </div>
      </section>

      {/* 3. CAPABILITIES FEATURE GRID */}
      <section className="py-20 md:py-32 bg-foreground/2 max-w-7xl mx-auto px-6 md:px-12 rounded-3xl border border-foreground/5 relative overflow-hidden">
        <div className="spotlight top-[-20%] right-[-10%] opacity-35" />
        
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">OBD HUD SPECIFICATION</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Telemetry metrics built for critical diagnostics
          </h2>
          <p className="text-sm md:text-base text-foreground/60">
            A secure WebSocket backend feeding live parameters straight to your command boards recursively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Tire Pressure & Integrity",
              icon: HardDrive,
              desc: "Proactively parse active PSI and tire temperatures, detecting slow leaks and anomalies before road failures occur."
            },
            {
              title: "Fuel Flow & Consumption",
              icon: Zap,
              desc: "Track micro-fuel consumption rates across all vehicle loads, optimizing routes dynamically to cut budgets."
            },
            {
              title: "Driver Safety scorecard",
              icon: ShieldCheck,
              desc: "gamify driver compliance metrics by tracking event triggers like abrupt acceleration, harsh braking, and route slips."
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="flex flex-col gap-4 p-6 min-h-[220px]">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-foreground">{item.title}</h3>
                <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 4. CLIENT TESTIMONIAL */}
      <section className="py-20 md:py-32 max-w-5xl mx-auto px-6 md:px-12">
        <Card className="text-center p-8 md:p-16 flex flex-col items-center gap-6 border-foreground/5 bg-background/50">
          <div className="flex text-primary gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <blockquote className="text-base md:text-lg text-foreground/80 leading-relaxed italic max-w-2xl">
            "WebSocket live diagnostic integration saved us from 14 roadside breakdowns last quarter alone. Fleety's telematics HUD is the command system our logistics controller needed."
          </blockquote>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary">
              SM
            </div>
            <div className="text-left">
              <h4 className="font-bold text-foreground text-xs leading-none">Sophie Moore</h4>
              <span className="text-[10px] text-foreground/40 font-medium block mt-1">Fleet Controller, Motion Inc.</span>
            </div>
          </div>
        </Card>
      </section>

      {/* 5. CTA */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 mb-16 relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl filter blur-3xl -z-10 pointer-events-none" />
        
        <Card className="col-span-12 text-center p-8 md:p-16 flex flex-col items-center gap-6 max-w-5xl mx-auto border-primary/10">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">GET STARTED TODAY</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            Connect your telematics command center
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-xl">
            Register up to 5 vehicle telemetry devices for full CAN-bus diagnostics and active spatial tracking triggers completely free of charge.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full">
            <Link href="/register" className="w-full sm:w-auto flex justify-center">
              <Button variant="primary" className="py-3.5 px-8 w-full sm:w-auto">
                Create Free Telematics Account
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto flex justify-center">
              <Button variant="outline" className="py-3.5 px-8 w-full sm:w-auto">
                Talk to Telematics Rep
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
