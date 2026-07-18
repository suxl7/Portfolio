"use client";


import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, AnimatedDiv } from "@/components/AnimatedSection";
import { SkillCard3D } from "@/components/SkillCard3D";
import { PremiumBackground } from "@/components/PremiumBackground";
import Image from "next/image";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { TechStackOrbit } from "@/components/three/TechStackOrbit";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

import { ThemeProvider } from "@/components/providers/ThemeContext";

function AboutTypewriter({ para1, para2 }: { para1: string; para2: string }) {
  const fullText = para1 + "\n\n" + para2;
  const chars = fullText.split("");
  const total = chars.length;
  const ref = useRef<HTMLParagraphElement>(null);

  // Timing constants (matches prior rhythm but handled in CSS)
  const CHAR_DELAY = 35; // ms per char stagger
  const REVEAL_DURATION = 120; // ms for each char reveal
  const totalDuration = CHAR_DELAY * total + REVEAL_DURATION;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startTimer: number | null = null;
    let restartTimer: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (el.classList.contains("tw-play")) return; // already playing

        el.classList.add("tw-play");

        // After the full reveal + a small pause, remove and re-add to emulate original replay timing
        startTimer = window.setTimeout(() => {
          el.classList.remove("tw-play");
          restartTimer = window.setTimeout(() => el.classList.add("tw-play"), 50);
        }, totalDuration + 900);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (startTimer) clearTimeout(startTimer);
      if (restartTimer) clearTimeout(restartTimer);
    };
  }, [total, totalDuration]);

  return (
    <p
      ref={ref}
      className="typewriter antialiased md:subpixel-antialiased text-xl font-normal leading-relaxed font-aerial text-justify"
    >
      {chars.map((char, idx) => {
        if (char === "\n") return <br key={`br-${idx}`} />;
        return (
          <span
            key={idx}
            className="type-char"
            style={{
              animationDelay: `${idx * CHAR_DELAY}ms`,
              animationDuration: `${REVEAL_DURATION}ms`,
            }}
          >
            {char}
          </span>
        );
      })}
    </p>
  );
}

const Github = ({ className, style, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);






const skillCards = [
  {
    title: "Frontend Development",
    description: "Building responsive, accessible UIs with modern React ecosystem and type-safe development",
    skills: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "React Hook Form"],
    color: "#3b82f6",
    icon: "/animatedIcon/ux-design.gif",
    index: 0,
  },
  {
    title: "Backend & APIs",
    description: "Designing scalable RESTful APIs, GraphQL servers, and real-time applications",
    skills: ["Node.js", "Django", "PostgreSQL" ],
    color: "#10b981",
    icon: "/animatedIcon/backend.gif",
    index: 1,
  },
  {
    title: "DevOps & Cloud",
    description: "Deploying and scaling applications with modern cloud infrastructure and CI/CD",
    skills: ["AWS", "Vercel", "Google Cloud", "Linux"],
    color: "#8b5cf6",
    icon: "/animatedIcon/cloud-computing.gif",
    index: 2,
  },
  {
    title: "Tools & Workflow",
    description: "Modern development tooling for productive and maintainable codebases",
    skills: ["GitHub", "VS Code", "Figma", "Postman", "Andoid Studio", "Antigravity" ],
    color: "#f59e0b",
    icon: "/animatedIcon/software.gif",
    index: 3,
  },
  {
    title: "Creative & Design",
    description: "Crafting visual content and video productions with industry-standard creative tools",
    skills: ["Adobe Illustrator", "DaVinci Resolve", "Graphic Design", "Video Editing"],
    color: "#ec4899",
    icon: "/animatedIcon/paint-palette.gif",
    index: 4,
  },
];

interface ContactItem {
  imgIcon?: string;
  svgIcon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  href: string | null;
  color: string;
}

function ContactIcon({ item }: { item: ContactItem }) {
  if (item.imgIcon) {
    return <Image src={item.imgIcon} alt={item.label} width={24} height={24} style={{ height: "auto" }} className="object-contain" />;
  }
  if (item.svgIcon) {
    const Icon = item.svgIcon;
    return <Icon className="w-6 h-6" style={{ color: item.color }} />;
  }
  return null;
}

const contactItems: ContactItem[] = [
  { imgIcon: "/icons/gmail.png",  label: "Email",    value: "chysushil34@gmail.com",       href: "mailto:chysushil34@gmail.com", color: "#3b82f6" },
  { imgIcon: "/icons/address.png",              label: "Location", value: "Godawari-1, Attariya Kailali", href: null,                          color: "#10b981" },
  { imgIcon: "/icons/github.png", label: "GitHub",   value: "github.com/suxl7",            href: "https://github.com/suxl7",    color: "#8b5cf6" },
];

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
}

interface ToastState {
  show: boolean;
  type: "success" | "error";
  message: string;
}

export default function Home() {
  //  Email Configuration  //

const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const [errors, setErrors] = useState<FormErrors>({});
const [toast, setToast] = useState<ToastState>({
  show: false,
  type: "success",
  message: "",
});

const [loading, setLoading] = useState(false);

const showToast = (type: "success" | "error", message: string) => {
  setToast({ show: true, type, message });
  window.setTimeout(() => {
    setToast((t) => ({ ...t, show: false }));
  }, 4500);
};

const validateForm = () => {
  const newErrors: FormErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "Please enter your name";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Please enter your email address";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    newErrors.email = "Please enter a valid email address";
  }

  if (!formData.subject.trim()) {
    newErrors.subject = "Please enter a subject";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("/api/contact", {     //Resend API CAll
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      showToast("success", "Message sent successfully! I'll get back to you soon.");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } else {
      showToast("error", "Failed to send message. Please try again.");
    }
  } catch (error) {
    console.error(error);
    showToast("error", "Something went wrong. Please try again.");
  }

  setLoading(false);
};

 

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <>
        <LoadingScreen />
        {/* Toast Notification */}
        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] w-[92%] max-w-md"
            >
              <div
                className={`flex items-start gap-3 rounded-xl border p-4 shadow-2xl backdrop-blur-md ${
                  toast.type === "success"
                    ? "bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-200 dark:border-emerald-800"
                    : "bg-red-50/95 dark:bg-red-950/90 border-red-200 dark:border-red-800"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    toast.type === "success"
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/15 text-red-600 dark:text-red-400"
                  }`}
                >
                  {toast.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <p
                    className={`text-sm font-semibold ${
                      toast.type === "success"
                        ? "text-emerald-800 dark:text-emerald-200"
                        : "text-red-800 dark:text-red-200"
                    }`}
                  >
                    {toast.type === "success" ? "Message Sent" : "Something Went Wrong"}
                  </p>
                  <p
                    className={`text-sm mt-0.5 ${
                      toast.type === "success"
                        ? "text-emerald-700/90 dark:text-emerald-300/90"
                        : "text-red-700/90 dark:text-red-300/90"
                    }`}
                  >
                    {toast.message}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setToast((t) => ({ ...t, show: false }))}
                  className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] font-sans relative overflow-x-hidden">
        <PremiumBackground />
        <div className="relative z-10 min-h-screen">
          <Navbar />
          <main className="pt-20">
          {/* Hero Section */}
          <HeroSection />

          {/* About Section */}
          <AnimatedSection id="about" variant="slide-up" className="section-py bg-white/90 dark:bg-zinc-950/35 relative">
            <div className="section-container">
              <div className="text-center mb-16">
                <motion.span
                  className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 mb-4 tracking-wider uppercase"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  About Me
                </motion.span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-zinc-100">
                  Get to Know Me <span className="text-blue-600 dark:text-blue-400">Better</span>
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <AboutTypewriter
                      para1="I'm Sushil Chaudhary, a computer engineering graduate who enjoys building clean web apps and learning new cloud tools. I like creating simple digital experiences that people can use easily."
                      para2="I focus on solving real problems, paying attention to the small details, and making software that feels useful. I am always open to new challenges and ways to improve."
                    />
                  </div>       
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">What I Do</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Frontend Development", desc: "Building responsive, accessible UIs with React, Next.js, TypeScript, and Tailwind CSS", icon: "/animatedIcon/ux-design.gif", color: "#3b82f6" },
                      { title: "Backend Development", desc: "Designing RESTful APIs and microservices with Node.js, Python, and PostgreSQL", icon: "/animatedIcon/backend.gif", color: "#10b981" },
                      { title: "Creative & Design", desc: "Graphic designing and video editing using Adobe Illustrator and DaVinci Resolve", icon: "/animatedIcon/paint-palette.gif", color: "#ec4899" },
                     
                      
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="group relative flex gap-4 p-6 bg-white dark:bg-white/[0.03] rounded-xl border border-slate-200/80 dark:border-white/[0.08] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/30 shadow-[0_1px_4px_rgba(15,23,42,0.06)] dark:shadow-none"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                          style={{}}
                        >
                          <span style={{ color: item.color }}>
                            {typeof item.icon === "string" ? (
                              <img src={item.icon} alt={item.title} className="h-full w-full object-cover rounded-lg" />
                            ) : (
                              item.icon
                            )}
                          </span>
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h4>
                          <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">{item.desc}</p>
                        </div>
                        <motion.div
                          className="absolute bottom-0 right-0 w-16 h-16 rounded-full opacity-0 group-hover:opacity-10 pointer-events-none"
                          style={{ background: `radial-gradient(circle, ${item.color}, transparent 70%)` }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Skills Section */}
          <AnimatedSection id="skills" variant="slide-up" className="section-py bg-slate-50/90 dark:bg-zinc-900/30 relative">
            <div className="section-container relative z-10">
              <div className="text-center mb-16">
                <motion.span
                  className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 mb-4 tracking-wider uppercase"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Skills
                </motion.span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-zinc-100">
                  Technologies <span className="text-blue-600 dark:text-blue-400">& Tools</span>
                </h2>
              </div>
              <AnimatedDiv variant="stagger" staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillCards.map((card) => (
                  <SkillCard3D key={card.title} {...card} />
                ))}
              </AnimatedDiv>

              {/* Tech Stack Orbit */}
              <motion.div
                className="mt-20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >        
                <TechStackOrbit />
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Projects Section */}
          <ProjectsSection />

          {/* Experience Section */}
          <ExperienceSection />

          {/* Certifications Section */}
          <CertificationsSection />

          {/* Education Section */}
          <EducationSection />

          {/* Contact Section */}
          <AnimatedSection id="contact" variant="slide-up" className="section-py bg-white/90 dark:bg-zinc-950/35 relative">
            <div className="section-container">
              <div className="text-center mb-16">
                <motion.span
                  className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 mb-4 tracking-wider uppercase"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Contact
                </motion.span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-zinc-100">
                  Let&apos;s <span className="text-blue-600 dark:text-blue-400">Work Together</span>
                </h2>
                <p className="mt-6 text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
                  Have a project in mind or just want to say hi? I&apos;d love to hear from you.
                </p>

              </div>
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                <div className="space-y-10">
                  <div className="space-y-6">
                    {contactItems.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                      >
                        {item.href ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="group relative flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all shadow-[0_1px_4px_rgba(15,23,42,0.05)] dark:shadow-none">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`, border: `1px solid ${item.color}30` }}>
                              <ContactIcon item={item} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-400 dark:text-zinc-500">{item.label}</p>
                              <p className="text-slate-900 dark:text-zinc-100 mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.value}</p>
                            </div>
                            <motion.div
                              className="absolute inset-0 rounded-2xl opacity-0"
                              style={{ background: `linear-gradient(135deg, ${item.color}10, ${item.color}20)` }}
                              whileHover={{ opacity: 1 }}
                            />
                          </a>
                        ) : (
                          <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] shadow-[0_1px_4px_rgba(15,23,42,0.05)] dark:shadow-none">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`, border: `1px solid ${item.color}30` }}>
                              <ContactIcon item={item} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-400 dark:text-zinc-500">{item.label}</p>
                              <p className="text-slate-900 dark:text-zinc-100 mt-1">{item.value}</p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className="flex gap-4 pt-6 border-t border-slate-200 dark:border-zinc-800"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    
                  </motion.div>


              {/* Email Sending Form */}
                </div>

                <form
  onSubmit={handleSubmit}
  noValidate
  className="group relative bg-white dark:bg-white/[0.03] rounded-xl border border-slate-200/80 dark:border-white/[0.08] p-6 sm:p-8 space-y-6 overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.07)] dark:shadow-none"
>
  {/* Background Effect */}
  <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />

  {/* Name & Email */}
  <div className="relative z-10 grid sm:grid-cols-2 gap-6">
    <div>
      <label
        htmlFor="name"
        className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2"
      >
        Name
      </label>

      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
          if (errors.name) setErrors({ ...errors, name: undefined });
        }}
        className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
          errors.name
            ? "border-red-400 dark:border-red-600 focus:ring-red-500"
            : "border-slate-300 dark:border-zinc-700 focus:ring-blue-500"
        }`}
        placeholder="Your Name"
      />
      {errors.name && (
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
      )}
    </div>

    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2"
      >
        Email
      </label>

      <input
        type="text"
        id="email"
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
          if (errors.email) setErrors({ ...errors, email: undefined });
        }}
        className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
          errors.email
            ? "border-red-400 dark:border-red-600 focus:ring-red-500"
            : "border-slate-300 dark:border-zinc-700 focus:ring-blue-500"
        }`}
        placeholder="your@email.com"
      />
      {errors.email && (
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
      )}
    </div>
  </div>

  {/* Subject */}
  <div className="relative z-10">
    <label
      htmlFor="subject"
      className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2"
    >
      Subject
    </label>

    <input
      type="text"
      id="subject"
      value={formData.subject}
      onChange={(e) => {
        setFormData({ ...formData, subject: e.target.value });
        if (errors.subject) setErrors({ ...errors, subject: undefined });
      }}
      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
        errors.subject
          ? "border-red-400 dark:border-red-600 focus:ring-red-500"
          : "border-slate-300 dark:border-zinc-700 focus:ring-blue-500"
      }`}
      placeholder="Project Inquiry"
    />
    {errors.subject && (
      <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
    )}
  </div>

  {/* Message */}
  <div className="relative z-10">
    <label
      htmlFor="message"
      className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2"
    >
      Message (Optional)
    </label>

    <textarea
      id="message"
      rows={6}
      value={formData.message}
      onChange={(e) =>
        setFormData({ ...formData, message: e.target.value })
      }
      className="w-full min-h-[160px] px-4 py-3 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
      placeholder="Tell me about your project..."
    />
  </div>

 {/* Submit Button */}
<div className="relative z-20">
  <motion.button
    type="submit"
    disabled={loading}
    whileHover={{ scale: loading ? 1 : 1.01 }}
    whileTap={{ scale: loading ? 1 : 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    className="group relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl
               bg-gradient-to-b from-zinc-800 to-zinc-950
               dark:from-zinc-100 dark:to-white
               text-white dark:text-zinc-900
               font-semibold text-base tracking-wide
               border border-white/10 dark:border-black/5
               shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-8px_rgba(0,0,0,0.5)]
               dark:shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_8px_24px_-8px_rgba(0,0,0,0.25)]
               overflow-hidden
               transition-shadow duration-300
               hover:shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_12px_32px_-8px_rgba(79,70,229,0.45)]
               disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {/* Shine sweep on hover */}
    <span
      className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full
                 transition-transform duration-700 ease-out
                 bg-gradient-to-r from-transparent via-white/10 to-transparent
                 dark:via-black/10 skew-x-12"
    />

    {loading ? (
      <>
        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
          <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span className="relative">Sending...</span>
      </>
    ) : (
      <>
        <span className="relative">Send Message</span>
        <svg
          className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 12h15" />
        </svg>
      </>
    )}
  </motion.button>
</div>
</form>
              </div>
            </div>
          </AnimatedSection>
        </main>
        </div>
        <Footer />
      </div>
    </>
  </ThemeProvider>
  );
}