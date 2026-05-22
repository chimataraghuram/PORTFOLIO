import React from 'react';
import { Github, Linkedin, FileText, Gamepad2, Search, ShoppingBag, MousePointer2 } from 'lucide-react';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import { useIsMobile } from '../hooks/useIsMobile';
import HeroNeuralUniverse from './universe/HeroNeuralUniverse';
import HeroConsciousnessPortrait from './universe/HeroConsciousnessPortrait';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import TypewriterEffect from './TypewriterEffect';
import { scrollToSection } from '../utils/scroll';

const NAME_GRADIENT =
  'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-[length:200%_auto] animate-text-gradient';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
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
      onMouseLeave={() => setMouse((m) => ({ ...m, active: false }))}
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-transparent pt-16 md:pt-20 pb-12"
      style={{ minHeight: '100dvh' }}
      aria-label="AI Consciousness Inside a Neural Universe"
    >
      <HeroNeuralUniverse mouse={mouse} isMobile={isMobile} />

      {/* Cinematic cursor luminance — minimal */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-500"
        style={{
          opacity: mouse.active ? 1 : 0,
          background: `radial-gradient(520px circle at ${mouse.x}px ${mouse.y}px, rgba(34,211,238,0.04), rgba(99,102,241,0.07) 40%, transparent 58%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10 w-full mt-4 md:mt-8">
        {/* Mobile title */}
        <div className="block md:hidden text-center mt-4 mb-8 relative">
          <Reveal width="100%">
            <h1 className="text-4xl font-bold mb-2 text-white leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              HI I'M <br />
              <span
                className={`text-3xl inline-block ${NAME_GRADIENT} uppercase mt-2`}
                style={{ filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.25))' }}
              >
                {ABOUT_DATA.name}
              </span>
            </h1>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center py-4 md:py-0">
          {/* Content — visually dominant */}
          <div className="md:col-span-7 flex flex-col justify-center items-center md:items-start text-center md:text-left order-2 md:order-1 mt-4 md:mt-0 relative">
            <div className="hidden md:block absolute -inset-4 bg-[#050816]/20 blur-xl rounded-3xl pointer-events-none md:max-w-2xl" aria-hidden />

            <div className="hidden md:block relative">
              <Reveal width="100%">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-white leading-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)]">
                  HI I'M <br />
                  <span
                    className={`text-4xl lg:text-6xl inline-block ${NAME_GRADIENT} uppercase`}
                    style={{ filter: 'drop-shadow(0 0 24px rgba(34, 211, 238, 0.2))' }}
                  >
                    {ABOUT_DATA.name}
                  </span>
                </h1>
              </Reveal>
            </div>

            <div className="w-full flex flex-col items-center md:items-start mb-6 relative">
              <div className="hidden lg:block mb-4">
                <Reveal width="100%" delay={0.2}>
                  <h3 className="text-xl lg:text-2xl font-medium text-slate-300 drop-shadow-[0_1px_12px_rgba(0,0,0,0.8)]">
                    <span className="text-cyan-300/95">Python Full Stack Developer</span>
                    <span className="text-slate-500"> | </span>
                    Tech Enthusiast
                    <span className="text-slate-500"> | </span>
                    Active Learner
                  </h3>
                </Reveal>
              </div>

              <div className="flex lg:hidden flex-wrap justify-center md:justify-start gap-2 mb-4">
                <span className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11px] font-black uppercase tracking-wider rounded-lg">
                  Python dev
                </span>
                <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/25 text-blue-300 text-[11px] font-black uppercase tracking-wider rounded-lg">
                  Tech Enthusiast
                </span>
                <span className="px-3 py-1.5 bg-violet-500/10 border border-violet-500/25 text-violet-300 text-[11px] font-black uppercase tracking-wider rounded-lg">
                  Active Learner
                </span>
              </div>

              <Reveal width="100%" delay={0.4}>
                <p className="text-slate-400 max-w-lg leading-relaxed text-xs sm:text-sm lg:text-base font-medium min-h-[40px] sm:min-h-[60px] drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]">
                  <TypewriterEffect
                    text="B.Tech (AIML) Undergraduate | AIML Diploma Holder | Python Full-Stack Developer | Actively Learning & Tech Enthusiast"
                    speed={30}
                    delay={800}
                  />
                </p>
              </Reveal>
            </div>

            <Reveal width="100%" delay={0.6}>
              <div className="flex flex-col gap-3 w-full max-w-[480px] mx-auto md:mx-0 relative z-10">
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
                      className="w-full px-2 sm:px-6 py-3 bg-slate-800/60 border border-slate-500/40 backdrop-blur-md rounded-full font-black transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-[0_0_18px_rgba(34,211,238,0.08)] hover:shadow-[0_0_24px_rgba(34,211,238,0.2)] hover:scale-[1.02] active:scale-95 gelly-button uppercase text-[11px] sm:text-xs tracking-widest text-center group"
                    >
                      <span className="text-white font-black">projects</span>
                    </a>
                  </Magnetic>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mt-1">
                  <Magnetic pullStrength={0.15}>
                    <a
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-2 sm:px-6 bg-blue-950/40 border border-blue-500/40 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] transition-all text-[11px] uppercase gelly-button tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.25)] hover:shadow-[0_0_22px_rgba(59,130,246,0.45)] text-center group"
                    >
                      <span className="text-blue-300 group-hover:text-blue-200">linkedin profile</span>
                      <Linkedin size={10} className="shrink-0 text-blue-400 transition-colors" />
                    </a>
                  </Magnetic>
                  <Magnetic pullStrength={0.15}>
                    <a
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-2 sm:px-6 bg-slate-800/50 border border-slate-500/40 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] transition-all text-[11px] uppercase gelly-button tracking-wider text-center group"
                    >
                      <span className="text-slate-300 group-hover:text-white">github profile</span>
                      <Github size={10} className="shrink-0 text-slate-400 transition-colors" />
                    </a>
                  </Magnetic>
                  <Magnetic pullStrength={0.15}>
                    <a
                      href="https://chimataraghuram.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-2 sm:px-6 bg-indigo-950/40 border border-indigo-500/40 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] transition-all text-[8px] sm:text-[9px] uppercase gelly-button tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.3)] text-center group"
                    >
                      <span className="text-indigo-300 group-hover:text-indigo-200">project finder</span>
                      <Search size={10} className="shrink-0 text-indigo-400 transition-colors" />
                    </a>
                  </Magnetic>
                  <Magnetic pullStrength={0.15}>
                    <a
                      href={SOCIAL_LINKS.techboyStore}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-2 sm:px-6 bg-violet-950/40 border border-violet-500/40 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] transition-all text-[8px] sm:text-[9px] uppercase gelly-button tracking-wider shadow-[0_0_15px_rgba(139,92,246,0.3)] text-center group"
                    >
                      <span className="text-violet-300 group-hover:text-violet-200">techboy store</span>
                      <ShoppingBag size={10} className="shrink-0 text-violet-400 transition-colors" />
                    </a>
                  </Magnetic>
                </div>

                <Magnetic pullStrength={0.2}>
                  <a
                    href={SOCIAL_LINKS.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 py-2.5 px-6 bg-cyan-950/40 border border-cyan-500/50 backdrop-blur-md rounded-full font-black flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.01] transition-all text-[9px] sm:text-[10px] uppercase gelly-button tracking-wider w-full shadow-[0_0_18px_rgba(6,182,212,0.35)] hover:shadow-[0_0_26px_rgba(6,182,212,0.55)] text-center group"
                  >
                    <span className="text-cyan-300 group-hover:text-cyan-200">resume</span>
                    <FileText size={12} className="shrink-0 text-cyan-400 transition-colors" />
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Consciousness portrait */}
          <div className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2 w-full relative z-[6]">
            <Reveal width="100%" delay={0.3}>
              <div className="group">
                <HeroConsciousnessPortrait isMobile={isMobile} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <a
        href="#about"
        onClick={(e) => handleClick(e, '#about')}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300 group z-30"
      >
        <span className="text-[10px] text-slate-500 group-hover:text-cyan-400/80 transition-colors">Scroll Down</span>
        <div className="gelly-button p-2 rounded-full bg-slate-900/50 border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all">
          <MousePointer2 size={16} className="text-cyan-400/80 group-hover:text-cyan-300 transition-colors" />
        </div>
      </a>
    </section>
  );
};

export default React.memo(Hero);
