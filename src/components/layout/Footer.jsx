import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Solutions: [
    { text: "Search Engine Optimization", path: "/services" },
    { text: "Content Marketing", path: "/services" },
    { text: "Website Designing", path: "/services" },
    { text: "Social Media Marketing", path: "/services" },
    { text: "Email Marketing", path: "/services" },
    { text: "Strategic Planning", path: "/services" },
  ],
  Company: [
    { text: "About Us", path: "/about" },
    { text: "Careers", path: "/careers" },
    { text: "Blog", path: "/blog" },
    { text: "Get Started", path: "/get-started" },
  ],
  Contact: [
    { icon: <Mail size={14} />, text: "info@clickspark.digital" },
    { icon: <Phone size={14} />, text: "+91 7082101534" },
    { icon: <MapPin size={14} />, text: "1280-A/29 Model Town Opposite Power House Rohtak Pin code - 124001" },
  ],
};

const Footer = () => {
  return (
    <div className="w-full px-4 sm:px-8 md:px-16 py-10 bg-[#1a1a1a] text-white">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
        {Object.entries(footerLinks).map(([title, items], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
          >
            <h3 className="text-sm font-semibold text-yellow-400 mb-3">{title}</h3>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i}>
                  {'path' in item ? (
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-yellow-400 text-sm block"
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <div className="flex items-start space-x-2 text-gray-300 text-sm">
                      {item.icon && <span className="text-yellow-400 mt-0.5">{item.icon}</span>}
                      <span className="break-words">{item.text}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} ClickSpark. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;