"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Truck, BarChart2, Zap, Settings, ShieldAlert, Navigation as NavIcon, Users, FileText } from "lucide-react";

export default function DashboardMockup() {
  const [activeTab, setActiveTab] = useState("overview");
  const [trucksState, setTrucksState] = useState([
    { id: "T-102", driver: "S. Bennett", route: "NY ➜ BOS", status: "In Transit", speed: "68 mph", fuel: "82%" },
    { id: "T-409", driver: "J. Miller", route: "LA ➜ SFO", status: "Delayed", speed: "12 mph", fuel: "46%" },
    { id: "T-082", driver: "M. Torres", route: "CHI ➜ DET", status: "Completed", speed: "0 mph", fuel: "94%" },
    { id: "T-992", driver: "K. Patel", route: "MIA ➜ ATL", status: "In Transit", speed: "64 mph", fuel: "58%" },
  ]);

  // Telemetry updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTrucksState((prev) =>
        prev.map((truck) => {
          if (truck.status === "In Transit") {
            const currentSpeed = parseInt(truck.speed);
            const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
            return {
              ...truck,
              speed: `${Math.max(55, Math.min(75, currentSpeed + delta))} mph`,
            };
          }
          return truck;
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full glass rounded-2xl shadow-2xl overflow-hidden border border-foreground/10 flex flex-col md:flex-row h-[520px] md:h-[600px] text-xs md:text-sm select-none">
      
      {/* Dashboard Sidebar */}
      <div className="w-full md:w-56 bg-background/40 border-b md:border-b-0 md:border-r border-foreground/5 p-4 flex flex-row md:flex-col justify-between md:justify-start gap-4 overflow-x-auto md:overflow-x-visible shrink-0">
        
        {/* Brand/System Name */}
        <div className="hidden md:flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-primary">
            FL
          </div>
          <div>
            <h4 className="font-bold text-foreground leading-tight">Fleety Cloud</h4>
            <span className="text-[10px] text-foreground/40 font-medium">Enterprise v2.4</span>
          </div>
        </div>

        {/* Navigation Sidebar List */}
        <nav className="flex flex-row md:flex-col gap-1 w-full">
          {[
            { id: "overview", label: "Operations Map", icon: Compass },
            { id: "telemetry", label: "Fleet Telemetry", icon: Truck },
            { id: "analytics", label: "AI Route Analytics", icon: BarChart2 },
            { id: "performance", label: "System Health", icon: Zap },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="hidden md:flex items-center gap-2 mt-auto p-2 rounded-xl bg-foreground/5 border border-foreground/5">
          <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center font-semibold text-primary">
            AD
          </div>
          <div className="overflow-hidden">
            <h5 className="font-semibold text-foreground leading-tight truncate">Austin Drake</h5>
            <span className="text-[9px] text-foreground/40 font-medium block">Global Dispatcher</span>
          </div>
        </div>
      </div>

      {/* Main Panel Content Area */}
      <div className="flex-1 bg-background/20 p-4 md:p-6 flex flex-col gap-4 overflow-y-auto">
        
        {/* Header Widget Panel */}
        <div className="flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-sm md:text-base font-bold text-foreground capitalize">
              {activeTab} Overview
            </h3>
            <span className="text-[10px] md:text-xs text-foreground/50">
              Real-time update: <span className="text-primary font-semibold">Live Feed Connected</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-full text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>248 Trucks Active</span>
            </div>
          </div>
        </div>

        {/* Tab Displays */}
        <div className="flex-1 min-h-0 relative">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB - Live Logistics Map */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col gap-4"
              >
                {/* Stats cards row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
                  {[
                    { label: "Dispatch Rate", val: "99.8%", color: "text-primary" },
                    { label: "AI Route Savings", val: "$42.4K", color: "text-foreground" },
                    { label: "Avg Delivery", val: "22.4 min", color: "text-foreground" },
                    { label: "Fuel Saved", val: "14.2K gal", color: "text-foreground" },
                  ].map((stat, i) => (
                    <div key={i} className="glass rounded-xl p-3 border border-foreground/5">
                      <span className="text-[9px] md:text-[10px] text-foreground/40 font-medium block uppercase tracking-wider">{stat.label}</span>
                      <h4 className={`text-sm md:text-base font-bold ${stat.color} mt-0.5`}>{stat.val}</h4>
                    </div>
                  ))}
                </div>

                {/* Map Vector Graphic */}
                <div className="flex-1 glass rounded-2xl border border-foreground/5 relative overflow-hidden flex items-center justify-center p-4 bg-background/50 min-h-[220px]">
                  {/* SVG Map grid placeholder */}
                  <svg className="absolute inset-0 w-full h-full opacity-[0.04] text-foreground pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>

                  {/* Route Paths & Pinpoints */}
                  <svg viewBox="0 0 600 300" className="w-full h-full max-h-[250px] relative z-10 text-primary">
                    {/* Outline states map */}
                    <path
                      d="M50 100 Q150 50 250 120 T450 80 T550 180"
                      fill="none"
                      stroke="rgba(255,107,0,0.15)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <motion.path
                      d="M50 100 Q150 50 250 120 T450 80 T550 180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeDasharray="12 6"
                      strokeLinecap="round"
                      animate={{ strokeDashoffset: [-18, 0] }}
                      transition={{ ease: "linear", duration: 4, repeat: Infinity }}
                    />
                    
                    {/* Active Blinking Geolocation Markers */}
                    {[
                      { x: 50, y: 100, label: "L.A. Hub" },
                      { x: 200, y: 80, label: "DEN Depot" },
                      { x: 380, y: 110, label: "CHI Center" },
                      { x: 550, y: 180, label: "N.Y. HQ" },
                    ].map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="8" className="fill-primary/20" />
                        <circle cx={pt.x} cy={pt.y} r="4" className="fill-primary animate-pulse" />
                        <text x={pt.x + 8} y={pt.y + 4} fill="currentColor" className="text-[10px] font-bold fill-foreground/60 select-none">{pt.label}</text>
                      </g>
                    ))}

                    {/* Dynamic Moving Truck A (Orange Flare) */}
                    <motion.g
                      animate={{
                        x: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
                        y: [0, -15, -20, -10, 5, 20, 15, 0, -20, -5, 80]
                      }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <circle cx="50" cy="100" r="6" className="fill-primary filter drop-shadow-[0_0_6px_#ff6b00]" />
                      <circle cx="50" cy="100" r="12" className="fill-primary/10 stroke-primary/30 stroke-[0.5] animate-ping" />
                    </motion.g>

                    {/* Dynamic Moving Truck B (Champagne Flare) */}
                    <motion.g
                      animate={{
                        x: [500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 0],
                        y: [80, -5, -20, 0, 15, 20, 5, -10, -20, -15, 0]
                      }}
                      transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                      }}
                    >
                      <circle cx="50" cy="100" r="5" className="fill-secondary filter drop-shadow-[0_0_6px_#e8d5c4]" />
                    </motion.g>
                  </svg>

                  {/* Overlay dynamic logs feed */}
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-foreground/5 text-[9px] text-foreground/50">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                      Dispatch Log: T-102 connected to NY-8 Gateway.
                    </span>
                    <span className="font-mono">Lat: 40.7128° N, Lon: 74.0060° W</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TELEMETRY TAB - Live Telemetry Tickers */}
            {activeTab === "telemetry" && (
              <motion.div
                key="telemetry"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col gap-3"
              >
                <div className="glass rounded-xl border border-foreground/5 p-4 flex-1 flex flex-col justify-start overflow-hidden">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-foreground/5 font-semibold text-foreground/40 text-[10px] uppercase">
                    <span>Truck / Driver</span>
                    <span className="hidden md:inline">Route</span>
                    <span>Avg Speed</span>
                    <span className="hidden md:inline">Fuel Level</span>
                    <span>Status</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
                    {trucksState.map((truck) => (
                      <div
                        key={truck.id}
                        className="flex justify-between items-center py-2 px-2 sm:px-3 bg-foreground/2 rounded-lg hover:bg-foreground/5 transition-colors border border-foreground/5 gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-[9px] shrink-0">
                            TR
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-foreground block truncate">{truck.id}</span>
                            <span className="text-[10px] text-foreground/40 truncate block">{truck.driver}</span>
                          </div>
                        </div>
                        <span className="font-medium text-foreground hidden md:inline shrink-0">{truck.route}</span>
                        <span className="font-mono font-semibold text-primary shrink-0">{truck.speed}</span>
                        <div className="w-16 hidden md:block shrink-0">
                          <div className="flex items-center gap-1.5">
                            <div className="flex-1 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                              <div className="h-full bg-green-400 rounded-full" style={{ width: truck.fuel }} />
                            </div>
                            <span className="text-[9px] font-mono text-foreground/50">{truck.fuel}</span>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border shrink-0 ${
                            truck.status === "In Transit"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : truck.status === "Delayed"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-green-500/10 text-green-400 border-green-500/20"
                          }`}
                        >
                          {truck.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ANALYTICS TAB - Dynamic SVG charts */}
            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col gap-4"
              >
                {/* SVG charts */}
                <div className="glass rounded-xl border border-foreground/5 p-4 flex-1 flex flex-col min-h-[220px]">
                  <h4 className="font-bold text-foreground text-xs md:text-sm mb-4">Route Efficiency Index vs Fuel Saving</h4>
                  <div className="flex-1 relative flex items-end justify-between gap-2 border-b border-l border-foreground/10 px-2 pb-2 h-44">
                    {/* SVG Line path for optimization rate */}
                    <svg className="absolute inset-0 w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <motion.path
                        d="M 5,95 Q 25,60 45,75 T 85,15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </svg>

                    {/* Chart Bars */}
                    {[
                      { day: "Mon", cost: "h-24", saving: "h-8" },
                      { day: "Tue", cost: "h-32", saving: "h-16" },
                      { day: "Wed", cost: "h-28", saving: "h-20" },
                      { day: "Thu", cost: "h-16", saving: "h-36" },
                      { day: "Fri", cost: "h-40", saving: "h-24" },
                      { day: "Sat", cost: "h-20", saving: "h-32" },
                      { day: "Sun", cost: "h-12", saving: "h-44" },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end relative z-10">
                        {/* Cost Bar */}
                        <div className={`w-3 bg-foreground/10 hover:bg-foreground/20 rounded-t-md transition-all ${bar.cost}`} />
                        {/* Saving Bar */}
                        <div className={`w-3 bg-primary/80 hover:bg-primary rounded-t-md transition-all ${bar.saving}`} />
                        <span className="text-[9px] text-foreground/40 font-mono mt-1">{bar.day}</span>
                      </div>
                    ))}
                  </div>

                  {/* Legends */}
                  <div className="flex items-center gap-4 mt-3 text-[10px]">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-foreground/10" />
                      <span className="text-foreground/60">Standard Costs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-primary" />
                      <span className="text-foreground/60">Fleety Saved Fuel</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PERFORMANCE TAB - Health System status */}
            {activeTab === "performance" && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  
                  {/* System latency card */}
                  <div className="glass rounded-xl border border-foreground/5 p-4 flex flex-col gap-2">
                    <h4 className="font-bold text-foreground flex items-center gap-1 text-xs">
                      <Zap className="w-4 h-4 text-primary" /> System Latency
                    </h4>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-2xl font-black text-primary font-mono leading-none">12ms</span>
                        <span className="text-[10px] text-foreground/40 block mt-1 font-medium">Global API Routing</span>
                      </div>
                    </div>
                  </div>

                  {/* Safety Index card */}
                  <div className="glass rounded-xl border border-foreground/5 p-4 flex flex-col gap-2">
                    <h4 className="font-bold text-foreground flex items-center gap-1 text-xs">
                      <ShieldAlert className="w-4 h-4 text-green-400" /> Driver Safety Score
                    </h4>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-2xl font-black text-green-400 font-mono leading-none">98.4%</span>
                        <span className="text-[10px] text-foreground/40 block mt-1 font-medium">Safe Driving Compliance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
