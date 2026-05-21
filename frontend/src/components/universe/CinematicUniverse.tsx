import React from 'react';
import SpaceAtmosphere from './SpaceAtmosphere';
import NeuralParticles from './NeuralParticles';
import InteractiveGlow from './InteractiveGlow';

/**
 * The core wrapper for the entire cinematic background experience.
 * Orchestrates layers:
 * - Layer 1: SpaceAtmosphere (Nebula fog, cosmic dust)
 * - Layer 2: NeuralParticles (Interactive AI nodes & lines)
 * - Layer 3: InteractiveGlow (Mouse-tracking spotlight)
 */
const CinematicUniverse: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#050816]">
      {/* Layer 1: Deep Cinematic Space */}
      <SpaceAtmosphere />

      {/* Layer 2: Canvas Particle Engine */}
      <NeuralParticles />

      {/* Layer 3: Premium Additive Lighting */}
      <InteractiveGlow />
    </div>
  );
};

export default CinematicUniverse;
