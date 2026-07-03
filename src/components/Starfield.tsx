"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, BufferGeometry, BufferAttribute, PointsMaterial, AdditiveBlending } from "three";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Stars({ count = 1500 }: { count?: number }) {
  const ref = useRef<Points>(null);
  const rngRef = useRef(mulberry32(count));

  const { positions, colors, sizes, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = new Float32Array(count * 3);
    const rng = mulberry32(count);

    for (let i = 0; i < count; i++) {
      const radius = 5 + rng() * 20;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      sizes[i] = rng() * 2 + 0.5;

      const c = rng();
      if (c < 0.4) { colors[i * 3] = 0.6; colors[i * 3 + 1] = 0.7; colors[i * 3 + 2] = 1.0; }
      else if (c < 0.7) { colors[i * 3] = 0.9; colors[i * 3 + 1] = 0.6; colors[i * 3 + 2] = 1.0; }
      else { colors[i * 3] = 0.4; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 1.0; }

      velocities[i * 3] = (rng() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (rng() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (rng() - 0.5) * 0.002;
    }
    return { positions, colors, sizes, velocities };
  }, [count]);

  const geometry = useMemo(() => {
    const geom = new BufferGeometry();
    geom.setAttribute("position", new BufferAttribute(positions, 3));
    geom.setAttribute("color", new BufferAttribute(colors, 3));
    return geom;
  }, [positions, colors]);

  const material = useMemo(
    () =>
      new PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const rng = rngRef.current;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      const dist = Math.sqrt(pos[i * 3] ** 2 + pos[i * 3 + 1] ** 2 + pos[i * 3 + 2] ** 2);
      if (dist > 25) {
        const radius = 5 + rng() * 15;
        const theta = rng() * Math.PI * 2;
        const phi = Math.acos(2 * rng() - 1);
        pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = radius * Math.cos(phi);
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y += 0.0001;
    ref.current.rotation.x += 0.00005;

    void state;
    void sizes;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

export function Starfield() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
      >
        <Stars count={1500} />
      </Canvas>
    </div>
  );
// amazonq-ignore-next-line
}
