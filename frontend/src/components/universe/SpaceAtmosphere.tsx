import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpaceAtmosphereProps {
  activeSection?: string;
}

const SpaceAtmosphere: React.FC<SpaceAtmosphereProps> = ({ activeSection = 'home' }) => {
  // Determine opacity based on section (Cinematic pacing & void zones)
  const isHero = activeSection === 'home';
  const isAbout = activeSection === 'about';
  const isProjects = activeSection === 'projects';
  const isContact = activeSection === 'contact';
  
  // Hero is intense, About is calm/dark, Projects is orbital glow, Contact is dark signal
  const globalOpacity = isHero ? 1 : isAbout ? 0.4 : isProjects ? 0.8 : isContact ? 0.3 : 0.6;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* 1. Base Deep Space Void (The absolute background) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030510] via-[#080d1a] to-[#030510]" />

      {/* 2. Void Zones (Dark areas behind content for readability - Content Priority) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)] opacity-80" />
      
      {/* 3. Advanced Volumetric Fog Layers */}
      <AnimatePresence>
        <motion.div
          key="atmosphere-layers"
          initial={{ opacity: 0 }}
          animate={{ opacity: globalOpacity }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* FAR DEPTH FOG (Slow, massive, subtle cyan/purple) */}
          <motion.div
            className="absolute top-[-30%] left-[-20%] w-[100%] h-[100%] rounded-full opacity-30 mix-blend-screen blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 60%)' }}
            animate={{
              x: ['0%', '5%', '0%'],
              y: ['0%', '3%', '0%'],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* MID DEPTH FOG (Moderate speed, purple/blue focus) */}
          <motion.div
            className="absolute top-[20%] right-[-30%] w-[80%] h-[80%] rounded-full opacity-40 mix-blend-screen blur-2xl"
            style={{ 
              background: isContact 
                ? 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)' 
                : 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)' 
            }}
            animate={{
              x: ['0%', '-8%', '0%'],
              y: ['0%', '-5%', '0%'],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          {/* FOREGROUND DEPTH FOG (Faster drifting atmospheric clouds) */}
          <motion.div
            className="absolute bottom-[-10%] left-[10%] w-[60%] h-[60%] rounded-full opacity-50 mix-blend-screen blur-2xl"
            style={{ 
              background: isProjects 
                ? 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 60%)' 
                : 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 60%)' 
            }}
            animate={{
              x: ['0%', '10%', '0%'],
              y: ['0%', '-8%', '0%'],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SpaceAtmosphere;
