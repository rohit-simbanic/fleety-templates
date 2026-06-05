'use client';

import { useTheme } from '@/lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full glass border border-white/10 opacity-0" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-10 h-10 rounded-full glass flex items-center justify-center border transition-all duration-300 shadow-lg overflow-hidden group focus:outline-none shrink-0 ${
        isDark 
          ? 'border-white/5 hover:border-primary/50 text-foreground/80 hover:text-primary bg-white/3' 
          : 'border-black/5 hover:border-primary bg-black/3 text-foreground/80 hover:text-primary'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? 'Day Mode' : 'Night Mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.svg
              key="moon"
              className="w-4.5 h-4.5 drop-shadow-[0_0_8px_rgba(255,107,0,0.4)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,107,0,0.4)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
