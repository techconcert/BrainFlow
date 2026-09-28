# 🧠 BrainFlow — Interactive 3D Neuroscience Simulator

[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-black.svg?logo=three.js)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Scenarios](https://img.shields.io/badge/Scenarios-50%20Comprehensive-00e5ff.svg)](#-50-comprehensive-scenarios)
[![Performance](https://img.shields.io/badge/Performance-60fps%20Budget-00f59b.svg)](#-performance-architecture)

> An educational 3D WebGL simulator visualizing how substances, mental health conditions, cognitive states, compulsions, and healthy habits reshape human neurobiology with vibrant color-coded organs and animated neural pathways.

---

## 🌟 Overview & Key Features

**BrainFlow** translates peer-reviewed neurobiological research into an intuitive, high-contrast 3D experience designed for tablets and desktops alike:

- **Luminous Neon 3D Specimen**: High-contrast cerulean and cyan brain cortex (`#1E88E5` / `#00E5FF`) with realistic sulci/gyri convolutions and translucent depth, exposing glowing internal nuclei.
- **Color-Coded Functional Regions**:
  - 🔹 **Prefrontal Cortex** (`#00E5FF` Electric Cyan) — *Executive function, planning, impulse inhibition*
  - 🟡 **Reward System / Nucleus Accumbens** (`#FFB703` Radiant Amber) — *Dopamine signaling, motivation, pleasure*
  - 🟣 **Amygdala** (`#FF007F` Vivid Magenta) — *Salience detection, fear conditioning, emotional memory*
  - 🟢 **Hippocampus** (`#00F59B` Emerald Green) — *Memory consolidation, spatial navigation, contextual learning*
- **Directional 3D Neural Pathways**: Dynamic cubic Bezier splines connecting active anatomical structures in chronological sequence (Steps 1 $\rightarrow$ 2 $\rightarrow$ 3 $\rightarrow$ 4) with animated pulse packets.
- **Longitudinal Neuroadaptation ("What changes over time?")**: Interactive 3-stage timeline progression (*Normal balance* $\rightarrow$ *After repeated use* $\rightarrow$ *Long-term adaptation*) with real-time neurochemical shifts, camera orientation, and floating HUD indicator.
- **Grounded Neuroplasticity ("The good news")**: Evidence-based scientific explanations for every scenario describing how neuroplastic recovery, receptor upregulation, and behavioural rewiring occur.
- **Stationary by Default**: Clean, distraction-free inspection that only rotates when the user drags or taps an anatomical pin or pathway step.

---

## 🧬 50 Comprehensive Scenarios

BrainFlow includes **50 peer-reviewed scenarios** distributed evenly across 5 categories:

| Category | Count | Example Scenarios | Key Neurobiology |
|---|---|---|---|
| **Substances & Addiction** | 10 | Drug Addiction, Fentanyl & Opioids, Alcohol Dependence, Cocaine, Nicotine & Vaping, Cannabis, Methamphetamine | Dopamine $D_2$ downregulation, $\mu$-opioid receptor saturation, GABA/Glutamate imbalance |
| **Mental Health & Mood** | 10 | Major Depression, Generalized Anxiety, OCD, PTSD, Panic Disorder, Bipolar Mania, Chronic Burnout | HPA-axis hyperactivity, amygdala hyper-reactivity, 5-HT transporter alterations, BDNF reduction |
| **Cognitive & Brain Health** | 10 | ADHD, Autism Sensory Processing, Alzheimer's, Parkinson's, Sleep Deprivation, Concussion / TBI, Long COVID Fog | Dopamine transporter overexpression, substantia nigra degeneration, amyloid/tau pathology, glymphatic impairment |
| **Compulsions & Tech** | 10 | Algorithmic Doomscrolling, Eating Disorders, Gaming Compulsion, Gambling Disorder, Compulsive Shopping, High-Frequency Pornography | Variable ratio reward schedules, fronto-striatal disconnection, salience network hijacking |
| **Neuroplasticity & Habits** | 10 | Mindfulness Meditation, Aerobic Exercise, Deep Slow-Wave Sleep, Language Acquisition, Cold Exposure, Resistance Training | BDNF release, hippocampal neurogenesis, prefrontal cortical thickening, synaptic pruning |

---

## 🏗️ Performance Architecture

BrainFlow is built to maintain a stable **60 FPS on mid-range computers, laptops, and tablets (e.g., iPad)**:

1. **Lightweight Shaders**: Avoids costly multi-pass transmission shaders (`MeshPhysicalMaterial.transmission`) in favor of high-performance `MeshStandardMaterial` with custom normal maps, edge rim lighting, and GPU-friendly alpha blending.
2. **Zero Animation Loop Re-renders**: Screen-space projection for leader lines, callout cards, and numbered badges calculates matrix transforms directly onto SVG and DOM elements in `requestAnimationFrame` without triggering React state updates.
3. **Draco Geometry Compression**: 3D brain mesh (`public/models/brain.glb`) is compressed to 4.4MB with self-hosted Google Draco WebAssembly decoders for rapid offline loading.
4. **Hardware-Accelerated Splines**: Animated neural pulses travel along Three.js `CatmullRomCurve3` splines using instanced geometry and memory-pooled vectors.

---

## 🤖 Multi-Agent Governance Manual

BrainFlow was engineered using a collaborative multi-agent architecture with strict quality gating:

```
┌────────────────────────────────────────────────────────┐
│                   Orchestrator Agent                   │
│                  (System / PRD Guard)                  │
│  - Roadmap & PRD governance                            │
│  - Multi-agent task dispatch & synthesis               │
└───────────────────────────┬────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼                               ▼
┌───────────────────────┐       ┌───────────────────────┐
│  Asset & Vision Agent │       │ Compositor / Code Eng │
│  (Prompt / Cut / Fit) │       │ (Canvas / Layer Logic)│
│  - 3D GLB & Meshes    │       │ - Three.js WebGL      │
│  - Shaders & Materials│       │ - React & Tailwind    │
│  - Neon Color Tuning  │       │ - Splines & Pulses    │
│  - Camera Staging     │       │ - State Machine & UI  │
└───────────┬───────────┘       └───────────┬───────────┘
            │                               │
            └───────────────┬───────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
┌───────────────────────────────────┐   ┌───────────────────────────────────┐
│       UI Guard Agent              │   │     Scientific Accuracy Agent     │
│  (Visual Fidelity & Quality Gate) │   │   (Neurobiology & Medical Review) │
│  - Concept screenshot audit       │   │  - Anatomical region validation   │
│  - 60fps performance budget gate  │   │  - Neurotransmitter dynamics      │
│  - Pointer line & typography check│   │  - Educational step pedagogy      │
│  - Quality approve / reject       │   │  - Evidence-based neuroplasticity │
└───────────────────────────────────┘   └───────────────────────────────────┘
```

See [**AGENTS.md**](./AGENTS.md) for individual agent specifications, directives, and review workflows.

---

## 📚 Documentation Reference

| Document | Purpose |
|---|---|
| [**PRD.md**](./PRD.md) | Product Requirements Document, core screen specs, and interaction models |
| [**ARCHITECTURE.md**](./ARCHITECTURE.md) | WebGL rendering pipeline, coordinate projection, shaders, and state contracts |
| [**SCENARIOS.md**](./SCENARIOS.md) | Educational pathway specifications, timeline evolutions, and neuroplasticity data |
| [**ASSETS.md**](./ASSETS.md) | 3D specimen details (`brain.glb`), mesh node dictionary, and Draco decoders |
| [**AGENTS.md**](./AGENTS.md) | Multi-agent team manual: Orchestrator, UI Guard, Asset & Vision, Compositor, Science |

---

## ⚡ 3D Assets & Structure

The 3D assets are bundled in `public/`:
- `public/models/brain.glb`: Complete human brain model with 200+ anatomically segmented structures (Apache 2.0 License, 4.4MB Draco compressed).
- `public/models/manifest.json`: Node dictionary mapping functional areas to anatomical meshes.
- `public/draco/`: Self-hosted Google Draco 3D decoders (`draco_decoder.wasm`, `.js`) for fast offline loading without external CDN dependencies.

---

## 🚀 Quickstart & Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup & Local Execution

```bash
# 1. Clone the repository
git clone https://github.com/your-username/brainflow.git
cd brainflow

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser (default Vite port or custom configured port)
open http://localhost:5173
```

### Production Build

```bash
# Compile and bundle optimized assets
npm run build

# Preview production build locally
npm run preview
```

---

## 🔬 Scientific & Educational Disclaimer

BrainFlow is designed for educational and informational purposes only. While all anatomical structures, neurotransmitter pathways, and neuroplastic adaptations are modeled based on peer-reviewed literature in neurobiology and neuropsychiatry, this application is not a clinical diagnostic tool or medical device. For clinical mental health or substance use guidance, consult a licensed healthcare professional.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE). The underlying 3D brain anatomical mesh is distributed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).
