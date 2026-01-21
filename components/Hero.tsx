import React from 'react';
import { ArrowRight, Github, ExternalLink, Mail, FileText, Gamepad2, MousePointer2, Search, ShoppingBag, Linkedin } from 'lucide-react';
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
    <section id="home" className="min-h-screen md:h-screen flex items-start md:items-center justify-center pt-28 md:pt-32 pb-32 md:pb-0 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-20 left-[-100px] w-64 h-64 bg-pink-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-[-100px] w-80 h-80 bg-cyan-900/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10 mt-10 md:mt-0">

        {/* Text Content */}
        <div className="order-1 md:order-1 text-center md:text-left">
          <Reveal width="100%">
            <h1 className="text-2xl md:text-5xl font-bold mb-2 text-white">
              Hi, I'm <br />
              <span className="text-xl sm:text-4xl md:text-5xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                {ABOUT_DATA.name}
              </span>
            </h1>
            <h3 className="text-lg md:text-2xl mb-4 font-medium leading-relaxed">
              <span className="text-yellow-400">Python Full Stack Developer</span>
              <span className="text-gray-500 mx-2 hidden sm:inline">|</span>
              <br className="sm:hidden" />
              <span className="text-white">AI Engineer</span>
              <span className="text-gray-500 mx-2 hidden sm:inline">|</span>
              <br className="sm:hidden" />
              <span className="text-blue-400">Tech Enthusiast</span>
            </h3>
          </Reveal>

          <Reveal width="100%" delay={0.2}>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed text-sm md:text-base">
              Pursuing BTech in AI & ML | Completed 3-Year Diploma in AI & ML | Passionate about innovation, Python project, and full-stack development.
            </p>
          </Reveal>

          <Reveal width="100%" delay={0.4}>
            <div className="flex flex-wrap gap-4 items-center md:items-start justify-center md:justify-start mb-8 max-w-2xl">
              <a
                href="#minigame"
                onClick={(e) => handleClick(e, '#minigame')}
                className="min-w-[140px] px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white rounded-full font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] hover:-translate-y-1 border border-white/10 gelly-button text-xs md:text-sm shrink-0"
              >
                Mini Game <Gamepad2 size={16} />
              </a>
              <a
                href="#portfolio"
                onClick={(e) => handleClick(e, '#portfolio')}
                className="relative min-w-[140px] px-6 py-3 rounded-full font-bold text-white transition-all flex items-center justify-center gap-2 group overflow-hidden bg-[#1e293b] border border-gray-700 hover:border-pink-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:-translate-y-1 gelly-button text-xs md:text-sm shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10">View Projects</span>
                <MousePointer2 size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/in/chimataraghuram/"
                target="_blank"
                rel="noreferrer"
                className="min-w-[140px] px-6 py-3 bg-[#0a66c2] text-white rounded-full font-bold transition-all flex items-center justify-center gap-2 hover:bg-[#004182] hover:shadow-[0_0_25px_rgba(10,102,194,0.6)] hover:-translate-y-1 gelly-button text-xs md:text-sm shrink-0"
              >
                Check my Linkedin <Linkedin size={16} />
              </a>

              <a
                href="https://chimataraghuram.github.io/PROJECT-FINDER/"
                target="_blank"
                rel="noreferrer"
                className="min-w-[140px] px-6 py-3 bg-dark-lighter text-cyan-400 rounded-full font-bold transition-all flex items-center justify-center gap-2 animate-glow-blue hover:scale-105 gelly-button text-xs md:text-sm shrink-0"
              >
                PROJECT FINDER <Search size={16} />
              </a>

              <a
                href={SOCIAL_LINKS.techboyStore}
                target="_blank"
                rel="noreferrer"
                className="min-w-[140px] px-6 py-3 bg-dark-lighter rounded-full font-bold transition-all flex items-center justify-center gap-2 animate-glow-orange hover:scale-105 group gelly-button text-xs md:text-sm shrink-0"
              >
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient">
                  TECHBOY STORE
                </span>
                <ShoppingBag size={16} className="text-yellow-400 group-hover:text-yellow-300 transition-colors" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Image */}
        <Reveal width="100%" delay={0.8} className="order-2 md:order-2 flex justify-center">
          <div className="relative w-48 h-[280px] md:w-80 md:h-[460px] group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 rounded-xl blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
            <img
              src="/PORTFOLIO/profile.jpg"
              alt="Profile"
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(236,72,153,0.5)] rotate-3 hover:rotate-0 transition-all duration-500 hover:shadow-[0_0_80px_rgba(236,72,153,0.8)] border-2 border-white/10 hover:border-pink-500/50 hover:scale-[1.02]"
              style={{ objectPosition: 'center top' }}
            />
          </div>
        </Reveal>
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
    </section>
  );
};

export default Hero;