import React, { useState } from 'react';
import { Award, Trophy, Zap, Star, X, ExternalLink, Linkedin, Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

interface Achievement {
    id: number;
    title: string;
    description: string;
    modalDescription: string;
    icon: React.ReactNode;
    image?: string;
    proofImages?: string[]; // UPDATED: Support multiple images
    linkedinUrl?: string;
    color: string;
    isArcade?: boolean;
}

const ACHIEVEMENTS: Achievement[] = [
    {
        id: 1,
        title: "Google Cloud Arcade 2024",
        description: "Participated as a beginner, completing cloud labs and quizzes while gaining hands-on exposure to Google Cloud concepts.",
        modalDescription: "Participated in Google Cloud Arcade 2024 as a beginner, completing cloud labs and quizzes, earning points, and gaining hands-on experience with cloud concepts and workflows. This initiative demonstrates a proactive learning mindset and basic cloud proficiency.",
        icon: <Zap className="text-yellow-400" size={20} />,
        image: "https://www.gstatic.com/images/branding/product/1x/google_cloud_48dp.png",
        proofImages: [
            "/images/gcp-gift-1.jpg",
            "/images/gcp-gift-2.jpg",
            "/images/gcp-gift-3.jpg",
            "/images/gcp-gift-4.jpg"
        ],
        linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_googlearcade-googlecloud-ai-activity-7345721907792461825-6QMG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
        color: "#f9ab00",
        isArcade: true
    },
    {
        id: 2,
        title: "Postman Student Expert",
        description: "Certified Postman Student Expert specializing in API development, testing, and collaboration using Postman collections.",
        modalDescription: "Earned the official Postman Student Expert certification. This involved mastering core API concepts, creating complex collections, and implementing automated testing workflows to ensure robust API performance.",
        icon: <Trophy className="text-orange-500" size={20} />,
        image: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/postman-icon.png",
        proofImages: ["/images/postman-cert.webp"],
        linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/",
        color: "#ff6c37"
    },
    {
        id: 3,
        title: "Cyber Security Awareness",
        description: "Recognized for completing foundational training in information security, threat detection, and digital safety practices.",
        modalDescription: "Successfully completed foundational cybersecurity training, covering essential topics such as phishing protection, data encryption, password management, and secure digital browsing habits.",
        icon: <Award className="text-blue-400" size={20} />,
        image: "https://cdn-icons-png.flaticon.com/512/2092/2092663.png",
        proofImages: ["/images/security-cert.webp"],
        linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/",
        color: "#00a3e0"
    }
];

const Achievements: React.FC = () => {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        if (!selectedAchievement?.proofImages) return;
        setCurrentImageIndex((prev) => (prev + 1) % selectedAchievement.proofImages!.length);
    };

    const prevImage = () => {
        if (!selectedAchievement?.proofImages) return;
        setCurrentImageIndex((prev) => (prev - 1 + selectedAchievement.proofImages!.length) % selectedAchievement.proofImages!.length);
    };

    const handleOpenModal = (achievement: Achievement) => {
        setSelectedAchievement(achievement);
        setCurrentImageIndex(0);
    };

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
                                        <h3 className="text-base md:text-lg font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
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
                                        onClick={() => handleOpenModal(achievement)}
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

            {/* HIGH FIDELITY PROOF MODAL WITH SLIDER */}
            {selectedAchievement && (
                <div 
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-fade-in"
                    onClick={() => setSelectedAchievement(null)}
                >
                    <div 
                        className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-liquid-drop"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <Trophy size={16} className="text-blue-400" />
                                </div>
                                <h2 className="text-sm md:text-lg font-black text-white uppercase tracking-tight leading-none">
                                    Proof of Achievement
                                </h2>
                            </div>
                            <button 
                                onClick={() => setSelectedAchievement(null)}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all gelly-button"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content Body */}
                        <div className="p-5 md:p-8 bg-dark/40 max-h-[70vh] overflow-y-auto no-scrollbar">
                            {/* 1. Description FIRST */}
                            <div className="mb-6 text-center">
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-3 flex items-center justify-center gap-2">
                                    {selectedAchievement.title}
                                    {selectedAchievement.isArcade && <Zap size={18} className="text-yellow-400 animate-pulse" />}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                    {selectedAchievement.modalDescription}
                                </p>
                            </div>

                            {/* 2. Proof Slider SECOND */}
                            {selectedAchievement.proofImages && selectedAchievement.proofImages.length > 0 && (
                                <div className="relative group/slider mb-6">
                                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-slate-950/50 flex items-center justify-center group/img">
                                        <img 
                                            key={currentImageIndex}
                                            src={selectedAchievement.proofImages[currentImageIndex]}
                                            alt={`${selectedAchievement.title} proof ${currentImageIndex + 1}`}
                                            className="w-full h-full object-contain transition-all duration-500 animate-fade-in"
                                            loading="eager"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://placehold.co/800x600/0f172a/3b82f6?text=Proof+Image+${currentImageIndex + 1}`;
                                            }}
                                        />
                                        
                                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2 z-10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-[9px] font-black text-white uppercase tracking-widest">
                                                {selectedAchievement.isArcade ? `Arcade Participant (${currentImageIndex + 1}/${selectedAchievement.proofImages.length})` : "Verified Badge"}
                                            </span>
                                        </div>

                                        {selectedAchievement.isArcade && (
                                            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 px-3 py-1.5 rounded-lg text-yellow-400 text-[9px] font-black uppercase tracking-widest z-10">
                                                <Gift size={12} />
                                                Supportive Proof (Reward)
                                            </div>
                                        )}
                                    </div>

                                    {/* Slider Controls */}
                                    {selectedAchievement.proofImages.length > 1 && (
                                        <>
                                            <button 
                                                onClick={prevImage}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-blue-600"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button 
                                                onClick={nextImage}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-blue-600"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                            
                                            {/* Dot Indicators */}
                                            <div className="flex justify-center gap-1.5 mt-3">
                                                {selectedAchievement.proofImages.map((_, i) => (
                                                    <div 
                                                        key={i}
                                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'bg-blue-500 w-4' : 'bg-white/20'}`}
                                                    ></div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                            
                            <div className="text-center">
                                <p className="text-[10px] md:text-xs text-blue-400 uppercase tracking-[4px] font-black">
                                    Learning Milestone Accomplished
                                </p>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-5 border-t border-white/10 bg-slate-900/50 flex flex-col sm:flex-row gap-3">
                             {selectedAchievement.linkedinUrl && (
                                <a 
                                    href={selectedAchievement.linkedinUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-widest rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 gelly-button"
                                >
                                    <Linkedin size={14} /> View on LinkedIn
                                </a>
                             )}
                             <button 
                                onClick={() => setSelectedAchievement(null)}
                                className="flex-1 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-black uppercase text-xs tracking-widest rounded-full transition-all active:scale-95 border border-white/10 gelly-button"
                             >
                                Close proof
                             </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default React.memo(Achievements);
