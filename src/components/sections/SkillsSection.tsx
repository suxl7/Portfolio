"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Server, Shield, Cloud, Database, GitBranch,
  Palette, Video, Coffee, Globe
} from "lucide-react";

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Code2,
    color: "#3b82f6",
    skills: [
      { name: "HTML & CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "React.js", level: 82 },
      { name: "Next.js", level: 78 },
      { name: "TypeScript", level: 75 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    color: "#10b981",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 72 },
      { name: "REST APIs", level: 80 },
      { name: "Python (Flask)", level: 70 },
      { name: "Authentication", level: 74 },
    ],
  },
  {
    id: "java",
    title: "Java",
    icon: Coffee,
    color: "#f59e0b",
    skills: [
      { name: "Core Java", level: 80 },
      { name: "OOP Concepts", level: 85 },
      { name: "Data Structures", level: 78 },
      { name: "Algorithms", level: 75 },
      { name: "Spring Boot", level: 55 },
    ],
  },
  {
    id: "python",
    title: "Python",
    icon: Globe,
    color: "#06b6d4",
    skills: [
      { name: "Python Basics", level: 82 },
      { name: "Scripting", level: 78 },
      { name: "Data Analysis", level: 65 },
      { name: "Automation", level: 72 },
      { name: "Django", level: 55 },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    icon: Shield,
    color: "#ef4444",
    skills: [
      { name: "Network Security", level: 72 },
      { name: "Ethical Hacking", level: 65 },
      { name: "OWASP Top 10", level: 70 },
      { name: "Incident Response", level: 68 },
      { name: "Threat Analysis", level: 70 },
    ],
  },
  {
    id: "cloud",
    title: "AWS & Cloud",
    icon: Cloud,
    color: "#8b5cf6",
    skills: [
      { name: "AWS EC2 / S3", level: 70 },
      { name: "AWS IAM", level: 68 },
      { name: "Cloud Practitioner", level: 75 },
      { name: "Docker", level: 65 },
      { name: "CI/CD Basics", level: 60 },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: Database,
    color: "#ec4899",
    skills: [
      { name: "MySQL", level: 78 },
      { name: "MongoDB", level: 72 },
      { name: "PostgreSQL", level: 65 },
      { name: "Firebase", level: 70 },
      { name: "Redis", level: 55 },
    ],
  },
  {
    id: "git",
    title: "Git & GitHub",
    icon: GitBranch,
    color: "#f97316",
    skills: [
      { name: "Git Basics", level: 88 },
      { name: "GitHub", level: 85 },
      { name: "Branching", level: 82 },
      { name: "Pull Requests", level: 80 },
      { name: "Open Source", level: 70 },
    ],
  },
  {
    id: "design",
    title: "Graphics Design",
    icon: Palette,
    color: "#a855f7",
    skills: [
      { name: "Photoshop", level: 75 },
      { name: "Illustrator", level: 68 },
      { name: "Figma", level: 72 },
      { name: "Canva", level: 85 },
      { name: "UI Design", level: 70 },
    ],
  },
  {
    id: "video",
    title: "Video Editing",
    icon: Video,
    color: "#14b8a6",
    skills: [
      { name: "Premiere Pro", level: 72 },
      { name: "After Effects", level: 65 },
      { name: "DaVinci Resolve", level: 68 },
      { name: "Motion Graphics", level: 60 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  return (
    <motion.div
      className="space-y-1.5"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{name}</span>
        <span className="text-xs font-mono text-zinc-500">{level}%</span>
      </div>
      <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const [active, setActive] = useState("frontend");
  const activeCategory = skillCategories.find((c) => c.id === active)!;

  return (
    <section id="skills" className="section-py relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950/50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-500/5 to-transparent rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-sm font-mono text-blue-400 mb-4 tracking-widest uppercase">
            02. Skills
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white">
            Technologies &{" "}
            <span className="text-gradient">Expertise</span>
          </h2>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto">
            A comprehensive overview of my technical skills across different domains.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Category tabs */}
          <motion.div
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {skillCategories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  active === cat.id
                    ? "text-white shadow-lg"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 glass border border-zinc-200/50 dark:border-zinc-700/50"
                }`}
                style={active === cat.id ? {
                  background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`,
                  boxShadow: `0 8px 24px ${cat.color}40`,
                } : {}}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <cat.icon className="w-4 h-4 flex-shrink-0" />
                {cat.title}
              </motion.button>
            ))}
          </motion.div>

          {/* Skill detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="glass border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${activeCategory.color}20`, border: `1px solid ${activeCategory.color}40` }}
                >
                  <activeCategory.icon className="w-6 h-6" style={{ color: activeCategory.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{activeCategory.title}</h3>
                  <p className="text-sm text-zinc-500">{activeCategory.skills.length} skills tracked</p>
                </div>
                <div className="ml-auto">
                  <div
                    className="text-3xl font-black"
                    style={{ color: activeCategory.color }}
                  >
                    {Math.round(activeCategory.skills.reduce((a, s) => a + s.level, 0) / activeCategory.skills.length)}%
                  </div>
                  <div className="text-xs text-zinc-500 text-right">avg</div>
                </div>
              </div>

              <div className="space-y-5">
                {activeCategory.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={activeCategory.color}
                    delay={i * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* All skills grid overview */}
        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {skillCategories.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`p-4 rounded-xl glass border text-center group transition-all ${
                active === cat.id ? "border-opacity-60" : "border-zinc-200/30 dark:border-zinc-700/30"
              }`}
              style={active === cat.id ? { borderColor: cat.color } : {}}
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div
                className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
                style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
              >
                <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
              </div>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                {cat.title}
              </p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
