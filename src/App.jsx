import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, GraduationCap, Building2, Heart, Sparkles, Target, Mail, Search, Edit, Globe, Handshake } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './pages/Projects.jsx';
import ChatBotPopup from './components/ChatBotPopup.jsx';
import ChatBotButton from './components/ChatBotButton.jsx';
import GetStarted from './pages/GetStarted.jsx';
import { Tilt } from 'react-tilt';

import AboutUsSection from './components/AboutUsSection.jsx';
import ExpertiseSection from './components/ExpertiseSection.jsx';
import ConsultationForm from './components/ConsultationForm.jsx';
import TypingAnimation from './components/TypingAnimation.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './styles/global.css';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import UserProfile from './components/auth/UserProfile.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import HRDashboard from './pages/HRDashboard.jsx';
import HRDashboardHome from './pages/HRDashboardHome.jsx';
import RegistrationsPage from './pages/RegistrationsPage.jsx';
import ConsultationsPage from './pages/ConsultationsPage.jsx';
import ContactsPage from './pages/ContactsPage.jsx';
import PostJobPage from './pages/PostJobPage.jsx';
import PostedJobsPage from './pages/PostedJobsPage.jsx';
import AppliedFormsPage from './pages/AppliedFormsPage.jsx';
import AppliedCoursesPage from './pages/AppliedCoursesPage.jsx';
import CourseManagementPage from './pages/CourseManagementPage.jsx';
import StrategyCallsPage from './pages/StrategyCallsPage.jsx';
import './components/layout/WorkSection.css'; // Add this import for the external CSS

// Global Carousel Data
const carouselSentences = [
  "Unlock the power of digital marketing to skyrocket your brand's growth! Engage your audience with targeted campaigns and compelling content. Boost your ROI with data-driven marketing strategies today! Transform leads into loyal customers with innovative marketing solutions.",
];

// Global Work Projects Data
const workProjects = [
  {
    image: '/gyansetu.jpg',
    title: 'GyanSetu',
    desc: 'A next-gen e-learning platform empowering students and educators with interactive digital tools.',
    tag: 'EdTech',
  },
  {
    image: '/swasthya-setu.jpg',
    title: 'Swasthya-Setu',
    desc: 'A comprehensive health and wellness portal connecting users to trusted medical resources.',
    tag: 'Healthcare', 
  },
  {
    image: '/landtolavish.jpg',
    title: 'Land To Lavish',
    desc: 'A luxury real estate showcase with immersive virtual tours and high-conversion landing pages.',
    tag: 'Real Estate',
  },
  {
    image: '/school-management.jpg',
    title: 'School Management',
    desc: 'A smart school management system streamlining operations for institutions and parents.',
    tag: 'Education',
  },
];

// Services Data
const servicesData = [
  {
    icon: <Target className="w-8 h-8 text-yellow-500" />,
    title: "Search Engine Optimization",
    description: "Boost your website's ranking with tailored SEO strategies.",
    color: "bg-white",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
    title: "Content Marketing",
    description: "Engage your audience with compelling, story-driven content.",
    color: "bg-white",
  },
  {
    icon: <Building2 className="w-8 h-8 text-yellow-500" />,
    title: "Website Designing",
    description: "Create stunning, responsive websites that convert.",
    color: "bg-white",
  },
  {
    icon: <Heart className="w-8 h-8 text-yellow-500" />,
    title: "Social Media Marketing",
    description: "Amplify your brand with engaging social campaigns.",
    color: "bg-white",
  },
  {
    icon: <Mail className="w-8 h-8 text-yellow-500" />,
    title: "Email Marketing",
    description: "Drive loyalty with personalized email campaigns.",
    color: "bg-white",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-yellow-500" />,
    title: "Strategic Planning",
    description: "Custom strategies to dominate your industry.",
    color: "bg-white",
  },
];

function WorkSection({ workProjects }) {
  const { currentTheme } = useTheme();
  const headerVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section id="work" className="py-10 sm:py-16" style={{ background: currentTheme.backgroundTertiary }}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-4 sm:mb-6 md:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 tracking-tight" style={{ color: currentTheme.textPrimary }}>
            Our Work
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto" style={{ color: currentTheme.textSecondary }}>
            Explore our portfolio of innovative projects that drive digital success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16">
          {workProjects.map((work, i) => (
            <Tilt
              key={i}
              options={{ max: 10, scale: 1.05, speed: 400 }}
              className="relative"
            >
              <div className="card-hover">
                <div className="card-hover__content">
                  <h3 className="card-hover__title">
                    {work.title} <span>{work.tag}</span>
                  </h3>
                  <p className="card-hover__text">{work.desc}</p>
                  <a href="#" className="card-hover__link">
                    <span>View Project</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>        
                  </a>
                </div>
                <div className="card-hover__extra">
                  <h4>Explore <span>now</span> and boost your <span>{work.tag}</span>!</h4>
                </div>
                <img src={work.image} alt={work.title} />
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [showLeadCapturePopup, setShowLeadCapturePopup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { currentTheme, isDarkTheme } = useTheme();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const hasShownNewsletter = localStorage.getItem('newsletterShown');
    if (!hasShownNewsletter) {
      const timer = setTimeout(() => {
        setShowSubscriptionPopup(true);
        localStorage.setItem('newsletterShown', 'true');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />
      <div className="min-h-screen" style={{ background: currentTheme.background }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {!showConsultationForm && <Navbar onLetsTalk={() => setShowPopup(true)} />}
        </motion.div>
      <div className="pt-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <HomePage
                    services={servicesData}
                    showConsultationForm={showConsultationForm}
                    setShowConsultationForm={setShowConsultationForm}
                    showSubscriptionPopup={showSubscriptionPopup}
                    setShowSubscriptionPopup={setShowSubscriptionPopup}
                    showDiscountPopup={showDiscountPopup}
                    setShowDiscountPopup={setShowDiscountPopup}
                    showLeadCapturePopup={showLeadCapturePopup}
                    setShowLeadCapturePopup={setShowLeadCapturePopup}
                  />
                </motion.div>
              }
            />
            <Route path="/about" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <AboutUsSection />
              </motion.div>
            } />
            <Route path="/services" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <ServicesPage services={servicesData} />
              </motion.div>
            } />
            <Route path="/projects" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Projects />
              </motion.div>
            } />
            <Route path="/contact" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Contact />
              </motion.div>
            } />
            <Route path="/get-started" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <GetStarted />
              </motion.div>
            } />
            <Route path="/login" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Login />
              </motion.div>
            } />
            <Route path="/register" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Register />
              </motion.div>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <UserProfile />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/hr-dashboard" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <HRDashboardHome />
              </motion.div>
            } />
            <Route path="/hr-dashboard-details" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <HRDashboard />
              </motion.div>
            } />
            <Route path="/registrations" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <RegistrationsPage />
              </motion.div>
            } />
            <Route path="/consultations" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <ConsultationsPage />
              </motion.div>
            } />
            <Route path="/contacts" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <ContactsPage />
              </motion.div>
            } />
            <Route path="/strategy-calls" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <StrategyCallsPage />
              </motion.div>
            } />
            <Route path="/post-job" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <PostJobPage />
              </motion.div>
            } />
            <Route path="/posted-jobs" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <PostedJobsPage />
              </motion.div>
            } />
            <Route path="/applied-forms" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <AppliedFormsPage />
              </motion.div>
            } />
            <Route path="/applied-courses" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <AppliedCoursesPage />
              </motion.div>
            } />
            <Route path="/course-management" element={
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <CourseManagementPage />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <Footer />
      </motion.div>
      {showPopup && <ChatBotPopup onClose={() => setShowPopup(false)} />}
      {showConsultationForm && <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />}
      {!showConsultationForm && !location.pathname.startsWith('/hr-dashboard') && !location.pathname.startsWith('/registrations') && !location.pathname.startsWith('/consultations') && !location.pathname.startsWith('/contacts') && <ChatBotButton />}

      {showSubscriptionPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-2xl max-w-xs sm:max-w-md w-full mx-2 sm:mx-4"
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">Get the latest marketing tips and offers delivered to your inbox!</p>
            <form className="space-y-2 sm:space-y-3">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-1 sm:p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-xs sm:text-sm"
                aria-label="Email for subscription"
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white px-2 sm:px-3 py-1 sm:py-2 hover:bg-yellow-600 transition-all text-xs sm:text-sm"
                onClick={() => setShowSubscriptionPopup(false)}
              >
                Subscribe
              </button>
            </form>
            <button
              className="mt-2 sm:mt-3 text-gray-500 hover:text-gray-700 text-xs sm:text-sm"
              onClick={() => setShowSubscriptionPopup(false)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {showDiscountPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-2xl max-w-xs sm:max-w-md w-full mx-2 sm:mx-4"
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Special Offer!</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">Get 20% off your first marketing campaign. Offer ends soon!</p>
            <button
              className="w-full bg-yellow-500 text-white px-2 sm:px-3 py-1 sm:py-2 hover:bg-yellow-600 transition-all text-xs sm:text-sm"
              onClick={() => {
                setShowDiscountPopup(false);
                navigate('/get-started');
              }}
            >
              Claim Offer
            </button>
            <button
              className="mt-2 sm:mt-3 text-gray-500 hover:text-gray-700 text-xs sm:text-sm"
              onClick={() => setShowDiscountPopup(false)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {showLeadCapturePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-2xl max-w-xs sm:max-w-md w-full mx-2 sm:mx-4"
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Get a Free Consultation</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">Fill out the form to schedule a free marketing consultation.</p>
            <form className="space-y-2 sm:space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-1 sm:p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-xs sm:text-sm"
                aria-label="Your name"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-1 sm:p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-xs sm:text-sm"
                aria-label="Your email"
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white px-2 sm:px-3 py-1 sm:py-2 hover:bg-yellow-600 transition-all text-xs sm:text-sm"
                onClick={() => setShowLeadCapturePopup(false)}
              >
                Submit
              </button>
            </form>
            <button
              className="mt-2 sm:mt-3 text-gray-500 hover:text-gray-700 text-xs sm:text-sm"
              onClick={() => setShowLeadCapturePopup(false)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function HomePage({ services, showConsultationForm, setShowConsultationForm, showSubscriptionPopup, setShowSubscriptionPopup, showDiscountPopup, setShowDiscountPopup, showLeadCapturePopup, setShowLeadCapturePopup }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -20]);
  const y2 = useTransform(scrollY, [0, 300], [0, 20]);
  const { isDarkTheme, currentTheme } = useTheme();

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Hero Section with Video Background */}
      <header
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
            style={{ filter: 'brightness(0.7)' }}
          >
            <source src="/khushi 2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 text-center"
          style={{ y: y2 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="mb-2 sm:mb-4 px-4"
          >
            <TypingAnimation
              text="Amplify Your Digital Impact"
              speed={80}
              delay={3000}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight"
              highlightClass="text-yellow-400"
            />
          </motion.div>
                      <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              className="text-center mb-3 sm:mb-6 px-4"
            >
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-medium leading-relaxed max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto text-no-truncate hero-text">
                <div className="flex flex-col items-center">
                  <span className="block text-no-cutoff">
                    From startups to global enterprises, we empower businesses to thrive with
                  </span>
                  <span className="block text-no-cutoff">
                    end-to-end digital solutions, bold ideas, and performance-driven execution
                  </span>
                </div>
              </div>
            </motion.div>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 12px 24px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            className="bg-yellow-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold hover:bg-yellow-700 transition-all duration-300 flex items-center mx-auto px-4"
            aria-label="Get started with our services"
            onClick={() => navigate('/get-started')}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/get-started')}
          >
            Get Started <ArrowRight className="ml-1 sm:ml-2 w-4 sm:w-5 h-4 sm:h-5" />
          </motion.button>
        </motion.div>
      </header>

      {/* Carousel Section with Overlay */}
      <section 
        className="py-4 sm:py-6 md:py-8 lg:py-10 overflow-hidden relative"
        style={{
          background: isDarkTheme 
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)'
            : 'linear-gradient(135deg, #fef3c7 0%, #ffffff 50%, #fef3c7 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="whitespace-nowrap inline-block"
              animate={{
                x: ['0%', '-100%'],
                transition: {
                  x: { duration: 45, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
                },
              }}
              style={{ marginTop: '-20px' }}
            >
              <h2 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-500 inline-block pr-8 sm:pr-12 md:pr-16 carousel-text text-no-cutoff"
                style={{
                  color: isDarkTheme ? '#ffffff' : '#1f2937',
                  textShadow: isDarkTheme ? '0 1px 3px rgba(0,0,0,0.8)' : '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                {carouselSentences[0]}
              </h2>
              <h2 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-500 inline-block pr-8 sm:pr-12 md:pr-16 carousel-text text-no-cutoff"
                style={{
                  color: isDarkTheme ? '#ffffff' : '#1f2937',
                  textShadow: isDarkTheme ? '0 1px 3px rgba(0,0,0,0.8)' : '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                {carouselSentences[0]}
              </h2>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AboutUsSection />

      {/* Expertise Section */}
      <ExpertiseSection />

      {/* Work Section */}
      <div style={{ background: currentTheme.backgroundSecondary }}>
        <WorkSection workProjects={workProjects} />
      </div>

      {/* How We Generate Leads Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16" style={{ 
        background: isDarkTheme 
          ? 'linear-gradient(to bottom, #111111, #000000)'
          : 'linear-gradient(180deg, #a9c9ff 0%, #ffbbec 100%)'
      }}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-4 sm:mb-6 md:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 tracking-tight" style={{ color: currentTheme.textPrimary }}>
              How We Generate Leads
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto" style={{ color: currentTheme.textSecondary }}>
              We use data-driven LinkedIn campaigns to connect you with decision-makers.
            </p>
          </motion.div>
          
          <div className="leads-cards-container">
            {[
              { icon: <Search className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-600" />, title: "Find Prospects", desc: "Targeted lists of ideal prospects on LinkedIn." },
              { icon: <Edit className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-600" />, title: "Write Messages", desc: "Personalized messages that get responses." },
              { icon: <Globe className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-600" />, title: "Execute Outreach", desc: "Send custom messages to thousands." },
              { icon: <Handshake className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-600" />, title: "Close Deals", desc: "Get notified when leads respond." },
            ].map((step, index) => (
              <div key={index} className="leads-card">
                <div className="leads-face leads-face1">
                  <div className="leads-content">
                    <span className="leads-stars"></span>
                    <div className="leads-icon-container">
                      {step.icon}
                    </div>
                    <h2 className={`leads-step-${index + 1}`}>{step.title}</h2>
                    <p className={`leads-step-${index + 1}`}>{step.desc}</p>
                  </div>
                </div>
                <div className="leads-face leads-face2">
                  <h2>{String(index + 1).padStart(2, '0')}</h2>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 12px 24px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
              className="mt-4 sm:mt-6 bg-yellow-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-yellow-700 transition-all duration-300"
              onClick={() => setShowConsultationForm(true)}
              onKeyDown={(e) => e.key === 'Enter' && setShowConsultationForm(true)}
              aria-label="Schedule a free consultation"
            >
              Free Consultation
            </motion.button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-6 sm:py-8 md:py-12 lg:py-16" style={{ background: currentTheme.backgroundTertiary }}>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xs sm:max-w-md md:max-w-lg mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4" style={{ color: currentTheme.textPrimary }}>
              Get in Touch
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6" style={{ color: currentTheme.textSecondary }}>
              Start your digital journey today.
            </p>
            <form className="space-y-3 sm:space-y-4">
              <motion.input
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                type="email"
                placeholder="Your Email"
                className="w-full p-2 sm:p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
                aria-label="Email address"
              />
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 12px 24px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                type="submit"
                className="w-full bg-yellow-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold hover:bg-yellow-700 transition-all duration-300"
                aria-label="Submit contact form"
                onClick={() => navigate('/contact')}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/contact')}
              >
                Connect Now
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
      

    </motion.div>
  );
}

function AboutPage() {
  return null; // Placeholder for About Page content
}

function ServicesPage({ services }) {
  const { currentTheme } = useTheme();
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ✅ Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200 via-orange-300 to-white bg-[length:400%_400%] animate-gradient-x opacity-95" />
      
      {/* ✅ Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/30 rounded-full animate-bounce-slow" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-400/25 rounded-full animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-yellow-500/20 rounded-full animate-spin-slow" />
        
        {/* Animated squares */}
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-orange-500/20 rotate-45 animate-ping" />
        <div className="absolute bottom-20 right-1/4 w-20 h-20 bg-yellow-500/15 rotate-12 animate-bounce" />
        
        {/* Animated triangles */}
        <div className="absolute top-1/2 left-10 w-0 h-0 
          border-l-[40px] border-r-[40px] border-b-[70px] 
          border-l-transparent border-r-transparent border-b-yellow-400/30 
          animate-float" />
        <div className="absolute bottom-40 right-10 w-0 h-0 
          border-l-[30px] border-r-[30px] border-b-[50px] 
          border-l-transparent border-r-transparent border-b-orange-400/25 
          animate-float-slow" />
      </div>

      {/* ✅ Moving gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/20 to-transparent animate-shimmer" />
      
      {/* Content container */}
      <div className="relative z-10 container mx-auto px-2 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-black drop-shadow-lg">
            Our Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-700 font-medium">
            Explore our innovative digital solutions that drive growth and success.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden"
            >
              {/* Card background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative z-10 w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4 shadow-lg"
              >
                <div className="text-white text-2xl">
                  {service.icon}
                </div>
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ delay: index * 0.1 + 0.1, duration: 0.5, ease: "easeOut" }}
                id={`service-title-${index}`} 
                className="relative z-10 text-xl font-bold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors duration-300"
              >
                {service.title}
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }}
                className="relative z-10 text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
              >
                {service.description}
              </motion.p>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;