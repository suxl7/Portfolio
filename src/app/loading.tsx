"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const bootLines = [
  "booting sushil.dev",
  "loading modules...",
  "compiling components...",
  "optimizing assets...",
  "establishing secure session...",
];

export default function Loading() {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    // Reveal boot lines one at a time
    const lineTimer = setInterval(() => {
      setVisibleLines((prev) =>
        prev < bootLines.length ? prev + 1 : prev
      );
    }, 260);

    // Progress climbs quickly, then eases and holds near-complete
    // so it never looks "stuck" if the route takes longer to load.
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) return prev;
        const step = prev < 60 ? 6 : prev < 85 ? 2 : 0.5;
        return Math.min(prev + step, 94);
      });
    }, 120);

    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
    };
  }, []);

  const barBlocks = 24;
  const filledBlocks = Math.round((progress / 100) * barBlocks);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05060a] px-4">
      {/* Ambient grid + glow, matching hero visual language */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative w-full max-w-sm"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Monogram — same tile treatment as the hero's terminal card */}
        <div className="mb-6 flex justify-center">
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-3xl font-black text-gradient"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    boxShadow: [
                      "0 0 0px rgba(59,130,246,0)",
                      "0 0 24px rgba(59,130,246,0.35)",
                      "0 0 0px rgba(59,130,246,0)",
                    ],
                  }
            }
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          >
            S
          </motion.div>
        </div>

        {/* Terminal window */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur">
          {/* Chrome bar */}
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-2 font-mono text-[11px] tracking-wide text-zinc-500">
              sushil.dev — boot
            </span>
          </div>

          {/* Boot log */}
          <div className="space-y-1.5 px-4 py-4 font-mono text-[12px] text-zinc-400">
            {bootLines.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{
                  opacity: i < visibleLines ? 1 : 0,
                  x: i < visibleLines ? 0 : -6,
                }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2"
              >
                <span className="text-emerald-400/80">$</span>
                <span>{line}</span>
              </motion.div>
            ))}
            {visibleLines >= bootLines.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 pt-0.5 text-blue-300/90"
              >
                <span className="text-emerald-400/80">$</span>
                <span>ready</span>
                {!shouldReduceMotion && (
                  <motion.span
                    className="inline-block h-3 w-[6px] bg-blue-300/80"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  />
                )}
              </motion.div>
            )}
          </div>

          {/* Progress bar */}
          <div className="border-t border-white/10 px-4 py-3">
            <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] text-zinc-500">
              <span>loading assets</span>
              <span className="text-zinc-400">{Math.floor(progress)}%</span>
            </div>
            <div className="font-mono text-[11px] leading-none tracking-[1px] text-blue-400/90">
              {"█".repeat(filledBlocks)}
              <span className="text-zinc-700">
                {"░".repeat(barBlocks - filledBlocks)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}