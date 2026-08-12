'use client'

import { useState } from 'react'
import Link from 'next/link'
import { projects } from '@/data/projects'
import type { Project } from '@/data/types'
import { motion } from 'framer-motion'
import { Wrench, Code, Box } from 'lucide-react'
import CadViewerModal from '@/components/CadViewerModal'

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-12"
    >
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 sm:mb-20"
      >
        <motion.h1 
          className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          Engineering Projects
        </motion.h1>
        <motion.p 
          className="text-base sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Precision CAD designs, mechanical assemblies, and engineering prototypes
        </motion.p>
      </motion.section>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            {project.category === 'Mechanical' ? (
              /* Mechanical Engineering Project Card */
              <div 
                className="min-h-[420px] flex flex-col bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950/60 glass-strong rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:scale-[1.02] transition-all duration-500 overflow-hidden shadow-xl glow-card"
              >
                {/* Header with Category Badge and Icon */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <Wrench className="w-5 h-5 text-cyan-400 flex-shrink-0 animate-pulse" />
                    <Link href={`/projects/${project.id}`}>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer hover:underline">
                        {project.title}
                      </h3>
                    </Link>
                  </div>
                  <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full text-xs font-semibold border border-cyan-500/30 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Description - Truncated */}
                <p className="text-gray-300 line-clamp-3 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Blueprint Specifications Grid */}
                {((project.specs && project.specs.length > 0) || (project.software && project.software.length > 0)) && (
                  <div className="grid grid-cols-2 gap-2 my-auto p-3 bg-cyan-950/10 border border-cyan-500/10 rounded-xl font-mono text-xs">
                    {project.specs?.slice(0, 2).map((spec, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-gray-500 uppercase tracking-wider text-[10px]">{spec.label}</span>
                        <span className="text-cyan-300 font-bold">{spec.value}</span>
                      </div>
                    ))}
                    {project.software && project.software.length > 0 && (
                      <div className="flex flex-col col-span-2 mt-1 border-t border-cyan-500/10 pt-1">
                        <span className="text-gray-500 uppercase tracking-wider text-[10px]">CAD Software</span>
                        <span className="text-cyan-300 font-bold">{project.software.slice(0, 2).join(', ')}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Fixed Bottom Section */}
                <div className="mt-auto space-y-3 pt-4">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-px bg-cyan-950/20 text-xs text-cyan-300 font-mono rounded border border-cyan-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="flex-1 text-center glass px-3 py-2 rounded-xl text-white font-medium text-xs border border-white/20 hover:bg-white/10 hover:shadow-cyan-500/20 transition-all duration-300 glow-hover flex items-center justify-center"
                    >
                      Details
                    </Link>
                    <Link 
                      href={`/projects/${project.id}/3d`}
                      className="flex-1 text-center bg-cyan-950/80 px-3 py-2 rounded-xl text-cyan-300 font-medium text-xs border border-cyan-500/40 hover:bg-cyan-900/60 transition-all duration-300 flex items-center justify-center gap-1"
                    >
                      <Box className="w-3.5 h-3.5 text-cyan-400" />
                      3D Page
                    </Link>
                    {/* <button
                      onClick={() => setActiveModalProject(project)}
                      className="px-3 py-2 rounded-xl bg-cyan-600/80 hover:bg-cyan-500 text-white font-medium text-xs border border-cyan-400/50 shadow-md transition-all flex items-center justify-center"
                      title="Quick 3D Modal"
                    >
                      📦 Modal
                    </button> */}
                  </div>
                </div>
              </div>
            ) : (
              /* Software Project Card */
              <div
                className="min-h-[420px] flex flex-col bg-gradient-to-br from-black/50 via-slate-900/40 to-purple-950/20 glass-strong rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:scale-[1.02] transition-all duration-500 overflow-hidden shadow-xl glow-card cursor-pointer"
              >
                {/* Header with Category Badge and Icon */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <Code className="w-5 h-5 text-purple-400 flex-shrink-0 animate-pulse" />
                    <Link href={`/projects/${project.id}`}>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer hover:underline">
                        {project.title}
                      </h3>
                    </Link>
                  </div>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 rounded-full text-xs font-semibold border border-purple-500/30 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Description - Truncated */}
                <p className="text-gray-300 line-clamp-3 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Performance Metrics Grid */}
                {project.performance && project.performance.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 my-auto p-3 bg-purple-950/10 border border-purple-500/10 rounded-xl font-mono text-xs">
                    {project.performance.slice(0, 2).map((perf, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-gray-500 uppercase tracking-wider text-[10px]">{perf.label}</span>
                        <span className="text-purple-300 font-bold">
                          {perf.value} {perf.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Fixed Bottom Section */}
                <div className="mt-auto space-y-3 pt-4">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-px bg-purple-950/20 text-xs text-purple-300 font-mono rounded border border-purple-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="flex-grow text-center glass px-5 py-2.5 rounded-xl text-white font-medium text-sm border border-white/20 hover:bg-white/10 hover:shadow-purple-500/20 transition-all duration-300 glow-hover"
                    >
                      View Project
                    </Link>
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow text-center bg-transparent px-5 py-2.5 rounded-xl text-purple-400 font-medium text-sm border-2 border-purple-400/50 hover:bg-purple-500/10 hover:text-purple-300 hover:shadow-purple-500/20 transition-all duration-300 glow-hover flex items-center justify-center gap-1"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Quick 3D CAD Viewer Modal */}
      <CadViewerModal
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
        modelUrl={activeModalProject?.modelUrl || (activeModalProject ? `/models/${activeModalProject.id}.stl` : '')}
        modelName={activeModalProject?.title || '3D CAD Model'}
      />
    </motion.div>
  )
}

