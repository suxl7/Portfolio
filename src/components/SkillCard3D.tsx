"use client";

import Image from "next/image";
import { memo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface SkillCard3DProps {
  title: string;
  description: string;
  skills: string[];
  color: string;
  icon: React.ReactNode | string;
  index: number;
}

export const SkillCard3D = memo(function SkillCard3D({
  title,
  description,
  skills,
  color,
  icon,
  index,
}: SkillCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);


  // Raw pointer position within the card (px)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth, physical tilt — not linear, not instant
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), {
    stiffness: 220,
    damping: 20,
    mass: 0.6,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), {
    stiffness: 220,
    damping: 20,
    mass: 0.6,
  });

  // Spotlight position (percent) for the radial glow following the cursor
  const spotX = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotY = useTransform(mouseY, (v) => `${v * 100}%`);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  

  return (
    <motion.div
      style={{ perspective: 1200 }}
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/80 p-6 shadow-sm motion-reduce:transform-none dark:border-white/[0.08] dark:bg-white/[0.03]"
      >
        {/* Animated gradient border ring — the card's signature detail */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl motion-reduce:hidden"
          style={{
            padding: 1,
            background: `linear-gradient(115deg, ${color}00, ${color}90, ${color}00)`,
            backgroundSize: "200% 200%",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          animate={hovered ? { backgroundPosition: ["0% 50%", "200% 50%"], opacity: 1 } : { opacity: 0 }}
          transition={{ backgroundPosition: { duration: 1.6, ease: "linear", repeat: Infinity }, opacity: { duration: 0.25 } }}
        />

        {/* Cursor-tracked spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 motion-reduce:hidden"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(320px circle at ${spotX} ${spotY}, ${color}18, transparent 65%)`,
          }}
        />

        {/* Fine grain top sheen for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        />

        <div className="relative z-10 flex h-full flex-col gap-5" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center justify-between">
            <motion.div
              className="flex h-14 w-14 items-center justify-center rounded-xl overflow-hidden"
              style={{}}
              animate={hovered ? { rotate: [0, -6, 6, 0], scale: 1.06 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {typeof icon === "string" ? (
                <Image src={icon} alt="skill icon" width={56} height={56} className="h-full w-full object-cover rounded-lg" />
              ) : (
                <div style={{ color }}>{icon}</div>
              )}
            </motion.div>

            <AnimatePresence>
              {hovered && (
                <motion.span
                  key="badge"
                  initial={{ opacity: 0, scale: 0.8, x: 8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{ background: `linear-gradient(135deg, ${color}30, ${color}50)`, color, border: `1px solid ${color}40` }}
                >
                  {skills.length}+ Skills
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
          </div>

          <div className="mt-auto flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + 0.3 + i * 0.04, duration: 0.35, ease: "easeOut" }}
                whileHover={{ y: -2, backgroundColor: `${color}30` }}
                className="rounded-lg border px-3 py-1.5 text-xs font-medium"
                style={{
                  background: `linear-gradient(135deg, ${color}10, ${color}20)`,
                  borderColor: `${color}40`,
                  color,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Ambient corner glow, slightly stronger + animated on hover */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rounded-full"
          style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
          animate={{ opacity: hovered ? 0.18 : 0.08, scale: hovered ? 1.15 : 1 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
});