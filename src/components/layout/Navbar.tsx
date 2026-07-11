"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Menu, X, Home, User, Zap, FolderGit2, Briefcase, Award, Mail } from "lucide-react";

const navLinks = [
  { href: "#hero", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#skills", label: "Skills", icon: Zap },
  { href: "#projects", label: "Projects", icon: FolderGit2 },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#certifications", label: "Certificates", icon: Award },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sections = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 dark:bg-[#03030a]/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo — left */}
          <motion.button
            onClick={() => scrollTo("#hero")}
            className="flex items-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            data-cursor-hover
          >

            <span className="relative font-sharpie font-extrabold text-3xl tracking-tight bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(139,92,246,0.5)] group-hover:drop-shadow-[0_0_18px_rgba(139,92,246,0.75)] transition-all duration-300">
              Sushil
              <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-70 scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-left" />
            </span>
          </motion.button>

          {/* Desktop Nav — truly centered */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, i) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.slice(1);
              const isHovered = hoveredIndex === i;

              return (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="group relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200 nav-link"
                  data-cursor-hover
                  whileTap={{ scale: 0.93 }}
                >
                  {/* Active pill */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(16,185,129,0.12))",
                        boxShadow: "inset 0 0 0 1px rgba(34,197,94,0.3), 0 0 16px rgba(34,197,94,0.15)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover pill */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(45, 106, 191, 0.08), rgba(77, 28, 174, 0.06))",
                        boxShadow: "inset 0 0 0 1px rgba(34,197,94,0.15)",
                      }}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}

                  {/* Icon */}
                  <motion.span
                    className="relative z-10 flex-shrink-0"
                    animate={{
                      color: isActive
                        ? "#22c55e"
                        : isHovered
                        ? "#b6ae9f"
                        : "#71717a",
                      scale: isActive ? 1.15 : isHovered ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Icon className="w-[17px] h-[17px]" />
                  </motion.span>

                  {/* Label — slides in on hover or active */}
                  <motion.span
                    className="relative z-10 whitespace-nowrap overflow-hidden"
                    animate={{
                      maxWidth: isActive || isHovered ? 72 : 0,
                      opacity: isActive || isHovered ? 1 : 0,
                      color: isActive ? "#22c55e" : isHovered ? "#b6ae9f" : "#71717a",
                    }}
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    style={{ display: "block", maxWidth: 0 }}
                  >
                    {link.label}
                  </motion.span>

                  {/* Bottom glow line */}
                  <motion.span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #22c55e, #4ade80)",
                    }}
                    animate={{
                      width: isActive ? "60%" : isHovered ? "40%" : "0%",
                      opacity: isActive ? 1 : isHovered ? 0.6 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Mobile toggle */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors nav-link"
              aria-label="Toggle menu"
              data-cursor-hover
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute top-16 left-4 right-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-2xl shadow-black/20 p-3 space-y-1"
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            >
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors nav-link ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-500/10 dark:to-violet-500/10 text-indigo-600 dark:text-indigo-400"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
                    }`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, type: "spring", stiffness: 380, damping: 28 }}
                    data-cursor-hover
                  >
                    <Icon
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: isActive ? "#6366f1" : undefined }}
                    />
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="mobile-active-dot"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500"
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
