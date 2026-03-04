import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Calendar, Brain, Rocket, Trophy, Target } from 'lucide-react';
import { ABOUT_DATA, SKILLS_DATA, QUALIFICATIONS_DATA } from '../constants';
import Reveal from './Reveal';
import SkillOrbit from './SkillOrbit';
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
          setTimeout(() => {
            setWidth(skill.level);
          }, 300 + (index * 100));
        } else {
          setWidth(0);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
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
      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-white/5">
        <div
          className="bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 h-2 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${width}%` }}
        >
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const categories = Array.from(new Set(SKILLS_DATA.map(s => s.category)));
  const data = QUALIFICATIONS_DATA.filter(q => q.type === 'Education');

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

        <Reveal width="100%" delay={0.2} className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex justify-center relative group min-h-[400px]">
            <SkillOrbit />
          </div>

          <div className="text-center md:text-left pt-0 md:pt-10">
            <p className="text-gray-400 mb-8 leading-relaxed">
              {ABOUT_DATA.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {ABOUT_DATA.stats.map((stat, index) => {
                let textColor = "text-white";
                let containerStyle = "";

                if (index === 0) {
                  textColor = "text-yellow-400";
                  containerStyle = "border-yellow-500/30 shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.6)]";
                } else if (index === 2) {
                  textColor = "text-blue-400";
                  containerStyle = "border-blue-500/30 shadow-[0_0_15px_rgba(96,165,250,0.2)] hover:border-blue-400 hover:shadow-[0_0_25px_rgba(96,165,250,0.6)]";
                } else {
                  containerStyle = "border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]";
                }

                return (
                  <div key={index} className={`text-center p-3 bg-slate-900/50 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${containerStyle} gelly-card`}>
                    <h3 className={`text-xl font-bold ${textColor}`}>{stat.value}</h3>
                    <span className="text-[10px] text-gray-400 uppercase font-black">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal width="100%" className="text-center mb-10 mt-10">
          <div className="relative inline-block mb-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
              Skills
            </h2>
          </div>
          <p className="text-gray-400 text-xs">Technical Proficiency</p>
        </Reveal>

        <Reveal width="100%" delay={0.4} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category} className="bg-slate-900/50 p-5 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300">
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

        {/* Game Level Progress Education Section */}
        <Reveal width="100%" className="text-center mb-16 mt-20">
          <div className="relative inline-block mb-4">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
              Academic Quest
            </h2>
          </div>
          <p className="text-gray-400 text-xs uppercase tracking-widest font-black flex items-center justify-center gap-2">
            <span className="w-10 h-[1px] bg-cyan-500/50"></span>
            Education Progression Map
            <span className="w-10 h-[1px] bg-cyan-500/50"></span>
          </p>
        </Reveal>

        <Reveal width="100%" delay={0.2} className="relative max-w-3xl mx-auto px-4 sm:px-10 py-10">
          {/* Main Progress Path */}
          <div className="absolute left-10 sm:left-1/2 top-0 bottom-0 w-1 sm:-translate-x-1/2 bg-slate-800 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 via-pink-500 to-transparent h-[85%] animate-pulse"></div>
          </div>

          <div className="space-y-24 relative z-10">
            {data.slice().reverse().map((item, index) => {
              const isEven = index % 2 === 0;
              const isCurrent = item.title.includes('B-Tech');

              return (
                <div key={item.id} className={`flex flex-col sm:flex-row items-center gap-8 ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  {/* Level Node */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 group relative z-20 ${isCurrent ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)] scale-110' : 'bg-slate-900 border-slate-700'
                      }`}>
                      {isCurrent ? <Rocket size={32} className="text-white animate-bounce-slow" /> :
                        index === 1 ? <Brain size={32} className="text-pink-400" /> :
                          <Trophy size={32} className="text-yellow-400" />}
                    </div>

                    {/* Level Number Badge */}
                    <div className="absolute -top-3 -right-3 bg-dark-lighter border border-white/10 px-2 py-0.5 rounded text-[10px] font-black text-cyan-400 z-30">
                      LVL {index + 1}
                    </div>

                    {isCurrent && (
                      <div className="absolute -inset-4 bg-cyan-500/20 rounded-full animate-ping"></div>
                    )}
                  </div>

                  {/* Info Card */}
                  <div className={`w-full sm:w-1/2 bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-pink-500/30 transition-all ${!isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                      <div className={`h-full bg-gradient-to-r ${isCurrent ? 'from-cyan-400 to-blue-500 w-[70%]' : 'from-pink-400 to-purple-500 w-full'}`}></div>
                    </div>

                    <div className={`flex items-center gap-2 mb-2 ${!isEven ? 'sm:justify-end' : ''}`}>
                      <Target size={12} className="text-cyan-400" />
                      <span className="text-[10px] font-mono text-gray-500 uppercase">Mission Objective</span>
                    </div>

                    <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-pink-400 font-bold mb-4 italic">{item.subtitle}</p>

                    <p className="text-xs text-gray-400 leading-relaxed bg-black/30 p-4 rounded-lg border border-white/5">
                      {item.description}
                    </p>

                    <div className={`mt-4 flex items-center gap-3 ${!isEven ? 'sm:justify-end' : ''}`}>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                        <Calendar size={12} />
                        {item.date}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quest Progress indicator */}
          <div className="mt-20 text-center">
            <div className="inline-block px-4 py-2 bg-slate-900 border border-white/10 rounded-full shadow-lg">
              <p className="text-[10px] font-black text-white uppercase tracking-[4px] animate-pulse">Quest Progress: 85% Complete</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;