import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToContact = () => {
    const contactSection = document.querySelector('form');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900">
      <div className="absolute inset-0 -top-10 z-0">
        <Spline scene="https://prod.spline.design/IK8WXvM1rgyxfU-B/scene.splinecode" />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <motion.div 
          className="flex flex-col items-end mt-4 pr-8"
          style={{ y }}
        >
          <img 
            src="/essateric_white.png" 
            alt="Essateric Solutions Logo" 
            className="max-w-[437.5px] -mt-20"
          />
        </motion.div>
        <motion.div 
          className="text-center mt-[250px]"
          style={{ y, opacity }}
        >
          <p className="text-lg md:text-xl mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFB2] to-[#7D00FF] drop-shadow-[0_0_15px_rgba(0,255,178,0.3)]">
            Increase your customer influx and maximize profits with smart automation solutions.
          </p>
          <button 
            onClick={scrollToContact}
            className="btn-metallic-green px-6 py-3 mb-32 rounded-full font-bold"
          >
            Get a Free Consultation
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;