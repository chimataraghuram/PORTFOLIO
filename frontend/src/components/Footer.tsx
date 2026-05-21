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
      <div className="max-w-7xl mx-auto px-4 relative z-10 pt-4 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-12">
        
        {/* Bottom Row: Metadata Only */}
        <div className="pt-6 border-t border-white/5 flex items-center justify-center">
          <Reveal delay={0.2}>
            <p className="text-xs sm:text-sm text-red-500 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.65)] py-4">
              COOKED BY RAGHU ❤️
            </p>
          </Reveal>
        </div>

      </div>

      {/* Volumetric Animated Event Horizon (End of Website) */}
      <div className="absolute bottom-0 inset-x-0 h-[250px] md:h-[300px] pointer-events-none z-0 overflow-hidden flex justify-center items-end">
        
        {/* Core Black Hole (The dark void pushing the light down) */}
        <div className="absolute bottom-[100px] w-[500px] md:w-[700px] h-[200px] rounded-[100%] bg-[#030510] blur-2xl z-10" />

        {/* Massive Ambient Purple Atmosphere */}
        <motion.div 
          className="absolute bottom-[-100px] w-[150%] max-w-7xl h-[300px] bg-purple-700/40 blur-[100px] rounded-[100%] z-0"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* The Flat Accretion Disk (Left and Right wings of the light) */}
        <motion.div 
          className="absolute bottom-[130px] w-[200%] h-[40px] bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-2xl z-0"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-[140px] w-[150%] h-[8px] bg-gradient-to-r from-transparent via-white to-transparent blur-[4px] z-0"
          animate={{ opacity: [0.7, 1, 0.7], scaleX: [0.98, 1.02, 0.98] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* The Deep "U" Curve (Bending Space-time under the black hole) */}
        <motion.div 
          className="absolute bottom-[-80px] w-[450px] md:w-[600px] h-[300px] rounded-[100%] border-[40px] border-b-purple-600 border-t-transparent border-l-transparent border-r-transparent blur-[25px] z-20"
          animate={{ scale: [1, 1.03, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-[-40px] w-[350px] md:w-[450px] h-[220px] rounded-[100%] border-[15px] border-b-white border-t-transparent border-l-transparent border-r-transparent blur-[10px] z-20"
          animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        
        {/* Intense Hot Core inside the curve */}
        <motion.div 
          className="absolute bottom-[20px] w-[300px] h-[120px] bg-white/60 blur-[40px] rounded-[100%] z-20"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Very subtle particle dust floating in the core */}
        <motion.div 
          className="absolute bottom-[50px] w-[200px] h-[50px] bg-[radial-gradient(circle,white_2px,transparent_2px)] bg-[size:20px_20px] opacity-20 blur-[1px] z-30"
          style={{ maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)' }}
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </footer>
  );
};

export default Footer;
