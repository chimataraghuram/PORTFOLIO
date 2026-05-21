import React, { useEffect, useRef } from 'react';

// --- Types & Config ---
type DepthLayer = 'far' | 'mid' | 'near';
type ParticleType = 'node' | 'hexagon' | 'fragment';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number; // True velocity X
  vy: number; // True velocity Y
  size: number;
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
  '#06b6d4', // Neon Cyan
  '#3b82f6', // Electric Blue
  '#8b5cf6', // Violet
  '#c084fc', // Soft Purple
];

// Cinematic Depth Config
const DEPTH_CONFIG = {
  far: { blur: 8, opacity: 0.15, speedMult: 0.1, parallax: 0.02, sizeBase: 0.05, friction: 0.99 },
  mid: { blur: 3, opacity: 0.5, speedMult: 0.4, parallax: 0.15, sizeBase: 0.15, friction: 0.95 },
  near: { blur: 0, opacity: 1.0, speedMult: 1.0, parallax: 0.6, sizeBase: 0.35, friction: 0.9 }
};

const NeuralParticles: React.FC<{ activeSection?: string }> = ({ activeSection = 'home' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  
  const textureCache = useRef<Map<string, HTMLCanvasElement>>(new Map());
  
  // Camera & Physics state
  const scrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  
  // Cinematic Lerped Camera
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const targetParallax = useRef({ x: 0, y: 0 });
  const currentParallax = useRef({ x: 0, y: 0 }); // Lerped value
  
  // Event state
  const globalPulseFlash = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Mobile Optimization: severely reduce count and complexity
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 30 : 100;

    // --- Texture Generation ---
    const generateTextures = () => {
      textureCache.current.clear();
      const baseSize = 12;
      
      COLORS.forEach((color, cIdx) => {
        (['far', 'mid', 'near'] as DepthLayer[]).forEach(depth => {
          (['node', 'hexagon', 'fragment'] as ParticleType[]).forEach(type => {
            const key = `${cIdx}-${depth}-${type}`;
            const offCanvas = document.createElement('canvas');
            const config = DEPTH_CONFIG[depth];
            
            // Force 0 blur on mobile to save battery
            const appliedBlur = isMobile ? 0 : config.blur;
            const padding = appliedBlur * 2 + 5;
            offCanvas.width = baseSize * 2 + padding * 2;
            offCanvas.height = baseSize * 2 + padding * 2;
            const oCtx = offCanvas.getContext('2d');
            if (!oCtx) return;
            
            const cx = offCanvas.width / 2;
            const cy = offCanvas.height / 2;
            
            oCtx.globalAlpha = config.opacity;
            if (appliedBlur > 0) {
              oCtx.shadowBlur = appliedBlur;
              oCtx.shadowColor = color;
            }
            
            oCtx.fillStyle = color;
            oCtx.strokeStyle = color;
            
            if (type === 'node') {
              oCtx.beginPath();
              oCtx.arc(cx, cy, baseSize, 0, Math.PI * 2);
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
              oCtx.lineWidth = 2;
              oCtx.stroke();
            } else if (type === 'fragment') {
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
        
        if (rand < 0.3) depth = 'far';
        else if (rand > 0.8) depth = 'near';

        const typeRand = Math.random();
        const type: ParticleType = typeRand > 0.8 ? 'hexagon' : typeRand > 0.6 ? 'fragment' : 'node';
        const colorIndex = Math.floor(Math.random() * COLORS.length);
        const config = DEPTH_CONFIG[depth];

        particlesRef.current.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2 * config.speedMult,
          vy: (Math.random() - 0.5) * 2 * config.speedMult,
          size: (Math.random() * 0.5 + 0.5) * config.sizeBase,
          opacity: 1,
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
      targetParallax.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
      mouseRef.current = { x: e.clientX, y: e.clientY };
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

      // 1. Cinematic Camera Lerping
      currentParallax.current.x += (targetParallax.current.x - currentParallax.current.x) * 0.05 * dt;
      currentParallax.current.y += (targetParallax.current.y - currentParallax.current.y) * 0.05 * dt;

      // 2. Scroll Velocity (Warp Distortion)
      const dy = scrollYRef.current - lastScrollYRef.current;
      scrollVelocityRef.current = scrollVelocityRef.current * 0.9 + dy * 0.1;
      lastScrollYRef.current = scrollYRef.current;
      const warpStretch = Math.min(Math.abs(scrollVelocityRef.current) * 0.8, 60);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Section Storytelling Overrides
      const isAbout = activeSection === 'about';
      const isSkills = activeSection === 'skills';
      const isProjects = activeSection === 'projects';
      
      const maxDist = isSkills ? (isMobile ? 150 : 250) : (isMobile ? 80 : 140);
      const gravityCenterX = canvas.width / 2;
      const gravityCenterY = canvas.height / 2;
      const gravityStrength = isProjects ? 0.002 : 0.0005; // Strong orbital pull on projects
      
      // Rare Environmental Event: Flash
      if (Math.random() < 0.001) globalPulseFlash.current = 1.0;
      if (globalPulseFlash.current > 0) {
        ctx.fillStyle = `rgba(6, 182, 212, ${globalPulseFlash.current * 0.1})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        globalPulseFlash.current -= 0.02 * dt;
      }

      // 3. Intelligent Neural Beams
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          
          if (p1.depth !== p2.depth && !isProjects) continue; 

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = maxDist * maxDist;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            // Smooth opacity based on distance
            const alpha = Math.pow((1 - dist / maxDist), 2) * (DEPTH_CONFIG[p1.depth].opacity * 0.6);
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${isAbout ? alpha * 0.3 : alpha})`; // Dim connections on 'About'
            ctx.lineWidth = p1.depth === 'near' ? 2 : p1.depth === 'mid' ? 1 : 0.5;
            ctx.stroke();
            
            // Spawn Traveling Energy Pulses
            if (Math.random() < 0.0015 && !isAbout) { // Less pulsing on About page
              pulsesRef.current.push({
                x: p1.x, y: p1.y,
                targetX: p2.x, targetY: p2.y,
                progress: 0,
                speed: 0.01 + Math.random() * 0.02,
                color: COLORS[p1.colorIndex]
              });
            }
          }
        }
      }

      // 4. Update & Draw Pulses
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
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        }
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // 5. Update & Draw Particles (Cosmic Physics)
      particlesRef.current.forEach((p) => {
        const config = DEPTH_CONFIG[p.depth];
        
        // Central Gravity (Environmental pull)
        if (!isAbout) {
          const gx = gravityCenterX - p.x;
          const gy = gravityCenterY - p.y;
          p.vx += gx * gravityStrength * dt;
          p.vy += gy * gravityStrength * dt;
        }

        // Apply friction & velocity
        p.vx *= config.friction;
        p.vy *= config.friction;
        
        // Random drift inertia
        p.vx += (Math.random() - 0.5) * 0.1 * dt;
        p.vy += (Math.random() - 0.5) * 0.1 * dt;

        // Apply movement
        const speedMultiplier = isAbout ? 0.3 : 1; // Slower on About page
        p.x += p.vx * speedMultiplier * dt;
        p.y += p.vy * speedMultiplier * dt;

        // Cinematic Parallax (from lerped camera)
        const pFactor = config.parallax;
        const targetPx = -currentParallax.current.x * 80 * pFactor;
        const targetPy = -currentParallax.current.y * 80 * pFactor;
        
        // True Scroll Displacement
        const scrollOffset = scrollYRef.current * pFactor;
        
        const finalX = p.x + targetPx;
        let finalY = p.y + targetPy - scrollOffset;

        // Screen wrapping (wrap the true coordinates, not the parallaxed ones)
        if (p.x < -100) p.x = canvas.width + 100;
        if (p.x > canvas.width + 100) p.x = -100;
        
        const viewportY = finalY;
        if (viewportY < -200) {
            p.y += canvas.height + 400;
        } else if (viewportY > canvas.height + 200) {
            p.y -= canvas.height + 400;
        }

        // Draw from texture cache with Scroll Distortion (Warp)
        const tex = textureCache.current.get(p.canvasKey);
        if (tex) {
            const drawSize = 12 * p.size;
            const scale = drawSize / 12;
            const drawW = tex.width * scale;
            // Stretch the particle on the Y axis if scrolling fast
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
