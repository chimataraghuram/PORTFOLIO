import React from 'react';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import { Linkedin, Github, Send, Mail, Globe, Heart, MousePointer2 } from 'lucide-react';
import Reveal from './Reveal';
import Dashboard from './Dashboard';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark relative overflow-hidden border-t border-white/5">
      <Dashboard />
      <div className="max-w-7xl mx-auto px-4 relative z-10 py-12">
        
        {/* Bottom Row: Metadata Only */}
        <div className="pt-8 border-t border-white/5 flex items-center justify-center">
          <Reveal width="100%" delay={0.2}>
            <p className="text-[8px] text-gray-500 font-black uppercase tracking-[4px] flex items-center justify-center gap-2 group cursor-default whitespace-nowrap">
              COOKED BY RAGHU
              <Heart size={12} className="text-pink-500 fill-pink-500 animate-heartbeat transition-transform shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
            </p>
          </Reveal>
        </div>

      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;