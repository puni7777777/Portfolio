'use client';

import { useState, useEffect, useRef } from 'react';

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
];

const getRandomText = () => sampleTexts[Math.floor(Math.random() * sampleTexts.length)];

export default function TypingPractice() {
  const [currentText, setCurrentText] = useState(getRandomText());
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [highestWpm, setHighestWpm] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('highestWpm');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
    }
    if (userInput.length === currentText.length) {
      setEndTime(Date.now());
      setIsFinished(true);
    }
  }, [userInput, startTime, currentText]);

  useEffect(() => {
    if (startTime && endTime) {
      const timeInMinutes = (endTime - startTime) / 60000;
      const wordsTyped = userInput.split(' ').length;
      const currentWpm = Math.round(wordsTyped / timeInMinutes);
      setWpm(currentWpm);

      if (currentWpm > highestWpm) {
        setHighestWpm(currentWpm);
        if (typeof window !== 'undefined') {
          localStorage.setItem('highestWpm', currentWpm.toString());
        }
      }

      let correctChars = 0;
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === currentText[i]) {
          correctChars++;
        }
      }
      setAccuracy(Math.round((correctChars / userInput.length) * 100));
    }
  }, [endTime, startTime, userInput, currentText, highestWpm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const resetTest = () => {
    setCurrentText(getRandomText());
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const renderText = () => {
    return currentText.split('').map((char: string, index: number) => {
      let className = '';
      if (index < userInput.length) {
        className = userInput[index] === char ? 'text-green-500' : 'text-red-500 bg-red-200';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-500">Typing Practice</h1>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 p-4 bg-gray-800 rounded-lg text-white">
          {renderText()}
        </div>
        <textarea
          ref={textareaRef}
          value={userInput}
          onChange={handleInputChange}
          disabled={isFinished}
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Start typing here..."
        />
        <div className="mt-4 flex justify-between items-center">
          <div className="text-lg">
            <p>WPM: <span className="font-bold text-purple-500">{wpm}</span></p>
            <p>Accuracy: <span className="font-bold text-purple-500">{accuracy}%</span></p>
            <p>Highest WPM: <span className="font-bold text-blue-500">{highestWpm}</span></p>
          </div>
          <button
            onClick={resetTest}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
          >
            Reset
          </button>
        </div>
        {isFinished && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg">
            <p className="text-green-800 font-bold">Test Completed!</p>
            <p>Your WPM: {wpm}</p>
            <p>Accuracy: {accuracy}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
