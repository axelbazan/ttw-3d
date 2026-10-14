'use client';

import { Color } from 'three';

export function Lighting() {
  return (
    <group>
      <directionalLight
        position={[15, 25, 10]}
        intensity={2.5}
        color={new Color(0xfff5e6)}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
      />
      
      <directionalLight
        position={[-10, 15, -10]}
        intensity={0.8}
        color={new Color(0xe8f0ff)}
      />
      
      <hemisphereLight
        skyColor={new Color(0x87ceeb)}
        groundColor={new Color(0x4a4a3a)}
        intensity={0.6}
      />
      
      <ambientLight
        color={new Color(0x404040)}
        intensity={0.3}
      />
    </group>
  );
}