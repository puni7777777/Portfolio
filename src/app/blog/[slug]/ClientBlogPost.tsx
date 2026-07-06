'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'
import { notFound } from 'next/navigation'

interface ClientBlogPostProps {
  slug: string
}

export default function ClientBlogPost({ slug }: ClientBlogPostProps) {
  const post = blogPosts.find((p) => p.slug === slug)


  if (!post) {
    notFound()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 lg:p-12 py-20 max-w-4xl"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button variant="outline" size="sm" className="mb-8">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </Button>
        
        <Card className="glass-strong">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 rounded-full text-sm font-semibold border border-purple-500/30">
              {post.category}
            </span>
            <div className="text-sm text-gray-400">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
          
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            {post.title}
          </motion.h1>
          
          <article className="prose prose-invert prose-headings:text-white prose-headings:font-bold prose-a:text-purple-400 prose-a:underline prose-strong:text-white max-w-none leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\\n/g, '<br />') }} />
          </article>
        </Card>
      </motion.div>
    </motion.div>
  )
}

