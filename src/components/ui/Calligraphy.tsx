import React from "react";

interface CalligraphyProps {
  children: React.ReactNode;
  className?: string;
}

export default function Calligraphy({ children, className = "" }: CalligraphyProps) {
  return (
    <span
      className={`font-script text-primary lowercase inline-block px-1 select-none font-normal text-[1.25em] leading-[0] tracking-normal translate-y-[0.08em] ${className}`}
    >
      {children}
    </span>
  );
}
