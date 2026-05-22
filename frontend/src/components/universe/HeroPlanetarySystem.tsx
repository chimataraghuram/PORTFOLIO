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

type PlanetId = 'gas' | 'ice' | 'ai' | 'singularity';

interface PlanetTheme {
  id: PlanetId;
  sceneLight: string;
  fogTint: string;
  particleTint: string;
  rimColor: string;
}

const PLANET_CYCLE: PlanetId[] = ['gas', 'ice', 'ai', 'singularity'];
const DISPLAY_MS = 16000;
const TRANSITION_MS = 5000;

const LIGHT = { x: '22%', y: '32%' };

const THEMES: Record<PlanetId, PlanetTheme> = {
  gas: {
    id: 'gas',
    sceneLight:
      'radial-gradient(ellipse 55% 50% at 78% 46%, rgba(99, 102, 241, 0.14) 0%, transparent 65%)',
    fogTint: 'rgba(99, 102, 241, 0.06)',
    particleTint: '#a78bfa',
    rimColor: 'rgba(34, 211, 238, 0.55)',
  },
  ice: {
    id: 'ice',
    sceneLight:
      'radial-gradient(ellipse 55% 50% at 78% 46%, rgba(34, 211, 238, 0.12) 0%, transparent 65%)',
    fogTint: 'rgba(34, 211, 238, 0.05)',
    particleTint: '#67e8f9',
    rimColor: 'rgba(103, 232, 249, 0.5)',
  },
  ai: {
    id: 'ai',
    sceneLight:
      'radial-gradient(ellipse 55% 50% at 78% 46%, rgba(56, 189, 248, 0.1) 0%, transparent 65%)',
    fogTint: 'rgba(99, 102, 241, 0.05)',
    particleTint: '#38bdf8',
    rimColor: 'rgba(56, 189, 248, 0.45)',
  },
  singularity: {
    id: 'singularity',
    sceneLight:
      'radial-gradient(ellipse 55% 50% at 78% 46%, rgba(88, 28, 135, 0.1) 0%, transparent 65%)',
    fogTint: 'rgba(88, 28, 135, 0.05)',
    particleTint: '#818cf8',
    rimColor: 'rgba(129, 140, 248, 0.4)',
  },
};

/** Shared spherical body: directional light, shadow terminator, thin rim */
const SphereBody: React.FC<{
  children: React.ReactNode;
  rimColor: string;
}> = ({ children, rimColor }) => (
  <div className="relative w-full h-full rounded-full overflow-hidden bg-[#030508]">
    {children}

    {/* Spherical base shading — light from upper-left */}
    <div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        background: `
          radial-gradient(circle at ${LIGHT.x} ${LIGHT.y},
            rgba(186, 198, 255, 0.12) 0%,
            transparent 28%),
          radial-gradient(circle at 72% 68%,
            rgba(0, 0, 0, 0.92) 0%,
            rgba(0, 0, 0, 0.7) 35%,
            transparent 62%),
          radial-gradient(ellipse 105% 100% at 50% 50%,
            transparent 42%,
            rgba(5, 8, 22, 0.55) 78%,
            rgba(0, 0, 0, 0.85) 100%)
        `,
      }}
    />

    {/* Terminator — shadow hemisphere */}
    <div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle at 78% 58%,
          rgba(0, 0, 0, 0.15) 0%,
          rgba(0, 0, 0, 0.55) 38%,
          rgba(0, 0, 0, 0.88) 58%,
          rgba(0, 0, 0, 0.97) 100%)`,
      }}
    />

    {/* Thin atmospheric rim — lit limb only */}
    <div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle at 14% 42%,
          ${rimColor} 0%,
          rgba(139, 92, 246, 0.2) 6%,
          transparent 14%)`,
        WebkitMaskImage:
          'radial-gradient(circle at 50% 50%, transparent 46.5%, black 47.8%, black 49.2%, transparent 50.5%)',
        maskImage:
          'radial-gradient(circle at 50% 50%, transparent 46.5%, black 47.8%, black 49.2%, transparent 50.5%)',
      }}
    />
  </div>
);

const GasGiantPlanet: React.FC<{ rimColor: string }> = ({ rimColor }) => (
  <SphereBody rimColor={rimColor}>
    {/* Base body color */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: `radial-gradient(circle at ${LIGHT.x} ${LIGHT.y},
          rgba(129, 140, 248, 0.55) 0%,
          rgba(79, 70, 229, 0.5) 18%,
          rgba(67, 56, 202, 0.65) 32%,
          rgba(49, 46, 129, 0.85) 48%,
          rgba(30, 27, 75, 0.95) 62%,
          rgba(12, 10, 28, 1) 78%)`,
      }}
    />
    {/* Atmospheric bands */}
    <motion.div
      className="absolute inset-[-5%] w-[110%] opacity-70"
      style={{
        background: `
          repeating-linear-gradient(
            183deg,
            transparent 0px,
            rgba(30, 27, 75, 0.4) 18px,
            rgba(99, 102, 241, 0.35) 36px,
            rgba(139, 92, 246, 0.25) 54px,
            rgba(67, 56, 202, 0.45) 72px,
            rgba(49, 46, 129, 0.5) 90px,
            transparent 108px
          )
        `,
      }}
      animate={{ y: ['0%', '-6%'] }}
      transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
    />
    {/* Storm system */}
    <div
      className="absolute w-[22%] h-[14%] left-[28%] top-[44%] rounded-full opacity-50"
      style={{
        background:
          'radial-gradient(ellipse, rgba(76, 29, 149, 0.7) 0%, rgba(49, 46, 129, 0.3) 50%, transparent 75%)',
        filter: 'blur(6px)',
      }}
    />
    <motion.div
      className="absolute w-[14%] h-[9%] left-[34%] top-[48%] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(30, 27, 75, 0.8) 0%, transparent 70%)',
        filter: 'blur(4px)',
      }}
      animate={{ opacity: [0.4, 0.65, 0.4] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
    />
  </SphereBody>
);

const IcePlanet: React.FC<{ rimColor: string }> = ({ rimColor }) => (
  <SphereBody rimColor={rimColor}>
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: `radial-gradient(circle at ${LIGHT.x} ${LIGHT.y},
          rgba(186, 230, 253, 0.45) 0%,
          rgba(56, 189, 248, 0.35) 20%,
          rgba(30, 64, 175, 0.55) 40%,
          rgba(15, 23, 42, 0.9) 65%,
          rgba(3, 7, 18, 1) 82%)`,
      }}
    />
    <div
      className="absolute inset-0 opacity-35"
      style={{
        background:
          'radial-gradient(ellipse 90% 35% at 35% 18%, rgba(224, 242, 254, 0.35) 0%, transparent 60%)',
      }}
    />
    <motion.div
      className="absolute inset-0 opacity-25"
      style={{
        background:
          'repeating-linear-gradient(175deg, transparent, rgba(34, 211, 238, 0.08) 40px, transparent 80px)',
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 300, repeat: Infinity, ease: 'linear' }}
    />
  </SphereBody>
);

const AIPlanet: React.FC<{ rimColor: string }> = ({ rimColor }) => (
  <SphereBody rimColor={rimColor}>
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: `radial-gradient(circle at ${LIGHT.x} ${LIGHT.y},
          rgba(56, 189, 248, 0.35) 0%,
          rgba(99, 102, 241, 0.4) 25%,
          rgba(30, 58, 138, 0.75) 50%,
          rgba(8, 10, 24, 1) 78%)`,
      }}
    />
    <svg className="absolute inset-0 w-full h-full opacity-[0.18]" viewBox="0 0 100 100">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse
          key={i}
          cx="50"
          cy={18 + i * 13}
          rx="38"
          ry="1.2"
          fill="none"
          stroke="rgba(56, 189, 248, 0.25)"
          strokeWidth="0.15"
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`v${i}`}
          x1={20 + i * 15}
          y1="12"
          x2={25 + i * 14}
          y2="88"
          stroke="rgba(99, 102, 241, 0.15)"
          strokeWidth="0.1"
        />
      ))}
    </svg>
    <motion.div
      className="absolute inset-x-[15%] h-[1px] bg-cyan-400/30"
      animate={{ top: ['20%', '75%', '20%'] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
    />
  </SphereBody>
);

const SingularityPlanet: React.FC<{ rimColor: string }> = ({ rimColor }) => (
  <SphereBody rimColor={rimColor}>
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: `radial-gradient(circle at ${LIGHT.x} ${LIGHT.y},
          rgba(55, 48, 120, 0.5) 0%,
          rgba(25, 15, 45, 0.9) 30%,
          rgba(8, 6, 20, 1) 55%,
          rgba(0, 0, 0, 1) 75%)`,
      }}
    />
    <motion.div
      className="absolute inset-[6%] rounded-full opacity-40"
      style={{
        background:
          'conic-gradient(from 200deg, transparent, rgba(139, 92, 246, 0.2), transparent, rgba(34, 211, 238, 0.12), transparent)',
        filter: 'blur(4px)',
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
    />
  </SphereBody>
);

const PLANET_RENDERERS: Record<PlanetId, React.FC<{ rimColor: string }>> = {
  gas: GasGiantPlanet,
  ice: IcePlanet,
  ai: AIPlanet,
  singularity: SingularityPlanet,
};

/* ── Depth layers ── */
const DistantStars = () => (
  <div
    className="absolute inset-0 opacity-30"
    style={{
      backgroundImage:
        'radial-gradient(1px 1px at 10% 20%, #fff, transparent), radial-gradient(1px 1px at 85% 15%, #fff, transparent), radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.6), transparent), radial-gradient(1px 1px at 30% 70%, #fff, transparent)',
      backgroundSize: '240px 240px',
    }}
  />
);

const HeroParticles: React.FC<{ tint: string; mouse: HeroMouse }> = ({ tint, mouse }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const particles = Array.from({ length: 20 }, () => ({
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
      particles.forEach((p) => {
        let px = p.x * w + Math.sin(t * 0.15 + p.phase) * 8;
        let py = p.y * h + Math.cos(t * 0.12 + p.phase) * 6;
        if (mouse.active) {
          px += (mouse.x - w * 0.75) * p.z * 0.01;
          py += (mouse.y - h * 0.5) * p.z * 0.01;
        }
        const dim = px < w * 0.5 ? 0.06 : 0.12 + p.z * 0.15;
        ctx.beginPath();
        ctx.arc(px, py, 0.5 + p.z * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = tint;
        ctx.globalAlpha = dim;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [tint, mouse]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[6]" />;
};

const HeroPlanetarySystem: React.FC<HeroPlanetarySystemProps> = ({ mouse, isMobile = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activePlanet = PLANET_CYCLE[activeIndex];
  const theme = THEMES[activePlanet];
  const PlanetRenderer = PLANET_RENDERERS[activePlanet];

  const parallaxX = useSpring(mouse.active ? (mouse.x - 400) * 0.008 : 0, { stiffness: 40, damping: 28 });
  const parallaxY = useSpring(mouse.active ? (mouse.y - 280) * 0.008 : 0, { stiffness: 40, damping: 28 });
  const parallaxFarX = useTransform(parallaxX, (v) => v * 0.35);
  const parallaxFarY = useTransform(parallaxY, (v) => v * 0.35);

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

  /* ~30% of sphere visible — majority off-screen right */
  const planetClipClass = isMobile
    ? 'top-[36%] left-[72%] -translate-x-1/2 -translate-y-1/2'
    : 'top-1/2 left-[88%] md:left-[92%] -translate-x-1/2 -translate-y-1/2';

  const planetDiameter = isMobile
    ? 'w-[min(140vw,620px)] h-[min(140vw,620px)]'
    : 'w-[min(130vmin,1100px)] h-[min(130vmin,1100px)]';

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none isolate" aria-hidden>
      {/* BACKGROUND — deep space */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#080d1a] to-[#050816]" />
      <DistantStars />

      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ background: theme.sceneLight }}
        key={`light-${activePlanet}`}
        transition={{ duration: 5 }}
      />

      {/* MID — atmospheric fog */}
      <motion.div className="absolute inset-0 z-[2]" style={{ x: parallaxFarX, y: parallaxFarY }}>
        <div
          className="absolute top-[15%] right-0 w-[55%] h-[75%] blur-[80px] opacity-40"
          style={{
            background: `radial-gradient(ellipse, ${theme.fogTint} 0%, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Planetary body — clipped for partial visibility */}
      <div className="absolute inset-0 z-[3] overflow-hidden">
        <motion.div
          className={`absolute ${planetClipClass} ${planetDiameter}`}
          style={{ x: parallaxX, y: parallaxY }}
          animate={{ rotate: [0, 1.5, 0] }}
          transition={{ duration: 90, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlanet}
              className="relative w-full h-full"
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(24px)' }}
              transition={{ duration: TRANSITION_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
            >
              <PlanetRenderer rimColor={theme.rimColor} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Atmospheric occlusion — planet dissolves into fog on left edge */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(90deg,
                rgba(5, 8, 22, 0.95) 0%,
                rgba(5, 8, 22, 0.6) 42%,
                rgba(5, 8, 22, 0.25) 52%,
                transparent 62%),
              radial-gradient(ellipse 40% 80% at 58% 50%,
                transparent 30%,
                rgba(5, 8, 22, 0.35) 100%)
            `,
          }}
        />

        {/* Transition fog */}
        <motion.div
          className="absolute inset-0 bg-[#050816]"
          animate={{ opacity: isTransitioning ? 0.45 : 0 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
      </div>

      {/* FOREGROUND haze + particles */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 45% 55% at 68% 48%, transparent 20%, rgba(5, 8, 22, 0.25) 100%)',
        }}
      />
      <HeroParticles tint={theme.particleTint} mouse={mouse} />

      {/* Text-side shield */}
      <div
        className="absolute inset-0 z-[7]"
        style={{
          background:
            'linear-gradient(100deg, rgba(5, 8, 22, 0.9) 0%, rgba(5, 8, 22, 0.4) 36%, transparent 54%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-32 z-[8] bg-gradient-to-t from-[#050816] to-transparent" />
    </div>
  );
};

export default HeroPlanetarySystem;
