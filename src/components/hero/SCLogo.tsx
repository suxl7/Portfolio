"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Center, Float } from "@react-three/drei";
import * as THREE from "three";
import { MeshPhysicalMaterial } from "three";

export function SCLogo({ isHovered, mouseX, mouseY }: { 
  isHovered: boolean; 
  mouseX: number; 
  mouseY: number; 
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);

  const floatY = useRef(0);
  const floatTime = useRef(0);
  


  useFrame((state, delta) => {
    floatTime.current += delta * 0.35;
    
    floatY.current = Math.sin(floatTime.current) * 0.12 + Math.sin(floatTime.current * 0.7) * 0.05;
    
    const breathingScale = 1 + Math.sin(floatTime.current * 0.5) * 0.015;
    
   if (groupRef.current) {
  const targetRX = isHovered ? 0 : mouseY * 0.14;
  const targetRY = isHovered ? 0 : mouseX * 0.14;
  const targetRZ = isHovered ? 0 : mouseX * 0.06;

  groupRef.current.rotation.x = THREE.MathUtils.lerp(
    groupRef.current.rotation.x,
    targetRX,
    0.08
  );

  groupRef.current.rotation.y = THREE.MathUtils.lerp(
    groupRef.current.rotation.y,
    targetRY,
    0.08
  );

  groupRef.current.rotation.z = THREE.MathUtils.lerp(
    groupRef.current.rotation.z,
    targetRZ,
    0.08
  );

  groupRef.current.position.y = floatY.current;

  const targetScale = isHovered ? 1.08 : 1;

  groupRef.current.scale.lerp(
    new THREE.Vector3(
      targetScale * breathingScale,
      targetScale * breathingScale,
      targetScale * breathingScale
    ),
    0.08
  );
}

if (glowMeshRef.current) {
  const mat = glowMeshRef.current.material as THREE.MeshBasicMaterial;

  mat.opacity = THREE.MathUtils.lerp(
    mat.opacity,
    isHovered ? 0.22 : 0.12,
    0.08
  );
}
  });

  const glassMaterial = useMemo(() => {
    const mat = new MeshPhysicalMaterial({
      transmission: 0.98,
      thickness: 0.4,
      roughness: 0.02,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      ior: 1.45,
      dispersion: 0.15,
      envMapIntensity: 1.5,
      reflectivity: 1.0,
      color: "#ffffff",
      opacity: 1.0,
      transparent: true,
      depthWrite: true,
      side: THREE.DoubleSide,
      flatShading: false,
    });
    return mat;
  }, []);

  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: "#3b82f6",
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);


  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.15}>
        <mesh
          geometry={useMemo(() => new THREE.BoxGeometry(2.2, 2.2, 0.35), [])}
          material={glassMaterial}
          castShadow
          receiveShadow
        />
        <mesh
          ref={glowMeshRef}
          geometry={useMemo(() => new THREE.BoxGeometry(2.45, 2.45, 0.5), [])}
          material={glowMaterial}
        />
        
        <Center>
          <group position={[0, 0, 0.28]} scale={0.85}>
            <Text
  fontSize={1.1}
  letterSpacing={0.02}
  anchorX="center"
  anchorY="middle"
  maxWidth={2}
>
  SC

  <meshPhysicalMaterial
    transmission={0.95}
    thickness={0.15}
    roughness={0.01}
    metalness={0}
    clearcoat={1}
    clearcoatRoughness={0.02}
    ior={1.5}
    color="#ffffff"
  />
</Text>
          </group>
        </Center>
      </Float>
      
    </group>
  );
}