"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, MapPin, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";

const edu = {
  degree: "Bachelor of Engineering in Computer",
  institution: "National Academy of Science and Technology",
  location: "Dhangadhi, Kailali",
  period: "2021 – 2026",
  status: "Completed",
  description:
    "Comprehensive computer engineering program covering software development, algorithms, systems programming, and emerging technologies with hands-on project experience.",
  coursework: [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Computer Networks",
    "Operating Systems",
    "Object Oriented Software Engineering",
    "Web Technologies",
    "Machine Learning",
    "Cloud Computing",
    "Artificial Intelligence",
  ],
  color: "#3b82f6",
};

const stats = [
  { value: "30+", label: "Courses" },
  { value: "4", label: "Years" },
  { value: "3", label: "Projects" },
];

export function EducationSection() {
  return (
    <section id="education" className="section-py relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950/50" />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: edu.color }} />
      <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: edu.color }} />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-sm font-mono text-blue-400 mb-4 tracking-widest uppercase">
            06. Education
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white">
            Academic <span className="text-gradient">Foundation</span>
          </h2>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto">
            The academic journey that shaped my technical thinking and problem-solving approach.
          </p>
        </motion.div>

        {/* Featured card */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="group relative rounded-3xl overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900"
            whileHover={{ y: -6, boxShadow: `0 0 0 2px ${edu.color}50, 0 30px 60px ${edu.color}12` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute -inset-full top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1000" />
            </div>

            {/* Dot grid background */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(${edu.color} 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />

            {/* Top gradient bar */}
            <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${edu.color}, ${edu.color}60, transparent)` }} />

            <div className="p-8 sm:p-10">
              {/* Top row — icon + title + status */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                    style={{ background: `linear-gradient(135deg, ${edu.color}20, ${edu.color}08)`, border: `1px solid ${edu.color}30` }}
                  >
                    <Image src="/icons/NAST.png" alt="NAST Logo" width={50} height={50} className="object-contain w-auto h-auto" />
                    <div className="absolute inset-0 rounded-2xl animate-ping opacity-10" style={{ background: edu.color }} />
                  </div>
                </div>

                {/* Title block */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}
                    >
                      <Sparkles className="w-3 h-3" /> B.E. Computer Engineering
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> {edu.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white leading-tight mb-1">
                    {edu.institution}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-3">{edu.degree}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" style={{ color: edu.color }} /> {edu.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" style={{ color: edu.color }} /> {edu.period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 border-l-2 pl-4" style={{ borderColor: `${edu.color}50` }}>
                {edu.description}
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    className="text-center p-4 rounded-2xl border"
                    style={{ background: `${edu.color}08`, borderColor: `${edu.color}20` }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-2xl font-black" style={{ color: edu.color }}>{s.value}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Coursework */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-4">
                  <BookOpen className="w-4 h-4" style={{ color: edu.color }} /> Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course, i) => (
                    <motion.span
                      key={course}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors"
                      style={{ background: `${edu.color}08`, color: edu.color, borderColor: `${edu.color}25` }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ background: `${edu.color}20`, scale: 1.05 }}
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom glow line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(90deg, transparent, ${edu.color}60, transparent)` }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
