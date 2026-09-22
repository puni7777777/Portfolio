import * as THREE from "three";
import DxfParser from "dxf-parser";

/**
 * AutoCAD Color Index (ACI) to RGB Hex Color Map
 */
const ACI_COLORS = {
  1: 0xff0000, // Red
  2: 0xffff00, // Yellow
  3: 0x00ff00, // Green
  4: 0x00ffff, // Cyan
  5: 0x0000ff, // Blue
  6: 0xff00ff, // Magenta
  7: 0xffffff, // White / Black
  8: 0x808080, // Dark Grey
  9: 0xc0c0c0, // Light Grey
};

export function getAciColor(colorIndex, fallbackHex = 0x00ffff) {
  if (!colorIndex || colorIndex < 0) return fallbackHex;
  if (ACI_COLORS[colorIndex]) return ACI_COLORS[colorIndex];
  // Standard ACI formula approximation for 10..255
  return fallbackHex;
}

/**
 * Parses DXF text / ArrayBuffer and builds a Three.js Object3D Group with AutoCAD Layer subgroups
 */
export function loadDxfModel(arrayBufferOrText) {
  const text = typeof arrayBufferOrText === "string"
    ? arrayBufferOrText
    : new TextDecoder("utf-8", { fatal: false }).decode(arrayBufferOrText);

  const parser = new DxfParser();
  let dxfData = null;

  try {
    dxfData = parser.parseSync(text);
  } catch (err) {
    console.error("DXF parse error:", err);
    throw new Error(`Failed to parse DXF drawing: ${err.message}`);
  }

  if (!dxfData || !dxfData.entities || dxfData.entities.length === 0) {
    throw new Error("No valid CAD entities found in DXF file.");
  }

  const rootGroup = new THREE.Group();
  rootGroup.name = "DXF_ROOT";

  // Create layer subgroups
  const layerGroupsMap = new Map();
  const layerTable = dxfData.tables?.layer?.layers || {};

  const getLayerGroup = (layerName, entityColorIndex) => {
    const name = layerName || "0";
    if (!layerGroupsMap.has(name)) {
      const group = new THREE.Group();
      group.name = `LAYER_${name}`;
      
      const layerDef = layerTable[name];
      const colorIndex = layerDef?.colorNumber || entityColorIndex || 7;
      const colorHex = getAciColor(colorIndex, 0x00ffff);

      group.userData = {
        layerName: name,
        colorHex,
        visible: true,
      };

      layerGroupsMap.set(name, group);
      rootGroup.add(group);
    }
    return layerGroupsMap.get(name);
  };

  // Convert entities to Three.js objects
  for (const entity of dxfData.entities) {
    const targetGroup = getLayerGroup(entity.layer, entity.colorNumber);
    const defaultColor = targetGroup.userData.colorHex;
    const color = entity.colorNumber ? getAciColor(entity.colorNumber, defaultColor) : defaultColor;

    const lineMat = new THREE.LineBasicMaterial({
      color,
      linewidth: 1.5,
    });

    // 1. LINE
    if (entity.type === "LINE" && entity.vertices && entity.vertices.length >= 2) {
      const p1 = entity.vertices[0];
      const p2 = entity.vertices[1];
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(p1.x, p1.y, p1.z || 0),
        new THREE.Vector3(p2.x, p2.y, p2.z || 0),
      ]);
      const line = new THREE.Line(geometry, lineMat);
      targetGroup.add(line);
    }
    // 2. LWPOLYLINE / POLYLINE
    else if ((entity.type === "LWPOLYLINE" || entity.type === "POLYLINE") && entity.vertices) {
      const points = [];
      for (const v of entity.vertices) {
        points.push(new THREE.Vector3(v.x, v.y, v.z || 0));
      }

      if (points.length >= 2) {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineFunc = entity.shape ? THREE.LineLoop : THREE.Line;
        const line = new lineFunc(geometry, lineMat);
        targetGroup.add(line);
      }
    }
    // 3. CIRCLE
    else if (entity.type === "CIRCLE" && entity.center && entity.radius) {
      const curve = new THREE.EllipseCurve(
        entity.center.x,
        entity.center.y,
        entity.radius,
        entity.radius,
        0,
        2 * Math.PI,
        false,
        0
      );
      const points = curve.getPoints(64).map((p) => new THREE.Vector3(p.x, p.y, entity.center.z || 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.LineLoop(geometry, lineMat);
      targetGroup.add(line);
    }
    // 4. ARC
    else if (entity.type === "ARC" && entity.center && entity.radius) {
      const startAngle = entity.startAngle || 0;
      const endAngle = entity.endAngle || Math.PI;
      const curve = new THREE.EllipseCurve(
        entity.center.x,
        entity.center.y,
        entity.radius,
        entity.radius,
        startAngle,
        endAngle,
        false,
        0
      );
      const points = curve.getPoints(48).map((p) => new THREE.Vector3(p.x, p.y, entity.center.z || 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMat);
      targetGroup.add(line);
    }
    // 5. ELLIPSE
    else if (entity.type === "ELLIPSE" && entity.center) {
      const rx = Math.sqrt((entity.majorAxisEndPoint?.x || 1) ** 2 + (entity.majorAxisEndPoint?.y || 0) ** 2);
      const ry = rx * (entity.axisRatio || 0.5);
      const curve = new THREE.EllipseCurve(
        entity.center.x,
        entity.center.y,
        rx,
        ry,
        entity.startAngle || 0,
        entity.endAngle || 2 * Math.PI,
        false,
        0
      );
      const points = curve.getPoints(48).map((p) => new THREE.Vector3(p.x, p.y, entity.center.z || 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMat);
      targetGroup.add(line);
    }
    // 6. SOLID / 3DFACE
    else if ((entity.type === "SOLID" || entity.type === "3DFACE") && entity.vertices) {
      const v = entity.vertices;
      if (v.length >= 3) {
        const positions = [];
        positions.push(v[0].x, v[0].y, v[0].z || 0);
        positions.push(v[1].x, v[1].y, v[1].z || 0);
        positions.push(v[2].x, v[2].y, v[2].z || 0);

        if (v.length >= 4) {
          positions.push(v[2].x, v[2].y, v[2].z || 0);
          positions.push(v[3].x, v[3].y, v[3].z || 0);
          positions.push(v[0].x, v[0].y, v[0].z || 0);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geometry.computeVertexNormals();

        const meshMat = new THREE.MeshStandardMaterial({
          color,
          side: THREE.DoubleSide,
          metalness: 0.2,
          roughness: 0.5,
        });

        const mesh = new THREE.Mesh(geometry, meshMat);
        targetGroup.add(mesh);
      }
    }
  }

  // Extract layer metadata list
  const layersList = Array.from(layerGroupsMap.values()).map((g) => ({
    name: g.userData.layerName,
    colorHex: g.userData.colorHex,
    visible: true,
    group: g,
  }));

  // Auto-center parent root group at origin (0, 0, 0)
  const box = new THREE.Box3().setFromObject(rootGroup);
  const center = box.getCenter(new THREE.Vector3());
  rootGroup.position.set(-center.x, -center.y, -center.z);

  return {
    group: rootGroup,
    layers: layersList,
    dxfData,
  };
}
