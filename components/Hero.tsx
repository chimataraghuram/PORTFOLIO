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

      <div className="max-w-6xl mx-auto px-4 relative z-10 w-full mt-6 md:mt-0 text-center md:text-left">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 items-center">

          {/* 1. Name Section - Top on Mobile */}
          <div className="w-full order-1">
            <Reveal width="100%">
              <h1 className="text-4xl sm:text-5xl md:text-5xl font-black mb-4 text-white leading-[1.1]">
                HI I'M <br className="md:hidden" />
                <span className="text-3xl sm:text-5xl md:text-5xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] uppercase">
                  {ABOUT_DATA.name}
                </span>
              </h1>
            </Reveal>
          </div>

          {/* 2. Image Section - Middle on Mobile */}
          <div className="w-full flex justify-center order-2 md:order-last">
            <Reveal width="100%" delay={0.3}>
              <div className="relative w-48 md:w-80 aspect-[4/5] md:h-[460px] group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative z-10 w-full h-full p-1 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-transform duration-700 hover:rotate-0 rotate-3 group-hover:scale-[1.02]">
                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-2xl"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* 3. Role & Actions - Last on Mobile */}
          <div className="w-full order-3">
            <Reveal width="100%" delay={0.2}>
              <div className="flex flex-wrap justify-center md:justify-start gap-1.5 md:gap-2 mb-6 mt-4 md:mt-0">
                <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg">Python Full Stack Developer</span>
                <span className="px-3 py-1 bg-blue-400/10 border border-blue-400/20 text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg">Tech Enthusiast</span>
                <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 text-pink-500 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg">Learner</span>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.4}>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed text-sm md:text-base font-medium px-4 md:px-0">
                {ABOUT_DATA.name} | B.Tech Undergraduate | AI & ML Specialist | Python Developer building modern web solutions.
              </p>
            </Reveal>

            <Reveal width="100%" delay={0.6}>
              <div className="flex flex-col gap-4 w-full max-w-[340px] md:max-w-none mx-auto md:mx-0">
                {/* Main Game/Projects Row */}
                <div className="flex gap-3">
                  <a
                    href="#minigame"
                    onClick={(e) => handleClick(e, '#minigame')}
                    className="flex-1 px-4 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_-5px_rgba(147,51,234,0.5)] hover:scale-[1.02] active:scale-95 gelly-button text-[10px] tracking-widest"
                  >
                    MISSION <Gamepad2 size={16} />
                  </a>
                  <a
                    href="#portfolio"
                    onClick={(e) => handleClick(e, '#portfolio')}
                    className="flex-1 px-4 py-4 bg-slate-900/80 backdrop-blur-md border border-white/10 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-95 gelly-button text-[10px] tracking-widest"
                  >
                    PROJECTS <MousePointer2 size={16} />
                  </a>
                </div>

                {/* Projects Showcase Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://chimataraghuram.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="py-3.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-2xl font-black transition-all flex items-center justify-center gap-2 hover:bg-orange-500/20 active:scale-95 gelly-button text-[10px] tracking-widest"
                  >
                    FINDER <Search size={14} />
                  </a>
                  <a
                    href={SOCIAL_LINKS.techboyStore}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3.5 bg-red-500/10 border border-red-500/30 text-red-500 rounded-2xl font-black transition-all flex items-center justify-center gap-2 hover:bg-red-500/20 active:scale-95 gelly-button text-[10px] tracking-widest"
                  >
                    STORE <ShoppingBag size={14} />
                  </a>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={SOCIAL_LINKS.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 bg-cyan-900/40 border border-cyan-500/30 text-cyan-400 rounded-xl font-black transition-all flex items-center justify-center gap-2 hover:bg-cyan-900/60 active:scale-95 gelly-button text-[9px] tracking-widest"
                  >
                    RESUME <FileText size={12} />
                  </a>
                  <a
                    href="#publisher"
                    onClick={(e) => handleClick(e, '#publisher')}
                    className="py-3 bg-white/5 border border-white/10 text-white rounded-xl font-black transition-all flex items-center justify-center gap-2 hover:bg-white/10 active:scale-95 gelly-button text-[9px] tracking-widest"
                  >
                    CONTACT <Mail size={12} />
                  </a>
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
