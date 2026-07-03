"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GradientOrbs } from "@/components/GradientOrbs";
import { AnimatedSection, AnimatedDiv } from "@/components/AnimatedSection";
import { SkillCard3D } from "@/components/SkillCard3D";
import { Starfield } from "@/components/Starfield";
import { MagneticButton, SocialButton } from "@/components/MagneticButton";
import { Mail, MapPin, Code, Server, Cloud, Globe } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { TechStackOrbit } from "@/components/three/TechStackOrbit";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CommandPalette, CommandPaletteTrigger } from "@/components/ui/CommandPalette";
import { ThemeProvider } from "@/components/providers/ThemeContext";

const Github = ({ className, style, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const Linkedin = ({ className, style, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Twitter = ({ className, style, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.751h-3.304l-7.15-8.256-7.15 8.256h-3.31l7.228-8.256L.78 2.25h3.308l7.15 8.256L18.244 2.25zM5.751 17.243l-1.89-2.18h3.31l1.89 2.18h-3.31zm12.508 0l1.89-2.18h-3.31l-1.89 2.18h3.31z" />
  </svg>
);

const skillCards = [
  {
    title: "Frontend Development",
    description: "Building responsive, accessible UIs with modern React ecosystem and type-safe development",
    skills: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Zustand", "React Hook Form"],
    color: "#3b82f6",
    icon: <Code className="w-6 h-6" />,
    index: 0,
  },
  {
    title: "Backend & APIs",
    description: "Designing scalable RESTful APIs, GraphQL servers, and real-time applications",
    skills: ["Node.js", "Express", "Fastify", "tRPC", "PostgreSQL", "MongoDB", "Redis", "Prisma", "Drizzle"],
    color: "#10b981",
    icon: <Server className="w-6 h-6" />,
    index: 1,
  },
  {
    title: "DevOps & Cloud",
    description: "Deploying and scaling applications with modern cloud infrastructure and CI/CD",
    skills: ["AWS", "Vercel", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Nginx", "Linux"],
    color: "#8b5cf6",
    icon: <Cloud className="w-6 h-6" />,
    index: 2,
  },
  {
    title: "Tools & Workflow",
    description: "Modern development tooling for productive and maintainable codebases",
    skills: ["Git", "VS Code", "Figma", "Postman", "Vitest", "Playwright", "ESLint", "Prettier", "Storybook"],
    color: "#f59e0b",
    icon: <Globe className="w-6 h-6" />,
    index: 3,
  },
];

const contactItems = [
  { icon: Mail, label: "Email", value: "sushil@yourdomain.com", href: "mailto:sushil@yourdomain.com", color: "#3b82f6" },
  { icon: MapPin, label: "Location", value: "Bangalore, India", href: null, color: "#10b981" },
  { icon: Github, label: "GitHub", value: "github.com/sushilsth", href: "https://github.com/sushilsth", color: "#8b5cf6" },
];

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((o) => !o);
      }
      if (e.key === "Escape") setCommandOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <>
        <LoadingScreen />
        <CustomCursor />
        <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans relative overflow-x-hidden">
        <div className="relative z-10 min-h-screen">
          <Starfield />
          <GradientOrbs />
          <Navbar />
          <main className="pt-20">
          {/* Hero Section */}
          <HeroSection />

          {/* About Section */}
          <AnimatedSection id="about" variant="slide-up" className="section-py bg-white dark:bg-zinc-950 relative">
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
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100">
                  Get to Know Me <span className="text-blue-600 dark:text-blue-400">Better</span>
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      I&apos;m a passionate Full Stack Developer with experience building scalable web applications.
                      I specialize in creating intuitive, performant, and accessible user experiences using modern technologies.
                    </p>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects,
                      or sharing knowledge through technical writing. I believe in clean code, continuous learning,
                      and building products that make a difference.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    {[
                      { value: "3+", label: "Years Experience" },
                      { value: "25+", label: "Projects Completed" },
                      { value: "15+", label: "Technologies" },
                      { value: "8+", label: "Open Source" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        className="text-center p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <p className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">What I Do</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Frontend Development", desc: "Building responsive, accessible UIs with React, Next.js, TypeScript, and Tailwind CSS", icon: <Code className="w-6 h-6" />, color: "#3b82f6" },
                      { title: "Backend Development", desc: "Designing RESTful APIs and microservices with Node.js, Python, and databases", icon: <Server className="w-6 h-6" />, color: "#10b981" },
                      { title: "DevOps & Cloud", desc: "Deploying and scaling applications on AWS, Vercel, Docker, and CI/CD pipelines", icon: <Cloud className="w-6 h-6" />, color: "#8b5cf6" },
                      { title: "Open Source", desc: "Contributing to open-source projects and building developer tools", icon: <Globe className="w-6 h-6" />, color: "#f59e0b" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="group relative flex gap-4 p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`, border: `1px solid ${item.color}30` }}
                          whileHover={{ scale: 1.1, rotateZ: [0, -3, 3, 0] }}
                          transition={{ duration: 0.4 }}
                        >
                          <span style={{ color: item.color }}>{item.icon}</span>
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h4>
                          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">{item.desc}</p>
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
          <AnimatedSection id="skills" variant="slide-up" className="section-py bg-zinc-50 dark:bg-zinc-900 relative">
            <GradientOrbs />
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
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100">
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
                <h3 className="text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
                  My Tech Universe
                </h3>
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

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Blog Section */}
          <BlogSection />

          {/* Contact Section */}
          <AnimatedSection id="contact" variant="slide-up" className="section-py bg-white dark:bg-zinc-950 relative">
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
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100">
                  Let&apos;s <span className="text-blue-600 dark:text-blue-400">Work Together</span>
                </h2>
                <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
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
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="group relative flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`, border: `1px solid ${item.color}30` }}>
                              <item.icon className="w-6 h-6" style={{ color: item.color }} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500">{item.label}</p>
                              <p className="text-zinc-900 dark:text-zinc-100 mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.value}</p>
                            </div>
                            <motion.div
                              className="absolute inset-0 rounded-2xl opacity-0"
                              style={{ background: `linear-gradient(135deg, ${item.color}10, ${item.color}20)` }}
                              whileHover={{ opacity: 1 }}
                            />
                          </a>
                        ) : (
                          <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`, border: `1px solid ${item.color}30` }}>
                              <item.icon className="w-6 h-6" style={{ color: item.color }} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500">{item.label}</p>
                              <p className="text-zinc-900 dark:text-zinc-100 mt-1">{item.value}</p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className="flex gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <SocialButton href="https://github.com/sushilsth" icon={Github} label="GitHub" color="#8b5cf6" />
                    <SocialButton href="https://linkedin.com/in/sushilsth" icon={Linkedin} label="LinkedIn" color="#0077b5" />
                    <SocialButton href="https://twitter.com/sushilsth" icon={Twitter} label="Twitter" color="#1da1f2" />
                  </motion.div>
                </div>
                <form className="relative bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100" />
                  <div className="relative z-10 grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Name</label>
                      <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Your Name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email</label>
                      <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Subject</label>
                    <input type="text" id="subject" name="subject" required className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Project Inquiry" />
                  </div>
                  <div className="relative z-10">
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Message</label>
                    <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder="Tell me about your project..."></textarea>
                  </div>
                  <MagneticButton type="submit" variant="primary" className="relative z-10 w-full" glow>
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </MagneticButton>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </main>
        </div>
        <Footer />
        <CommandPaletteTrigger onClick={() => setCommandOpen(true)} />
      </div>
    </>
  </ThemeProvider>
  );
}
