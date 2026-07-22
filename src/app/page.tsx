"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedDiv } from "@/components/AnimatedSection";
import { SkillCard3D } from "@/components/SkillCard3D";
import { PremiumBackground } from "@/components/PremiumBackground";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ContactForm } from "@/components/forms/ContactForm";
import { TechStackOrbitWrapper } from "@/components/three/TechStackOrbitWrapper";

// Dynamic imports for below-the-fold sections
const ProjectsSection = dynamic(() =>
  import("@/components/sections/ProjectsSection").then((m) => m.ProjectsSection),
  {
    loading: () => <div className="h-96 animate-pulse bg-zinc-800/20 rounded-lg" />,
  }
);

const ExperienceSection = dynamic(() =>
  import("@/components/sections/ExperienceSection").then((m) => m.ExperienceSection),
  {
    loading: () => <div className="h-96 animate-pulse bg-zinc-800/20 rounded-lg" />,
  }
);

const CertificationsSection = dynamic(() =>
  import("@/components/sections/CertificationsSection").then((m) => m.CertificationsSection),
  {
    loading: () => <div className="h-96 animate-pulse bg-zinc-800/20 rounded-lg" />,
  }
);

const EducationSection = dynamic(() =>
  import("@/components/sections/EducationSection").then((m) => m.EducationSection),
  {
    loading: () => <div className="h-96 animate-pulse bg-zinc-800/20 rounded-lg" />,
  }
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
    skills: ["Node.js", "Django", "PostgreSQL"],
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
    skills: ["GitHub", "VS Code", "Figma", "Postman", "Andoid Studio", "Antigravity"],
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
    return (
      <Image
        src={item.imgIcon}
        alt={item.label}
        width={24}
        height={24}
        style={{ height: "auto" }}
        className="object-contain"
      />
    );
  }
  if (item.svgIcon) {
    const Icon = item.svgIcon;
    return <Icon className="w-6 h-6" style={{ color: item.color }} />;
  }
  return null;
}

const contactItems: ContactItem[] = [
  { imgIcon: "/icons/gmail.png", label: "Email", value: "chysushil34@gmail.com", href: "mailto:chysushil34@gmail.com", color: "#3b82f6" },
  { imgIcon: "/icons/address.png", label: "Location", value: "Godawari-1, Attariya Kailali", href: null, color: "#10b981" },
  { imgIcon: "/icons/github.png", label: "GitHub", value: "github.com/suxl7", href: "https://github.com/suxl7", color: "#8b5cf6" },
];

export default function Home() {
  return (
    <>
      <LoadingScreen />

      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans relative overflow-x-hidden">
        <PremiumBackground />
        <div className="relative z-10 min-h-screen">
          <Navbar />
          <main className="pt-20">
            {/* Hero Section */}
            <HeroSection />

            {/* About Section */}
            <AnimatedSection id="about" variant="slide-up" className="section-py bg-white/90 dark:bg-white/[0.04] relative">
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
                      <p className="antialiased md:subpixel-antialiased text-xl font-normal leading-relaxed font-aerial text-justify">
                        I'm Sushil Chaudhary, a computer engineering graduate who enjoys building clean web apps and learning new cloud tools. I like creating simple digital experiences that people can use easily.
                      </p>
                      <p className="antialiased md:subpixel-antialiased text-xl font-normal leading-relaxed font-aerial text-justify">
                        I focus on solving real problems, paying attention to the small details, and making software that feels useful. I am always open to new challenges and ways to improve.
                      </p>
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
                                <Image src={item.icon} alt={item.title} width={56} height={56} className="h-full w-full object-cover rounded-lg" />
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

                {/* Tech Stack Orbit - Wrapped client component with lazy loading */}
                <motion.div
                  className="mt-20"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <TechStackOrbitWrapper />
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Projects Section - Dynamically loaded */}
            <ProjectsSection />

            {/* Experience Section - Dynamically loaded */}
            <ExperienceSection />

            {/* Certifications Section - Dynamically loaded */}
            <CertificationsSection />

            {/* Education Section - Dynamically loaded */}
            <EducationSection />

            {/* Contact Section */}
            <AnimatedSection id="contact" variant="slide-up" className="section-py bg-white/90 dark:bg-white/[0.04] relative">
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
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all shadow-[0_1px_4px_rgba(15,23,42,0.05)] dark:shadow-none"
                            >
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{
                                  background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`,
                                  border: `1px solid ${item.color}30`,
                                }}
                              >
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
                            <div
                              className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] shadow-[0_1px_4px_rgba(15,23,42,0.05)] dark:shadow-none"
                            >
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{
                                  background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`,
                                  border: `1px solid ${item.color}30`,
                                }}
                              >
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
                  </div>

                  {/* Contact Form - Client Component */}
                  <ContactForm />
                </div>
              </div>
            </AnimatedSection>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}

