import React, { useState } from 'react';
import { Briefcase, Calendar, Eye, X, Linkedin } from 'lucide-react';
import { QUALIFICATIONS_DATA } from '../constants';
import Reveal from './Reveal';

const Internships: React.FC = () => {
  // Filter only Experience data
  const data = QUALIFICATIONS_DATA.filter(q => q.type === 'Experience');
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  return (
    <section id="internships" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Reveal width="100%" className="text-center mb-16">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative px-10 py-4 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                Internships
              </h2>
            </div>
          </div>
          <p className="text-gray-400 text-sm">My professional experience</p>
        </Reveal>

        {/* Timeline */}
        <Reveal width="100%" delay={0.2} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] bg-gray-700/50 -translate-x-1/2"></div>

          <div className="space-y-12">
            {data.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id} className="w-full">
                  <Reveal width="100%">
                    <div className={`flex flex-col md:flex-row items-center justify-between relative ${isEven ? '' : 'md:flex-row-reverse'}`}>

                      {/* Timeline Dot - Colorful */}
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 rounded-full border-4 border-dark z-10 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>

                      {/* Content Card with Glow Effect */}
                      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                        <div className="bg-dark-lighter p-6 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] group relative overflow-hidden flex flex-col h-full gelly-card">

                          {/* Subtle internal gradient */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-xl -mr-10 -mt-10 transition-all group-hover:bg-pink-500/20"></div>

                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">{item.title}</h3>
                          <span className="text-sm text-gray-400 block mb-3 font-medium">{item.subtitle}</span>

                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 bg-dark/50 w-fit px-2 py-1 rounded">
                            <Calendar size={12} className="text-pink-500" />
                            {item.date}
                          </div>

                          {item.description && (
                            <p className="text-sm text-gray-300 leading-relaxed mb-4">
                              {item.description}
                            </p>
                          )}

                          {/* Action Buttons */}
                          <div className="mt-auto pt-4 flex flex-wrap gap-3">
                            {/* View Certificate Button/Link */}
                            {(item.certificateUrl || item.certificate) && (
                              item.certificateUrl ? (
                                <a
                                  href={item.certificateUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="group/btn relative inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-dark border border-pink-500 rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] hover:scale-105 gelly-button"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                  <span className="relative z-10 flex items-center gap-2">
                                    <Eye size={18} /> View Certificate
                                  </span>
                                </a>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCertificate(item.certificate!);
                                  }}
                                  className="group/btn relative inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-dark border border-pink-500 rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] hover:scale-105 gelly-button"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                  <span className="relative z-10 flex items-center gap-2">
                                    <Eye size={18} /> View Certificate
                                  </span>
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Empty space for the other side */}
                      <div className="hidden md:block w-[45%]"></div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-dark-lighter rounded-2xl p-2 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg z-20 hover:scale-110"
            >
              <X size={20} />
            </button>

            {/* Image Container */}
            <div className="w-full h-full overflow-auto rounded-xl bg-black/50 flex items-center justify-center">
              <img
                src={selectedCertificate}
                alt="Certificate"
                className="max-w-full max-h-[85vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Internships;