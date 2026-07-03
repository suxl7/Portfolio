"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, Calendar, MapPin } from "lucide-react";

const education = [
  {
    id: 1,
    degree: "Bachelor of Engineering in Computer Engineering",
    institution: "Visvesvaraya Technological University",
    location: "Bangalore, India",
    period: "2020 – 2024",
    gpa: "8.5/10",
    status: "Completed",
    description: "Comprehensive computer engineering program covering software development, algorithms, systems programming, and emerging technologies.",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Computer Networks",
      "Operating Systems",
      "Software Engineering",
      "Web Technologies",
      "Machine Learning",
      "Cybersecurity Fundamentals",
    ],
    achievements: [
      "Dean's List for Academic Excellence (2022, 2023)",
      "Led college coding club with 50+ members",
      "Published research paper in IEEE conference",
      "Won inter-college hackathon twice",
    ],
    color: "#3b82f6",
  },
];

const achievements = [
  { value: "8.5", label: "GPA", suffix: "/10" },
  { value: "30+", label: "Courses Completed", suffix: "" },
  { value: "4", label: "Years", suffix: " Program" },
  { value: "3", label: "Major Projects", suffix: "" },
];

export function EducationSection() {
  return (
    <section id="education" className="section-py relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950/50" />

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
            Academic{" "}
            <span className="text-gradient">Foundation</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {achievements.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 glass border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ delay: i * 0.05 }}
            >
              <p className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
                {stat.value}<span className="text-lg text-zinc-500">{stat.suffix}</span>
              </p>
              <p className="text-zinc-500 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Education cards */}
        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              className="relative glass border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Left accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: `linear-gradient(180deg, ${edu.color}, ${edu.color}60)` }} />
              
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${edu.color}15`, border: `1px solid ${edu.color}30` }}
                    >
                      <GraduationCap className="w-7 h-7" style={{ color: edu.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{edu.degree}</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">{edu.institution}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-zinc-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {edu.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {edu.period}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `${edu.color}15`, color: edu.color }}
                    >
                      GPA: {edu.gpa}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {edu.status}
                    </span>
                  </div>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 mb-6">{edu.description}</p>

                {/* Coursework */}
                <div className="mb-6">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                    <BookOpen className="w-4 h-4" /> Relevant Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                    <Award className="w-4 h-4" /> Notable Achievements
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {edu.achievements.map((achievement, j) => (
                      <motion.li
                        key={j}
                        className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.05 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: edu.color }} />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 60px ${edu.color}08` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
