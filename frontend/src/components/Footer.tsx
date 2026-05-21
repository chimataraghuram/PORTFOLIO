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
        
        {/* The Edge of Reality Text */}
        <div className="pt-32 pb-12 flex items-center justify-center relative z-20">
          <Reveal delay={0.2}>
            <div className="flex flex-col items-center gap-6">
              <p className="text-xs sm:text-sm text-cyan-300 font-light uppercase tracking-[0.4em] sm:tracking-[0.6em] flex items-center justify-center drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] opacity-80">
                SIGNAL LOST IN THE VOID
              </p>
              <motion.div 
                className="w-[1px] h-16 bg-gradient-to-b from-cyan-500/80 to-transparent"
                animate={{ opacity: [0.3, 0.8, 0.3], scaleY: [0.8, 1.2, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </Reveal>
        </div>

      </div>

      {/* Volumetric Animated Event Horizon (End of Website) */}
      <div className="absolute bottom-0 inset-x-0 h-[250px] md:h-[300px] pointer-events-none z-0 overflow-hidden flex justify-center items-end">
        
        {/* Core Black Hole (The dark void pushing the light down) */}
        <div className="absolute bottom-[100px] w-[500px] md:w-[700px] h-[200px] rounded-[100%] bg-[#030510] blur-2xl z-10" />

        {/* Massive Ambient Atmosphere */}
        <motion.div 
          className="absolute bottom-[-100px] w-[150%] max-w-7xl h-[300px] bg-cyan-900/30 blur-[100px] rounded-[100%] z-0"
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* The Flat Accretion Disk (Left and Right wings of the light) */}
        <motion.div 
          className="absolute bottom-[130px] w-[200%] h-[40px] bg-gradient-to-r from-transparent via-violet-600 to-transparent blur-2xl z-0"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-[140px] w-[150%] h-[8px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent blur-[4px] z-0"
          animate={{ opacity: [0.6, 0.9, 0.6], scaleX: [0.98, 1.02, 0.98] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* The Deep "U" Curve (Bending Space-time under the black hole) */}
        <motion.div 
          className="absolute bottom-[-80px] w-[450px] md:w-[600px] h-[300px] rounded-[100%] border-[40px] border-b-violet-600 border-t-transparent border-l-transparent border-r-transparent blur-[25px] z-20"
          animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-[-40px] w-[350px] md:w-[450px] h-[220px] rounded-[100%] border-[15px] border-b-cyan-300 border-t-transparent border-l-transparent border-r-transparent blur-[10px] z-20"
          animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
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
