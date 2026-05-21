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
      <div className="absolute bottom-0 inset-x-0 h-[500px] md:h-[600px] pointer-events-none z-0 flex justify-center items-end">
        
        {/* Massive Ambient Atmosphere */}
        <motion.div 
          className="absolute bottom-[-150px] w-[300%] max-w-[250vw] h-[600px] bg-[#3b0764]/40 blur-[150px] rounded-[100%] z-0"
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* --- PERFECT ARCH CONTAINER --- */}
        {/* Taller container to prevent clipping, overflow-hidden creates the sharp horizontal cut */}
        <div className="absolute bottom-[30px] w-full h-[500px] flex justify-center items-end overflow-hidden">
          
          {/* Outer Faint Atmospheric Glow Arch */}
          <motion.div 
            className="absolute bottom-[-400px] md:bottom-[-500px] w-[800px] md:w-[1000px] h-[800px] md:h-[1000px] rounded-full border-[80px] border-[#7c3aed] blur-[40px] opacity-50 z-10"
            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Thick Violet Arch */}
          <motion.div 
            className="absolute bottom-[-250px] md:bottom-[-300px] w-[500px] md:w-[600px] h-[500px] md:h-[600px] rounded-full border-[40px] md:border-[50px] border-[#8b5cf6] blur-[6px] shadow-[0_0_80px_rgba(139,92,246,0.8),inset_0_0_40px_rgba(139,92,246,0.6)] z-20"
            animate={{ scale: [1, 1.03, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Thick Brilliant White/Cyan Inner Arch */}
          <motion.div 
            className="absolute bottom-[-175px] md:bottom-[-200px] w-[350px] md:w-[400px] h-[350px] md:h-[400px] rounded-full border-[25px] md:border-[30px] border-white blur-[2px] shadow-[0_0_60px_rgba(255,255,255,1),inset_0_0_20px_rgba(255,255,255,0.8)] z-30"
            animate={{ scale: [1, 1.02, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Core Black Void (Smaller and completely black) */}
          <div className="absolute bottom-[-150px] md:bottom-[-165px] w-[300px] md:w-[330px] h-[300px] md:h-[330px] rounded-full bg-[#020205] shadow-[0_0_40px_rgba(2,2,5,1),inset_0_0_40px_rgba(2,2,5,1)] z-40" />
        </div>
        
        {/* The Flat Accretion Disk (The bright flat line exactly where the arches are cut) */}
        
        {/* Base Massive Purple Glow extending horizontally */}
        <motion.div 
          className="absolute bottom-[0px] w-[200%] h-[80px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent blur-[30px] z-20"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Sharp Bright White/Violet Horizontal Core */}
        <motion.div 
          className="absolute bottom-[26px] w-[150%] max-w-[900px] h-[12px] bg-gradient-to-r from-transparent via-white to-transparent blur-[3px] shadow-[0_0_30px_rgba(255,255,255,1),0_0_60px_rgba(139,92,246,1)] z-40"
          animate={{ opacity: [0.8, 1, 0.8], scaleX: [0.95, 1.05, 0.95] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Ultra-Sharp Center Bright Line */}
        <motion.div 
          className="absolute bottom-[29px] w-[100%] max-w-[600px] h-[4px] bg-white blur-[1px] z-50"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: [0.7, 1, 0.7], scaleX: [0.8, 1.1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Cinematic Ending Moment: The Anomaly Pulse (Slow moving energy ripple) */}
        <motion.div 
          className="absolute bottom-[29px] w-[200%] h-[2px] bg-white blur-[1px] z-50"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: [0, 0.9, 0], scaleX: [0, 1.5, 2] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeOut', delay: 2 }}
        />
      </div>
    </footer>
  );
};

export default Footer;
