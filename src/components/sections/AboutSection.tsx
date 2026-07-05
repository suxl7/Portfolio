"use client";

import { motion } from "framer-motion";
import { GraduationCap, Heart, Target, Code2, Shield, Cloud, BookOpen, Coffee } from "lucide-react";

const timeline = [
  {
    year: "2021 – Present",
    title: "Bachelor of Engineering – Computer Engineering",
    institution: "University / College Name",
    description: "Studying core CS fundamentals, software engineering, networking, cybersecurity, and cloud computing.",
    icon: GraduationCap,
    color: "#3b82f6",
  },
  {
    year: "2023",
    title: "Deloitte Cyber Security Virtual Internship",
    institution: "Deloitte (Virtual)",
    description: "Completed hands-on cybersecurity tasks including threat analysis, incident response, and security auditing.",
    icon: Shield,
    color: "#8b5cf6",
  },
  {
    year: "2022",
    title: "AWS Cloud Practitioner Certification",
    institution: "Amazon Web Services",
    description: "Gained foundational knowledge of AWS cloud services, architecture, security, and pricing.",
    icon: Cloud,
    color: "#06b6d4",
  },
  {
    year: "2021",
    title: "Started Computer Engineering",
    institution: "University",
    description: "Began the journey into computer science, programming, and engineering fundamentals.",
    icon: BookOpen,
    color: "#10b981",
  },
];

const interests = [
  { icon: Code2, label: "Open Source", color: "#3b82f6" },
  { icon: Shield, label: "Cybersecurity", color: "#ef4444" },
  { icon: Cloud, label: "Cloud Computing", color: "#06b6d4" },
  { icon: Coffee, label: "Problem Solving", color: "#f59e0b" },
  { icon: Heart, label: "UI/UX Design", color: "#ec4899" },
  { icon: Target, label: "Continuous Learning", color: "#10b981" },
];

const values = [
  { title: "Clean Code", desc: "Writing readable, maintainable, and well-documented code." },
  { title: "Security First", desc: "Building with security best practices from the ground up." },
  { title: "User-Centric", desc: "Designing experiences that delight and empower users." },
  { title: "Continuous Growth", desc: "Always learning, always improving, never settling." },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden" style={{ padding: "7rem 1.5rem" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: "5rem" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-sm font-mono text-blue-400 tracking-widest uppercase" style={{ marginBottom: "1rem", display: "block" }}>
            01. About Me
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white">
            Get to Know{" "}
            <span className="text-gradient">Sushil</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 items-start" style={{ gap: "4rem", marginBottom: "5rem" }}>
          {/* Bio */}
          <motion.div
            className="flex flex-col"
            style={{ gap: "1.5rem" }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="justify-text text-zinc-600 dark:text-zinc-300 space-y-6 leading-8">
  <p className="text-lg">
    I&apos;m <strong className="text-zinc-900 dark:text-white">Sushil</strong>, a passionate Computer Engineering
    graduate with a deep interest in building secure, scalable, and beautiful digital solutions.
  </p>

  <p>
    My journey spans full-stack web development, cybersecurity, cloud computing, and graphics design.
    I believe in the power of technology to solve real-world problems and I&apos;m constantly pushing
    myself to learn and grow.
  </p>

  <p>
    When I&apos;m not coding, you&apos;ll find me exploring new security vulnerabilities, contributing to
    open-source projects, editing videos, or designing graphics. I thrive at the intersection of
    creativity and engineering.
  </p>
</div>

            {/* Career Goal */}
            <motion.div
              className="rounded-2xl glass border border-blue-500/20 relative overflow-hidden"
              style={{ padding: "1.5rem" }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white" style={{ marginBottom: "0.25rem", lineHeight: 1.3 }}>Career Goal</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400" style={{ lineHeight: 1.6 }}>
                    To become a well-rounded software engineer who builds impactful products while
                    contributing to a safer digital world through cybersecurity expertise.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white" style={{ marginBottom: "1rem" }}>Interests & Passions</h3>
              <div className="flex flex-wrap gap-3">
                {interests.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-2 rounded-xl glass border text-sm font-medium"
                    style={{ borderColor: `${item.color}30`, color: item.color, padding: "0.5rem 0.75rem", lineHeight: 1 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span style={{ lineHeight: 1 }}>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            className="flex flex-col"
            style={{ gap: "1.5rem" }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Work Philosophy</h3>
            <div className="grid grid-cols-2" style={{ gap: "1rem" }}>
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  className="rounded-2xl glass border border-zinc-200/50 dark:border-zinc-700/50 group hover:border-blue-500/30 transition-colors"
                  style={{ padding: "1.25rem" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center" style={{ marginBottom: "0.75rem" }}>
                    <span className="text-blue-400 font-bold text-sm" style={{ lineHeight: 1 }}>0{i + 1}</span>
                  </div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm group-hover:text-blue-400 transition-colors" style={{ marginBottom: "0.25rem", lineHeight: 1.3 }}>
                    {v.title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400" style={{ lineHeight: 1.6 }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>

           
          </motion.div>
        </div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white text-center" style={{ marginBottom: "2.5rem" }}>
            Education & Milestones
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 opacity-30 md:-translate-x-px" />

            <div className="flex flex-col" style={{ gap: "2rem" }}>
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  {/* Content */}
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-14 md:pl-0`}>
                    <motion.div
                      className="rounded-2xl glass border border-zinc-200/50 dark:border-zinc-700/50 hover:border-blue-500/30 transition-colors group"
                      style={{ padding: "1.25rem" }}
                      whileHover={{ scale: 1.01, y: -2 }}
                    >
                      <span className="text-xs font-mono text-blue-400 block" style={{ marginBottom: "0.25rem", lineHeight: 1 }}>{item.year}</span>
                      <h4 className="font-bold text-zinc-900 dark:text-white group-hover:text-blue-400 transition-colors" style={{ lineHeight: 1.3 }}>
                        {item.title}
                      </h4>
                      <p className="text-sm text-zinc-500" style={{ marginBottom: "0.5rem", lineHeight: 1.4 }}>{item.institution}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400" style={{ lineHeight: 1.6 }}>{item.description}</p>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-5 w-5 h-5 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center"
                    style={{ background: item.color, boxShadow: `0 0 12px ${item.color}60` }}>
                    <item.icon className="w-2.5 h-2.5 text-white" />
                  </div>

                  {/* Empty side */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
