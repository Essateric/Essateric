import React from 'react';
import { motion } from 'framer-motion';

function Hero() {
  const scrollToContact = () => {
    const contactSection = document.querySelector('form');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToSolutions = () => {
    const solutionsSection = document.getElementById('solutions');
    solutionsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative isolate flex min-h-[82vh] items-center overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_25%,rgba(125,0,255,0.16),transparent_35%),radial-gradient(circle_at_20%_75%,rgba(0,255,178,0.12),transparent_35%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <img 
            src="/essateric_white.png" 
            alt="Essateric Solutions Logo" 
            className="mb-10 h-auto w-44 sm:w-52"
          />

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#00FFB2] sm:text-base">
            Practical AI automation for growing businesses
          </p>

          <h1 className="futuristic-font max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Turn more enquiries into customers—without adding more admin.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
            Essateric builds AI systems that capture leads, manage bookings, and simplify daily operations so your team can focus on growth.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={scrollToContact}
              className="btn-metallic-green rounded-full px-7 py-3.5 font-bold text-black"
            >
              Book a free consultation
            </button>
            <button
              type="button"
              onClick={scrollToSolutions}
              className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-bold text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#00FFB2] focus:ring-offset-2 focus:ring-offset-black"
            >
              Explore our solutions
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
