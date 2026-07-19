'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. This is a sample text for typing practice. Try to type as fast and accurately as possible.",
  "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell.",
  "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
  "To be or not to be, that is the question. Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
  "All happy families are alike; each unhappy family is unhappy in its own way. Everything was in confusion in the Oblonskys' house.",
  "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
  "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore.",
  "The man in black fled across the desert, and the gunslinger followed. The desert was the apotheosis of all deserts, huge, standing to the sky.",
  "Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the Galaxy lies a small unregarded yellow sun.",
  "It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast."
]

const getRandomText = () => sampleTexts[Math.floor(Math.random() * sampleTexts.length)]

export default function TypingPractice() {
  const [currentText, setCurrentText] = useState(getRandomText())
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isFinished, setIsFinished] = useState(false)
  const [highestWpm, setHighestWpm] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('highestWpm')
      return saved ? parseInt(saved, 10) : 0
    }
    return 0
  })
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now())
    }
    if (userInput.length === currentText.length) {
      setEndTime(Date.now())
      setIsFinished(true)
    }
  }, [userInput, startTime, currentText])

  useEffect(() => {
    if (startTime && endTime) {
      const timeInMinutes = (endTime - startTime) / 60000
      const wordsTyped = userInput.split(' ').length
      const currentWpm = Math.round(wordsTyped / timeInMinutes)
      setWpm(currentWpm)

      if (currentWpm > highestWpm) {
        setHighestWpm(currentWpm)
        if (typeof window !== 'undefined') {
          localStorage.setItem('highestWpm', currentWpm.toString())
        }
      }

      let correctChars = 0
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === currentText[i]) {
          correctChars++
        }
      }
      setAccuracy(Math.round((correctChars / userInput.length) * 100))
    }
  }, [endTime, startTime, userInput, currentText, highestWpm])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value)
  }

  const resetTest = () => {
    setCurrentText(getRandomText())
    setUserInput('')
    setStartTime(null)
    setEndTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsFinished(false)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const renderText = () => {
    return currentText.split('').map((char: string, index: number) => {
      let className = 'text-gray-500 font-mono'
      if (index < userInput.length) {
        className = userInput[index] === char ? 
          'text-green-400 font-mono' : 
          'text-red-500 bg-red-950/40 rounded font-mono'
      }
      return (
        <span 
          key={index} 
          className={`${className} inline-block min-w-[0.6em] text-lg`}
        >
          {char}
        </span>
      )
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          Typing Mastery
        </motion.h1>

        {/* Stats Bar */}
        <motion.div 
          className="flex justify-center gap-8 mb-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass text-center p-6 rounded-2xl min-w-[140px]">
            <div className="text-3xl md:text-4xl font-black text-purple-400 mb-1">
              {wpm}
            </div>
            <div className="text-sm uppercase tracking-wider text-gray-400 font-semibold">
              WPM
            </div>
          </div>
          <div className="glass text-center p-6 rounded-2xl min-w-[140px]">
            <div className="text-3xl md:text-4xl font-black text-emerald-400 mb-1">
              {accuracy}%
            </div>
            <div className="text-sm uppercase tracking-wider text-gray-400 font-semibold">
              Accuracy
            </div>
          </div>
          <div className="glass text-center p-6 rounded-2xl min-w-[140px]">
            <div className="text-3xl md:text-4xl font-black text-blue-400 mb-1">
              {highestWpm}
            </div>
            <div className="text-sm uppercase tracking-wider text-gray-400 font-semibold">
              Best
            </div>
          </div>
        </motion.div>

        {/* Main Typing Area */}
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass-strong rounded-3xl p-8 lg:p-12 border border-white/10 max-w-7xl mx-auto">
            {/* Sample Text */}
            <div className="glass p-6 lg:p-8 rounded-2xl mb-8 overflow-auto max-h-[200px] border border-white/10">
              <div className="font-mono text-lg lg:text-xl leading-relaxed tracking-wide">
                {renderText()}
              </div>
            </div>

            {/* Typing Input */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={userInput}
                onChange={handleInputChange}
                disabled={isFinished}
                className="w-full h-[250px] p-8 text-xl lg:text-2xl font-mono leading-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl resize-none focus:outline-none focus:border-purple-500/50 focus:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 placeholder:text-gray-500 placeholder:font-mono"
                placeholder="Click here and start typing to begin your test..."
              />
              <div className="absolute top-4 right-4 text-gray-500 text-sm">
                {userInput.length}/{currentText.length}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center mt-12 gap-4">
            <motion.button
              onClick={resetTest}
              className="glass-strong px-8 py-4 rounded-2xl text-lg font-bold border border-white/20 hover:bg-white/10 hover:shadow-purple-500/20 transition-all duration-300 glow-hover text-white shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFinished ? 'New Test' : 'Reset'}
            </motion.button>
          </div>

          {isFinished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-16 text-center"
            >
              <div className="glass-strong max-w-2xl mx-auto p-12 rounded-3xl border border-green-500/30">
                <div className="text-5xl mb-6">🏆</div>
                <h2 className="text-3xl font-bold text-green-400 mb-4">Test Complete!</h2>
                <p className="text-xl text-gray-300 mb-8">Final Score: <span className="text-3xl font-bold text-green-400">{wpm} WPM</span></p>
              </div> 
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

