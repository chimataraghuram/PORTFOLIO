import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ABOUT_DATA, SKILLS_DATA } from '../constants';
import Reveal from './Reveal';
import SkillOrbit from './SkillOrbit';
import { Skill } from '../types';
import { Code, Database, Cloud, Terminal, Cpu as BrainIcon, Settings } from 'lucide-react';

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
    <section id="about" className="py-12 pb-24 md:pb-12 bg-dark-lighter/30" style={{ paddingBottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="max-w-5xl mx-auto px-4">
        <Reveal width="100%" className="text-center mb-10">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative px-6 md:px-10 py-3 md:py-4 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
              <h2 className="text-2xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                About Me
              </h2>
            </div>
          </div>
          <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-widest font-bold">Introduction & technical level</p>
        </Reveal>

        <div id="skills-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          
          {/* Mission & Stats Area (Right on Desktop, Top on Mobile) */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
            <Reveal width="100%" delay={0.2}>
              <div className="relative p-6 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-transparent"></div>
                <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-[3px] mb-3">Professional Mission</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base font-medium">
                  {ABOUT_DATA.description}
                </p>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.4} className="grid grid-cols-3 gap-3">
              {ABOUT_DATA.stats.map((stat, index) => {
                const colors = [
                  "from-yellow-400/10 border-yellow-500/20 text-yellow-400",
                  "from-cyan-500/10 border-cyan-500/20 text-cyan-400",
                  "from-pink-500/10 border-pink-500/20 text-pink-400"
                ];
                return (
                  <div key={index} className={`relative p-3 bg-slate-900/60 backdrop-blur-md border rounded-2xl transition-all duration-300 gelly-card flex flex-col items-center text-center justify-center ${colors[index]}`}>
                    <h4 className="text-base sm:text-xl font-black mb-0.5 relative z-10 drop-shadow-[0_0_8px_currentColor]">
                      {stat.value}
                    </h4>
                    <p className="text-[7px] sm:text-[10px] font-black text-gray-500 uppercase tracking-tighter sm:tracking-widest relative z-10 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </Reveal>
          </div>

          {/* Skill Orbit (Left on Desktop, Bottom on Mobile) */}
          <Reveal width="100%" delay={0.3} className="lg:col-span-5 flex justify-center order-2 lg:order-1 mt-10 md:mt-0">
            <div className="scale-90 md:scale-100">
              <SkillOrbit />
            </div>
          </Reveal>
        </div>

        {/* Skills Marquee - Clean Footer for About */}
        <Reveal width="100%" delay={0.1} className="mt-6 md:mt-12">
           <SkillsMarquee />
        </Reveal>

      </div>
    </section>
  );
};

export default React.memo(About);
