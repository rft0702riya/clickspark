import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Shield } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState("register"); // register → otp → done
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0); // countdown for resend OTP
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Redirect after OTP verification success
  useEffect(() => {
    if (step === "done") {
      const timer = setTimeout(() => {
        navigate("/login"); // redirect to login
      }, 3000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [step, navigate]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit registration
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setMessage("Sending OTP to your email...");
      const res = await axios.post("http://localhost:5000/register", {
        name: form.name,
        email: form.email,
        password: form.password
      });
      setMessage(res.data.message);
      setStep("otp");
      setCooldown(30); // 30 seconds cooldown
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setMessage("Verifying OTP...");
      const res = await axios.post("http://localhost:5000/verify-otp", {
        email: form.email,
        otp,
      });
      setMessage(res.data.message);
      setStep("done");
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      setMessage("Resending OTP...");
      const res = await axios.post("http://localhost:5000/resend-otp", {
        email: form.email,
      });
      setMessage(res.data.message);
      setCooldown(30); // restart cooldown
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  // Cooldown timer
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Image Background */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/marketing.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          {/* Empty content area - all text removed */}
        </div>
      </div>

      {/* Right Section - Form covering entire half */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-white via-blue-50 to-blue-100 relative">
       

        {/* Register Form Container - Covering entire right half */}
        <div className="flex items-center justify-center min-h-screen px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="w-full max-w-lg"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                {step === "register" && "Create Account"}
                {step === "otp" && "Enter OTP"}
                {step === "done" && "✅ Success!"}
              </h2>
            </div>

            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 border flex items-center rounded-lg ${
                  message.includes("successful") || message.includes("sent") 
                    ? "bg-green-50 border-green-200"
                    : message.includes("failed") || message.includes("Invalid") || message.includes("expired")
                    ? "bg-red-50 border-red-200"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex-1">
                  <span className={`text-sm font-medium ${
                    message.includes("successful") || message.includes("sent") 
                      ? "text-green-800"
                      : message.includes("failed") || message.includes("Invalid") || message.includes("expired")
                      ? "text-red-700"
                      : "text-blue-800"
                  }`}>
                    {message}
                  </span>
                </div>
              </motion.div>
            )}

            {step === "register" && (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={`w-full pl-10 pr-4 py-4 border-b-2 focus:ring-0 focus:border-blue-500 transition-all bg-transparent ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      } hover:border-gray-400`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={`w-full pl-10 pr-4 py-4 border-b-2 focus:ring-0 focus:border-blue-500 transition-all bg-transparent ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      } hover:border-gray-400`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Create a strong password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className={`w-full pl-10 pr-4 py-4 border-b-2 focus:ring-0 focus:border-blue-500 transition-all bg-transparent ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      } hover:border-gray-400`}
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className={`w-full pl-10 pr-4 py-4 border-b-2 focus:ring-0 focus:border-blue-500 transition-all bg-transparent ${
                        errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                      } hover:border-gray-400`}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-8 font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10">Send OTP</span>
                </motion.button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">
                    OTP Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength="6"
                      className="w-full pl-10 pr-4 py-4 border-b-2 focus:ring-0 focus:border-blue-500 transition-all bg-transparent border-gray-300 hover:border-gray-400"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enter the 6-digit OTP sent to {form.email}</p>
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-8 font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10">Verify OTP & Register</span>
                </motion.button>

                {/* Resend OTP Button */}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={cooldown > 0}
                  className={`w-full py-4 px-8 font-bold text-lg transition-all rounded-lg ${
                    cooldown > 0
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gray-800 text-white hover:bg-gray-900"
                  }`}
                >
                  {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
                </button>
              </form>
            )}

            {step === "done" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">🎉 Account Created Successfully!</h3>
                <p className="text-gray-600 text-lg mb-4">
                  A confirmation email has been sent to {form.email}
                </p>
                <p className="text-gray-500 text-sm">
                  Redirecting to login in 3 seconds...
                </p>
              </div>
            )}

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
