import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Internships from './components/Internships';
import Projects from './components/Projects';
import Explorations from './components/Explorations';
import MiniGame from './components/MiniGame';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particles from './components/Particles';
import AIAssistant from './components/AIAssistant';
import SpaceshipProgress from './components/SpaceshipProgress';

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
      <Navbar onAssistantToggle={() => setIsAssistantOpen(!isAssistantOpen)} />
      <main className="w-full">
        <Hero />
        <About />
        <Internships />
        <Projects />
        <Explorations />
        <MiniGame
          score={score}
          setScore={setScore}
          level={level}
          setLevel={setLevel}
          bestScore={bestScore}
          setBestScore={setBestScore}
        />
      </main>

      <Footer />
      <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
}

export default App;