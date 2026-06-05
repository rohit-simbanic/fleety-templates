"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown, Compass, Truck, ShieldAlert, Sparkles, Cpu, Layers } from "lucide-react";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { NAV_LINKS, DEMO_LINKS } from "@/lib/constants";

const demoIcons = [Sparkles, Cpu, Layers, ShieldAlert];


export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDemosOpen, setIsDemosOpen] = useState(false);
  const pathname = usePathname();

  // Detect scroll offset to update backdrop filters
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [isOpen]);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsDemosOpen(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsDemosOpen(false);
    }, 150);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const navLinks = NAV_LINKS;


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? "py-3 md:py-4 px-4 md:px-8"
            : "bg-transparent py-5 md:py-6 px-6 md:px-12"
        }`}
      >
        <div
          className={`mx-auto flex justify-between items-center transition-all duration-500 relative ${
            scrolled && !isOpen
              ? "max-w-5xl bg-background/65 backdrop-blur-xl border border-foreground/5 shadow-[0_12px_40px_rgba(0,0,0,0.2)] rounded-full px-6 py-2.5 md:py-3"
              : "max-w-7xl w-full"
          }`}
        >
          
          {/* Logo container */}
          <Link href="/" className="flex items-center gap-2 relative z-50">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center font-black text-white text-base">
              F
            </div>
            <span className="font-extrabold text-foreground tracking-wider text-base md:text-lg">
              fleety
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.hasMega) {
                return (
                  <div
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className="flex items-center gap-1 text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground transition-colors cursor-pointer focus:outline-none"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDemosOpen ? 'rotate-180 text-primary' : ''}`} />
                    </button>
                  </div>
                );
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors ${
                    isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth and Theme Toggles */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary">
                Get Started
                <ArrowUpRight className="w-4 h-4 ml-0.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Buttons Area */}
          <div className="flex lg:hidden items-center gap-3 relative z-50">
            <ThemeToggle />
            
            {/* Hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mega Menu Dropdown */}
          <AnimatePresence>
            {isDemosOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 mt-3 bg-background/95 backdrop-blur-2xl border border-foreground/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl p-8 z-50 grid grid-cols-12 gap-8 hidden lg:grid"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Invisible hover bridge to prevent menu closing due to top-margin gap */}
                <div className="absolute top-[-16px] left-0 right-0 h-[16px] bg-transparent" />
                {/* Column 1: Demos (5-cols) */}
                <div className="col-span-5 flex flex-col gap-4 border-r border-foreground/5 pr-6">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Homepage Layout Demos</span>
                  <div className="flex flex-col gap-2">
                    {DEMO_LINKS.map((demo, idx) => {
                      const Icon = demoIcons[idx] || Sparkles;
                      return (
                        <Link
                          key={idx}
                          href={demo.href}
                          onClick={() => setIsDemosOpen(false)}
                          className="group flex gap-3 p-2 rounded-xl hover:bg-foreground/5 border border-transparent hover:border-foreground/5 transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                              {demo.name}
                              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </h4>
                            <p className="text-[10px] text-foreground/50 leading-relaxed mt-0.5">{demo.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Column 2: Capabilities (4-cols) */}
                <div className="col-span-4 flex flex-col gap-4 border-r border-foreground/5 pr-6">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Core Capabilities</span>
                  <div className="flex flex-col gap-3 mt-1">
                    {[
                      { name: "AI Auto-Routing", desc: "Dynamic traffic & weather dispatch mapping.", icon: Compass, href: "/features" },
                      { name: "Live OBD Telemetry", desc: "Sub-second vehicle CAN-bus diagnostics.", icon: Truck, href: "/features" },
                      { name: "Asset Shield Geofencing", desc: "Precise cargo parameters and diagnostic lockdown.", icon: ShieldAlert, href: "/features" }
                    ].map((cap, idx) => {
                      const Icon = cap.icon;
                      return (
                        <Link
                          key={idx}
                          href={cap.href}
                          onClick={() => setIsDemosOpen(false)}
                          className="group flex items-start gap-2.5"
                        >
                          <Icon className="w-4 h-4 text-foreground/60 group-hover:text-primary transition-colors mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors block">{cap.name}</span>
                            <span className="text-[11px] text-foreground/40 block mt-0.5 leading-snug">{cap.desc}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Column 3: Highlight card (3-cols) */}
                <div className="col-span-3 flex flex-col gap-3 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-5 rounded-2xl relative overflow-hidden justify-between">
                  <div className="absolute top-[-20%] right-[-20%] w-24 h-24 bg-primary/25 rounded-full filter blur-2xl -z-10 pointer-events-none" />
                  <div className="flex flex-col gap-2">
                    <span className="bg-primary/25 border border-primary/30 text-[9px] font-bold px-2 py-0.5 rounded-full text-primary w-fit uppercase tracking-wider">Release v2.4</span>
                    <h4 className="text-xs font-extrabold text-foreground leading-snug mt-1">Fleety WebSockets API</h4>
                    <p className="text-[10px] text-foreground/60 leading-relaxed">
                      Integrate live CAN-bus metrics and driver coordinates under 10ms directly into your warehouse systems.
                    </p>
                  </div>
                  <Link
                    href="/docs"
                    onClick={() => setIsDemosOpen(false)}
                    className="text-primary font-bold text-xs flex items-center gap-1 group mt-2"
                  >
                    <span>Read Release Docs</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>

      {/* Mobile Glass Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:px-16"
          >
            <nav className="flex flex-col gap-6 mt-16 overflow-y-auto max-h-[60vh] py-4">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                if (link.hasMega) {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex flex-col gap-2"
                    >
                      <span className="text-xs font-bold text-primary uppercase tracking-widest block">Demos</span>
                      <div className="flex flex-col gap-4 pl-4 border-l border-foreground/5">
                        <Link
                          onClick={() => setIsOpen(false)}
                          href="/"
                          className={`text-lg font-bold block ${pathname === "/" ? "text-primary" : "text-foreground/60"}`}
                        >
                          AI Dispatch Hub
                        </Link>
                        <Link
                          onClick={() => setIsOpen(false)}
                          href="/demo-telematics"
                          className={`text-lg font-bold block ${pathname === "/demo-telematics" ? "text-primary" : "text-foreground/60"}`}
                        >
                          Enterprise Telematics
                        </Link>
                        <Link
                          onClick={() => setIsOpen(false)}
                          href="/demo-logistics"
                          className={`text-lg font-bold block ${pathname === "/demo-logistics" ? "text-primary" : "text-foreground/60"}`}
                        >
                          Logistics Operations
                        </Link>
                        <Link
                          onClick={() => setIsOpen(false)}
                          href="/demo-safety"
                          className={`text-lg font-bold block ${pathname === "/demo-safety" ? "text-primary" : "text-foreground/60"}`}
                        >
                          Driver Safety & Compliance
                        </Link>
                      </div>
                    </motion.div>
                  );
                }
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      onClick={() => setIsOpen(false)}
                      href={link.href}
                      className={`text-2xl md:text-3xl font-bold tracking-tight block ${
                        isActive ? "text-primary" : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-[1px] bg-foreground/10 my-6 w-full"
            />

            {/* Mobile Auth actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col gap-4"
            >
              <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                <Button variant="outline" className="w-full py-4 text-base">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="w-full">
                <Button variant="primary" className="w-full py-4 text-base">
                  Get Started for Free
                  <ArrowUpRight className="w-4.5 h-4.5 ml-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}