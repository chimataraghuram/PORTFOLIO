import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Particles from './components/Particles';
import SpaceshipProgress from './components/SpaceshipProgress';
import Cursor from './components/Cursor';
import TerminalEasterEgg from './components/TerminalEasterEgg';
import Preloader from './components/Preloader';
import CinematicUniverse from './components/universe/CinematicUniverse';
import { ToastProvider } from './components/Toast';

const About = lazy(() => import('./components/About'));
const Internships = lazy(() => import('./components/Internships'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const MiniGame = lazy(() => import('./components/MiniGame'));

const Footer = lazy(() => import('./components/Footer'));
const AIAssistant = lazy(() => import('./components/AIAssistant'));

/* ── Skeleton shimmer fallback ── */
const SectionFallback = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`w-full ${height} relative overflow-hidden rounded-2xl bg-slate-900/40 mx-auto max-w-5xl my-8`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    <div className="p-8 flex flex-col gap-4">
      <div className="h-6 w-40 rounded-full bg-slate-800/80" />
      <div className="h-4 w-3/4 rounded-full bg-slate-800/60" />
      <div className="h-4 w-1/2 rounded-full bg-slate-800/40" />
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[1,2,3].map(i => (
          <div key={i} className="h-24 rounded-2xl bg-slate-800/50" />
        ))}
      </div>
    </div>
  </div>
);

/* ── Animated page title ── */
function useAnimatedTitle() {
  useEffect(() => {
    const titles = [
      '💼 Chimata Raghuram',
      '👋 Hey Everyone!',
      '🚀 Full Stack Dev',
      '🤖 AI Enthusiast',
      '💡 Let\'s Connect!',
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % titles.length;
      document.title = titles[i];
    }, 3000);

    // On tab hidden/visible
    const handleVisibility = () => {
      if (document.hidden) {
        document.title = '👀 Come back!';
      } else {
        document.title = '💼 Chimata Raghuram';
        i = 0;
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);
}

function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  useAnimatedTitle();

  useEffect(() => {
    const stored = localStorage.getItem('minigame_best_score');
    if (stored) setBestScore(parseInt(stored));
  }, []);

  return (
    <ToastProvider>
      {!isBooted && <Preloader onComplete={() => setIsBooted(true)} />}
      <div className={`bg-transparent text-gray-200 min-h-screen w-full overflow-x-hidden relative transition-opacity duration-1000 ${!isBooted ? 'opacity-0' : 'opacity-100'}`} style={{ minHeight: '-webkit-fill-available' }}>
        <CinematicUniverse />
        <Cursor />
        <TerminalEasterEgg />
        <SpaceshipProgress />
        <Navbar
          onAssistantToggle={() => setIsAssistantOpen(!isAssistantOpen)}
        />
        <main className="w-full relative z-10">
          <Hero />
          <Suspense fallback={<SectionFallback />}><About /></Suspense>
          <Suspense fallback={<SectionFallback />}><Internships /></Suspense>
          <Suspense fallback={<SectionFallback height="h-96" />}><Projects /></Suspense>
          <Suspense fallback={<SectionFallback />}><Achievements /></Suspense>
          <Suspense fallback={<SectionFallback height="h-96" />}>
            <MiniGame
              score={score}
              setScore={setScore}
              level={level}
              setLevel={setLevel}
              bestScore={bestScore}
              setBestScore={setBestScore}
            />
          </Suspense>

        </main>

        <Suspense fallback={null}>
          <Footer />
          <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
        </Suspense>
      </div>
    </ToastProvider>
  );
}

export default App;