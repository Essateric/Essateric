import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-8 text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Revolutionizing Business Growth Through AI
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-600 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          At Essateric, we specialize in creating cutting-edge websites, automating customer acquisition, 
          and implementing profit-boosting strategies tailored for medium-sized businesses. 
          Our AI-driven solutions are designed to optimize efficiency and maximize revenue.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { stat: '100+', label: 'Businesses Automated' },
            { stat: '2X', label: 'Customer Engagement' },
            { stat: '50%', label: 'Revenue Increase' }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 text-center shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-4xl font-bold text-[#7D00FF] mb-2">{item.stat}</h3>
              <p className="text-gray-600">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;