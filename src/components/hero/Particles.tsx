"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, BufferGeometry, BufferAttribute, PointsMaterial, AdditiveBlending, Vector3, Color } from "three";

const PARTICLE_COUNT = 150;
const PARTICLE_RADIUS = 12;

export function Particles({ mouseX, mouseY, isHoveringLogo }: { 
  mouseX: number; 
  mouseY: number; 
  isHoveringLogo: boolean;
}) {
  const { scene, camera } = useThree();
  const pointsRef = useRef<Points | null>(null);
  const geometryRef = useRef<BufferGeometry | null>(null);
  const particleDataRef = useRef<{
    position: Float32Array;
    velocity: Float32Array;
    size: Float32Array;
    color: Float32Array;
    basePosition: Float32Array;
    phase: Float32Array;
  } | null>(null);
  const timeRef = useRef(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    
    const geometry = new BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);
    
    const colorA = new Color(0x3b82f6);
    const colorB = new Color(0x8b5cf6);
    const colorC = new Color(0x06b6d4);
    const colorD = new Color(0xffffff);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = PARTICLE_RADIUS * (0.3 + Math.random() * 0.7);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi) + (Math.random() - 0.5) * 2;
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.0008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0008;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0008;
      
      sizes[i] = 0.015 + Math.random() * 0.04;
      
      const colorChoice = Math.random();
      let color: Color;
      if (colorChoice < 0.3) color = colorA;
      else if (colorChoice < 0.55) color = colorB;
      else if (colorChoice < 0.8) color = colorC;
      else color = colorD;
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("size", new BufferAttribute(sizes, 1));
    geometry.setAttribute("color", new BufferAttribute(colors, 3));
    
    const material = new PointsMaterial({
      size: 1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: AdditiveBlending,
      depthWrite: false,
      depthTest: true,
    });
    
    const points = new Points(geometry, material);
    points.frustumCulled = false;
    
    pointsRef.current = points;
    geometryRef.current = geometry;
    particleDataRef.current = {
      position: positions,
      velocity: velocities,
      size: sizes,
      color: colors,
      basePosition: basePositions,
      phase: phases,
    };
    
    scene.add(points);
    initializedRef.current = true;
    
    return () => {
      scene.remove(points);
      geometry.dispose();
      material.dispose();
      initializedRef.current = false;
    };
  }, [scene]);

  useFrame((state, delta) => {
    if (!pointsRef.current || !particleDataRef.current || !geometryRef.current) return;
    
    timeRef.current += delta;
    const data = particleDataRef.current;
    const positions = data.position;
    const basePositions = data.basePosition;
    const velocities = data.velocity;
    const phases = data.phase;
    
    const mouseVector = new Vector3(mouseX * 2, mouseY * 2, 0);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phase = phases[i];
      const t = timeRef.current * 0.3 + phase;
      
      const floatX = Math.sin(t * 0.7) * 0.015;
      const floatY = Math.cos(t * 0.5) * 0.015 + Math.sin(t * 0.3) * 0.01;
      const floatZ = Math.sin(t * 0.6) * 0.015;
      
      positions[i * 3] = basePositions[i * 3] + floatX;
      positions[i * 3 + 1] = basePositions[i * 3 + 1] + floatY;
      positions[i * 3 + 2] = basePositions[i * 3 + 2] + floatZ;
      
      if (!isHoveringLogo) {
        const dx = mouseVector.x - positions[i * 3];
        const dy = mouseVector.y - positions[i * 3 + 1];
        const dz = mouseVector.z - positions[i * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < 4 && dist > 0.1) {
          const force = (1 / dist) * 0.0015;
          positions[i * 3] += dx * force;
          positions[i * 3 + 1] += dy * force;
          positions[i * 3 + 2] += dz * force;
        }
      }
      
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      
      const distFromCenter = Math.sqrt(
        positions[i * 3] ** 2 + 
        positions[i * 3 + 1] ** 2 + 
        positions[i * 3 + 2] ** 2
      );
      
      if (distFromCenter > PARTICLE_RADIUS * 1.5) {
        const dirX = -positions[i * 3] / distFromCenter;
        const dirY = -positions[i * 3 + 1] / distFromCenter;
        const dirZ = -positions[i * 3 + 2] / distFromCenter;
        
        positions[i * 3] = dirX * PARTICLE_RADIUS * (0.3 + Math.random() * 0.7);
        positions[i * 3 + 1] = dirY * PARTICLE_RADIUS * (0.3 + Math.random() * 0.7);
        positions[i * 3 + 2] = dirZ * PARTICLE_RADIUS * (0.3 + Math.random() * 0.7);
        
        basePositions[i * 3] = positions[i * 3];
        basePositions[i * 3 + 1] = positions[i * 3 + 1];
        basePositions[i * 3 + 2] = positions[i * 3 + 2];
      }
    }
    
    geometryRef.current.attributes.position.needsUpdate = true;
    
    if (pointsRef.current && camera) {
      pointsRef.current.rotation.y += delta * 0.005;
      pointsRef.current.rotation.x += delta * 0.002;
    }
  });

  return null;
}