import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isVisibleRef = useRef(false);
  const isHoveringRef = useRef(false);

  // Use motion values for better performance
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the trailing ring (smooth delay)
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Avoid spending frames on touch devices and honour reduced-motion users.
    if (
      window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches ||
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0)
    ) {
      setIsVisible(false);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Do not enqueue React updates for every pointer pixel. The previous
      // implementation re-rendered the whole cursor on every mouse move.
      const target = e.target instanceof Element ? e.target : null;
      const hovering = Boolean(target?.closest('a, button, [role="button"], .cursor-pointer'));
      if (hovering !== isHoveringRef.current) {
        isHoveringRef.current = hovering;
        setIsHovering(hovering);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center Dot (Instant) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[999999] shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Trailing Ring (Delayed + Morphing on hover) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/80 rounded-full pointer-events-none z-[999998] flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHovering ? 'rgba(34, 211, 238, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default Cursor;
