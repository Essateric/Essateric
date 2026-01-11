import React from 'react';
import { motion } from 'framer-motion';
import { UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();

  const handleSavaClick = () => {
    navigate('/sava');
    window.scrollTo(0, 0);
  };

  const services = [
    {
      icon: UserGroupIcon,
      title: 'Customer Acquisition Automation',
      description: 'AI-driven funnels and lead generation systems to effortlessly grow your business.',
      url: 'https://checkout.essateric.com/b/4gwdSlehL1ID3UkfZ1'
    },
    {
      icon: ChartBarIcon,
      title: 'Profit Growth Strategies',
      description: 'Tailored AI strategies designed to optimize revenue and business expansion.',
      url: 'https://checkout.essateric.com/b/3cs4hL6Pj5YTaiI9AA'
    }
  ];

  return (
    <section className="py-20 px-4 bg-black/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our AI-Powered Solutions
        </motion.h2>

        {/* SAVA Introduction */}
        <motion.div
          className="backdrop-blur-lg bg-black/50 rounded-2xl p-8 mb-16 shadow-[0_0_50px_rgba(255,255,255,0.15)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-[900px] h-[400px] flex items-center justify-center">
              <img 
                src="/SAVA.png" 
                alt="SAVA - Salon Virtual Assistant" 
                className="w-[900px] h-[400px] object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-white">Meet SAVA - Your Salon's AI Assistant</h3>
              <p className="text-gray-300 mb-6">
                SAVA (Salon Virtual Assistant) is our revolutionary AI receptionist that handles your salon's calls, 
                bookings, and appointment changes 24/7. Never miss another booking and let AI handle the routine 
                tasks while you focus on delivering exceptional service.
              </p>
              <button
                onClick={handleSavaClick}
                className="btn-metallic-green px-6 py-3 rounded-full text-black font-bold w-full md:w-auto self-center"
              >
                Learn More About SAVA
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 flex flex-col h-[400px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <service.icon className="h-12 w-12 text-white mb-6" />
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6 flex-grow">{service.description}</p>
              <a
                href={service.url}
                className="btn-metallic-green px-6 py-3 rounded-full text-black font-bold text-center mt-auto"
              >
                Purchase Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;