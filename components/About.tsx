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

        <Reveal width="100%" delay={0.2} className="relative max-w-5xl mx-auto py-10">
          {/* Main Progress Path (Spine) with Warp Animation */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-1 sm:-translate-x-1/2 bg-slate-800 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 via-pink-500 to-transparent h-[85%] animate-[warp-flow_4s_linear_infinite] shadow-[0_0_20px_rgba(34,211,238,0.6)]"></div>
          </div>

          <div className="space-y-16 sm:space-y-24 relative z-10">
            {data.slice().reverse().map((item, index) => {
              const isEven = index % 2 === 0;
              const isCurrent = item.title.includes('B-Tech');

              return (
                <div key={item.id} className="relative flex items-center justify-center w-full min-h-[160px]">
                  {/* Transition Wrapper for Level Entry */}
                  <Reveal
                    width="100%"
                    delay={0.1 * index}
                    className={`flex items-center justify-center w-full`}
                  >
                    {/* Center Node (Always on the line) */}
                    <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 z-30">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 group cursor-pointer relative ${isCurrent ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.7)] scale-110 active:scale-95' : 'bg-slate-900 border-slate-700 hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]'
                        }`}>
                        {isCurrent ? <Rocket size={28} className="text-white animate-bounce-slow" /> :
                          index === 1 ? <Brain size={28} className="text-pink-400 group-hover:animate-pulse" /> :
                            <Trophy size={28} className="text-yellow-400 group-hover:rotate-12 transition-transform" />}

                        {/* Radiating Radar Ring */}
                        <div className={`absolute -inset-4 rounded-full border-2 border-cyan-500/20 animate-[ping_3s_linear_infinite] ${isCurrent ? 'opacity-100' : 'opacity-0'}`}></div>
                        <div className={`absolute -inset-8 rounded-full border border-cyan-500/10 animate-[ping_4s_linear_infinite] ${isCurrent ? 'opacity-100' : 'opacity-0'}`}></div>
                      </div>

                      <div className="absolute -top-3 -right-3 bg-slate-900 border border-white/10 px-2 py-0.5 rounded text-[9px] font-black text-cyan-400 shadow-xl select-none">
                        LVL 0{index + 1}
                      </div>
                    </div>

                    {/* Info Card with Float & Slide Animation */}
                    <div className={`w-full flex ${isEven ? 'sm:justify-end' : 'sm:justify-start'} pl-20 sm:pl-0`}>
                      <div
                        className={`w-full sm:w-[44%] bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-500 shadow-2xl animate-[float_6s_ease-in-out_infinite] hover:animate-none ${isEven ? 'sm:ml-[56%]' : 'sm:mr-[56%]'}`}
                        style={{ animationDelay: `${index * 0.5}s` }}
                      >
                        {/* Shifting Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-pink-500/0 group-hover:from-cyan-500/5 group-hover:to-pink-500/5 transition-all duration-700"></div>

                        {/* Top Meta Data */}
                        <div className="flex items-center justify-between mb-3 relative z-10">
                          <div className="flex items-center gap-2">
                            <Target size={12} className="text-cyan-400 animate-pulse" />
                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Sector Identified</span>
                          </div>
                          <div className="text-[8px] font-mono text-cyan-500/50 group-hover:text-cyan-400 transition-colors">OS_SECURE_V4.2</div>
                        </div>

                        <h3 className="text-lg sm:text-2xl font-black text-white mb-1 uppercase tracking-tighter group-hover:tracking-normal transition-all duration-300">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-pink-400 font-bold mb-4 italic flex items-center gap-2">
                          <span className="w-4 h-[1px] bg-pink-500/30"></span>
                          {item.subtitle}
                        </p>

                        <p className="text-xs text-gray-400 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5 group-hover:border-white/10 group-hover:text-gray-200 transition-all">
                          {item.description}
                        </p>

                        {/* Education Progress Bar */}
                        {item.progress !== undefined && (
                          <div className="mt-5 space-y-2">
                             <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[2px]">
                                <span className="text-gray-500">Mastery Level</span>
                                <span className="text-cyan-400">{item.progress}%</span>
                              </div>
                              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                                <div 
                                  className="h-full bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                                  style={{ width: `${item.progress}%` }}
                                >
                                  <div className="absolute inset-0 bg-white/10 -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                </div>
                              </div>
                          </div>
                        )}

                        <div className="mt-5 flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-lg group-hover:bg-white/10 transition-colors">
                            <Calendar size={12} className="text-pink-500" />
                            {item.date}
                          </div>

                          {/* Achievement XP Marker */}
                          <div className="flex items-center gap-1">
                            <div className="flex -space-x-1">
                              {[1, 2, 3].map(i => (
                                <div key={i} className={`w-1.5 h-1.5 rounded-full border border-dark-lighter ${i === 3 ? 'bg-gray-700' : 'bg-cyan-500 animate-pulse'}`}></div>
                              ))}
                            </div>
                            <span className="text-[9px] font-black text-gray-400">+5000 XP</span>
                          </div>
                        </div>

                        {/* Interactive Scan Line Effect */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/20 -translate-y-full group-hover:animate-[scan_2s_linear_infinite] pointer-events-none"></div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>

          {/* Bottom Quest Indicator Card */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center gap-3 px-8 py-5 bg-slate-900/60 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-md group hover:border-cyan-500/40 transition-all duration-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[8px] font-black px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                STATUS: ACTIVE
              </div>

              <div className="flex gap-2 mb-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-2 h-2 rounded-sm rotate-45 border border-cyan-500/20 bg-cyan-500/10 ${i <= 4 ? 'bg-cyan-500/60 animate-pulse' : ''}`} style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>

              <p className="text-[11px] font-black text-white uppercase tracking-[5px] group-hover:tracking-[6px] transition-all">
                Quest Progress: <span className="text-cyan-400">80% Complete</span>
              </p>
              <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                <div className="w-[80%] h-full bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 animate-[progress-flow_2s_linear_infinite] bg-[length:30px_100%]"></div>
              </div>
            </div>
          </div>
        </Reveal>

        <style>{`
          @keyframes warp-flow {
            0% { background-position: 0 0; }
            100% { background-position: 0 1000px; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-12px) rotate(0.5deg); }
          }
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(400px); }
          }
          @keyframes progress-flow {
            0% { background-position: 0 0; }
            100% { background-position: 30px 0; }
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default About;