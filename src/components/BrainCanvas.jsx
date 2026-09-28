import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function BrainCanvas({
  activeScenario = null,
  activeStep = null,
  activeStepIndex = 0,
  selectedTimelineStage = 0,
  focusedOrgan = null,
  isDetailView = false,
  onSelectOrgan = null,
  onSelectStep = null
}) {
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.05, y: 0 });
  const currentRotationRef = useRef({ x: 0.05, y: 0 });

  // 3D Scene references
  const rootGroupRef = useRef(null);
  const modelGroupRef = useRef(null);
  const pathwayGroupRef = useRef(null);
  const internalGlowGroupRef = useRef(null);
  const pulseParticlesRef = useRef([]);

  // Material & Light refs for dynamic timeline & focus reactivity
  const rewardLightRef = useRef(null);
  const rewardCoreMeshRef = useRef(null);
  const rewardHaloMeshRef = useRef(null);
  const pfcMatRef = useRef(null);
  const pfcLightRef = useRef(null);
  const cortexMatRef = useRef(null);

  // Verified 3D anchor points in rootGroup coordinate space
  const organAnchors = useRef({
    pfc: new THREE.Vector3(-0.507, 0.487, 0.39),
    reward: new THREE.Vector3(-0.302, 0.002, 0.14),
    amygdala: new THREE.Vector3(-0.300, -0.272, 0.444),
    hippocampus: new THREE.Vector3(-0.018, -0.083, 0.318)
  });

  // Pathway points for Screen 2 (Drug Addiction Pathway) - anatomically separated
  const pathwayAnchors = useRef({
    step1: new THREE.Vector3(-0.66, 0.22, 0.34),   // 1. Substance enters (anterior frontal cortex)
    step2: new THREE.Vector3(-0.28, 0.08, 0.18),   // 2. Reward system (subcortical striatum/NAc)
    step3: new THREE.Vector3(-0.06, -0.14, 0.26),  // 3. Learning & memory (hippocampus/amygdala)
    step4: new THREE.Vector3(-0.48, 0.50, 0.36)    // 4. Prefrontal cortex (superior PFC)
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    const cameraTarget = new THREE.Vector3(-0.12, 0.03, 0);
    camera.position.set(-0.12, 0.08, 4.3);
    camera.lookAt(cameraTarget);

    // 2. High-performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const canvasEl = renderer.domElement;
    canvasEl.style.width = '100%';
    canvasEl.style.height = '100%';
    canvasEl.style.display = 'block';
    container.appendChild(canvasEl);

    // 3. Balanced Lighting for Lighter Neon Blue Brain with Crisp Contrast
    scene.add(new THREE.HemisphereLight(0x7dd3fc, 0x071527, 2.6));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3, 5, 5);
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x00f5ff, 4.8);
    cyanRim.position.set(-6, 3, 2);
    scene.add(cyanRim);

    const blueFill = new THREE.DirectionalLight(0x38bdf8, 2.4);
    blueFill.position.set(2, 2, 4);
    scene.add(blueFill);

    const magentaRim = new THREE.DirectionalLight(0xa855f7, 2.6);
    magentaRim.position.set(6, -2, -3);
    scene.add(magentaRim);

    // 4. Brain Hierarchy
    const root = new THREE.Group();
    root.rotation.set(currentRotationRef.current.x, currentRotationRef.current.y, 0);
    scene.add(root);
    rootGroupRef.current = root;

    const model = new THREE.Group();
    root.add(model);
    modelGroupRef.current = model;

    // 5. Internal Glowing Organ Cores (shines through translucent cortex like concept art)
    const glowGroup = new THREE.Group();
    root.add(glowGroup);
    internalGlowGroupRef.current = glowGroup;
    buildInternalGlows(glowGroup);

    // 6. Pathways Group (Screen 2 Bezier splines)
    const pathwayGroup = new THREE.Group();
    root.add(pathwayGroup);
    pathwayGroupRef.current = pathwayGroup;

    // 7. Load real anatomical brain_raw.glb
    loadAnatomicalBrain(model);

    // 8. Mouse & Touch drag rotation
    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      targetRotationRef.current.y += dx * 0.007;
      targetRotationRef.current.x = Math.max(
        -0.45,
        Math.min(0.45, targetRotationRef.current.x + dy * 0.007)
      );
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouseRef.current.x;
      const dy = e.touches[0].clientY - prevMouseRef.current.y;
      targetRotationRef.current.y += dx * 0.007;
      targetRotationRef.current.x = Math.max(
        -0.45,
        Math.min(0.45, targetRotationRef.current.x + dy * 0.007)
      );
      prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    canvasEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvasEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 9. 60 FPS Render Loop (NO default auto-spin: spins smoothly only on user interaction/focus)
    let animId;
    const clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      // Smooth interpolation toward target rotation
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      root.rotation.x = currentRotationRef.current.x;
      root.rotation.y = currentRotationRef.current.y;

      // Animate pathway pulses
      pulseParticlesRef.current.forEach((p) => {
        if (p.curve) {
          p.t = (p.t + p.speed) % 1;
          const pt = p.curve.getPoint(p.t);
          p.mesh.position.copy(pt);
        }
      });

      // Animate subtle breathing pulse on internal glows
      if (internalGlowGroupRef.current) {
        const pulse = 1.0 + Math.sin(elapsed * 2.2) * 0.05;
        internalGlowGroupRef.current.scale.set(pulse, pulse, pulse);
      }

      // Render Three.js scene
      renderer.render(scene, camera);

      // Dynamically update pointer lines to lock onto the organs in 3D
      updateTrackingLines(camera, container);
    };

    render();

    // Resize handler
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      canvasEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(canvasEl)) {
        container.removeChild(canvasEl);
      }
    };
  }, []);

  // Smoothly rotate the brain when user taps an organ in Screen 1
  useEffect(() => {
    if (isDetailView || !focusedOrgan) return;

    if (focusedOrgan === 'pfc') {
      targetRotationRef.current = { x: 0.12, y: -0.42 };
    } else if (focusedOrgan === 'reward') {
      targetRotationRef.current = { x: 0.02, y: 0.08 };
    } else if (focusedOrgan === 'amygdala') {
      targetRotationRef.current = { x: -0.16, y: -0.28 };
    } else if (focusedOrgan === 'hippocampus') {
      targetRotationRef.current = { x: -0.06, y: 0.38 };
    }
  }, [focusedOrgan, isDetailView]);

  // Smoothly rotate the brain when user taps a pathway step in Screen 2
  useEffect(() => {
    if (!isDetailView) return;

    if (activeStepIndex === 0) {
      targetRotationRef.current = { x: 0.12, y: -0.45 }; // Substance enters (anterior)
    } else if (activeStepIndex === 1) {
      targetRotationRef.current = { x: 0.02, y: 0.05 };  // Reward system (core)
    } else if (activeStepIndex === 2) {
      targetRotationRef.current = { x: -0.06, y: 0.36 }; // Learning & memory (posterior)
    } else if (activeStepIndex === 3) {
      targetRotationRef.current = { x: 0.14, y: -0.32 }; // Prefrontal cortex (superior PFC)
    }
  }, [activeStepIndex, isDetailView]);

  // DYNAMIC TIMELINE SIMULATION: Visually transform the 3D brain when user taps timeline stages
  useEffect(() => {
    if (!isDetailView) return;

    const rewardLight = rewardLightRef.current;
    const rewardCore = rewardCoreMeshRef.current;
    const rewardHalo = rewardHaloMeshRef.current;
    const pfcMat = pfcMatRef.current;
    const pfcLight = pfcLightRef.current;
    const cortexMat = cortexMatRef.current;

    if (selectedTimelineStage === 0) {
      // 0: Normal Balance (Healthy Baseline)
      targetRotationRef.current = { x: 0.05, y: 0.0 };
      if (rewardLight) {
        rewardLight.intensity = 2.4;
        rewardLight.color.setHex(0xffaa00);
      }
      if (rewardCore && rewardCore.material) {
        rewardCore.material.color.setHex(0xffaa00);
      }
      if (rewardHalo) {
        rewardHalo.scale.set(1.0, 1.0, 1.0);
        if (rewardHalo.material) rewardHalo.material.color.setHex(0xff7700);
      }
      if (pfcMat) {
        pfcMat.emissiveIntensity = 1.1;
        pfcMat.color.setHex(0x00d4ff);
      }
      if (pfcLight) pfcLight.intensity = 2.6;
      if (cortexMat) {
        cortexMat.color.setHex(0x1e88e5);
        cortexMat.opacity = 0.58;
      }
    } else if (selectedTimelineStage === 1) {
      // 1: After Repeated Use (Acute Dopamine Surge & Sensitization)
      targetRotationRef.current = { x: 0.02, y: 0.12 }; // Turn to face the blazing reward center
      if (rewardLight) {
        rewardLight.intensity = 8.5; // Massive flare
        rewardLight.color.setHex(0xff3300); // Flaming hot surge
      }
      if (rewardCore && rewardCore.material) {
        rewardCore.material.color.setHex(0xff3300);
      }
      if (rewardHalo) {
        rewardHalo.scale.set(1.75, 1.75, 1.75); // Expanded dopamine cloud
        if (rewardHalo.material) rewardHalo.material.color.setHex(0xff5500);
      }
      if (pfcMat) {
        pfcMat.emissiveIntensity = 0.38; // Diminished prefrontal control
        pfcMat.color.setHex(0x0088aa);
      }
      if (pfcLight) pfcLight.intensity = 1.1;
      if (cortexMat) {
        cortexMat.color.setHex(0x2563eb);
        cortexMat.opacity = 0.62;
      }
    } else if (selectedTimelineStage === 2) {
      // 2: Long-term Adaptation (D2 Receptor Downregulation & Hypofrontality)
      targetRotationRef.current = { x: 0.10, y: -0.20 };
      if (rewardLight) {
        rewardLight.intensity = 0.6; // Blunted receptor response
        rewardLight.color.setHex(0x7c3aed); // Muted violet
      }
      if (rewardCore && rewardCore.material) {
        rewardCore.material.color.setHex(0x7c3aed);
      }
      if (rewardHalo) {
        rewardHalo.scale.set(0.65, 0.65, 0.65);
        if (rewardHalo.material) rewardHalo.material.color.setHex(0x4c1d95);
      }
      if (pfcMat) {
        pfcMat.emissiveIntensity = 0.15; // Hypofrontality
        pfcMat.color.setHex(0x475569);
      }
      if (pfcLight) pfcLight.intensity = 0.5;
      if (cortexMat) {
        cortexMat.color.setHex(0x4f46e5);
        cortexMat.opacity = 0.50;
      }
    }
  }, [selectedTimelineStage, isDetailView]);

  // Update pathways when switching view
  useEffect(() => {
    if (!pathwayGroupRef.current) return;
    const group = pathwayGroupRef.current;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }
    pulseParticlesRef.current = [];

    if (isDetailView) {
      buildCurvedPathwayArrows(group);
    }
  }, [isDetailView, activeScenario, activeStep]);

  // Create luminous internal organ cores that emit radiant neon light through the navy cortex
  function buildInternalGlows(glowGroup) {
    // 1. Reward System (Warm Radiant Amber Core)
    const rewardLight = new THREE.PointLight(0xffaa00, 3.8, 1.4);
    rewardLight.position.copy(organAnchors.current.reward);
    glowGroup.add(rewardLight);
    rewardLightRef.current = rewardLight;

    const rewardCoreGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const rewardCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const rewardCore = new THREE.Mesh(rewardCoreGeo, rewardCoreMat);
    rewardCore.position.copy(organAnchors.current.reward);
    glowGroup.add(rewardCore);
    rewardCoreMeshRef.current = rewardCore;

    const rewardHaloGeo = new THREE.SphereGeometry(0.26, 16, 16);
    const rewardHaloMat = new THREE.MeshBasicMaterial({
      color: 0xff7700,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const rewardHalo = new THREE.Mesh(rewardHaloGeo, rewardHaloMat);
    rewardHalo.position.copy(organAnchors.current.reward);
    glowGroup.add(rewardHalo);
    rewardHaloMeshRef.current = rewardHalo;

    // 2. Amygdala (Vivid Magenta / Hot Pink Core)
    const amygdalaLight = new THREE.PointLight(0xff007f, 2.8, 1.2);
    amygdalaLight.position.copy(organAnchors.current.amygdala);
    glowGroup.add(amygdalaLight);

    const amygdalaCoreGeo = new THREE.SphereGeometry(0.11, 16, 16);
    const amygdalaCoreMat = new THREE.MeshBasicMaterial({
      color: 0xff007f,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending
    });
    const amygdalaCore = new THREE.Mesh(amygdalaCoreGeo, amygdalaCoreMat);
    amygdalaCore.position.copy(organAnchors.current.amygdala);
    glowGroup.add(amygdalaCore);

    const amygdalaHaloGeo = new THREE.SphereGeometry(0.20, 16, 16);
    const amygdalaHaloMat = new THREE.MeshBasicMaterial({
      color: 0xe02478,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending
    });
    const amygdalaHalo = new THREE.Mesh(amygdalaHaloGeo, amygdalaHaloMat);
    amygdalaHalo.position.copy(organAnchors.current.amygdala);
    glowGroup.add(amygdalaHalo);

    // 3. Hippocampus (Emerald Neon Green Core)
    const hippoLight = new THREE.PointLight(0x00f59b, 2.8, 1.2);
    hippoLight.position.copy(organAnchors.current.hippocampus);
    glowGroup.add(hippoLight);

    const hippoCoreGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const hippoCoreMat = new THREE.MeshBasicMaterial({
      color: 0x00f59b,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending
    });
    const hippoCore = new THREE.Mesh(hippoCoreGeo, hippoCoreMat);
    hippoCore.position.copy(organAnchors.current.hippocampus);
    glowGroup.add(hippoCore);

    const hippoHaloGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const hippoHaloMat = new THREE.MeshBasicMaterial({
      color: 0x059669,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending
    });
    const hippoHalo = new THREE.Mesh(hippoHaloGeo, hippoHaloMat);
    hippoHalo.position.copy(organAnchors.current.hippocampus);
    glowGroup.add(hippoHalo);

    // 4. Prefrontal Cortex Internal Glow
    const pfcLight = new THREE.PointLight(0x00e5ff, 2.6, 1.2);
    pfcLight.position.copy(organAnchors.current.pfc);
    glowGroup.add(pfcLight);
    pfcLightRef.current = pfcLight;
  }

  // Load and position anatomical brain with high transparency for non-activated parts
  function loadAnatomicalBrain(modelGroup) {
    const gltfLoader = new GLTFLoader();

    // Anatomical center of the brain in meters
    const center = new THREE.Vector3(0, 1.6192, -0.00878);
    const scaleFactor = 12.0;

    gltfLoader.load(
      '/models/brain_raw.glb',
      (gltf) => {
        // Lighter neon blue cortex shader matching concept art reference for high contrast
        const cortexMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x1e88e5), // Lighter vibrant neon cyan-blue
          emissive: new THREE.Color(0x0369a1), // Glowing cerulean blue emission
          emissiveIntensity: 0.36,
          roughness: 0.24,
          metalness: 0.18,
          transparent: true,
          opacity: 0.58, // Translucent neon glass, letting internal organs shine through with high contrast
          side: THREE.FrontSide,
          depthWrite: false
        });
        cortexMatRef.current = cortexMat;

        // Prefrontal Cortex: Electric Cyan translucent highlighting keeping gyri details
        const pfcMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x00d4ff),
          emissive: new THREE.Color(0x006699),
          emissiveIntensity: 1.1,
          roughness: 0.28,
          metalness: 0.15,
          transparent: true,
          opacity: 0.85,
          side: THREE.FrontSide,
          depthWrite: false
        });
        pfcMatRef.current = pfcMat;

        // Reward System meshes
        const rewardMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xffb703),
          emissive: new THREE.Color(0xffb703),
          emissiveIntensity: 3.0,
          roughness: 0.2,
          metalness: 0.1,
          depthWrite: true
        });

        // Amygdala meshes
        const amygdalaMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xff007f),
          emissive: new THREE.Color(0xff007f),
          emissiveIntensity: 3.0,
          roughness: 0.2,
          metalness: 0.1,
          depthWrite: true
        });

        // Hippocampus meshes
        const hippocampusMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x00f59b),
          emissive: new THREE.Color(0x00f59b),
          emissiveIntensity: 3.0,
          roughness: 0.2,
          metalness: 0.1,
          depthWrite: true
        });

        gltf.scene.traverse((o) => {
          if (!o.isMesh) return;
          const ex = (o.userData && o.userData.bx_cat) ? o.userData : (o.parent && o.parent.userData) || {};

          // Hide non-brain vessels and nerves
          if (ex.bx_core === 0 || ex.bx_cat === 'arteries' || ex.bx_cat === 'veins_sinuses' || ex.bx_cat === 'cranial_nerves') {
            o.visible = false;
            return;
          }

          if (o.geometry) {
            o.geometry.computeVertexNormals();
          }

          const label = (ex.bx_label || o.name || '').toLowerCase();

          // Highlight specific functional nodes
          if (label.includes('superior frontal gyrus') || label.includes('middle frontal gyrus')) {
            o.material = pfcMat;
          } else if (label.includes('caudate nucleus') || label.includes('putamen') || label.includes('accumbens')) {
            o.material = rewardMat;
          } else if (label.includes('lateral nucleus') || label.includes('amygdal')) {
            o.material = amygdalaMat;
          } else if (label.includes('hippocampus')) {
            o.material = hippocampusMat;
          } else {
            o.material = cortexMat;
          }
        });

        // Translate to origin, scale to camera frame, and rotate to lateral profile
        gltf.scene.position.set(-center.x, -center.y, -center.z);
        modelGroup.scale.setScalar(scaleFactor);
        modelGroup.rotation.y = -Math.PI / 2; // Lateral profile: anterior points LEFT
        modelGroup.add(gltf.scene);
      },
      undefined,
      (err) => {
        console.error('GLB loading error:', err);
      }
    );
  }

  // Build curved glowing Bezier arrows in 3D for Screen 2 (Drug Addiction Pathway)
  function buildCurvedPathwayArrows(group) {
    const pts = [
      pathwayAnchors.current.step1,
      pathwayAnchors.current.step2,
      pathwayAnchors.current.step3,
      pathwayAnchors.current.step4
    ];

    const stages = [
      { start: pts[0], end: pts[1], color: 0x00e5ff, midOffset: new THREE.Vector3(-0.06, 0.18, 0.20) },
      { start: pts[1], end: pts[2], color: 0xff007f, midOffset: new THREE.Vector3(0.08, 0.12, 0.16) },
      { start: pts[2], end: pts[3], color: 0x00f59b, midOffset: new THREE.Vector3(-0.10, 0.24, 0.22) }
    ];

    stages.forEach((st, idx) => {
      const mid = new THREE.Vector3()
        .addVectors(st.start, st.end)
        .multiplyScalar(0.5)
        .add(st.midOffset);

      const curve = new THREE.QuadraticBezierCurve3(st.start, mid, st.end);

      // Core luminous tube
      const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.026, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: st.color,
        transparent: true,
        opacity: 0.95
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tube);

      // Outer soft neon halo tube
      const haloGeo = new THREE.TubeGeometry(curve, 36, 0.058, 8, false);
      const haloMat = new THREE.MeshBasicMaterial({
        color: st.color,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });
      const haloTube = new THREE.Mesh(haloGeo, haloMat);
      group.add(haloTube);

      // Directional arrow head
      const tangent = curve.getTangent(0.96);
      const coneGeo = new THREE.ConeGeometry(0.08, 0.20, 14);
      const coneMat = new THREE.MeshBasicMaterial({ color: st.color });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.copy(st.end);
      cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
      group.add(cone);

      // Animated traveling pulse
      const pGeo = new THREE.SphereGeometry(0.048, 12, 12);
      const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      group.add(pMesh);

      pulseParticlesRef.current.push({
        mesh: pMesh,
        curve: curve,
        t: idx * 0.33,
        speed: 0.008
      });
    });
  }

  // DYNAMIC TRACKING: Pins and lines follow organs in 3D space as the brain spins
  function updateTrackingLines(camera, container) {
    if (!container || !rootGroupRef.current) return;
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Helper: gets current screen coords of an anchor directly from rootGroup space
    const getScreenCoords = (v) => {
      const worldVec = v.clone().applyMatrix4(rootGroupRef.current.matrixWorld);
      const proj = worldVec.project(camera);
      return {
        x: (proj.x * 0.5 + 0.5) * w,
        y: (-proj.y * 0.5 + 0.5) * h,
        visible: proj.z < 1,
        isFront: worldVec.z > -0.05
      };
    };

    if (!isDetailView) {
      // Screen 1: Home View 4 Pointer Lines and Anchor Dots
      const orgDefs = [
        {
          id: 'pfc',
          anchor: organAnchors.current.pfc,
          labelElId: 'label-pfc',
          side: 'left'
        },
        {
          id: 'reward',
          anchor: organAnchors.current.reward,
          labelElId: 'label-reward',
          side: 'right'
        },
        {
          id: 'amygdala',
          anchor: organAnchors.current.amygdala,
          labelElId: 'label-amygdala',
          side: 'left'
        },
        {
          id: 'hippocampus',
          anchor: organAnchors.current.hippocampus,
          labelElId: 'label-hippocampus',
          side: 'right'
        }
      ];

      orgDefs.forEach(({ id, anchor, labelElId, side }) => {
        const line = document.getElementById(`line-${id}`);
        const dot = document.getElementById(`dot-${id}`);
        const ring = document.getElementById(`ring-${id}`);
        const labelEl = document.getElementById(labelElId);

        if (!line || !dot || !labelEl) return;

        const pt = getScreenCoords(anchor);
        const lRect = labelEl.getBoundingClientRect();

        let labelX = 0;
        let labelY = lRect.top + lRect.height * 0.45 - rect.top;

        if (side === 'left') {
          labelX = lRect.right - rect.left + 8;
        } else {
          labelX = lRect.left - rect.left - 8;
        }

        if (pt.visible) {
          line.setAttribute('x1', labelX);
          line.setAttribute('y1', labelY);
          line.setAttribute('x2', pt.x);
          line.setAttribute('y2', pt.y);

          dot.setAttribute('cx', pt.x);
          dot.setAttribute('cy', pt.y);

          if (ring) {
            ring.setAttribute('cx', pt.x);
            ring.setAttribute('cy', pt.y);
          }

          const op = pt.isFront ? '0.9' : '0.25';
          line.setAttribute('opacity', op);
          dot.setAttribute('opacity', op);
          if (ring) ring.setAttribute('opacity', pt.isFront ? '0.45' : '0.1');
        } else {
          line.setAttribute('opacity', '0');
          dot.setAttribute('opacity', '0');
          if (ring) ring.setAttribute('opacity', '0');
        }
      });
    } else {
      // Screen 2: Scenario Detail Numbered Badges (1, 2, 3, 4) & Callout Lines
      const badges = [
        {
          id: 'badge-1',
          lineId: 'line-badge-1',
          cardId: 'callout-1',
          anchor: pathwayAnchors.current.step1,
          side: 'left'
        },
        {
          id: 'badge-2',
          lineId: 'line-badge-2',
          cardId: 'callout-2',
          anchor: pathwayAnchors.current.step2,
          side: 'right'
        },
        {
          id: 'badge-3',
          lineId: 'line-badge-3',
          cardId: 'callout-3',
          anchor: pathwayAnchors.current.step3,
          side: 'left'
        },
        {
          id: 'badge-4',
          lineId: 'line-badge-4',
          cardId: 'callout-4',
          anchor: pathwayAnchors.current.step4,
          side: 'right'
        }
      ];

      badges.forEach(({ id, lineId, cardId, anchor, side }) => {
        const badgeEl = document.getElementById(id);
        const lineEl = document.getElementById(lineId);
        const cardEl = document.getElementById(cardId);

        const pt = getScreenCoords(anchor);

        if (badgeEl) {
          if (pt.visible) {
            badgeEl.style.transform = `translate3d(${pt.x - 14}px, ${pt.y - 14}px, 0)`;
            badgeEl.style.opacity = pt.isFront ? '1' : '0.35';
          } else {
            badgeEl.style.opacity = '0';
          }
        }

        if (lineEl && cardEl) {
          const cRect = cardEl.getBoundingClientRect();
          let cardX = side === 'left' ? cRect.right - rect.left + 6 : cRect.left - rect.left - 6;
          let cardY = cRect.top + cRect.height * 0.45 - rect.top;

          if (pt.visible) {
            lineEl.setAttribute('x1', cardX);
            lineEl.setAttribute('y1', cardY);
            lineEl.setAttribute('x2', pt.x);
            lineEl.setAttribute('y2', pt.y);
            lineEl.setAttribute('opacity', pt.isFront ? '0.75' : '0.2');
          } else {
            lineEl.setAttribute('opacity', '0');
          }
        }
      });
    }
  }

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[460px] select-none overflow-hidden">
      {/* Dynamic Timeline HUD Banner (Screen 2 Timeline Visual Feedback) */}
      {isDetailView && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all duration-300">
          {selectedTimelineStage === 0 && (
            <div className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Normal baseline balance • Healthy dopamine & intact PFC control</span>
            </div>
          )}
          {selectedTimelineStage === 1 && (
            <div className="px-3.5 py-1.5 rounded-full bg-slate-900/85 border border-amber-500/60 text-amber-300 text-xs font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>After repeated use • Hyper-stimulated reward surge & dopamine flooding</span>
            </div>
          )}
          {selectedTimelineStage === 2 && (
            <div className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/40 text-purple-300 text-xs font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Long-term adaptation • Receptor downregulation & hypofrontality</span>
            </div>
          )}
        </div>
      )}

      {/* SVG Thin Pointer Lines & Anchor Halos (Screen 1 & Screen 2) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {!isDetailView ? (
          <>
            {/* Prefrontal Cortex */}
            <line id="line-pfc" stroke="#00E5FF" strokeWidth="1.2" />
            <circle id="ring-pfc" r="8" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.4" />
            <circle id="dot-pfc" r="4" fill="#00E5FF" />

            {/* Reward System */}
            <line id="line-reward" stroke="#FFB703" strokeWidth="1.2" />
            <circle id="ring-reward" r="8" fill="none" stroke="#FFB703" strokeWidth="1" opacity="0.4" />
            <circle id="dot-reward" r="4" fill="#FFB703" />

            {/* Amygdala */}
            <line id="line-amygdala" stroke="#FF007F" strokeWidth="1.2" />
            <circle id="ring-amygdala" r="8" fill="none" stroke="#FF007F" strokeWidth="1" opacity="0.4" />
            <circle id="dot-amygdala" r="4" fill="#FF007F" />

            {/* Hippocampus */}
            <line id="line-hippocampus" stroke="#00F59B" strokeWidth="1.2" />
            <circle id="ring-hippocampus" r="8" fill="none" stroke="#00F59B" strokeWidth="1" opacity="0.4" />
            <circle id="dot-hippocampus" r="4" fill="#00F59B" />
          </>
        ) : (
          <>
            {/* Screen 2: Callout Pointer Lines */}
            <line id="line-badge-1" stroke="#00E5FF" strokeWidth="1.2" />
            <line id="line-badge-2" stroke="#FF007F" strokeWidth="1.2" />
            <line id="line-badge-3" stroke="#00F59B" strokeWidth="1.2" />
            <line id="line-badge-4" stroke="#A855F7" strokeWidth="1.2" />
          </>
        )}
      </svg>

      {/* Floating Typography Labels Matching Concept Art (Screen 1) - Tappable to Focus */}
      {!isDetailView && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Prefrontal Cortex (Top Left) */}
          <div
            id="label-pfc"
            onClick={() => onSelectOrgan && onSelectOrgan('pfc')}
            className={`absolute top-[16%] left-[6%] text-left max-w-[210px] pointer-events-auto cursor-pointer p-1.5 rounded-lg transition-all ${
              focusedOrgan === 'pfc' ? 'bg-cyan-500/10 ring-1 ring-cyan-400' : 'hover:bg-slate-800/40'
            }`}
          >
            <div className="text-[15px] font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">
              Prefrontal Cortex
            </div>
            <div className="text-xs text-slate-400 font-medium">
              (planning, decision making)
            </div>
          </div>

          {/* Reward System (Top Right) */}
          <div
            id="label-reward"
            onClick={() => onSelectOrgan && onSelectOrgan('reward')}
            className={`absolute top-[18%] right-[6%] text-right max-w-[210px] pointer-events-auto cursor-pointer p-1.5 rounded-lg transition-all ${
              focusedOrgan === 'reward' ? 'bg-amber-500/10 ring-1 ring-amber-400' : 'hover:bg-slate-800/40'
            }`}
          >
            <div className="text-[15px] font-bold text-amber-400 drop-shadow-[0_0_10px_rgba(255,183,3,0.8)]">
              Reward System
            </div>
            <div className="text-xs text-slate-400 font-medium">
              (motivation, pleasure)
            </div>
          </div>

          {/* Amygdala (Bottom Left) */}
          <div
            id="label-amygdala"
            onClick={() => onSelectOrgan && onSelectOrgan('amygdala')}
            className={`absolute bottom-[20%] left-[6%] text-left max-w-[210px] pointer-events-auto cursor-pointer p-1.5 rounded-lg transition-all ${
              focusedOrgan === 'amygdala' ? 'bg-pink-500/10 ring-1 ring-pink-400' : 'hover:bg-slate-800/40'
            }`}
          >
            <div className="text-[15px] font-bold text-pink-500 drop-shadow-[0_0_10px_rgba(255,0,127,0.8)]">
              Amygdala
            </div>
            <div className="text-xs text-slate-400 font-medium">
              (emotion, stress)
            </div>
          </div>

          {/* Hippocampus (Bottom Right) */}
          <div
            id="label-hippocampus"
            onClick={() => onSelectOrgan && onSelectOrgan('hippocampus')}
            className={`absolute bottom-[20%] right-[6%] text-right max-w-[210px] pointer-events-auto cursor-pointer p-1.5 rounded-lg transition-all ${
              focusedOrgan === 'hippocampus' ? 'bg-emerald-500/10 ring-1 ring-emerald-400' : 'hover:bg-slate-800/40'
            }`}
          >
            <div className="text-[15px] font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(0,245,155,0.8)]">
              Hippocampus
            </div>
            <div className="text-xs text-slate-400 font-medium">
              (memory, learning)
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Scenario Detail Floating Callout Cards & Numbered Badges - Tappable to Focus */}
      {isDetailView && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Callout 1 (Top Left) */}
          <div
            id="callout-1"
            onClick={() => onSelectStep && onSelectStep(0)}
            className={`absolute top-[10%] left-[5%] text-left max-w-[210px] pointer-events-auto cursor-pointer p-1.5 rounded-lg transition-all ${
              activeStepIndex === 0 ? 'bg-cyan-500/15 ring-1 ring-cyan-400' : 'hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]">
              <span className="w-4 h-4 rounded-full bg-cyan-400 text-black text-[10px] font-black inline-flex items-center justify-center">1</span>
              <span>Substance enters</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5 leading-snug">
              Triggers dopamine release in the reward system
            </div>
          </div>

          {/* Callout 2 (Top Right) */}
          <div
            id="callout-2"
            onClick={() => onSelectStep && onSelectStep(1)}
            className={`absolute top-[12%] right-[5%] text-right max-w-[210px] pointer-events-auto cursor-pointer p-1.5 rounded-lg transition-all ${
              activeStepIndex === 1 ? 'bg-pink-500/15 ring-1 ring-pink-400' : 'hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center justify-end gap-1.5 text-pink-400 font-bold text-xs drop-shadow-[0_0_8px_rgba(255,0,127,0.7)]">
              <span>Reward system</span>
              <span className="w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-black inline-flex items-center justify-center">2</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5 leading-snug">
              Dopamine surge creates feelings of euphoria
            </div>
          </div>

          {/* Callout 3 (Bottom Left) */}
          <div
            id="callout-3"
            onClick={() => onSelectStep && onSelectStep(2)}
            className={`absolute bottom-[16%] left-[5%] text-left max-w-[210px] pointer-events-auto cursor-pointer p-1.5 rounded-lg transition-all ${
              activeStepIndex === 2 ? 'bg-emerald-500/15 ring-1 ring-emerald-400' : 'hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs drop-shadow-[0_0_8px_rgba(0,245,155,0.7)]">
              <span className="w-4 h-4 rounded-full bg-emerald-400 text-black text-[10px] font-black inline-flex items-center justify-center">3</span>
              <span>Learning & memory</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5 leading-snug">
              Hippocampus and amygdala help form the habit
            </div>
          </div>

          {/* Callout 4 (Bottom Right) */}
          <div
            id="callout-4"
            onClick={() => onSelectStep && onSelectStep(3)}
            className={`absolute bottom-[16%] right-[5%] text-right max-w-[210px] pointer-events-auto cursor-pointer p-1.5 rounded-lg transition-all ${
              activeStepIndex === 3 ? 'bg-purple-500/15 ring-1 ring-purple-400' : 'hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center justify-end gap-1.5 text-purple-400 font-bold text-xs drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]">
              <span>Prefrontal cortex</span>
              <span className="w-4 h-4 rounded-full bg-purple-500 text-white text-[10px] font-black inline-flex items-center justify-center">4</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5 leading-snug">
              Less active over time (weaker control)
            </div>
          </div>

          {/* Numbered Circular Badges directly attached to 3D Anchors */}
          <div
            id="badge-1"
            onClick={() => onSelectStep && onSelectStep(0)}
            className="absolute top-0 left-0 w-7 h-7 rounded-full bg-cyan-400 text-black font-extrabold text-xs flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.9)] border-2 border-white/90 pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
          >
            1
          </div>
          <div
            id="badge-2"
            onClick={() => onSelectStep && onSelectStep(1)}
            className="absolute top-0 left-0 w-7 h-7 rounded-full bg-pink-500 text-white font-extrabold text-xs flex items-center justify-center shadow-[0_0_15px_rgba(255,0,127,0.9)] border-2 border-white/90 pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
          >
            2
          </div>
          <div
            id="badge-3"
            onClick={() => onSelectStep && onSelectStep(2)}
            className="absolute top-0 left-0 w-7 h-7 rounded-full bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center shadow-[0_0_15px_rgba(0,245,155,0.9)] border-2 border-white/90 pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
          >
            3
          </div>
          <div
            id="badge-4"
            onClick={() => onSelectStep && onSelectStep(3)}
            className="absolute top-0 left-0 w-7 h-7 rounded-full bg-purple-500 text-white font-extrabold text-xs flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.9)] border-2 border-white/90 pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
          >
            4
          </div>
        </div>
      )}

      {/* Tactile drag to rotate cue */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-400 text-xs backdrop-blur-md pointer-events-none z-30">
        <svg
          className="w-3.5 h-3.5 text-cyan-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 21h5v-5" />
        </svg>
        <span>Drag to rotate • Tap labels to focus</span>
      </div>
    </div>
  );
}
