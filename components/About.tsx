import React from 'react';
import { ABOUT_DATA, SKILLS_DATA } from '../constants';
import Reveal from './Reveal';
import SkillOrbit from './SkillOrbit';
import { Code, Database, Cloud, Terminal, Cpu as BrainIcon, Settings } from 'lucide-react';

const getColor = (category: string, name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('python')) return '#3776AB';
  if (lower.includes('javascript')) return '#F7DF1E';
  if (lower.includes('django')) return '#092E20';
  if (lower.includes('react')) return '#61DAFB';
  if (lower.includes('aws')) return '#FF9900';
  if (lower.includes('mongodb')) return '#47A248';
  if (lower.includes('github')) return '#ffffff';
  switch (category) {
    case 'Language': return '#fbbf24';
    case 'Backend': return '#10b981';
    case 'Frontend': return '#ec4899';
    case 'Tool': return '#3b82f6';
    case 'Core': return '#8b5cf6';
    default: return '#06b6d4';
  }
};

const getIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('python') || lower.includes('django') || lower.includes('javascript') || lower.includes('react') || lower.includes('html')) return <Code size={12} />;
  if (lower.includes('ai') || lower.includes('artificial') || lower.includes('claw') || lower.includes('brain')) return <BrainIcon size={12} />;
  if (lower.includes('aws') || lower.includes('cloud')) return <Cloud size={12} />;
  if (lower.includes('mysql') || lower.includes('mongodb') || lower.includes('database')) return <Database size={12} />;
  if (lower.includes('git') || lower.includes('github') || lower.includes('docker')) return <Terminal size={12} />;
  return <Settings size={12} />;
};

const SkillsMarquee: React.FC = () => {
  const allSkills = [...SKILLS_DATA, ...SKILLS_DATA];
  return (
    <div className="w-full overflow-hidden py-2 relative">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
      <div className="flex animate-marquee-rtl gap-3 items-center" style={{ willChange: 'transform' }}>
        {allSkills.map((skill, i) => {
          const color = getColor(skill.category, skill.name);
          return (
            <div
              key={`${skill.name}-${i}`}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 border border-white/10 rounded-full whitespace-nowrap transition-all duration-300 group cursor-default"
              style={{ borderColor: `${color}20` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${color}80`;
                e.currentTarget.style.boxShadow = `0 0 14px ${color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${color}20`;
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div className="p-1 bg-slate-800/50 rounded-full transition-all group-hover:scale-110" style={{ color }}>
                {getIcon(skill.name)}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-300 group-hover:text-white transition-colors">
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
  const [githubStats, setGithubStats] = React.useState<string>("200+");

  React.useEffect(() => {
    const fetchGithubContributions = async () => {
      try {
        const response = await fetch('https://github-contributions-api.deno.dev/chimataraghuram/count');
        if (response.ok) {
          const data = await response.json();
          if (data && data.total) setGithubStats(data.total.toLocaleString());
        }
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      }
    };
    fetchGithubContributions();
  }, []);

  return (
    <section
      id="about"
      className="py-6 lg:py-0 lg:min-h-screen flex flex-col justify-center bg-dark-lighter/30 relative overflow-hidden"
      style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="max-w-6xl mx-auto px-4 w-full">

        {/* ── Section Header ── */}
        <Reveal width="100%" className="text-center mb-4 lg:mb-6">
          <div className="relative inline-block mb-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative px-6 py-2 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
              <h2 className="text-xl lg:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                About Me
              </h2>
            </div>
          </div>
          <p className="text-gray-400 text-[8px] lg:text-xs uppercase tracking-widest font-bold">Introduction &amp; technical level</p>
        </Reveal>

        {/* ── Main 2-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* ═══ LEFT: Skill Orbit ═══ */}
          <Reveal width="100%" delay={0.3} className="lg:col-span-5 flex justify-center relative group min-h-[260px] lg:min-h-[340px] order-2 lg:order-1">
            <div className="scale-75 sm:scale-90 lg:scale-100 origin-center">
              <SkillOrbit />
            </div>
          </Reveal>

          {/* ═══ RIGHT: Bio + Stats + Skills ═══ */}
          <Reveal width="100%" delay={0.4} className="lg:col-span-7 flex flex-col gap-4 lg:gap-5 order-1 lg:order-2">

            {/* Bio Card */}
            <div className="relative p-5 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-transparent"></div>
              <p className="text-gray-400 leading-relaxed text-xs lg:text-sm font-medium">
                {ABOUT_DATA.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 lg:gap-3 w-full">
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
                const displayValue = (stat as any).key === 'github' ? githubStats : stat.value;
                return (
                  <div key={index} className={`relative p-2 lg:p-3 bg-slate-900/60 backdrop-blur-md border ${borderClass} rounded-xl group/stat hover:-translate-y-1 transition-all duration-300 gelly-card overflow-hidden flex flex-col items-center text-center justify-center`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover/stat:opacity-100 transition-opacity`}></div>
                    <h4 className={`text-sm lg:text-base font-black mb-0.5 relative z-10 ${textGlow}`}>{displayValue}</h4>
                    <p className="text-[7px] lg:text-[9px] font-black text-gray-500 uppercase tracking-tighter lg:tracking-widest relative z-10 leading-tight">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Skills Marquee */}
            <div>
              <div className="flex flex-col items-center mb-1 lg:mb-2">
                <h3 className="text-sm lg:text-base font-black uppercase tracking-[0.4em] text-white/30">My Skills</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mt-1"></div>
              </div>
              <SkillsMarquee />
            </div>

          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default React.memo(About);
