import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING KERNEL...",
  "LOADING NEURAL NET MODULES...",
  "MOUNTING VIRTUAL DOM...",
  "ESTABLISHING SECURE CONNECTION...",
  "BYPASSING MAINFRAME FIREWALL...",
  "DECRYPTING ASSETS...",
  "CALIBRATING UI PHYSICS...",
  "SYSTEM ONLINE."
];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let currentLog = 0;
    
    // Log simulator
    const logInterval = setInterval(() => {
      if (currentLog < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logInterval);
      }
    }, 250);

    // Progress bar simulator
    const duration = 2500; // 2.5 seconds total load time
    const intervalTime = 50;
    const increment = 100 / (duration / intervalTime);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 800); // Wait for fade out animation
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
    <div className={`fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center font-mono transition-opacity duration-700 ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="z-10 w-full max-w-2xl px-6 flex flex-col gap-6">
        
        {/* Boot Logs */}
        <div className="h-40 overflow-hidden flex flex-col justify-end text-xs md:text-sm text-cyan-500/80 mb-4">
          {logs.map((log, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className="text-pink-500 mr-2">{'>'}</span> {log}
            </div>
          ))}
          <div className="mt-1 animate-pulse"><span className="text-pink-500">{'>'}</span> _</div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full relative">
          <div className="flex justify-between items-end mb-2">
            <span className="text-white font-black tracking-widest uppercase text-sm md:text-base">System Boot</span>
            <span className="text-cyan-400 font-bold tabular-nums">{Math.floor(progress)}%</span>
          </div>
          
          <div className="h-2 md:h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-white/10 relative">
            {/* The Bar */}
            <div 
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all duration-75 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/50 blur-sm"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
