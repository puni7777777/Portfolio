'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { galleryItems } from '@/data/gallery'

export default function Gallery() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 lg:p-12 py-20"
    >
      <SectionHeading
        title="Engineering Gallery"
        subtitle="CAD renders, technical drawings, certifications and engineering artwork"
        gradient="purple-blue"
      />

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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="purple" size="md">
                  {item.category}
                </Badge>
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
        <Button asChild variant="glass" size="lg" className="glow-hover">
          <Link href="/projects">
            View All Projects →
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

