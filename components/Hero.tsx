import React from 'react';
import { Mail, FileText, Gamepad2, MousePointer2, Search, ShoppingBag, ExternalLink, Github, Linkedin } from 'lucide-react';
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
        {/* UNIFIED LAYOUT for Desktop & Mobile - Profile on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Text & Actions (Left Side) - col-span-7 */}
          <div className="md:col-span-7 text-left order-2 md:order-1">
            <Reveal width="100%">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 text-white leading-tight">
                HI I'M <br />
                <span className="text-3xl sm:text-5xl lg:text-7xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] uppercase">
                  {ABOUT_DATA.name}
                </span>
              </h1>
            </Reveal>

            <Reveal width="100%" delay={0.2} className="hidden md:block">
              <h3 className="text-xl lg:text-3xl mb-6 font-medium text-gray-300">
                 <span className="text-yellow-400">Python Full Stack Developer</span> | Tech Enthusiast | Learner
              </h3>
            </Reveal>

            <Reveal width="100%" delay={0.4} className="hidden md:block">
              <p className="text-gray-400 mb-8 max-w-lg leading-relaxed text-base lg:text-lg">
                {ABOUT_DATA.name} | B.Tech Undergraduate | AI & ML Specialist | Python Developer building modern web solutions.
              </p>
            </Reveal>

            {/* Role Pills for Mobile */}
            <div className="flex md:hidden flex-wrap gap-1.5 mb-6">
              <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[10px] font-black uppercase tracking-wider rounded-lg">Python dev</span>
              <span className="px-3 py-1 bg-blue-400/10 border border-blue-400/20 text-blue-400 text-[10px] font-black uppercase tracking-wider rounded-lg">Tech Enthusiast</span>
              <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 text-pink-500 text-[10px] font-black uppercase tracking-wider rounded-lg">Learner</span>
            </div>

            <Reveal width="100%" delay={0.6}>
              <div className="flex flex-col gap-3 w-full max-w-[500px]">
                {/* Row 1: Primary Actions */}
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="#minigame"
                    onClick={(e) => handleClick(e, '#minigame')}
                    className="flex-1 min-w-[140px] px-6 py-3.5 bg-violet-600 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_-5px_rgba(124,58,237,0.4)] hover:scale-[1.05] active:scale-95 gelly-button uppercase text-[10px] md:text-sm tracking-widest"
                  >
                    mini game <Gamepad2 size={18} />
                  </a>
                  <a
                    href="#portfolio"
                    onClick={(e) => handleClick(e, '#portfolio')}
                    className="flex-1 min-w-[140px] px-6 py-3.5 bg-slate-800 border border-white/10 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 hover:bg-slate-700 active:scale-95 gelly-button uppercase text-[10px] md:text-sm tracking-widest"
                  >
                    projects <ExternalLink size={18} />
                  </a>
                </div>

                {/* Grid for Secondary Actions with Specific Colors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="py-3 px-4 bg-[#0077b5] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0077b5]/90 transition-all text-[10px] uppercase gelly-button tracking-wider">linkedin profile <Linkedin size={14} /></a>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="py-3 px-4 bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-600 transition-all text-[10px] uppercase gelly-button tracking-wider">github profile <Github size={14} /></a>
                  <a href="https://chimataraghuram.vercel.app/" target="_blank" rel="noreferrer" className="py-3 px-4 bg-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all text-[10px] uppercase gelly-button tracking-wider">project finder <Search size={14} /></a>
                  <a href={SOCIAL_LINKS.techboyStore} target="_blank" rel="noreferrer" className="py-3 px-4 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all text-[10px] uppercase gelly-button tracking-wider">techboy store <ShoppingBag size={14} /></a>
                </div>
                
                <a href={SOCIAL_LINKS.resume} target="_blank" rel="noreferrer" className="py-3 px-4 bg-cyan-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-700 transition-all text-[10px] uppercase gelly-button tracking-wider w-full">resume <FileText size={14} /></a>
              </div>
            </Reveal>
          </div>

          {/* Profile Image (Right Side) - col-span-5 */}
          <div className="md:col-span-5 flex justify-end order-1 md:order-2 mb-10 md:mb-0">
            <Reveal width="100%" delay={0.3}>
              <div className="relative w-48 sm:w-64 md:w-80 lg:w-96 aspect-[4/5] group ml-auto">
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
