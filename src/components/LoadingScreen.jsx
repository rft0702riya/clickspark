import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ isLoading, onLoadingComplete }) => {
  const [currentWord, setCurrentWord] = useState(0);

  // Now only single words
  const words = [
    "Digital",
    "Marketing",
    "SEO",
    "Growth",
    "Leads",
    "Content",
    "Strategy",
  ];

  useEffect(() => {
    if (!isLoading) return;

    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 900); // change every 0.9s

    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 4000);

    return () => {
      clearInterval(wordInterval);
      clearTimeout(timer);
    };
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-orange-100 via-yellow-50 to-white"
        >
          <div className="text-center">
            {/* Logo */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-6">
              CS
            </div>

            {/* Brand */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">ClickSpark</h1>
            <p className="text-gray-600 mb-6">Empowering Digital Growth</p>

            {/* Single Word Animation */}
            <div className="h-8">
              <motion.p
                key={currentWord}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-semibold text-orange-600"
              >
                {words[currentWord]}
              </motion.p>
            </div>

            {/* Loading Bar */}
            <div className="mt-8 w-64 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
