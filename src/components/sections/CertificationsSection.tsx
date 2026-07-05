"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Download, BadgeCheck } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "Deloitte Cyber Security Virtual Internship",
    issuer: "Deloitte",
    date: "2023",
    credentialId: "DELOITTE-CS-2023",
    verifyUrl: "https://deloitte.com/verify",
    downloadUrl: "/certificates/deloitte-cybersecurity.pdf",
    color: "#ef4444",
    logo: "🛡️",
    skills: ["Threat Analysis", "Security Auditing", "Incident Response"],
  },
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="section-py relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent opacity-50" />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-sm font-mono text-blue-400 mb-4 tracking-widest uppercase">
            05. Certifications
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white">
            Professional{" "}
            <span className="text-gradient">Credentials</span>
          </h2>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto">
            Verified certifications demonstrating expertise in cloud, security, and development.
          </p>
        </motion.div>

        {/* Certificates grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="group relative glass border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}60)` }} />
              
              <div className="p-6">
                {/* Logo & verified badge */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                  >
                    {cert.logo}
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <BadgeCheck className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-emerald-500 font-medium">Verified</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-zinc-500 mb-3">{cert.issuer}</p>
                
                <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
                  <span>{cert.date}</span>
                  <span>•</span>
                  <span className="font-mono">{cert.credentialId}</span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-xs font-medium"
                      style={{ background: `${cert.color}10`, color: cert.color }}
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md text-xs text-zinc-500">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Verify
                  </a>
                  <a
                    href={cert.downloadUrl}
                    download
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white transition-colors"
                    style={{ background: `linear-gradient(135deg, ${cert.color}, ${cert.color}cc)` }}
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 40px ${cert.color}10` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 glass border border-zinc-200/50 dark:border-zinc-700/50 rounded-full px-6 py-3">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-bold text-zinc-900 dark:text-white">1</span> professional certification
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
