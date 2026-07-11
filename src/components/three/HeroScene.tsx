"use client";

import { useRef, useState, useEffect, memo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sphere, Torus } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import * as THREE from "three";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RingProps {
  radius: number;
  tube: number;
  rotationAxis: "x" | "y" | "z";
  speed: number;
  tilt: [number, number, number];
  opacity: number;
}

// ─── Camera Rig ───────────────────────────────────────────────────────────────
// Smooth camera drift + mouse parallax via spring interpolation

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    // Spring lerp toward mouse — very gentle parallax (max ±0.3 units)
    const lerpFactor = 1 - Math.pow(0.04, delta);
    current.current.x += (mouse.current.x * 0.3 - current.current.x) * lerpFactor;
    current.current.y += (mouse.current.y * 0.2 - current.current.y) * lerpFactor;

    // Slow autonomous orbit (±3°)
    const drift = Math.sin(state.clock.elapsedTime * 0.12) * 0.05;

    camera.position.x = current.current.x + drift;
    camera.position.y = current.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Holographic Glass Orb ────────────────────────────────────────────────────

const GlassOrb = memo(function GlassOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);
  const currentScale = useRef(1);

  const onOver = useCallback(() => setHovered(true), []);
  const onOut = useCallback(() => setHovered(false), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    elapsed.current += delta;
    const t = elapsed.current;

    // Breathing: ±2.5% scale over ~5 s
    const breathe = 1 + Math.sin(t * 1.2) * 0.025;
    targetScale.current = hovered ? breathe * 1.06 : breathe;

    // Smooth scale spring
    currentScale.current += (targetScale.current - currentScale.current) * (1 - Math.pow(0.02, delta));
    meshRef.current.scale.setScalar(currentScale.current);

    // Very slow rotation
    meshRef.current.rotation.y += delta * 0.08;
    meshRef.current.rotation.x += delta * 0.03;
  });

  return (
    // Float adds weightless vertical drift
    <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.6}>
      <Sphere
        ref={meshRef}
        args={[1.5, 128, 128]}
        onPointerOver={onOver}
        onPointerOut={onOut}
      >
        <MeshTransmissionMaterial
          transmission={1}
          roughness={0.04}
          thickness={1.8}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.08}
          distortionScale={0.15}
          temporalDistortion={0.04}
          ior={1.5}
          backside
          backsideThickness={0.5}
          color="#c8d8ff"
          attenuationColor="#8ab4ff"
          attenuationDistance={2.5}
          envMapIntensity={hovered ? 1.4 : 1.0}
        />
      </Sphere>
    </Float>
  );
});

// ─── Orbit Ring ───────────────────────────────────────────────────────────────

const OrbitRing = memo(function OrbitRing({
  radius,
  tube,
  rotationAxis,
  speed,
  tilt,
  opacity,
}: RingProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation[rotationAxis] += delta * speed;
  });

  return (
    <Torus
      ref={ref}
      args={[radius, tube, 3, 128]}
      rotation={tilt}
    >
      <meshBasicMaterial
        color="#7eb3ff"
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </Torus>
  );
});

// ─── Soft Radial Glow Plane ───────────────────────────────────────────────────
// A large billboard plane with a radial gradient texture baked at runtime

const BackgroundGlow = memo(function BackgroundGlow() {
  const texture = useRef<THREE.Texture | null>(null);

  if (!texture.current) {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(80,120,255,0.22)");
    grad.addColorStop(0.4, "rgba(100,80,220,0.10)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    texture.current = new THREE.CanvasTexture(canvas);
  }

  return (
    <mesh position={[0, 0, -3]} renderOrder={-1}>
      <planeGeometry args={[14, 14]} />
      <meshBasicMaterial
        map={texture.current}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
});

// ─── Cinematic Lighting ───────────────────────────────────────────────────────

const Lighting = memo(function Lighting() {
  return (
    <>
      {/* Soft fill */}
      <ambientLight intensity={0.3} />
      {/* Key light — warm white from upper right */}
      <directionalLight position={[4, 6, 5]} intensity={1.8} color="#e8eeff" />
      {/* Cool blue rim from left */}
      <pointLight position={[-5, 3, 3]} color="#4488ff" intensity={18} distance={20} decay={2} />
      {/* Violet accent from below-back */}
      <pointLight position={[3, -4, -4]} color="#9966ff" intensity={12} distance={18} decay={2} />
      {/* Subtle top fill */}
      <pointLight position={[0, 6, 2]} color="#aaccff" intensity={6} distance={14} decay={2} />
    </>
  );
});

// ─── Scene Inner ──────────────────────────────────────────────────────────────

function SceneInner() {
  return (
    <>
      <CameraRig />
      <Lighting />
      <BackgroundGlow />

      {/* Glass orb */}
      <GlassOrb />

      {/* Three ultra-thin orbit rings at different axes / speeds */}
      <OrbitRing radius={2.4} tube={0.006} rotationAxis="y" speed={0.18}  tilt={[0.4, 0, 0]}       opacity={0.35} />
      <OrbitRing radius={2.9} tube={0.005} rotationAxis="x" speed={-0.12} tilt={[0, 0.6, 0.3]}     opacity={0.25} />
      <OrbitRing radius={3.3} tube={0.004} rotationAxis="z" speed={0.09}  tilt={[1.1, 0.2, 0]}     opacity={0.18} />

      {/* Post-processing: Bloom + Vignette + Noise */}
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.55} luminanceThreshold={0.18} luminanceSmoothing={0.85} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={0.55} />
        <Noise opacity={0.018} />
      </EffectComposer>
    </>
  );
}

// ─── Responsive Camera Distance ───────────────────────────────────────────────

function useCameraZ() {
  const [z, setZ] = useState(5.5);
  useEffect(() => {
    const update = () => setZ(window.innerWidth < 640 ? 7.5 : window.innerWidth < 1024 ? 6.2 : 5.5);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return z;
}

// ─── Public Export ────────────────────────────────────────────────────────────

export function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const cameraZ = useCameraZ();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="w-full h-full" />;

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 45, near: 0.1, far: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <SceneInner />
      </Canvas>
    </div>
  );
}

export default HeroScene;
