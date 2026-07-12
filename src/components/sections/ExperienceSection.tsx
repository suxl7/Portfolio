"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Shield, Code2, ChevronDown, type LucideIcon } from "lucide-react";

type ExperienceProject = {
  name: string;
  points: string[];
};

type Experience = {
  id: number;
  title: string;
  company: string;
  type: string;
  period: string;
  duration: string;
  icon: LucideIcon;
  color: string;
  description: string;
  highlights?: string[];
  projects?: ExperienceProject[];
  skills: string[];
};

const experiences: Experience[] = [
  {
    id: 1,
    title: "Cyber Security Virtual Internship",
    company: "Deloitte",
    type: "Internship",
    period: "2026",
    duration: "",
    icon: Shield,
    color: "#ef4444",
    description:
      "Completed Deloitte's Cyber Security Virtual Internship program, gaining hands-on experience in real-world cybersecurity scenarios.",
    highlights: [
      "Performed threat analysis and vulnerability assessments on simulated enterprise environments",
      "Conducted incident response exercises",
      "Analyzed security logs and identified potential attack vectors",
      "Created security audit reports with recommendations",
    ],
    skills: ["Threat Analysis", "Incident Response", "Security Auditing", "Reporting"],
  },
  {
    id: 2,
    title: "Full Stack Web Development Projects",
    company: "Academic & Personal",
    type: "Project",
    period: "2022 – Present",
    duration: "Ongoing",
    icon: Code2,
    color: "#3b82f6",
    description:
      "Developed multiple full-stack web applications as part of academic curriculum and personal learning, applying modern development practices.",
    projects: [
      {
        name: "Farmo — Web Application",
        points: [
          "Built with React.js and Tailwind CSS",
          "Multi-role authentication with secure token-based login",
          "Comprehensive admin dashboard",
          "Farmer and consumer management",
          "Scalable React + Django architecture",
          "RESTful APIs with Python Django and PostgreSQL",
        ],
      },
      {
        name: "Developer Portfolio",
        points: [
          "3D animated portfolio builder",
          "Built with React, Next.js and Framer Motion",
          "Deployed on Vercel",
        ],
      },
    ],
    skills: ["React", "Tailwind CSS", "Framer Motion", "PostgreSQL", "Python Django", "Postman", "Vercel"],
  },
];

export function ExperienceSection() {
  const [expanded, setExpanded] = useState<number | null>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section-py relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-50 dark:bg-zinc-950/50" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-sm font-mono text-blue-600 dark:text-blue-400 mb-4 tracking-widest uppercase">
            Experience
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white">
            My <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Base line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 dark:bg-zinc-800" />
          {/* Animated fill line — draws in as you scroll */}
          <motion.div
            className="absolute left-6 top-0 w-px bg-gradient-to-b from-blue-500 via-indigo-400 to-cyan-400"
            style={{ height: lineHeight }}
          />

          <div className="space-y-5">
            {experiences.map((exp, i) => {
              const Icon = exp.icon;
              const isExpanded = expanded === exp.id;

              return (
                <motion.div
                  key={exp.id}
                  className="relative pl-16 sm:pl-20"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Timeline node */}
                  <div
                    className="absolute left-6 top-8 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-slate-50 dark:border-zinc-950 z-10"
                    style={{ background: exp.color, boxShadow: `0 0 0 3px ${exp.color}20, 0 0 14px ${exp.color}70` }}
                  />

                  {/* Card */}
                  <div
                    className={`group rounded-2xl border overflow-hidden bg-white/70 dark:bg-white/[0.02] backdrop-blur transition-all duration-300 ${
                      isExpanded
                        ? "shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:shadow-black/30"
                        : "border-slate-200/70 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
                    }`}
                    style={isExpanded ? { borderColor: `${exp.color}45` } : {}}
                  >
                    {/* Header */}
                    <button
                      className="w-full p-5 sm:p-6 flex items-start gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-2xl"
                      onClick={() => setExpanded(isExpanded ? null : exp.id)}
                      aria-expanded={isExpanded}
                    >
                      <div
                        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border"
                        style={{ background: `${exp.color}12`, borderColor: `${exp.color}30` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: exp.color }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                          <div
                            className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase"
                            style={{ color: exp.color }}
                          >
                            <span className="text-slate-300 dark:text-zinc-700">0{i + 1}</span>
                            <span>{exp.type}</span>
                          </div>
                          <span className="font-mono text-xs text-slate-400 dark:text-zinc-500">
                            {exp.period}
                            {exp.duration ? ` · ${exp.duration}` : ""}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-1.5">{exp.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-zinc-400">{exp.company}</p>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 mt-1"
                      >
                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                      </motion.div>
                    </button>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 space-y-5 border-t border-slate-200/60 dark:border-zinc-800 pt-5">
                            <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                              {exp.description}
                            </p>

                            {exp.highlights && (
                              <div>
                                <h4 className="text-xs font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                                  Key Highlights
                                </h4>
                                <ul className="space-y-2">
                                  {exp.highlights.map((h, j) => (
                                    <motion.li
                                      key={j}
                                      className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-zinc-400"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: j * 0.04 }}
                                    >
                                      <span
                                        className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                                        style={{ background: exp.color }}
                                      />
                                      {h}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {exp.projects && (
                              <div className="space-y-5">
                                {exp.projects.map((project) => (
                                  <div key={project.name}>
                                    <h4
                                      className="text-xs font-mono uppercase tracking-wider mb-3"
                                      style={{ color: exp.color }}
                                    >
                                      {project.name}
                                    </h4>
                                    <ul className="space-y-2">
                                      {project.points.map((p, j) => (
                                        <motion.li
                                          key={j}
                                          className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-zinc-400"
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: j * 0.04 }}
                                        >
                                          <span
                                            className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                                            style={{ background: exp.color }}
                                          />
                                          {p}
                                        </motion.li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div>
                              <h4 className="text-xs font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                                Skills Used
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
                                    style={{
                                      background: `${exp.color}10`,
                                      color: exp.color,
                                      border: `1px solid ${exp.color}25`,
                                    }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}