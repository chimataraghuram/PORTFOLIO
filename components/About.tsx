import React from 'react';
import { Download, Brain, Code, Cloud } from 'lucide-react';
import { ABOUT_DATA, ABOUT_CARDS_DATA } from '../constants';
import Reveal from './Reveal';

const About: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'brain': return <Brain size={24} className="text-pink-500" />;
      case 'code': return <Code size={24} className="text-pink-500" />;
      case 'cloud': return <Cloud size={24} className="text-pink-500" />;
      default: return <Code size={24} className="text-pink-500" />;
    }
  };

  return (
    <section id="about" className="py-20 pb-24 md:pb-20 bg-dark-lighter/30" style={{ paddingBottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="max-w-5xl mx-auto px-4">
        <Reveal width="100%" className="text-center mb-16">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative px-10 py-4 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                About Me
              </h2>
            </div>
          </div>
          <p className="text-gray-400 text-sm">My introduction</p>
        </Reveal>

        <Reveal width="100%" delay={0.2} className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div className="flex justify-center relative group">
            {/* Ambient Glow Background - Colorful */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 rounded-xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
            <img
              src="/PORTFOLIO/about.jpg"
              alt="About Me"
              className="relative z-10 w-72 h-96 object-cover rounded-xl shadow-[0_0_30px_rgba(236,72,153,0.5)] rotate-3 hover:rotate-0 transition-all duration-500 hover:shadow-[0_0_60px_rgba(236,72,153,0.8)] border-2 border-pink-500/20 hover:border-pink-500/80 hover:scale-[1.02]"
            />
          </div>

          <div className="text-center md:text-left">
            <p className="text-gray-400 mb-8 leading-relaxed">
              {ABOUT_DATA.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {ABOUT_DATA.stats.map((stat, index) => {
                let textColor = "text-white";
                let containerStyle = "";

                if (index === 0) {
                  // Aggregate CGPA - Yellow
                  textColor = "text-yellow-400";
                  containerStyle = "border-yellow-500/30 shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.6)]";
                } else if (index === 2) {
                  // Internships - Blue
                  textColor = "text-blue-400";
                  containerStyle = "border-blue-500/30 shadow-[0_0_15px_rgba(96,165,250,0.2)] hover:border-blue-400 hover:shadow-[0_0_25px_rgba(96,165,250,0.6)]";
                } else {
                  // Projects - White/Default
                  containerStyle = "border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]";
                }

                return (
                  <div key={index} className={`text-center p-3 bg-dark-lighter rounded-xl border transition-all duration-300 hover:-translate-y-1 ${containerStyle} gelly-card`}>
                    <h3 className={`text-xl font-bold ${textColor}`}>{stat.value}</h3>
                    <span className="text-xs text-gray-400">{stat.label}</span>
                  </div>
                );
              })}
            </div>


          </div>
        </Reveal>

        {/* Menu Cards Section - Colorful Glow */}
        <Reveal width="100%" delay={0.4} className="grid md:grid-cols-3 gap-6">
          {ABOUT_CARDS_DATA.map((card) => (
            <div key={card.id} className="bg-dark-lighter p-6 rounded-xl border border-gray-800 hover:border-pink-500/50 transition-all hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] group relative overflow-hidden gelly-card">
              {/* Internal Gradient */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/10 rounded-full blur-xl -mr-10 -mt-10 transition-all group-hover:bg-pink-500/20"></div>

              <div className="mb-4 bg-dark inline-block p-3 rounded-lg border border-gray-800 group-hover:border-pink-500/50 transition-colors relative z-10">
                {getIcon(card.icon)}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 relative z-10">{card.title}</h3>
              <p className="text-sm text-gray-400 relative z-10">{card.description}</p>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  );
};

export default About;