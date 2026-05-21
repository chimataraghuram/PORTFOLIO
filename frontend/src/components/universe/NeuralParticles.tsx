import React, { useEffect, useRef } from 'react';

// --- Types ---
type DepthLayer = 'far' | 'mid' | 'near';

interface Particle {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  depth: DepthLayer;
  type: 'node' | 'hexagon' | 'fragment';
}

interface Pulse {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
}

const COLORS = [
  '#06b6d4', // Cyan
  '#3b82f6', // Blue
  '#8b5cf6', // Violet
  '#a855f7', // Purple
];

const NeuralParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  
  // Physics & scroll states
  const scrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 35 : 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Distribute depths
        const rand = Math.random();
        let depth: DepthLayer = 'mid';
        let sizeBase = 1.5;
        let opacityBase = 0.5;
        let speedMult = 1;

        if (rand < 0.4) {
          depth = 'far';
          sizeBase = 0.8;
          opacityBase = 0.2;
          speedMult = 0.4;
        } else if (rand > 0.8) {
          depth = 'near';
          sizeBase = 2.5;
          opacityBase = 0.8;
          speedMult = 1.8;
        }

        const typeRand = Math.random();
        const type = typeRand > 0.8 ? 'hexagon' : typeRand > 0.6 ? 'fragment' : 'node';

        particlesRef.current.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: 0,
          baseY: 0,
          size: (Math.random() * 1.5 + sizeBase),
          speedX: (Math.random() - 0.5) * 0.3 * speedMult,
          speedY: (Math.random() - 0.5) * 0.3 * speedMult,
          opacity: opacityBase + (Math.random() * 0.2),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          depth,
          type
        });
      }
    };

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });
    
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    resize();
    initParticles();

    // -- Rendering Loop --
    let animationId: number;
    let lastTime = performance.now();

    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = x + r * Math.cos(angle);
        const py = y + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    };

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.66, 2); // normalize to 60fps
      lastTime = time;

      // Calculate scroll velocity
      const dy = scrollYRef.current - lastScrollYRef.current;
      scrollVelocityRef.current = scrollVelocityRef.current * 0.9 + dy * 0.1;
      lastScrollYRef.current = scrollYRef.current;

      const stretch = Math.min(Math.abs(scrollVelocityRef.current) * 0.5, 20);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      const maxDist = isMobile ? 120 : 180;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          
          // Only connect similar depths for a cleaner 3D feel
          if (p1.depth !== p2.depth) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (p1.opacity * 0.5);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = p1.depth === 'near' ? 1.5 : p1.depth === 'mid' ? 0.8 : 0.4;
            
            // Premium glowing laser beam effect
            ctx.shadowBlur = p1.depth === 'near' ? 10 : 0;
            ctx.shadowColor = p1.color;
            ctx.stroke();
            ctx.shadowBlur = 0; // reset
            
            // Randomly spawn pulses on connected lines
            if (Math.random() < 0.001) {
              pulsesRef.current.push({
                x: p1.x, y: p1.y,
                targetX: p2.x, targetY: p2.y,
                progress: 0,
                speed: 0.02 + Math.random() * 0.02,
                color: p1.color
              });
            }
          }
        }
      }

      // Update & Draw Pulses
      for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
        const pulse = pulsesRef.current[i];
        pulse.progress += pulse.speed * dt;
        
        if (pulse.progress >= 1) {
          pulsesRef.current.splice(i, 1);
          continue;
        }

        const px = pulse.x + (pulse.targetX - pulse.x) * pulse.progress;
        const py = pulse.y + (pulse.targetY - pulse.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = pulse.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update & Draw Particles
      particlesRef.current.forEach((p) => {
        // Ambient movement
        p.x += p.speedX * dt;
        p.y += p.speedY * dt;

        // Depth parallax from scroll
        const parallaxFactor = p.depth === 'near' ? 0.8 : p.depth === 'mid' ? 0.4 : 0.1;
        p.y -= dy * parallaxFactor;

        // Mouse interaction (repel gently)
        const mx = mouseRef.current.x - p.x;
        const my = mouseRef.current.y - p.y;
        const mDist = Math.sqrt(mx * mx + my * my);
        if (mDist < 150) {
          p.x -= (mx / mDist) * 0.5 * dt;
          p.y -= (my / mDist) * 0.5 * dt;
        }

        // Screen wrapping
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        // Draw particle based on type
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = p.depth === 'near' ? 20 : p.depth === 'mid' ? 10 : 0;
        ctx.shadowColor = p.color;

        if (p.type === 'node') {
          ctx.beginPath();
          // Scroll stretch effect
          if (stretch > 1) {
            ctx.ellipse(p.x, p.y, p.size, p.size + stretch, 0, 0, Math.PI * 2);
          } else {
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          }
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.type === 'hexagon') {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          drawHexagon(ctx, p.x, p.y, p.size * 2);
        } else if (p.type === 'fragment') {
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x - p.size, p.y - p.size/2, p.size * 2, p.size);
        }

        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
};

export default NeuralParticles;
