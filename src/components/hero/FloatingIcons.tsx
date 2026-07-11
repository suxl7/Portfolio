"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, CanvasTexture } from "three";
import { useMotionValue, useSpring } from "framer-motion";
import * as THREE from "three";

function getTechIconTexture(name: string): CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  
  ctx.clearRect(0, 0, size, size);
  
  switch (name) {
    case "Docker": {
      const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      grad.addColorStop(0, "#0db7ed");
      grad.addColorStop(1, "#2496ed");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(size/2, size/2 + 20, 80, 40, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(size/2 + 60, size/2 + 10, 25, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "Git": {
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, "#f05032");
      grad.addColorStop(1, "#e04022");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(size/2, 30);
      ctx.lineTo(size/2, size - 30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(size/2, size/2);
      ctx.lineTo(50, size/2 - 40);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(size/2, size/2);
      ctx.lineTo(size - 50, size/2 + 40);
      ctx.stroke();
      break;
    }
    case "Next.js": {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(size/2, 40);
      ctx.lineTo(size - 40, size - 40);
      ctx.lineTo(40, size - 40);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "TypeScript": {
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, "#007acc");
      grad.addColorStop(1, "#3178c6");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 120px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("TS", size/2, size/2 + 15);
      break;
    }
    default:
      ctx.fillStyle = "#666";
      ctx.fillRect(0, 0, size, size);
  }
  
  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const TECH_ICONS_DATA = [
  { name: "React", iconType: "file" as const, iconPath: "/icons/icons8-react-native-512.png", color: "#61dafb", radius: 4.2, speed: 0.18, phase: 0, tilt: 0.3 },
  { name: "Python", iconType: "file" as const, iconPath: "/icons/python.png", color: "#3776ab", radius: 3.8, speed: -0.22, phase: 1.2, tilt: -0.25 },
  { name: "AWS", iconType: "file" as const, iconPath: "/icons/icons8-aws-512.png", color: "#ff9900", radius: 4.6, speed: 0.15, phase: 2.5, tilt: 0.4 },
  { name: "PostgreSQL", iconType: "file" as const, iconPath: "/icons/postgre.png", color: "#336791", radius: 3.5, speed: -0.25, phase: 3.8, tilt: -0.35 },
  { name: "Docker", iconType: "canvas" as const, iconPath: "docker", color: "#2496ed", radius: 4.4, speed: 0.2, phase: 5.1, tilt: 0.2 },
  { name: "Git", iconType: "canvas" as const, iconPath: "git", color: "#f05032", radius: 4.0, speed: -0.18, phase: 1.8, tilt: -0.3 },
  { name: "Next.js", iconType: "canvas" as const, iconPath: "nextjs", color: "#000000", radius: 3.7, speed: 0.23, phase: 4.2, tilt: 0.25 },
  { name: "TypeScript", iconType: "canvas" as const, iconPath: "typescript", color: "#3178c6", radius: 4.3, speed: -0.21, phase: 0.8, tilt: -0.2 },
] as const;

type TechIconData = typeof TECH_ICONS_DATA[number];

interface TechIconProps {
  index: number;
  data: TechIconData;
  texture: THREE.Texture;
  isHovered: boolean;
  mouseX: number;
  mouseY: number;
}

function TechIcon({ index, data, texture, isHovered, mouseX, mouseY }: TechIconProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  
  const timeRef = useRef(data.phase);
  const floatY = useRef(0);
  const floatScale = useRef(1);
  const driftX = useRef(0);
  const driftZ = useRef(0);
  
  const baseAngle = (index / TECH_ICONS_DATA.length) * Math.PI * 2 + data.phase;
  const orbitSpeed = data.speed;
  
  const hoverScale = useSpring(useMotionValue(isHovered ? 1.35 : 1), { stiffness: 180, damping: 20 });
  const hoverLift = useSpring(useMotionValue(isHovered ? 0.5 : 0), { stiffness: 180, damping: 20 });
  const hoverGlow = useSpring(useMotionValue(isHovered ? 1 : 0), { stiffness: 180, damping: 20 });
  
  const rotationX = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 });
  const rotationY = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 });
  const rotationZ = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 });

  useEffect(() => {
    timeRef.current = data.phase;
  }, [data.phase]);

  useFrame((state, delta) => {
    timeRef.current += delta * 0.5;
    
    const orbitAngle = timeRef.current * orbitSpeed + baseAngle;
    const radius = data.radius;
    
    floatY.current = Math.sin(timeRef.current * 1.3 + data.phase) * 0.15 + Math.sin(timeRef.current * 0.7 + data.phase * 2) * 0.08;
    floatScale.current = 1 + Math.sin(timeRef.current * 1.1 + data.phase) * 0.06 + Math.sin(timeRef.current * 0.5 + data.phase * 3) * 0.04;
    driftX.current = Math.sin(timeRef.current * 0.3 + data.phase) * 0.12;
    driftZ.current = Math.cos(timeRef.current * 0.4 + data.phase) * 0.12;
    
    if (groupRef.current && !isHovered) {
      groupRef.current.rotation.x = rotationX.get();
      groupRef.current.rotation.y = rotationY.get();
      groupRef.current.rotation.z = rotationZ.get();
    }
    
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(orbitAngle) * radius + driftX.current;
      groupRef.current.position.y = floatY.current + hoverLift.get();
      groupRef.current.position.z = Math.sin(orbitAngle) * radius + driftZ.current;
      groupRef.current.scale.setScalar(floatScale.current * hoverScale.get());
    }
    
    if (glowMaterialRef.current) {
      glowMaterialRef.current.opacity = hoverGlow.get();
    }
    
    if (!isHovered) {
      const targetRX = mouseY * 0.08 + Math.sin(timeRef.current * 0.5 + data.phase) * 0.05;
      const targetRY = mouseX * 0.08 + Math.cos(timeRef.current * 0.4 + data.phase) * 0.05;
      const targetRZ = (mouseX * 0.04 + Math.sin(timeRef.current * 0.3 + data.phase) * 0.03) * data.tilt;
      
      rotationX.set(targetRX);
      rotationY.set(targetRY);
      rotationZ.set(targetRZ);
    }
  });

  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.1,
      metalness: 0.0,
      roughness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.1,
      thickness: 0.1,
      ior: 1.3,
      envMapIntensity: 1.2,
      side: THREE.DoubleSide,
    });
    return mat;
  }, [texture]);

  const glowMaterial = useMemo(() => {
    const mat = new THREE.MeshBasicMaterial({
      color: data.color,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return mat;
  }, [data.color]);

  useEffect(() => {
    glowMaterialRef.current = glowMaterial;
  }, [glowMaterial]);

  return (
    <group ref={groupRef}>
      <mesh
        geometry={useMemo(() => new THREE.BoxGeometry(1.1, 1.1, 0.12), [])}
        material={material}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={useMemo(() => new THREE.BoxGeometry(1.25, 1.25, 0.15), [])}
        material={glowMaterial}
      />
    </group>
  );
}

export function FloatingIcons({ mouseX, mouseY, hoveredIconIndex }: { 
  mouseX: number; 
  mouseY: number; 
  hoveredIconIndex: number | null;
}) {
  const reactTexture = useLoader(TextureLoader, "/icons/icons8-react-native-512.png");
  const pythonTexture = useLoader(TextureLoader, "/icons/python.png");
  const awsTexture = useLoader(TextureLoader, "/icons/icons8-aws-512.png");
  const postgreTexture = useLoader(TextureLoader, "/icons/postgre.png");
  
  const dockerTexture = useMemo(() => getTechIconTexture("Docker"), []);
  const gitTexture = useMemo(() => getTechIconTexture("Git"), []);
  const nextjsTexture = useMemo(() => getTechIconTexture("Next.js"), []);
  const tsTexture = useMemo(() => getTechIconTexture("TypeScript"), []);

  const textures = useMemo(() => [
    reactTexture,
    pythonTexture,
    awsTexture,
    postgreTexture,
    dockerTexture,
    gitTexture,
    nextjsTexture,
    tsTexture,
  ], [reactTexture, pythonTexture, awsTexture, postgreTexture, dockerTexture, gitTexture, nextjsTexture, tsTexture]);

  return (
    <group>
      {TECH_ICONS_DATA.map((data, index) => (
        <TechIcon
          key={data.name}
          index={index}
          data={data}
          texture={textures[index]}
          isHovered={hoveredIconIndex === index}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </group>
  );
}