import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const AboutUsSection = () => {
  const { currentTheme } = useTheme();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-6 sm:py-8 md:py-12 lg:py-16 relative overflow-hidden" style={{ background: currentTheme.backgroundPrimary }}>
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full opacity-10"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFD700"
            fillOpacity="0.2"
            d="M0,192L60,202.7C120,213,240,235,360,213.3C480,192,600,128,720,112C840,96,960,128,1080,149.3C1200,171,1320,181,1380,186.7L1440,192V320H0V192Z"
          />
        </svg>
      </div>
      <motion.div
        className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          <motion.div
            className="flex justify-center mb-4 md:mb-0"
            variants={imageVariants}
          >
            <div className="relative">
                             <motion.div
                 whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                 transition={{ duration: 0.3, ease: "easeOut" }}
                                   className="w-64 sm:w-72 md:w-96 lg:w-[500px] h-64 sm:h-72 md:h-96 lg:h-[500px] flex items-center justify-center shadow-md overflow-hidden"
               >
                 <img
                   src="/market3.jpg"
                   alt="Digital Marketing"
                   className="w-full h-full object-cover"
                 />
               </motion.div>
            </div>
          </motion.div>
          <div className="text-center md:text-left">
            <motion.div variants={itemVariants} className="relative inline-block mb-2 sm:mb-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: currentTheme.textPrimary }}>
                About <span className="text-yellow-400">Us</span>
              </h2>
              <div className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-yellow-400 rounded-full w-12 sm:w-16" />
            </motion.div>
            <motion.div variants={containerVariants} className="space-y-2 sm:space-y-3 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto md:mx-0 text-left">
              <motion.p
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="text-sm sm:text-base md:text-lg leading-relaxed"
                style={{ color: currentTheme.textSecondary }}
              >
                We're a forward-thinking organization, launched on August 7, 2024, blending digital marketing excellence with innovative education. With a tech-savvy, strategic edge, we boost brands online and empower learning platforms for the future.
              </motion.p>
              <motion.p
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="text-sm sm:text-base md:text-lg leading-relaxed"
                style={{ color: currentTheme.textSecondary }}
              >
                Our dual focus drives impactful campaigns and projects, fostering engagement and skill development for startups to institutions. Specializing in brand promotion, building, and growth, we harness cutting-edge digital tools and social media for maximum visibility and results.
              </motion.p>
                             <motion.p
                 variants={itemVariants}
                 whileHover={{ scale: 1.02 }}
                 transition={{ duration: 0.2 }}
                 className="text-sm sm:text-base md:text-lg leading-relaxed"
                 style={{ color: currentTheme.textSecondary }}
               >
                 Led by a passionate team, we fuse creativity, data insights, and trend expertise to fuel transformation. Committed to innovation, integrity, and success, we empower partners to thrive in a digital world!
               </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUsSection;