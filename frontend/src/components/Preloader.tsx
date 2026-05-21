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

  // Ship flight path coordinates based on phase
  const getShipTransform = () => {
    switch (phaseIndex) {
      case 0: return { x: '0vw', y: '50vh', rotate: 0, scale: 0.5 }; // Offscreen bottom
      case 1: return { x: '0vw', y: '25vh', rotate: 0, scale: 0.5 }; // Center viewing system
      case 2: return { x: '-10vw', y: '-10vh', rotate: -35, scale: 0.6 }; // Earth (Top Left)
      case 3: return { x: '20vw', y: '-15vh', rotate: 65, scale: 0.6 }; // Mars (Top Right)
      case 4: return { x: '22vw', y: '20vh', rotate: 145, scale: 0.6 }; // Jupiter (Bottom Right)
      case 5: return { x: '-28vw', y: '25vh', rotate: -135, scale: 0.6 }; // Saturn (Bottom Left)
      case 6: return { x: '0vw', y: '10vh', rotate: 0, scale: 0.7 }; // Center pointing up
      default: return { x: '0vw', y: '-100vh', rotate: 0, scale: 0 }; // Warp out
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

      {/* STRUCTURAL SOLAR SYSTEM */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: phaseIndex >= 1 && phaseIndex < 6 ? 1 : 0,
          scale: phaseIndex >= 1 && phaseIndex < 6 ? 1 : 1.2
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Orbital Rings */}
        <div className="absolute w-[35vw] h-[35vw] min-w-[300px] min-h-[300px] border border-cyan-500/10 rounded-full" />
        <div className="absolute w-[55vw] h-[55vw] min-w-[450px] min-h-[450px] border border-cyan-500/10 rounded-full" />
        <div className="absolute w-[75vw] h-[75vw] min-w-[600px] min-h-[600px] border border-cyan-500/10 rounded-full" />
        <div className="absolute w-[95vw] h-[95vw] min-w-[750px] min-h-[750px] border border-cyan-500/10 rounded-full" />
        
        {/* The Sun (Center) */}
        <div className="absolute w-8 h-8 rounded-full bg-yellow-100 shadow-[0_0_40px_#facc15,inset_0_0_10px_#fff] animate-pulse" />

        {/* EARTH (Orbit 1, Top Left) */}
        <motion.div
          className="absolute rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(59,130,246,0.4)] overflow-hidden"
          style={{ 
            background: 'radial-gradient(circle at 30% 30%, #3b82f6, #1d4ed8)', // Ocean
            top: 'calc(50% - 15vw - 20px)', left: 'calc(50% - 15vw - 20px)',
            width: '40px', height: '40px',
            minWidth: '40px', minHeight: '40px'
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
            top: 'calc(50% - 22vw - 15px)', left: 'calc(50% + 22vw - 15px)',
            width: '30px', height: '30px',
            minWidth: '30px', minHeight: '30px'
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
            top: 'calc(50% + 28vw - 30px)', left: 'calc(50% + 28vw - 30px)',
            width: '60px', height: '60px',
            minWidth: '60px', minHeight: '60px'
          }}
          animate={{ 
            scale: phaseIndex === 4 ? 3 : 1,
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
            top: 'calc(50% + 35vw - 25px)', left: 'calc(50% - 35vw - 25px)',
            width: '50px', height: '50px',
            minWidth: '50px', minHeight: '50px'
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
        transition={{ duration: 1.8, ease: "easeInOut" }}
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
