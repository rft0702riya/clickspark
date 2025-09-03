import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else if (result.error && (result.error.includes('Account not found') || result.error.includes('sign up first'))) {
      // Redirect to registration page after a short delay
      setTimeout(() => {
        navigate('/register');
      }, 2000);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Image Background */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/new.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              TAKE THE SPARK TO
            </h2>
            <h3 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Digitizing Your Business Growth
            </h3>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center space-x-6 mb-12"
          >
            <span className="text-white font-medium">Expert Team Members</span>
            <div className="w-px h-6 bg-white/30"></div>
            <span className="text-white font-medium">Results-Driven Approach</span>
            <div className="w-px h-6 bg-white/30"></div>
            <span className="text-white font-medium">Streamlined Execution</span>
          </motion.div>


        </div>
      </div>

      {/* Right Section - Form covering entire half */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-white via-blue-50 to-blue-100 relative">
       

        {/* Login Form Container - Covering entire right half */}
        <div className="flex items-center justify-center min-h-screen px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="w-full max-w-lg"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                Let's Create Something AMAZING Together
              </h2>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 border flex items-center rounded-lg ${
                  error.includes('Account not found') || error.includes('sign up first')
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <AlertCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${
                  error.includes('Account not found') || error.includes('sign up first')
                    ? 'text-blue-500'
                    : 'text-red-500'
                }`} />
                <div className="flex-1">
                  <span className={`text-sm font-medium ${
                    error.includes('Account not found') || error.includes('sign up first')
                      ? 'text-blue-800'
                      : 'text-red-700'
                  }`}>
                    {error}
                  </span>
                  {(error.includes('Account not found') || error.includes('sign up first')) && (
                    <div className="mt-2">
                      <Link
                        to="/register"
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm underline"
                      >
                        Click here to create your account
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email*
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-b-2 focus:ring-0 focus:border-blue-500 transition-all bg-transparent ${
                      validationErrors.email ? 'border-red-300' : 'border-gray-300'
                    } hover:border-gray-400`}
                    placeholder="Enter your email"
                  />
                </div>
                {validationErrors.email && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {validationErrors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-b-2 focus:ring-0 focus:border-blue-500 transition-all bg-transparent ${
                      validationErrors.password ? 'border-red-300' : 'border-gray-300'
                    } hover:border-gray-400 pr-12`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {validationErrors.password && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {validationErrors.password}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-8 font-bold text-lg transition-all duration-200 relative overflow-hidden rounded-lg ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </span>
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
