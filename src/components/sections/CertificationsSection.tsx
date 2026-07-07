"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Download, BadgeCheck, Calendar, Hash, Eye, X } from "lucide-react";
import Image from "next/image";

const certifications = [
  {
    title: "Cyber Security Virtual Internship",
    issuer: "Deloitte",
    date: "2026",
    credentialId: "DELOITTE-CS-2026",
    downloadUrl: "/certificates/Cyber Security.pdf",
    viewUrl: "/certificates/Cyber Security.pdf",
    fileName: "Cyber Security Certificate.pdf",
    color: "#86efac",

    logo: "/icons/Deloitte/Deloitte_idXbysKEDR_2.png",

    description:
      "Completed Deloitte's virtual cybersecurity internship involving real-world security scenarios including threat modeling, log analysis using SIEM tools, vulnerability assessment, incident response, and professional security audit reporting based on the NIST Cybersecurity Framework.",

    skills: [
      "Threat Analysis",
      "SIEM",
      "Incident Response",
      "Security Auditing",
      "NIST Framework",
      "Vulnerability Assessment",
    ],
  },

  {
    title: "AWS SimuLearn: Cloud Computing Essentials",
    issuer: "AWS Skill Builder",
    date: "2026",
    credentialId: "AWS-SIMULEARN-CCE-2026",
    downloadUrl: "/certificates/AWS SimuLearn Cloud Computing.pdf",
    viewUrl: "/certificates/AWS SimuLearn Cloud Computing.pdf",
    fileName: "AWS SimuLearn Cloud Computing Certificate.pdf",
    color: "#f59e0b",

    logo: "/icons/icons8-aws-512.png",

    description:
      "Successfully completed AWS SimuLearn: Cloud Computing Essentials, a hands-on cloud simulation focused on core AWS services. Demonstrated practical experience configuring Amazon S3 buckets, deploying static websites, managing IAM permissions, implementing cloud security best practices, and understanding cloud infrastructure fundamentals.",

    skills: [
      "Amazon S3",
      "IAM",
      "Static Website Hosting",
      "Cloud Security",
      "AWS Console",
      "Cloud Fundamentals",
    ],
  },
];

type Certification = (typeof certifications)[number];

export function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

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
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.credentialId}
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

                  {/* Left - icon block */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center relative p-2"
                      style={{ background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}08)`, border: `1px solid ${cert.color}30` }}
                    >
                      <Image
                        src={cert.logo}
                        alt={cert.issuer}
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

                  {/* Right - content */}
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
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={cert.downloadUrl}
                        download={cert.fileName}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-zinc-900 transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                        style={{
                          background: `linear-gradient(135deg, ${cert.color}, ${cert.color}bb)`,
                          boxShadow: `0 4px 20px ${cert.color}30`,
                        }}
                      >
                        <Download className="w-4 h-4" />
                        Download Certificate
                      </a>
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-zinc-900 transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                        style={{
                          background: `linear-gradient(135deg, ${cert.color}, ${cert.color}bb)`,
                          boxShadow: `0 4px 20px ${cert.color}30`,
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        View Certificate
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom decorative glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${cert.color}60, transparent)` }}
              />
            </motion.div>
          ))}
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
              <span className="font-bold text-zinc-900 dark:text-white">{certifications.length}</span> professional certifications
            </span>
          </div>
        </motion.div>
      </div>

      {selectedCert && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedCert.title} certificate preview`}
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            className="relative flex h-full max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5"
              style={{ background: `linear-gradient(90deg, ${selectedCert.color}24, transparent)` }}
            >
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: selectedCert.color }}>
                  {selectedCert.issuer}
                </p>
                <h3 className="truncate text-base font-black text-white sm:text-lg">
                  {selectedCert.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedCert.downloadUrl}
                  download={selectedCert.fileName}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Download certificate"
                  title="Download certificate"
                >
                  <Download className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Close certificate preview"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 bg-zinc-100 p-2 dark:bg-zinc-900 sm:p-4">
              <object
                data={`${selectedCert.viewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                type="application/pdf"
                className="h-full min-h-[70vh] w-full rounded-xl bg-white shadow-inner"
                aria-label={`${selectedCert.title} PDF certificate`}
              >
                <div className="flex h-full min-h-[70vh] flex-col items-center justify-center gap-4 rounded-xl bg-white p-6 text-center text-zinc-700">
                  <p className="text-sm font-medium">
                    This browser cannot show the certificate preview inline.
                  </p>
                  <a
                    href={selectedCert.downloadUrl}
                    download={selectedCert.fileName}
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-zinc-900"
                    style={{ background: selectedCert.color }}
                  >
                    <Download className="h-4 w-4" />
                    Download Certificate
                  </a>
                </div>
              </object>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
