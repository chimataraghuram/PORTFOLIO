import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING NEURAL MATRIX...",
  "SYNCHRONIZING ORBITAL SYSTEMS...",
  "ESTABLISHING QUANTUM CONNECTION...",
  "LOADING AI ENVIRONMENT...",
  "CALIBRATING INTERFACE CORE...",
  "ACTIVATING TECHBOY NETWORK...",
  "SYSTEM CONSCIOUSNESS ONLINE."
];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    let currentLog = 0;
    
    // Log simulator - complete in ~2.5s
    const logInterval = setInterval(() => {
      if (currentLog < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentLog]]);
        
        // Trigger horizontal energy pulse on certain logs
        if (currentLog === 2 || currentLog === 5) {
          setShowPulse(true);
          setTimeout(() => setShowPulse(false), 500);
        }
        currentLog++;
      } else {
        clearInterval(logInterval);
      }
    }, 350); // 7 logs * 350ms = 2450ms

    // Progress bar simulator
    const duration = 2800; // 2.8 seconds total load time
    const intervalTime = 40;
    const increment = 100 / (duration / intervalTime);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 1200); // Give plenty of time for smooth transition
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center font-mono transition-all duration-1000 ease-in-out
        ${isFadingOut ? 'opacity-0 backdrop-blur-none pointer-events-none' : 'opacity-100 backdrop-blur-2xl'}`}
      style={{ backgroundColor: isFadingOut ? 'rgba(5, 8, 22, 0)' : 'rgba(5, 8, 22, 0.8)' }}
    >
      
      {/* 5. CINEMATIC CAMERA IMMERSION (Slow drift wrapper) */}
      <motion.div 
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden pointer-events-none"
        animate={{ scale: [1, 1.05], x: [0, 10], y: [0, -10] }}
        transition={{ duration: 10, ease: 'linear' }}
      >
        
        {/* 7. CENTRAL ATMOSPHERIC FOCUS (Faint Holographic Core) */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full border border-cyan-500/10 opacity-30"
          style={{ transformOrigin: 'center' }}
          animate={{ rotate: 360, x: '-50%', y: '-50%', scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full border border-purple-500/10 opacity-20"
          style={{ transformOrigin: 'center' }}
          animate={{ rotate: -360, x: '-50%', y: '-50%', scale: [1, 1.2, 1] }}
          transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
        />
        
        {/* Deep space radial gradient bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-cyan-900/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

      </motion.div>

      {/* 1. TERMINAL ENVIRONMENT REFINEMENT (Scanlines and subtle distortion) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
             backgroundSize: '20px 20px',
             animation: 'scanlines 10s linear infinite' 
           }}>
      </div>

      {/* 6. BOOT ENERGY PULSE SYSTEM */}
      <AnimatePresence>
        {showPulse && (
          <motion.div
            initial={{ top: '-10%', opacity: 0 }}
            animate={{ top: '110%', opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'linear' }}
            className="absolute left-0 w-full h-[10px] bg-cyan-400 blur-md mix-blend-screen z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="z-10 w-full max-w-2xl px-6 flex flex-col gap-8 relative">
        
        {/* Ambient terminal glow behind text */}
        <div className="absolute inset-0 bg-cyan-500/5 blur-[50px] -z-10 rounded-full animate-pulse"></div>
        
        {/* 2. TERMINAL TEXT STORYTELLING */}
        <div className="h-48 overflow-hidden flex flex-col justify-end text-xs md:text-sm text-cyan-400/80 mb-2 relative">
          {logs.map((log, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300 mb-1 tracking-wider drop-shadow-[0_0_5px_rgba(34,211,238,0.3)] text-shadow-sm font-medium">
              <span className="text-purple-400 mr-2 opacity-80">{'>'}</span> {log}
            </div>
          ))}
          {!isFadingOut && (
            <div className="mt-2 animate-pulse"><span className="text-purple-400">{'>'}</span> <span className="w-2 h-4 bg-cyan-400/80 inline-block align-middle shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span></div>
          )}
        </div>

        {/* 3. LOADING BAR CINEMATIC UPGRADE */}
        <div className="w-full relative group">
          <div className="flex justify-between items-end mb-3">
            <span className="text-white/60 font-bold tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">Core Boot Sequence</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-black tabular-nums tracking-widest drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              {Math.floor(progress)}%
            </span>
          </div>
          
          <div className="h-[2px] md:h-1 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5 relative">
            {/* Holographic bloom shadow beneath the bar */}
            <div className="absolute top-0 left-0 h-full bg-cyan-500/20 blur-md" style={{ width: `${progress}%` }} />
            
            {/* The Cinematic Energy Bar */}
            <div 
              className="h-full bg-gradient-to-r from-purple-600 via-cyan-400 to-white transition-all duration-75 ease-out relative shadow-[0_0_15px_rgba(34,211,238,0.6)]"
              style={{ width: `${progress}%` }}
            >
              {/* Leading edge bright particle sweep */}
              <div className="absolute top-0 right-0 h-full w-[20px] bg-white blur-[2px] animate-pulse"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
