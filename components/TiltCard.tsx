import React, { useRef, useState, MouseEvent } from 'react';

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

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation (max 12 degrees)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12; // Invert Y
        const rotateY = ((x - centerX) / centerX) * 12;

        setTransformStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
            transition: 'transform 0.1s linear'
        });
    };

    const handleMouseLeave = () => {
        setTransformStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
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
            className={className}
            style={{ ...style, ...transformStyle, transformStyle: 'preserve-3d' }}
            {...props}
        >
            {children}
        </div>
    );
};

export default TiltCard;
