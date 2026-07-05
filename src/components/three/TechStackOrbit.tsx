"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

const technologies = [
  { name: "React",            icon: "/icons/icons8-react-native-512.png", color: "#61dafb", orbit: 2.5, speed: 0.6 },
  { name: "TypeScript",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178c6", orbit: 3.2, speed: 0.45 },
  { name: "Node.js",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933", orbit: 3.8, speed: 0.35 },
  { name: "Python",           icon: "/icons/python.png", color: "#3776ab", orbit: 4.4, speed: 0.28 },
  { name: "AWS",              icon: "/icons/icons8-aws-512.png", color: "#ff9900", orbit: 2.8, speed: 0.7 },
  { name: "PostgreSQL",       icon: "/icons/postgre.png", color: "#336791", orbit: 4.0, speed: 0.38 },
  { name: "Docker",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "#2496ed", orbit: 3.5, speed: 0.5 },
  { name: "Next.js",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#a8b3cf", orbit: 2.2, speed: 0.8 },
  { name: "Three.js",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", color: "#6b7280", orbit: 4.6, speed: 0.22 },
  { name: "Git",              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#f05032", orbit: 3.0, speed: 0.62 },
  { name: "Figma",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "#f24e1e", orbit: 4.2, speed: 0.3 },
  { name: "Tailwind",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06b6d4", orbit: 2.6, speed: 0.75 },
  { name: "GitHub",           icon: "/icons/github (1).png", color: "#e8e6ee", orbit: 3.3, speed: 0.52 },
  { name: "Vercel",           icon: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png", color: "#ffffff", orbit: 4.8, speed: 0.2 },
  { name: "DaVinci",          icon: "https://img.icons8.com/color/96/davinci-resolve.png", color: "#f4c842", orbit: 2.0, speed: 0.9 },
  { name: "Illustrator",      icon: "https://img.icons8.com/color/96/adobe-illustrator.png", color: "#ff9a00", orbit: 3.7, speed: 0.42 },
  { name: "ClaudeCode",       icon: "https://img.icons8.com/fluency/96/claude.png", color: "#cc785c", orbit: 4.3, speed: 0.32 },
];

function TechNode({ name, icon, color, orbit, speed, index }: { name: string; icon: string; color: string; orbit: number; speed: number; index: number }) {
  const ref = useRef<THREE.Group>(null);
  const angle = (index / technologies.length) * Math.PI * 2;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = Math.cos(angle + t) * orbit;
    ref.current.position.z = Math.sin(angle + t) * orbit;
    ref.current.position.y = Math.sin(t * 0.5 + index) * 0.3;
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <pointLight color={color} intensity={0.8} distance={2.5} />
      <Html
        center
        distanceFactor={8}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "22px" }}>
          <img
            src={icon}
            alt={name}
            width={28}
            height={28}
            style={{ filter: `drop-shadow(0 0 6px ${color})`, borderRadius: "4px" }}
          />
          <span style={{
            color: "#ffffff",
            fontSize: "10px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            marginTop: "4px",
            textShadow: `0 0 8px ${color}`,
            fontFamily: "system-ui, sans-serif",
          }}>{name}</span>
        </div>
      </Html>
    </group>
  );
}

function CenterCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.4;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.15;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.7, 2]} />
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={1.0}
        metalness={0.9}
        roughness={0.1}
        wireframe
      />
      <pointLight color="#3b82f6" intensity={3} distance={6} />
    </mesh>
  );
}

function OrbitRing({ radius, opacity }: { radius: number; opacity: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.012, radius + 0.012, 80]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Scene() {
  const rings = useMemo(() => [2.2, 2.8, 3.5, 4.2, 4.6], []);

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[0, -5, -5]} intensity={1} color="#8b5cf6" />
      <CenterCore />
      {rings.map((r, i) => (
        <OrbitRing key={i} radius={r} opacity={Math.max(0.06, 0.18 - i * 0.02)} />
      ))}
      {technologies.map((tech, i) => (
        <TechNode key={tech.name} {...tech} index={i} />
      ))}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={14}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </>
  );
}

export function TechStackOrbit() {
  return (
    <div className="h-[500px] w-full relative rounded-2xl overflow-hidden border border-zinc-200/30 dark:border-zinc-700/30" style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)" }}>
      <Canvas
        camera={{ position: [0, 4, 9], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none bg-gradient-to-t from-zinc-50/80 dark:from-zinc-900/80 to-transparent" />

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">17+</span> technologies in orbit
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">Drag to rotate · Scroll to zoom</p>
      </div>
    </div>
  );
}
