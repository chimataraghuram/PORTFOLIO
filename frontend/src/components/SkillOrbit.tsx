import React, { useMemo } from 'react';
import { Terminal, Code, Brain, Cloud, Database, GitBranch, Server, FileCode, Layout, Box, Zap, Github, Layers, Activity, Search, Cpu } from 'lucide-react';

const SkillOrbit: React.FC = () => {
    const [pupilTracking, setPupilTracking] = React.useState({ x: 0, y: 0 });
    const [codeIndex, setCodeIndex] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    const codeSymbols = ['< />', '{ }', '( )', '# AI', '⚡'];
    const codeColors = ['#06b6d4', '#8b5cf6', '#ec4899', '#f97316', '#eab308'];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCodeIndex(prev => (prev + 1) % codeSymbols.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) return;
            
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Calculate pupil movement based on mouse position (max 4px movement in any direction)
            const pupilX = ((clientX - centerX) / centerX) * 4; 
            const pupilY = ((clientY - centerY) / centerY) * 4;

            setPupilTracking({ x: pupilX, y: pupilY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isVisible]);

    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.05 }
        );
        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    const orbitItems = useMemo(() => [
        // Inner Lane (7 items)
        { icon: <Terminal />, color: '#10b981', name: 'Python' },
        { icon: <Server />, color: '#092e20', name: 'Django' },
        { icon: <Code />, color: '#61dafb', name: 'React' },
        { icon: <FileCode />, color: '#f7df1e', name: 'JavaScript' },
        { icon: <Zap />, color: '#facc15', name: 'AI Tools' },
        { icon: <Search />, color: '#22d3ee', name: 'OpenClaw' },
        { icon: <Cpu />, color: '#ef4444', name: 'Nano Claw' },

        // Outer Lane (9 items)
        { icon: <Brain />, color: '#ec4899', name: 'AI' },
        { icon: <Cloud />, color: '#ff9900', name: 'AWS' },
        { icon: <Database />, color: '#00758f', name: 'MySQL' },
        { icon: <GitBranch />, color: '#f05032', name: 'Git' },
        { icon: <Github />, color: '#ffffff', name: 'GitHub' },
        { icon: <Activity />, color: '#ff6c37', name: 'n8n' },
        { icon: <Layers />, color: '#2496ed', name: 'Docker' },
        { icon: <Layout />, color: '#e34f26', name: 'HTML/CSS' },
        { icon: <Box />, color: '#47a248', name: 'MongoDB' },
    ], []);

    return (
        <div ref={containerRef} className={`relative w-full aspect-square max-w-[400px] flex items-center justify-center perspective-[1000px] ${!isVisible ? 'paused-orbit' : ''}`}>
            {/* Central AI Core */}
            <div
                className="relative z-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-900 border-2 flex items-center justify-center overflow-hidden transition-[border-color,box-shadow] duration-700 shadow-2xl"
                style={{
                    borderColor: codeColors[codeIndex] + '80',
                    boxShadow: `0 0 40px ${codeColors[codeIndex]}50, 0 0 80px ${codeColors[codeIndex]}20`,
                }}
            >
                {/* Spinning gradient ring */}
                <div className="absolute inset-0 rounded-full animate-spin-slow opacity-30"
                    style={{ background: `conic-gradient(from 0deg, ${codeColors[codeIndex]}, transparent, ${codeColors[codeIndex]})` }}
                />
                {/* GIF Image (Body stays completely still) */}
                <img 
                    src="https://github.com/chimataraghuram/chimataraghuram/raw/main/images/coding_from_home.gif" 
                    alt="Coding from home" 
                    className="relative z-10 w-full h-full object-cover rounded-full"
                />

                {/* Overlay Interactive Eyes */}
                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center pb-8">
                    {/* Positioned roughly over the character's face (adjust padding/margin if needed) */}
                    <div className="flex gap-4">
                        {/* Left Eye */}
                        <div className="w-5 h-5 bg-white rounded-full overflow-hidden relative shadow-inner">
                            <div 
                                className="w-2.5 h-2.5 bg-slate-900 rounded-full absolute" 
                                style={{
                                    top: `calc(50% - 5px + ${pupilTracking.y}px)`,
                                    left: `calc(50% - 5px + ${pupilTracking.x}px)`,
                                    transition: 'top 0.1s, left 0.1s'
                                }}
                            />
                        </div>
                        {/* Right Eye */}
                        <div className="w-5 h-5 bg-white rounded-full overflow-hidden relative shadow-inner">
                            <div 
                                className="w-2.5 h-2.5 bg-slate-900 rounded-full absolute" 
                                style={{
                                    top: `calc(50% - 5px + ${pupilTracking.y}px)`,
                                    left: `calc(50% - 5px + ${pupilTracking.x}px)`,
                                    transition: 'top 0.1s, left 0.1s'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Scanline sweep */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[sweep_2s_ease-in-out_infinite]" />
                </div>
            </div>

            {/* Orbiting Items */}
            <div className="absolute inset-0 z-30 w-full h-full preserve-3d">
                {orbitItems.map((item, index) => {
                    // Split into two lanes: 7 items inner, 9 items outer
                    const isOuter = index >= 7;
                    const laneIndex = isOuter ? index - 7 : index;
                    const itemsInLane = isOuter ? 9 : 7;

                    const angle = (laneIndex / itemsInLane) * Math.PI * 2;
                    const radius = isOuter ? 180 : 115; 
                    const duration = isOuter ? 32 : 22; 
                    const delay = isOuter ? -10 : 0;

                    return (
                        <div
                            key={index}
                            className="absolute left-1/2 top-1/2 w-12 h-12 -ml-6 -mt-6 animate-orbit orbit-item"
                            style={{
                                // @ts-ignore - custom CSS variables
                                '--base-radius': `${radius}px`,
                                '--duration': `${duration}s`,
                                '--delay': `${delay}s`,
                                '--angle': `${angle}rad`,
                                willChange: 'transform'
                            }}
                        >
                            <div className="group relative w-full h-full flex items-center justify-center rounded-xl bg-slate-900 border border-white/5 shadow-lg transition-all duration-300 hover:scale-125 hover:border-white/20 hover:shadow-[0_0_20px_var(--item-color)]"
                                style={{
                                    // @ts-ignore
                                    '--item-color': item.color
                                }}
                            >
                                <div style={{ color: item.color }}>
                                    {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                                </div>

                                {/* Label shown on hover (desktop only) */}
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 md:group-hover:opacity-100 transition-opacity bg-slate-900 text-[10px] px-2 py-0.5 rounded border border-white/10 whitespace-nowrap pointer-events-none">
                                    {item.name}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                .paused-orbit .animate-orbit,
                .paused-orbit .animate-spin-slow {
                    animation-play-state: paused !important;
                }
                
                .preserve-3d {
                    transform-style: preserve-3d;
                    will-change: transform;
                }
                
                @keyframes orbit {
                    from { transform: rotate(var(--angle)) translateX(var(--radius)) rotate(calc(-1 * var(--angle))) translateZ(0); }
                    to { transform: rotate(calc(var(--angle) + 360deg)) translateX(var(--radius)) rotate(calc(-1 * (var(--angle) + 360deg))) translateZ(0); }
                }

                .animate-orbit {
                    --radius-multiplier: 1;
                    --radius: calc(var(--base-radius) * var(--radius-multiplier));
                    animation: orbit var(--duration) linear infinite;
                    animation-delay: var(--delay);
                    backface-visibility: hidden;
                }

                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                    will-change: transform;
                }

                @keyframes spin {
                    from { transform: rotate(0deg) translateZ(0); }
                    to { transform: rotate(360deg) translateZ(0); }
                }

                @media (max-width: 1024px) and (min-width: 641px) {
                    .animate-orbit {
                        --radius-multiplier: 0.75;
                    }
                }

                @media (max-width: 640px) {
                    .animate-orbit {
                        --radius-multiplier: 0.65;
                        animation-duration: calc(var(--duration) * 1.5);
                    }
                    .animate-spin-slow {
                        animation-duration: 12s;
                    }
                    .orbit-item { 
                        width: 40px !important;
                        height: 40px !important;
                        margin-left: -20px !important;
                        margin-top: -20px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default SkillOrbit;
