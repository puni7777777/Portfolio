'use client'

import Link from 'next/link'
import { blogPosts } from '@/data/blog'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function BlogPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 lg:p-12 py-20"
    >
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          Engineering Insights
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Technical articles on CAD, design principles, and mechanical engineering innovations
        </motion.p>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogPosts.slice().reverse().map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Card glow>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 rounded-full text-sm font-medium border border-purple-500/30">
                  {post.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white leading-tight">{post.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>
              <Button asChild variant="glass" size="sm" className="w-full">
                <Link href={`/blog/${post.slug}`}>
                  Read Article <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

