import React from 'react';

function Navigation() {
  const scrollToContact = () => {
    const contactSection = document.querySelector('form');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold futuristic-font bg-clip-text text-transparent bg-gradient-to-r from-[#00FFB2] to-[#7D00FF] drop-shadow-[0_0_15px_rgba(0,255,178,0.8)]">
            Transform Your Business with AI Automation
          </h2>
          <button 
            onClick={scrollToContact}
            className="btn-metallic-green px-6 py-2 rounded-full font-bold"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;