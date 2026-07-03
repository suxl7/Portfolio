"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let progressValue = 0;
    
    const interval = setInterval(() => {
      if (cancelled) return;
      
      progressValue += Math.random() * 15 + 10;
      if (progressValue >= 100) {
        progressValue = 100;
        clearInterval(interval);
        if (!cancelled) {
          setTimeout(() => setLoading(false), 200);
        }
      }
      setProgress(progressValue);
    }, 60);

    // Safety timeout - force hide after 3 seconds max
    const safetyTimeout = setTimeout(() => {
      if (!cancelled) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 3000);

    return () => {
      cancelled = true;
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#03030a]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Animated rings */}
          <div className="relative w-32 h-32 mb-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-blue-500/30"
                style={{ inset: `${i * 12}px` }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/40"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-white font-bold text-lg">S</span>
              </motion.div>
            </div>
          </div>

          <motion.p
            className="text-zinc-400 text-sm font-medium mb-6 tracking-widest uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Portfolio
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-zinc-600 text-xs mt-2">{Math.min(Math.round(progress), 100)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
