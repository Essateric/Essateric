import React, { useState, useEffect } from "react";
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

function EsopsSalesPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    requestType: 'trial',
    isFreeTrialRequest: false
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateUKMobile = (phone) => {
    const re = /^(?:(?:\+44)|(?:0))7\d{9}$/;
    return re.test(phone.replace(/\s+/g, ''));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.businessName.trim()) {
      errors.businessName = 'Business name is required';
    } else if (formData.businessName.trim().length <= 3) {
      errors.businessName = 'Business name must be more than 3 characters';
    }

    if (!formData.businessEmail.trim()) {
      errors.businessEmail = 'Email is required';
    } else if (!validateEmail(formData.businessEmail)) {
      errors.businessEmail = 'Please enter a valid email';
    }

    if (!formData.businessPhone.trim()) {
      errors.businessPhone = 'Phone number is required';
    } else if (!validateUKMobile(formData.businessPhone)) {
      errors.businessPhone = 'Please enter a valid UK mobile number (e.g., 07123456789 or +447123456789)';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    if (name === 'requestType') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        isFreeTrialRequest: value === 'trial'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const getFormHeader = () => {
    switch(formData.requestType) {
      case 'demo':
        return 'Book Your EsOps Demo';
      case 'consultation':
        return 'Schedule Your Operations Consultation';
      case 'trial':
        return 'Start Your 7-Day Free Trial';
      case 'quote':
        return 'Get Your Custom Quote';
      default:
        return 'Get in Touch';
    }
  };

  const getFormDescription = () => {
    switch(formData.requestType) {
      case 'demo':
        return 'See how EsOps streamlines daily coffee shop operations.';
      case 'consultation':
        return 'Let\'s map your workflow and unlock more profitable shifts.';
      case 'trial':
        return 'Experience the all-in-one command center for your cafe.';
      case 'quote':
        return 'We\'ll build a tailored plan for your locations and menu.';
      default:
        return 'Let us know how we can help you run smoother shifts.';
    }
  };

  const scrollToContact = (isTrial = false) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      setFormData(prev => ({
        ...prev,
        requestType: isTrial ? 'trial' : prev.requestType,
        isFreeTrialRequest: isTrial
      }));
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const webhookUrl = 'https://hook.eu2.make.com/3j85mnuvxdxprsupbmqd1qbz8ctqstot';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'EsOps Landing Page',
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSuccess(true);
      setFormData({
        businessName: '',
        businessEmail: '',
        businessPhone: '',
        requestType: 'trial',
        isFreeTrialRequest: false
      });
    } catch (err) {
      setError('Failed to send message. Please call on 07305 422 191 for a chat instead.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute top-4 left-4 z-10">
        <a 
          href="/" 
          className="flex items-center gap-2 bg-transparent"
        >
          <img src="/back.png" alt="Back" className="w-30 h-20" />
        </a>
      </div>

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black mb-8 pt-12">
        <div className="absolute inset-0 z-0">
          <Spline scene="https://prod.spline.design/DAXJFamnDMsA27G3/scene.splinecode" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gray-800/80 rounded-full transform scale-105"></div>
              <img 
                src="/esops-logo.svg" 
                alt="EsOps Logo" 
                className="relative z-10 w-full max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[437.5px] h-auto"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#fe924f] text-center">
              Run Every Shift Like Clockwork
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 text-center max-w-3xl">
              EsOps is your AI-powered coffee shop operations hub — optimizing staffing, inventory, and service flow in one place.
            </p>
            <button
              onClick={() => scrollToContact(true)}
              className="btn-metallic px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-bold"
            >
              Start Your Free Trial
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-2xl font-semibold mb-8 text-center text-[#fe924f]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            See EsOps In Action
          </motion.h2>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 mb-8">
              Walk through your ideal day — from opening checks to rush-hour control and end-of-day reports.
            </p>
            <button
              onClick={() => scrollToContact(false)}
              className="btn-metallic px-8 py-4 rounded-full text-white font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              Book a Demo
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-2xl font-semibold mb-8 text-center text-[#fe924f]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Espresso-Powered Insights In Minutes
          </motion.h2>
          <motion.div 
            className="aspect-w-16 aspect-h-9"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              className="w-full h-96 rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/your_demo_video_id"
              title="EsOps Demo"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-2xl font-semibold mb-8 text-center text-[#fe924f]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Coffee Shops Choose EsOps
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              'Forecast demand with AI-driven prep lists',
              'Track inventory, wastage, and supplier orders',
              'Schedule staff around peak-time patterns',
              'Centralize SOPs and checklists for every shift',
              'Sync POS data to live profit dashboards',
              'Reduce wait times with service-flow playbooks'
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 flex items-start gap-4"
                whileHover={{ scale: 1.05 }}
              >
                <FaCheck className="text-[#fe924f] flex-shrink-0 mt-1" />
                <span className="text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-2xl font-semibold text-center mb-8 text-[#fe924f]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 flex flex-col h-[400px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-[#fe924f]">Starter</h3>
              <p className="mb-8 flex-grow text-gray-300">Daily checklists + inventory tracking</p>
              <div className="mt-auto">
                <div className="mb-4">
                  <p className="text-sm line-through opacity-50">Set Up £120</p>
                  <p className="text-[#fe924f]">Introductory free set-up</p>
                </div>
                <div className="mb-6">
                  <p className="text-2xl font-bold line-through opacity-50">£99/month</p>
                  <p className="text-2xl font-bold text-[#fe924f]">£69/month</p>
                </div>
                <a 
                  href="https://checkout.essateric.com/b/4gwdSlehL1ID3UkfZ1"
                  className="btn-metallic block w-full px-6 py-3 rounded-full text-white font-semibold text-center"
                >
                  Buy Now
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 flex flex-col h-[400px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-[#fe924f]">Growth</h3>
              <p className="mb-8 flex-grow text-gray-300">Scheduling + SOP automation + dashboards</p>
              <div className="mt-auto">
                <div className="mb-4 invisible">
                  <p className="text-sm">&nbsp;</p>
                  <p>&nbsp;</p>
                </div>
                <div className="mb-6">
                  <p className="text-2xl font-bold text-[#fe924f]">£220/month</p>
                </div>
                <a 
                  href="https://checkout.essateric.com/b/3cs4hL6Pj5YTaiI9AA"
                  className="btn-metallic block w-full px-6 py-3 rounded-full text-white font-semibold text-center"
                >
                  Buy Now
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 flex flex-col h-[400px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-[#fe924f]">Multi-Location</h3>
              <p className="mb-8 flex-grow text-gray-300">Enterprise controls for growing cafe groups</p>
              <div className="mt-auto">
                <div className="mb-4 invisible">
                  <p className="text-sm">&nbsp;</p>
                  <p>&nbsp;</p>
                </div>
                <div className="mb-6">
                  <p className="text-xl font-bold text-[#fe924f]">Let\'s Talk</p>
                </div>
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, requestType: 'quote' }));
                    scrollToContact(false);
                  }}
                  className="btn-metallic w-full px-6 py-3 rounded-full text-white font-semibold"
                >
                  Get Custom Quote
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-2xl font-semibold text-center mb-8 text-[#fe924f]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Cafe Owners Are Saying
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              {
                quote: "EsOps replaced three spreadsheets and gave me my evenings back.",
                author: "Clover Street Coffee"
              },
              {
                quote: "We cut waste by 18% in the first month just by following the prep insights.",
                author: "Northside Roasters"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="backdrop-blur-lg bg-white/5 rounded-2xl p-8"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-300 italic mb-4">{testimonial.quote}</p>
                <p className="text-[#fe924f] font-semibold">— {testimonial.author}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="max-w-xl mx-auto backdrop-blur-lg bg-white/5 rounded-2xl p-8 shadow-lg">
          <motion.h2 
            className="text-2xl font-semibold mb-4 text-center text-[#fe924f]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {getFormHeader()}
          </motion.h2>
          <motion.p 
            className="text-center mb-6 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {getFormDescription()}
          </motion.p>
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Business Name *"
                className={`w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fe924f] ${
                  validationErrors.businessName ? 'border border-red-500' : ''
                }`}
                required
              />
              {validationErrors.businessName && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.businessName}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                id="businessEmail"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                placeholder="Business Email *"
                className={`w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fe924f] ${
                  validationErrors.businessEmail ? 'border border-red-500' : ''
                }`}
                required
              />
              {validationErrors.businessEmail && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.businessEmail}</p>
              )}
            </div>
            <div>
              <input
                type="tel"
                id="businessPhone"
                name="businessPhone"
                value={formData.businessPhone}
                onChange={handleChange}
                placeholder="Business Phone *"
                className={`w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fe924f] ${
                  validationErrors.businessPhone ? 'border border-red-500' : ''
                }`}
                required
              />
              {validationErrors.businessPhone && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.businessPhone}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="requestType"
                  value="demo"
                  checked={formData.requestType === 'demo'}
                  onChange={handleChange}
                  className="text-[#fe924f]"
                />
                <span>Product Demo</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="requestType"
                  value="consultation"
                  checked={formData.requestType === 'consultation'}
                  onChange={handleChange}
                  className="text-[#fe924f]"
                />
                <span>Free Consultation</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="requestType"
                  value="trial"
                  checked={formData.requestType === 'trial'}
                  onChange={handleChange}
                  className="text-[#fe924f]"
                />
                <span>7 Days Free Trial</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="requestType"
                  value="quote"
                  checked={formData.requestType === 'quote'}
                  onChange={handleChange}
                  className="text-[#fe924f]"
                />
                <span>Get Custom Quote</span>
              </label>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-500/10 border border-green-500 rounded-lg text-[#fe924f] text-center">
                Thanks! We'll be in touch shortly to get you started.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`btn-metallic w-full px-6 py-3 rounded-full text-white font-semibold 
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending...' : 'Get Started'}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}

export default EsopsSalesPage;