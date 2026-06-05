"use client";

import React from "react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Calligraphy from "@/components/ui/Calligraphy";

export default function TermsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] right-[15%] opacity-60" />
      <div className="spotlight-champagne bottom-[20%] left-[5%] opacity-40" />

      {/* Navigation */}
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-4">
        <span className="text-primary font-bold text-xs uppercase tracking-widest">LEGAL FRAMEWORK</span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground text-glow">
          Terms of <Calligraphy>Service</Calligraphy>
        </h1>
        <p className="text-xs md:text-sm text-foreground/50 font-mono">
          Last Updated: May 25, 2026 • Version 1.4
        </p>
      </section>

      {/* Terms Content */}
      <section className="pb-24 max-w-4xl mx-auto px-6 relative z-10">
        <div className="glass bg-background/50 border border-foreground/5 p-8 md:p-12 rounded-3xl flex flex-col gap-8 text-xs md:text-sm text-foreground/70 leading-relaxed">
          
          <div>
            <h2 className="text-base md:text-lg font-extrabold text-foreground mb-3 font-mono border-b border-foreground/5 pb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the Fleety telemetry aggregation portal, auto-routing API nodes, and associated dispatch software (collectively, the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, you must immediately terminate your telemetry socket streams and decommission all active OBD gateways.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-extrabold text-foreground mb-3 font-mono border-b border-foreground/5 pb-2">
              2. Account Registration & Sandbox
            </h2>
            <p>
              To configure active vehicle gateways, you must register for a sandbox account. You are responsible for keeping your WebSocket API tokens and dashboard credentials secure. Any telematics frames pushed through your active keys are your sole legal responsibility.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-extrabold text-foreground mb-3 font-mono border-b border-foreground/5 pb-2">
              3. Telemetry Stream & API Usage Limits
            </h2>
            <p>
              Fleety provides real-time CAN-bus signal ingestion. You agree not to spam telemetry socket streams, reverse-engineer J1939 parsing logic, or generate excessive load spikes on our ingestion queues. Violation of rate limits (typically 10,000 requests per minute) will result in automated temporary firewall blocks.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-extrabold text-foreground mb-3 font-mono border-b border-foreground/5 pb-2">
              4. Payment, Billing & Subscription
            </h2>
            <p>
              All paid plans (Pro Dispatcher and Enterprise Cloud) are billed monthly or annually in advance. Charges are based on vehicle gateway limits. Subscriptions automatically renew unless cancelled through the Admin portal at least 24 hours prior to the next billing statement.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-extrabold text-foreground mb-3 font-mono border-b border-foreground/5 pb-2">
              5. Service Level Agreement & Liability
            </h2>
            <p>
              While we guarantee 99.9% ingestion uptime on our Enterprise Cloud systems, Fleety is not liable for routing delays, weather anomalies, vehicle mechanical degradation, dispatch human error, or data packets dropped over cellular networks.
            </p>
          </div>

          <div className="h-[1px] bg-foreground/5 my-2" />

          <p className="text-center text-[10px] text-foreground/40 font-mono">
            © {currentYear} Fleety Inc. All rights reserved. For compliance queries, reach out to legal@fleety-saas.com.
          </p>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
