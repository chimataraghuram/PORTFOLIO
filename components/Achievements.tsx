import React, { useState } from 'react';
import { Award, Trophy, Zap, Star, X, ExternalLink } from 'lucide-react';
import Reveal from './Reveal';

interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    image?: string;
    proofImage?: string;
    color: string;
}

const ACHIEVEMENTS: Achievement[] = [
    {
        id: 1,
        title: "Google Cloud Arcade 2024",
        description: "Completed intensive cloud labs gaining hands-on experience with GCP services, Kubernetes, and deployment workflows.",
        icon: <Zap className="text-yellow-400" size={20} />,
        image: "https://www.gstatic.com/images/branding/product/1x/google_cloud_48dp.png",
        proofImage: "/gcp-proof.webp",
        color: "#f9ab00"
    },
    {
        id: 2,
        title: "Postman Student Expert",
        description: "Certified Postman Student Expert specializing in API development, testing, and collaboration using Postman collections.",
        icon: <Trophy className="text-orange-500" size={20} />,
        image: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/postman-icon.png",
        proofImage: "/postman-proof.webp",
        color: "#ff6c37"
    },
    {
        id: 3,
        title: "Cyber Security Awareness",
        description: "Recognized for completing foundational training in information security, threat detection, and digital safety practices.",
        icon: <Award className="text-blue-400" size={20} />,
        image: "https://cdn-icons-png.flaticon.com/512/2092/2092663.png",
        proofImage: "/security-proof.webp",
        color: "#00a3e0"
    }
];

const Achievements: React.FC = () => {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

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
                                    
                                    <button 
                                        onClick={() => setSelectedAchievement(achievement)}
                                        className="mt-3 text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-1.5 hover:text-blue-300 transition-colors group/btn active:scale-95"
                                    >
                                        View Proof <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* HIGH FIDELITY PROOF MODAL */}
            {selectedAchievement && (
                <div 
                    className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-fade-in"
                    onClick={() => setSelectedAchievement(null)}
                >
                    <div 
                        className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-liquid-drop"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <Trophy size={16} className="text-blue-400" />
                                </div>
                                <h2 className="text-lg font-black text-white uppercase tracking-tight leading-none">
                                    Achievement Proof
                                </h2>
                            </div>
                            <button 
                                onClick={() => setSelectedAchievement(null)}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all gelly-button"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Image Body */}
                        <div className="p-4 md:p-6 bg-dark/40 overflow-hidden">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-slate-950 flex items-center justify-center">
                                <img 
                                    src={selectedAchievement.proofImage}
                                    alt={selectedAchievement.title}
                                    className="w-full h-full object-contain"
                                    loading="eager"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://placehold.co/800x600/0f172a/3b82f6?text=Proof+Image+Coming+Soon";
                                    }}
                                />
                                
                                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Verified Badge</span>
                                </div>
                            </div>
                            
                            <div className="mt-5 text-center">
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-1">
                                    {selectedAchievement.title}
                                </h3>
                                <p className="text-xs text-gray-400 uppercase tracking-[3px] font-bold">
                                    Authenticated Milestone
                                </p>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-4 border-t border-white/10 bg-slate-900/50 flex justify-center">
                             <button 
                                onClick={() => setSelectedAchievement(null)}
                                className="px-10 py-3 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all gelly-button"
                             >
                                Close Proof
                             </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default React.memo(Achievements);
