import React, { useRef } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: boolean;
  animateReveal?: boolean;
}

export default function Card({
  children,
  className = "",
  hoverScale = true,
  animateReveal = true,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (!tickingRef.current) {
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          cardRef.current.style.setProperty("--mouse-x", `${x}px`);
          cardRef.current.style.setProperty("--mouse-y", `${y}px`);
        }
        tickingRef.current = false;
      });
    }
  };

  const Component = animateReveal ? motion.div : "div";
  const motionProps = animateReveal
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: "easeOut" } as any,
      }
    : {};

  const classes = className.split(/\s+/);
  const innerClasses: string[] = [];
  const outerClasses: string[] = [];

  classes.forEach((cls) => {
    if (!cls) return;
    const isLayout =
      cls.includes("flex") ||
      cls.includes("grid") ||
      cls.startsWith("items-") ||
      cls.startsWith("justify-") ||
      cls.startsWith("gap-") ||
      cls.startsWith("text-") ||
      cls.includes(":flex") ||
      cls.includes(":grid") ||
      cls.includes(":items-") ||
      cls.includes(":justify-") ||
      cls.includes(":gap-") ||
      cls.includes(":text-");

    if (isLayout) {
      innerClasses.push(cls);
    } else {
      outerClasses.push(cls);
    }
  });

  const hasDisplayClass = innerClasses.some(
    (cls) =>
      cls === "flex" ||
      cls === "grid" ||
      cls.includes(":flex") ||
      cls.includes(":grid")
  );
  const defaultInnerLayout = hasDisplayClass ? "" : "flex flex-col";

  return (
    <Component
      {...motionProps}
      ref={cardRef as any}
      onMouseMove={handleMouseMove}
      className={`glow-card glass rounded-3xl p-6 md:p-8 hover:border-primary/20 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(255,107,0,0.04)] flex flex-col ${
        hoverScale ? "hover:-translate-y-1" : ""
      } ${outerClasses.join(" ")}`}
    >
      <div
        className={`relative z-10 w-full flex-1 ${defaultInnerLayout} ${innerClasses.join(
          " "
        )}`}
      >
        {children}
      </div>
    </Component>
  );
}
