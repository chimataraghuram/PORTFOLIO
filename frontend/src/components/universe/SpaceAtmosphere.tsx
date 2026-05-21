import React from 'react';
import { motion } from 'framer-motion';

/**
 * Layer 1: Deep Space Atmosphere
 * Creates infinite cinematic depth using slow-moving blurred gradients
 * and very subtle CSS noise.
 */
const SpaceAtmosphere: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Base deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0B1026] to-[#050816]" />

      {/* Massive subtle nebula clouds */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-cyan-900/20 mix-blend-screen"
        animate={{
          x: ['0%', '5%', '0%'],
          y: ['0%', '3%', '0%'],
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-[40%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[140px] bg-violet-900/15 mix-blend-screen"
        animate={{
          x: ['0%', '-5%', '0%'],
          y: ['0%', '-3%', '0%'],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      <motion.div
        className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full blur-[150px] bg-blue-900/20 mix-blend-screen"
        animate={{
          x: ['0%', '4%', '0%'],
          y: ['0%', '-4%', '0%'],
          scale: [1, 1.02, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
      />

      {/* Optional: Add SVG noise filter here if extremely subtle texture is desired */}
    </div>
  );
};

export default SpaceAtmosphere;
