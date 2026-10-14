import { extend } from '@react-three/fiber';
import { 
  Mesh, 
  Group, 
  DirectionalLight, 
  HemisphereLight, 
  AmbientLight,
  IcosahedronGeometry,
  CircleGeometry,
  PlaneGeometry,
  SphereGeometry,
  BoxGeometry,
  ConeGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Vector3,
  CatmullRomCurve3,
  Color,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Object3D,
  Object3DEventMap,
  Euler,
} from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';

// Extend Three.js objects for R3F JSX
extend({
  Mesh,
  Group,
  DirectionalLight,
  HemisphereLight,
  AmbientLight,
  IcosahedronGeometry,
  CircleGeometry,
  PlaneGeometry,
  SphereGeometry,
  BoxGeometry,
  ConeGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Vector3,
  CatmullRomCurve3,
  SimplexNoise,
  Color,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Object3D,
  Object3DEventMap,
  Euler,
});

// Type augmentation for R3F
declare module '@react-three/fiber' {
  interface ThreeElements {
    // Geometries
    icosahedronGeometry: React.PropsWithChildren<{ args?: ConstructorParameters<typeof IcosahedronGeometry> }>;
    circleGeometry: React.PropsWithChildren<{ args?: ConstructorParameters<typeof CircleGeometry> }>;
    planeGeometry: React.PropsWithChildren<{ args?: ConstructorParameters<typeof PlaneGeometry> }>;
    sphereGeometry: React.PropsWithChildren<{ args?: ConstructorParameters<typeof SphereGeometry> }>;
    boxGeometry: React.PropsWithChildren<{ args?: ConstructorParameters<typeof BoxGeometry> }>;
    coneGeometry: React.PropsWithChildren<{ args?: ConstructorParameters<typeof ConeGeometry> }>;
    
    // Materials
    meshStandardMaterial: React.PropsWithChildren<ConstructorParameters<typeof MeshStandardMaterial>[0]>;
    meshBasicMaterial: React.PropsWithChildren<ConstructorParameters<typeof MeshBasicMaterial>[0]>;
    meshPhongMaterial: React.PropsWithChildren<ConstructorParameters<typeof MeshPhongMaterial>[0]>;
    
    // Lights
    directionalLight: React.PropsWithChildren<ConstructorParameters<typeof DirectionalLight>[0] & { position?: [number, number, number] }>;
    hemisphereLight: React.PropsWithChildren<ConstructorParameters<typeof HemisphereLight>[0]>;
    ambientLight: React.PropsWithChildren<ConstructorParameters<typeof AmbientLight>[0]>;
    
    // Objects
    group: React.PropsWithChildren<{}>;
    primitive: React.PropsWithChildren<{ object: any }>;
  }
}

// Global types
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      group: any;
      primitive: any;
      directionalLight: any;
      hemisphereLight: any;
      ambientLight: any;
      icosahedronGeometry: any;
      circleGeometry: any;
      planeGeometry: any;
      sphereGeometry: any;
      boxGeometry: any;
      coneGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      meshPhongMaterial: any;
    }
  }
}