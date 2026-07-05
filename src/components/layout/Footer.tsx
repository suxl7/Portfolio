"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";

const socialLinks = [
  { icon: "/icons/linkedin.png", href: "https://www.linkedin.com/in/sushil-chaudhary-31baa0328/", label: "LinkedIn" },
  { icon: "/icons/facebook.png", href: "https://www.facebook.com/share/1E4tAcp66W/", label: "Facebook" },
  { icon: "/icons/instagram (1).png", href: "https://www.instagram.com/sushilchaudhary__34?igsh=NTlybXFrcmp3dHpu", label: "Instagram" },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
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
              exploring AI/ML and Cloud and creating impactful solutions.
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
                  className="w-10 h-10 rounded-xl glass border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:border-blue-500/50 transition-colors social-link"
                  aria-label={social.label}
                  data-cursor-hover
                >
                  <Image src={social.icon} alt={social.label} width={20} height={20} />
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
