"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Code2, Users, Award, ChevronDown } from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "Cyber Security Virtual Internship",
    company: "Deloitte",
    type: "Internship",
    period: "2026",
    duration: "4 weeks",
    icon: Shield,
    color: "#ef4444",
    description:
      "Completed Deloitte's Cyber Security Virtual Internship program, gaining hands-on experience in real-world cybersecurity scenarios.",
    highlights: [
      "Performed threat analysis and vulnerability assessments on simulated enterprise environments",
      "Conducted incident response exercises and documented findings",
      "Analyzed security logs and identified potential attack vectors",
      "Created detailed security audit reports with remediation recommendations",
      "Learned industry-standard security frameworks (NIST, ISO 27001)",
    ],
    skills: ["Threat Analysis", "Incident Response", "Security Auditing", "Report Writing"],
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
    highlights: [
    
      
      "Created a developer portfolio builder with 3D animations",
      "Implemented RESTful APIs with Python Django",
      "Deployed applications on Vercel",
    ],
    skills: ["React", "Vercel", "PostgreSQL", "Python Django" , "Postman" ]
  },
  
 
];

export function ExperienceSection() {
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <section id="experience" className="section-py relative overflow-hidden">
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
            04. Experience
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white">
            My{" "}
            <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 opacity-20" />

          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="relative pl-14 sm:pl-16"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-3.5 top-5 w-5 h-5 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center z-10"
                  style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}60` }}
                >
                  <exp.icon className="w-2.5 h-2.5 text-white" />
                </div>

                {/* Card */}
                <div
                  className={`glass border rounded-2xl overflow-hidden transition-all ${
                    expanded === exp.id ? "border-opacity-60" : "border-zinc-200/50 dark:border-zinc-700/50"
                  }`}
                  style={expanded === exp.id ? { borderColor: `${exp.color}50` } : {}}
                >
                  {/* Header */}
                  <button
                    className="w-full p-5 flex items-start gap-4 text-left"
                    onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded-full"
                          style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                        >
                          {exp.type}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">{exp.period}</span>
                        <span className="text-xs text-zinc-500">· {exp.duration}</span>
                      </div>
                      <h3 className="font-bold text-zinc-900 dark:text-white">{exp.title}</h3>
                      <p className="text-sm text-zinc-500 mt-0.5">{exp.company}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded === exp.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    </motion.div>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expanded === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 space-y-4 border-t border-zinc-200/50 dark:border-zinc-700/50 pt-4">
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">{exp.description}</p>

                          <div>
                            <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">Key Highlights</h4>
                            <ul className="space-y-2">
                              {exp.highlights.map((h, j) => (
                                <motion.li
                                  key={j}
                                  className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.05 }}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: exp.color }} />
                                  {h}
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">Skills Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                  style={{ background: `${exp.color}10`, color: exp.color, border: `1px solid ${exp.color}25` }}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
