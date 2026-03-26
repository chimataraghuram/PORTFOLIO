import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Linkedin, Github, Send, Mail, Link as LinkIcon, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Linkedin size={18} />, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: <Github size={18} />, href: SOCIAL_LINKS.github, label: 'GitHub', color: 'hover:text-white' },
    { icon: <Send size={18} />, href: SOCIAL_LINKS.telegram, label: 'Telegram', color: 'hover:text-sky-400' },
    { icon: <Mail size={18} />, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`, label: 'Email', color: 'hover:text-red-400' },
    { icon: <LinkIcon size={18} />, href: SOCIAL_LINKS.linktree, label: 'Links', color: 'hover:text-green-400' },
  ];

  return (
    <footer className="py-12 bg-dark border-t border-white/5 relative overflow-hidden">
      {/* Subtle Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          {/* Brand/Copyright */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-black tracking-tighter uppercase bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 text-transparent bg-clip-text">
              Raghu Ram
            </h2>
            <p className="text-gray-500 text-xs font-black tracking-[4px] uppercase flex items-center justify-center md:justify-start gap-2">
              © {currentYear} ALL SYSTEMS NOMINAL
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={`p-3 bg-slate-900/50 rounded-xl border border-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${social.color} shadow-lg`}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Built with Love */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2">
              Crafted with <Heart size={10} className="text-pink-500 fill-pink-500" /> & Code
            </p>
            <div className="flex items-center gap-3">
               <span className="text-[9px] font-mono text-cyan-500/50">BUILD_V2.4.0</span>
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;