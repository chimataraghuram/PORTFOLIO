import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import HeroTexturedPlanet, { type PlanetId } from './HeroTexturedPlanet';

export interface HeroMouse {
  x: number;
  y: number;
  active: boolean;
}

interface HeroPlanetarySystemProps {
  mouse?: HeroMouse;
  isMobile?: boolean;
}

const PLANET_CYCLE: PlanetId[] = ['earth', 'moon', 'neptune', 'mars'];
const DISPLAY_MS = 6000;
const TRANSITION_MS = 1500;

const THEMES: Record<PlanetId, { particleTint: string; fogTint: string }> = {
  earth: { particleTint: '#e0e7ff', fogTint: 'rgba(99, 102, 241, 0.055)' },
  moon: { particleTint: '#a78bfa', fogTint: 'rgba(139, 92, 246, 0.06)' },
  neptune: { particleTint: '#c4b5fd', fogTint: 'rgba(56, 189, 248, 0.055)' },
  mars: { particleTint: '#fbbf24', fogTint: 'rgba(251, 191, 36, 0.06)' },
};

// ── Dynamic Floating Background Planets with Alternating Positions & Seamless Transitions ──
interface CelestialDrifter {
  id: string;
  name: string;
  texture: string;
  size: string;
  glow: string;
  shade: string;
  positions: Array<{
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  }>;
}

const CELESTIAL_DRIFTERS: CelestialDrifter[] = [
  {
    id: 'jupiter',
    name: 'Jupiter',
    texture: '/planets/jupiter.jpg',
    size: 'clamp(55px, 7vw, 110px)',
    glow: 'rgba(251, 191, 36, 0.55)',
    shade: 'rgba(69, 26, 3, 0.45)',
    positions: [
      { top: '12%', right: '6%' },
      { bottom: '15%', left: '8%' },
      { top: '8%', left: '42%' }
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    texture: '/planets/neptune.jpg',
    size: 'clamp(45px, 5.5vw, 85px)',
    glow: 'rgba(96, 165, 250, 0.55)',
    shade: 'rgba(8, 47, 73, 0.45)',
    positions: [
      { top: '10%', left: '46%' },
      { top: '22%', right: '12%' },
      { bottom: '24%', left: '12%' }
    ]
  },
  {
    id: 'venus',
    name: 'Venus',
    texture: '/planets/venus.jpg',
    size: 'clamp(38px, 4.5vw, 72px)',
    glow: 'rgba(251, 146, 60, 0.5)',
    shade: 'rgba(120, 53, 15, 0.4)',
    positions: [
      { bottom: '20%', left: '10%' },
      { top: '14%', left: '12%' },
      { bottom: '18%', right: '18%' }
    ]
  },
  {
    id: 'moon',
    name: 'Moon',
    texture: '/planets/moon.jpg',
    size: 'clamp(30px, 3.8vw, 55px)',
    glow: 'rgba(226, 232, 240, 0.45)',
    shade: 'rgba(15, 23, 42, 0.45)',
    positions: [
      { bottom: '22%', right: '28%' },
      { top: '18%', left: '32%' },
      { top: '28%', right: '8%' }
    ]
  }
];

const OrbitingPlanets: React.FC<{ activePlanet: PlanetId; isMobile: boolean }> = ({ isMobile }) => {
  // Alternate visible background planet and swap positions dynamically
  const [currentIdx, setCurrentIdx] = useState(0);
  const [posIdx, setPosIdx] = useState(0);

  useEffect(() => {
    // Every 7 seconds, rotate to another planet and migrate to a new corner position
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % CELESTIAL_DRIFTERS.length);
      setPosIdx((prev) => (prev + 1) % 3);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const activeDrifter = CELESTIAL_DRIFTERS[currentIdx];
  const secondaryDrifter = CELESTIAL_DRIFTERS[(currentIdx + 1) % CELESTIAL_DRIFTERS.length];

  const primaryPos = activeDrifter.positions[posIdx];
  const secondaryPos = secondaryDrifter.positions[(posIdx + 1) % secondaryDrifter.positions.length];

  return (
    <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden">
      {/* Primary Dynamic Rotating Planet (Changes planet & position with smooth crossfade) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`primary-${activeDrifter.id}-${posIdx}`}
          className="absolute rounded-full shadow-2xl"
          style={{
            ...primaryPos,
            width: activeDrifter.size,
            height: activeDrifter.size,
            backgroundImage: `url(${activeDrifter.texture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(1.3) contrast(1.15)',
            boxShadow: `inset -20px -16px 28px rgba(0,0,0,0.7), inset 10px 8px 18px rgba(255,255,255,0.18), 0 0 45px ${activeDrifter.glow}`,
          }}
          initial={{ opacity: 0, scale: 0.75, filter: 'blur(8px)' }}
          animate={{
            opacity: 1,
            scale: [1, 1.08, 1],
            rotate: [0, 360],
            filter: 'blur(0px)'
          }}
          exit={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
          transition={{
            opacity: { duration: 1.8, ease: 'easeInOut' },
            scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 32, repeat: Infinity, ease: 'linear' },
            filter: { duration: 1.5 }
          }}
        >
          {/* Surface Terminator Shading for Real Spherical 3D Volume */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 28%, rgba(255,255,255,0.35) 0%, transparent 40%), radial-gradient(circle at 75% 75%, ${activeDrifter.shade} 0%, rgba(0,0,0,0.85) 100%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Secondary Companion Planet (Only on desktop/tablets for depth) */}
      {!isMobile && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`secondary-${secondaryDrifter.id}-${posIdx}`}
            className="absolute rounded-full shadow-2xl hidden sm:block"
            style={{
              ...secondaryPos,
              width: `calc(${secondaryDrifter.size} * 0.75)`,
              height: `calc(${secondaryDrifter.size} * 0.75)`,
              backgroundImage: `url(${secondaryDrifter.texture})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'saturate(1.2) contrast(1.1)',
              boxShadow: `inset -16px -12px 22px rgba(0,0,0,0.7), inset 8px 6px 14px rgba(255,255,255,0.14), 0 0 35px ${secondaryDrifter.glow}`,
            }}
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(6px)' }}
            animate={{
              opacity: 0.85,
              scale: [0.95, 1.04, 0.95],
              rotate: [0, -360],
              filter: 'blur(0px)'
            }}
            exit={{ opacity: 0, scale: 0.7, filter: 'blur(6px)' }}
            transition={{
              opacity: { duration: 2, ease: 'easeInOut' },
              scale: { duration: 24, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 42, repeat: Infinity, ease: 'linear' },
              filter: { duration: 1.8 }
            }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 28%, rgba(255,255,255,0.3) 0%, transparent 40%), radial-gradient(circle at 75% 75%, ${secondaryDrifter.shade} 0%, rgba(0,0,0,0.85) 100%)`,
              }}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Ambient Shooting Star / Starlight Glint */}
      <motion.div
        className="absolute left-[48%] top-[15%] h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.9)]"
        animate={{ x: [0, 220, 480], y: [0, 80, 180], opacity: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
};

const HeroPlanetarySystem: React.FC<HeroPlanetarySystemProps> = ({ mouse = {x:0, y:0, active:false}, isMobile = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  const settleTimeoutRef = useRef<number | null>(null);

  const activePlanet = PLANET_CYCLE[activeIndex];
  const theme = THEMES[activePlanet];

  const parallaxX = useSpring(mouse.active ? (mouse.x - 400) * 0.006 : 0, { stiffness: 40, damping: 28 });
  const parallaxY = useSpring(mouse.active ? (mouse.y - 280) * 0.006 : 0, { stiffness: 40, damping: 28 });
  const parallaxFarX = useTransform(parallaxX, (v) => v * 0.5);
  const parallaxFarY = useTransform(parallaxY, (v) => v * 0.5);

  const advancePlanet = useCallback(() => {
    setIsTransitioning(true);
    transitionTimeoutRef.current = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % PLANET_CYCLE.length);
      settleTimeoutRef.current = window.setTimeout(() => setIsTransitioning(false), 200);
    }, TRANSITION_MS * 0.5);
  }, []);

  useEffect(() => {
    const interval = setInterval(advancePlanet, DISPLAY_MS);
    return () => {
      clearInterval(interval);
      if (transitionTimeoutRef.current !== null) clearTimeout(transitionTimeoutRef.current);
      if (settleTimeoutRef.current !== null) clearTimeout(settleTimeoutRef.current);
    };
  }, [advancePlanet]);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none isolate" aria-hidden>
      {/* Deep space */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#0a0f1e] to-[#050816]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 15% 25%, #fff, transparent), radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.8), transparent), radial-gradient(1.5px 1.5px at 60% 75%, #fff, transparent), radial-gradient(1px 1px at 35% 60%, rgba(221,214,254,0.72), transparent)',
          backgroundSize: '280px 280px',
        }}
      />

      {/* Dynamic Background Planets that rotate and swap positions */}
      <OrbitingPlanets activePlanet={activePlanet} isMobile={isMobile} />

      {/* 3D Main Textured Celestial Sphere in Hero */}
      <motion.div className="absolute inset-0 z-[3]">
        <motion.div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4"
          animate={{ opacity: isTransitioning ? 0 : 1, scale: 1 }}
          transition={{ duration: TRANSITION_MS / 2000, ease: 'easeInOut' }}
        >
          <HeroTexturedPlanet planetId={activePlanet} isMobile={isMobile} />
        </motion.div>
      </motion.div>

      {/* Atmospheric fog */}
      <motion.div
        className="absolute inset-0 z-[4]"
        style={{ x: parallaxFarX, y: parallaxFarY }}
      >
        <div
          className="absolute top-[10%] right-0 w-[60%] h-[80%] blur-[90px] opacity-50"
          style={{ background: `radial-gradient(ellipse, ${theme.fogTint} 0%, transparent 70%)`, transition: 'background 2s ease' }}
        />
      </motion.div>

      {/* Planet clip mask */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg,
              rgba(0, 0, 0, 0.95) 0%,
              rgba(0, 0, 0, 0.65) 25%,
              rgba(0, 0, 0, 0.15) 45%,
              transparent 60%)
          `,
        }}
      />

      <div
        className="absolute inset-0 z-[6]"
        style={{
          background:
            'linear-gradient(100deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.46) 34%, rgba(0, 0, 0, 0.14) 48%, transparent 60%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-32 z-[7] bg-gradient-to-t from-[#050816] to-transparent" />
    </div>
  );
};

export default HeroPlanetarySystem;
