import React, { useState, useEffect } from 'react';
import { Home, User, FileCode, Briefcase, GraduationCap, Image as ImageIcon, Mail, Gamepad2, Search, ShoppingBag, Compass } from 'lucide-react';
import { NavItem } from '../types';
import { SOCIAL_LINKS } from '../constants';
import SearchModal from './SearchModal';

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: <Home size={18} /> },
  { label: 'About', href: '#about', icon: <User size={18} /> },
  { label: 'Education', href: '#qualification', icon: <GraduationCap size={18} /> },
  { label: 'Internships', href: '#internships', icon: <Briefcase size={18} /> },
  { label: 'Projects', href: '#portfolio', icon: <ImageIcon size={18} /> },
  { label: 'Explorations', href: '#explorations', icon: <Compass size={18} /> },
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

      // Force 'home' active state when at the top
      if (currentScrollY < 100) {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Detect if mobile device
    const isMobile = window.innerWidth < 1024; // lg breakpoint

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
        // More lenient rootMargin for mobile to ensure proper highlighting
        rootMargin: isMobile ? '-20% 0px -60% 0px' : '-40% 0px -40% 0px',
        threshold: isMobile ? 0.1 : 0
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
      // Different offset for mobile vs desktop
      const isMobile = window.innerWidth < 1024;
      const offset = isMobile ? 120 : 100; // More offset on mobile for bottom navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      // Set active section immediately for better UX
      setActiveSection(targetId);

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

        {/* Center: Main Navigation Pill */}
        <div className="flex justify-center pointer-events-auto">
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

      {/* Mobile-only Header Elements (Logo + Brand Logo + Search) */}
      <div className="lg:hidden fixed top-2 left-0 right-0 px-4 z-[120] flex justify-between items-center pointer-events-none">
        {/* Left: Portfolio Logo */}
        <a
          href="#"
          onClick={(e) => handleClick(e, '#home')}
          className="h-10 px-3 rounded-full border border-pink-500/60 bg-dark/60 backdrop-blur-md flex items-center justify-center gelly-button transition-all duration-300 pointer-events-auto"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.6)';
          }}
        >
          <span className="bg-gradient-to-r from-red-500 to-yellow-400 text-transparent bg-clip-text font-black tracking-widest text-xs sm:text-sm">
            PORTFOLIO
          </span>
        </a>

        {/* Center: Search Button */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="h-10 w-10 flex items-center justify-center rounded-full border border-pink-500/60 bg-dark/60 backdrop-blur-md text-gray-200 gelly-button pointer-events-auto"
        >
          <Search size={18} />
        </button>

        {/* Right: Brand Logo */}
        <a href={SOCIAL_LINKS.techboyStore} target="_blank" rel="noreferrer" className="animate-liquid-drop block pointer-events-auto">
          <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-r from-red-500 to-yellow-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
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
      <div className="lg:hidden fixed bottom-4 left-0 right-0 z-50 animate-liquid-drop safe-area-inset-bottom flex justify-center pointer-events-none">
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(20px) saturate(150%)',
            borderColor: 'rgba(236, 72, 153, 0.4)',
          }}
          className="w-[98%] max-w-lg h-16 border rounded-full px-4 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar gelly-card transition-all duration-300 pointer-events-auto"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`flex flex-col items-center justify-center w-10 h-10 transition-all duration-300 rounded-full flex-shrink-0 ${isActive
                  ? 'text-pink-400 bg-pink-500/15 scale-110 shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                  : 'text-gray-400 hover:text-pink-300 shadow-[0_0_5px_rgba(255,255,255,0.1)]'
                  }`}
                style={{
                  textShadow: isActive ? '0 0 10px rgba(236, 72, 153, 0.5)' : 'none'
                }}
                aria-label={item.label}
              >
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
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