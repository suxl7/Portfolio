"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  BookOpen,
  ChevronDown,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

// ─── Data ────────────────────────────────────────────────────────────────────

type Fact = { label: string; value: string };

const educationData = [
  {
    id: 1,
    level: "Bachelor of Engineering in Computer",
    shortLabel: "BE",
    field: "Computer Engineering",
    institution: "National Academy of Science and Technology",
    location: "Dhangadhi, Kailali",
    duration: "2021 – 2026",
    highest: true,
    logo: "/icons/NAST.png",
    color: "#3b82f6",
    description:
      "Comprehensive Computer Engineering program covering Engineering Mathematics, Software Development, Data Structure and Algorithms, Systems Programming, and Emerging Technologies with hands-on project experience.",
    facts: [
      { label: "Faculty", value: "Science and Technology" },
      { label: "Program", value: "BE Computer" },
      { label: "Completed", value: "2026" },
    ] satisfies Fact[],
    coursework: ["Engineering Mathematics  |  Electronic Device and Circuits  |   DSA  |   OOP in C++  |   DBMS  |   Artificial Intelligence  |   Cloud Computing  |   Operating Systems"], // fill in later — section stays visible with "coming soon"
  },
  {
    id: 2,
    level: "10+2 Science",
    shortLabel: "+2",
    field: "Physics · Chemistry · Mathematics",
    institution: "Galaxy Higher Secondary School",
    location: "Dhangadhi, Kailali",
    duration: "2019 – 2021",
    highest: false,
    logo: "/icons/galaxy.png",
    color: "#6366f1",
    description:
      "Completed Higher Secondary Education with a focus on Physics, Chemistry, and Mathematics, building a strong analytical and scientific foundation.",
    facts: [
      { label: "Stream", value: "Science" },
      { label: "Completed", value: "2021" },
    ] satisfies Fact[],
    // no `coursework` key — section won't render at all
  },
  {
    id: 3,
    level: "Secondary Education Examination",
    shortLabel: "SEE",
    field: "General Education",
    institution: "Satyawati Academy Kailali",
    location: "Attariya, Kailali",
    duration: "2019",
    highest: false,
    logo: "/icons/satyawati.png",
    color: "#06b6d4",
    description:
      "Completed Secondary Education developing core academic skills across Science, Mathematics, and Social.",
    facts: [{ label: "Completed", value: "2019" }] satisfies Fact[],
    // no `coursework` key here either
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function LogoPlaceholder({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ color }}>
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

function HighestBadge({ color }: { color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
      style={{ background: `${color}15`, color, border: `1px solid ${color}35` }}
    >
      <Sparkles className="w-3 h-3" />
      Highest Qualification
    </span>
  );
}

function FactGrid({ facts, color }: { facts: Fact[]; color: string }) {
  return (
    <div
      className="grid gap-px rounded-xl overflow-hidden border"
      style={{
        borderColor: `${color}20`,
        gridTemplateColumns: `repeat(${Math.min(facts.length, 3)}, minmax(0, 1fr))`,
      }}
    >
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="px-4 py-3 bg-white/60 dark:bg-white/[0.02]"
          style={{ background: `${color}06` }}
        >
          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
            {fact.label}
          </p>
          {fact.value ? (
            <p className="text-sm font-bold text-zinc-900 dark:text-white">{fact.value}</p>
          ) : (
            <p className="text-sm italic text-zinc-400 dark:text-zinc-600 border-b border-dashed border-zinc-300 dark:border-zinc-700 w-fit">
              Add year
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function EducationSection() {
  const [activeId, setActiveId] = useState<number | null>(1);

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
        {/* Header */}
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
            Academic <span className="text-gradient">Foundation</span>
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
            The academic journey that shaped my technical thinking and problem-solving approach.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          <div className="hidden sm:block absolute left-[21px] top-4 bottom-4 w-px timeline-line opacity-20" />

          <div className="space-y-5">
            {educationData.map((edu, i) => {
              const isActive = activeId === edu.id;

              return (
                <motion.div
                  key={edu.id}
                  className="relative sm:pl-20"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Rail marker — real credential abbreviation */}
                  <div className="hidden sm:flex absolute left-0 top-4 w-11 h-11 z-10 items-center justify-center">
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-xl"
                        style={{ boxShadow: `0 0 0 3px ${edu.color}25` }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                    <span
                      className="relative flex items-center justify-center w-11 h-11 rounded-xl border-2 font-mono text-[11px] font-bold"
                      style={{
                        background: isActive ? edu.color : `${edu.color}12`,
                        borderColor: edu.color,
                        color: isActive ? "#fff" : edu.color,
                        boxShadow: isActive ? `0 0 16px ${edu.color}70` : "none",
                      }}
                    >
                      {edu.shortLabel}
                    </span>
                  </div>

                  {/* Card */}
                  <motion.div
                    className={`edu-card group relative rounded-2xl overflow-hidden border bg-white/80 dark:bg-zinc-900/80 cursor-pointer`}
                    animate={{
                      borderColor: isActive ? `${edu.color}50` : "rgba(161,161,170,0.2)",
                    }}
                    whileHover={{
                      y: -4,
                      boxShadow: `0 0 0 1.5px ${edu.color}40, 0 20px 48px ${edu.color}12`,
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    onClick={() => toggle(edu.id)}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl">
                      <div className="absolute -inset-full top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1000" />
                    </div>

                    <div
                      className="h-0.5 w-full"
                      style={{
                        background: `linear-gradient(90deg, ${edu.color}, ${edu.color}40, transparent)`,
                        opacity: isActive ? 1 : 0.4,
                      }}
                    />

                    {/* Collapsed header */}
                    <div className="flex items-center gap-4 px-5 py-4">
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border"
                        style={{ background: `${edu.color}12`, borderColor: `${edu.color}30` }}
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        {edu.logo ? (
                          <div className="relative w-8 h-8">
                            <Image src={edu.logo} alt={edu.institution} fill sizes="32px" className="object-contain" />
                          </div>
                        ) : (
                          <LogoPlaceholder color={edu.color} />
                        )}
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-xs font-mono font-semibold" style={{ color: edu.color }}>
                            {edu.level}
                          </p>
                          {edu.highest && (
                            <span className="hidden sm:inline-flex">
                              <HighestBadge color={edu.color} />
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base leading-snug truncate">
                          {edu.institution}
                        </h3>
                      </div>

                      <div className="flex-shrink-0 flex items-center gap-3">
                        <span className="hidden md:block text-xs font-mono text-zinc-400 dark:text-zinc-500">
                          {edu.duration}
                        </span>
                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expanded content: CSS-driven grid row toggle to avoid animating height */}
                    <div
                      className="grid overflow-hidden transition-[grid-template-rows] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="px-5 pb-6 pt-1 border-t" style={{ borderColor: `${edu.color}20` }}>
                          {edu.highest && (
                            <div className="sm:hidden mt-3 mb-1">
                              <HighestBadge color={edu.color} />
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-2 mb-4 mt-3">
                            <StatusBadge />
                            <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                              <MapPin className="w-3.5 h-3.5" style={{ color: edu.color }} />
                              {edu.location}
                            </span>
                          </div>

                          {/* Transcript-style fact grid */}
                          <div className="mb-5">
                            <FactGrid facts={edu.facts} color={edu.color} />
                          </div>

                          {edu.description && (
                            <p
                              className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 pl-3 border-l-2"
                              style={{ borderColor: `${edu.color}50` }}
                            >
                              {edu.description}
                            </p>
                          )}

                          {/* Coursework */}
                          {edu.coursework !== undefined && (
                            <div>
                              <h4 className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-3">
                                <BookOpen className="w-3.5 h-3.5" style={{ color: edu.color }} />
                                Relevant Coursework
                              </h4>
                              {edu.coursework.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {edu.coursework.map((course, j) => (
                                    <motion.span
                                      key={course}
                                      className="px-3 py-1.5 rounded-full text-xs font-medium border"
                                      style={{ background: `${edu.color}08`, color: edu.color, borderColor: `${edu.color}25` }}
                                      initial={{ opacity: 0, scale: 0.88 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: j * 0.04, duration: 0.2 }}
                                      whileHover={{ scale: 1.06, background: `${edu.color}18` }}
                                    >
                                      {course}
                                    </motion.span>
                                  ))}
                                </div>
                              ) : (
                                <span className="inline-block px-3 py-1.5 rounded-full text-xs italic text-zinc-400 dark:text-zinc-600 border border-dashed border-zinc-300 dark:border-zinc-700">
                                  Coursework details coming soon
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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