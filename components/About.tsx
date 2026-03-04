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

        {/* Education Dossier Section */}
        <Reveal width="100%" className="text-center mb-10 mt-20">
          <div className="relative inline-block mb-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
              Education
            </h2>
          </div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Academic Database</p>
        </Reveal>

        <Reveal width="100%" delay={0.2} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item) => (
            <div key={item.id} className="relative group perspective-[1500px] h-64">
              {/* Folder Back (Inside) */}
              <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-white/5 p-6 flex flex-col justify-end transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400">
                    <CheckCircle2 size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Dossier Details</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed border-l border-cyan-500/50 pl-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Folder Front (Cover) */}
              <div className="absolute inset-0 bg-[#161b22] p-6 rounded-2xl border border-white/10 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] origin-left group-hover:[transform:rotateY(-110deg)] z-10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-500">
                      <Calendar size={20} />
                    </div>
                    <div className="text-[8px] font-mono text-gray-500 bg-black/40 px-2 py-1 rounded">
                      ID: {item.id}00-EDU
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-white leading-tight mb-1">{item.title}</h3>
                  <p className="text-xs text-pink-400 font-bold">{item.subtitle}</p>
                </div>

                <div className="flex justify-between items-center text-[10px] text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                    {item.date}
                  </span>
                  <span className="px-2 py-0.5 border border-white/5 rounded-md">VERIFIED</span>
                </div>

                {/* Holographic tab */}
                <div className="absolute -right-2 top-8 w-6 h-12 bg-slate-800 rounded-r-lg border-y border-r border-white/10 flex items-center justify-center">
                  <div className="w-[1px] h-6 bg-white/20"></div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default About;