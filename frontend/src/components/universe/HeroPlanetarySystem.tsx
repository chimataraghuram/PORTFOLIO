import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import HeroTexturedPlanet, { type PlanetId } from './HeroTexturedPlanet';

export interface HeroMouse {
  x: number;
  y: number;
  active: boolean;
}

interface HeroPlanetarySystemProps {
  mouse: HeroMouse;
  isMobile?: boolean;
}

const PLANET_CYCLE: PlanetId[] = ['gas', 'ice', 'ai', 'singularity'];
const DISPLAY_MS = 16000;
const TRANSITION_MS = 5000;

const THEMES: Record<PlanetId, { particleTint: string; fogTint: string }> = {
  gas: { particleTint: '#fbbf24', fogTint: 'rgba(251, 191, 36, 0.06)' },
  ice: { particleTint: '#67e8f9', fogTint: 'rgba(34, 211, 238, 0.06)' },
  ai: { particleTint: '#38bdf8', fogTint: 'rgba(56, 189, 248, 0.06)' },
  singularity: { particleTint: '#a78bfa', fogTint: 'rgba(139, 92, 246, 0.06)' },
};

const ORBITING_PLANETS = [
  {
    name: 'jupiter',
    texture: '/planets/jupiter.jpg',
    size: 'clamp(98px, 10vw, 182px)',
    className: 'right-[4%] top-[14%]',
    glow: 'rgba(251, 191, 36, 0.52)',
    duration: 28,
    delay: 0,
    shade: 'rgba(69, 26, 3, 0.42)',
    path: { x: [0, -34, 18, 0], y: [0, 22, -18, 0], rotate: [0, 16, 34, 0], scale: [1, 1.05, 0.98, 1] },
  },
  {
    name: 'neptune',
    texture: '/planets/neptune.jpg',
    size: 'clamp(68px, 6.8vw, 118px)',
    className: 'left-[50%] top-[10%] hidden sm:block',
    glow: 'rgba(34, 211, 238, 0.48)',
    duration: 34,
    delay: 3,
    shade: 'rgba(8, 47, 73, 0.38)',
    path: { x: [0, 26, -18, 0], y: [0, -12, 30, 0], rotate: [0, -24, -48, 0], scale: [1, 0.94, 1.08, 1] },
  },
  {
    name: 'venus',
    texture: '/planets/venus.jpg',
    size: 'clamp(52px, 5.4vw, 92px)',
    className: 'left-[12%] top-[16%] hidden md:block',
    glow: 'rgba(244, 114, 182, 0.4)',
    duration: 31,
    delay: 5,
    shade: 'rgba(120, 53, 15, 0.34)',
    path: { x: [0, 20, -12, 0], y: [0, 28, 10, 0], rotate: [0, 35, 70, 0], scale: [1, 1.08, 0.98, 1] },
  },
  {
    name: 'moon',
    texture: '/planets/moon.jpg',
    size: 'clamp(42px, 4.4vw, 72px)',
    className: 'right-[36%] bottom-[20%]',
    glow: 'rgba(226, 232, 240, 0.38)',
    duration: 24,
    delay: 1.5,
    shade: 'rgba(15, 23, 42, 0.42)',
    path: { x: [0, -22, 16, 0], y: [0, -18, 22, 0], rotate: [0, -40, -80, 0], scale: [1, 0.9, 1.05, 1] },
  },
] as const;

const OrbitingPlanets: React.FC<{ activePlanet: PlanetId; isMobile: boolean }> = ({ activePlanet, isMobile }) => {
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-[6] pointer-events-none">
        <motion.div
          className="absolute right-[-10%] top-[12%] rounded-full"
          style={{
            width: 'clamp(96px, 34vw, 150px)',
            height: 'clamp(96px, 34vw, 150px)',
            backgroundImage: 'url(/planets/jupiter.jpg)',
            backgroundSize: 'cover',
            filter: 'saturate(1.2) contrast(1.12)',
            boxShadow: 'inset -20px -18px 30px rgba(0,0,0,0.58), 0 0 50px rgba(251, 191, 36, 0.42)',
          }}
          animate={{ x: [0, -16, 8, 0], y: [0, 18, -10, 0], rotate: [0, 18, 36, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[8%] bottom-[18%] rounded-full"
          style={{
            width: 'clamp(42px, 15vw, 72px)',
            height: 'clamp(42px, 15vw, 72px)',
            backgroundImage: 'url(/planets/neptune.jpg)',
            backgroundSize: 'cover',
            filter: 'saturate(1.3) contrast(1.12)',
            boxShadow: 'inset -12px -12px 20px rgba(0,0,0,0.52), 0 0 34px rgba(34, 211, 238, 0.38)',
          }}
          animate={{ x: [0, 14, -8, 0], y: [0, -18, 10, 0], rotate: [0, -25, -50, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden">
      {ORBITING_PLANETS.map((planet) => (
        <motion.div
          key={planet.name}
          className={`absolute rounded-full ${planet.className}`}
          style={{
            width: planet.size,
            height: planet.size,
            backgroundImage: `url(${planet.texture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(1.25) contrast(1.18)',
            boxShadow: `inset -24px -20px 30px rgba(0,0,0,0.62), inset 12px 10px 22px rgba(255,255,255,0.16), 0 0 54px ${planet.glow}`,
          }}
          animate={planet.path}
          transition={{ duration: planet.duration, repeat: Infinity, ease: 'easeInOut', delay: planet.delay }}
        >
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 32% 30%, rgba(255,255,255,0.32), transparent 28%), radial-gradient(circle at 72% 70%, ${planet.shade}, transparent 58%)`,
            }}
          />
        </motion.div>
      ))}

      <motion.div
        className="absolute left-[54%] top-[18%] h-2 w-2 rounded-full bg-cyan-100 shadow-[0_0_22px_rgba(103,232,249,1)]"
        animate={{ x: [0, 260, 560], y: [0, 96, 210], opacity: [0, 1, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  );
};

/** Foreground + mid-depth particle field in hero */
const HeroParticleField: React.FC<{ tint: string; mouse: HeroMouse }> = ({ tint, mouse }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const count = window.innerWidth < 768 ? 90 : 170;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      size: 0.55 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
      speed: 0.12 + Math.random() * 0.42,
      twinkle: 0.5 + Math.random() * 0.5,
    }));

    let frame = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const draw = (time: number) => {
      const t = time * 0.001;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        let px = p.x * w + Math.sin(t * p.speed + p.phase) * 15;
        let py = p.y * h + Math.cos(t * p.speed * 0.9 + p.phase) * 12;

        if (mouse.active) {
          px += (mouse.x - w * 0.7) * p.z * 0.018;
          py += (mouse.y - h * 0.5) * p.z * 0.018;
        }

        const nearPlanet = px > w * 0.48;
        const nearText = px < w * 0.42;
        const twinkle = 0.75 + Math.sin(t * (1.4 + p.twinkle) + p.phase) * 0.25;
        let alpha = nearText ? 0.12 : 0.34 + p.z * 0.46;
        if (nearPlanet) alpha *= 1.45;
        alpha *= twinkle;

        ctx.beginPath();
        ctx.arc(px, py, p.size * (0.8 + p.z * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = tint;
        ctx.globalAlpha = Math.min(alpha, 0.95);
        ctx.shadowBlur = nearPlanet ? 12 : 6;
        ctx.shadowColor = tint;
        ctx.fill();

        if (p.z > 0.68) {
          ctx.beginPath();
          ctx.moveTo(px - 3, py);
          ctx.lineTo(px + 3, py);
          ctx.moveTo(px, py - 3);
          ctx.lineTo(px, py + 3);
          ctx.strokeStyle = '#ffffff';
          ctx.globalAlpha = Math.min(alpha * 0.55, 0.45);
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [tint, mouse]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[7] pointer-events-none" />;
};

const HeroPlanetarySystem: React.FC<HeroPlanetarySystemProps> = ({ mouse, isMobile = false }) => {
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
      settleTimeoutRef.current = window.setTimeout(() => setIsTransitioning(false), TRANSITION_MS * 0.5);
    }, TRANSITION_MS * 0.4);
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
            'radial-gradient(1px 1px at 15% 25%, #fff, transparent), radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.8), transparent), radial-gradient(1.5px 1.5px at 60% 75%, #fff, transparent), radial-gradient(1px 1px at 35% 60%, rgba(200,220,255,0.7), transparent)',
          backgroundSize: '280px 280px',
        }}
      />

      <OrbitingPlanets activePlanet={activePlanet} isMobile={isMobile} />

      {/* 3D textured planet + star particles (Three.js) */}
      <motion.div
        className="absolute inset-0 z-[3]"
        style={{ x: parallaxFarX, y: parallaxFarY }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: isTransitioning ? 0.3 : 1 }}
          transition={{ duration: TRANSITION_MS / 1000, ease: 'easeInOut' }}
        >
          <HeroTexturedPlanet planetId={activePlanet} isMobile={isMobile} />
        </motion.div>
      </motion.div>

      {/* Atmospheric fog */}
      <motion.div
        className="absolute inset-0 z-[4]"
        style={{ x: parallaxFarX, y: parallaxFarY }}
        animate={{ opacity: isTransitioning ? 0.5 : 1 }}
        transition={{ duration: 3 }}
      >
        <div
          className="absolute top-[10%] right-0 w-[60%] h-[80%] blur-[90px] opacity-50"
          style={{ background: `radial-gradient(ellipse, ${theme.fogTint} 0%, transparent 70%)` }}
        />
      </motion.div>

      {/* Planet clip mask — partial visibility, embed in universe */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg,
              rgba(5, 8, 22, 0.92) 0%,
              rgba(5, 8, 22, 0.55) 38%,
              rgba(5, 8, 22, 0.15) 52%,
              transparent 58%),
            radial-gradient(ellipse 35% 70% at 62% 50%,
              transparent 20%,
              rgba(5, 8, 22, 0.4) 100%)
          `,
        }}
      />

      <motion.div
        className="absolute inset-0 z-[5] bg-[#050816]"
        animate={{ opacity: isTransitioning ? 0.4 : 0 }}
        transition={{ duration: 2.5 }}
      />

      {/* Canvas particle layer */}
      <HeroParticleField tint={theme.particleTint} mouse={mouse} />

      {/* Text readability */}
      <div
        className="absolute inset-0 z-[6]"
        style={{
          background:
            'linear-gradient(100deg, rgba(5, 8, 22, 0.9) 0%, rgba(5, 8, 22, 0.46) 34%, rgba(5, 8, 22, 0.14) 48%, transparent 60%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-32 z-[7] bg-gradient-to-t from-[#050816] to-transparent" />
    </div>
  );
};

export default HeroPlanetarySystem;
