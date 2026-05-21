import React from 'react';
import { Mail, FileText, Gamepad2, MousePointer2, Search, ShoppingBag, Github, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import TypewriterEffect from './TypewriterEffect';
import { scrollToSection } from '../utils/scroll';

const Hero: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    scrollToSection(e, href);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse(m => ({ ...m, active: false }))}
      className="min-h-screen md:h-screen flex items-start md:items-center justify-center pt-24 md:pt-32 pb-32 md:pb-0 relative overflow-hidden"
      style={{ paddingBottom: 'calc(7rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Spotlight cursor follower */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: mouse.active ? 1 : 0,
          background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, rgba(139,92,246,0.08), transparent 50%)`,
        }}
      />

      {/* Morphing colour blobs */}
      <div className="absolute top-1/4 left-[-5%] w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none animate-blob" />
      <div className="absolute bottom-1/4 right-[-5%] w-96 h-96 bg-cyan-500/8 blur-[120px] rounded-full pointer-events-none animate-blob [animation-delay:3s]" />
      <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-pink-500/8 blur-[100px] rounded-full pointer-events-none animate-blob [animation-delay:6s]" />
      <div className="absolute top-10 right-1/4 w-48 h-48 bg-orange-500/6 blur-[80px] rounded-full pointer-events-none animate-blob [animation-delay:1.5s]" />

      <div className="max-w-6xl mx-auto px-4 relative z-10 w-full mt-6 md:mt-0">
        
        {/* Mobile-Only Title (Appears First) */}
        <div className="block md:hidden text-center mt-4 mb-8">
          <Reveal width="100%">
            <h1 className="text-4xl font-bold mb-2 text-white leading-tight">
              HI I'M <br />
              <span className="text-3xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] uppercase mt-2 animate-neon-flicker">
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
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-white leading-tight">
                  HI I'M <br />
                  <span className="text-4xl lg:text-6xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] uppercase animate-neon-flicker">
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
                <p className="text-gray-400 max-w-lg leading-relaxed text-xs sm:text-sm lg:text-base font-medium min-h-[40px] sm:min-h-[60px]">
                  <TypewriterEffect 
                    text="B.Tech (AIML) Undergraduate | AIML Diploma Holder | Python Full-Stack Developer | Actively Learning & Tech Enthusiast" 
                    speed={30}
                    delay={800}
                  />
                </p>
              </Reveal>
            </div>

            <Reveal width="100%" delay={0.6}>
              <div className="flex flex-col gap-3 w-full max-w-[480px] mx-auto md:mx-0">
                {/* Row 1: Primary Actions */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                  <Magnetic pullStrength={0.25}>
                    <a
                      href="#minigame"
                      onClick={(e) => handleClick(e, '#minigame')}
                      className="w-full px-2 sm:px-6 py-3 rounded-full font-black transition-all flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] active:scale-95 gelly-button uppercase text-[11px] sm:text-xs tracking-widest text-center group animate-gradient-shift"
                      style={{
                        background: 'linear-gradient(90deg,#ff006e,#fb5607,#ffbe0b,#06d6a0,#3a86ff,#8338ec,#ff006e)',
                        backgroundSize: '250% auto',
                        animation: 'gradient-shift 4s linear infinite',
                        boxShadow: '0 0 20px rgba(255,0,110,0.6), 0 0 40px rgba(131,56,236,0.4)',
                      }}
                    >
                      <span className="text-white font-black drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">mini game</span>
                      <Gamepad2 size={14} className="shrink-0 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform" />
                    </a>
                  </Magnetic>
                  <Magnetic pullStrength={0.25}>
                    <a
                      href="#projects"
                      onClick={(e) => handleClick(e, '#projects')}
                      className="w-full px-2 sm:px-6 py-3 bg-gradient-to-r from-slate-700/80 to-gray-700/80 border border-white/40 backdrop-blur-md rounded-full font-black transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-[0_0_18px_rgba(255,255,255,0.15)] hover:shadow-[0_0_28px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-95 gelly-button uppercase text-[11px] sm:text-xs tracking-widest text-center group"
                    >
                      <span className="text-white font-black drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">projects</span>
                    </a>
                  </Magnetic>
                </div>

                {/* Grid for Secondary Actions */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mt-1">
                  <Magnetic pullStrength={0.15}>
                    <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="w-full py-2.5 px-2 sm:px-6 bg-gradient-to-r from-blue-900/30 to-sky-900/30 border border-blue-500/50 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] transition-all text-[11px] sm:text-[11px] uppercase gelly-button tracking-wider shadow-[0_0_15px_rgba(0,119,181,0.4)] hover:shadow-[0_0_25px_rgba(0,119,181,0.8)] text-center group">
                      <span className="bg-gradient-to-r from-blue-400 to-sky-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(0,119,181,0.8)] animate-pulse">linkedin profile</span> 
                      <Linkedin size={10} className="shrink-0 text-blue-500 group-hover:text-blue-400 drop-shadow-[0_0_8px_rgba(0,119,181,0.8)] transition-colors" />
                    </a>
                  </Magnetic>
                  <Magnetic pullStrength={0.15}>
                    <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="w-full py-2.5 px-2 sm:px-6 bg-gradient-to-r from-slate-800/40 to-zinc-800/40 border border-zinc-500/50 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] transition-all text-[11px] sm:text-[11px] uppercase gelly-button tracking-wider shadow-[0_0_15px_rgba(161,161,170,0.4)] hover:shadow-[0_0_25px_rgba(161,161,170,0.8)] text-center group">
                      <span className="bg-gradient-to-r from-gray-300 to-zinc-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(161,161,170,0.8)] animate-pulse">github profile</span> 
                      <Github size={10} className="shrink-0 text-zinc-400 group-hover:text-zinc-300 drop-shadow-[0_0_8px_rgba(161,161,170,0.8)] transition-colors" />
                    </a>
                  </Magnetic>
                  <Magnetic pullStrength={0.15}>
                    <a href="https://chimataraghuram.vercel.app/" target="_blank" rel="noreferrer" className="w-full py-2.5 px-2 sm:px-6 bg-gradient-to-r from-orange-900/30 to-amber-900/30 border-2 border-orange-500/70 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] transition-all text-[8px] sm:text-[9px] uppercase gelly-button tracking-wider shadow-[0_0_18px_rgba(249,115,22,0.7),inset_0_0_10px_rgba(249,115,22,0.1)] hover:shadow-[0_0_28px_rgba(249,115,22,1),inset_0_0_15px_rgba(249,115,22,0.2)] text-center group">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse">project finder</span>
                      <Search size={10} className="shrink-0 text-orange-500 group-hover:text-yellow-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-colors" />
                    </a>
                  </Magnetic>
                  <Magnetic pullStrength={0.15}>
                    <a href={SOCIAL_LINKS.techboyStore} target="_blank" rel="noreferrer" className="w-full py-2.5 px-2 sm:px-6 bg-gradient-to-r from-red-900/30 to-rose-900/30 border-2 border-red-500/70 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] transition-all text-[8px] sm:text-[9px] uppercase gelly-button tracking-wider shadow-[0_0_18px_rgba(239,68,68,0.7),inset_0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_28px_rgba(239,68,68,1),inset_0_0_15px_rgba(239,68,68,0.2)] text-center group">
                      <span className="bg-gradient-to-r from-red-400 to-rose-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse">techboy store</span>
                      <ShoppingBag size={10} className="shrink-0 text-red-500 group-hover:text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-colors" />
                    </a>
                  </Magnetic>
                </div>
                
                <Magnetic pullStrength={0.2}>
                  <a href={SOCIAL_LINKS.resume} target="_blank" rel="noreferrer" className="mt-1 py-2.5 px-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/70 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.01] transition-all text-[9px] sm:text-[10px] uppercase gelly-button tracking-wider w-full shadow-[0_0_18px_rgba(6,182,212,0.7),inset_0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_28px_rgba(6,182,212,1),inset_0_0_15px_rgba(6,182,212,0.2)] text-center group">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse">resume</span>
                    <FileText size={12} className="shrink-0 text-cyan-500 group-hover:text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-colors" />
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Profile Image (Right Side) - col-span-5 */}
          <div className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2 w-full">
            <Reveal width="100%" delay={0.3}>
              <div className="relative w-48 sm:w-56 md:w-full md:max-w-[260px] lg:max-w-[320px] aspect-[4/5] group mx-auto md:ml-auto md:mr-0 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  fetchPriority="high"
                  decoding="async"
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
