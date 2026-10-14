import { useMemo } from 'react';
import { easeOutCubic, clamp, lerpVec3 } from '../utils/math';
import type { ScrollSectionId } from '../types';
import type { RockState, Vector3Like } from '../types';

const ROCK_INITIAL_POSITION: Vector3Like = { x: 0, y: 0, z: 0 };
const ROCK_INITIAL_ROTATION: Vector3Like = { x: 0, y: 0, z: 0 };
const ROCK_FINAL_POSITION: Vector3Like = { x: 0, y: -15, z: -30 };
const ROCK_FINAL_ROTATION: Vector3Like = { x: Math.PI * 2, y: Math.PI * 1.5, z: Math.PI * 0.7 };

export function useRockPhysics(t: number, section: ScrollSectionId): RockState {
  return useMemo(() => {
    const isFalling = t > 0.95;
    
    let fallProgress = 0;
    let position = ROCK_INITIAL_POSITION;
    let rotation = ROCK_INITIAL_ROTATION;

    if (isFalling) {
      fallProgress = clamp((t - 0.95) / 0.05, 0, 1);
      
      if (fallProgress < 0.3) {
        const tiltProgress = fallProgress / 0.3;
        rotation = lerpVec3(ROCK_INITIAL_ROTATION, { x: -0.4, y: 0, z: 0.2 }, tiltProgress);
        position = ROCK_INITIAL_POSITION;
      } else {
        const fallPhase = (fallProgress - 0.3) / 0.7;
        const easedFall = easeOutCubic(fallPhase);
        position = lerpVec3(ROCK_INITIAL_POSITION, ROCK_FINAL_POSITION, easedFall);
        rotation = {
          x: ROCK_FINAL_ROTATION.x * easedFall,
          y: ROCK_FINAL_ROTATION.y * easedFall,
          z: ROCK_FINAL_ROTATION.z * easedFall,
        };
      }
    }

    return {
      isFalling,
      fallProgress,
      position,
      rotation,
    };
  }, [t, section]);
}