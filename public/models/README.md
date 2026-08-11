# 3D CAD Models Folder

Place your 3D CAD model files (`.stl`, `.obj`, `.glb`, `.gltf`, `.step`, `.stp`, `.sldprt`, `.sldasm`) in this folder.

### File Naming Convention & Project Linking

1. **Option A: Matching Project ID (Default Convention)**
   Name your model file to match the mechanical project ID:
   - `/public/models/bladeless-fan.stl` (or `.glb` / `.obj` / `.step`)

2. **Option B: Custom Path in `src/data/projects.ts`**
   You can specify any path or filename in `src/data/projects.ts` using the `modelUrl` property:

   ```typescript
   {
     id: 'bladeless-fan',
     title: 'Bladeless Fan using Ion Wind',
     category: 'Mechanical',
     modelUrl: '/models/my-custom-model.stl', // <-- Direct path to model file
   }
   ```

3. **Multiple Models per Project**
   To provide multiple 3D CAD parts for a single project (e.g. Rotor + Housing), define `models` in `src/data/projects.ts`:

   ```typescript
   {
     id: 'bladeless-fan',
     title: 'Bladeless Fan using Ion Wind',
     category: 'Mechanical',
     models: [
       { name: 'Full Assembly', url: '/models/fan-assembly.stl' },
       { name: 'Electrode Housing', url: '/models/housing.stl' }
     ]
   }
   ```
