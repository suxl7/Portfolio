"use client";

import { motion } from "framer-motion";
import { ArrowUp, Heart, Mail } from "lucide-react";

// Custom social icons
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

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.751h-3.304l-7.15-8.256-7.15 8.256h-3.31l7.228-8.256L.78 2.25h3.308l7.15 8.256L18.244 2.25z"/>
  </svg>
);

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/sushilsth", label: "GitHub", color: "#8b5cf6" },
  { icon: LinkedinIcon, href: "https://linkedin.com/in/sushilsth", label: "LinkedIn", color: "#0077b5" },
  { icon: TwitterIcon, href: "https://twitter.com/sushilsth", label: "Twitter", color: "#1da1f2" },
  { icon: Mail, href: "mailto:sushil@yourdomain.com", label: "Email", color: "#ef4444" },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-100 dark:from-zinc-900 to-transparent opacity-50" />
      
      <div className="section-container relative z-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Sushil<span className="text-blue-500">.</span>
              </span>
            </motion.div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Computer Engineering graduate passionate about building scalable applications, 
              exploring cybersecurity, and creating impactful solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <motion.div
              className="grid grid-cols-2 gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors nav-link"
                  data-cursor-hover
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">
              Connect
            </h3>
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-blue-500/50 transition-colors social-link"
                  aria-label={social.label}
                  data-cursor-hover
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500 flex items-center gap-1">
              © {new Date().getFullYear()} Sushil. Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> using Next.js, Three.js & Framer Motion
            </p>
            
            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors nav-link"
              whileHover={{ y: -2 }}
              data-cursor-hover
            >
              Back to top <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
