"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * 0.2;
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere
        ref={ref}
        args={[1.5, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#8b5cf6" : "#3b82f6"}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function ParticleRing({ radius, count, speed }: { radius: number; count: number; speed: number }) {
  const ref = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!ref.current) return;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    ref.current.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * speed;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry />
      <pointsMaterial size={0.03} color="#3b82f6" transparent opacity={0.8} />
    </points>
  );
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#8b5cf6" intensity={0.5} />
      
      <AnimatedSphere />
      <ParticleRing radius={2.5} count={100} speed={0.3} />
      <ParticleRing radius={3.2} count={80} speed={-0.2} />
    </Canvas>
  );
}
