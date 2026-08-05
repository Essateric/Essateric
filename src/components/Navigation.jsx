import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl" aria-label="Main navigation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="shrink-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#00FFB2] focus:ring-offset-4 focus:ring-offset-black"
            aria-label="Go to homepage top"
          >
            <img src="/essateric_white.png" alt="Essateric" className="h-auto w-36 sm:w-40" />
          </button>

          <div className="hidden items-center gap-7 lg:flex">
            <button onClick={() => scrollToSection('solutions')} className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Solutions</button>
            <Link to="/sava" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">SAVA</Link>
            <Link to="/esops" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">EsOps</Link>
            <button onClick={() => scrollToSection('results')} className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Results</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Contact</button>
            <button onClick={() => scrollToSection('contact')} className="btn-metallic-green rounded-full px-5 py-2.5 text-sm font-bold text-black">Enquire now</button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#00FFB2] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" className="relative block h-4 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-navigation" className="border-t border-white/10 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              <button onClick={() => scrollToSection('solutions')} className="rounded-lg px-3 py-3 text-left font-medium text-gray-200 hover:bg-white/5">Solutions</button>
              <Link to="/sava" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 font-medium text-gray-200 hover:bg-white/5">SAVA</Link>
              <Link to="/esops" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 font-medium text-gray-200 hover:bg-white/5">EsOps</Link>
              <button onClick={() => scrollToSection('results')} className="rounded-lg px-3 py-3 text-left font-medium text-gray-200 hover:bg-white/5">Results</button>
              <button onClick={() => scrollToSection('contact')} className="rounded-lg px-3 py-3 text-left font-medium text-gray-200 hover:bg-white/5">Contact</button>
              <button onClick={() => scrollToSection('contact')} className="btn-metallic-green mt-3 rounded-full px-5 py-3 font-bold text-black">Enquire now</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
