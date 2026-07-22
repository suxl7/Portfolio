"use client";

import dynamic from "next/dynamic";

const TechStackOrbitComponent = dynamic(
  () => import("@/components/three/TechStackOrbit").then((m) => m.TechStackOrbit),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 animate-pulse bg-zinc-800/30 rounded-xl flex items-center justify-center">
        <span className="text-zinc-600">Loading tech stack...</span>
      </div>
    ),
  }
);

export function TechStackOrbitWrapper() {
  return <TechStackOrbitComponent />;
}
