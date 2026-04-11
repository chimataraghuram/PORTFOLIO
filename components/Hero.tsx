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
    <section id="home" className="min-h-screen md:h-screen flex items-start md:items-center justify-center pt-28 md:pt-32 pb-32 md:pb-0 relative overflow-hidden" style={{ paddingBottom: 'calc(7rem + env(safe-area-inset-bottom, 0px))' }}>
      {/* Background Shapes */}
      <div className="absolute top-20 left-[-100px] w-64 h-64 bg-pink-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-[-100px] w-80 h-80 bg-cyan-900/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 mt-10 md:mt-0">
        {/* Mobile Layout: Flex column with proper order */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Desktop: Left Column (Text Content) */}
          <div className="w-full md:block text-center md:text-left order-1 md:order-1">
            {/* 1. Name Section - First on Mobile */}
            <div className="mb-6 md:mb-4">
              <Reveal width="100%">
                <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold mb-2 text-white">
                  HI I'M <br />
                  <span className="text-3xl sm:text-5xl md:text-5xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] uppercase">
                    {ABOUT_DATA.name}
                  </span>
                </h1>
              </Reveal>
            </div>

            {/* 2. Image - Second on Mobile, Centered */}
            <div className="mb-6 md:hidden w-full flex justify-center items-center">
              <Reveal width="100%" delay={0.3}>
                <div className="relative w-48 h-[280px] group mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 rounded-xl blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(236,72,153,0.5)] rotate-3 hover:rotate-0 transition-all duration-500 hover:shadow-[0_0_80px_rgba(236,72,153,0.8)] border-2 border-white/10 hover:border-pink-500/50 hover:scale-[1.02]"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
              </Reveal>
            </div>

            {/* 3. Rest of Content (Role, Desc, Buttons) - Third on Mobile */}
            <div>
              <Reveal width="100%" delay={0.2}>
                <h3 className="text-lg md:text-2xl mb-4 font-medium leading-relaxed mt-2">
                  <span className="text-yellow-400">Python Full Stack Developer</span>
                  <span className="text-gray-500 mx-2 hidden sm:inline">|</span>
                  <br className="sm:hidden" />
                  <span className="text-white">ACTIVELY LEARNER</span>
                  <span className="text-gray-500 mx-2 hidden sm:inline">|</span>
                  <br className="sm:hidden" />
                  <span className="text-blue-400">Tech Enthusiast</span>
                </h3>
              </Reveal>

              <Reveal width="100%" delay={0.4}>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed text-sm md:text-base">
                  B.Tech (AIML) Undergraduate | AIML Diploma Holder | Python Full-Stack Developer | Actively Learning & Tech Enthusiast
                </p>
              </Reveal>
              <Reveal width="100%" delay={0.6}>
                <div className="flex flex-col gap-4 max-w-2xl mx-auto md:mx-0">
                  {/* Primary Actions Row */}
                  <div className="flex gap-3 justify-center md:justify-start">
                    <a
                      href="#minigame"
                      onClick={(e) => handleClick(e, '#minigame')}
                      className="flex-1 md:flex-none min-w-[120px] px-4 md:px-8 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(236,72,153,0.5)] hover:shadow-[0_12px_25px_-4px_rgba(236,72,153,0.7)] hover:-translate-y-1 border border-white/10 gelly-button text-xs md:text-sm"
                    >
                      Mini Game <Gamepad2 size={16} />
                    </a>
                    <a
                      href="#portfolio"
                      onClick={(e) => handleClick(e, '#portfolio')}
                      className="flex-1 md:flex-none min-w-[120px] px-4 md:px-8 py-3.5 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 group overflow-hidden bg-slate-900/80 backdrop-blur-md border border-white/10 hover:border-pink-500/50 hover:shadow-[0_8px_20px_-4px_rgba(236,72,153,0.3)] hover:-translate-y-1 gelly-button text-xs md:text-sm"
                    >
                      <span>Projects</span>
                      <MousePointer2 size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  {/* Secondary Actions Grid - More organized for mobile */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <a
                      href="https://www.linkedin.com/in/chimataraghuram/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-3 bg-[#0a66c2]/10 border border-[#0a66c2]/30 text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 hover:bg-[#0a66c2]/20 hover:scale-[1.02] gelly-button text-[10px] md:text-xs"
                    >
                      <Linkedin size={14} className="text-[#0a66c2]" /> LinkedIn
                    </a>

                    <a
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 hover:bg-white/10 hover:scale-[1.02] gelly-button text-[10px] md:text-xs"
                    >
                      <Github size={14} /> Github
                    </a>

                    <a
                      href="https://chimataraghuram.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-3 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 hover:bg-orange-500/20 hover:scale-[1.02] gelly-button text-[10px] md:text-xs"
                    >
                      <Search size={14} /> Finder
                    </a>

                    <a
                      href={SOCIAL_LINKS.techboyStore}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 hover:bg-red-500/20 hover:scale-[1.02] gelly-button text-[10px] md:text-xs"
                    >
                      <ShoppingBag size={14} /> Store
                    </a>
                  </div>

                  {/* Resume - Full width centerpiece */}
                  <a
                    href={SOCIAL_LINKS.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-[0_8px_20px_-4px_rgba(6,182,212,0.3)] hover:shadow-[0_12px_25px_-4px_rgba(6,182,212,0.5)] hover:scale-[1.01] group gelly-button text-sm tracking-widest animate-glow-cyan"
                  >
                    <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 text-transparent bg-clip-text">
                      ACCESS RESUME
                    </span>
                    <FileText size={18} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Desktop: Right Column (Image) - Hidden on Mobile, shown on Desktop */}
          <Reveal width="100%" delay={0.8} className="hidden md:flex md:justify-center order-2 md:order-2">
            <div className="relative w-80 h-[460px] group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 rounded-xl blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
              <img
                src="/profile.jpg"
                alt="Profile"
                className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(236,72,153,0.5)] rotate-3 hover:rotate-0 transition-all duration-500 hover:shadow-[0_0_80px_rgba(236,72,153,0.8)] border-2 border-white/10 hover:border-pink-500/50 hover:scale-[1.02]"
                style={{ objectPosition: 'center top' }}
              />
            </div>
          </Reveal>
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
