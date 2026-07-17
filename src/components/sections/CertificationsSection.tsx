"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Download, BadgeCheck, Calendar, Hash, Eye, X, ChevronDown } from "lucide-react";
import Image from "next/image";

const certifications = [
  {
    title: "Cyber Security Virtual Internship",
    issuer: "Deloitte",
    date: "2026",
    credentialId: "DELOITTE-CS-2026",
    downloadUrl: "/certificates/Cyber Security.pdf",
    fileName: "Cyber Security Certificate.pdf",
    color: "#86efac",
    logo: "/icons/Deloitte/Deloitte_idXbysKEDR_2.png",
    description:
      "Completed Deloitte's virtual cybersecurity internship involving real-world security scenarios including threat modeling, log analysis, vulnerability assessment, incident response, and professional security audit reporting.",
    skills: [
      "Threat Analysis",
      "Incident Response",
      "Security Auditing",
      "Vulnerability Assessment",
    ],
  },
  {
    title: "AWS SimuLearn: Cloud Computing Essentials",
    issuer: "AWS Skill Builder",
    date: "2026",
    credentialId: "AWS-SIMULEARN-CCE-2026",
    downloadUrl: "/certificates/aws-simulearn-cloud-computing.pdf",
    fileName: "AWS SimuLearn Cloud Computing Certificate.pdf",
    color: "#f59e0b",
    logo: "/icons/icons8-aws-512.png",
    description:
      "Successfully completed AWS SimuLearn: Cloud Computing Essentials, a hands-on cloud simulation focused on AWS services. Demonstrated practical experience configuring Amazon S3 buckets, deploying static websites, implementing cloud security best practices, and understanding cloud infrastructure fundamentals.",
    skills: [
      "Amazon S3",
      "Static Website Hosting",
      "Cloud Security",
      "AWS Console",
      "Cloud Fundamentals",
    ],
  },
  {
    title: "AWS Cloud Quest: Cloud Practitioner",
    issuer: "AWS Skill Builder",
    date: "2026",
    credentialId: "AWS-CloudQuest-CCE-2026",
    downloadUrl: "/certificates/Cloud Quest AWS Cloud Practitioner.pdf",
    fileName: "Cloud Quest AWS Cloud Practitioner.pdf",
    color: "#f59e0b",
    logo: "/icons/icons8-aws-512.png",
    description:
      "Successfully completed AWS Cloud Quest: Cloud Practitioner, a hands-on, role-based learning program that builds foundational AWS cloud skills through real-world solution labs and interactive scenarios. Gained practical experience with core AWS services, including compute, networking, storage, and security, while developing job-ready cloud competencies through guided assignments and knowledge assessments.",
    skills: [
      "Amazon S3",
      "Amazon RDS",
      "Amazon EC2",
      "EBS (Elastic Block Store)",
      "AMI (Amazon Machine Image)",
      "VPC (Virtual Private Cloud)",
      "AWS IAM",
      "Elastic Load Balancing",
    ],
  },
  // 👉 Add new certificates here — just append another object with the same shape.
  // No other code needs to change; the grid and lightbox both scale automatically.
];

type Certification = (typeof certifications)[number];

// Encode only the filename segment so folder slashes stay intact
function encodePdfUrl(url: string) {
  const parts = url.split("/");
  parts[parts.length - 1] = encodeURIComponent(parts[parts.length - 1]);
  return parts.join("/");
}

function downloadFile(url: string, fileName: string) {
  const encoded = encodePdfUrl(url);
  fetch(encoded)
    .then((res) => res.blob())
    .then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(a.href);
    })
    .catch(() => {
      const a = document.createElement("a");
      a.href = encoded;
      a.download = fileName;
      a.click();
    });
}

// Builds a fully-qualified, public URL — required by Google Docs Viewer
function toAbsoluteUrl(path: string) {
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}

function PdfViewer({ src, title }: { src: string; title: string }) {
  const encodedPath = encodePdfUrl(src);
  const [isLocalhost, setIsLocalhost] = useState(false);
  const [absoluteUrl, setAbsoluteUrl] = useState("");

  useEffect(() => {
    setIsLocalhost(/^(localhost|127\.0\.0\.1)/.test(window.location.hostname));
    setAbsoluteUrl(toAbsoluteUrl(encodedPath));
  }, [encodedPath]);

  if (isLocalhost) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-white/70 p-6 text-center">
      <p className="text-sm max-w-sm">
        PDF preview via Google Docs Viewer only works on a deployed (public) URL —
        it can&apos;t reach files on localhost. This will work once deployed.
      </p>
      <a
        href={encodedPath}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
      >
        <Eye className="w-4 h-4" /> Open PDF directly
      </a>
    </div>
  );
}

  if (!absoluteUrl) return null; // avoid flashing before hostname check resolves

  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    absoluteUrl
  )}&embedded=true`;

  return <iframe src={viewerUrl} title={title} className="w-full h-full border-0" />;
}

function CertLightbox({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    containerRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const HeaderBar = ({ mobile }: { mobile: boolean }) => (
    <div
      className={`flex-shrink-0 flex items-center justify-between gap-3 border-b border-white/10 bg-black/60 backdrop-blur-xl ${
        mobile ? "px-4" : "px-6 py-4"
      }`}
      style={mobile ? { paddingTop: "max(0.75rem, env(safe-area-inset-top))", paddingBottom: "0.75rem" } : {}}
    >
      <p className="flex-1 min-w-0 text-sm font-semibold text-white/90 truncate">{cert.title}</p>
      <div className="flex items-center gap-1">
        <motion.button
          type="button"
          onClick={() => downloadFile(cert.downloadUrl, cert.fileName)}
          aria-label="Download certificate"
          whileTap={{ scale: 0.9 }}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
        >
          <Download className="h-4 w-4" />
        </motion.button>
        <motion.button
          type="button"
          onClick={onClose}
          aria-label="Close certificate preview"
          whileTap={{ scale: 0.9 }}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 hover:bg-red-500/70 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${cert.title} certificate preview`}
        ref={containerRef}
        tabIndex={-1}
        style={{ outline: "none" }}
      >
        {/* Mobile */}
        <div className="flex flex-col h-[100dvh] md:hidden" onClick={(e) => e.stopPropagation()}>
          <HeaderBar mobile />
          <motion.div
            className="flex-1 min-h-0"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <PdfViewer src={cert.downloadUrl} title={`${cert.title} certificate PDF`} />
          </motion.div>
        </div>

        {/* Desktop / Tablet */}
        <div className="hidden md:flex h-full flex-col" onClick={(e) => e.stopPropagation()}>
          <HeaderBar mobile={false} />
          <motion.div
            className="flex-1 min-h-0 px-6 pb-6 pt-4"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <div
              className="h-full w-full max-w-[1100px] mx-auto rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)]"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <PdfViewer src={cert.downloadUrl} title={`${cert.title} certificate PDF`} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <section id="certifications" className="section-py relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-60" />

      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-sm font-mono text-blue-600 dark:text-blue-400 mb-4 tracking-widest uppercase">
            Certifications
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white">
            Foundational <span className="text-gradient">Credentials</span>
          </h2>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto" />
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {certifications.map((cert) => {
            const isExpanded = expandedId === cert.credentialId;
            return (
              <motion.div
                key={cert.credentialId}
                className="group relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 cursor-pointer shadow-[0_2px_12px_rgba(15,23,42,0.07)] dark:shadow-none"
                whileHover={{ y: -6, boxShadow: `0 0 0 2px ${cert.color}50, 0 30px 60px ${cert.color}15` }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={() => toggleExpand(cert.credentialId)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-3xl">
                  <div className="absolute -inset-full top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1000" />
                </div>

                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}40, transparent)` }} />

                <div className="p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center relative p-2"
                        style={{ background: "white", border: `1px solid ${cert.color}30` }}
                      >
                        <Image
                          src={cert.logo}
                          alt={cert.issuer}
                          width={64}
                          height={64}
                          className="object-contain"
                          style={{ height: "auto" }}
                        />
                        <div className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ background: cert.color }} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold tracking-wide" style={{ color: cert.color }}>
                          {cert.issuer}
                        </span>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <BadgeCheck className="w-3 h-3 text-emerald-400" />
                          <span className="text-xs text-emerald-400 font-medium">Verified</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
                        {cert.title}
                      </h3>

                      <motion.div className="flex items-center gap-1 text-xs text-zinc-400 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>{isExpanded ? "Click to collapse" : "Click to view details"}</span>
                        <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </motion.span>
                      </motion.div>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            key="details"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed mb-5">
                              {cert.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-zinc-500 mb-5">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" /> {cert.date}
                              </span>
                              <span className="flex items-center gap-1.5 font-mono">
                                <Hash className="w-3.5 h-3.5" /> {cert.credentialId}
                              </span>
                            </div>

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
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); downloadFile(cert.downloadUrl, cert.fileName); }}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-zinc-900 transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                          style={{
                            background: `linear-gradient(135deg, ${cert.color}, ${cert.color}bb)`,
                            boxShadow: `0 4px 20px ${cert.color}30`,
                          }}
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setSelectedCert(cert); }}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-zinc-900 transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                          style={{
                            background: `linear-gradient(135deg, ${cert.color}, ${cert.color}bb)`,
                            boxShadow: `0 4px 20px ${cert.color}30`,
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${cert.color}60, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-zinc-700/50 rounded-full px-6 py-3 shadow-sm">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-slate-600 dark:text-zinc-400">
              <span className="font-bold text-slate-900 dark:text-white">{certifications.length}</span> foundational certifications
            </span>
          </div>
        </motion.div>
      </div>

      {selectedCert && (
        <CertLightbox cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </section>
  );
}