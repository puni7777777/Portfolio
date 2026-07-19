'use client'

import Link from 'next/link'
import { projects } from '@/data/projects'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import { Wrench, Code } from 'lucide-react'

interface ProjectPageProps {
  id: string
}

export default function ClientProjectPage({ id }: ProjectPageProps) {
  const project = projects.find(p => p.id === id)

  if (!project) {
    notFound()
  }

  const isMech = project.category === 'Mechanical'
  const theme = {
    text: isMech ? 'text-cyan-400' : 'text-purple-400',
    textMuted: isMech ? 'text-cyan-300' : 'text-purple-300',
    border: isMech ? 'border-cyan-500/30' : 'border-purple-500/30',
    borderMuted: isMech ? 'border-cyan-500/10' : 'border-purple-500/10',
    borderHover: isMech ? 'hover:border-cyan-400/50' : 'hover:border-purple-400/50',
    bg: isMech ? 'bg-cyan-950/10' : 'bg-purple-950/10',
    bgMuted: isMech ? 'from-cyan-500/5' : 'from-purple-500/5',
    shadowGlow: isMech ? 'hover:shadow-cyan-500/20' : 'hover:shadow-purple-500/20',
    glowClass: isMech ? 'hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
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
      className={`container mx-auto p-6 lg:p-12 min-h-screen ${isMech ? 'bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:20px_20px]' : ''}`}
    >
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20 "
      >
        <Card className={`max-w-4xl mx-auto glass-strong ${theme.borderHover} ${theme.glowClass} ${theme.gridBg}`}>
          <div className="flex justify-center mb-6">
            <ProjectIcon className={`w-12 h-12 ${theme.text} animate-pulse`} />
          </div>
          <motion.h1 
            className={`text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r ${theme.gradientText} bg-clip-text text-transparent`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            {project.title}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
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
                className={`flex-1 hover:bg-${isMech ? 'cyan' : 'purple'}-600 hover:shadow-${isMech ? 'cyan' : 'purple'}-500`}
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full text-center">
                  View Source Code
                </a>
              </Button>
            )}
            <Button 
              variant="outline" 
              size="lg" 
              className={`flex-1 border-${isMech ? 'cyan' : 'purple'}-400/70 text-${isMech ? 'cyan' : 'purple'}-400 hover:shadow-${isMech ? 'cyan' : 'purple'}-500`}
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
        <Card className={`max-w-3xl mx-auto ${theme.borderHover} ${theme.glowClass} ${theme.gridBg}`}>
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
          <Card className={`max-w-3xl mx-auto ${theme.borderHover} ${theme.glowClass} ${theme.gridBg}`}>
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
          <Card className={`max-w-3xl mx-auto ${theme.borderHover} ${theme.glowClass} ${theme.gridBg}`}>
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
          <Card className={`max-w-6xl mx-auto ${theme.borderHover} ${theme.glowClass} ${theme.gridBg}`}>
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

      {/* 3D Viewer Placeholder */}
      {isMech && (
        <section className="mb-24">
          <Card className={`max-w-6xl mx-auto ${theme.borderHover} ${theme.glowClass} bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950/60`}>
            <h2 className="text-3xl font-bold mb-12 text-white text-center flex items-center justify-center gap-3">
              <Wrench className="w-8 h-8 text-cyan-400" />
              3D CAD Model Viewer
            </h2>
            <div className={`glass-strong rounded-2xl p-8 min-h-[500px] flex items-center justify-center border-2 ${theme.border} bg-gradient-to-b from-slate-950/50`}>
              <div className="text-center text-gray-300">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">Ready for 3D Model</h3>
                <p className="mb-8 text-lg text-gray-400">Showcase STL or OBJ engineering designs interactively</p>
                <div className="text-sm opacity-75 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md mx-auto font-mono text-cyan-300">
                  <p>• @react-three/fiber</p>
                  <p>• OrbitControls</p>
                  <p>• Metallic Shaders</p>
                  <p>• Technical Grid</p>
                  <p>• Zoom &amp; Rotate</p>
                  <p>• Exploded Views</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}
    </motion.div>
  )
}

