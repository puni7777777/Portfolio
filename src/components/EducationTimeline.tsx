'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import type { Education } from '@/data/types'
import { cn } from '@/lib/utils'

interface EducationTimelineProps {
  education: Education[]
}

export const EducationTimeline = ({ education }: EducationTimelineProps) => {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-blue-700"></div>
      
      {education.map((edu, index) => (
        <motion.div
          key={edu.school}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={cn(
            'mb-12 flex justify-between items-center relative',
            index % 2 === 0 ? 'flex-row-reverse' : ''
          )}
        >
          <div className="w-5/12">
            <Card glow={false} className="glass p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
              <p className="text-blue-400 font-semibold mb-2">{edu.school}</p>
              <p className="text-gray-300 mb-3">{edu.location} • {edu.year}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {edu.gpa && <span className="text-purple-400 font-semibold">GPA: {edu.gpa}</span>}
                {edu.percentage && <span className="text-green-400 font-semibold">%: {edu.percentage}</span>}
              </div>
            </Card>
          </div>
          <div className="w-2/12 flex justify-center relative z-10">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg border-4 border-black ring-8 ring-white/10 ring-offset-2 ring-offset-black"></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

