import React, { useMemo } from 'react';
import { Terminal, Code, Brain, Cloud, Database, GitBranch, Server, FileCode, Layout, Box, Zap, Github, Layers, Activity, Search, Cpu } from 'lucide-react';

const SkillOrbit: React.FC = () => {
    const [tiltStyle, setTiltStyle] = React.useState({ transform: 'rotateX(0deg) rotateY(0deg)' });

    React.useEffect(() => {
        const isMobile = window.innerWidth < 1024;
        if (!isMobile) return;

        const handleOrientation = (e: DeviceOrientationEvent) => {
            const { beta, gamma } = e;
            if (beta === null || gamma === null) return;
            // Subtle tilt for the whole container
            const rotateX = Math.max(-5, Math.min(5, (beta - 45) / 5));
            const rotateY = Math.max(-5, Math.min(5, gamma / 5));
            setTiltStyle({ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` });
        };

        window.addEventListener('deviceorientation', handleOrientation);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, []);

    const orbitItems = useMemo(() => [
        // Inner Lane (7 items)
        { icon: <Terminal />, color: '#10b981', name: 'Python' },
        { icon: <Server />, color: '#092e20', name: 'Django' },
        { icon: <Code />, color: '#61dafb', name: 'React' },
        { icon: <FileCode />, color: '#f7df1e', name: 'JavaScript' },
        { icon: <Zap />, color: '#facc15', name: 'AI Tools' },
        { icon: <Search />, color: '#cyan-400', name: 'OpenClaw' },
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
        <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center perspective-[1000px] transition-transform duration-300 ease-out" style={tiltStyle}>
            {/* Central AI Core */}
            <div className="relative z-20 w-24 h-24 rounded-full bg-slate-900 border-2 border-cyan-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.4)] animate-pulse overflow-hidden group">
                {/* Central Profile Image */}
                <img loading="lazy" 
                    src="/profile.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover z-0 transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-transparent to-pink-500/20 animate-spin-slow z-10 pointer-events-none"></div>

                {/* Internal Glow rings - Simplified for performance */}
                <div className="absolute inset-[-15px] rounded-full border border-cyan-500/10 animate-pulse opacity-20 z-20"></div>
            </div>

            {/* Orbiting Items */}
            <div className="absolute inset-0 z-30 w-full h-full preserve-3d">
                {orbitItems.map((item, index) => {
                    // Split into two lanes: 7 items inner, 9 items outer
                    const isOuter = index >= 7;
                    const laneIndex = isOuter ? index - 7 : index;
                    const itemsInLane = isOuter ? 9 : 7;

                    const angle = (laneIndex / itemsInLane) * Math.PI * 2;
                    const radius = isOuter ? 155 : 90; 
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
