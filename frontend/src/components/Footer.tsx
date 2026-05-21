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
      <div className="absolute bottom-0 md:bottom-[-50px] inset-x-0 h-[600px] md:h-[800px] pointer-events-none z-0 flex justify-center items-end">
        
        {/* Massive Universe-Scale Ambient Lighting */}
        <motion.div 
          className="absolute bottom-[-150px] inset-x-0 mx-auto w-[150%] max-w-[1500px] h-[600px] bg-[#3b0764]/40 blur-[100px] rounded-[100%] z-0"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* --- PERFECT ARCH CONTAINER --- */}
        {/* Massive height to prevent top clipping, positioned exactly at the horizontal cut line */}
        <div className="absolute bottom-[30px] w-full h-[600px] flex justify-center items-end overflow-hidden">
          
          {/* Outer Faint Atmospheric Glow */}
          <motion.div 
            className="absolute bottom-[-300px] inset-x-0 mx-auto w-[600px] h-[600px] rounded-full bg-[#581c87] blur-[100px] opacity-40 z-10"
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Deep Purple Arch */}
          <motion.div 
            className="absolute bottom-[-300px] inset-x-0 mx-auto w-[600px] h-[600px] rounded-full border-[130px] border-[#7c3aed] blur-[20px] opacity-90 z-20"
            animate={{ scale: [1, 1.03, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Thin Bright Purple Ring */}
          <motion.div 
            className="absolute bottom-[-170px] inset-x-0 mx-auto w-[340px] h-[340px] rounded-full border-[20px] border-[#a855f7] blur-[6px] z-30"
            animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Inner Thin Bright Purple Ring */}
          <motion.div 
            className="absolute bottom-[-150px] inset-x-0 mx-auto w-[300px] h-[300px] rounded-full border-[15px] border-[#c084fc] blur-[3px] shadow-[0_0_20px_rgba(192,132,252,1)] z-30"
            animate={{ scale: [1, 1.02, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Intense Thick White Core Arch */}
          <motion.div 
            className="absolute bottom-[-135px] inset-x-0 mx-auto w-[270px] h-[270px] rounded-full border-[35px] border-white blur-[4px] shadow-[0_0_60px_rgba(255,255,255,1),inset_0_0_30px_rgba(255,255,255,1)] z-40"
            animate={{ scale: [1, 1.01, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Solid Deep Purple Energy Center (No inner lines) */}
          <motion.div 
            className="absolute bottom-[-100px] inset-x-0 mx-auto w-[200px] h-[200px] rounded-full bg-[#581c87] shadow-[0_0_50px_rgba(168,85,247,1)] blur-[2px] z-50"
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Rare Cinematic Gravitational Pulse (Events) */}
          <motion.div
            className="absolute bottom-[-100px] inset-x-0 mx-auto w-[200px] h-[200px] rounded-full border-[4px] border-[#c084fc] blur-[4px] z-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 3, 6], opacity: [0, 0.6, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeOut', repeatDelay: 12 }}
          />
        </div>
        
        {/* The Flat Accretion Disk (The bright flat line exactly where the arches are cut) */}
        
        {/* The Swooping Flare connecting the arch to the ground */}
        <motion.div 
          className="absolute bottom-[28px] inset-x-0 mx-auto w-[110%] max-w-[1200px] h-[60px] bg-gradient-to-t from-[#a855f7] to-transparent blur-[15px] opacity-80 z-30"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Base Massive Purple Glow extending horizontally */}
        <motion.div 
          className="absolute bottom-[0px] inset-x-0 mx-auto w-[200%] h-[100px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent blur-[30px] z-20 opacity-80"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Sharp Bright White/Violet Horizontal Core */}
        <motion.div 
          className="absolute bottom-[28px] inset-x-0 mx-auto w-[150%] max-w-[1500px] h-[6px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent blur-[3px] z-40"
          animate={{ opacity: [0.7, 0.9, 0.7], scaleX: [0.95, 1.05, 0.95] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Bright Inner Horizontal Core */}
        <motion.div 
          className="absolute bottom-[29px] inset-x-0 mx-auto w-[100%] max-w-[800px] h-[4px] bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] shadow-[0_0_20px_rgba(255,255,255,1)] z-50"
          animate={{ opacity: [0.8, 1, 0.8], scaleX: [0.9, 1.1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Ultra-Sharp Center Bright Line */}
        <motion.div 
          className="absolute bottom-[30px] inset-x-0 mx-auto w-[100%] max-w-[400px] h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,1)] z-50"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: [0.9, 1, 0.9], scaleX: [0.8, 1.1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </footer>
  );
};

export default Footer;
