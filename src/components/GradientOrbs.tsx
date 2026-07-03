"use client";

import { motion } from "framer-motion";

export function GradientOrbs() {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle at 30% 30%, #3b82f6, #8b5cf6, transparent 70%)" }}
        animate={{
          x: [-100, 100, -100],
          y: [-50, 80, -50],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle at 70% 70%, #ec4899, #f59e0b, transparent 70%)" }}
        animate={{
          x: [80, -80, 80],
          y: [60, -60, 60],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle at 50% 50%, #06b6d4, #8b5cf6, transparent 70%)" }}
        animate={{
          x: [-60, 60, -60],
          y: [-80, 40, -80],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute top-20 right-20 w-[200px] h-[200px] rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle at 50% 50%, #f59e0b, #ec4899, transparent 70%)" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-[180px] h-[180px] rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle at 50% 50%, #3b82f6, #06b6d4, transparent 70%)" }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
}