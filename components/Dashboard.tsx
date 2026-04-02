import React from 'react';
import { Search, ShoppingBag, Bot, Github, Linkedin, ExternalLink, Globe, Cpu, MousePointer2, Gamepad2, Brain, BookOpen, User, Flame, Star, ChevronRight, Mail, Send, Link } from 'lucide-react';
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
        { icon: <Search size={18} className="text-orange-500" />, title: "LATEST WORK", desc: "Explore Projects." },
        { icon: <Flame size={18} className="text-orange-600" />, title: "SKILL STACK", desc: "Core Capabilities." },
        { icon: <Star size={18} className="text-orange-400" />, title: "MILESTONES", desc: "Academic Journey." },
    ];

    const socialItems = [
        { 
            icon: <Linkedin size={24} strokeWidth={1.5} />, 
            title: "LINKEDIN", 
            desc: "Professional network & industry connections", 
            btnText: "VIEW PROFILE", 
            link: SOCIAL_LINKS.linkedin,
            color: "text-blue-500",
            hoverGlow: "group-hover:shadow-blue-500/20",
            hoverBorder: "group-hover:border-blue-500/50",
            iconGlow: "group-hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            titleHover: "group-hover:text-blue-400",
            rotate: "group-hover:rotate-6",
            btnGradient: "from-blue-600 via-cyan-500 to-indigo-500",
            txtGradient: "from-blue-400 via-cyan-300 to-indigo-400"
        },
        { 
            icon: <Github size={24} strokeWidth={1.5} />, 
            title: "GITHUB", 
            desc: "Source code, repositories & contributions", 
            btnText: "EXPLORE REPOS", 
            link: SOCIAL_LINKS.github,
            color: "text-gray-400",
            hoverGlow: "group-hover:shadow-white/10",
            hoverBorder: "group-hover:border-white/30",
            iconGlow: "group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]",
            bg: "bg-white/5",
            border: "border-white/10",
            titleHover: "group-hover:text-gray-300",
            rotate: "group-hover:-rotate-6",
            btnGradient: "from-gray-600 via-slate-500 to-zinc-500",
            txtGradient: "from-gray-300 via-slate-200 to-zinc-300"
        },
        { 
            icon: <Send size={24} strokeWidth={1.5} />, 
            title: "TELEGRAM", 
            desc: "Instant messaging & community updates", 
            btnText: "JOIN CHANNEL", 
            link: SOCIAL_LINKS.telegram,
            color: "text-cyan-400",
            hoverGlow: "group-hover:shadow-cyan-400/20",
            hoverBorder: "group-hover:border-cyan-400/50",
            iconGlow: "group-hover:shadow-[0_0_50px_rgba(55,174,226,0.7)]",
            bg: "bg-gradient-to-br from-[#37AEE2] to-[#1E96C8]",
            border: "border-cyan-500/20",
            titleHover: "group-hover:text-sky-400",
            rotate: "group-hover:translate-x-1 group-hover:-translate-y-1",
            isTelegram: true,
            btnGradient: "from-sky-500 via-blue-500 to-cyan-500",
            txtGradient: "from-sky-400 via-blue-300 to-cyan-400"
        },
        { 
            icon: <Mail size={24} strokeWidth={1.5} />, 
            title: "GMAIL", 
            desc: "Direct business inquiries & collaborations", 
            btnText: "SEND EMAIL", 
            link: `mailto:${SOCIAL_LINKS.email}`,
            color: "text-orange-500",
            hoverGlow: "group-hover:shadow-red-500/20",
            hoverBorder: "group-hover:border-red-400/50",
            iconGlow: "group-hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20",
            titleHover: "", 
            rotate: "group-hover:scale-110",
            isGmail: true,
            btnGradient: "from-blue-500 via-red-500 to-yellow-500",
            txtGradient: "from-blue-400 via-red-300 to-yellow-400"
        },
        { 
            icon: <Link size={24} strokeWidth={1.5} />, 
            title: "LINKTREE", 
            desc: "All important links & social directories", 
            btnText: "VISIT HUB", 
            link: SOCIAL_LINKS.linktree,
            color: "text-green-500",
            hoverGlow: "group-hover:shadow-green-500/20",
            hoverBorder: "group-hover:border-green-500/50",
            iconGlow: "group-hover:shadow-[0_0_40px_rgba(34,197,94,0.4)]",
            bg: "bg-green-500/10",
            border: "border-green-500/20",
            titleHover: "group-hover:text-green-400",
            rotate: "group-hover:rotate-12",
            btnGradient: "from-green-500 via-emerald-500 to-lime-500",
            txtGradient: "from-green-400 via-emerald-300 to-lime-400"
        }
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
                                CONTACT <span className="text-orange-500">ME</span>
                            </h2>
                            <p className="text-[10px] font-black tracking-[4px] text-gray-500 uppercase mt-2">Section</p>
                        </div>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* LEFT COLUMN: About Platform (5/12) */}
                    <div className="lg:col-span-4 space-y-10">
                        <Reveal width="100%" delay={0.2}>
                            <div className="space-y-8">
                                <h3 className="text-[11px] font-black text-orange-500 uppercase tracking-[3px] flex items-center gap-3">
                                    <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                                    ABOUT THE PLATFORM
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg font-medium">
                                    <span className="text-white font-bold">Raghuram's Portfolio</span> is a high-fidelity showcase of innovative AI, Full-Stack, and Cloud solutions. It serves as a unified hub to explore my technical journey, professional internships, and cutting-edge software deployments.
                                </p>
                            </div>
                        </Reveal>

                        {/* Action Tiles */}
                        <Reveal width="100%" delay={0.4} className="grid grid-cols-3 gap-3">
                            {tiles.map((tile) => (
                                <div key={tile.title} className="bg-slate-900/40 backdrop-blur-xl p-4 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-500 group flex flex-col gap-3 gelly-card">
                                    {tile.icon}
                                    <div>
                                        <h4 className="text-[9px] font-black text-white uppercase tracking-wider">{tile.title}</h4>
                                        <p className="text-[8px] text-gray-600 mt-1 uppercase font-black">{tile.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </Reveal>

                        {/* Wide Source Code Button */}
                        <Reveal width="100%" delay={0.6}>
                            <a 
                                href={(SOCIAL_LINKS as any).portfolioRepo || SOCIAL_LINKS.github} 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-slate-900/60 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[4px] text-gray-400 hover:text-white hover:border-white/30 hover:bg-slate-800 transition-all duration-500 group gelly-button"
                            >
                                <Github size={18} />
                                EXPLORE SOURCE CODE
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                            </a>
                        </Reveal>
                    </div>

                    {/* MIDDLE COLUMN: Steps (3/12) */}
                    <div className="lg:col-span-4 space-y-12">
                        <Reveal width="100%" delay={0.3}>
                            <div className="flex items-center gap-4 text-gray-400 mb-8">
                                <div className="p-3 bg-slate-900 border border-white/10 rounded-2xl">
                                    <BookOpen size={20} className="text-orange-500" />
                                </div>
                                <h3 className="text-[12px] font-black uppercase tracking-[3px] text-white">HOW TO USE<br/>THIS PROJECT</h3>
                            </div>
                        </Reveal>

                        <div className="space-y-14 relative">
                            {steps.map((step, i) => (
                                <Reveal key={step.id} width="100%" delay={0.5 + (i * 0.1)}>
                                    <div className="flex gap-6 group">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[11px] font-black text-gray-500 group-hover:border-orange-500 group-hover:text-white transition-all duration-500 backdrop-blur-xl">
                                            {step.id}
                                        </div>
                                        <div className="space-y-2 pt-1.5">
                                            <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">
                                                {step.title}
                                            </h4>
                                            <p className="text-[11px] text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors max-w-[240px]">
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
                             <div className="flex items-center gap-4 text-gray-400 mb-8">
                                <div className="p-3 bg-slate-900 border border-white/10 rounded-2xl">
                                    <User size={20} className="text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                                </div>
                                <h3 className="text-[12px] font-black uppercase tracking-[3px] text-white">DEVELOPER</h3>
                            </div>
                        </Reveal>

                        {/* Developer Card - Extreme Fidelity */}
                        <Reveal width="100%" delay={0.6}>
                            <div className="relative group bg-slate-900/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 gelly-card">
                                <div className="space-y-8 relative z-10 flex flex-col items-center md:items-start">
                                    <div className="px-3 py-1 bg-orange-600/20 border border-orange-500/30 rounded-full text-[8px] font-black text-orange-500 tracking-[2px] uppercase">
                                        LEAD
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <h4 className="text-4xl font-black tracking-tighter uppercase text-white leading-tight">{ABOUT_DATA.name}</h4>
                                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-[2px]">Full Stack AI Developer</p>
                                    </div>

                                    <div className="space-y-4 w-full pt-4">
                                        {/* VISIT GITHUB - White/Black */}
                                        <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="w-full py-5 bg-white text-dark rounded-2xl font-black text-[11px] uppercase tracking-[3px] flex items-center justify-center gap-3 hover:bg-gray-100 active:scale-[0.98] transition-all gelly-button shadow-[0_4px_30px_rgba(255,255,255,0.1)]">
                                            VISIT GITHUB <Github size={18} />
                                        </a>
                                        {/* VISIT LINKEDIN - Orange/White */}
                                        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="w-full py-5 bg-[#f97316] text-white rounded-2xl font-black text-[11px] uppercase tracking-[3px] flex items-center justify-center gap-3 hover:bg-[#ea580c] active:scale-[0.98] transition-all gelly-button shadow-[0_10px_40px_rgba(249,115,22,0.3)]">
                                            VISIT LINKEDIN <Linkedin size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                    </div>

                </div>

                {/* SOCIAL HUB: Identity Sync Grid - Merged into main container */}
                <div className="mt-16">

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {socialItems.map((item, index) => (
                            <Reveal key={item.title} width="100%" delay={0.2 + (index * 0.1)}>
                                <a 
                                    href={item.link} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className={`group relative bg-slate-900/40 backdrop-blur-3xl backdrop-saturate-150 p-8 rounded-[2rem] border border-white/10 transition-all duration-500 flex flex-col items-center text-center gap-6 ${item.hoverGlow} ${item.hoverBorder} gelly-card shadow-2xl overflow-hidden`}
                                >
                                    {/* Glowing Icon Container */}
                                    <div className={`relative w-16 h-16 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center ${item.isTelegram ? 'text-white' : item.color} shadow-lg transition-all duration-500 group-hover:scale-110 ${item.rotate} group-hover:bg-opacity-20 ${item.iconGlow} overflow-hidden gelly-button`}>
                                        {(item as any).isGmail && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] opacity-20 group-hover:opacity-40 blur-xl"></div>
                                        )}
                                        <div className="relative z-10">
                                            {item.icon}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className={`text-sm font-black uppercase tracking-wider transition-all duration-500 ${(item as any).isGmail ? 'bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient' : `text-white ${item.titleHover}`}`}>
                                            {item.title}
                                        </h4>
                                        <p className="text-[10px] text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                                    </div>

                                    {/* Pill-shaped Button with Filling Gradient */}
                                    <div className={`mt-2 relative px-6 py-2.5 rounded-full overflow-hidden border border-white/10 group-hover:border-opacity-50 transition-all duration-300 group/btn`}>
                                        <div className={`absolute inset-0 bg-gradient-to-r ${item.btnGradient} opacity-20 group-hover:opacity-100 transition-all duration-500`}></div>
                                        <span className={`relative z-10 text-[9px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${item.txtGradient} group-hover:text-white transition-all duration-500`}>
                                            {item.btnText}
                                        </span>
                                    </div>

                                    {/* Scan Line Detail */}
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                </a>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
