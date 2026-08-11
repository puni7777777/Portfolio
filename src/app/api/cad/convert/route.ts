export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const fileParam = searchParams.get('file')

    if (!fileParam) {
      return NextResponse.json({ error: 'file parameter is required' }, { status: 400 })
    }

    // Clean leading slash and decode
    const decodedPath = decodeURIComponent(fileParam)
    const relativePath = decodedPath.startsWith('/') ? decodedPath.slice(1) : decodedPath
    const publicDir = path.resolve(process.cwd(), 'public')
    const fullPath = path.resolve(publicDir, relativePath)

    // Prevent path traversal
    if (!fullPath.startsWith(publicDir)) {
      return NextResponse.json({ error: 'Forbidden path' }, { status: 403 })
    }

    // Check if source file exists
    try {
      await fs.access(fullPath)
    } catch {
      return NextResponse.json({ error: `File not found: ${relativePath}` }, { status: 404 })
    }

    const lower = fullPath.toLowerCase()

    // 1. Convert STEP / STP / SLDPRT files to STL using FreeCAD/Trimesh script
    if (
      lower.endsWith('.step') ||
      lower.endsWith('.stp') ||
      lower.endsWith('.sldprt') ||
      lower.endsWith('.sldasm')
    ) {
      try {
        const cacheDir = path.resolve(process.cwd(), 'storage', 'cache')
        await fs.mkdir(cacheDir, { recursive: true })

        const safeCacheName = path.basename(fullPath).replace(/[^a-zA-Z0-9_.-]/g, '_') + '.stl'
        const cachedStlPath = path.resolve(cacheDir, safeCacheName)

        let needsConvert = true
        try {
          const stlStat = await fs.stat(cachedStlPath)
          const srcStat = await fs.stat(fullPath)
          if (stlStat.mtime > srcStat.mtime && stlStat.size > 0) {
            needsConvert = false
          }
        } catch {}

        if (needsConvert) {
          const scriptPath = path.resolve(process.cwd(), 'scripts', 'freecad_converter.py')
          const pyCmd = process.platform === 'win32' ? 'python' : 'python3'
          await execAsync(`${pyCmd} "${scriptPath}" "${fullPath}" "${cachedStlPath}"`)
        }

        const stlBuffer = await fs.readFile(cachedStlPath)
        return new Response(new Uint8Array(stlBuffer), {
          status: 200,
          headers: {
            'Content-Type': 'model/stl',
            'Content-Length': stlBuffer.length.toString(),
            'Access-Control-Allow-Origin': '*',
          },
        })
      } catch (err) {
        console.warn('FreeCAD/Trimesh CLI conversion warning (falling back to raw STEP stream):', err)
      }
    }

    // 2. Stream original raw file
    const buffer = await fs.readFile(fullPath)
    let contentType = 'application/octet-stream'
    if (lower.endsWith('.stl')) contentType = 'model/stl'
    else if (lower.endsWith('.obj')) contentType = 'model/obj'
    else if (lower.endsWith('.glb')) contentType = 'model/gltf-binary'
    else if (lower.endsWith('.gltf')) contentType = 'model/gltf+json'
    else if (lower.endsWith('.step') || lower.endsWith('.stp')) contentType = 'model/step'

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': buffer.length.toString(),
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error: any) {
    console.error('CAD API convert error:', error)
    return NextResponse.json({ error: error?.message || 'Failed to process CAD file' }, { status: 500 })
  }
}
