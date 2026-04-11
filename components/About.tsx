import React from 'react';
import { ABOUT_DATA, SKILLS_DATA, QUALIFICATIONS_DATA } from '../constants';
import Reveal from './Reveal';
import SkillOrbit from './SkillOrbit';
import { Code, Database, Cloud, Terminal, Cpu as BrainIcon, Settings, GraduationCap, CheckCircle2, Clock } from 'lucide-react';

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

  const educationItems = QUALIFICATIONS_DATA.filter(q => q.type === 'Education');

  return (
    <section
      id="about"
      className="py-6 lg:py-0 lg:min-h-screen flex flex-col justify-center bg-dark-lighter/30 relative overflow-hidden"
      style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="max-w-6xl mx-auto px-4 w-full">

        {/* ── Section Header ── */}
        <Reveal width="100%" className="text-center mb-3 lg:mb-4">
          <div className="relative inline-block mb-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative px-6 py-1.5 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
              <h2 className="text-xl lg:text-2xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                About Me
              </h2>
            </div>
          </div>
          <p className="text-gray-400 text-[8px] lg:text-[9px] uppercase tracking-widest font-bold">Introduction &amp; technical level</p>
        </Reveal>

        {/* ── Main 2-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">

          {/* ═══ LEFT COLUMN: Orbit + Academic Quest ═══ */}
          <div className="lg:col-span-5 flex flex-col items-center gap-3">

            {/* Skill Orbit */}
            <Reveal width="100%" delay={0.2} className="flex justify-center w-full overflow-hidden">
              <div
                className="origin-top"
                style={{
                  transform: 'scale(0.65)',
                  width: '400px',
                  height: '340px',
                  flexShrink: 0,
                }}
              >
                <SkillOrbit />
              </div>
            </Reveal>

            {/* Academic Quest */}
            <Reveal width="100%" delay={0.3} className="w-full">
              <div className="flex items-center gap-2 justify-center mb-2">
                <GraduationCap className="text-purple-400" size={14} />
                <h3 className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.35em] text-white/30">Academic Quest</h3>
                <GraduationCap className="text-purple-400" size={14} />
              </div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mx-auto mb-3"></div>

              {/* Horizontal timeline on lg, vertical on mobile */}
              <div className="hidden lg:flex flex-col gap-2 relative">
                {/* Vertical spine */}
                <div className="absolute left-[10px] top-3 bottom-3 w-px bg-gradient-to-b from-purple-500/50 via-violet-400/30 to-transparent z-0"></div>

                {educationItems.map((edu) => {
                  const isPursuing = edu.progress !== undefined && edu.progress < 100;
                  return (
                    <div key={edu.id} className="relative flex items-start gap-3 pl-6">
                      {/* Dot */}
                      <div
                        className="absolute left-[6px] top-2.5 w-2.5 h-2.5 rounded-full z-10 flex-shrink-0"
                        style={{ backgroundColor: edu.color, boxShadow: `0 0 8px ${edu.color}80` }}
                      ></div>
                      {/* Card */}
                      <div
                        className="flex-1 p-2.5 bg-slate-900/60 backdrop-blur-xl border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                        style={{ borderColor: `${edu.color}25` }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${edu.color}55`;
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${edu.color}15`;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${edu.color}25`;
                          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                        }}
                      >
                        <div className="flex items-start justify-between gap-1 mb-0.5">
                          <div className="min-w-0">
                            <h4 className="text-[10px] font-black text-white leading-tight truncate">{edu.title}</h4>
                            <p className="text-[8px] text-gray-400 font-semibold truncate">{edu.subtitle}</p>
                          </div>
                          {isPursuing ? (
                            <span className="flex items-center gap-0.5 text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0" style={{ color: edu.color, borderColor: `${edu.color}40`, background: `${edu.color}10` }}>
                              <Clock size={7} /> Pursuing
                            </span>
                          ) : (
                            <span className="flex items-center gap-0.5 text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0 text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                              <CheckCircle2 size={7} /> Done
                            </span>
                          )}
                        </div>
                        <p className="text-[7px] text-gray-500 uppercase tracking-widest font-bold mb-1">{edu.date}</p>
                        {edu.progress !== undefined && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-0.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${edu.progress}%`, background: `linear-gradient(to right, ${edu.color}88, ${edu.color})` }}></div>
                            </div>
                            <span className="text-[7px] font-black" style={{ color: edu.color }}>{edu.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile: simple stacked cards */}
              <div className="flex lg:hidden flex-col gap-2">
                {educationItems.map((edu) => {
                  const isPursuing = edu.progress !== undefined && edu.progress < 100;
                  return (
                    <div key={edu.id} className="p-3 bg-slate-900/60 border rounded-xl" style={{ borderColor: `${edu.color}25` }}>
                      <div className="flex items-start justify-between gap-1 mb-0.5">
                        <div>
                          <h4 className="text-xs font-black text-white leading-tight">{edu.title}</h4>
                          <p className="text-[9px] text-gray-400 font-semibold">{edu.subtitle}</p>
                        </div>
                        {isPursuing ? (
                          <span className="flex items-center gap-0.5 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border whitespace-nowrap" style={{ color: edu.color, borderColor: `${edu.color}40`, background: `${edu.color}10` }}>
                            <Clock size={8} /> Pursuing
                          </span>
                        ) : (
                          <span className="flex items-center gap-0.5 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border whitespace-nowrap text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                            <CheckCircle2 size={8} /> Done
                          </span>
                        )}
                      </div>
                      <p className="text-[8px] text-gray-500 uppercase tracking-widest font-bold mb-1.5">{edu.date}</p>
                      {edu.progress !== undefined && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${edu.progress}%`, background: `linear-gradient(to right, ${edu.color}88, ${edu.color})` }}></div>
                          </div>
                          <span className="text-[8px] font-black" style={{ color: edu.color }}>{edu.progress}%</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* ═══ RIGHT COLUMN: Bio + Stats + Skills ═══ */}
          <div className="lg:col-span-7 flex flex-col gap-3">

            {/* Bio Card */}
            <Reveal width="100%" delay={0.3}>
              <div className="relative p-4 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-transparent"></div>
                <p className="text-gray-400 leading-relaxed text-[10px] lg:text-xs font-medium">
                  {ABOUT_DATA.description}
                </p>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal width="100%" delay={0.4}>
              <div className="grid grid-cols-3 gap-2 w-full">
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
                    <div key={index} className={`relative p-2 bg-slate-900/60 backdrop-blur-md border ${borderClass} rounded-xl group/stat hover:-translate-y-1 transition-all duration-300 gelly-card overflow-hidden flex flex-col items-center text-center justify-center`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover/stat:opacity-100 transition-opacity`}></div>
                      <h4 className={`text-sm lg:text-base font-black mb-0.5 relative z-10 ${textGlow}`}>{displayValue}</h4>
                      <p className="text-[7px] lg:text-[8px] font-black text-gray-500 uppercase tracking-tighter lg:tracking-widest relative z-10 leading-tight">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Skills Marquee */}
            <Reveal width="100%" delay={0.5}>
              <div className="flex flex-col items-center mb-1">
                <h3 className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.4em] text-white/30">My Skills</h3>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mt-1"></div>
              </div>
              <SkillsMarquee />
            </Reveal>

          </div>
        </div>

      </div>
    </section>
  );
};

export default React.memo(About);
