"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Professor, Computer Science",
    company: "VTU",
    avatar: "PS",
    content: "Sushil was one of my brightest students during his undergraduate studies. His ability to grasp complex concepts and apply them to real-world problems is exceptional. He consistently delivered outstanding projects that demonstrated both technical depth and creativity.",
    color: "#3b82f6",
    social: { type: "linkedin", url: "https://linkedin.com" },
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Senior Software Engineer",
    company: "TechCorp",
    avatar: "RV",
    content: "I had the pleasure of mentoring Sushil during his internship. His dedication to writing clean, maintainable code and his eagerness to learn new technologies made him stand out. He would be a valuable addition to any engineering team.",
    color: "#10b981",
    social: { type: "linkedin", url: "https://linkedin.com" },
  },
  {
    id: 3,
    name: "Anita Krishnan",
    role: "Tech Lead",
    company: "StartupXYZ",
    avatar: "AK",
    content: "Sushil's work on our portfolio builder project was impressive. He has a keen eye for design and user experience, combined with solid technical skills. His ability to implement complex 3D animations while maintaining performance shows his attention to detail.",
    color: "#8b5cf6",
    social: { type: "twitter", url: "https://twitter.com" },
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Cybersecurity Analyst",
    company: "SecureTech",
    avatar: "VS",
    content: "During the cybersecurity workshop we conducted, Sushil asked insightful questions that showed a deep understanding of security principles. His knowledge of threat analysis and defensive security is remarkable for someone at his career stage.",
    color: "#f59e0b",
    social: { type: "linkedin", url: "https://linkedin.com" },
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 7000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section-py relative overflow-hidden">
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
            07. Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white">
            Kind{" "}
            <span className="text-gradient">Words</span>
          </h2>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative min-h-[320px] sm:min-h-[280px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction < 0 ? 100 : -100, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute inset-0"
            >
              <div className="h-full glass border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl p-8 sm:p-10 flex flex-col">
                {/* Quote icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${current.color}15`, border: `1px solid ${current.color}30` }}
                >
                  <Quote className="w-6 h-6" style={{ color: current.color }} />
                </div>

                {/* Content */}
                <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed flex-grow italic">
                  "{current.content}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: `linear-gradient(135deg, ${current.color}, ${current.color}cc)` }}
                    >
                      {current.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-white">{current.name}</p>
                      <p className="text-sm text-zinc-500">
                        {current.role} at {current.company}
                      </p>
                    </div>
                  </div>
                  <a
                    href={current.social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    {current.social.type === "linkedin" ? (
                      <svg className="w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    ) : (
                      <svg className="w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.751h-3.304l-7.15-8.256-7.15 8.256h-3.31l7.228-8.256L.78 2.25h3.308l7.15 8.256L18.244 2.25z"/></svg>
                    )}
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => paginate(-1)}
            className="w-10 h-10 rounded-xl glass border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? "w-6 bg-blue-500" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={() => paginate(1)}
            className="w-10 h-10 rounded-xl glass border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
