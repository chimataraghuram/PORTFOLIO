import React, { useState, useEffect } from 'react';
import { Home, User, FileCode, Briefcase, GraduationCap, Image as ImageIcon, Mail, Gamepad2, Search, ShoppingBag } from 'lucide-react';
import { NavItem } from '../types';
import { SOCIAL_LINKS } from '../constants';
import SearchModal from './SearchModal';

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: <Home size={18} /> },
  { label: 'About', href: '#about', icon: <User size={18} /> },
  { label: 'Skills', href: '#skills', icon: <FileCode size={18} /> },
  { label: 'Education', href: '#qualification', icon: <GraduationCap size={18} /> },
  { label: 'Internships', href: '#internships', icon: <Briefcase size={18} /> },
  { label: 'Projects', href: '#portfolio', icon: <ImageIcon size={18} /> },
  { label: 'Contact', href: '#publisher', icon: <Mail size={18} /> },
  { label: 'Mini Game', href: '#minigame', icon: <Gamepad2 size={18} /> },
];

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
      const progress = Math.min(currentScrollY / 300, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    );

    const sections = navItems.map(item => document.getElementById(item.href.substring(1)));
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

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
      setActiveSection(targetId);
    }
  };

  return (
    <>
      {/* Desktop Floating Header - 3 Column Layout to prevent overlap */}
      <header className={`
        hidden lg:grid grid-cols-[1.2fr_auto_0.8fr] fixed top-1 left-0 right-0 px-4 xl:px-8 items-center z-[120] pointer-events-none transition-all duration-500
        ${isScrolled ? 'top-0.5' : 'top-1'}
      `}>
        {/* Left: Portfolio Logo */}
        <div className="flex justify-start pointer-events-auto">
          <a
            href="#"
            onClick={(e) => handleClick(e, '#home')}
            style={{
              backgroundColor: `rgba(15, 23, 42, ${0.4 + (scrollProgress * 0.3)})`,
              backdropFilter: `blur(${16 + (scrollProgress * 16)}px) saturate(150%)`,
              borderColor: `rgba(249, 115, 22, ${0.4 + (scrollProgress * 0.2)})`,
              boxShadow: `0 0 ${20 + (scrollProgress * 15)}px rgba(249, 115, 22, ${0.3 + (scrollProgress * 0.2)})`,
            }}
            className="h-12 xl:h-14 px-6 xl:px-8 rounded-full border flex items-center justify-center animate-liquid-drop transition-all duration-300 group overflow-hidden gelly-button"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]"></div>
            <span className="relative z-10 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_12px_rgba(249,115,22,0.9)] font-black tracking-widest text-lg xl:text-2xl">
              PORTFOLIO
            </span>
          </a>
        </div>

        {/* Center: Main Navigation Pill */}
        <div className="flex justify-center pointer-events-auto">
          <nav
            style={{
              backgroundColor: `rgba(15, 23, 42, ${0.2 + (scrollProgress * 0.4)})`,
              backdropFilter: `blur(${16 + (scrollProgress * 24)}px) saturate(150%)`,
              borderColor: `rgba(255, 255, 255, ${0.1 + (scrollProgress * 0.1)})`,
              boxShadow: scrollProgress > 0 ? `0 4px 25px -2px rgba(0, 0, 0, 0.3), 0 0 20px rgba(168, 85, 247, ${scrollProgress * 0.25})` : 'none'
            }}
            className="h-12 xl:h-14 border rounded-full px-2 xl:px-3 flex items-center gap-0.5 xl:gap-1.5 animate-liquid-drop transition-all duration-500 relative hover:scale-[1.02] hover:shadow-xl"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              const isMiniGame = item.label === 'Mini Game';
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`
                    rounded-full font-semibold transition-all duration-300 cursor-pointer select-none whitespace-nowrap gelly-button
                    ${isMiniGame ? 'px-3 xl:px-5 py-2 text-sm xl:text-base' : 'px-2 xl:px-3.5 py-1.5 text-[11px] xl:text-sm'}
                    ${isActive && !isMiniGame ? 'bg-white/15 text-white border border-cyan-400/30' : 'text-gray-400 hover:text-white'}
                  `}
                >
                  {isMiniGame ? (
                    <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 text-transparent bg-clip-text">
                      {item.label}
                    </span>
                  ) : item.label}
                </a>
              );
            })}
            <div className="w-[1px] h-5 bg-white/20 mx-1"></div>

            {/* Integrated Search Bar */}
            <div className="flex items-center justify-center pl-0.5">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`
                  relative flex h-8 xl:h-10 items-center justify-start rounded-full text-gray-400 hover:text-white transition-all duration-700 group gelly-button overflow-hidden
                  ${isScrolled ? 'w-8 xl:w-10 overflow-hidden' : 'w-8 xl:w-10 xl:w-36 bg-white/10 border border-white/5 shadow-inner'}
                `}
              >
                <div className="flex items-center gap-2 px-2.5 whitespace-nowrap">
                  <Search size={16} className="shrink-0" />
                  <span className={`
                    hidden xl:inline text-xs font-bold transition-all duration-500
                    ${isScrolled ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}
                  `}>
                    Search...
                  </span>
                </div>
              </button>
            </div>
          </nav>
        </div>

        {/* Right: Brand Logo */}
        <div className="flex justify-end pointer-events-auto translate-y-4 translate-x-2">
          <a href={SOCIAL_LINKS.techboyStore} target="_blank" rel="noreferrer" className="animate-liquid-drop shrink-0 transition-transform duration-500 hover:scale-110">
            <div className="w-20 h-20 xl:w-28 xl:h-28 rounded-full p-[2px] bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 shadow-[0_0_25px_rgba(239,68,68,0.4)]">
              <img
                src="/PORTFOLIO/techboy-logo.jpg"
                onError={(e) => { e.currentTarget.src = "/PORTFOLIO/logo.png"; }}
                alt="TechBoy Store"
                className="w-full h-full rounded-full object-cover border-2 border-dark bg-black shadow-inner"
                style={{ filter: `hue-rotate(${scrollY}deg)` }}
              />
            </div>
          </a>
        </div>
      </header>

      {/* Mobile-only Header Elements (Logo + Brand Logo) */}
      <div className="lg:hidden fixed top-1 left-4 z-[120]">
        <a
          href="#"
          onClick={(e) => handleClick(e, '#home')}
          className="h-10 px-4 rounded-full border border-orange-500/40 bg-dark/40 backdrop-blur-md flex items-center justify-center gelly-button"
        >
          <span className="bg-gradient-to-r from-red-500 to-yellow-400 text-transparent bg-clip-text font-black tracking-widest text-sm">
            PORTFOLIO
          </span>
        </a>
      </div>

      <div className="lg:hidden fixed top-4 right-2 z-[120] pointer-events-none">
        <a href={SOCIAL_LINKS.techboyStore} target="_blank" rel="noreferrer" className="pointer-events-auto animate-liquid-drop block">
          <div className="w-12 h-12 rounded-full p-[1.5px] bg-gradient-to-r from-red-500 to-yellow-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
            <img
              src="/PORTFOLIO/techboy-logo.jpg"
              onError={(e) => { e.currentTarget.src = "/PORTFOLIO/logo.png"; }}
              alt="TechBoy Store"
              className="w-full h-full rounded-full object-cover border-2 border-dark bg-black"
              style={{ filter: `hue-rotate(${scrollY}deg)` }}
            />
          </div>
        </a>
      </div>

      {/* Mobile Bottom Dock */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50 animate-liquid-drop">
        <div
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(20px) saturate(150%)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
          className="max-w-md mx-auto h-16 border rounded-full px-4 flex items-center justify-around"
        >
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={(e) => handleClick(e, item.href)} className="p-3 text-gray-400">
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
            </a>
          ))}
          {/* Mobile Search - Last Item */}
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-3 text-gray-400">
            <Search size={20} />
          </button>
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;