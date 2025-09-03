import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HRDashboardHome = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      id: 1,
      title: "New Registrations",
      description: "View all user registrations and manage accounts",
      icon: <Users className="w-8 h-8" />,
      color: "bg-blue-500",
      action: "Get Started >",
      onClick: () => navigate('/registrations')
    },
    {
      id: 2,
      title: "Consultations",
      description: "Manage consultation requests and appointments",
      icon: <Calendar className="w-8 h-8" />,
      color: "bg-green-500",
      action: "Get Started >",
      onClick: () => navigate('/consultations')
    },
    {
      id: 3,
      title: "Contacts",
      description: "View contact form submissions and inquiries",
      icon: <Mail className="w-8 h-8" />,
      color: "bg-yellow-500",
      action: "Get Started >",
      onClick: () => navigate('/contacts')
    },
    {
      id: 4,
      title: "Strategy Calls",
      description: "Manage strategy call requests and appointments",
      icon: <Phone className="w-8 h-8" />,
      color: "bg-purple-500",
      action: "Get Started >",
      onClick: () => navigate('/strategy-calls')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            HR Management <span className="text-gray-600">Dashboard</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your human resources efficiently
          </p>
        </motion.div>

        {/* Dashboard Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-gray-200 relative overflow-hidden"
              onClick={card.onClick}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-6">
                {/* Icon */}
                <motion.div 
                  className={`${card.color} text-white rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}
                  whileHover={{ rotate: 5 }}
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    {card.icon}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>

                  {/* Action Button */}
                  <div className="pt-2">
                    <motion.button 
                      className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {card.action}
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {[
            { number: "150+", label: "Active Users", color: "from-blue-500 to-blue-600" },
            { number: "25", label: "Consultation Requests", color: "from-green-500 to-green-600" },
            { number: "89", label: "Contact Submissions", color: "from-yellow-500 to-yellow-600" },
            { number: "12", label: "Strategy Calls", color: "from-purple-500 to-purple-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white p-6 text-center shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <motion.div 
                className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            © 2024 HR Management System. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HRDashboardHome;
