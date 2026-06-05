"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Mail, Lock, User, Building } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [fleetSize, setFleetSize] = useState("10-50");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground flex items-center justify-center p-6 overflow-hidden">
      
      {/* Background spotlights */}
      <div className="spotlight top-[-20%] left-[-10%] opacity-60" />
      <div className="spotlight-champagne bottom-[-20%] right-[-10%] opacity-55" />

      {/* Floating ThemeToggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Back to Home action */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/" className="flex items-center gap-1.5 text-xs text-foreground/50 hover:text-primary transition-colors font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10 py-10">
        
        {/* Logo brand */}
        <div className="flex items-center gap-2 mb-8 justify-center select-none">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center font-black text-white text-base">
            F
          </div>
          <span className="font-extrabold text-foreground tracking-wider text-base md:text-lg">
            fleety
          </span>
        </div>

        <Card className="p-8 border-foreground/5 bg-background/50 relative">
          
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Sandbox Created</h3>
              <p className="text-xs text-foreground/60 leading-relaxed max-w-xs mx-auto">
                Thank you! Your active dispatcher sandbox is configured. Syncing vehicle nodes...
              </p>
              <Link href="/admin" className="w-full mt-4">
                <Button variant="primary" className="w-full py-3">
                  Open Operations Dashboard
                </Button>
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="text-center mb-2">
                <h2 className="text-xl md:text-2xl font-black text-foreground">Create Sandbox</h2>
                <span className="text-xs text-foreground/50 block mt-1">Configure up to 5 vehicle gateways free</span>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-foreground/50 uppercase">Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2.5 pl-10 pr-4 rounded-xl text-xs md:text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-foreground/50 uppercase">Corporate Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    className="w-full bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2.5 pl-10 pr-4 rounded-xl text-xs md:text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-foreground/50 uppercase">Company Name</label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Global Transit Inc."
                    className="w-full bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2.5 pl-10 pr-4 rounded-xl text-xs md:text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Fleet Size */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-foreground/50 uppercase">Fleet Size</label>
                <select
                  value={fleetSize}
                  onChange={(e) => setFleetSize(e.target.value)}
                  className="w-full bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2.5 px-3.5 rounded-xl text-xs md:text-sm focus:outline-none transition-colors"
                >
                  <option className="bg-background" value="1-9">1-9 vehicles</option>
                  <option className="bg-background" value="10-50">10-50 vehicles</option>
                  <option className="bg-background" value="51-200">51-200 vehicles</option>
                  <option className="bg-background" value="200+">200+ heavy-duty fleets</option>
                </select>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-foreground/50 uppercase">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2.5 pl-10 pr-4 rounded-xl text-xs md:text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full py-3.5 mt-2">
                Create Free Account
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Button>

              {/* Google Button */}
              <button
                type="button"
                onClick={() => setSuccess(true)}
                className="w-full bg-foreground/3 border border-foreground/5 hover:bg-foreground/5 text-foreground font-semibold py-3 px-4 rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors focus:outline-none"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="text-center text-xs text-foreground/50 mt-2 font-medium">
                <span>Already have a sandbox? </span>
                <Link href="/login" className="text-primary hover:underline font-bold">Sign In</Link>
              </div>

            </form>
          )}

        </Card>
      </div>
    </main>
  );
}
