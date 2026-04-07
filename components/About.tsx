import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Calendar, Brain, Rocket, Trophy, Target } from 'lucide-react';
import { ABOUT_DATA, SKILLS_DATA, QUALIFICATIONS_DATA } from '../constants';
import Reveal from './Reveal';
import SkillOrbit from './SkillOrbit';
import { Skill } from '../types';
import { Code, Cpu, Globe, Database, Cloud, Terminal, Cpu as BrainIcon, Settings } from 'lucide-react';

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

interface QualificationCardProps {
  item: any;
  index: number;
}

const QualificationCard: React.FC<QualificationCardProps> = ({ item, index }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (item.progress) setWidth(item.progress);
          }, 400 + (index * 150));
        } else {
           setWidth(0); 
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [item.progress, index]);

  return (
    <div ref={ref} className={`w-[92%] sm:w-[44%] mx-auto sm:mx-0 max-w-md sm:max-w-none bg-slate-900/40 backdrop-blur-xl border border-white/5 p-4 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-cyan-500/40 hover:scale-[1.02] transition-all duration-500 shadow-2xl animate-[float_6s_ease-in-out_infinite] hover:animate-none ${isEven ? 'sm:ml-[56%]' : 'sm:mr-[56%]'}`}
      style={{ animationDelay: `${index * 0.5}s` }}
    >
      {/* Shifting Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-pink-500/0 group-hover:from-cyan-500/5 group-hover:to-pink-500/5 transition-all duration-700"></div>

      {/* Top Meta Data */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <Target size={12} className="text-cyan-400 animate-pulse" />
          <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Sector Identified</span>
        </div>
        <div className="text-[10px] font-mono text-cyan-500/50 group-hover:text-cyan-400 transition-colors">OS_SECURE_V4.2</div>
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

      {/* Education Progress Bar - Enhanced Profile with Scroll Animation */}
      {item.progress !== undefined && (
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-black uppercase tracking-[3px]">
            <span className="text-gray-400">Quest Mastery</span>
            <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">{width}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950/60 rounded-full overflow-hidden border border-white/10 relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(34,211,238,0.3)] relative"
              style={{ width: `${width}%` }}
            >
              {/* High-Fidelity Animated Flow Stripe */}
              <div className="absolute inset-0 bg-[length:30px_100%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_linear_infinite]"></div>

              {/* Top Gloss Coating */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 rounded-t-full"></div>
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
          <span className="text-xs font-black text-gray-400">+5000 XP</span>
        </div>
      </div>

      {/* Interactive Scan Line Effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/20 -translate-y-full group-hover:animate-[scan_2s_linear_infinite] pointer-events-none"></div>
    </div>
  );
};

const SkillsMarquee: React.FC = () => {
  // Triple the skills to ensure there's enough content to fill the screen twice for the loop
  const allSkills = [...SKILLS_DATA, ...SKILLS_DATA, ...SKILLS_DATA]; 

  const getColor = (category: string, name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('python')) return '#3776AB'; // Python Blue
    if (lower.includes('javascript')) return '#F7DF1E'; // JS Yellow
    if (lower.includes('django')) return '#092E20'; // Django Green
    if (lower.includes('react')) return '#61DAFB'; // React Blue
    if (lower.includes('aws')) return '#FF9900'; // AWS Orange
    if (lower.includes('mongodb')) return '#47A248'; // MongoDB Green
    if (lower.includes('github')) return '#ffffff'; // GitHub White
    
    switch (category) {
      case 'Language': return '#fbbf24'; // Amber
      case 'Backend': return '#10b981'; // Emerald
      case 'Frontend': return '#ec4899'; // Pink
      case 'Tool': return '#3b82f6'; // Blue
      case 'Core': return '#8b5cf6'; // Violet
      default: return '#06b6d4'; // Cyan
    }
  };

  const getIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('python') || lower.includes('django') || lower.includes('javascript') || lower.includes('react') || lower.includes('html')) return <Code size={14} />;
    if (lower.includes('ai') || lower.includes('artificial') || lower.includes('claw') || lower.includes('brain')) return <BrainIcon size={14} />;
    if (lower.includes('aws') || lower.includes('cloud')) return <Cloud size={14} />;
    if (lower.includes('mysql') || lower.includes('mongodb') || lower.includes('database')) return <Database size={14} />;
    if (lower.includes('git') || lower.includes('github') || lower.includes('docker')) return <Terminal size={14} />;
    return <Settings size={14} />;
  };

  return (
    <div className="w-full overflow-hidden py-10 relative">
      {/* Side Fades for smooth entry/exit */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none"></div>

      <div className="flex animate-marquee-ltr gap-6 items-center">
        {allSkills.map((skill, i) => {
          const color = getColor(skill.category, skill.name);
          return (
            <div 
              key={`${skill.name}-${i}`}
              className="flex items-center gap-3 px-6 py-3 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-full whitespace-nowrap transition-all duration-300 group cursor-default shadow-lg"
              style={{ 
                borderColor: `${color}20`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${color}80`;
                e.currentTarget.style.boxShadow = `0 0 20px ${color}20`;
              } }
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${color}20`;
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
              } }
            >
              <div 
                className="p-2 bg-slate-800/50 rounded-full transition-all group-hover:scale-110"
                style={{ color: color }}
              >
                {getIcon(skill.name)}
              </div>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const categories = Array.from(new Set(SKILLS_DATA.map(s => s.category)));
  const data = QUALIFICATIONS_DATA.filter(q => q.type === 'Education');

  return (
    <section id="about" className="py-20 pb-32 md:pb-20 bg-dark-lighter/30" style={{ paddingBottom: 'calc(8rem + env(safe-area-inset-bottom, 0px))' }}>
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

        <div id="skills-section" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Column 1: Title (Small & Neat) */}
          <Reveal width="fit-content" delay={0.2} className="hidden lg:flex lg:col-span-2 flex-col items-center lg:items-start">
            <div className="relative group">
              <h3 className="text-xl font-black uppercase tracking-[4px] text-white/40 group-hover:text-cyan-400 transition-colors duration-500 [writing-mode:vertical-lr] rotate-180 py-4 border-l border-cyan-500/20">
                My Skills
              </h3>
              <div className="h-12 w-[1px] bg-gradient-to-b from-cyan-500/50 to-transparent ml-[1px]"></div>
            </div>
          </Reveal>

          {/* Column 2: Orbit (Visual Core) */}
          <Reveal width="100%" delay={0.3} className="lg:col-span-5 flex justify-center relative group min-h-[350px] lg:min-h-[400px]">
            <SkillOrbit />
          </Reveal>

          {/* Column 3: Description & Stats (Information) */}
          <Reveal width="100%" delay={0.4} className="lg:col-span-5 flex flex-col gap-8">
            <div className="relative p-6 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
               <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-transparent"></div>
               <p className="text-gray-400 leading-relaxed text-sm md:text-base font-medium">
                  {ABOUT_DATA.description}
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-[90%] mx-auto max-w-md sm:w-full sm:max-w-none">
              {ABOUT_DATA.stats.map((stat, index) => {
                let colorClass = "from-cyan-500/10 to-transparent";
                let borderClass = "border-cyan-500/20";
                let textGlow = "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]";

                if (index === 0) {
                  colorClass = "from-yellow-400/10 to-transparent";
                  borderClass = "border-yellow-500/20";
                  textGlow = "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]";
                } else if (index === 2) {
                  colorClass = "from-pink-500/10 to-transparent";
                  borderClass = "border-pink-500/20";
                  textGlow = "text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]";
                }

                return (
                  <div key={index} className={`relative p-4 bg-slate-900/60 backdrop-blur-md border ${borderClass} rounded-2xl group/stat hover:-translate-y-1 transition-all duration-300 gelly-card overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover/stat:opacity-100 transition-opacity`}></div>
                    <h4 className={`text-lg font-black mb-1 relative z-10 ${textGlow}`}>
                      {stat.value}
                    </h4>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest relative z-10">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>


        {/* Skills Marquee above Academic Quest */}
        <Reveal width="100%" delay={0.1} className="mt-20">
           <SkillsMarquee />
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
            {data.map((item, index) => {
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
                        LVL 0{data.length - index}
                      </div>
                    </div>

                    {/* Info Card with Float & Slide Animation - Clears spine on mobile with pl-16 */}
                    <div className={`w-full flex ${isEven ? 'sm:justify-end' : 'sm:justify-start'} pl-16 pr-6 sm:pl-0 sm:pr-0 mb-4 sm:mb-0`}>
                      <QualificationCard item={item} index={index} />
                    </div>
                  </Reveal>
                </div>
              );
            })}
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