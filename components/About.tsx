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

        {/* Education Timeline added to About Section */}
        <Reveal width="100%" className="text-center mb-10 mt-20">
          <div className="relative inline-block mb-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
              Education
            </h2>
          </div>
          <p className="text-gray-400 text-xs">My academic journey</p>
        </Reveal>

        <Reveal width="100%" delay={0.2} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] bg-gray-700/50 -translate-x-1/2"></div>

          <div className="space-y-12">
            {data.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id} className="w-full">
                  <Reveal width="100%">
                    <div className={`flex flex-col md:flex-row items-center justify-between relative ${isEven ? '' : 'md:flex-row-reverse'}`}>

                      {/* Timeline Dot - Colorful */}
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 rounded-full border-4 border-dark z-10 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>

                      {/* Content Card with Colorful Glow Effect */}
                      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                        <div className="bg-dark-lighter p-6 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] group relative overflow-hidden h-full gelly-card">

                          {/* Subtle internal gradient - Blue to Pink */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-xl -mr-10 -mt-10 transition-all group-hover:bg-pink-500/20"></div>

                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">{item.title}</h3>
                          <span className="text-sm text-gray-400 block mb-3 font-medium">{item.subtitle}</span>

                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 bg-dark/50 w-fit px-2 py-1 rounded group-hover:text-pink-400 transition-colors">
                            <Calendar size={12} className="text-pink-500" />
                            {item.date}
                          </div>

                          {item.description && (
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Empty space for the other side */}
                      <div className="hidden md:block w-[45%]"></div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default About;