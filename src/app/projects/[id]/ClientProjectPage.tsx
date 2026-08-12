'use client'

import { useState } from 'react'
import Link from 'next/link'
import { projects } from '@/data/projects'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import { Wrench, Code, Box } from 'lucide-react'
import StandaloneCadViewer from '@/components/StandaloneCadViewer'
import CadViewerModal from '@/components/CadViewerModal'

interface ProjectPageProps {
  id: string
}

export default function ClientProjectPage({ id }: ProjectPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const project = projects.find(p => p.id === id)

  if (!project) {
    notFound()
  }

  const modelUrl = project?.modelUrl || `/models/${project?.id}.stl`

  const isMech = project.category === 'Mechanical'
  const theme = {
    text: isMech ? 'text-cyan-400' : 'text-purple-400',
    textMuted: isMech ? 'text-cyan-300' : 'text-purple-300',
    border: isMech ? 'border-cyan-500/30' : 'border-purple-500/30',
    borderMuted: isMech ? 'border-cyan-500/10' : 'border-purple-500/10',
    borderHover: isMech ? 'hover:border-cyan-400/50' : 'hover:border-purple-400/50',
    bg: isMech ? 'bg-cyan-950/10' : 'bg-purple-950/10',
    bgMuted: isMech ? 'from-cyan-500/5' : 'from-purple-500/5',
    // shadowGlow: isMech ? 'hover:shadow-cyan-500/20' : 'hover:shadow-purple-500/20',
    // glowClass: isMech ? 'hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
    gradientText: isMech ? 'from-cyan-400 to-blue-500' : 'from-purple-400 to-indigo-500',
    gradientBg: isMech ? 'from-cyan-500/10 to-blue-500/10' : 'from-purple-500/10 to-indigo-500/10',
    Icon: isMech ? Wrench : Code,
    gridBg: isMech ? 'bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950/60' : 'bg-gradient-to-br from-black/50 via-slate-900/40 to-purple-950/20'
  }

  const ProjectIcon = theme.Icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`container mx-auto px-4 py-6 sm:px-6 lg:p-12 min-h-screen ${isMech ? 'bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:20px_20px]' : ''}`}
    >
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 sm:mb-20"
      >
        <Card className={`max-w-4xl mx-auto glass-strong ${theme.gridBg}`}>
          <div className="flex justify-center mb-4 sm:mb-6">
            <ProjectIcon className={`w-10 h-10 sm:w-12 sm:h-12 ${theme.text} animate-pulse`} />
          </div>
          <motion.h1 
            className={`text-2xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r ${theme.gradientText} bg-clip-text text-transparent`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            {project.title}
          </motion.h1>
          <motion.p 
            className="text-base sm:text-xl text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {project.description}
          </motion.p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
            {project.link && (
              <Button 
                variant="glass" 
                size="lg" 
                className={isMech ? "flex-1 hover:bg-cyan-600 hover:shadow-cyan-500/50 hover:decoration-cyan-400" : "flex-1 hover:bg-purple-600 hover:shadow-purple-500/50 hover:decoration-purple-400"}
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full text-center">
                  View Source Code
                </a>
              </Button>
            )}
            {isMech && (
              <Button 
                variant="glass" 
                size="lg" 
                className="flex-1 bg-cyan-950/60 border-cyan-500/40 text-cyan-300 decoration-cyan-400 hover:decoration-cyan-300 hover:bg-cyan-600 hover:shadow-cyan-500/50 hover:text-white"
              >
                <Link href={`/projects/${project.id}/3d`} className="flex items-center justify-center gap-2 w-full text-center">
                  <Box className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                  Full 3D View
                </Link>
              </Button>
            )}
            <Button 
              variant="outline" 
              size="lg" 
              className={isMech ? "flex-1 border-cyan-400/70 text-cyan-400 hover:border-cyan-400 hover:shadow-cyan-500/50 hover:bg-cyan-950/40" : "flex-1 border-purple-400/70 text-purple-400 hover:border-purple-400 hover:shadow-purple-500/50 hover:bg-purple-950/40"}
            >
              <Link href="/projects" className="block w-full text-center">
                ← Back to Projects
              </Link>
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Design Process */}
      <section className="mb-24">
        <Card className={`max-w-3xl mx-auto ${theme.borderHover} ${theme.gridBg}`}>
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <ProjectIcon className={`w-8 h-8 ${theme.text}`} />
            {isMech ? 'Engineering Design Process' : 'Development & Architecture'}
          </h2>
          <div className="space-y-6 text-lg text-gray-200">
            {project.designProcess?.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-4 items-start"
              >
                <span className={`w-8 h-8 glass rounded-full flex items-center justify-center font-bold ${theme.text} text-sm border ${theme.border} flex-shrink-0 mt-0.5`}>
                  {index + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </motion.div>
            )) || (
              <p className="text-gray-400 italic text-center py-8">Process documentation coming soon...</p>
            )}
          </div>
        </Card>
      </section>

      {/* Software/Tools */}
      {project.software && project.software.length > 0 && (
        <section className="mb-24">
          <Card className={`max-w-3xl mx-auto ${theme.borderHover} ${theme.gridBg}`}>
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
              <ProjectIcon className={`w-8 h-8 ${theme.text}`} />
              {isMech ? 'CAD Software & Analysis Tools' : 'Technology Stack'}
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {project.software.map((tool, index) => (
                <motion.div 
                  key={tool}
                  className={`glass-strong px-6 py-3 rounded-xl text-white font-semibold border ${theme.border} bg-${isMech ? 'cyan' : 'purple'}-950/10`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* Specs */}
      {project.specs && project.specs.length > 0 && (
        <section className="mb-24">
          <Card className={`max-w-3xl mx-auto ${theme.borderHover} ${theme.gridBg}`}>
            <h2 className="text-3xl font-bold mb-12 text-white text-center flex items-center justify-center gap-3">
              <ProjectIcon className={`w-8 h-8 ${theme.text}`} />
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.specs.map((spec, index) => (
                <motion.div 
                  key={spec.label}
                  className={`flex justify-between glass p-6 rounded-xl border ${theme.borderMuted} bg-gradient-to-r ${theme.bgMuted}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-gray-300 font-medium">{spec.label}:</span>
                  <span className={`font-bold text-xl ${theme.text} flex items-baseline gap-1`}>
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* Performance Metrics */}
      {project.performance && project.performance.length > 0 && (
        <section className="mb-24">
          <Card className={`max-w-6xl mx-auto ${theme.borderHover}  ${theme.gridBg}`}>
            <h2 className="text-3xl font-bold mb-12 text-white text-center flex items-center justify-center gap-3">
              <ProjectIcon className={`w-8 h-8 ${theme.text}`} />
              Performance &amp; Simulation Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.performance.map((metric, index) => (
                <motion.div 
                  key={metric.label}
                  className={`glass-strong p-8 rounded-2xl text-center border-2 ${theme.border} relative overflow-hidden`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradientBg} blur-xl -z-10`} />
                  <h3 className="text-4xl font-black text-white mb-2">{metric.value}</h3>
                  <div className="flex flex-col items-center gap-1">
                    <span className={`text-xl font-bold ${theme.text}`}>{metric.label}</span>
                    {metric.unit && (
                      <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">{metric.unit}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* Interactive 3D CAD Model Viewer Component */}
      {isMech && (
        <section className="mb-24">
          <Card className={`max-w-6xl mx-auto ${theme.borderHover}  bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950/60`}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-cyan-500/20">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <Wrench className="w-8 h-8 text-cyan-400" />
                3D CAD Model Viewport
              </h2>
              <div className="flex items-center gap-3">
                <Link
                  href={`/projects/${project.id}/3d`}
                  className="px-4 py-2 rounded-xl bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/60 text-xs font-mono font-bold transition-all flex items-center gap-2"
                >
                  <Box className="w-4 h-4 text-cyan-400" />
                  <span>Dedicated 3D Page ↗</span>
                </Link>
                {/* <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Pop-out Modal 📦</span>
                </button> */}
              </div>
            </div>

            <StandaloneCadViewer
              modelUrl={modelUrl}
              modelName={project.title}
              models={project.models}
              height="600px"
            />
          </Card>
        </section>
      )}

      {/* Pop-out 3D CAD Viewer Modal */}
      {isMech && (
        <CadViewerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modelUrl={modelUrl}
          modelName={project.title}
        />
      )}
    </motion.div>
  )
}

