import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Linkedin, Github, Send, Mail, Link as LinkIcon, Heart, Globe, Cpu } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', color: 'hover:text-blue-400', glow: 'shadow-blue-500/20' },
    { icon: <Github size={20} />, href: SOCIAL_LINKS.github, label: 'GitHub', color: 'hover:text-white', glow: 'shadow-white/20' },
    { icon: <Send size={20} />, href: SOCIAL_LINKS.telegram, label: 'Telegram', color: 'hover:text-sky-400', glow: 'shadow-sky-400/20' },
    { icon: <Mail size={20} />, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`, label: 'Email', color: 'hover:text-red-400', glow: 'shadow-red-500/20' },
    { icon: <LinkIcon size={20} />, href: SOCIAL_LINKS.linktree, label: 'Links', color: 'hover:text-green-400', glow: 'shadow-green-500/20' },
  ];

  return (
    <footer className="pt-24 pb-12 bg-dark relative overflow-hidden border-t border-white/5">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      
      {/* Decorative Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-start">
          {/* Brand Identity */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tighter uppercase">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient">
                  Raghu Ram
                </span>
              </h2>
              <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs">
                Building the future of AI-driven web experiences with passion and precision.
              </p>
            </div>
            
            <div className="flex items-center gap-3 text-cyan-400/80">
              <Globe size={14} className="animate-spin-slow" />
              <span className="text-[10px] font-black uppercase tracking-[3px]">Based in India</span>
            </div>
          </div>

          {/* Quick Connect / Socials */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[4px]">Connect</h3>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-4 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/10 text-gray-400 transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:scale-110 ${social.color} hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group flex items-center justify-center gelly-button`}
                  aria-label={social.label}
                >
                  <div className="transition-transform duration-500 group-hover:rotate-[360deg]">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* System Status / Meta */}
          <div className="flex flex-col items-center md:items-end gap-6 h-full">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[4px]">System Status</h3>
            <div className="bg-slate-900/40 backdrop-blur-3xl p-6 rounded-2xl border border-white/5 space-y-4 min-w-[200px] gelly-card">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-purple-400" />
                  <span className="text-[10px] font-mono text-gray-400">CORE v2.4.0</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  <span className="text-[9px] font-black text-green-500">STABLE</span>
                </div>
              </div>
              
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              <div className="flex items-center justify-between gap-4">
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Environment</span>
                <span className="text-[10px] font-mono text-cyan-400">PRODUCTION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-gray-500 font-black tracking-[4px] uppercase flex items-center gap-3">
             © {currentYear} ALL SYSTEMS NOMINAL
             <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
          </p>
          
          <div className="flex items-center gap-6">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2 group cursor-default">
              COOKED BY RAGHU❤️
              <Heart size={12} className="text-pink-500 fill-pink-500 transition-transform duration-300 group-hover:scale-150 animate-heartbeat" /> 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;