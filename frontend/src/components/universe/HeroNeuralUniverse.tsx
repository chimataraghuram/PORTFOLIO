import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export interface HeroMouse {
  x: number;
  y: number;
  active: boolean;
}

interface HeroNeuralUniverseProps {
  mouse: HeroMouse;
  isMobile: boolean;
}

type Depth = 'far' | 'mid' | 'near';

interface Particle {
  x: number;
  y: number;
  depth: Depth;
  phase: number;
  orbitSpeed: number;
  size: number;
  driftX: number;
  driftY: number;
}

const MID_NODES = [
  { x: 68, y: 22 }, { x: 82, y: 30 }, { x: 58, y: 35 }, { x: 88, y: 44 },
  { x: 72, y: 52 }, { x: 54, y: 58 }, { x: 78, y: 64 }, { x: 62, y: 72 },
  { x: 90, y: 78 }, { x: 48, y: 48 },
];

const MID_EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 2], [1, 3], [3, 4], [2, 4], [4, 5],
  [5, 6], [4, 6], [6, 7], [7, 8], [3, 8], [4, 9], [2, 9],
];

const FAR_NODES = [
  { x: 75, y: 15 }, { x: 92, y: 28 }, { x: 45, y: 40 }, { x: 95, y: 55 },
  { x: 70, y: 85 }, { x: 40, y: 70 },
];

const FAR_EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [2, 5],
];

const DEPTH_STYLE: Record<Depth, { alpha: number; blur: number; parallax: number }> = {
  far: { alpha: 0.25, blur: 0, parallax: 0.012 },
  mid: { alpha: 0.45, blur: 0, parallax: 0.028 },
  near: { alpha: 0.7, blur: 0, parallax: 0.05 },
};

const COLORS = ['#22d3ee', '#38bdf8', '#6366f1', '#8b5cf6'];

function getPortraitAnchor(w: number, h: number, mobile: boolean) {
  return mobile
    ? { x: w * 0.5, y: h * 0.36 }
    : { x: w * 0.78, y: h * 0.48 };
}

function spawnParticles(w: number, h: number, count: number): Particle[] {
  const depths: Depth[] = ['far', 'far', 'mid', 'mid', 'near'];
  return Array.from({ length: count }, (_, i) => {
    const depth = depths[i % depths.length];
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      depth,
      phase: Math.random() * Math.PI * 2,
      orbitSpeed: 0.15 + Math.random() * 0.25,
      size: depth === 'near' ? 1.2 + Math.random() * 1.2 : depth === 'mid' ? 0.8 + Math.random() * 0.8 : 0.4 + Math.random() * 0.5,
      driftX: (Math.random() - 0.5) * 0.08,
      driftY: (Math.random() - 0.5) * 0.06,
    };
  });
}

/**
 * AI Consciousness Inside a Neural Universe — hero environment layers.
 */
const HeroNeuralUniverse: React.FC<HeroNeuralUniverseProps> = ({ mouse, isMobile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef(mouse);
  mouseRef.current = mouse;

  const parallaxX = useSpring(mouse.active ? (mouse.x - 400) * 0.015 : 0, { stiffness: 50, damping: 28 });
  const parallaxY = useSpring(mouse.active ? (mouse.y - 300) * 0.015 : 0, { stiffness: 50, damping: 28 });
  const parallaxFarX = useTransform(parallaxX, (v) => v * 0.35);
  const parallaxFarY = useTransform(parallaxY, (v) => v * 0.35);
  const parallaxMidX = useTransform(parallaxX, (v) => v * 0.65);
  const parallaxMidY = useTransform(parallaxY, (v) => v * 0.65);

  const midEdges = useMemo(
    () =>
      MID_EDGES.map(([a, b]) => ({
        x1: MID_NODES[a].x,
        y1: MID_NODES[a].y,
        x2: MID_NODES[b].x,
        y2: MID_NODES[b].y,
      })),
    []
  );

  const farEdges = useMemo(
    () =>
      FAR_EDGES.map(([a, b]) => ({
        x1: FAR_NODES[a].x,
        y1: FAR_NODES[a].y,
        x2: FAR_NODES[b].x,
        y2: FAR_NODES[b].y,
      })),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particlesRef.current.length === 0) {
        particlesRef.current = spawnParticles(w, h, isMobile ? 28 : 48);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const animate = (time: number) => {
      const t = time * 0.001;
      const anchor = getPortraitAnchor(w, h, isMobile);
      const m = mouseRef.current;
      const mx = m.active ? m.x : anchor.x;
      const my = m.active ? m.y : anchor.y;

      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p, i) => {
        const cfg = DEPTH_STYLE[p.depth];
        const pullRadius = p.depth === 'near' ? 140 : p.depth === 'mid' ? 100 : 60;
        const dx = anchor.x - p.x;
        const dy = anchor.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < pullRadius * 2.5) {
          const orbit = p.orbitSpeed * (p.depth === 'near' ? 1 : 0.5);
          const angle = Math.atan2(dy, dx) + Math.PI / 2 + t * orbit + p.phase;
          const orbitStr = (1 - dist / (pullRadius * 2.5)) * 0.35;
          p.x += Math.cos(angle) * orbitStr;
          p.y += Math.sin(angle) * orbitStr;
        }

        p.x += p.driftX + Math.sin(t * 0.3 + p.phase) * 0.08;
        p.y += p.driftY + Math.cos(t * 0.25 + p.phase) * 0.06;

        const parallax = cfg.parallax;
        const px = m.active ? (mx - anchor.x) * parallax : 0;
        const py = m.active ? (my - anchor.y) * parallax : 0;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const nearPortrait = dist < pullRadius;
        let alpha = cfg.alpha * (nearPortrait ? 1 + (1 - dist / pullRadius) * 0.5 : 1);
        const textShield = p.x < w * 0.42 ? alpha * 0.35 : alpha;
        alpha = textShield;

        const color = COLORS[i % COLORS.length];
        const drawX = p.x + px;
        const drawY = p.y + py;
        const glow = nearPortrait ? 8 : p.depth === 'near' ? 5 : 2;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.min(alpha, 0.85);
        ctx.shadowBlur = glow;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  const ConstellationLayer = ({
    edges,
    nodes,
    opacity,
    parallaxStyle,
    strokeOpacity,
    gradId,
  }: {
    edges: { x1: number; y1: number; x2: number; y2: number }[];
    nodes: { x: number; y: number }[];
    opacity: string;
    parallaxStyle?: { x: typeof parallaxX; y: typeof parallaxY };
    strokeOpacity: [number, number, number];
    gradId: string;
  }) => (
    <motion.svg
      className={`absolute inset-0 w-full h-full ${opacity}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMaxYMid slice"
      style={parallaxStyle ? { x: parallaxStyle.x, y: parallaxStyle.y } : undefined}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {edges.map((e, i) => (
        <motion.line
          key={i}
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          stroke={`url(#${gradId})`}
          strokeWidth="0.12"
          strokeLinecap="round"
          animate={{ opacity: strokeOpacity }}
          transition={{
            duration: 6 + (i % 4),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="0.28"
          fill="#67e8f9"
          animate={{ opacity: [0.2, 0.55, 0.2] }}
          transition={{
            duration: 4 + i * 0.35,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.25,
          }}
        />
      ))}
    </motion.svg>
  );

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* BACKGROUND — deep space fog */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.4, 0.55, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#030508] via-[#0a0f1e] to-[#050816]" />
        <motion.div
          className="absolute top-[10%] right-[0%] w-[70%] h-[80%] rounded-full blur-[120px]"
          style={{
            x: parallaxFarX,
            y: parallaxFarY,
            background:
              'radial-gradient(ellipse, rgba(30, 58, 138, 0.15) 0%, transparent 65%)',
          }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[5%] right-[15%] w-[50%] h-[50%] rounded-full blur-[100px]"
          style={{
            background:
              'radial-gradient(circle, rgba(88, 28, 135, 0.12) 0%, transparent 70%)',
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </motion.div>

      {/* MID — distant constellation */}
      <ConstellationLayer
        edges={farEdges}
        nodes={FAR_NODES}
        opacity="opacity-[0.18] md:opacity-[0.22]"
        parallaxStyle={{ x: parallaxFarX, y: parallaxFarY }}
        strokeOpacity={[0.08, 0.2, 0.08]}
        gradId="hero-neural-far"
      />

      {/* MID — primary neural network */}
      <ConstellationLayer
        edges={midEdges}
        nodes={MID_NODES}
        opacity="opacity-[0.22] md:opacity-[0.28]"
        parallaxStyle={{ x: parallaxMidX, y: parallaxMidY }}
        strokeOpacity={[0.1, 0.28, 0.1]}
        gradId="hero-neural-mid"
      />

      {/* Volumetric fog layers */}
      <motion.div
        className="absolute inset-0 md:left-[25%] opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 55% 70% at 72% 48%, rgba(6, 182, 212, 0.08) 0%, transparent 55%)',
        }}
        animate={{ opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          x: parallaxMidX,
          y: parallaxMidY,
          background:
            'radial-gradient(ellipse 40% 55% at 78% 46%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* AI consciousness aura — portrait energy source */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          right: isMobile ? '50%' : '12%',
          transform: isMobile ? 'translate(50%, -50%)' : 'translateY(-50%)',
          width: isMobile ? 'min(280px, 75vw)' : 'min(340px, 32vw)',
          aspectRatio: '4/5',
        }}
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.7, 0.95, 0.7],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-[-40%] rounded-full blur-[90px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.18) 0%, rgba(99, 102, 241, 0.1) 35%, rgba(139, 92, 246, 0.06) 55%, transparent 72%)',
          }}
        />
        <div
          className="absolute inset-[-20%] rounded-full blur-[50px] opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 65%)',
          }}
        />
      </motion.div>

      {/* FOREGROUND — particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[2]" />

      {/* Atmospheric haze overlay */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 70% 50%, transparent 30%, rgba(5, 8, 22, 0.25) 100%)',
        }}
      />

      {/* Content priority shield — protect typography */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(5, 8, 22, 0.92) 0%, rgba(5, 8, 22, 0.55) 28%, rgba(5, 8, 22, 0.15) 48%, transparent 62%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 z-[5] bg-gradient-to-t from-[#050816] to-transparent" />
    </div>
  );
};

export default HeroNeuralUniverse;
