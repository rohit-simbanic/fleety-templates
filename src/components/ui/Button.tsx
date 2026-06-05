import React from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-full overflow-hidden transition-all duration-300 active:scale-95 cursor-pointer focus:outline-none tracking-wide text-xs md:text-sm";
  
  const variantStyles = {
    primary: "bg-primary text-white shadow-[0_4px_20px_rgba(255,107,0,0.25)] hover:shadow-[0_6px_25px_rgba(255,107,0,0.45)] hover:scale-[1.03]",
    secondary: "bg-foreground text-background hover:bg-opacity-90 hover:scale-[1.03]",
    outline: "bg-glass border border-foreground/10 text-foreground hover:bg-foreground/5 hover:border-foreground/20",
    ghost: "text-foreground hover:bg-foreground/5"
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props as any}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
