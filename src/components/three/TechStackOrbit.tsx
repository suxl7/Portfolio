"use client";

import Image from "next/image";

const technologies = [
  { name: "React", icon: "/icons/icons8-react-native-512.png", color: "#61dafb" },
  { name: "Next.js", icon: "/icons/Nextjs.png", color: "#f8fafc" },
  { name: "TypeScript", icon: "/icons/typescript.png", color: "#3b82f6" },
  { name: "Python", icon: "/icons/python.png", color: "#3776ab" },
  { name: "AWS", icon: "/icons/icons8-aws-512.png", color: "#ff9900" },
  { name: "Google Cloud", icon: "/icons/icons8-google-cloud-512.png", color: "#4285f4" },
  { name: "PostgreSQL", icon: "/icons/postgre.png", color: "#336791" },
  { name: "Postman", icon: "/icons/icons8-postman-inc-96.png", color: "#ff6c37" },
  { name: "GitHub", icon: "/icons/github (1).png", color: "#e8e6ee" },
  { name: "Vercel", icon: "/vercel.svg", color: "#f8fafc" },
  { name: "Illustrator", icon: "/icons/illustrator.png", color: "#ff9a00" },
  { name: "Davinci Resolve", icon: "/icons/davinci.png", color: "#06b6d4" },
];

export function TechStackOrbit() {
  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.03]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {technologies.map((tech, index) => (
          <div
            key={tech.name}
            className="group flex items-center gap-3 rounded-xl border border-zinc-200/70 bg-white/80 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 dark:border-white/[0.08] dark:bg-zinc-950/50"
            style={{ animationDelay: `${index * 0.04}s` }}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-zinc-950/5 dark:bg-white/[0.04]"
              style={{ boxShadow: `inset 0 0 0 1px ${tech.color}18` }}
            >
              <Image src={tech.icon} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
            </span>
            <span className="min-w-0 text-sm font-semibold text-zinc-700 transition-colors group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
