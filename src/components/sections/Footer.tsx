"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = FOOTER_LINKS;

  const socialIcons = [TwitterIcon, LinkedinIcon, InstagramIcon, FacebookIcon];
  const socials = SOCIAL_LINKS.map((social, idx) => ({
    icon: socialIcons[idx] || TwitterIcon,
    href: social.href,
  }));


  return (
    <footer className="relative bg-background/50 border-t border-foreground/5 pt-20 pb-10 overflow-hidden">
      
      {/* Background spotlights */}
      <div className="spotlight bottom-0 right-[10%] opacity-40" />
      <div className="spotlight-champagne bottom-[10%] left-[5%] opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16 relative z-10">
        
        {/* Left Branding Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center font-black text-white text-base">
              F
            </div>
            <span className="font-extrabold text-foreground tracking-wider text-base md:text-lg">
              fleety
            </span>
          </Link>
          
          <p className="text-sm text-foreground/60 leading-relaxed max-w-sm">
            Driven by strategy. Powered by AI. Re-defining dispatch automation, telemetry collection, and freight logistics for smart businesses globally.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4 text-foreground/50">
            {socials.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-pointer"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h4 className="font-bold text-foreground text-sm tracking-wider uppercase mb-6">Product</h4>
          <ul className="flex flex-col gap-4">
            {footerLinks.product.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-foreground text-sm tracking-wider uppercase mb-6">Resources</h4>
          <ul className="flex flex-col gap-4">
            {footerLinks.resources.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-foreground text-sm tracking-wider uppercase mb-6">Company</h4>
          <ul className="flex flex-col gap-4">
            {footerLinks.company.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right CTA / Newsletter Column */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <h4 className="font-bold text-foreground text-sm tracking-wider uppercase">Join Dispatch</h4>
          <p className="text-xs text-foreground/50 leading-relaxed">
            Sign up for the latest AI route telemetry and fleet news.
          </p>
          <Link href="/register" className="w-full">
            <Button variant="outline" className="w-full justify-between py-3">
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="h-[1px] bg-foreground/5 w-full mb-8" />
        
        {/* Bottom footer row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-foreground/40 font-mono">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>© {currentYear} Fleety Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-foreground/40 font-medium">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/docs" className="hover:text-primary transition-colors">Security Audit</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}