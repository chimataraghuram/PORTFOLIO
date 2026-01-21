import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { QUALIFICATIONS_DATA } from '../constants';
import Reveal from './Reveal';

const Qualification: React.FC = () => {
  // Filter only Education data
  const data = QUALIFICATIONS_DATA.filter(q => q.type === 'Education');

  return (
    <section id="qualification" className="py-20 pb-24 md:pb-20 bg-dark-lighter/30" style={{ paddingBottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="max-w-4xl mx-auto px-4">
        <Reveal width="100%" className="text-center mb-16">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative px-10 py-4 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                Education
              </h2>
            </div>
          </div>
          <p className="text-gray-400 text-sm">My academic journey</p>
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

                      {/* Content Card with Colorful Glow Effect */}
                      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                        <div className="bg-dark-lighter p-6 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] group relative overflow-hidden h-full gelly-card">

                          {/* Subtle internal gradient - Blue to Pink */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-xl -mr-10 -mt-10 transition-all group-hover:bg-pink-500/20"></div>

                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">{item.title}</h3>
                          <span className="text-sm text-gray-400 block mb-3 font-medium">{item.subtitle}</span>

                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 bg-dark/50 w-fit px-2 py-1 rounded group-hover:text-pink-400 transition-colors">
                            <Calendar size={12} className="text-pink-500" />
                            {item.date}
                          </div>

                          {item.description && (
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {item.description}
                            </p>
                          )}
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
    </section>
  );
};

export default Qualification;