import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ChatBotButton = () => {
  const { currentTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your ClickSpark assistant. How can I help you today? You can ask me about our services, projects, pricing, or any other questions!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        isBot: false,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      const userMessage = message.toLowerCase();
      setMessage('');
      setIsTyping(true);
      
      setTimeout(() => {
        let botResponse = "";
        
        if (userMessage.includes('service') || userMessage.includes('what do you do')) {
          botResponse = "We offer web development, mobile apps, UI/UX design, digital marketing, and custom software solutions. What specific service are you interested in?";
        } else if (userMessage.includes('price') || userMessage.includes('cost') || userMessage.includes('how much')) {
          botResponse = "Our pricing varies based on project requirements. We offer competitive rates and free consultations. Would you like to schedule a call to discuss your project?";
        } else if (userMessage.includes('contact') || userMessage.includes('email') || userMessage.includes('phone')) {
          botResponse = "You can reach us at contact@clickspark.com or call us at +1-555-123-4567. We're available Monday-Friday, 9 AM - 6 PM.";
        } else if (userMessage.includes('project') || userMessage.includes('portfolio')) {
          botResponse = "We've completed projects in e-commerce, healthcare, education, and more. Check out our Projects page to see our work!";
        } else if (userMessage.includes('hello') || userMessage.includes('hi')) {
          botResponse = "Hello! How can I assist you with your project today?";
        } else {
          botResponse = "Thanks for your message! Our team will review your inquiry and get back to you within 24 hours. You can also reach us directly at contact@clickspark.com";
        }
        
        setIsTyping(false);
        const botMessage = {
          id: messages.length + 2,
          text: botResponse,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const TypingIndicator = () => (
    <div className="flex justify-start mb-3">
      <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-xs text-gray-500 ml-2">typing...</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Chat Button with Circular Text */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {/* Pulsing Ring Animation */}
        {!isOpen && (
          <div className="absolute inset-0 w-20 h-20">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        )}

                 {/* Central Chat Button */}
         <div
           className="relative w-20 h-20 flex items-center justify-center transition-all duration-500"
           style={{
             opacity: isOpen ? 0 : 1,
             transform: isOpen ? 'scale(0.8)' : 'scale(1)',
           }}
         >
           <button
             onClick={() => setIsOpen(!isOpen)}
             className="w-14 h-14 bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer relative overflow-hidden group"
             style={{
               boxShadow: '0 8px 25px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
             }}
           >
             {/* Button Hover Effect */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             
             <div
               className="relative z-10 transition-all duration-300"
               style={{
                 transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
               }}
             >
               {isOpen ? (
                 <X className="w-6 h-6 text-white drop-shadow-sm" />
               ) : (
                 <MessageCircle className="w-6 h-6 text-white drop-shadow-sm" />
               )}
             </div>
           </button>
         </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-6 z-[9998] w-80 h-96 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-500"
          style={{
            animation: 'slideInUp 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)'
          }}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-yellow-400/90 via-orange-400/90 to-orange-500/90 backdrop-blur-sm p-4 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)',
                backgroundSize: '15px 15px'
              }}></div>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base">ClickSpark</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <p className="text-xs text-white/90 font-medium">Online</p>
                  </div>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-white/10 to-white/5">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                style={{
                  animation: `messageSlide 0.4s ease-out ${index * 0.1}s both`
                }}
              >
                {msg.isBot && (
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md mb-1">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md ${
                    msg.isBot
                      ? 'bg-white/80 backdrop-blur-sm border-white/40 text-gray-800 rounded-bl-md'
                      : 'bg-gradient-to-br from-yellow-400/90 to-orange-500/90 backdrop-blur-sm text-white rounded-br-md border-orange-300/50'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.isBot ? 'text-gray-500' : 'text-white/70'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {!msg.isBot && (
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md mb-1">
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white/20 backdrop-blur-sm border-t border-white/20">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 border-2 border-white/30 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 text-sm transition-all duration-200 bg-white/70 backdrop-blur-sm placeholder-gray-500"
                  style={{ color: currentTheme.textPrimary }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 -z-10 blur transition-opacity duration-200 focus-within:opacity-20"></div>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isTyping}
                className={`p-2 rounded-xl transition-all duration-300 shadow-lg relative overflow-hidden group ${
                  message.trim() && !isTyping
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white hover:shadow-xl hover:scale-105 active:scale-95'
                    : 'bg-gray-200/50 text-gray-400 cursor-not-allowed'
                }`}
              >
                {message.trim() && !isTyping && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
                )}
                <Send className="w-4 h-4 relative z-10" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #fbbf24, #f97316);
          border-radius: 2px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f59e0b, #ea580c);
        }

        .backdrop-blur-xl {
          backdrop-filter: blur(16px);
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </>
  );
};

export default ChatBotButton;
