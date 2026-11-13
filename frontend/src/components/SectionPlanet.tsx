import React from 'react';
import { motion } from 'framer-motion';

export interface SectionPlanetProps {
  texture: string;
  size?: string;
  glow?: string;
  shade?: string;
  position?: 'left' | 'right' | 'top-left' | 'top-right' | 'center-right' | 'center-left';
  alignOffset?: string;
  rotateDirection?: 1 | -1;
  rotateDuration?: number;
  mobileHidden?: boolean;
}

const POSITION_STYLES: Record<string, { container: string; defaultSize: string }> = {
  'left': {
    container: 'left-[-40px] sm:left-[-60px] md:left-[-70px] lg:left-[-90px] top-[18%]',
    defaultSize: 'w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72',
  },
  'right': {
    container: 'right-[-40px] sm:right-[-60px] md:right-[-70px] lg:right-[-90px] top-[18%]',
    defaultSize: 'w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72',
  },
  'top-left': {
    container: 'left-[-30px] sm:left-[-50px] md:left-[-60px] top-[8%]',
    defaultSize: 'w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60',
  },
  'top-right': {
    container: 'right-[-30px] sm:right-[-50px] md:right-[-60px] top-[8%]',
    defaultSize: 'w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60',
  },
  'center-left': {
    container: 'left-[-45px] sm:left-[-65px] md:left-[-80px] top-[45%]',
    defaultSize: 'w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64',
  },
  'center-right': {
    container: 'right-[-45px] sm:right-[-65px] md:right-[-80px] top-[45%]',
    defaultSize: 'w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64',
  },
};

export const SectionPlanet: React.FC<SectionPlanetProps> = ({
  texture,
  size,
  glow = 'rgba(56, 189, 248, 0.4)',
  shade = 'rgba(8, 47, 73, 0.55)',
  position = 'right',
  alignOffset = '',
  rotateDirection = 1,
  rotateDuration = 45,
  mobileHidden = false,
}) => {
  const posConfig = POSITION_STYLES[position] || POSITION_STYLES.right;
  const sizeClasses = size || posConfig.defaultSize;

  return (
    <div
      className={`absolute ${posConfig.container} ${alignOffset} z-0 pointer-events-none select-none overflow-visible ${
        mobileHidden ? 'hidden sm:block' : 'block'
      }`}
      aria-hidden="true"
    >
      <motion.div
        className={`relative ${sizeClasses} rounded-full`}
        style={{
          backgroundImage: `url(${texture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(1.15) contrast(1.12)',
          boxShadow: `inset -28px -22px 42px rgba(0,0,0,0.85), inset 14px 10px 22px rgba(255,255,255,0.18), 0 0 50px ${glow}`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Continuous Slow Orbital Rotation */}
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
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 28%, rgba(255,255,255,0.3) 0%, transparent 40%), radial-gradient(circle at 75% 75%, ${shade} 0%, rgba(0,0,0,0.92) 90%)`,
          }}
        />

        {/* Outer Atmospheric Coronal Glow Ring */}
        <span
          className="absolute -inset-3 rounded-full blur-md opacity-60"
          style={{
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  );
};

export default React.memo(SectionPlanet);
