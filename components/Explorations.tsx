import React, { useRef, useEffect } from 'react';
import { Compass, ExternalLink } from 'lucide-react';
import { EXPLORATIONS_DATA } from '../constants';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import { Exploration } from '../types';

const ExplorationCard: React.FC<{ exploration: Exploration }> = ({ exploration }) => {
    return (
        <TiltCard
            className="group bg-dark-lighter rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] relative flex flex-col h-full gelly-card w-full"
            style={{
                borderColor: exploration.color ? `${exploration.color}4D` : 'rgba(31, 41, 55, 1)',
                boxShadow: exploration.color ? `0 0 20px ${exploration.color}40` : ''
            }}
            onMouseEnter={(e) => {
                if (exploration.color) {
                    e.currentTarget.style.borderColor = exploration.color;
                    e.currentTarget.style.boxShadow = `0 0 30px ${exploration.color}80`;
                }
            }}
            onMouseLeave={(e) => {
                if (exploration.color) {
                    e.currentTarget.style.borderColor = `${exploration.color}4D`;
                    e.currentTarget.style.boxShadow = `0 0 20px ${exploration.color}40`;
                }
            }}
        >
            <div className="h-full flex flex-col w-full relative group">
                {/* Internal Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden z-0 flex-shrink-0 bg-slate-900">
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                    <img
                        src={exploration.image}
                        onError={(e) => { e.currentTarget.src = "/logo.png"; }}
                        alt={exploration.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 md:p-6 relative z-10 bg-dark-lighter flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                        {exploration.tags.map(tag => (
                            <span key={tag} className="text-[9px] sm:text-xs uppercase tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 bg-dark text-gray-300 rounded-md border border-gray-700 group-hover:border-pink-500/30 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="mb-4">
                        <div
                            className="inline-flex items-center px-4 py-2 rounded-full border-2 transition-all duration-300 gelly-button group-hover:scale-105 cursor-pointer active:scale-95"
                            style={{
                                borderColor: exploration.color ? `${exploration.color}80` : 'rgba(168, 85, 247, 0.5)',
                                boxShadow: exploration.color
                                    ? `0 0 15px ${exploration.color}60, 0 0 30px ${exploration.color}30`
                                    : '0 0 15px rgba(168, 85, 247, 0.3), 0 0 30px rgba(168, 85, 247, 0.15)',
                                backgroundColor: exploration.color ? `${exploration.color}10` : 'rgba(168, 85, 247, 0.1)'
                            }}
                            onMouseEnter={(e) => {
                                if (exploration.color) {
                                    e.currentTarget.style.borderColor = exploration.color;
                                    e.currentTarget.style.boxShadow = `0 0 30px ${exploration.color}CC, 0 0 60px ${exploration.color}80, 0 0 90px ${exploration.color}40`;
                                    e.currentTarget.style.backgroundColor = `${exploration.color}25`;
                                } else {
                                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 1)';
                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.9), 0 0 60px rgba(168, 85, 247, 0.6), 0 0 90px rgba(168, 85, 247, 0.3)';
                                    e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.25)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (exploration.color) {
                                    e.currentTarget.style.borderColor = `${exploration.color}80`;
                                    e.currentTarget.style.boxShadow = `0 0 15px ${exploration.color}60, 0 0 30px ${exploration.color}30`;
                                    e.currentTarget.style.backgroundColor = `${exploration.color}10`;
                                } else {
                                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                                    e.currentTarget.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.3), 0 0 30px rgba(168, 85, 247, 0.15)';
                                    e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
                                }
                            }}
                            onMouseDown={(e) => {
                                if (exploration.color) {
                                    e.currentTarget.style.boxShadow = `0 0 40px ${exploration.color}FF, 0 0 80px ${exploration.color}CC, 0 0 120px ${exploration.color}80`;
                                } else {
                                    e.currentTarget.style.boxShadow = '0 0 40px rgba(168, 85, 247, 1), 0 0 80px rgba(168, 85, 247, 0.8), 0 0 120px rgba(168, 85, 247, 0.5)';
                                }
                            }}
                            onMouseUp={(e) => {
                                if (exploration.color) {
                                    e.currentTarget.style.boxShadow = `0 0 30px ${exploration.color}CC, 0 0 60px ${exploration.color}80, 0 0 90px ${exploration.color}40`;
                                } else {
                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.9), 0 0 60px rgba(168, 85, 247, 0.6), 0 0 90px rgba(168, 85, 247, 0.3)';
                                }
                            }}
                        >
                            <h3 className="text-xs md:text-sm font-bold text-white uppercase tracking-wider text-center flex justify-center w-full">
                                {exploration.title}
                            </h3>
                        </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                        {exploration.description}
                    </p>

                    {/* Explore Button */}
                    <div className="mt-auto">
                        <a
                            href={exploration.linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-dark border rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:scale-105 gelly-button w-full justify-center"
                            style={{ borderColor: exploration.color || '#22d3ee' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"
                                style={{ background: exploration.color ? `linear-gradient(to right, ${exploration.color}, ${exploration.color})` : '' }}
                            ></div>
                            <span className="relative z-10 flex items-center gap-2">
                                <Compass size={16} className="shrink-0 animate-pulse" />
                                <span>Explore</span>
                                <ExternalLink size={12} className="opacity-70" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </TiltCard>
    );
};

const Explorations: React.FC = () => {
    return (
        <section id="explorations" className="pt-10 pb-32 md:pb-20 relative overflow-hidden" style={{ paddingBottom: 'calc(8rem + env(safe-area-inset-bottom, 0px))' }}>
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-6xl mx-auto px-4">
                <Reveal width="100%" className="text-center mb-12">
                   <div className="relative inline-block mb-4">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
                      <div className="relative px-6 md:px-10 py-3 md:py-4 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
                         <h2 className="text-2xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                            Explorations
                         </h2>
                      </div>
                   </div>
                   <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-widest font-bold">Curiosity & tinkering</p>
                </Reveal>

                {/* Mobile: Horizontal Snap Scroll | Desktop: Grid */}
                <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
                    {EXPLORATIONS_DATA.map((exploration) => (
                        <div key={exploration.id} className="snap-center shrink-0 w-[82vw] max-w-[320px]">
                            <ExplorationCard exploration={exploration} />
                        </div>
                    ))}
                </div>
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {EXPLORATIONS_DATA.map((exploration) => (
                        <ExplorationCard key={exploration.id} exploration={exploration} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Explorations);
