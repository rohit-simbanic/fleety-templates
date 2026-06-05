import React from "react";

interface MarqueeProps {
  children?: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
}

export default function Marquee({
  children,
  speed = 40,
  pauseOnHover = true,
}: MarqueeProps) {
  // Premium default client SVGs that feel modern and clean
  const defaultLogos = [
    { name: "Acme Fleet", code: "ACME" },
    { name: "Apex Dispatch", code: "APEX" },
    { name: "LogiCargo", code: "LCG" },
    { name: "Vanguard", code: "VNG" },
    { name: "SwiftMove", code: "SWFT" },
    { name: "TransitGo", code: "TRGO" },
    { name: "GlobalRoute", code: "GLRT" },
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 opacity-50 hover:opacity-85 transition-opacity duration-300">
      {/* Gradients to mask edges */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className={`flex w-max animate-marquee ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}>
        {/* Render twice for continuous loop */}
        <div className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
          {children ? children : defaultLogos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-foreground font-semibold text-sm md:text-lg tracking-wider"
            >
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-foreground/10 border border-foreground/20 flex items-center justify-center font-extrabold text-[10px] md:text-xs text-primary">
                {logo.code.substring(0, 2)}
              </div>
              <span>{logo.name}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
          {children ? children : defaultLogos.map((logo, idx) => (
            <div
              key={`dup-${idx}`}
              className="flex items-center gap-2 text-foreground font-semibold text-sm md:text-lg tracking-wider"
            >
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-foreground/10 border border-foreground/20 flex items-center justify-center font-extrabold text-[10px] md:text-xs text-primary">
                {logo.code.substring(0, 2)}
              </div>
              <span>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
