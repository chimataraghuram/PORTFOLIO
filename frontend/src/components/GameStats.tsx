import React from 'react';

interface GameStatsProps {
    score: number;
    level: number;
}

const GameStats: React.FC<GameStatsProps> = ({ score, level }) => {
    if (score <= 0) return null;

    return (
        <div className="absolute left-0 right-0 top-0 pointer-events-none z-[200] p-4 md:p-6 flex justify-between items-start">
            
            {/* Score HUD - Left */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-xs font-mono font-bold text-cyan-400 tracking-[0.2em] uppercase">SCORE_SYS</span>
                </div>
                <div className="font-black text-2xl md:text-4xl text-white tabular-nums drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                    {score.toString().padStart(6, '0')}
                </div>
            </div>

            {/* Level HUD - Center */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] md:text-xs font-mono font-bold text-yellow-400 tracking-[0.2em] uppercase">ZONE</span>
                </div>
                <div className="font-black text-3xl md:text-5xl text-white drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
                    0{level}
                </div>
            </div>
            
        </div>
    );
};

export default GameStats;
