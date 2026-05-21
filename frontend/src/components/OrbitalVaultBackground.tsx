import React from 'react';
import { motion } from 'framer-motion';

const OrbitalVaultBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Holographic Floor Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/10 to-transparent" />
      <div 
        className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[60%] rounded-[100%]"
        style={{ 
          background: 'radial-gradient(ellipse at top, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
          transform: 'rotateX(60deg) translateX(-50%)'
        }}
      />

      {/* Slow Rotating Ambient Rings */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] border border-cyan-500/10 rounded-full"
        style={{ transformOrigin: 'center' }}
        animate={{ rotate: 360, x: '-50%', y: '-50%' }}
        transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] border border-purple-500/5 rounded-full"
        style={{ transformOrigin: 'center' }}
        animate={{ rotate: -360, x: '-50%', y: '-50%' }}
        transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Subtle Orbital Particles */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px]"
        style={{ transformOrigin: 'center' }}
        animate={{ rotate: 360, x: '-50%', y: '-50%' }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-[10%] left-[20%] w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
        <div className="absolute bottom-[20%] right-[30%] w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_8px_#c084fc]" />
        <div className="absolute top-[40%] right-[10%] w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_12px_#60a5fa] opacity-50" />
      </motion.div>
    </div>
  );
};

export default OrbitalVaultBackground;
