# 🎯 TAREAS AGENTE 4 - UI 2D OVERLAY (React + CSS)
**Rama:** `feat/ui` | **Prioridad:** ALTA | **Dependencias:** `content/event.ts`, `styles/global.css`, `types/index.ts`

---

## 📦 ARCHIVOS A CREAR EN `src/components/ui/`

| Archivo | Descripción | Estado | Complejidad |
|---------|-------------|--------|-------------|
| `Navigation.tsx` | Nav fija + anclas scroll + iconos sociales | 🔲 Pendiente | Media |
| `ScrollIndicator.tsx` | Dots lateral progreso + labels | 🔲 Pendiente | Media |
| `Loader.tsx` | Pantalla carga assets + progreso | 🔲 Pendiente | Media |
| `Fallback2D.tsx` | Versión 2D completa (accesibilidad) | 🔲 Pendiente | Alta |
| `index.ts` | Exports | 🔲 Pendiente | Baja |

---

## 📋 DETALLE DE TAREAS

### 1. `Navigation.tsx` - Navegación principal
```tsx
// Requisitos del brief (§9, §12):
// - Position: fixed, top: 0, z-index: 100
// - Fondo: rgba(244, 242, 238, 0.9) + backdrop-filter: blur(10px)
// - Logo: "Tandil Tech Week" + marca (microchip) en azul #1000FF
// - Links ancla: Agenda · Speakers · Organizan · Acompañan
//   → Al click: saltar cámara a ese tramo (scroll suave)
// - Iconos sociales: Instagram + X (links externos)
// - Indicador sección activa (underline azul)
// - Responsive: mobile → hamburger menu (opcional, o solo logo + sociales)

// Estructura:
<nav className="nav" role="navigation" aria-label="Principal">
  <a href="#home" className="nav__logo">Logo</a>
  <ul className="nav__links">
    <li><a href="#agenda" data-section="agenda">Agenda</a></li>
    <li><a href="#speakers" data-section="speakers">Speakers</a></li>
    <li><a href="#organizan" data-section="collaborators">Organizan</a></li>
    <li><a href="#acompanan" data-section="sponsors">Acompañan</a></li>
  </ul>
  <div className="nav__social">
    <a href="https://instagram.com/tandiltechweek" target="_blank" rel="noopener" aria-label="Instagram">...</a>
    <a href="https://x.com/tandiltechweek" target="_blank" rel="noopener" aria-label="X">...</a>
  </div>
</nav>
```

### 2. `ScrollIndicator.tsx` - Indicador progreso lateral
```tsx
// Requisitos del brief (§9):
// - Position: fixed, right: 2rem, top: 50%, transform: translateY(-50%)
// - 6 dots (una por sección principal)
// - Dot activo: azul #1000FF, escala 1.2
// - Hover: azul
// - Click en dot → scroll a esa sección
// - Labels tooltip en hover (opcional)
// - Mobile: oculto (pantalla chica)

const SECTIONS = [
  { id: 'home', label: 'Inicio' },
  { id: 'presentation', label: 'Presentación' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'collaborators', label: 'Colaboradores' },
  { id: 'registration', label: 'Inscripción' },
];
```

### 3. `Loader.tsx` - Pantalla de carga
```tsx
// Requisitos:
// - Fullscreen fixed, z-index: 300
// - Fondo: hueso #F4F2EE
// - Logo animado + "Tandil Tech Week"
// - Barra de progreso real (assets + shaders + modelos)
// - Transición suave out (opacity 0.5s) cuando termina
// - Accesible: aria-busy, role="progressbar"

// Props:
interface LoaderProps {
  progress: number;        // 0-1
  onComplete: () => void;  // Callback cuando llega a 1
  assetsLoaded: number;
  assetsTotal: number;
}
```

### 4. `Fallback2D.tsx` - Versión 2D completa (CRÍTICO para accesibilidad)
```tsx
// Requisitos del brief (§9, §170-171):
// - Se activa automáticamente si:
//   - prefers-reduced-motion: reduce
//   - !WebGLSupported()
//   - Usuario elige "Versión accesible"
// - Mismas 6 secciones apiladas verticalmente
// - Mismos pósters (componentes de Agente 2) pero en flujo normal
// - Scroll nativo del navegador
// - SEO-friendly (contenido en HTML real)
// - Navegación por teclado funcional
// - Contraste AA

// Estructura:
<main className="fallback" role="main">
  <Navigation />  // Nav fija sigue funcionando
  
  <section id="home" className="fallback__section">
    <PosterPresentation onScrollStart={() => scrollToSection('presentation')} />
  </section>
  
  <section id="presentation" className="fallback__section">
    <PosterPresentation />
  </section>
  
  <section id="agenda" className="fallback__section">
    <PosterAgenda />
  </section>
  
  <section id="speakers" className="fallback__section">
    <PosterSpeakers />
  </section>
  
  <section id="collaborators" className="fallback__section">
    <PosterCollaborators />
  </section>
  
  <section id="registration" className="fallback__section fallback__section--registration">
    <PosterRegistration />
  </section>
  
  <footer>...</footer>
</main>

// Estilos ya definidos en global.css (.fallback, .fallback__section, etc.)
```

---

## 🔌 PROPS Y CONTRATOS

### Navigation
```typescript
interface NavigationProps {
  activeSection: ScrollSectionId;
  onSectionClick: (sectionId: ScrollSectionId) => void;
  // scrollToSection viene de useScrollControls (Agente 5)
}
```

### ScrollIndicator
```typescript
interface ScrollIndicatorProps {
  currentSection: ScrollSectionId;
  onDotClick: (sectionId: ScrollSectionId) => void;
}
```

### Loader
```typescript
interface LoaderProps {
  progress: number;
  onComplete: () => void;
}
```

### Fallback2D
```typescript
interface Fallback2DProps {
  // Sin props, se auto-gestiona
  // Usa internamente useReducedMotion() y useWebGLSupport()
}
```

---

## ♿ ACCESIBILIDAD (OBLIGATORIO)

| Requisito | Implementación |
|-----------|----------------|
| `prefers-reduced-motion` | `@media (prefers-reduced-motion: reduce)` en CSS + hook JS |
| Navegación teclado | `tabindex`, `focus-visible`, `Enter/Space` en botones |
| Lectores de pantalla | `aria-label`, `role`, semántica HTML5 |
| Contraste AA | Verificar ratios en global.css (azul #1000FF sobre hueso #F4F2EE = 4.5:1 ✓) |
| Skip link | `<a href="#main" className="skip-link">Saltar al contenido</a>` |

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Ya definidos en global.css */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 480px)  { /* Mobile pequeño */ }
```

---

## 🎨 ESTILOS YA DISPONIBLES (global.css)

```css
/* Componentes listos para usar: */
.nav, .nav__logo, .nav__links, .nav__link, .nav__social, .nav__social-link
.scroll-indicator, .scroll-indicator__dot, .scroll-indicator__dot--active
.loader, .loader--hidden, .loader__logo, .loader__progress, .loader__bar
.fallback, .fallback__section, .fallback__section--registration
.skip-link
/* + variables CSS: --color-*, --font-*, --shadow-*, --z-* */
```

---

## ✅ CRITERIOS DE ACEPTACIÓN

- [ ] Nav fija visible siempre, backdrop blur, links funcionales
- [ ] Click en link → scroll suave a sección (3D o 2D)
- [ ] Indicador lateral muestra sección actual, click navega
- [ ] Loader muestra progreso real, desaparece suavemente
- [ ] Fallback 2D: todas las secciones accesibles, scroll nativo
- [ ] prefers-reduced-motion → activa fallback automáticamente
- [ ] Sin WebGL → activa fallback automáticamente
- [ ] Mobile: nav usable, scroll indicator oculto, touch-friendly
- [ ] Teclado: Tab navega, Enter activa, focus visible
- [ ] Lighthouse Accessibility ≥ 95

---

## 🚀 COMANDOS

```bash
git checkout feat/ui
git merge develop  # Traer últimos posters, content, types
# ... trabajar ...
git push -u origin feat/ui
```

---

## 🔗 COORDINACIÓN CON OTROS AGENTES

| Agente | Qué necesitas de ellos | Qué les das tú |
|--------|------------------------|----------------|
| Agente 2 (Posters) | Componentes Poster* listos | Feedback visual, props necesarios |
| Agente 5 (Canvas) | `scrollToSection(sectionId)` function | `onSectionClick` callback |
| Agente 6 (Hooks) | `useReducedMotion()`, `useWebGLSupport()` | Requisitos de detección |
| Agente 7 (Integración) | Componentes UI montados | Props tipadas, documentación |