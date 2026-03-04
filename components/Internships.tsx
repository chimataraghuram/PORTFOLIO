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
            <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white flex items-center gap-4">
              <span className="text-cyan-500"><Terminal size={40} /></span>
              Mission Logs
              <span className="text-pink-500"><ShieldCheck size={40} /></span>
            </h2>
          </div>
          <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-black mt-2">Professional Experience & Industrial Training</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Central 'Data Bus' Line (Visual only for desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/20 via-pink-500/20 to-transparent -translate-x-1/2"></div>

          {data.map((item, index) => {
            const isGoogle = item.title.includes('Google');
            const isData = item.title.includes('Data');

            return (
              <div key={item.id}>
                <Reveal width="100%" delay={index * 0.2}>
                  <div className="group relative h-full">
                    {/* Holographic Border/GLOW */}
                    <div className={`absolute -inset-[1px] bg-gradient-to-r ${isGoogle ? 'from-green-500 via-yellow-500 to-red-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : isData ? 'from-blue-500 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'from-pink-500 to-purple-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]'} rounded-3xl opacity-20 group-hover:opacity-100 transition-all duration-700`}></div>

                    {/* Main Card Container */}
                    <div className="relative bg-[#0a0f1a] rounded-3xl p-8 overflow-hidden h-full flex flex-col border border-white/5 backdrop-blur-3xl gelly-card">
                      {/* Corner Tech Decor */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                      {/* Mission Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isGoogle ? 'bg-green-500/10 border-green-500/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : isData ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-pink-500/10 border-pink-500/30 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.2)]'}`}>
                          {isGoogle ? <Globe size={28} /> : isData ? <Cpu size={28} /> : <Award size={28} />}
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Entry Id</div>
                          <div className="text-[12px] font-mono text-cyan-500/70">#MN_0{index + 1}</div>
                        </div>
                      </div>

                      {/* Mission Details */}
                      <div className="flex-grow">
                        <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-4">
                          <Target size={14} className="text-pink-500" />
                          <span className="text-xs font-bold text-gray-400 uppercase">{item.subtitle}</span>
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                          <Calendar size={12} className="text-gray-500" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.date}</span>
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed mb-8 border-l-2 border-white/5 pl-4 group-hover:border-cyan-500/50 group-hover:text-gray-200 transition-all">
                          {item.description}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
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
                            className="group/btn relative px-6 py-2 rounded-xl border border-white/10 overflow-hidden transition-all hover:border-cyan-500/50"
                          >
                            <div className="absolute inset-0 bg-cyan-500 opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
                            <span className="relative z-10 flex items-center gap-2 text-xs font-black text-white group-hover/btn:text-cyan-400">
                              <Eye size={16} /> VIEW DATA REPORT
                            </span>
                          </button>
                        )}

                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 cursor-pointer transition-all">
                            <Linkedin size={16} />
                          </div>
                        </div>
                      </div>

                      {/* Animated Grid Background for Card */}
                      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none"></div>

                      {/* Scanning Line */}
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/20 translate-y-[-100%] group-hover:animate-[scan_3s_linear_infinite] pointer-events-none"></div>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* Global Mission Progress Bar */}
        <div className="mt-20 max-w-2xl mx-auto">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global Experience Sync</span>
            <span className="text-[10px] font-mono text-cyan-400">STATUS: SYNCHRONIZED [100%]</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-cyan-500 via-pink-500 to-cyan-500 w-full animate-[shimmer_2s_infinite] bg-[length:50%_100%]"></div>
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