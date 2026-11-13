import React, { useState } from 'react';
import { Briefcase, Calendar, Eye, X, Linkedin, Cpu, Globe, Award, ShieldCheck, Terminal, Target, MapPin, Tag } from 'lucide-react';
import { QUALIFICATIONS_DATA } from '../constants';
import Reveal from './Reveal';
import SectionPlanet from './SectionPlanet';

const Internships: React.FC = () => {
  // Filter only Experience data
  const data = QUALIFICATIONS_DATA.filter(q => q.type === 'Experience');
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  return (
    <section id="internships" className="py-20 pb-32 md:pb-20 bg-transparent relative overflow-hidden" style={{ paddingBottom: 'calc(8rem + env(safe-area-inset-bottom, 0px))' }}>
      {/* Section Planet - Venus beside Internships section */}
      <SectionPlanet
        texture="/planets/venus.jpg"
        side="right"
        glow="rgba(251, 146, 60, 0.5)"
        shade="rgba(120, 53, 15, 0.6)"
        rotateDirection={-1}
        rotateDuration={48}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Animated Section Header */}
        <Reveal width="100%" className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative px-6 md:px-10 py-3 md:py-4 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                Internships & Work
              </h2>
            </div>
          </div>
          <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-black mt-2">Professional Experience</p>
        </Reveal>

        <div className="relative max-w-5xl mx-auto py-6 sm:py-10">
          {/* Main Vertical Spine */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-1 sm:-translate-x-1/2 bg-slate-800 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 via-pink-500 to-transparent h-full animate-[power-flow_8s_linear_infinite] shadow-[0_0_15px_rgba(34,211,238,0.3)]"></div>
          </div>

          <div className="space-y-10 sm:space-y-24 relative z-10">
            {data.map((item, index) => {
              const isEven = index % 2 === 0;
              const themeColor = item.color || '#ec4899';

              return (
                <div key={item.id} className="relative flex items-center justify-center w-full min-h-[160px]">
                  {/* Center Node (Always on the line) */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-30 group cursor-pointer">
                    <div 
                      className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 sm:border-4 border-dark transition-all duration-500 relative shadow-2xl"
                      style={{ 
                        backgroundColor: themeColor,
                        boxShadow: `0 0 20px ${themeColor}66`
                      }}
                    >
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-ping"></div>

                      {/* Level Badge (Mini) */}
                      <div className="absolute -top-2 -right-2 bg-slate-900 border border-white/10 px-1 py-0.5 rounded text-[8px] sm:text-[10px] font-black text-white whitespace-nowrap shadow-md">
                        ID:0{index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Glass Card with Safe Zone Spacing - Clears spine with pl-14 on mobile */}
                  <div className={`w-full flex ${isEven ? 'sm:justify-end' : 'sm:justify-start'} pl-14 pr-2 sm:pl-0 sm:pr-0 mb-2 sm:mb-0`}>
                    <Reveal width="100%" delay={index * 0.1}>
                      <div 
                        className={`w-full sm:w-[44%] mx-auto sm:mx-0 max-w-md sm:max-w-none bg-slate-950/60 backdrop-blur-2xl border border-white/5 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 hover:-translate-y-2 shadow-2xl ${isEven ? 'sm:ml-[56%]' : 'sm:mr-[56%]'}`}
                        style={{ borderLeftColor: themeColor, borderLeftWidth: '4px' }}
                      >

                        {/* Top-Right Badges: Stacked neatly without overlapping title */}
                        <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex flex-col items-end gap-1 sm:gap-1.5 z-20">
                          {item.badge && (
                            <span 
                              className="px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-white shadow-md leading-none"
                              style={{ 
                                backgroundColor: item.badge === 'Stipend' ? '#8b5cf6' : item.badge === 'Infosys' ? '#0284c7' : '#ea580c',
                                boxShadow: `0 0 10px ${item.badge === 'Stipend' ? 'rgba(139,92,246,0.4)' : item.badge === 'Infosys' ? 'rgba(2,132,199,0.4)' : 'rgba(234,88,12,0.4)'}`
                              }}
                            >
                              {item.badge}
                            </span>
                          )}

                          {item.statusBadge && (
                            <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 bg-black/70 rounded-full border border-white/10 shadow-sm">
                              <span 
                                className={`w-1.5 h-1.5 rounded-full ${item.statusBadge === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}
                                style={{ boxShadow: item.statusBadge === 'Active' ? '0 0 8px #34d399' : 'none' }}
                              />
                              <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider leading-none ${item.statusBadge === 'Active' ? 'text-emerald-400' : 'text-slate-300'}`}>
                                {item.statusBadge === 'Completed' ? '✓ Completed' : '• Active'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Icon + Title Header: Reserved right padding prevents any overlap */}
                        <div className="flex items-start gap-3 sm:gap-4 mb-3.5 sm:mb-4 relative z-10 pr-28 sm:pr-32">
                          <div 
                            className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center border shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-md"
                            style={{ 
                              backgroundColor: `${themeColor}1A`, 
                              borderColor: `${themeColor}33`,
                              color: themeColor 
                            }}
                          >
                            {item.title.toLowerCase().includes('cloud') ? <Globe size={20} className="sm:w-6 sm:h-6" /> : item.title.toLowerCase().includes('ai') ? <Cpu size={20} className="sm:w-6 sm:h-6" /> : <Briefcase size={20} className="sm:w-6 sm:h-6" />}
                          </div>
                          <div className="flex-grow pt-0.5 min-w-0">
                            <h3 className="text-sm sm:text-xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight leading-snug mb-1">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                              <span className="w-2.5 sm:w-3 h-1 rounded-full shrink-0" style={{ backgroundColor: themeColor }} />
                              <span
                                className="text-[11px] sm:text-sm font-extrabold tracking-wider uppercase break-words leading-tight"
                                style={{ color: themeColor, textShadow: `0 0 10px ${themeColor}80` }}
                              >
                                {item.subtitle}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Date & Location Pill Row */}
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 relative z-10 flex-wrap">
                          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-black text-gray-400 bg-white/5 w-fit px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-white/5">
                            <Calendar size={11} className="sm:w-3 sm:h-3" style={{ color: themeColor }} />
                            {item.date}
                          </div>

                          {item.locationType && (
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 sm:py-1 rounded-lg border border-rose-500/20 italic">
                              <span>📍</span> {item.locationType}
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-[11px] sm:text-sm text-gray-300 sm:text-gray-400 leading-relaxed mb-4 sm:mb-5 border-l-2 border-white/5 pl-3 sm:pl-3.5 group-hover:border-cyan-500/40 transition-all relative z-10 whitespace-pre-line">
                          {item.description}
                        </p>

                        {/* Tech Tag Pills */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4 sm:mb-5 relative z-10">
                            {item.tags.map(tag => (
                              <span 
                                key={tag} 
                                className="text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/10 flex items-center gap-1 group-hover:border-white/20 transition-colors"
                              >
                                <span className="text-[9px] sm:text-[10px]">🏷️</span> {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Card Actions Footer */}
                        <div className="flex items-center justify-between pt-3.5 sm:pt-5 border-t border-white/5 relative z-10 gap-2">
                          {(item.certificateUrl || item.certificate) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item.certificateUrl) window.open(item.certificateUrl, '_blank');
                                else setSelectedCertificate(item.certificate!);
                              }}
                              className="group/btn relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-slate-900 border transition-all duration-300 overflow-hidden hover:scale-105 flex items-center justify-center text-[9px] sm:text-xs font-black uppercase tracking-wider flex-1 sm:flex-initial"
                              style={{ 
                                borderColor: themeColor, 
                                color: themeColor,
                                boxShadow: `0 0 15px ${themeColor}66`
                              }}
                            >
                              <div 
                                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                                style={{ backgroundColor: themeColor }}
                              ></div>
                              <span className="relative z-10 flex items-center justify-center group-hover/btn:text-white transition-colors text-center">
                                {item.buttonText || 'View Certificate'}
                              </span>
                            </button>
                          )}
                          <a 
                            href={item.linkedinUrl || `https://www.linkedin.com/in/chimataraghuram/`} 
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all border border-white/5 hover:border-blue-500/30 shrink-0 ml-auto"
                            title="View on LinkedIn"
                          >
                            <Linkedin size={15} className="sm:w-[18px] sm:h-[18px]" />
                          </a>
                        </div>

                        {/* Scanner & Grid Effects */}
                        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] group-hover:opacity-[0.1] transition-opacity pointer-events-none"></div>
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 group-hover:animate-[sweep_3s_linear_infinite] opacity-0 group-hover:opacity-100"></div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
            <img 
              src={selectedCertificate} 
              alt="Certificate Preview" 
              className="w-full h-auto rounded-xl object-contain max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default React.memo(Internships);
