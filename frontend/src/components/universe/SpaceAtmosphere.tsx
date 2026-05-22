import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpaceAtmosphereProps {
  activeSection?: string;
}

const SECTION_THEMES: Record<string, {
  core: string;
  horizon: string;
  nebulaA: string;
  nebulaB: string;
  star: number;
  warp: number;
  blackHole: number;
}> = {
  home: {
    core: 'linear-gradient(135deg, #020408 0%, #07111f 42%, #0d1830 100%)',
    horizon: 'radial-gradient(ellipse at 72% 45%, rgba(34, 211, 238, 0.14), transparent 56%)',
    nebulaA: 'radial-gradient(ellipse at 18% 18%, rgba(168, 85, 247, 0.2), transparent 58%)',
    nebulaB: 'radial-gradient(ellipse at 78% 72%, rgba(14, 165, 233, 0.18), transparent 62%)',
    star: 0.48,
    warp: 0.18,
    blackHole: 0,
  },
  about: {
    core: 'linear-gradient(145deg, #030815 0%, #081422 45%, #101336 100%)',
    horizon: 'radial-gradient(ellipse at 38% 42%, rgba(59, 130, 246, 0.18), transparent 58%)',
    nebulaA: 'radial-gradient(ellipse at 72% 18%, rgba(34, 211, 238, 0.18), transparent 60%)',
    nebulaB: 'radial-gradient(ellipse at 16% 82%, rgba(99, 102, 241, 0.16), transparent 62%)',
    star: 0.5,
    warp: 0.26,
    blackHole: 0.06,
  },
  internships: {
    core: 'linear-gradient(150deg, #050714 0%, #101021 42%, #1b1230 100%)',
    horizon: 'radial-gradient(ellipse at 66% 36%, rgba(244, 114, 182, 0.16), transparent 56%)',
    nebulaA: 'radial-gradient(ellipse at 24% 18%, rgba(250, 204, 21, 0.12), transparent 58%)',
    nebulaB: 'radial-gradient(ellipse at 78% 78%, rgba(168, 85, 247, 0.2), transparent 64%)',
    star: 0.46,
    warp: 0.34,
    blackHole: 0.1,
  },
  projects: {
    core: 'linear-gradient(145deg, #020617 0%, #071522 42%, #04172b 100%)',
    horizon: 'radial-gradient(ellipse at 62% 50%, rgba(6, 182, 212, 0.22), transparent 58%)',
    nebulaA: 'radial-gradient(ellipse at 20% 22%, rgba(34, 211, 238, 0.2), transparent 62%)',
    nebulaB: 'radial-gradient(ellipse at 86% 76%, rgba(59, 130, 246, 0.18), transparent 64%)',
    star: 0.56,
    warp: 0.42,
    blackHole: 0.14,
  },
  achievements: {
    core: 'linear-gradient(145deg, #070815 0%, #171322 44%, #22152d 100%)',
    horizon: 'radial-gradient(ellipse at 60% 45%, rgba(251, 191, 36, 0.2), transparent 56%)',
    nebulaA: 'radial-gradient(ellipse at 18% 18%, rgba(244, 114, 182, 0.18), transparent 62%)',
    nebulaB: 'radial-gradient(ellipse at 82% 80%, rgba(251, 146, 60, 0.16), transparent 64%)',
    star: 0.5,
    warp: 0.5,
    blackHole: 0.18,
  },
  minigame: {
    core: 'linear-gradient(145deg, #05020d 0%, #0c1026 38%, #17113c 100%)',
    horizon: 'radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.24), transparent 52%)',
    nebulaA: 'radial-gradient(ellipse at 18% 26%, rgba(34, 211, 238, 0.24), transparent 60%)',
    nebulaB: 'radial-gradient(ellipse at 84% 72%, rgba(250, 204, 21, 0.18), transparent 64%)',
    star: 0.64,
    warp: 0.72,
    blackHole: 0.24,
  },
  contact: {
    core: 'linear-gradient(145deg, #02010a 0%, #080713 38%, #13051e 100%)',
    horizon: 'radial-gradient(ellipse at 50% 62%, rgba(168, 85, 247, 0.3), transparent 56%)',
    nebulaA: 'radial-gradient(ellipse at 18% 18%, rgba(34, 211, 238, 0.12), transparent 60%)',
    nebulaB: 'radial-gradient(ellipse at 84% 78%, rgba(236, 72, 153, 0.22), transparent 62%)',
    star: 0.36,
    warp: 0.58,
    blackHole: 0.78,
  },
};

const SpaceAtmosphere: React.FC<SpaceAtmosphereProps> = ({ activeSection = 'home' }) => {
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0;
        setScrollRatio(Math.max(0, Math.min(1, ratio)));
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = SECTION_THEMES[activeSection] || SECTION_THEMES.home;
  
  const baseOpacity = activeSection === 'home' ? 1 : activeSection === 'minigame' ? 0.92 : 0.72;

  // Cinematic Descent: As user approaches the Event Horizon, heavily dim the entire universe
  // Start fading at 40% scroll, reach near absolute darkness (0.02) at 100%
  const singularityFade = scrollRatio > 0.7 ? 1 - ((scrollRatio - 0.7) / 0.3) * 0.45 : 1; 
  const globalOpacity = baseOpacity * singularityFade;

  const starOpacity = theme.star * (scrollRatio > 0.86 ? 1 - ((scrollRatio - 0.86) / 0.14) * 0.38 : 1);
  const blackHoleOpacity = Math.max(theme.blackHole, scrollRatio > 0.78 ? (scrollRatio - 0.78) / 0.22 : 0);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <motion.div
        className="absolute inset-0"
        animate={{ background: theme.core }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />

      <AnimatePresence>
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: globalOpacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-[-12%]"
            style={{ background: theme.horizon }}
            animate={{
              x: ['-1%', '1.5%', '-1%'],
              y: ['0%', '-1.5%', '0%'],
              scale: [1, 1.04, 1],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full"
            style={{ background: theme.nebulaA }}
            animate={{
              x: ['0%', '5%', '0%'],
              y: ['0%', '3%', '0%'],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute top-[40%] right-[-10%] w-[70%] h-[70%] rounded-full"
            style={{ background: theme.nebulaB }}
            animate={{
              x: ['0%', '-5%', '0%'],
              y: ['0%', '-3%', '0%'],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />

          <motion.div
            className="absolute bottom-[-22%] left-[20%] w-[58%] h-[54%] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(30, 64, 175, 0.22), transparent 70%)' }}
            animate={{
              x: ['0%', '4%', '0%'],
              y: ['0%', '-4%', '0%'],
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: theme.warp,
          backgroundPosition: ['0px 0px', '240px 480px'],
        }}
        transition={{
          opacity: { duration: 1.4, ease: 'easeInOut' },
          backgroundPosition: { duration: activeSection === 'minigame' ? 11 : 18, repeat: Infinity, ease: 'linear' },
        }}
        style={{
          backgroundImage:
            'linear-gradient(115deg, transparent 0%, rgba(103,232,249,0.12) 48%, transparent 50%), linear-gradient(115deg, transparent 0%, rgba(168,85,247,0.1) 52%, transparent 54%)',
          backgroundSize: '320px 620px',
        }}
      />

      <div 
        className="absolute inset-0 transition-opacity duration-700" 
        style={{ 
          opacity: starOpacity,
          backgroundImage:
            'radial-gradient(1px 1px at 20px 30px, #ffffff, transparent), radial-gradient(1px 1px at 40px 70px, rgba(103,232,249,0.95), transparent), radial-gradient(1.5px 1.5px at 50px 160px, #ffffff, transparent), radial-gradient(1px 1px at 90px 40px, rgba(196,181,253,0.95), transparent), radial-gradient(1.5px 1.5px at 160px 120px, rgba(255,255,255,0.9), transparent)',
          backgroundSize: '190px 190px, 240px 240px, 310px 310px, 270px 270px, 360px 360px' 
        }} 
      />

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: blackHoleOpacity }}
        transition={{ duration: 1.7, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle at 50% 72%, rgba(0,0,0,0.98) 0 8%, rgba(88,28,135,0.75) 9%, rgba(168,85,247,0.28) 15%, rgba(14,165,233,0.08) 26%, transparent 44%)',
          filter: 'saturate(1.2)',
        }}
      />
    </div>
  );
};

export default SpaceAtmosphere;
