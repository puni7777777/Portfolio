'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { resume } from '@/data/resume'
import { skills } from '@/data/skills'
import type { Education } from '@/data/types'
import { Download, Mail, Phone, Github, MapPin, Briefcase, GraduationCap, Award, FolderGit2, Wrench } from 'lucide-react'

export default function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 sm:px-6 lg:p-12 py-10 sm:py-20 max-w-4xl"
    >
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 sm:mb-16"
      >
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 pb-2 leading-tight bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
          {resume.name}
        </h1>
        <p className="text-lg sm:text-2xl text-purple-400 font-semibold mb-2">
          {resume.title}
        </p>
        <p className="text-sm sm:text-base text-gray-300 font-medium mb-6">
          {resume.subtitle}
        </p>

        {/* Contact info bar */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-gray-300 font-medium text-xs sm:text-base border-y border-white/10 py-4 max-w-2xl mx-auto">
          <a href={`mailto:${resume.email}`} className="flex items-center gap-2 hover:text-purple-400 transition-colors">
            <Mail className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <span>{resume.email}</span>
          </a>
          <a href={`tel:${resume.phone}`} className="flex items-center gap-2 hover:text-purple-400 transition-colors">
            <Phone className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <span>{resume.phone}</span>
          </a>
          <a href={resume.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
            <Github className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <span>github.com/puni7777777</span>
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
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-normal">
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

        {/* Technical Skills - Categorized */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card header="Core Technical Skills" className="glass-strong border border-white/10">
            <div className="space-y-6">
              {skills.map((skillGroup, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5 text-purple-400" />
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, sIndex) => (
                      <span
                        key={sIndex}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-purple-500/15 to-blue-500/15 rounded-xl text-zinc-200 font-medium text-xs sm:text-sm border border-purple-500/20 hover:border-purple-400/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>

        {/* Engineering Projects */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card header="Key Engineering Projects" className="glass-strong border border-white/10">
            <div className="space-y-6">
              {resume.projects.map((proj, index) => (
                <div key={index} className="glass p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden bg-gradient-to-r from-cyan-500/5">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                        <FolderGit2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        {proj.title}
                      </h3>
                      <p className="text-cyan-400 font-mono text-xs sm:text-sm font-semibold">{proj.tech}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {proj.description.map((item, dIndex) => (
                      <li key={dIndex} className="flex items-start gap-3 text-gray-200 text-sm sm:text-base leading-relaxed">
                        <span className="glass w-6 h-6 rounded-full flex-shrink-0 mt-0.5 font-bold text-cyan-400 text-xs flex items-center justify-center border border-cyan-500/20">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center justify-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      <span>{edu.degree}</span>
                    </h3>
                    <p className="text-gray-300 text-sm mb-1 font-medium">{edu.school}</p>
                    <p className="text-gray-400 text-xs mb-4">{edu.location}</p>
                  </div>
                  <div>
                    <p className="text-purple-400 font-mono font-semibold text-sm mb-2">{edu.year}</p>
                    {edu.gpa && (
                      <p className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-xs rounded-full">
                        CGPA: {edu.gpa}
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
