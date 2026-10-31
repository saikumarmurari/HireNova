import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Camera, Eye, RotateCw, Layers, Sparkles, ChevronDown, ChevronUp, Cpu, Compass } from 'lucide-react';

interface ThreeCareerNexusProps {
  onSelectFeature?: (featureId: string) => void;
}

// Scratch math helpers pre-allocated at module scope (Zero GC in loop)
const _scratchVec1 = new THREE.Vector3();
const _scratchVec2 = new THREE.Vector3();
const _scratchUp = new THREE.Vector3(0, 1, 0);
const _scratchMatrix = new THREE.Matrix4();
const _scratchColor = new THREE.Color();

export const ThreeCareerNexus: React.FC<ThreeCareerNexusProps> = ({ onSelectFeature }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1.0);
  const [explodedRatio, setExplodedRatio] = useState(0.0);
  const [hologramMode, setHologramMode] = useState<'matrix' | 'radar' | 'galaxy'>('matrix');
  const [cameraPreset, setCameraPreset] = useState<'orbit' | 'core' | 'blueprint'>('orbit');
  const [activeNodeName, setActiveNodeName] = useState<string>('AI Resume Core');

  // Mutable refs for animation loop
  const speedRef = useRef(1.0);
  const explodedRef = useRef(0.0);
  const targetExplodedRef = useRef(0.0);
  const hologramModeRef = useRef<'matrix' | 'radar' | 'galaxy'>('matrix');

  useEffect(() => {
    speedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    targetExplodedRef.current = explodedRatio;
  }, [explodedRatio]);

  useEffect(() => {
    hologramModeRef.current = hologramMode;
  }, [hologramMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect Software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Setup Scene & Color Pipeline
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0c10);
    scene.fog = new THREE.FogExp2(0x0b0c10, 0.04);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(6, 4.2, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Mandatory Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (Warm Key + Cool Fill + Contact Grounding)
    const keyLight = new THREE.DirectionalLight(0xffedd5, 2.5);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.camera.left = -4;
      keyLight.shadow.camera.right = 4;
      keyLight.shadow.camera.top = 4;
      keyLight.shadow.camera.bottom = -4;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 1.8);
    rimLight.position.set(-6, 3, -5);
    scene.add(rimLight);

    // 5. Controls with Exponential Damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3.5;
    controls.maxDistance = 16;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Do not go under ground plane
    controls.target.set(0, 1.3, 0);

    // 6. Procedural Canvas Textures (Zero 404 dependencies)
    // Procedural Contact Shadow Texture
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const radGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    radGrad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    radGrad.addColorStop(0.4, 'rgba(0, 0, 0, 0.45)');
    radGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.15)');
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = radGrad;
    sCtx.fillRect(0, 0, 256, 256);

    const contactShadowTexture = new THREE.CanvasTexture(shadowCanvas);
    contactShadowTexture.colorSpace = THREE.SRGBColorSpace;

    // Contact shadow plane flush with ground
    const shadowGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: contactShadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // Floor Grid Canvas Texture
    const gridCanvas = document.createElement('canvas');
    gridCanvas.width = 512;
    gridCanvas.height = 512;
    const gCtx = gridCanvas.getContext('2d')!;
    gCtx.fillStyle = '#0b0c10';
    gCtx.fillRect(0, 0, 512, 512);
    gCtx.strokeStyle = 'rgba(99, 102, 241, 0.16)';
    gCtx.lineWidth = 1.5;
    const step = 32;
    for (let x = 0; x <= 512; x += step) {
      gCtx.beginPath();
      gCtx.moveTo(x, 0);
      gCtx.lineTo(x, 512);
      gCtx.stroke();
      gCtx.beginPath();
      gCtx.moveTo(0, x);
      gCtx.lineTo(512, x);
      gCtx.stroke();
    }
    // High-tech circular radar rings on floor
    gCtx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
    gCtx.lineWidth = 2;
    gCtx.beginPath();
    gCtx.arc(256, 256, 110, 0, Math.PI * 2);
    gCtx.stroke();
    gCtx.beginPath();
    gCtx.arc(256, 256, 210, 0, Math.PI * 2);
    gCtx.stroke();

    const floorGridTexture = new THREE.CanvasTexture(gridCanvas);
    floorGridTexture.colorSpace = THREE.SRGBColorSpace;
    floorGridTexture.wrapS = THREE.RepeatWrapping;
    floorGridTexture.wrapT = THREE.RepeatWrapping;
    floorGridTexture.repeat.set(4, 4);
    floorGridTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorGridTexture,
      roughness: 0.7,
      metalness: 0.2,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);

    // =========================================================================
    // 7. Composite 3-12 Part Procedural Model: "The Career Intelligence Nexus"
    // =========================================================================
    const nexusGroup = new THREE.Group();
    scene.add(nexusGroup);

    // Part 1: Hexagonal Beveled Base Pedestal
    const basePts: THREE.Vector2[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      basePts.push(new THREE.Vector2(Math.cos(a) * 1.8, Math.sin(a) * 1.8));
    }
    const baseShape = new THREE.Shape(basePts);
    const baseGeo = new THREE.ExtrudeGeometry(baseShape, {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 0.1,
    });
    baseGeo.center();
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.rotation.x = Math.PI / 2;
    baseMesh.position.y = 0.25;
    baseMesh.castShadow = !isSoftwareGl;
    baseMesh.receiveShadow = !isSoftwareGl;
    nexusGroup.add(baseMesh);

    // Part 2: Lathe Machined Collar Ring
    const collarPts: THREE.Vector2[] = [
      new THREE.Vector2(1.2, 0),
      new THREE.Vector2(1.4, 0.1),
      new THREE.Vector2(1.35, 0.3),
      new THREE.Vector2(1.15, 0.4),
      new THREE.Vector2(1.0, 0.45),
    ];
    const collarGeo = new THREE.LatheGeometry(collarPts, 32);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: 0.95,
      roughness: 0.18,
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.y = 0.45;
    collarMesh.castShadow = !isSoftwareGl;
    nexusGroup.add(collarMesh);

    // Part 3: Emitter Core Optical Crystal Mount
    const emitterGeo = new THREE.CylinderGeometry(0.55, 0.85, 0.2, 32);
    const emitterMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x4338ca,
      emissiveIntensity: 0.4,
    });
    const emitterMesh = new THREE.Mesh(emitterGeo, emitterMat);
    emitterMesh.position.y = 0.85;
    nexusGroup.add(emitterMesh);

    // Part 4: Floating Quantum Core Subgroup (Gimbal + Hologram Core)
    const floatingCoreGroup = new THREE.Group();
    floatingCoreGroup.position.y = 1.85;
    nexusGroup.add(floatingCoreGroup);

    // Part 5: Primary Outer Gyroscopic Gimbal Ring
    const outerRingGeo = new THREE.TorusGeometry(1.25, 0.045, 16, 64);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.92,
      roughness: 0.12,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    floatingCoreGroup.add(outerRingMesh);

    // Part 6: Secondary Counter-Rotating Inner Gyro Ring
    const innerRingGeo = new THREE.TorusGeometry(0.95, 0.035, 16, 64);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.35,
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRingMesh.rotation.x = Math.PI / 4;
    floatingCoreGroup.add(innerRingMesh);

    // Part 7: Central Holographic Octahedron Crystal
    const coreGeo = new THREE.OctahedronGeometry(0.55, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x60a5fa,
      metalness: 0.1,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.85,
      transparent: true,
      opacity: isSoftwareGl ? 0.6 : 0.9,
      ior: 1.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    floatingCoreGroup.add(coreMesh);

    // Part 8: Inner Wireframe Pulsing Core (Accents)
    const wireGeo = new THREE.IcosahedronGeometry(0.35, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    floatingCoreGroup.add(wireMesh);

    // Part 9: Translucent Optical Energy Dome
    const domeGeo = new THREE.SphereGeometry(1.65, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.7);
    const domeMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      metalness: 0.05,
      roughness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.6,
      transparent: true,
      opacity: isSoftwareGl ? 0.15 : 0.25,
      depthWrite: false,
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    domeMesh.position.y = 0.55;
    nexusGroup.add(domeMesh);

    // Part 10: Orbital Instanced Data Shards (36 chips circling the nexus)
    const chipCount = 36;
    const chipGeo = new THREE.BoxGeometry(0.08, 0.03, 0.18);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x0369a1,
      emissiveIntensity: 0.5,
    });
    const chipInstanced = new THREE.InstancedMesh(chipGeo, chipMat, chipCount);
    chipInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    nexusGroup.add(chipInstanced);

    // Store per-chip orbit metadata
    const chipsData = Array.from({ length: chipCount }, (_, i) => ({
      radius: 1.9 + (i % 3) * 0.45,
      speed: 0.4 + (i % 5) * 0.12 * (i % 2 === 0 ? 1 : -1),
      angle: (i / chipCount) * Math.PI * 2,
      heightOffset: 1.1 + (i % 4) * 0.35,
      bobSpeed: 1.5 + (i % 3) * 0.8,
    }));

    // Interactive Raycaster for hovering on the 3D Nexus core
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handlePointerMove);

    // 8. Animation & Render Loop with Exponential Damping
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const spd = speedRef.current;

      // Exponential damping on exploded view separation
      const targetExp = targetExplodedRef.current;
      explodedRef.current = THREE.MathUtils.damp(explodedRef.current, targetExp, 6, delta);
      const expVal = explodedRef.current;

      // Apply exploded view offsets smoothly across vertical subcomponents
      baseMesh.position.y = 0.25 - expVal * 0.3;
      collarMesh.position.y = 0.45;
      emitterMesh.position.y = 0.85 + expVal * 0.4;
      floatingCoreGroup.position.y = 1.85 + expVal * 1.2;
      domeMesh.position.y = 0.55 + expVal * 0.8;

      // Rotate gyroscopic rings
      outerRingMesh.rotation.y += delta * 0.8 * spd;
      outerRingMesh.rotation.x = Math.sin(elapsed * 0.6) * 0.25;

      innerRingMesh.rotation.y -= delta * 1.2 * spd;
      innerRingMesh.rotation.z += delta * 0.6 * spd;

      // Rotate core crystal
      coreMesh.rotation.y += delta * 1.4 * spd;
      coreMesh.rotation.x = Math.cos(elapsed * 0.8) * 0.3;

      wireMesh.rotation.y -= delta * 1.8 * spd;
      wireMesh.rotation.z = Math.sin(elapsed) * 0.4;

      // Subtle breathing pulse on the quantum core
      const pulse = 1 + Math.sin(elapsed * 3) * 0.05;
      coreMesh.scale.set(pulse, pulse, pulse);
      wireMesh.scale.set(pulse * 1.05, pulse * 1.05, pulse * 1.05);

      // Color shifts based on active hologram mode
      const curMode = hologramModeRef.current;
      if (curMode === 'matrix') {
        _scratchColor.setHex(0x0ea5e9);
        coreMat.emissive.lerp(_scratchColor, 0.05);
      } else if (curMode === 'radar') {
        _scratchColor.setHex(0x10b981);
        coreMat.emissive.lerp(_scratchColor, 0.05);
      } else {
        _scratchColor.setHex(0xa855f7);
        coreMat.emissive.lerp(_scratchColor, 0.05);
      }

      // Update orbiting instanced chips
      for (let i = 0; i < chipCount; i++) {
        const chip = chipsData[i];
        chip.angle += delta * chip.speed * spd;
        const x = Math.cos(chip.angle) * chip.radius;
        const z = Math.sin(chip.angle) * chip.radius;
        const y = chip.heightOffset + Math.sin(elapsed * chip.bobSpeed + i) * 0.12 + expVal * 0.6;

        _scratchVec1.set(x, y, z);
        _scratchMatrix.identity();
        _scratchMatrix.setPosition(_scratchVec1);
        _scratchMatrix.lookAt(_scratchVec1, _scratchVec2.set(0, y, 0), _scratchUp);
        chipInstanced.setMatrixAt(i, _scratchMatrix);
      }
      chipInstanced.instanceMatrix.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const setCameraPresetView = (preset: 'orbit' | 'core' | 'blueprint') => {
    setCameraPreset(preset);
    if (preset === 'core') {
      setActiveNodeName('Holographic Skill Quantum Core');
    } else if (preset === 'blueprint') {
      setActiveNodeName('ATS Architecture Blueprint');
    } else {
      setActiveNodeName('AI Career Orbit View');
    }
  };

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl overflow-hidden bg-[#0b0c10] border border-[#20222e] shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Minimal Top-Left Title / HUD Badge */}
      <div className="absolute top-5 left-5 pointer-events-none flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-[#14151f]/95 border border-[#252737] text-indigo-400 shadow-lg">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Spatial Career Core</span>
            <span className="text-[10px] text-zinc-500 font-mono">·</span>
            <span className="text-[11px] text-zinc-400 font-mono">60 FPS PBR</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">{activeNodeName}</h3>
          <p className="text-xs text-zinc-400">Three.js Procedural Spatial Station & Hologram Nexus</p>
        </div>
      </div>

      {/* Top-Right Quick Guide / Reset */}
      <div className="absolute top-5 right-5 flex items-center gap-2">
        <div className="text-xs text-zinc-400 bg-[#14151f]/95 border border-[#252737] px-3 py-1.5 rounded-xl shadow-md hidden sm:flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-indigo-400" />
          <span>Click & Drag to rotate • Scroll to zoom</span>
        </div>
      </div>

      {/* Collapsible Unified Bottom Control Dock (<= 15% viewport footprint, solid rgba surfaces, no backdrop-blur over WebGL) */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-4xl transition-all duration-300 z-20 ${
          isDockCollapsed ? 'translate-y-[85%]' : 'translate-y-0'
        }`}
      >
        {/* Dock Header & Toggle Button */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#14151f] border border-[#252737] rounded-t-xl text-xs font-medium text-zinc-300 hover:text-white shadow-lg transition-colors cursor-pointer"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-indigo-400" />
                <span>Show Control Dock</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />
                <span>Hide Controls (Zen Mode)</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Controls Body */}
        <div className="p-4 bg-[#14151f] border border-[#252737] rounded-2xl shadow-2xl text-zinc-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Control 1: Camera Presets */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-indigo-400" />
                Perspective View
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#0b0c10] p-1 rounded-xl border border-[#20222f]">
                <button
                  onClick={() => setCameraPresetView('orbit')}
                  className={`text-xs py-1.5 rounded-lg font-medium transition-colors ${
                    cameraPreset === 'orbit' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Orbit
                </button>
                <button
                  onClick={() => setCameraPresetView('core')}
                  className={`text-xs py-1.5 rounded-lg font-medium transition-colors ${
                    cameraPreset === 'core' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Core
                </button>
                <button
                  onClick={() => setCameraPresetView('blueprint')}
                  className={`text-xs py-1.5 rounded-lg font-medium transition-colors ${
                    cameraPreset === 'blueprint' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Plan
                </button>
              </div>
            </div>

            {/* Control 2: Hologram Quantum Modes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Hologram Mode
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#0b0c10] p-1 rounded-xl border border-[#20222f]">
                <button
                  onClick={() => setHologramMode('matrix')}
                  className={`text-xs py-1.5 rounded-lg font-medium transition-colors ${
                    hologramMode === 'matrix' ? 'bg-violet-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Matrix
                </button>
                <button
                  onClick={() => setHologramMode('radar')}
                  className={`text-xs py-1.5 rounded-lg font-medium transition-colors ${
                    hologramMode === 'radar' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Radar
                </button>
                <button
                  onClick={() => setHologramMode('galaxy')}
                  className={`text-xs py-1.5 rounded-lg font-medium transition-colors ${
                    hologramMode === 'galaxy' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Galaxy
                </button>
              </div>
            </div>

            {/* Control 3: Exploded View Separation Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  Exploded Stack
                </span>
                <span className="font-mono text-cyan-400">{Math.round(explodedRatio * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodedRatio}
                onChange={(e) => setExplodedRatio(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-950 rounded-lg appearance-none"
              />
            </div>

            {/* Control 4: Orbital Velocity */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-emerald-400" />
                  Spin Velocity
                </span>
                <span className="font-mono text-emerald-400">{rotationSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={rotationSpeed}
                onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-950 rounded-lg appearance-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
