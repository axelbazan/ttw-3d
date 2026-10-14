import type { Vector3Like, CameraKeyframe, ScrollProgress, ScrollSectionId, ScrollSection } from '../types';
import { scrollSections } from '../content/event';

/**
 * Interpolación lineal entre dos números
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Interpolación lineal entre dos vectores 3D
 */
export function lerpVec3(a: Vector3Like, b: Vector3Like, t: number): Vector3Like {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    z: lerp(a.z, b.z, t),
  };
}

/**
 * Suavizado con easing (ease-out cubic)
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Calcula el progreso de scroll dentro de una sección específica
 */
export function getSectionProgress(
  globalT: number,
  sectionStart: number,
  sectionEnd: number
): number {
  if (globalT <= sectionStart) return 0;
  if (globalT >= sectionEnd) return 1;
  return (globalT - sectionStart) / (sectionEnd - sectionStart);
}

/**
 * Obtiene la sección actual y su progreso interno dado un progreso global
 */
export function getCurrentSection(globalT: number): ScrollProgress {
  for (const section of scrollSections) {
    const [start, end] = section.range;
    if (globalT >= start && globalT < end) {
      return {
        t: globalT,
        section: section.id,
        sectionProgress: getSectionProgress(globalT, start, end),
      };
    }
  }
  // Si estamos al final exacto (t=1), estar en la última sección
  const lastSection = scrollSections[scrollSections.length - 1];
  return {
    t: globalT,
    section: lastSection.id,
    sectionProgress: 1,
  };
}

/**
 * Convierte coordenadas de pantalla a normalizadas (-1 a 1)
 */
export function screenToNDC(x: number, y: number, width: number, height: number): Vector3Like {
  return {
    x: (x / width) * 2 - 1,
    y: -(y / height) * 2 + 1,
    z: 0,
  };
}

/**
 * Clampa un valor entre min y max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Mapea un valor de un rango a otro
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/**
 * Genera una curva Catmull-Rom para el camino de la cámara
 * Puntos clave basados en el brief
 */
export const CAMERA_PATH_KEYFRAMES: CameraKeyframe[] = [
  // 0 - Home: lejos, vista completa con ciudad/sierras
  {
    position: { x: 0, y: 8, z: 20 },
    lookAt: { x: 0, y: 2, z: 0 },
    fov: 50,
  },
  // 0.1 - Acercamiento: a ~6-8m, aparece primer póster
  {
    position: { x: 4, y: 5, z: 10 },
    lookAt: { x: 0, y: 2, z: 0 },
    fov: 45,
  },
  // 0.25 - Agenda: órbita lateral izquierda
  {
    position: { x: -8, y: 4, z: 3 },
    lookAt: { x: 0, y: 2, z: 0 },
    fov: 40,
  },
  // 0.45 - Speakers: cara trasera/lateral
  {
    position: { x: -2, y: 5, z: -8 },
    lookAt: { x: 0, y: 2, z: 0 },
    fov: 40,
  },
  // 0.65 - Colaboradores: subida, múltiples pósters
  {
    position: { x: 3, y: 8, z: -5 },
    lookAt: { x: 0, y: 3, z: 0 },
    fov: 45,
  },
  // 0.82 - Inscripción: vuelta al frente, plano cerrado
  {
    position: { x: 0, y: 3, z: 6 },
    lookAt: { x: 0, y: 1.5, z: 0 },
    fov: 35,
  },
  // 0.95 - Final: cámara sigue la caída
  {
    position: { x: 0, y: 2, z: 5 },
    lookAt: { x: 0, y: 0, z: -5 },
    fov: 50,
  },
];

/**
 * Interpola la cámara a lo largo del camino usando Catmull-Rom spline
 */
export function getCameraStateAtProgress(t: number): { position: Vector3Like; lookAt: Vector3Like; fov: number } {
  const clampedT = clamp(t, 0, 1);
  const numSegments = CAMERA_PATH_KEYFRAMES.length - 1;
  const segmentT = clampedT * numSegments;
  const segmentIndex = Math.floor(segmentT);
  const localT = segmentT - segmentIndex;

  if (segmentIndex >= numSegments) {
    const last = CAMERA_PATH_KEYFRAMES[CAMERA_PATH_KEYFRAMES.length - 1];
    return { position: last.position, lookAt: last.lookAt, fov: last.fov || 50 };
  }

  const p0 = CAMERA_PATH_KEYFRAMES[Math.max(0, segmentIndex - 1)];
  const p1 = CAMERA_PATH_KEYFRAMES[segmentIndex];
  const p2 = CAMERA_PATH_KEYFRAMES[segmentIndex + 1];
  const p3 = CAMERA_PATH_KEYFRAMES[Math.min(CAMERA_PATH_KEYFRAMES.length - 1, segmentIndex + 2)];

  // Catmull-Rom spline interpolation
  const t2 = localT * localT;
  const t3 = t2 * localT;

  const interpolate = (a: Vector3Like, b: Vector3Like, c: Vector3Like, d: Vector3Like) => ({
    x: 0.5 * ((2 * b.x) + (-a.x + c.x) * localT + (2 * a.x - 5 * b.x + 4 * c.x - d.x) * t2 + (-a.x + 3 * b.x - 3 * c.x + d.x) * t3),
    y: 0.5 * ((2 * b.y) + (-a.y + c.y) * localT + (2 * a.y - 5 * b.y + 4 * c.y - d.y) * t2 + (-a.y + 3 * b.y - 3 * c.y + d.y) * t3),
    z: 0.5 * ((2 * b.z) + (-a.z + c.z) * localT + (2 * a.z - 5 * b.z + 4 * c.z - d.z) * t2 + (-a.z + 3 * b.z - 3 * c.z + d.z) * t3),
  });

  const position = interpolate(p0.position, p1.position, p2.position, p3.position);
  const lookAt = interpolate(p0.lookAt, p1.lookAt, p2.lookAt, p3.lookAt);
  const fov = lerp(p1.fov || 50, p2.fov || 50, localT);

  return { position, lookAt, fov };
}

/**
 * Verifica si el usuario prefiere movimiento reducido
 */
export function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Verifica soporte WebGL
 */
export function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

/**
 * Formatea tiempo para countdown
 */
export function formatCountdown(ms: number): { days: number; hours: number; minutes: number; seconds: number } {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

/**
 * Genera ID único simple
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}