import React from 'react';

interface GameStatsProps {
    score: number;
    level: number;
}

const GameStats: React.FC<GameStatsProps> = ({ score, level }) => {
    return (
        <div className="absolute left-3 top-3 md:left-6 md:top-6 pointer-events-none z-[200] flex flex-col gap-1.5 md:gap-2 bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 p-2.5 md:p-3 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.25)] select-none">
            
            {/* Score HUD */}
            <div className="flex flex-col">
                <span className="text-[9px] font-mono font-bold text-cyan-400 tracking-[0.2em] uppercase leading-none mb-1">SCORE</span>
                <div className="font-black text-lg md:text-2xl text-white tabular-nums drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] leading-none">
                    {score.toString().padStart(6, '0')}
                </div>
            </div>

            <div className="h-px bg-white/10 w-full" />

            {/* Level HUD */}
            <div className="flex flex-col">
                <span className="text-[9px] font-mono font-bold text-yellow-400 tracking-[0.2em] uppercase leading-none mb-1">LEVEL</span>
                <div className="font-black text-base md:text-xl text-white drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] leading-none">
                    0{level}
                </div>
            </div>
            
        </div>
    );
};

export default GameStats;
