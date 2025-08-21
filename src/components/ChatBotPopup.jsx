import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const botReplies = [
  "That's awesome! Tell me more.",
  "We'd love to help you with that!",
  "Can you share a few more details?",
  "Our team will get back to you soon!",
  "Thank you for reaching out!"
];

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex items-end gap-1 mb-1"
  >
    <span className="block w-1.5 sm:w-2 h-1.5 sm:h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
    <span className="block w-1.5 sm:w-2 h-1.5 sm:h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
    <span className="block w-1.5 sm:w-2 h-1.5 sm:h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
    <span className="ml-1 text-xs sm:text-sm text-gray-400">ClickSpark Bot is typing...</span>
  </motion.div>
);

const ChatBotPopup = ({ onClose }) => {
  const { currentTheme } = useTheme();
  const [messages, setMessages] = useState([
    { from: 'bot', text: "👋 Hi! I'm ClickSpark Bot. How can I help you today?", greeting: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
      setMessages((msgs) => [...msgs, { from: 'bot', text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 z-[999] flex flex-col items-end"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-64 sm:w-80 max-w-full flex flex-col overflow-hidden border border-yellow-400"
      >
        <div className="flex items-center justify-between px-2 sm:px-4 py-1 sm:py-2 bg-yellow-400">
          <div className="flex items-center gap-1 sm:gap-2">
            <motion.img
              src="/new.png"
              alt="ClickSpark Bot"
              className="w-12 sm:w-16 h-12 sm:h-16 object-contain p-1 rounded-full border-2 border-gray-200 shadow-md bg-white"
            />
            <span className="font-bold text-xs sm:text-base text-black">ClickSpark Bot</span>
          </div>
          <button onClick={onClose} className="text-black text-lg sm:text-xl font-bold hover:text-red-500">×</button>
        </div>
        <div className="flex-1 px-2 sm:px-4 py-1 sm:py-2 space-y-1 sm:space-y-2 overflow-y-auto h-40 sm:h-64 bg-gradient-to-b from-yellow-50 to-white">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.from === 'user' ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: msg.from === 'user' ? 40 : -40 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="relative max-w-[70%]">
                  <div
                    className={`px-2 sm:px-3 py-1 sm:py-2 rounded-xl text-xs sm:text-sm shadow
                      ${msg.from === 'user' ? 'bg-yellow-400 text-black rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-yellow-100'}`}
                  >
                    {msg.greeting ? (
                      <motion.span
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                        className="inline-block"
                      >
                        {msg.text}
                      </motion.span>
                    ) : msg.text}
                  </div>
                  {msg.from === 'user' ? (
                    <span className="absolute right-0 -bottom-1 sm:-bottom-2 w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-br-2xl transform rotate-45"></span>
                  ) : (
                    <span className="absolute left-0 -bottom-1 sm:-bottom-2 w-2 sm:w-3 h-2 sm:h-3 bg-white border border-yellow-100 rounded-bl-2xl transform -rotate-45"></span>
                  )}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <TypingIndicator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <form onSubmit={handleSend} className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 border-t bg-white">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full sm:rounded-full px-2 sm:px-3 py-1 sm:py-1.5 focus:ring-2 focus:ring-yellow-400 outline-none text-xs sm:text-sm"
            style={{ color: currentTheme.textPrimary }}
            autoFocus
          />
          <button type="submit" className="bg-yellow-400 text-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-full sm:rounded-full font-semibold shadow hover:bg-yellow-500 transition-all text-xs sm:text-sm">
            Send
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ChatBotPopup;