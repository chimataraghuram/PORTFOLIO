import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Calendar } from 'lucide-react';
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
  // Filter only Education data
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

        {/* Profile + Stats Section */}
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

        {/* Tech-Path Circuit Section */}
        <Reveal width="100%" className="text-center mb-16 mt-20">
          <div className="relative inline-block mb-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
              Education Path
            </h2>
          </div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Neural Academic Progress</p>
        </Reveal>

        <Reveal width="100%" delay={0.2} className="relative py-10">
          {/* Horizontal Circuit Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 hidden md:block -translate-y-1/2">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 animate-[circuit-flow_3s_linear_infinite] opacity-50 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {data.slice().reverse().map((item, index) => (
              <div key={item.id} className="relative group">
                {/* Connector Line (Mobile) */}
                {index < data.length - 1 && (
                  <div className="absolute left-[23px] top-12 h-full w-[2px] bg-slate-800 md:hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-pink-500 animate-[circuit-flow-v_3s_linear_infinite] opacity-50"></div>
                  </div>
                )}

                {/* Node Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-x-0 md:-translate-x-1/2 -translate-y-0 md:-translate-y-1/2 z-20">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300">
                      <span className="text-xs font-black text-gray-500 group-hover:text-cyan-400">0{index + 1}</span>
                    </div>
                    {/* Pulsing ring */}
                    <div className="absolute -inset-2 rounded-full border border-cyan-500/20 animate-ping opacity-0 group-hover:opacity-100"></div>
                  </div>
                </div>

                {/* Card Content - Rotated positions on desktop */}
                <div className={`pl-16 md:pl-0 md:pt-20 transition-all duration-500 group-hover:-translate-y-2`}>
                  <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl shadow-xl hover:border-pink-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={14} className="text-pink-500" />
                      <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">{item.date}</span>
                    </div>
                    <h3 className="text-lg font-black text-white mb-1 group-hover:text-cyan-400 transition-colors uppercase tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-pink-400 font-bold mb-4">{item.subtitle}</p>

                    <div className="text-xs text-gray-400 border-t border-white/5 pt-4 leading-relaxed italic">
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @keyframes circuit-flow {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @keyframes circuit-flow-v {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100%); }
            }
          `}</style>
        </Reveal>
      </div>
    </section>
  );
};

export default About;