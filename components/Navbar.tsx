import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Image as ImageIcon, Mail, Gamepad2, Search, ShoppingBag, Bot, FileText, Compass } from 'lucide-react';
import { NavItem } from '../types';
import { SOCIAL_LINKS } from '../constants';
import SearchModal from './SearchModal';

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: <Home size={18} /> },
  { label: 'About', href: '#about', icon: <User size={18} /> },
  { label: 'Internships', href: '#internships', icon: <Briefcase size={18} /> },
  { label: 'Projects', href: '#projects', icon: <ImageIcon size={18} /> },
  { label: 'Mini Game', href: '#minigame', icon: <Gamepad2 size={18} /> },
  { label: 'Contact', href: '#contact', icon: <Mail size={18} /> },
];

interface NavbarProps {
  onAssistantToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAssistantToggle }) => {
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

      const sectionIds = navItems.map(item => item.href.substring(1));
      let current = '';
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Top of the section crosses 40% of the viewport height
          if (rect.top <= window.innerHeight * 0.4) {
            current = section.id;
            break;
          }
        }
      }

      // Check if at the very bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        current = 'contact';
      }

      if (currentScrollY < 100) {
        setActiveSection('home');
      } else if (current) {
        setActiveSection(current);
      }
    };

    handleScroll(); // Initial check
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Interval check for lazy loaded components shifting the layout
    const interval = setInterval(handleScroll, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Haptic Milestones: Vibrate when active section changes
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile && activeSection && typeof navigator !== 'undefined' && navigator.vibrate) {
      // Subtle haptic pulse when snapping to a new section
      navigator.vibrate(8);
    }
  }, [activeSection]);



  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      // Different offset for mobile vs desktop
      const isMobile = window.innerWidth < 1024;
      const offset = isMobile ? 60 : 100; // Adjusted offset for mobile
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      // Set active section immediately for better UX
      setActiveSection(targetId);

      // Stronger feedback for active selection
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([15]);
      }

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update active section after scroll completes (fallback)
      setTimeout(() => {
        const scrollPosition = window.scrollY + offset;
        const currentElement = document.elementFromPoint(window.innerWidth / 2, offset);
        if (currentElement) {
          const sectionId = currentElement.closest('section')?.id || currentElement.id;
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      }, 500);
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
          <a href={SOCIAL_LINKS.techboyStore} target="_blank" rel="noreferrer" className="animate-liquid-drop shrink-0 transition-transform duration-500 hover:scale-110">
            <div className="w-16 h-16 xl:w-24 xl:h-24 rounded-full p-[2px] bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 shadow-[0_0_25px_rgba(239,68,68,0.4)]">
              <img
                src="/techboy-logo.jpg"
                onError={(e) => { e.currentTarget.src = "/logo.png"; }}
                alt="TechBoy Store"
                className="w-full h-full rounded-full object-cover border-2 border-dark bg-black shadow-inner"
                style={{ filter: `hue-rotate(${scrollY}deg)` }}
              />
            </div>
          </a>
        </div>
      </header>

      {/* Mobile-only Header Elements (Logo + Brand Logo + Search) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 px-4 pt-4 pb-2 z-[120] flex justify-between items-center pointer-events-none transition-all duration-300">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-dark/80 to-transparent pointer-none -z-10"></div>
        
        {/* Left: Portfolio Logo */}
        <a
          href="#"
          onClick={(e) => handleClick(e, '#home')}
          className="h-10 px-3 sm:px-4 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl flex items-center justify-center gelly-button transition-all duration-300 pointer-events-auto shadow-lg"
        >
          <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-transparent bg-clip-text font-black tracking-widest text-[10px] sm:text-sm">
            PORTFOLIO
          </span>
        </a>

        {/* Right Group: Search + Assistant + Store */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="h-10 w-10 flex items-center justify-center rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl text-gray-200 gelly-button"
          >
            <Search size={18} />
          </button>
          
          <button
            onClick={onAssistantToggle}
            className="h-10 w-10 flex items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600/20 to-orange-600/20 shadow-[0_4px_12px_rgba(239,68,68,0.2)] backdrop-blur-xl transition-all duration-300 gelly-button group"
          >
            <Bot size={18} className="text-orange-500 group-hover:text-yellow-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-colors" />
          </button>

          <a href={SOCIAL_LINKS.techboyStore} target="_blank" rel="noreferrer" className="block">
            <div className="w-10 h-10 rounded-2xl p-[1.5px] bg-gradient-to-r from-red-500 to-yellow-400 shadow-[0_4px_12px_rgba(239,68,68,0.3)]">
              <img
                src="/techboy-logo.jpg"
                onError={(e) => { e.currentTarget.src = "/logo.png"; }}
                alt="Store"
                className="w-full h-full rounded-2xl object-cover border-2 border-dark bg-black"
                style={{ filter: `hue-rotate(${scrollY % 360}deg)` }}
              />
            </div>
          </a>
        </div>
      </div>

      {/* Mobile Bottom Dock - Premium Glass Edition */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 z-[130] animate-liquid-drop safe-area-inset-bottom flex justify-center pointer-events-none px-4">
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(24px) saturate(180%)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
          }}
          className="w-full max-w-md h-14 border rounded-full px-2 flex items-center justify-between gap-1 gelly-card transition-all duration-300 pointer-events-auto shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden"
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
                  if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    navigator.vibrate(10);
                  }
                }}
                className={`flex flex-col items-center justify-center w-10 h-10 transition-all duration-500 rounded-xl flex-shrink-0 pointer-events-auto relative group ${isActive
                  ? 'text-pink-400 bg-white/5'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                aria-label={item.label}
              >
                {isActive && (
                  <div className="absolute inset-x-1.5 -bottom-0.5 h-0.5 bg-pink-500 rounded-full blur-[1px] shadow-[0_0_8px_rgba(236,72,153,0.8)] animate-pulse"></div>
                )}
                {React.cloneElement(item.icon as React.ReactElement<any>, { 
                   size: 18,
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
