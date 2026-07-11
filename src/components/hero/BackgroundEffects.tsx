"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  AdditiveBlending,
  DoubleSide,
  Vector2,
  SphereGeometry,
  MeshBasicMaterial,
} from "three";
import * as THREE from "three";

export function BackgroundEffects({
  mouseX,
  mouseY,
}: {
  mouseX: number;
  mouseY: number;
}) {
  const planeRef = useRef<Mesh<PlaneGeometry, ShaderMaterial> | null>(null);

  const planeMesh = useMemo(() => {
    const geometry = new PlaneGeometry(30, 30);

    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
    value: new Vector2(1,1),
},
        uMouse: { value: new Vector2(0.5, 0.5) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        varying vec2 vUv;

        #define PI 3.14159265359

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }

        float fbm(vec2 p, int octaves) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 6; i++) {
            if (i >= octaves) break;
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }

        vec3 aurora(vec2 p, float time) {
          vec3 col = vec3(0.0);

          float n1 = fbm(p * 1.5 + vec2(time * 0.03, time * 0.02), 4);
          float n2 = fbm(p * 2.0 - vec2(time * 0.04, time * 0.01), 4);
          float n3 = fbm(p * 0.8 + vec2(time * 0.02, -time * 0.03), 3);

          float aurora = smoothstep(0.4, 0.7, n1) * smoothstep(0.8, 0.5, n2);
          aurora *= smoothstep(0.3, 0.6, n3);

          vec3 color1 = vec3(0.2, 0.4, 1.0);
          vec3 color2 = vec3(0.5, 0.2, 0.9);
          vec3 color3 = vec3(0.0, 0.7, 0.9);

          col += aurora * color1 * 0.15;
          col += aurora * 0.7 * color2 * 0.12;
          col += aurora * 0.5 * color3 * 0.1;

          return col;
        }

        vec3 radialGlow(
          vec2 uv,
          vec2 center,
          float radius,
          vec3 color,
          float intensity
        ) {
          float dist = length(uv - center);
          float glow = smoothstep(radius, 0.0, dist) * intensity;
          return color * glow;
        }

        void main() {
          vec2 uv =
            (gl_FragCoord.xy - 0.5 * uResolution) /
            min(uResolution.x, uResolution.y);
          uv *= 2.0;

          vec2 mouseUv = uMouse * 2.0 - 1.0;

          vec3 color = vec3(0.01, 0.01, 0.03);

          color += aurora(uv, uTime);

          color += radialGlow(
            uv,
            vec2(-0.7, 0.5),
            0.8,
            vec3(0.2, 0.4, 1.0),
            0.12
          );
          color += radialGlow(
            uv,
            vec2(0.6, -0.4),
            0.7,
            vec3(0.5, 0.2, 0.9),
            0.1
          );
          color += radialGlow(
            uv,
            vec2(0.0, 0.0),
            1.5,
            vec3(0.0, 0.5, 0.8),
            0.05
          );

          color +=
            radialGlow(
              uv,
              mouseUv,
              0.4,
              vec3(0.3, 0.5, 1.0),
              0.08 * (1.0 - length(mouseUv) * 0.5)
            );

          float vignette = 1.0 - length(uv) * 0.3;
          color *= vignette;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });

    const mesh = new Mesh(geometry, material);
    mesh.position.z = -20;
  
    return mesh;
  }, []);

  useEffect(() => {
    planeRef.current = planeMesh;
  }, [planeMesh]);

  useFrame((_, delta) => {
    if (
      planeRef.current &&
      planeRef.current.material instanceof ShaderMaterial
    ) {
      planeRef.current.material.uniforms.uTime.value += delta;
      planeRef.current.material.uniforms.uMouse.value.set(mouseX, 1 - mouseY);
      planeRef.current.material.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    }
  });

  return <primitive object={planeMesh} />;
}

export function GradientOrbs() {
  const orbRefs = useMemo(() => {
    const orbs: THREE.Mesh[] = [];
    const configs = [
      {
        color: 0x3b82f6,
        pos: [-6, 4, -8],
        scale: 8,
        intensity: 0.08,
      },
      {
        color: 0x8b5cf6,
        pos: [6, -3, -10],
        scale: 6,
        intensity: 0.06,
      },
      {
        color: 0x06b6d4,
        pos: [-4, -5, -7],
        scale: 5,
        intensity: 0.05,
      },
      {
        color: 0xec4899,
        pos: [5, 5, -9],
        scale: 4,
        intensity: 0.04,
      },
    ];

    configs.forEach(({ color, pos, scale, intensity }) => {
      const geometry = new SphereGeometry(scale, 16, 16);
      const material = new MeshBasicMaterial({
        color,
        transparent: true,
        opacity: intensity,
        side: DoubleSide,
        depthWrite: false,
      });
      const mesh = new Mesh(geometry, material);
      mesh.position.set(pos[0], pos[1], pos[2]);
      orbs.push(mesh);
    });

    return orbs;
  }, []);

  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;
    
    orbRefs.forEach((orb, i) => {
      orb.rotation.y += delta * 0.02 * (i + 1);
      orb.rotation.x += delta * 0.01 * (i % 2 === 0 ? 1 : -1);
      orb.position.y +=
        Math.sin(time * 0.3 + i) * delta * 0.1;
      orb.scale.setScalar(
        1 + Math.sin(time * 0.2 + i) * 0.05
      );
    });
  });

  return (
    <group>
      {orbRefs.map((orb, i) => (
        <primitive key={i} object={orb} />
      ))}
    </group>
  );
}

export function VolumetricFog() {
  const fogRef = useRef<Mesh<SphereGeometry, ShaderMaterial> | null>(null);

  const geometry = useMemo(
    () => new SphereGeometry(15, 32, 32),
    []
  );

  const material = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0x3b82f6) },
        uColor2: { value: new THREE.Color(0x8b5cf6) },
        uColor3: { value: new THREE.Color(0x06b6d4) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        float noise(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float n = i.x + i.y * 57.0 + 113.0 * i.z;
          return fract(sin(n) * 43758.5453);
        }

        float fbm(vec3 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 4; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }

        void main() {
          float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          fresnel = pow(fresnel, 2.0);

          float fog = fbm(
            vWorldPosition * 0.3 +
            vec3(uTime * 0.01, uTime * 0.005, uTime * 0.003)
          );
          fog = smoothstep(0.3, 0.7, fog);

          vec3 color = mix(uColor1, uColor2, fog);
          color = mix(color, uColor3, fresnel * 0.5);

          float alpha = fresnel * fog * 0.15;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: AdditiveBlending,
    });
  }, []);

  const fogMesh = useMemo(() => new Mesh(geometry, material), [geometry, material]);

  useEffect(() => {
    fogRef.current = fogMesh;
  }, [fogMesh]);

  useFrame((_, delta) => {
    if (fogRef.current && fogRef.current.material instanceof ShaderMaterial) {
      fogRef.current.material.uniforms.uTime.value += delta;
      fogRef.current.rotation.y += delta * 0.005;
    }
  });

  return <primitive ref={fogRef} object={fogMesh} position={[0, 0, 0]} scale={1.5} />;
}

