import React, { useEffect, useState } from 'react';
import SpaceAtmosphere from './SpaceAtmosphere';
import NeuralParticles from './NeuralParticles';
import InteractiveGlow from './InteractiveGlow';

/**
 * The core wrapper for the entire cinematic background experience.
 * Tracks the current section to adjust the environmental state.
 */
const CinematicUniverse: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Simple IntersectionObserver to determine the current active section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: '-30% 0px -70% 0px' // Triggers when section is in the top 30% of viewport
    });

    // Observe all main sections
    ['home', 'about', 'skills', 'projects', 'contact', 'minigame'].forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#050816]">
      {/* Layer 1: Deep Cinematic Space (reacts to section) */}
      <SpaceAtmosphere activeSection={activeSection} />

      {/* Layer 2: Canvas Particle Engine — dimmed on hero (hero has its own universe) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          activeSection === 'home' ? 'opacity-[0.28]' : 'opacity-100'
        }`}
      >
        <NeuralParticles activeSection={activeSection} />
      </div>

      {/* Layer 3: Premium Additive Lighting */}
      <InteractiveGlow />

      {/* Layer 4: Section-aware focus overlay */}
      <div
        className={`absolute inset-0 z-20 pointer-events-none transition-all duration-1000 ${
          activeSection === 'home'
            ? 'bg-[#050816]/10 backdrop-blur-[1px]'
            : 'bg-[#050816]/30 backdrop-blur-[2px]'
        }`}
      />
    </div>
  );
};

export default CinematicUniverse;
