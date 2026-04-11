import React from 'react';
import { Award, Trophy, Zap, Star } from 'lucide-react';
import Reveal from './Reveal';

interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    image?: string;
    color: string;
}

const ACHIEVEMENTS: Achievement[] = [
    {
        id: 1,
        title: "Google Cloud Arcade 2024",
        description: "Completed intensive cloud labs gaining hands-on experience with GCP services, Kubernetes, and deployment workflows.",
        icon: <Zap className="text-yellow-400" size={20} />,
        image: "https://www.gstatic.com/images/branding/product/1x/google_cloud_48dp.png",
        color: "#f9ab00"
    },
    {
        id: 2,
        title: "Postman Student Expert",
        description: "Certified Postman Student Expert specializing in API development, testing, and collaboration using Postman collections.",
        icon: <Trophy className="text-orange-500" size={20} />,
        image: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/postman-icon.png",
        color: "#ff6c37"
    },
    {
        id: 3,
        title: "Cyber Security Awareness",
        description: "Recognized for completing foundational training in information security, threat detection, and digital safety practices.",
        icon: <Award className="text-blue-400" size={20} />,
        image: "https://cdn-icons-png.flaticon.com/512/2092/2092663.png",
        color: "#00a3e0"
    }
];

const Achievements: React.FC = () => {
    return (
        <section id="achievements" className="py-20 relative overflow-hidden bg-dark/50">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <Reveal width="100%" className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">
                        <Star size={12} className="animate-pulse" />
                        <span>Milestones</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                        Achievements
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-4 rounded-full"></div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-2xl mx-auto">
                    {ACHIEVEMENTS.map((achievement, index) => (
                        <Reveal key={achievement.id} width="100%" delay={index * 0.1}>
                            <div 
                                className="group p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md flex items-start gap-4 transition-all duration-500 hover:bg-slate-800/60 hover:border-white/20 hover:-translate-y-1 gelly-card"
                                style={{
                                    boxShadow: `0 10px 30px -15px rgba(0,0,0,0.5)`
                                }}
                            >
                                <div className="shrink-0 relative">
                                    <div 
                                        className="absolute inset-0 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"
                                        style={{ backgroundColor: achievement.color }}
                                    ></div>
                                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-dark/80 border border-white/10 flex items-center justify-center p-2.5 overflow-hidden shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        <img 
                                            src={achievement.image} 
                                            alt={achievement.title}
                                            className="w-full h-full object-contain filter drop-shadow-lg"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.innerHTML = `<div class="text-blue-400 text-2xl font-bold">${achievement.title.charAt(0)}</div>`;
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-base md:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {achievement.title}
                                        </h3>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            {achievement.icon}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
                                        {achievement.description}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Achievements);
