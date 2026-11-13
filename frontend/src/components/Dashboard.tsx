import React from 'react';
import { Search, ShoppingBag, Bot, Github, Linkedin, ExternalLink, Globe, Cpu, MousePointer2, Gamepad2, Brain, BookOpen, User, Flame, Star, ChevronRight, Mail, Send, Link, Code2 } from 'lucide-react';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import Reveal from './Reveal';

// ─── Social Card Sub-Component (fixes useState-in-map violation) ───
interface SocialItemConfig {
    icon: React.ReactNode;
    title: string;
    desc: string;
    btnText: string;
    link: string;
    color: string;
    hoverGlow: string;
    hoverBorder: string;
    iconGlow: string;
    bg: string;
    border: string;
    titleHover: string;
    rotate: string;
    btnGradient: string;
    txtGradient: string;
    isTelegram?: boolean;
    isGmail?: boolean;
    delay: number;
}

const SocialCard: React.FC<SocialItemConfig> = (item) => {
    const [isCopied, setIsCopied] = React.useState(false);
    const isGmail = item.title === 'GMAIL';

    const handleAction = (e: React.MouseEvent) => {
        if (isGmail) {
            e.preventDefault();
            const email = SOCIAL_LINKS.email;
            navigator.clipboard.writeText(email);
            setIsCopied(true);
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <Reveal width="100%" delay={item.delay}>
            <a
                href={item.link}
                onClick={handleAction}
                target="_blank"
                rel="noreferrer"
                className={`group relative bg-slate-900/40 backdrop-blur-md p-5 sm:p-8 rounded-3xl border border-white/10 transition-all duration-500 flex flex-col items-center text-center gap-4 sm:gap-6 ${item.hoverGlow} ${item.hoverBorder} gelly-card shadow-lg overflow-hidden`}
            >
                <div className={`relative w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center ${item.color} transition-all duration-500 group-hover:scale-110 shadow-lg`}>
                    {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5 sm:w-7 sm:h-7" })}
                </div>

                <div className="space-y-1">
                    <h4 className="text-[10px] sm:text-sm font-black uppercase tracking-wider text-white">
                        {item.title}
                    </h4>
                </div>

                <div className={`mt-auto relative px-4 py-2 sm:px-6 sm:py-2.5 rounded-full overflow-hidden gelly-button group/btn border border-white/10 ${item.hoverBorder} transition-all duration-300 ${isCopied ? 'bg-green-500/20 border-green-500/50' : ''}`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.btnGradient} opacity-0 group-hover/btn:opacity-20 transition-all duration-500`}></div>
                    <span className={`relative z-10 font-black tracking-[0.15em] text-[10px] sm:text-[11px] uppercase transition-all duration-300 ${isCopied ? 'text-green-400' : `text-transparent bg-clip-text bg-gradient-to-r ${item.txtGradient} group-hover/btn:text-white`}`}>
                        {isCopied ? 'EMAIL COPIED!' : item.btnText}
                    </span>
                </div>
            </a>
        </Reveal>
    );
};

const Dashboard: React.FC = () => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    // Play video only when visible — avoids downloading entire MP4 on load
    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.muted = true;
                    video.playbackRate = 2.0;
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.1 }
        );
        obs.observe(video);
        return () => obs.disconnect();
    }, []);
    const steps = [
        {
            id: 1,
            title: "PLAY THE MISSION",
            desc: "Scroll up to the Space Invaders mini-game! Test your reflexes, defeat the alien boss, and see if you can beat the high score.",
        },
        {
            id: 2,
            title: "EXPLORE PROJECTS",
            desc: "Browse the Projects section to discover real-world AI models, Full-Stack web apps, and Cloud deployments. Click to view live demos and source code.",
        },
        {
            id: 3,
            title: "SEARCH ANYTHING",
            desc: "Looking for something specific? Click the Search icon in the top navigation bar to instantly find skills, projects, or any section.",
        },
        {
            id: 4,
            title: "CHAT WITH AI",
            desc: "Click the floating bot icon to interact with TECHBOY AI. Ask my custom assistant anything about my technical background, experience, or resume!",
        }
    ];

    const tiles = [
        { icon: <Search size={18} className="text-orange-500" />, title: "LATEST WORK", desc: "Explore Featured Projects." },
        { icon: <Flame size={18} className="text-orange-600" />, title: "SKILL STACK", desc: "Core AI & Web Capabilities." },
        { icon: <Bot size={18} className="text-cyan-400" />, title: "TECHBOY AI", desc: "Interactive Assistant." },
        { icon: <Globe size={18} className="text-emerald-500" />, title: "LIVE DEMOS", desc: "Ready to test deployments." },
        { icon: <Star size={18} className="text-yellow-400" />, title: "MILESTONES", desc: "Academic & Tech Journey." },
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
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path fill="#FFA116" d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
            ), 
            title: "LEETCODE", 
            desc: "Algorithms, data structures & problem solving", 
            btnText: "VIEW LEETCODE", 
            link: SOCIAL_LINKS.leetcode,
            color: "text-[#FFA116]",
            hoverGlow: "group-hover:shadow-[#FFA116]/30",
            hoverBorder: "group-hover:border-[#FFA116]/60",
            iconGlow: "group-hover:shadow-[0_0_40px_rgba(255,161,22,0.6)]",
            bg: "bg-[#FFA116]/15",
            border: "border-[#FFA116]/30",
            titleHover: "group-hover:text-[#FFA116]",
            rotate: "group-hover:scale-110 group-hover:rotate-6",
            btnGradient: "from-[#FFA116] via-amber-500 to-yellow-400",
            txtGradient: "from-[#FFA116] via-amber-300 to-yellow-300"
        },
        { 
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
            ), 
            title: "GMAIL", 
            desc: "Direct business inquiries & collaborations", 
            btnText: "SEND EMAIL", 
            link: `mailto:${SOCIAL_LINKS.email}`,
            color: "text-[#EA4335]",
            hoverGlow: "group-hover:shadow-red-500/25",
            hoverBorder: "group-hover:border-red-500/50",
            iconGlow: "group-hover:shadow-[0_0_40px_rgba(234,67,53,0.5)]",
            bg: "bg-red-500/10",
            border: "border-red-500/20",
            titleHover: "group-hover:text-red-400", 
            rotate: "group-hover:scale-110",
            isGmail: true,
            btnGradient: "from-[#4285F4] via-[#EA4335] to-[#FBBC05]",
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
        <section id="dashboard-contact" className="pt-20 pb-12 md:pt-24 md:pb-16 bg-transparent relative overflow-hidden border-t border-white/5">
            {/* Background decorative glows */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-orange-600/5 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                
                {/* Brand Header Row - Standardized Neat Style */}
                <Reveal width="100%" className="text-center mb-16">
                    <div className="relative inline-block mb-4">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-20"></div>
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
                            <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/5 group hover:border-orange-500/30 transition-all duration-500">
                                <h3 className="text-[11px] font-black text-orange-500 uppercase tracking-[3px] flex items-center gap-3 mb-4">
                                    <span className="w-1 h-3 bg-orange-500 rounded-full"></span>
                                    ABOUT THE PLATFORM
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                                    <span className="text-white font-bold">Raghuram's Portfolio</span> is a high-fidelity showcase of innovative AI, Full-Stack, and Cloud solutions. This mission-driven platform is designed to provide an interactive journey through my technical expertise, creative projects, and professional milestones.
                                </p>
                            </div>
                        </Reveal>

                        {/* Action Tiles - Flexible Grid */}
                        <Reveal width="100%" delay={0.4} className="grid grid-cols-3 gap-2 sm:gap-4">
                            {tiles.map((tile) => (
                                <div key={tile.title} className="bg-slate-900/40 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-500 group flex flex-col gap-2 sm:gap-3 gelly-card text-center sm:text-left items-center sm:items-start">
                                    {tile.icon}
                                    <div>
                                        <h4 className="text-[10px] sm:text-[11px] font-black text-white uppercase tracking-wider">{tile.title}</h4>
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
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-black text-gray-500 group-hover:border-orange-500 group-hover:text-white transition-all duration-500 backdrop-blur-sm">
                                            {step.id}
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="text-[11px] sm:text-xs font-black text-white uppercase tracking-widest mb-1.5 group-hover:text-orange-400 transition-colors">
                                                {step.title}
                                            </h4>
                                            <p className="text-[10px] sm:text-[11px] text-gray-500 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Profile (4/12) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Reveal width="100%" delay={0.4}>
                            <div className="relative group bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 gelly-card overflow-hidden p-5 flex flex-col gap-4">

                                {/* ── Video (click → GitHub) ── */}
                                <div
                                    className="relative rounded-2xl overflow-hidden border border-white/10 group/vid flex items-center justify-center bg-black/40"
                                >
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] opacity-0 group-hover/vid:opacity-100 transition-all duration-400 z-10 flex flex-col items-center justify-center gap-2 pointer-events-none">
                                        <div className="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
                                            <Github size={18} className="text-white" />
                                        </div>
                                        <span className="text-white text-[9px] font-black tracking-[0.2em] uppercase">View GitHub</span>
                                    </div>

                                    <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="absolute inset-0 z-20" aria-label="View GitHub Profile" />

                                    <video
                                        ref={videoRef}
                                        muted
                                        loop
                                        playsInline
                                        preload="none"
                                        className="w-full h-auto max-h-[300px] object-contain group-hover/vid:scale-105 transition-transform duration-700"
                                        style={{ display: 'block' }}
                                    >
                                        <source src="/github-profile-v2.mp4" type="video/mp4" />
                                    </video>
                                </div>

                                {/* ── Label ── */}
                                <div>
                                    <h4 className="text-xl font-black tracking-tighter uppercase text-white leading-tight">{ABOUT_DATA.name}</h4>
                                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-[2px] mt-0.5">Python Full Stack Developer</p>
                                </div>

                                {/* ── Buttons (Official Brand Colors) ── */}
                                <div className="flex flex-col gap-2.5">
                                    {/* GitHub: White background, Dark text */}
                                    <a
                                        href={SOCIAL_LINKS.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full py-3.5 bg-white text-slate-950 rounded-xl font-black text-[11px] uppercase tracking-[3px] flex items-center justify-center gap-2 hover:bg-gray-100 hover:scale-[1.02] active:scale-95 transition-all gelly-button shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                                    >
                                        GITHUB <Github size={15} />
                                    </a>

                                    {/* LinkedIn: Official Brand Blue (#0A66C2) */}
                                    <a
                                        href={SOCIAL_LINKS.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full py-3.5 bg-[#0A66C2] text-white rounded-xl font-black text-[11px] uppercase tracking-[3px] flex items-center justify-center gap-2 hover:bg-[#004182] hover:scale-[1.02] active:scale-95 transition-all gelly-button shadow-[0_4px_25px_rgba(10,102,194,0.4)]"
                                    >
                                        LINKEDIN <Linkedin size={15} />
                                    </a>

                                    {/* LeetCode: Official Brand Yellow/Orange (#FFA116) */}
                                    <a
                                        href={SOCIAL_LINKS.leetcode}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full py-3.5 bg-[#FFA116] text-slate-950 rounded-xl font-black text-[11px] uppercase tracking-[3px] flex items-center justify-center gap-2 hover:bg-[#e68e0d] hover:scale-[1.02] active:scale-95 transition-all gelly-button shadow-[0_4px_25px_rgba(255,161,22,0.4)]"
                                    >
                                        LEETCODE <Code2 size={15} />
                                    </a>
                                </div>

                            </div>
                        </Reveal>
                    </div>

                </div>

                {/* SOCIAL HUB - Neater 2-column grid on mobile */}
                <div className="mt-12">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
                        {socialItems.map((item, index) => (
                            <SocialCard
                                key={item.title}
                                {...item}
                                delay={0.2 + (index * 0.1)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
