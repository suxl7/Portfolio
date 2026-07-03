"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface SkillCard3DProps {
  title: string;
  description: string;
  skills: string[];
  color: string;
  icon: React.ReactNode;
  index: number;
}

export function SkillCard3D({ title, description, skills, color, icon, index }: SkillCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useTransform(y, [-100, 100], ["20deg", "-20deg"]);
  const rotateY = useTransform(x, [-100, 100], ["-20deg", "20deg"]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) / (rect.width / 2) * 100);
      y.set((e.clientY - centerY) / (rect.height / 2) * 100);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className="group relative bg-white/10 dark:bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 p-6 overflow-hidden"
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl"
        style={{
          boxShadow: isHovered
            ? `0 0 60px -10px ${color}80, 0 0 100px -20px ${color}40`
            : "none",
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 space-y-5" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center justify-between">
          <motion.div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)`, border: `1px solid ${color}40` }}
            whileHover={{ scale: 1.1, rotateZ: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ color }}>{icon}</div>
          </motion.div>
          <motion.span
            className="text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100"
            style={{ background: `linear-gradient(135deg, ${color}30, ${color}50)`, color, border: `1px solid ${color}40` }}
            initial={{ x: 20 }}
            animate={{ x: 0 }}
          >
            {skills.length}+ Skills
          </motion.span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <motion.span
              key={i}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
              style={{
                background: `linear-gradient(135deg, ${color}10, ${color}20)`,
                borderColor: `${color}40`,
                color,
              }}
              whileHover={{ scale: 1.05, y: -2, boxShadow: `0 10px 20px -5px ${color}40` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
          animate={{ scale: isHovered ? 2 : 1, opacity: isHovered ? 0.2 : 0.1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
}