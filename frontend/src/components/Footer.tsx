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

      {/* Cyberpunk Ground/Abyss Floor Effect */}
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-cyan-900/20 via-blue-900/5 to-transparent pointer-events-none z-0" />
      
      {/* Perspective Grid Floor */}
      <div 
        className="absolute bottom-0 w-full h-[250px] opacity-30 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(70deg) translateY(50px)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
        }}
      />

      {/* Solid Glowing Base Line */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_30px_rgba(34,211,238,1)] z-20"></div>
    </footer>
  );
};

export default Footer;
