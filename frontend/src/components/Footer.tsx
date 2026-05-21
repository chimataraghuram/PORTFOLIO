import React from 'react';
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

      {/* Event Horizon Cosmic Base (End of Website) */}
      <div className="absolute bottom-0 inset-x-0 h-[200px] md:h-[250px] pointer-events-none z-0 overflow-hidden flex items-end">
        {/* Purple Atmospheric Glow Behind */}
        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-[200px] bg-purple-600/40 blur-[80px] rounded-[100%]" />
        
        {/* SVG Curve */}
        <svg 
          viewBox="0 0 1000 200" 
          preserveAspectRatio="none" 
          className="absolute bottom-0 w-full h-[120px] md:h-[180px] opacity-100"
        >
           <defs>
              <linearGradient id="core-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(147, 51, 234, 0)" />
                <stop offset="10%" stopColor="rgba(147, 51, 234, 0.4)" />
                <stop offset="30%" stopColor="rgba(168, 85, 247, 0.9)" />
                <stop offset="45%" stopColor="#ffffff" />
                <stop offset="55%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="rgba(168, 85, 247, 0.9)" />
                <stop offset="90%" stopColor="rgba(147, 51, 234, 0.4)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0)" />
              </linearGradient>
              <filter id="heavy-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="15" />
              </filter>
              <filter id="medium-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
           </defs>
           
           {/* Deep background purple haze */}
           <path 
             d="M-100,50 L300,50 C400,50 420,180 500,180 C580,180 600,50 700,50 L1100,50" 
             stroke="rgba(147, 51, 234, 0.5)" 
             strokeWidth="35" 
             fill="none"
             filter="url(#heavy-blur)" 
           />
           
           {/* Mid bright purple/white glow */}
           <path 
             d="M-100,50 L300,50 C400,50 420,180 500,180 C580,180 600,50 700,50 L1100,50" 
             stroke="url(#core-glow)" 
             strokeWidth="12" 
             fill="none" 
             filter="url(#medium-blur)"
           />
           
           {/* Pure white hot core */}
           <path 
             d="M-100,50 L300,50 C400,50 420,180 500,180 C580,180 600,50 700,50 L1100,50" 
             stroke="#ffffff" 
             strokeWidth="3" 
             fill="none" 
           />
           
           {/* Subtle top edge glow for the accretion disk look */}
           <path 
             d="M-100,48 L300,48 C400,48 420,178 500,178 C580,178 600,48 700,48 L1100,48" 
             stroke="url(#core-glow)" 
             strokeWidth="2" 
             fill="none"
             opacity="0.6"
           />
        </svg>

        {/* Grounding the bottom of the curve */}
        <div className="absolute bottom-0 inset-x-0 h-[20px] bg-purple-950/40 blur-md" />
      </div>
    </footer>
  );
};

export default Footer;
