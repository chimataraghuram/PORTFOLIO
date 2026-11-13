import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, RotateCcw, X, Crosshair, Trophy, ShieldAlert } from 'lucide-react';
import { SOCIAL_LINKS, ABOUT_DATA, SKILLS_DATA } from '../constants';
import Particles from './Particles';
import GameStats from './GameStats';
import SectionPlanet from './SectionPlanet';

const PortalWrapper: React.FC<{ active: boolean; children: React.ReactNode }> = ({ active, children }) => {
   return active ? createPortal(children, document.body) : <>{children}</>;
};

const AlienShipWrapper = React.forwardRef<HTMLDivElement, { variant?: number }>(
   ({ variant = 0 }, ref) => {
   const alienShapes = [
      // Pink Triangle (3 eyes)
      <div className="w-10 h-8 bg-pink-500 flex flex-col items-center justify-center relative" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
         <div className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center absolute top-1.5"><div className="w-1 h-1 bg-black rounded-full" /></div>
         <div className="flex gap-1.5 mt-2.5">
            <div className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center"><div className="w-1 h-1 bg-black rounded-full" /></div>
            <div className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center"><div className="w-1 h-1 bg-black rounded-full" /></div>
         </div>
      </div>,
      // Blue Horned (1 eye)
      <div className="w-10 h-8 bg-blue-500 rounded-t-full rounded-b-md flex items-center justify-center relative">
         <div className="absolute -left-1 top-0 w-2 h-3 bg-yellow-400 rounded-full rotate-[-45deg]" />
         <div className="absolute -right-1 top-0 w-2 h-3 bg-yellow-400 rounded-full rotate-[45deg]" />
         <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mt-1"><div className="w-2.5 h-2.5 bg-black rounded-full" /></div>
      </div>,
      // Yellow Cylinder (2 eyes)
      <div className="w-8 h-9 bg-yellow-400 rounded-t-xl rounded-b-sm flex items-center justify-center relative gap-1">
         <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-black rounded-full" /></div>
         <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-black rounded-full" /></div>
      </div>,
      // Green Cyclops (1 eye)
      <div className="w-10 h-8 bg-green-500 rounded-t-full rounded-b-md flex items-center justify-center relative">
         <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-black rounded-full" /></div>
      </div>
   ];

   const thrusters = [
      <div className="flex gap-2 -mt-1 z-0"><div className="w-2 h-4 bg-slate-600 rounded-b-full"></div><div className="w-2 h-5 bg-slate-500 rounded-b-full"></div><div className="w-2 h-4 bg-slate-600 rounded-b-full"></div></div>,
      <div className="flex gap-3 -mt-1 z-0"><div className="w-2 h-5 bg-purple-600 rounded-b-full transform -rotate-[20deg]"></div><div className="w-2 h-5 bg-purple-600 rounded-b-full transform rotate-[20deg]"></div></div>,
      <div className="flex gap-1 -mt-1 z-0"><div className="w-1.5 h-4 bg-orange-500 rounded-b-full animate-pulse"></div><div className="w-1.5 h-6 bg-yellow-400 rounded-b-full animate-pulse"></div><div className="w-1.5 h-4 bg-orange-500 rounded-b-full animate-pulse"></div></div>,
      <div className="flex gap-1.5 -mt-1 z-0"><div className="w-1 h-6 bg-green-500 rounded-full animate-pulse"></div><div className="w-1 h-8 bg-green-500 rounded-full animate-pulse" style={{animationDelay:'0.2s'}}></div><div className="w-1 h-6 bg-green-500 rounded-full animate-pulse" style={{animationDelay:'0.4s'}}></div></div>
   ];

   const baseColors = [
      'bg-pink-600 border-pink-400',
      'bg-blue-600 border-blue-400',
      'bg-yellow-500 border-yellow-300',
      'bg-green-600 border-green-400'
   ];

   return (
      <div ref={ref} className="absolute top-0 left-0 flex flex-col items-center justify-center opacity-0 pointer-events-none select-none drop-shadow-2xl">
         <div className="w-12 h-10 bg-white/10 backdrop-blur-sm rounded-t-[2.5rem] border-2 border-b-0 border-white/40 flex items-end justify-center relative -mb-2 z-10 shadow-[inset_0_10px_20px_rgba(255,255,255,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 rounded-t-[2.5rem] pointer-events-none" />
            <div className="scale-75 origin-bottom">
               {alienShapes[variant % 4]}
            </div>
         </div>
         <div className={`relative w-16 h-6 z-20 rounded-full border-2 border-b-4 border-black/30 shadow-[0_10px_20px_rgba(0,0,0,0.5)] ${baseColors[variant % 4]}`}>
            <div className="absolute top-1 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
            <div className="absolute top-1 right-1/4 w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s'}} />
            <div className="absolute top-1 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s'}} />
         </div>
         <div className="scale-75 origin-top">
            {thrusters[variant % 4]}
         </div>
      </div>
   );
});
AlienShipWrapper.displayName = 'AlienShipWrapper';

interface FooterProps {
   score: number;
   setScore: React.Dispatch<React.SetStateAction<number>>;
   level: number;
   setLevel: React.Dispatch<React.SetStateAction<number>>;
   bestScore: number;
   setBestScore: React.Dispatch<React.SetStateAction<number>>;
}

const MiniGame: React.FC<FooterProps> = ({ score, setScore, level, setLevel, bestScore, setBestScore }) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

   const [isPlaying, setIsPlaying] = useState(false);
   const [gameOver, setGameOver] = useState(false);
   const [hasWon, setHasWon] = useState(false);
   const [levelMessage, setLevelMessage] = useState<string | null>(null);
   const [isTransitioning, setIsTransitioning] = useState(false);
   const [isShaking, setIsShaking] = useState(false);
   const [showInstructions, setShowInstructions] = useState(false);
   const [countdown, setCountdown] = useState(5);
   const [showPowerUpInstruction, setShowPowerUpInstruction] = useState(false);
   const [showScrollLockHint, setShowScrollLockHint] = useState(false);
   const [showBossBanner, setShowBossBanner] = useState(false);

   const hasSeenPowerUpRef = useRef(false);
   const powerUpPauseRef = useRef(false);
   const roundTimersRef = useRef(new Set<ReturnType<typeof setTimeout>>());

   const clearRoundTimers = () => {
      roundTimersRef.current.forEach(clearTimeout);
      roundTimersRef.current.clear();
   };

   const scheduleRoundTimeout = (callback: () => void, delay: number) => {
      const timer = setTimeout(() => {
         roundTimersRef.current.delete(timer);
         callback();
      }, delay);
      roundTimersRef.current.add(timer);
      return timer;
   };

   const gameStateRef = useRef({ isPlaying, gameOver, hasWon, score, level, isTransitioning });
   useEffect(() => {
      gameStateRef.current = { isPlaying, gameOver, hasWon, score, level, isTransitioning };
      if (score > bestScore) {
         setBestScore(score);
         localStorage.setItem('minigame_best_score', score.toString());
      }
   }, [isPlaying, gameOver, hasWon, score, level, bestScore, setBestScore]);

   useEffect(() => {
      let timer: number;
      if (showInstructions) {
         setCountdown(5);
         timer = window.setInterval(() => {
            setCountdown((prev) => {
               if (prev <= 1) {
                  clearInterval(timer);
                  handlePlayClick();
                  return 0;
               }
               return prev - 1;
            });
         }, 1000);
      }
      return () => clearInterval(timer);
   }, [showInstructions]);

   const navLinks = [
      { label: 'Home', href: '#home', className: 'bg-yellow-400 text-black border-yellow-400' },
      { label: 'About', href: '#about', className: 'bg-orange-500 text-white border-orange-500' },
      { label: 'Internships', href: '#internships', className: 'bg-purple-600 text-white border-purple-600' },
      { label: 'Projects', href: '#projects', className: 'bg-lime-500 text-black border-lime-500' },
      { label: 'Contact', href: '#contact', className: 'bg-teal-400 text-black border-teal-400' },
   ];

   const socialItems = [
      { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, bg: 'bg-[#0077b5]' },
      { label: 'GitHub', href: SOCIAL_LINKS.github, bg: 'bg-white' },
      { label: 'Telegram', href: SOCIAL_LINKS.telegram, bg: 'bg-[#229ED9]' },
      { label: 'Linktree', href: SOCIAL_LINKS.linktree, bg: 'bg-[#22c55e]' },
      { label: 'Email', href: `mailto:${SOCIAL_LINKS.email}`, bg: 'bg-[#ef4444]' },
   ];

   const skillBlobColors = ['bg-orange-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-400', 'bg-pink-500', 'bg-indigo-500', 'bg-purple-500', 'bg-red-500', 'bg-teal-400', 'bg-cyan-500'];
   const additionalBlobs = [
      { id: 'blob1', w: 100, h: 100, bg: 'bg-orange-500', radius: '54% 46% 42% 58% / 58% 41% 59% 42%' },
      { id: 'circle1', w: 80, h: 80, bg: 'bg-indigo-500', radius: '50%' },
      { id: 'blob2', w: 90, h: 100, bg: 'bg-blue-500', radius: '37% 63% 51% 49% / 37% 35% 65% 63%' },
      { id: 'pill1', w: 50, h: 120, bg: 'bg-green-500', radius: '30px' },
      { id: 'blob3', w: 110, h: 110, bg: 'bg-yellow-400', radius: '63% 37% 39% 61% / 46% 36% 64% 54%' },
      { id: 'blob4', w: 115, h: 100, bg: 'bg-pink-500', radius: '30% 70% 70% 30% / 30% 30% 70% 70%' }
   ];

   const handlePlayClick = () => {
      // Scroll lock is handled by the useEffect based on showInstructions or isPlaying
      clearRoundTimers();
      setShowInstructions(false);
      setShowPowerUpInstruction(false);
      setShowBossBanner(false);
      setShowScrollLockHint(false);
      powerUpPauseRef.current = false;
      scheduleRoundTimeout(() => {
         setScore(0);
         setLevel(1);
         setGameOver(false);
         setHasWon(false);
         setIsTransitioning(true);
         setLevelMessage('LEVEL 1 START!');
         setIsPlaying(true);
         setShowScrollLockHint(true);
      }, 10);

      scheduleRoundTimeout(() => {
         setLevelMessage(null);
         setIsTransitioning(false);
      }, 1500);
   };

   useEffect(() => {
      if (showScrollLockHint) {
         const timer = setTimeout(() => {
            setShowScrollLockHint(false);
         }, 5000);
         return () => clearTimeout(timer);
      }
   }, [showScrollLockHint]);

    const handleClose = () => {
       clearRoundTimers();
       setIsPlaying(false);
       setShowInstructions(false);
       setGameOver(false);
       setHasWon(false);
       setIsTransitioning(false);
       setLevelMessage(null);
       setIsShaking(false);
       setShowPowerUpInstruction(false);
       setShowBossBanner(false);
       setShowScrollLockHint(false);
       powerUpPauseRef.current = false;
       hasSeenPowerUpRef.current = false;
       setScore(0);
       setLevel(1);
    };

   // Escape Key Listener to exit game
    useEffect(() => {
       const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
             handleClose();
          }
       };
       window.addEventListener('keydown', handleKeyDown);
       return () => {
          window.removeEventListener('keydown', handleKeyDown);
       };
    }, []);

   useEffect(() => () => clearRoundTimers(), []);

     // Global Scroll Lock Management - Only locks when actually playing or reading instructions or showing win/lose overlay
    useEffect(() => {
       const isOverlayActive = isPlaying || showInstructions || gameOver || hasWon;
      const previousBodyOverflow = document.body.style.overflow;
      const previousHtmlOverflow = document.documentElement.style.overflow;
      const previousTouchAction = document.body.style.touchAction;
       if (isOverlayActive) {
          document.body.style.overflow = 'hidden';
          document.documentElement.style.overflow = 'hidden';
          // Also handle mobile safe-area scrolling issues
          document.body.style.touchAction = 'none';
       } else {
         document.body.style.overflow = previousBodyOverflow;
         document.documentElement.style.overflow = previousHtmlOverflow;
         document.body.style.touchAction = previousTouchAction;
       }
       return () => {
         document.body.style.overflow = previousBodyOverflow;
         document.documentElement.style.overflow = previousHtmlOverflow;
         document.body.style.touchAction = previousTouchAction;
       };
    }, [isPlaying, showInstructions, gameOver, hasWon]);

   useEffect(() => {
      if (!containerRef.current || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resizeGame = () => {
         const width = containerRef.current?.clientWidth || window.innerWidth;
         const height = containerRef.current?.clientHeight || window.innerHeight;
         // Keep the game sharp on retina phones/tablets without rendering an
         // unnecessarily expensive 3x/4x canvas.
         const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
         canvas.width = Math.round(width * pixelRatio);
         canvas.height = Math.round(height * pixelRatio);
         canvas.style.width = `${width}px`;
         canvas.style.height = `${height}px`;
         ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
         return { width, height };
      };

      let { width, height } = resizeGame();

      // Creating an AudioContext up front is wasteful on the landing screen and
      // can consume one of mobile Safari's limited audio contexts. Create it
      // only after the player has interacted with the game.
      let audioCtx: AudioContext | null = null;
      const getAudioContext = () => {
         if (!audioCtx || audioCtx.state === 'closed') {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            audioCtx = new AudioContextClass();
         }
         return audioCtx;
      };
      const playSound = (type: 'laser' | 'boom' | 'powerup' | 'bossHit', volume = 0.1) => {
         const context = getAudioContext();
         if (context.state === 'suspended') context.resume();
         const osc = context.createOscillator();
         const gain = context.createGain();
         osc.connect(gain);
         gain.connect(context.destination);

         const now = context.currentTime;

         if (type === 'laser') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.1);
            gain.gain.setValueAtTime(volume, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
         } else if (type === 'boom') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, now);
            osc.frequency.exponentialRampToValueAtTime(10, now + 0.2);
            gain.gain.setValueAtTime(volume * 1.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
         } else if (type === 'powerup') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.linearRampToValueAtTime(1200, now + 0.2);
            gain.gain.setValueAtTime(volume, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
         } else if (type === 'bossHit') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.linearRampToValueAtTime(80, now + 0.1);
            gain.gain.setValueAtTime(volume * 2, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
         }
      };

      let animationId: number;

      let explosionIntervalId: number | null = null;

      const getGameMetrics = () => {
         const shortestSide = Math.min(width, height);
         const isMobileWidth = width < 768;
         const isTabletWidth = width >= 768 && width < 1024;
         const scale = Math.max(0.72, Math.min(1.08, shortestSide / 760));
         const enemySize = Math.round(Math.max(46, Math.min(66, shortestSide * (isMobileWidth ? 0.082 : 0.074))));
         const bulletW = Math.max(4, Math.round(6 * scale));
         const bulletH = Math.max(14, Math.round(20 * scale));
         const shipSize = Math.round(Math.max(46, Math.min(66, 60 * scale)));
         const playerBottom = Math.max(72, Math.min(110, height * (isMobileWidth ? 0.14 : 0.12)));
         const spawnBand = Math.max(enemySize * 3.1, Math.min(width * (isMobileWidth ? 0.82 : isTabletWidth ? 0.66 : 0.52), 560));
         const spawnLeft = Math.max(16, (width - spawnBand) / 2);
         const spawnTop = -enemySize * 2 - 120;
         const spacingY = Math.max(enemySize * 1.28, isMobileWidth ? 66 : 84);

         return {
            isMobileWidth,
            isTabletWidth,
            scale,
            enemySize,
            bulletW,
            bulletH,
            shipSize,
            playerBottom,
            spawnBand,
            spawnLeft,
            spawnTop,
            spacingY,
         };
      };

      let metrics = getGameMetrics();

      const player = {
         x: width / 2,
         y: height - metrics.playerBottom,
         w: metrics.shipSize,
         h: metrics.shipSize,
         targetX: width / 2,
         targetY: height - metrics.playerBottom, // For smooth crosshair
         dead: false
      };

      const getPlayerBounds = () => ({
         minX: metrics.shipSize / 2 + 8,
         maxX: width - metrics.shipSize / 2 - 8,
         // Ship is strictly anchored to the player baseline at the bottom
         minY: height - metrics.playerBottom,
         maxY: height - metrics.playerBottom,
      });

      // Control states
      let isPointerDown = false;
      let isKeyboardFiring = false;
      let isMouseMoving = false;
      let lastMoveTime = performance.now();
      const pressedKeys = new Set<string>();

      // Removed localPowerUpPause, using powerUpPauseRef.current instead
      const bullets: { x: number; y: number; startY: number; w: number; h: number; speed: number; killed: boolean }[] = [];
      const bossBullets: { x: number; y: number; w: number; h: number; speed: number; killed: boolean }[] = [];
      const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string }[] = [];
      const powerUps: { x: number; y: number; type: 'spread' | 'rapid' | 'shield', w: number, h: number }[] = [];
      const confetti: { x: number; y: number; vx: number; vy: number; color: string; life: number }[] = [];
      const floatingTexts: { x: number; y: number; text: string; color: string; life: number }[] = [];
      const stars: { x: number; y: number; r: number; speed: number; color: string }[] = [];
      const cheerEmojiParticles: { x: number; y: number; vx: number; vy: number; emoji: string; size: number; life: number }[] = [];
      for (let i = 0; i < 150; i++) {
         stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 2 + 0.5,
            color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`
         });
      }

      let activePowerUp = { type: 'none', timer: 0 };
      let playerHasShield = false;

      // Initialize enemies
      const enemies: {
         el: HTMLElement | null;
         alive: boolean;
         x: number;
         y: number;
         w: number;
         h: number;
         baseX: number;
         startY: number;
         row: number;
         col: number;
         speed: number;
         offset: number;
         origRow: number;
         behavior: 'sway' | 'zigzag' | 'dive';
         hp: number;
         maxHp: number;
         requiredLevel: number;
      }[] = [];

      // Boss for level 3
      const isMobileSize = width < 768;
      let boss = {
         active: false,
         hp: isMobileSize ? 80 : 150,
         maxHp: isMobileSize ? 80 : 150,
         x: width / 2,
         y: -200,
         vx: isMobileSize ? 1.5 : 3,
         w: Math.min(200, width * 0.6),
         h: Math.min(150, width * 0.45),
         phase: 0,
         baseY: Math.min(150, height * 0.22)
      };

      const cols = Math.max(2, Math.floor(metrics.spawnBand / Math.max(metrics.enemySize * 1.45, 72)));

      let activeElements = elementsRef.current.filter((el) => el !== null) as HTMLElement[];

      activeElements.forEach((el, index) => {
         const w = metrics.enemySize;
         const h = metrics.enemySize;
         const row = Math.floor(index / cols);
         const col = index % cols;

         // Determine behavior
         let behavior: 'sway' | 'zigzag' | 'dive' = 'sway';
         if (index >= 2 + navLinks.length + socialItems.length && index < 2 + navLinks.length + socialItems.length + SKILLS_DATA.length) {
            behavior = 'zigzag'; // Skills wave gently
         } else if (index >= 2 + navLinks.length + socialItems.length + SKILLS_DATA.length) {
            behavior = 'sway'; // Blobs sway smoothly (no instant dive)
         }

         // REFINED LEVEL PROGRESSION:
         // index 0-1: Big containers (PORTFOLIO, Role)
         // 2 to 2+navLinks.length-1: Nav links
         // ... social, skills, blobs.

         const level1Count = 2 + navLinks.length + socialItems.length; // 12 invaders
         const level2Count = 12; // Balanced 12-alien fleet for Level 2 (3 rows x 4 cols)

         let targetLevel = 99; // Inactive by default
         let targetLevelIndex = 0;

         if (index < level1Count) {
            targetLevel = 1;
            targetLevelIndex = index;
         } else if (index < level1Count + level2Count) {
            targetLevel = 2;
            targetLevelIndex = index - level1Count;
         }

         // Cohesive formation grid
         const levelCols = Math.max(3, Math.min(4, Math.floor(metrics.spawnBand / (w * 1.5))));
         const lane = targetLevelIndex % levelCols;
         const laneWidth = metrics.spawnBand / levelCols;
         const startX = Math.max(12, Math.min(width - w - 12, metrics.spawnLeft + laneWidth * (lane + 0.5) - w / 2));
         const targetRow = Math.floor(targetLevelIndex / levelCols);
         const spacingY = Math.min(metrics.spacingY, 68);
         // Spawns smoothly above viewport (off-screen)
         const formationBaseTop = -h - 80;
         const startY = formationBaseTop - targetRow * spacingY;

         // Level isolation: strictly activate only enemies belonging to this exact level
         const isLevelActive = targetLevel === level;

         const isMobile = width < 768;
         const globalSpeedMultiplier = targetLevel === 2 ? 1.25 : 1.0;
         const mobileSpeedMultiplier = isMobile ? 1.05 : 1.0; 

         // Exactly 1 HP for all standard aliens - crisp 1-hit arcade destruction!
         const initHp = 1;

         // Uniform synchronized speed for cohesive fleet formation
         const baseFleetSpeed = targetLevel === 2 ? 0.40 : 0.32;
         const fleetSpeed = baseFleetSpeed * mobileSpeedMultiplier;

         enemies.push({
            el,
            alive: isLevelActive,
            x: startX,
            y: startY,
            w,
            h,
            baseX: startX,
            startY: startY,
            row: targetRow,
            origRow: targetRow,
            col: lane,
            speed: fleetSpeed,
            offset: 0, // Synchronized sway phase across entire fleet
            behavior: 'sway',
            hp: initHp,
            maxHp: initHp,
            requiredLevel: targetLevel,
         });

         el.style.transform = `translate(${startX}px, ${startY}px)`;
         el.style.width = `${w}px`;
         el.style.height = `${h}px`;
         el.style.transition = 'opacity 0.35s cubic-bezier(0.23, 1, 0.32, 1)';

         if (!isPlaying || !isLevelActive || level === 3 || isTransitioning) {
            el.style.display = 'none';
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
         } else {
            el.style.display = 'flex';
            el.style.opacity = '1';
            el.style.pointerEvents = 'auto';
         }
      });

      let lastTime = performance.now();
      let shootTimer = 0;
      let bossShootTimer = 0;

      let lastTouchX: number | null = null;
      let lastTouchY: number | null = null;

      const handlePointerMove = (e: MouseEvent | TouchEvent) => {
         if (!gameStateRef.current.isPlaying || gameStateRef.current.gameOver) return;

         const target = e.target as HTMLElement | null;
         if (target && (target.closest('button') || target.closest('a') || target.closest('.pointer-events-auto') || target.classList.contains('pointer-events-auto'))) {
            return;
         }

         if (e.cancelable) e.preventDefault(); // Prevent touch-scrolling while actively playing

         const rect = containerRef.current?.getBoundingClientRect();
         if (rect) {
            let clientX = 0;
            let clientY = 0;
            let isTouch = false;

            if ('touches' in e && e.touches.length > 0) {
               clientX = e.touches[0].clientX;
               clientY = e.touches[0].clientY;
               isTouch = true;
            } else if ('clientX' in e) {
               clientX = e.clientX;
               clientY = e.clientY;
            } else {
               return;
            }

            const bounds = getPlayerBounds();
            if (isTouch) {
               if (lastTouchX !== null) {
                  const dx = clientX - lastTouchX;
                  player.targetX += dx * 1.4;
               } else {
                  player.targetX = clientX - rect.left;
               }
               lastTouchX = clientX;
               lastTouchY = clientY;
            } else {
               player.targetX = clientX - rect.left;
            }
            player.targetX = Math.max(bounds.minX, Math.min(bounds.maxX, player.targetX));
            player.targetY = height - metrics.playerBottom;

            lastMoveTime = performance.now();
         }
      };

      const handlePointerDown = (e: MouseEvent | TouchEvent) => {
         if (!gameStateRef.current.isPlaying || gameStateRef.current.gameOver) return;

         const target = e.target as HTMLElement | null;
         if (target && (target.closest('button') || target.closest('a') || target.closest('.pointer-events-auto') || target.classList.contains('pointer-events-auto'))) {
            return;
         }

         isPointerDown = true;
         if ('touches' in e && e.touches.length > 0) {
            lastTouchX = e.touches[0].clientX;
            lastTouchY = e.touches[0].clientY;
         }
         handlePointerMove(e); // Update position immediately on down
      };

      const handlePointerUp = () => {
         isPointerDown = false;
         lastTouchX = null;
         lastTouchY = null;
      };

      const handleGameKeyDown = (e: KeyboardEvent) => {
         if (!gameStateRef.current.isPlaying || gameStateRef.current.gameOver || gameStateRef.current.hasWon) return;
         const key = e.key.toLowerCase();
         if (!['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', ' '].includes(key)) return;
         e.preventDefault();
         pressedKeys.add(key);
         if (key === ' ') isKeyboardFiring = true;
      };

      const handleGameKeyUp = (e: KeyboardEvent) => {
         const key = e.key.toLowerCase();
         pressedKeys.delete(key);
         if (key === ' ') isKeyboardFiring = false;
      };

      window.addEventListener('mousemove', handlePointerMove as any);
      window.addEventListener('mousedown', handlePointerDown as any);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove as any, { passive: false });
      window.addEventListener('touchstart', handlePointerDown as any, { passive: false });
      window.addEventListener('touchend', handlePointerUp);
      window.addEventListener('touchcancel', handlePointerUp);
      window.addEventListener('keydown', handleGameKeyDown);
      window.addEventListener('keyup', handleGameKeyUp);
      window.addEventListener('blur', handlePointerUp);

      const spawnConfetti = () => {
         for (let i = 0; i < 300; i++) {
            confetti.push({
               x: width / 2,
               y: height / 2,
               vx: (Math.random() - 0.5) * 30,
               vy: (Math.random() - 0.5) * 30 - 10,
               color: `hsl(${Math.random() * 360}, 100%, 50%)`,
               life: 1.0
            });
         }
      };

      const loop = (timestamp: number) => {
         if (!gameStateRef.current.isPlaying && !gameStateRef.current.gameOver && !gameStateRef.current.hasWon) {
            ctx.clearRect(0, 0, width, height);
            return;
         }

         const dt = timestamp - lastTime;
         const frameScale = Math.min(Math.max(dt / 16.67, 0.5), 2.25);
         lastTime = timestamp;

         ctx.clearRect(0, 0, width, height);

         ctx.globalCompositeOperation = 'lighter';
         const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
         gradient.addColorStop(0, 'rgba(147, 51, 234, 0.05)');
         gradient.addColorStop(1, 'rgba(0,0,0,0)');
         ctx.fillStyle = gradient;
         ctx.fillRect(0, 0, width, height);
         ctx.globalCompositeOperation = 'source-over';

         const triggerGameOver = (msgText: string) => {
            if (player.dead) return;
            player.dead = true;
            setIsShaking(true);
            scheduleRoundTimeout(() => setIsShaking(false), 500);
            playSound('boom', 0.6);
            for (let p = 0; p < 80; p++) {
               particles.push({
                  x: player.x, y: player.y,
                  vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 0.5) * 20,
                  life: 2.0, maxLife: 2.0, color: ['#ef4444', '#f97316', '#eab308'][Math.floor(Math.random() * 3)]
               });
            }
            floatingTexts.push({ x: width / 2, y: player.y - 50, text: msgText, color: '#ef4444', life: 2.5 });

            let explosionCount = 0;
            explosionIntervalId = window.setInterval(() => {
               explosionCount++;
               if (!gameStateRef.current.isPlaying || hasWon) {
                  if (explosionIntervalId) clearInterval(explosionIntervalId);
                  return;
               }
               playSound('boom', 0.3);
               for (let p = 0; p < 30; p++) {
                  particles.push({
                     x: player.x + (Math.random() - 0.5) * 60, y: player.y + (Math.random() - 0.5) * 60,
                     vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10,
                     life: 1.5, maxLife: 1.5, color: ['#ef4444', '#f97316', '#eab308'][Math.floor(Math.random() * 3)]
                  });
               }
               if (explosionCount > 8) {
                  if (explosionIntervalId) clearInterval(explosionIntervalId);
                  setGameOver(true);
               }
            }, 250); // blasts for a few seconds
         };

         const isGameActive = isPlaying && !gameOver && !hasWon && !isTransitioning && !powerUpPauseRef.current && !player.dead;
         const isBossLevel = level === 3;

         // Draw Parallax Stars
         stars.forEach(star => {
            let currentSpeed = star.speed * 0.2; // Slow scroll when not playing
            if (isPlaying && !gameOver && !hasWon) {
               currentSpeed = (star.speed * 6) + (level - 1) * 2.5; // Hyperspeed line effect
               if (isTransitioning) currentSpeed *= 4; // Warp Speed!
            }
            star.y += currentSpeed;
            if (star.y > height) {
               star.y = 0;
               star.x = Math.random() * width;
            }

            ctx.beginPath();
            if (isPlaying && !gameOver && !hasWon) {
               // Draw as stretched lines showing fast upward movement
               ctx.moveTo(star.x, star.y);
               ctx.lineTo(star.x, star.y - currentSpeed * 1.5);
               ctx.strokeStyle = star.color;
               ctx.lineWidth = star.r * 1.5;
               ctx.stroke();
            } else {
               ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
               ctx.fillStyle = star.color;
               ctx.fill();
            }
         });

         // Check if mouse is idle
         if (performance.now() - lastMoveTime > 2000) {
            isMouseMoving = false;
         }

         if (isGameActive) {
            const isMobile = width < 768;
            if (pressedKeys.size > 0) {
               const bounds = getPlayerBounds();
               const keyboardSpeed = (isMobile ? 7 : 10) * frameScale;
               if (pressedKeys.has('arrowleft') || pressedKeys.has('a')) player.targetX -= keyboardSpeed;
               if (pressedKeys.has('arrowright') || pressedKeys.has('d')) player.targetX += keyboardSpeed;
               player.targetX = Math.max(bounds.minX, Math.min(bounds.maxX, player.targetX));
               player.targetY = height - metrics.playerBottom;
            }
            const lerpSpeed = Math.min(1, (isMobile ? 0.38 : 0.28) * frameScale);
            player.x += (player.targetX - player.x) * lerpSpeed;
            player.y = height - metrics.playerBottom;
            const bounds = getPlayerBounds();
            player.x = Math.max(bounds.minX, Math.min(bounds.maxX, player.x));
            player.y = height - metrics.playerBottom;

            if (activePowerUp.timer > 0) {
               activePowerUp.timer -= dt;
               if (activePowerUp.timer <= 0) {
                  activePowerUp.type = 'none';
               }
            }

            shootTimer += dt;
            const shootInterval = (activePowerUp.type === 'rapid' ? 80 : 200) * (isMobile ? 0.7 : 1.0);

            const isFiring = isPointerDown || isKeyboardFiring;

            if (shootTimer > shootInterval && isFiring) {
               shootTimer = 0;
               playSound('laser', 0.05);

               if (activePowerUp.type === 'spread') {
                  bullets.push({ x: player.x, y: player.y - metrics.shipSize * 0.25, startY: player.y - metrics.shipSize * 0.25, w: metrics.bulletW, h: metrics.bulletH, speed: 10 * metrics.scale, killed: false });
                  bullets.push({ x: player.x - metrics.shipSize * 0.34, y: player.y - metrics.shipSize * 0.18, startY: player.y - metrics.shipSize * 0.18, w: metrics.bulletW, h: metrics.bulletH, speed: 10 * metrics.scale, killed: false });
                  bullets.push({ x: player.x + metrics.shipSize * 0.34, y: player.y - metrics.shipSize * 0.18, startY: player.y - metrics.shipSize * 0.18, w: metrics.bulletW, h: metrics.bulletH, speed: 10 * metrics.scale, killed: false });
               } else {
                  bullets.push({ x: player.x - metrics.shipSize * 0.25, y: player.y - metrics.shipSize * 0.25, startY: player.y - metrics.shipSize * 0.25, w: metrics.bulletW, h: metrics.bulletH, speed: 10 * metrics.scale, killed: false });
                  bullets.push({ x: player.x + metrics.shipSize * 0.25, y: player.y - metrics.shipSize * 0.25, startY: player.y - metrics.shipSize * 0.25, w: metrics.bulletW, h: metrics.bulletH, speed: 10 * metrics.scale, killed: false });
               }
            }
         }

         // Subtle horizontal aiming guide line on bottom baseline
         if (isGameActive) {
            player.targetY = height - metrics.playerBottom;
         }

         // Draw player
         ctx.save();
         ctx.translate(player.x, player.y);

         if (isGameActive) {
            // Larger main thruster flame
            ctx.beginPath();
            ctx.moveTo(-10, 15);
            ctx.lineTo(0, 15 + 40 * Math.random() + 15);
            ctx.lineTo(10, 15);
            ctx.closePath();
            ctx.fillStyle = '#f97316';
            ctx.fill();

            // Intense inner white/yellow core
            ctx.beginPath();
            ctx.moveTo(-5, 15);
            ctx.lineTo(0, 15 + 20 * Math.random() + 5);
            ctx.lineTo(5, 15);
            ctx.closePath();
            ctx.fillStyle = '#fef08a';
            ctx.fill();
         }

         if (!gameOver && !hasWon && !player.dead) {
            // Sleek neon glow ship
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(236, 72, 153, 0.8)'; // pink glow

            ctx.beginPath();
            ctx.moveTo(0, -35); // Nose
            ctx.quadraticCurveTo(15, -15, 20, 15); // Right wing
            ctx.lineTo(10, 8); // Inner cut right
            ctx.lineTo(-10, 8); // Inner cut left
            ctx.lineTo(-20, 15); // Left wing
            ctx.quadraticCurveTo(-15, -15, 0, -35); // Left wing arc
            ctx.closePath();

            const shipGrad = ctx.createLinearGradient(0, -35, 0, 15);
            shipGrad.addColorStop(0, '#fdf2f8');
            shipGrad.addColorStop(0.5, '#ec4899');
            shipGrad.addColorStop(1, '#be185d');
            ctx.fillStyle = shipGrad;
            ctx.fill();

            ctx.strokeStyle = '#fbcfe8'; // outline
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.shadowBlur = 0;

            // Core reactor cyan glow
            ctx.shadowColor = 'rgba(34, 211, 238, 1)';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#22d3ee';
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(0, 0, 2, 0, Math.PI * 2);
            ctx.fill();

            if (playerHasShield) {
               ctx.beginPath();
               ctx.arc(0, 0, 45, 0, Math.PI * 2);
               ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
               ctx.lineWidth = 4;
               ctx.stroke();
               ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
               ctx.fill();
            }

            if (activePowerUp.timer > 0 && activePowerUp.type !== 'none') {
               const maxTime = 5000;
               const ratio = Math.max(0, activePowerUp.timer / maxTime);
               const barWidth = 40;
               const barHeight = 4;
               const barY = 30;

               // Background track
               ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
               ctx.beginPath();
               ctx.roundRect(-barWidth / 2, barY, barWidth, barHeight, 2);
               ctx.fill();

               // Active shrinking bar
               ctx.fillStyle = activePowerUp.type === 'spread' ? '#eab308' : '#ec4899'; // yellow for spread, pink for rapid
               ctx.shadowBlur = 10;
               ctx.shadowColor = ctx.fillStyle;
               ctx.beginPath();
               ctx.roundRect(-barWidth / 2, barY, barWidth * ratio, barHeight, 2);
               ctx.fill();
               ctx.shadowBlur = 0;
            }
         }

         ctx.restore();

         const spawnEmojiBurst = () => {
            const emojis = ['🔥', '👌', '👍', '✌️', '🤞', '😎', '✌️', '🤞', '👌', '👍', '👏', '🙏', '🗿', '❤️', '🏆', '✨', '🚀', '⭐', '🎈', '🤩', '🎯'];
            for (let i = 0; i < 100; i++) {
               cheerEmojiParticles.push({
                  x: Math.random() * width,
                  y: height + Math.random() * 800, // Staggered start from bottom
                  vx: (Math.random() - 0.5) * 3,
                  vy: -(3 + Math.random() * 6),
                  emoji: emojis[Math.floor(Math.random() * emojis.length)],
                  size: 24 + Math.random() * 32,
                  life: 2.5 + Math.random() * 2
               });
            }
         };

         // Draw and update Boss
         let hitScore = 0;

         if (isBossLevel && isGameActive) {
            if (!boss.active) {
               boss.active = true;
               boss.hp = boss.maxHp;
               boss.y = -200;
               boss.baseY = Math.min(150, height * 0.22);
               setIsShaking(true);
               setShowBossBanner(true);
               scheduleRoundTimeout(() => {
                  setIsShaking(false);
                  setShowBossBanner(false);
               }, 2000);
               enemies.forEach(e => {
                  if (e.el) e.el.style.display = 'none';
               });
            }

            if (boss.y < boss.baseY) {
               boss.y += 2 * frameScale;
            } else {
               boss.x += boss.vx * frameScale;
               if (boss.x > width - boss.w / 2 - 10 || boss.x < boss.w / 2 + 10) boss.vx *= -1;

               boss.phase += 0.05 * frameScale;
               boss.baseY += 0.6 * frameScale; // Moves downward faster
               boss.y = boss.baseY + Math.sin(boss.phase) * 50;

               if (boss.y + boss.h / 2 > player.y - 35) {
                  // Boss reached user ship
                  if (!playerHasShield) {
                     triggerGameOver('SHIP CRUSHED!');
                  } else {
                     playerHasShield = false;
                     boss.baseY -= 150; // Bounce back
                     playSound('boom', 0.2);
                  }
               }

               // Timed bursts keep the boss equally fair at 30, 60, and 120Hz.
               bossShootTimer += dt;
               const bossFireInterval = metrics.isMobileWidth ? 700 : 550;
               if (Math.sin(timestamp * 0.002) > 0 && bossShootTimer >= bossFireInterval) {
                  bossShootTimer = 0;
                  playSound('laser', 0.05);
                  bossBullets.push({ x: boss.x, y: boss.y + boss.h / 2, w: 8, h: 20, speed: 8, killed: false });
                  bossBullets.push({ x: boss.x - 40, y: boss.y + boss.h / 2, w: 8, h: 20, speed: 8, killed: false });
                  bossBullets.push({ x: boss.x + 40, y: boss.y + boss.h / 2, w: 8, h: 20, speed: 8, killed: false });
               }
            }

            ctx.save();
            ctx.translate(boss.x, boss.y);
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#ef4444';

            ctx.fillStyle = '#7f1d1d';
            ctx.beginPath();
            ctx.roundRect(-boss.w / 2, -boss.h / 2, boss.w, boss.h, 20);
            ctx.fill();
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 5;
            ctx.stroke();

            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(0, 0, 40, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(Math.sin(timestamp * 0.005) * 10, 0, 15, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#4b5563';
            ctx.fillRect(-boss.w / 2, -boss.h / 2 - 30, boss.w, 10);
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(-boss.w / 2, -boss.h / 2 - 30, boss.w * (boss.hp / boss.maxHp), 10);

            ctx.restore();
         }

         // Update Power-Ups
         for (let i = powerUps.length - 1; i >= 0; i--) {
            const p = powerUps[i];
            if (isGameActive) p.y += 3 * frameScale;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.beginPath();
            ctx.arc(0, 0, 15, 0, Math.PI * 2);
            ctx.fillStyle = p.type === 'spread' ? '#eab308' : p.type === 'rapid' ? '#ec4899' : '#3b82f6';
            ctx.fill();
            ctx.shadowBlur = 10;
            ctx.shadowColor = ctx.fillStyle;
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 16px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.type === 'spread' ? 'S' : p.type === 'rapid' ? 'R' : 'D', 0, 0);
            ctx.restore();

            if (Math.hypot(p.x - player.x, p.y - player.y) < 40 && isGameActive) {
               playSound('powerup', 0.2);
               if (p.type === 'shield') {
                  playerHasShield = true;
               } else {
                  activePowerUp.type = p.type;
                  activePowerUp.timer = 5000;
               }
               powerUps.splice(i, 1);
               hitScore += 50;
               floatingTexts.push({ x: p.x, y: p.y, text: '+50', color: '#38bdf8', life: 1.0 });
            } else if (p.y > height + 50) {
               powerUps.splice(i, 1);
            }
         }

         // Update Boss Bullets
         for (let i = bossBullets.length - 1; i >= 0; i--) {
            const b = bossBullets[i];
            if (isGameActive) b.y += b.speed * frameScale;

            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00ff00';
            ctx.fillStyle = '#b3ffb3';
            ctx.beginPath();
            ctx.ellipse(b.x, b.y, b.w / 2, b.h / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            let hit = false;

            if (isGameActive && !b.killed) {
               if (
                  b.x > player.x - 20 && b.x < player.x + 20 &&
                  b.y > player.y - 35 && b.y < player.y + 15
               ) {
                  hit = true;
                  b.killed = true;
                  if (!playerHasShield) {
                     hitScore -= 100;
                     playSound('boom', 0.2);
                     floatingTexts.push({ x: player.x, y: player.y - 50, text: '-100 HP', color: '#ef4444', life: 1.0 });
                     for (let p = 0; p < 15; p++) {
                        particles.push({
                           x: player.x, y: player.y,
                           vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8,
                           life: 1.0, maxLife: 1.0, color: '#ef4444'
                        });
                     }
                  } else {
                     playerHasShield = false;
                     playSound('boom', 0.1);
                  }
               }
            }

            if (hit || b.y > height + 50) {
               bossBullets.splice(i, 1);
            }
         }

         // Update Bullets
         for (let i = bullets.length - 1; i >= 0; i--) {
            const b = bullets[i];
            if (isGameActive) b.y -= b.speed * frameScale;

            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ef4444';
            ctx.fillStyle = '#ffb3b3';
            ctx.beginPath();
            ctx.ellipse(b.x, b.y, b.w / 2, b.h / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            let hit = false;

            if (isBossLevel && boss.active && boss.hp > 0) {
               if (
                  b.x > boss.x - boss.w / 2 && b.x < boss.x + boss.w / 2 &&
                  b.y > boss.y - boss.h / 2 && b.y < boss.y + boss.h / 2
               ) {
                  hit = true;
                  boss.hp -= 1;
                  hitScore += 20;
                  playSound('bossHit', 0.1);

                  for (let p = 0; p < 10; p++) {
                     particles.push({
                        x: b.x, y: b.y,
                        vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10,
                        life: 1.0, maxLife: 1.0, color: '#ef4444'
                     });
                  }

                  if (boss.hp <= 0) {
                     hitScore += 1000;
                     boss.active = false;
                     for (let p = 0; p < 150; p++) {
                        particles.push({
                           x: boss.x + (Math.random() - 0.5) * boss.w,
                           y: boss.y + (Math.random() - 0.5) * boss.h,
                           vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 0.5) * 20,
                           life: 2.0, maxLife: 2.0, color: ['#ef4444', '#f97316', '#eab308'][Math.floor(Math.random() * 3)]
                        });
                     }
                     playSound('boom', 0.5);
                     setHasWon(true);
                     spawnEmojiBurst();
                     spawnConfetti();
                  }
               }
            } else if (!isBossLevel && !b.killed) {
               for (let j = 0; j < enemies.length; j++) {
                  const enemy = enemies[j];
                  if (enemy.alive) {
                     const offsetHitbox = Math.max(12, metrics.enemySize * 0.25);
                     // Ignore enemies that are still far off-screen above the visible playfield
                     if (enemy.y < -enemy.h * 0.8) continue;
                     const bulletLeft = b.x - b.w / 2;
                     const bulletRight = b.x + b.w / 2;
                     const bulletTop = b.y - b.h / 2;
                     const bulletBottom = b.y + b.h / 2;
                     if (
                        bulletRight > enemy.x - offsetHitbox &&
                        bulletLeft < enemy.x + enemy.w + offsetHitbox &&
                        bulletBottom > enemy.y - offsetHitbox &&
                        bulletTop < enemy.y + enemy.h + offsetHitbox
                     ) {
                        hit = true;
                        b.killed = true;
                        enemy.hp -= 1;

                        if (enemy.hp <= 0) {
                           enemy.alive = false;
                           if (enemy.el) {
                              enemy.el.style.opacity = '0';
                              enemy.el.style.pointerEvents = 'none';
                              enemy.el.style.transform = `translate(${enemy.x}px, -1000px)`;
                           }
                           const pts = enemy.maxHp === 10 ? 100 : (enemy.maxHp === 3 ? 30 : 10);
                           hitScore += pts;
                           floatingTexts.push({ x: enemy.x + enemy.w / 2, y: enemy.y, text: `+${pts}`, color: '#fef08a', life: 1.0 });
                           playSound('boom', 0.1);

                           if (Math.random() < 0.1 || (enemy.behavior === 'zigzag' && Math.random() < 0.3)) {
                              const types: ('spread' | 'rapid' | 'shield')[] = ['spread', 'rapid', 'shield'];
                              powerUps.push({
                                 x: enemy.x + enemy.w / 2,
                                 y: enemy.y + enemy.h / 2,
                                 type: types[Math.floor(Math.random() * types.length)],
                                 w: 30, h: 30
                              });

                              if (!hasSeenPowerUpRef.current) {
                                 hasSeenPowerUpRef.current = true;
                                 setShowPowerUpInstruction(true);
                                 powerUpPauseRef.current = true;
                                 scheduleRoundTimeout(() => {
                                    setShowPowerUpInstruction(false);
                                    powerUpPauseRef.current = false;
                                 }, 4000);
                              }
                           }

                           for (let p = 0; p < 25; p++) {
                              particles.push({
                                 x: b.x,
                                 y: b.y - 10,
                                 vx: (Math.random() - 0.5) * 12,
                                 vy: (Math.random() - 0.5) * 12,
                                 life: 1.0,
                                 maxLife: 1.0,
                                 color: ['#ef4444', '#f97316', '#eab308', '#ec4899'][Math.floor(Math.random() * 4)],
                              });
                           }
                        } else {
                           playSound('bossHit', 0.05);
                           for (let p = 0; p < 5; p++) {
                              particles.push({
                                 x: b.x,
                                 y: b.y - 10,
                                 vx: (Math.random() - 0.5) * 5,
                                 vy: (Math.random() - 0.5) * 5,
                                 life: 0.5,
                                 maxLife: 0.5,
                                 color: '#eab308',
                              });
                           }
                           if (enemy.el) {
                              enemy.el.style.transform = `translate(${enemy.x}px, ${enemy.y}px) scale(0.9)`;
                              scheduleRoundTimeout(() => {
                                 if (enemy.el) enemy.el.style.transform = `translate(${enemy.x}px, ${enemy.y}px) scale(1)`;
                              }, 50);
                           }
                        }
                        break;
                     }
                  }
               }
            }

            if (hit || b.killed || b.y - b.h / 2 <= 0) {
               bullets.splice(i, 1);
            }
         }

         if (hitScore !== 0 && isPlaying && !gameOver && !hasWon && !player.dead) {
            setScore((prev) => {
               const newScore = prev + hitScore;
               return newScore <= 0 ? 0 : newScore;
            });

            if (gameStateRef.current.score + hitScore <= 0) {
               triggerGameOver('SHIP DESTROYED!');
            }
         }

         // Render Floating Texts
         for (let i = floatingTexts.length - 1; i >= 0; i--) {
            const ft = floatingTexts[i];
            if (isGameActive) {
               ft.y -= 2; // Float up
               ft.life -= 0.02; // Fade out
            }

            ctx.save();
            ctx.globalAlpha = Math.max(0, ft.life);
            ctx.fillStyle = ft.color;
            ctx.font = '900 24px sans-serif';
            ctx.textAlign = 'center';
            ctx.shadowBlur = 10;
            ctx.shadowColor = ft.color;
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.restore();

            if (ft.life <= 0) floatingTexts.splice(i, 1);
         }

         // Render Particles
         for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            if (isGameActive) {
               p.x += p.vx;
               p.y += p.vy;
               p.vx *= 0.96;
               p.vy *= 0.96;
               p.life -= 0.025;
            }

            ctx.globalAlpha = Math.max(0, p.life);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.5, 5 * p.life), 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;

            if (p.life <= 0) particles.splice(i, 1);
         }

         // Update regular enemies movement
         let allDead = !isBossLevel;
         const speedMult = level === 2 ? 1.18 : 1.0;

         if (!isBossLevel) {
            enemies.forEach((enemy) => {
               if (enemy.alive) {
                  allDead = false;

                  if (isGameActive) {
                     const timeSec = timestamp * 0.001;

                     // Cohesive fleet sway and descent
                     const swayAmplitude = Math.min(30, metrics.spawnBand * 0.06);
                     enemy.x = enemy.baseX + Math.sin(timeSec * 2.2) * swayAmplitude;
                     enemy.startY += enemy.speed * frameScale;

                      enemy.y = enemy.startY;
                      enemy.x = Math.max(8, Math.min(width - enemy.w - 8, enemy.x));

                     if (enemy.y + enemy.h > player.y - 10) {
                        if (!isTransitioning) {
                           if (!playerHasShield) {
                              triggerGameOver('FATAL BREACH! 🔻');
                           } else {
                              playerHasShield = false;
                           }
                        }
                        enemy.alive = false;
                        if (enemy.el) {
                           enemy.el.style.opacity = '0';
                           enemy.el.style.display = 'none';
                        }
                     }
                  }
                  if (enemy.el) {
                     enemy.el.style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;
                  }
               }
            });

            // Level up
            if (allDead && enemies.length > 0 && isGameActive) {
               setIsTransitioning(true);
               const newLevel = level + 1;

               // Immediately clear and park all existing enemies off-screen
               enemies.forEach(enemy => {
                  enemy.alive = false;
                  enemy.y = -3000;
                  enemy.startY = -3000;
                  if (enemy.el) {
                     enemy.el.style.opacity = '0';
                     enemy.el.style.display = 'none';
                     enemy.el.style.transform = 'translate(0px, -3000px)';
                  }
               });

               if (newLevel < 3) {
                  setLevelMessage(`LEVEL ${level} COMPLETED!`);

                  scheduleRoundTimeout(() => {
                     setLevel(newLevel);
                     setLevelMessage(`LEVEL ${newLevel} INVASION!`);
                     scheduleRoundTimeout(() => {
                        setLevelMessage(null);
                        setIsTransitioning(false);
                     }, 1500);
                  }, 1500);
               } else if (newLevel === 3) {
                  setLevelMessage('WARNING: BOSS APPROACHING!');
                  scheduleRoundTimeout(() => {
                     setLevel(newLevel);
                     setLevelMessage(null);
                     setIsTransitioning(false);
                  }, 2500);
               }
            }
         }

         // Render Confetti if Won
         if (hasWon) {
            for (let i = confetti.length - 1; i >= 0; i--) {
               const c = confetti[i];
               c.x += c.vx;
               c.y += c.vy;
               c.vy += 0.5;
               c.life -= 0.005;

               ctx.save();
               ctx.translate(c.x, c.y);
               ctx.rotate(c.life * 10);
               ctx.fillStyle = c.color;
               ctx.globalAlpha = Math.max(0, c.life);
               ctx.fillRect(-5, -5, 10, 10);
               ctx.restore();

               if (c.life <= 0) confetti.splice(i, 1);
            }
         }

         // Render Emoji Cheer (Google Meet Style)
         for (let i = cheerEmojiParticles.length - 1; i >= 0; i--) {
            const e = cheerEmojiParticles[i];
            e.x += e.vx;
            e.y += e.vy;
            e.life -= 0.01;

            ctx.save();
            ctx.globalAlpha = Math.min(1, e.life);
            ctx.font = `${e.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.fillText(e.emoji, e.x, e.y);
            ctx.restore();

            if (e.y < -100 || e.life <= 0) cheerEmojiParticles.splice(i, 1);
         }

         animationId = requestAnimationFrame(loop);
      };

      animationId = requestAnimationFrame(loop);

      const layoutEnemies = () => {
         metrics = getGameMetrics();
         const currentCols = Math.max(2, Math.floor(metrics.spawnBand / Math.max(metrics.enemySize * 1.45, 72)));
         activeElements.forEach((el, index) => {
            const enemy = enemies[index];
            if (!enemy) return;

            const w = metrics.enemySize;
            const h = metrics.enemySize;
            const targetLevelIndex = enemy.requiredLevel === 1 ? index : index - (2 + navLinks.length + socialItems.length);
            const levelCols = Math.max(2, Math.min(currentCols, enemy.requiredLevel === 1 ? 4 : 6));
            const lane = targetLevelIndex % levelCols;
            const row = Math.floor(targetLevelIndex / levelCols);
            const laneWidth = metrics.spawnBand / levelCols;
            const laneJitter = Math.min(laneWidth * 0.15, w * 0.25) * (lane % 2 === 0 ? 1 : -1);
            const startX = Math.max(12, Math.min(width - w - 12, metrics.spawnLeft + laneWidth * (lane + 0.5) - w / 2 + laneJitter));
            const startY = metrics.spawnTop - row * metrics.spacingY;

            enemy.w = w;
            enemy.h = h;
            enemy.row = row;
            enemy.col = lane;
            enemy.baseX = startX;
            el.style.width = `${w}px`;
            el.style.height = `${h}px`;

            if (!gameStateRef.current.isPlaying || enemy.y < 0 || gameStateRef.current.isTransitioning) {
               enemy.startY = startY;
               enemy.x = startX;
               enemy.y = startY;
            } else {
               enemy.x = Math.max(8, Math.min(width - enemy.w - 8, enemy.x));
               enemy.y = Math.max(-enemy.h - 20, Math.min(height - metrics.playerBottom - enemy.h, enemy.y));
            }
         });
      };

      let resizeTimeoutId: NodeJS.Timeout;
      const handleResize = () => {
         clearTimeout(resizeTimeoutId);
         resizeTimeoutId = setTimeout(() => {
            const dims = resizeGame();
            width = dims.width;
            height = dims.height;
            metrics = getGameMetrics();

            if (gameStateRef.current.isPlaying) {
               player.w = metrics.shipSize;
               player.h = metrics.shipSize;
               const bounds = getPlayerBounds();
               player.x = Math.max(bounds.minX, Math.min(bounds.maxX, player.x));
               player.y = Math.max(bounds.minY, Math.min(bounds.maxY, player.y));
               player.targetX = Math.max(bounds.minX, Math.min(bounds.maxX, player.targetX));
               player.targetY = Math.max(bounds.minY, Math.min(bounds.maxY, player.targetY));

               // Update boss positioning if boss level
               if (boss.active) {
                  boss.w = Math.min(200, width * 0.6);
                  boss.h = Math.min(150, width * 0.45);
                  boss.x = width / 2;
                  boss.baseY = Math.min(150, height * 0.22);
               }

               layoutEnemies();
            }
         }, 200);
      };
      window.addEventListener('resize', handleResize);

      return () => {
         cancelAnimationFrame(animationId);
         clearTimeout(resizeTimeoutId);
         if (explosionIntervalId) clearInterval(explosionIntervalId);
         window.removeEventListener('mousemove', handlePointerMove as any);
         window.removeEventListener('mousedown', handlePointerDown as any);
         window.removeEventListener('mouseup', handlePointerUp);
         window.removeEventListener('touchmove', handlePointerMove as any);
         window.removeEventListener('touchstart', handlePointerDown as any);
         window.removeEventListener('touchend', handlePointerUp);
         window.removeEventListener('touchcancel', handlePointerUp);
         window.removeEventListener('keydown', handleGameKeyDown);
         window.removeEventListener('keyup', handleGameKeyUp);
         window.removeEventListener('blur', handlePointerUp);
         window.removeEventListener('resize', handleResize);
         
         // Close AudioContext to prevent context leaks and browser crash on too many contexts
         if (audioCtx) {
            audioCtx.close().catch(err => console.error("Error closing AudioContext:", err));
         }
      };
   }, [isPlaying, level, gameOver, hasWon, isTransitioning]);

   return (
      <section id="minigame" className="relative w-full h-[80dvh] lg:h-[650px] flex items-center justify-center bg-transparent pb-20 overflow-hidden">
         <style dangerouslySetInnerHTML={{ __html: `
            @keyframes overlayEnter {
               0% {
                  opacity: 0;
                  transform: scale(0.96);
               }
               100% {
                  opacity: 1;
                  transform: scale(1);
               }
            }
            .animate-overlay-enter {
               animation: overlayEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
         `}} />
         <PortalWrapper active={isPlaying || showInstructions || gameOver || hasWon}>
            <div className={`${isPlaying || showInstructions || gameOver || hasWon ? 'fixed inset-0 w-screen h-[100dvh] z-[9999] bg-[#04010b] animate-overlay-enter' : 'relative w-full h-full'} flex flex-col items-center justify-center overflow-hidden`}>
            <div ref={containerRef} className={`absolute inset-0 select-none overflow-hidden ${isPlaying ? 'cursor-none touch-none' : 'cursor-default touch-auto'} ${isShaking ? 'animate-shake' : ''}`}>

            {/* Space nebula background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#120726] to-[#04010b] opacity-90"></div>
            <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-900/40 via-purple-900/10 to-transparent"></div>

            {/* Section Planet - Moon beside MiniGame section */}
            <SectionPlanet
              texture="/planets/moon.jpg"
              position="left"
              glow="rgba(226, 232, 240, 0.45)"
              shade="rgba(15, 23, 42, 0.65)"
              rotateDirection={1}
              rotateDuration={60}
            />

            <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />
            
            {/* CRT Arcade Scanlines */}
            {isPlaying && (
               <div 
                 className="absolute inset-0 z-30 pointer-events-none opacity-20 mix-blend-overlay"
                 style={{ 
                   backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', 
                   backgroundSize: '100% 4px, 6px 100%' 
                 }}
               />
            )}
            
            <Particles isLocal count={80} className="absolute inset-0 z-0 pointer-events-none" isRightBiased={true} isGameActive={isPlaying && !gameOver && !hasWon} />
            </div>

            {/* Quick Close (X) Button - Positioned at Top Right */}
            {(isPlaying || showInstructions || gameOver || hasWon) && (
                <div className="absolute top-3 right-3 md:top-5 md:right-5 z-[300] animate-in fade-in slide-in-from-top-6 duration-500 flex flex-col items-center gap-1 pointer-events-none">
                    <button
                        onClick={() => {
                           handleClose();
                           if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([10]);
                        }}
                        onTouchStart={(e) => {
                           e.stopPropagation();
                           handleClose();
                           if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([10]);
                        }}
                        className="w-10 h-10 md:w-12 md:h-12 bg-red-600/90 hover:bg-red-600 text-white rounded-full backdrop-blur-xl border border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.7)] transition-all hover:scale-110 active:scale-90 flex items-center justify-center group pointer-events-auto cursor-pointer"
                        aria-label="Close & Resume Scrolling"
                    >
                        <X size={22} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                    <span className="text-[9px] font-black uppercase text-red-300 tracking-wider bg-black/75 px-2 py-0.5 rounded-md border border-red-500/30 backdrop-blur-sm pointer-events-auto select-none whitespace-nowrap shadow-lg">
                       Exit (Esc)
                    </span>
                </div>
            )}

            {/* Boss Approaching Warning Banner */}
            {showBossBanner && (
               <div className="absolute inset-0 z-[250] pointer-events-none flex items-center justify-center bg-red-900/20">
                  <div className="w-full bg-red-600/80 backdrop-blur-md py-4 transform -skew-y-3 flex justify-center border-y-4 border-red-400 animate-[shake_0.5s_ease-in-out_infinite]">
                     <h1 className="text-4xl md:text-6xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]">
                        WARNING: BOSS APPROACHING
                     </h1>
                  </div>
               </div>
            )}

            {/* Always Visible HUD & Title */}

            {/* Floating Level/Score Badge (Local to Game Section, only visible during active game overlay) */}
            {(isPlaying || gameOver || hasWon) && (
               <GameStats score={score} level={level} />
            )}

            {/* Center Area (Title & Play Button) when NOT playing */}
            {(!isPlaying && !gameOver && !hasWon && !showInstructions) && (
               <div className="absolute inset-0 z-[110] flex flex-col items-center justify-center pointer-events-none animate-in fade-in duration-500">
                  <div className="relative inline-block mb-12">
                     <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
                     <div className="relative px-12 py-6 bg-slate-900/80 rounded-3xl border border-white/20 backdrop-blur-xl gelly-card">
                        <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase select-none">
                           <span className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]">
                              MINI GAME
                           </span>
                        </h2>
                     </div>
                  </div>

                  {/* Liquid Glass Jelly Button */}
                  <div className="pointer-events-auto group relative">
                     {/* Outer glow blur for jelly effect */}
                     <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                     <button
                        onClick={() => {
                           setShowInstructions(true);
                           if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
                        }}
                        className="relative px-12 py-5 rounded-full font-black text-2xl text-white tracking-widest flex items-center gap-3
                                   backdrop-blur-xl bg-white/10 border border-white/30 
                                   shadow-[inset_0_-4px_10px_rgba(0,0,0,0.5),_0_8px_32px_rgba(255,255,255,0.2)] 
                                   hover:bg-white/20 hover:scale-105 hover:shadow-[inset_0_-4px_10px_rgba(0,0,0,0.5),_0_8px_32px_rgba(255,255,255,0.4)]
                                   active:scale-95 active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]
                                   transition-all duration-300 overflow-hidden"
                     >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-50 pointer-events-none"></div>
                        <Play size={28} fill="currentColor" /> PLAY GAME
                     </button>
                  </div>
               </div>
            )}

            {/* Instructions Screen */}
            {showInstructions && !isPlaying && !gameOver && !hasWon && (
               <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl z-[110] flex flex-col items-center justify-center animate-liquid-drop px-4 pb-safe">
                  <div className="max-w-md w-full text-center p-6 md:p-8 bg-slate-900/90 backdrop-blur-3xl border border-pink-500/40 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.25)] pointer-events-auto">
                     <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 mb-5 drop-shadow-[0_0_12px_rgba(236,72,153,0.5)] tracking-wide">HOW TO PLAY</h2>
                     <div className="text-left text-gray-200 space-y-3 mb-6 text-xs md:text-sm font-medium">
                        <div className="flex items-center gap-3 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                           <Crosshair className="text-pink-400 shrink-0" size={20} />
                           <span><strong>Steer Ship:</strong> Move your mouse or drag your finger horizontally.</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                           <Play className="text-yellow-400 shrink-0" size={20} />
                           <span><strong>Fire Weapons:</strong> Click, tap, or hold anywhere on screen.</span>
                        </div>
                        <div className="hidden md:flex items-center gap-3 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                           <span className="text-cyan-300 text-lg font-black w-5 text-center shrink-0">⌨</span>
                           <span><strong>Keyboard:</strong> Arrow keys or <code className="bg-slate-700 px-1 py-0.5 rounded text-cyan-300">A / D</code> to steer, and <code className="bg-slate-700 px-1 py-0.5 rounded text-cyan-300">Space</code> to shoot.</span>
                        </div>
                        <div className="flex items-center gap-3 bg-red-950/40 p-2.5 rounded-xl border border-red-500/30">
                           <span className="text-cyan-400 text-lg shrink-0">🛡️</span>
                           <span><strong>Defend Base:</strong> Destroy aliens before they reach your ship line!</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                           <div className="flex items-center gap-1 shrink-0 font-black text-sm">
                              <span className="text-orange-400">S</span>
                              <span className="text-pink-400">R</span>
                              <span className="text-blue-400">D</span>
                           </div>
                           <span><strong>Power-ups:</strong> Grab falling drops for Spread, Rapid fire, or Shield!</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                           <span className="text-purple-400 text-lg shrink-0">👾</span>
                           <span><strong>Boss Level 3:</strong> Defeat the mother alien boss to clear the galaxy!</span>
                        </div>
                     </div>
                     <div className="text-center p-2 mb-5 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <p className="text-[11px] md:text-xs text-red-300 font-bold tracking-tight">
                           ⚠️ Scroll is locked during mission. Press <span className="bg-red-950 px-1.5 py-0.5 rounded text-white font-mono">Esc</span> or the red <span className="text-red-400 font-bold">X</span> anytime to exit.
                        </p>
                     </div>
                     <button id="start-mission-btn" onClick={() => {
                         handlePlayClick();
                         if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([20, 50, 20]);
                      }} className="w-full py-3.5 px-8 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white rounded-full font-black text-base md:text-lg hover:scale-105 transition-all shadow-[0_0_25px_rgba(236,72,153,0.5)] active:scale-95 flex items-center justify-center gap-2 group cursor-pointer">
                        <span>START MISSION ({countdown})</span>
                        <Play size={18} className="group-hover:translate-x-1 transition-transform" fill="currentColor" />
                     </button>
                  </div>
               </div>
            )}

            {/* Power-Up Instructions Screen (Appears once) */}
            {showPowerUpInstruction && (
               <div className="absolute inset-0 z-[160] flex flex-col items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-300">
                  <div className="bg-slate-900/90 backdrop-blur-md p-5 md:p-8 rounded-3xl border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.6)] flex flex-col items-center max-w-lg text-center animate-liquid-drop mx-4 w-11/12 max-w-[90vw]">
                     <h3 className="text-2xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-3 md:mb-4 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]">POWER-UP!</h3>
                     <p className="text-white text-base md:text-xl font-bold mb-2">Collect them for extra points and power!</p>
                     <p className="text-cyan-300 text-xs md:text-base font-medium">Use Spread, Rapid fire, or Shields to destroy aliens faster!</p>
                  </div>
               </div>
            )}

            {/* Game Over Screen */}
            {gameOver && (
               <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl z-[110] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500 pb-safe px-4 text-center">
                  <div className="relative max-w-sm sm:max-w-md w-full bg-slate-950/90 backdrop-blur-3xl p-6 sm:p-9 rounded-[2rem] border border-red-500/40 shadow-[0_0_60px_rgba(239,68,68,0.35)] flex flex-col items-center overflow-hidden">
                     {/* Ambient Red Glow Halo */}
                     <div className="absolute -top-16 -left-16 w-36 h-36 bg-red-600/30 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                     <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-orange-600/25 rounded-full blur-3xl pointer-events-none"></div>

                     {/* Warning Icon */}
                     <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-500/15 border border-red-500/40 flex items-center justify-center text-red-400 mb-4 shadow-[0_0_25px_rgba(239,68,68,0.4)] animate-bounce">
                        <ShieldAlert size={32} />
                     </div>

                     <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-orange-400 drop-shadow-[0_0_25px_rgba(239,68,68,0.8)] tracking-tight">
                        MISSION FAILED
                     </h2>
                     <p className="text-xs sm:text-sm text-red-300/90 mt-2 font-semibold tracking-wide uppercase">
                        Aliens breached the defenses
                     </p>

                     {/* Score Pill Card */}
                     <div className="mt-4 px-5 py-2.5 bg-black/60 rounded-2xl border border-white/10 flex items-center gap-3 shadow-inner">
                        <span className="text-[10px] font-mono font-bold text-gray-400 tracking-widest uppercase">FINAL SCORE</span>
                        <span className="text-lg sm:text-xl font-black text-white font-mono drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                           {score.toString().padStart(6, '0')}
                        </span>
                     </div>

                     <p className="mt-3 text-amber-300 font-bold italic text-xs sm:text-sm flex items-center gap-1.5">
                        <span>Try again! You got this</span> <span>💪</span>
                     </p>

                     <button
                        onClick={() => {
                           handlePlayClick();
                           if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(30);
                        }}
                        className="mt-6 px-7 sm:px-9 py-3 sm:py-3.5 bg-gradient-to-r from-red-500 via-rose-600 to-orange-500 text-white rounded-full font-black text-xs sm:text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(239,68,68,0.6)] cursor-pointer group"
                     >
                        <RotateCcw size={16} className="group-hover:-rotate-180 transition-transform duration-500" />
                        <span>RETRY MISSION</span>
                     </button>
                  </div>
               </div>
            )}

            {/* Level Transition Message */}
            {levelMessage && (
               <div className="absolute inset-0 z-[150] flex flex-col items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-500 fade-out zoom-out">
                  <h2 className="text-3xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] text-center tracking-widest p-4">
                     {levelMessage}
                  </h2>
               </div>
            )}

            {/* Win Screen (Futuristic Cyber Victory Modal) */}
            {hasWon && (
               <div className="absolute inset-0 z-[110] bg-black/85 backdrop-blur-2xl flex flex-col items-center justify-center px-4 animate-in fade-in zoom-in duration-500 pb-safe">
                  <div className="relative max-w-sm sm:max-w-md w-full bg-slate-950/90 backdrop-blur-3xl p-6 sm:p-9 rounded-[2rem] border border-yellow-500/40 shadow-[0_0_70px_rgba(234,179,8,0.35)] flex flex-col items-center overflow-hidden text-center">
                     {/* Ambient Radial Golden Nebulas */}
                     <div className="absolute -top-16 -left-16 w-40 h-40 bg-yellow-500/25 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                     <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-amber-600/25 rounded-full blur-3xl pointer-events-none"></div>

                     {/* Floating Trophy Icon Badge */}
                     <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-yellow-400/20 via-amber-500/20 to-orange-500/10 border-2 border-yellow-400/50 flex items-center justify-center text-yellow-300 mb-4 shadow-[0_0_35px_rgba(250,204,21,0.5)] animate-bounce">
                        <Trophy size={36} className="sm:w-10 sm:h-10 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
                     </div>

                     {/* Neon Golden Victory Banner */}
                     <h2 className="text-3xl sm:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 drop-shadow-[0_0_25px_rgba(250,204,21,0.8)] tracking-tight">
                        VICTORY ACHIEVED!
                     </h2>

                     <p className="text-xs sm:text-sm text-yellow-200/90 mt-2 font-bold tracking-wide">
                        Alien threat neutralized. The galaxy is safe!
                     </p>

                     {/* Score Hologram Card */}
                     <div className="mt-4 px-6 py-2.5 bg-black/60 rounded-2xl border border-yellow-500/30 flex items-center gap-3 shadow-[0_0_20px_rgba(250,204,21,0.15)]">
                        <span className="text-[10px] font-mono font-bold text-yellow-400/80 tracking-widest uppercase">SCORE</span>
                        <span className="text-xl sm:text-2xl font-black text-white font-mono drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">
                           {score.toString().padStart(6, '0')}
                        </span>
                     </div>

                     <p className="mt-3.5 text-cyan-300 font-extrabold italic text-sm sm:text-base flex items-center gap-1.5 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                        <span>Well played, Commander</span> <span>🔥</span>
                     </p>

                     {/* Glowing Liquid Play Again Button */}
                     <button
                        onClick={() => {
                           handlePlayClick();
                           if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([20, 50, 20]);
                        }}
                        className="mt-6 px-8 sm:px-10 py-3 sm:py-3.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-slate-950 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_35px_rgba(250,204,21,0.6)] cursor-pointer group"
                     >
                        <Play fill="currentColor" size={16} className="group-hover:scale-110 transition-transform" />
                        <span>PLAY AGAIN</span>
                     </button>
                  </div>
               </div>
            )}

            {/* The bodies (Enemies) - Note: not meant to be clicked for navigation anymore to keep it pure game */}
            <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">

               <AlienShipWrapper ref={el => { elementsRef.current[0] = el; }} variant={0} />
               <AlienShipWrapper ref={el => { elementsRef.current[1] = el; }} variant={1} />

               {navLinks.map((link, i) => (
                  <AlienShipWrapper key={link.label} ref={el => { elementsRef.current[2 + i] = el; }} variant={i % 4} />
               ))}

               {socialItems.map((item, i) => (
                  <AlienShipWrapper key={item.label} ref={el => { elementsRef.current[2 + navLinks.length + i] = el; }} variant={(i + 1) % 4} />
               ))}

               {SKILLS_DATA.map((skill, i) => (
                  <AlienShipWrapper key={`skill_${i}`} ref={el => { elementsRef.current[2 + navLinks.length + socialItems.length + i] = el; }} variant={(i + 2) % 4} />
               ))}

               {additionalBlobs.map((shape, i) => (
                  <AlienShipWrapper key={shape.id} ref={el => { elementsRef.current[2 + navLinks.length + socialItems.length + SKILLS_DATA.length + i] = el; }} variant={(i + 3) % 4} />
               ))}
            </div>
         </div>
         </PortalWrapper>
      </section>
   );
};

export default React.memo(MiniGame);
