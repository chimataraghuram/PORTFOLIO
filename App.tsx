import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Qualification from './components/Qualification';
import Internships from './components/Internships';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particles from './components/Particles';


function App() {
  return (
    <div className="bg-dark text-gray-200 min-h-screen w-full overflow-x-hidden relative" style={{ minHeight: '100vh', minHeight: '-webkit-fill-available' }}>
      <Particles />
      <Navbar />
      <main className="w-full">
        <Hero />
        <About />
        <Skills />
        <Qualification />
        <Internships />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;