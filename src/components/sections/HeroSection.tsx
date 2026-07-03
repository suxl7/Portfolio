"use client";

import { useEffect, useState, useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Mail, ChevronDown, Code, Briefcase, Share2 } from "lucide-react";


const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const GmailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6.5C2 5.67 2.67 5 3.5 5h17C21.33 5 22 5.67 22 6.5v11c0 .83-.67 1.5-1.5 1.5h-17C2.67 19 2 18.33 2 17.5V6.5Z" fill="white"/>
    <path d="M2 6.5L12 13.5 22 6.5V5.5L12 12.5 2 5.5V6.5Z" fill="#EA4335"/>
    <path d="M2 6.5V17.5L7.5 12 2 6.5Z" fill="#34A853"/>
    <path d="M22 6.5V17.5L16.5 12 22 6.5Z" fill="#FBBC05"/>
    <path d="M7.5 12L2 17.5H22L16.5 12L12 15.5 7.5 12Z" fill="#4285F4"/>
  </svg>
);

const roles = [
  "Aspiring Software Developer",
  "Cybersecurity Enthusiast",
  "Full Stack Developer",
  "Cloud Computing Learner",
];
const socialLinks = [
  {
    icon: GithubIcon,
    href: "https://github.com/suxl7",
    label: "GitHub",
    color: "#8b5cf6",
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/sushil-chaudhary-31baa0328/",
    label: "LinkedIn",
    color: "#0077b5",
  },
  {
    icon: GmailIcon,
    href: "mailto:chysushil34@gmail.com",
    label: "Email",
    color: "#06b6d4",
  },
];


const stats = [
  { value: "4+",  label: "Years Learning" },
  { value: "5", label: "Projects Built" },
  { value: "10+", label: "Technologies"   },
  { value: "4+",  label: "Certifications" },
];

// memo so its setDisplayed never causes parent re-renders
const TypingText = memo(function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentRole.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(
          currentRole.slice(0, displayedText.length + 1)
        );
      }, 80);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      // Pause before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(
          currentRole.slice(0, displayedText.length - 1)
        );
      }, 40);
    } else {
      // Move to next role
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 300);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <span className="text-gradient font-semibold">
      {displayedText}
      <span className="ml-1 text-blue-400 animate-pulse">|</span>
    </span>
  );
});
// const TypingText = memo(function TypingText() {
//   const [displayed, setDisplayed] = useState("");
//   const roleIndex = useRef(0);
//   const deleting  = useRef(false);
//   const timer     = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     function tick() {
//       const current = roles[roleIndex.current];
//       if (!deleting.current) {
//         setDisplayed((prev) => {
//           const next = current.slice(0, prev.length + 1);
//           timer.current = next === current
//             ? setTimeout(() => { deleting.current = true; tick(); }, 2000)
//             : setTimeout(tick, 60);
//           return next;
//         });
//       } else {
//         setDisplayed((prev) => {
//           const next = prev.slice(0, -1);
//           if (next === "") {
//             deleting.current = false;
//             roleIndex.current = (roleIndex.current + 1) % roles.length;
//             timer.current = setTimeout(tick, 400);
//           } else {
//             timer.current = setTimeout(tick, 35);
//           }
//           return next;
//         });
//       }
//     }
//     timer.current = setTimeout(tick, 600);
//     return () => { if (timer.current) clearTimeout(timer.current); };
//   }, []);

//   return (
//     <span className="text-gradient font-semibold">
//       {displayed}
//       <span className="animate-pulse text-blue-400">|</span>
//     </span>
//   );
// });

function HolographicAvatar() {
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl animate-pulse" />

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-blue-500/20"
          style={{ inset: `${i * 16}px` }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {[0, 1, 2].map((i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: ["#3b82f6", "#8b5cf6", "#06b6d4"][i],
            top: "50%", left: "50%",
            boxShadow: `0 0 10px ${["#3b82f6", "#8b5cf6", "#06b6d4"][i]}`,
          }}
          animate={{
            x: [0,1,2,3,4].map((k) => Math.cos((i*2*Math.PI)/3 + (k*Math.PI)/2) * 120),
            y: [0,1,2,3,4].map((k) => Math.sin((i*2*Math.PI)/3 + (k*Math.PI)/2) * 120),
          }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <motion.div
        className="absolute inset-8 rounded-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f172a, #1e1b4b, #0f172a)",
          border: "1px solid rgba(139,92,246,0.3)",
          boxShadow: "0 0 60px rgba(139,92,246,0.2), inset 0 0 60px rgba(59,130,246,0.05)",
        }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.3) 1px,transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="text-7xl font-black text-gradient mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >S</motion.div>
          <div className="text-xs text-blue-400/70 font-mono tracking-widest">SUSHIL.DEV</div>
          <div className="mt-3 flex gap-1">
            {[0,1,2,3,4].map((i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-blue-400"
                animate={{ height: [4, 16, 4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {[
        { label: "React",    x: "-20%", y: "15%", color: "#61dafb" },
        { label: "AWS",      x: "85%",  y: "20%", color: "#ff9900" },
        { label: "Python",   x: "-15%", y: "75%", color: "#3776ab" },
        { label: "Security", x: "80%",  y: "70%", color: "#ef4444" },
      ].map((badge, i) => (
        <motion.div
          key={badge.label}
          className="absolute px-2 py-1 rounded-lg text-xs font-bold glass border"
          style={{ left: badge.x, top: badge.y, color: badge.color, borderColor: `${badge.color}40`, background: `${badge.color}10` }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          {badge.label}
        </motion.div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
    >
      <motion.div className="section-container relative z-10 pt-20" style={{ y, opacity }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left column — CSS stagger, no Framer entrance ── */}
          <div className="flex flex-col gap-7">

            {/* 1 */ }
            <div className="hero-item inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-zinc-400">Available for opportunities</span>
            </div>

            {/* 2 */}
            <div className="hero-item">
              <p className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-3">
                Hi, I&apos;m Sushil 👋
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-white leading-[1.05] tracking-tight">
                Computer
                <br />
                <span className="text-gradient">Engineer</span>
              </h1>
            </div>

            {/* 3 — TypingText lives here; memo keeps it isolated */}
            <div className="hero-item text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 min-h-[2rem]">
              <TypingText />
            </div>

            {/* 4 */}
            <p className="hero-item text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
              Passionate about building secure, scalable, and beautiful digital experiences.
              Exploring the intersection of software development, cybersecurity, and cloud computing.
            </p>

            {/* 5 */}
            <div className="hero-item flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.a>
              <motion.button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-zinc-900 dark:text-zinc-100 border-2 border-zinc-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </motion.button>
            </div>

            {/* 6 */}
            <div className="hero-item flex items-center gap-4">
              <span className="text-xs text-zinc-500 uppercase tracking-wider shrink-0">Find me on</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center glass border transition-colors social-link"
                    style={{ borderColor: `${s.color}30`, color: s.color }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-hover
                  >
                    <s.icon className="w-4 h-4 shrink-0" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* 7 */}
            <div className="hero-item grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              {stats.map((stat) => (
                <motion.div key={stat.label} className="text-center" whileHover={{ y: -3 }}>
                  <div className="text-2xl font-black text-gradient">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* ── Right — Holographic Avatar ── */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 80 }}
          >
            <HolographicAvatar />
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-item"
        style={{ animationDelay: "1.55s" }}
      >
        <motion.button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors nav-link"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
          data-cursor-hover
        >
          <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}

