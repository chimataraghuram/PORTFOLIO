import React from 'react';
import { QUALIFICATIONS_DATA } from '../constants';
import Reveal from './Reveal';
import { GraduationCap, CheckCircle2, Clock, BookOpen } from 'lucide-react';

const AcademicQuest: React.FC = () => {
  const educationItems = QUALIFICATIONS_DATA.filter(q => q.type === 'Education');

  return (
    <section
      id="academic"
      className="py-12 md:py-0 md:min-h-screen flex flex-col justify-center bg-dark/50 relative overflow-hidden"
      style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 w-full">

        {/* ── Header ── */}
        <Reveal width="100%" className="text-center mb-8 md:mb-12">
          <div className="relative inline-block mb-3">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative px-6 md:px-10 py-2 md:py-3 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
              <h2 className="text-xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                Academic Quest
              </h2>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <GraduationCap size={14} className="text-purple-400" />
            <p className="text-gray-400 text-[9px] md:text-xs uppercase tracking-widest font-bold">Education &amp; Learning Journey</p>
            <GraduationCap size={14} className="text-purple-400" />
          </div>
        </Reveal>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Centre spine */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/60 via-violet-500/30 to-transparent -translate-x-1/2 z-0"></div>
          {/* Mobile left spine */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/60 via-violet-500/30 to-transparent z-0"></div>

          <div className="flex flex-col gap-8 md:gap-10">
            {educationItems.map((edu, index) => {
              const isEven = index % 2 === 0;
              const isPursuing = edu.progress !== undefined && edu.progress < 100;

              return (
                <Reveal key={edu.id} width="100%" delay={index * 0.1}>
                  <div className={`relative flex items-start md:items-center gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                    {/* ── Content Card ── */}
                    <div className={`
                      ml-12 md:ml-0 md:w-[46%]
                      ${isEven ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'}
                    `}>
                      <div
                        className="relative p-4 md:p-5 bg-slate-900/60 backdrop-blur-xl border rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 cursor-default"
                        style={{ borderColor: `${edu.color}25` }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${edu.color}60`;
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${edu.color}18`;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${edu.color}25`;
                          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                        }}
                      >
                        {/* Left accent bar */}
                        <div
                          className="absolute top-0 left-0 w-0.5 h-full rounded-full"
                          style={{ background: `linear-gradient(to bottom, ${edu.color}, transparent)` }}
                        ></div>

                        {/* Top row: title + badge */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="min-w-0">
                            <h3 className="text-sm md:text-base font-black text-white leading-snug">{edu.title}</h3>
                            <p className="text-[10px] md:text-xs text-gray-400 font-semibold mt-0.5 flex items-center gap-1">
                              <BookOpen size={10} style={{ color: edu.color }} />
                              {edu.subtitle}
                            </p>
                          </div>
                          {isPursuing ? (
                            <span
                              className="flex items-center gap-1 text-[8px] md:text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full border whitespace-nowrap flex-shrink-0"
                              style={{ color: edu.color, borderColor: `${edu.color}40`, background: `${edu.color}12` }}
                            >
                              <Clock size={9} /> Pursuing
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[8px] md:text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full border whitespace-nowrap flex-shrink-0 text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                              <CheckCircle2 size={9} /> Completed
                            </span>
                          )}
                        </div>

                        {/* Date */}
                        <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">{edu.date}</p>

                        {/* Description */}
                        {edu.description && (
                          <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed mb-3">{edu.description}</p>
                        )}

                        {/* Progress bar */}
                        {edu.progress !== undefined && (
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wider">Completion</span>
                              <span className="text-[8px] font-black" style={{ color: edu.color }}>{edu.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-1000"
                                style={{
                                  width: `${edu.progress}%`,
                                  background: `linear-gradient(to right, ${edu.color}88, ${edu.color})`,
                                  boxShadow: `0 0 8px ${edu.color}60`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ── Timeline Dot ── */}
                    {/* Desktop center dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-slate-900 shadow-xl"
                        style={{ backgroundColor: edu.color, boxShadow: `0 0 14px ${edu.color}90` }}
                      ></div>
                    </div>

                    {/* Mobile left dot */}
                    <div
                      className="md:hidden absolute left-[14px] top-4 w-3 h-3 rounded-full border-2 border-slate-900 z-10 flex-shrink-0"
                      style={{ backgroundColor: edu.color, boxShadow: `0 0 10px ${edu.color}80` }}
                    ></div>

                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default React.memo(AcademicQuest);
