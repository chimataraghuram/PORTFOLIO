import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
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

    const count = window.innerWidth < 768 ? 40 : 170;
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
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

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
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
    };
  }, [tint, mouse]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[7] pointer-events-none" />;
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
      settleTimeoutRef.current = window.setTimeout(() => setIsTransitioning(false), 200); // Wait a tiny bit for texture swap then fade back in
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


      {/* 3D textured planet + star particles (Three.js) */}
      <motion.div
        className="absolute inset-0 z-[3]"
      >
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

      {/* Planet clip mask — partial visibility, embed in universe */}
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



      {/* Canvas particle layer */}
      <HeroParticleField tint={theme.particleTint} mouse={mouse} />

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
