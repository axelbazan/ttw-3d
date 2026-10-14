'use client';

import { useMemo } from 'react';
import { Mesh, PlaneGeometry, MeshStandardMaterial, Math as ThreeMath } from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';
import type { Vector3Like } from '../../types';

const SIMPLEX = new SimplexNoise();

interface TerrainProps {
  position?: Vector3Like;
  scale?: number;
  onLoad?: () => void;
}

function TerrainGeometry({ scale = 1, segments = 64 }: { scale?: number; segments?: number }) {
  const geometry = useMemo(() => {
    const size = 60 * scale;
    const geo = new PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);
    const positions = geo.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getY(i); // Y en plane geometry es Z en world

      // Ruido para terreno natural
      const noise1 = SIMPLEX.noise2d(x * 0.02, z * 0.02);
      const noise2 = SIMPLEX.noise2d(x * 0.05, z * 0.05) * 0.5;
      const noise3 = SIMPLEX.noise2d(x * 0.1, z * 0.1) * 0.25;

      // Pendiente general hacia abajo (ladera)
      const slope = -z * 0.08;

      // Vetas diagonales oscuras (textura granito)
      const veinNoise = Math.sin(x * 0.1 + z * 0.15) * 0.3;

      const y = (noise1 + noise2 + noise3) * 1.5 + slope + veinNoise * 0.5;

      // Aplanar área central donde está la roca
      const distFromCenter = Math.sqrt(x * x + z * z);
      const centerFlatten = ThreeMath.mapLinear(distFromCenter, 0, 8, 1, 0);
      positions.setY(i, y * ThreeMath.clamp(centerFlatten, 0, 1));
    }

    geo.computeVertexNormals();
    geo.computeBoundingSphere();
    return geo;
  }, [scale, segments]);

  return <primitive object={geometry} />;
}

function TerrainMaterial() {
  return (
    <MeshStandardMaterial
      color="#4a4a4a"
      roughness={0.95}
      metalness={0.0}
      flatShading={false}
      side={2} // DoubleSide
    />
  );
}

export function Terrain({ position = { x: 0, y: 0, z: 0 }, scale = 1, onLoad }: TerrainProps) {
  return (
    <Mesh
      position={position}
      receiveShadow
      geometry={<TerrainGeometry scale={scale} />}
      material={<TerrainMaterial />}
    />
  );
}

import { primitive } from '@react-three/fiber';