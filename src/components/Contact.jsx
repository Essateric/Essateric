import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
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
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length <= 3) {
      errors.firstName = 'First name must be more than 3 characters';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length <= 3) {
      errors.lastName = 'Last name must be more than 3 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validateUKMobile(formData.phone)) {
      errors.phone = 'Please enter a valid UK mobile number (e.g., 07123456789 or +447123456789)';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length <= 20) {
      errors.message = 'Message must be more than 20 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess(false);

  // Run validation first
  const isValid = validateForm();
  if (!isValid) {
    // Scroll to first error so the user sees it
    const firstErrorField = document.querySelector('.border-red-500');
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return; // Stop here — do NOT submit if invalid
  }

  setLoading(true);
  try {
    const webhookUrl = 'https://hook.eu2.make.com/3j85mnuvxdxprsupbmqd1qbz8ctqstot';
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    setSuccess(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    });
  } catch (err) {
    setError('Failed to send message. Please try again.');
    console.error('Form submission error:', err);
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="py-20 px-4 bg-black/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Scale Your Business?</h2>
          <p className="text-xl text-gray-300">Let AI do the heavy lifting while you focus on growth.</p>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg bg-white/5 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name *"
                className={`w-full bg-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FFB2] ${
                  validationErrors.firstName ? 'border border-red-500' : ''
                }`}
                required
              />
              {validationErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name *"
                className={`w-full bg-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FFB2] ${
                  validationErrors.lastName ? 'border border-red-500' : ''
                }`}
                required
              />
              {validationErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                className={`w-full bg-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FFB2] ${
                  validationErrors.email ? 'border border-red-500' : ''
                }`}
                required
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number *"
                className={`w-full bg-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FFB2] ${
                  validationErrors.phone ? 'border border-red-500' : ''
                }`}
                required
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
              )}
            </div>
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message *"
              rows="4"
              className={`w-full bg-white/10 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#00FFB2] ${
                validationErrors.message ? 'border border-red-500' : ''
              }`}
              required
            ></textarea>
            {validationErrors.message && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
            )}
          </div>
          
          {error && (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          )}
          {success && (
            <div className="text-white mb-4 text-center">Message sent successfully!</div>
          )}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`btn-metallic-green px-8 py-4 rounded-full font-bold 
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending...' : 'Book a Free Strategy Call'}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;