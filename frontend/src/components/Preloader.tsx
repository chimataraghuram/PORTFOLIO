import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const ZONES = [
  {
    id: 'zone-1',
    name: 'AI CORE SYSTEM',
    color: 'from-cyan-500/40 via-purple-500/20 to-transparent',
    textColor: 'text-cyan-400',
    desc: 'Neural Networks Synchronizing'
  },
  {
    id: 'zone-2',
    name: 'DEVELOPMENT ORBIT',
    color: 'from-blue-600/40 via-indigo-500/20 to-transparent',
    textColor: 'text-blue-400',
    desc: 'Compiling Digital Architecture'
  },
  {
    id: 'zone-3',
    name: 'CREATIVE DIMENSION',
    color: 'from-pink-500/40 via-rose-500/20 to-transparent',
    textColor: 'text-pink-400',
    desc: 'Atmospheric Rendering Online'
  },
  {
    id: 'zone-4',
    name: 'PORTFOLIO UNIVERSE',
    color: 'from-cyan-400/30 via-yellow-500/20 to-transparent',
    textColor: 'text-cyan-300',
    desc: 'Approaching Final Destination'
  }
];

// The Planet component simulates 3D depth by scaling up and moving down
const CinematicPlanet = ({ zoneIndex }: { zoneIndex: number }) => {
  // Define different planet styles for each zone
  const getPlanetVisual = (index: number) => {
    switch(index) {
      case 0: // AI Core (Neural Sphere)
        return (
          <div className="relative w-full h-full rounded-full border-[2px] border-cyan-400/40 border-dashed animate-[spin_10s_linear_infinite] shadow-[0_0_50px_rgba(34,211,238,0.3)]">
            <div className="absolute inset-4 rounded-full bg-cyan-500/20 blur-md"></div>
            <div className="absolute inset-0 rounded-full border-[1px] border-purple-400/30 animate-[spin_5s_linear_infinite_reverse]"></div>
          </div>
        );
      case 1: // Dev Orbit (Ringed Planet)
        return (
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-indigo-900 shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8)]">
            {/* Planetary Ring */}
            <div className="absolute top-1/2 left-1/2 w-[200%] h-[40%] border-4 border-indigo-400/40 rounded-[100%] -translate-x-1/2 -translate-y-1/2 rotate-12 shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
          </div>
        );
      case 2: // Creative Dimension (Glowing Energy Orb)
        return (
          <div className="relative w-full h-full rounded-full bg-pink-500/10 shadow-[0_0_100px_rgba(236,72,153,0.8),inset_0_0_50px_rgba(236,72,153,0.8)] blur-[2px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/40 to-transparent mix-blend-screen animate-pulse"></div>
          </div>
        );
      case 3: // Portfolio Universe (Eclipse/Corona)
        return (
          <div className="relative w-full h-full rounded-full bg-black shadow-[0_0_80px_rgba(6,182,212,0.6)]">
            {/* Golden Eclipse Corona */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-yellow-400/30 to-cyan-400/30 blur-xl -z-10 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-[120%] h-[120%] rounded-full shadow-[inset_20px_20px_50px_rgba(6,182,212,0.4)]"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      key={`planet-${zoneIndex}`}
      initial={{ scale: 0, y: '-30vh', opacity: 0, x: (zoneIndex % 2 === 0) ? '20vw' : '-20vw' }}
      animate={{ scale: [0, 1.5, 4], y: ['-30vh', '30vh', '120vh'], opacity: [0, 1, 0] }}
      transition={{ duration: 2.2, ease: 'easeIn' }}
      className="absolute top-0 left-1/2 w-[150px] h-[150px] -ml-[75px] pointer-events-none z-10"
    >
      {getPlanetVisual(zoneIndex)}
    </motion.div>
  );
};

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [currentZone, setCurrentZone] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 4 zones, each lasts ~2 seconds. Total = 8.8s
    let zoneIndex = 0;
    
    const zoneInterval = setInterval(() => {
      zoneIndex++;
      
      if (zoneIndex < ZONES.length) {
        setIsWarping(true);
        setTimeout(() => {
          setCurrentZone(zoneIndex);
          setIsWarping(false);
        }, 400); // Warp effect lasts 400ms
      } else {
        // Journey complete, trigger fade out
        clearInterval(zoneInterval);
        setIsWarping(true); // Final massive warp
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 1500); // Allow time for seamless background fade
        }, 800);
      }
    }, 2200);

    return () => clearInterval(zoneInterval);
  }, [onComplete]);

  const zone = ZONES[currentZone];

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-[1500ms] ease-in-out
        ${isFinished ? 'opacity-0 backdrop-blur-none pointer-events-none' : 'opacity-100 backdrop-blur-3xl'}`}
      style={{ backgroundColor: isFinished ? 'rgba(5, 8, 22, 0)' : 'rgba(5, 8, 22, 0.85)' }}
    >
      
      {/* 1. ENVIRONMENTAL MORPHING (Background Gradient) */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t ${zone.color} transition-colors duration-1000 opacity-60 mix-blend-screen`}
      />

      {/* 2. THE CINEMATIC PLANET PASSING BY */}
      <AnimatePresence>
        {!isFinished && <CinematicPlanet zoneIndex={currentZone} />}
      </AnimatePresence>

      {/* 3. WARP SPEED STARS (Simulated by stretched lines during warp) */}
      <AnimatePresence>
        {isWarping && (
          <motion.div 
            initial={{ opacity: 0, scaleY: 1 }}
            animate={{ opacity: 1, scaleY: 20 }}
            exit={{ opacity: 0, scaleY: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex justify-center items-center pointer-events-none z-0"
          >
            {/* Generate warp streaks */}
            {Array.from({ length: 40 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-[1px] bg-white rounded-full shadow-[0_0_10px_#fff]"
                style={{
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                  transform: `translateY(${Math.random() * 500}px)`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. CINEMATIC SPACESHIP (Abstract Premium Delta Shape) */}
      <motion.div
        className="relative z-20 flex flex-col items-center mt-32"
        animate={{ 
          y: isFinished ? -1000 : (isWarping ? -15 : [0, -8, 0]), 
          scale: isFinished ? 0 : (isWarping ? 0.9 : 1) 
        }}
        transition={{ 
          y: isFinished ? { duration: 1, ease: 'easeIn' } : (isWarping ? { duration: 0.2 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }),
          scale: { duration: isFinished ? 1 : 0.4 }
        }}
      >
        {/* Glowing Engine Trail */}
        <motion.div 
          className="absolute -bottom-24 w-4 h-32 blur-xl rounded-full bg-cyan-400"
          animate={{ height: isWarping ? 200 : [100, 130, 100], opacity: isWarping ? 1 : [0.4, 0.7, 0.4] }}
          transition={{ duration: isWarping ? 0.2 : 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute -bottom-16 w-1 h-20 blur-sm rounded-full bg-white"
          animate={{ height: isWarping ? 100 : [60, 80, 60] }}
          transition={{ duration: isWarping ? 0.2 : 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Minimal Delta Ship SVG */}
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          {/* Main Hull */}
          <path d="M20 0L40 50L20 40L0 50L20 0Z" fill="rgba(255, 255, 255, 0.9)" />
          {/* Cockpit / Inner detail */}
          <path d="M20 15L25 40L20 35L15 40L20 15Z" fill="rgba(6, 182, 212, 0.8)" />
          {/* Wing Trails */}
          <path d="M0 50L5 60L10 50" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
          <path d="M40 50L35 60L30 50" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* 5. STORYTELLING HUD / LOCATION INDICATOR */}
      <div className="absolute bottom-16 flex flex-col items-center gap-2 z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentZone}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-1">
              <span className={`w-2 h-2 rounded-full ${zone.textColor.replace('text-', 'bg-')} animate-pulse shadow-[0_0_10px_currentColor]`} />
              <span className="text-white font-black tracking-[0.3em] uppercase text-sm md:text-base drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                {zone.name}
              </span>
            </div>
            <span className={`${zone.textColor} text-[10px] md:text-xs tracking-widest uppercase opacity-80 font-medium`}>
              {zone.desc}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Global Progress Line */}
        <div className="w-48 h-[1px] bg-white/10 mt-6 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white shadow-[0_0_8px_#fff]"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentZone + 1) / ZONES.length) * 100}%` }}
            transition={{ duration: 2.2, ease: 'linear' }}
          />
        </div>
      </div>

    </div>
  );
};

export default Preloader;
