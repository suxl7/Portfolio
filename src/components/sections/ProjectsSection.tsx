"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ArrowUpRight } from "lucide-react";

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const GithubIconLg = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const categories = ["All", "Web Dev", "Security", "ML"];

const projects = [
  {
    id: 1,
    title: "Smoke & Fire Detection System",
    description: "Real-time smoke and fire detection using Python, OpenCV, and machine learning for early hazard alerts.",
    longDescription: "Built a computer vision system that detects smoke and fire in real-time video streams using OpenCV and a trained ML model. Sends instant alerts via email/SMS and logs incidents with timestamps for safety monitoring.",
    category: "ML",
    tags: ["Python", "OpenCV", "Scikit-learn", "NumPy", "SMTP"],
    color: "#ef4444",
    featured: true,
    github: null,
    demo: null,
    
  },
  {
    id: 2,
    title: "Farmo Admin Dashboard",
    description: "Full-stack admin dashboard for farm management with real-time analytics, inventory tracking, and reporting.",
    longDescription: "A comprehensive farm management system built with React, Node.js, and MongoDB. Features real-time crop tracking, inventory management, financial reporting, and a responsive dashboard with interactive charts.",
    category: "Web Dev",
    tags: ["React", "Tailwind CSS", "Python Django", "PostgreSQL", "Postman", "Javascript"],
    color: "#10b981",
    featured: true,
    github: "https://github.com/suxl7",
    demo: null,
    challenges: "Handling real-time data updates across multiple dashboard widgets without performance degradation.",
    solution: "Used WebSocket connections with debounced state updates and memoized chart components.",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "This portfolio — built with Next.js 15, Three.js, and Framer Motion featuring 3D animations and a custom cursor.",
    longDescription: "A high-performance developer portfolio built with Next.js 15, React Three Fiber for 3D tech orbit visualization, Framer Motion for smooth animations, and Tailwind CSS. Features dark/light mode, command palette, and custom cursor.",
    category: "Web Dev",
    tags: ["Next.js", "Three.js", "Framer Motion", "TypeScript", "Tailwind"],
    color: "#3b82f6",
    featured: true,
    github: "https://github.com/suxl7",
    demo: null,
    challenges: "Making 3D animations performant on all devices while maintaining Lighthouse 95+ scores.",
    solution: "Used dynamic imports with Suspense boundaries, lazy loading, and progressive enhancement for WebGL.",
  },
  {
    id: 4,
    title: "Deloitte Cybersecurity Internship Tasks",
    description: "Hands-on cybersecurity tasks including threat analysis, vulnerability assessment, and incident response reports.",
    longDescription: "Completed Deloitte's virtual cybersecurity internship involving real-world security scenarios: threat modeling, log analysis with SIEM tools, vulnerability scanning, and writing professional security audit reports following NIST framework.",
    category: "Security",
    tags: ["SIEM", "NIST", "Threat Analysis", "Incident Response", "Security Auditing"],
    color: "#8b5cf6",
    featured: false,
    github: null,
    demo: null,
    challenges: "Identifying attack vectors in complex enterprise network simulations with limited information.",
    solution: "Applied structured threat modeling (STRIDE) and cross-referenced CVE databases for accurate assessments.",
  },
];

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-dark rounded-2xl border border-zinc-700/50 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Accent bar */}
        <div className="h-1 w-full rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}60)` }} />

        <div className="p-6 border-b border-zinc-700/50 flex items-start justify-between gap-4">
          <div>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-full mb-2 inline-block"
              style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}
            >
              {project.category}
            </span>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-zinc-300 leading-relaxed">{project.longDescription}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
              <h4 className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Challenge</h4>
              <p className="text-sm text-zinc-300">{project.challenges}</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
              <h4 className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Solution</h4>
              <p className="text-sm text-zinc-300">{project.solution}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono text-zinc-500 mb-3 uppercase tracking-wider">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-medium"
                  style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 transition-colors"
              >
                <GithubIconLg /> View Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors"
                style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)` }}
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-py relative overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-sm font-mono text-blue-400 mb-4 tracking-widest uppercase">
            03. Projects
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto">
            A selection of projects that showcase my skills and passion for building.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all nav-link ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "glass border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 hover:border-transparent transition-all duration-300"
                style={{ boxShadow: "0 0 0 0 transparent" }}
                whileHover={{ y: -6, boxShadow: `0 0 0 2px ${project.color}60, 0 20px 40px ${project.color}15` }}
                onClick={() => setSelectedProject(project)}
                data-cursor-hover
              >
                {/* Colored top strip */}
                <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}40)` }} />

                {/* Number watermark */}
                <div
                  className="absolute top-4 right-4 text-6xl font-black opacity-5 select-none pointer-events-none"
                  style={{ color: project.color }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="p-6 flex flex-col h-full">
                  {/* Category + featured */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-xs font-mono px-2.5 py-1 rounded-full"
                      style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
                    >
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-xs font-medium"
                        style={{ background: `${project.color}10`, color: project.color }}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 rounded-md text-xs text-zinc-400">+{project.tags.length - 3}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors nav-link"
                        data-cursor-hover
                      >
                        <GithubIcon /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs font-medium transition-colors nav-link"
                        style={{ color: project.color }}
                        data-cursor-hover
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                    <button
                      className="ml-auto flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-blue-400 transition-colors group/btn nav-link"
                      onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                      data-cursor-hover
                    >
                      Details <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
