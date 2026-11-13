import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

// ── Cinematic 8-Planetary Odyssey Journey (Out-to-In from Deep Space to Earth) ──
const PHASES = [
  { id: 'deep_space', name: 'INTERSTELLAR ARRIVAL // DEEP SPACE', color: 'from-indigo-950/40', activePlanet: null },
  { id: 'neptune', name: '08 // APPROACHING NEPTUNE', color: 'from-blue-950/40', activePlanet: 'neptune' },
  { id: 'uranus', name: '07 // TRANSITING URANUS', color: 'from-teal-950/40', activePlanet: 'uranus' },
  { id: 'saturn', name: '06 // SLINGSHOT SATURN RINGS', color: 'from-amber-950/40', activePlanet: 'saturn' },
  { id: 'jupiter', name: '05 // JUPITER GRAVITY ASSIST', color: 'from-orange-950/40', activePlanet: 'jupiter' },
  { id: 'mars', name: '04 // MARS ORBIT INSERTION', color: 'from-rose-950/40', activePlanet: 'mars' },
  { id: 'earth', name: '03 // DESTINATION: EARTH (PORTFOLIO)', color: 'from-cyan-950/50', activePlanet: 'earth' },
  { id: 'touchdown', name: 'ATMOSPHERIC TOUCHDOWN // WELCOME', color: 'from-purple-950/60', activePlanet: null }
];

// 8 Canonical Planets with Proportional Radial Distance (vmin) and Orbit Angles (degrees)
const PLANETS = [
  {
    id: 'mercury',
    name: 'Mercury',
    radius: 7, // 7vmin
    angle: 35,
    size: 9,
    color: '#94a3b8',
    glow: 'rgba(148, 163, 184, 0.4)',
    bg: 'radial-gradient(circle at 35% 35%, #cbd5e1, #64748b, #334155)',
    hasRings: false
  },
  {
    id: 'venus',
    name: 'Venus',
    radius: 11, // 11vmin
    angle: 215,
    size: 14,
    color: '#fb923c',
    glow: 'rgba(251, 146, 60, 0.5)',
    bg: 'radial-gradient(circle at 35% 35%, #fed7aa, #ea580c, #7c2d12)',
    hasRings: false
  },
  {
    id: 'earth',
    name: 'Earth (Portfolio)',
    radius: 16, // 16vmin
    angle: 120,
    size: 20,
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.8)',
    bg: 'radial-gradient(circle at 35% 35%, #38bdf8, #0284c7, #0f172a)',
    hasRings: false
  },
  {
    id: 'mars',
    name: 'Mars',
    radius: 21, // 21vmin
    angle: 310,
    size: 13,
    color: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.6)',
    bg: 'radial-gradient(circle at 35% 35%, #f87171, #dc2626, #7f1d1d)',
    hasRings: false
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    radius: 27, // 27vmin
    angle: 80,
    size: 32,
    color: '#f97316',
    glow: 'rgba(249, 115, 22, 0.6)',
    bg: 'repeating-linear-gradient(0deg, #9a3412, #ea580c 15%, #fed7aa 20%, #c2410c 30%, #7c2d12 40%)',
    hasRings: false
  },
  {
    id: 'saturn',
    name: 'Saturn',
    radius: 33, // 33vmin
    angle: 250,
    size: 26,
    color: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.6)',
    bg: 'radial-gradient(circle at 35% 35%, #fde68a, #d97706, #78350f)',
    hasRings: true
  },
  {
    id: 'uranus',
    name: 'Uranus',
    radius: 39, // 39vmin
    angle: 160,
    size: 18,
    color: '#2dd4bf',
    glow: 'rgba(45, 212, 191, 0.6)',
    bg: 'radial-gradient(circle at 35% 35%, #99f6e4, #0d9488, #134e4a)',
    hasRings: false
  },
  {
    id: 'neptune',
    name: 'Neptune',
    radius: 45, // 45vmin (outer rim)
    angle: 340,
    size: 18,
    color: '#60a5fa',
    glow: 'rgba(96, 165, 250, 0.6)',
    bg: 'radial-gradient(circle at 35% 35%, #93c5fd, #2563eb, #1e3a8a)',
    hasRings: false
  }
];

// Helper to convert polar (radius vmin, angle degrees) to 2D coordinates on the tilted plane
const getPlanetPosition = (radiusVmin: number, angleDeg: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: radiusVmin * Math.cos(rad),
    y: radiusVmin * Math.sin(rad)
  };
};

const SpaceParticles = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const colors = ['#06b6d4', '#a855f7', '#ec4899', '#f97316', '#38bdf8'];
  const count = isMobile ? 20 : 60;
  const particles = Array.from({ length: count });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((_, i) => {
        const startX = Math.random() * 100;
        const startY = -10 - Math.random() * 20;
        const endY = 110;
        const duration = 0.8 + Math.random() * 2;
        const delay = Math.random() * 2;
        const color = colors[i % colors.length];
        return (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[16px] rounded-full opacity-60 blur-[1px]"
            style={{ left: `${startX}%`, backgroundColor: color }}
            animate={{ 
              top: [`${startY}%`, `${endY}%`],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
};

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let currentPhase = 0;
    let completionTimer: ReturnType<typeof setTimeout>;
    
    // Each planetary waypoint takes ~1.2s for an epic grand tour
    const phaseInterval = setInterval(() => {
      currentPhase += 1;
      if (currentPhase >= PHASES.length) {
        clearInterval(phaseInterval);
        setPhaseIndex(PHASES.length - 1);
        setIsFinished(true);
        completionTimer = setTimeout(() => onCompleteRef.current(), 1300);
      } else {
        setPhaseIndex(currentPhase);
      }
    }, 1250);

    // Hard safety fallback: force completion after 15s no matter what
    const safetyTimer = setTimeout(() => {
      clearInterval(phaseInterval);
      onCompleteRef.current();
    }, 15000);

    return () => {
      clearInterval(phaseInterval);
      clearTimeout(completionTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  const currentPhase = PHASES[Math.min(phaseIndex, PHASES.length - 1)];

  // ── 3D Rocket Flight Coordinates: Inward Grand Tour (From Deep Space Back To Earth) ──
  // Converts planet positions into CSS transform targets
  const getShipTransform = () => {
    switch (phaseIndex) {
      case 0: // Deep Space: Entering from far deep-space background (tiny, high up, pointing down-left)
        return { x: '42vmin', y: '-40vmin', rotate: 210, scale: 0.35, opacity: 0.8 };
      
      case 1: { // 08. Neptune
        const p = getPlanetPosition(45, 340);
        return { x: `${p.x}vmin`, y: `${p.y}vmin`, rotate: 200, scale: 0.45, opacity: 1 };
      }
      case 2: { // 07. Uranus
        const p = getPlanetPosition(39, 160);
        return { x: `${p.x}vmin`, y: `${p.y}vmin`, rotate: 140, scale: 0.55, opacity: 1 };
      }
      case 3: { // 06. Saturn
        const p = getPlanetPosition(33, 250);
        return { x: `${p.x}vmin`, y: `${p.y}vmin`, rotate: 35, scale: 0.65, opacity: 1 };
      }
      case 4: { // 05. Jupiter
        const p = getPlanetPosition(27, 80);
        return { x: `${p.x}vmin`, y: `${p.y}vmin`, rotate: 340, scale: 0.78, opacity: 1 };
      }
      case 5: { // 04. Mars
        const p = getPlanetPosition(21, 310);
        return { x: `${p.x}vmin`, y: `${p.y}vmin`, rotate: 230, scale: 0.9, opacity: 1 };
      }
      case 6: { // 03. Earth (Portfolio Core)
        const p = getPlanetPosition(16, 120);
        return { x: `${p.x}vmin`, y: `${p.y}vmin`, rotate: 0, scale: 1.25, opacity: 1 };
      }
      case 7: // Atmospheric Touchdown & Hyperspace Warp into Portfolio
      default: {
        const p = getPlanetPosition(16, 120);
        return { x: `${p.x}vmin`, y: `${p.y}vmin`, rotate: 0, scale: 24, opacity: 0 };
      }
    }
  };

  const shipState = getShipTransform();

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-[1200ms] ease-in-out
        ${isFinished ? 'opacity-0 backdrop-blur-none pointer-events-none' : 'opacity-100 backdrop-blur-sm'}`}
      style={{ backgroundColor: isFinished ? 'rgba(5, 8, 22, 0)' : 'rgba(3, 7, 18, 0.97)' }}
    >
      {/* Dynamic Cosmic Gradient Glow */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t ${currentPhase.color} to-transparent transition-colors duration-1000 opacity-90 mix-blend-screen pointer-events-none`}
      />

      {/* Warp Cosmic Dust Particles */}
      <SpaceParticles />

      {/* ── 3D PERSPECTIVE ORRERY STAGE (Preserves all planets on screen simultaneously) ── */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ perspective: '1100px' }}
      >
        <motion.div 
          className="relative w-[96vmin] h-[96vmin] flex items-center justify-center pointer-events-none"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(54deg) rotateZ(-12deg)' // Cinematic sci-fi tilt
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* ── CENTRAL GLOWING SUN ── */}
          <div className="absolute z-30 flex items-center justify-center">
            {/* Massive Radiant Solar Corona */}
            <div className="absolute w-[22vmin] h-[22vmin] rounded-full bg-yellow-400/20 blur-2xl animate-pulse" />
            <div className="absolute w-[14vmin] h-[14vmin] rounded-full bg-amber-500/30 blur-xl" />
            
            {/* Core Sun Sphere */}
            <div 
              className="relative w-[8vmin] h-[8vmin] rounded-full shadow-[0_0_50px_#facc15,inset_0_0_15px_#ffffff]"
              style={{ background: 'radial-gradient(circle at 35% 35%, #ffffff, #fef08a, #f59e0b, #d97706)' }}
            />
          </div>

          {/* ── CONCENTRIC ORBITAL RINGS & ALL 8 PLANETS ── */}
          {PLANETS.map((planet) => {
            const pos = getPlanetPosition(planet.radius, planet.angle);
            const isTargeted = currentPhase.activePlanet === planet.id;
            const isEarth = planet.id === 'earth';

            return (
              <React.Fragment key={planet.id}>
                {/* Orbital Track Ring */}
                <div 
                  className="absolute rounded-full border border-white/10 pointer-events-none transition-colors duration-700"
                  style={{
                    width: `${planet.radius * 2}vmin`,
                    height: `${planet.radius * 2}vmin`,
                    borderColor: isTargeted 
                      ? `${planet.color}80` 
                      : isEarth 
                        ? 'rgba(56, 189, 248, 0.35)' 
                        : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isTargeted ? `0 0 20px ${planet.color}40` : 'none',
                    borderStyle: planet.radius % 2 === 0 ? 'dashed' : 'solid'
                  }}
                />

                {/* Celestial Planet Body */}
                <motion.div
                  className="absolute z-20 flex items-center justify-center"
                  style={{
                    left: `calc(50% + ${pos.x}vmin - ${planet.size / 2}px)`,
                    top: `calc(50% + ${pos.y}vmin - ${planet.size / 2}px)`,
                    width: `${planet.size}px`,
                    height: `${planet.size}px`
                  }}
                  animate={{
                    scale: isTargeted ? [1.2, 1.65, 1.45] : 1
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  {/* Planet Target Radar Beacon (when rocket arrives at this planet) */}
                  {isTargeted && (
                    <motion.div 
                      className="absolute rounded-full border-2 border-cyan-400 pointer-events-none"
                      style={{ width: `${planet.size * 2.8}px`, height: `${planet.size * 2.8}px` }}
                      animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.9, 0.2, 0.9] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}

                  {/* Planet Body Sphere */}
                  <div 
                    className="relative w-full h-full rounded-full shadow-lg"
                    style={{
                      background: planet.bg,
                      boxShadow: isTargeted 
                        ? `0 0 35px ${planet.color}, inset -4px -4px 10px rgba(0,0,0,0.8)` 
                        : `0 0 15px ${planet.glow}, inset -3px -3px 8px rgba(0,0,0,0.8)`
                    }}
                  >
                    {/* Earth Continents and Cloud Highlights */}
                    {isEarth && (
                      <>
                        <div 
                          className="absolute inset-0 rounded-full opacity-70"
                          style={{ background: 'radial-gradient(circle at 60% 45%, transparent 35%, #22c55e 42%, #15803d 52%, transparent 62%)' }}
                        />
                        <div className="absolute inset-0 rounded-full bg-white/30 blur-[0.5px] mix-blend-screen animate-pulse" />
                      </>
                    )}
                  </div>

                  {/* Saturn Rings */}
                  {planet.hasRings && (
                    <div 
                      className="absolute w-[240%] h-[110%] rounded-[50%] border-[2.5px] border-amber-300/80 rotate-[25deg] shadow-[0_0_12px_rgba(252,211,77,0.6)] pointer-events-none"
                      style={{ transformStyle: 'preserve-3d', transform: 'rotateX(75deg)' }}
                    />
                  )}

                  {/* Planet Label Indicator */}
                  <div 
                    className={`absolute -bottom-5 whitespace-nowrap text-[9px] font-mono uppercase tracking-widest font-black transition-all duration-500 pointer-events-none ${
                      isTargeted 
                        ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] opacity-100 scale-110' 
                        : 'text-gray-500 opacity-60'
                    }`}
                  >
                    {planet.name}
                  </div>
                </motion.div>
              </React.Fragment>
            );
          })}

          {/* ── THE TRAVELLING ROCKET ── */}
          <motion.div
            className="absolute z-40 flex flex-col items-center pointer-events-none"
            animate={shipState}
            transition={{ duration: 1.15, ease: "easeInOut" }}
          >
            {/* Plasma Thruster Flame Trail */}
            <motion.div 
              className="absolute -bottom-24 w-6 h-36 blur-lg rounded-full"
              animate={{ 
                height: phaseIndex >= 6 ? [180, 280, 180] : [90, 130, 90], 
                opacity: phaseIndex >= 6 ? 1 : [0.7, 0.95, 0.7],
                backgroundColor: ['#06b6d4', '#a855f7', '#ec4899', '#f97316', '#38bdf8']
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div 
              className="absolute -bottom-14 w-2 h-20 blur-sm rounded-full bg-white shadow-[0_0_12px_#fff]"
              animate={{ height: phaseIndex >= 6 ? [100, 150, 100] : [50, 75, 50] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Aerodynamic Rocket Ship Vector */}
            <motion.svg 
              width="50" height="70" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" 
              className="relative z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.9)]"
              animate={{ filter: [
                'drop-shadow(0 0 15px rgba(6,182,212,0.9))', 
                'drop-shadow(0 0 20px rgba(168,85,247,0.9))', 
                'drop-shadow(0 0 20px rgba(236,72,153,0.9))', 
                'drop-shadow(0 0 15px rgba(34,211,238,0.9))'
              ] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              {/* Titanium Hull */}
              <path d="M30 0L60 68L30 52L0 68L30 0Z" fill="#ffffff" />
              {/* Heat Shield Armor */}
              <path d="M30 10L48 60L30 48L12 60L30 10Z" fill="#e2e8f0" />
              {/* Glowing Cockpit Core */}
              <motion.path 
                d="M30 22L38 50L30 42L22 50L30 22Z" 
                animate={{ fill: ['#06b6d4', '#a855f7', '#ec4899', '#f97316', '#06b6d4'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              {/* Steering Wings */}
              <path d="M0 68L8 78L18 68" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M60 68L52 78L42 68" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2.5" strokeLinecap="round" />
            </motion.svg>
          </motion.div>

        </motion.div>
      </div>

      {/* ── STORYTELLING MISSION HUD CAPSULE ── */}
      <div className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-3 z-40 px-4 w-full max-w-lg pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.id}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-md shadow-2xl"
          >
            <motion.span 
              className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full shrink-0"
              animate={{ 
                backgroundColor: ['#06b6d4', '#a855f7', '#ec4899', '#f97316', '#06b6d4'],
                boxShadow: [
                  '0 0 15px rgba(6,182,212,1)', 
                  '0 0 15px rgba(168,85,247,1)', 
                  '0 0 15px rgba(236,72,153,1)', 
                  '0 0 15px rgba(6,182,212,1)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-white font-black tracking-[0.12em] md:tracking-[0.25em] uppercase text-[10px] md:text-sm drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] text-center truncate">
              {currentPhase.name}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Global Mission Progress Bar */}
        <div className="w-60 sm:w-80 md:w-96 h-[5px] md:h-[6px] bg-white/10 relative overflow-hidden rounded-full shadow-inner border border-white/10">
          <motion.div 
            className="absolute top-0 left-0 h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${((phaseIndex + 1) / PHASES.length) * 100}%`,
              backgroundColor: ['#06b6d4', '#a855f7', '#ec4899', '#f97316', '#06b6d4'],
              boxShadow: [
                '0 0 15px rgba(6,182,212,0.9)', 
                '0 0 15px rgba(168,85,247,0.9)', 
                '0 0 15px rgba(236,72,153,0.9)', 
                '0 0 15px rgba(6,182,212,0.9)'
              ]
            }}
            transition={{ 
              width: { duration: 1.15, ease: 'easeInOut' },
              backgroundColor: { duration: 3, repeat: Infinity, ease: 'linear' },
              boxShadow: { duration: 3, repeat: Infinity, ease: 'linear' }
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default Preloader;
