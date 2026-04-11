import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Particles from './components/Particles';
import SpaceshipProgress from './components/SpaceshipProgress';

const About = lazy(() => import('./components/About'));
const Internships = lazy(() => import('./components/Internships'));
const Projects = lazy(() => import('./components/Projects'));
const MiniGame = lazy(() => import('./components/MiniGame'));
const Footer = lazy(() => import('./components/Footer'));
const AIAssistant = lazy(() => import('./components/AIAssistant'));

function App() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('minigame_best_score');
    if (stored) setBestScore(parseInt(stored));
  }, []);

  return (
    <div className="bg-dark text-gray-200 min-h-screen w-full overflow-x-hidden relative" style={{ minHeight: '-webkit-fill-available' }}>
      <Particles />
      <SpaceshipProgress />
      <Navbar 
        onAssistantToggle={() => setIsAssistantOpen(!isAssistantOpen)} 
      />
      <main className="w-full">
        <Hero />
        <Suspense fallback={<div className="h-40 flex items-center justify-center text-pink-500 font-bold">Loading Section...</div>}>
          <About />
          <Internships />
          <Projects />
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