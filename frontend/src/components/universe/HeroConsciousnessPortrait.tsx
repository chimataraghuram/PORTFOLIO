import React from 'react';
import { motion } from 'framer-motion';

interface HeroConsciousnessPortraitProps {
  isMobile: boolean;
}

/**
 * Portrait embedded in the neural universe — not a floating card.
 */
const HeroConsciousnessPortrait: React.FC<HeroConsciousnessPortraitProps> = ({ isMobile }) => {
  return (
    <div
      className={`relative mx-auto md:ml-auto md:mr-0 ${
        isMobile ? 'w-52 sm:w-60' : 'w-full max-w-[260px] lg:max-w-[300px]'
      } aspect-[4/5]`}
    >
      {/* Outer atmospheric bloom */}
      <motion.div
        className="absolute inset-[-25%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(34, 211, 238, 0.2) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ opacity: [0.5, 0.75, 0.5], scale: [1, 1.03, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      {/* Directional key light */}
      <div
        className="absolute inset-[-8%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 90% at 30% 20%, rgba(56, 189, 248, 0.12) 0%, transparent 50%)',
        }}
        aria-hidden
      />

      {/* Portrait — soft mask, no card frame */}
      <div className="relative w-full h-full">
        <div
          className="relative w-full h-full overflow-visible"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse 88% 92% at 50% 42%, black 55%, rgba(0,0,0,0.6) 75%, transparent 92%)',
            maskImage:
              'radial-gradient(ellipse 88% 92% at 50% 42%, black 55%, rgba(0,0,0,0.6) 75%, transparent 92%)',
          }}
        >
          <img
            src="/profile.jpg"
            alt="Chimata Raghuram"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-[1.015]"
            style={{
              objectPosition: 'center top',
              filter: 'contrast(1.05) brightness(0.95) saturate(0.85)',
            }}
          />
        </div>

        {/* Edge atmospheric bleed */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 50% 35%, rgba(34, 211, 238, 0.15) 0%, transparent 55%)',
          }}
          aria-hidden
        />

        {/* Bottom dissolve into universe */}
        <div
          className="absolute inset-x-[-5%] bottom-[-5%] h-[45%] pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(5, 8, 22, 0.95) 0%, rgba(5, 8, 22, 0.4) 40%, transparent 100%)',
          }}
          aria-hidden
        />

        {/* Side fog integration */}
        <div
          className="absolute inset-y-0 left-[-15%] w-[30%] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(5, 8, 22, 0.6) 0%, transparent 100%)',
          }}
          aria-hidden
        />
        <div
          className="absolute inset-y-0 right-[-15%] w-[30%] pointer-events-none"
          style={{
            background:
              'linear-gradient(270deg, rgba(5, 8, 22, 0.5) 0%, transparent 100%)',
          }}
          aria-hidden
        />
      </div>

      {/* Subtle neural ring — intelligence halo, not a border */}
      <motion.div
        className="absolute inset-[-4%] rounded-full pointer-events-none opacity-30"
        style={{
          border: '1px solid rgba(34, 211, 238, 0.15)',
          boxShadow: '0 0 60px rgba(6, 182, 212, 0.08), inset 0 0 40px rgba(139, 92, 246, 0.05)',
        }}
        animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.01, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
    </div>
  );
};

export default HeroConsciousnessPortrait;
