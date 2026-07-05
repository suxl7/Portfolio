"use client";

import { motion } from "framer-motion";
import { Award, Download, BadgeCheck, Calendar, Hash } from "lucide-react";
import Image from "next/image";

const cert = {
  title: "Cyber Security Virtual Internship",
  issuer: "Deloitte",
  date: "2026",
  credentialId: "DELOITTE-CS-2023",
  downloadUrl: "/certificates/Cyber Security.pdf",
  color: "#86efac",
  description:
    "Completed Deloitte's virtual cybersecurity internship involving real-world security scenarios including threat modeling, log analysis with SIEM tools, vulnerability scanning, and writing professional security audit reports following the NIST framework.",
  skills: ["Threat Analysis", "Security Auditing", "Incident Response", "SIEM", "NIST Framework", "Vulnerability Assessment"],
};

export function CertificationsSection() {
  return (
    <section id="certifications" className="section-py relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-60" />

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
            Professional <span className="text-gradient">Credentials</span>
          </h2>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto">
            Verified certification demonstrating expertise in cybersecurity.
          </p>
        </motion.div>

        {/* Featured cert card */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="group relative rounded-3xl overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900"
            whileHover={{ y: -6, boxShadow: `0 0 0 2px ${cert.color}50, 0 30px 60px ${cert.color}15` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Shimmer sweep on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-3xl">
              <div
                className="absolute -inset-full top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1000"
              />
            </div>

            {/* Top gradient bar */}
            <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}40, transparent)` }} />

            <div className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">

                {/* Left — icon block */}
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center relative p-2"
                    style={{ background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}08)`, border: `1px solid ${cert.color}30` }}
                  >
                    <Image
                      src="/icons/Deloitte/Deloitte_idXbysKEDR_2.png"
                      alt="Deloitte"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                    {/* Pulse ring */}
                    <div
                      className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                      style={{ background: cert.color }}
                    />
                  </div>
                </div>

                {/* Right — content */}
                <div className="flex-1 min-w-0">
                  {/* Issuer + verified */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold tracking-wide" style={{ color: cert.color }}>
                      {cert.issuer}
                    </span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <BadgeCheck className="w-3 h-3 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-medium">Verified</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3 leading-tight">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
                    {cert.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {cert.date}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <Hash className="w-3.5 h-3.5" /> {cert.credentialId}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ background: `${cert.color}12`, color: cert.color, border: `1px solid ${cert.color}25` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Download CTA */}
                  <a
                    href={cert.downloadUrl}
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-zinc-900 transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                    style={{
                      background: `linear-gradient(135deg, ${cert.color}, ${cert.color}bb)`,
                      boxShadow: `0 4px 20px ${cert.color}30`,
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Download Certificate
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom decorative glow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(90deg, transparent, ${cert.color}60, transparent)` }}
            />
          </motion.div>
        </motion.div>

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
