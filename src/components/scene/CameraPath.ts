import { CatmullRomCurve3, Vector3 } from 'three';
import type { CameraKeyframe, Vector3Like } from '../../types';

/**
 * CameraPath - Spline Catmull-Rom para el recorrido de cámara
 * Keyframes exactos del brief (§3, tabla de tramos de scroll)
 */

// Keyframes: t ∈ [0, 1] global → posición, lookAt, fov
const KEYFRAMES: CameraKeyframe[] = [
  // t=0.00  Home: lejos, vista completa con ciudad/sierras
  { position: { x: 0, y: 8, z: 20 }, lookAt: { x: 0, y: 2, z: 0 }, fov: 50 },
  // t=0.10  Acercamiento: ~6-8m, aparece póster frontal
  { position: { x: 4, y: 5, z: 10 }, lookAt: { x: 0, y: 2, z: 0 }, fov: 45 },
  // t=0.25  Agenda: órbita lateral izquierda
  { position: { x: -8, y: 4, z: 3 }, lookAt: { x: 0, y: 2, z: 0 }, fov: 40 },
  // t=0.45  Speakers: cara trasera/lateral
  { position: { x: -2, y: 5, z: -8 }, lookAt: { x: 0, y: 2, z: 0 }, fov: 40 },
  // t=0.65  Colaboradores: subida, múltiples pósters
  { position: { x: 3, y: 8, z: -5 }, lookAt: { x: 0, y: 3, z: 0 }, fov: 45 },
  // t=0.82  Inscripción: vuelta al frente, plano cerrado
  { position: { x: 0, y: 3, z: 6 }, lookAt: { x: 0, y: 1.5, z: 0 }, fov: 35 },
  // t=0.95  Final: cámara sigue la caída
  { position: { x: 0, y: 2, z: 5 }, lookAt: { x: 0, y: 0, z: -5 }, fov: 50 },
];

// Parámetros t correspondientes a cada keyframe
const KEYFRAME_T = [0.00, 0.10, 0.25, 0.45, 0.65, 0.82, 0.95];

// Crear curva Catmull-Rom para posición
const positionCurve = new CatmullRomCurve3(
  KEYFRAMES.map(k => new Vector3(k.position.x, k.position.y, k.position.z))
);

// Crear curva Catmull-Rom para lookAt
const lookAtCurve = new CatmullRomCurve3(
  KEYFRAMES.map(k => new Vector3(k.lookAt.x, k.lookAt.y, k.lookAt.z))
);

/**
 * Interpola FOV linealmente entre keyframes
 */
function getFovAtT(t: number): number {
  const clampedT = Math.max(0, Math.min(1, t));
  
  // Encontrar segmento
  for (let i = 0; i < KEYFRAME_T.length - 1; i++) {
    if (clampedT >= KEYFRAME_T[i] && clampedT <= KEYFRAME_T[i + 1]) {
      const localT = (clampedT - KEYFRAME_T[i]) / (KEYFRAME_T[i + 1] - KEYFRAME_T[i]);
      return THREE_MATH.lerp(KEYFRAMES[i].fov!, KEYFRAMES[i + 1].fov!, localT);
    }
  }
  return KEYFRAMES[KEYFRAMES.length - 1].fov!;
}

// Math utils inline para evitar dependencia circular
const THREE_MATH = {
  lerp: (a: number, b: number, t: number) => a + (b - a) * t,
  clamp: (v: number, min: number, max: number) => Math.max(min, Math.min(max, v)),
};

/**
 * Obtiene estado de cámara (posición, lookAt, fov) para un progreso t ∈ [0, 1]
 * Usa Catmull-Rom para posición y lookAt (suave), lerp para FOV
 */
export function getCameraStateAtProgress(t: number): {
  position: Vector3Like;
  lookAt: Vector3Like;
  fov: number;
} {
  const clampedT = THREE_MATH.clamp(t, 0, 1);
  
  // CatmullRomCurve3.getPoint espera t en [0, 1] para toda la curva
  // Mapear nuestro t global al dominio de la curva
  const curveT = clampedT; // La curva ya está parametrizada por chord length approximado
  
  const position = positionCurve.getPoint(curveT);
  const lookAt = lookAtCurve.getPoint(curveT);
  const fov = getFovAtT(clampedT);
  
  return {
    position: { x: position.x, y: position.y, z: position.z },
    lookAt: { x: lookAt.x, y: lookAt.y, z: lookAt.z },
    fov,
  };
}

/**
 * Obtiene la tangente (dirección de movimiento) en un punto t
 * Útil para efectos de motion blur o orientación
 */
export function getCameraTangentAtProgress(t: number): Vector3Like {
  const clampedT = THREE_MATH.clamp(t, 0, 1);
  const tangent = positionCurve.getTangent(clampedT);
  return { x: tangent.x, y: tangent.y, z: tangent.z };
}

/**
 * Obtiene el keyframe más cercano para debugging
 */
export function getNearestKeyframe(t: number): { index: number; t: number; keyframe: CameraKeyframe } {
  let minDist = Infinity;
  let nearestIndex = 0;
  
  KEYFRAME_T.forEach((kt, i) => {
    const dist = Math.abs(kt - t);
    if (dist < minDist) {
      minDist = dist;
      nearestIndex = i;
    }
  });
  
  return {
    index: nearestIndex,
    t: KEYFRAME_T[nearestIndex],
    keyframe: KEYFRAMES[nearestIndex],
  };
}

/**
 * Debug: obtener todos los keyframes
 */
export function getAllKeyframes(): CameraKeyframe[] {
  return [...KEYFRAMES];
}

export function getKeyframeTimes(): number[] {
  return [...KEYFRAME_T];
}