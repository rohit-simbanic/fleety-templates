"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Zap, Check, ChevronDown, ShieldAlert, Award, Star, Compass, Clock, Fuel } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Calligraphy from "@/components/ui/Calligraphy";
import Marquee from "@/components/ui/Marquee";
import DashboardMockup from "@/components/ui/DashboardMockup";
import { HOME_FAQS } from "@/lib/constants";

export default function Home() {
  const [accordionActive, setAccordionActive] = useState(0);

  const accordionItems = [
    {
      title: "Real-Time Telematics Tracking",
      description: "Collect high-fidelity telemetry records from every single vehicle in your fleet instantly, compiling driver status, GPS coordinates, and speed parameters.",
      feature: "Active Tracking Protocol Enabled",
    },
    {
      title: "AI Dispatch Optimization",
      description: "Automatically configure driver shifts, dynamically re-route to bypass weather anomalies, and deliver cargo with precision and minimal latency.",
      feature: "Deep Learning Route Optimization",
    },
    {
      title: "Automated Maintenance Records",
      description: "Proactively monitor telemetry sensors to detect spark plug degradation, low tyre pressure, and transmission issues before they create road failure.",
      feature: "Predictive Vehicle Integrity Score",
    },
  ];

  const faqItems = HOME_FAQS;

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-background text-foreground">
      
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] left-[10%] opacity-70" />
      <div className="spotlight-champagne top-[20%] right-[5%] opacity-50" />
      
      {/* Sticky Navigation Bar */}
      <Navigation />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-12 text-center">
        
        {/* Banner highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold select-none"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>FLEETY PLATFORM V2.4 IS LIVE</span>
        </motion.div>

        {/* Cursive Headline Calligraphy */}
        <div className="max-w-4xl flex flex-col gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground text-glow"
          >
            Logistics that <Calligraphy>move</Calligraphy> your entire fleet
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto"
          >
            We blend smart strategy, real-time telematics, and AI algorithms to create high-efficiency routing that reduces costs and accelerates growth.
          </motion.p>
        </div>

        {/* Hero Actions buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <Link href="/register">
            <Button variant="primary" className="py-3.5 px-7">
              Let's Dispatch Greatness
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Button>
          </Link>
          <Link href="/features">
            <Button variant="outline" className="py-3.5 px-7">
              Explore Features
            </Button>
          </Link>
        </motion.div>

        {/* Dashboard Mockup Display Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative max-w-5xl float-mockup mt-6"
        >
          {/* Dashboard overlay glow behind */}
          <div className="absolute inset-0 bg-primary/5 rounded-2xl filter blur-3xl -z-10 pointer-events-none" />
          <DashboardMockup />
        </motion.div>
      </section>

      {/* 2. LOGO MARQUEE */}
      <section className="bg-background/20 py-8 border-y border-foreground/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4 text-center">
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-foreground/40 block">
            Trusted by the world's leading logistics providers
          </span>
        </div>
        <Marquee />
      </section>

      {/* 3. INTRODUCTION / ABOUT STATEMENT */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="spotlight-champagne top-[20%] left-[-10%] opacity-40" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">ABOUT THE BRAND</span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-snug text-foreground">
              FLEETY® is an enterprise-grade SaaS logistics suite specializing in automated routing, telemetry tracking, and driver safety optimization.
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-4 text-sm text-foreground/60 leading-relaxed border-l-2 border-primary/20 pl-6">
            <p>
              Founded in 2024, our mission is to eliminate deadhead miles, secure cargo integrity, and streamline the lives of dispatchers and drivers. We empower networks to optimize freight routes recursively.
            </p>
            <Link href="/about" className="text-primary font-semibold flex items-center gap-1.5 group">
              <span>Read Our Story</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 12-COLUMN BENTO GRID FEATURE DISPLAY */}
      <section className="py-20 md:py-28 bg-foreground/2 max-w-7xl mx-auto px-6 md:px-12 rounded-3xl border border-foreground/5 relative overflow-hidden">
        <div className="spotlight top-[-20%] right-[-10%] opacity-35" />
        
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">PRODUCT SUITE</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Precision Dispatch Tools Built for Scale
          </h2>
          <p className="text-sm md:text-base text-foreground/60">
            A comprehensive telematics infrastructure to track assets, optimize routes, and reduce expenses recursively.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="bento-grid">
          
          {/* Card 1: 6-cols - Smart Auto Routing */}
          <Card className="col-span-12 md:col-span-6 flex flex-col justify-between min-h-[300px]">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg md:text-xl text-foreground mt-2">AI Auto-Routing</h3>
              <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">
                Trillions of transit paths calculated dynamically. Staggers deliveries, monitors traffic patterns, and selects optimal paths automatically to secure on-time deliveries.
              </p>
            </div>
            
            {/* Visual preview */}
            <div className="h-[2px] bg-gradient-to-r from-primary to-transparent w-full mt-6" />
          </Card>

          {/* Card 2: 6-cols - Telematics */}
          <Card className="col-span-12 md:col-span-6 flex flex-col justify-between min-h-[300px]">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg md:text-xl text-foreground mt-2">Live Driver Telemetry</h3>
              <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">
                Receive sub-second updates containing speed parameters, braking pressure, engine sensor telemetry, and exact high-resolution GPS coordinates.
              </p>
            </div>

            <div className="h-[2px] bg-gradient-to-r from-primary to-transparent w-full mt-6" />
          </Card>

          {/* Card 3: 4-cols - Fuel Optimizer */}
          <Card className="col-span-12 md:col-span-4 flex flex-col justify-between min-h-[260px]">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Fuel className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-foreground mt-1">Fuel Utilization</h4>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Save an average of 18% in fuel consumption using deep learning route configuration models and automated acceleration limits.
              </p>
            </div>
          </Card>

          {/* Card 4: 4-cols - Driver Safety */}
          <Card className="col-span-12 md:col-span-4 flex flex-col justify-between min-h-[260px]">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-foreground mt-1">Driver Safety Metrics</h4>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Build safe driving cultures with compliance scorecards, event triggers (harsh turns, abrupt braking), and gamified performance score rewards.
              </p>
            </div>
          </Card>

          {/* Card 5: 4-cols - Shield Guard */}
          <Card className="col-span-12 md:col-span-4 flex flex-col justify-between min-h-[260px]">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-foreground mt-1">Asset Shield Guard</h4>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Secures precious cargo inside active geofence rings, triggering real-time dispatcher warnings if a truck exits route parameters.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. SERVICES INTERACTIVE ACCORDION (Inspired closely by the Webflow structure) */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="spotlight-champagne top-[10%] right-[10%] opacity-30" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header left */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">DISPATCH SERVICES</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Intelligent Logistics Tailored for Growth
            </h2>
            <p className="text-sm text-foreground/60 leading-relaxed">
              We design and configure logistics interfaces that streamline vehicle management, turning raw telemetry data into immediate performance gains.
            </p>
            <div className="mt-4">
              <Link href="/features">
                <Button variant="primary">
                  See Full Features
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Interactive Accordion right */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {accordionItems.map((item, idx) => {
              const isActive = accordionActive === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setAccordionActive(idx)}
                  className={`glass rounded-2xl border p-6 cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "border-primary/20 bg-primary/[0.02]"
                      : "border-foreground/5 hover:border-foreground/10 hover:bg-foreground/2"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-base md:text-lg text-foreground">
                      {item.title}
                    </h3>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive ? "bg-primary text-white rotate-180" : "bg-foreground/5 text-foreground/60"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 flex flex-col gap-3"
                    >
                      <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-primary font-semibold font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                        <span>Protocol: {item.feature}</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. STATISTICS BLOCK */}
      <section className="py-16 md:py-24 bg-foreground/2 border-y border-foreground/5 max-w-7xl mx-auto px-6 md:px-12 rounded-3xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative overflow-hidden">
        {[
          { num: "120+", label: "ACTIVE ENTERPRISE CLIENTS" },
          { num: "98M+", label: "TRIPS COMPLETED SECURELY" },
          { num: "74", label: "GLOBAL DISPATCH CENTERS" },
          { num: "94%", label: "AVG ROUTE COST REDUCTION" },
        ].map((stat, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-3xl md:text-5xl font-black text-primary font-mono text-glow">{stat.num}</span>
            <span className="text-[9px] md:text-[10px] font-bold text-foreground/50 uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 7. CUSTOM TESTIMONIALS SECTION */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">CLIENT STORIES</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            What Operations Leaders Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The reduction in route planning latency was instant. Fleety's automated AI dispatcher configured shifts flawlessly, cutting our route operational budget by 16% in just 30 days.",
              author: "Mike Warren",
              role: "VP of Logistics, Veauly",
              initials: "MW",
            },
            {
              quote: "Sub-second OBD telemetry is a game-changer. The dispatcher center immediately knows if a truck experiences abrupt braking, tyre wear, or transmission temperature anomalies.",
              author: "Sophie Moore",
              role: "Fleet Controller, Motion",
              initials: "SM",
            },
            {
              quote: "Geofence protection has drastically enhanced cargo security. The Asset Shield alarms trigger dispatch warnings immediately if our high-value trucks wander off route parameters.",
              author: "Adam Smith",
              role: "Global Operations Director, Unleay",
              initials: "AS",
            },
          ].map((t, idx) => (
            <Card key={idx} className="flex flex-col justify-between min-h-[260px]">
              <div className="flex flex-col gap-4">
                <div className="flex text-primary gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-foreground/70 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-foreground/5">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-xs leading-none">{t.author}</h4>
                  <span className="text-[10px] text-foreground/40 font-medium block mt-1">{t.role}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 8. FAQ COLLAPSIBLE ACCORDION */}
      <section className="py-20 md:py-32 max-w-4xl mx-auto px-6 md:px-12 relative">
        <div className="spotlight top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 opacity-30" />
        
        <div className="text-center mb-16 flex flex-col gap-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">COMMON ENQUIRIES</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqItems.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass rounded-xl border border-foreground/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-sm md:text-base text-foreground hover:bg-foreground/2 transition-colors cursor-pointer focus:outline-none"
                >
                  <span>{item.q}</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center bg-foreground/5 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : "text-foreground/50"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 pt-1 text-xs md:text-sm text-foreground/60 leading-relaxed"
                  >
                    {item.a}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. PREMIUM CALL-TO-ACTION (CTA) */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 mb-16 relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl filter blur-3xl -z-10 pointer-events-none" />
        
        <Card className="col-span-12 text-center p-8 md:p-16 flex flex-col items-center gap-6 max-w-5xl mx-auto border-primary/10">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">GET STARTED TODAY</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            Accelerate Your Fleet Efficiency Recurvingly
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-xl">
            Configure up to 5 vehicle telemetry devices in our active sandbox environment completely free of charge. No credit card records required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full">
            <Link href="/register" className="w-full sm:w-auto flex justify-center">
              <Button variant="primary" className="py-3.5 px-8 w-full sm:w-auto">
                Create Free Sandbox Account
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto flex justify-center">
              <Button variant="outline" className="py-3.5 px-8 w-full sm:w-auto">
                Talk to Sales Rep
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Enterprise Footer */}
      <Footer />
    </main>
  );
}