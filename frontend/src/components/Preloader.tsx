import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

// ── Out-to-In Planetary Odyssey Journey ──
const PHASES = [
  { id: 'outer_space', name: 'DEEP SPACE INGRESS', color: 'from-indigo-950/40', planet: null },
  { id: 'neptune', name: 'TRANSITING 08 // NEPTUNE', color: 'from-blue-900/40', planet: 'neptune' },
  { id: 'uranus', name: 'FLYBY 07 // URANUS', color: 'from-teal-900/40', planet: 'uranus' },
  { id: 'saturn', name: 'SLINGSHOT 06 // SATURN RINGS', color: 'from-amber-950/40', planet: 'saturn' },
  { id: 'jupiter', name: 'GRAVITY ASSIST 05 // JUPITER', color: 'from-orange-950/40', planet: 'jupiter' },
  { id: 'mars', name: 'APPROACHING 04 // MARS', color: 'from-rose-950/40', planet: 'mars' },
  { id: 'earth', name: 'TARGET LOCKED // EARTH (PORTFOLIO)', color: 'from-cyan-900/50', planet: 'earth' },
  { id: 'landing', name: 'ATMOSPHERIC TOUCHDOWN // ONLINE', color: 'from-purple-900/50', planet: null }
];

const SpaceParticles = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const colors = ['#06b6d4', '#a855f7', '#ec4899', '#f97316', '#38bdf8'];
  const particles = Array.from({ length: isMobile ? 18 : 60 });

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
            className="absolute w-[2px] h-[18px] rounded-full opacity-60 blur-[1px]"
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
    
    // Each planetary flyby takes ~1.2s for a dynamic, smooth voyage
    const phaseInterval = setInterval(() => {
      currentPhase += 1;
      if (currentPhase >= PHASES.length) {
        clearInterval(phaseInterval);
        setPhaseIndex(PHASES.length - 1);
        setIsFinished(true);
        completionTimer = setTimeout(() => onCompleteRef.current(), 1200);
      } else {
        setPhaseIndex(currentPhase);
      }
    }, 1150);

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

  // ── Rocket Inward Spiral Trajectory (Out-to-In from Deep Space to Earth) ──
  const getShipTransform = () => {
    switch (phaseIndex) {
      case 0: // Outer Space: Entering from far deep space top-right, small scale
        return { x: '45vmin', y: '-45vmin', rotate: 215, scale: 0.35, opacity: 0.8 };
      case 1: // Neptune (Orbit 6, Top Right outer corner)
        return { x: '36vmin', y: '-36vmin', rotate: 210, scale: 0.45, opacity: 1 };
      case 2: // Uranus (Orbit 5, Bottom Right outer)
        return { x: '30vmin', y: '30vmin', rotate: 145, scale: 0.55, opacity: 1 };
      case 3: // Saturn (Orbit 4, Bottom Left with massive rings)
        return { x: '-26vmin', y: '26vmin', rotate: 35, scale: 0.65, opacity: 1 };
      case 4: // Jupiter (Orbit 3, Mid Left)
        return { x: '-22vmin', y: '-10vmin', rotate: 25, scale: 0.78, opacity: 1 };
      case 5: // Mars (Orbit 2, Top Center/Right)
        return { x: '12vmin', y: '-12vmin', rotate: 120, scale: 0.95, opacity: 1 };
      case 6: // Earth (Orbit 1, Center Hub - Target Acquired)
        return { x: '0vmin', y: '0vmin', rotate: 0, scale: 1.25, opacity: 1 };
      case 7: // Atmospheric Touchdown & Warp burst into Portfolio
      default:
        return { x: '0vmin', y: '0vmin', rotate: 0, scale: 22, opacity: 0 };
    }
  };

  const shipState = getShipTransform();

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-[1200ms] ease-in-out
        ${isFinished ? 'opacity-0 backdrop-blur-none pointer-events-none' : 'opacity-100 backdrop-blur-sm'}`}
      style={{ backgroundColor: isFinished ? 'rgba(5, 8, 22, 0)' : 'rgba(3, 7, 18, 0.96)' }}
    >
      {/* Dynamic Cosmic Atmosphere */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t ${currentPhase.color} to-transparent transition-colors duration-1000 opacity-90 mix-blend-screen`}
      />

      {/* Warp Speed Cosmic Dust Particles */}
      <SpaceParticles />

      {/* ── SOLAR SYSTEM ARCHITECTURE (Responsive vmin-based scaling) ── */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: phaseIndex >= 0 && phaseIndex <= 6 ? 1 : 0,
          scale: phaseIndex === 6 ? 1.3 : 1
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {/* Orbital Track 6: Neptune */}
        <motion.div 
          className="absolute w-[100vmin] h-[100vmin] border border-blue-500/20 border-dotted rounded-full"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />

        {/* Orbital Track 5: Uranus */}
        <motion.div 
          className="absolute w-[84vmin] h-[84vmin] border border-teal-500/20 border-dashed rounded-full"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        />

        {/* Orbital Track 4: Saturn */}
        <motion.div 
          className="absolute w-[70vmin] h-[70vmin] border border-amber-500/20 rounded-full"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />

        {/* Orbital Track 3: Jupiter */}
        <motion.div 
          className="absolute w-[56vmin] h-[56vmin] border border-orange-500/20 border-dashed rounded-full"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        {/* Orbital Track 2: Mars */}
        <motion.div 
          className="absolute w-[40vmin] h-[40vmin] border border-red-500/25 rounded-full"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        {/* Orbital Track 1: Earth (Gold/Cyan Glowing Orbit) */}
        <motion.div 
          className="absolute w-[24vmin] h-[24vmin] border-2 border-cyan-400/40 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          animate={{ 
            rotate: [360, 0],
            borderColor: phaseIndex === 6 ? ['rgba(34,211,238,0.8)', 'rgba(168,85,247,0.8)', 'rgba(34,211,238,0.8)'] : 'rgba(34,211,238,0.3)',
            scale: phaseIndex === 6 ? [1, 1.08, 1] : 1
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── 08. NEPTUNE (Outer Deep Blue) ── */}
        <motion.div
          className="absolute rounded-full shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.9),0_0_20px_rgba(37,99,235,0.6)]"
          style={{ 
            background: 'radial-gradient(circle at 35% 35%, #60a5fa, #1d4ed8, #0f172a)',
            top: 'calc(50% - 36vmin - 16px)', left: 'calc(50% + 36vmin - 16px)',
            width: '32px', height: '32px'
          }}
          animate={{ 
            scale: phaseIndex === 1 ? 2.5 : 1,
            zIndex: phaseIndex === 1 ? 40 : 10,
            boxShadow: phaseIndex === 1 ? '0 0 35px rgba(37,99,235,0.9)' : '0 0 15px rgba(37,99,235,0.4)'
          }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full border border-blue-300/40 opacity-70"></div>
        </motion.div>

        {/* ── 07. URANUS (Cyan/Teal with Vertical Thin Ring) ── */}
        <motion.div
          className="absolute rounded-full flex items-center justify-center shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.8),0_0_20px_rgba(20,184,166,0.6)]"
          style={{ 
            background: 'radial-gradient(circle at 35% 35%, #5eead4, #0d9488, #134e4a)',
            top: 'calc(50% + 30vmin - 15px)', left: 'calc(50% + 30vmin - 15px)',
            width: '30px', height: '30px'
          }}
          animate={{ 
            scale: phaseIndex === 2 ? 2.6 : 1,
            zIndex: phaseIndex === 2 ? 40 : 10,
            boxShadow: phaseIndex === 2 ? '0 0 35px rgba(20,184,166,0.9)' : '0 0 15px rgba(20,184,166,0.4)'
          }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <div className="absolute w-[180%] h-[180%] border border-teal-300/50 rounded-full rotate-45 pointer-events-none"></div>
        </motion.div>

        {/* ── 06. SATURN (Golden Ring Giant) ── */}
        <motion.div
          className="absolute rounded-full flex items-center justify-center"
          style={{ 
            top: 'calc(50% + 26vmin - 22px)', left: 'calc(50% - 26vmin - 22px)',
            width: '44px', height: '44px'
          }}
          animate={{ 
            scale: phaseIndex === 3 ? 2.5 : 1,
            zIndex: phaseIndex === 3 ? 40 : 10
          }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <div className="absolute w-full h-full rounded-full bg-gradient-to-tr from-yellow-700 via-amber-500 to-yellow-200 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.5)] z-10"></div>
          {/* Planetary Rings */}
          <div className="absolute w-[260%] h-[110%] rounded-[50%] border-[3px] border-amber-300/70 rotate-[22deg] shadow-[0_0_15px_rgba(252,211,77,0.5)] z-20" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(72deg) rotateY(12deg)' }}>
            <div className="absolute inset-0 rounded-[50%] border-[1px] border-yellow-100/50 m-[1px]"></div>
          </div>
        </motion.div>

        {/* ── 05. JUPITER (Great Gas Giant) ── */}
        <motion.div
          className="absolute rounded-full shadow-[inset_-12px_-12px_24px_rgba(0,0,0,0.8),0_0_25px_rgba(249,115,22,0.5)] overflow-hidden"
          style={{ 
            background: 'repeating-linear-gradient(0deg, #9a3412, #ea580c 12%, #fed7aa 18%, #c2410c 28%, #7c2d12 35%)',
            top: 'calc(50% - 10vmin - 24px)', left: 'calc(50% - 22vmin - 24px)',
            width: '48px', height: '48px'
          }}
          animate={{ 
            scale: phaseIndex === 4 ? 2.5 : 1,
            zIndex: phaseIndex === 4 ? 40 : 10,
            boxShadow: phaseIndex === 4 ? '0 0 45px rgba(249,115,22,0.9)' : '0 0 20px rgba(249,115,22,0.4)'
          }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* Great Red Spot */}
          <div className="absolute bottom-2.5 right-2 w-3.5 h-2 rounded-[50%] bg-[#7f1d1d] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6)]"></div>
        </motion.div>

        {/* ── 04. MARS (Red Planet) ── */}
        <motion.div
          className="absolute rounded-full shadow-[inset_-6px_-6px_14px_rgba(0,0,0,0.9),0_0_15px_rgba(239,68,68,0.5)]"
          style={{ 
            background: 'radial-gradient(circle at 40% 40%, #f87171, #dc2626, #7f1d1d)',
            top: 'calc(50% - 12vmin - 13px)', left: 'calc(50% + 12vmin - 13px)',
            width: '26px', height: '26px'
          }}
          animate={{ 
            scale: phaseIndex === 5 ? 3 : 1,
            zIndex: phaseIndex === 5 ? 40 : 10,
            boxShadow: phaseIndex === 5 ? '0 0 35px rgba(239,68,68,0.9)' : '0 0 15px rgba(239,68,68,0.4)'
          }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-black/40"></div>
        </motion.div>

        {/* ── 03. EARTH (Destination // Raghuram's Portfolio Universe) ── */}
        <motion.div
          className="absolute rounded-full shadow-[inset_-12px_-12px_24px_rgba(0,0,0,0.8),0_0_35px_rgba(6,182,212,0.7)] overflow-hidden"
          style={{ 
            background: 'radial-gradient(circle at 35% 35%, #38bdf8, #0284c7, #0f172a)',
            top: 'calc(50% - 24px)', left: 'calc(50% - 24px)',
            width: '48px', height: '48px'
          }}
          animate={{ 
            scale: phaseIndex >= 6 ? [3.2, 3.6, 3.4] : 1.2,
            zIndex: phaseIndex >= 6 ? 45 : 20,
            boxShadow: phaseIndex >= 6 
              ? 'inset -20px -20px 40px rgba(0,0,0,0.8), 0 0 60px rgba(6,182,212,1), 0 0 100px rgba(168,85,247,0.8)' 
              : 'inset -12px -12px 24px rgba(0,0,0,0.8), 0 0 30px rgba(6,182,212,0.5)'
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Lush Green Continents */}
          <div className="absolute inset-0 opacity-70" style={{ background: 'radial-gradient(circle at 55% 45%, transparent 35%, #22c55e 42%, #15803d 52%, transparent 62%)' }}></div>
          {/* Swirling Atmospheric Clouds */}
          <motion.div 
            className="absolute inset-0 opacity-50 bg-white blur-[1px] mix-blend-screen" 
            style={{ background: 'repeating-radial-gradient(circle at 45% 45%, transparent, #fff 12%, transparent 24%)' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

      </motion.div>

      {/* ── DYNAMIC STEERABLE ROCKET ── */}
      <motion.div
        className="absolute z-50 flex flex-col items-center pointer-events-none"
        animate={shipState}
        transition={{ duration: 1.15, ease: "easeInOut" }}
      >
        {/* Hyperspace Plasma Trail */}
        <motion.div 
          className="absolute -bottom-28 w-8 h-44 blur-xl rounded-full"
          animate={{ 
            height: phaseIndex >= 6 ? [200, 320, 200] : [100, 140, 100], 
            opacity: phaseIndex >= 6 ? 1 : [0.7, 0.95, 0.7],
            backgroundColor: ['#06b6d4', '#a855f7', '#ec4899', '#f97316', '#38bdf8']
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute -bottom-16 w-2.5 h-24 blur-sm rounded-full bg-white shadow-[0_0_15px_#fff]"
          animate={{ height: phaseIndex >= 6 ? [120, 180, 120] : [60, 90, 60] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Futuristic Spacecraft Vector */}
        <motion.svg 
          width="54" height="74" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" 
          className="relative z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.9)]"
          animate={{ filter: [
            'drop-shadow(0 0 20px rgba(6,182,212,0.9))', 
            'drop-shadow(0 0 25px rgba(168,85,247,0.9))', 
            'drop-shadow(0 0 25px rgba(236,72,153,0.9))', 
            'drop-shadow(0 0 20px rgba(34,211,238,0.9))'
          ] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          {/* Main Aerodynamic Titanium Hull */}
          <path d="M30 0L60 68L30 52L0 68L30 0Z" fill="#ffffff" />
          {/* Shield Reflector Plating */}
          <path d="M30 10L48 60L30 48L12 60L30 10Z" fill="#e2e8f0" />
          {/* Luminous Core / Cockpit */}
          <motion.path 
            d="M30 22L38 50L30 42L22 50L30 22Z" 
            animate={{ fill: ['#06b6d4', '#a855f7', '#ec4899', '#f97316', '#06b6d4'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          {/* Ion Thruster Wings */}
          <path d="M0 68L8 78L18 68" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M60 68L52 78L42 68" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2.5" strokeLinecap="round" />
        </motion.svg>
      </motion.div>

      {/* ── STORYTELLING MISSION HUD ── */}
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
