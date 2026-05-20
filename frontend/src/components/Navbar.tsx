import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Image as ImageIcon, Mail, Gamepad2, Search, ShoppingBag, Bot, FileText, Compass, Trophy } from 'lucide-react';
import { NavItem } from '../types';
import { SOCIAL_LINKS } from '../constants';
import SearchModal from './SearchModal';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../utils/scroll';

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: <Home size={18} /> },
  { label: 'About', href: '#about', icon: <User size={18} /> },
  { label: 'Internships', href: '#internships', icon: <Briefcase size={18} /> },
  { label: 'Projects', href: '#projects', icon: <ImageIcon size={18} /> },
  { label: 'Achievements', href: '#achievements', icon: <Trophy size={18} /> },
  { label: 'Mini Game', href: '#minigame', icon: <Gamepad2 size={18} /> },
  { label: 'Contact', href: '#contact', icon: <Mail size={18} /> },
];

interface NavbarProps {
  onAssistantToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAssistantToggle }) => {
  const { activeSection, setActiveSection } = useActiveSection(navItems.map(item => item.href.substring(1)), 100);
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

      // Check if at the very bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection('contact');
      }

      if (currentScrollY < 100) {
        setActiveSection('home');
      }
    };

    handleScroll(); // Initial check
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setActiveSection]);

  // Unique haptic pattern per section
  const sectionVibrations: Record<string, number | number[]> = {
    home:         [20],                      // single pulse — welcome
    about:        [15, 60, 15],              // double tap — "hey, I'm here"
    internships:  [10, 40, 10, 40, 10],     // triple knock — professional
    projects:     [30, 20, 5, 20, 30],      // camera shutter — showcase
    achievements: [15, 30, 15, 30, 50],     // victory buzz — celebration
    minigame:     [50, 30, 50, 30, 80],     // game start rumble — action
    contact:      [60],                     // long press — reach out
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile && activeSection && typeof navigator !== 'undefined' && navigator.vibrate) {
      const pattern = sectionVibrations[activeSection] ?? [10];
      navigator.vibrate(pattern);
    }
  }, [activeSection]);



  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    scrollToSection(e, href);
    setActiveSection(href.substring(1));
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
              borderColor: `rgba(255, 255, 255, ${0.1 + (scrollProgress * 0.1)})`,
            }}
            className="h-12 xl:h-14 px-6 xl:px-8 rounded-full border flex items-center justify-center animate-liquid-drop transition-all duration-300 group overflow-hidden gelly-button"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]"></div>
            <span className="relative z-10 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient font-black tracking-widest text-lg xl:text-2xl">
              PORTFOLIO
            </span>
          </a>
        </div>

        {/* Center: Main Navigation and AI Pill */}
        <div className="flex justify-center items-center gap-3 pointer-events-auto">
          <nav
            style={{
              backgroundColor: `rgba(15, 23, 42, ${0.2 + (scrollProgress * 0.4)})`,
              backdropFilter: `blur(${16 + (scrollProgress * 24)}px) saturate(150%)`,
              borderColor: `rgba(255, 255, 255, ${0.1 + (scrollProgress * 0.1)})`,
            }}
            className="h-12 xl:h-14 border rounded-full px-2 xl:px-3 flex items-center gap-0.5 xl:gap-1.5 animate-liquid-drop transition-all duration-500 relative hover:scale-[1.02]"
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
                    ${isActive && !isMiniGame ? 'bg-pink-500/15 text-pink-400 border border-pink-500/40' : 'text-gray-400 hover:text-pink-400'}
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

          {/* Independent AI Assistant Trigger */}
          <button
            onClick={onAssistantToggle}
            className="h-12 xl:h-14 px-4 xl:px-5 flex items-center justify-center gap-2 rounded-full border border-red-500/50 bg-gradient-to-r from-red-900/30 to-orange-900/30 shadow-[0_0_15px_rgba(249,115,22,0.4)] backdrop-blur-md hover:shadow-[0_0_25px_rgba(249,115,22,0.8)] hover:scale-105 transition-all duration-300 gelly-button group animate-liquid-drop"
            title="TECHBOY AI"
          >
            <span className="text-[11px] xl:text-xs font-black uppercase tracking-widest whitespace-nowrap bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse">TECHBOY AI</span>
            <Bot size={16} className="text-orange-500 group-hover:text-yellow-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-colors" />
          </button>
        </div>

        {/* Right: Brand Logo */}
        <div className="flex justify-end pointer-events-auto translate-y-4 translate-x-2">
          <a
            href={SOCIAL_LINKS.techboyStore}
            target="_blank"
            rel="noreferrer"
            className="animate-liquid-drop shrink-0 group relative flex flex-col items-center"
            title="TechBoy Store"
          >
            {/* Hover label */}
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-widest text-orange-400 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 drop-shadow-[0_0_8px_rgba(249,115,22,0.9)] pointer-events-none">
              TechBoy Store ↗
            </span>

            <div className="relative">
              {/* Spinning conic glow ring */}
              <div
                className="absolute -inset-[3px] rounded-full animate-[spin_5s_linear_infinite]"
                style={{
                  background: 'conic-gradient(from 0deg, #ef4444, #f97316, #eab308, #f97316, #ef4444)',
                  filter: 'blur(4px)',
                  opacity: Math.min(0.25 + scrollY / 600, 0.85),
                }}
              />
              {/* Logo wrapper */}
              <div
                className="relative w-16 h-16 xl:w-24 xl:h-24 rounded-full p-[2.5px] bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] group-hover:shadow-[0_0_40px_rgba(249,115,22,0.9)] transition-shadow duration-500"
                style={{ transform: `scale(${1 + Math.sin(scrollY / 280) * 0.04})` }}
              >
                <img
                  src="/techboy-logo.jpg"
                  onError={(e) => { e.currentTarget.src = "/logo.png"; }}
                  alt="TechBoy Store"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full rounded-full object-cover border-2 border-dark bg-black shadow-inner group-hover:brightness-110 transition-all duration-300"
                />
              </div>
            </div>
          </a>
        </div>
      </header>

      {/* Mobile-only Header Elements (Logo + Brand Logo + Search) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 px-4 pt-4 pb-2 z-[120] flex justify-between items-center pointer-events-none transition-all duration-300">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-dark/95 to-transparent pointer-none -z-10"></div>
        
        {/* Left: Portfolio Logo */}
        <a
          href="#"
          onClick={(e) => handleClick(e, '#home')}
          className="h-10 px-3 sm:px-4 rounded-2xl border border-white/10 bg-slate-900/85 backdrop-blur-xl flex items-center justify-center gelly-button transition-all duration-300 pointer-events-auto shadow-lg"
        >
          <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-transparent bg-clip-text font-black tracking-widest text-sm sm:text-base">
            PORTFOLIO
          </span>
        </a>

        {/* Right Group: Search + Assistant + Store */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="h-10 w-10 flex items-center justify-center rounded-2xl border border-white/10 bg-slate-900/85 backdrop-blur-xl text-gray-200 gelly-button"
          >
            <Search size={18} />
          </button>
          
          <button
            onClick={onAssistantToggle}
            className="h-10 w-10 flex items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600/60 to-orange-600/60 shadow-[0_4px_12px_rgba(239,68,68,0.2)] backdrop-blur-xl transition-all duration-300 gelly-button group"
          >
            <Bot size={18} className="text-orange-500 group-hover:text-yellow-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-colors" />
          </button>

          <a href={SOCIAL_LINKS.techboyStore} target="_blank" rel="noreferrer" className="block group relative">
            {/* Spinning ring (mobile) */}
            <div
              className="absolute -inset-[2px] rounded-2xl animate-[spin_5s_linear_infinite]"
              style={{
                background: 'conic-gradient(from 0deg, #ef4444, #f97316, #eab308, #f97316, #ef4444)',
                filter: 'blur(3px)',
                opacity: Math.min(0.3 + scrollY / 600, 0.8),
              }}
            />
            <div
              className="relative w-10 h-10 rounded-2xl p-[1.5px] bg-gradient-to-r from-red-500 to-yellow-400 shadow-[0_4px_12px_rgba(239,68,68,0.3)] group-hover:shadow-[0_4px_22px_rgba(249,115,22,0.8)] transition-shadow duration-300"
              style={{ transform: `scale(${1 + Math.sin(scrollY / 280) * 0.04})` }}
            >
              <img
                src="/techboy-logo.jpg"
                onError={(e) => { e.currentTarget.src = "/logo.png"; }}
                alt="Store"
                loading="lazy"
                decoding="async"
                className="w-full h-full rounded-2xl object-cover border-2 border-dark bg-black group-hover:brightness-110 transition-all duration-300"
              />
            </div>
          </a>
        </div>
      </div>

      {/* Mobile Bottom Dock - Premium Glass Edition */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 z-[130] animate-liquid-drop safe-area-inset-bottom flex justify-center pointer-events-none px-4">
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(24px) saturate(180%)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
          }}
          className="w-full max-w-sm h-12 border rounded-full px-1 flex items-center justify-between gap-0 gelly-card transition-all duration-300 pointer-events-auto shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Active Highlight Pill - Could be animated if we had more state */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 to-transparent pointer-events-none"></div>
          
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  handleClick(e, item.href);
                  // Strong click feedback + section pattern
                  if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    const section = item.href.substring(1);
                    const pattern = sectionVibrations[section] ?? [15];
                    navigator.vibrate([25, 30, ...( Array.isArray(pattern) ? pattern : [pattern])]);
                  }
                }}
                className={`flex flex-col items-center justify-center w-9 h-9 transition-all duration-500 rounded-xl flex-shrink-0 pointer-events-auto relative group ${isActive
                  ? 'text-pink-400 bg-white/5'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                aria-label={item.label}
              >
                {isActive && (
                  <div className="absolute inset-x-1.5 -bottom-0.5 h-0.5 bg-pink-500 rounded-full blur-[1px] shadow-[0_0_8px_rgba(236,72,153,0.8)] animate-pulse"></div>
                )}
                {React.cloneElement(item.icon as React.ReactElement<any>, { 
                   size: 16,
                   className: `transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`
                })}
              </a>
            );
          })}
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
