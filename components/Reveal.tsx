import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children?: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number; // in seconds
}

export const Reveal = ({ children, width = "fit-content", className = "", delay = 0 }: RevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility based on intersection
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Optional: Check if we want to hide it again. 
          // If the user wants animations "again", we must hide it when it leaves.
          // However, hiding immediately when it barely leaves can be annoying.
          // Let's hide it if it's NOT intersecting.
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px" // Slightly larger margin to prevent flicker at exact edge
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      // Clean up observer
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.95)",
        filter: isVisible ? "blur(0)" : "blur(10px)",
        // Liquid drop spring transition
        transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
        willChange: "transform, filter, opacity"
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;