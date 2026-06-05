"use client";

import React, { useState, useEffect } from "react";
import { Compass, Truck, ShieldAlert, Award, Star, ArrowRight, Zap, Settings, ShieldCheck, Heart, Terminal, Database, Server, Cpu, Layers, HardDrive, CreditCard, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Calligraphy from "@/components/ui/Calligraphy";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [serverStats, setServerStats] = useState({
    cpu: 24,
    mem: 58,
    dbLatency: 4.8,
    activeWs: 248
  });

  const [gateways, setGateways] = useState([
    { id: "GW-NY8", hub: "New York HQ", connections: 102, load: "28%", status: "Nominal" },
    { id: "GW-LA3", hub: "Los Angeles Hub", connections: 64, load: "42%", status: "Nominal" },
    { id: "GW-CHI2", hub: "Chicago Depot", connections: 48, load: "18%", status: "Nominal" },
    { id: "GW-ATL7", hub: "Atlanta Port", connections: 34, load: "84%", status: "High Load" }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  // Webhooks simulation states
  const [webhookUrl, setWebhookUrl] = useState("https://api.yourcompany.com/telemetry-receiver");
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);
  const [webhookLogs, setWebhookLogs] = useState<string[]>([]);

  // Invoice downloader states
  const [downloadingInv, setDownloadingInv] = useState<string | null>(null);
  const [downloadStep, setDownloadStep] = useState<string>("");

  // k6 simulation states
  const [k6Vus, setK6Vus] = useState(250);
  const [k6Duration, setK6Duration] = useState(60);
  const [k6Status, setK6Status] = useState<"idle" | "running" | "completed">("idle");
  const [k6Logs, setK6Logs] = useState<string[]>([]);
  const [k6Progress, setK6Progress] = useState(0);
  const [k6Metrics, setK6Metrics] = useState({ rps: 0, p99: 0, p95: 0, errorRate: 0 });
  const [k6TargetUrl, setK6TargetUrl] = useState("https://api.fleety.io/v2/telemetry");
  const [k6Results, setK6Results] = useState<{
    vus: number;
    duration: number;
    reqCount: number;
    successRate: number;
    rpsMax: number;
    p99Max: number;
  } | null>(null);

  const startK6Simulation = () => {
    if (k6Status === "running") return;
    setK6Status("running");
    setK6Progress(0);
    setK6Results(null);
    setK6Metrics({ rps: 0, p99: 0, p95: 0, errorRate: 0 });
    setK6Logs([
      "[UTC 08:26:01] [k6] Initializing load test scripts...",
      "[UTC 08:26:01] [k6] Resolving configuration: execution: ramping-vus",
      `[UTC 08:26:02] [k6] Target endpoint: ${k6TargetUrl}`,
      `[UTC 08:26:02] [k6] Scenario: ${k6Vus} max VUs, ${k6Duration}s duration`
    ]);

    // Start a series of timeouts to update steps
    setTimeout(() => {
      setK6Progress(20);
      setK6Metrics({ rps: Math.floor(k6Vus * 1.8), p99: 45, p95: 32, errorRate: 0 });
      setK6Logs(prev => [
        ...prev,
        `[UTC 08:26:03] [k6] Spawning VUs... current active: ${Math.floor(k6Vus * 0.4)} VUs`,
        `[UTC 08:26:03] [k6] Connection handshake completed with zero TLS errors.`
      ]);
    }, 1000);

    setTimeout(() => {
      setK6Progress(50);
      setK6Metrics({ rps: Math.floor(k6Vus * 3.4), p99: 82, p95: 58, errorRate: 0.05 });
      setK6Logs(prev => [
        ...prev,
        `[UTC 08:26:04] [k6] Target VU capacity reached: ${k6Vus} concurrent virtual loops running.`,
        `[UTC 08:26:04] [k6] Streaming high-concurrency payloads. Throughput rising...`
      ]);
    }, 2000);

    setTimeout(() => {
      setK6Progress(80);
      const isHighLoad = k6Vus > 500;
      setK6Metrics({
        rps: Math.floor(k6Vus * 4.2),
        p99: isHighLoad ? 185 : 98,
        p95: isHighLoad ? 112 : 64,
        errorRate: isHighLoad ? 0.25 : 0.02
      });
      setK6Logs(prev => [
        ...prev,
        `[UTC 08:26:05] [k6] Executing threshold assertion checks...`,
        `[UTC 08:26:05] [k6] Pass criteria: http_req_duration{p99} < 200ms: true`,
        `[UTC 08:26:05] [k6] Pass criteria: http_req_failed < 1%: true`
      ]);
    }, 3500);

    setTimeout(() => {
      setK6Progress(100);
      setK6Status("completed");
      const finalRps = Math.floor(k6Vus * 4.1);
      const isHighLoad = k6Vus > 500;
      const finalP99 = isHighLoad ? 178 : 92;
      const successPct = isHighLoad ? 99.72 : 99.98;
      
      setK6Metrics({
        rps: finalRps,
        p99: finalP99,
        p95: isHighLoad ? 108 : 61,
        errorRate: isHighLoad ? 0.28 : 0.02
      });
      setK6Logs(prev => [
        ...prev,
        `[UTC 08:26:06] [k6] Simulation runs complete.`,
        `[UTC 08:26:06] [k6] Test Result: PASSED`
      ]);
      setK6Results({
        vus: k6Vus,
        duration: k6Duration,
        reqCount: finalRps * k6Duration,
        successRate: successPct,
        rpsMax: finalRps,
        p99Max: finalP99
      });
    }, 5000);
  };

  const runWebhookSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (webhookStatus === "staging" || webhookStatus === "ssl" || webhookStatus === "sending") return;
    
    setWebhookStatus("staging");
    setWebhookLogs(["[UTC 08:14:50] Initializing telemetry JSON serializer..."]);

    setTimeout(() => {
      setWebhookStatus("ssl");
      setWebhookLogs(prev => [...prev, "[UTC 08:14:50] Resolving SSL handshake keys for endpoint..."]);
    }, 600);
    
    setTimeout(() => {
      setWebhookStatus("sending");
      setWebhookLogs(prev => [...prev, "[UTC 08:14:51] Streaming active CAN frames payload to receiver..."]);
    }, 1200);

    setTimeout(() => {
      setWebhookStatus("completed");
      setWebhookLogs(prev => [...prev, `[UTC 08:14:52] Broadcast completed. Response: 200 OK (latency: 18ms)`]);
    }, 1800);
  };

  const startInvoiceDownload = (invId: string) => {
    if (downloadingInv) return;
    setDownloadingInv(invId);
    setDownloadStep("Generating PDF...");

    setTimeout(() => {
      setDownloadStep("Compressing metadata...");
    }, 600);

    setTimeout(() => {
      setDownloadStep("Downloading...");
    }, 1200);

    setTimeout(() => {
      setDownloadStep("Downloaded!");
    }, 1800);

    setTimeout(() => {
      setDownloadingInv(null);
      setDownloadStep("");
      setNotification(`Invoice ${invId} downloaded successfully.`);
    }, 2500);
  };

  // Simulation updates for resource monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setServerStats((prev) => ({
        cpu: Math.floor(Math.random() * 15) + 18,
        mem: parseFloat((58.0 + Math.random() * 0.6).toFixed(1)),
        dbLatency: parseFloat((4.2 + Math.random() * 1.2).toFixed(1)),
        activeWs: prev.activeWs + (Math.random() > 0.5 ? 1 : -1)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerAction = (actionName: string) => {
    setNotification(`Action triggered successfully: ${actionName}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-background text-foreground">
      
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] right-[10%] opacity-55" />
      <div className="spotlight-champagne bottom-[20%] left-[5%] opacity-35" />

      {/* Navigation */}
      <Navigation />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-foreground/5 mb-8 select-none">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">System Administration</h1>
            <p className="text-xs text-foreground/50">Manage telemetry socket buffers, API queues, and J1939 CAN PGN decoders.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-mono text-green-400 font-semibold tracking-wider uppercase">Master Gateway Connected</span>
          </div>
        </div>

        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-2xl text-xs font-semibold text-primary"
          >
            {notification}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Menu (3-cols) */}
          <aside className="lg:col-span-3 flex flex-col gap-4 select-none">
            <Card className="p-4 border-foreground/5 bg-background/50 flex flex-col gap-1">
              {[
                { id: "dashboard", label: "Control Dashboard", icon: Server },
                { id: "gateways", label: "Active Gateways", icon: Cpu },
                { id: "performance", label: "k6 Load Monitor", icon: Activity },
                { id: "billing", label: "Billing & Plans", icon: CreditCard },
                { id: "logs", label: "CAN-bus Logs", icon: Terminal },
                { id: "settings", label: "System Config", icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/10"
                        : "text-foreground/60 hover:text-foreground hover:bg-foreground/2"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </Card>
          </aside>

          {/* Right Main Panel (9-cols) */}
          <section className="lg:col-span-9 flex flex-col gap-6">
            
            {/* Tab: Dashboard */}
            {activeTab === "dashboard" && (
              <div className="flex flex-col gap-6">
                
                {/* Resource monitor tickers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Active WebSockets", val: serverStats.activeWs, desc: "Active client tunnels", icon: Server },
                    { label: "CPU Ingestion Load", val: `${serverStats.cpu}%`, desc: "Node scaling: Nominal", icon: Cpu },
                    { label: "Database Pool Latency", val: `${serverStats.dbLatency}ms`, desc: "PostgreSQL link OK", icon: Database },
                    { label: "Memory Consumption", val: `${serverStats.mem}%`, desc: "Buffer cache active", icon: HardDrive }
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={idx} className="p-4 border-foreground/5 bg-background/50 flex flex-col gap-2 items-center text-center justify-center">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider mt-1">{stat.label}</span>
                        <span className="text-xl font-black font-mono text-foreground leading-none">{stat.val}</span>
                        <span className="text-[9px] text-foreground/40 font-medium block mt-0.5">{stat.desc}</span>
                      </Card>
                    );
                  })}
                </div>

                {/* Operations Control & Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Active Gateways brief */}
                  <Card className="p-6 md:p-8 flex flex-col gap-4 border-foreground/5 bg-background/50">
                    <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 pb-2 border-b border-foreground/5">
                      <Cpu className="w-4.5 h-4.5 text-primary" /> Active Ingestion Gateways
                    </h3>
                    <div className="flex flex-col gap-3">
                      {gateways.map((gw) => (
                        <div key={gw.id} className="flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-foreground block">{gw.id}</span>
                            <span className="text-[9px] text-foreground/40">{gw.hub}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-foreground/60 block">{gw.connections} WS Links</span>
                            <span
                              className={`text-[9px] font-semibold ${
                                gw.status === "High Load" ? "text-primary" : "text-green-400"
                              }`}
                            >
                              {gw.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Quick System Actions */}
                  <Card className="p-6 md:p-8 flex flex-col gap-4 border-foreground/5 bg-background/50">
                    <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 pb-2 border-b border-foreground/5">
                      <Settings className="w-4.5 h-4.5 text-primary" /> Buffer Command Console
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <Button
                        onClick={() => triggerAction("Clear WebSocket Queues")}
                        variant="primary"
                        className="py-2.5 text-xs justify-between"
                      >
                        <span>Flush WebSocket Socket Queues</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        onClick={() => triggerAction("Restart Gateway Atlanta Port")}
                        variant="outline"
                        className="py-2.5 text-xs justify-between"
                      >
                        <span>Restart Atlanta Gateway ATL-7</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        onClick={() => triggerAction("Flush DB Cache")}
                        variant="outline"
                        className="py-2.5 text-xs justify-between"
                      >
                        <span>Clear Database Query Cache</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </Card>

                </div>
              </div>
            )}

            {/* Tab: Gateways */}
            {activeTab === "gateways" && (
              <Card className="p-6 md:p-8 border-foreground/5 bg-background/50 flex flex-col gap-4">
                <h3 className="font-bold text-sm text-foreground">WebSocket Gateway Clusters</h3>
                <div className="flex flex-col gap-3">
                  {gateways.map((gw) => (
                    <div key={gw.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0 py-2 px-3 bg-foreground/2 border border-foreground/5 rounded-xl text-xs">
                      <div>
                        <span className="font-bold block text-foreground">{gw.id}</span>
                        <span className="text-[10px] text-foreground/40">{gw.hub}</span>
                      </div>
                      <div className="flex gap-4 sm:gap-6 items-center">
                        <div className="text-left sm:text-right">
                          <span className="text-[9px] text-foreground/40 block">Server Load</span>
                          <span className="font-mono font-semibold">{gw.load}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border shrink-0 ${gw.status === "High Load" ? "bg-primary/10 text-primary border-primary/20" : "bg-green-500/10 text-green-400 border-green-500/20"}`}>{gw.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Tab: Billing */}
            {activeTab === "billing" && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Plan Card */}
                  <Card className="p-6 md:p-8 border-foreground/5 bg-background/50 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-[-20%] right-[-20%] w-24 h-24 bg-primary/10 rounded-full filter blur-2xl pointer-events-none" />
                    <div className="flex flex-col gap-4 relative z-10">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Plan</span>
                        <span className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Active
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-foreground">Pro Dispatcher</h3>
                      <p className="text-xs text-foreground/60 leading-relaxed">
                        Scale telemetry streams with 50 gateways, advanced AI routing and unlimited logs.
                      </p>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-2xl font-bold text-foreground font-mono">$79</span>
                        <span className="text-[10px] text-foreground/40 font-medium">/ vehicle / month</span>
                      </div>
                    </div>
                    <div className="flex gap-2.5 mt-8 relative z-10">
                      <Button onClick={() => triggerAction("Upgrade Plan")} variant="primary" className="py-2.5 px-4 text-xs font-semibold">
                        Upgrade Tier
                      </Button>
                      <Button onClick={() => triggerAction("Manage Invoices")} variant="outline" className="py-2.5 px-4 text-xs font-semibold">
                        Manage Plan
                      </Button>
                    </div>
                  </Card>

                  {/* Limits and Quotas Card */}
                  <Card className="p-6 md:p-8 border-foreground/5 bg-background/50 flex flex-col gap-6">
                    <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 pb-2 border-b border-foreground/5">
                      <Layers className="w-4.5 h-4.5 text-primary" /> Gateway Ingestion Limits
                    </h3>
                    <div className="flex flex-col gap-4 text-xs">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-foreground/50">
                          <span>Active Gateways</span>
                          <span>38 / 50 Connected</span>
                        </div>
                        <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "76%" }} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-foreground/50">
                          <span>API Request Volume</span>
                          <span>64,520 / 100,000 requests</span>
                        </div>
                        <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "64.5%" }} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-foreground/50">
                          <span>WebSocket Frame Buffer</span>
                          <span>84% Capacity</span>
                        </div>
                        <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "84%" }} />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Credit Card Info & Invoice List */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Payment Details */}
                  <div className="md:col-span-4">
                    <Card className="p-6 md:p-8 border-foreground/5 bg-background/50 flex flex-col gap-4 h-full justify-between">
                      <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 pb-2 border-b border-foreground/5">
                          <CreditCard className="w-4.5 h-4.5 text-primary" /> Payment Method
                        </h3>
                        <div className="flex items-center gap-3 py-2 px-3 bg-foreground/2 border border-foreground/5 rounded-xl">
                          <div className="w-9 h-6 bg-primary/10 rounded border border-primary/20 flex items-center justify-center font-bold text-[10px] text-primary">
                            VISA
                          </div>
                          <div>
                            <span className="text-xs font-bold text-foreground block">Visa ending in 4242</span>
                            <span className="text-[9px] text-foreground/40">Expires 12/28</span>
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => triggerAction("Update Card Details")} variant="outline" className="py-2.5 text-xs w-full mt-4 justify-between">
                        <span>Update Billing Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Card>
                  </div>

                  {/* Past Invoices Table */}
                  <div className="md:col-span-8">
                    <Card className="p-6 md:p-8 border-foreground/5 bg-background/50 flex flex-col gap-4">
                      <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 pb-2 border-b border-foreground/5">
                        <Database className="w-4.5 h-4.5 text-primary" /> Billing Invoices History
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-foreground/5 text-[9px] text-foreground/40 font-bold uppercase tracking-wider">
                              <th className="py-2.5">Date</th>
                              <th className="py-2.5">Invoice ID</th>
                              <th className="py-2.5">Amount</th>
                              <th className="py-2.5">Status</th>
                              <th className="py-2.5 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-foreground/5 text-foreground/70">
                            {[
                              { date: "May 24, 2026", inv: "INV-8739", amount: "$3,002.00", status: "Paid" },
                              { date: "Apr 24, 2026", inv: "INV-7521", amount: "$3,002.00", status: "Paid" },
                              { date: "Mar 24, 2026", inv: "INV-6204", amount: "$2,686.00", status: "Paid" }
                            ].map((row, idx) => (
                              <tr key={idx} className="hover:bg-foreground/2 transition-colors">
                                <td className="py-2.5 font-mono">{row.date}</td>
                                <td className="py-2.5 font-bold text-foreground">{row.inv}</td>
                                <td className="py-2.5 font-mono">{row.amount}</td>
                                <td className="py-2.5">
                                  <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded-full text-[9px] font-bold">
                                    {row.status}
                                  </span>
                                </td>
                                <td className="py-2.5 text-right">
                                  {downloadingInv === row.inv ? (
                                    <span className="text-[10px] text-primary font-bold animate-pulse">
                                      {downloadStep}
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => startInvoiceDownload(row.inv)}
                                      className="text-foreground/40 hover:text-primary transition-colors cursor-pointer text-[10px] font-semibold"
                                    >
                                      Download PDF
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Logs */}
            {activeTab === "logs" && (
              <Card className="p-6 md:p-8 border-foreground/5 bg-background/50 flex flex-col gap-4">
                <h3 className="font-bold text-sm text-foreground">Live PGN Diagnostic Frames</h3>
                <div className="bg-black/40 rounded-2xl p-4 border border-foreground/5 font-mono text-xs text-foreground/75 overflow-x-auto min-h-[200px]">
                  <pre className="leading-relaxed">
{`UTC 06:40:23 - Ingested frame from T-102 (PGN 61444): Engine RPM 2400 stable.
UTC 06:40:24 - Webhook callback triggered: status 200 OK.
UTC 06:40:26 - Flush request received: client socket ID buffer cleared.
UTC 06:40:29 - Gateway ATL-7 reported connection spike: load 84%.
UTC 06:40:32 - Diagnostic PGN 65262 processed: coolant temp 185F.`}
                  </pre>
                </div>
              </Card>
            )}

            {/* Tab: Performance (k6 Load Monitor) */}
            {activeTab === "performance" && (
              <div className="flex flex-col gap-6 animate-fadeIn">
                
                {/* Header/Subheader */}
                <Card className="p-6 md:p-8 border-foreground/5 bg-background/50 flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" /> Grafana k6 Ingestion Test Suite
                      </h3>
                      <p className="text-xs text-foreground/50 mt-1">
                        Verify platform socket bandwidth, gateway auto-scaling limits, and API threshold constraints.
                      </p>
                    </div>
                    {k6Status === "running" && (
                      <span className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" /> Live Simulation Running
                      </span>
                    )}
                  </div>
                </Card>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Configuration Controls & Console Logs */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <Card className="p-6 border-foreground/5 bg-background/50 flex flex-col gap-4">
                      <h4 className="font-bold text-xs text-foreground uppercase tracking-widest border-b border-foreground/5 pb-2">Simulation Configuration</h4>
                      
                      <div className="flex flex-col gap-4 text-xs">
                        {/* Target URL */}
                        <div className="flex flex-col gap-1.5">
                          <label className="font-bold text-foreground/60">Target End-Point URL</label>
                          <input
                            type="text"
                            value={k6TargetUrl}
                            onChange={(e) => setK6TargetUrl(e.target.value)}
                            disabled={k6Status === "running"}
                            className="bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2 px-3 rounded-xl focus:outline-none transition-colors font-mono text-[11px]"
                          />
                        </div>

                        {/* Concurrent Virtual Users */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between font-bold text-foreground/60">
                            <span>Target Virtual Users (VUs)</span>
                            <span className="font-mono text-primary font-bold">{k6Vus} VUs</span>
                          </div>
                          <input
                            type="range"
                            min="50"
                            max="1000"
                            step="50"
                            value={k6Vus}
                            onChange={(e) => setK6Vus(parseInt(e.target.value))}
                            disabled={k6Status === "running"}
                            className="w-full accent-primary bg-foreground/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        {/* Test Duration */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between font-bold text-foreground/60">
                            <span>Test Duration</span>
                            <span className="font-mono text-primary font-bold">{k6Duration}s</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="120"
                            step="10"
                            value={k6Duration}
                            onChange={(e) => setK6Duration(parseInt(e.target.value))}
                            disabled={k6Status === "running"}
                            className="w-full accent-primary bg-foreground/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        <Button
                          onClick={startK6Simulation}
                          disabled={k6Status === "running"}
                          variant={k6Status === "running" ? "outline" : "primary"}
                          className="py-3 text-xs w-full font-bold mt-2"
                        >
                          {k6Status === "running" ? "Running Test Run..." : "Run Performance Test"}
                        </Button>
                      </div>
                    </Card>

                    {/* Console Logs Terminal */}
                    {(k6Status !== "idle" || k6Logs.length > 0) && (
                      <Card className="p-6 border-foreground/5 bg-background/50 flex flex-col gap-3 animate-fadeIn">
                        <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                          <span className="font-bold text-xs text-foreground uppercase tracking-widest">CLI Outputs</span>
                          <span className="font-mono text-[10px] text-foreground/40">{k6Progress}% Complete</span>
                        </div>
                        <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden mb-1">
                          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${k6Progress}%` }} />
                        </div>
                        <div className="bg-black/50 border border-foreground/5 rounded-xl p-4 font-mono text-[10px] text-foreground/85 leading-relaxed min-h-[160px] max-h-[240px] overflow-y-auto flex flex-col gap-1">
                          {k6Logs.map((log, index) => (
                            <div key={index} className="flex justify-between font-mono">
                              <span className={log.includes("PASSED") ? "text-green-400 font-bold" : ""}>{log}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
                  </div>

                  {/* Right Column: Live Graphs & Performance Diagnostics */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    
                    {/* Live Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* RPS */}
                      <Card className="p-4 border-foreground/5 bg-background/50 flex flex-col gap-1.5 items-center justify-center text-center">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Zap className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider mt-1">Throughput RPS</span>
                        <span className="text-xl font-black font-mono text-foreground leading-none">
                          {k6Metrics.rps > 0 ? k6Metrics.rps.toLocaleString() : "---"}
                        </span>
                        <span className="text-[9px] text-foreground/40 font-medium mt-0.5">Requests per second</span>
                      </Card>

                      {/* P99 Latency */}
                      <Card className="p-4 border-foreground/5 bg-background/50 flex flex-col gap-1.5 items-center justify-center text-center">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider mt-1">P99 Latency</span>
                        <span className="text-xl font-black font-mono text-foreground leading-none">
                          {k6Metrics.p99 > 0 ? `${k6Metrics.p99}ms` : "---"}
                        </span>
                        <span className="text-[9px] text-foreground/40 font-medium mt-0.5">99% of requests below</span>
                      </Card>
                    </div>

                    {/* Chart/Visual section */}
                    <Card className="p-6 md:p-8 border-foreground/5 bg-background/50 flex flex-col gap-6">
                      <h4 className="font-bold text-xs text-foreground uppercase tracking-widest border-b border-foreground/5 pb-2">Diagnostic Statistics</h4>

                      <div className="flex flex-col gap-5 text-xs">
                        {/* P95 vs P99 bar scale */}
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between font-bold">
                            <span className="text-foreground/60">P95 / P99 Latency Ratios</span>
                            <span className="font-mono text-foreground/40">{k6Metrics.p95}ms / {k6Metrics.p99}ms</span>
                          </div>
                          <div className="h-6 w-full bg-foreground/5 rounded-xl border border-foreground/5 flex overflow-hidden p-0.5">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-lg transition-all duration-500"
                              style={{ width: k6Status === "idle" ? "0%" : `${Math.min(100, (k6Metrics.p95 / 200) * 100)}%` }}
                            />
                            <div
                              className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-lg ml-0.5 transition-all duration-500"
                              style={{ width: k6Status === "idle" ? "0%" : `${Math.min(100, ((k6Metrics.p99 - k6Metrics.p95) / 200) * 100)}%` }}
                            />
                          </div>
                          <span className="text-[9px] text-foreground/40">Threshold limit: P99 &lt; 200ms. Dark range denotes P99 deviation.</span>
                        </div>

                        {/* Error rate progress */}
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between font-bold">
                            <span className="text-foreground/60">Error Response Rate</span>
                            <span className={`font-mono ${k6Metrics.errorRate > 0.5 ? "text-primary font-bold" : "text-green-400"}`}>
                              {k6Metrics.errorRate > 0 ? `${k6Metrics.errorRate}%` : "0.00%"}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-foreground/5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${k6Metrics.errorRate > 0.5 ? "bg-primary" : "bg-green-400"}`}
                              style={{ width: k6Status === "idle" ? "0%" : `${Math.max(1, (k6Metrics.errorRate / 2) * 100)}%` }}
                            />
                          </div>
                          <span className="text-[9px] text-foreground/40">Threshold limit: Failures &lt; 1.00% of all requests.</span>
                        </div>
                      </div>
                    </Card>

                    {/* Results metrics overview */}
                    {k6Results && (
                      <Card className="p-6 md:p-8 border-primary/20 bg-primary/5 flex flex-col gap-4 relative overflow-hidden animate-scaleIn">
                        <div className="absolute top-[-30%] right-[-10%] w-32 h-32 bg-primary/10 rounded-full filter blur-2xl pointer-events-none" />
                        <h4 className="font-extrabold text-sm text-foreground flex items-center gap-1.5 border-b border-primary/10 pb-2">
                          <ShieldCheck className="w-4.5 h-4.5 text-primary" /> Run Results Report (Successful)
                        </h4>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-foreground/40 block text-[9px] uppercase tracking-wider font-bold">Test Scenarios</span>
                            <span className="font-bold font-mono text-foreground">{k6Results.vus} VUs / {k6Results.duration}s</span>
                          </div>
                          <div>
                            <span className="text-foreground/40 block text-[9px] uppercase tracking-wider font-bold">Total Transmitted</span>
                            <span className="font-bold font-mono text-foreground">{k6Results.reqCount.toLocaleString()} frames</span>
                          </div>
                          <div>
                            <span className="text-foreground/40 block text-[9px] uppercase tracking-wider font-bold">Success Rate</span>
                            <span className="font-bold font-mono text-green-400">{k6Results.successRate}%</span>
                          </div>
                          <div>
                            <span className="text-foreground/40 block text-[9px] uppercase tracking-wider font-bold">Peak Throughput</span>
                            <span className="font-bold font-mono text-foreground">{k6Results.rpsMax} req/s</span>
                          </div>
                          <div>
                            <span className="text-foreground/40 block text-[9px] uppercase tracking-wider font-bold">Max P99 Latency</span>
                            <span className="font-bold font-mono text-foreground">{k6Results.p99Max}ms</span>
                          </div>
                          <div>
                            <span className="text-foreground/40 block text-[9px] uppercase tracking-wider font-bold">Compliance Status</span>
                            <span className="font-bold text-green-400">PASSED</span>
                          </div>
                        </div>
                      </Card>
                    )}

                  </div>

                </div>

              </div>
            )}

            {/* Tab: Settings */}
            {activeTab === "settings" && (
              <Card className="p-6 md:p-8 border-foreground/5 bg-background/50 flex flex-col gap-4">
                <h3 className="font-bold text-sm text-foreground">SaaS Platform Configurations</h3>
                <div className="flex flex-col gap-4 text-xs">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0 pb-2 border-b border-foreground/5">
                    <div>
                      <span className="font-bold block text-foreground">WebSocket Frame Interval</span>
                      <span className="text-[10px] text-foreground/40">Default interval for sensor logs.</span>
                    </div>
                    <span className="font-mono text-primary font-bold">1000 ms (1Hz)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0 pb-2 border-b border-foreground/5">
                    <div>
                      <span className="font-bold block text-foreground">API Rate Limiting</span>
                      <span className="text-[10px] text-foreground/40">Permitted requests per API key.</span>
                    </div>
                    <span className="font-mono text-primary font-bold">10,000 req/min</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0 pb-2">
                    <div>
                      <span className="font-bold block text-foreground">Data Storage Retention</span>
                      <span className="text-[10px] text-foreground/40">Raw J1939 CAN logs archive history.</span>
                    </div>
                    <span className="font-mono text-primary font-bold">30 Days</span>
                  </div>
                  
                  {/* Webhooks Simulator Section */}
                  <div className="h-[1px] bg-foreground/5 my-4" />
                  
                  <div className="flex flex-col gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">Active Telematics Webhook Ingestion</h4>
                      <p className="text-[10px] text-foreground/40 mt-0.5">Test real-time webhook endpoints using mock telemetry JSON payloads.</p>
                    </div>

                    <form onSubmit={runWebhookSimulation} className="flex flex-col sm:flex-row gap-3 items-center">
                      <input
                        type="url"
                        required
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        placeholder="https://api.yourcompany.com/webhook"
                        className="flex-1 w-full bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
                      />
                      <Button
                        type="submit"
                        variant={webhookStatus === "staging" || webhookStatus === "ssl" || webhookStatus === "sending" ? "outline" : "primary"}
                        className="py-2.5 text-xs w-full sm:w-auto font-semibold shrink-0"
                      >
                        {webhookStatus === "staging" || webhookStatus === "ssl" || webhookStatus === "sending" ? (
                          <span className="flex items-center gap-1.5 animate-pulse">
                            Testing...
                          </span>
                        ) : (
                          "Trigger Webhook Test"
                        )}
                      </Button>
                    </form>

                    {webhookStatus && (
                      <div className="bg-black/40 rounded-xl p-4 border border-foreground/5 font-mono text-[10px] text-foreground/75 flex flex-col gap-1.5 transition-all">
                        {webhookLogs.map((log, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span>{log}</span>
                            {index === webhookLogs.length - 1 && (webhookStatus !== "completed") && (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

          </section>

        </div>

      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
