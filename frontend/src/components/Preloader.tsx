import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const PHASES = [
  { id: 'launch', name: 'SYSTEM ONLINE', color: 'from-blue-900/20' },
  { id: 'system', name: 'STRUCTURAL OVERVIEW', color: 'from-indigo-900/20' },
  { id: 'earth', name: 'APPROACHING EARTH', color: 'from-cyan-900/30' },
  { id: 'mars', name: 'APPROACHING MARS', color: 'from-orange-900/30' },
  { id: 'jupiter', name: 'APPROACHING JUPITER', color: 'from-amber-900/30' },
  { id: 'saturn', name: 'APPROACHING SATURN', color: 'from-yellow-900/30' },
  { id: 'arrival', name: 'ENTERING PORTFOLIO UNIVERSE', color: 'from-cyan-400/20' }
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

  // EXACT ship flight path coordinates matching the planets (using vmin)
  const getShipTransform = () => {
    switch (phaseIndex) {
      case 0: return { x: '0vmin', y: '50vh', rotate: 0, scale: 0.5 }; // Offscreen bottom
      case 1: return { x: '0vmin', y: '0vmin', rotate: 0, scale: 0.4 }; // Center viewing system
      case 2: return { x: '-15vmin', y: '-15vmin', rotate: -45, scale: 0.6 }; // Earth (Exact collision)
      case 3: return { x: '25vmin', y: '-25vmin', rotate: 45, scale: 0.6 }; // Mars (Exact collision)
      case 4: return { x: '35vmin', y: '35vmin', rotate: 135, scale: 0.6 }; // Jupiter (Exact collision)
      case 5: return { x: '-45vmin', y: '45vmin', rotate: -135, scale: 0.6 }; // Saturn (Exact collision)
      case 6: return { x: '0vmin', y: '0vmin', rotate: 0, scale: 1 }; // Center pointing up before warp
      default: return { x: '0vmin', y: '0vmin', rotate: 0, scale: 20 }; // Warp speed into camera
    }
  };

  const shipState = getShipTransform();

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-[1500ms] ease-in-out
        ${isFinished ? 'opacity-0 backdrop-blur-none pointer-events-none' : 'opacity-100 backdrop-blur-3xl'}`}
      style={{ backgroundColor: isFinished ? 'rgba(5, 8, 22, 0)' : 'rgba(5, 8, 22, 0.95)' }}
    >
      {/* BACKGROUND ATMOSPHERE */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t ${currentPhase.color} to-transparent transition-colors duration-1000 opacity-80 mix-blend-screen`}
      />


      {/* STRUCTURAL SOLAR SYSTEM (Using vmin so it never overflows) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: phaseIndex >= 1 && phaseIndex < 6 ? 1 : 0,
          scale: phaseIndex >= 1 && phaseIndex < 6 ? 1 : 1.5
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Orbital Rings - perfectly circular and responsive */}
        <div className="absolute w-[42vmin] h-[42vmin] border border-cyan-500/10 rounded-full" />
        <div className="absolute w-[70vmin] h-[70vmin] border border-cyan-500/10 rounded-full" />
        <div className="absolute w-[98vmin] h-[98vmin] border border-cyan-500/10 rounded-full" />
        <div className="absolute w-[126vmin] h-[126vmin] border border-cyan-500/10 rounded-full" />
        
        {/* The Sun (Center) */}
        <div className="absolute w-8 h-8 rounded-full bg-yellow-100 shadow-[0_0_40px_#facc15,inset_0_0_10px_#fff] animate-pulse" />

        {/* EARTH (Orbit 1, Top Left) */}
        <motion.div
          className="absolute rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(59,130,246,0.4)] overflow-hidden"
          style={{ 
            background: 'radial-gradient(circle at 30% 30%, #3b82f6, #1d4ed8)', // Ocean
            top: 'calc(50% - 15vmin - 20px)', left: 'calc(50% - 15vmin - 20px)',
            width: '40px', height: '40px'
          }}
          animate={{ 
            scale: phaseIndex === 2 ? 3.5 : 1,
            zIndex: phaseIndex === 2 ? 40 : 10,
            boxShadow: phaseIndex === 2 ? 'inset -20px -20px 40px rgba(0,0,0,0.8), 0 0 40px rgba(59,130,246,0.8)' : 'inset -10px -10px 20px rgba(0,0,0,0.8), 0 0 15px rgba(59,130,246,0.4)'
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Continents */}
          <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(circle at 60% 40%, transparent 40%, #16a34a 45%, transparent 60%)' }}></div>
          {/* Clouds */}
          <div className="absolute inset-0 opacity-40 bg-white blur-[1px] mix-blend-screen" style={{ background: 'repeating-radial-gradient(circle at 40% 40%, transparent, #fff 10%, transparent 20%)' }}></div>
        </motion.div>

        {/* MARS (Orbit 2, Top Right) */}
        <motion.div
          className="absolute rounded-full shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.9),0_0_10px_rgba(239,68,68,0.4)]"
          style={{ 
            background: 'radial-gradient(circle at 40% 40%, #ef4444, #7f1d1d, #450a0a)',
            top: 'calc(50% - 25vmin - 15px)', left: 'calc(50% + 25vmin - 15px)',
            width: '30px', height: '30px'
          }}
          animate={{ 
            scale: phaseIndex === 3 ? 4 : 1,
            zIndex: phaseIndex === 3 ? 40 : 10,
            boxShadow: phaseIndex === 3 ? 'inset -15px -15px 30px rgba(0,0,0,0.9), 0 0 30px rgba(239,68,68,0.8)' : 'inset -8px -8px 16px rgba(0,0,0,0.9), 0 0 10px rgba(239,68,68,0.4)'
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-black/30 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-black/20 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]"></div>
        </motion.div>

        {/* JUPITER (Orbit 3, Bottom Right) */}
        <motion.div
          className="absolute rounded-full shadow-[inset_-15px_-15px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.3)] overflow-hidden"
          style={{ 
            background: 'repeating-linear-gradient(0deg, #b45309, #d97706 10%, #fcd34d 15%, #b45309 25%, #92400e 30%)',
            top: 'calc(50% + 35vmin - 30px)', left: 'calc(50% + 35vmin - 30px)',
            width: '60px', height: '60px'
          }}
          animate={{ 
            scale: phaseIndex === 4 ? 3.5 : 1,
            zIndex: phaseIndex === 4 ? 40 : 10,
            boxShadow: phaseIndex === 4 ? 'inset -30px -30px 50px rgba(0,0,0,0.8), 0 0 40px rgba(245,158,11,0.6)' : 'inset -15px -15px 25px rgba(0,0,0,0.8), 0 0 20px rgba(245,158,11,0.3)'
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <div className="absolute top-2/3 right-1/4 w-4 h-2.5 rounded-[50%] bg-[#7c2d12] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]"></div>
        </motion.div>

        {/* SATURN (Orbit 4, Bottom Left) */}
        <motion.div
          className="absolute rounded-full flex items-center justify-center"
          style={{ 
            top: 'calc(50% + 45vmin - 25px)', left: 'calc(50% - 45vmin - 25px)',
            width: '50px', height: '50px'
          }}
          animate={{ 
            scale: phaseIndex === 5 ? 3.5 : 1,
            zIndex: phaseIndex === 5 ? 40 : 10
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <div className="absolute w-full h-full rounded-full bg-gradient-to-tr from-yellow-700 via-yellow-500 to-amber-200 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8)] z-10"></div>
          <div className="absolute w-[280%] h-[100%] rounded-[50%] border-[4px] border-amber-300/60 rotate-[20deg] shadow-[0_0_10px_rgba(252,211,77,0.4)] z-20" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(75deg) rotateY(10deg)' }}>
            <div className="absolute inset-0 rounded-[50%] border-[1px] border-yellow-100/40 m-[1px]"></div>
          </div>
        </motion.div>

      </motion.div>

      {/* FREE FLYING SPACESHIP (Delta Shape) */}
      <motion.div
        className="absolute z-50 flex flex-col items-center pointer-events-none"
        animate={shipState}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Engine Trail */}
        <motion.div 
          className="absolute -bottom-24 w-6 h-40 blur-xl rounded-full bg-cyan-400"
          animate={{ height: phaseIndex >= 6 ? 600 : [120, 150, 120], opacity: phaseIndex >= 6 ? 1 : [0.6, 0.9, 0.6] }}
          transition={{ duration: phaseIndex >= 6 ? 0.2 : 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute -bottom-16 w-2 h-24 blur-sm rounded-full bg-white"
          animate={{ height: phaseIndex >= 6 ? 300 : [70, 90, 70] }}
          transition={{ duration: phaseIndex >= 6 ? 0.2 : 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Delta Ship SVG */}
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
          {/* Main Hull */}
          <path d="M30 0L60 70L30 55L0 70L30 0Z" fill="rgba(255, 255, 255, 1)" />
          {/* Cockpit */}
          <path d="M30 25L38 55L30 45L22 55L30 25Z" fill="rgba(6, 182, 212, 1)" />
          {/* Wing Trails */}
          <path d="M0 70L8 80L16 70" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" />
          <path d="M60 70L52 80L44 70" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" />
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
            <span className="text-white font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] text-center">
              {currentPhase.name}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Global Progress Line */}
        <div className="w-48 md:w-64 h-[2px] bg-white/10 mt-4 relative overflow-hidden rounded-full">
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
