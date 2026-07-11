"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

// ─── TechCard (unchanged) ────────────────────────────────────────────────────

function TechCard({ tech }: { tech: Tech }) {
  return (
    <div
      className="
        group relative flex items-center gap-3
        rounded-2xl border border-white/[0.08]
        bg-white/[0.04] px-4 py-3
        backdrop-blur-md
        shadow-[0_2px_16px_rgba(0,0,0,0.3)]
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:scale-[1.04]
        hover:border-white/[0.14] hover:bg-white/[0.07]
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        cursor-default select-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
      "
      tabIndex={0}
      role="listitem"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at center, ${tech.color}18 0%, transparent 70%)` }}
        aria-hidden="true"
      />
      <div
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] transition-transform duration-300 group-hover:scale-110"
        style={{ boxShadow: `0 0 0 1px ${tech.color}18` }}
      >
        <Image src={tech.icon} alt={tech.name} width={22} height={22} className="h-[22px] w-[22px] object-contain" />
      </div>
      <span className="whitespace-nowrap text-sm font-medium tracking-wide text-zinc-300 transition-colors duration-300 group-hover:text-white">
        {tech.name}
      </span>
    </div>
  );
}

// ─── MarqueeRow (CSS-driven, jump-free) ─────────────────────────────────────
//
// Instead of measuring scrollWidth in JS (which breaks once async-loaded
// images reflow the strip) we animate a CSS custom property with a plain
// @keyframes rule that moves the track by -50% of its OWN width. Because
// the percentage is relative to the track's rendered width at animation
// time, it's always exactly the midpoint of the duplicated list — no
// measurement, no drift, no snap when it loops.

function MarqueeRow({
  items,
  direction,
  speed = 40, // seconds per full loop — bigger = slower
}: {
  items: Tech[];
  direction: "left" | "right";
  speed?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="marquee-row relative overflow-hidden py-2"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
      role="list"
      aria-label={`Technology marquee moving ${direction}`}
    >
      <div
        className="marquee-track flex w-max gap-4"
        style={{
          animationName: reduceMotion ? "none" : "marquee-scroll",
          animationDuration: `${speed}s`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {[...items, ...items].map((tech, i) => (
          <TechCard key={`${tech.name}-${direction}-${i}`} tech={tech} />
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .marquee-row:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

// ─── TechStackOrbit (unchanged besides speed prop meaning) ──────────────────

const technologies = [
  { name: "React",           icon: "/icons/icons8-react-native-512.png", color: "#61dafb" },
  { name: "Next.js",         icon: "/icons/Nextjs.png",                  color: "#f8fafc" },
  { name: "TypeScript",      icon: "/icons/typescript.png",              color: "#3b82f6" },
  { name: "Python",          icon: "/icons/python.png",                  color: "#3776ab" },
  { name: "AWS",             icon: "/icons/icons8-aws-512.png",          color: "#ff9900" },
  { name: "Google Cloud",    icon: "/icons/icons8-google-cloud-512.png", color: "#4285f4" },
  { name: "PostgreSQL",      icon: "/icons/postgre.png",                 color: "#336791" },
  { name: "Postman",         icon: "/icons/icons8-postman-inc-96.png",   color: "#ff6c37" },
  { name: "GitHub",          icon: "/icons/github (1).png",              color: "#e8e6ee" },
  { name: "Vercel",          icon: "/vercel.svg",                        color: "#f8fafc" },
  { name: "Illustrator",     icon: "/icons/illustrator.png",             color: "#ff9a00" },
  { name: "Davinci Resolve", icon: "/icons/davinci.png",                 color: "#06b6d4" },
];

const row1 = [
  technologies[0], technologies[1], technologies[2], technologies[3],
  technologies[4], technologies[6], technologies[8], technologies[9],
];

const row2 = [
  technologies[5], technologies[7], technologies[10], technologies[11],
  technologies[0], technologies[1], technologies[4],  technologies[6],
];

type Tech = (typeof technologies)[number];

export function TechStackOrbit() {
  return (
    <section
      aria-label="Core Tooling"
      className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl px-0 py-12 sm:py-16"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(59,130,246,0.10),transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(99,102,241,0.07),transparent)]" aria-hidden="true" />

      <div className="relative mb-10 px-8 text-center sm:mb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Core Tooling</p>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Tech Stack</h2>
        <p className="mt-2 text-sm text-zinc-500">Tools and technologies I work with daily</p>
      </div>

      <div className="relative flex flex-col gap-4">
        <MarqueeRow items={row1} direction="left"  speed={28} />
        <MarqueeRow items={row2} direction="right" speed={34} />
      </div>
    </section>
  );
}