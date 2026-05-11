import React from 'react';

interface GameStatsProps {
    score: number;
    level: number;
}

const GameStats: React.FC<GameStatsProps> = ({ score, level }) => {
    if (score <= 0) return null;

    return (
        <>
            {/* Desktop Version - Right Side (Absolute in Game Box) */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-[100] animate-liquid-drop hidden lg:flex flex-col gap-4 pointer-events-none transition-all duration-500">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-[2.5rem] py-8 px-4 flex flex-col items-center gap-8 shadow-2xl gelly-card select-none pointer-events-auto transition-all hover:scale-105 border-b-4 border-b-pink-500/20">

                    {/* Level Display */}
                    <div className="flex flex-col items-center gap-2 group/lvl">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">LEVEL</span>
                        <span className="text-3xl font-black text-white relative z-10">{level}</span>
                    </div>

                    <div className="w-8 h-[1px] bg-white/10"></div>

                    {/* Score Display */}
                    <div className="flex flex-col items-center gap-2 group/scr">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">SCORE</span>
                        <span className="text-2xl font-black text-yellow-400 tabular-nums">{score}</span>
                    </div>
                </div>
            </div>

            {/* Mobile Version - Bottom Left (Absolute in Game Box) */}
            <div className="absolute left-4 bottom-4 z-[100] lg:hidden animate-liquid-drop pointer-events-none">
                <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-2xl px-4 py-2 flex items-center gap-4 shadow-2xl gelly-card pointer-events-auto active:scale-90 transition-transform">
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[8px] font-black text-pink-500 uppercase tracking-widest mb-1">LVL</span>
                        <span className="text-base font-black text-white">{level}</span>
                    </div>
                    <div className="w-px h-5 bg-white/20"></div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[8px] font-black text-yellow-400 uppercase tracking-widest mb-1">SCORE</span>
                        <span className="text-base font-black text-white tabular-nums">{score}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GameStats;
