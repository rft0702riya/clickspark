import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, Target, Zap, Shield, Award, Clock, Phone, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const GetStarted = () => {
  const { currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('strategy');

  const { scrollY } = useScroll();
  const yWave = useTransform(scrollY, [0, 200], [0, -10]);

  const benefits = [
    { icon: <Target className="w-6 h-6" />, title: "Targeted Strategy", desc: "Data-driven approach to reach your ideal customers" },
    { icon: <TrendingUp className="w-6 h-6" />, title: "Measurable Results", desc: "Track your ROI with detailed analytics" },
    { icon: <Zap className="w-6 h-6" />, title: "Quick Implementation", desc: "See results in as little as 30 days" },
    { icon: <Shield className="w-6 h-6" />, title: "Risk-Free Start", desc: "Free audit and consultation before commitment" },
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "CEO, TechStart", rating: 5, text: "ClickSpark transformed our online presence. 300% increase in leads!" },
    { name: "Mike Chen", role: "Founder, EcoStore", rating: 5, text: "Professional team, exceptional results. Highly recommended!" },
    { name: "Lisa Rodriguez", role: "Marketing Director", rating: 5, text: "Best investment we made. ROI exceeded expectations." },
  ];

  const packages = [
    {
      name: "Starter",
      price: "$997",
      duration: "month",
      features: ["Website Audit", "SEO Strategy", "30-Day Plan", "Email Support"],
      popular: false
    },
    {
      name: "Growth",
      price: "$2,497",
      duration: "month",
      features: ["Everything in Starter", "Content Strategy", "Social Media", "Weekly Calls", "Priority Support"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      duration: "",
      features: ["Full-Service Marketing", "Dedicated Manager", "Custom Strategy", "24/7 Support"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yWave }}
      >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10"></div>
      </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
        >
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Ready to <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Dominate</span> Your Market?
          </motion.h1>
          <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Join 500+ businesses that have transformed their digital presence with our proven strategies
          </motion.p>

        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3 shadow-lg"
              >
                Get Your Free Strategy Call <ArrowRight className="w-5 h-5" />
              </motion.button>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span>15-minute consultation</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {testimonials.map((testimonial, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
          </motion.div>
            </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ClickSpark?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We don't just create campaigns, we build digital empires
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
            </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Growth Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible plans designed to scale with your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
          <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white p-8 rounded-xl shadow-lg border-2 ${
                  pkg.popular ? 'border-yellow-500 scale-105' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
              </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                    <span className="text-gray-500">/{pkg.duration}</span>
              </div>
              </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
              </div>
              </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful businesses that have already taken the leap
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-yellow-600 px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3 shadow-lg"
              >
                Schedule Free Consultation <Phone className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3 hover:bg-white hover:text-yellow-600 transition-all"
              >
                Download Case Study <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default GetStarted;