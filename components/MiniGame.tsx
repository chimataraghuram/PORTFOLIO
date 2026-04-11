import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, X, Crosshair } from 'lucide-react';
import { SOCIAL_LINKS, ABOUT_DATA, SKILLS_DATA } from '../constants';
import Particles from './Particles';
import GameStats from './GameStats';

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
   const [showInstructions, setShowInstructions] = useState(false);
   const [countdown, setCountdown] = useState(5);
   const [showPowerUpInstruction, setShowPowerUpInstruction] = useState(false);
   const [showScrollLockHint, setShowScrollLockHint] = useState(false);

   const hasSeenPowerUpRef = useRef(false);
   const powerUpPauseRef = useRef(false);

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
                  document.getElementById('start-mission-btn')?.click();
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
      { label: 'Skills', href: '#skills', className: 'bg-pink-500 text-white border-pink-500' },
      { label: 'Education', href: '#qualification', className: 'bg-blue-600 text-white border-blue-600' },
      { label: 'Internships', href: '#internships', className: 'bg-purple-600 text-white border-purple-600' },
      { label: 'Projects', href: '#portfolio', className: 'bg-lime-500 text-black border-lime-500' },
      { label: 'Contact', href: '#publisher', className: 'bg-teal-400 text-black border-teal-400' },
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
      setShowInstructions(false);
      setTimeout(() => {
         setScore(0);
         setLevel(1);
         setGameOver(false);
         setHasWon(false);
         setIsTransitioning(true);
         setLevelMessage('LEVEL 1 START!');
         setIsPlaying(true);
         setShowScrollLockHint(true);
      }, 10);

      setTimeout(() => {
         setLevelMessage(null);
         setIsTransitioning(false);
      }, 2500);
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
      setIsPlaying(false);
      setShowInstructions(false);
      setGameOver(false);
      setHasWon(false);
      setIsTransitioning(false);
   };

   // Global Scroll Lock Management - Only locks when actually playing or reading instructions
   useEffect(() => {
      if (isPlaying || showInstructions) {
         document.body.style.overflow = 'hidden';
         document.documentElement.style.overflow = 'hidden';
         // Also handle mobile safe-area scrolling issues
         document.body.style.touchAction = 'none';
      } else {
         document.body.style.overflow = 'auto';
         document.documentElement.style.overflow = 'auto';
         document.body.style.touchAction = 'auto';
      }
      return () => {
         document.body.style.overflow = 'auto';
         document.documentElement.style.overflow = 'auto';
         document.body.style.touchAction = 'auto';
      };
   }, [isPlaying, showInstructions]);

   useEffect(() => {
      if (!containerRef.current || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resizeGame = () => {
         const width = containerRef.current?.clientWidth || window.innerWidth;
         const height = containerRef.current?.clientHeight || window.innerHeight;
         canvas.width = width;
         canvas.height = height;
         return { width, height };
      };

      let { width, height } = resizeGame();
      window.addEventListener('resize', () => {
         const dims = resizeGame();
         width = dims.width;
         height = dims.height;
      });

      // Sound generation using Web Audio API
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playSound = (type: 'laser' | 'boom' | 'powerup' | 'bossHit', volume = 0.1) => {
         if (audioCtx.state === 'suspended') audioCtx.resume();
         const osc = audioCtx.createOscillator();
         const gain = audioCtx.createGain();
         osc.connect(gain);
         gain.connect(audioCtx.destination);

         const now = audioCtx.currentTime;

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

      const player = {
         x: width / 2,
         y: height - 100,
         w: 60,
         h: 60,
         targetX: width / 2,
         targetY: height - 100, // For smooth crosshair
         dead: false
      };

      // Control states
      let isTouching = false;
      let isMouseMoving = false;
      let lastMoveTime = performance.now();

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
         baseY: 150
      };

      const cols = Math.max(2, Math.floor(width / 120));

      let activeElements = elementsRef.current.filter((el) => el !== null) as HTMLElement[];

      activeElements.forEach((el, index) => {
         const w = el.offsetWidth || 100;
         const h = el.offsetHeight || 50;
         const row = Math.floor(index / cols);
         const col = index % cols;

         const spacingX = width / (cols + 1);
         const spacingY = 120;

         const startX = spacingX * (col + 1) - w / 2;
         const baseYOffset = height * 0.1;
         const startY = baseYOffset - row * spacingY;

         // Determine behavior
         let behavior: 'sway' | 'zigzag' | 'dive' = 'sway';
         if (index >= 2 + navLinks.length + socialItems.length && index < 2 + navLinks.length + socialItems.length + SKILLS_DATA.length) {
            behavior = 'zigzag'; // Skills
         } else if (index >= 2 + navLinks.length + socialItems.length + SKILLS_DATA.length) {
            behavior = 'dive'; // Blobs
         }

         // REFINED LEVEL PROGRESSION:
         // index 0-1: Big containers (PORTFOLIO, Role)
         // 2 to 2+navLinks.length-1: Nav links
         // ... social, skills, blobs.

         let targetLevel = 1;
         if (index < 2 + navLinks.length + socialItems.length) {
            targetLevel = 1; // Level 1: Easy
         } else {
            targetLevel = 2; // Level 2: Difficult (adds skills and everything else)
         }

         const isLevelActive = targetLevel <= level;

         const isMobile = width < 768;
         const mobileHPMultiplier = isMobile ? 0.6 : 1.0;
         const mobileSpeedMultiplier = isMobile ? 0.75 : 1.0;

         let initHp = 1;
         if (index === 0 || index === 1) initHp = 10; // Big containers
         else if (w >= 100) initHp = 3; // Medium buttons/blobs

         initHp = Math.max(1, Math.floor(initHp * mobileHPMultiplier));

         enemies.push({
            el,
            alive: isLevelActive,
            x: startX,
            y: startY,
            w,
            h,
            baseX: startX,
            startY: startY,
            row,
            origRow: row, // We now use targetLevel logic in level up
            col,
            speed: (behavior === 'dive' ? 0.5 + Math.random() * 0.3 : 0.15 + Math.random() * 0.2) * mobileSpeedMultiplier,
            offset: Math.random() * Math.PI * 2,
            behavior,
            hp: initHp,
            maxHp: initHp,
         });

         // Record the required level on the enemy object for the level-up logic
         (enemies[enemies.length - 1] as any).requiredLevel = targetLevel;

         el.style.transform = `translate(${startX}px, ${startY}px)`;
         el.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';

         if (!isPlaying || !isLevelActive || level === 3 || isTransitioning) {
            el.style.display = 'none';
            el.style.opacity = '0';
         } else {
            el.style.display = 'flex';
            el.style.opacity = '0';
            setTimeout(() => {
               if (el) el.style.opacity = '1';
            }, index * 40);
         }
      });

      let lastTime = performance.now();
      let shootTimer = 0;

      const handlePointerMove = (e: MouseEvent | TouchEvent) => {
         if (!gameStateRef.current.isPlaying || gameStateRef.current.gameOver) return;
         if (e.cancelable) e.preventDefault(); // Prevent touch-scrolling while actively playing

         const rect = containerRef.current?.getBoundingClientRect();
         if (rect) {
            let clientX = 0;
            let clientY = 0;
            if ('touches' in e && e.touches.length > 0) {
               clientX = e.touches[0].clientX;
               clientY = e.touches[0].clientY;
            } else if ('clientX' in e) {
               clientX = e.clientX;
               clientY = e.clientY;
            } else {
               return;
            }

            player.targetX = clientX - rect.left;
            player.targetY = clientY - rect.top;
            lastMoveTime = performance.now();
         }
      };

      const handlePointerDown = (e: MouseEvent | TouchEvent) => {
         if (!gameStateRef.current.isPlaying || gameStateRef.current.gameOver) return;
         isTouching = true;
         handlePointerMove(e); // Update position immediately on down
      };

      const handlePointerUp = () => {
         isTouching = false;
      };

      window.addEventListener('mousemove', handlePointerMove as any);
      window.addEventListener('mousedown', handlePointerDown as any);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove as any, { passive: false });
      window.addEventListener('touchstart', handlePointerDown as any, { passive: false });
      window.addEventListener('touchend', handlePointerUp);

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
         const dt = timestamp - lastTime;
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
            player.x += (player.targetX - player.x) * (isMobile ? 0.35 : 0.2);
            player.x = Math.max(30, Math.min(width - 30, player.x));

            if (activePowerUp.timer > 0) {
               activePowerUp.timer -= dt;
               if (activePowerUp.timer <= 0) {
                  activePowerUp.type = 'none';
               }
            }

            shootTimer += dt;
            const shootInterval = (activePowerUp.type === 'rapid' ? 80 : 200) * (isMobile ? 0.7 : 1.0);

            const isFiring = isTouching;

            if (shootTimer > shootInterval && isFiring) {
               shootTimer = 0;
               playSound('laser', 0.05);

               if (activePowerUp.type === 'spread') {
                  bullets.push({ x: player.x, y: player.y - 10, startY: player.y - 10, w: 6, h: 20, speed: 10, killed: false });
                  bullets.push({ x: player.x - 20, y: player.y - 5, startY: player.y - 5, w: 6, h: 20, speed: 10, killed: false });
                  bullets.push({ x: player.x + 20, y: player.y - 5, startY: player.y - 5, w: 6, h: 20, speed: 10, killed: false });
               } else {
                  bullets.push({ x: player.x - 15, y: player.y - 10, startY: player.y - 10, w: 6, h: 20, speed: 10, killed: false });
                  bullets.push({ x: player.x + 15, y: player.y - 10, startY: player.y - 10, w: 6, h: 20, speed: 10, killed: false });
               }
            }
         }

         // Draw Custom Crosshair explicitly at mouse/touch target
         if (isGameActive && !isTouching) {
            ctx.save();
            ctx.translate(player.targetX, player.targetY);
            ctx.beginPath();
            ctx.arc(0, 0, 15, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(236, 72, 153, 0.5)'; // pink-500
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-20, 0); ctx.lineTo(-10, 0);
            ctx.moveTo(20, 0); ctx.lineTo(10, 0);
            ctx.moveTo(0, -20); ctx.lineTo(0, -10);
            ctx.moveTo(0, 20); ctx.lineTo(0, 10);
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.8)'; // cyan-400
            ctx.lineWidth = 2;
            ctx.stroke();

            // Center dot
            ctx.beginPath();
            ctx.arc(0, 0, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.restore();
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
               boss.hp = 150;
               boss.y = -200;
               boss.baseY = 150;
               enemies.forEach(e => {
                  if (e.el) e.el.style.display = 'none';
               });
            }

            if (boss.y < boss.baseY) {
               boss.y += 2;
            } else {
               boss.x += boss.vx;
               if (boss.x > width - boss.w / 2 - 10 || boss.x < boss.w / 2 + 10) boss.vx *= -1;

               boss.phase += 0.05;
               boss.baseY += 0.6; // Moves downward faster
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

               // Boss shooting logic - burst intervals
               if (Math.sin(timestamp * 0.002) > 0) { // Active shooting phase
                  if (Math.random() < 0.15) {
                     playSound('laser', 0.05);
                     // Boss shoots more bullets in active phase
                     bossBullets.push({ x: boss.x, y: boss.y + boss.h / 2, w: 8, h: 20, speed: 8, killed: false });
                     bossBullets.push({ x: boss.x - 40, y: boss.y + boss.h / 2, w: 8, h: 20, speed: 8, killed: false });
                     bossBullets.push({ x: boss.x + 40, y: boss.y + boss.h / 2, w: 8, h: 20, speed: 8, killed: false });
                  }
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
            if (isGameActive) p.y += 3;

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
            if (isGameActive) b.y += b.speed;

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
            if (isGameActive) b.y -= b.speed;

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
            } else if (!isBossLevel) {
               for (let j = 0; j < enemies.length; j++) {
                  const enemy = enemies[j];
                  if (enemy.alive) {
                     const offsetHitbox = 10;
                     if (
                        b.x > enemy.x - offsetHitbox &&
                        b.x < enemy.x + enemy.w + offsetHitbox &&
                        b.y > enemy.y - offsetHitbox &&
                        b.y < enemy.y + enemy.h + offsetHitbox
                     ) {
                        hit = true;
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
                                 setTimeout(() => {
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
                              setTimeout(() => {
                                 if (enemy.el) enemy.el.style.transform = `translate(${enemy.x}px, ${enemy.y}px) scale(1)`;
                              }, 50);
                           }
                        }
                        break;
                     }
                  }
               }
            }

            const traveled = b.startY - b.y;
            if (hit || traveled > 450 || b.y < -50) {
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
         const speedMult = 1 + (level - 1) * 0.15; // Slower speed scaling per level

         if (!isBossLevel) {
            enemies.forEach((enemy) => {
               if (enemy.alive) {
                  allDead = false;

                  if (isGameActive) {
                     const timeSec = timestamp * 0.001;

                     if (enemy.behavior === 'sway') {
                        enemy.x = enemy.baseX + Math.sin(timeSec * 2 + enemy.offset) * 120;
                        enemy.startY += enemy.speed * speedMult;
                     } else if (enemy.behavior === 'zigzag') {
                        enemy.x = enemy.baseX + Math.sin(timeSec * 3 + enemy.offset) * 200; // Slower horizontal zigzag
                        enemy.startY += enemy.speed * speedMult * 0.7; // Even slower falling for zigzag
                     } else if (enemy.behavior === 'dive') {
                        enemy.x = enemy.baseX;
                        enemy.startY += enemy.speed * speedMult * 1.2; // Less aggressive dive speed
                     }

                     enemy.y = enemy.startY;

                     if (enemy.y > height - 120) {
                        if (!playerHasShield) {
                           triggerGameOver('FATAL BREACH! 🔻');
                        } else {
                           playerHasShield = false;
                        }
                        enemy.alive = false;
                        if (enemy.el) enemy.el.style.opacity = '0';
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

               if (newLevel < 3) {
                  setLevelMessage(`LEVEL ${level} COMPLETED!`);

                  setTimeout(() => {
                     setLevelMessage(`LEVEL ${newLevel} IS NOW LIVE!`);
                     setTimeout(() => {
                        setLevel(newLevel);
                        setLevelMessage(null);
                        setIsTransitioning(false);

                        enemies.forEach((enemy) => {
                           const isLevelActive = (enemy as any).requiredLevel <= newLevel;
                           enemy.alive = isLevelActive;
                           enemy.hp = enemy.maxHp; // Refill HP for level restarts if needed
                           const baseYOffset = height * 0.1;
                           enemy.startY = baseYOffset - enemy.origRow * 120;
                           if (enemy.el) {
                              if (isLevelActive) {
                                 enemy.el.style.opacity = '1';
                                 enemy.el.style.pointerEvents = 'auto';
                                 enemy.el.style.display = 'flex';
                              } else {
                                 enemy.el.style.opacity = '0';
                                 enemy.el.style.pointerEvents = 'none';
                                 enemy.el.style.display = 'none';
                              }
                           }
                        });
                     }, 2000);
                  }, 2000);
               } else if (newLevel === 3) {
                  setLevelMessage('WARNING: BOSS APPROACHING!');
                  setTimeout(() => {
                     setLevel(newLevel);
                     setLevelMessage(null);
                     setIsTransitioning(false);
                     enemies.forEach((enemy) => {
                        if (enemy.el) enemy.el.style.display = 'none';
                     });
                  }, 3500);
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

      return () => {
         cancelAnimationFrame(animationId);
         if (explosionIntervalId) clearInterval(explosionIntervalId);
         containerRef.current?.removeEventListener('mousemove', handlePointerMove);
         containerRef.current?.removeEventListener('touchmove', handlePointerMove);
         containerRef.current?.removeEventListener('touchstart', handlePointerDown);
         containerRef.current?.removeEventListener('touchend', handlePointerUp);
         containerRef.current?.removeEventListener('mousedown', handlePointerDown);
         containerRef.current?.removeEventListener('mouseup', handlePointerUp);
      };
   }, [isPlaying, level, gameOver, hasWon, isTransitioning]);

   return (
      <section id="minigame" className="relative w-full h-[80dvh] lg:h-[650px] flex items-center justify-center bg-black/90 pb-20 overflow-hidden">
         <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
            <div ref={containerRef} className={`absolute inset-0 select-none overflow-hidden ${isPlaying ? 'cursor-none touch-none' : 'cursor-default touch-auto'}`}>

            {/* Space nebula background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#120726] to-[#04010b] opacity-90"></div>
            <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-900/40 via-purple-900/10 to-transparent"></div>

            <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />
            <Particles isLocal count={80} className="absolute inset-0 z-0 pointer-events-none" isRightBiased={true} isGameActive={isPlaying && !gameOver && !hasWon} />
            </div>

            {/* Quick Close (X) Button - Positioned at Top Right for consistent mobile access */}
            {(isPlaying || showInstructions || gameOver || hasWon) && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[300] animate-in fade-in slide-in-from-top-6 duration-500 flex flex-col items-center gap-2 pointer-events-none">
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
                        className="w-12 h-12 bg-red-600/30 hover:bg-red-600/50 text-white rounded-full backdrop-blur-xl border border-red-500/40 shadow-[0_0_40px_rgba(239,68,68,0.5)] transition-all hover:scale-110 active:scale-75 flex items-center justify-center group pointer-events-auto"
                        aria-label="Close & Resume Scrolling"
                    >
                        <X size={26} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                    {isPlaying && !gameOver && !hasWon && showScrollLockHint && (
                        <span className="text-[10px] font-bold text-red-100/90 tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 animate-pulse select-none">
                            X To Unlock Scroll
                        </span>
                    )}
                </div>
            )}

            {/* Always Visible HUD & Title */}

            {/* Floating Level/Score Badge (Local to Game Section) */}
            <GameStats score={score} level={level} />

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
               <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl z-[110] flex flex-col items-center justify-center animate-liquid-drop px-4 pb-safe">
                  <div className="max-w-md w-full text-center p-5 md:p-6 bg-dark/80 backdrop-blur-3xl border border-pink-500/30 rounded-2xl shadow-[0_0_40px_rgba(236,72,153,0.2)] pointer-events-auto">
                     <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 mb-3 md:mb-4 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">HOW TO PLAY</h2>
                     <ul className="text-left text-gray-300 space-y-2 md:space-y-3 mb-4 md:mb-5 text-[10px] md:text-sm font-medium">
                        <li className="flex gap-2, md:gap-3 items-center"><Crosshair className="text-pink-500 shrink-0" size={18} /> Move your pointer or finger to steer your ship.</li>
                        <li className="flex gap-2 md:gap-3 items-center"><Play className="text-yellow-400 shrink-0" size={18} /> Click or hold screen to fire rapidly.</li>
                        <li className="flex gap-2 md:gap-3 items-center"><span className="text-cyan-400 text-lg md:text-xl w-6 text-center">🛡️</span> Protect your base! If aliens pass your ship, <strong className="text-red-500">you fail instantly</strong>.</li>
                        <li className="flex gap-2 md:gap-3 items-center"><span className="text-orange-500 text-lg md:text-xl font-black w-6 text-center">S</span> <span className="text-pink-500 text-lg md:text-xl font-black w-6 text-center">R</span> <span className="text-blue-500 text-lg md:text-xl font-black w-6 text-center">D</span> Grab power-ups for Spread, Rapid fire, or Shield!</li>
                        <li className="flex gap-2 md:gap-3 items-center"><span className="text-purple-400 text-lg md:text-xl w-6 text-center">👾</span> Defeat the Boss at Level 3 to win! Boss attacks deal 100 damage to your score. If your score hits 0, or if the boss reaches your ship, your ship blasts and you lose!</li>
                     </ul>
                      <div className="text-center p-2 mb-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                         <p className="text-[10px] md:text-xs text-red-300 font-bold uppercase tracking-tighter">
                            ⚠️ Scroll will lock when mission starts.
                         </p>
                      </div>
                     <button id="start-mission-btn" onClick={() => {
                         handlePlayClick();
                         if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([20, 50, 20]);
                      }} className="w-full md:w-auto px-5 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white rounded-full font-black text-sm md:text-lg hover:scale-105 transition-transform shadow-[0_0_15px_rgba(236,72,153,0.4)] active:scale-95 group">
                        <span className="flex items-center justify-center gap-2">START MISSION ({countdown}) <Play size={16} className="group-hover:translate-x-1 transition-transform" fill="currentColor" /></span>
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
               <div className="absolute inset-0 bg-red-900/80 backdrop-blur-md z-[110] flex flex-col items-center justify-center animate-liquid-drop pb-safe px-4 text-center">
                  <h2 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]">YOU LOST</h2>
                  <p className="text-xl md:text-2xl text-red-200 mt-4 font-bold">ALIENS REACHED THE BOTTOM!</p>
                  <p className="text-lg md:text-xl text-white mt-2">FINAL SCORE: {score}</p>
                  <p className="mt-2 md:mt-4 text-orange-300 font-medium italic text-base md:text-lg">Try your best! 💪</p>
                  <button onClick={() => {
                      handlePlayClick();
                      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(30);
                   }} className="mt-6 md:mt-8 px-6 py-3 md:px-8 md:py-4 bg-white text-red-900 rounded-full font-black text-lg md:text-xl hover:scale-110 transition-transform flex items-center gap-2 shadow-2xl">
                     <RotateCcw /> PLAY AGAIN
                  </button>
               </div>
            )}

            {/* Level Transition Message */}
            {levelMessage && (
               <div className="absolute inset-0 z-[150] flex flex-col items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-500 fade-out zoom-out">
                  <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] text-center tracking-widest p-4">
                     {levelMessage}
                  </h2>
               </div>
            )}



            {/* Win Screen */}
            {hasWon && (
               <div className="absolute inset-0 z-[110] flex flex-col items-center justify-center">
                  <div className="bg-slate-900/80 backdrop-blur-md p-10 rounded-3xl border border-yellow-500/50 shadow-[0_0_50px_rgba(234,179,8,0.5)] flex flex-col items-center animate-liquid-drop">
                     <h2 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">YOU WIN!</h2>
                     <p className="text-2xl text-yellow-200 mt-4 font-bold">You killed the alien. The galaxy is now safe 🔥</p>
                     <p className="text-xl text-white mt-2 font-bold bg-slate-800 px-6 py-2 rounded-full border border-slate-700">SCORE: {score}</p>
                     <p className="mt-4 text-cyan-300 font-medium italic text-2xl font-bold">Well played 💪</p>
                     <button onClick={handlePlayClick} className="mt-8 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 rounded-full font-black text-xl hover:scale-110 transition-transform flex items-center gap-2 shadow-2xl">
                        <Play fill="currentColor" /> PLAY AGAIN
                     </button>
                  </div>
               </div>
            )}

            {/* The bodies (Enemies) - Note: not meant to be clicked for navigation anymore to keep it pure game */}
            <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">

               <div ref={el => { elementsRef.current[0] = el; }} className="absolute px-10 py-5 bg-slate-900/95 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(236,72,153,0.5)] border border-pink-500/50 flex items-center justify-center opacity-0 pointer-events-none select-none">
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500">PORTFOLIO</span>
               </div>

               <div ref={el => { elementsRef.current[1] = el; }} className="absolute px-10 py-5 bg-slate-900 rounded-full border border-cyan-500/50 flex items-center justify-center opacity-0 pointer-events-none select-none shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  <span className="text-xl font-bold text-cyan-200 whitespace-nowrap">{ABOUT_DATA.role}</span>
               </div>

               {navLinks.map((link, i) => (
                  <div key={link.label} ref={el => { elementsRef.current[2 + i] = el; }} className={`absolute px-8 py-4 rounded-full text-lg font-bold shadow-lg shadow-current/20 border whitespace-nowrap flex items-center justify-center opacity-0 pointer-events-none select-none ${link.className}`}>
                     {link.label}
                  </div>
               ))}

               {socialItems.map((item, i) => {
                  const socialIcons: Record<string, string> = {
                     "LinkedIn": "💼",
                     "GitHub": "💻",
                     "Telegram": "✈️",
                     "Linktree": "🌲",
                     "Email": "📧"
                  };
                  const icon = socialIcons[item.label] || "🌐";
                  const isIconOnly = i % 2 !== 0;

                  return (
                     <div key={item.label} ref={el => { elementsRef.current[2 + navLinks.length + i] = el; }} className={`absolute ${isIconOnly ? 'w-16 h-16 md:w-20 md:h-20 rounded-[35%]' : 'px-5 py-2 md:px-6 md:py-3 rounded-full'} font-bold shadow-[0_0_20px_currentColor] border border-white/40 flex items-center justify-center opacity-0 pointer-events-none select-none backdrop-blur-xl ${item.bg} ${item.bg === 'bg-white' ? 'text-slate-900 bg-opacity-70' : 'text-white bg-opacity-30'} transition-transform duration-300`}>
                        {isIconOnly ? (
                           <span className={`text-3xl md:text-4xl filter ${item.bg === 'bg-white' ? 'drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]' : 'drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]'}`}>
                              {icon}
                           </span>
                        ) : (
                           <span className="flex items-center gap-2 text-xs md:text-sm tracking-widest whitespace-nowrap">
                              <span className="text-lg md:text-xl drop-shadow-md">{icon}</span> {item.label}
                           </span>
                        )}
                     </div>
                  );
               })}

               {SKILLS_DATA.map((skill, i) => {
                  const skillIcons: Record<string, string> = {
                     "Python": "🐍",
                     "JavaScript": "⚡",
                     "Django": "🎸",
                     "React": "⚛️",
                     "HTML & CSS": "🌐",
                     "AWS": "☁️",
                     "Git": "🐙",
                     "GitHub": "💻",
                     "MySQL": "🐬",
                     "MongoDB": "🍃",
                     "AI Tools": "🤖",
                     "Artificial Intelligence": "🧠",
                  };
                  const icon = skillIcons[skill.name] || "👾";
                  const isIconOnly = i % 2 !== 0;

                  return (
                     <div key={`skill_${i}`} ref={el => { elementsRef.current[2 + navLinks.length + socialItems.length + i] = el; }} className={`absolute ${isIconOnly ? 'w-16 h-16 md:w-20 md:h-20 rounded-[40%]' : 'px-5 py-2 md:px-6 md:py-3 rounded-full'} text-white font-bold shadow-[0_0_20px_currentColor] border border-white/40 flex items-center justify-center opacity-0 pointer-events-none select-none backdrop-blur-xl ${skillBlobColors[i % skillBlobColors.length]} bg-opacity-30 transition-transform duration-300`}>
                        {isIconOnly ? (
                           <span className="text-3xl md:text-4xl drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] filter">
                              {icon}
                           </span>
                        ) : (
                           <span className="flex items-center gap-2 text-xs md:text-sm tracking-widest whitespace-nowrap">
                              <span className="text-lg md:text-xl drop-shadow-md">{icon}</span> {skill.name}
                           </span>
                        )}
                     </div>
                  );
               })}

               {additionalBlobs.map((shape, i) => (
                  <div key={shape.id} ref={el => { elementsRef.current[2 + navLinks.length + socialItems.length + SKILLS_DATA.length + i] = el; }} className={`absolute opacity-0 pointer-events-none shadow-[0_0_20px_currentColor] ${shape.bg}`} style={{ width: `${shape.w}px`, height: `${shape.h}px`, borderRadius: shape.radius }} />
               ))}
            </div>
         </div>
      </section>
   );
};

export default React.memo(MiniGame);
