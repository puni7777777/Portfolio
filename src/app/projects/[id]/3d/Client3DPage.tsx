'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import StandaloneCadViewer from '@/components/StandaloneCadViewer'
import CadViewerModal from '@/components/CadViewerModal'
import { Wrench, ArrowLeft } from 'lucide-react'

interface Client3DPageProps {
  id: string
}

export default function Client3DPage({ id }: Client3DPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  // Determine model path based on project modelUrl or default path convention
  const modelUrl = project.modelUrl || `/models/${project.id}.stl`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px] bg-slate-950 text-white p-4 sm:p-6 lg:p-10 font-mono"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950/80 border border-cyan-500/20 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-3">
            <Link
              href={`/projects/${project.id}`}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 text-xs font-bold transition-all flex items-center gap-2 glow-hover"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Project Details</span>
            </Link>

            <div className="h-6 w-px bg-zinc-800 hidden sm:block" />

            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-cyan-400 animate-pulse" />
              <h1 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider truncate max-w-[280px] sm:max-w-md">
                {project.title}
              </h1>
            </div>
          </div>

          {/* <div className="flex items-center gap-3">
            <span className="hidden md:inline-block px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-xs font-semibold border border-cyan-500/30">
              3D CAD Environment
            </span>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Pop-out Modal</span>
            </button>
          </div> */}
        </div>

        {/* Model Path Indicator */}
        {/* <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2 truncate">
            <Layers className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>Active CAD File Path:</span>
            <code className="text-cyan-300 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
              {modelUrl}
            </code>
          </div>
          <span className="text-xs text-zinc-500 hidden sm:inline">Formats: .STL, .OBJ, .GLB, .STEP</span>
        </div> */}

        {/* Main 3D CAD Viewport */}
        <div className="rounded-2xl border border-cyan-500/20 bg-zinc-950 p-2 shadow-2xl">
          <StandaloneCadViewer
            modelUrl={modelUrl}
            modelName={project.title}
            models={project.models}
            height="650px"
          />
        </div>

        {/* Specs & Process Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Specifications */}
          {project.specs && project.specs.length > 0 && (
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-4">
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <span>📐 Technical Specs</span>
              </h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {project.specs.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] uppercase">{s.label}</div>
                    <div className="text-cyan-300 font-bold text-sm mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Software & Tools */}
          {project.software && project.software.length > 0 && (
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-4">
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <span>🛠 CAD & Simulation Tools</span>
              </h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {project.software.map((sw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 font-bold"
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pop-out 3D Modal */}
      <CadViewerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modelUrl={modelUrl}
        modelName={project.title}
      />
    </motion.div>
  )
}
