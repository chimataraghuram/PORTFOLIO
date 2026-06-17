import React, { useState, useEffect, lazy, Suspense, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpaceshipProgress from './components/SpaceshipProgress';
import Preloader from './components/Preloader';
import CinematicUniverse from './components/universe/CinematicUniverse';
import { ToastProvider } from './components/Toast';

const Cursor = lazy(() => import('./components/Cursor'));
const TerminalEasterEgg = lazy(() => import('./components/TerminalEasterEgg'));

const About = lazy(() => import('./components/About'));
const Internships = lazy(() => import('./components/Internships'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const MiniGame = lazy(() => import('./components/MiniGame'));

const Footer = lazy(() => import('./components/Footer'));
const AIAssistant = lazy(() => import('./components/AIAssistant'));

import { ErrorBoundary } from './components/ErrorBoundary';

/* ── Skeleton shimmer fallback ── */
const SectionFallback = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`w-full ${height} relative overflow-hidden rounded-2xl bg-slate-900/40 mx-auto max-w-5xl my-8`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    <div className="p-8 flex flex-col gap-4">
      <div className="h-6 w-40 rounded-full bg-slate-800/80" />
      <div className="h-4 w-3/4 rounded-full bg-slate-800/60" />
      <div className="h-4 w-1/2 rounded-full bg-slate-800/40" />
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 rounded-2xl bg-slate-800/50" />
        ))}
      </div>
    </div>
  </div>
);

const LazyLoad = ({ children, height = 'h-64' }: { children: React.ReactNode; height?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '400px' });
  return (
    <div ref={ref} className={`w-full ${!isInView ? height : ''}`}>
      {isInView ? children : <SectionFallback height={height} />}
    </div>
  );
};

/* ── Animated page title ── */
function useAnimatedTitle() {
  useEffect(() => {
    const titles = [
      '💼 Chimata Raghuram',
      '👋 Hey Everyone!',
      '🚀 Full Stack Dev',
      '🤖 AI Enthusiast',
      "💡 Let's Connect!",
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % titles.length;
      document.title = titles[i];
    }, 3000);

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

/* ── Main App ── */
function App() {
  // Skip preloader for returning visitors within the same tab session
  const [showPreloader, setShowPreloader] = useState(() => {
    try {
      return !sessionStorage.getItem('portfolio_visited');
    } catch {
      return true;
    }
  });

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  useAnimatedTitle();

  const handlePreloaderComplete = useCallback(() => {
    try { sessionStorage.setItem('portfolio_visited', '1'); } catch { /* ignore */ }
    setShowPreloader(false);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('minigame_best_score');
    if (stored) setBestScore(parseInt(stored, 10));
  }, []);

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <ToastProvider>
      <div
        className="bg-transparent text-gray-200 min-h-screen w-full overflow-x-hidden relative"
        style={{ minHeight: '-webkit-fill-available' }}
      >
        <ErrorBoundary name="CinematicUniverse"><CinematicUniverse /></ErrorBoundary>
        <Suspense fallback={null}><Cursor /></Suspense>
        <Suspense fallback={null}><TerminalEasterEgg /></Suspense>
        <ErrorBoundary name="SpaceshipProgress"><SpaceshipProgress /></ErrorBoundary>
        <Navbar onAssistantToggle={() => setIsAssistantOpen(o => !o)} />

        <main className="w-full relative z-10">
          <ErrorBoundary name="Hero"><Hero /></ErrorBoundary>

          <ErrorBoundary name="About" fallback={<SectionFallback />}>
            <Suspense fallback={<SectionFallback />}><About /></Suspense>
          </ErrorBoundary>

          <ErrorBoundary name="Internships" fallback={<SectionFallback />}>
            <Suspense fallback={<SectionFallback />}><Internships /></Suspense>
          </ErrorBoundary>

          <ErrorBoundary name="Projects" fallback={<SectionFallback height="h-96" />}>
            <Suspense fallback={<SectionFallback height="h-96" />}><Projects /></Suspense>
          </ErrorBoundary>

          <ErrorBoundary name="Achievements" fallback={<SectionFallback />}>
            <Suspense fallback={<SectionFallback />}><Achievements /></Suspense>
          </ErrorBoundary>

          <ErrorBoundary name="MiniGame" fallback={<SectionFallback height="h-96" />}>
            <Suspense fallback={<SectionFallback height="h-96" />}>
              <LazyLoad height="h-96">
                <MiniGame
                  score={score}
                  setScore={setScore}
                  level={level}
                  setLevel={setLevel}
                  bestScore={bestScore}
                  setBestScore={setBestScore}
                />
              </LazyLoad>
            </Suspense>
          </ErrorBoundary>
        </main>

        <Suspense fallback={null}>
          <ErrorBoundary><Footer /></ErrorBoundary>
          <ErrorBoundary>
            <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
          </ErrorBoundary>
        </Suspense>
      </div>
    </ToastProvider>
  );
}

export default App;