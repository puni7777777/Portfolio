'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { skills } from '@/data/skills'
import { bio } from '@/data/bio'
import { projects } from '@/data/projects'
import { resume } from '@/data/resume'


export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto lg:p-12 space-y-16"
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-16"
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6 drop-shadow-2xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          Hi, I&apos;m <span className="text-white">{resume.name}</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {resume.summary.slice(0, 120)}...
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button asChild size="lg" variant="glass" className="glow-hover">
            <Link href="/projects">View My Work</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="glow-hover">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center pt-36"
      >
        <motion.h2
          className="text-5xl font-bold mb-16 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-xl"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
        >
          Skills & Technologies
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <Card key={skill.category} header={skill.category} glow>
              <div className="space-y-2">
                {skill.items.map((item, i) => (
                  <motion.span
                    key={item}
                    className="block text-gray-300 text-lg font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                  >
                    • {item}
                  </motion.span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* About Preview */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Card className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {bio.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <Button asChild size="lg" variant="glass">
              <Link href="/about" className="text-xl">
                Learn more about me →
              </Link>
            </Button>
          </motion.div>
        </Card>
      </motion.section>

      {/* Featured Projects Preview */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-xl"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.slice(0, 6).map((project, index) => (
            <Card key={project.id} glow>
              <h3 className="text-xl font-bold text-white mb-4">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-6">{project.description}</p>
              <Button asChild variant="glass" size="sm">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project →
                </a>
              </Button>
            </Card>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <Button asChild size="lg" variant="glass">
            <Link href="/projects" className="text-xl">
              View All Projects
            </Link>
          </Button>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}

