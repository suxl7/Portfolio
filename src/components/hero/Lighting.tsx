"use client";

import {
  AccumulativeShadows,
  ContactShadows,
  Lightformer,
} from "@react-three/drei";




export function Lighting() {
 

  
  
  return (
    <>
     
      <AccumulativeShadows temporal frames={100} scale={15} opacity={0.7} color="#1e3a5f" />
      <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={10} blur={3} color="#0f172a" />

      <ambientLight color="#ffffff" intensity={0.5} />

      <directionalLight
        position={[8, 15, 10]}
        intensity={3}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0001}
        shadow-normalBias={0.02}
      />

      <pointLight
        position={[-6, 4, -4]}
        intensity={80}
        color="#3b82f6"
        decay={2}
        distance={25}
      />

      <pointLight
        position={[6, 3, 6]}
        intensity={60}
        color="#a855f7"
        decay={2}
        distance={25}
      />

      <pointLight
        position={[0, 8, 0]}
        intensity={40}
        color="#ffffff"
        decay={2}
        distance={35}
      />

      <pointLight
        position={[0, -2, 5]}
        intensity={30}
        color="#06b6d4"
        decay={2}
        distance={20}
      />

      <Lightformer
        position={[0, 6, 12]}
        rotation={[-Math.PI / 2, 0, 0]}
        color="#ffffff"
        intensity={20}
        scale={12}
      />

      <Lightformer
        position={[-8, 4, -8]}
        rotation={[-Math.PI / 3, 0, 0]}
        color="#3b82f6"
        intensity={15}
        scale={8}
      />

      <Lightformer
        position={[8, 4, -8]}
        rotation={[-Math.PI / 3, 0, 0]}
        color="#a855f7"
        intensity={15}
        scale={8}
      />
    </>
  );
}
