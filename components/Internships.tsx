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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
          {data.map((item, index) => {
            const isGoogle = item.title.includes('Google');
            const isData = item.title.includes('Data');

            return (
              <div key={item.id}>
                <Reveal width="100%" delay={index * 0.1}>
                  <div className="group relative">
                    {/* Shadow Glow */}
                    <div className={`absolute -inset-2 rounded-[2.5rem] bg-gradient-to-br ${isGoogle ? 'from-green-500/20 to-yellow-500/20' : isData ? 'from-blue-500/20 to-cyan-500/20' : 'from-pink-500/20 to-purple-500/20'} opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700`}></div>

                    {/* Main Card: Glass Module Design */}
                    <div className="relative bg-slate-950/40 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col h-full">

                      {/* Interactive Accent Corner */}
                      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-opacity duration-700 opacity-20 group-hover:opacity-60 ${isGoogle ? 'bg-green-500' : isData ? 'bg-blue-500' : 'bg-pink-500'}`}></div>

                      {/* Card Content */}
                      <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${isGoogle ? 'bg-green-500/10 border-green-500/20 text-green-400' : isData ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-pink-500/10 border-pink-500/20 text-pink-400'}`}>
                            {isGoogle ? <Globe size={24} /> : isData ? <Cpu size={24} /> : <Briefcase size={24} />}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">Verified_Log_0{index + 1}</span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className={`text-xs font-black uppercase tracking-widest mb-4 inline-flex items-center gap-2 ${isGoogle ? 'text-green-500' : isData ? 'text-blue-500' : 'text-pink-500'}`}>
                          <span className="h-[2px] w-4 bg-current opacity-30"></span>
                          {item.subtitle}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-6 bg-black/20 w-fit px-3 py-1.5 rounded-full border border-white/5">
                          <Calendar size={14} className="text-gray-500" />
                          <span className="font-bold tracking-tight">{item.date}</span>
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                          {item.description}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-auto relative z-10 flex items-center justify-between pt-6 border-t border-white/5">
                        {(item.certificateUrl || item.certificate) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.certificateUrl) {
                                window.open(item.certificateUrl, '_blank');
                              } else {
                                setSelectedCertificate(item.certificate!);
                              }
                            }}
                            className={`px-6 py-2.5 rounded-xl border transition-all duration-300 transform flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isGoogle ? 'border-green-500/30 text-green-400 hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]' : isData ? 'border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'border-pink-500/30 text-pink-400 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]'}`}
                          >
                            <Eye size={16} /> Data Report
                          </button>
                        )}

                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all border border-white/5">
                            <Linkedin size={18} />
                          </div>
                        </div>
                      </div>

                      {/* Glass Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none"></div>
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 group-hover:animate-[sweep_2s_linear_infinite]"></div>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* Global Level Sync Card */}
        <Reveal width="100%" delay={0.4} className="mt-20">
          <div className="bg-slate-900/30 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-cyan-500/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-tighter text-lg leading-none">Experience Protocol</h4>
                <span className="text-[10px] font-mono text-gray-500">SYSTEM_RELIABILITY: OPTIMAL</span>
              </div>
            </div>

            <div className="flex-grow max-w-md w-full">
              <div className="flex justify-between text-[10px] text-gray-500 mb-2 font-black uppercase tracking-widest">
                <span>Synchronizing Experience</span>
                <span className="text-cyan-400 font-mono">100% COMPLETE</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[2px]">
                <div className="h-full bg-gradient-to-r from-cyan-500 via-pink-500 to-cyan-500 w-full rounded-full bg-[length:200%_auto] animate-[gradient-move_3s_linear_infinite]"></div>
              </div>
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
            {/* Modal Corner Lines */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-500 m-4 rounded-tl-xl opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-pink-500 m-4 rounded-br-xl opacity-50"></div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-6 right-6 bg-red-500/20 text-red-400 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg z-20 hover:scale-110 border border-red-500/30"
            >
              <X size={20} />
            </button>

            {/* Image Container */}
            <div className="w-full h-full overflow-auto rounded-2xl bg-black/20 flex items-center justify-center p-4">
              <img
                src={selectedCertificate}
                alt="Certificate"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes sweep {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(500px); opacity: 0; }
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
};

export default Internships;