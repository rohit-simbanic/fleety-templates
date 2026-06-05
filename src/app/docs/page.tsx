"use client";

import React, { useState } from "react";
import { Compass, BookOpen, Terminal, Code, Cpu, HardDrive, Key, ArrowUpRight, Search, FileText, Activity, ShieldAlert, ChevronDown } from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // CLI Console States
  const [cliInput, setCliInput] = useState("");
  const [cliHistory, setCliHistory] = useState<Array<{ cmd: string; out: string | React.ReactNode }>>([
    { cmd: "system", out: "Fleety Telematics Console initialized. Type 'help' for instructions." }
  ]);

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = cliInput.trim().toLowerCase();
    if (!cleanCmd) return;

    let response: string | React.ReactNode = "";
    
    switch (cleanCmd) {
      case "help":
        response = "Available Commands:\n - status: Display connection speed and gateway statuses.\n - optimize: Request mock route recalculation data.\n - diagnostics: View active CAN J1939 telemetry packet fields.\n - clear: Wipe console history logs.";
        break;
      case "status":
        response = `WebSocket Status: Nominal\nActive Ingestion Nodes: 4\nMaster Ingest Latency: 8.2ms\nQueued Frames: 0`;
        break;
      case "optimize":
        response = JSON.stringify({
          status: "optimized",
          routeId: "Route-BOS-NY-v2",
          savings: "12.4 miles",
          etaAdjustment: "-9 mins",
          timestamp: new Date().toISOString()
        }, null, 2);
        break;
      case "diagnostics":
        response = `PGN 61444 [SPN 190]: Engine RPM 2400 stable\nPGN 65262 [SPN 110]: Coolant Temp 185°F\nPGN 65253 [SPN 247]: Odometer 124,520 miles`;
        break;
      case "clear":
        setCliHistory([]);
        setCliInput("");
        return;
      default:
        response = `Command not recognized: '${cleanCmd}'. Type 'help' for options.`;
    }

    setCliHistory(prev => [...prev, { cmd: cliInput, out: response }]);
    setCliInput("");
  };

  const sidebarItems = [
    {
      title: "Getting Started",
      items: [
        { id: "getting-started", label: "Introduction" },
        { id: "quickstart", label: "Quickstart Guide" },
        { id: "auth", label: "API Authentication" }
      ]
    },
    {
      title: "Telematics Core",
      items: [
        { id: "obd-integration", label: "OBD-II Protocol" },
        { id: "can-bus", label: "J1939 CAN-bus Logs" },
        { id: "websocket-stream", label: "WebSocket Active Link" }
      ]
    },
    {
      title: "Routing & AI",
      items: [
        { id: "auto-routing", label: "AI Routing Permutations" },
        { id: "geofencing", label: "Geofence Parameters" }
      ]
    }
  ];

  const currentLabel = sidebarItems.flatMap(g => g.items).find(i => i.id === activeSection)?.label || "Introduction";

  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-background text-foreground">
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] left-[5%] opacity-40" />
      <div className="spotlight-champagne top-[40%] right-[5%] opacity-35" />

      {/* Navigation */}
      <Navigation />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
          
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-between bg-foreground/3 border border-foreground/5 rounded-xl px-4 py-3 text-xs font-semibold text-foreground cursor-pointer focus:outline-none"
            >
              <span>📄 {currentLabel}</span>
              <ChevronDown className={`w-4 h-4 text-foreground/50 transition-transform duration-300 ${sidebarOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Left Sidebar (3-cols) */}
          <aside className={`lg:col-span-3 lg:sticky lg:top-24 flex-col gap-6 max-h-[calc(100vh-120px)] overflow-y-auto pr-4 select-none ${sidebarOpen ? "flex" : "hidden lg:flex"}`}>
            
            {/* Search mock */}
            <div className="relative">
              <Search className="w-4 h-4 text-foreground/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2 pl-9 pr-4 rounded-xl text-xs focus:outline-none transition-colors"
                readOnly
              />
            </div>

            {/* Sidebar nav lists */}
            <nav className="flex flex-col gap-6">
              {sidebarItems.map((group, groupIdx) => (
                <div key={groupIdx} className="flex flex-col gap-2">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">{group.title}</h4>
                  <ul className="flex flex-col gap-1 border-l border-foreground/5 pl-2">
                    {group.items.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                            className={`w-full text-left py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              isActive
                                ? "bg-primary/10 text-primary border border-primary/10"
                                : "text-foreground/60 hover:text-foreground hover:bg-foreground/2"
                            }`}
                          >
                            {item.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Right Content Area (9-cols) */}
          <section className="lg:col-span-9 flex flex-col gap-8">
            
            <Card className="p-6 sm:p-8 md:p-10 border-foreground/5 bg-background/50">
              {activeSection === "getting-started" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-primary">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">GUIDE</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">Introduction to Fleety Cloud</h1>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Welcome to the Fleety Cloud platform developer documentation. Fleety provides high-fidelity vehicle telemetry parsing, active geofencing alerts, and deep learning auto-routing APIs.
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Whether you are developing hardware OBD-II sensor links or building warehouse dispatch systems, our API layers integrate metrics at sub-10ms rates via REST, WebSockets, and gRPC endpoints.
                  </p>

                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-foreground/80 mt-2">
                    <Activity className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block mb-1">Platform Status</strong>
                      All telemetry gateways are active. Current WebSocket ingestion latency: <span className="font-mono text-primary font-semibold">8.2ms</span>.
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "quickstart" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-primary">
                    <Terminal className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">TERMINAL</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">Quickstart Guide</h1>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Set up your first telematics sandbox stream. To test vehicle diagnostic ingestion, trigger a curl request to register an active session:
                  </p>

                  <div className="bg-black/40 rounded-2xl p-4 border border-foreground/5 font-mono text-xs text-foreground/90 overflow-x-auto relative">
                    <div className="absolute top-2 right-2 text-[9px] text-foreground/30 uppercase">bash</div>
                    <pre className="leading-relaxed">
{`curl -X POST https://api.fleety.cloud/v1/sandbox/register \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "vehicleId": "T-102",
    "driver": "S. Bennett",
    "gateway": "NY-8"
  }'`}
                    </pre>
                  </div>

                  <p className="text-sm text-foreground/70 leading-relaxed">
                    On successful registration, the API returns a temporary WebSocket link `wss://telemetry.fleety.cloud/stream` for active telemetry feeds.
                  </p>
                </div>
              )}

              {activeSection === "auth" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-primary">
                    <Key className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">SECURITY</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">API Authentication</h1>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    All requests to Fleety API endpoints must be signed using standard Bearer authentication. You can generate active developer tokens directly inside the Admin dashboard.
                  </p>
                  
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-foreground/80 mt-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block mb-1">Credential Security Warning</strong>
                      Never hardcode API keys inside your client-side React code. Always load tokens from server-side environment configurations (`.env.local`).
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "obd-integration" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-primary">
                    <Cpu className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">HARDWARE</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">OBD-II Protocol Integration</h1>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Fleety supports standard OBD-II telemetry parameters. Telemetry frames should be packaged as JSON frames and transmitted at 1Hz frequencies.
                  </p>

                  <h3 className="font-bold text-sm text-foreground mt-4">Required Parameter Frames</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse min-w-[400px]">
                      <thead>
                        <tr className="border-b border-foreground/10 text-foreground/50 font-bold">
                          <th className="py-2.5">Field</th>
                          <th className="py-2.5">Type</th>
                          <th className="py-2.5">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-foreground/5 text-foreground/70">
                        <tr>
                          <td className="py-2.5 font-mono text-primary">vehicle_id</td>
                          <td className="py-2.5">string</td>
                          <td className="py-2.5">Unique heavy-truck system identifier (e.g. T-102).</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-mono text-primary">engine_load</td>
                          <td className="py-2.5">float</td>
                          <td className="py-2.5">Active load percentile on CAN systems (0.0 to 100.0).</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-mono text-primary">lat_lng</td>
                          <td className="py-2.5">array</td>
                          <td className="py-2.5">Active GPS parameters format: `[latitude, longitude]`.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSection === "can-bus" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-primary">
                    <HardDrive className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">STORAGE</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">J1939 CAN-bus Logs</h1>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Heavy-duty commercial vehicles utilize J1939 parameter groups (PGNs). Our gateway decodes hex-encoded PGN data buffers automatically, tracking transmission temps and fuel sensor frequencies.
                  </p>
                </div>
              )}

              {activeSection === "websocket-stream" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-primary">
                    <Code className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">REAL-TIME</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">WebSocket Active Link</h1>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    To connect to our live diagnostics feed, establish a secure WebSocket stream connection:
                  </p>

                  <div className="bg-black/40 rounded-2xl p-4 border border-foreground/5 font-mono text-xs text-foreground/90 overflow-x-auto relative">
                    <div className="absolute top-2 right-2 text-[9px] text-foreground/30 uppercase">javascript</div>
                    <pre className="leading-relaxed">
{`const socket = new WebSocket('wss://telemetry.fleety.cloud/v1/stream');

socket.onopen = () => {
  socket.send(JSON.stringify({ action: 'subscribe', token: 'BEARER_API_KEY' }));
};

socket.onmessage = (event) => {
  const telemetry = JSON.parse(event.data);
  console.log('Ingested OBD packet:', telemetry);
};`}
                    </pre>
                  </div>
                </div>
              )}

              {activeSection === "auto-routing" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-primary">
                    <Compass className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">ROUTING</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">AI Routing Permutations</h1>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    The routing engine queries real-time traffic speeds, weather events, and historical delivery timelines to resolve optimal dispatcher paths. API responses include detailed route steps and estimated fuel savings.
                  </p>
                </div>
              )}

              {activeSection === "geofencing" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-primary">
                    <ShieldAlert className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">COMPLIANCE</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">Geofence Parameters</h1>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Create custom polygonal geofence alerts. When a truck departs from the defined coordinate perimeter, the gateway triggers a high-priority alert callback via registered webhook targets.
                  </p>
                </div>
              )}

              {/* CLI Console Widget */}
              <div className="h-[1px] bg-foreground/5 my-8" />
              
              <div className="flex flex-col gap-4 select-none">
                <div className="flex items-center gap-2 text-primary">
                  <Terminal className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Interactive Dev Console</span>
                </div>

                <div className="bg-[#0c0c14] border border-foreground/5 p-4 rounded-2xl font-mono text-[11px] text-primary flex flex-col gap-3 h-[250px] overflow-y-auto">
                  <div className="flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-thin">
                    {cliHistory.map((item, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        {item.cmd !== "system" && (
                          <div className="text-foreground/40 font-semibold flex gap-1">
                            <span>$</span>
                            <span>{item.cmd}</span>
                          </div>
                        )}
                        <pre className="text-foreground/85 leading-relaxed whitespace-pre-wrap font-sans">
                          {item.out}
                        </pre>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleCliSubmit} className="flex items-center gap-2 border-t border-foreground/5 pt-3 shrink-0">
                    <span className="text-primary font-bold">$</span>
                    <input
                      type="text"
                      value={cliInput}
                      onChange={(e) => setCliInput(e.target.value)}
                      placeholder="Type command here (e.g. help, status)..."
                      className="flex-1 bg-transparent text-foreground focus:outline-none placeholder-foreground/20 font-mono text-[11px]"
                    />
                  </form>
                </div>
              </div>
            </Card>

          </section>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
