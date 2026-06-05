"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Calligraphy from "@/components/ui/Calligraphy";
import { BLOG_ARTICLES } from "@/lib/constants";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "telematics", "routing", "security"];

  const articles = BLOG_ARTICLES;

  const filteredArticles = activeCategory === "all"
    ? articles
    : articles.filter((art) => art.category === activeCategory);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* Background spotlights */}
      <div className="spotlight top-[-10%] right-[10%] opacity-60" />
      <div className="spotlight-champagne bottom-[20%] left-[5%] opacity-40" />

      {/* Navigation */}
      <Navigation />

      {/* 1. HERO HEADER */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-6">
        <span className="text-primary font-bold text-xs uppercase tracking-widest">LOGISTICS JOURNAL</span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground text-glow max-w-3xl">
          Deep telemetry research and <Calligraphy>logistics</Calligraphy> advice
        </h1>
        <p className="text-sm md:text-base text-foreground/60 max-w-xl mx-auto">
          Keep your dispatchers and fleet administrators updated with our telemetry guides and AI auto-routing blueprints.
        </p>

        {/* Category sorting tabs selector */}
        <div className="flex items-center gap-2 bg-foreground/5 border border-foreground/5 p-1 rounded-full mt-6 select-none relative z-10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all capitalize cursor-pointer ${
                activeCategory === cat ? "bg-primary text-white shadow-md" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2. ARTICLES INDEX GRID */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch min-h-[300px]">
          <AnimatePresence mode="wait">
            {filteredArticles.map((art, idx) => (
              <motion.div
                key={art.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Card className="flex flex-col justify-between h-full p-8 border-foreground/5 bg-background/50 hover:border-primary/20">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center text-[10px] text-foreground/40 font-mono">
                      <span className="bg-primary/10 text-primary border border-primary/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {art.category}
                      </span>
                      <span>{art.date}</span>
                    </div>

                    <h3 className="font-extrabold text-base md:text-lg text-foreground hover:text-primary transition-colors mt-2">
                      {art.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">
                      {art.desc}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-foreground/5 text-xs">
                    <span className="flex items-center gap-1 text-foreground/40 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                    </span>
                    
                    <Link
                      href={`/blog/${art.slug}`}
                      className="text-primary font-semibold flex items-center gap-1 group cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. NEWSLETTER */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 mb-16 relative">
        <Card className="text-center p-8 md:p-12 flex flex-col items-center gap-4 max-w-3xl mx-auto border-foreground/5">
          <BookOpen className="w-8 h-8 text-primary" />
          <h3 className="font-extrabold text-lg md:text-xl text-foreground">Subscribe to Telematics Monthly</h3>
          <p className="text-xs text-foreground/50 max-w-sm">
            Join 4,200+ fleet owners, dispatcher heads, and logistics managers who receive our weekly routing guides.
          </p>
          <div className="flex items-center gap-2 mt-2 w-full max-w-sm">
            <input
              type="email"
              placeholder="dispatch@company.com"
              className="flex-1 bg-foreground/3 border border-foreground/5 hover:border-foreground/10 focus:border-primary/50 text-foreground py-2 py-3 px-3.5 rounded-xl text-xs md:text-sm focus:outline-none transition-colors"
            />
            <Button variant="primary" className="py-3 text-xs md:text-sm">Subscribe</Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
