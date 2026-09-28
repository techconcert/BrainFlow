# Multi-Agent Architecture & Operating Manual — BrainFlow

## 1. Multi-Agent Team Hierarchy

The BrainFlow project operates with a specialized multi-agent hierarchy designed to safeguard product vision, scientific accuracy, 3D graphics fidelity, and code quality. A dedicated **UI Guard Agent** acts as the quality gatekeeper, auditing and approving/rejecting deliverables before they reach production:

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
│  - Screenshot cross-checking      │   │  - Anatomical region validation   │
│  - 60fps performance budget gate  │   │  - Neurotransmitter dynamics      │
│  - Pointer line & typography check│   │  - Educational step pedagogy      │
│  - Approve / Reject & coaching    │   │  - Neuroplasticity validation     │
└───────────────────────────────────┘   └───────────────────────────────────┘
```

---

## 2. Agent Roster & Defined Roles

### 1. `orchestrator` (System / PRD Guard)
- **Role**: Coordinates the entire project lifecycle, ensuring every screen, component, and user interaction faithfully realizes the concept design.
- **Key Responsibilities**:
  - Reviews pull requests and code modifications against the PRD.
  - Ensures seamless handoffs between asset creation, scientific validation, and frontend engineering.
  - Oversees release criteria and project roadmap.

### 2. `ui-guard` (Visual Fidelity & Quality Gate — Approve / Reject)
- **Role**: Serves as the visual critic and quality enforcement officer. Compares working implementations against reference concept art (`media_1790593902768.jpg`) and audits frame-rate performance.
- **Key Responsibilities**:
  - **Visual Audit**: Verifies that the 3D brain is never an amorphous dark blob, but an anatomically articulated human brain with visible convolutions (sulci/gyri), glowing volumetric internal nuclei, and crisp rim lighting.
  - **Leader Line & Typography Review**: Rejects chunky rectangular DOM cards over the 3D specimen; mandates clean, thin diagonal pointer lines with colored anchor dots and floating typography.
  - **Curved Neural Pathways**: Verifies that scenario pathways feature smooth curved glowing arrows and numbered badges (1, 2, 3, 4) connecting active regions.
  - **Performance Gate**: Rejects expensive transmission passes (`MeshPhysicalMaterial.transmission`) or React `setState` calls inside the animation loop that drop FPS below 60 on mid-level PCs or iPads.
  - **Feedback & Coaching**: Emits actionable redirect directives to `asset-vision` and `compositor-code` until visual and performance parity is achieved.

### 3. `asset-vision` (Asset & Vision Specialist — Prompt / Cut / Fit)
- **Role**: Manages 3D geometry, mesh parsing, shaders, and lighting aesthetics.
- **Key Responsibilities**:
  - Loads and positions `brain.glb` and maps anatomical nodes in `manifest.json`.
  - Configures optimized surface shaders with Fresnel edge highlights (using GPU-friendly `MeshStandardMaterial` with custom normal maps / emissive curves rather than CPU-killing transmission passes).
  - Tunes neon emission materials (Electric Cyan for Prefrontal Cortex, Warm Radiant Amber for Reward System, Vivid Magenta for Amygdala, Emerald Green for Hippocampus).
  - Choreographs smooth camera angles and lighting setups for each scenario step.

### 4. `compositor-code` (Compositor / Code Engineer — Canvas / Layer Logic)
- **Role**: Builds the web application, Three.js WebGL scene, animated neural pathways, and interactive DOM overlays.
- **Key Responsibilities**:
  - Implements lightweight, high-performance OrbitControls with touch gestures and auto-rotation.
  - Builds dynamic 3D Bezier curve splines with directional arrowheads connecting active organs with animated pulse packets.
  - Implements zero-overhead screen-space coordinate projection (using direct DOM style transforms or SVG lines instead of React re-render loops).
  - Develops the UI layout: scenario sidebar, 4-step walkthrough, longitudinal comparison cards, and "The good news" neuroplasticity panel.

### 5. `scientific-accuracy` (Neurobiology & Medical Review)
- **Role**: Verifies that medical mechanisms, neurotransmitter actions, and anatomical mappings are accurate.
- **Key Responsibilities**:
  - Audits scenario definitions against current peer-reviewed neuroscience literature.
  - Confirms that pathway nodes (Stimulus $\rightarrow$ Processing $\rightarrow$ Behavior $\rightarrow$ Result) reflect actual neurological reality.
  - Formulates evidence-based recovery mechanisms (neuroplasticity, receptor upregulation, behavioral reinforcement).

---

## 3. Review & Cross-Checking Workflow

During every scenario or visual modification:
1. **Asset & Shader Delivery**: `asset-vision` prepares the meshes and material shaders.
2. **Compositor Integration**: `compositor-code` wires the WebGL canvas, lines, and React components.
3. **Automated Headless Screenshot**: A full-fidelity screenshot of the rendered app is captured.
4. **UI Guard Audit**: `ui-guard` compares the screenshot against the concept art.
   - If visual defects (e.g., blob appearance, thick boxy lines, unreadable text) or low frame-rates are detected $\rightarrow$ **REJECTED with coaching**.
   - Once the brain surface, neon glows, pointer lines, and 60fps budgets meet standards $\rightarrow$ **APPROVED**.
5. **Orchestrator Final Sign-off**: Flow is merged and ready for user interaction.
