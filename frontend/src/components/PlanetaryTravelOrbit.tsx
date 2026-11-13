import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * PlanetaryTravelOrbit:
 * Continuous interstellar orbit flight path that snakes gracefully across sections,
 * connecting Earth, Venus, Uranus, Neptune, and Moon.
 * Features:
 * - Dynamic SVG sinusoidal orbit trail
 * - Animated glowing pulses travelling along the orbit curve
 * - Progress indicator beacon displaying the user's cosmic voyage
 */
export const PlanetaryTravelOrbit: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  
  // Convert progress into path length draw
  const pathLength = useTransform(smoothProgress, [0, 1], [0.05, 1]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-[2] overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 100 1000"
      >
        <defs>
          {/* Cosmic Gradient for the Flight Orbit */}
          <linearGradient id="orbitPathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="12%" stopColor="#38bdf8" stopOpacity="0.7" />   {/* Earth (About) */}
            <stop offset="28%" stopColor="#fb923c" stopOpacity="0.75" />  {/* Venus (Internships) */}
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.8" />   {/* Uranus (Projects) */}
            <stop offset="72%" stopColor="#60a5fa" stopOpacity="0.85" />  {/* Neptune (Achievements) */}
            <stop offset="88%" stopColor="#e2e8f0" stopOpacity="0.8" />   {/* Moon (MiniGame) */}
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />  {/* Singularity (Contact) */}
          </linearGradient>

          {/* Glow filter */}
          <filter id="orbitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Faint Background Orbit Track Guideline */}
        <path
          d={
            isMobile
              ? "M 50,40 C 2,120 98,280 10,480 C 95,680 8,840 50,980"
              : "M 50,50 C 4,140 96,280 6,480 C 94,680 12,840 50,980"
          }
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={isMobile ? "1" : "1.5"}
          strokeDasharray="4 8"
        />

        {/* 2. Dynamic Scroll-Progress Glowing Trajectory */}
        <motion.path
          d={
            isMobile
              ? "M 50,40 C 2,120 98,280 10,480 C 95,680 8,840 50,980"
              : "M 50,50 C 4,140 96,280 6,480 C 94,680 12,840 50,980"
          }
          fill="none"
          stroke="url(#orbitPathGradient)"
          strokeWidth={isMobile ? "1.8" : "2.4"}
          strokeLinecap="round"
          strokeDasharray="6 6"
          filter="url(#orbitGlow)"
          style={{ pathLength }}
        />

        {/* 3. Orbit Section Waypoint Nodes (Pulsing Orbit Circles at each planet's arrival) */}
        {/* Earth Waypoint (Around 15%) */}
        <circle cx={isMobile ? "14" : "10"} cy="155" r="3" fill="#38bdf8" opacity="0.9" filter="url(#orbitGlow)" />
        <circle cx={isMobile ? "14" : "10"} cy="155" r="6" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.4" />

        {/* Venus Waypoint (Around 32%) */}
        <circle cx={isMobile ? "86" : "90"} cy="315" r="3" fill="#fb923c" opacity="0.9" filter="url(#orbitGlow)" />
        <circle cx={isMobile ? "86" : "90"} cy="315" r="6" fill="none" stroke="#fb923c" strokeWidth="0.8" opacity="0.4" />

        {/* Uranus Waypoint (Around 52%) */}
        <circle cx={isMobile ? "14" : "10"} cy="515" r="3" fill="#2dd4bf" opacity="0.9" filter="url(#orbitGlow)" />
        <circle cx={isMobile ? "14" : "10"} cy="515" r="6" fill="none" stroke="#2dd4bf" strokeWidth="0.8" opacity="0.4" />

        {/* Neptune Waypoint (Around 72%) */}
        <circle cx={isMobile ? "86" : "90"} cy="710" r="3" fill="#60a5fa" opacity="0.9" filter="url(#orbitGlow)" />
        <circle cx={isMobile ? "86" : "90"} cy="710" r="6" fill="none" stroke="#60a5fa" strokeWidth="0.8" opacity="0.4" />

        {/* Moon Waypoint (Around 86%) */}
        <circle cx={isMobile ? "18" : "15"} cy="855" r="3" fill="#e2e8f0" opacity="0.9" filter="url(#orbitGlow)" />
        <circle cx={isMobile ? "18" : "15"} cy="855" r="6" fill="none" stroke="#e2e8f0" strokeWidth="0.8" opacity="0.4" />
      </svg>
    </div>
  );
};

export default React.memo(PlanetaryTravelOrbit);
