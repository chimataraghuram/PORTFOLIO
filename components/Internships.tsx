import React, { useState } from 'react';
import { Briefcase, Calendar, Eye, X, Linkedin, Cpu, Globe, Award, ShieldCheck, Terminal, Target } from 'lucide-react';
import { QUALIFICATIONS_DATA } from '../constants';
import Reveal from './Reveal';

const Internships: React.FC = () => {
  // Filter only Experience data
  const data = QUALIFICATIONS_DATA.filter(q => q.type === 'Experience');
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  return (
    <section id="internships" className="py-20 pb-24 md:pb-20 bg-dark" style={{ paddingBottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Animated Section Header */}
        <Reveal width="100%" className="text-center mb-20">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative px-10 py-4 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                Internships
              </h2>
            </div>
          </div>
          <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-black mt-2">Professional Experience & Industrial Training</p>
        </Reveal>

        <div className="relative max-w-4xl mx-auto py-10">
          {/* Central Power Cable (Spine) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1.5 md:-translate-x-1/2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 via-pink-500 to-transparent h-full animate-[power-flow_8s_linear_infinite]"></div>
          </div>

          <div className="space-y-24 relative z-10">
            {data.map((item, index) => {
              const isEven = index % 2 === 0;
              const isGoogle = item.title.includes('Google');
              const isData = item.title.includes('Data');

              return (
                <div key={item.id} className="relative flex items-center justify-center w-full">
                  {/* Power Node (Anchor on the line) */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-30 group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-dark transition-all duration-500 relative shadow-2xl ${isGoogle ? 'bg-green-500 shadow-green-500/40' : isData ? 'bg-blue-500 shadow-blue-500/40' : 'bg-pink-500 shadow-pink-500/40'}`}>
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>

                      {/* Connection Wire */}
                      <div className={`hidden md:block absolute top-1/2 w-12 h-[2px] bg-gradient-to-r transition-all duration-500 ${isEven ? 'left-full from-current to-transparent rotate-0 origin-left' : 'right-full from-transparent to-current rotate-0 origin-right'} ${isGoogle ? 'text-green-500' : isData ? 'text-blue-500' : 'text-pink-500'}`}></div>
                    </div>
                  </div>

                  {/* Info Card - Vertical Branching */}
                  <div className={`w-full flex ${isEven ? 'md:justify-end' : 'md:justify-start'} pl-20 md:pl-0`}>
                    <Reveal width="100%" delay={index * 0.1}>
                      <div className={`w-full md:w-[85%] bg-slate-950/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-2xl ${isEven ? 'md:ml-[15%]' : 'md:mr-[15%]'}`}>

                        {/* Status Light */}
                        <div className="absolute top-8 right-8 flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-full border border-white/5 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isGoogle ? 'bg-green-500' : isData ? 'bg-blue-500' : 'bg-pink-500'}`}></span>
                          Live_Sync
                        </div>

                        <div className="flex items-start gap-4 mb-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isGoogle ? 'bg-green-500/10 border-green-500/20 text-green-400' : isData ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-pink-500/10 border-pink-500/20 text-pink-400'}`}>
                            {isGoogle ? <Globe size={28} /> : isData ? <Cpu size={28} /> : <Briefcase size={28} />}
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                              {item.title}
                            </h3>
                            <p className={`text-xs font-bold uppercase tracking-widest ${isGoogle ? 'text-green-500' : isData ? 'text-blue-500' : 'text-pink-500'}`}>
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-[10px] font-black text-gray-500 mb-6 bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                          <Calendar size={12} className="text-pink-500" />
                          {item.date}
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed mb-8 border-l-2 border-white/10 pl-4 group-hover:border-cyan-500 transition-all">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                          {(item.certificateUrl || item.certificate) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item.certificateUrl) window.open(item.certificateUrl, '_blank');
                                else setSelectedCertificate(item.certificate!);
                              }}
                              className="relative px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-gray-400 hover:text-white hover:bg-white/20 transition-all flex items-center gap-2 uppercase tracking-widest"
                            >
                              <Eye size={16} /> Data Hash
                            </button>
                          )}
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all border border-white/5 cursor-pointer">
                            <Linkedin size={20} />
                          </div>
                        </div>

                        {/* Animated Grid Scan */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-pink-500/0 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sync Status - Vertical Tower Footer */}
        <Reveal width="100%" delay={0.4} className="mt-20">
          <div className="max-w-xl mx-auto bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col items-center gap-4 text-center">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-3 h-1.5 rounded-full bg-cyan-500/20 ${i < 4 ? 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-pulse' : ''}`}></div>
              ))}
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">Experience Synchronized</p>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-pink-500 to-cyan-500 animate-[power-flow_4s_linear_infinite] bg-[length:50%_100%]"></div>
            </div>
          </div>
        </Reveal>
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
              <img src={selectedCertificate} alt="Certificate" className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />
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
          100% { transform: translateY(500px); opacity: 0; }
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Internships;