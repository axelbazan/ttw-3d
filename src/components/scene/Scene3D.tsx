'use client';

import { Suspense } from 'react';
import { Group } from 'three';
import { Rock } from './Rock';
import { Terrain } from './Terrain';
import { Environment } from './Environment';
import { Lighting } from './Lighting';
import { PosterAnchor } from './PosterAnchor';
import { 
  PosterPresentation, 
  PosterAgenda, 
  PosterSpeakers, 
  PosterCollaborators, 
  PosterRegistration 
} from '../posters';
import type { Vector3Like, RockState, ScrollProgress } from '../../types';

interface Scene3DProps {
  cameraPosition: Vector3Like;
  cameraLookAt: Vector3Like;
  cameraFov: number;
  rockState: RockState;
  scrollProgress: ScrollProgress;
}

function PosterWrapper({ 
  variant, 
  scrollProgress, 
  rockState,
  activeTab,
  onTabChange 
}: { 
  variant: 'presentation' | 'agenda' | 'speakers' | 'organizers' | 'sponsors' | 'registration';
  scrollProgress: ScrollProgress;
  rockState: RockState;
  activeTab?: 'hacking' | 'startup';
  onTabChange?: (tab: 'hacking' | 'startup') => void;
}) {
  const config = {
    presentation: <PosterPresentation onScrollStart={() => {}} />,
    agenda: <PosterAgenda activeTab={activeTab || 'hacking'} onTabChange={onTabChange || (() => {})} />,
    speakers: <PosterSpeakers />,
    organizers: <PosterCollaborators />,
    sponsors: <PosterCollaborators />,
    registration: <PosterRegistration />,
  };

  return (
    <PosterAnchor 
      variant={variant} 
      scrollProgress={scrollProgress}
    >
      {config[variant]}
    </PosterAnchor>
  );
}

export function Scene3D({ 
  cameraPosition, 
  cameraLookAt, 
  cameraFov, 
  rockState, 
  scrollProgress 
}: Scene3DProps) {
  return (
    <group>
      <Environment />
      <Terrain />
      <Rock state={rockState} position={{ x: 0, y: 0, z: 0 }} scale={1} />
      <Lighting />
      
      <Suspense fallback={null}>
        {scrollProgress.section === 'presentation' || scrollProgress.section === 'home' ? (
          <PosterWrapper variant="presentation" scrollProgress={scrollProgress} rockState={rockState} />
        ) : null}
        
        {['agenda', 'speakers'].includes(scrollProgress.section) ? (
          <PosterWrapper variant="agenda" scrollProgress={scrollProgress} rockState={rockState} />
        ) : null}
        
        {scrollProgress.section === 'speakers' ? (
          <PosterWrapper variant="speakers" scrollProgress={scrollProgress} rockState={rockState} />
        ) : null}
        
        {scrollProgress.section === 'collaborators' ? (
          <PosterWrapper variant="organizers" scrollProgress={scrollProgress} rockState={rockState} />
        ) : null}
        
        {scrollProgress.section === 'collaborators' ? (
          <PosterWrapper variant="sponsors" scrollProgress={scrollProgress} rockState={rockState} />
        ) : null}
        
        {['registration', 'finale'].includes(scrollProgress.section) ? (
          <PosterWrapper variant="registration" scrollProgress={scrollProgress} rockState={rockState} />
        ) : null}
      </Suspense>
    </group>
  );
}