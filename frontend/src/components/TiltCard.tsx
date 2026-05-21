import React, { useRef, useState, MouseEvent, useEffect } from 'react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', style = {}, onMouseMove, ...props }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transformStyle, setTransformStyle] = useState({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    });

    const [glareStyle, setGlareStyle] = useState({
        opacity: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)'
    });

    useEffect(() => {
        const isMobile = window.innerWidth < 1024;
        if (!isMobile) return;

        let requestAnimationFrameId: number;

        const handleOrientation = (e: DeviceOrientationEvent) => {
            const { beta, gamma } = e;
            if (beta === null || gamma === null) return;

            const rotateX = Math.max(-10, Math.min(10, (beta - 45) / 3));
            const rotateY = Math.max(-10, Math.min(10, gamma / 3));

            requestAnimationFrameId = requestAnimationFrame(() => {
                setTransformStyle({
                    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`,
                    transition: 'transform 0.2s ease-out'
                });
            });
        };

        window.addEventListener('deviceorientation', handleOrientation);
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
            cancelAnimationFrame(requestAnimationFrameId);
        };
    }, []);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const isMobile = window.innerWidth < 1024;
        if (isMobile || !cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation (max 12 degrees)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12; // Invert Y
        const rotateY = ((x - centerX) / centerX) * 12;

        // Glare calculation
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        setTransformStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
            transition: 'transform 0.1s linear'
        });

        setGlareStyle({
            opacity: 1,
            background: `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`
        });
    };

    const handleMouseLeave = () => {
        const isMobile = window.innerWidth < 1024;
        if (isMobile) return;

        setTransformStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
        });

        setGlareStyle({
            opacity: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)'
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={(e) => {
                handleMouseMove(e);
                if (onMouseMove) onMouseMove(e);
            }}
            onMouseLeave={(e) => {
                handleMouseLeave();
                if (props.onMouseLeave) props.onMouseLeave(e);
            }}
            className={`relative ${className}`}
            style={{ ...style, ...transformStyle, transformStyle: 'preserve-3d' }}
            {...props}
        >
            <div 
                className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-overlay z-50 overflow-hidden"
                style={{ ...glareStyle, borderRadius: 'inherit' }}
            />
            {children}
        </div>
    );
};

export default TiltCard;
