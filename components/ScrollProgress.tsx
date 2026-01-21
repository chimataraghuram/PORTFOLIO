import React, { useState, useEffect } from 'react';

const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'qualification', label: 'Education' },
    { id: 'internships', label: 'Internships' },
    { id: 'portfolio', label: 'Projects' },
    { id: 'publisher', label: 'Contact' },
];

const ScrollProgress: React.FC = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
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

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
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
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6 items-center">
            {sections.map((section, index) => {
                const isActive = activeSection === section.id;

                // Calculate offset based on mouse proximity
                const dotId = `dot-${section.id}`;
                const dotEl = typeof document !== 'undefined' ? document.getElementById(dotId) : null;
                let transform = '';

                if (dotEl) {
                    const rect = dotEl.getBoundingClientRect();
                    const dotCenterX = rect.left + rect.width / 2;
                    const dotCenterY = rect.top + rect.height / 2;

                    const dx = mousePos.x - dotCenterX;
                    const dy = mousePos.y - dotCenterY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const power = (150 - distance) / 150;
                        const moveX = dx * power * 0.15;
                        const moveY = dy * power * 0.15;
                        transform = `translate(${moveX}px, ${moveY}px)`;
                    }
                }

                return (
                    <button
                        key={section.id}
                        id={dotId}
                        onClick={() => scrollToSection(section.id)}
                        className="group relative flex items-center justify-center p-2"
                        aria-label={`Scroll to ${section.label}`}
                        style={{ transform, transition: 'transform 0.2s ease-out' }}
                    >
                        {/* Tooltip Label */}
                        <span className="absolute right-10 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                            {section.label}
                        </span>

                        {/* Outer Ring for Active Dot */}
                        <div className={`absolute inset-0 rounded-full transition-all duration-500 border border-cyan-400/0 
              ${isActive ? 'border-cyan-400/40 scale-150 animate-pulse' : 'scale-100'}
            `} />

                        {/* Inner Dot */}
                        <div
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 relative z-10 
                ${isActive
                                    ? 'bg-gradient-to-tr from-cyan-400 to-blue-500 scale-125 shadow-[0_0_15px_rgba(34,211,238,0.8)] rotate-45'
                                    : 'bg-white/20 hover:bg-white/60 scale-100'
                                }
              `}
                        />

                        {/* Active Indicator Line (Subtle) */}
                        {isActive && (
                            <div className="absolute right-[-10px] w-1 h-8 bg-cyan-400/50 rounded-full blur-[1px]" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default ScrollProgress;
