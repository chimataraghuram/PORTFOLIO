import React from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import { Linkedin, Github, Send, Mail, Globe, Heart, MousePointer2 } from 'lucide-react';
import Reveal from './Reveal';
import Dashboard from './Dashboard';

const SingularityParticles = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particles = Array.from({ length: isMobile ? 18 : 50 });
  const colors = ['#ffffff', '#c084fc', '#a855f7', '#e879f9', '#818cf8'];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {particles.map((_, i) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 85;
        const endX = 50; 
        const endY = 100; 
        const duration = 4.5 + Math.random() * 4.5;
        const delay = Math.random() * 4;
        const color = colors[i % colors.length];

        return (
          <motion.div
            key={i}
            className="absolute w-[2px] md:w-[3.5px] h-[2px] md:h-[3.5px] rounded-full"
            style={{ 
              left: `${startX}%`, 
              top: `${startY}%`,
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}`
            }}
            animate={{ 
              left: [`${startX}%`, `${endX}%`], 
              top: [`${startY}%`, `${endY}%`],
              opacity: [0, 0.9, 0],
              scale: [0.8, 2.2, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-transparent relative overflow-hidden">
      <Dashboard />
      
      {/* Spacer to allow scrolling past the dashboard to see the full black hole without overlapping */}
      <div className="h-[250px] md:h-[500px] w-full relative z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 pt-4 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-12">
        


      </div>

      {/* Cinematic Purple Singularity (End of Universe) */}
      <div className="absolute bottom-0 inset-x-0 h-[600px] md:h-[800px] pointer-events-none z-0 flex justify-center items-end overflow-hidden">
        
        {/* Absorbing Purple Singularity Particles */}
        <SingularityParticles />

        {/* Deep Violet & Ultraviolet Singularity Ambient Vortex */}
        <motion.div 
          className="absolute bottom-[-160px] w-[160%] max-w-[1600px] h-[650px] bg-gradient-to-t from-[#3b0764] via-[#581c87]/50 to-transparent blur-[110px] rounded-[100%] z-0"
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.98, 1.03, 0.98] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* --- GRID STACKED PURPLE HOLE DOMES --- */}
        <div className="absolute bottom-0 grid place-items-end justify-items-center w-full z-10">
          
          {/* Outer Radiant Ultraviolet Corona */}
          <motion.div 
            className="col-start-1 row-start-1 w-[380px] md:w-[950px] h-[190px] md:h-[475px] rounded-t-full bg-gradient-to-t from-[#7c3aed] to-[#3b0764] blur-[60px] md:blur-[85px] opacity-60"
            animate={{ scale: [1, 1.06, 1], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Electric Purple Event Horizon Arc */}
          <motion.div 
            className="col-start-1 row-start-1 w-[290px] md:w-[620px] h-[145px] md:h-[310px] rounded-t-full border-t-[40px] md:border-t-[80px] border-x-[40px] md:border-x-[80px] border-[#9333ea] blur-[14px] md:blur-[20px] opacity-95 shadow-[0_0_60px_#9333ea]"
            animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Glowing Vivid Magenta/Purple Photon Ring */}
          <motion.div 
            className="col-start-1 row-start-1 w-[210px] md:w-[450px] h-[105px] md:h-[225px] rounded-t-full border-t-[22px] md:border-t-[44px] border-x-[22px] md:border-x-[44px] border-[#c084fc] blur-[7px] md:blur-[10px] shadow-[0_0_45px_#c084fc]"
            animate={{ scale: [1, 1.03, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* High-Energy Luminous Core Arch */}
          <motion.div 
            className="col-start-1 row-start-1 w-[165px] md:w-[350px] h-[82px] md:h-[175px] rounded-t-full border-t-[20px] md:border-t-[32px] border-x-[20px] md:border-x-[32px] border-[#f5d0fe] blur-[3px] md:blur-[4px] shadow-[0_0_40px_rgba(245,208,254,1),inset_0_0_20px_rgba(192,132,252,0.9)]"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* The Purple Hole Abyss (Deep Singularity Core) */}
          <motion.div 
            className="col-start-1 row-start-1 w-[125px] md:w-[285px] h-[62px] md:h-[142px] rounded-t-full bg-gradient-to-b from-[#2e1065] via-[#1e073c] to-[#0b0114] border-t-2 border-[#d8b4fe] shadow-[0_0_35px_rgba(168,85,247,0.95)] blur-[1px]"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Pulsing Ultraviolet Gravitational Waves */}
          <motion.div
            className="col-start-1 row-start-1 w-[125px] md:w-[285px] h-[62px] md:h-[142px] rounded-t-full border-t-[3px] md:border-t-[5px] border-x-[3px] md:border-x-[5px] border-[#d8b4fe] blur-[2px]"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: [0.85, 1.6, 2.2], opacity: [0, 0.9, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 }}
          />

          {/* --- EASTER EGG SIGNATURE --- */}
          {/* Floats above the singularity and gets sucked in */}
          <motion.div 
            className="col-start-1 row-start-1 z-50 mb-[220px] md:mb-[380px] pointer-events-auto"
            animate={{ 
              y: [50, 0, -10, 0, 400, 400],
              opacity: [0, 1, 1, 1, 0, 0],
              scale: [0.5, 1, 1.05, 1, 0, 0],
              filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(10px)", "blur(10px)"]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              times: [0, 0.1, 0.5, 0.7, 0.85, 1],
              ease: "easeInOut"
            }}
          >
            <span className="text-[#ff2a2a] font-bold tracking-[0.3em] text-xs md:text-lg drop-shadow-[0_0_15px_rgba(255,42,42,0.9)] cursor-default">
              COOKED BY RAGHU❤️
            </span>
          </motion.div>

          {/* --- EXPANDING GRAVITATIONAL WAVES (RIPPLES) --- */}
          <motion.div 
            className="col-start-1 row-start-1 w-[120px] md:w-[280px] h-[60px] md:h-[140px] rounded-t-full border-t-[2px] md:border-t-[4px] border-x-[2px] md:border-x-[4px] border-white blur-[2px] z-50"
            style={{ transformOrigin: 'bottom center' }}
            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div 
            className="col-start-1 row-start-1 w-[120px] md:w-[280px] h-[60px] md:h-[140px] rounded-t-full border-t-[4px] md:border-t-[8px] border-x-[4px] md:border-x-[8px] border-[#a855f7] blur-[6px] z-50"
            style={{ transformOrigin: 'bottom center' }}
            animate={{ scale: [1, 3.5], opacity: [0.4, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2.6 }}
          />
          <motion.div 
            className="col-start-1 row-start-1 w-[120px] md:w-[280px] h-[60px] md:h-[140px] rounded-t-full border-t-[8px] md:border-t-[12px] border-x-[8px] md:border-x-[12px] border-[#7c3aed] blur-[12px] z-50"
            style={{ transformOrigin: 'bottom center' }}
            animate={{ scale: [1, 4.5], opacity: [0.2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 5.3 }}
          />
        </div>

        {/* --- HORIZONTAL ACCRETION DISK --- */}
        {/* We use Flex items-end to completely bottom-align all lines */}
        <div className="absolute bottom-0 w-full flex justify-center items-end z-30">
          
          {/* Base Massive Purple Glow extending horizontally */}
          <motion.div 
            className="absolute bottom-0 w-[200%] h-[120px] bg-gradient-to-t from-[#7c3aed] to-transparent blur-[40px] opacity-80"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* The Swooping Flare connecting the arch to the ground */}
          <motion.div 
            className="absolute bottom-0 w-[120%] max-w-[1400px] h-[60px] bg-gradient-to-t from-[#a855f7] to-transparent blur-[15px] opacity-90"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Sharp Bright White/Violet Horizontal Core */}
          <motion.div 
            className="absolute bottom-0 w-[150%] max-w-[1800px] h-[8px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent blur-[4px]"
            animate={{ opacity: [0.7, 1, 0.7], scaleX: [0.95, 1.05, 0.95] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Swirling Animated Energy Beams (Doppler Effect) */}
          <motion.div 
            className="absolute bottom-0 w-[100%] max-w-[1000px] h-[4px] bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] shadow-[0_0_30px_rgba(255,255,255,1)]"
            animate={{ opacity: [0.6, 1, 0.6], scaleX: [0.9, 1.2, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Ultra-Sharp Center Bright Line */}
          <div className="absolute bottom-0 w-[100%] max-w-[500px] h-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
