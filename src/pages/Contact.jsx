import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Contact() {
  const { currentTheme } = useTheme();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India (+91)',
    company: '',
    website: '',
    revenue: '',
    message: '',
    agree: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((f) => ({ ...f, [name]: e.target.checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.company ||
      !form.website ||
      !form.revenue ||
      !form.message ||
      !form.agree
    ) {
      setError('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        // Reset form
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: 'India (+91)',
          company: '',
          website: '',
          revenue: '',
          message: '',
          agree: false,
        });
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4 sm:py-8 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-[#e68a3f]"></div>
        <div className="w-1/2 bg-[#f9f9f5]"></div>
      </div>
      
      <div className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10"
        >
                      <motion.h1 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-black mb-1"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px rgba(0,0,0,0.3)"
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-black"
              >
                CONTACT US
              </motion.span>
            </motion.h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
            Let's connect and kickstart your digital transformation today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          className="bg-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 w-full relative overflow-hidden"
          style={{
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05)'
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 hover:opacity-20 transition-opacity duration-500"></div>
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-8 right-8 w-1 h-1 bg-orange-500 rounded-full animate-ping opacity-40"></div>
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce opacity-50"></div>
            <div className="absolute bottom-4 right-4 w-1 h-1 bg-yellow-500 rounded-full animate-pulse opacity-30"></div>
          </div>
          
          <div className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
              <div>
                <label htmlFor="firstName" className="block text-sm sm:text-base md:text-lg font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                  First Name<span className="text-yellow-400">*</span>
                </label>
                <motion.input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.02, borderColor: "#FACC15", boxShadow: "0 0 12px rgba(250, 204, 21, 0.6)" }}
                  whileHover={{ scale: 1.01, borderColor: "#F59E0B" }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  className="w-full border border-gray-300 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm sm:text-base bg-white hover:bg-gray-50"
                  style={{ color: currentTheme.textPrimary }}
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm sm:text-base md:text-lg font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                  Last Name<span className="text-yellow-400">*</span>
                </label>
                <motion.input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01, borderColor: "#FACC15", boxShadow: "0 0 8px rgba(250, 204, 21, 0.4)" }}
                  transition={{ duration: 0.2 }}
                  className="w-full border border-gray-300 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm sm:text-base bg-white"
                  style={{ color: currentTheme.textPrimary }}
                  required
                  aria-required="true"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm sm:text-base md:text-lg font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Email<span className="text-yellow-400">*</span>
              </label>
              <motion.input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                whileFocus={{ scale: 1.01, borderColor: "#FACC15", boxShadow: "0 0 8px rgba(250, 204, 21, 0.4)" }}
                transition={{ duration: 0.2 }}
                className="w-full border border-gray-300 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm sm:text-base bg-white"
                style={{ color: currentTheme.textPrimary }}
                required
                aria-required="true"
              />
            </div>
            <div>
                             <label htmlFor="phone" className="block text-sm sm:text-base md:text-lg font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                 Phone Number<span className="text-yellow-400">*</span>
               </label>
              <div className="flex gap-1 sm:gap-2">
                <motion.select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01, borderColor: "#FACC15", boxShadow: "0 0 8px rgba(250, 204, 21, 0.4)" }}
                  transition={{ duration: 0.2 }}
                  className="border border-gray-300 rounded-md sm:rounded-lg px-1 sm:px-2 py-1 sm:py-2 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm sm:text-base w-1/3 sm:w-1/4 bg-white"
                  aria-label="Country code"
                >
                  <option>India (+91)</option>
                  <option>USA (+1)</option>
                  <option>UK (+44)</option>
                  <option>Canada (+1)</option>
                  <option>Australia (+61)</option>
                </motion.select>
                <motion.input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01, borderColor: "#FACC15", boxShadow: "0 0 8px rgba(250, 204, 21, 0.4)" }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 border border-gray-300 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm sm:text-base bg-white"
                  style={{ color: currentTheme.textPrimary }}
                  required
                  aria-required="true"
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block text-sm sm:text-base md:text-lg font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Company<span className="text-yellow-400">*</span>
              </label>
              <motion.input
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                whileFocus={{ scale: 1.01, borderColor: "#FACC15", boxShadow: "0 0 8px rgba(250, 204, 21, 0.4)" }}
                transition={{ duration: 0.2 }}
                className="w-full border border-gray-300 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm sm:text-base bg-white"
                style={{ color: currentTheme.textPrimary }}
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="website" className="block text-sm sm:text-base md:text-lg font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Website<span className="text-yellow-400">*</span>
              </label>
              <motion.input
                id="website"
                name="website"
                value={form.website}
                onChange={handleChange}
                whileFocus={{ scale: 1.01, borderColor: "#FACC15", boxShadow: "0 0 8px rgba(250, 204, 21, 0.4)" }}
                transition={{ duration: 0.2 }}
                className="w-full border border-gray-300 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm sm:text-base bg-white"
                style={{ color: currentTheme.textPrimary }}
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="revenue" className="block text-sm sm:text-base md:text-lg font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Annual Revenue<span className="text-yellow-400">*</span>
              </label>
              <motion.input
                id="revenue"
                name="revenue"
                value={form.revenue}
                onChange={handleChange}
                whileFocus={{ scale: 1.01, borderColor: "#FACC15", boxShadow: "0 0 8px rgba(250, 204, 21, 0.4)" }}
                transition={{ duration: 0.2 }}
                className="w-full border border-gray-300 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm sm:text-base bg-white"
                style={{ color: currentTheme.textPrimary }}
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm sm:text-base md:text-lg font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Message<span className="text-yellow-400">*</span>
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="3"
                whileFocus={{ scale: 1.01, borderColor: "#FACC15", boxShadow: "0 0 8px rgba(250, 204, 21, 0.4)" }}
                transition={{ duration: 0.2 }}
                className="w-full border border-gray-300 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm sm:text-base"
                style={{ color: currentTheme.textPrimary }}
                required
                aria-required="true"
              ></motion.textarea>
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-red-500 text-sm sm:text-base"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
            
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-green-600 text-sm sm:text-base"
              >
                <CheckCircle className="w-4 h-4" />
                {success}
              </motion.div>
            )}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <input
                id="agree"
                name="agree"
                type="checkbox"
                checked={form.agree}
                onChange={handleChange}
                className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
                required
                aria-required="true"
              />
              <label htmlFor="agree" className="text-sm sm:text-base text-gray-700">
                I agree to the privacy policy<span className="text-yellow-400">*</span>
              </label>
            </motion.div>
                         <motion.button
               whileHover={{ 
                 scale: 1.05, 
                 boxShadow: '0 15px 30px rgba(34, 197, 94, 0.4)',
                 y: -2
               }}
               whileTap={{ scale: 0.95 }}
               type="submit"
               disabled={isSubmitting}
               className={`w-full px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base font-semibold relative overflow-hidden ${
                 isSubmitting 
                   ? 'bg-gray-400 cursor-not-allowed' 
                   : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
               }`}
             >
               {/* Button shine effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
               <span className="relative z-10">
                 {isSubmitting ? 'Sending...' : 'Send Message'}
               </span>
            </motion.button>
          </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;