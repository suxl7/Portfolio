"use client";

import { useEffect, useState, useRef, memo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Mail, ChevronDown } from "lucide-react";

const roles = [
  "Full Stack Web Developer",
  "AI/ML Enthusiast",
  "Cloud Computing Learner",
];

const stats = [
  { value: "4+",  label: "Years Learning" },
  { value: "3+", label: "Projects Built" },
  { value: "10+", label: "Technologies"   },
  { value: "1",  label: "Certifications" },
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
        { icon: "/icons/icons8-aws-512.png",         x: "80%",  y: "10%", color: "#ff9900", label: "AWS" },
        { icon: "/icons/python.png",                  x: "-8%", y: "72%", color: "#3776ab", label: "Python" },
        { icon: "/icons/postgre.png",                 x: "78%",  y: "87%", color: "#336791", label: "PostgreSQL" },
        { icon: "/icons/icons8-google-cloud-512.png", x: "-9%", y: "18%", color: "#4285f4", label: "GCloud" },
        { icon: "/icons/icons8-react-native-512.png",         x: "91%",  y: "50%", color: "#297da1", label: "React" },

      ].map((badge, i) => (
        <motion.div
          key={badge.label}
          className="absolute rounded-xl glass border p-1.5"
          style={{ left: badge.x, top: badge.y, borderColor: `${badge.color}40`, background: `${badge.color}15` }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          <Image src={badge.icon} alt={badge.label} width={28} height={28} />
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
                className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
                style={{ padding: "0.75rem 1.5rem", lineHeight: 1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
              >
                <Download className="w-4 h-4 shrink-0" />
                <span style={{ lineHeight: 1 }}>Download CV</span>
              </motion.a>
              <motion.button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-zinc-900 dark:text-zinc-100 border-2 border-zinc-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                style={{ padding: "0.75rem 1.5rem", lineHeight: 1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span style={{ lineHeight: 1 }}>Contact Me</span>
              </motion.button>
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

