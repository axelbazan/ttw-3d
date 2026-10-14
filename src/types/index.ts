import type { ScrollSectionId } from '../content/event';

export interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

export interface CameraKeyframe {
  position: Vector3Like;
  lookAt: Vector3Like;
  fov?: number;
}

export interface ScrollProgress {
  t: number; // 0-1 global progress
  section: ScrollSectionId;
  sectionProgress: number; // 0-1 within current section
}

export interface PosterProps {
  isActive: boolean;
  progress: number; // 0-1 within this poster's section
  onClick?: () => void;
}

export interface RockState {
  isFalling: boolean;
  fallProgress: number; // 0-1
  rotation: Vector3Like;
  position: Vector3Like;
}

export interface ViewportSize {
  width: number;
  height: number;
}

export interface ReducedMotionState {
  prefersReducedMotion: boolean;
  webglSupported: boolean;
}

export type PosterVariant =
  | 'presentation'
  | 'agenda'
  | 'speakers'
  | 'organizers'
  | 'sponsors'
  | 'registration';

export interface ScrollSection {
  id: ScrollSectionId;
  start: number;
  end: number;
  posterVariant?: PosterVariant;
}

export interface AssetUrls {
  rockHistorical: string;
  rockCurrent: string;
  hero: string;
  jornadas: string;
  organizan1: string;
  organizan2: string;
  acompanan: string;
  inscripcion: string;
}

export const ASSET_URLS: AssetUrls = {
  rockHistorical: '/assets/reference/piedra-historica-bn.webp',
  rockCurrent: '/assets/reference/piedra-actual-mirador.webp',
  hero: '/assets/web-captures/01-hero.png',
  jornadas: '/assets/web-captures/02-jornadas.png',
  organizan1: '/assets/web-captures/03-organizan-1.png',
  organizan2: '/assets/web-captures/04-organizan-2.png',
  acompanan: '/assets/web-captures/05-acompanan.png',
  inscripcion: '/assets/web-captures/06-inscripcion.png',
};

export interface NavItem {
  id: ScrollSectionId;
  label: string;
}