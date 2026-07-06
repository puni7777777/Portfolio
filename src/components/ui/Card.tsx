'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
  header?: string
  glow?: boolean
  animate?: boolean
}

export const Card = ({ className, children, header, glow = true, animate = true }: CardProps) => {
  const MotionDiv = motion.div
  const content = (
    <div
      className={cn(
        'glass-strong rounded-2xl p-6 md:p-8 border-0 shadow-2xl glow-card',
        glow && 'hover:shadow-purple-500/60',
        className
      )}
    >
      {header && (
        <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">
          {header}
        </h3>
      )}
      {children}
    </div>
  )

  if (!animate) {
    return content
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {content}
    </MotionDiv>
  )
}

