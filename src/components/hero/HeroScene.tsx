"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { SCLogo } from "./SCLogo";
import { FloatingIcons } from "./FloatingIcons";
import { Particles } from "./Particles";
import { BackgroundEffects } from "./BackgroundEffects";
import { Lighting } from "./Lighting";

const ICON_POSITIONS = [
  { name: "React", position: [0, 0, 0] },
  { name: "Python", position: [0, 0, 0] },
  { name: "AWS", position: [0, 0, 0] },
  { name: "PostgreSQL", position: [0, 0, 0] },
  { name: "Docker", position: [0, 0, 0] },
  { name: "Git", position: [0, 0, 0] },
  { name: "Next.js", position: [0, 0, 0] },
  { name: "TypeScript", position: [0, 0, 0] },
];

function HeroSceneInner() {
  const { camera, mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [hoveredIconIndex, setHoveredIconIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const timeRef = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  const cameraOffsetX = useSpring(useTransform(springMouseX, (x) => x * 0.8), { stiffness: 80, damping: 15 });
  const cameraOffsetY = useSpring(useTransform(springMouseY, (y) => y * 0.6), { stiffness: 80, damping: 15 });
  const cameraZoom = useSpring(useMotionValue(0), { stiffness: 60, damping: 15 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;
    
    const ray = new THREE.Raycaster();
    const ndcMouse = new THREE.Vector2(mouse.x, mouse.y);
    ray.setFromCamera(ndcMouse, camera);
    
    if (groupRef.current) {
      const logoMesh = groupRef.current.getObjectByName("sc-logo-mesh");
      if (logoMesh) {
        const intersects = ray.intersectObject(logoMesh, true);
        const wasHovered = isLogoHovered;
        const nowHovered = intersects.length > 0;
        if (wasHovered !== nowHovered) {
          setIsLogoHovered(nowHovered);
        }
      }
      
      const iconMeshes: THREE.Mesh[] = [];
      groupRef.current.traverse((child) => {
        if (child.name.startsWith("icon-")) {
          iconMeshes.push(child as THREE.Mesh);
        }
      });
      
      if (iconMeshes.length > 0) {
        const intersects = ray.intersectObjects(iconMeshes, true);
        const foundIndex = intersects.length > 0 
          ? ICON_POSITIONS.findIndex((_, i) => intersects[0].object.name === `icon-${i}`)
          : -1;
        const newHoveredIndex = foundIndex >= 0 ? foundIndex : null;
        if (newHoveredIndex !== hoveredIconIndex) {
          setHoveredIconIndex(newHoveredIndex);
        }
      }
    }
    
    if (camera) {
      const targetX = cameraOffsetX.get();
      const targetY = cameraOffsetY.get();
      const targetZoom = cameraZoom.get();
      
      camera.position.lerp(new THREE.Vector3(targetX, targetY, 8 + targetZoom), delta * 3);
      camera.lookAt(0, Math.sin(time * 0.15) * 0.15, 0);
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.003;
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    const handleWheel = (e: WheelEvent) => {
      cameraZoom.set(THREE.MathUtils.clamp(cameraZoom.get() + e.deltaY * 0.001, -2, 3));
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [cameraZoom, mouseX, mouseY]);

  return (
    <group ref={groupRef}>
      <Lighting />
      <BackgroundEffects mouseX={springMouseX.get()} mouseY={springMouseY.get()} />
      
      <Particles 
        mouseX={springMouseX.get()} 
        mouseY={springMouseY.get()} 
        isHoveringLogo={isLogoHovered}
      />
      
      <SCLogo 
        isHovered={isLogoHovered} 
        mouseX={springMouseX.get()} 
        mouseY={springMouseY.get()} 
      />
      
      {!isMobile && (
        <FloatingIcons 
          mouseX={springMouseX.get()} 
          mouseY={springMouseY.get()} 
          hoveredIconIndex={hoveredIconIndex}
        />
      )}
    </group>
  );
}

export function HeroScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Render null initially to avoid SSR hydration mismatch
  if (!mounted) {
    return (
      <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] xl:min-h-[700px]" />
    );
  }

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] xl:min-h-[700px]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: "high-performance",
        }}
        shadows={{ type: THREE.PCFShadowMap }}
        performance={{
          min: 0.5,
          max: 2,
          debounce: 300,
        }}
        dpr={2}
      >
        <color attach="background" args={["#0f172a"]} />
        <fog attach="fog" args={["#0f172a", 5, 50]} />

        <HeroSceneInner />
      </Canvas>

      {/* Plain DOM overlay to avoid drei <Html> (R3F hooks require Canvas context)
          Render only on the client to prevent SSR hydration style mismatches. */}
      {mounted && (
        <div
          style={{
            pointerEvents: "none",
            userSelect: "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              textAlign: "center",
              pointerEvents: "none",
              padding: "0 1rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.25rem, 3.5vw, 2.5rem)",
                background:
                  "linear-gradient(135deg, #60a5fa 0%, #3b82f6 30%, #8b5cf6 70%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow:
                  "0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)",
                letterSpacing: "0.05em",
                filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.6))",
                marginBottom: "0.5rem",
              }}
            >
              SUSHIL.DEV
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroScene;
