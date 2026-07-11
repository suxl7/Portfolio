"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Download, BadgeCheck, Calendar, Hash, Eye, X, ZoomIn, ZoomOut, Maximize2, RotateCcw, ChevronDown } from "lucide-react";
import Image from "next/image";

const certifications = [
  {
    title: "Cyber Security Virtual Internship",
    issuer: "Deloitte",
    date: "2026",
    credentialId: "DELOITTE-CS-2026",
    downloadUrl: "/certificates/Cyber Security.pdf",
    fileName: "Cyber Security Certificate.pdf",
    previewImage: "/certificates/Cyber Security_page-.jpg",
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
    fileName: "AWS SimuLearn Cloud Computing Certificate.pdf",
    previewImage: "/certificates/AWS SimuLearn Cloud Computing.jpg",
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

function downloadFile(url: string, fileName: string) {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(a.href);
    })
    .catch(() => {
      // Fallback: direct navigation
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
    });
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function CertLightbox({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // ESC key + focus trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    containerRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const adjustZoom = useCallback((delta: number) => {
    setZoom((z) => clamp(z + delta, MIN_ZOOM, MAX_ZOOM));
  }, []);

  // Non-passive native wheel listener to allow preventDefault
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      adjustZoom(e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [adjustZoom]);

  // Double-click zoom
  const onDoubleClick = useCallback(() => {
    setZoom((z) => (z < 2 ? 2 : MIN_ZOOM));
  }, []);

  const controls = [
    { icon: ZoomIn,    label: "Zoom in",       action: () => adjustZoom(ZOOM_STEP),  disabled: zoom >= MAX_ZOOM },
    { icon: ZoomOut,   label: "Zoom out",      action: () => adjustZoom(-ZOOM_STEP), disabled: zoom <= MIN_ZOOM },
    { icon: RotateCcw, label: "Reset zoom",    action: () => setZoom(1),             disabled: zoom === 1 },
    { icon: Maximize2, label: "Fit to screen", action: () => setZoom(1),             disabled: zoom === 1 },
  ];

  return (
    <AnimatePresence>
      {/* Backdrop — full-viewport shell */}
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
        {/* ── Mobile layout: flex column, sticky header + scrollable body ── */}
        <div className="flex flex-col h-[100dvh] md:hidden">
          {/* Sticky mobile header */}
          <div
            className="flex-shrink-0 flex items-center gap-3 px-4 border-b border-white/10 bg-black/60 backdrop-blur-xl"
            style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))", paddingBottom: "0.75rem" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="flex-1 min-w-0 text-sm font-semibold text-white/90 truncate">
              {cert.title}
            </p>
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

          {/* Scrollable certificate area */}
          <div className="flex-1 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <motion.div
              className="w-full px-3 py-6"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onDoubleClick={onDoubleClick}
            >
              <div
                className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)]"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <Image
                  src={cert.previewImage}
                  alt={`${cert.title} certificate issued by ${cert.issuer}`}
                  width={1200}
                  height={850}
                  className="w-full h-auto block"
                  priority
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Desktop layout: original, completely unchanged ── */}
        <div className="hidden md:block overflow-y-auto h-full">
          {/* Floating controls — top-right */}
          <motion.div
            className="fixed top-5 right-5 z-[60] flex flex-col gap-2 sm:flex-row"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zoom controls pill */}
            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1.5 backdrop-blur-xl shadow-xl">
              {controls.map(({ icon: Icon, label, action, disabled }) => (
                <motion.button
                  key={label}
                  type="button"
                  onClick={action}
                  disabled={disabled}
                  aria-label={label}
                  title={label}
                  whileHover={disabled ? {} : { scale: 1.15 }}
                  whileTap={disabled ? {} : { scale: 0.9 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Icon className="h-3.5 w-3.5" />
                </motion.button>
              ))}
              <span className="ml-1 mr-1 font-mono text-xs text-white/50 select-none min-w-[3ch] text-center">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            {/* Download + Close pill */}
            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1.5 backdrop-blur-xl shadow-xl">
              <motion.button
                type="button"
                onClick={() => downloadFile(cert.downloadUrl, cert.fileName)}
                aria-label="Download certificate"
                title="Download certificate"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <Download className="h-3.5 w-3.5" />
              </motion.button>
              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Close certificate preview"
                title="Close"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-red-500/70 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Certificate image */}
          <motion.div
            className="relative mx-auto my-16 w-full max-w-[1100px] px-4 cursor-zoom-in"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={onDoubleClick}
            ref={wheelRef}
          >
            <motion.div
              animate={{ scale: zoom }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="origin-top"
            >
              <div
                className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)]"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <Image
                  src={cert.previewImage}
                  alt={`${cert.title} certificate issued by ${cert.issuer}`}
                  width={1200}
                  height={850}
                  className="w-full h-auto block"
                  priority
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              </div>
            </motion.div>
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
        {/* Header */}
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

        {/* Featured cert cards */}
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
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
              {/* Shimmer sweep on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-3xl">
                <div className="absolute -inset-full top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1000" />
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
                        style={{ height: "auto" }}
                      />
                      <div className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ background: cert.color }} />
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
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
                      {cert.title}
                    </h3>

                    {/* Hover hint */}
                    <motion.div
                      className="flex items-center gap-1 text-xs text-zinc-400 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span>{isExpanded ? "Click to collapse" : "Click to view details"}</span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.span>
                    </motion.div>

                    {/* Expandable details */}
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
                          {/* Description */}
                          <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed mb-5">
                            {cert.description}
                          </p>

                          {/* Meta row */}
                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-zinc-500 mb-5">
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
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); downloadFile(cert.downloadUrl, cert.fileName); }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-zinc-900 transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                        style={{
                          background: `linear-gradient(135deg, ${cert.color}, ${cert.color}bb)`,
                          boxShadow: `0 4px 20px ${cert.color}30`,
                        }}
                      >
                        <Download className="w-4 h-4" />
                        Download Certificate
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setSelectedCert(cert); }}
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
            );
          })}
        </motion.div>

        {/* Summary */}
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

      {/* Lightbox */}
      {selectedCert && (
        <CertLightbox cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </section>
  );
}
