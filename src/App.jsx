import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VoiceflowWidget from './components/VoiceflowWidget';
import Checkout from './components/Checkout';
import Sava from './pages/Sava';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/sava" element={<Sava />} />
          <Route path="/checkout/:priceId" element={<Checkout />} />
          <Route path="/" element={
            <>
              <Navigation />
              <Hero />
              <Services />
              <Testimonials />
              <Contact />
              <Footer />
              <VoiceflowWidget />
            </>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;