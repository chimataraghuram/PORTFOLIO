import React from 'react';
import { Mail, FileText, Gamepad2, MousePointer2, Search, ShoppingBag, Github, Linkedin } from 'lucide-react';
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
      {/* Background Shapes */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 w-full mt-6 md:mt-0">
        
        {/* Mobile-Only Title (Appears First) */}
        <div className="block md:hidden text-center mt-4 mb-8">
          <Reveal width="100%">
            <h1 className="text-5xl font-bold mb-2 text-white leading-tight">
              HI I'M <br />
              <span className="text-4xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] uppercase mt-2">
                {ABOUT_DATA.name}
              </span>
            </h1>
          </Reveal>
        </div>

        {/* UNIFIED LAYOUT for Desktop & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center py-4 md:py-0">
          
          {/* Text & Actions (Left Side) - col-span-7 */}
          <div className="md:col-span-7 flex flex-col justify-center items-center md:items-start text-center md:text-left order-2 md:order-1 mt-4 md:mt-0">
            
            {/* Desktop-Only Title */}
            <div className="hidden md:block">
              <Reveal width="100%">
                <h1 className="text-5xl lg:text-7xl font-bold mb-4 text-white leading-tight">
                  HI I'M <br />
                  <span className="text-5xl lg:text-7xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] uppercase">
                    {ABOUT_DATA.name}
                  </span>
                </h1>
              </Reveal>
            </div>

            {/* Subtitles & Bio Container */}
            <div className="w-full flex flex-col items-center md:items-start mb-6">
              
              {/* Desktop Subtitle */}
              <div className="hidden lg:block mb-4">
                <Reveal width="100%" delay={0.2}>
                  <h3 className="text-xl lg:text-2xl font-medium text-gray-300">
                     <span className="text-yellow-400">Python Full Stack Developer</span> | Tech Enthusiast | Active Learner
                  </h3>
                </Reveal>
              </div>

              {/* Mobile Role Pills */}
              <div className="flex lg:hidden flex-wrap justify-center md:justify-start gap-2 mb-4">
                <span className="px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[11px] font-black uppercase tracking-wider rounded-lg shadow-sm">Python dev</span>
                <span className="px-3 py-1.5 bg-blue-400/10 border border-blue-400/20 text-blue-400 text-[11px] font-black uppercase tracking-wider rounded-lg shadow-sm">Tech Enthusiast</span>
                <span className="px-3 py-1.5 bg-pink-500/10 border border-pink-500/20 text-pink-500 text-[11px] font-black uppercase tracking-wider rounded-lg shadow-sm">Active Learner</span>
              </div>

              {/* Bio Text (Visible on both Mobile and Desktop) */}
              <Reveal width="100%" delay={0.4}>
                <p className="text-gray-400 max-w-lg leading-relaxed text-xs sm:text-sm lg:text-base font-medium">
                  B.Tech (AIML) Undergraduate | AIML Diploma Holder | Python Full-Stack Developer | Actively Learning & Tech Enthusiast
                </p>
              </Reveal>
            </div>

            <Reveal width="100%" delay={0.6}>
              <div className="flex flex-col gap-3 w-full max-w-[480px] mx-auto md:mx-0">
                {/* Row 1: Primary Actions */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
                  <a
                    href="#minigame"
                    onClick={(e) => handleClick(e, '#minigame')}
                    className="w-full px-2 sm:px-6 py-3 bg-gradient-to-r from-violet-900/30 to-purple-900/30 border border-violet-500/50 backdrop-blur-md rounded-full font-black transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:shadow-[0_0_25px_rgba(124,58,237,0.8)] hover:scale-[1.02] active:scale-95 gelly-button uppercase text-[8px] sm:text-xs tracking-widest text-center group"
                  >
                    <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] animate-pulse">mini game</span> 
                    <Gamepad2 size={14} className="shrink-0 text-violet-500 group-hover:text-fuchsia-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-colors" />
                  </a>
                  <a
                    href="#projects"
                    onClick={(e) => handleClick(e, '#projects')}
                    className="w-full px-2 sm:px-6 py-3 bg-gradient-to-r from-slate-800/40 to-gray-800/40 border border-slate-500/50 backdrop-blur-md rounded-full font-black transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-[0_0_15px_rgba(148,163,184,0.3)] hover:shadow-[0_0_25px_rgba(148,163,184,0.6)] hover:scale-[1.02] active:scale-95 gelly-button uppercase text-[8px] sm:text-xs tracking-widest text-center group"
                  >
                    <span className="bg-gradient-to-r from-slate-300 to-white text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-pulse">projects</span>
                  </a>
                </div>

                {/* Grid for Secondary Actions */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="py-2.5 px-2 sm:px-6 bg-gradient-to-r from-blue-900/30 to-sky-900/30 border border-blue-500/50 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] transition-all text-[8px] sm:text-[9px] uppercase gelly-button tracking-wider shadow-[0_0_15px_rgba(0,119,181,0.4)] hover:shadow-[0_0_25px_rgba(0,119,181,0.8)] text-center group">
                    <span className="bg-gradient-to-r from-blue-400 to-sky-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(0,119,181,0.8)] animate-pulse">linkedin profile</span> 
                    <Linkedin size={10} className="shrink-0 text-blue-500 group-hover:text-blue-400 drop-shadow-[0_0_8px_rgba(0,119,181,0.8)] transition-colors" />
                  </a>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="py-2.5 px-2 sm:px-6 bg-gradient-to-r from-slate-800/40 to-zinc-800/40 border border-zinc-500/50 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] transition-all text-[8px] sm:text-[9px] uppercase gelly-button tracking-wider shadow-[0_0_15px_rgba(161,161,170,0.4)] hover:shadow-[0_0_25px_rgba(161,161,170,0.8)] text-center group">
                    <span className="bg-gradient-to-r from-gray-300 to-zinc-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(161,161,170,0.8)] animate-pulse">github profile</span> 
                    <Github size={10} className="shrink-0 text-zinc-400 group-hover:text-zinc-300 drop-shadow-[0_0_8px_rgba(161,161,170,0.8)] transition-colors" />
                  </a>
                  
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500 rounded-full blur opacity-40 animate-pulse"></div>
                    <a href="https://chimataraghuram.vercel.app/" target="_blank" rel="noreferrer" className="relative py-2.5 px-2 sm:px-6 bg-gradient-to-r from-orange-900/40 to-amber-900/40 border border-orange-500/60 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] transition-all text-[8px] sm:text-[9px] uppercase gelly-button tracking-wider shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:shadow-[0_0_35px_rgba(249,115,22,1)] text-center group">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse">project finder</span>
                      <Search size={10} className="shrink-0 text-orange-500 group-hover:text-yellow-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-colors" />
                    </a>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-rose-500 to-red-600 rounded-full blur opacity-40 animate-pulse"></div>
                    <a href={SOCIAL_LINKS.techboyStore} target="_blank" rel="noreferrer" className="relative py-2.5 px-2 sm:px-6 bg-gradient-to-r from-red-900/40 to-rose-900/40 border border-red-500/60 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] transition-all text-[8px] sm:text-[9px] uppercase gelly-button tracking-wider shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:shadow-[0_0_35px_rgba(239,68,68,1)] text-center group">
                      <span className="bg-gradient-to-r from-red-400 to-rose-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse">techboy store</span>
                      <ShoppingBag size={10} className="shrink-0 text-red-500 group-hover:text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-colors" />
                    </a>
                  </div>
                </div>
                
                <div className="relative w-full mt-1">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-500 rounded-full blur opacity-40 animate-pulse"></div>
                  <a href={SOCIAL_LINKS.resume} target="_blank" rel="noreferrer" className="relative py-2.5 px-6 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/60 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.01] transition-all text-[9px] sm:text-[10px] uppercase gelly-button tracking-wider w-full shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,1)] text-center group">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse">resume</span>
                    <FileText size={12} className="shrink-0 text-cyan-500 group-hover:text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-colors" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Profile Image (Right Side) - col-span-5 */}
          <div className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2 w-full">
            <Reveal width="100%" delay={0.3}>
              <div className="relative w-48 sm:w-56 md:w-72 lg:w-80 aspect-[4/5] group mx-auto md:ml-auto md:mr-0 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl transition-transform duration-700 md:rotate-3 group-hover:rotate-0"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>


      {/* Scroll Down Indicator - Hidden if screen height is small */}
      <a
        href="#about"
        onClick={(e) => handleClick(e, '#about')}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300 group z-30"
      >
        <span className="text-[10px] text-gray-500 group-hover:text-pink-400 transition-colors">Scroll Down</span>
        <div className="gelly-button p-2 rounded-full bg-slate-900/40 border border-white/10 hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all">
          <MousePointer2 size={16} className="text-pink-500 group-hover:text-pink-400 transition-colors" />
        </div>
      </a>
    </section >
  );
};

export default React.memo(Hero);
