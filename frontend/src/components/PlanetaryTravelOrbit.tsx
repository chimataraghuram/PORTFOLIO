import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * PlanetaryTravelOrbit:
 * Subtle, ethereal interstellar orbit flight path that snakes gracefully across sections,
 * connecting Earth, Venus, Uranus, Neptune, and Moon, and smoothly fading out before the
 * purple hole in the footer.
 *
 * Characteristics:
 * - "barely there / visible-not-visible" faint ethereal glow (opacity ~0.15 - 0.35, stroke 0.6px - 0.8px)
 * - Stops well before the footer contact section (purple hole alone)
 */
export const PlanetaryTravelOrbit: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 24 });
  
  // Drawn path smoothly tracks scroll, stopping gracefully around 0.84 (before footer)
  const pathLength = useTransform(smoothProgress, [0, 0.85, 1], [0.03, 1, 1]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 100 1000"
      >
        <defs>
          {/* Very faint, ethereal gradient that fades out before reaching footer */}
          <linearGradient id="etherealOrbitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.05" />
            <stop offset="14%" stopColor="#38bdf8" stopOpacity="0.32" />  {/* Earth */}
            <stop offset="30%" stopColor="#fb923c" stopOpacity="0.32" />  {/* Venus */}
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.35" />  {/* Uranus */}
            <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.35" />  {/* Neptune */}
            <stop offset="85%" stopColor="#e2e8f0" stopOpacity="0.25" />  {/* Moon */}
            <stop offset="90%" stopColor="#a855f7" stopOpacity="0.0" />   {/* Complete fade out before purple hole */}
          </linearGradient>

          <filter id="subtleGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Ultra-faint background orbit guide (barely discernible dotted track) */}
        <path
          d={
            isMobile
              ? "M 50,40 C 4,140 96,290 8,490 C 92,690 12,850 50,910"
              : "M 50,50 C 6,150 94,290 6,490 C 94,690 10,850 50,910"
          }
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.6"
          strokeDasharray="2 6"
        />

        {/* 2. Thin, delicate visible-not-visible active orbit line */}
        <motion.path
          d={
            isMobile
              ? "M 50,40 C 4,140 96,290 8,490 C 92,690 12,850 50,910"
              : "M 50,50 C 6,150 94,290 6,490 C 94,690 10,850 50,910"
          }
          fill="none"
          stroke="url(#etherealOrbitGradient)"
          strokeWidth={isMobile ? "0.7" : "0.9"}
          strokeLinecap="round"
          strokeDasharray="3 5"
          filter="url(#subtleGlow)"
          style={{ pathLength }}
        />

        {/* 3. Delicate Star-like Waypoints at Planet Positions (stops before contact/footer) */}
        <circle cx={isMobile ? "12" : "10"} cy="160" r="1.4" fill="#38bdf8" opacity="0.6" filter="url(#subtleGlow)" />
        <circle cx={isMobile ? "88" : "90"} cy="315" r="1.4" fill="#fb923c" opacity="0.6" filter="url(#subtleGlow)" />
        <circle cx={isMobile ? "12" : "10"} cy="515" r="1.4" fill="#2dd4bf" opacity="0.6" filter="url(#subtleGlow)" />
        <circle cx={isMobile ? "88" : "90"} cy="710" r="1.4" fill="#60a5fa" opacity="0.6" filter="url(#subtleGlow)" />
        <circle cx={isMobile ? "15" : "14"} cy="855" r="1.4" fill="#e2e8f0" opacity="0.5" filter="url(#subtleGlow)" />
      </svg>
    </div>
  );
};

export default React.memo(PlanetaryTravelOrbit);
