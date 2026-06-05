"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Users, Target, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Calligraphy from "@/components/ui/Calligraphy";

export default function AboutPage() {
  const crewMembers = [
    {
      name: "Marcus Torres",
      role: "Chief Telematics Architect",
      initials: "MT",
      bio: "Ex-Tesla telemetry engineer with 12+ years optimizing J1939 CAN systems.",
    },
    {
      name: "Samantha Bennett",
      role: "Lead Operations Officer",
      initials: "SB",
      bio: "Former logistics director at FedEx. Architect of Fleety's staggered dispatching models.",
    },
    {
      name: "Austin Drake",
      role: "Global Dispatch Expert",
      initials: "AD",
      bio: "15+ years coordinating heavy-duty transit networks on critical freight corridors.",
    },
  ];

  const values = [
    {
      title: "Recurving Optimization",
      icon: Target,
      desc: "We believe in recursive performance loops—where telematics analytics continually shape auto-routing algorithms to save time.",
    },
    {
      title: "Driver Safety First",
      icon: ShieldCheck,
      desc: "Our platform gamifies safe operations, securing lower fuel costs while keeping transport workers safe on interstates.",
    },
    {
      title: "Uncompromising SLA",
      icon: Award,
      desc: "We pledge sub-second API speeds and 99.99% network uptime because transit delays represent direct capital damage.",
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
        <span className="text-primary font-bold text-xs uppercase tracking-widest">ABOUT THE COMPANY</span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground text-glow max-w-3xl">
          Crafting systems that <Calligraphy>propel</Calligraphy> global logistics
        </h1>
        <p className="text-sm md:text-base text-foreground/60 max-w-xl mx-auto">
          We blend deep telematics strategy, sensor records, and AI routing to secure cargo and optimize fleet operations.
        </p>
      </section>

      {/* 2. CORPORATE CORE VALUES */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <Card key={idx} className="flex flex-col gap-4 border-foreground/5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-foreground">{val.title}</h3>
                <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">{val.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. NARRATIVE DISPATCH STORY */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">OUR HISTORY</span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Eliminating deadlock miles recursively since 2024
            </h2>
            <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
              Fleety was founded by a collective of fleet engineers, logistics managers, and telematics builders. We noticed typical dispatch boards were slow, isolated from CAN telemetry feeds, and prone to routing inefficiencies.
            </p>
            <p className="text-sm text-foreground/50 leading-relaxed">
              We built Fleety Cloud to combine secure API gateways, dynamic mapping layers, and deep-learning heuristics, creating a unified logistics command center that accelerates operations.
            </p>
          </div>
          
          <div className="lg:col-span-6">
            <Card className="p-8 border-foreground/5 flex flex-col justify-between min-h-[300px] relative overflow-hidden bg-background/50">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-primary tracking-wider uppercase">Platform Impact</span>
                <h4 className="text-lg font-bold text-foreground">Continuous telemetry collection</h4>
              </div>
              <div className="text-center my-6">
                <span className="text-5xl font-black text-foreground font-mono leading-none tracking-tight">14.2M+</span>
                <span className="text-[10px] text-foreground/40 font-medium block mt-1">Telemetry Sensor Signals / Sec</span>
              </div>
              <div className="text-[9px] text-foreground/40 font-mono text-center">
                Processing active parameters across 74 global hubs.
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. CREW MEMBERS GRID */}
      <section className="py-20 md:py-32 bg-foreground/2 max-w-7xl mx-auto px-6 md:px-12 rounded-3xl border border-foreground/5">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">DISPATCH CREW</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Led by Telematics Specialists
          </h2>
          <p className="text-sm text-foreground/60">
            Meet the logistics officers and CAN-bus technicians behind our routing engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {crewMembers.map((member, idx) => (
            <Card key={idx} className="flex flex-col justify-between min-h-[260px] border-foreground/5 bg-background/30">
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-sm text-primary">
                  {member.initials}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm leading-none">{member.name}</h4>
                  <span className="text-[10px] text-primary font-semibold block mt-1.5 uppercase tracking-wider">{member.role}</span>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed mt-2">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 mb-16 mt-8">
        <Card className="text-center p-8 md:p-16 flex flex-col items-center gap-6 max-w-5xl mx-auto border-primary/10">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">GET DISPATCH CONTROL</span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground max-w-xl leading-snug">
            Ready to secure high-efficiency operations?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full">
            <Link href="/register" className="w-full sm:w-auto flex justify-center">
              <Button variant="primary" className="w-full sm:w-auto">
                Launch Sandbox Run
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto flex justify-center">
              <Button variant="outline" className="w-full sm:w-auto">
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
