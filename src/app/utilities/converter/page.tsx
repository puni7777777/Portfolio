'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

interface UnitConverterProps {
  label: string
  value: number
  fromUnit: string
  toUnit: string
  factor: number
  onValueChange: (value: number) => void
}

const UnitConverter = ({ label, value, fromUnit, toUnit, factor, onValueChange }: UnitConverterProps) => {
  const convertedValue = (value * factor).toFixed(3)

  return (
    <Card header={`${label} Converter`}>
      <div className="space-y-4 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {fromUnit}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => onValueChange(Number(e.target.value) || 0)}
              className="w-full glass-strong p-4 rounded-xl text-2xl font-bold text-white text-right focus:ring-4 focus:ring-purple-500/50"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              = {convertedValue} {toUnit}
            </label>
            <div className="w-full glass-strong p-4 rounded-xl text-2xl font-bold text-purple-400 text-right bg-gradient-to-r from-purple-500/20">
              {convertedValue}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function Converter() {
  const [pressure, setPressure] = useState(0)
  const [torque, setTorque] = useState(0)
  const [stress, setStress] = useState(0)
  const [flow, setFlow] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 lg:p-12 py-20 max-w-6xl"
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
          Mechanical Unit Converter
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Essential engineering unit conversions for CAD, analysis, and manufacturing
        </motion.p>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <UnitConverter 
          label="Pressure"
          value={pressure}
          fromUnit="psi"
          toUnit="MPa"
          factor={0.00689476}
          onValueChange={setPressure}
        />
        <UnitConverter 
          label="Torque"
          value={torque}
          fromUnit="lb-ft"
          toUnit="Nm"
          factor={1.35582}
          onValueChange={setTorque}
        />
        <UnitConverter 
          label="Stress"
          value={stress}
          fromUnit="psi"
          toUnit="MPa"
          factor={0.00689476}
          onValueChange={setStress}
        />
        <UnitConverter 
          label="Flow Rate"
          value={flow}
          fromUnit="GPM"
          toUnit="l/min"
          factor={3.78541}
          onValueChange={setFlow}
        />
      </div>

      <div className="text-center">
        <Button variant="glass" size="lg" className="glow-hover text-xl px-12 py-6">
          More Converters Coming Soon...
        </Button>
      </div>
    </motion.div>
  )
}

