'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { resume } from '@/data/resume'
import type { Education } from '@/data/types'
import Image from 'next/image'
import { Download } from 'lucide-react'

export default function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 lg:p-12 py-20 max-w-4xl"
    >
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          Resume / CV
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Download my detailed professional resume and explore my engineering journey
        </motion.p>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card header="📄 PDF Resume (ATS Optimized)">
            <div className="text-center py-12">
              <motion.div 
                className="glass-strong w-64 h-96 mx-auto rounded-3xl border-4 border-dashed border-purple-500/50 p-8 flex flex-col items-center justify-center mb-8 glow-hover"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="w-24 h-24 text-purple-400 mb-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">resume_fixed.pdf</h3>
                <p className="text-gray-400 mb-8 text-sm">Machine readable</p>
              </motion.div>
              <Button variant="glass" size="lg" className="glow-hover w-full">
                <Link href="/resume/resume_fixed.pdf" download className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download PDF
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card header="📝 LaTeX Source">
            <div className="text-center py-12">
              <motion.div 
                className="glass-strong w-64 h-96 mx-auto rounded-3xl border-4 border-dashed border-blue-500/50 p-8 flex flex-col items-center justify-center mb-8 glow-hover"
                whileHover={{ scale: 1.05, rotateY: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="w-24 h-24 text-blue-400 mb-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">resume_fixed.tex</h3>
                <p className="text-gray-400 mb-8 text-sm">Source code</p>
              </motion.div>
              <Button variant="glass" size="lg" className="glow-hover w-full">
                <Link href="/resume/resume_fixed.tex" download className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Download LaTeX
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

        <Card className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            {resume.summary}
          </h2>
        </Card>

        <div className="grid gap-8 max-w-4xl mx-auto mt-12">
          <Card header="Experience">
            <div className="space-y-6">
              {resume.experience.map((exp, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                  <p className="text-purple-400 font-semibold text-xl mb-4">{exp.company}, {exp.location}</p>
                  <p className="text-gray-300 mb-6">{exp.period}</p>
                  <ul className="space-y-3">
                    {exp.achievements.map((ach, aIndex) => (
                      <li key={aIndex} className="flex items-start gap-3 text-gray-200">
                        <span className="glass w-6 h-6 rounded-full flex-shrink-0 mt-0.5 font-bold text-purple-400 text-xs flex items-center justify-center">✓</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card header="Skills">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {resume.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="glass-strong px-6 py-4 rounded-xl text-white font-semibold text-center hover:bg-white/20 transition-all glow-hover"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </Card>

          <Card header="Education">
            <div className="grid md:grid-cols-2 gap-8">
              {(resume.education as readonly Education[]).map((edu, index) => (
                <motion.div key={index} className="glass p-8 rounded-2xl text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                  <p className="text-gray-300 mb-2">{edu.school}, {edu.location}</p>
                  <p className="text-purple-400 font-semibold">{edu.year}</p>
                  {edu.gpa && <p className="text-blue-400 font-semibold mt-2">{edu.gpa}</p>}
                  {edu.percentage && <p className="text-blue-400 font-semibold mt-2">{edu.percentage}</p>}
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

      <div className="text-center mt-16">
        <Button asChild variant="outline" size="lg">
          <Link href="/contact" className="text-xl">
            Let&apos;s Collaborate →
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

