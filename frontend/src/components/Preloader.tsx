import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

// ── Realistic Solar System Flight Mission ──
const PHASES = [
  { id: 'deep_space', name: 'DEEP SPACE VOYAGE // ENTERING SOLAR SYSTEM', subtitle: 'Transiting from Outer Cosmos' },
  { id: 'neptune', name: 'WAYPOINT 08 // NEPTUNE', subtitle: 'Flyby Deep Blue Ice Giant' },
  { id: 'uranus', name: 'WAYPOINT 07 // URANUS', subtitle: 'Transiting Cyan Ice Atmosphere' },
  { id: 'saturn', name: 'WAYPOINT 06 // SATURN RINGS', subtitle: 'Gravitational Slingshot Past Ring System' },
  { id: 'jupiter', name: 'WAYPOINT 05 // JUPITER', subtitle: 'Massive Gravity Assist Past Great Red Spot' },
  { id: 'mars', name: 'WAYPOINT 04 // MARS', subtitle: 'Approaching the Red Planet Orbit' },
  { id: 'earth', name: 'FINAL TARGET // EARTH (PORTFOLIO)', subtitle: 'Orbital Insertion Locked' },
  { id: 'touchdown', name: 'ATMOSPHERIC TOUCHDOWN // ONLINE', subtitle: 'Welcome to Raghuram\'s Universe' }
];

// All planets with realistic sizes and textures/realistic spherical CSS rendering
const PLANETS_CONFIG = [
  {
    id: 'mercury',
    name: 'Mercury',
    orbitRadius: 9, // vmin
    angle: 45,
    size: 'clamp(14px, 2.2vmin, 20px)',
    texture: null,
    gradient: 'radial-gradient(circle at 30% 30%, #e2e8f0 0%, #94a3b8 40%, #334155 85%, #0f172a 100%)',
    shadow: 'inset -4px -4px 8px rgba(0,0,0,0.8), 0 0 12px rgba(148,163,184,0.3)',
    color: '#94a3b8',
    glowColor: 'rgba(148, 163, 184, 0.4)'
  },
  {
    id: 'venus',
    name: 'Venus',
    orbitRadius: 14,
    angle: 210,
    size: 'clamp(20px, 3.2vmin, 30px)',
    texture: '/planets/venus.jpg',
    gradient: 'radial-gradient(circle at 30% 30%, #fed7aa 0%, #ea580c 45%, #7c2d12 85%, #000000 100%)',
    shadow: 'inset -6px -6px 12px rgba(0,0,0,0.85), 0 0 18px rgba(249,115,22,0.4)',
    color: '#fb923c',
    glowColor: 'rgba(251, 146, 60, 0.5)'
  },
  {
    id: 'earth',
    name: 'Earth (Portfolio)',
    orbitRadius: 20,
    angle: 120,
    size: 'clamp(26px, 4.2vmin, 40px)',
    texture: '/planets/earth.jpg',
    gradient: 'radial-gradient(circle at 35% 35%, #38bdf8 0%, #0284c7 40%, #0369a1 70%, #082f49 100%)',
    shadow: 'inset -8px -8px 16px rgba(0,0,0,0.85), 0 0 25px rgba(56,189,248,0.7)',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.8)'
  },
  {
    id: 'mars',
    name: 'Mars',
    orbitRadius: 26,
    angle: 320,
    size: 'clamp(18px, 2.8vmin, 26px)',
    texture: null,
    gradient: 'radial-gradient(circle at 30% 30%, #fca5a5 0%, #ef4444 35%, #991b1b 75%, #450a0a 100%)',
    shadow: 'inset -6px -6px 12px rgba(0,0,0,0.9), 0 0 16px rgba(239,68,68,0.5)',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.6)'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    orbitRadius: 33,
    angle: 75,
    size: 'clamp(38px, 6.2vmin, 58px)',
    texture: '/planets/jupiter.jpg',
    gradient: 'repeating-linear-gradient(0deg, #9a3412, #ea580c 12%, #fed7aa 18%, #c2410c 28%, #7c2d12 38%)',
    shadow: 'inset -12px -12px 24px rgba(0,0,0,0.85), 0 0 30px rgba(249,115,22,0.5)',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.6)'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    orbitRadius: 40,
    angle: 245,
    size: 'clamp(32px, 5.2vmin, 48px)',
    texture: null,
    gradient: 'radial-gradient(circle at 30% 30%, #fef3c7 0%, #f59e0b 40%, #b45309 75%, #451a03 100%)',
    shadow: 'inset -10px -10px 20px rgba(0,0,0,0.85), 0 0 24px rgba(245,158,11,0.5)',
    color: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.6)',
    hasRings: true
  },
  {
    id: 'uranus',
    name: 'Uranus',
    orbitRadius: 46,
    angle: 165,
    size: 'clamp(24px, 3.8vmin, 36px)',
    texture: '/planets/uranus.jpg',
    gradient: 'radial-gradient(circle at 30% 30%, #a7f3d0 0%, #14b8a6 45%, #0f766e 75%, #042f2e 100%)',
    shadow: 'inset -8px -8px 16px rgba(0,0,0,0.85), 0 0 20px rgba(20,184,166,0.5)',
    color: '#2dd4bf',
    glowColor: 'rgba(45, 212, 191, 0.6)'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    orbitRadius: 52,
    angle: 345,
    size: 'clamp(24px, 3.8vmin, 36px)',
    texture: '/planets/neptune.jpg',
    gradient: 'radial-gradient(circle at 30% 30%, #93c5fd 0%, #2563eb 45%, #1e40af 75%, #0f172a 100%)',
    shadow: 'inset -8px -8px 16px rgba(0,0,0,0.85), 0 0 22px rgba(37,99,235,0.6)',
    color: '#60a5fa',
    glowColor: 'rgba(96, 165, 250, 0.6)'
  }
];

const getPlanetCoordinates = (radiusVmin: number, angleDeg: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: radiusVmin * Math.cos(rad),
    y: radiusVmin * Math.sin(rad)
  };
};

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let current = 0;
    let finishTimer: ReturnType<typeof setTimeout>;

    const timer = setInterval(() => {
      current += 1;
      if (current >= PHASES.length) {
        clearInterval(timer);
        setPhaseIndex(PHASES.length - 1);
        setIsFinished(true);
        finishTimer = setTimeout(() => onCompleteRef.current(), 1200);
      } else {
        setPhaseIndex(current);
      }
    }, 1300);

    const safety = setTimeout(() => {
      clearInterval(timer);
      onCompleteRef.current();
    }, 15000);

    return () => {
      clearInterval(timer);
      clearTimeout(finishTimer);
      clearTimeout(safety);
    };
  }, []);

  const currentPhase = PHASES[Math.min(phaseIndex, PHASES.length - 1)];

  // Rocket Coordinates & Rotation Angle according to trajectory
  const getRocketTransform = () => {
    switch (phaseIndex) {
      case 0: // Deep outer space entering from far behind top right
        return { x: '58vmin', y: '-45vmin', rotate: 215, scale: 0.45, opacity: 0.9 };
      case 1: { // Neptune
        const p = getPlanetCoordinates(52, 345);
        return { x: `${p.x + 4}vmin`, y: `${p.y - 4}vmin`, rotate: 200, scale: 0.55, opacity: 1 };
      }
      case 2: { // Uranus
        const p = getPlanetCoordinates(46, 165);
        return { x: `${p.x - 4}vmin`, y: `${p.y + 4}vmin`, rotate: 135, scale: 0.65, opacity: 1 };
      }
      case 3: { // Saturn
        const p = getPlanetCoordinates(40, 245);
        return { x: `${p.x - 4}vmin`, y: `${p.y - 4}vmin`, rotate: 30, scale: 0.75, opacity: 1 };
      }
      case 4: { // Jupiter
        const p = getPlanetCoordinates(33, 75);
        return { x: `${p.x + 4}vmin`, y: `${p.y + 3}vmin`, rotate: 335, scale: 0.88, opacity: 1 };
      }
      case 5: { // Mars
        const p = getPlanetCoordinates(26, 320);
        return { x: `${p.x + 3}vmin`, y: `${p.y - 3}vmin`, rotate: 220, scale: 1.0, opacity: 1 };
      }
      case 6: { // Earth (Arrival)
        const p = getPlanetCoordinates(20, 120);
        return { x: `${p.x}vmin`, y: `${p.y}vmin`, rotate: 0, scale: 1.25, opacity: 1 };
      }
      case 7: // Atmospheric Touchdown & Hyper Warp into Portfolio
      default: {
        const p = getPlanetCoordinates(20, 120);
        return { x: `${p.x}vmin`, y: `${p.y}vmin`, rotate: 0, scale: 26, opacity: 0 };
      }
    }
  };

  const shipState = getRocketTransform();

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-[1200ms] ease-in-out select-none
        ${isFinished ? 'opacity-0 backdrop-blur-none pointer-events-none' : 'opacity-100 backdrop-blur-md'}`}
      style={{ backgroundColor: isFinished ? 'rgba(3, 7, 18, 0)' : 'rgba(2, 6, 23, 0.98)' }}
    >
      {/* ── Realistic Starfield Background ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,23,42,0.8)_0%,_rgba(2,6,23,1)_100%)] pointer-events-none" />

      {/* Distant Twinkling Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        {Array.from({ length: 45 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              top: `${(i * 19) % 100}%`,
              left: `${(i * 37) % 100}%`,
              opacity: ((i % 5) + 3) * 0.1,
              boxShadow: i % 4 === 0 ? '0 0 6px rgba(255,255,255,0.8)' : 'none'
            }}
          />
        ))}
      </div>

      {/* ── SOLAR SYSTEM STAGE (All 8 Planets + Central Sun Visible) ── */}
      <div className="relative w-[96vmin] h-[96vmin] flex items-center justify-center pointer-events-none">
        
        {/* ── 1. REALISTIC RADIANT SUN (Center) ── */}
        <div className="absolute z-20 flex items-center justify-center">
          {/* Outer Sun Corona Rays */}
          <div className="absolute w-[28vmin] h-[28vmin] rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-400/20 to-orange-500/15 blur-2xl animate-pulse" />
          <div className="absolute w-[16vmin] h-[16vmin] rounded-full bg-yellow-500/30 blur-xl" />

          {/* Sun Core Sphere */}
          <div
            className="relative w-[8.5vmin] h-[8.5vmin] rounded-full shadow-[0_0_60px_#f59e0b,0_0_100px_rgba(245,158,11,0.5),inset_0_0_15px_#ffffff]"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #fef08a 25%, #f59e0b 60%, #b45309 90%)'
            }}
          >
            {/* Plasma Solar Granules */}
            <div className="absolute inset-0 rounded-full bg-yellow-200/20 mix-blend-overlay animate-ping" style={{ animationDuration: '4s' }} />
          </div>

          <span className="absolute -bottom-5 text-[8.5px] font-mono uppercase tracking-[0.2em] font-black text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">
            THE SUN
          </span>
        </div>

        {/* ── 2. CONCENTRIC ORBITS & 8 TEXTURED PLANETS ── */}
        {PLANETS_CONFIG.map((planet) => {
          const coords = getPlanetCoordinates(planet.orbitRadius, planet.angle);
          const isTargeted = currentPhase.id === planet.id;
          const isEarth = planet.id === 'earth';

          return (
            <React.Fragment key={planet.id}>
              {/* Elliptical Glowing Orbit Line */}
              <div
                className="absolute rounded-full border pointer-events-none transition-all duration-700"
                style={{
                  width: `${planet.orbitRadius * 2}vmin`,
                  height: `${planet.orbitRadius * 2}vmin`,
                  borderColor: isTargeted
                    ? `${planet.color}`
                    : isEarth
                      ? 'rgba(56, 189, 248, 0.4)'
                      : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: isTargeted ? `0 0 15px ${planet.color}40` : 'none',
                  borderWidth: isTargeted || isEarth ? '1.5px' : '1px'
                }}
              />

              {/* 3D Realistic Planet Body */}
              <motion.div
                className="absolute z-20 flex items-center justify-center"
                style={{
                  left: `calc(50% + ${coords.x}vmin)`,
                  top: `calc(50% + ${coords.y}vmin)`,
                  transform: 'translate(-50%, -50%)',
                  width: planet.size,
                  height: planet.size
                }}
                animate={{
                  scale: isTargeted ? [1.1, 1.45, 1.3] : 1
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                {/* Targeting Radar Ring when Rocket flies by */}
                {isTargeted && (
                  <motion.div
                    className="absolute rounded-full border-2 border-cyan-400 pointer-events-none"
                    style={{ width: '180%', height: '180%' }}
                    animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.8, 0.2, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* Sphere with Real Texture or 3D Shader Illumination */}
                <div
                  className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
                  style={{
                    backgroundImage: planet.texture ? `url(${planet.texture})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    background: planet.texture ? undefined : planet.gradient,
                    boxShadow: isTargeted
                      ? `0 0 35px ${planet.color}, ${planet.shadow}`
                      : `${planet.shadow}, 0 0 15px ${planet.glowColor}`
                  }}
                >
                  {/* Real Shadow Terminator (Illuminated by central Sun) */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.8) 100%)'
                    }}
                  />

                  {/* Atmospheric Haze Layer for Earth */}
                  {isEarth && (
                    <div className="absolute inset-0 rounded-full border border-cyan-300/60 pointer-events-none shadow-[inset_0_0_8px_rgba(56,189,248,0.8)]" />
                  )}
                </div>

                {/* Saturn 3D Ring System */}
                {planet.hasRings && (
                  <div
                    className="absolute w-[250%] h-[110%] rounded-[50%] border-[3px] border-amber-300/80 rotate-[25deg] shadow-[0_0_15px_rgba(252,211,77,0.5)] pointer-events-none"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'rotateX(72deg) rotateY(15deg)'
                    }}
                  >
                    <div className="absolute inset-0 rounded-[50%] border-[1px] border-amber-100/40 m-[1px]" />
                  </div>
                )}

                {/* Planet Label Indicator */}
                <div
                  className={`absolute -bottom-5 whitespace-nowrap text-[8.5px] font-mono uppercase tracking-widest font-black transition-all duration-300 pointer-events-none ${
                    isTargeted
                      ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,1)] opacity-100 scale-110'
                      : isEarth
                        ? 'text-cyan-400 opacity-90'
                        : 'text-gray-400 opacity-50'
                  }`}
                >
                  {planet.name}
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}

        {/* ── 3. REALISTIC 3D FLYING ROCKET (Travelling across the solar system) ── */}
        <motion.div
          className="absolute z-40 flex flex-col items-center pointer-events-none"
          animate={shipState}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Dual Ion Thruster Plasma Trails */}
          <div className="absolute -bottom-20 flex items-center justify-center gap-3 pointer-events-none">
            {/* Left Engine Plasma */}
            <div className="flex flex-col items-center">
              <motion.div
                className="w-1.5 h-16 bg-gradient-to-b from-white via-cyan-400 to-transparent rounded-full shadow-[0_0_15px_#22d3ee]"
                animate={{ height: phaseIndex >= 6 ? [70, 110, 70] : [35, 60, 35], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-1 w-4 h-24 bg-gradient-to-b from-cyan-400/80 via-blue-600/50 to-transparent blur-md rounded-full"
                animate={{ height: phaseIndex >= 6 ? [90, 140, 90] : [45, 75, 45] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
            </div>

            {/* Right Engine Plasma */}
            <div className="flex flex-col items-center">
              <motion.div
                className="w-1.5 h-16 bg-gradient-to-b from-white via-cyan-400 to-transparent rounded-full shadow-[0_0_15px_#22d3ee]"
                animate={{ height: phaseIndex >= 6 ? [70, 110, 70] : [35, 60, 35], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 0.2, delay: 0.1, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-1 w-4 h-24 bg-gradient-to-b from-cyan-400/80 via-blue-600/50 to-transparent blur-md rounded-full"
                animate={{ height: phaseIndex >= 6 ? [90, 140, 90] : [45, 75, 45] }}
                transition={{ duration: 0.3, delay: 0.1, repeat: Infinity }}
              />
            </div>
          </div>

          {/* Futuristic Cyber-Orbital Shifter Ship Vector */}
          <svg
            width="56"
            height="76"
            viewBox="0 0 70 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)] filter"
          >
            {/* Outer Wings Shield Plating */}
            <path
              d="M35 8 L58 68 L50 76 L35 70 L20 76 L12 68 Z"
              fill="url(#cyber_dark_hull)"
              stroke="#0ea5e9"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />

            {/* Main Central Fuselage (Titanium Armor) */}
            <path
              d="M35 4 L48 55 L35 68 L22 55 Z"
              fill="url(#cyber_titanium_hull)"
              stroke="#38bdf8"
              strokeWidth="1.5"
            />

            {/* Cyan Energy Tracer Lines (Left & Right) */}
            <path
              d="M35 12 L45 52 L35 62"
              stroke="#22d3ee"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_#22d3ee]"
            />
            <path
              d="M35 12 L25 52 L35 62"
              stroke="#22d3ee"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_#22d3ee]"
            />

            {/* Glass Cockpit Canopy (Holographic Cyan Dome) */}
            <path
              d="M35 18 C38 18 41 26 40 38 C39 44 35 46 35 46 C35 46 31 44 30 38 C29 26 32 18 35 18 Z"
              fill="url(#cyber_canopy)"
              stroke="#67e8f9"
              strokeWidth="1.5"
            />
            {/* Canopy Glass Specular Highlight */}
            <path
              d="M34 22 C36 22 37 26 37 32"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Dual Thruster Bells */}
            <rect x="23" y="70" width="8" height="6" rx="1.5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            <rect x="39" y="70" width="8" height="6" rx="1.5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />

            {/* Wingtip Navigation Lights */}
            <circle cx="13" cy="68" r="2" fill="#ef4444" className="animate-pulse" />
            <circle cx="57" cy="68" r="2" fill="#10b981" className="animate-pulse" />

            <defs>
              <linearGradient id="cyber_titanium_hull" x1="22" y1="4" x2="48" y2="68" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#e2e8f0" />
                <stop offset="75%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>

              <linearGradient id="cyber_dark_hull" x1="12" y1="8" x2="58" y2="76" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="60%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>

              <linearGradient id="cyber_canopy" x1="30" y1="18" x2="40" y2="46" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a5f3fc" />
                <stop offset="45%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#083344" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

      </div>

      {/* ── MISSION CONTROL HUD (Storytelling at Bottom) ── */}
      <div className="absolute bottom-6 sm:bottom-10 flex flex-col items-center gap-2 z-40 px-4 w-full max-w-md pointer-events-none text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.id}
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-1 px-5 py-2.5 rounded-2xl bg-slate-950/80 border border-white/10 backdrop-blur-md shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-white font-black tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[10px] sm:text-xs drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                {currentPhase.name}
              </span>
            </div>
            <span className="text-gray-400 font-mono text-[9px] sm:text-[10px] tracking-wide">
              {currentPhase.subtitle}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Multi-Segment Journey Progress Line */}
        <div className="w-56 sm:w-72 h-[4px] bg-slate-800 rounded-full overflow-hidden border border-white/10 mt-1">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_#22d3ee]"
            animate={{ width: `${((phaseIndex + 1) / PHASES.length) * 100}%` }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
        </div>
      </div>

    </div>
  );
};

export default Preloader;
