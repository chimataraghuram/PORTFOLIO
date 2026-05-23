import React, { useEffect, useRef } from 'react';
import { SKILLS_DATA } from '../constants';

interface Node {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isHovered: boolean;
}

interface Connection {
  source: Node;
  target: Node;
  distance: number;
}

interface Pulse {
  source: Node;
  target: Node;
  progress: number;
  speed: number;
}

const getColor = (category: string, name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('python')) return '#3776AB';
  if (lower.includes('javascript')) return '#F7DF1E';
  if (lower.includes('react')) return '#61DAFB';
  if (lower.includes('aws')) return '#FF9900';
  if (lower.includes('node')) return '#339933';
  switch (category) {
    case 'Language': return '#fbbf24';
    case 'Backend': return '#10b981';
    case 'Frontend': return '#ec4899';
    case 'Tool': return '#3b82f6';
    case 'Core': return '#8b5cf6';
    default: return '#06b6d4';
  }
};

const NeuralConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 300; // Fixed height for the constellation map
      }
    };
    
    const initNetwork = () => {
      nodesRef.current = [];
      connectionsRef.current = [];
      pulsesRef.current = [];
      
      // Deduplicate skills to avoid double nodes
      const uniqueSkills = Array.from(new Set(SKILLS_DATA.map(s => s.name)))
        .map(name => SKILLS_DATA.find(s => s.name === name)!);

      uniqueSkills.forEach((skill, i) => {
        nodesRef.current.push({
          id: `node-${i}`,
          name: skill.name,
          category: skill.category,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: 3 + Math.random() * 2,
          color: getColor(skill.category, skill.name),
          isHovered: false
        });
      });

      // Build connections based on proximity and category
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const n1 = nodesRef.current[i];
          const n2 = nodesRef.current[j];
          
          // Connect if same category, or randomly to form a web
          if (n1.category === n2.category || Math.random() > 0.85) {
            connectionsRef.current.push({
              source: n1,
              target: n2,
              distance: 100 + Math.random() * 100
            });
          }
        }
      }
    };

    let resizeFrameId: number;
    const handleResize = () => {
      cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        resize();
        initNetwork();
      });
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    resize();
    initNetwork();

    let animationId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const dt = Math.min((time - lastTime) / 16.66, 2);
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let hoveredNode: Node | null = null;

      // Update nodes
      nodesRef.current.forEach(node => {
        node.x += node.vx * dt;
        node.y += node.vy * dt;

        // Bounce off walls
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;
        
        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Check hover
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        node.isHovered = dist < 40;
        if (node.isHovered) {
          hoveredNode = node;
          // Magnetic pull
          if (dist > 10) {
            node.x += (dx / dist) * 1.5 * dt;
            node.y += (dy / dist) * 1.5 * dt;
          }
        }
      });

      // Draw connections
      connectionsRef.current.forEach(conn => {
        const dx = conn.source.x - conn.target.x;
        const dy = conn.source.y - conn.target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const isPathHovered = conn.source.isHovered || conn.target.isHovered;

        if (dist < 250 || isPathHovered) {
          const baseAlpha = Math.max(0, 1 - dist / 250) * 0.3;
          const alpha = isPathHovered ? 0.8 : baseAlpha;
          
          ctx.beginPath();
          ctx.moveTo(conn.source.x, conn.source.y);
          ctx.lineTo(conn.target.x, conn.target.y);
          ctx.strokeStyle = isPathHovered ? conn.source.color : `rgba(100, 116, 139, ${alpha})`;
          ctx.lineWidth = isPathHovered ? 1.5 : 0.5;
          ctx.stroke();

          // Spawn pulses on hovered paths
          if (isPathHovered && Math.random() < 0.05) {
            pulsesRef.current.push({
              source: conn.source.isHovered ? conn.source : conn.target,
              target: conn.source.isHovered ? conn.target : conn.source,
              progress: 0,
              speed: 0.03 + Math.random() * 0.02
            });
          }
        }
      });

      // Update and draw pulses
      for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
        const pulse = pulsesRef.current[i];
        pulse.progress += pulse.speed * dt;
        
        if (pulse.progress >= 1) {
          pulsesRef.current.splice(i, 1);
          continue;
        }

        const px = pulse.source.x + (pulse.target.x - pulse.source.x) * pulse.progress;
        const py = pulse.source.y + (pulse.target.y - pulse.source.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = pulse.source.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      nodesRef.current.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.isHovered ? node.radius * 1.5 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        if (node.isHovered) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = node.color;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw text
        if (node.isHovered || (hoveredNode && (
          connectionsRef.current.some(c => (c.source === node && c.target === hoveredNode) || (c.target === node && c.source === hoveredNode))
        ))) {
          ctx.font = "bold 10px Inter, sans-serif";
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = "center";
          ctx.fillText(node.name, node.x, node.y - 12);
        } else {
          ctx.font = "bold 9px Inter, sans-serif";
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.textAlign = "center";
          ctx.fillText(node.name, node.x, node.y - 8);
        }
      });
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(resizeFrameId);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full relative h-[300px] bg-slate-950/40 rounded-2xl border border-white/5 overflow-hidden gelly-card">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      
      {/* Overlay Text */}
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <h4 className="text-[10px] uppercase tracking-widest font-black text-white/40">Neural Galaxy Map</h4>
        <p className="text-[8px] text-cyan-500/50 uppercase tracking-widest">Hover to explore links</p>
      </div>
    </div>
  );
};

export default NeuralConstellation;
