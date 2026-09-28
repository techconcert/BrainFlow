# Product Requirements Document (PRD) — BrainFlow

## 1. Executive Summary
**BrainFlow** is an interactive, educational 3D web application designed to help users visualize and understand how diseases, compulsions, addictions, and healthy behaviors alter human brain physiology. By pairing a rotatable, high-performance 3D brain model with bold neon color-coding and animated neural transmission pathways, BrainFlow transforms complex neuroscience into an intuitive, memorable visual experience.

The primary objective is **not** photorealistic clinical rendering, but **high-impact educational clarity** featuring modern, fluid WebGL graphics, glassmorphism UI, glowing neural circuits, and step-by-step cognitive walkthroughs.

---

## 2. Core User Experience & Reference Concept Alignment

Based on the official visual specification (Concept Reference):

```
┌────────────────────────────────────────────────────────────────────────┐
│                        The Brain Simulator                             │
│ "See how different inputs, experiences and behaviors change your brain"│
├──────────────────────────────────┬─────────────────────────────────────┤
│                                  │  Explore Scenarios                  │
│  [Rotatable 3D Brain Specimen]   │  💊 Drug Addiction                  │
│                                  │  🍽️ Eating Disorders                │
│  • Prefrontal Cortex (Cyan)      │  💉 Fentanyl                        │
│  • Reward System (Amber/Gold)    │  🧠 Stress & Anxiety                │
│  • Amygdala (Magenta)            │  🍃 Healthy Habits                  │
│  • Hippocampus (Emerald)         │                                     │
│  ↻ "Drag to rotate"              │                                     │
├──────────────────────────────────┴─────────────────────────────────────┤
│  Pathway: Stimulus ➔ Processing ➔ Behavior ➔ Result                    │
│  Cards: Rotate & Explore | Learn | Compare | Takeaway                  │
└────────────────────────────────────────────────────────────────────────┘
```

### Screen 1: Home / Overview — "The Brain Simulator"
1. **Header & Tagline**:
   - Title: **The Brain Simulator** (with *Brain* highlighted in glowing electric blue).
   - Subtitle: *"See how different inputs, experiences and behaviors change the way your brain works."*
   - Tagline badge: *"Same brain. Different inputs. Different outcomes."*
2. **Interactive 3D Brain Viewport**:
   - Translucent outer cortex shell (dark navy glass finish with subtle Fresnel rim glow).
   - Prominently illuminated internal anatomical structures:
     - **Prefrontal Cortex**: Glowing Electric Cyan (`#00E5FF`) — *Planning, decision making*
     - **Reward System**: Glowing Bright Amber (`#FFB703`) — *Motivation, pleasure*
     - **Amygdala**: Glowing Vibrant Magenta (`#FF007F`) — *Emotion, stress*
     - **Hippocampus**: Glowing Emerald Green (`#00F59B`) — *Memory, learning*
   - Interactive orbit controls: Free 360-degree rotation, pinch/scroll zoom, and smooth auto-rotation idle mode.
   - 3D Floating callout pins with leader lines connecting to the spatial coordinates of each brain region.
   - Tactile indicator: `↻ Drag to rotate`.
3. **Explore Scenarios Sidebar**:
   - Interactive selection menu with curated scenarios:
     1. **Drug Addiction**: *How substances hijack the reward system*
     2. **Eating Disorders**: *How food and body image become compulsive*
     3. **Fentanyl**: *How it affects the brain and why it's so dangerous*
     4. **Stress & Anxiety**: *How chronic stress changes your brain*
     5. **Healthy Habits**: *How positive habits build a stronger brain*
4. **Cognitive Flow Pipeline (Bottom Bar)**:
   - 4-Stage visual progression:
     $$\text{Stimulus (⚡)} \longrightarrow \text{Processing (🧠)} \longrightarrow \text{Behavior (⚙️)} \longrightarrow \text{Result (⭐)}$$
   - 4 Value Pillars:
     - **Rotate & Explore**: *See how different areas light up and work together.*
     - **Learn**: *Short, clear explanations of what's happening.*
     - **Compare**: *See how different inputs change the outcome.*
     - **Takeaway**: *Understand your brain. Make healthier choices.*

---

### Screen 2: Scenario Detail — "Drug Addiction Pathway" (POC Reference Flow)
1. **Scenario Navigation & Context**:
   - Header with Back Button: `← Drug Addiction`
   - Subtitle: *"How substances hijack the reward system"*
   - Neurochemical Pill Badge: `🔒 Increased dopamine` (glowing purple pill tag)
2. **Animated 3D Neural Circuit Pathway**:
   - 3D bezier spline tubes rendered directly between anatomical centers:
     - **Step 1: Substance Enters** $\rightarrow$ Triggers dopamine surge in the reward system.
     - **Step 2: Reward System (Nucleus Accumbens / VTA)** $\rightarrow$ Dopamine surge creates intense euphoria.
     - **Step 3: Learning & Memory (Hippocampus & Amygdala)** $\rightarrow$ Associates substance with survival reward and forms habit memory.
     - **Step 4: Prefrontal Cortex** $\rightarrow$ Becomes hypoactive over time, weakening executive impulse control.
   - Moving light pulses/particles traveling along the pathway curves to demonstrate electrical and chemical neurotransmission in real time.
   - Interactive numbered 3D pin badges (1, 2, 3, 4) anchored to anatomical coordinates.
3. **Step-by-Step Educational Narrative (Right Panel)**:
   - Interactive cards for each pathway step with sync-on-hover / sync-on-click:
     - **1. Substance enters**: *The drug increases dopamine in the brain's reward system (often much more than natural rewards).*
     - **2. Reward system**: *This creates a feeling of euphoria, reinforcing the behavior.*
     - **3. Learning & memory**: *The hippocampus and amygdala help the brain remember the experience and associate it with positive feelings.*
     - **4. Prefrontal cortex**: *Over time, this area becomes less active, reducing self-control and increasing impulsive behavior.*
   - **The Result Card** (glowing violet frame):
     - *The brain starts to crave the substance, making it hard to stop, even when it's harming your health, relationships and goals.*
   - **The Good News Card** (emerald leaf icon):
     - *The brain can heal. With the right support, new habits and time, those pathways can change again (neuroplasticity).*
     - Call to action: `See how recovery works →`
4. **Longitudinal Brain Adaptation ("What changes over time?")**:
   - 3-Stage brain morph/comparison cards:
     1. **Normal balance**: Baseline neurochemical signaling and balanced prefrontal-limbic regulation.
     2. **After repeated use**: Reward system over-sensitization and hyper-reactive craving circuits.
     3. **Long-term**: Down-regulated dopamine receptors, cortical thinning, and structural habit reinforcement.

---

## 3. Non-Functional Requirements & Performance
- **Target Framerate**: Steady 60 FPS on modern desktop browsers and high-end mobile devices.
- **Loading Time**: Under 2.0 seconds initial 3D specimen load via Draco mesh compression (~4.4 MB).
- **Responsive Layout**: Fluid desktop split-screen (3D canvas + side panels) collapsing gracefully into stacked views with sticky mini-viewport on mobile/tablet.
- **Accessibility & Contrast**: Dark mode optimized palette adhering to WCAG 2.1 AA standards for typography readability over translucent dark glass.
- **Cross-Platform Compatibility**: Chrome, Safari, Firefox, Edge with standard WebGL 2.0 support.
