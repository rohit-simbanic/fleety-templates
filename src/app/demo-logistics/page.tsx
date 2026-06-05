"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Clock, Fuel, ShieldAlert, Award, Star, ChevronDown, ArrowRight, Calendar, Users, Briefcase, TrendingUp } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Calligraphy from "@/components/ui/Calligraphy";

export default function DemoLogisticsPage() {
  const [activeShift, setActiveShift] = useState<number | null>(null);

  const shifts = [
    { id: "S-882", driver: "Sophie Moore", destination: "New York Hub", vehicle: "Heavy Truck T-102", eta: "10:45 AM", status: "Active" },
    { id: "S-104", driver: "Marcus Torres", destination: "Chicago Depot", vehicle: "Heavy Truck T-082", eta: "11:20 AM", status: "Staged" },
    { id: "S-449", driver: "Samantha Bennett", destination: "LA Command", vehicle: "Mid Van V-910", eta: "02:15 PM", status: "Staged" },
    { id: "S-032", driver: "Austin Drake", destination: "Atlanta Port", vehicle: "Heavy Truck T-992", eta: "Completed", status: "Closed" }
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-background text-foreground">
      
      {/* Background spotlights */}
      <div className="spotlight top-[-15%] right-[10%] opacity-55" />
      <div className="spotlight-champagne bottom-[20%] left-[-5%] opacity-40" />

      {/* Navigation */}
      <Navigation />

      {/* 1. HERO OPERATIONAL HEADER */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold select-none"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>DECREASE DEADHEAD MILES BY 24% RECURSIVELY</span>
        </motion.div>

        <div className="max-w-4xl flex flex-col gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground text-glow"
          >
            Logistics command that <Calligraphy>streamlines</Calligraphy> scheduling
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto"
          >
            Design, schedule, and assign vehicle loads with AI-staggered shifts. Calculate transit permutations dynamically to reduce driver downtime.
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
              Launch Dispatcher Sandbox
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" className="py-3.5 px-7">
              Compare Enterprise Plans
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* 2. DYNAMIC SHIFT SCHEDULER & SAVINGS INDEX */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Dispatcher Scheduler Panel (8-cols) */}
          <Card className="col-span-12 lg:col-span-8 flex flex-col gap-6 p-6 md:p-8">
            <div className="flex justify-between items-center pb-4 border-b border-foreground/5">
              <div>
                <h3 className="font-bold text-base md:text-lg text-foreground">Staggered Shift Command</h3>
                <p className="text-xs text-foreground/50">Active shift scheduling board for dispatchers.</p>
              </div>
              <div className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full text-[10px] font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Today's Roster</span>
              </div>
            </div>

            {/* Shift lists */}
            <div className="flex flex-col gap-3">
              {shifts.map((shift, idx) => {
                const isActive = activeShift === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveShift(isActive ? null : idx)}
                    className={`glass rounded-2xl border p-4 cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "border-primary/20 bg-primary/[0.02]"
                        : "border-foreground/5 hover:border-foreground/10 hover:bg-foreground/2"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 text-xs md:text-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-foreground/5 border border-foreground/5 flex items-center justify-center font-bold text-[10px] text-primary shrink-0">
                          {shift.id}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-foreground block truncate">{shift.driver}</span>
                          <span className="text-[10px] text-foreground/40 truncate block">{shift.vehicle}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-6 pl-11 sm:pl-0">
                        <div className="text-right hidden sm:block">
                          <span className="text-[10px] text-foreground/40 block">Destination</span>
                          <span className="text-xs font-semibold text-foreground">{shift.destination}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-foreground/40 block">ETA Window</span>
                          <span className="text-xs font-semibold text-foreground">{shift.eta}</span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border shrink-0 ${
                            shift.status === "Active"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : shift.status === "Staged"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-foreground/5 text-foreground/50 border-foreground/10"
                          }`}
                        >
                          {shift.status}
                        </span>
                      </div>
                    </div>

                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-foreground/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs"
                      >
                        <div>
                          <span className="text-foreground/40 block">Auto-Routing Mode</span>
                          <span className="font-bold text-primary">Active AI</span>
                        </div>
                        <div>
                          <span className="text-foreground/40 block">Estimated Savings</span>
                          <span className="font-bold text-foreground">18.4 Gallons</span>
                        </div>
                        <div>
                          <span className="text-foreground/40 block">Transit SLA Window</span>
                          <span className="font-bold text-foreground">99.8% Compliance</span>
                        </div>
                        <div>
                          <span className="text-foreground/40 block">Diagnostic Flags</span>
                          <span className="font-bold text-green-400">All Systems Clear</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Efficiency Index Chart (4-cols) */}
          <Card className="col-span-12 lg:col-span-4 flex flex-col justify-between p-6 md:p-8 min-h-[400px]">
            <div className="flex flex-col gap-1.5 pb-4 border-b border-foreground/5">
              <h3 className="font-bold text-base md:text-lg text-foreground">Operational Budgeting</h3>
              <p className="text-xs text-foreground/50">Weekly savings using AI shift dispatching.</p>
            </div>

            {/* Savings indicator */}
            <div className="text-center my-6 flex flex-col items-center justify-center gap-1">
              <span className="text-5xl font-black text-primary font-mono text-glow leading-none">$16.2K</span>
              <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider">SAVED THIS WEEK</span>
            </div>

            {/* Vector SVG Savings Chart */}
            <div className="h-28 relative flex items-end justify-between gap-1.5 border-b border-l border-foreground/10 px-2 pb-2">
              <svg className="absolute inset-0 w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 100 100">
                <motion.path
                  d="M 5,95 C 30,85 50,55 95,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
              </svg>
              {[35, 45, 40, 60, 50, 75, 90].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center h-full relative z-10">
                  <div className="w-2.5 bg-foreground/10 hover:bg-foreground/20 rounded-t-sm transition-all" style={{ height: `${h * 0.7}%` }} />
                  <div className="w-2.5 bg-primary/80 hover:bg-primary rounded-t-sm transition-all" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>

            <div className="text-[9px] text-foreground/40 font-mono text-center pt-2">
              AI optimization results: 24.8% reduction in deadhead transit miles.
            </div>
          </Card>

        </div>
      </section>

      {/* 3. METRICS BLOCK */}
      <section className="py-16 md:py-24 bg-foreground/2 border-y border-foreground/5 max-w-7xl mx-auto px-6 md:px-12 rounded-3xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative overflow-hidden">
        {[
          { num: "98.4%", label: "STAGGERED SCHEDULE MATCH" },
          { num: "12ms", label: "ROUTE COMPILATION SPEED" },
          { num: "24%", label: "AVG MILEAGE REDUCTION" },
          { num: "1.2M", label: "ACTIVE DISPATCH HOURS" }
        ].map((stat, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-3xl md:text-5xl font-black text-primary font-mono text-glow">{stat.num}</span>
            <span className="text-[9px] md:text-[10px] font-bold text-foreground/50 uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
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
            "We were planning schedules on static dispatch sheets for years. Transitioning to Fleety allowed our dispatchers to deploy active shifts recursively, cutting deadhead miles by over 20% in the first month."
          </blockquote>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary">
              AD
            </div>
            <div className="text-left">
              <h4 className="font-bold text-foreground text-xs leading-none">Austin Drake</h4>
              <span className="text-[10px] text-foreground/40 font-medium block mt-1">Global Operations Director, Unleay Logistics</span>
            </div>
          </div>
        </Card>
      </section>

      {/* 5. CTA */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 mb-16 relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl filter blur-3xl -z-10 pointer-events-none" />
        
        <Card className="col-span-12 text-center p-8 md:p-16 flex flex-col items-center gap-6 max-w-5xl mx-auto border-primary/10">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">GET DISPATCH CONTROL</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            Configure high-efficiency operations
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-xl">
            Stagger driver schedules, bypass traffic congestion triggers, and optimize routes under 12 milliseconds in our active Sandbox.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full">
            <Link href="/register" className="w-full sm:w-auto flex justify-center">
              <Button variant="primary" className="py-3.5 px-8 w-full sm:w-auto">
                Launch Sandbox Run
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto flex justify-center">
              <Button variant="outline" className="py-3.5 px-8 w-full sm:w-auto">
                Contact Sales Office
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
