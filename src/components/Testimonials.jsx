import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    quote: "I was introduced to Shabnam by a business contact. I found Shabnam to be professional, friendly and efficient on first meeting her. I am working closely with Shabnam to setup my website which has been a real pleasure. She is dedicated, passionate and resourceful. Her communication skills are first class as is her attention to detail. Being a non-technical person, I felt supported and guided throughout the process. Shabnam has also been flexible and willing to work to a strict deadline without hesitation, working hard to complete this and adding her creative input at all times. I could not recommend Shabnam enough. She's gives 100%. Thank you for everything Shabnam it's been an absolute gift.",
    author: 'Lynne M',
    company: 'Spinal Flow Practitioner'
  },
  {
    quote: "Great Web Design & Startup Support! I had the pleasure of working with Shabnam to design my startup website, and I couldn't be more thrilled with the outcome. She created a lovely user friendly website. Her creativity, technical expertise, and keen attention to detail made everything seamless. She was always professional, responsive, and went above and beyond to ensure my website reflected my brand. Her insights and support were invaluable for my startup journey. If you're looking for a dedicated web designer who truly cares about your success, I highly recommend Shabnam.",
    author: 'Helen S',
    company: 'Air Holistics'
  },
  {
    quote: "Since implementing Essateric's Solutions, our salon has seen a dramatic increase in bookings and client retention. The automation is game-changing.",
    author: 'Martin K',
    company: 'The Edge HD Salon'
  },
  {
    quote: 'Shabnam is an amazing website designer. She was proactive and responsive in her approach, took time to listen to and understand our needs, and delivered our site in a timely manner. She was a pleasure to deal with and I would highly recommend her.',
    author: 'AK',
    company: ''
  },
  {
    quote: 'I had an excellent experience working with Shabnam during my website development. She was consistently professional and knowledgeable, taking the time to understand my needs and clearly explain each stage of the design and development process. Throughout the project, I felt well-informed, supported, and confident in her expertise. The final website exceeded my expectations, with a clean design, smooth functionality, and great attention to detail. Shabnam demonstrates a commitment to quality and client satisfaction which is truly impressive, and I would highly recommend her.',
    author: 'Patricia Reilly-Hurst',
    company: ''
  }
];

const responsiveVisibility = [
  'flex',
  'hidden md:flex',
  'hidden lg:flex',
  'hidden lg:flex'
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const moveCarousel = (step) => {
    setDirection(step);
    setExpandedIndex(null);
    setCurrentIndex((index) => (index + step + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setExpandedIndex(null);
    setCurrentIndex(index);
  };

  const visibleTestimonials = Array.from(
    { length: Math.min(4, testimonials.length) },
    (_, offset) => testimonials[(currentIndex + offset) % testimonials.length]
  );

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 50;

    if (info.offset.x <= -swipeThreshold) {
      moveCarousel(1);
    } else if (info.offset.x >= swipeThreshold) {
      moveCarousel(-1);
    }
  };

  return (
    <section id="results" className="scroll-mt-20 px-6 py-20 text-white sm:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#00FFB2]">Client feedback</p>
            <h2 className="text-4xl font-bold sm:text-5xl">Success Stories</h2>
          </motion.div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                className="grid touch-pan-y grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4"
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : direction * 70 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : direction * -70 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={handleDragEnd}
              >
                {visibleTestimonials.map((testimonial, position) => {
                  const testimonialIndex = (currentIndex + position) % testimonials.length;
                  const isExpanded = expandedIndex === testimonialIndex;

                  return (
                  <article
                    key={`${testimonial.author}-${position}`}
                    className={`${responsiveVisibility[position]} min-h-[430px] cursor-pointer flex-col self-start rounded-2xl border border-white/10 bg-white/5 px-7 py-8 backdrop-blur-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(0,255,178,0.4)] focus:outline-none focus:ring-2 focus:ring-[#00FFB2] sm:px-8`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} testimonial from ${testimonial.author}`}
                    onClick={() => setExpandedIndex(isExpanded ? null : testimonialIndex)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setExpandedIndex(isExpanded ? null : testimonialIndex);
                      }
                    }}
                  >
                    <span className="mb-7 block font-serif text-4xl font-bold leading-none text-[#00FFB2]" aria-hidden="true">&ldquo;</span>
                    <p className={`mb-4 flex-grow font-serif text-[17px] italic leading-[1.55] text-gray-300 ${isExpanded ? '' : 'line-clamp-6'}`}>
                      {testimonial.quote}
                    </p>
                    <span className="mb-6 text-sm font-semibold text-[#00FFB2]">
                      {isExpanded ? 'Show less' : 'Read full testimonial'}
                    </span>
                    <footer className="flex items-center gap-3 border-t border-white/10 pt-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00FFB2] to-[#7D00FF] text-sm font-semibold text-white" aria-hidden="true">
                        {testimonial.author.charAt(0)}
                      </span>
                      <div>
                        <p className="font-bold text-white">{testimonial.author}</p>
                        {testimonial.company && <p className="mt-0.5 text-xs text-[#00FFB2]">{testimonial.company}</p>}
                      </div>
                    </footer>
                  </article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <div aria-label="Testimonial carousel controls">
            <button
              type="button"
              onClick={() => moveCarousel(-1)}
              className="absolute -left-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white shadow-sm backdrop-blur transition-all hover:border-[#00FFB2] hover:bg-[#00FFB2] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#00FFB2] sm:-left-6"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => moveCarousel(1)}
              className="absolute -right-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white shadow-sm backdrop-blur transition-all hover:border-[#00FFB2] hover:bg-[#00FFB2] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#00FFB2] sm:-right-6"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2" aria-label="Choose starting testimonial">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.author}
              type="button"
              onClick={() => goToTestimonial(index)}
              className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00FFB2] focus:ring-offset-2 focus:ring-offset-black ${
                index === currentIndex
                  ? 'w-7 bg-[#00FFB2]'
                  : 'w-3 bg-white/25 hover:bg-white/50'
              }`}
              aria-label={`Show testimonial ${index + 1} first`}
              aria-current={index === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
