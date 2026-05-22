import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';

export interface HeroMouse {
  x: number;
  y: number;
  active: boolean;
}

interface HeroPlanetarySystemProps {
  mouse: HeroMouse;
  isMobile?: boolean;
}

type PlanetId = 'ice' | 'gas' | 'ai' | 'singularity';

interface PlanetTheme {
  id: PlanetId;
  label: string;
  sceneLight: string;
  fogTint: string;
  particleTint: string;
}

const PLANET_CYCLE: PlanetId[] = ['ice', 'gas', 'ai', 'singularity'];
const DISPLAY_MS = 14000;
const TRANSITION_MS = 4500;

const THEMES: Record<PlanetId, PlanetTheme> = {
  ice: {
    id: 'ice',
    label: 'Ice',
    sceneLight:
      'radial-gradient(ellipse 80% 70% at 72% 45%, rgba(34, 211, 238, 0.22) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
    fogTint: 'rgba(34, 211, 238, 0.08)',
    particleTint: '#67e8f9',
  },
  gas: {
    id: 'gas',
    label: 'Gas Giant',
    sceneLight:
      'radial-gradient(ellipse 85% 75% at 70% 48%, rgba(139, 92, 246, 0.24) 0%, rgba(99, 102, 241, 0.12) 45%, transparent 72%)',
    fogTint: 'rgba(139, 92, 246, 0.1)',
    particleTint: '#a78bfa',
  },
  ai: {
    id: 'ai',
    label: 'AI World',
    sceneLight:
      'radial-gradient(ellipse 80% 70% at 74% 46%, rgba(56, 189, 248, 0.1) 0%, rgba(99, 102, 241, 0.12) 50%, transparent 72%)',
    fogTint: 'rgba(99, 102, 241, 0.09)',
    particleTint: '#38bdf8',
  },
  singularity: {
    id: 'singularity',
    label: 'Singularity',
    sceneLight:
      'radial-gradient(ellipse 75% 65% at 68% 50%, rgba(88, 28, 135, 0.1) 0%, rgba(30, 27, 75, 0.15) 35%, transparent 68%)',
    fogTint: 'rgba(88, 28, 135, 0.08)',
    particleTint: '#818cf8',
  },
};

/* ── Individual cinematic worlds ── */

const IcePlanet = () => (
  <div className="relative w-full h-full rounded-full overflow-hidden">
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background: `
          radial-gradient(circle at 32% 28%, rgba(224, 242, 254, 0.35) 0%, transparent 22%),
          radial-gradient(circle at 58% 62%, rgba(34, 211, 238, 0.2) 0%, transparent 35%),
          radial-gradient(circle at 48% 52%, rgba(56, 189, 248, 0.35) 0%, rgba(30, 64, 175, 0.55) 45%, rgba(15, 23, 42, 0.75) 72%, rgba(3, 7, 18, 0.95) 100%)
        `,
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 240, repeat: Infinity, ease: 'linear' }}
    />
    <div
      className="absolute inset-0 rounded-full opacity-40"
      style={{
        background:
          'radial-gradient(ellipse 120% 40% at 50% 0%, rgba(186, 230, 253, 0.25) 0%, transparent 55%)',
      }}
    />
    <motion.div
      className="absolute inset-[8%] rounded-full opacity-30"
      style={{
        boxShadow: 'inset -40px -20px 80px rgba(34, 211, 238, 0.15)',
        background:
          'radial-gradient(circle at 70% 40%, transparent 50%, rgba(6, 182, 212, 0.08) 100%)',
      }}
      animate={{ opacity: [0.25, 0.4, 0.25] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

const GasGiantPlanet = () => (
  <div className="relative w-full h-full rounded-[50%] overflow-hidden">
    <motion.div
      className="absolute inset-[-10%] w-[120%] h-[120%]"
      style={{
        background: `
          repeating-linear-gradient(
            0deg,
            rgba(30, 27, 75, 0.9) 0px,
            rgba(67, 56, 202, 0.5) 28px,
            rgba(139, 92, 246, 0.35) 56px,
            rgba(49, 46, 129, 0.7) 84px,
            rgba(88, 28, 135, 0.45) 112px,
            rgba(30, 27, 75, 0.85) 140px
          )
        `,
      }}
      animate={{ y: ['0%', '-8%'] }}
      transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
    />
    <div
      className="absolute inset-0 rounded-[50%]"
      style={{
        background:
          'radial-gradient(ellipse 90% 85% at 38% 42%, rgba(167, 139, 250, 0.2) 0%, transparent 50%), radial-gradient(circle at 55% 55%, rgba(15, 23, 42, 0.3) 0%, rgba(3, 7, 18, 0.95) 75%)',
      }}
    />
    <motion.div
      className="absolute w-[28%] h-[18%] left-[22%] top-[38%] rounded-full blur-xl opacity-50"
      style={{ background: 'radial-gradient(circle, rgba(76, 29, 149, 0.6) 0%, transparent 70%)' }}
      animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.55, 0.4] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div
      className="absolute inset-0 rounded-[50%] opacity-50"
      style={{
        background:
          'radial-gradient(ellipse 100% 50% at 50% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
      }}
    />
  </div>
);

const AIPlanet = () => (
  <div className="relative w-full h-full rounded-full overflow-hidden">
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background:
          'radial-gradient(circle at 45% 40%, rgba(56, 189, 248, 0.18) 0%, rgba(30, 58, 138, 0.4) 40%, rgba(15, 23, 42, 0.9) 68%, rgba(3, 7, 18, 1) 100%)',
      }}
    />
    <svg className="absolute inset-0 w-full h-full opacity-[0.22]" viewBox="0 0 100 100">
      {[...Array(8)].map((_, row) =>
        [...Array(8)].map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={12 + col * 11}
            cy={12 + row * 11}
            r="0.35"
            fill="#38bdf8"
            opacity={0.3 + ((row + col) % 3) * 0.15}
          />
        ))
      )}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={`h${i}`}
          x1="8"
          y1={15 + i * 12}
          x2="92"
          y2={15 + i * 12}
          stroke="url(#ai-grid)"
          strokeWidth="0.08"
          opacity="0.35"
        />
      ))}
      <defs>
        <linearGradient id="ai-grid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
    <motion.div
      className="absolute inset-x-[10%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
      animate={{ top: ['15%', '85%', '15%'] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 55%)',
      }}
      animate={{ opacity: [0.3, 0.55, 0.3] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

const SingularityPlanet = () => (
  <div className="relative w-full h-full rounded-full overflow-hidden">
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background:
          'radial-gradient(circle at 48% 48%, rgba(25, 15, 45, 1) 0%, rgba(8, 6, 22, 1) 50%, rgba(30, 27, 75, 0.6) 78%, rgba(15, 10, 35, 0.9) 100%)',
      }}
    />
    <motion.div
      className="absolute inset-[-5%] rounded-full opacity-60"
      style={{
        background:
          'conic-gradient(from 0deg, transparent 0deg, rgba(139, 92, 246, 0.25) 40deg, rgba(34, 211, 238, 0.15) 80deg, transparent 120deg, rgba(88, 28, 135, 0.2) 200deg, transparent 280deg)',
        filter: 'blur(8px)',
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
    />
    <div
      className="absolute inset-[18%] rounded-full"
      style={{
        boxShadow:
          '0 0 80px rgba(88, 28, 135, 0.2), inset 0 0 60px rgba(0, 0, 0, 0.9)',
        background:
          'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(15, 10, 35, 0.95) 70%, transparent 100%)',
      }}
    />
    <motion.div
      className="absolute inset-[5%] rounded-full opacity-25"
      style={{
        background:
          'radial-gradient(ellipse at 60% 35%, rgba(129, 140, 248, 0.15) 0%, transparent 45%)',
      }}
      animate={{ opacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

const PLANET_VIEWS: Record<PlanetId, React.FC> = {
  ice: IcePlanet,
  gas: GasGiantPlanet,
  ai: AIPlanet,
  singularity: SingularityPlanet,
};

/* ── Foreground particle drift ── */
const HeroParticles: React.FC<{ tint: string; mouse: HeroMouse }> = ({ tint, mouse }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      phase: Math.random() * Math.PI * 2,
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
      const anchorX = w * (mouse.active ? 0.72 : 0.75);
      const anchorY = h * 0.48;

      particles.forEach((p) => {
        let px = p.x * w + Math.sin(t * 0.2 + p.phase) * 12;
        let py = p.y * h + Math.cos(t * 0.18 + p.phase) * 10;
        if (mouse.active) {
          px += (mouse.x - anchorX) * p.z * 0.015;
          py += (mouse.y - anchorY) * p.z * 0.015;
        }
        const nearText = px < w * 0.45;
        const alpha = nearText ? 0.08 : 0.15 + p.z * 0.2;
        ctx.beginPath();
        ctx.arc(px, py, 0.6 + p.z, 0, Math.PI * 2);
        ctx.fillStyle = tint;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 4;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[4]" />;
};

/**
 * Cinematic dynamic planetary system — one massive world at a time.
 */
const HeroPlanetarySystem: React.FC<HeroPlanetarySystemProps> = ({ mouse, isMobile = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activePlanet = PLANET_CYCLE[activeIndex];
  const theme = THEMES[activePlanet];
  const PlanetView = PLANET_VIEWS[activePlanet];

  const parallaxX = useSpring(mouse.active ? (mouse.x - 400) * 0.012 : 0, { stiffness: 45, damping: 26 });
  const parallaxY = useSpring(mouse.active ? (mouse.y - 280) * 0.012 : 0, { stiffness: 45, damping: 26 });
  const parallaxFarX = useTransform(parallaxX, (v) => v * 0.4);
  const parallaxFarY = useTransform(parallaxY, (v) => v * 0.4);

  const advancePlanet = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((i) => (i + 1) % PLANET_CYCLE.length);
      setTimeout(() => setIsTransitioning(false), TRANSITION_MS * 0.6);
    }, TRANSITION_MS * 0.35);
  }, []);

  useEffect(() => {
    const interval = setInterval(advancePlanet, DISPLAY_MS);
    return () => clearInterval(interval);
  }, [advancePlanet]);

  const planetPosition = isMobile
    ? 'top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2'
    : 'top-1/2 right-[-6%] md:right-[-10%] lg:right-[-12%] -translate-y-1/2';

  const planetSize = isMobile
    ? 'w-[min(88vw,420px)] h-[min(88vw,420px)]'
    : 'w-[min(72vmin,680px)] h-[min(72vmin,680px)]';

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none isolate" aria-hidden>
      {/* Deep space base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#0a0f1e] to-[#050816]" />

      {/* Scene lighting — shifts with active planet */}
      <motion.div
        className="absolute inset-0 z-[1] transition-all duration-[4500ms] ease-in-out"
        style={{ background: theme.sceneLight }}
        key={`light-${activePlanet}`}
      />

      {/* Mid-depth fog */}
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{ x: parallaxFarX, y: parallaxFarY }}
        animate={{ opacity: isTransitioning ? 0.7 : 0.45 }}
        transition={{ duration: 4.5 }}
      >
        <div
          className="absolute top-[20%] right-[0%] w-[80%] h-[70%] blur-[100px] rounded-full"
          style={{ background: `radial-gradient(ellipse, ${theme.fogTint} 0%, transparent 65%)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/75 via-[#050816]/25 to-transparent" />
      </motion.div>

      {/* Transition dissolve fog */}
      <motion.div
        className="absolute inset-0 z-[3] bg-[#050816]/0"
        animate={{ opacity: isTransitioning ? 0.55 : 0 }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(5, 8, 22, 0.5) 0%, transparent 70%)',
        }}
      />

      {/* Massive planetary body */}
      <motion.div
        className={`absolute z-[3] ${planetPosition} ${planetSize}`}
        style={{ x: parallaxX, y: parallaxY }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlanet}
            className="relative w-full h-full"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(16px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(20px)' }}
            transition={{ duration: TRANSITION_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
          >
            <PlanetView />
            {/* Soft edge blend — keep planet body visible */}
            <div
              className="absolute inset-[-4%] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, transparent 62%, rgba(5, 8, 22, 0.25) 82%, rgba(5, 8, 22, 0.55) 96%)',
              }}
            />
            {/* Planet limb glow */}
            <div
              className="absolute inset-[-6%] rounded-full pointer-events-none opacity-80"
              style={{
                boxShadow: '0 0 100px 35px rgba(34, 211, 238, 0.18), 0 0 160px 60px rgba(139, 92, 246, 0.12)',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Foreground volumetric haze */}
      <div
        className="absolute inset-0 z-[3] opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 72% 48%, transparent 25%, rgba(5, 8, 22, 0.35) 100%)',
        }}
      />

      <HeroParticles tint={theme.particleTint} mouse={mouse} />

      {/* Content readability shield — only darkens left/text side */}
      <div
        className="absolute inset-0 z-[5]"
        style={{
          background:
            'linear-gradient(100deg, rgba(5, 8, 22, 0.82) 0%, rgba(5, 8, 22, 0.35) 38%, transparent 58%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-36 z-[6] bg-gradient-to-t from-[#050816] to-transparent" />
    </div>
  );
};

export default HeroPlanetarySystem;
