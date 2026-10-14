'use client';

import { useMemo } from 'react';
import { Mesh, SphereGeometry, MeshBasicMaterial, PlaneGeometry, Color, BoxGeometry, ConeGeometry, Group } from 'three';

interface EnvironmentProps {
  onLoad?: () => void;
}

function SkyGradient() {
  return (
    <mesh>
      <sphereGeometry args={[500, 32, 16]} />
      <meshBasicMaterial
        side={1}
        transparent
        opacity={1}
        onBeforeCompile={(shader: any) => {
          shader.uniforms.uTopColor = { value: new Color(0x87ceeb) };
          shader.uniforms.uBottomColor = { value: new Color(0xe8f0f8) };
          shader.uniforms.uOffset = { value: 0.5 };
          shader.uniforms.uExponent = { value: 0.6 };
          shader.vertexShader = `
            varying float vWorldY;
            ${shader.vertexShader}
          `.replace(
            '#include <begin_vertex>',
            `
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldY = worldPosition.y;
            #include <begin_vertex>
            `
          );
          shader.fragmentShader = `
            uniform vec3 uTopColor;
            uniform vec3 uBottomColor;
            uniform float uOffset;
            uniform float uExponent;
            varying float vWorldY;
            ${shader.fragmentShader}
          `.replace(
            '#include <dithering>',
            `
            float t = smoothstep(-uOffset * 500.0, uOffset * 500.0, vWorldY);
            t = pow(t, uExponent);
            vec3 color = mix(uBottomColor, uTopColor, t);
            gl_FragColor = vec4(color, 1.0);
            #include <dithering>
            `
          );
        }}
      />
    </mesh>
  );
}

function Clouds() {
  return (
    <group>
      {[-80, -40, 0, 40, 80].map((x, i) => (
        <mesh
          key={i}
          position={[x, 35 + (i % 3) * 5, -60 - (i % 2) * 20]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.5 + (i % 3) * 0.5}
        >
          <planeGeometry args={[200, 50]} />
          <meshBasicMaterial
            color={0xffffff}
            transparent
            opacity={0.15 + (i % 3) * 0.05}
            side={2}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function CitySilhouettes() {
  return (
    <group>
      {[-120, -80, -40, 0, 40, 80, 120].map((x, i) => (
        <mesh
          key={i}
          position={[x + (i % 3) * 10, -3.5, -50 - (i % 4) * 5]}
          scale={[2 + (i % 3), 3 + (i % 5), 1]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={0x2a2a2a} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Mountains() {
  return (
    <group>
      {[-100, -60, -20, 20, 60, 100].map((x, i) => (
        <mesh
          key={i}
          position={[x + (i % 2) * 15, -2, -70 - (i % 3) * 10]}
          rotation={[0, (i % 2) * 0.5, 0]}
          scale={[15 + (i % 3) * 5, 8 + (i % 4) * 3, 10]}
        >
          <coneGeometry args={[1, 1, 4]} />
          <meshBasicMaterial color={0x3a3a4a} transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function ViewpointRailing() {
  return (
    <group position={[0, 0.5, 15]}>
      <mesh
        position={[0, -0.1, 0]}
        scale={[8, 0.2, 4]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={0x8b6f4a} roughness={0.8} metalness={0.0} />
      </mesh>

      <mesh
        position={[-3.8, 0.6, 0]}
        scale={[0.08, 0.8, 3.8]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={0x666666} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh
        position={[3.8, 0.6, 0]}
        scale={[0.08, 0.8, 3.8]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={0x666666} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh
        position={[0, 0.95, -1.7]}
        scale={[7.6, 0.06, 0.06]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={0x666666} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh
        position={[0, 0.55, -1.7]}
        scale={[7.6, 0.06, 0.06]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={0x666666} roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

export function Environment({ onLoad }: EnvironmentProps) {
  return (
    <group>
      <SkyGradient />
      <Clouds />
      <Mountains />
      <CitySilhouettes />
      <ViewpointRailing />
    </group>
  );
}