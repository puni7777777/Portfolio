'use client';

import { useEffect, useState } from 'react';

export default function TextHandle() {
  const [text, setText] = useState('Enter Text Here');
  const [textCount, setTextCount] = useState(3);
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [findMessage, setFindMessage] = useState('');
  const [convertedText, setConvertedText] = useState('');

  const btnstyle = 'border-2 p-1 rounded border-purple-500 text-xl hover:bg-purple-500 transition duration-300 ease-in-out';
  const resetbtnstyle = 'p-1 border-2 rounded border-red-500 hover:bg-red-500 transition duration-300 ease-in-out';

  const toggleChars = (msg: string[]) => {
    for (let i = 0; i < msg.length; i++) {
      if (msg[i] >= 'A' && msg[i] <= 'Z') {
        msg[i] = String.fromCharCode(msg[i].charCodeAt(0) + 'a'.charCodeAt(0) - 'A'.charCodeAt(0));
      } else if (msg[i] >= 'a' && msg[i] <= 'z') {
        msg[i] = String.fromCharCode(msg[i].charCodeAt(0) + 'A'.charCodeAt(0) - 'a'.charCodeAt(0));
      }
    }
  };

  const capsText = () => {
    setText(text.toUpperCase());
  };

  const lowerText = () => {
    setText(text.toLowerCase());
  };

  const sentenceCase = () => {
    const newText = text
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
    setText(newText);
  };

  const capsEachword = () => {
    const newText = text.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
    setText(newText);
  };

  const removeLineBreaks = () => {
    const newText = text.replace(/[\r\n]/gm, ' ');
    setText(newText);
  };

  const addLineBreaks = () => {
    const rmSpaces = text.replaceAll('. ', '.');
    const newText = rmSpaces.replaceAll('.', '.\n');
    setText(newText);
  };

  const addNumberedLineBreaks = () => {
    if (text.includes('\n')) {
      // Already has linebreaks, just re-number
      const processedText = text.replace(/^\d+\.\s*/gm, '');
      const lines = processedText.split('\n');
      const numberedLines = lines.map((line, index) => {
        if (line.trim()) {
          return `${index + 1}. ${line}`;
        }
        return line;
      });
      setText(numberedLines.join('\n'));
    } else {
      // No linebreaks, add them and number
      const rmSpaces = text.replaceAll('. ', '.');
      const newText = rmSpaces.replaceAll('.', '.\n');
      const lines = newText.split('\n');
      const numberedLines = lines.map((line, index) => {
        if (line.trim()) {
          return `${index + 1}. ${line}`;
        }
        return line;
      });
      setText(numberedLines.join('\n'));
    }
  };

  const removeNumbering = () => {
    const processedText = text.replace(/^\d+\.\s*/gm, '');
    setText(processedText);
  };

  const numToText = async () => {
    setFindMessage('');
    try {
      const converter = await import('number-to-words');
      const words = (converter).toWords(text);
      const newText = words.replaceAll(',', '');
      setConvertedText(newText);
      setTimeout(() => setConvertedText(''), 5000);
    } catch (err) {
      setConvertedText('Enter a number to change it to words');
      setTimeout(() => setConvertedText(''), 5000);
    }
  };

  const countWords = () => {
    let newText = 0;
    let check = false;
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== ' ' && !check) {
        newText++;
        check = true;
      } else if (text[i] === ' ') {
        check = false;
      }
    }
    setTextCount(newText);
  };

  useEffect(() => {
    countWords();
  }, [text]);

  const toggle = () => {
    const msg = text.split('');
    toggleChars(msg);
    const newText = msg.join('');
    setText(newText);
  };

  const clear = () => {
    setText('Enter Text Here');
  };

  const selectAll = () => {
    const input = document.getElementById('text-box') as HTMLTextAreaElement;
    if (input) input.select();
  };

  const findText = () => {
    setConvertedText('');
    const input = document.getElementById('text-box') as HTMLTextAreaElement;
    if (input) {
      const index = input.value.indexOf(find);
      if (index !== -1) {
        input.focus();
        input.setSelectionRange(index, index + find.length);
        setFindMessage('');
      } else {
        setFindMessage('No occurrence is found');
        setTimeout(() => setFindMessage(''), 5000);
      }
    }
  };

  const rePlace = () => {
    setText(text.replace(find, replace));
  };

  const rePlaceAll = () => {
    setText(text.replaceAll(find, replace));
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleFindChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFind(event.target.value);
    setFindMessage('');
  };

  const handleReplaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReplace(event.target.value);
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="mt-3">
          <div className="flex justify-between items-center mb-3 text-3xl">
            <h1>Enter Text to Change</h1>
            <h6>{textCount} Words</h6>
          </div>
          <div className="my-3 flex justify-center">
            <textarea
              className="w-3/4 my-3 bg-black px-4 py-3 outline-none text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-purple-500 border-gray-700"
              value={text}
              onChange={handleOnChange}
              id="text-box"
              rows={7}
              onFocus={selectAll}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            <button className={`${btnstyle} text-xs sm:text-base`} onClick={selectAll}>
              SelectAll
            </button>
            <button className={`${btnstyle} text-xs sm:text-base`} onClick={removeLineBreaks}>
              Remove_Linebreaks
            </button>
            <button className={`${btnstyle} text-xs sm:text-base`} onClick={addLineBreaks}>
              Add_Linebreaks
            </button>
            <button className={`${btnstyle} text-xs sm:text-base`} onClick={addNumberedLineBreaks}>
              Add_Numbered_Linebreaks
            </button>
            <button className={`${btnstyle} text-xs sm:text-base`} onClick={removeNumbering}>
              Remove_Numbering
            </button>
            <button className={`${btnstyle} text-xs sm:text-base`} onClick={capsText}>
              CAPITALIZE
            </button>
            <button className={`${btnstyle} text-xs sm:text-base`} onClick={lowerText}>
              lower_case
            </button>
            <button className={`${btnstyle} text-xs sm:text-base`} onClick={sentenceCase}>
              Sentence_Case
            </button>
            <button className={`${btnstyle} text-xs sm:text-base`} onClick={capsEachword}>
              Capitalize Each Word
            </button>
            <button className={`${btnstyle} text-xs sm:text-base`} onClick={toggle}>
              toggle_Case
            </button>
            <button className={`${btnstyle} text-xs sm:text-base`} onClick={numToText}>
              Number_to_Words
            </button>
            <button className={`${resetbtnstyle} text-xs sm:text-base`} onClick={clear}>
              Reset
            </button>
          </div>
          <div className="flex flex-col justify-center gap-3 pt-5">
            <div className="flex justify-center gap-2 flex-wrap items-center">
              <div className="flex items-center">
                <label htmlFor="find" className="flex flex-col text-purple-700">
                  Find
                  <input
                    type="text"
                    id="find"
                    className="bg-black px-1 py-1 outline-none text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-green-500 border-gray-700"
                    onChange={handleFindChange}
                  />
                </label>
              </div>
              <div className="flex items-center">
                <label htmlFor="replace" className="flex flex-col text-purple-700">
                  Replace with
                  <input
                    type="text"
                    className="bg-black px-1 py-1 outline-none text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-green-500 border-gray-700"
                    onChange={handleReplaceChange}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-center gap-3 items-center">
              <button className={btnstyle} onClick={findText}>
                Find
              </button>
              <button className={btnstyle} onClick={rePlace}>
                Replace
              </button>
              <button className={btnstyle} onClick={rePlaceAll}>
                ReplaceAll
              </button>
            </div>
          </div>
          {convertedText && (
            <div className="flex justify-center mt-4">
              <p className="text-red-500 text-lg">{convertedText}</p>
            </div>
          )}
          {findMessage && (
            <div className="flex justify-center mt-4">
              <p className="text-red-500 text-lg">{findMessage}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
