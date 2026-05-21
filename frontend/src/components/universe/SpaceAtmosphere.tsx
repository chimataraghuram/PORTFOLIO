import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpaceAtmosphereProps {
  activeSection?: string;
}

const SpaceAtmosphere: React.FC<SpaceAtmosphereProps> = ({ activeSection = 'home' }) => {
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0;
        setScrollRatio(Math.max(0, Math.min(1, ratio)));
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine base opacity based on section (breathing room / cinematic pacing)
  const isHero = activeSection === 'home';
  const isProjects = activeSection === 'projects';
  const isContact = activeSection === 'contact';
  
  const baseOpacity = isHero ? 1 : isProjects ? 0.8 : 0.5;

  // As the user approaches the Event Horizon at the bottom, gradually dim the entire universe to near absolute black.
  // 0.6 = 60% scrolled (start fading). 1.0 = bottom (0.1 opacity)
  const singularityFade = scrollRatio > 0.6 ? 1 - ((scrollRatio - 0.6) / 0.4) * 0.9 : 1; 
  const globalOpacity = baseOpacity * singularityFade;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {/* Base deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0B1026] to-[#050816]" />

      <AnimatePresence>
        <motion.div
          key="atmosphere-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: globalOpacity }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Atmospheric Fog Zones (Radial Gradients, zero-cost rendering) */}
          <motion.div
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full"
            style={{ background: isProjects ? 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(22, 78, 99, 0.25) 0%, transparent 70%)' }}
            animate={{
              x: ['0%', '5%', '0%'],
              y: ['0%', '3%', '0%'],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute top-[40%] right-[-10%] w-[70%] h-[70%] rounded-full"
            style={{ background: isContact ? 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(76, 29, 149, 0.2) 0%, transparent 70%)' }}
            animate={{
              x: ['0%', '-5%', '0%'],
              y: ['0%', '-3%', '0%'],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />

          <motion.div
            className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(30, 58, 138, 0.25) 0%, transparent 70%)' }}
            animate={{
              x: ['0%', '4%', '0%'],
              y: ['0%', '-4%', '0%'],
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Static Tiny Stars (Far distance) */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0))', backgroundSize: '200px 200px' }} />
    </div>
  );
};

export default SpaceAtmosphere;
