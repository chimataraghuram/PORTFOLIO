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

      {/* Layer 2: Canvas Particle Engine (reacts to section) */}
      <NeuralParticles activeSection={activeSection} />

      {/* Layer 3: Premium Additive Lighting */}
      <InteractiveGlow />

      {/* Layer 4: Cinematic Focus Overlay (User requested background to be less distracting) */}
      <div className="absolute inset-0 bg-[#050816]/30 backdrop-blur-[2px] z-20 pointer-events-none" />
    </div>
  );
};

export default CinematicUniverse;
