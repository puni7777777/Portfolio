'use client'

import Link from 'next/link'
import { projects } from '@/data/projects'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'

interface ProjectPageProps {
  id: string
}

export default function ClientProjectPage({ id }: ProjectPageProps) {
  const project = projects.find(p => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 lg:p-12 min-h-screen"
    >
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <Card className="max-w-4xl mx-auto glass-strong">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            {project.title}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {project.description}
          </motion.p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button variant="glass" size="lg" className="flex-1">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full text-center">
                View Source Code
              </a>
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              <Link href="/projects" className="block w-full text-center">
                ← Back to Projects
              </Link>
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Design Process */}
      <section className="mb-24">
        <Card className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white">Design Process</h2>
          <div className="space-y-4 text-lg text-gray-200">
            {project.designProcess?.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-4"
              >
                <span className="w-8 h-8 glass rounded-full flex items-center justify-center font-bold text-purple-400 text-sm">
                  {index + 1}
                </span>
                <span>{step}</span>
              </motion.div>
            )) || (
              <p className="text-gray-400 italic text-center py-8">Design process documentation coming soon...</p>
            )}
          </div>
        </Card>
      </section>

      {/* Software/Tools */}
      {project.software && project.software.length > 0 && (
        <section className="mb-24">
          <Card className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">
              {project.category === 'Mechanical' ? 'CAD Software Used' : 'Tech Stack'}
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {project.software.map((tool, index) => (
                <motion.div 
                  key={tool}
                  className="glass-strong px-6 py-3 rounded-xl text-white font-semibold"
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
          <Card className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-white text-center">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.specs.map((spec, index) => (
                <motion.div 
                  key={spec.label}
                  className="flex justify-between glass p-6 rounded-xl bg-gradient-to-r from-purple-500/5"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <span className="text-gray-300">{spec.label}:</span>
                  <span className="font-bold text-xl text-white flex items-baseline gap-1">
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
          <Card className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-white text-center">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.performance.map((metric, index) => (
                <motion.div 
                  key={metric.label}
                  className="glass-strong p-8 rounded-2xl text-center border-2 border-purple-500/30 relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-blue-500/10 blur-xl -z-10" />
                  <h3 className="text-4xl font-black text-white mb-2">{metric.value}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-purple-400">{metric.label}</span>
                    {metric.unit && (
                      <span className="text-sm text-gray-400 font-mono uppercase tracking-wider">{metric.unit}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* 3D Viewer Placeholder */}
      {project.category === 'Mechanical' && (
        <section className="mb-24">
          <Card className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-white text-center">3D CAD Model Viewer</h2>
            <div className="glass-strong rounded-2xl p-8 min-h-[500px] flex items-center justify-center border-2 border-purple-500/30 bg-gradient-to-b from-gray-900/50">
              <div className="text-center text-gray-300">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Ready for 3D Model</h3>
                <p className="mb-8 text-lg">Upload .STL or .OBJ files to showcase your CAD designs</p>
                <div className="text-sm opacity-75 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md mx-auto">
                  <p>• @react-three/fiber</p>
                  <p>• OrbitControls</p>
                  <p>• Realistic materials</p>
                  <p>• Cross-sections</p>
                  <p>• Measurements</p>
                  <p>• Exploded views</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}
    </motion.div>
  )
}

