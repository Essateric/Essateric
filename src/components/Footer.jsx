import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="py-12 px-4 bg-black/80">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <a 
              href="mailto:essateric@gmail.com"
              className="inline-block text-gray-300 hover:text-[#00FFB2] transition-colors duration-300"
            >
              <FaEnvelope className="w-6 h-6 hover:shadow-[0_0_20px_rgba(0,255,178,0.6)]" />
            </a>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="#" className="text-gray-300 hover:text-purple-400">Home</a>
              <a href="#" className="text-gray-300 hover:text-purple-400">Services</a>
              <a href="#" className="text-gray-300 hover:text-purple-400">Case Studies</a>
              <a href="#" className="text-gray-300 hover:text-purple-400">Contact</a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/essateric/" 
                className="text-gray-300 hover:text-[#00FFB2] transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="w-6 h-6 hover:shadow-[0_0_20px_rgba(0,255,178,0.6)]" />
              </a>
              <a 
                href="https://www.instagram.com/essateric/" 
                className="text-gray-300 hover:text-[#00FFB2] transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6 hover:shadow-[0_0_20px_rgba(0,255,178,0.6)]" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-300 border-t border-gray-800 pt-8">
          <p>© 2025 Essateric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;