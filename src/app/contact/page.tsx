"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Check } from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Calligraphy from "@/components/ui/Calligraphy";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    fleetSize: "10-50",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] left-[10%] opacity-60" />
      <div className="spotlight-champagne bottom-[20%] right-[5%] opacity-40" />

      {/* Navigation */}
      <Navigation />

      {/* 1. HERO HEADER */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-6">
        <span className="text-primary font-bold text-xs uppercase tracking-widest">CONNECT WITH DISPATCH</span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground text-glow max-w-3xl">
          Connect with a telemetry <Calligraphy>specialist</Calligraphy> today
        </h1>
        <p className="text-sm md:text-base text-foreground/60 max-w-xl mx-auto">
          Request details regarding CAN-bus integration, dedicated server configurations, and customized route planning models.
        </p>
      </section>

      {/* 2. FORM & MAP GRID */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Glass Form left */}
          <div className="lg:col-span-7">
            <Card className="p-6 md:p-10 border-foreground/5 bg-background/50">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground">Corporate Inquiry Received</h3>
                  <p className="text-xs md:text-sm text-foreground/60 max-w-sm mx-auto leading-relaxed">
                    Thank you. A Fleety logistics engineer has compiled your active request and will connect within 2 business hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-foreground/50 uppercase">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2.5 px-3.5 rounded-xl text-xs md:text-sm focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-foreground/50 uppercase">Corporate Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        className="w-full bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2.5 px-3.5 rounded-xl text-xs md:text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-foreground/50 uppercase">Active Fleet Size</label>
                    <select
                      name="fleetSize"
                      value={formData.fleetSize}
                      onChange={handleInputChange}
                      className="w-full bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2.5 px-3.5 rounded-xl text-xs md:text-sm focus:outline-none transition-colors"
                    >
                      <option className="bg-background" value="1-9">1-9 vehicles</option>
                      <option className="bg-background" value="10-50">10-50 vehicles</option>
                      <option className="bg-background" value="51-200">51-200 vehicles</option>
                      <option className="bg-background" value="200+">200+ heavy-duty fleets</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-foreground/50 uppercase">Operational Inquiry</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your specific logistics and dispatch integration requirements..."
                      className="w-full bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2.5 px-3.5 rounded-xl text-xs md:text-sm focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full py-3.5 mt-2">
                    Submit Corporate Inquiry
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Connect Cards right */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Map Placeholder Card */}
            <Card className="aspect-square p-6 flex flex-col justify-between border-foreground/5 min-h-[220px]">
              <div className="flex justify-between items-center text-[10px] text-foreground/40 font-mono">
                <span className="flex items-center gap-1.5 uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Fleet Headquarters
                </span>
                <span>DEN-9 Hub</span>
              </div>

              {/* Minimal SVG Graphic Map */}
              <svg viewBox="0 0 200 100" className="w-full text-primary opacity-60 h-24 my-auto">
                <path d="M20,80 C60,20 140,20 180,80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                <circle cx="100" cy="40" r="4" className="fill-primary animate-ping" />
                <circle cx="100" cy="40" r="2.5" className="fill-primary" />
              </svg>

              <div className="text-[10px] text-foreground/40 font-mono">
                Lat: 39.7392° N, Lon: 104.9903° W (Denver, CO)
              </div>
            </Card>

            {/* Direct Connect cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card hoverScale={false} className="p-4 border-foreground/5 bg-background/30 flex flex-col gap-2">
                <span className="text-[9px] font-bold text-primary uppercase">API INTEGRATIONS</span>
                <span className="font-bold text-foreground text-xs leading-none">api@fleety.cloud</span>
                <span className="text-[9.5px] text-foreground/40 leading-relaxed block mt-1">Obtain CAN J1939 webhooks docs immediately.</span>
              </Card>
              <Card hoverScale={false} className="p-4 border-foreground/5 bg-background/30 flex flex-col gap-2">
                <span className="text-[9px] font-bold text-primary uppercase">ENTERPRISE SALES</span>
                <span className="font-bold text-foreground text-xs leading-none">sales@fleety.cloud</span>
                <span className="text-[9.5px] text-foreground/40 leading-relaxed block mt-1">Request on-site dispatcher training.</span>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
