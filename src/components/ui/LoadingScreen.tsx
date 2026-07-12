"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const LABEL_STATES = ["INITIALIZING", "COMPILING", "OPTIMIZING", "READY"];

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    let finishTimeout: ReturnType<typeof setTimeout> | undefined;
    let progressValue = 0;

    const finish = () => {
      if (!cancelled) setLoading(false);
    };

    const interval = setInterval(() => {
      if (cancelled) return;

      progressValue = Math.min(progressValue + Math.random() * 15 + 10, 100);
      setProgress(progressValue);

      if (progressValue >= 100) {
        clearInterval(interval);
        finishTimeout = setTimeout(finish, 300);
      }
    }, 60);

    const safetyTimeout = setTimeout(finish, 2500);

    return () => {
      cancelled = true;
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      if (finishTimeout) clearTimeout(finishTimeout);
    };
  }, []);

  const pct = Math.min(Math.round(progress), 100);
  const labelIndex = Math.min(
    Math.floor((pct / 100) * LABEL_STATES.length),
    LABEL_STATES.length - 1
  );

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05060a] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            y: shouldReduceMotion ? 0 : "-100%",
            opacity: shouldReduceMotion ? 0 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient field — same language as hero/loading.tsx */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:36px_36px]" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center px-6">
            {/* Kinetic wordmark — ghost outline + progress-clipped gradient fill */}
            <div className="relative select-none">
              <span
                aria-hidden="true"
                className="block font-black text-6xl sm:text-7xl tracking-tight text-white/[0.06]"
              >
                SUSHIL
              </span>
              <span
                className="absolute inset-0 block font-black text-6xl sm:text-7xl tracking-tight text-gradient"
                style={{
                  clipPath: `inset(0 ${100 - pct}% 0 0)`,
                  transition: "clip-path 80ms linear",
                }}
              >
                SUSHIL
              </span>
              {!shouldReduceMotion && pct < 100 && (
                <motion.span
                  className="absolute top-0 h-full w-[2px] bg-blue-300/90"
                  style={{ left: `${pct}%` }}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </div>

            {/* Status label */}
            <motion.p
              key={labelIndex}
              className="mt-6 font-mono text-[11px] tracking-[0.35em] text-zinc-500"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {LABEL_STATES[labelIndex]}
            </motion.p>

            {/* Progress line */}
            <div className="relative mt-8 h-px w-56 bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400"
                style={{ width: `${pct}%` }}
                transition={{ duration: 0.08, ease: "linear" }}
              />
              <div
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_2px_rgba(103,232,249,0.6)]"
                style={{ left: `calc(${pct}% - 3px)` }}
              />
            </div>

            <p className="mt-3 font-mono text-xs tabular-nums text-zinc-600">
              {pct}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}