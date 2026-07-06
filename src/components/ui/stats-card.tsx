import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  unit?: string
  className?: string
}

export const StatsCard = ({ title, value, unit, className }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        'glass-strong p-6 rounded-2xl text-center border-white/20 shadow-2xl glow-card',
        className
      )}
    >
      <motion.div 
        className="text-3xl md:text-4xl font-bold text-white mb-2"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
      >
        {value}
        {unit && <span className="text-xl opacity-75 ml-1">{unit}</span>}
      </motion.div>
      <div className="text-gray-300 font-medium">{title}</div>
    </motion.div>
  )
}

