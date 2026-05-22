import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
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

    const count = window.innerWidth < 768 ? 55 : 100;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      size: 0.4 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.3,
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

        const nearPlanet = px > w * 0.55;
        const nearText = px < w * 0.42;
        let alpha = nearText ? 0.06 : 0.2 + p.z * 0.35;
        if (nearPlanet) alpha *= 1.3;

        ctx.beginPath();
        ctx.arc(px, py, p.size * (0.8 + p.z * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = tint;
        ctx.globalAlpha = Math.min(alpha, 0.85);
        ctx.shadowBlur = nearPlanet ? 6 : 3;
        ctx.shadowColor = tint;
        ctx.fill();
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[5] pointer-events-none" />;
};

const HeroPlanetarySystem: React.FC<HeroPlanetarySystemProps> = ({ mouse, isMobile = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activePlanet = PLANET_CYCLE[activeIndex];
  const theme = THEMES[activePlanet];

  const parallaxX = useSpring(mouse.active ? (mouse.x - 400) * 0.006 : 0, { stiffness: 40, damping: 28 });
  const parallaxY = useSpring(mouse.active ? (mouse.y - 280) * 0.006 : 0, { stiffness: 40, damping: 28 });
  const parallaxFarX = useTransform(parallaxX, (v) => v * 0.5);
  const parallaxFarY = useTransform(parallaxY, (v) => v * 0.5);

  const advancePlanet = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((i) => (i + 1) % PLANET_CYCLE.length);
      setTimeout(() => setIsTransitioning(false), TRANSITION_MS * 0.5);
    }, TRANSITION_MS * 0.4);
  }, []);

  useEffect(() => {
    const interval = setInterval(advancePlanet, DISPLAY_MS);
    return () => clearInterval(interval);
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

      {/* 3D textured planet + star particles (Three.js) */}
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{ x: parallaxFarX, y: parallaxFarY }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlanet}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0.3 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_MS / 1000, ease: 'easeInOut' }}
          >
            <HeroTexturedPlanet planetId={activePlanet} isMobile={isMobile} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Atmospheric fog */}
      <motion.div
        className="absolute inset-0 z-[3]"
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
        className="absolute inset-0 z-[4] pointer-events-none"
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
        className="absolute inset-0 z-[4] bg-[#050816]"
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
            'linear-gradient(100deg, rgba(5, 8, 22, 0.88) 0%, rgba(5, 8, 22, 0.35) 40%, transparent 56%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-32 z-[7] bg-gradient-to-t from-[#050816] to-transparent" />
    </div>
  );
};

export default HeroPlanetarySystem;
