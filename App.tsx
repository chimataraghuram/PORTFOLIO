import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Particles from './components/Particles';
import SpaceshipProgress from './components/SpaceshipProgress';

const About = lazy(() => import('./components/About'));
const AcademicQuest = lazy(() => import('./components/AcademicQuest'));
const Internships = lazy(() => import('./components/Internships'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const MiniGame = lazy(() => import('./components/MiniGame'));
const Footer = lazy(() => import('./components/Footer'));
const AIAssistant = lazy(() => import('./components/AIAssistant'));

const SectionFallback = () => (
  <div className="h-32 flex items-center justify-center text-pink-500/40 text-xs font-bold animate-pulse">
    Loading...
  </div>
);

function App() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const stored = localStorage.getItem('minigame_best_score');
    if (stored) setBestScore(parseInt(stored));
  }, []);

  return (
    <div className="bg-dark text-gray-200 min-h-screen w-full overflow-x-hidden relative" style={{ minHeight: '-webkit-fill-available' }}>
      {!isMobile && <Particles />}
      <SpaceshipProgress />
      <Navbar 
        onAssistantToggle={() => setIsAssistantOpen(!isAssistantOpen)} 
      />
      <main className="w-full">
        <Hero />
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><AcademicQuest /></Suspense>
        <Suspense fallback={<SectionFallback />}><Internships /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><Achievements /></Suspense>
        <Suspense fallback={<SectionFallback />}>
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
  );
}

export default App;