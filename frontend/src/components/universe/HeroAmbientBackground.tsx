import React, { useMemo } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';

interface HeroAmbientBackgroundProps {
  mouse?: { x: number; y: number; active: boolean };
}

const NODES = [
  { x: 72, y: 18 }, { x: 88, y: 32 }, { x: 58, y: 38 },
  { x: 92, y: 52 }, { x: 65, y: 58 }, { x: 78, y: 72 },
  { x: 55, y: 78 }, { x: 85, y: 88 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 2], [1, 3], [3, 4], [2, 4],
  [4, 5], [5, 6], [4, 6], [5, 7], [3, 7],
];

/**
 * Hero backdrop: aurora glow, neural constellation, soft grid.
 */
const HeroAmbientBackground: React.FC<HeroAmbientBackgroundProps> = ({ mouse }) => {
  const parallaxX = useSpring(mouse?.active ? (mouse.x - (typeof window !== 'undefined' ? window.innerWidth * 0.65 : 400)) * 0.02 : 0, {
    stiffness: 80,
    damping: 20,
  });
  const parallaxY = useSpring(mouse?.active ? (mouse.y - (typeof window !== 'undefined' ? window.innerHeight * 0.45 : 300)) * 0.02 : 0, {
    stiffness: 80,
    damping: 20,
  });
  const parallaxX2 = useTransform(parallaxX, (v) => v * -0.6);
  const parallaxY2 = useTransform(parallaxY, (v) => v * 0.8);

  const edges = useMemo(
    () =>
      EDGES.map(([a, b]) => ({
        x1: NODES[a].x,
        y1: NODES[a].y,
        x2: NODES[b].x,
        y2: NODES[b].y,
      })),
    []
  );

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden
    >
      {/* Left-side balance glow for copy */}
      <div
        className="absolute top-[25%] left-[-5%] w-[50vmin] h-[40vmin] rounded-full blur-[90px] opacity-40 md:opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Right-side aurora field */}
      <div className="absolute inset-0 md:left-[30%] md:w-[70%] h-full">
        <motion.div
          className="absolute top-[12%] right-[8%] w-[50vmin] h-[50vmin] rounded-full blur-[85px]"
          style={{
            x: parallaxX,
            y: parallaxY,
            background:
              'radial-gradient(circle, rgba(6, 182, 212, 0.38) 0%, rgba(59, 130, 246, 0.12) 45%, transparent 72%)',
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[38%] right-[18%] w-[42vmin] h-[42vmin] rounded-full blur-[75px]"
          style={{
            x: parallaxX2,
            y: parallaxY2,
            background:
              'radial-gradient(circle, rgba(168, 85, 247, 0.32) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 72%)',
          }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.div
          className="absolute bottom-[18%] right-[6%] w-[36vmin] h-[36vmin] rounded-full blur-[65px]"
          style={{
            background:
              'radial-gradient(circle, rgba(251, 191, 36, 0.14) 0%, transparent 68%)',
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Neural constellation */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.35] md:opacity-45"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMaxYMid slice"
        >
          <defs>
            <linearGradient id="hero-constellation-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {edges.map((e, i) => (
            <motion.line
              key={i}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke="url(#hero-constellation-grad)"
              strokeWidth="0.15"
              strokeLinecap="round"
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.15, 0.5, 0.15] }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              }}
            />
          ))}
          {NODES.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x}
              cy={n.y}
              r="0.35"
              fill="#67e8f9"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.35, 0.9, 0.35], r: [0.3, 0.45, 0.3] }}
              transition={{
                duration: 2.5 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          ))}
        </svg>

        {/* Tech grid */}
        <div
          className="absolute inset-0 opacity-[0.12] md:opacity-[0.16]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.35) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 75% 85% at 80% 48%, black 15%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 85% at 80% 48%, black 15%, transparent 78%)',
          }}
        />

        {/* Light sweep */}
        <motion.div
          className="absolute top-0 bottom-0 w-[28%] opacity-[0.08]"
          style={{
            background:
              'linear-gradient(105deg, transparent 0%, rgba(34, 211, 238, 0.55) 45%, transparent 100%)',
          }}
          animate={{ left: ['-25%', '125%'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
        />

        {/* Portrait halo */}
        <div
          className="absolute top-1/2 right-[6%] md:right-[10%] -translate-y-1/2 w-[min(300px,68vw)] aspect-[4/5] rounded-[1.75rem]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.14) 0%, rgba(139, 92, 246, 0.07) 50%, transparent 75%)',
            boxShadow: '0 0 100px rgba(6, 182, 212, 0.12)',
          }}
        />
      </div>

      {/* Accent particles */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            top: `${18 + i * 9}%`,
            right: `${10 + (i % 4) * 14}%`,
            background: i % 2 === 0 ? 'rgba(34, 211, 238, 0.7)' : 'rgba(244, 114, 182, 0.6)',
          }}
          animate={{ opacity: [0.15, 0.75, 0.15], scale: [1, 1.5, 1] }}
          transition={{
            duration: 2.8 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.35,
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050816] via-[#050816]/80 to-transparent" />
    </div>
  );
};

export default HeroAmbientBackground;
