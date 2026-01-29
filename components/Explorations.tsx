import React, { useRef, useEffect } from 'react';
import { Compass, ExternalLink } from 'lucide-react';
import { EXPLORATIONS_DATA } from '../constants';
import Reveal from './Reveal';
import { Exploration } from '../types';

const ExplorationCard: React.FC<{ exploration: Exploration }> = ({ exploration }) => {
    return (
        <div
            className="group bg-dark-lighter rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative flex flex-col h-full gelly-card"
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
            {/* Internal Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

            {/* Image Container */}
            <div className="relative aspect-video w-full overflow-hidden z-0 flex-shrink-0 bg-slate-900">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                <img
                    src={exploration.image}
                    onError={(e) => { e.currentTarget.src = "/PORTFOLIO/logo.png"; }}
                    alt={exploration.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
            </div>

            {/* Content */}
            <div className="p-6 relative z-10 bg-dark-lighter flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                    {exploration.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-dark text-gray-300 rounded-md border border-gray-700 group-hover:border-pink-500/30 transition-colors">
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
    );
};

const Explorations: React.FC = () => {
    return (
        <section id="explorations" className="py-20 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-6xl mx-auto px-4">
                <Reveal width="100%" className="text-center mb-16">
                    <div className="relative inline-block mb-8">
                        <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-500 rounded-[2rem] blur-md md:blur-xl opacity-50 md:opacity-70 animate-pulse"></div>
                        <div className="relative px-6 py-3 md:px-16 md:py-8 bg-slate-900/60 rounded-[2rem] border border-white/20 backdrop-blur-3xl backdrop-saturate-200 gelly-card cursor-pointer transition-all duration-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] md:shadow-[0_0_50px_rgba(168,85,247,0.5)] overflow-hidden">
                            <h2 className="text-3xl md:text-7xl font-black tracking-wider md:tracking-widest uppercase text-center flex justify-center">
                                <span className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_5px_rgba(168,85,247,0.4)] md:drop-shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105 active:scale-95">
                                    EXPLORATIONS
                                </span>
                            </h2>
                        </div>
                    </div>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                        I love tinkering with anything tech—whether it's a new OS, a fresh mobile UI, or the latest AI tool.
                        I just enjoy jumping in, trying things out, and learning as I go. It's all part of my curiosity to see what's out there.
                    </p>
                </Reveal>

                <Reveal width="100%" delay={0.2} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {EXPLORATIONS_DATA.map((exploration) => (
                        <ExplorationCard key={exploration.id} exploration={exploration} />
                    ))}
                </Reveal>
            </div>
        </section>
    );
};

export default Explorations;
