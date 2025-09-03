import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, User, Building, Globe, DollarSign, MessageSquare } from 'lucide-react';

function Contact() {
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
      
      <div className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-4xl px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
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
          className="bg-white p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl border border-gray-200 w-full relative overflow-hidden"
          style={{
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05)'
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Animated border effect */}
          <div className="absolute inset-0 overflow-hidden">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-4 border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                      placeholder="Enter your first name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-4 border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="your@company.com"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="border border-gray-200 px-2 py-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 w-1/3"
                  >
                    <option>India (+91)</option>
                    <option>USA (+1)</option>
                    <option>UK (+44)</option>
                    <option>Canada (+1)</option>
                    <option>Australia (+61)</option>
                  </select>
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-4 border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Company and Website - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-4 border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Website <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-4 border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              {/* Revenue Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Annual Revenue <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    name="revenue"
                    value={form.revenue}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="Enter your annual revenue"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none"
                    placeholder="Tell us about your project and requirements..."
                  />
                </div>
              </div>

              {/* Error and Success Messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-500 text-sm p-4 bg-red-50 border border-red-200"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
              
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-600 text-sm p-4 bg-green-50 border border-green-200"
                >
                  <CheckCircle className="w-4 h-4" />
                  {success}
                </motion.div>
              )}

              {/* Privacy Policy Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  checked={form.agree}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  required
                />
                <label htmlFor="agree" className="text-sm text-gray-700">
                  I agree to the privacy policy <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 font-bold text-lg transition-all duration-200 relative overflow-hidden ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
              </motion.button>

              {/* Disclaimer */}
              <p className="text-center text-sm text-gray-500 leading-relaxed">
                By submitting this form, you agree to receive communications from ClickSpark. 
                We respect your privacy and will never share your information with third parties.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;