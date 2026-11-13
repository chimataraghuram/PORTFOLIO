import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export interface SectionPlanetProps {
  texture: string;
  glow?: string;
  shade?: string;
  side?: 'left' | 'right';
  rotateDirection?: 1 | -1;
  rotateDuration?: number;
}

export const SectionPlanet: React.FC<SectionPlanetProps> = ({
  texture,
  glow = 'rgba(56, 189, 248, 0.45)',
  shade = 'rgba(8, 47, 73, 0.65)',
  side = 'left',
  rotateDirection = 1,
  rotateDuration = 50,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scale: When section enters -> 0.7, when in middle (0.45 - 0.55) -> expands to 1.35 (massive, full feeling), then recedes
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.75, 1.05, 1.35, 1.05, 0.75]
  );
  const scale = useSpring(rawScale, { stiffness: 60, damping: 25 });

  // Opacity: fades in as it approaches, fully radiant at center
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.35, 0.85, 1, 0.85, 0.35]
  );

  // Parallax floating drift
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const isLeft = side === 'left';

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 bottom-0 ${
        isLeft ? 'left-[-40px] sm:left-[-60px] md:left-[-70px] lg:left-[-80px]' : 'right-[-40px] sm:right-[-60px] md:right-[-70px] lg:right-[-80px]'
      } flex items-center justify-center z-0 pointer-events-none select-none overflow-visible`}
      aria-hidden="true"
    >
      <motion.div
        style={{ scale, opacity, y }}
        className="relative w-44 h-44 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full"
      >
        {/* Pulsing Concentric Orbit Wave Rings when user travels near */}
        <motion.div
          className="absolute -inset-8 md:-inset-14 rounded-full border border-dashed border-white/20"
          animate={{ rotate: 360, scale: [0.95, 1.04, 0.95], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -inset-4 md:-inset-8 rounded-full border border-white/15"
          animate={{ rotate: -360, scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />

        {/* Orbit Beacon Dot travelling on the planet's local orbit */}
        <motion.div
          className="absolute -inset-4 md:-inset-8 rounded-full pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee] absolute -top-1 left-1/2 -translate-x-1/2" />
        </motion.div>

        {/* The 3D Rotating Planet Sphere */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(1.2) contrast(1.15)',
            boxShadow: `inset -36px -28px 50px rgba(0,0,0,0.88), inset 18px 14px 28px rgba(255,255,255,0.22), 0 0 70px ${glow}`,
          }}
        >
          {/* Continuous Realistic Slow Axial Rotation */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: rotateDirection * 360 }}
            transition={{ duration: rotateDuration, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage: `url(${texture})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* 3D Realistic Terminator Spherical Shadowing */}
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle at 30% 28%, rgba(255,255,255,0.35) 0%, transparent 40%), radial-gradient(circle at 75% 75%, ${shade} 0%, rgba(0,0,0,0.95) 90%)`,
            }}
          />
        </div>

        {/* Radiant Outer Atmospheric Haze */}
        <span
          className="absolute -inset-6 rounded-full blur-xl opacity-60 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  );
};

export default React.memo(SectionPlanet);
