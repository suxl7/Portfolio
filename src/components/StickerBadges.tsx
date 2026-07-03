"use client";

import { motion } from "framer-motion";

interface StickerProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  rotation?: number;
  delay?: number;
  variant?: "default" | "accent" | "success" | "warning";
}

const variants = {
  default: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100",
  accent: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  success: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300",
  warning: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300",
};

export function Sticker({ children, text, className = "", rotation = 0, delay = 0, variant = "default" }: StickerProps) {
  return (
    <motion.div
      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 shadow-lg ${variants[variant]} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100, damping: 10 }}
      whileHover={{ scale: 1.05, rotate: rotation + 3, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700 opacity-50" />
      <span className="text-sm font-semibold tracking-wide">{children || text}</span>
    </motion.div>
  );
}

export function StickerGroup() {
  const stickers = [
    { text: "Open Source", rotation: -5, delay: 0.1, variant: "accent" as const },
    { text: "Full Stack", rotation: 3, delay: 0.2, variant: "success" as const },
    { text: "TypeScript", rotation: -2, delay: 0.3, variant: "default" as const },
    { text: "React & Next.js", rotation: 4, delay: 0.4, variant: "accent" as const },
    { text: "AWS & Docker", rotation: -4, delay: 0.5, variant: "warning" as const },
    { text: "100% Remote", rotation: 2, delay: 0.6, variant: "success" as const },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {stickers.map((sticker, i) => (
        <Sticker key={i} text={sticker.text} rotation={sticker.rotation} delay={sticker.delay} variant={sticker.variant} />
      ))}
    </div>
  );
}

export function FloatingSticker({ children, className = "", x, y, rotation, delay, variant, ...props }: { children: React.ReactNode; className?: string; x?: string | number; y?: string | number; rotation?: number; delay?: number; variant?: "default" | "accent" | "success" | "warning" }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{ duration: 3, delay: delay || 0, repeat: Infinity, ease: "easeInOut" }}
    >
      <Sticker rotation={rotation} delay={delay} variant={variant} {...props}>
        {children}
      </Sticker>
    </motion.div>
  );
}