import React from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import { Linkedin, Github, Send, Mail, Globe, Heart, MousePointer2 } from 'lucide-react';
import Reveal from './Reveal';
import Dashboard from './Dashboard';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent relative overflow-hidden border-t border-white/5">
      <Dashboard />
      
      {/* Spacer to allow scrolling past the dashboard to see the full black hole without overlapping */}
      <div className="h-[300px] md:h-[400px] w-full relative z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 pt-4 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-12">
        


      </div>

      {/* Volumetric Animated Event Horizon (End of Website) */}
      <div className="absolute bottom-0 inset-x-0 h-[400px] md:h-[500px] pointer-events-none z-0 flex justify-center items-end">
        
        {/* Massive Ambient Atmosphere */}
        <motion.div 
          className="absolute bottom-[-150px] w-[300%] max-w-[250vw] h-[600px] bg-violet-900/40 blur-[150px] rounded-[100%] z-0"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* --- PERFECT ARCH CONTAINER --- */}
        {/* This container has overflow-hidden at the bottom, creating a perfect horizontal cut for the arches */}
        <div className="absolute bottom-[20px] w-full h-[400px] flex justify-center items-end overflow-hidden">
          
          {/* Outer Violet Arch (Solid ring pushed down so only the top half is visible) */}
          <motion.div 
            className="absolute bottom-[-300px] md:bottom-[-450px] w-[600px] md:w-[900px] h-[600px] md:h-[900px] rounded-full border-[20px] md:border-[35px] border-violet-600/80 blur-[6px] shadow-[0_0_50px_rgba(139,92,246,0.6)] z-10"
            animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Inner White Arch */}
          <motion.div 
            className="absolute bottom-[-200px] md:bottom-[-300px] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full border-[12px] md:border-[20px] border-white blur-[2px] shadow-[0_0_30px_rgba(255,255,255,0.8),inset_0_0_30px_rgba(255,255,255,0.8)] z-20"
            animate={{ scale: [1, 1.03, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Core Black Void */}
          <div className="absolute bottom-[-175px] md:bottom-[-275px] w-[350px] md:w-[550px] h-[350px] md:h-[550px] rounded-full bg-[#02030a] shadow-[0_0_50px_rgba(2,3,10,1),inset_0_0_50px_rgba(2,3,10,1)] z-20" />
        </div>
        
        {/* The Flat Accretion Disk (The bright flat line exactly where the arches are cut) */}
        <motion.div 
          className="absolute bottom-[10px] w-[300%] h-[30px] bg-gradient-to-r from-transparent via-violet-600 to-transparent blur-[15px] z-30"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-[18px] w-[200%] h-[6px] bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] shadow-[0_0_20px_rgba(255,255,255,1)] z-30"
          animate={{ opacity: [0.8, 1, 0.8], scaleX: [0.98, 1.05, 0.98] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Cinematic Ending Moment: The Anomaly Pulse (Slow moving energy ripple) */}
        <motion.div 
          className="absolute bottom-[20px] w-[200%] h-[2px] bg-white blur-[1px] z-30"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: [0, 0.9, 0], scaleX: [0, 1.2, 1.5] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeOut', delay: 2 }}
        />

        {/* Very subtle particle dust floating in the core */}
        <motion.div 
          className="absolute bottom-[30px] w-[400px] h-[100px] bg-[radial-gradient(circle,white_2px,transparent_2px)] bg-[size:25px_25px] opacity-10 blur-[2px] z-30 pointer-events-none"
          style={{ maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)' }}
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </footer>
  );
};

export default Footer;
