import React from 'react';
import { Search, ShoppingBag, Bot, Github, Linkedin, ExternalLink, Globe, Cpu, MousePointer2, Gamepad2, Brain } from 'lucide-react';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import Reveal from './Reveal';

const Dashboard: React.FC = () => {
    const steps = [
        {
            id: 1,
            title: "1. PLAY THE MISSION",
            desc: "Engage with the Space Invaders mini-game down below to test your reflexes and unlock hidden site features.",
            icon: <Gamepad2 size={20} className="text-pink-500" />
        },
        {
            id: 2,
            title: "2. EXPLORE PROJECTS",
            desc: "Navigate through the Portfolio section to see real-world AI, Full-Stack, and Cloud deployments.",
            icon: <Search size={20} className="text-orange-500" />
        },
        {
            id: 3,
            title: "3. CONSULT THE AI",
            desc: "Talk to TECHBOY AI (bottom right) for real-time insights into my technical journey and capabilities.",
            icon: <Bot size={20} className="text-cyan-500" />
        }
    ];

    return (
        <section id="dashboard" className="py-20 bg-dark relative overflow-hidden">
            {/* Background decorative glows */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-600/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: Mission & About (5/12) */}
                    <div className="lg:col-span-5 space-y-10">
                        <Reveal width="100%">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 p-0.5 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                                    <div className="w-full h-full rounded-2xl bg-dark flex items-center justify-center overflow-hidden">
                                        <img src="/techboy-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-white leading-none">
                                        PORTFOLIO
                                    </h2>
                                    <p className="text-[10px] font-black tracking-[4px] text-orange-500 uppercase mt-1">Innovation Engine</p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal width="100%" delay={0.2}>
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[4px] border-l-2 border-orange-500 pl-4 py-1">
                                    ABOUT THE HUB
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
                                    <span className="text-white font-bold">Techboy Portfolio</span> is your interactive gateway to high-performance AI solutions and modern web architectures. Whether you're hunting for <span className="text-pink-500">technical insights</span>, exploring <span className="text-cyan-400">GenAI models</span>, or browsing source code, this dashboard connects you to everything I build.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal width="100%" delay={0.4} className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900/40 backdrop-blur-xl p-5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-500 group flex flex-col gap-3 gelly-card">
                                <Search size={22} className="text-orange-500 group-hover:scale-110 transition-transform" />
                                <div>
                                    <h4 className="text-xs font-black text-white uppercase tracking-widest">Search Work</h4>
                                    <p className="text-[10px] text-gray-500 mt-1">Cross-platform exploration.</p>
                                </div>
                            </div>
                            <div className="bg-slate-900/40 backdrop-blur-xl p-5 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all duration-500 group flex flex-col gap-3 gelly-card">
                                <Brain size={22} className="text-pink-500 group-hover:scale-110 transition-transform" />
                                <div>
                                    <h4 className="text-xs font-black text-white uppercase tracking-widest">AI Insights</h4>
                                    <p className="text-[10px] text-gray-500 mt-1">Real-time model logic.</p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal width="100%" delay={0.6}>
                            <a 
                                href={SOCIAL_LINKS.github} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900/60 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[4px] text-gray-400 hover:text-white hover:border-white/30 hover:bg-slate-800 transition-all duration-500 group gelly-button"
                            >
                                <Github size={18} />
                                Explore Source Code
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </Reveal>
                    </div>

                    {/* MIDDLE COLUMN: Steps (3/12) */}
                    <div className="lg:col-span-3 space-y-10">
                        <Reveal width="100%" delay={0.3}>
                            <div className="flex items-center gap-3 text-gray-500 mb-8">
                                <div className="p-2 bg-slate-900 rounded-lg border border-white/5">
                                    <Cpu size={16} />
                                </div>
                                <h3 className="text-xs font-black uppercase tracking-[3px]">Navigation Logic</h3>
                            </div>
                        </Reveal>

                        <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-orange-500 before:via-pink-500 before:to-transparent before:opacity-20">
                            {steps.map((step, i) => (
                                <Reveal key={step.id} width="100%" delay={0.5 + (i * 0.1)}>
                                    <div className="relative pl-10 group">
                                        <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center text-[10px] font-black text-gray-500 group-hover:border-orange-500 group-hover:text-white transition-all duration-500 z-10 backdrop-blur-xl">
                                            {step.id}
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                                                {step.icon}
                                                {step.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Profile & Spotlight (4/12) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Reveal width="100%" delay={0.4}>
                             <div className="flex items-center gap-3 text-gray-500 mb-6">
                                <div className="p-2 bg-slate-900 rounded-lg border border-white/5">
                                    <Globe size={16} className="animate-spin-slow" />
                                </div>
                                <h3 className="text-xs font-black uppercase tracking-[3px]">Project Lead</h3>
                            </div>
                        </Reveal>

                        {/* Developer Card */}
                        <Reveal width="100%" delay={0.6}>
                            <div className="relative group overflow-hidden bg-slate-900/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 gelly-card shadow-2xl">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Cpu size={120} />
                                </div>
                                
                                <div className="space-y-6 relative z-10 text-center">
                                    <div className="relative inline-block">
                                        <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                                        <img src="/profile.jpg" alt="Dev" className="w-24 h-24 rounded-full border-2 border-white/20 shadow-xl object-cover relative" />
                                        <div className="absolute bottom-0 right-0 bg-orange-500 text-black text-[8px] font-black px-2 py-1 rounded-full border-2 border-dark shadow-lg">LEAD</div>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <h4 className="text-2xl font-black tracking-tighter uppercase text-white">{ABOUT_DATA.name}</h4>
                                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-[2px]">Full Stack AI Developer</p>
                                    </div>

                                    <div className="space-y-3 pt-4">
                                        <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="w-full py-4 bg-white text-dark rounded-2xl font-black text-[10px] uppercase tracking-[3px] flex items-center justify-center gap-3 hover:bg-gray-200 transition-all gelly-button">
                                            <Github size={16} /> Visit Github
                                        </a>
                                        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="w-full py-4 bg-[#f97316] text-white rounded-2xl font-black text-[10px] uppercase tracking-[3px] flex items-center justify-center gap-3 hover:bg-[#ea580c] transition-all gelly-button shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                                            <Linkedin size={16} /> Visit LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Featured Site Card */}
                        <Reveal width="100%" delay={0.8}>
                            <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 flex items-center justify-between group transition-all duration-500 hover:border-pink-500/40 gelly-card">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-dark border border-white/5 flex items-center justify-center text-cyan-400 shadow-xl group-hover:scale-110 transition-transform">
                                        <ShoppingBag size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white uppercase tracking-wider">TECHBOY STORE</h4>
                                        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-black">Official Merch Hub</p>
                                    </div>
                                </div>
                                <a href={SOCIAL_LINKS.techboyStore} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-[0_0_15px_rgba(234,88,12,0.5)] hover:scale-110 active:scale-95 transition-all text-white">
                                    <ExternalLink size={18} />
                                </a>
                            </div>
                        </Reveal>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Dashboard;
