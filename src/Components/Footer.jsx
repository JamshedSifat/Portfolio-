import React from 'react';
import SocialIcon from './SocialIcon/SocialIcon';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="font-bold text-lg">Protfolio</p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Jamshed Sifat. All rights reserved.
            </p>
          </div>

          {/* Right */}
          <div className="flex gap-4">
            <SocialIcon />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;