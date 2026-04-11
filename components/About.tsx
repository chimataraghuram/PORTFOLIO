import React from 'react';
import { ABOUT_DATA, SKILLS_DATA } from '../constants';
import Reveal from './Reveal';
import SkillOrbit from './SkillOrbit';
import { Code, Database, Cloud, Terminal, Cpu as BrainIcon, Settings } from 'lucide-react';

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

const SkillsMarquee: React.FC = () => {
  // Double the skills to ensure there's enough content to fill the screen twice for the loop
  const allSkills = [...SKILLS_DATA, ...SKILLS_DATA]; 

  return (
    <div className="w-full overflow-hidden py-10 relative">
      {/* Side Fades for smooth entry/exit */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none"></div>

      <div className="flex animate-marquee-rtl gap-6 items-center" style={{ willChange: 'transform' }}>
        {allSkills.map((skill, i) => {
          const color = getColor(skill.category, skill.name);
          return (
            <div 
              key={`${skill.name}-${i}`}
              className="flex items-center gap-3 px-6 py-3 bg-slate-900/60 border border-white/10 rounded-full whitespace-nowrap transition-all duration-300 group cursor-default shadow-lg"
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

  return (
    <section id="about" className="py-6 md:py-0 md:min-h-screen flex flex-col justify-center bg-dark-lighter/30 relative overflow-hidden" style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="max-w-6xl mx-auto px-4 w-full">
        <Reveal width="100%" className="text-center mb-6 md:mb-8">
          <div className="relative inline-block mb-3">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative px-6 md:px-8 py-2 md:py-3 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
              <h2 className="text-xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                About Me
              </h2>
            </div>
          </div>
          <p className="text-gray-400 text-[8px] md:text-xs uppercase tracking-widest font-bold">Introduction & technical level</p>
        </Reveal>

        <div id="skills-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center mb-6 md:mb-8">

          {/* Column 2: Orbit - Left on Desktop */}
          <Reveal width="100%" delay={0.3} className="lg:col-span-5 flex justify-center relative group min-h-[260px] lg:min-h-[300px] order-2 lg:order-1 mt-4 lg:mt-28">
            <div className="scale-75 sm:scale-90 lg:scale-100 origin-center">
              <SkillOrbit />
            </div>
          </Reveal>

          {/* Column 3: Description & Stats - Right on Desktop */}
          <Reveal width="100%" delay={0.4} className="lg:col-span-7 flex flex-col gap-4 md:gap-6 order-1 lg:order-2">
            <div className="relative p-5 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
               <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-transparent"></div>
               <p className="text-gray-400 leading-relaxed text-xs md:text-sm font-medium">
                  {ABOUT_DATA.description}
               </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
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
                  <div key={index} className={`relative p-2 md:p-3 bg-slate-900/60 backdrop-blur-md border ${borderClass} rounded-xl group/stat hover:-translate-y-1 transition-all duration-300 gelly-card overflow-hidden flex flex-col items-center text-center justify-center`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover/stat:opacity-100 transition-opacity`}></div>
                    <h4 className={`text-sm md:text-base font-black mb-0.5 relative z-10 ${textGlow}`}>
                      {stat.value}
                    </h4>
                    <p className="text-[7px] md:text-[9px] font-black text-gray-500 uppercase tracking-tighter sm:tracking-widest relative z-10 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Skills Marquee */}
        <Reveal width="100%" delay={0.1}>
           <div className="flex flex-col items-center mb-1 md:mb-2">
              <h3 className="text-sm md:text-base font-black uppercase tracking-[0.4em] text-white/30">My Skills</h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mt-1"></div>
           </div>
           <SkillsMarquee />
        </Reveal>

      </div>
    </section>
  );
};

export default React.memo(About);
