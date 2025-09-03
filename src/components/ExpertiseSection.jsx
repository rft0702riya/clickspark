import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ExpertiseSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const expertiseItems = [
    {
      id: 1,
      image: '/r5.jpg',
      title: 'Digital Marketing',
      description: 'Boost your website\'s ranking with tailored SEO strategies.',
      subtitle: 'Expertise'
    },
    {
      id: 2,
      image: '/r6.jpg',
      title: 'Web Development',
      description: 'Engage your audience with compelling, story-driven content.',
      subtitle: 'Expertise'
    },
    {
      id: 3,
      image: '/ri7.jpg',
      title: 'Content Creation',
      description: 'Create stunning, responsive websites that convert.',
      subtitle: 'Expertise'
    },
    {
      id: 4,
      image: '/ri8.jpg',
      title: 'SEO Optimization',
      description: 'Amplify your brand with engaging social campaigns.',
      subtitle: 'Expertise'
    },
    {
      id: 5,
      image: '/ri9.jpg',
      title: 'Social Media',
      description: 'Drive loyalty with personalized email campaigns.',
      subtitle: 'Expertise'
    },
    {
      id: 6,
      image: '/ri10.jpg',
      title: 'Brand Strategy',
      description: 'Custom strategies to dominate your industry.',
      subtitle: 'Expertise'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === expertiseItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? expertiseItems.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-yellow-400">Expertise</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our specialized skills and professional capabilities
          </p>
        </motion.div>

        {/* Expertise Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Image Container */}
          <div className="relative h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={expertiseItems[currentIndex].image}
                  alt={expertiseItems[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <span className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold mb-3">
                        {expertiseItems[currentIndex].subtitle}
                      </span>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                        {expertiseItems[currentIndex].title}
                      </h3>
                      <p className="text-lg md:text-xl text-gray-200 max-w-md">
                        {expertiseItems[currentIndex].description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
            aria-label="Previous expertise"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
            aria-label="Next expertise"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {expertiseItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-yellow-500 scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection; 