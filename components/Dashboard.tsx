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
            title: "3. CHECK MY RESUME",
            desc: "Review my full professional experience and technical history by clicking the resume link.",
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
        <section id="dashboard" className="py-20 pb-40 md:py-24 bg-dark relative overflow-hidden border-t border-white/5">
            {/* Background decorative glows */}
            <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-orange-600/5 blur-[140px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-cyan-600/5 blur-[140px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                
                {/* Brand Header Row - Standardized Neat Style */}
                <Reveal width="100%" className="text-center mb-16">
                    <div className="relative inline-block mb-4">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
                        <div className="relative px-6 md:px-10 py-3 md:py-4 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
                            <h2 className="text-2xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                                Contact <span className="text-orange-500">Me</span>
                            </h2>
                        </div>
                    </div>
                    <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-widest font-bold">Get in touch & socials</p>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                    
                    {/* LEFT COLUMN: About Platform (5/12) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Reveal width="100%" delay={0.2}>
                            <div className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-white/5 group hover:border-orange-500/30 transition-all duration-500">
                                <h3 className="text-[11px] font-black text-orange-500 uppercase tracking-[3px] flex items-center gap-3 mb-4">
                                    <span className="w-1 h-3 bg-orange-500 rounded-full"></span>
                                    ABOUT THE PLATFORM
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                                    <span className="text-white font-bold">Raghuram's Portfolio</span> is a high-fidelity showcase of innovative AI, Full-Stack, and Cloud solutions.
                                </p>
                            </div>
                        </Reveal>

                        {/* Action Tiles - Flexible Grid */}
                        <Reveal width="100%" delay={0.4} className="grid grid-cols-3 gap-2 sm:gap-4">
                            {tiles.map((tile) => (
                                <div key={tile.title} className="bg-slate-900/40 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-500 group flex flex-col gap-2 sm:gap-3 gelly-card text-center sm:text-left items-center sm:items-start">
                                    {tile.icon}
                                    <div>
                                        <h4 className="text-[7px] sm:text-[9px] font-black text-white uppercase tracking-wider">{tile.title}</h4>
                                        <p className="hidden sm:block text-[8px] text-gray-600 mt-1 uppercase font-black">{tile.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </Reveal>
                    </div>

                    {/* MIDDLE COLUMN: Steps (3/12) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Reveal width="100%" delay={0.3}>
                            <div className="flex items-center gap-4 text-gray-400">
                                <div className="p-2.5 bg-slate-900 border border-white/10 rounded-xl">
                                    <BookOpen size={18} className="text-orange-500" />
                                </div>
                                <h3 className="text-[11px] font-black uppercase tracking-[3px] text-white">GUIDE</h3>
                            </div>
                        </Reveal>

                        <div className="space-y-6 relative">
                            {steps.map((step, i) => (
                                <Reveal key={step.id} width="100%" delay={0.5 + (i * 0.1)}>
                                    <div className="flex gap-4 group">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-black text-gray-500 group-hover:border-orange-500 group-hover:text-white transition-all duration-500 backdrop-blur-xl">
                                            {step.id}
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">
                                                {step.title}
                                            </h4>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Profile (4/12) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Reveal width="100%" delay={0.4}>
                            <div className="relative group bg-slate-900/40 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/5 gelly-card overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full"></div>
                                <div className="relative z-10 space-y-6">
                                    <div>
                                        <h4 className="text-3xl font-black tracking-tighter uppercase text-white leading-tight">{ABOUT_DATA.name}</h4>
                                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-[2px]">AI Developer</p>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="w-full py-4 bg-white text-dark rounded-xl font-black text-[10px] uppercase tracking-[3px] flex items-center justify-center gap-2 hover:bg-gray-100 transition-all gelly-button">
                                            GITHUB <Github size={16} />
                                        </a>
                                        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="w-full py-4 bg-orange-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[3px] flex items-center justify-center gap-2 hover:bg-orange-700 transition-all gelly-button">
                                            LINKEDIN <Linkedin size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                </div>

                {/* SOCIAL HUB - Neater 2-column grid on mobile */}
                <div className="mt-12">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
                        {socialItems.map((item, index) => (
                            <Reveal key={item.title} width="100%" delay={0.2 + (index * 0.1)}>
                                <a 
                                    href={item.link} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className={`group relative bg-slate-900/40 backdrop-blur-3xl p-5 sm:p-8 rounded-3xl border border-white/10 transition-all duration-500 flex flex-col items-center text-center gap-4 sm:gap-6 ${item.hoverGlow} ${item.hoverBorder} gelly-card shadow-lg overflow-hidden`}
                                >
                                    <div className={`relative w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center ${item.isTelegram ? 'text-white' : item.color} transition-all duration-500 group-hover:scale-110 shadow-lg`}>
                                        {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                                    </div>

                                    <div className="space-y-1">
                                        <h4 className="text-[10px] sm:text-sm font-black uppercase tracking-wider text-white">
                                            {item.title}
                                        </h4>
                                    </div>

                                    <div className={`relative px-4 py-1.5 rounded-full border border-white/10 group-hover:border-opacity-50 transition-all duration-300`}>
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-white">
                                            {item.btnText}
                                        </span>
                                    </div>
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
