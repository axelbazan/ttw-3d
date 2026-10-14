import { useMemo } from 'react';
import { getCameraStateAtProgress } from '../components/scene/CameraPath';
import type { Vector3Like } from '../types';

export function useCameraPath(t: number) {
  return useMemo(() => getCameraStateAtProgress(t), [t]);
}