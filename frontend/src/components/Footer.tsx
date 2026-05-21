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
        
        {/* Core Black Hole (The dark void pushing the light down) */}
        <div className="absolute bottom-[100px] w-[800px] md:w-[1200px] h-[300px] rounded-[100%] bg-[#02030a] blur-3xl z-10" />

        {/* Massive Ambient Atmosphere (Bleeds far up into the section above) */}
        <motion.div 
          className="absolute bottom-[-200px] w-[300%] max-w-[250vw] h-[700px] bg-cyan-900/30 blur-[150px] rounded-[100%] z-0"
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* The Flat Accretion Disk (Left and Right wings of the light, massively scaled) */}
        <motion.div 
          className="absolute bottom-[150px] w-[300%] h-[60px] bg-gradient-to-r from-transparent via-violet-600 to-transparent blur-[40px] z-0"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-[160px] w-[200%] h-[12px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent blur-[8px] z-0"
          animate={{ opacity: [0.6, 0.8, 0.6], scaleX: [0.98, 1.05, 0.98] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Cinematic Ending Moment: The Anomaly Pulse (Slow moving energy ripple) */}
        <motion.div 
          className="absolute bottom-[160px] w-[200%] h-[4px] bg-white blur-[4px] z-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: [0, 0.8, 0], scaleX: [0, 1.2, 1.5] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeOut', delay: 2 }}
        />

        {/* The Deep "U" Curve (Bending Space-time under the black hole) */}
        <motion.div 
          className="absolute bottom-[-150px] w-[800px] md:w-[1200px] h-[500px] rounded-[100%] border-[60px] border-b-violet-600 border-t-transparent border-l-transparent border-r-transparent blur-[40px] z-20"
          animate={{ scale: [1, 1.03, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-[-80px] w-[550px] md:w-[800px] h-[350px] rounded-[100%] border-[20px] border-b-cyan-300 border-t-transparent border-l-transparent border-r-transparent blur-[15px] z-20"
          animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        
        {/* Intense Hot Core inside the curve */}
        <motion.div 
          className="absolute bottom-[20px] w-[500px] h-[200px] bg-white/40 blur-[60px] rounded-[100%] z-20"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.1, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Very subtle particle dust floating in the core */}
        <motion.div 
          className="absolute bottom-[50px] w-[400px] h-[100px] bg-[radial-gradient(circle,white_2px,transparent_2px)] bg-[size:25px_25px] opacity-10 blur-[2px] z-30"
          style={{ maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)' }}
          animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </footer>
  );
};

export default Footer;
