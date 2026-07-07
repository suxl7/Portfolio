"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface SkillCard3DProps {
  title: string;
  description: string;
  skills: string[];
  color: string;
  icon: React.ReactNode;
  index: number;
}

export const SkillCard3D = memo(function SkillCard3D({ title, description, skills, color, icon, index }: SkillCard3DProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-zinc-200/70 bg-white/80 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 dark:border-white/[0.08] dark:bg-white/[0.03]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ background: `linear-gradient(135deg, ${color}10, transparent)` }} />

      <div className="relative z-10 space-y-5">
        <div className="flex items-center justify-between">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)`, border: `1px solid ${color}40` }}
          >
            <div style={{ color }}>{icon}</div>
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ background: `linear-gradient(135deg, ${color}30, ${color}50)`, color, border: `1px solid ${color}40` }}
          >
            {skills.length}+ Skills
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
              style={{
                background: `linear-gradient(135deg, ${color}10, ${color}20)`,
                borderColor: `${color}40`,
                color,
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        <div
          className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
        />
      </div>
    </motion.div>
  );
});
