'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import type { Experience } from '@/data/types'
import { cn } from '@/lib/utils'

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-purple-700"></div>
      
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
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
              <h3 className="text-xl font-bold text-white mb-2">{experience.role}</h3>
              <p className="text-purple-400 font-semibold mb-2">{experience.company}, {experience.location}</p>
              <p className="text-gray-300 mb-3 text-sm">{experience.period}</p>
              <ul className="mt-4 space-y-2">
                {experience.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-200">
                    <span className="w-5 h-5 mt-0.5 flex-shrink-0 text-purple-400">•</span>
                    <span className="text-gray-400 leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>

            </Card>
          </div>
          <div className="w-2/12 flex justify-center relative z-10">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full shadow-lg border-4 border-black ring-8 ring-white/10 ring-offset-2 ring-offset-black"></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

