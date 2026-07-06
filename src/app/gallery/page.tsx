'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { galleryItems } from '@/data/gallery'

export default function Gallery() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 lg:p-12 py-20"
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
          Engineering Gallery
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          CAD renders, technical drawings, certifications and engineering artwork
        </motion.p>
      </motion.section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group"
          >
            <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 h-64 lg:h-72 relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image 
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button variant="glass" size="lg" className="glow-hover">
          View All Projects →
        </Button>
      </div>
    </motion.div>
  )
}

