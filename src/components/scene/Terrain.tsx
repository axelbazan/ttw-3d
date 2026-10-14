'use client';

import { useMemo } from 'react';
import { Mesh, PlaneGeometry, MeshStandardMaterial } from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';
import { primitive } from '@react-three/fiber';
import type { Vector3Like } from '../../types';

const SIMPLEX = new SimplexNoise();
const THREE_MATH = {
  mapLinear: (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
  },
  clamp: (value: number, min: number, max: number) => Math.max(min, Math.min(max, value)),
};

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
      const z = positions.getY(i);

      const noise1 = SIMPLEX.noise(x * 0.02, z * 0.02);
      const noise2 = SIMPLEX.noise(x * 0.05, z * 0.05) * 0.5;
      const noise3 = SIMPLEX.noise(x * 0.1, z * 0.1) * 0.25;

      const slope = -z * 0.08;
      const veinNoise = Math.sin(x * 0.1 + z * 0.15) * 0.3;

      let y = (noise1 + noise2 + noise3) * 1.5 + slope + veinNoise * 0.5;

      const distFromCenter = Math.sqrt(x * x + z * z);
      const centerFlatten = THREE_MATH.mapLinear(distFromCenter, 0, 8, 1, 0);
      positions.setY(i, y * THREE_MATH.clamp(centerFlatten, 0, 1));
    }

    geo.computeVertexNormals();
    geo.computeBoundingSphere();
    return geo;
  }, [scale, segments]);

  return <primitive object={geometry} />;
}

function TerrainMaterial() {
  return (
    <meshStandardMaterial
      color="#4a4a4a"
      roughness={0.95}
      metalness={0.0}
      flatShading={false}
      side={2}
    />
  );
}

export function Terrain({ position = { x: 0, y: 0, z: 0 }, scale = 1, onLoad }: TerrainProps) {
  return (
    <mesh
      position={position}
      receiveShadow
      geometry={<TerrainGeometry scale={scale} />}
      material={<TerrainMaterial />}
    />
  );
}