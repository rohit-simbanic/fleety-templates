"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import Button from "./Button";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show consent banner after a short delay for dynamic entry effect
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full mx-auto sm:mx-0"
        >
          <div className="glass bg-background/90 border border-foreground/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
            {/* Ambient orange glow inside the banner */}
            <div className="absolute top-[-30%] right-[-30%] w-24 h-24 bg-primary/10 rounded-full filter blur-xl pointer-events-none" />
            
            <div className="flex items-start gap-3 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-foreground">Cookie Consent</h4>
                <p className="text-[11px] text-foreground/60 leading-relaxed mt-1">
                  We use cookies to optimize routing telemetry, map dispatch sessions, and analyze platform capacity.
                </p>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-foreground/40 hover:text-foreground transition-colors focus:outline-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2.5 justify-end relative z-10">
              <Button 
                onClick={handleDecline}
                variant="ghost" 
                className="py-1.5 px-3 text-[10px] h-auto border border-foreground/5 hover:border-foreground/10"
              >
                Decline
              </Button>
              <Button 
                onClick={handleAccept}
                variant="primary" 
                className="py-1.5 px-3.5 text-[10px] h-auto font-semibold"
              >
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
