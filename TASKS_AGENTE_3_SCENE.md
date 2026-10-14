# 🎯 TAREAS AGENTE 3 - ESCENA 3D (Three.js / React Three Fiber)
**Rama:** `feat/scene` | **Prioridad:** ALTA | **Dependencias:** `content/event.ts`, `types/index.ts`, `utils/math.ts`

---

## 📦 ARCHIVOS A CREAR/MODIFICAR EN `src/components/scene/`

| Archivo | Descripción | Estado | Complejidad |
|---------|-------------|--------|-------------|
| `Lighting.tsx` | Sistema de luces (sol, hemispheric, sombras) | 🔲 Pendiente | Media |
| `CameraPath.tsx` | Spline Catmull-Rom + keyframes del brief | 🔲 Pendiente | Alta |
| `PosterAnchor.tsx` | Anclajes 3D para montar pósters en la roca | 🔲 Pendiente | Alta |
| `ParticleSystem.tsx` | Polvo/partículas para caída final | 🔲 Pendiente | Media |
| `Scene3D.tsx` | Componente raíz que compone toda la escena | 🔲 Pendiente | Media |
| `index.ts` | Exports públicos | 🔲 Pendiente | Baja |

---

## 📋 DETALLE DE TAREAS

### 1. `Lighting.tsx` - Iluminación realista
```typescript
// Requisitos del brief:
- DirectionalLight (sol) con sombras suaves (PCFSoftShadowMap)
- HemisphereLight (cielo/suelo) para fill
- Posición sol: ángulo que proyecte sombra visible de la roca sobre la base
- Intensidad: física realista (1-3)
- Shadow map: 2048x2048, bias ajustado para evitar acné
- Opcional: RectAreaLight para bounce suave
```

### 2. `CameraPath.tsx` - Recorrido de cámara (CRÍTICO)
```typescript
// Keyframes exactos del brief (§3, tabla):
const KEYFRAMES = [
  // t=0.0   Home: 15-20m, altura mirador, ciudad/sierras fondo
  { t: 0.00, position: [0, 8, 20], lookAt: [0, 2, 0], fov: 50 },
  // t=0.10  Acercamiento: ~6-8m, aparece póster frontal
  { t: 0.10, position: [4, 5, 10], lookAt: [0, 2, 0], fov: 45 },
  // t=0.25  Agenda: órbita lateral izquierda
  { t: 0.25, position: [-8, 4, 3], lookAt: [0, 2, 0], fov: 40 },
  // t=0.45  Speakers: cara trasera/lateral
  { t: 0.45, position: [-2, 5, -8], lookAt: [0, 2, 0], fov: 40 },
  // t=0.65  Colaboradores: subida, múltiples pósters
  { t: 0.65, position: [3, 8, -5], lookAt: [0, 3, 0], fov: 45 },
  // t=0.82  Inscripción: vuelta al frente, plano cerrado
  { t: 0.82, position: [0, 3, 6], lookAt: [0, 1.5, 0], fov: 35 },
  // t=0.95  Final: sigue caída
  { t: 0.95, position: [0, 2, 5], lookAt: [0, 0, -5], fov: 50 },
];

// Implementar con CatmullRomCurve3 + lookAt suave
// Exportar: getCameraState(t: number) → { position, lookAt, fov }
```

### 3. `PosterAnchor.tsx` - Montar pósters HTML en 3D (CRÍTICO)
```typescript
// Usar drei <Html transform> para texto nítido + links clickeables
// Posiciones relativas a la roca (centro en 0,0,0, roca ~7m alto):

const POSTER_POSITIONS = {
  presentation: { position: [0, 2, 5.5], rotation: [0, 0, 0], scale: 1.2 },    // Cara frontal
  agenda:       { position: [-5.5, 2, 0], rotation: [0, Math.PI/2, 0], scale: 1 }, // Lateral izq
  speakers:     { position: [0, 2, -5.5], rotation: [0, Math.PI, 0], scale: 1 },    // Cara trasera
  organizers:   { position: [5.5, 3, 0], rotation: [0, -Math.PI/2, 0], scale: 0.9 }, // Lateral der (arriba)
  sponsors:     { position: [0, 4, -5], rotation: [0, Math.PI, 0], scale: 0.8 },     // Trasera alta
  registration: { position: [0, 1.5, 5], rotation: [0, 0, 0], scale: 1.1 },           // Frontal cerrado
};

// Cada ancla debe:
// - Recibir componente React del póster como children
// - Aplicar fade-in/out basado en sectionProgress (0-1)
// - Parallax sutil al moverse la cámara
// - Ocultar cuando no está en su sección (performance)
```

### 4. `ParticleSystem.tsx` - Caída final
```typescript
// Al activarse t > 0.95:
// - Emitir partículas desde base de la roca (polvo granito)
// - Color: gris cálido #7a7a7a con variación
// - Tamaño: 0.05-0.15m, vida: 1-3s
// - Gravedad + turbulencia leve
// - ~200-500 partículas max (performance)
// - Shader personalizado o Points + BufferGeometry
```

### 5. `Scene3D.tsx` - Composición raíz
```typescript
// Componer en orden:
// <Environment />          // Cielo, terreno lejano, mirador
// <Terrain />              // Ladera inmediata
// <Rock />                 // Piedra movediza (recibe RockState)
// <PosterAnchors />        // 6 anclas con pósters
// <ParticleSystem />       // Solo activo en final
// <Lighting />             // Luces + sombras
```

---

## 🔌 CONTRATOS QUE DEBE CUMPLIR

### `RockState` (desde `hooks/useRockPhysics.ts`)
```typescript
interface RockState {
  isFalling: boolean;
  fallProgress: number;    // 0-1
  rotation: { x, y, z };   // Euler angles
  position: { x, y, z };   // World position
}
```

### `CameraState` (desde `hooks/useCameraPath.ts`)
```typescript
interface CameraState {
  position: { x, y, z };
  lookAt: { x, y, z };
  fov: number;
}
```

### `ScrollProgress` (desde `hooks/useScrollProgress.ts`)
```typescript
interface ScrollProgress {
  t: number;                    // 0-1 global
  section: ScrollSectionId;
  sectionProgress: number;      // 0-1 en sección actual
  direction: 'up' | 'down';
}
```

---

## 🎨 REQUISITOS VISUALES (del brief)

| Elemento | Especificación |
|----------|----------------|
| **Roca** | ~7m, cuña/tetraedro irregular, granito gris + líquenes, apoyo puntual |
| **Terreno** | Ladera granito, vetas diagonales oscuras, roca redonda izq, roca baja der |
| **Entorno** | Skybox cielo nubes, sierras bajas, ciudad lejana (siluetas), mirador (deck+baranda) |
| **Sombras** | Sombra roca sobre base debe leerse (ver foto actual) |
| **Performance** | < 3MB assets, 60fps laptop media, fallback mobile (menos polígonos, sin sombras costosas) |

---

## 🚀 COMANDOS ÚTILES

```bash
# Cambiar a tu rama
git checkout feat/scene

# Ver cambios en develop
git log develop --oneline -5

# Traer actualizaciones de develop
git merge develop

# Subir tu trabajo
git push -u origin feat/scene

# Ver diff vs develop
git diff develop...feat/scene
```

---

## ✅ CRITERIOS DE ACEPTACIÓN (del brief §11)

- [ ] Home muestra piedra completa a distancia, ciudad/sierras fondo, CTA scroll
- [ ] Scroll acerca cámara y la rodea fluida y reversible
- [ ] 6 bloques aparecen en orden: presentación → agenda (2 tabs) → speakers → colaboradores → inscripción
- [ ] Pósters respetan sistema visual §5 (colores, tipografía, bordes, sombra dura, chips)
- [ ] Textos/links coinciden con §4
- [ ] Final: piedra cae → cierre con CTA → "Volver a empezar"
- [ ] Funciona mobile, prefers-reduced-motion, fallback 2D
- [ ] Sin logos inventados ni datos inventados

---

## 📝 NOTAS PARA EL AGENTE

1. **Empezar por `CameraPath.tsx`** - Es el backbone de toda la experiencia
2. **Luego `PosterAnchor.tsx`** - Para ver los pósters en 3D
3. **`Lighting.tsx`** - Para que se vea bien
4. **`ParticleSystem.tsx`** - Solo al final
5. **Testear en mobile** constantemente (performance)
6. **Usar `drei` helpers**: `<Html>`, `<ContactShadows>`, `<Environment>`, `<OrbitControls>` (solo debug)

---

## 🔗 RECURSOS ÚTILES

- R3F Docs: https://docs.pmnd.rs/react-three-fiber
- Drei Docs: https://drei.pmnd.rs
- CatmullRomCurve3: https://threejs.org/docs/#api/en/extras/curves/CatmullRomCurve3
- Rapier Physics: https://github.com/pmndrs/react-three-rapier
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger