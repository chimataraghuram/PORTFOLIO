import React from 'react';
import { ArrowRight, Github, ExternalLink, Mail, FileText, Gamepad2, MousePointer2, Search, ShoppingBag, Linkedin, Bot } from 'lucide-react';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import Reveal from './Reveal';

const Hero: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen md:h-screen flex items-start md:items-center justify-center pt-24 md:pt-32 pb-32 md:pb-0 relative overflow-hidden" style={{ paddingBottom: 'calc(7rem + env(safe-area-inset-bottom, 0px))' }}>
      {/* Background Shapes - Simplified for performance */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 w-full mt-6 md:mt-0">
        {/* Mobile Layout: Clean & Efficient */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 items-center">

          {/* Text Content Area */}
          <div className="w-full text-center md:text-left order-2 md:order-1">
            <Reveal width="100%">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4 backdrop-blur-md">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Available for Collaborate</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-5xl font-black mb-4 text-white leading-[1.1]">
                {ABOUT_DATA.name.split(' ')[0]} <br className="md:hidden" />
                <span className="text-3xl sm:text-5xl md:text-5xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] uppercase">
                  {ABOUT_DATA.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
            </Reveal>

            <Reveal width="100%" delay={0.2}>
              <div className="flex flex-wrap justify-center md:justify-start gap-1.5 md:gap-2 mb-6">
                <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg">Full Stack</span>
                <span className="px-3 py-1 bg-blue-400/10 border border-blue-400/20 text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg">AI Enthusiast</span>
                <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 text-pink-500 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg">Python dev</span>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.4}>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed text-sm md:text-base font-medium px-4 md:px-0">
                B.Tech Student specialized in <span className="text-white font-bold">AI & ML</span>. 
                Passionate about building scalable <span className="text-white font-bold">Full-Stack</span> applications and intelligent AI solutions.
              </p>
            </Reveal>

            <Reveal width="100%" delay={0.6}>
              <div className="flex flex-col gap-4 w-full max-w-[340px] md:max-w-none mx-auto md:mx-0">
                {/* Primary Actions Row */}
                <div className="flex gap-3">
                  <a
                    href="#minigame"
                    onClick={(e) => handleClick(e, '#minigame')}
                    className="flex-1 px-4 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_-5px_rgba(147,51,234,0.5)] hover:scale-[1.02] active:scale-95 gelly-button text-xs"
                  >
                    PLAY MISSION <Gamepad2 size={16} />
                  </a>
                  <a
                    href="#portfolio"
                    onClick={(e) => handleClick(e, '#portfolio')}
                    className="flex-1 px-4 py-4 bg-slate-900/80 backdrop-blur-md border border-white/10 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-95 gelly-button text-xs"
                  >
                    PROJECTS <MousePointer2 size={16} />
                  </a>
                </div>

                {/* Secondary Actions Row */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={SOCIAL_LINKS.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3.5 bg-cyan-900/40 border border-cyan-500/30 text-cyan-400 rounded-2xl font-black transition-all flex items-center justify-center gap-2 hover:bg-cyan-900/60 active:scale-95 gelly-button text-[10px] tracking-widest"
                  >
                    RESUME <FileText size={14} />
                  </a>
                  <a
                    href="#publisher"
                    onClick={(e) => handleClick(e, '#publisher')}
                    className="py-3.5 bg-white/5 border border-white/10 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 hover:bg-white/10 active:scale-95 gelly-button text-[10px] tracking-widest"
                  >
                    CONTACT <Mail size={14} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Profile Image Column */}
          <div className="w-full flex justify-center order-1 md:order-2">
            <Reveal width="100%" delay={0.3}>
              <div className="relative w-44 md:w-80 aspect-[4/5] md:h-[460px] group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative z-10 w-full h-full p-1 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-transform duration-700 hover:rotate-0 rotate-3 group-hover:scale-[1.02]">
                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-2xl"
                    style={{ objectPosition: 'center top' }}
                  />
                  {/* Subtle Name Tag inside Image (Mobile focus) */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-dark/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest text-center">Tech Enthusiast</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>


      {/* Scroll Down Indicator */}
      <a
        href="#about"
        onClick={(e) => handleClick(e, '#about')}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300 group z-30"
      >
        <span className="text-xs text-gray-500 group-hover:text-pink-400 transition-colors">Scroll Down</span>
        <div className="gelly-button p-3 rounded-full bg-dark-lighter border border-pink-500/30 hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all">
          <MousePointer2 size={20} className="text-pink-500 group-hover:text-pink-400 transition-colors" />
        </div>
      </a>
    </section >
  );
};

export default React.memo(Hero);
