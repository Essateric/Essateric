import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "I was introduced to Shabnam by a business contact. I found Shabnam to be professional, friendly and efficient on first meeting her. I am working closely with Shabnam to setup my website which has been a real pleasure. She is dedicated, passionate and resourceful. Her communication skills are first class as is her attention to detail. Being a non-technical person, I felt supported and guided throughout the process. Shabnam has also been flexible and willing to work to a strict deadline without hesitation, working hard to complete this and adding her creative input at all times. I could not recommend Shabnam enough. She's gives 100%. Thank you for everything Shabnam it's been an absolute gift.",
      author: "Lynne M",
      company: "Spinal Flow Practitioner"
    },
    {
      quote: "Great Web Design & Startup Support! I had the pleasure of working with Shabnam to design my startup website, and I couldn't be more thrilled with the outcome. She created a lovely user friendly website. Her creativity, technical expertise, and keen attention to detail made everything seamless. She was always professional, responsive, and went above and beyond to ensure my website reflected my brand. Her insights and support were invaluable for my startup journey. If you're looking for a dedicated web designer who truly cares about your success, I highly recommend Shabnam",
      author: "Helen S",
      company: "Air Holistics"
    },
    {
      quote: "Since implementing Essateric's solutions, our salon has seen a dramatic increase in bookings and client retention. The automation is game-changing.",
      author: "Martin K",
      company: "The Edge HD Salon"
    },
    {
      quote: "Shabnam is an amazing website designer. She was proactive & responsive in her approach, took time to listen to and understand our needs & delivered our site in a timely manner. She was a pleasure to deal with and I would highly recommend her.",
      author: "AK",
      company: ""
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Success Stories
        </motion.h2>
        
        <div className="relative h-[400px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute w-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 hover:shadow-[0_0_50px_rgba(0,255,178,0.4)] transition-all duration-500">
                <p className="text-lg mb-6 text-gray-300 italic">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <p className="font-bold">{testimonials[currentIndex].author}</p>
                  {testimonials[currentIndex].company && (
                    <p className="text-[#00FFB2]">{testimonials[currentIndex].company}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#00FFB2] w-6' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;