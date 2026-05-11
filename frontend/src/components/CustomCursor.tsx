import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (dotRef.current && ringRef.current) {
                // Smooth follow for the dot
                const x = e.clientX;
                const y = e.clientY;

                dotRef.current.style.transform = `translate(${x}px, ${y}px)`;

                // Slightly delayed follow for the ring
                ringRef.current.animate({
                    transform: `translate(${x - 16}px, ${y - 16}px) scale(${isHovering ? 1.5 : 1})`
                }, { duration: 500, fill: "forwards" });
            }

            // Magnetic Logic for elements with .gelly-button
            const target = e.target as HTMLElement;
            const magneticElement = target.closest('.gelly-button') as HTMLElement;

            if (magneticElement) {
                const rect = magneticElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;

                // Only pull if cursor is close to element center
                const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
                const limit = 60; // Pull radius

                if (distance < limit) {
                    const power = 0.3; // Pull strength
                    magneticElement.style.transform = `translate(${distanceX * power}px, ${distanceY * power}px) scale(1.02)`;
                    setIsHovering(true);
                } else {
                    magneticElement.style.transform = '';
                    setIsHovering(false);
                }
            } else {
                setIsHovering(false);
            }

            // Regular pointer check
            const style = window.getComputedStyle(target);
            setIsPointer(style.cursor === 'pointer');
        };

        const handleMouseDown = () => {
            if (ringRef.current) ringRef.current.style.transform += ' scale(0.8)';
        };

        const handleMouseUp = () => {
            if (ringRef.current) ringRef.current.style.transform += ' scale(1.2)';
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isHovering]);

    return (
        <>
            {/* Custom Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out"
                style={{ transform: 'translate(-100px, -100px)' }}
            />
            {/* Custom Ring - The "Liquid Drop" trailing cursor */}
            <div
                ref={ringRef}
                className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-white/30 backdrop-blur-[2px] transition-all duration-300 ease-out
                    ${isHovering || isPointer ? 'bg-white/10 scale-150 border-white/60' : 'bg-transparent scale-100'}
                `}
                style={{
                    transform: 'translate(-100px, -100px)',
                    boxShadow: isHovering ? '0 0 20px rgba(255, 255, 255, 0.2)' : 'none'
                }}
            />

            <style>{`
                /* Hide default cursor globally */
                * {
                    cursor: none !important;
                }
                
                /* Ensure interactive consistency */
                .gelly-button {
                    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
                }
            `}</style>
        </>
    );
};

export default CustomCursor;
