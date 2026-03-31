import React from 'react';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import { Linkedin, Github, Send, Mail, Globe, Heart, MousePointer2 } from 'lucide-react';
import Reveal from './Reveal';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialPills = [
    { icon: <Linkedin size={16} />, label: 'LINKEDIN', href: SOCIAL_LINKS.linkedin },
    { icon: <Github size={16} />, label: 'GITHUB', href: SOCIAL_LINKS.github },
    { icon: <Globe size={16} />, label: 'PORTFOLIO', href: SOCIAL_LINKS.linktree },
    { icon: <Send size={16} />, label: 'TELEGRAM', href: SOCIAL_LINKS.telegram },
  ];

  return (
    <footer className="py-12 bg-dark relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Top Row: Social Pills */}
        <Reveal width="100%">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {socialPills.map((pill) => (
              <a
                key={pill.label}
                href={pill.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2.5 px-5 py-2.5 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-full font-black text-[8px] uppercase tracking-[2px] text-gray-400 hover:text-white hover:border-white/30 hover:bg-slate-800 transition-all duration-500 gelly-button"
              >
                {pill.icon}
                {pill.label}
              </a>
            ))}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 px-5 py-2.5 bg-red-900/10 backdrop-blur-xl border border-red-500/20 rounded-full font-black text-[8px] uppercase tracking-[2px] text-red-500 hover:text-white hover:border-red-500/50 hover:bg-red-600 transition-all duration-500 gelly-button"
            >
              <Mail size={14} />
              EMAIL
            </a>
          </div>
        </Reveal>

        {/* Bottom Row: Metadata & Tech Stack */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <Reveal width="100%" delay={0.2}>
            <div className="flex items-center gap-6">
              <p className="text-[8px] text-gray-500 font-bold tracking-[2px] uppercase whitespace-nowrap">
                © {currentYear} {ABOUT_DATA.name.toUpperCase()}
              </p>
              <span className="text-gray-800">•</span>
              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-[2px] flex items-center gap-1.5 group cursor-default whitespace-nowrap">
                COOKED BY RAGHU
                <Heart size={10} className="text-pink-500 fill-pink-500 animate-heartbeat transition-transform" />
              </p>
            </div>
          </Reveal>

          <Reveal width="100%" delay={0.4}>
            <div className="flex items-center gap-5">
              {['REACT', 'VITE', 'TAILWIND', 'TYPESCRIPT'].map((tech) => (
                <span key={tech} className="text-[8px] text-gray-600 font-black tracking-[3px] uppercase hover:text-orange-500 transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;