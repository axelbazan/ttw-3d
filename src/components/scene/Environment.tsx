'use client';

import { useMemo } from 'react';
import { Mesh, SphereGeometry, MeshBasicMaterial, PlaneGeometry, Color } from 'three';
import { primitive } from '@react-three/fiber';

interface EnvironmentProps {
  onLoad?: () => void;
}

function SkyGradient() {
  return (
    <Mesh>
      <SphereGeometry args={[500, 32, 16]} />
      <MeshBasicMaterial
        side={1} // BackSide
        transparent
        opacity={1}
        onBeforeCompile={(shader) => {
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
    </Mesh>
  );
}

function Clouds() {
  const cloudGeometry = useMemo(() => {
    const geo = new PlaneGeometry(200, 50);
    // Crear múltiples nubes como instancias
    return geo;
  }, []);

  return (
    <group>
      {/* Nubes dispersas en el horizonte */}
      {[-80, -40, 0, 40, 80].map((x, i) => (
        <Mesh
          key={i}
          position={[x, 35 + (i % 3) * 5, -60 - (i % 2) * 20]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.5 + (i % 3) * 0.5}
        >
          <PlaneGeometry args={[1, 1]} />
          <MeshBasicMaterial
            color={0xffffff}
            transparent
            opacity={0.15 + (i % 3) * 0.05}
            side={2}
            depthWrite={false}
          />
        </Mesh>
      ))}
    </group>
  );
}

function CitySilhouettes() {
  return (
    <group>
      {[-120, -80, -40, 0, 40, 80, 120].map((x, i) => (
        <Mesh
          key={i}
          position={[x + (i % 3) * 10, -3.5, -50 - (i % 4) * 5]}
          scale={[2 + (i % 3), 3 + (i % 5), 1]}
        >
          <BoxGeometry args={[1, 1, 1]} />
          <MeshBasicMaterial color={0x2a2a2a} transparent opacity={0.4} />
        </Mesh>
      ))}
    </group>
  );
}

function Mountains() {
  return (
    <group>
      {[-100, -60, -20, 20, 60, 100].map((x, i) => (
        <Mesh
          key={i}
          position={[x + (i % 2) * 15, -2, -70 - (i % 3) * 10]}
          rotation={[0, (i % 2) * 0.5, 0]}
          scale={[15 + (i % 3) * 5, 8 + (i % 4) * 3, 10]}
        >
          <ConeGeometry args={[1, 1, 4]} />
          <MeshBasicMaterial color={0x3a3a4a} transparent opacity={0.35} />
        </Mesh>
      ))}
    </group>
  );
}

function ViewpointRailing() {
  return (
    <group position={[0, 0.5, 15]}>
      {/* Deck de madera */}
      <Mesh
        position={[0, -0.1, 0]}
        scale={[8, 0.2, 4]}
      >
        <BoxGeometry args={[1, 1, 1]} />
        <MeshStandardMaterial color={0x8b6f4a} roughness={0.8} metalness={0.0} />
      </Mesh>

      {/* Baranda metálica */}
      <Mesh
        position={[-3.8, 0.6, 0]}
        scale={[0.08, 0.8, 3.8]}
      >
        <BoxGeometry args={[1, 1, 1]} />
        <MeshStandardMaterial color={0x666666} roughness={0.3} metalness={0.8} />
      </Mesh>
      <Mesh
        position={[3.8, 0.6, 0]}
        scale={[0.08, 0.8, 3.8]}
      >
        <BoxGeometry args={[1, 1, 1]} />
        <MeshStandardMaterial color={0x666666} roughness={0.3} metalness={0.8} />
      </Mesh>
      <Mesh
        position={[0, 0.95, -1.7}]
        scale={[7.6, 0.06, 0.06]}
      >
        <BoxGeometry args={[1, 1, 1]} />
        <MeshStandardMaterial color={0x666666} roughness={0.3} metalness={0.8} />
      </Mesh>
      <Mesh
        position={[0, 0.55, -1.7]}
        scale={[7.6, 0.06, 0.06]}
      >
        <BoxGeometry args={[1, 1, 1]} />
        <MeshStandardMaterial color={0x666666} roughness={0.3} metalness={0.8} />
      </Mesh>
    </group>
  );
}

import { group, BoxGeometry, ConeGeometry } from '@react-three/fiber';

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