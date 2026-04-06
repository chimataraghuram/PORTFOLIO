import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Internships from './components/Internships';
import Projects from './components/Projects';
import Explorations from './components/Explorations';
import MiniGame from './components/MiniGame';
import Footer from './components/Footer';
import Particles from './components/Particles';
import AIAssistant from './components/AIAssistant';
import SpaceshipProgress from './components/SpaceshipProgress';

function App() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);

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
        setIsGameOpen={setIsGameOpen}
      />
      <main className="w-full">
        <Hero />
        <About />
        <Internships />
        <Projects />
        <Explorations />
      </main>

      <MiniGame
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
        score={score}
        setScore={setScore}
        level={level}
        setLevel={setLevel}
        bestScore={bestScore}
        setBestScore={setBestScore}
      />

      <Footer />
      <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
}

export default App;