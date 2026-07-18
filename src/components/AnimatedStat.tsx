"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function AnimatedStat({
  value,
  suffix = "",
  label,
}: AnimatedStatProps) {
  const ref = useRef<HTMLElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);
  const shouldReduce = useReducedMotion();

  const isInView = useInView(ref, {
    amount: 0.5,
    once: false,
  });

  // rAF-driven counter that updates DOM directly for smoothness on low-end devices
  useEffect(() => {
    if (!numRef.current) return;
    let rafId: number | null = null;
    let start: number | null = null;
    const duration = shouldReduce ? 300 : 1200; // shorter when reduced motion

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    // Full rAF loop for 60fps updates; minimize layout by using tabular digits
    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const current = Math.round(eased * value);

      // update DOM every frame
      numRef.current!.textContent = String(current) + (suffix || "");

      if (t < 1) {
        rafId = requestAnimationFrame(step);
      }
    }

    if (isInView) {
      rafId = requestAnimationFrame(step);
    } else {
      numRef.current.textContent = "0" + (suffix || "");
      if (rafId) cancelAnimationFrame(rafId);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isInView, value, suffix, shouldReduce]);

  return (
    <motion.div
      ref={ref as any}
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.5,
      }}
      transition={{
      type:"spring",
      stiffness:220,
      damping:18,
      }}
     whileHover={{
     y:-6,
     scale:1.04,
     rotateX:6,
     }}
      className="group relative overflow-hidden rounded-2xl"
    >
      {/* Glow */}

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60" />

      {/* Card */}

      <div className="relative rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 sm:backdrop-blur-xl sm:bg-white/80 sm:dark:bg-zinc-900/70 p-6 transition-all duration-300 group-hover:border-blue-500/40 shadow-[0_1px_4px_rgba(15,23,42,0.06)] dark:shadow-none">

        <motion.h3 className="text-3xl font-black text-blue-600 dark:text-blue-400">
          <span
            ref={numRef}
            style={{
              display: "inline-block",
              minWidth: `${String(value).length}ch`,
              fontVariantNumeric: "tabular-nums",
              transform: "translateZ(0)",
              contain: "paint",
            }}
          />
        </motion.h3>

        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {label}
        </p>
      </div>
    </motion.div>
  );
}