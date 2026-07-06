'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function TextHandle() {
  const [text, setText] = useState('Enter Text Here')
  const [find, setFind] = useState('')
  const [replace, setReplace] = useState('')
  const [findMessage, setFindMessage] = useState('')
  const [convertedText, setConvertedText] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Stats
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const charCount = text.length
  const readingTime = Math.round(wordCount / 200) // 200 WPM average

  // Core text functions (all existing logic preserved)
  const capsText = () => setText(text.toUpperCase())
  const lowerText = () => setText(text.toLowerCase())
  const sentenceCase = () => {
    const newText = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
    setText(newText)
  }
  const capsEachword = () => {
    const newText = text.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
    setText(newText)
  }
  const removeLineBreaks = () => setText(text.replace(/[\r\n]+/gm, ' '))
  const addLineBreaks = () => {
    const rmSpaces = text.replaceAll('. ', '.')
    const newText = rmSpaces.replaceAll('.', '.\n')
    setText(newText)
  }
  const addNumberedLineBreaks = () => {
    const processedText = text.replace(/^\d+\.\s*/gm, '')
    const lines = processedText.split('\n').filter(line => line.trim())
    const numberedLines = lines.map((line, index) => `${index + 1}. ${line}`)
    setText(numberedLines.join('\n\n'))
  }
  const removeNumbering = () => setText(text.replace(/^\d+\.\s*/gm, ''))
  
  const toggleCase = () => {
    const chars = text.split('')
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i]
      if (char >= 'A' && char <= 'Z') {
        chars[i] = String.fromCharCode(char.charCodeAt(0) + 32)
      } else if (char >= 'a' && char <= 'z') {
        chars[i] = String.fromCharCode(char.charCodeAt(0) - 32)
      }
    }
    setText(chars.join(''))
  }

  const clear = () => setText('')
  const selectAll = () => textareaRef.current?.select()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  const numToText = async () => {
    try {
      const { toWords } = await import('number-to-words')
      const result = toWords(text)
      setConvertedText(result.replaceAll(',', ''))
      setTimeout(() => setConvertedText(''), 5000)
    } catch {
      setConvertedText('Enter number to convert')
      setTimeout(() => setConvertedText(''), 3000)
    }
  }

  const findText = () => {
    if (textareaRef.current) {
      const index = textareaRef.current.value.indexOf(find)
      if (index !== -1) {
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(index, index + find.length)
        setFindMessage('')
      } else {
        setFindMessage('Text not found')
        setTimeout(() => setFindMessage(''), 3000)
      }
    }
  }

  const replaceText = () => setText(text.replace(find, replace))
  const replaceAll = () => setText(text.replaceAll(find, replace))

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            TextHandle Pro
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Advanced text editor with power tools for formatting, case conversion, and analysis
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass p-6 rounded-2xl text-center border border-white/10">
            <div className="text-3xl font-black text-purple-400 mb-1">{wordCount}</div>
            <div className="text-gray-400 uppercase text-xs font-semibold tracking-wide">Words</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center border border-white/10">
            <div className="text-3xl font-black text-blue-400 mb-1">{charCount}</div>
            <div className="text-gray-400 uppercase text-xs font-semibold tracking-wide">Characters</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center border border-white/10">
            <div className="text-3xl font-black text-emerald-400 mb-1">{readingTime}</div>
            <div className="text-gray-400 uppercase text-xs font-semibold tracking-wide">Read Time</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center border border-white/10">
            <div className="text-3xl font-black text-orange-400 mb-1">{text.split('\n').length}</div>
            <div className="text-gray-400 uppercase text-xs font-semibold tracking-wide">Lines</div>
          </div>
        </motion.div>

        {/* Main Editor Section */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
        >
          <div className="glass-strong rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-wrap gap-3 mb-8 items-center">
              <h2 className="text-3xl font-bold text-white flex-1">Text Editor</h2>
              <Button variant="glass" onClick={selectAll} className="glow-hover">
                Select All
              </Button>
              <Button variant="glass" onClick={copyToClipboard} className="glow-hover">
                Copy
              </Button>
              <Button variant="outline" onClick={clear} className="glow-hover">
                Clear
              </Button>
            </div>

            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              rows={15}
              className="w-full p-8 bg-black/30 backdrop-blur-xl border border-purple-500/30 rounded-3xl resize-vertical text-lg leading-relaxed font-mono text-white focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all duration-300 shadow-[0_0_0_0_rgba(168,85,247,0)] hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] focus:shadow-[0_0_30px_rgba(168,85,247,0.3)] placeholder:text-gray-500"
              placeholder="Paste or type your text here... Support for line numbering, case conversion, and more"
            />
          </div>
        </motion.div>

        {/* Main Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-16"
        >
          <Button onClick={capsText} variant="glass" className="glow-hover h-14 text-base">UPPERCASE</Button>
          <Button onClick={lowerText} variant="glass" className="glow-hover h-14 text-base">lowercase</Button>
          <Button onClick={sentenceCase} variant="glass" className="glow-hover h-14 text-base">Sentence</Button>
          <Button onClick={capsEachword} variant="glass" className="glow-hover h-14 text-base">Capitalize</Button>
          <Button onClick={toggleCase} variant="glass" className="glow-hover h-14 text-base">Toggle</Button>
          <Button onClick={removeLineBreaks} variant="glass" className="glow-hover h-14 text-base">No Breaks</Button>
          <Button onClick={addLineBreaks} variant="glass" className="glow-hover h-14 text-base">Add Breaks</Button>
          <Button onClick={addNumberedLineBreaks} variant="glass" className="glow-hover h-14 text-base">Number Lines</Button>
          <Button onClick={removeNumbering} variant="glass" className="glow-hover h-14 text-base">Remove Numbers</Button>
          <Button onClick={numToText} variant="glass" className="glow-hover h-14 text-base">Num → Words</Button>
        </motion.div>

        {/* Find & Replace */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-strong rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
              🔍 Find &amp; Replace
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
              <div>
                <label className="block mb-2 text-gray-300 font-semibold">Find</label>
                <input
                  type="text"
                  value={find}
                  onChange={(e) => setFind(e.target.value)}
                  className="w-full p-4 bg-black/50 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent glass-hover placeholder:text-gray-500"
                  placeholder="Enter text to find..."
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300 font-semibold">Replace</label>
                <input
                  type="text"
                  value={replace}
                  onChange={(e) => setReplace(e.target.value)}
                  className="w-full p-4 bg-black/50 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent glass-hover placeholder:text-gray-500"
                  placeholder="Enter replacement text..."
                />
              </div>
              <div className="space-y-3">
                <Button onClick={findText} variant="glass" size="lg" className="w-full glow-hover">Find</Button>
                <Button onClick={replaceText} variant="glass" size="lg" className="w-full glow-hover">Replace</Button>
                <Button onClick={replaceAll} variant="glass" size="lg" className="w-full glow-hover">Replace All</Button>
              </div>
            </div>

            {findMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 rounded-2xl border-2 border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-center font-semibold"
              >
                {findMessage}
              </motion.div>
            )}
            {convertedText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-center font-mono text-lg"
              >
                {convertedText}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

