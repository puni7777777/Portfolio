'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { resume } from '@/data/resume'
import type { Education } from '@/data/types'
import { Download, Mail, Phone, Github, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react'

export default function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 lg:p-12 py-20 max-w-4xl"
    >
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
          {resume.name}
        </h1>
        <p className="text-xl md:text-2xl text-purple-400 font-semibold mb-6">
          Multidisciplinary Engineer • Mechanical Design & Web Development
        </p>

        {/* Contact info bar */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-300 font-medium text-sm md:text-base border-y border-white/10 py-4 max-w-2xl mx-auto">
          <a href={`mailto:${resume.email}`} className="flex items-center gap-2 hover:text-purple-400 transition-colors">
            <Mail className="w-4 h-4 text-purple-500" />
            {resume.email}
          </a>
          <a href={`tel:${resume.phone}`} className="flex items-center gap-2 hover:text-purple-400 transition-colors">
            <Phone className="w-4 h-4 text-purple-500" />
            {resume.phone}
          </a>
          <a href={resume.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
            <Github className="w-4 h-4 text-purple-500" />
            github.com/puni7777777
          </a>
        </div>
      </motion.div>

      {/* Main Resume Sections Wrapper */}
      <div className="grid gap-12 max-w-3xl mx-auto">
        
        {/* Professional Summary */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="glass-strong border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Award className="w-6 h-6 text-purple-400" />
              Professional Profile
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed font-normal">
              {resume.summary}
            </p>
          </Card>
        </motion.section>

        {/* Professional Experience */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card header="Experience" className="glass-strong border border-white/10">
            <div className="space-y-6">
              {resume.experience.map((exp, index) => (
                <div key={index} className="glass p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden bg-gradient-to-r from-purple-500/5">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-purple-400" />
                        {exp.role}
                      </h3>
                      <p className="text-purple-400 font-semibold text-lg">{exp.company}</p>
                    </div>
                    <div className="text-left md:text-right font-mono text-sm text-gray-400">
                      <p className="flex items-center md:justify-end gap-1.5 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-purple-400" />
                        {exp.location}
                      </p>
                      <p className="text-gray-300 font-semibold">{exp.period}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.achievements.map((ach, aIndex) => (
                      <li key={aIndex} className="flex items-start gap-3 text-gray-200 text-base leading-relaxed">
                        <span className="glass w-6 h-6 rounded-full flex-shrink-0 mt-0.5 font-bold text-purple-400 text-xs flex items-center justify-center border border-purple-500/20">✓</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>

        {/* Skills Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card header="Core Technical Skills" className="glass-strong border border-white/10">
            <div className="flex flex-wrap gap-3">
              {resume.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="glass-strong px-4 py-2.5 rounded-xl text-white font-semibold text-center border border-white/10 hover:bg-white/10 hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.0 }}
                  transition={{ delay: index * 0.01 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </Card>
        </motion.section>

        {/* Education */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card header="Education" className="glass-strong border border-white/10">
            <div className="grid md:grid-cols-2 gap-6">
              {(resume.education as readonly Education[]).map((edu, index) => (
                <motion.div 
                  key={index} 
                  className="glass p-6 rounded-2xl text-center border border-white/5 bg-gradient-to-b from-purple-500/5 flex flex-col justify-between"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-400" />
                      {edu.degree}
                    </h3>
                    <p className="text-gray-300 text-sm mb-1">{edu.school}</p>
                    <p className="text-gray-400 text-xs mb-4">{edu.location}</p>
                  </div>
                  <div>
                    <p className="text-purple-400 font-mono font-semibold text-sm mb-2">{edu.year}</p>
                    {edu.gpa && (
                      <p className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-xs rounded-full">
                        GPA: {edu.gpa}
                      </p>
                    )}
                    {edu.percentage && (
                      <p className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-xs rounded-full">
                        Percentage: {edu.percentage}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.section>
      </div>

      {/* Dynamic CTAs at the bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mt-20 space-y-6 max-w-sm mx-auto"
      >
        <a 
          href="/resume.pdf" 
          download="AVULA_PUNITH_KUMAR_REDDY_Resume.pdf"
          className="inline-flex items-center justify-center gap-2.5 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
        >
          <Download className="w-5 h-5" />
          Download PDF Resume
        </a>
      </motion.div>
    </motion.div>
  )
}
