import React from 'react';
import { Search, ShoppingBag, Bot, Github, Linkedin, ExternalLink, Globe, Cpu, MousePointer2, Gamepad2, Brain, BookOpen, User, Flame, Star, ChevronRight } from 'lucide-react';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import Reveal from './Reveal';

const Dashboard: React.FC = () => {
    const steps = [
        {
            id: 1,
            title: "1. PLAY THE MISSION",
            desc: "Engage with the Space Invaders mini-game to test your reflexes and unlock hidden site features.",
        },
        {
            id: 2,
            title: "2. EXPLORE WORK",
            desc: "Navigate through the Portfolio section to see real-world AI, Full-Stack, and Cloud deployments.",
        },
        {
            id: 3,
            title: "3. CONSULT THE AI",
            desc: "Talk to TECHBOY AI (bottom right) for real-time insights into my technical journey.",
        }
    ];

    const tiles = [
        { icon: <Search size={18} className="text-orange-500" />, title: "SEARCH WORK", desc: "Cross-platform search." },
        { icon: <Flame size={18} className="text-orange-600" />, title: "TRENDING TECH", desc: "Real-time tech trends." },
        { icon: <Star size={18} className="text-orange-400" />, title: "FAVORITES", desc: "Save your favorite work." },
    ];

    return (
        <section id="dashboard" className="py-24 bg-dark relative overflow-hidden border-t border-white/5">
            {/* Background decorative glows */}
            <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-orange-600/5 blur-[140px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-cyan-600/5 blur-[140px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                
                {/* Brand Header Row */}
                <Reveal width="100%">
                    <div className="flex items-center gap-6 mb-16">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 p-0.5 shadow-2xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-full h-full rounded-2xl bg-dark flex items-center justify-center relative">
                                <img src="/techboy-logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
                            </div>
                        </div>
                        <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/10 text-orange-500">
                            <Search size={20} />
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white leading-none">
                                PORTFOLIO <span className="text-orange-500">HUB</span>
                            </h2>
                            <p className="text-[10px] font-black tracking-[4px] text-gray-500 uppercase mt-2">Innovation Engine</p>
                        </div>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* LEFT COLUMN: About Platform (7/12) */}
                    <div className="lg:col-span-7 space-y-10">
                        <Reveal width="100%" delay={0.2}>
                            <div className="space-y-8">
                                <h3 className="text-[11px] font-black text-orange-500 uppercase tracking-[3px] flex items-center gap-3">
                                    <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                                    ABOUT THE PLATFORM
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                                    <span className="text-white font-bold">Techboy Project Finder</span> is your AI-powered gateway to discovering top-tier open-source projects. Whether you're hunting for inspiration, datasets, or specific codebases, our engine aggregates the best resources across the web.
                                </p>
                            </div>
                        </Reveal>

                        {/* Action Tiles */}
                        <Reveal width="100%" delay={0.4} className="grid grid-cols-3 gap-4">
                            {tiles.map((tile) => (
                                <div key={tile.title} className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-500 group flex flex-col gap-4 gelly-card">
                                    <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 w-fit">
                                        {tile.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black text-white uppercase tracking-wider">{tile.title}</h4>
                                        <p className="text-[9px] text-gray-500 mt-1 uppercase font-black">{tile.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </Reveal>

                        {/* Wide Source Code Button */}
                        <Reveal width="100%" delay={0.6}>
                            <a 
                                href={SOCIAL_LINKS.github} 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-slate-900/60 border border-white/10 rounded-2xl font-black text-[12px] uppercase tracking-[4px] text-gray-400 hover:text-white hover:border-white/30 hover:bg-slate-800 transition-all duration-500 group gelly-button"
                            >
                                <Github size={20} />
                                EXPLORE SOURCE CODE
                                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                            </a>
                        </Reveal>
                    </div>

                    {/* RIGHT COLUMN: Steps (5/12) */}
                    <div className="lg:col-span-5 space-y-12">
                        <Reveal width="100%" delay={0.3}>
                            <div className="flex items-center gap-4 text-gray-400 mb-8">
                                <div className="p-3 bg-slate-900 border border-white/10 rounded-2xl">
                                    <BookOpen size={20} className="text-orange-500" />
                                </div>
                                <h3 className="text-[14px] font-black uppercase tracking-[3px] text-white">HOW TO USE<br/>THIS PROJECT</h3>
                            </div>
                        </Reveal>

                        <div className="space-y-14 relative">
                            {steps.map((step, i) => (
                                <Reveal key={step.id} width="100%" delay={0.5 + (i * 0.1)}>
                                    <div className="flex gap-6 group">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[13px] font-black text-gray-500 group-hover:border-orange-500 group-hover:text-white transition-all duration-500 backdrop-blur-xl">
                                            {step.id}
                                        </div>
                                        <div className="space-y-2 pt-2">
                                            <h4 className="text-[14px] font-black text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">
                                                {step.title}
                                            </h4>
                                            <p className="text-[12px] text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors max-w-[320px]">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Dashboard;
