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
 * Photorealistic 3D planet matching the cinematic NASA/orbital reference image.
 * Features:
 * - Spherical 3D curvature with realistic limb darkening and high-contrast night-side terminator.
 * - Atmospheric purple/violet/cyan twilight haze scattering around the perimeter.
 * - Star/starlight specks scattered in the local orbit.
 * - Continuous realistic axial spin.
 * - Proximity zoom: smooth expansion as user approaches the section, slowly receding as user scrolls past.
 * - Completely removed any distracting track/orbit lines.
 */
export const SectionPlanet: React.FC<SectionPlanetProps> = ({
  texture,
  glow = 'rgba(168, 85, 247, 0.45)',
  shade = 'rgba(10, 5, 25, 0.95)',
  side = 'left',
  rotateDirection = 1,
  rotateDuration = 45,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the section to smoothly expand/contract the planet
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scale: smooth cinematic zoom (0.85 -> 1.35x when centered in viewport, slowly receding)
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.85, 1.1, 1.35, 1.1, 0.85]
  );
  const scale = useSpring(rawScale, { stiffness: 50, damping: 24 });

  // Opacity: starts visible, reaches full brilliance when centered
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.45, 0.88, 1, 0.88, 0.45]
  );

  // Gentle float parallax drift
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

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
        className="relative w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full"
      >
        {/* Subtle Ambient Starlight Specks (like reference image with delicate colored stars) */}
        <div className="absolute -inset-10 pointer-events-none">
          <div className="absolute top-[8%] left-[22%] w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8] opacity-80" />
          <div className="absolute top-[18%] right-[14%] w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_6px_#f59e0b] opacity-75" />
          <div className="absolute bottom-[22%] right-[8%] w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] opacity-85" />
          <div className="absolute bottom-[30%] left-[10%] w-1 h-1 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc] opacity-80" />
          <div className="absolute top-[45%] right-[2%] w-1 h-1 rounded-full bg-orange-400 shadow-[0_0_6px_#fb923c] opacity-75" />
        </div>

        {/* ── 3D Realistic Planetary Sphere ── */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{
            boxShadow: `
              inset -45px -38px 65px rgba(0,0,0,0.98),
              inset 24px 18px 36px rgba(255,255,255,0.22),
              0 0 70px ${glow}
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
              filter: 'saturate(1.25) contrast(1.2)',
            }}
          />

          {/* 3D Realistic Optical Terminator Shadow (Matches Reference Image) */}
          {/* Highlights upper-left illuminated hemisphere and casts a deep cinematic shadow across lower-right */}
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 26% 24%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.06) 32%, transparent 55%),
                radial-gradient(circle at 78% 78%, ${shade} 0%, rgba(0,0,0,0.98) 85%)
              `,
              mixBlendMode: 'multiply',
            }}
          />

          {/* Specular Rim / Fresnel Glow Highlight */}
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle at 24% 22%, rgba(255,255,255,0.3) 0%, transparent 42%)`,
            }}
          />
        </div>

        {/* Atmospheric Rayleigh Scattering Twilight Rim (Identical to the subtle purple/violet twilight aura in reference) */}
        <span
          className="absolute -inset-4 rounded-full blur-2xl opacity-60 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glow} 0%, rgba(88, 28, 135, 0.35) 45%, transparent 72%)`,
          }}
        />
        <span
          className="absolute -inset-1 rounded-full border border-purple-400/20 blur-[1px] pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

export default React.memo(SectionPlanet);
