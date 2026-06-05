"use client";

import React from "react";
import { Clock, ArrowLeft, Heart, Share2, Award, ShieldAlert, Star } from "lucide-react";
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
              SECURITY & SAFETY
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>5 min read</span>
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            Gamifying Driver Operations for Insurance Reductions
          </h1>

          {/* Author Card */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary">
                SJ
              </div>
              <div>
                <h4 className="font-bold text-foreground text-xs leading-none">Sarah Jenkins</h4>
                <span className="text-[10px] text-foreground/40 font-medium block mt-1">Safety Standards Director, Fleety Inc.</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-foreground/40 text-xs">
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
                <span>114 Likes</span>
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
            Commercial vehicle insurance premiums represent one of the most volatile operating costs for logistics enterprises. Typically, premium structures are decided based on historical regional crash databases and macroscopic fleet demographics. However, modern telematics allows us to build real-time individual risk scores.
          </p>
          <p>
            By designing driver-facing gamification loops that track safety compliance factors, fleets can cultivate a safer transit culture, lower incident rates by up to 45%, and unlock significant discounts on annual commercial insurance premiums.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-foreground mt-4">1. Measuring Safe Driver Compliance</h2>
          <p>
            Rather than relying on disciplinary action, safety compliance scorecards rely on gamified feedback loops. The telematics gateways detect and grade three primary event indices:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>**Harsh Deceleration Events**: Sudden braking spikes measured through accelerometer G-force sensors.</li>
            <li>**Over-Speeding Intervals**: Continuing to drive above local posted speed regulations.</li>
            <li>**Active Driver Fatigue**: Steering wheel minor adjustments and driver shifts duration tracking.</li>
          </ul>

          <Card className="my-4 p-6 border-primary/10 bg-primary/[0.01]">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-2">
              <Award className="w-4 h-4 text-primary" /> Safety Reward Formula
            </h3>
            <p className="text-xs text-foreground/60 leading-relaxed">
              Every driver is assigned a base score of 100 points per route. Points are deducted dynamically based on incident severity. Monthly averages above 92 points unlock cash bonuses and corporate recognition rewards.
            </p>
          </Card>

          <h2 className="text-lg md:text-xl font-bold text-foreground mt-4">2. Lowering Insurance Risk Profiles</h2>
          <p>
            Insurance underwriters evaluate risk profiles using actuary models. By providing underwriters with read-only dashboard access showing authenticated fleet compliance histories, companies verify their safety standards, proving a low-risk profile to qualify for customized premium tiers.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-foreground mt-4">Summary</h2>
          <p>
            Gamification shifts driver management from passive tracking to active encouragement. When drivers are empowered with transparent scorecards and real-time safety rewards, logistics operations run safer and more cost-efficiently.
          </p>
        </section>

      </article>

      {/* Footer */}
      <Footer />
    </main>
  );
}
