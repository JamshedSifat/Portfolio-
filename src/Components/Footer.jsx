import React from 'react';
import { useTheme } from '../Components/Context/ThemeContext';
import SocialIcon from './SocialIcon/SocialIcon';
import { motion } from 'framer-motion';

const Footer = () => {
  const { isDarkMode } = useTheme();

  const footerLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Services', href: '/services' },
  ];

  const quickLinks = [
    { name: 'GitHub', href: 'https://github.com/JamshedSifat' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jamshed-sefat-607982298/' },
    { name: 'Twitter', href: 'https://x.com/JamshedSifat' },
    { name: 'Facebook', href: 'https://www.facebook.com/jamshedsifat' },
  ];

  return (
    <footer className={`relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-100'
    }`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-10 animate-pulse ${
          isDarkMode ? 'bg-purple-500' : 'bg-purple-300'
        }`}></div>
        <div className={`absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl opacity-10 animate-pulse animation-delay-2000 ${
          isDarkMode ? 'bg-blue-500' : 'bg-blue-300'
        }`}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className={`text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-3`}>
              Portfolio
            </h2>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Turning ideas into modern web experiences with passion and creativity.
            </p>
            <div className="flex gap-3 mt-4">
              <SocialIcon />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className={`font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className={`text-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-purple-400' 
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Social Links with target="_blank" */}
          <div>
            <h4 className={`font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-purple-400' 
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                <span className="mr-2">📧</span> 
                <a 
                  href="mailto:mdjamshedsifat@gmail.com" 
                  className="hover:text-purple-500 transition"
                >
                  mdjamshedsifat@gmail.com
                </a>
              </li>
              <li className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                <span className="mr-2">📱</span> 
                <a 
                  href="tel:+8801966147075" 
                  className="hover:text-purple-500 transition"
                >
                  +880 1966-147075
                </a>
              </li>
              <li className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                <span className="mr-2">📍</span> Dhaka, Kalabagan, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className={`pt-6 border-t ${
          isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © {new Date().getFullYear()} Jamshed Sifat. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4 text-sm">
              <a 
                href="#" 
                className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Privacy Policy
              </a>
              <span className={isDarkMode ? 'text-gray-600' : 'text-gray-300'}>|</span>
              <a 
                href="#" 
                className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Terms of Service
              </a>
            </div>

            {/* Back to Top Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-purple-500/20 text-purple-400' 
                  : 'bg-gray-200 hover:bg-purple-500/10 text-purple-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;