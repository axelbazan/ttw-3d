'use client';

import { useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Mesh, Group, IcosahedronGeometry, MeshStandardMaterial, Math as ThreeMath } from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';
import type { Vector3Like, RockState } from '../../types';

interface RockProps {
  state: RockState;
  position?: Vector3Like;
  scale?: number;
  onLoad?: () => void;
}

const SIMPLEX = new SimplexNoise();

function RockGeometry({ scale = 1, detail = 6 }: { scale?: number; detail?: number }) {
  const geometry = useMemo(() => {
    const geo = new IcosahedronGeometry(3.5 * scale, detail);
    const positions = geo.attributes.position;
    const normals = geo.attributes.normal;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);

      // Normalizar para obtener dirección
      const len = Math.sqrt(x * x + y * y + z * z);
      const nx = x / len;
      const ny = y / len;
      const nz = z / len;

      // Ruido para deformar la roca (forma cuña/tetraedro irregular)
      const noise1 = SIMPLEX.noise3d(nx * 2, ny * 2, nz * 2);
      const noise2 = SIMPLEX.noise3d(nx * 4, ny * 4, nz * 4) * 0.5;
      const noise3 = SIMPLEX.noise3d(nx * 8, ny * 8, nz * 8) * 0.25;

      const displacement = (noise1 + noise2 + noise3) * 0.35;

      // Aplanar la base (cara inferior) para crear la cuña
      const baseFactor = ThreeMath.mapLinear(ny, -1, 0.2, 0, 1);
      const finalDisplacement = displacement * ThreeMath.clamp(baseFactor, 0.15, 1);

      positions.setXYZ(i,
        nx * (len + finalDisplacement),
        ny * (len + finalDisplacement),
        nz * (len + finalDisplacement)
      );
    }

    geo.computeVertexNormals();
    geo.computeBoundingSphere();
    return geo;
  }, [scale, detail]);

  return <primitive object={geometry} />;
}

function RockMaterial() {
  return (
    <MeshStandardMaterial
      color="#7a7a7a"
      roughness={0.9}
      metalness={0.05}
      flatShading={false}
    />
  );
}

export function Rock({
  state,
  position = { x: 0, y: 0, z: 0 },
  scale = 1,
  onLoad,
}: RockProps) {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(state.position.x, state.position.y, state.position.z);
      groupRef.current.rotation.set(state.rotation.x, state.rotation.y, state.rotation.z);
    }
  });

  return (
    <Group ref={groupRef} position={position} scale={scale}>
      {/* Roca principal */}
      <Mesh
        castShadow
        receiveShadow
        geometry={<RockGeometry scale={scale} />}
        material={<RockMaterial />}
      />

      {/* Base de apoyo (punto de contacto) */}
      <Mesh
        position={[0, -3.6 * scale, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[4 * scale, 32]} />
        <MeshStandardMaterial
          color="#5a5a5a"
          roughness={0.8}
          metalness={0.1}
        />
      </Mesh>

      {/* Roca redonda pequeña a la izquierda (referencia foto histórica) */}
      <Mesh
        position={[-5 * scale, -3 * scale, 2 * scale]}
        scale={[0.6 * scale, 0.5 * scale, 0.6 * scale]}
        castShadow
        receiveShadow
      >
        <IcosahedronGeometry args={[1.5, 4]} />
        <MeshStandardMaterial color="#6a6a6a" roughness={0.9} metalness={0.05} />
      </Mesh>

      {/* Roca baja a la derecha */}
      <Mesh
        position={[4 * scale, -3.3 * scale, -2.5 * scale]}
        scale={[0.8 * scale, 0.4 * scale, 0.9 * scale]}
        castShadow
        receiveShadow
      >
        <IcosahedronGeometry args={[1.2, 3]} />
        <MeshStandardMaterial color="#6a6a6a" roughness={0.9} metalness={0.05} />
      </Mesh>
    </Group>
  );
}

import { useRef } from 'react';
import { primitive, circleGeometry } from '@react-three/fiber';