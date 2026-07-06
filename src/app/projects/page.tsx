'use client'

import Link from 'next/link'
import { projects } from '@/data/projects'
import { motion } from 'framer-motion'

export default function Projects() {
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
        className="text-center mb-20"
      >
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          Engineering Projects
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
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
            <div 
              className="block min-h-[380px] flex flex-col glass-strong rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:scale-[1.02] transition-all duration-500 overflow-hidden shadow-xl glow-card cursor-pointer"
            >
              {/* Header with Category Badge */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                <Link href={`/projects/${project.id}`}>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer hover:underline">
                    {project.title}
                  </h3>
                </Link>
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full text-xs font-semibold border border-purple-500/30 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              {/* Description - Truncated */}
              <p className="text-gray-300 line-clamp-3 flex-1 mb-auto leading-relaxed text-sm">
                {project.description}
              </p>

              {/* Fixed Bottom Section */}
              <div className="mt-auto space-y-3 pt-4">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech?.slice(0,4).map((tech, i) => (
                    <span key={i} className="px-2 py-px bg-white/5 text-xs text-gray-400 font-mono rounded border border-gray-700/50">
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Buttons */}
                <div className="flex gap-3">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="flex-1 glass px-5 py-2.5 rounded-xl text-white font-medium text-sm border border-white/20 hover:bg-white/10 hover:shadow-purple-500/20 transition-all duration-300 glow-hover"
                  >
                    View Project
                  </Link>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-transparent px-5 py-2.5 rounded-xl text-purple-400 font-medium text-sm border-2 border-purple-400/50 hover:bg-purple-500/10 hover:text-purple-300 hover:shadow-purple-500/20 transition-all duration-300 glow-hover flex items-center justify-center gap-1"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

