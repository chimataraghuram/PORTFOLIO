import React, { useEffect, useRef } from 'react';

// --- Types ---
type DepthLayer = 'far' | 'mid' | 'near';
type ParticleType = 'node' | 'hexagon' | 'fragment';

interface Particle {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number; // The scale factor
  speedX: number;
  speedY: number;
  opacity: number;
  colorIndex: number;
  depth: DepthLayer;
  type: ParticleType;
  canvasKey: string;
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

const DEPTH_CONFIG = {
  far: { blur: 6, opacity: 0.3, speedMult: 0.2, parallax: 0.05, sizeBase: 0.8 },
  mid: { blur: 2, opacity: 0.6, speedMult: 0.5, parallax: 0.2, sizeBase: 1.5 },
  near: { blur: 8, opacity: 1.0, speedMult: 1.2, parallax: 0.6, sizeBase: 2.5 }
};

const NeuralParticles: React.FC<{ activeSection?: string }> = ({ activeSection = 'home' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  
  // Cache for offscreen canvases to eliminate render lag
  const textureCache = useRef<Map<string, HTMLCanvasElement>>(new Map());
  
  // Physics & scroll states
  const scrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const globalParallax = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 35 : 60;

    // --- Generate Textures ---
    const generateTextures = () => {
      textureCache.current.clear();
      const baseSize = 10;
      
      COLORS.forEach((color, cIdx) => {
        (['far', 'mid', 'near'] as DepthLayer[]).forEach(depth => {
          (['node', 'hexagon', 'fragment'] as ParticleType[]).forEach(type => {
            const key = `${cIdx}-${depth}-${type}`;
            const offCanvas = document.createElement('canvas');
            const config = DEPTH_CONFIG[depth];
            
            const padding = config.blur * 2 + 5;
            offCanvas.width = baseSize * 2 + padding * 2;
            offCanvas.height = baseSize * 2 + padding * 2;
            const oCtx = offCanvas.getContext('2d');
            if (!oCtx) return;
            
            const cx = offCanvas.width / 2;
            const cy = offCanvas.height / 2;
            
            oCtx.globalAlpha = config.opacity;
            if (config.blur > 0) {
              oCtx.shadowBlur = config.blur;
              oCtx.shadowColor = color;
            }
            
            if (type === 'node') {
              oCtx.beginPath();
              oCtx.arc(cx, cy, baseSize, 0, Math.PI * 2);
              oCtx.fillStyle = color;
              oCtx.fill();
            } else if (type === 'hexagon') {
              oCtx.beginPath();
              for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const px = cx + baseSize * Math.cos(angle);
                const py = cy + baseSize * Math.sin(angle);
                if (i === 0) oCtx.moveTo(px, py);
                else oCtx.lineTo(px, py);
              }
              oCtx.closePath();
              oCtx.strokeStyle = color;
              oCtx.lineWidth = 2;
              oCtx.stroke();
            } else if (type === 'fragment') {
              oCtx.fillStyle = color;
              oCtx.fillRect(cx - baseSize, cy - baseSize/2, baseSize * 2, baseSize);
            }
            
            textureCache.current.set(key, offCanvas);
          });
        });
      });
    };

    generateTextures();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const rand = Math.random();
        let depth: DepthLayer = 'mid';
        
        if (rand < 0.4) depth = 'far';
        else if (rand > 0.8) depth = 'near';

        const typeRand = Math.random();
        const type: ParticleType = typeRand > 0.8 ? 'hexagon' : typeRand > 0.6 ? 'fragment' : 'node';
        const colorIndex = Math.floor(Math.random() * COLORS.length);
        const config = DEPTH_CONFIG[depth];

        particlesRef.current.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: 0,
          baseY: 0,
          size: (Math.random() * 0.5 + 0.5) * config.sizeBase,
          speedX: (Math.random() - 0.5) * 0.5 * config.speedMult,
          speedY: (Math.random() - 0.5) * 0.5 * config.speedMult,
          opacity: 1, // handled by texture
          colorIndex,
          depth,
          type,
          canvasKey: `${colorIndex}-${depth}-${type}`
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
      // Map to -1 to 1 for parallax
      globalParallax.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
      mouseRef.current = { x: e.clientX, y: e.clientY, vx: 0, vy: 0 };
    };
    window.addEventListener('mousemove', handleMouseMove);

    resize();
    initParticles();

    // -- Rendering Loop --
    let animationId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.66, 2);
      lastTime = time;

      // Calculate scroll velocity (Warp speed engine)
      const dy = scrollYRef.current - lastScrollYRef.current;
      scrollVelocityRef.current = scrollVelocityRef.current * 0.9 + dy * 0.1;
      lastScrollYRef.current = scrollYRef.current;

      const warpStretch = Math.min(Math.abs(scrollVelocityRef.current) * 0.8, 40);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Section-based overrides
      const maxDist = activeSection === 'skills' ? (isMobile ? 150 : 220) : (isMobile ? 100 : 160);
      const isProjects = activeSection === 'projects';
      
      // Draw connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          
          if (p1.depth !== p2.depth && !isProjects) continue; // Projects section connects across depths

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = maxDist * maxDist;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDist) * (DEPTH_CONFIG[p1.depth].opacity * 0.5);
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = p1.depth === 'near' ? 1.5 : p1.depth === 'mid' ? 0.8 : 0.4;
            ctx.stroke();
            
            // Randomly spawn travelling pulses (AI Data transfer)
            if (Math.random() < 0.002) {
              pulsesRef.current.push({
                x: p1.x, y: p1.y,
                targetX: p2.x, targetY: p2.y,
                progress: 0,
                speed: 0.015 + Math.random() * 0.02,
                color: COLORS[p1.colorIndex]
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
        if (warpStretch > 2) {
            ctx.ellipse(px, py, 2, 2 + warpStretch * 0.5, 0, 0, Math.PI * 2);
        } else {
            ctx.arc(px, py, 2, 0, Math.PI * 2);
        }
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Trail
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Update & Draw Particles
      particlesRef.current.forEach((p) => {
        // Ambient movement
        p.x += p.speedX * dt;
        p.y += p.speedY * dt;

        // Cinematic Parallax from mouse
        const pFactor = DEPTH_CONFIG[p.depth].parallax;
        const targetPx = -globalParallax.current.x * 50 * pFactor;
        const targetPy = -globalParallax.current.y * 50 * pFactor;
        
        // Scroll displacement
        const scrollOffset = scrollYRef.current * pFactor * 0.5;
        
        const finalX = p.x + targetPx;
        let finalY = p.y + targetPy - scrollOffset;

        // Mouse interaction (repel gently)
        const mx = mouseRef.current.x - finalX;
        const my = mouseRef.current.y - finalY;
        const mDistSq = mx * mx + my * my;
        if (mDistSq < 22500) { // 150 * 150
          const mDist = Math.sqrt(mDistSq);
          p.x -= (mx / mDist) * 1.5 * dt;
          p.y -= (my / mDist) * 1.5 * dt;
        }

        // Screen wrapping (wrap the base coordinates, not the parallaxed ones)
        if (p.x < -100) p.x = canvas.width + 100;
        if (p.x > canvas.width + 100) p.x = -100;
        
        // Complex Y wrapping accounting for scroll
        const viewportY = finalY;
        if (viewportY < -100) {
            p.y += canvas.height + 200;
        } else if (viewportY > canvas.height + 100) {
            p.y -= canvas.height + 200;
        }

        // Draw from texture cache
        const tex = textureCache.current.get(p.canvasKey);
        if (tex) {
            const drawSize = 10 * p.size; // base size is 10
            const scale = drawSize / 10;
            const drawW = tex.width * scale;
            const drawH = tex.height * scale + (warpStretch * pFactor);
            
            ctx.drawImage(tex, finalX - drawW/2, finalY - drawH/2, drawW, drawH);
        }
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
  }, [activeSection]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
};

export default NeuralParticles;
