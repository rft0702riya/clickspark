import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, LogOut, Settings, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    logout();
    navigate('/');
    setIsLoggingOut(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading user profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <User className="w-10 h-10 text-yellow-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">User Profile</h1>
            <p className="text-gray-600">Manage your account settings</p>
          </div>

          {/* User Information */}
          <div className="space-y-6">
            {/* Name Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <div className="flex items-center mb-3">
                <User className="w-5 h-5 text-yellow-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Full Name</h3>
              </div>
              <p className="text-gray-700 text-lg">
                {user.name ? user.name : 'Name not available'}
              </p>
            </motion.div>

            {/* Email Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <div className="flex items-center mb-3">
                <Mail className="w-5 h-5 text-yellow-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Email Address</h3>
              </div>
              <p className="text-gray-700 text-lg">{user.email}</p>
            </motion.div>

            {/* Account Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-green-50 p-6 rounded-xl border border-green-200"
            >
              <div className="flex items-center mb-3">
                <Shield className="w-5 h-5 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <p className="text-green-700 font-medium">Active</p>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center"
              onClick={() => navigate('/')}
            >
              <Settings className="w-5 h-5 mr-3" />
              Back to Dashboard
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoggingOut}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center ${
                isLoggingOut
                  ? 'bg-red-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl'
              }`}
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
