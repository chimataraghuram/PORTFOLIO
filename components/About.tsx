import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ABOUT_DATA, SKILLS_DATA } from '../constants';
import Reveal from './Reveal';
import { Skill } from '../types';

interface SkillBarProps {
  skill: Skill;
  index: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a delay to allow the parent Reveal animation to start/finish
          // and stagger based on index
          setTimeout(() => {
            setWidth(skill.level);
          }, 300 + (index * 100));
        } else {
          // Optional: Reset to 0 to re-animate when scrolling back up
          setWidth(0);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [skill.level, index]);

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <CheckCircle2 size={14} className="text-pink-500" /> {skill.name}
        </span>
        <span className="text-xs text-gray-500">{skill.level}%</span>
      </div>
      <div className="w-full bg-dark rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_rgba(236,72,153,0.5)] relative"
          style={{ width: `${width}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  // Group skills by category
  const categories = Array.from(new Set(SKILLS_DATA.map(s => s.category)));

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
          <p className="text-gray-400 text-sm">My introduction & technical level</p>
        </Reveal>

        {/* Profile + Stats Section */}
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

        {/* Skills Title */}
        <Reveal width="100%" className="text-center mb-10 mt-10">
          <div className="relative inline-block mb-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
              Skills
            </h2>
          </div>
          <p className="text-gray-400 text-xs">Technical Proficiency</p>
        </Reveal>

        {/* Skills Section (Replaces Old Service Cards) */}
        <Reveal width="100%" delay={0.4} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (

            <div key={category} className="bg-dark-lighter/50 p-5 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300">

              <h3 className="text-lg font-bold text-gray-200 mb-4 border-b border-white/5 pb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                {category}
              </h3>

              <div className="space-y-1">
                {SKILLS_DATA.filter(skill => skill.category === category).map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  );
};

export default About;