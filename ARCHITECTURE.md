# ARQUITECTURA MODULAR - TANDIL TECH WEEK 3D
## Separación de responsabilidades para trabajo en paralelo

---

## 📦 ESTRUCTURA DE MÓDULOS INDEPENDIENTES

```
src/
├── core/                    # Núcleo compartido (types, utils, constants)
│   ├── types/index.ts       # ✅ Tipos TypeScript compartidos
│   ├── utils/math.ts        # ✅ Utilidades matemáticas
│   └── config.ts            # Configuración global
│
├── content/                 # 📝 CONTENIDO - Agente 1
│   ├── event.ts             # ✅ Datos del evento (fuente única de verdad)
│   ├── seo.ts               # Metadatos SEO
│   └── assets.ts            # Rutas de assets
│
├── components/
│   ├── posters/             # 🎨 POSTERS - Agente 2
│   │   ├── PosterPresentation.tsx    # ✅ Hero/Presentación
│   │   ├── PosterAgenda.tsx          # ✅ Agenda con tabs
│   │   ├── PosterSpeakers.tsx        # ✅ Speakers (slots vacíos)
│   │   ├── PosterCollaborators.tsx   # ✅ Organizan + Acompañan
│   │   ├── PosterRegistration.tsx    # ✅ Inscripción (countdown/botones)
│   │   ├── PosterFinale.tsx          # 🔲 Cierre final (pendiente)
│   │   ├── index.ts                  # ✅ Exports
│   │   └── *.css                     # Estilos por póster
│   │
│   ├── scene/               # 🌍 ESCENA 3D - Agente 3
│   │   ├── Rock.tsx               # ✅ Piedra movediza procedural
│   │   ├── Terrain.tsx            # ✅ Terreno con vetas
│   │   ├── Environment.tsx        # ✅ Cielo, nubes, ciudad, mirador
│   │   ├── Lighting.tsx           # 🔲 Luces (pendiente)
│   │   ├── CameraPath.tsx         # 🔲 Spline de cámara (pendiente)
│   │   ├── PosterAnchor.tsx       # 🔲 Anclajes 3D para posters (pendiente)
│   │   ├── ParticleSystem.tsx     # 🔲 Polvo/caída (pendiente)
│   │   └── index.ts
│   │
│   ├── ui/                  # 🖥️ UI 2D - Agente 4
│   │   ├── Navigation.tsx         # 🔲 Nav fija + anclas
│   │   ├── ScrollIndicator.tsx    # 🔲 Dots progreso scroll
│   │   ├── Loader.tsx             # 🔲 Pantalla de carga
│   │   ├── Fallback2D.tsx         # 🔲 Versión 2D accesible
│   │   └── index.ts
│   │
│   └── canvas/              # 🎮 CANVAS WRAPPER - Agente 5
│       ├── Canvas3D.tsx           # 🔲 Wrapper Three.js + R3F
│       ├── ScrollControls.tsx     # 🔲 Lenis/GSAP scroll sync
│       ├── ReducedMotion.tsx      # 🔲 Detección prefers-reduced-motion
│       └── index.ts
│
├── hooks/                   # 🎣 HOOKS COMPARTIDOS
│   ├── useScrollProgress.ts     # 🔲 Progreso scroll global
│   ├── useCameraPath.ts         # 🔲 Interpolación cámara
│   ├── useRockPhysics.ts        # 🔲 Física caída (Rapier)
│   ├── useCountdown.ts          # ✅ Countdown inscripciones
│   └── index.ts
│
├── styles/                  # 🎨 ESTILOS GLOBALES
│   ├── global.css               # ✅ Sistema visual neo-brutalista
│   ├── variables.css            # CSS custom properties
│   └── reset.css
│
└── app/                     # 🚀 ENTRY POINT
    ├── App.tsx                  # Componente raíz
    ├── main.tsx                 # Punto de entrada
    └── index.html               # HTML template
```

---

## 🤖 ASIGNACIÓN DE AGENTES

| Agente | Módulo | Responsabilidad | Dependencias | Estado |
|--------|--------|-----------------|--------------|--------|
| **Agente 1** | `content/` | Datos, copy, SEO, assets | Ninguna | ✅ Completado |
| **Agente 2** | `components/posters/` | Todos los pósters 2D (HTML/CSS) | `content/event.ts`, `styles/global.css` | ✅ 5/6 completados |
| **Agente 3** | `components/scene/` | Escena 3D (Three.js/R3F) | `types`, `utils/math.ts` | 🟡 3/7 completados |
| **Agente 4** | `components/ui/` | UI 2D overlay (nav, loader, fallback) | `content/event.ts`, `styles/global.css` | ⏳ Pendiente |
| **Agente 5** | `components/canvas/` | Integración canvas + scroll + physics | `scene/`, `hooks/` | ⏳ Pendiente |
| **Agente 6** | `hooks/` | Lógica reactiva compartida | `types`, `utils/math.ts` | 🟡 1/5 completados |
| **Agente 7** | `app/` | Integración final, build, deploy | Todos los anteriores | ⏳ Pendiente |

---

## 🔌 CONTRATOS DE INTERFAZ (Para desacoplar)

### PosterProps (Común a todos los pósters)
```typescript
interface PosterProps {
  isActive: boolean;        // ¿Está en viewport?
  progress: number;         // 0-1 dentro de su sección
  onAction?: () => void;    // Callback (ej: scroll start)
  className?: string;
}
```

### ScrollProgress (Hook compartido)
```typescript
interface ScrollProgress {
  t: number;                    // 0-1 global
  section: ScrollSectionId;     // Sección actual
  sectionProgress: number;      // 0-1 dentro de sección
  direction: 'up' | 'down';
}
```

### RockState (Para física/animación)
```typescript
interface RockState {
  isFalling: boolean;
  fallProgress: number;    // 0-1
  rotation: Vector3Like;
  position: Vector3Like;
}
```

### CameraState (Para CameraPath)
```typescript
interface CameraState {
  position: Vector3Like;
  lookAt: Vector3Like;
  fov: number;
}
```

---

## 🔄 FLUJO DE DATOS UNIDIRECCIONAL

```
Scroll (Lenis/GSAP)
       │
       ▼
useScrollProgress() ──► ScrollProgress (t, section, sectionProgress)
       │
       ├──► CameraPath.getCameraStateAtProgress(t) ──► CameraState ──► <Camera />
       │
       ├──► useRockPhysics(t) ──► RockState ──► <Rock />
       │
       ├──► Poster components (via sectionProgress) ──► Animaciones entrada/salida
       │
       └──► UI components (nav dots, scroll indicator)
```

---

## 📋 TAREAS PENDIENTES POR AGENTE

### Agente 2 - Posters (Completar)
- [ ] `PosterFinale.tsx` - Cierre con "Volver a empezar"
- [ ] Tests visuales de todos los pósters en aislamiento
- [ ] Storybook/preview para cada póster

### Agente 3 - Escena 3D
- [ ] `Lighting.tsx` - Sol direccional + hemispheric + sombras
- [ ] `CameraPath.tsx` - CatmullRomCurve3 + keyframes del brief
- [ ] `PosterAnchor.tsx` - Posicionar pósters en caras de la roca (Html de drei)
- [ ] `ParticleSystem.tsx` - Polvo para caída final
- [ ] Integración `@react-three/rapier` para física realista

### Agente 4 - UI 2D
- [ ] `Navigation.tsx` - Nav fija + anclas scroll + iconos sociales
- [ ] `ScrollIndicator.tsx` - Dots lateral + labels
- [ ] `Loader.tsx` - Pantalla carga con progreso assets
- [ ] `Fallback2D.tsx` - Versión 2D completa (prefers-reduced-motion)

### Agente 5 - Canvas Wrapper
- [ ] `Canvas3D.tsx` - Config R3F (dpr, shadows, tone mapping, postprocessing)
- [ ] `ScrollControls.tsx` - Lenis + sincronización scroll → Three.js
- [ ] `ReducedMotion.tsx` - Detección + fallback automático

### Agente 6 - Hooks
- [ ] `useScrollProgress.ts` - Lenis/GSAP ScrollTrigger
- [ ] `useCameraPath.ts` - Interpolación suave (lerp/damping)
- [ ] `useRockPhysics.ts` - Rapier physics para caída
- [ ] `useCountdown.ts` - ✅ Ya en PosterRegistration

### Agente 7 - Integración Final
- [ ] `App.tsx` - Componer todo: Canvas3D + UI + Fallback
- [ ] SEO metadata + Open Graph + Twitter cards
- [ ] Build config (Vite) + PWA + Service Worker
- [ ] Deploy Vercel/Netlify + CI/CD GitHub Actions

---

## 🛡️ REGLAS DE TRABAJO EN PARALELO

1. **NO tocar archivos de otros agentes** sin coordinar
2. **Solo modificar** `src/content/event.ts` → **Agente 1** (fuente única)
3. **Solo modificar** `src/styles/global.css` → **Acordado entre Agentes 2, 4**
4. **Interfaces en `src/types/index.ts`** → **Consenso de todos** antes de cambiar
5. **Commits atómicos** por feature: `feat(posters): add PosterFinale`
6. **PRs por módulo** → Review cruzado antes de merge a `develop`

---

## 🚀 PRÓXIMOS PASOS INMEDIATOS

1. **Crear rama `develop`** desde `main`
2. **Cada agente crea su rama**: `feat/posters`, `feat/scene`, `feat/ui`, etc.
3. **Agente 1** publica `content/event.ts` como fuente de verdad
4. **Agentes 2, 3, 4** trabajan en paralelo contra `develop`
5. **Daily sync** 15min para resolver bloqueos de interfaces
6. **Integración semanal** en `develop` → testing → `main` (con permiso)