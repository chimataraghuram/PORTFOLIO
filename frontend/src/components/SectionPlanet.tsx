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

/**
 * SectionPlanet:
 * True 3D realistic planet sphere with continuous seamless axial rotation,
 * cylindrical horizon wrapping, optical terminator lighting, atmospheric corona,
 * and smooth proximity expansion (enlarges as user arrives at section center,
 * then gently recedes as user scrolls away).
 */
export const SectionPlanet: React.FC<SectionPlanetProps> = ({
  texture,
  glow = 'rgba(56, 189, 248, 0.45)',
  shade = 'rgba(8, 47, 73, 0.7)',
  side = 'left',
  rotateDirection = 1,
  rotateDuration = 40,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the section to smoothly expand/contract the planet
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scale: starts at 0.75, expands to 1.35x when centered in viewport, smoothly recedes back to 0.75
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.8, 1.05, 1.35, 1.05, 0.8]
  );
  const scale = useSpring(rawScale, { stiffness: 55, damping: 22 });

  // Opacity: gently fades in as user approaches, peak clarity at center, fades out
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.35, 0.85, 1, 0.85, 0.35]
  );

  // Gentle float parallax drift
  const y = useTransform(scrollYProgress, [0, 1], [-35, 35]);

  const isLeft = side === 'left';

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 bottom-0 ${
        isLeft 
          ? 'left-1 sm:left-4 md:left-8 lg:left-12' 
          : 'right-1 sm:right-4 md:right-8 lg:right-12'
      } flex items-center justify-center z-0 pointer-events-none select-none overflow-visible`}
      aria-hidden="true"
    >
      <motion.div
        style={{ scale, opacity, y }}
        className="relative w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-88 lg:h-88 rounded-full"
      >
        {/* Subtle Ethereal Gravitational Rings (visible-not-visible faint guides) */}
        <motion.div
          className="absolute -inset-8 md:-inset-12 rounded-full border border-dashed border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -inset-4 md:-inset-6 rounded-full border border-white/8"
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        />

        {/* ── 3D Realistic Planetary Sphere ── */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{
            boxShadow: `
              inset -40px -32px 55px rgba(0,0,0,0.92),
              inset 20px 16px 32px rgba(255,255,255,0.22),
              0 0 50px ${glow}
            `,
          }}
        >
          {/* Continuous Realistic Axial Rotation (Texture sliding horizontally like true spherical spin) */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              backgroundPosition: rotateDirection === 1 ? ['0% 50%', '200% 50%'] : ['200% 50%', '0% 50%'],
            }}
            transition={{
              duration: rotateDuration,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundImage: `url(${texture})`,
              backgroundSize: '200% 100%',
              backgroundRepeat: 'repeat-x',
              filter: 'saturate(1.22) contrast(1.15)',
            }}
          />

          {/* 3D Realistic Optical Terminator Shadow (Light source from top-left, night-side falloff) */}
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 28% 26%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 28%, transparent 50%),
                radial-gradient(circle at 76% 76%, ${shade} 0%, rgba(0,0,0,0.96) 88%)
              `,
              mixBlendMode: 'multiply',
            }}
          />

          {/* Spherical Rim Specular Highlight */}
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle at 25% 24%, rgba(255,255,255,0.25) 0%, transparent 40%)`,
            }}
          />
        </div>

        {/* Delicate Atmospheric Rayleigh Scattering Corona */}
        <span
          className="absolute -inset-4 rounded-full blur-xl opacity-50 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glow} 0%, transparent 68%)`,
          }}
        />
      </motion.div>
    </div>
  );
};

export default React.memo(SectionPlanet);
