import React, { useMemo } from 'react';
import { Brain, Code, Cpu, Database, Globe, Layers, MessageSquare, Terminal } from 'lucide-react';

const SkillOrbit: React.FC = () => {
    const orbitItems = useMemo(() => [
        { icon: <Brain />, color: '#ec4899', name: 'AI' },
        { icon: <Terminal />, color: '#10b981', name: 'Python' },
        { icon: <Code />, color: '#3b82f6', name: 'React' },
        { icon: <Database />, color: '#f59e0b', name: 'MySQL' },
        { icon: <Globe />, color: '#06b6d4', name: 'AWS' },
        { icon: <Layers />, color: '#8b5cf6', name: 'FullStack' },
        { icon: <Cpu />, color: '#ef4444', name: 'ML' },
        { icon: <MessageSquare />, color: '#6366f1', name: 'GenAI' },
    ], []);

    return (
        <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center perspective-[1000px]">
            {/* Central AI Core */}
            <div className="relative z-20 w-24 h-24 rounded-full bg-slate-900 border-2 border-cyan-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.4)] animate-pulse">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-spin-slow"></div>
                <Brain size={40} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

                {/* Internal Glow rings */}
                <div className="absolute inset-[-10px] rounded-full border border-cyan-500/20 animate-ping opacity-20"></div>
                <div className="absolute inset-[-20px] rounded-full border border-purple-500/10 animate-pulse opacity-10"></div>
            </div>

            {/* Orbiting Items */}
            <div className="absolute inset-0 z-10 w-full h-full preserve-3d">
                {orbitItems.map((item, index) => {
                    // Split into two lanes: 4 items inner, 4 items outer
                    const isOuter = index >= 4;
                    const laneIndex = isOuter ? index - 4 : index;
                    const itemsInLane = 4;

                    const angle = (laneIndex / itemsInLane) * Math.PI * 2;
                    const radius = isOuter ? 170 : 110; // Different lanes to prevent overlap
                    const duration = isOuter ? 25 : 18; // Different speeds per lane
                    const delay = isOuter ? -5 : 0;

                    return (
                        <div
                            key={index}
                            className="absolute left-1/2 top-1/2 w-12 h-12 -ml-6 -mt-6 animate-orbit"
                            style={{
                                // @ts-ignore - custom CSS variables
                                '--radius': `${radius}px`,
                                '--duration': `${duration}s`,
                                '--delay': `${delay}s`,
                                '--angle': `${angle}rad`,
                            }}
                        >
                            <div className="group relative w-full h-full flex items-center justify-center rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:scale-125 hover:border-white/30 hover:shadow-[0_0_20px_var(--item-color)]"
                                style={{
                                    // @ts-ignore
                                    '--item-color': item.color
                                }}
                            >
                                <div style={{ color: item.color }} className="drop-shadow-[0_0_5px_currentColor]">
                                    {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                                </div>

                                {/* Label shown on hover */}
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-[10px] px-2 py-0.5 rounded border border-white/10 whitespace-nowrap pointer-events-none">
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
                }
                
                @keyframes orbit {
                    from { transform: rotate(var(--angle)) translateX(var(--radius)) rotate(calc(-1 * var(--angle))); }
                    to { transform: rotate(calc(var(--angle) + 360deg)) translateX(var(--radius)) rotate(calc(-1 * (var(--angle) + 360deg))); }
                }

                .animate-orbit {
                    animation: orbit var(--duration) linear infinite;
                    animation-delay: var(--delay);
                }

                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @media (max-width: 640px) {
                    .animate-orbit {
                        --radius: calc(var(--radius) * 0.7) !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default SkillOrbit;
