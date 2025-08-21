import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for navigation
import { motion } from "framer-motion";
import { useTheme } from '../../context/ThemeContext';

const Register = () => {
  const { currentTheme } = useTheme();
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
    <div 
      className="flex items-center justify-center min-h-screen relative"
      style={{
        backgroundImage: 'url(/new.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl border-2 border-yellow-400 relative overflow-hidden"
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 hover:opacity-40 transition-opacity duration-500"></div>
          </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-orange-500 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce opacity-50"></div>
          <div className="absolute bottom-4 right-4 w-1 h-1 bg-yellow-500 rounded-full animate-pulse opacity-30"></div>
        </div>
        
        <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-500">
          {step === "register" && "Create Account"}
          {step === "otp" && "Enter OTP"}
          {step === "done" && "✅ Success!"}
        </h2>

        {message && (
          <p className={`text-center text-sm mb-4 ${
            message.includes("successful") || message.includes("sent") 
              ? "text-green-600" 
              : message.includes("failed") || message.includes("Invalid") || message.includes("expired")
              ? "text-red-600"
              : "text-gray-700"
          }`}>
            {message}
          </p>
        )}

        {step === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: currentTheme.textPrimary }}>
                Full Name<span className="text-yellow-500">*</span>
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.02, borderColor: "#FACC15", boxShadow: "0 0 12px rgba(250, 204, 21, 0.6)" }}
                whileHover={{ scale: 1.01, borderColor: "#F59E0B" }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 transition-all hover:bg-gray-50 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ color: currentTheme.textPrimary }}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: currentTheme.textPrimary }}>
                Email Address<span className="text-yellow-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ color: currentTheme.textPrimary }}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: currentTheme.textPrimary }}>
                Password<span className="text-yellow-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ color: currentTheme.textPrimary }}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: currentTheme.textPrimary }}>
                Confirm Password<span className="text-yellow-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ color: currentTheme.textPrimary }}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <motion.button
              type="submit"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 15px 30px rgba(245, 158, 11, 0.4)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-2 rounded-lg transition-all relative overflow-hidden"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">Send OTP</span>
            </motion.button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium mb-2" style={{ color: currentTheme.textPrimary }}>
                OTP Code<span className="text-yellow-500">*</span>
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength="6"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 border-gray-300"
                style={{ color: currentTheme.textPrimary }}
              />
              <p className="text-xs text-gray-500 mt-1">Enter the 6-digit OTP sent to {form.email}</p>
            </div>
            
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Verify OTP & Register
            </button>

            {/* Resend OTP Button */}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={cooldown > 0}
              className={`w-full py-2 rounded-lg mt-2 font-semibold ${
                cooldown > 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black text-yellow-400 hover:bg-gray-900"
              }`}
            >
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
            </button>
          </form>
        )}

        {step === "done" && (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-4">
              🎉 Your account has been successfully registered!
            </p>
            <p className="text-gray-600 text-sm">
              A confirmation email has been sent to {form.email}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Redirecting to login in 3 seconds...
            </p>
          </div>
        )}
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
