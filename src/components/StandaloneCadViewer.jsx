"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { extractCadBufferGeometry } from "@/utils/cadTriangleExtractor";
import { loadNativeStepModel } from "@/utils/stepLoader";

/**
 * Embedded AutoCAD-style 3D ViewCube Widget
 */
function EmbeddedViewCube({ cameraRef, controlsRef }) {
  const cubeMountRef = useRef(null);
  const cubeSceneRef = useRef(null);
  const cubeCameraRef = useRef(null);
  const cubeRendererRef = useRef(null);
  const cubeMeshRef = useRef(null);
  const [activeFace, setActiveFace] = useState(null);

  useEffect(() => {
    const container = cubeMountRef.current;
    if (!container) return;

    const width = 110;
    const height = 110;

    const scene = new THREE.Scene();
    cubeSceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(
      width / -2, width / 2, height / 2, height / -2, 1, 1000
    );
    camera.position.set(0, 0, 160);
    cubeCameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    cubeRendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(50, 80, 100);
    scene.add(dirLight);

    const createFaceCanvas = (text) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#1e1e24";
      ctx.fillRect(0, 0, 256, 256);
      ctx.lineWidth = 12;
      ctx.strokeStyle = "#d046d5";
      ctx.strokeRect(6, 6, 244, 244);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 52px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 128, 128);
      return canvas;
    };

    const faceLabels = ["RIGHT", "LEFT", "TOP", "BOTTOM", "FRONT", "BACK"];
    const materials = faceLabels.map(
      (label) =>
        new THREE.MeshStandardMaterial({
          map: new THREE.CanvasTexture(createFaceCanvas(label)),
          roughness: 0.3,
          metalness: 0.5,
        })
    );

    const geometry = new THREE.BoxGeometry(70, 70, 70);
    const cubeMesh = new THREE.Mesh(geometry, materials);
    cubeMeshRef.current = cubeMesh;

    const edgesGeo = new THREE.EdgesGeometry(geometry);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xf062f4, linewidth: 2 });
    const wireframeEdges = new THREE.LineSegments(edgesGeo, lineMat);
    cubeMesh.add(wireframeEdges);
    scene.add(cubeMesh);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (cameraRef.current && cubeMeshRef.current) {
        cubeMeshRef.current.quaternion.copy(cameraRef.current.quaternion).invert();
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [cameraRef, controlsRef]);

  const snapToView = (viewName) => {
    if (!cameraRef.current || !controlsRef.current) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const target = controls.target.clone();
    const distance = camera.position.distanceTo(target);

    const viewVectors = {
      TOP: new THREE.Vector3(0, distance, 0.001),
      BOTTOM: new THREE.Vector3(0, -distance, 0.001),
      FRONT: new THREE.Vector3(0, 0, distance),
      BACK: new THREE.Vector3(0, 0, -distance),
      RIGHT: new THREE.Vector3(distance, 0, 0),
      LEFT: new THREE.Vector3(-distance, 0, 0),
      ISOMETRIC: new THREE.Vector3(
        distance * 0.577,
        distance * 0.577,
        distance * 0.577
      ),
    };

    const targetPos = viewVectors[viewName] ? viewVectors[viewName].add(target) : camera.position;
    const startPos = camera.position.clone();
    const startTime = performance.now();
    const duration = 400;

    setActiveFace(viewName);

    const animateSnap = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      camera.position.lerpVectors(startPos, targetPos, ease);
      controls.update();

      if (progress < 1) {
        requestAnimationFrame(animateSnap);
      } else {
        setTimeout(() => setActiveFace(null), 1000);
      }
    };

    requestAnimationFrame(animateSnap);
  };

  return (
    <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 flex flex-col items-center gap-1 bg-zinc-950/85 p-1.5 sm:p-2 rounded-2xl border border-zinc-800/80 backdrop-blur-md shadow-2xl select-none font-mono text-[9px] sm:text-[10px] scale-75 sm:scale-100 origin-top-right">
      <div ref={cubeMountRef} className="w-27.5 h-27.5 cursor-pointer" />
      {activeFace && (
        <div className="text-[10px] font-bold text-cyan-400 animate-in fade-in">
          {activeFace} VIEW
        </div>
      )}
      <div className="grid grid-cols-3 gap-1 pt-1 border-t border-zinc-800/80 w-full text-center">
        {["TOP", "FRONT", "RIGHT", "LEFT", "BACK", "ISOMETRIC"].map((view) => (
          <button
            key={view}
            onClick={() => snapToView(view)}
            className="px-1 py-0.5 rounded bg-zinc-900 hover:bg-cyan-950 hover:text-cyan-300 text-zinc-400 border border-zinc-800 transition-colors"
          >
            {view === "ISOMETRIC" ? "ISO" : view}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Standalone, Self-Contained 3D CAD Viewer Component
 * 
 * @param {Object} props
 * @param {string} [props.modelUrl]
 * @param {File|Blob|null} [props.modelFile]
 * @param {string} [props.modelName]
 * @param {Array<{ name: string; url: string; file?: any }>} [props.models]
 * @param {string} [props.height]
 */
export default function StandaloneCadViewer({
  modelUrl = "",
  modelFile = null,
  modelName = "3D CAD Model",
  models = undefined,
  height = "600px",
}) {
  const mountRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const meshGroupRef = useRef(null);

  // Normalize input models list or single model
  const availableModels = useMemo(() => {
    if (models && models.length > 0) return models;
    if (modelUrl || modelFile) {
      return [{ name: modelName, url: modelUrl, file: modelFile }];
    }
    return [];
  }, [models, modelUrl, modelFile, modelName]);

  const [selectedModelIndex, setSelectedModelIndex] = useState(0);

  const activeModel = availableModels[selectedModelIndex] || availableModels[0] || null;

  const [autoRotate, setAutoRotate] = useState(false);
  const [displayMode, setDisplayMode] = useState("shadedWithEdges"); // 'shadedWithEdges', 'shaded', 'wireframe'
  const [materialPreset, setMaterialPreset] = useState("metallic"); // 'metallic', 'fuchsia', 'gold', 'dark'
  const [showGrid, setShowGrid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const autoRotateRef = useRef(autoRotate);
  useEffect(() => {
    autoRotateRef.current = autoRotate;
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // 1. Initialize Three.js WebGL Scene ONCE
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c0c0f");
    scene.fog = new THREE.FogExp2("#0c0c0f", 0.012);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.01, 50000);
    camera.position.set(30, 25, 35);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI; // Full 360° spherical rotation
    controls.minDistance = 0.1;
    controls.maxDistance = 500;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xff00ff, 2.5);
    dirLight1.position.set(40, 60, 40);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00ffff, 2.0);
    dirLight2.position.set(-40, 40, -40);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight3.position.set(0, 50, 0);
    scene.add(dirLight3);

    // Floor Grid
    const gridHelper = new THREE.GridHelper(60, 60, 0xd046d5, 0x272730);
    gridHelper.name = "gridHelper";
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Scene Mesh Group
    const meshGroup = new THREE.Group();
    meshGroupRef.current = meshGroup;
    scene.add(meshGroup);

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotateRef.current;
        controlsRef.current.autoRotateSpeed = 1.8;
        controlsRef.current.update();
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Toggle Grid
  useEffect(() => {
    if (!sceneRef.current) return;
    const grid = sceneRef.current.getObjectByName("gridHelper");
    if (grid) grid.visible = showGrid;
  }, [showGrid]);

  // DoubleSide Material Generator
  const getMaterial = (preset, isWireframe) => {
    let color = 0xe4e4e7;
    let metalness = 0.85;
    let roughness = 0.2;

    if (preset === "fuchsia") {
      color = 0xc026d3;
      metalness = 0.7;
      roughness = 0.2;
    } else if (preset === "gold") {
      color = 0xeab308;
      metalness = 0.9;
      roughness = 0.15;
    } else if (preset === "dark") {
      color = 0x3f3f46;
      metalness = 0.8;
      roughness = 0.3;
    }

    return new THREE.MeshStandardMaterial({
      color,
      metalness,
      roughness,
      wireframe: isWireframe,
      side: THREE.DoubleSide,
    });
  };

  // Helper to apply SolidWorks "Shaded With Edges" overlay outlines
  const updateDisplayModeOnGroup = (group, mode) => {
    group.traverse((child) => {
      if (child.isMesh) {
        const oldEdges = child.getObjectByName("cadEdgeLines");
        if (oldEdges) {
          child.remove(oldEdges);
          if (oldEdges.geometry) oldEdges.geometry.dispose();
          if (oldEdges.material) oldEdges.material.dispose();
        }

        if (child.material) {
          child.material.wireframe = mode === "wireframe";
        }

        if (mode === "shadedWithEdges" && child.geometry) {
          const edgesGeo = new THREE.EdgesGeometry(child.geometry, 15);
          const lineMat = new THREE.LineBasicMaterial({ color: 0x111115, linewidth: 1.5 });
          const edgeLines = new THREE.LineSegments(edgesGeo, lineMat);
          edgeLines.name = "cadEdgeLines";
          child.add(edgeLines);
        }
      }
    });
  };

  // Fit and scale mesh group precisely at (0,0,0)
  const fitMeshGroupToViewport = (group) => {
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    group.position.set(-center.x, -center.y, -center.z);

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 22 / maxDim;
      group.scale.set(scale, scale, scale);
    }
  };

  // Update Display Mode & Material Preset
  useEffect(() => {
    if (!meshGroupRef.current) return;
    const isWire = displayMode === "wireframe";
    const newMat = getMaterial(materialPreset, isWire);

    meshGroupRef.current.traverse((child) => {
      if (child.isMesh) {
        child.material = newMat;
      }
    });

    updateDisplayModeOnGroup(meshGroupRef.current, displayMode);
  }, [displayMode, materialPreset]);

  // Main CAD File Loader (Handles URLs, File/Blob objects, and STL/OBJ/GLTF/STEP formats)
  useEffect(() => {
    if (!meshGroupRef.current) return;
    const meshGroup = meshGroupRef.current;

    let isCancelled = false;

    // Purge old model
    while (meshGroup.children.length > 0) {
      const child = meshGroup.children[0];
      meshGroup.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    }

    if (!activeModel) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const setSingleMeshInGroup = (modelObject) => {
      if (isCancelled) return;
      while (meshGroup.children.length > 0) {
        const child = meshGroup.children[0];
        meshGroup.remove(child);
        if (child.geometry) child.geometry.dispose();
      }
      meshGroup.add(modelObject);
      setIsLoading(false);
    };

    // Obtain ArrayBuffer or URL string
    let targetUrl = activeModel.url || (activeModel.file ? URL.createObjectURL(activeModel.file) : "");
    const lowerName = (targetUrl || activeModel.name || "").toLowerCase();

    if (!targetUrl) {
      setIsLoading(false);
      setErrorMessage("No valid CAD model URL or File provided.");
      return;
    }

    // 1. STL Binary Loader
    if (lowerName.endsWith(".stl")) {
      fetch(targetUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load STL model`);
          return res.arrayBuffer();
        })
        .then((buffer) => {
          if (isCancelled) return;
          const loader = new STLLoader();
          const geometry = loader.parse(buffer);
          geometry.center();
          geometry.computeVertexNormals();

          const mat = getMaterial(materialPreset, displayMode === "wireframe");
          const mesh = new THREE.Mesh(geometry, mat);
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          const tempGroup = new THREE.Group();
          tempGroup.add(mesh);
          fitMeshGroupToViewport(tempGroup);
          updateDisplayModeOnGroup(tempGroup, displayMode);

          setSingleMeshInGroup(tempGroup);
        })
        .catch((err) => {
          if (isCancelled) return;
          console.error("STL load error:", err);
          setErrorMessage(`Unable to parse STL model: ${err.message}`);
          setIsLoading(false);
        });
    }
    // 2. STEP / STP / SLDPRT / SLDASM CAD Model Loader (OpenCascade WebAssembly Native Renderer)
    else if (
      lowerName.endsWith(".step") ||
      lowerName.endsWith(".stp") ||
      lowerName.endsWith(".sldprt") ||
      lowerName.endsWith(".sldasm")
    ) {
      fetch(targetUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load STEP CAD file`);
          return res.arrayBuffer();
        })
        .then(async (buffer) => {
          if (isCancelled) return;
          let tempGroup = null;

          // A. Attempt OpenCascade WebAssembly Native STEP Tessellation
          try {
            tempGroup = await loadNativeStepModel(buffer);
          } catch (occtErr) {
            console.warn("OpenCascade WASM STEP tessellation warning, falling back to point extractor...", occtErr);
            tempGroup = null;
          }

          // B. Fallback to point cloud extractor
          if (!tempGroup || tempGroup.children.length === 0) {
            const geometry = extractCadBufferGeometry(buffer, lowerName);
            if (!geometry) {
              throw new Error("Could not extract 3D CAD geometry from STEP file.");
            }
            const mat = getMaterial(materialPreset, displayMode === "wireframe");
            const mesh = new THREE.Mesh(geometry, mat);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            tempGroup = new THREE.Group();
            tempGroup.add(mesh);
          }

          fitMeshGroupToViewport(tempGroup);
          updateDisplayModeOnGroup(tempGroup, displayMode);

          setSingleMeshInGroup(tempGroup);
        })
        .catch((err) => {
          if (isCancelled) return;
          console.error("STEP CAD load error:", err);
          setErrorMessage(`Unable to parse STEP model: ${err.message}`);
          setIsLoading(false);
        });
    }
    // 2. GLB / GLTF Loader
    else if (lowerName.endsWith(".glb") || lowerName.endsWith(".gltf")) {
      const loader = new GLTFLoader();
      loader.load(
        targetUrl,
        (gltf) => {
          if (isCancelled) return;
          const model = gltf.scene;
          const mat = getMaterial(materialPreset, displayMode === "wireframe");
          model.traverse((child) => {
            if (child.isMesh) child.material = mat;
          });
          fitMeshGroupToViewport(model);
          updateDisplayModeOnGroup(model, displayMode);
          setSingleMeshInGroup(model);
        },
        undefined,
        (err) => {
          if (isCancelled) return;
          console.error("GLTF load error:", err);
          setErrorMessage("Failed to render GLTF model.");
          setIsLoading(false);
        }
      );
    }
    // 3. OBJ Loader
    else if (lowerName.endsWith(".obj")) {
      fetch(targetUrl)
        .then((res) => res.text())
        .then((text) => {
          if (isCancelled) return;
          const loader = new OBJLoader();
          const object = loader.parse(text);
          const mat = getMaterial(materialPreset, displayMode === "wireframe");
          object.traverse((child) => {
            if (child.isMesh) child.material = mat;
          });
          fitMeshGroupToViewport(object);
          updateDisplayModeOnGroup(object, displayMode);
          setSingleMeshInGroup(object);
        })
        .catch((err) => {
          if (isCancelled) return;
          console.error("OBJ load error:", err);
          setErrorMessage("Failed to render OBJ model.");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setErrorMessage("Unsupported 3D file format.");
    }

    return () => {
      isCancelled = true;
    };
  }, [activeModel, displayMode, materialPreset]);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs select-none">
      {/* Viewport Control Bar */}
      <div className="p-4 rounded-xl border border-zinc-800 bg-[#121215] flex flex-wrap items-center justify-between gap-4 shadow-lg">
        {/* Model Selector Dropdown */}
        <div className="flex items-center gap-3 min-w-[200px]">
          <span className="text-cyan-400 font-bold">📦 Model:</span>
          {availableModels.length > 1 ? (
            <select
              value={selectedModelIndex}
              onChange={(e) => setSelectedModelIndex(Number(e.target.value))}
              className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            >
              {availableModels.map((m, idx) => (
                <option key={idx} value={idx}>
                  {m.name || `Model ${idx + 1}`}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-white font-bold truncate">
              {activeModel ? activeModel.name || modelName : "No model"}
            </span>
          )}
        </div>

        {/* Viewport Render Options */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Display Mode Selector */}
          <div className="flex rounded-lg bg-zinc-950 border border-zinc-800 p-1 text-[11px]">
            {[
              { id: "shadedWithEdges", label: "Shaded w/ Edges 📐" },
              { id: "shaded", label: "Shaded 🎨" },
              // { id: "wireframe", label: "Wireframe 🕸️" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setDisplayMode(m.id)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  displayMode === m.id
                    ? "bg-cyan-700 text-white font-bold"
                    : "bg-transparent text-zinc-400 hover:text-white"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Material Selector */}
          <div className="flex rounded-lg bg-zinc-950 border border-zinc-800 p-1 text-[11px]">
            {[
              { id: "metallic", label: "Chrome" },
              { id: "fuchsia", label: "Fuchsia" },
              { id: "gold", label: "Gold" },
              { id: "dark", label: "Titanium" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMaterialPreset(m.id)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  materialPreset === m.id
                    ? "bg-cyan-700 text-white font-bold"
                    : "bg-transparent text-zinc-400 hover:text-white"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Grid Toggle */}
          {/* <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              showGrid
                ? "bg-zinc-900 border-zinc-700 text-zinc-200"
                : "bg-zinc-950 border-zinc-800 text-zinc-500"
            }`}
          >
            Grid
          </button> */}

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              autoRotate
                ? "bg-cyan-950/80 border-cyan-600 text-cyan-300 font-bold"
                : "bg-zinc-950 border-zinc-800 text-zinc-400"
            }`}
          >
            {autoRotate ? "Rotate 🔄" : "Static ⏸"}
          </button>

          {/* Reset View */}
          <button
            onClick={handleResetCamera}
            className="px-3 py-1.5 rounded-lg bg-[#18181d] border border-zinc-700 hover:bg-zinc-800 text-white transition-colors"
          >
            Reset View
          </button>
        </div>
      </div>

      {/* Main 3D Canvas */}
      <div
        style={{ height }}
        className="relative w-full rounded-2xl border border-zinc-800 bg-[#0c0c0f] overflow-hidden shadow-2xl group"
      >
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* AutoCAD ViewCube Widget */}
        <EmbeddedViewCube cameraRef={cameraRef} controlsRef={controlsRef} />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-xs font-mono text-cyan-400 z-30">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
            <span>Parsing 3D CAD Mesh...</span>
          </div>
        )}

        {/* Error Overlay */}
        {errorMessage && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-6 text-center z-30 font-mono">
            <div className="text-3xl">⚠️</div>
            <div className="text-sm font-bold text-red-400">{errorMessage}</div>
            <div className="text-xs text-zinc-400">
              Ensure the CAD file URL is accessible or provide a valid STL/OBJ/GLTF model.
            </div>
          </div>
        )}

        {/* Floating Controls Overlay */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 p-2.5 sm:p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-zinc-400 space-y-0.5 sm:space-y-1 pointer-events-none select-none max-w-[200px] sm:max-w-none">
          <div className="text-white font-bold flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span className="text-cyan-400">👋 3D Controls:</span>
          </div>
          <div className="hidden sm:block">Left Click + Drag: Rotate 360°</div>
          <div className="hidden sm:block">Right Click + Drag: Pan Camera</div>
          <div className="hidden sm:block">Scroll Wheel: Zoom In / Out</div>
          <div className="sm:hidden text-zinc-300 font-semibold">1-Finger Touch: Rotate 360°</div>
          <div className="sm:hidden text-zinc-400">Pinch: Zoom & Pan</div>
        </div>
      </div>
    </div>
  );
}
