'use client';

import { Canvas } from '@react-three/fiber';
import { Html, ContactShadows, Environment as DreiEnvironment, OrbitControls, Preload } from '@react-three/drei';
import { Scene3D } from '../scene';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useCameraPath } from '../../hooks/useCameraPath';
import { useRockPhysics } from '../../hooks/useRockPhysics';

interface Canvas3DProps {
  onLoad?: () => void;
  fallback?: React.ReactNode;
}

export function Canvas3D({ onLoad, fallback }: Canvas3DProps) {
  const scrollProgress = useScrollProgress();
  const cameraState = useCameraPath(scrollProgress.t);
  const rockState = useRockPhysics(scrollProgress.t, scrollProgress.section);

  return (
    <div className="canvas-container" role="region" aria-label="Experiencia 3D Tandil Tech Week">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 8, 20], fov: 50 }}
        shadows={{
          enabled: true,
          type: 'PCFSoftShadowMap',
          autoUpdate: true,
          needsUpdate: true,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5, max: 2 }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.shadowMap.autoUpdate = true;
          gl.shadowMap.needsUpdate = true;
          gl.toneMapping = 1;
          gl.toneMappingExposure = 1;
        }}
        onLoad={onLoad}
      >
        <Preload all />
        <Scene3D
          cameraPosition={cameraState.position}
          cameraLookAt={cameraState.lookAt}
          cameraFov={cameraState.fov}
          rockState={rockState}
          scrollProgress={scrollProgress}
        />
        <ContactShadows
          opacity={0.3}
          scale={20}
          blur={2}
          far={50}
          position={[0, -3.5, 0]}
        />
        <DreiEnvironment
          preset="city"
          background={false}
          resolution={256}
        />
        {import.meta.env.DEV && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={50}
            makeDefault={false}
          />
        )}
        {fallback}
      </Canvas>
    </div>
  );
}

export function Canvas3DWrapper({ onReady }: { onReady: () => void }) {
  return (
    <Canvas3D
      onLoad={onReady}
      fallback={
        <Html
          transform
          position={[0, 0, 0]}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            color: '#2A2A2A',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '1.5rem',
          }}
        >
          <div className="loader" role="status" aria-label="Cargando experiencia 3D">
            <div className="loader__logo">
              <span className="loader__logo-mark">TTW</span>
              Tandil Tech Week
            </div>
            <div className="loader__progress">
              <div className="loader__bar" style={{ width: '100%' }} />
            </div>
          </div>
        </Html>
      }
    />
  );
}