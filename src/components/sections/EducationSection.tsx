"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Calendar,
  BookOpen,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

// ─── Data ────────────────────────────────────────────────────────────────────

const educationData = [
  {
    id: 1,
    level: "Bachelor of Engineering",
    field: "Computer Engineering",
    institution: "National Academy of Science and Technology",
    location: "Dhangadhi, Kailali",
    duration: "2021 – 2026",
    status: "Completed",
    logo: "/icons/NAST.png",
    color: "#3b82f6",
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
    stats: [
      { value: "4", label: "Years" },
      { value: "10+", label: "Projects" },
      { value: "30+", label: "Courses" },
    ],
  },
  {
    id: 2,
    level: "10+2 Science (PCM)",
    field: "Physics · Chemistry · Mathematics",
    institution: "Galaxy Higher Secondary School",
    location: "Dhangadhi, Kailali",
    duration: "2019 – 2021",
    status: "Completed",
    logo: "/icons/galaxy.png",
    color: "#6366f1",
    description:
      "Completed higher secondary education with a focus on Physics, Chemistry, and Mathematics, building a strong analytical and scientific foundation.",
    coursework: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Computer Science",
      "English",
    ],
    stats: null,
  },
  {
    id: 3,
    level: "Secondary Education Examination (SEE)",
    field: "General Education",
    institution: "Satyawati Academy Kailali",
    location: "Attariya, Kailali",
    duration: "2012 – 2019",
    status: "Completed",
    logo: "/icons/satyawati.png",
    color: "#06b6d4",
    description:
      "Completed secondary education with distinction, developing core academic skills across science, mathematics, and humanities.",
    coursework: [
      "Mathematics",
      "Science",
      "English",
      "Social Studies",
      "Computer",
    ],
    stats: null,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function LogoPlaceholder({ color, level }: { color: string; level: string }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ color }}
    >
      <GraduationCap className="w-7 h-7" />
    </div>
  );
}

function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
      <CheckCircle2 className="w-3 h-3" />
      Completed
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function EducationSection() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (id: number) => setActiveId((prev) => (prev === id ? null : id));

  return (
    <section id="education" className="section-py relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-zinc-950" />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(59,130,246,0.8) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl pointer-events-none bg-blue-500" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl pointer-events-none bg-indigo-500" />

      <div className="section-container relative z-10">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-mono text-blue-400 mb-4 tracking-widest uppercase">
            Education
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white">
            Academic{" "}
            <span className="text-gradient">Foundation</span>
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
            The academic journey that shaped my technical thinking and
            problem-solving approach.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line — hidden on mobile */}
          <div className="hidden sm:block absolute left-6 top-4 bottom-4 w-px timeline-line opacity-20" />

          <div className="space-y-4">
            {educationData.map((edu, i) => {
              const isActive = activeId === edu.id;

              return (
                <motion.div
                  key={edu.id}
                  className="relative sm:pl-16"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Timeline node — hidden on mobile */}
                  <div className="hidden sm:flex absolute left-3.5 top-5 z-10 items-center justify-center">
                    {isActive ? (
                      <motion.div
                        className="relative w-5 h-5"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                      >
                        <span
                          className="absolute inset-0 rounded-full animate-ping opacity-40"
                          style={{ background: edu.color }}
                        />
                        <span
                          className="relative block w-5 h-5 rounded-full border-2 border-white dark:border-zinc-900"
                          style={{
                            background: edu.color,
                            boxShadow: `0 0 14px ${edu.color}80`,
                          }}
                        />
                      </motion.div>
                    ) : (
                      <span
                        className="block w-3.5 h-3.5 rounded-full border-2 border-white dark:border-zinc-900 opacity-60"
                        style={{ background: edu.color }}
                      />
                    )}
                  </div>

                  {/* ── Card ── */}
                  <motion.div
                    className="group relative rounded-2xl overflow-hidden border bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm cursor-pointer"
                    style={{
                      borderColor: isActive ? `${edu.color}50` : undefined,
                    }}
                    animate={{
                      borderColor: isActive
                        ? `${edu.color}50`
                        : "rgba(161,161,170,0.2)",
                    }}
                    whileHover={{
                      y: -4,
                      boxShadow: `0 0 0 1.5px ${edu.color}40, 0 20px 48px ${edu.color}12`,
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    onClick={() => toggle(edu.id)}
                  >
                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl">
                      <div className="absolute -inset-full top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1000" />
                    </div>

                    {/* Top accent bar */}
                    <div
                      className="h-0.5 w-full"
                      style={{
                        background: `linear-gradient(90deg, ${edu.color}, ${edu.color}40, transparent)`,
                        opacity: isActive ? 1 : 0.4,
                      }}
                    />

                    {/* ── Collapsed header (always visible) ── */}
                    <div className="flex items-center gap-4 px-5 py-4">
                      {/* Logo */}
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border"
                        style={{
                          background: `${edu.color}12`,
                          borderColor: `${edu.color}30`,
                        }}
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        {edu.logo ? (
                          <div className="relative w-8 h-8">
                            <Image
                              src={edu.logo}
                              alt={edu.institution}
                              fill
                              sizes="32px"
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <LogoPlaceholder color={edu.color} level={edu.level} />
                        )}
                      </motion.div>

                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-mono font-semibold mb-0.5"
                          style={{ color: edu.color }}
                        >
                          {edu.level}
                        </p>
                        <h3 className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base leading-snug truncate">
                          {edu.institution}
                        </h3>
                      </div>

                      {/* Chevron */}
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="flex-shrink-0 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* ── Expanded content ── */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="expanded"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div
                            className="px-5 pb-6 pt-1 border-t"
                            style={{ borderColor: `${edu.color}20` }}
                          >
                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-2 mb-4 mt-3">
                              <StatusBadge />
                              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                                <MapPin
                                  className="w-3.5 h-3.5"
                                  style={{ color: edu.color }}
                                />
                                {edu.location}
                              </span>
                              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                                <Calendar
                                  className="w-3.5 h-3.5"
                                  style={{ color: edu.color }}
                                />
                                {edu.duration}
                              </span>
                            </div>

                            {/* Description */}
                            <p
                              className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 pl-3 border-l-2"
                              style={{ borderColor: `${edu.color}50` }}
                            >
                              {edu.description}
                            </p>

                            {/* Stats — Bachelor only */}
                            {edu.stats && (
                              <div className="grid grid-cols-3 gap-3 mb-5">
                                {edu.stats.map((s) => (
                                  <motion.div
                                    key={s.label}
                                    className="text-center py-3 rounded-xl border"
                                    style={{
                                      background: `${edu.color}08`,
                                      borderColor: `${edu.color}20`,
                                    }}
                                    whileHover={{ scale: 1.04 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                  >
                                    <p
                                      className="text-xl font-black"
                                      style={{ color: edu.color }}
                                    >
                                      {s.value}
                                    </p>
                                    <p className="text-xs text-zinc-500 mt-0.5">
                                      {s.label}
                                    </p>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {/* Coursework */}
                            <div>
                              <h4 className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-3">
                                <BookOpen
                                  className="w-3.5 h-3.5"
                                  style={{ color: edu.color }}
                                />
                                Relevant Coursework
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {edu.coursework.map((course, j) => (
                                  <motion.span
                                    key={course}
                                    className="px-3 py-1.5 rounded-full text-xs font-medium border"
                                    style={{
                                      background: `${edu.color}08`,
                                      color: edu.color,
                                      borderColor: `${edu.color}25`,
                                    }}
                                    initial={{ opacity: 0, scale: 0.88 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: j * 0.04, duration: 0.2 }}
                                    whileHover={{ scale: 1.06, background: `${edu.color}18` }}
                                  >
                                    {course}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
