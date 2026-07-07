"use client";

import { useEffect, useState, memo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Mail, ChevronDown } from "lucide-react";

const roles = [
  "Full Stack Developer",
  "Cloud Enthusiast",
  "Cybersecurity Learner",
  "Backend Engineer",
];

const stats = [
  { value: "4+", label: "Years Learning" },
  { value: "3+", label: "Projects Built" },
  { value: "10+", label: "Technologies" },
  { value: "2", label: "Certifications" },
];

const techBadges = [
  { icon: "/icons/icons8-react-native-512.png", label: "React", className: "left-2 top-8" },
  { icon: "/icons/python.png", label: "Python", className: "left-0 bottom-16" },
  { icon: "/icons/icons8-aws-512.png", label: "AWS", className: "right-3 top-12" },
  { icon: "/icons/postgre.png", label: "PostgreSQL", className: "right-8 bottom-8" },
];

const TypingText = memo(function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(roles[0]);
      return;
    }

    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, 80);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      }, 38);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 320);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, shouldReduceMotion]);

  return (
    <span className="text-gradient font-semibold">
      {displayedText}
      {!shouldReduceMotion && <span className="ml-1 text-blue-400 animate-pulse">|</span>}
    </span>
  );
});

function PremiumHeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <div className="absolute inset-4 rounded-full border border-white/10 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-cyan-500/10" />
      <div className="hero-ring hero-ring--outer" />
      <div className="hero-ring hero-ring--inner" />
      <div className="absolute inset-12 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 shadow-2xl shadow-blue-950/30 backdrop-blur">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_75%_70%,rgba(6,182,212,0.12),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-6xl font-black text-gradient">
            S
          </div>
          <div className="text-xs font-mono tracking-[0.28em] text-blue-300/80">SUSHIL.DEV</div>
          <div className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/80" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            </div>
            <div className="space-y-2 text-left font-mono text-[11px] text-slate-400">
              <p>
                <span className="text-blue-300">const</span> focus = "secure systems";
              </p>
              <p>
                <span className="text-cyan-300">ship</span>("clean web apps");
              </p>
            </div>
          </div>
        </div>
      </div>

      {techBadges.map((badge, i) => (
        <div
          key={badge.label}
          className={`hero-tech-badge absolute rounded-xl border border-white/10 bg-white/[0.06] p-2 shadow-lg shadow-black/20 backdrop-blur ${badge.className}`}
          style={{ animationDelay: `${i * 0.8}s` }}
        >
          <Image src={badge.icon} alt={badge.label} width={28} height={28} />
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
    >
      <div className="section-container relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-7">
            <div className="hero-item inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-zinc-600 dark:text-zinc-400">Available for opportunities</span>
            </div>

            <div className="hero-item">
              <p className="text-blue-500 dark:text-blue-400 font-mono text-sm tracking-widest uppercase mb-3">
                Hi, I&apos;m Sushil
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-white leading-[1.04] tracking-tight">
                Building Secure &
                <br />
                <span className="text-gradient">Scalable Software</span>
              </h1>
            </div>

            <div className="hero-item text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 min-h-[2rem]">
              <TypingText />
            </div>

            <p className="hero-item text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
              Passionate about building secure, scalable, and beautiful digital experiences.
              Exploring the intersection of software development, cybersecurity, and cloud computing.
            </p>

            <div className="hero-item flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
                style={{ padding: "0.75rem 1.5rem", lineHeight: 1 }}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
              >
                <Download className="w-4 h-4 shrink-0" />
                <span style={{ lineHeight: 1 }}>Download CV</span>
              </motion.a>
              <motion.button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-colors"
                style={{ padding: "0.75rem 1.5rem", lineHeight: 1 }}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span style={{ lineHeight: 1 }}>Contact Me</span>
              </motion.button>
            </div>

            <div className="hero-item grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-200 dark:border-white/[0.08]">
              {stats.map((stat) => (
                <motion.div key={stat.label} className="text-center" whileHover={{ y: -3 }}>
                  <div className="text-2xl font-black text-gradient">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, scale: 0.94, x: 32 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <PremiumHeroVisual />
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-item"
        style={{ animationDelay: "1.55s" }}
      >
        <button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors nav-link"
          data-cursor-hover
        >
          <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
