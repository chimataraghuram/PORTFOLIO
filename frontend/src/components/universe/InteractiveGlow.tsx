import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

/**
 * Layer 3: Interactive Glow
 * Tracks the mouse and casts an additive cyan/violet spotlight onto the background.
 */
const InteractiveGlow: React.FC = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  if (isMobile) return null;

  // Raw mouse coordinates
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth springs for premium cinematic easing
  const springConfig = { damping: 40, stiffness: 150, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices for performance
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <motion.div
      className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 0.4 : 0,
        background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 70%)',
      }}
      transition={{ opacity: { duration: 0.8 } }}
    />
  );
};

export default InteractiveGlow;
