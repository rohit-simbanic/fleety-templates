"use client";

import React from "react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Calligraphy from "@/components/ui/Calligraphy";

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] left-[10%] opacity-65" />
      <div className="spotlight-champagne bottom-[20%] right-[10%] opacity-40" />

      {/* Navigation */}
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-4">
        <span className="text-primary font-bold text-xs uppercase tracking-widest">DATA STEWARDSHIP</span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground text-glow">
          Privacy <Calligraphy>Policy</Calligraphy>
        </h1>
        <p className="text-xs md:text-sm text-foreground/50 font-mono">
          Last Updated: May 25, 2026 • Version 1.4
        </p>
      </section>

      {/* Privacy Policy Content */}
      <section className="pb-24 max-w-4xl mx-auto px-6 relative z-10">
        <div className="glass bg-background/50 border border-foreground/5 p-8 md:p-12 rounded-3xl flex flex-col gap-8 text-xs md:text-sm text-foreground/70 leading-relaxed">
          
          <div>
            <h2 className="text-base md:text-lg font-extrabold text-foreground mb-3 font-mono border-b border-foreground/5 pb-2">
              1. Telemetry Data Collected
            </h2>
            <p>
              When you deploy vehicle gateways, we collect engine diagnostics, fuel flow levels, live GPS geographic coordinates, speed parameters, deceleration alerts, and driver fatigue indicators. This telemetry data is processed in real time under 10ms to enable active auto-routing and driver safety alerts.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-extrabold text-foreground mb-3 font-mono border-b border-foreground/5 pb-2">
              2. How We Store and Retain Data
            </h2>
            <p>
              Your diagnostic logs and vehicle gateway telemetry frames are archived securely. Depending on your subscription plan, raw J1939 CAN logs are retained for 48 hours (Starter Sandbox), 30 days, or indefinitely (Pro and Enterprise) in highly secure, partitioned PostgreSQL databases and encrypted cloud cache.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-extrabold text-foreground mb-3 font-mono border-b border-foreground/5 pb-2">
              3. Data Protection Measures
            </h2>
            <p>
              All telemetry frames and diagnostic events pushed through WebSockets are encrypted using TLS 1.3 protocol. Access to database nodes and routing caches is strictly restricted via multi-factor authentication, enterprise access rules, and frequent vulnerability sweeps.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-extrabold text-foreground mb-3 font-mono border-b border-foreground/5 pb-2">
              4. Cookies and Local Persistence
            </h2>
            <p>
              We use functional cookies to manage theme selections, authentication states, and dashboard active sessions. A minimal bottom-right cookie consent banner tracks your preference and persists it in local browser storage. We do not sell your navigation data or telemetry patterns to third-party ad networks.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-extrabold text-foreground mb-3 font-mono border-b border-foreground/5 pb-2">
              5. Global Regulations Compliance
            </h2>
            <p>
              We provide tools for full compliance with the European General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). Account administrators can export complete fleet histories or trigger a full purge of vehicle telemetry logs from our archives instantly from the System settings tab.
            </p>
          </div>

          <div className="h-[1px] bg-foreground/5 my-2" />

          <p className="text-center text-[10px] text-foreground/40 font-mono">
            © {currentYear} Fleety Inc. All rights reserved. For data protection inquiries, email security@fleety-saas.com.
          </p>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
