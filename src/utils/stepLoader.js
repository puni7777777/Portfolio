import * as THREE from "three";

let occtPromise = null;

async function getOcctInstance() {
  if (!occtPromise) {
    occtPromise = (async () => {
      const occtModule = await import("occt-import-js");
      const initOpenCascade = occtModule.default || occtModule;
      return await initOpenCascade({
        locateFile: (name) => `/${name}`
      });
    })();
  }
  return occtPromise;
}

/**
 * Native STEP File Loader powered by OpenCascade WebAssembly (occt-import-js)
 * Tessellates CAD solids/NURBS surfaces directly in browser WebAssembly memory into a Three.js Group
 */
export async function loadNativeStepModel(arrayBuffer) {
  const occt = await getOcctInstance();
  const fileData = new Uint8Array(arrayBuffer);
  const result = occt.ReadStepFile(fileData);

  if (!result || !result.success || !result.meshes || result.meshes.length === 0) {
    throw new Error("OpenCascade WASM failed to tessellate STEP CAD surfaces.");
  }

  const group = new THREE.Group();

  for (const meshData of result.meshes) {
    const geometry = new THREE.BufferGeometry();

    if (meshData.attributes && meshData.attributes.position) {
      const pos = meshData.attributes.position.array;
      const typedPos = Array.isArray(pos) ? new Float32Array(pos) : pos;
      geometry.setAttribute("position", new THREE.BufferAttribute(typedPos, 3));
    }

    if (meshData.attributes && meshData.attributes.normal) {
      const norm = meshData.attributes.normal.array;
      const typedNorm = Array.isArray(norm) ? new Float32Array(norm) : norm;
      geometry.setAttribute("normal", new THREE.BufferAttribute(typedNorm, 3));
    } else {
      geometry.computeVertexNormals();
    }

    if (meshData.index && meshData.index.array) {
      const idx = meshData.index.array;
      const typedIdx = Array.isArray(idx) ? new Uint32Array(idx) : idx;
      geometry.setIndex(new THREE.BufferAttribute(typedIdx, 1));
    }

    const color = meshData.color 
      ? new THREE.Color(meshData.color[0], meshData.color[1], meshData.color[2]) 
      : new THREE.Color(0xe4e4e7);

    const material = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.85,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  // Center the parent assembly group as a whole (preserves exact child component alignment)
  const box = new THREE.Box3().setFromObject(group);
  const center = box.getCenter(new THREE.Vector3());
  group.position.set(-center.x, -center.y, -center.z);

  return group;
}
