import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const PHASES = [
  { id: 'launch', name: 'INITIATING LAUNCH SEQUENCE', color: 'from-blue-900/20 to-transparent' },
  { id: 'system', name: 'SOLAR SYSTEM ACQUIRED', color: 'from-indigo-900/20 to-transparent' },
  { id: 'earth', name: 'APPROACHING EARTH', color: 'from-cyan-900/30 to-transparent' },
  { id: 'mars', name: 'APPROACHING MARS', color: 'from-orange-900/30 to-transparent' },
  { id: 'jupiter', name: 'APPROACHING JUPITER', color: 'from-amber-900/30 to-transparent' },
  { id: 'saturn', name: 'APPROACHING SATURN', color: 'from-yellow-900/30 to-transparent' },
  { id: 'arrival', name: 'ENTERING PORTFOLIO UNIVERSE', color: 'from-cyan-400/20 to-transparent' }
];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 7 phases, 2 seconds each = 14 seconds total
    const phaseInterval = setInterval(() => {
      setPhaseIndex(prev => {
        const next = prev + 1;
        if (next >= PHASES.length) {
          clearInterval(phaseInterval);
          setIsFinished(true);
          setTimeout(onComplete, 1500); // Allow time for seamless fade out
          return prev;
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(phaseInterval);
  }, [onComplete]);

  const currentPhase = PHASES[phaseIndex];

  // Spaceship banking logic based on phase
  let shipRotate = 0;
  if (phaseIndex === 2) shipRotate = -15; // Bank left for Earth
  if (phaseIndex === 3) shipRotate = 15;  // Bank right for Mars
  if (phaseIndex === 4) shipRotate = -15; // Bank left for Jupiter
  if (phaseIndex === 5) shipRotate = 15;  // Bank right for Saturn
  if (phaseIndex >= 6) shipRotate = 0;    // Straight for arrival

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-[1500ms] ease-in-out
        ${isFinished ? 'opacity-0 backdrop-blur-none pointer-events-none' : 'opacity-100 backdrop-blur-3xl'}`}
      style={{ backgroundColor: isFinished ? 'rgba(5, 8, 22, 0)' : 'rgba(5, 8, 22, 0.95)' }}
    >
      
      {/* BACKGROUND ATMOSPHERE */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t ${currentPhase.color} transition-colors duration-1000 opacity-80 mix-blend-screen`}
      />

      {/* WARP STARS (When hitting arrival) */}
      <AnimatePresence>
        {phaseIndex >= 6 && (
          <motion.div 
            initial={{ opacity: 0, scaleY: 1 }}
            animate={{ opacity: 1, scaleY: 30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex justify-center items-center pointer-events-none z-0"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-[1px] bg-white rounded-full shadow-[0_0_10px_#fff]"
                style={{
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                  transform: `translateY(${Math.random() * 1000}px)`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE SOLAR SYSTEM (Planets) */}
      <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
        
        {/* EARTH */}
        <motion.div
          className="absolute rounded-full shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.3)] overflow-hidden"
          style={{ 
            background: 'radial-gradient(circle at 30% 30%, #3b82f6, #1d4ed8)', // Ocean
            width: '120px', height: '120px'
          }}
          initial={{ scale: 0, y: -200, x: -100, opacity: 0 }}
          animate={{ 
            scale: phaseIndex === 1 ? 0.3 : (phaseIndex === 2 ? 6 : 0),
            y: phaseIndex === 1 ? -150 : (phaseIndex === 2 ? 600 : -200),
            x: phaseIndex === 1 ? -80 : (phaseIndex === 2 ? 300 : -100),
            opacity: phaseIndex === 1 ? 1 : (phaseIndex === 2 ? [1, 1, 0] : 0),
            filter: phaseIndex === 2 ? ['blur(0px)', 'blur(5px)'] : 'blur(0px)'
          }}
          transition={{ duration: 2, ease: phaseIndex === 2 ? "easeIn" : "easeInOut" }}
        >
          {/* Continents */}
          <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(circle at 60% 40%, transparent 40%, #16a34a 45%, transparent 60%)', filter: 'url(#fractal)' }}></div>
          {/* Clouds */}
          <div className="absolute inset-0 opacity-40 bg-white blur-sm rounded-full mix-blend-screen animate-[spin_20s_linear_infinite]" style={{ background: 'repeating-radial-gradient(circle at 40% 40%, transparent, #fff 10%, transparent 20%)' }}></div>
        </motion.div>

        {/* MARS */}
        <motion.div
          className="absolute rounded-full shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.9),0_0_15px_rgba(239,68,68,0.2)]"
          style={{ 
            background: 'radial-gradient(circle at 40% 40%, #ef4444, #7f1d1d, #450a0a)',
            width: '100px', height: '100px'
          }}
          initial={{ scale: 0, y: -200, x: -40, opacity: 0 }}
          animate={{ 
            scale: phaseIndex === 1 ? 0.2 : (phaseIndex === 3 ? 5 : 0),
            y: phaseIndex === 1 ? -150 : (phaseIndex === 3 ? 600 : -200),
            x: phaseIndex === 1 ? -30 : (phaseIndex === 3 ? -300 : -40),
            opacity: phaseIndex === 1 ? 1 : (phaseIndex === 3 ? [1, 1, 0] : 0),
            filter: phaseIndex === 3 ? ['blur(0px)', 'blur(5px)'] : 'blur(0px)'
          }}
          transition={{ duration: 2, ease: phaseIndex === 3 ? "easeIn" : "easeInOut" }}
        >
          {/* Craters */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-black/30 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute bottom-1/3 right-1/3 w-6 h-6 rounded-full bg-black/20 shadow-[inset_3px_3px_5px_rgba(0,0,0,0.5)]"></div>
        </motion.div>

        {/* JUPITER */}
        <motion.div
          className="absolute rounded-full shadow-[inset_-30px_-30px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.2)] overflow-hidden"
          style={{ 
            background: 'repeating-linear-gradient(0deg, #b45309, #d97706 10%, #fcd34d 15%, #b45309 25%, #92400e 30%)',
            width: '200px', height: '200px'
          }}
          initial={{ scale: 0, y: -200, x: 20, opacity: 0 }}
          animate={{ 
            scale: phaseIndex === 1 ? 0.4 : (phaseIndex === 4 ? 8 : 0),
            y: phaseIndex === 1 ? -150 : (phaseIndex === 4 ? 600 : -200),
            x: phaseIndex === 1 ? 40 : (phaseIndex === 4 ? 400 : 20),
            opacity: phaseIndex === 1 ? 1 : (phaseIndex === 4 ? [1, 1, 0] : 0),
            filter: phaseIndex === 4 ? ['blur(0px)', 'blur(5px)'] : 'blur(0px)'
          }}
          transition={{ duration: 2, ease: phaseIndex === 4 ? "easeIn" : "easeInOut" }}
        >
          {/* Great Red Spot */}
          <div className="absolute top-2/3 right-1/4 w-12 h-8 rounded-[50%] bg-[#7c2d12] shadow-[inset_2px_2px_10px_rgba(0,0,0,0.4)] blur-[1px]"></div>
        </motion.div>

        {/* SATURN */}
        <motion.div
          className="absolute rounded-full flex items-center justify-center"
          style={{ width: '160px', height: '160px' }}
          initial={{ scale: 0, y: -200, x: 100, opacity: 0 }}
          animate={{ 
            scale: phaseIndex === 1 ? 0.3 : (phaseIndex === 5 ? 7 : 0),
            y: phaseIndex === 1 ? -150 : (phaseIndex === 5 ? 600 : -200),
            x: phaseIndex === 1 ? 100 : (phaseIndex === 5 ? -400 : 100),
            opacity: phaseIndex === 1 ? 1 : (phaseIndex === 5 ? [1, 1, 0] : 0),
            filter: phaseIndex === 5 ? ['blur(0px)', 'blur(5px)'] : 'blur(0px)'
          }}
          transition={{ duration: 2, ease: phaseIndex === 5 ? "easeIn" : "easeInOut" }}
        >
          {/* Saturn Body */}
          <div className="absolute w-full h-full rounded-full bg-gradient-to-tr from-yellow-700 via-yellow-500 to-amber-200 shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.8)] z-10"></div>
          {/* Saturn Rings */}
          <div className="absolute w-[280%] h-[100%] rounded-[50%] border-[12px] border-amber-300/60 rotate-[20deg] shadow-[0_0_20px_rgba(252,211,77,0.4)] z-20" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(75deg) rotateY(10deg)' }}>
            <div className="absolute inset-0 rounded-[50%] border-[4px] border-yellow-100/40 m-1"></div>
          </div>
        </motion.div>

      </div>

      {/* SPACESHIP (Delta Shape) */}
      <motion.div
        className="relative z-30 flex flex-col items-center mt-48"
        animate={{ 
          y: phaseIndex >= 6 ? -1500 : (phaseIndex === 1 ? 20 : [0, -10, 0]), 
          scale: phaseIndex >= 6 ? 0 : 1,
          rotateZ: shipRotate
        }}
        transition={{ 
          y: phaseIndex >= 6 ? { duration: 1, ease: 'easeIn' } : { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: phaseIndex >= 6 ? 1 : 0.4 },
          rotateZ: { duration: 0.8, ease: 'easeInOut' }
        }}
      >
        {/* Engine Trail */}
        <motion.div 
          className="absolute -bottom-24 w-6 h-40 blur-xl rounded-full bg-cyan-400"
          animate={{ height: phaseIndex >= 6 ? 400 : [120, 150, 120], opacity: phaseIndex >= 6 ? 1 : [0.6, 0.9, 0.6] }}
          transition={{ duration: phaseIndex >= 6 ? 0.2 : 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute -bottom-16 w-2 h-24 blur-sm rounded-full bg-white"
          animate={{ height: phaseIndex >= 6 ? 200 : [70, 90, 70] }}
          transition={{ duration: phaseIndex >= 6 ? 0.2 : 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Delta Ship SVG */}
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
          {/* Main Hull */}
          <path d="M30 0L60 70L30 55L0 70L30 0Z" fill="rgba(255, 255, 255, 0.95)" />
          {/* Cockpit */}
          <path d="M30 25L38 55L30 45L22 55L30 25Z" fill="rgba(6, 182, 212, 0.9)" />
          {/* Wing Trails */}
          <path d="M0 70L8 80L16 70" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" />
          <path d="M60 70L52 80L44 70" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* STORYTELLING HUD */}
      <div className="absolute bottom-12 flex flex-col items-center gap-3 z-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.id}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className={`w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]`} />
            <span className="text-white font-black tracking-[0.3em] uppercase text-sm md:text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
              {currentPhase.name}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Global Progress Line */}
        <div className="w-64 h-[2px] bg-white/10 mt-4 relative overflow-hidden rounded-full">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
            initial={{ width: '0%' }}
            animate={{ width: `${((phaseIndex + 1) / PHASES.length) * 100}%` }}
            transition={{ duration: 2, ease: 'linear' }}
          />
        </div>
      </div>

    </div>
  );
};

export default Preloader;
