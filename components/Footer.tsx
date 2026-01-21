import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Send, Link as LinkIcon, Mail } from 'lucide-react';
// @ts-ignore
import Matter from 'matter-js';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import Particles from './Particles';

const Footer: React.FC = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

   // State for the new interactions
   const [showHowToPlay, setShowHowToPlay] = useState(false);
   const [hasScrolledToGame, setHasScrolledToGame] = useState(false);
   const splashRef = useRef<HTMLDivElement>(null);
   const gameAreaRef = useRef<HTMLDivElement>(null);

   // Refs for cleanup
   const engineRef = useRef<any>(null);
   const runnerRef = useRef<any>(null);
   const renderRef = useRef<any>(null);

   // Data for all physics bodies
   const navLinks = [
      { label: 'Home', href: '#home', className: 'bg-yellow-400 text-black border-yellow-400 shadow-yellow-400/20' },
      { label: 'About', href: '#about', className: 'bg-orange-500 text-white border-orange-500 shadow-orange-500/20' },
      { label: 'Skills', href: '#skills', className: 'bg-pink-500 text-white border-pink-500 shadow-pink-500/20' },
      { label: 'Education', href: '#qualification', className: 'bg-blue-600 text-white border-blue-600 shadow-blue-600/20' },
      { label: 'Internships', href: '#internships', className: 'bg-purple-600 text-white border-purple-600 shadow-purple-600/20' },
      { label: 'Projects', href: '#portfolio', className: 'bg-lime-500 text-black border-lime-500 shadow-lime-500/20' },
      { label: 'Contact', href: '#publisher', className: 'bg-teal-400 text-black border-teal-400 shadow-teal-400/20' },
   ];

   const socialItems = [
      { icon: <Linkedin size={34} />, href: SOCIAL_LINKS.linkedin, bg: 'bg-[#0077b5]', border: 'border-[#0077b5]', shadow: 'shadow-[#0077b5]/20' },
      { icon: <Github size={34} />, href: SOCIAL_LINKS.github, bg: 'bg-white', border: 'border-white', shadow: 'shadow-white/20', text: 'text-black' },
      { icon: <Send size={34} />, href: SOCIAL_LINKS.telegram, bg: 'bg-[#229ED9]', border: 'border-[#229ED9]', shadow: 'shadow-[#229ED9]/20' },
      { icon: <LinkIcon size={34} />, href: SOCIAL_LINKS.linktree, bg: 'bg-[#22c55e]', border: 'border-[#22c55e]', shadow: 'shadow-[#22c55e]/20' },
      { icon: <Mail size={34} />, href: `mailto:${SOCIAL_LINKS.email}`, bg: 'bg-[#ef4444]', border: 'border-[#ef4444]', shadow: 'shadow-[#ef4444]/20' },
   ];

   // Intersection Observer for splash auto-scroll
   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting && !hasScrolledToGame) {
                  // User arrived at the splash section
                  setTimeout(() => {
                     if (gameAreaRef.current) {
                        gameAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                        setHasScrolledToGame(true);
                        // Show "How to Play" popup after scroll completes
                        setTimeout(() => {
                           setShowHowToPlay(true);
                           // Hide it after 3 seconds
                           setTimeout(() => setShowHowToPlay(false), 3000);
                        }, 800);
                     }
                  }, 2000);
               }
            });
         },
         { threshold: 0.5 }
      );

      if (splashRef.current) observer.observe(splashRef.current);
      return () => observer.disconnect();
   }, [hasScrolledToGame]);

   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   useEffect(() => {
      if (!containerRef.current || !canvasRef.current || !gameAreaRef.current) return;

      // Destructure Matter modules
      const { Engine, Render, World, Bodies, Runner, MouseConstraint, Mouse, Composite, Events, Query } = Matter;

      // cleanup previous
      if (engineRef.current) Engine.clear(engineRef.current);
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (renderRef.current) Render.stop(renderRef.current);

      // Create Engine
      const engine = Engine.create();
      engineRef.current = engine;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Create Renderer
      const render = Render.create({
         element: containerRef.current,
         canvas: canvasRef.current,
         engine: engine,
         options: {
            width,
            height,
            background: 'transparent',
            wireframes: false,
            pixelRatio: window.devicePixelRatio
         }
      });
      renderRef.current = render;

      // Boundaries
      const wallThickness = 100;
      const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true, render: { visible: false } });
      const wallLeft = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: { visible: false } });
      const wallRight = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: { visible: false } });

      Composite.add(engine.world, [ground, wallLeft, wallRight]);

      const domBodies: { body: any, element: HTMLElement, link?: string, w: number, h: number }[] = [];

      const initPhysics = () => {
         const bodiesToRemove = Composite.allBodies(engine.world).filter(b => !b.isStatic);
         Composite.remove(engine.world, bodiesToRemove);
         domBodies.length = 0;

         elementsRef.current.forEach((el, index) => {
            if (!el) return;

            const w = el.offsetWidth;
            const h = el.offsetHeight;

            const x = Math.random() * (width - w - 40) + w / 2 + 20;
            const y = -Math.random() * 800 - 100;

            const shapeType = el.dataset.shape;
            const isSocialItem = w === 80 && h === 80;

            let body;
            if (isSocialItem || shapeType === 'circle' || shapeType === 'blob') {
               // Use Max dimension for radius to ensure the physics body covers
               // the protruding lobes of the irregular blob shapes
               const radius = Math.max(w, h) / 2;
               body = Bodies.circle(x, y, radius, {
                  restitution: 0.6,
                  friction: 0.005,
                  density: 0.005,
                  render: { visible: false }
               });
            } else {
               body = Bodies.rectangle(x, y, w, h, {
                  chamfer: { radius: Math.min(w, h) / 2 },
                  restitution: 0.5,
                  friction: 0.01,
                  density: 0.005,
                  render: { visible: false }
               });
            }

            Matter.Body.setAngle(body, Math.random() * 0.4 - 0.2);
            domBodies.push({ body, element: el, link: el.dataset.href, w, h });
            Composite.add(engine.world, body);
         });
      };

      const timer = setTimeout(initPhysics, 150);

      const mouse = Mouse.create(containerRef.current);
      mouse.pixelRatio = 1;
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      const mouseConstraint = MouseConstraint.create(engine, {
         mouse: mouse,
         constraint: {
            stiffness: 0.2,
            render: { visible: false }
         }
      });

      Composite.add(engine.world, mouseConstraint);

      let lastClickTime = 0;
      let lastClickedBody: any = null;

      Events.on(mouseConstraint, 'mousedown', (event: any) => {
         (mouseConstraint as any).startPos = { ...event.mouse.position };
         (mouseConstraint as any).clickTime = Date.now();
      });

      Events.on(mouseConstraint, 'mouseup', (event: any) => {
         const endPos = event.mouse.position;
         const startPos = (mouseConstraint as any).startPos;
         const currentTime = Date.now();

         if (startPos && Math.hypot(endPos.x - startPos.x, endPos.y - startPos.y) < 5) {
            const bodies = domBodies.map(b => b.body);
            const found = Query.point(bodies, endPos)[0];

            if (found) {
               const domBody = domBodies.find(d => d.body === found);
               if (lastClickedBody === found && (currentTime - lastClickTime) < 300) {
                  if (domBody && domBody.link) {
                     const href = domBody.link;
                     if (href.startsWith('#')) {
                        const target = document.querySelector(href);
                        if (target) {
                           const offset = 100;
                           const bodyRect = document.body.getBoundingClientRect().top;
                           const elementRect = target.getBoundingClientRect().top;
                           const elementPosition = elementRect - bodyRect;
                           const offsetPosition = elementPosition - offset;
                           window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                     } else if (href.startsWith('mailto:')) {
                        window.location.href = href;
                     } else {
                        window.open(href, '_blank');
                     }
                  }
                  lastClickTime = 0;
                  lastClickedBody = null;
               } else {
                  lastClickTime = currentTime;
                  lastClickedBody = found;
               }
            }
         }
      });

      const checkAndReturnBodies = () => {
         for (let i = 0; i < domBodies.length; i++) {
            const { body, w, h } = domBodies[i];
            if (!body) continue;
            const { x, y } = body.position;
            const isOutOfBounds = y < -200 || x < -200 || x > width + 200;
            if (isOutOfBounds) {
               const speed = Math.hypot(body.velocity.x, body.velocity.y);
               if (speed < 2 || y < -300) {
                  setTimeout(() => {
                     const safeX = Math.random() * (width - w - 100) + w / 2 + 50;
                     const safeY = height / 2 + Math.random() * 200 - 100;
                     Matter.Body.setPosition(body, { x: safeX, y: safeY });
                     Matter.Body.setVelocity(body, { x: 0, y: 0 });
                     Matter.Body.setAngularVelocity(body, 0);
                     Matter.Body.setAngle(body, Math.random() * 0.4 - 0.2);
                  }, 2000);
               }
            }
         }
      };

      const autoReturnInterval = setInterval(checkAndReturnBodies, 1000);

      Events.on(engine, 'afterUpdate', () => {
         for (let i = 0; i < domBodies.length; i++) {
            const { body, element, w, h } = domBodies[i];
            if (!body || !element) continue;
            const { x, y } = body.position;
            element.style.transform = `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${body.angle}rad)`;
            element.style.opacity = '1';
         }
      });

      const runner = Runner.create();
      runnerRef.current = runner;
      Runner.run(runner, engine);
      Render.run(render);

      return () => {
         clearTimeout(timer);
         clearInterval(autoReturnInterval);
         if (renderRef.current) {
            Render.stop(renderRef.current);
            if (renderRef.current.canvas) renderRef.current.canvas.remove();
         }
         if (runnerRef.current) Runner.stop(runnerRef.current);
         if (engineRef.current) {
            Engine.clear(engineRef.current);
            Events.off(engineRef.current);
         }
      };
   }, [windowWidth]);

   return (
      <footer id="minigame" className="relative w-full border-t border-slate-800 bg-dark overflow-hidden transition-all duration-700">

         {/* Transition Section 1: Splash Title */}
         <div ref={splashRef} className="w-full h-[400px] flex items-center justify-center relative overflow-hidden">
            <Particles isLocal count={40} className="absolute inset-0 z-0 pointer-events-none" isRightBiased={false} />
            <div className="relative z-10">
               <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-30"></div>
               <div className="relative px-12 py-8 bg-slate-900/90 rounded-2xl border border-slate-700/50 shadow-2xl backdrop-blur-sm">
                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase select-none text-center">
                     <span className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" style={{ animationDuration: '8s' }}>
                        MINI GAME
                     </span>
                  </h2>
                  <p className="text-gray-400 text-center mt-4 font-bold tracking-widest animate-pulse">GET READY...</p>
               </div>
            </div>
         </div>

         {/* Transition Section 2: Actual Game Area */}
         <div ref={gameAreaRef} style={{ height: '800px' }} className="relative w-full overflow-hidden flex items-end">
            <div ref={containerRef} className="absolute inset-0 w-full h-full">
               <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />
               <Particles isLocal count={80} className="absolute inset-0 z-0 pointer-events-none" isRightBiased={true} />

               {/* Background/Static Hints */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5">
                  <h1 className="text-9xl md:text-[15rem] font-bold text-slate-800 select-none">PLAY</h1>
               </div>

               {/* How to Play Popup - Right Center */}
               {showHowToPlay && (
                  <div className="absolute top-1/2 right-12 -translate-y-1/2 z-[150] animate-liquid-drop">
                     <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative px-6 py-4 bg-slate-900/95 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl max-w-xs transition-all duration-300">
                           <div className="flex justify-between items-start mb-2">
                              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-black text-lg">HOW TO PLAY</h3>
                              <button onClick={() => setShowHowToPlay(false)} className="text-gray-500 hover:text-white transition-colors">
                                 <span className="text-xl">&times;</span>
                              </button>
                           </div>
                           <ul className="text-xs text-gray-300 space-y-2 font-medium">
                              <li className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                                 <span>Drag and throw the shapes!</span>
                              </li>
                              <li className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(236,72,153,0.8)]"></div>
                                 <span>Double-click shapes to navigate.</span>
                              </li>
                              <li className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                                 <span>Shapes auto-return if they fall off.</span>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               )}

               <div className="absolute bottom-4 w-full text-center text-gray-600 text-xs pointer-events-none z-0">
                  Interactive Footer &copy; 2026 Chimata Raghuram. Drag and throw the elements!
               </div>

               {/* Physics Bodies (DOM Elements) */}
               <div className="absolute inset-0 pointer-events-none z-10">
                  {/* ... (rest of the bodies) */}
                  <div ref={el => { elementsRef.current[0] = el; }} className="absolute px-10 py-5 bg-slate-900/90 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(236,72,153,0.3)] tracking-tight border border-white/10 flex items-center justify-center opacity-0 group pointer-events-auto cursor-default select-none">
                     <div className="absolute -inset-5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-500 animate-pulse -z-10"></div>
                     <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] animate-text-gradient relative z-10">PORTFOLIO</span>
                  </div>

                  <div ref={el => { elementsRef.current[1] = el; }} className="absolute opacity-0 group select-none">
                     <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-teal-400 rounded-full blur opacity-75 animate-pulse"></div>
                     <div className="relative px-10 py-5 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center">
                        <span className="text-xl font-bold bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 text-transparent bg-clip-text whitespace-nowrap animate-text-gradient">{ABOUT_DATA.role}</span>
                     </div>
                  </div>

                  {navLinks.map((link, i) => (
                     <div key={link.label} ref={el => { elementsRef.current[2 + i] = el; }} data-href={link.href} className="absolute flex items-center justify-center opacity-0 cursor-pointer group hover:scale-110 transition-transform duration-300 pointer-events-auto select-none">
                        <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-60 blur-xl transition-all duration-300 animate-pulse -z-10"></div>
                        <div className={`px-8 py-4 rounded-full text-lg font-bold shadow-lg border whitespace-nowrap flex items-center justify-center relative z-10 ${link.className}`}>{link.label}</div>
                     </div>
                  ))}

                  {socialItems.map((item, i) => (
                     <div key={i} ref={el => { elementsRef.current[2 + navLinks.length + i] = el; }} data-href={item.href} className="absolute flex items-center justify-center opacity-0 cursor-pointer group hover:scale-110 transition-transform duration-300 pointer-events-auto select-none" style={{ width: '80px', height: '80px' }}>
                        <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-60 blur-xl transition-all duration-300 animate-pulse -z-10"></div>
                        <div className={`w-full h-full p-5 rounded-full shadow-lg border flex items-center justify-center relative z-10 ${item.bg} ${item.border} ${item.shadow} ${item.text || 'text-white'}`}>{item.icon}</div>
                     </div>
                  ))}

                  <div ref={el => { elementsRef.current[2 + navLinks.length + socialItems.length] = el; }} className="absolute px-10 py-5 bg-slate-800 rounded-full text-lg font-semibold border border-slate-700 backdrop-blur-sm whitespace-nowrap flex items-center justify-center opacity-0 select-none">
                     <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-text-gradient">&#169; 2026 Chimata Raghuram. All rights reserved.</span>
                  </div>

                  {[
                     { id: 'blob1', w: 160, h: 140, bg: 'bg-orange-400', radius: '54% 46% 42% 58% / 58% 41% 59% 42%', shape: 'blob' },
                     { id: 'circle1', w: 130, h: 130, bg: 'bg-indigo-400', radius: '50%', shape: 'circle' },
                     { id: 'blob2', w: 150, h: 160, bg: 'bg-blue-400', radius: '37% 63% 51% 49% / 37% 35% 65% 63%', shape: 'blob' },
                     { id: 'pill1', w: 60, h: 180, bg: 'bg-green-400', radius: '30px', shape: 'pill' },
                     { id: 'pill2', w: 140, h: 70, bg: 'bg-pink-300', radius: '35px', shape: 'pill' },
                     // New shapes from image inspiration
                     { id: 'blob_yellow', w: 145, h: 145, bg: 'bg-yellow-400', radius: '63% 37% 39% 61% / 46% 36% 64% 54%', shape: 'blob' },
                     { id: 'blob_pink_lg', w: 155, h: 140, bg: 'bg-pink-400', radius: '30% 70% 70% 30% / 30% 30% 70% 70%', shape: 'blob' },
                     { id: 'blob_orange_lg', w: 150, h: 160, bg: 'bg-orange-500', radius: '73% 27% 76% 24% / 28% 70% 30% 72%', shape: 'blob' },
                     { id: 'blob_blue_bright', w: 160, h: 150, bg: 'bg-blue-500', radius: '45% 55% 60% 40% / 55% 45% 40% 60%', shape: 'blob' },
                  ].map((shape, i) => (
                     <div key={shape.id} ref={el => { elementsRef.current[2 + navLinks.length + socialItems.length + 1 + i] = el; }} data-shape={shape.shape} className={`absolute opacity-0 cursor-grab active:cursor-grabbing transition-all duration-200 pointer-events-auto shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:brightness-110 ${shape.bg}`} style={{ width: `${shape.w}px`, height: `${shape.h}px`, borderRadius: shape.radius, userSelect: 'none', WebkitUserSelect: 'none' }} />
                  ))}
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;