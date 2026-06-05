"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Truck, ShieldAlert, Award, Star, ArrowRight, ShieldCheck, Heart, AlertTriangle, Eye, ShieldCheck as ShieldIcon, UserCheck } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Calligraphy from "@/components/ui/Calligraphy";

export default function DemoSafetyPage() {
  const [incidents, setIncidents] = useState([
    { id: "INC-991", time: "Just Now", driver: "Sophie Moore", type: "Harsh Braking", scoreImpact: "-5 pts", severity: "Low" },
    { id: "INC-842", time: "4 mins ago", driver: "Marcus Torres", type: "Speed Limit Deviation", scoreImpact: "-12 pts", severity: "Medium" },
    { id: "INC-030", time: "12 mins ago", driver: "J. Miller", type: "Fatigue Trigger (Rest Alert)", scoreImpact: "0 pts (Warning)", severity: "Low" },
    { id: "INC-772", time: "45 mins ago", driver: "Austin Drake", type: "Harsh Acceleration", scoreImpact: "-4 pts", severity: "Low" }
  ]);

  const [safetyMetrics, setSafetyMetrics] = useState({
    fleetScore: 98.4,
    unassignedAlerts: 0,
    complianceRate: 99.6,
    restViolations: 0
  });

  // Simulator loop for incidents and score fluctuations
  useEffect(() => {
    const drivers = ["Sophie Moore", "Marcus Torres", "Austin Drake", "J. Miller", "K. Patel", "S. Bennett"];
    const alertPool = [
      { type: "Harsh Cornering", impact: "-6 pts", sev: "Low" },
      { type: "Rapid Lane Shift", impact: "-8 pts", sev: "Low" },
      { type: "Tailgating Alert", impact: "-15 pts", sev: "Medium" },
      { type: "Overspeed (Interstate)", impact: "-20 pts", sev: "Medium" }
    ];

    const interval = setInterval(() => {
      const selectedDriver = drivers[Math.floor(Math.random() * drivers.length)];
      const selectedAlert = alertPool[Math.floor(Math.random() * alertPool.length)];
      const id = `INC-${Math.floor(Math.random() * 900) + 100}`;

      setIncidents((prev) => {
        const nextIncidents = [
          { id, time: "Just Now", driver: selectedDriver, type: selectedAlert.type, scoreImpact: selectedAlert.impact, severity: selectedAlert.sev },
          ...prev.slice(0, 3)
        ];
        return nextIncidents;
      });

      setSafetyMetrics((prev) => {
        const nextScore = parseFloat((97.5 + Math.random() * 1.5).toFixed(1));
        return {
          ...prev,
          fleetScore: nextScore,
          complianceRate: parseFloat((99.0 + Math.random() * 0.9).toFixed(1)),
          unassignedAlerts: Math.random() > 0.6 ? prev.unassignedAlerts + 1 : prev.unassignedAlerts
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-background text-foreground">
      
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] left-[5%] opacity-60" />
      <div className="spotlight-champagne top-[20%] right-[10%] opacity-40" />

      {/* Navigation */}
      <Navigation />

      {/* 1. HERO COMPLIANCE HEADER */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold select-none"
        >
          <ShieldIcon className="w-3.5 h-3.5" />
          <span>GAMIFIED COMPLIANCE SCORING ACTIVE</span>
        </motion.div>

        <div className="max-w-4xl flex flex-col gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground text-glow"
          >
            Gamify safe driving to <Calligraphy>minimize</Calligraphy> insurance premiums
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto"
          >
            Track compliance triggers, gamify driver scorecards, monitor rest periods, and lower transit risk recursively using active OBD parameters.
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
              Start Driver Evaluation
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" className="py-3.5 px-7">
              Explore Compliance Plans
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* 2. DYNAMIC COMPLIANCE INCIDENT FEED & HUD */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Active Incidents Ticker (8-cols) */}
          <Card className="col-span-12 lg:col-span-8 flex flex-col gap-6 p-6 md:p-8">
            <div className="flex justify-between items-center pb-4 border-b border-foreground/5">
              <div>
                <h3 className="font-bold text-base md:text-lg text-foreground">Real-Time Incident Feeds</h3>
                <p className="text-xs text-foreground/50">Simulated OBD compliance trigger alerts.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                <span className="text-[10px] font-mono text-primary font-semibold">FEED LIVE</span>
              </div>
            </div>

            {/* Incidents lists */}
            <div className="flex flex-col gap-3 min-h-[220px]">
              <AnimatePresence>
                {incidents.map((inc) => (
                  <motion.div
                    key={inc.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="glass rounded-xl border border-foreground/5 p-3 sm:p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 text-xs md:text-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-foreground/5 border border-foreground/5 flex items-center justify-center font-mono font-bold text-[9px] text-foreground/50 shrink-0">
                        {inc.id}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-foreground block truncate">{inc.driver}</span>
                        <span className="text-[10px] text-foreground/40 truncate block">{inc.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-6 pl-11 sm:pl-0">
                      <div className="text-right hidden sm:block">
                        <span className="text-[9px] text-foreground/40 block">Time Log</span>
                        <span className="text-xs font-semibold text-foreground/75">{inc.time}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-foreground/40 block">Score Impact</span>
                        <span className="text-xs font-mono font-bold text-primary">{inc.scoreImpact}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold border shrink-0 ${
                          inc.severity === "Medium"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {inc.severity}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>

          {/* Safety Score Card (4-cols) */}
          <Card className="col-span-12 lg:col-span-4 flex flex-col justify-between p-6 md:p-8 min-h-[400px]">
            <div className="flex flex-col gap-1.5 pb-4 border-b border-foreground/5">
              <h3 className="font-bold text-base md:text-lg text-foreground">Fleet Safety HUD</h3>
              <p className="text-xs text-foreground/50">Gamified average score parameters.</p>
            </div>

            {/* Score circle */}
            <div className="relative w-full h-[220px] flex items-center justify-center p-4 my-4">
              {/* Pulsing score rings */}
              <div className="absolute w-44 h-44 rounded-full border border-green-500/5 animate-pulse" />
              <div className="absolute w-32 h-32 rounded-full border border-green-500/10" />

              <div className="text-center relative z-10 flex flex-col items-center justify-center">
                <span className="text-6xl font-black text-green-400 font-mono text-glow leading-none">
                  {safetyMetrics.fleetScore}
                </span>
                <span className="text-[9px] text-foreground/40 font-bold uppercase tracking-wider mt-2">FLEET INDEX SCORE</span>
                <span className="text-[9px] text-green-400 font-mono font-bold mt-1">SLA compliant</span>
              </div>
            </div>

            <div className="text-[9px] text-foreground/40 font-mono text-center pt-2 border-t border-foreground/5">
              Unassigned Alerts: <span className="font-semibold text-primary">{safetyMetrics.unassignedAlerts}</span> | Compliance Rate: <span className="font-semibold text-foreground">{safetyMetrics.complianceRate}%</span>
            </div>
          </Card>

        </div>
      </section>

      {/* 3. SAFETY CAPABILITIES */}
      <section className="py-20 md:py-32 bg-foreground/2 max-w-7xl mx-auto px-6 md:px-12 rounded-3xl border border-foreground/5 relative overflow-hidden">
        <div className="spotlight top-[-20%] right-[-10%] opacity-35" />
        
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">COMPLIANCE PROTOCOLS</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Mitigate transit risk and roadside damage
          </h2>
          <p className="text-sm md:text-base text-foreground/60">
            Advanced diagnostic sensors parsing fatigue, deceleration, and driver compliance parameters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Fatigue & Rest Triggers",
              icon: Eye,
              desc: "Automated logs monitoring shift durations and rest time frames, preventing fatigue-related corridor issues."
            },
            {
              title: "Active Crash diagnostics",
              icon: AlertTriangle,
              desc: "Immediate event notifications triggered on hard deceleration, abrupt banking, or vehicle rollovers."
            },
            {
              title: "Driver scoreboards",
              icon: UserCheck,
              desc: "Gamified reward pools promoting driver performance. Compiles driver logs to reduce logistics insurance premiums."
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
            "Gamifying driver compliance parameters transformed our transit culture. Fleet scores rose to 98% within two weeks, lowering road accident risks and cutting insurance premiums by 14%."
          </blockquote>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary">
              SB
            </div>
            <div className="text-left">
              <h4 className="font-bold text-foreground text-xs leading-none">Samantha Bennett</h4>
              <span className="text-[10px] text-foreground/40 font-medium block mt-1">Lead Operations Officer, FedEx Hub</span>
            </div>
          </div>
        </Card>
      </section>

      {/* 5. CTA */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 mb-16 relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl filter blur-3xl -z-10 pointer-events-none" />
        
        <Card className="col-span-12 text-center p-8 md:p-16 flex flex-col items-center gap-6 max-w-5xl mx-auto border-primary/10">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">GET SECURE TODAY</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            Secure compliance and driver safety
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-xl">
            Implement driver scorecards and active incident warning feeds in under 15 minutes completely free of charge.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full">
            <Link href="/register" className="w-full sm:w-auto flex justify-center">
              <Button variant="primary" className="py-3.5 px-8 w-full sm:w-auto">
                Launch Safety Evaluation
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto flex justify-center">
              <Button variant="outline" className="py-3.5 px-8 w-full sm:w-auto">
                Compare Safety Plans
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
