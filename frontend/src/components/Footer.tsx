import React from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import { Linkedin, Github, Send, Mail, Globe, Heart, MousePointer2 } from 'lucide-react';
import Reveal from './Reveal';
import Dashboard from './Dashboard';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent relative overflow-hidden">
      <Dashboard />
      
      {/* Spacer to allow scrolling past the dashboard to see the full black hole without overlapping */}
      <div className="h-[300px] md:h-[400px] w-full relative z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 pt-4 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-12">
        


      </div>

      {/* Cinematic Event Horizon (End of Universe) */}
      <div className="absolute bottom-0 inset-x-0 h-[600px] md:h-[800px] pointer-events-none z-0 flex justify-center items-end overflow-hidden">
        
        {/* Massive Ambient Glow */}
        <motion.div 
          className="absolute bottom-[-150px] w-[150%] max-w-[1500px] h-[600px] bg-[#3b0764]/40 blur-[100px] rounded-[100%] z-0"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* --- GRID STACKED DOMES --- */}
        {/* Using CSS grid to perfectly stack elements without positioning bugs */}
        <div className="absolute bottom-[30px] grid place-items-end justify-items-center w-full z-10">
          
          {/* Faint Outer Purple Glow */}
          <motion.div 
            className="col-start-1 row-start-1 w-[600px] md:w-[900px] h-[300px] md:h-[450px] rounded-t-full bg-[#581c87] blur-[80px] opacity-50"
            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Deep Purple Arch (Perfectly wraps the Medium Arch) */}
          <motion.div 
            className="col-start-1 row-start-1 w-[500px] md:w-[580px] h-[250px] md:h-[290px] rounded-t-full border-t-[80px] border-x-[80px] border-[#7c3aed] blur-[20px] opacity-90"
            animate={{ scale: [1, 1.03, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Medium Bright Purple Arch (Perfectly wraps the White Arch) */}
          <motion.div 
            className="col-start-1 row-start-1 w-[340px] md:w-[420px] h-[170px] md:h-[210px] rounded-t-full border-t-[40px] border-x-[40px] border-[#a855f7] blur-[10px]"
            animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Intense Thick White Core Arch (Perfectly wraps the Inner Dome) */}
          <motion.div 
            className="col-start-1 row-start-1 w-[260px] md:w-[340px] h-[130px] md:h-[170px] rounded-t-full border-t-[30px] border-x-[30px] border-white blur-[4px] shadow-[0_0_50px_rgba(255,255,255,1),inset_0_0_20px_rgba(255,255,255,0.8)]"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Solid Deep Purple Inner Dome */}
          <motion.div 
            className="col-start-1 row-start-1 w-[200px] md:w-[280px] h-[100px] md:h-[140px] rounded-t-full bg-[#581c87] shadow-[0_0_40px_rgba(168,85,247,1)] blur-[2px]"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Pulsing Energy Ring inside Dome */}
          <motion.div
            className="col-start-1 row-start-1 w-[200px] md:w-[280px] h-[100px] md:h-[140px] rounded-t-full border-t-[4px] border-x-[4px] border-[#c084fc] blur-[2px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.5, 2], opacity: [0, 0.8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeOut', repeatDelay: 2 }}
          />
        </div>

        {/* --- HORIZONTAL ACCRETION DISK --- */}
        {/* We use Flex to perfectly center the absolute beams */}
        <div className="absolute bottom-[28px] w-full flex justify-center items-center z-30">
          
          {/* Base Massive Purple Glow extending horizontally */}
          <motion.div 
            className="absolute w-[200%] h-[120px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent blur-[40px] opacity-80"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* The Swooping Flare connecting the arch to the ground */}
          <motion.div 
            className="absolute bottom-[-30px] w-[120%] max-w-[1400px] h-[60px] bg-gradient-to-t from-[#a855f7] to-transparent blur-[15px] opacity-90"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Sharp Bright White/Violet Horizontal Core */}
          <motion.div 
            className="absolute w-[150%] max-w-[1800px] h-[8px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent blur-[4px]"
            animate={{ opacity: [0.7, 1, 0.7], scaleX: [0.95, 1.05, 0.95] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Swirling Animated Energy Beams (Doppler Effect) */}
          <motion.div 
            className="absolute w-[100%] max-w-[1000px] h-[4px] bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] shadow-[0_0_30px_rgba(255,255,255,1)]"
            animate={{ opacity: [0.6, 1, 0.6], scaleX: [0.9, 1.2, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Ultra-Sharp Center Bright Line */}
          <div className="absolute w-[100%] max-w-[500px] h-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
