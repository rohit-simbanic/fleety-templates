"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, HelpCircle, ChevronDown } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Calligraphy from "@/components/ui/Calligraphy";
import { PRICING_PLANS, PRICING_FAQS } from "@/lib/constants";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [vehicleCount, setVehicleCount] = useState(15);

  const plans = PRICING_PLANS;
  const pricingFaqs = PRICING_FAQS;

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] left-[10%] opacity-60" />
      <div className="spotlight-champagne bottom-[20%] right-[5%] opacity-40" />

      {/* Navigation */}
      <Navigation />

      {/* 1. HERO HEADER */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-6">
        <span className="text-primary font-bold text-xs uppercase tracking-widest">TRANSPARENT TIERING</span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground text-glow max-w-3xl">
          Flexible pricing to <Calligraphy>scale</Calligraphy> your logistics
        </h1>
        <p className="text-sm md:text-base text-foreground/60 max-w-xl">
          Start sandbox testing completely free of charge. Pick a tier that accommodates your vehicle count.
        </p>

        {/* Annual / Monthly Billing toggle */}
        <div className="flex items-center gap-3 bg-foreground/5 border border-foreground/5 p-1 rounded-full mt-6 select-none relative z-10">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              billingCycle === "monthly" ? "bg-primary text-white shadow-md" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Billed Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              billingCycle === "yearly" ? "bg-primary text-white shadow-md" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <span>Billed Annually</span>
            <span className="bg-white/20 text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase text-white">
              Save 20%
            </span>
          </button>
        </div>
      </section>

      {/* Dynamic Interactive Pricing Calculator */}
      <section className="max-w-3xl mx-auto px-6 mb-8 relative z-10 select-none">
        <Card className="p-6 md:p-8 border-foreground/5 bg-background/50 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h3 className="font-bold text-sm text-foreground">Interactive Capacity Calculator</h3>
              <p className="text-[10px] text-foreground/50 mt-0.5">Scale vehicle counts dynamically to estimate logistics costs.</p>
            </div>
            <div className="flex items-baseline gap-1 bg-primary/10 border border-primary/20 px-3 py-1 rounded-xl w-fit">
              <span className="text-xl font-black text-primary font-mono">{vehicleCount}</span>
              <span className="text-[10px] text-primary/60 font-semibold uppercase">Vehicles</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <input
              type="range"
              min="1"
              max="200"
              value={vehicleCount}
              onChange={(e) => setVehicleCount(parseInt(e.target.value))}
              className="w-full accent-primary bg-foreground/10 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-foreground/40 font-mono">
              <span>1 vehicle</span>
              <span>50 vehicles</span>
              <span>100 vehicles</span>
              <span>200+ heavy fleets</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-foreground/5 pt-6 mt-2">
            <div>
              <span className="text-[9px] text-foreground/40 font-bold uppercase tracking-wider block">Estimated Monthly Cost</span>
              <h4 className="text-xl md:text-2xl font-black text-foreground font-mono mt-0.5">
                {vehicleCount > 50 ? (
                  "Custom SLA"
                ) : (
                  `$${vehicleCount * (billingCycle === "monthly" ? 99 : 79)}`
                )}
              </h4>
            </div>
            <div>
              <span className="text-[9px] text-foreground/40 font-bold uppercase tracking-wider block">Recommended Tier</span>
              <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mt-1.5">
                {vehicleCount <= 5 ? "Starter Sandbox" : vehicleCount <= 50 ? "Pro Dispatcher" : "Enterprise Cloud"}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-foreground/40 font-bold uppercase tracking-wider block">Est. Ingestion Volume</span>
              <span className="text-xs font-semibold text-foreground block mt-1.5">
                {vehicleCount > 50 ? "Unlimited Websockets" : `${(vehicleCount * 1.2).toFixed(1)} GB / day`}
              </span>
            </div>
          </div>
        </Card>
      </section>

      {/* 2. PRICING TIERS GRID */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => {
            const isCustom = typeof p.monthlyPrice === "string";
            const price = isCustom
              ? p.monthlyPrice
              : billingCycle === "monthly"
              ? p.monthlyPrice
              : p.yearlyPrice;

            return (
              <Card
                key={idx}
                className={`relative flex flex-col justify-between p-8 ${
                  p.popular
                    ? "border-primary/30 shadow-[0_20px_40px_rgba(255,107,0,0.06)] bg-primary/[0.01]"
                    : "border-foreground/5"
                }`}
              >
                {/* Popular Highlight tag */}
                {p.popular && (
                  <span className="absolute top-4 right-4 bg-primary/10 text-primary border border-primary/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Dispatcher Pick
                  </span>
                )}

                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-extrabold text-lg md:text-xl text-foreground capitalize">{p.name}</h3>
                    <p className="text-xs text-foreground/50 mt-1 leading-relaxed">{p.desc}</p>
                  </div>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl md:text-5xl font-black text-foreground font-mono">
                      {typeof price === "number" ? `$${price}` : price}
                    </span>
                    {typeof price === "number" && (
                      <span className="text-xs text-foreground/40 font-medium">/ vehicle / month</span>
                    )}
                  </div>

                  {/* Features list */}
                  <ul className="flex flex-col gap-3.5 border-t border-foreground/5 pt-6 mt-2">
                    {p.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-foreground/70">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card footer CTA button */}
                <div className="mt-8 pt-4">
                  <Link href="/register" className="w-full">
                    <Button variant={p.popular ? "primary" : "outline"} className="w-full py-3.5">
                      {p.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. COMPARISON MATRIC TABLE */}
      <section className="py-20 md:py-32 max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 flex flex-col gap-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">DETAILED MATRIX</span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Features Comparison Matrix
          </h2>
        </div>

        <div className="glass rounded-2xl border border-foreground/5 overflow-x-auto select-none">
          <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-foreground/5 bg-foreground/2 text-[10px] text-foreground/40 font-bold uppercase tracking-wider">
                <th className="p-4">Feature</th>
                <th className="p-4">Starter</th>
                <th className="p-4">Pro</th>
                <th className="p-4">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5 text-foreground/70">
              {[
                { name: "Max Fleet Gateways", s: "5", p: "50", e: "Unlimited" },
                { name: "Auto-Routing Precision", s: "Standard", p: "AI Recurving", e: "AI Recurving + SLA" },
                { name: "OBD Telematics Log", s: "48 hours", p: "Unlimited", e: "Unlimited" },
                { name: "Live GPS Stream Rate", s: "10s updates", p: "Sub-second", e: "Sub-second" },
                { name: "Geofencing Rings", s: "2 geofences", p: "Unlimited", e: "Unlimited" },
                { name: "API custom Webhooks", s: "✖", p: "✔", e: "✔" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-foreground/2 transition-colors">
                  <td className="p-4 font-semibold text-foreground">{row.name}</td>
                  <td className="p-4">{row.s}</td>
                  <td className="p-4 text-primary font-bold">{row.p}</td>
                  <td className="p-4 font-mono font-medium text-foreground/80">{row.e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. BILLING FAQ ACCORDION */}
      <section className="py-20 max-w-4xl mx-auto px-6 md:px-12 mb-16 relative">
        <div className="text-center mb-16 flex flex-col gap-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">FAQ</span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Pricing & Billing Queries
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {pricingFaqs.map((faq, i) => {
            const isOpen = faqOpen === i;
            return (
              <div key={i} className="glass rounded-xl border border-foreground/5 overflow-hidden">
                <button
                  onClick={() => setFaqOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-sm md:text-base text-foreground hover:bg-foreground/2 transition-colors cursor-pointer focus:outline-none"
                >
                  <span>{faq.q}</span>
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
                    {faq.a}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
