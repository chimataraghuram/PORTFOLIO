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
      <div className="absolute bottom-0 inset-x-0 h-[400px] md:h-[500px] pointer-events-none z-0 overflow-hidden flex justify-center items-end">
        
        {/* Massive Ambient Atmosphere */}
        <motion.div 
          className="absolute bottom-[-150px] w-[300%] max-w-[250vw] h-[600px] bg-violet-900/40 blur-[150px] rounded-[100%] z-0"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* The Arch Curve (Bending Space-time OVER the black hole) */}
        <motion.div 
          className="absolute bottom-[-150px] w-[600px] md:w-[900px] h-[400px] rounded-[100%] border-[50px] border-t-violet-600 border-b-transparent border-l-transparent border-r-transparent blur-[30px] z-10"
          animate={{ scale: [1, 1.03, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-[-100px] w-[400px] md:w-[600px] h-[250px] rounded-[100%] border-[20px] border-t-white border-b-transparent border-l-transparent border-r-transparent blur-[12px] z-20"
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Core Black Hole (The dark void pushing the light away inside the arch) */}
        <div className="absolute bottom-[-50px] w-[400px] md:w-[600px] h-[200px] rounded-[100%] bg-[#02030a] blur-xl z-20" />
        
        {/* Intense Hot Core inside the black hole base */}
        <motion.div 
          className="absolute bottom-[10px] w-[200px] h-[50px] bg-violet-300/40 blur-[30px] rounded-[100%] z-20"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.1, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* The Flat Accretion Disk (The bright flat line at the absolute bottom) */}
        <motion.div 
          className="absolute bottom-[-10px] w-[300%] h-[40px] bg-gradient-to-r from-transparent via-violet-500 to-transparent blur-[20px] z-30"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-[0px] w-[200%] h-[6px] bg-gradient-to-r from-transparent via-white to-transparent blur-[3px] z-30"
          animate={{ opacity: [0.8, 1, 0.8], scaleX: [0.98, 1.05, 0.98] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Cinematic Ending Moment: The Anomaly Pulse (Slow moving energy ripple) */}
        <motion.div 
          className="absolute bottom-[0px] w-[200%] h-[2px] bg-white blur-[2px] z-30"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: [0, 0.9, 0], scaleX: [0, 1.2, 1.5] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeOut', delay: 2 }}
        />

        {/* Very subtle particle dust floating in the core */}
        <motion.div 
          className="absolute bottom-[20px] w-[400px] h-[100px] bg-[radial-gradient(circle,white_2px,transparent_2px)] bg-[size:25px_25px] opacity-10 blur-[2px] z-30 pointer-events-none"
          style={{ maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)' }}
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </footer>
  );
};

export default Footer;
