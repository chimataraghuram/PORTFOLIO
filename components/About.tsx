import React, { useState } from 'react';
import { ABOUT_DATA, SKILLS_DATA, QUALIFICATIONS_DATA } from '../constants';
import Reveal from './Reveal';
import SkillOrbit from './SkillOrbit';
import {
  Code, Database, Cloud, Terminal, Cpu as BrainIcon, Settings,
  GraduationCap, Calendar, CheckCircle2, Clock, BookOpen, School
} from 'lucide-react';

/* ─── Skill Marquee helpers ─── */
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
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee-rtl gap-3 items-center" style={{ willChange: 'transform' }}>
        {allSkills.map((skill, i) => {
          const color = getColor(skill.category, skill.name);
          return (
            <div
              key={`${skill.name}-${i}`}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 border border-white/10 rounded-full whitespace-nowrap transition-all duration-300 group cursor-default"
              style={{ borderColor: `${color}20` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}80`; e.currentTarget.style.boxShadow = `0 0 14px ${color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}20`; e.currentTarget.style.boxShadow = ''; }}
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

/* ─── Academic Quest sub-section (Internship style) ─── */
const AcademicQuestSubSection: React.FC = () => {
  const educationItems = QUALIFICATIONS_DATA.filter(q => q.type === 'Education');

  return (
    <div className="mt-16 md:mt-20">
      {/* Sub-header */}
      <Reveal width="100%" className="text-center mb-10">
        <div className="relative inline-block mb-3">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-xl blur opacity-30 animate-pulse" />
          <div className="relative px-6 md:px-10 py-2 md:py-3 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
            <h3 className="text-2xl md:text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
              Academic Quest
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <GraduationCap size={13} className="text-purple-400" />
          <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-black">Education &amp; Learning Journey</p>
          <GraduationCap size={13} className="text-purple-400" />
        </div>
      </Reveal>

      {/* Timeline — identical structure to Internships */}
      <div className="relative max-w-5xl mx-auto py-10 scale-[0.9] sm:scale-100">
        {/* Power-flow spine */}
        <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-1 sm:-translate-x-1/2 bg-slate-800 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-violet-500 to-transparent h-full animate-[power-flow_8s_linear_infinite] shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
        </div>

        <div className="space-y-16 sm:space-y-24 relative z-10">
          {educationItems.map((edu, index) => {
            const isEven = index % 2 === 0;
            const themeColor = edu.color || '#8b5cf6';
            const isPursuing = edu.progress !== undefined && edu.progress < 100;

            return (
              <div key={edu.id} className="relative flex items-center justify-center w-full min-h-[160px]">

                {/* Center Node */}
                <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 z-30 group cursor-pointer">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-4 border-dark transition-all duration-500 relative shadow-2xl"
                    style={{ backgroundColor: themeColor, boxShadow: `0 0 20px ${themeColor}66` }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                    <div className="absolute -top-2 -right-2 bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded text-[10px] font-black text-white whitespace-nowrap">
                      Y{index + 1}
                    </div>
                  </div>
                </div>

                {/* Glass Card */}
                <div className={`w-full flex ${isEven ? 'sm:justify-end' : 'sm:justify-start'} pl-16 pr-6 sm:pl-0 sm:pr-0 mb-4 sm:mb-0`}>
                  <Reveal width="100%" delay={index * 0.1}>
                    <div
                      className={`w-full sm:w-[44%] mx-auto sm:mx-0 max-w-md sm:max-w-none bg-slate-950/60 backdrop-blur-2xl border border-white/5 p-4 sm:p-8 rounded-[2rem] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 hover:-translate-y-2 shadow-2xl ${isEven ? 'sm:ml-[56%]' : 'sm:mr-[56%]'}`}
                      style={{ borderLeftColor: themeColor, borderLeftWidth: '4px' }}
                    >
                      {/* Status badge */}
                      <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-full border border-white/5 text-[10px] font-black uppercase tracking-widest"
                        style={{ color: isPursuing ? themeColor : '#10b981' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: isPursuing ? themeColor : '#10b981', boxShadow: `0 0 10px ${isPursuing ? themeColor : '#10b981'}` }}
                        />
                        {isPursuing ? 'PURSUING' : 'COMPLETED'}
                      </div>

                      {/* Icon + Title */}
                      <div className="flex items-start gap-4 mb-5 relative z-10">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                          style={{ backgroundColor: `${themeColor}1A`, borderColor: `${themeColor}33`, color: themeColor }}
                        >
                          {edu.progress === 100 && edu.progress !== undefined
                            ? <BookOpen size={24} />
                            : edu.title.toLowerCase().includes('ssc') || edu.title.toLowerCase().includes('school')
                              ? <School size={24} />
                              : <GraduationCap size={24} />}
                        </div>
                        <div className="flex-grow pt-1">
                          <h4 className="text-lg sm:text-xl font-black text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight leading-none mb-2">
                            {edu.title}
                          </h4>
                          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: themeColor }}>
                            <span className="w-3 h-[1px] bg-current opacity-30" />
                            {edu.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-xs font-black text-gray-500 mb-6 bg-white/5 w-fit px-3 py-1 rounded-lg border border-white/5 relative z-10">
                        <Calendar size={12} style={{ color: themeColor }} />
                        {edu.date}
                      </div>

                      {/* Description */}
                      {edu.description && (
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 border-l-2 border-white/5 pl-4 group-hover:border-purple-500/40 transition-all relative z-10">
                          {edu.description}
                        </p>
                      )}

                      {/* Progress bar */}
                      {edu.progress !== undefined && (
                        <div className="relative z-10 pt-4 border-t border-white/5">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                              {isPursuing ? <Clock size={10} style={{ color: themeColor }} /> : <CheckCircle2 size={10} className="text-emerald-400" />}
                              Completion
                            </span>
                            <span className="text-[10px] font-black" style={{ color: themeColor }}>{edu.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${edu.progress}%`, background: `linear-gradient(to right, ${themeColor}88, ${themeColor})`, boxShadow: `0 0 8px ${themeColor}60` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Scanner & Grid Effects */}
                      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] group-hover:opacity-[0.1] transition-opacity pointer-events-none" />
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 group-hover:animate-[sweep_3s_linear_infinite] opacity-0 group-hover:opacity-100" />
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes power-flow {
          0% { background-position: 0 0; }
          100% { background-position: 0 1000px; }
        }
        @keyframes sweep {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(600px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

/* ─── Main About Section ─── */
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
      className="py-12 md:py-20 bg-dark-lighter/30 relative overflow-hidden"
      style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="max-w-6xl mx-auto px-4 w-full">

        {/* ── Section Header ── */}
        <Reveal width="100%" className="text-center mb-8 md:mb-12">
          <div className="relative inline-block mb-3">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse" />
            <div className="relative px-6 md:px-10 py-2 md:py-3 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
              <h2 className="text-xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                About Me
              </h2>
            </div>
          </div>
          <p className="text-gray-400 text-[8px] md:text-xs uppercase tracking-widest font-bold">Introduction &amp; technical level</p>
        </Reveal>

        {/* ── Bio + Orbit ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center mb-6 md:mb-10">
          {/* Left: Orbit */}
          <Reveal width="100%" delay={0.3} className="lg:col-span-5 flex justify-center relative group min-h-[260px] lg:min-h-[300px] order-2 lg:order-1 mt-4 lg:mt-28">
            <div className="scale-75 sm:scale-90 lg:scale-100 origin-center">
              <SkillOrbit />
            </div>
          </Reveal>

          {/* Right: Bio + Stats */}
          <Reveal width="100%" delay={0.4} className="lg:col-span-7 flex flex-col gap-4 md:gap-6 order-1 lg:order-2">
            <div className="relative p-5 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-transparent" />
              <p className="text-gray-400 leading-relaxed text-xs md:text-sm font-medium">
                {ABOUT_DATA.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
              {ABOUT_DATA.stats.map((stat, index) => {
                let colorClass = "from-cyan-500/10 to-transparent";
                let borderClass = "border-cyan-500/20";
                let textGlow = "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]";
                if (index === 0) { colorClass = "from-yellow-400/10 to-transparent"; borderClass = "border-yellow-500/20"; textGlow = "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"; }
                else if (index === 2) { colorClass = "from-pink-500/10 to-transparent"; borderClass = "border-pink-500/20"; textGlow = "text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]"; }
                const displayValue = (stat as any).key === 'github' ? githubStats : stat.value;
                return (
                  <div key={index} className={`relative p-2 md:p-3 bg-slate-900/60 backdrop-blur-md border ${borderClass} rounded-xl group/stat hover:-translate-y-1 transition-all duration-300 gelly-card overflow-hidden flex flex-col items-center text-center justify-center`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover/stat:opacity-100 transition-opacity`} />
                    <h4 className={`text-sm md:text-base font-black mb-0.5 relative z-10 ${textGlow}`}>{displayValue}</h4>
                    <p className="text-[7px] md:text-[9px] font-black text-gray-500 uppercase tracking-tighter sm:tracking-widest relative z-10 leading-tight">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* ── Skills Marquee ── */}
        <Reveal width="100%" delay={0.1}>
          <div className="flex flex-col items-center mb-1 md:mb-2">
            <h3 className="text-sm md:text-base font-black uppercase tracking-[0.4em] text-white/30">My Skills</h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mt-1" />
          </div>
          <SkillsMarquee />
        </Reveal>

        {/* ── Academic Quest Sub-Section ── */}
        <AcademicQuestSubSection />

      </div>
    </section>
  );
};

export default React.memo(About);
