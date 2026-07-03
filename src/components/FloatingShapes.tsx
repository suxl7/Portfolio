"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  TorusGeometry,
  OctahedronGeometry,
  IcosahedronGeometry,
  TorusKnotGeometry,
  DodecahedronGeometry,
  MeshStandardMaterial,
  Group,
  Mesh,
} from "three";

const shapes = [
  { type: "torus", args: [0.6, 0.2, 16, 32] as [number, number, number, number], position: [-2, 1.5, -1] as [number, number, number], rotation: [0.3, 0.5, 0] as [number, number, number], color: "#3b82f6", speed: 0.3 },
  { type: "octahedron", args: [0.8, 0] as [number, number], position: [2, -1, -2] as [number, number, number], rotation: [0, 0.7, 0.3] as [number, number, number], color: "#8b5cf6", speed: 0.5 },
  { type: "icosahedron", args: [0.7, 0] as [number, number], position: [-1.5, -2, -1.5] as [number, number, number], rotation: [0.5, 0, 0.7] as [number, number, number], color: "#ec4899", speed: 0.4 },
  { type: "torusKnot", args: [0.5, 0.15, 100, 16] as [number, number, number, number], position: [1.5, 2, -1] as [number, number, number], rotation: [0.7, 0.3, 0] as [number, number, number], color: "#06b6d4", speed: 0.6 },
  { type: "dodecahedron", args: [0.6, 0] as [number, number], position: [0, 0, -3] as [number, number, number], rotation: [0.2, 0.8, 0.1] as [number, number, number], color: "#f59e0b", speed: 0.35 },
];

interface ShapeProps {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[];
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  speed: number;
}

function Shape({ type, args, position, rotation, color, speed }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const time = useRef(0);

  const geometry = useMemo(() => {
    switch (type) {
      case "torus": return new TorusGeometry(...(args as [number, number, number, number]));
      case "octahedron": return new OctahedronGeometry(...(args as [number, number]));
      case "icosahedron": return new IcosahedronGeometry(...(args as [number, number]));
      case "torusKnot": return new TorusKnotGeometry(...(args as [number, number, number, number]));
      case "dodecahedron": return new DodecahedronGeometry(...(args as [number, number]));
      default: return new OctahedronGeometry(0.8, 0);
    }
  }, [type, args]);

  const material = useMemo(() => new MeshStandardMaterial({
    color,
    metalness: 0.4,
    roughness: 0.3,
    transparent: true,
    opacity: 0.85,
  }), [color]);

  useFrame((state) => {
    time.current = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003 * speed;
      meshRef.current.rotation.y += 0.005 * speed;
    }
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time.current * 0.8) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh ref={meshRef} geometry={geometry} material={material} />
    </group>
  );
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 7]} intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <pointLight position={[0, 3, 3]} color="#3b82f6" intensity={1} />
        <pointLight position={[3, -3, 2]} color="#8b5cf6" intensity={0.8} />
        {shapes.map((shape, i) => (
          <Shape key={i} {...shape} />
        ))}
      </Canvas>
    </div>
  );
}
