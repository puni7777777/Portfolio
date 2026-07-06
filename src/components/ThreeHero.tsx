'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Button } from './ui/Button'

function CADModel({ url }: { url: string }) {
  return (
    <mesh>
      <torusKnotGeometry args={[1, 0.4, 100, 16]} />
      <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={['#020617']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <CADModel url="/models/demo.glb" />
      
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
      
      <Html position={[0, -2, 0]} center>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-strong rounded-2xl p-6 text-white text-center max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Interactive 3D CAD Viewer
          </h2>
          <p className="text-gray-200 mb-6">Drag to rotate • Scroll to zoom</p>
          <p className="text-sm opacity-75">Ready for .STL .OBJ .GLB models</p>
        </motion.div>
      </Html>
    </Canvas>
  )
}

export const ThreeHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="h-screen w-full relative overflow-hidden rounded-3xl glass-strong border border-white/10 mt-20"
    >
      <Scene />
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <Button variant="glass" size="lg" className="glow-hover">
          View Projects →
        </Button>
      </div>
    </motion.div>
  )
}

