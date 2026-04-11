import React, { useState } from 'react';
import { Briefcase, Calendar, Eye, X, Linkedin, Cpu, Globe, Award, ShieldCheck, Terminal, Target } from 'lucide-react';
import { QUALIFICATIONS_DATA } from '../constants';
import Reveal from './Reveal';

const Internships: React.FC = () => {
  // Filter only Experience data
  const data = QUALIFICATIONS_DATA.filter(q => q.type === 'Experience');
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  return (
    <section id="internships" className="py-20 pb-32 md:pb-20 bg-dark" style={{ paddingBottom: 'calc(8rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Animated Section Header */}
        <Reveal width="100%" className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative px-6 md:px-10 py-3 md:py-4 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                Internships
              </h2>
            </div>
          </div>
          <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-black mt-2">Professional Experience</p>
        </Reveal>

        <div className="relative max-w-5xl mx-auto py-10 scale-[0.9] sm:scale-100">
          {/* Main Vertical Spine - Centered */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-1 sm:-translate-x-1/2 bg-slate-800 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 via-pink-500 to-transparent h-full animate-[power-flow_8s_linear_infinite] shadow-[0_0_15px_rgba(34,211,238,0.3)]"></div>
          </div>

          <div className="space-y-16 sm:space-y-24 relative z-10">
            {data.map((item, index) => {
              const isEven = index % 2 === 0;
              const themeColor = item.color || '#ec4899';

              return (
                <div key={item.id} className="relative flex items-center justify-center w-full min-h-[160px]">
                  {/* Center Node (Always on the line) */}
                  <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 z-30 group cursor-pointer">
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-4 border-dark transition-all duration-500 relative shadow-2xl"
                      style={{ 
                        backgroundColor: themeColor,
                        boxShadow: `0 0 20px ${themeColor}66`
                      }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>

                      {/* Level Badge (Mini) */}
                      <div className="absolute -top-2 -right-2 bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded text-[10px] font-black text-white whitespace-nowrap">
                        ID:0{index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Glass Card with Safe Zone Spacing - Clears spine with pl-16 */}
                  <div className={`w-full flex ${isEven ? 'sm:justify-end' : 'sm:justify-start'} pl-16 pr-6 sm:pl-0 sm:pr-0 mb-4 sm:mb-0`}>
                    <Reveal width="100%" delay={index * 0.1}>
                      <div 
                        className={`w-full sm:w-[44%] mx-auto sm:mx-0 max-w-md sm:max-w-none bg-slate-950/60 backdrop-blur-2xl border border-white/5 p-4 sm:p-8 rounded-[2rem] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 hover:-translate-y-2 shadow-2xl ${isEven ? 'sm:ml-[56%]' : 'sm:mr-[56%]'}`}
                        style={{ borderLeftColor: themeColor, borderLeftWidth: '4px' }}
                      >

                        {/* Status Light */}
                        <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-full border border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                          <span 
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }}
                          ></span>
                          SYNC_ACTIVE
                        </div>

                        <div className="flex items-start gap-4 mb-5 relative z-10">
                          <div 
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                            style={{ 
                              backgroundColor: `${themeColor}1A`, 
                              borderColor: `${themeColor}33`,
                              color: themeColor 
                            }}
                          >
                            {item.title.toLowerCase().includes('cloud') ? <Globe size={24} /> : item.title.toLowerCase().includes('ai') ? <Cpu size={24} /> : <Briefcase size={24} />}
                          </div>
                          <div className="flex-grow pt-1">
                            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight leading-none mb-2">
                              {item.title}
                            </h3>
                            <p 
                              className="text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                              style={{ color: themeColor }}
                            >
                              <span className="w-3 h-[1px] bg-current opacity-30"></span>
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-black text-gray-500 mb-6 bg-white/5 w-fit px-3 py-1 rounded-lg border border-white/5 relative z-10">
                          <Calendar size={12} style={{ color: themeColor }} />
                          {item.date}
                        </div>

                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 border-l-2 border-white/5 pl-4 group-hover:border-cyan-500/40 transition-all relative z-10">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
                          {(item.certificateUrl || item.certificate) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item.certificateUrl) window.open(item.certificateUrl, '_blank');
                                else setSelectedCertificate(item.certificate!);
                              }}
                              className="group/btn relative px-5 py-2.5 rounded-xl bg-slate-900 border transition-all duration-300 overflow-hidden hover:scale-105 flex items-center gap-2 text-xs font-black uppercase tracking-widest"
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
                              <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-white transition-colors">
                                <Eye size={16} /> View Certificate
                              </span>
                            </button>
                          )}
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all border border-white/5 cursor-pointer">
                            <Linkedin size={18} />
                          </div>
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
            className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 border border-white/10 rounded-3xl p-2 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-6 right-6 bg-red-500/20 text-red-400 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg z-20 hover:scale-110 border border-red-500/30"
            >
              <X size={20} />
            </button>
            <div className="w-full h-full overflow-auto rounded-2xl bg-black/20 flex items-center justify-center p-4">
              <img loading="lazy" src={selectedCertificate} alt="Certificate" className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      )}

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
    </section>
  );
};

export default React.memo(Internships);
