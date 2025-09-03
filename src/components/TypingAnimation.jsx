import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ 
  text, 
  speed = 100, 
  wordDelay = 800, 
  delay = 2000, 
  className = "",
  highlightClass = "text-yellow-400"
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Split text into words and handle spans
  const parseText = () => {
    const parts = text.split(/(<span[^>]*>.*?<\/span>)/g);
    const words = [];
    
    parts.forEach(part => {
      if (part.startsWith('<span') && part.endsWith('</span>')) {
        // This is a span element, extract the text content
        const textContent = part.replace(/<span[^>]*>(.*?)<\/span>/g, '$1');
        const spanClass = part.match(/class="([^"]*)"/)?.[1] || highlightClass;
        
        // Split span content into words
        const spanWords = textContent.split(' ');
        spanWords.forEach(word => {
          if (word.trim()) {
            words.push({ text: word, isSpan: true, className: spanClass });
          }
        });
      } else {
        // Regular text
        const regularWords = part.split(' ');
        regularWords.forEach(word => {
          if (word.trim()) {
            words.push({ text: word, isSpan: false });
          }
        });
      }
    });
    
    return words;
  };

  const words = parseText();

  useEffect(() => {
    let timeout;

    if (isTyping) {
      if (currentWordIndex < words.length) {
        const currentWord = words[currentWordIndex];
        
        if (currentCharIndex < currentWord.text.length) {
          // Typing current word
          timeout = setTimeout(() => {
            setDisplayText(prev => prev + currentWord.text[currentCharIndex]);
            setCurrentCharIndex(prev => prev + 1);
          }, speed);
        } else {
          // Finished typing current word, add space and move to next word
          timeout = setTimeout(() => {
            setDisplayText(prev => prev + ' ');
            setCurrentWordIndex(prev => prev + 1);
            setCurrentCharIndex(0);
          }, wordDelay);
        }
      } else {
        // Finished typing all words, wait before restarting
        timeout = setTimeout(() => {
          setDisplayText('');
          setCurrentWordIndex(0);
          setCurrentCharIndex(0);
        }, delay);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentWordIndex, currentCharIndex, isTyping, words, speed, wordDelay, delay]);

  // Render the typed text with proper highlighting
  const renderText = () => {
    let result = [];
    
    words.forEach((word, index) => {
      if (index < currentWordIndex) {
        // Word is fully typed
        if (word.isSpan) {
          result.push(
            <span key={index} className={word.className}>
              {word.text}
            </span>
          );
        } else {
          result.push(word.text);
        }
        result.push(' ');
      } else if (index === currentWordIndex) {
        // Current word being typed
        const typedChars = Math.min(currentCharIndex, word.text.length);
        if (typedChars > 0) {
          if (word.isSpan) {
            result.push(
              <span key={index} className={word.className}>
                {word.text.substring(0, typedChars)}
              </span>
            );
          } else {
            result.push(word.text.substring(0, typedChars));
          }
        }
      }
    });
    
    return result;
  };

  return (
    <h1 className={`${className} relative`}>
      {renderText()}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default TypingAnimation;
