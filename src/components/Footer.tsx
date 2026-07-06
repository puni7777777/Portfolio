import Link from 'next/link'
import { Github, Linkedin, Mail, Download } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="glass-strong border-white/10 backdrop-blur-2xl mt-24 pt-16 pb-12 relative overflow-hidden shadow-2xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
              PUNITH
            </div>
            <p className="text-gray-200 text-sm leading-relaxed max-w-md">
              Mechanical Engineer | CAD Design Specialist | Precision
              Engineering
            </p>
            <div className="flex gap-2 pt-4">
              <Link
                href="https://github.com/puni7777777"
                className="p-3 hover:bg-white/10 rounded-xl transition-all glow-hover hover:scale-110"
              >
                <Github className="w-5 h-5 text-gray-300 hover:text-purple-400" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/punith-kumar-reddy-236b89252?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                className="p-3 hover:bg-white/10 rounded-xl transition-all glow-hover hover:scale-110"
              >
                <Linkedin className="w-5 h-5 text-gray-300 hover:text-blue-400" />
              </Link>
              <Link
                href="mailto:punithkumar1732003@gmail.com"
                className="p-3 hover:bg-white/10 rounded-xl transition-all glow-hover hover:scale-110"
              >
                <Mail className="w-5 h-5 text-gray-300 hover:text-pink-400" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Navigation</h4>
            <div className="space-y-3">
              <Link
                href="/about"
                className="block text-gray-300 hover:text-purple-400 transition-all glow-hover text-sm py-2 px-3 rounded-lg hover:bg-white/10"
              >
                About Me
              </Link>
              <Link
                href="/projects"
                className="block text-gray-300 hover:text-purple-400 transition-all glow-hover text-sm py-2 px-3 rounded-lg hover:bg-white/10"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="block text-gray-300 hover:text-purple-400 transition-all glow-hover text-sm py-2 px-3 rounded-lg hover:bg-white/10"
              >
                Blog
              </Link>
              <Link
                href="/gallery"
                className="block text-gray-300 hover:text-purple-400 transition-all glow-hover text-sm py-2 px-3 rounded-lg hover:bg-white/10"
              >
                Gallery
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Expertise</h4>
            <div className="space-y-2 text-sm">
              <div className="text-purple-400 font-semibold mb-1">
                CAD Software:
              </div>
              <span className="text-gray-300">
                SolidWorks, AutoCAD, CATIA, NX UG
              </span>
              <div className="text-blue-400 font-semibold mt-3 mb-1">
                Analysis:
              </div>
              <span className="text-gray-300">ANSYS, FEA Simulation</span>
              <div className="text-green-400 font-semibold mt-3 mb-1">
                Education:
              </div>
              <span className="text-gray-300">
                B.Tech Mechanical Engineering
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact</h4>
            <Link
              href="/resume.pdf"
              className="block w-full mb-6 glow-hover shadow-2xl"
            >
              <button className="glass w-full px-6 py-3 rounded-xl text-white font-semibold hover:bg-purple-600 transition-all duration-300 hover:scale-[1.02] glow-card">
                <Download className="w-5 h-5 inline mr-2" />
                Download Resume
              </button>
            </Link>
            <div className="text-xs space-y-1">
              <p className="text-gray-400">📧 punithkumar1732003@gmail.com</p>
              <p className="text-gray-400">📱 +91-93908 82204</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 pb-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            © {new Date().getFullYear()} PUNITH KUMAR REDDY. All Rights
            Reserved.
          </p>
          <p className="text-xs text-gray-500 glow-hover">
            Crafted with Next.js 15 • Tailwind CSS 4 • Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

