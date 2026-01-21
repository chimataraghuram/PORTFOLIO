import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
}

interface ParticlesProps {
    className?: string;
    count?: number;
    isRightBiased?: boolean;
    isLocal?: boolean;
}

const Particles: React.FC<ParticlesProps> = ({
    className = "fixed inset-0 pointer-events-none z-0",
    count = 120,
    isRightBiased = true,
    isLocal = false
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>();
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            if (isLocal && canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            // Re-initialize particles on resize if local to adapt to new dimensions
            if (isLocal) initParticles();
        };

        const colors = [
            'rgba(236, 72, 153, 0.6)',  // Pink
            'rgba(168, 85, 247, 0.6)',  // Purple
            'rgba(34, 211, 238, 0.6)',  // Cyan
            'rgba(251, 191, 36, 0.5)',  // Yellow
            'rgba(59, 130, 246, 0.6)',  // Blue
            'rgba(255, 255, 255, 0.4)', // White
        ];

        const initParticles = () => {
            particlesRef.current = [];
            for (let i = 0; i < count; i++) {
                const isRight = isRightBiased && Math.random() < 0.7;
                const x = isRight
                    ? (canvas.width * 0.4) + Math.random() * (canvas.width * 0.6)
                    : Math.random() * (canvas.width * 0.4);

                particlesRef.current.push({
                    x: x,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2.5 + 1,
                    speedX: isRight ? (Math.random() * 0.4 - 0.1) : (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.4,
                    opacity: Math.random() * 0.4 + 0.15,
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
        };

        resizeCanvas();
        initParticles();

        window.addEventListener('resize', resizeCanvas);

        const handleMouseMove = (e: MouseEvent) => {
            if (isLocal && canvas.parentElement) {
                const rect = canvas.parentElement.getBoundingClientRect();
                mouseRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
            } else {
                mouseRef.current = { x: e.clientX, y: e.clientY };
            }
        };
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    particle.x -= dx * 0.01;
                    particle.y -= dy * 0.01;
                }

                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.shadowBlur = 15;
                ctx.shadowColor = particle.color;
                ctx.fill();
                ctx.shadowBlur = 0;

                for (let j = index + 1; j < particlesRef.current.length; j++) {
                    const other = particlesRef.current[j];
                    const distance = Math.sqrt(
                        Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
                    );

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [count, isRightBiased, isLocal]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ opacity: 0.7 }}
        />
    );
};

export default Particles;
