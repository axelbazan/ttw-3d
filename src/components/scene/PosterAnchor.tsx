'use client';

import { useMemo } from 'react';
import { Html } from '@react-three/drei';
import { Group } from 'three';
import { scrollSections } from '../../content/event';
import type { Vector3Like, ScrollProgress, PosterVariant } from '../../types';

interface PosterAnchorProps {
  variant: PosterVariant;
  children: React.ReactNode;
  scrollProgress: ScrollProgress;
  position?: Vector3Like;
  rotation?: Vector3Like;
  scale?: number;
  onLoad?: () => void;
}

const POSTER_CONFIG: Record<PosterVariant, { 
  position: Vector3Like; 
  rotation: Vector3Like; 
  scale: number;
  section: ScrollProgress['section'];
}> = {
  presentation: { 
    position: { x: 0, y: 2.2, z: 5.2 }, 
    rotation: { x: -0.1, y: 0, z: 0 }, 
    scale: 1.1,
    section: 'presentation',
  },
  agenda: { 
    position: { x: -5.2, y: 2.5, z: 0 }, 
    rotation: { x: -0.05, y: Math.PI / 2, z: 0 }, 
    scale: 1,
    section: 'agenda',
  },
  speakers: { 
    position: { x: 0, y: 2.5, z: -5.2 }, 
    rotation: { x: -0.05, y: Math.PI, z: 0 }, 
    scale: 1,
    section: 'speakers',
  },
  organizers: { 
    position: { x: 5, y: 3.5, z: 0 }, 
    rotation: { x: -0.1, y: -Math.PI / 2, z: 0 }, 
    scale: 0.9,
    section: 'collaborators',
  },
  sponsors: { 
    position: { x: 0, y: 4.5, z: -4.5 }, 
    rotation: { x: -0.15, y: Math.PI, z: 0 }, 
    scale: 0.85,
    section: 'collaborators',
  },
  registration: { 
    position: { x: 0, y: 1.8, z: 5 }, 
    rotation: { x: -0.1, y: 0, z: 0 }, 
    scale: 1.1,
    section: 'registration',
  },
};

export function PosterAnchor({ 
  variant, 
  children, 
  scrollProgress,
  position: overridePosition,
  rotation: overrideRotation,
  scale: overrideScale,
  onLoad,
}: PosterAnchorProps) {
  const config = POSTER_CONFIG[variant];
  const isActiveSection = scrollProgress.section === config.section;
  const sectionProgress = scrollProgress.sectionProgress;
  
  // Opacidad: 1 en sección activa, fade out en otras
  <Group position={finalPosition} rotation={finalRotation} scale={finalScale}>
      <Html
        transform
        wrapperClass="poster-3d-wrapper"
        style={{
          opacity: isActiveSection ? 1 : 0,
          transform: `scale(${isActiveSection ? 1 : 0.95})`,
          transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
          pointerEvents: isActiveSection ? 'auto' : 'none',
        }}
        onLoad={onLoad}
      >
        {children}
      </Html>
    </Group>
}