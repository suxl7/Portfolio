"use client";

import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";

interface ProfileLogoProps {
  progress: MotionValue<number>;
  variant: "hero" | "navbar";
}

export function ProfileLogo({ progress, variant }: ProfileLogoProps) {
  const isHero = variant === "hero";
  const size = isHero ? 28 : 42;

  const opacity = useTransform(progress, [0, 1], isHero ? [1, 0] : [0, 1]);
  const scale = useTransform(progress, [0, 1], isHero ? [1, 0.85] : [0.85, 1]);
  const glowOpacity = useTransform(progress, [0, 1], isHero ? [0.6, 0] : [0, 0.35]);

  return (
    <motion.span
      className="relative inline-flex shrink-0"
      style={{ width: size, height: size, opacity, scale }}
      aria-hidden={!isHero}
    >
      {/* glow */}
      <motion.span
        className={`absolute -inset-1 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 blur-md ${
          isHero ? "animate-glow-pulse" : ""
        }`}
        style={{ opacity: glowOpacity }}
        aria-hidden="true"
      />

      {/* avatar */}
      <Image
        src="/images/profile.jpg"
        alt="Sushil"
        fill
        sizes={`${size}px`}
        className={`relative rounded-full object-cover ring-2 ${
          isHero
            ? "ring-white/80 dark:ring-zinc-900/80"
            : "ring-white/50 dark:ring-zinc-900/60"
        }`}
      />
    </motion.span>
  );
}