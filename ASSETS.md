# 3D Assets, Shaders & Sourcing Guide — BrainFlow

## 1. Primary 3D Specimen Asset

The primary 3D brain model has been vetted, downloaded, and configured in the project repository:

| Asset Name | Location | Size | Format & Compression | License | Source |
|---|---|---|---|---|---|
| **Human Brain Specimen** | `public/models/brain.glb` | 4.4 MB | GLTF 2.0 Binary (Google Draco compressed) | Apache License 2.0 | [itayinbarr/brainproject](https://github.com/itayinbarr/brainproject) |
| **Anatomical Manifest** | `public/models/manifest.json` | 227 KB | JSON metadata (200+ anatomical nodes) | Apache License 2.0 | Derived from Z-Anatomy & CIT168 Atlas |
| **Draco Decoder Suite** | `public/draco/` | ~1.0 MB | `draco_decoder.wasm`, `.js`, `wrapper.js` | Apache License 2.0 | Google Draco 3D library |

### Why this asset perfectly matches the concept:
1. **Granular Anatomical Dissection**: Unlike static single-mesh brain models, this GLB separates individual gyri, sulci, deep grey nuclei, limbic structures, and tract pathways into individually controllable mesh nodes.
2. **Web-Optimized Performance**: Through Draco geometry compression, a medically accurate high-polygon brain is reduced from ~50MB down to 4.4MB, loading in under 2 seconds on broadband.
3. **Internal Structure Transparency**: Because the cerebral cortex nodes are separated from internal nuclei (Amygdala, Striatum, Hippocampus, Thalamus), we can apply glassmorphism/translucency shaders to the outer cortex while illuminating internal organs with vibrant neon emission.

---

## 2. Anatomical Mesh Node Mapping Dictionary

The 3D model can be traversed in Three.js and colored dynamically using `manifest.json`:

```typescript
export const BRAIN_ANATOMY_MAPPING = {
  // Prefrontal Cortex (Electric Cyan: #00E5FF)
  prefrontal_cortex: {
    label: "Prefrontal Cortex",
    color: "#00E5FF",
    intensity: 2.5,
    meshNames: [
      "Superior frontal gyrus.l",
      "Superior frontal gyrus.r",
      "Middle frontal gyrus.l",
      "Middle frontal gyrus.r",
      "Straight gyrus (Gyrus rectus).l",
      "Straight gyrus (Gyrus rectus).r"
    ],
    role: "Executive planning, decision-making, impulse control"
  },

  // Reward System / Ventral Striatum / Accumbens (Radiant Amber: #FFB703)
  reward_system: {
    label: "Reward System (Nucleus Accumbens / Striatum)",
    color: "#FFB703",
    intensity: 3.0,
    meshNames: [
      "Nucleus accumbens.l",
      "Nucleus accumbens.r",
      "Caudate nucleus.l",
      "Caudate nucleus.r",
      "Putamen.l",
      "Putamen.r"
    ],
    role: "Motivation, pleasure salience, dopamine signaling"
  },

  // Amygdala (Vivid Magenta: #FF007F)
  amygdala: {
    label: "Amygdala",
    color: "#FF007F",
    intensity: 2.8,
    meshNames: [
      "Lateral nucleus.l",
      "Lateral nucleus.r",
      "Basolateral complex.l",
      "Basolateral complex.r",
      "Central nucleus.l",
      "Central nucleus.r",
      "Corticomedial group.l",
      "Corticomedial group.r"
    ],
    role: "Emotion processing, fear conditioning, cue-triggered cravings"
  },

  // Hippocampus (Emerald Green: #00F59B)
  hippocampus: {
    label: "Hippocampus",
    color: "#00F59B",
    intensity: 2.6,
    meshNames: [
      "Hippocampus.l",
      "Hippocampus.r"
    ],
    role: "Memory consolidation, spatial navigation, associative learning"
  },

  // Outer Cortex Shell (Obsidian Glass: #081426, Translucent)
  outer_cortex: {
    label: "Cerebral Cortex Shell",
    transmission: 0.90,
    opacity: 0.45,
    roughness: 0.2,
    ior: 1.45,
    color: "#0c1b33",
    wireframe: false
  }
};
```

---

## 3. Alternative Free 3D Sourcing Options

If alternative geometries or higher/lower poly versions are desired in future milestones, the following open repositories have been vetted:

### Option A: AnatomyTOOL / Sketchfab
- **Resource**: [AnatomyTOOL - Internal Brain Structures](https://anatomytool.org/)
- **License**: Creative Commons Attribution (CC-BY 4.0)
- **Features**: Features isolated Hippocampus and Amygdala designed specifically for medical education.
- **Format**: Available as GLTF / OBJ on Sketchfab.
- **Download Link**: Search `Internal Brain Structures AnatomyTOOL` on [sketchfab.com](https://sketchfab.com).

### Option B: NIH 3D Print Exchange (US National Institutes of Health)
- **Resource**: [NIH 3D Print Exchange](https://3d.nih.gov/)
- **License**: Public Domain / Open Medical Research
- **Features**: MRI/fMRI segmented models of the human limbic system and basal ganglia.
- **Format**: STL / OBJ (convertible to GLTF via Blender CLI).

### Option C: Z-Anatomy / BodyParts3D
- **Resource**: [Z-Anatomy Open Project](https://www.z-anatomy.com/)
- **License**: CC-BY-SA 2.1 JP / Open Science
- **Features**: The world's most exhaustive open-source 3D atlas of human anatomy.

---

## 4. Materials & Shading Guidelines

### 4.1 Glassmorphism Cortex Material
```javascript
import * as THREE from 'three';

export function createCortexGlassMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x0c1e3d),
    metalness: 0.1,
    roughness: 0.2,
    transmission: 0.88,
    thickness: 1.5,
    ior: 1.45,
    transparent: true,
    opacity: 0.55,
    depthWrite: false, // Ensures internal glowing organs render without depth sorting glitches
    side: THREE.DoubleSide
  });
}
```

### 4.2 Neon Emissive Organ Material
```javascript
export function createEmissiveOrganMaterial(hexColor, intensity = 2.5) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(hexColor),
    emissive: new THREE.Color(hexColor),
    emissiveIntensity: intensity,
    roughness: 0.3,
    metalness: 0.2
  });
}
```
