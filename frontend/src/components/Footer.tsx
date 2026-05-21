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
          className="absolute bottom-[-150px] left-[50%] w-[150%] max-w-[1500px] h-[600px] bg-[#3b0764]/40 blur-[100px] rounded-[100%] z-0"
          style={{ x: "-50%" }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* --- PERFECT ARCH CONTAINER --- */}
        {/* Massive height to prevent top clipping, positioned exactly at the horizontal cut line */}
        <div className="absolute bottom-[30px] w-full h-[600px] flex justify-center items-end overflow-hidden">
          
          {/* 1. Gravitational Lensing Distortion */}
          <div 
            className="absolute bottom-[-350px] left-[50%] w-[700px] h-[700px] rounded-full backdrop-blur-[12px] backdrop-brightness-150 z-10 border border-white/5"
            style={{ x: "-50%" }}
          />

          {/* 2. Swirling Accretion Disk (Animated Conic Gradient) */}
          <motion.div 
            className="absolute bottom-[-320px] left-[50%] w-[640px] h-[640px] rounded-full z-20 opacity-90"
            style={{ 
              x: "-50%",
              background: "conic-gradient(from 0deg, transparent 0%, rgba(168, 85, 247, 0.6) 20%, rgba(255, 255, 255, 1) 50%, rgba(168, 85, 247, 0.6) 80%, transparent 100%)",
              filter: "blur(15px)"
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* 3. Deep Purple Atmospheric Halo */}
          <motion.div 
            className="absolute bottom-[-280px] left-[50%] w-[560px] h-[560px] rounded-full border-[60px] border-[#7c3aed] blur-[25px] opacity-80 z-20"
            style={{ x: "-50%" }}
            animate={{ scale: [1, 1.03, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* 4. Intense Razor-Sharp Photon Ring */}
          <div 
            className="absolute bottom-[-200px] left-[50%] w-[400px] h-[400px] rounded-full border-[6px] border-white shadow-[0_0_40px_rgba(255,255,255,1),inset_0_0_20px_rgba(255,255,255,0.8)] z-30"
            style={{ x: "-50%" }}
          />

          {/* 5. The Absolute Black Void (Event Horizon) */}
          <div 
            className="absolute bottom-[-195px] left-[50%] w-[390px] h-[390px] rounded-full bg-black z-40 shadow-[inset_0_0_50px_rgba(0,0,0,1)]"
            style={{ x: "-50%" }}
          />

          {/* Dynamic Energy Pulses escaping the void */}
          <motion.div
            className="absolute bottom-[-195px] left-[50%] w-[390px] h-[390px] rounded-full border-[2px] border-purple-400 z-50"
            style={{ x: "-50%" }}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.5, 2], opacity: [0, 0.8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeOut', repeatDelay: 2 }}
          />
        </div>
        
        {/* --- HORIZONTAL ACCRETION DISK --- */}
        
        {/* Base Massive Purple Glow extending horizontally */}
        <motion.div 
          className="absolute bottom-[0px] left-[50%] w-[200%] h-[120px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent blur-[40px] z-20 opacity-80"
          style={{ x: "-50%" }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* The Swooping Flare connecting the arch to the ground */}
        <motion.div 
          className="absolute bottom-[28px] left-[50%] w-[120%] max-w-[1400px] h-[60px] bg-gradient-to-t from-[#a855f7] to-transparent blur-[15px] opacity-90 z-30"
          style={{ x: "-50%" }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Sharp Bright White/Violet Horizontal Core */}
        <motion.div 
          className="absolute bottom-[28px] left-[50%] w-[150%] max-w-[1800px] h-[8px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent blur-[4px] z-40"
          style={{ x: "-50%" }}
          animate={{ opacity: [0.7, 1, 0.7], scaleX: [0.95, 1.05, 0.95] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Swirling Animated Energy Beams (Doppler Effect) */}
        <motion.div 
          className="absolute bottom-[29px] left-[50%] w-[100%] max-w-[1000px] h-[4px] bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] shadow-[0_0_30px_rgba(255,255,255,1)] z-50"
          style={{ x: "-50%" }}
          animate={{ opacity: [0.6, 1, 0.6], scaleX: [0.9, 1.2, 0.9] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Ultra-Sharp Center Bright Line */}
        <div 
          className="absolute bottom-[30px] left-[50%] w-[100%] max-w-[500px] h-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,1)] z-50"
          style={{ x: "-50%" }}
        />
      </div>
    </footer>
  );
};

export default Footer;
