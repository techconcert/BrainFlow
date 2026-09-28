# Technical Architecture & Engineering Design — BrainFlow

## 1. System Overview

BrainFlow is built with a decoupled presentation, state, and WebGL rendering architecture:

```
┌─────────────────────────────────────────────────────────────────┐
│                     React Application Layer                     │
│  ┌───────────────────────┐             ┌─────────────────────┐  │
│  │   UI Components &     │             │  Scenario Engine &  │  │
│  │   Glassmorphic DOM    │◄───────────►│  Pathway State      │  │
│  │   (Tailwind / Lucide) │             │  (Zustand / Redux)  │  │
│  └───────────┬───────────┘             └──────────┬──────────┘  │
└──────────────┼────────────────────────────────────┼─────────────┘
               │                                    │
               ▼                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Compositor & 3D WebGL Layer                   │
│  ┌───────────────────────┐             ┌─────────────────────┐  │
│  │  Three.js Scene Graph │             │  Shader & Material  │  │
│  │  (Camera, Lighting,   │◄───────────►│  Pipeline (Fresnel, │  │
│  │   OrbitControls)      │             │  Bloom, Emissive)   │  │
│  └───────────┬───────────┘             └──────────┬──────────┘  │
│              │                                    │             │
│              ▼                                    ▼             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Anatomical Brain Specimen (`brain.glb` + `manifest.json`)│  │
│  │  • Translucent Outer Cortex Shell                         │  │
│  │  • Isolated Glowing Organs (PFC, Striatum, Amygdala, etc) │  │
│  │  • 3D Animated Bezier Spline Tubes (Synaptic Pulses)      │  │
│  │  • Screen-Space Projected 2D/3D Pin Annotations           │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework / Runtimes** | React 18+ / Vite | Instant HMR, lightweight bundle size, modern component lifecycle |
| **3D Rendering** | Three.js / @react-three/fiber | Industry standard WebGL rendering with high-performance scene graph |
| **Model Compression** | Google Draco 3D Decoder | Compresses complex ~50MB human brain anatomical meshes down to 4.4MB |
| **Styling & Design System** | Tailwind CSS + Lucide Icons | Utility-first glassmorphism, responsive flex/grid layouts, crisp medical icons |
| **Animation & Transitions** | Framer Motion / GSAP | Silky smooth UI transitions between Home and Scenario detail views |
| **State Management** | Zustand | Ultra-lightweight reactive store for selected scenario, active step, and camera focus |

---

## 3. 3D Graphics & Shader Pipeline

### 3.1 Anatomical Brain Shell (Glass Cortex)
To reveal internal structures without visual clutter:
- **Material**: Custom Physical Material (`MeshPhysicalMaterial`) or custom Fresnel Shader:
  - `roughness`: 0.15
  - `transmission`: 0.88 - 0.95
  - `thickness`: 1.2
  - `ior`: 1.45 (optical index of refraction)
  - `color`: `#081426` (deep obsidian navy)
  - `transparent`: true
  - `opacity`: 0.40 - 0.65
- **Fresnel Edge Glow**: High-angle rim lighting gives glowing silhouette definition to sulci and gyri without obscuring internal nuclei.

### 3.2 Internal Organ Isolation & Neon Emission
The brain model contains hundreds of anatomical sub-nodes keyed by `manifest.json`:
- **Prefrontal Cortex**: Nodes matching Superior Frontal Gyrus & Middle Frontal Gyrus.
  - Emission: `#00E5FF` (Electric Cyan)
  - Intensity: 2.2
- **Reward System (VTA & Nucleus Accumbens / Ventral Striatum)**:
  - Nodes matching Caudate nucleus, Putamen, Nucleus Accumbens.
  - Emission: `#FFB703` / `#FB8500` (Warm Radiant Amber)
  - Intensity: 2.8
- **Amygdala**:
  - Nodes matching Lateral, Basolateral, Central nuclei.
  - Emission: `#FF007F` (Intense Magenta Pink)
  - Intensity: 2.5
- **Hippocampus**:
  - Nodes matching Hippocampal formation.
  - Emission: `#00F59B` (Vibrant Emerald Green)
  - Intensity: 2.4

### 3.3 Dynamic 3D Neural Pathway Arcs (Bezier Splines)
- Calculated using `THREE.CatmullRomCurve3` or quadratic Bezier curves passing through:
  $$\text{Stimulus Origin} \longrightarrow \text{Nucleus Accumbens} \longrightarrow \text{Limbic (Amygdala/Hippocampus)} \longrightarrow \text{Prefrontal Cortex}$$
- Rendered as `TubeGeometry` with emissive neon material and animated texture offset or dynamic instanced sphere pulses traversing the curve at controlled velocities.

### 3.4 Camera Staging & Target Choreography
- Default Home View: Oblique anterolateral angle $(x: 2.8, y: 1.5, z: 3.2)$, looking at center $(0, 0, 0)$.
- Scenario Transition: Smooth spherical interpolation (`lerp`) to focus on the active organ (e.g. zooms closer to the ventral striatum when Step 2 is active, pivots towards the frontal lobe during Step 4).

---

## 4. UI Layer Architecture

### 4.1 State Store (`useBrainStore`)
```typescript
interface BrainState {
  currentView: 'home' | 'scenario';
  activeScenarioId: string | null;
  activeStepIndex: number;
  highlightedOrgan: string | null;
  cameraPreset: 'overview' | 'frontal' | 'limbic' | 'ventral';
  isAutoRotating: boolean;
  timelineStage: 'normal' | 'repeated' | 'chronic';
  setScenario: (id: string) => void;
  setActiveStep: (step: number) => void;
  setTimelineStage: (stage: 'normal' | 'repeated' | 'chronic') => void;
  resetToHome: () => void;
}
```

### 4.2 Interactive 3D Callout Annotations
- 3D coordinates from mesh bounding box centroids are projected to 2D screen coordinates using Three.js vector unprojection:
  $$p_{\text{screen}} = p_{\text{world}} \times M_{\text{view}} \times M_{\text{proj}}$$
- Renders responsive DOM pin badges with crisp typography, hover cards, and SVG connector lines that move in 60fps lockstep with the rotating 3D specimen.
