"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

import {
  useEffect,
  useRef,
} from "react";

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
  const ref = useRef(null);

  const isInView = useInView(ref, {
    amount: 0.5,
    once: false,
  });

  const count = useMotionValue(0);

  const rounded = useTransform(count, (latest) =>
    Math.round(latest)
  );

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 1.8,
        ease: "easeOut",
      });

      return controls.stop;
    } else {
      count.set(0);
    }
  }, [count, isInView, value]);

  return (
    <motion.div
      ref={ref}
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

      <div className="relative rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl p-6 transition-all duration-300 group-hover:border-blue-500/40 shadow-[0_1px_4px_rgba(15,23,42,0.06)] dark:shadow-none">

        <motion.h3
          className="text-3xl font-black text-blue-600 dark:text-blue-400"
        >
          <motion.span>{rounded}</motion.span>
          {suffix}
        </motion.h3>

        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {label}
        </p>
      </div>
    </motion.div>
  );
}