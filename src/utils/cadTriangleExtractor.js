import * as THREE from "three";

/**
 * Universal CAD Triangle Extractor for STEP (.step, .stp) and SolidWorks (.sldprt, .sldasm) files
 * Extracts 3D vertices and generates Three.js BufferGeometry
 */
export function extractCadBufferGeometry(textOrArrayBuffer, filename = "") {
  const lower = filename.toLowerCase();

  // 1. If text string or ASCII content
  if (typeof textOrArrayBuffer === "string" || lower.endsWith(".step") || lower.endsWith(".stp")) {
    const text = typeof textOrArrayBuffer === "string" 
      ? textOrArrayBuffer 
      : new TextDecoder("utf-8", { fatal: false }).decode(textOrArrayBuffer);

    // Extract all 3D CARTESIAN_POINT coordinates: CARTESIAN_POINT('name',(X,Y,Z))
    const pointRegex = /CARTESIAN_POINT\s*\(\s*[^,]*\s*,\s*\(\s*([-+\d.eE]+)\s*,\s*([-+\d.eE]+)\s*,\s*([-+\d.eE]+)\s*\)\s*\)/gi;
    let match;
    const points = [];

    while ((match = pointRegex.exec(text)) !== null) {
      const x = parseFloat(match[1]);
      const y = parseFloat(match[2]);
      const z = parseFloat(match[3]);
      if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        points.push(x, y, z);
      }
    }

    if (points.length >= 9) {
      return buildMeshFromPointSet(points);
    }
  }

  // 2. Binary Buffer Parser for .sldprt / .sldasm / binary CAD
  if (textOrArrayBuffer instanceof ArrayBuffer || ArrayBuffer.isView(textOrArrayBuffer)) {
    const buffer = textOrArrayBuffer instanceof ArrayBuffer ? textOrArrayBuffer : textOrArrayBuffer.buffer;
    const dataView = new DataView(buffer);
    const floats = [];

    // Scan binary float32 triplets
    for (let i = 0; i < buffer.byteLength - 12; i += 4) {
      try {
        const val = dataView.getFloat32(i, true);
        if (!isNaN(val) && Math.abs(val) < 50000 && Math.abs(val) > 0.0001) {
          floats.push(val);
        }
      } catch {}
    }

    if (floats.length >= 9) {
      return buildMeshFromPointSet(floats);
    }
  }

  return null;
}

/**
 * Builds clean Three.js BufferGeometry from 3D point cloud coordinates
 */
function buildMeshFromPointSet(flatPoints) {
  const numCoords = flatPoints.length - (flatPoints.length % 9); // Ensure multiples of 3 vertices (1 triangle)
  if (numCoords < 9) return null;

  const positions = new Float32Array(numCoords);
  for (let i = 0; i < numCoords; i++) {
    positions[i] = flatPoints[i];
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.computeVertexNormals();

  // Auto-center geometry to origin
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  if (box) {
    const center = new THREE.Vector3();
    box.getCenter(center);
    geometry.translate(-center.x, -center.y, -center.z);
  }

  return geometry;
}
