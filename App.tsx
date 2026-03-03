import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Qualification from './components/Qualification';
import Internships from './components/Internships';
import Projects from './components/Projects';
import Explorations from './components/Explorations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particles from './components/Particles';
import AIAssistant from './components/AIAssistant';


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
      <Navbar onAssistantToggle={() => setIsAssistantOpen(!isAssistantOpen)} />
      <main className="w-full">
        <Hero />
        <About />
        <Skills />
        <Qualification />
        <Internships />
        <Projects />
        <Explorations />
        <Contact />
      </main>

      <Footer
        score={score}
        setScore={setScore}
        level={level}
        setLevel={setLevel}
        bestScore={bestScore}
        setBestScore={setBestScore}
      />
      <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
}

export default App;