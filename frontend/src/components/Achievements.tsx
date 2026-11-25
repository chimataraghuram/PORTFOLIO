import React, { useState, useEffect, useMemo } from 'react';
import { Award, Trophy, Zap, Star, X, ExternalLink, Linkedin, Gift, ChevronLeft, ChevronRight, CheckCircle, ShieldCheck, Sparkles, ScrollText, CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';
import SectionPlanet from './SectionPlanet';

interface Achievement {
    id: number;
    title: string;
    issuer?: string;
    issueDate?: string;
    description: string;
    modalDescription: string;
    icon: React.ReactNode;
    image?: string;
    proofImages?: string[];
    linkedinUrl?: string;
    verifyUrl?: string;
    color: string;
    isArcade?: boolean;
}

// 1. Google Cloud Arcade Milestone
const MILESTONE: Achievement = {
    id: 1,
    title: "Google Cloud Arcade 2024",
    issuer: "Google Cloud",
    issueDate: "2024",
    description: "Participated as a beginner, completing cloud labs and quizzes while gaining hands-on exposure to Google Cloud concepts.",
    modalDescription: "Participated in Google Cloud Arcade 2024 as a beginner, completing cloud labs and quizzes, earning points, and gaining hands-on experience with cloud concepts and workflows. This initiative demonstrates a proactive learning mindset and basic cloud proficiency.",
    icon: <Zap className="text-yellow-400" size={20} />,
    image: "https://www.gstatic.com/images/branding/product/1x/google_cloud_48dp.png",
    proofImages: [
        "/Achievements/1.jpeg",
        "/Achievements/2.jpeg",
        "/Achievements/3.jpeg",
        "/Achievements/4.jpeg"
    ],
    linkedinUrl: "https://www.linkedin.com/posts/chimataraghuram_googlearcade-googlecloud-ai-activity-7345721907792461825-6QMG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOtUXYBplcXqbLkAkO7uJZnotuCj1Y2ROw",
    color: "#f9ab00",
    isArcade: true
};

// 2. Verified Professional Certifications for Horizontal Slider
const CERTIFICATIONS: Achievement[] = [
    {
        id: 101,
        title: "Microsoft Certified: Azure AI Fundamentals",
        issuer: "Microsoft",
        issueDate: "August 14, 2026",
        description: "Fundamental AI workloads, machine learning, computer vision, natural language processing, and conversational AI on Azure.",
        modalDescription: "Successfully passed Microsoft certification requirements (Credential ID: 87AF7A437466E53D | Certification number: C8D258-P67831). Validates core AI principles and end-to-end implementation of Azure AI Services.",
        icon: <ShieldCheck className="text-sky-400" size={20} />,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
        proofImages: ["/certificates/azure-ai-fundamentals.jpg"],
        linkedinUrl: "https://lnkd.in/p/gvPi9JJE",
        color: "#00a4ef"
    },
    {
        id: 102,
        title: "Back-End Development and APIs V8",
        issuer: "freeCodeCamp",
        issueDate: "September 20, 2026",
        description: "300 hours developer certification covering Node.js, Express, MongoDB, Mongoose, RESTful API architecture, and microservices.",
        modalDescription: "Earned freeCodeCamp's accredited 300-hour Back-End Development and APIs V8 certification. Completed multiple rigorous full-stack projects including microservices, exercise tracker, URL shortener, and file metadata analyzer.",
        icon: <Award className="text-amber-400" size={20} />,
        image: "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
        proofImages: ["/certificates/freecodecamp-backend-apis.jpg"],
        linkedinUrl: "https://lnkd.in/p/g3kmyzx7",
        verifyUrl: "https://freecodecamp.org/certification/chimataraghuram/back-end-development-and-apis",
        color: "#f59e0b"
    },
    {
        id: 103,
        title: "Privacy and Security in Online Social Media",
        issuer: "NPTEL & IIT Hyderabad (Elite)",
        issueDate: "Jul - Oct 2026",
        description: "Elite certification with 84% consolidated score in a 12-week proctored exam course conducted by IIT Hyderabad and Swayam.",
        modalDescription: "Awarded Elite certification by NPTEL (Ministry of Education, Govt. of India) and IIIT Hyderabad with an 84% score (Assignments: 24.57/25, Proctored Exam: 58.5/75) among 28,451 candidates (Roll: NPTEL26CS141S953400150).",
        icon: <Trophy className="text-rose-400" size={20} />,
        proofImages: ["/certificates/nptel-privacy-security.jpg"],
        linkedinUrl: "https://lnkd.in/p/gdTnbKeA",
        color: "#e11d48"
    },
    {
        id: 104,
        title: "Object Oriented Programming using Python",
        issuer: "Infosys Springboard",
        issueDate: "March 24, 2026",
        description: "Core OOP principles in Python including classes, inheritance, polymorphism, encapsulation, and scalable design patterns.",
        modalDescription: "Earned official Course Completion Certificate from Infosys Springboard for mastering Object Oriented Programming using Python with hands-on labs and evaluations certified by Infosys leadership.",
        icon: <CheckCircle className="text-cyan-400" size={20} />,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/600px-Infosys_logo.svg.png",
        proofImages: ["/certificates/infosys-python-oop.jpg"],
        linkedinUrl: "https://www.linkedin.com/in/chimataraghuram/",
        color: "#06b6d4"
    }
];

const CONFETTI_COLORS = ['#ff006e','#fb5607','#ffbe0b','#06d6a0','#3a86ff','#8338ec','#ec4899'];

const ConfettiBurst: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.4}s`,
        size: `${6 + Math.random() * 6}px`,
      })),
    []
  );
  if (!trigger) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute top-0 animate-confetti-fall rounded-sm"
          style={{ left: p.left, width: p.size, height: p.size, backgroundColor: p.color, animationDelay: p.delay }}
        />
      ))}
    </div>
  );
};

const Achievements: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<Achievement | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [confettiFired, setConfettiFired] = useState(false);
    
    // Slider state for horizontal certificate scroll
    const [certIndex, setCertIndex] = useState(0);

    useEffect(() => {
        if (!selectedItem) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedItem(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItem]);

    const nextCert = () => {
        setCertIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
    };

    const prevCert = () => {
        setCertIndex((prev) => (prev - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length);
    };

    const nextProofImage = () => {
        if (!selectedItem?.proofImages) return;
        setCurrentImageIndex((prev) => (prev + 1) % selectedItem.proofImages!.length);
    };

    const prevProofImage = () => {
        if (!selectedItem?.proofImages) return;
        setCurrentImageIndex((prev) => (prev - 1 + selectedItem.proofImages!.length) % selectedItem.proofImages!.length);
    };

    const touchStartX = React.useRef<number>(0);
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) nextProofImage();
            else prevProofImage();
        }
    };

    const activeCert = CERTIFICATIONS[certIndex];

    return (
        <section id="achievements" className="py-20 relative overflow-hidden bg-transparent">
            {/* Section Planet - Neptune beside Achievements section */}
            <SectionPlanet
                texture="/planets/neptune.jpg"
                side="right"
                glow="rgba(96, 165, 250, 0.5)"
                shade="rgba(49, 46, 129, 0.6)"
                rotateDirection={-1}
                rotateDuration={52}
            />

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                {/* ── Section Header ── */}
                <Reveal width="100%" className="text-center mb-12">
                    <div className="relative inline-block mb-4">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-cyan-500 via-purple-500 to-blue-600 rounded-xl blur opacity-30 animate-pulse"></div>
                        <div className="relative px-6 md:px-10 py-3 md:py-4 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-blue-400 via-cyan-500 to-purple-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                                Achievements
                            </h2>
                        </div>
                    </div>
                    <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-black mt-2">Milestones &amp; Certifications</p>
                </Reveal>

                {/* ── 1. EXACT ORIGINAL GOOGLE CLOUD ARCADE ACHIEVEMENT CARD ── */}
                <div className="max-w-2xl mx-auto mb-16">
                    <Reveal width="100%">
                        <div
                            className="group p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md flex items-start gap-4 transition-all duration-500 hover:bg-slate-800/60 hover:border-white/20 hover:-translate-y-1 gelly-card relative overflow-hidden"
                            style={{ boxShadow: `0 10px 30px -15px rgba(0,0,0,0.5)` }}
                            ref={el => {
                              if (!el) return;
                              const obs = new IntersectionObserver(([entry]) => {
                                if (entry.isIntersecting && !confettiFired) {
                                  setConfettiFired(true);
                                  obs.disconnect();
                                }
                              }, { threshold: 0.6 });
                              obs.observe(el);
                            }}
                        >
                            <ConfettiBurst trigger={confettiFired} />
                            <div className="shrink-0 relative">
                                <div 
                                    className="absolute inset-0 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"
                                    style={{ backgroundColor: MILESTONE.color }}
                                ></div>
                                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-dark/80 border border-white/10 flex items-center justify-center p-2.5 overflow-hidden shadow-inner group-hover:scale-110 transition-transform duration-500">
                                    <img 
                                        src={MILESTONE.image} 
                                        alt={MILESTONE.title}
                                        className="w-full h-full object-contain filter drop-shadow-lg"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement!.innerHTML = `<div class="text-yellow-400 text-2xl font-bold">G</div>`;
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors uppercase tracking-tight">
                                        {MILESTONE.title}
                                    </h3>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        {MILESTONE.icon}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
                                    {MILESTONE.description}
                                </p>
                                
                                <button 
                                    onClick={() => { setSelectedItem(MILESTONE); setCurrentImageIndex(0); }}
                                    className="mt-3 text-xs font-black text-yellow-400 uppercase tracking-widest flex items-center gap-1.5 hover:text-yellow-300 transition-colors group/btn active:scale-95"
                                >
                                    View Proof <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* ── 2. NEW INTERACTIVE SIDEWAYS CERTIFICATES SLIDER ── */}
                <div className="max-w-3xl mx-auto">
                    {/* Header for Certifications */}
                    <div className="flex items-center justify-between mb-5 px-1">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                                <ScrollText size={18} />
                            </div>
                            <div>
                                <h3 className="text-base md:text-xl font-black text-white uppercase tracking-tight">
                                    Professional Certifications
                                </h3>
                                <p className="text-[10px] md:text-xs text-gray-400 font-bold">
                                    Slide horizontally to browse verified credentials
                                </p>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevCert}
                                aria-label="Previous Certificate"
                                className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/50 text-gray-300 hover:text-white flex items-center justify-center transition-all active:scale-90 gelly-button shadow-md"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={nextCert}
                                aria-label="Next Certificate"
                                className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/50 text-gray-300 hover:text-white flex items-center justify-center transition-all active:scale-90 gelly-button shadow-md"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* The Active Sliding Certificate Card (Sideways showcase) */}
                    <div className="relative group/slide p-5 md:p-7 rounded-3xl bg-slate-900/60 border border-white/15 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-white/30 overflow-hidden">
                        {/* Ambient Glow behind active certificate */}
                        <div 
                            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
                            style={{ backgroundColor: activeCert.color }}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            {/* Left: Certificate Preview Thumbnail */}
                            <div 
                                onClick={() => { setSelectedItem(activeCert); setCurrentImageIndex(0); }}
                                className="md:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-slate-950/80 group/thumb cursor-pointer shadow-lg"
                            >
                                <img
                                    src={activeCert.proofImages?.[0]}
                                    alt={activeCert.title}
                                    className="w-full h-full object-contain p-1.5 transition-transform duration-500 group-hover/thumb:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                    <span className="px-3 py-1.5 rounded-full bg-cyan-500 text-black font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                                        <ExternalLink size={12} /> Expand
                                    </span>
                                </div>
                                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-black text-cyan-300 uppercase tracking-wider">
                                    Verified
                                </div>
                            </div>

                            {/* Right: Certificate Information & Actions */}
                            <div className="md:col-span-7 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400">
                                            {activeCert.issuer}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-bold">
                                            {activeCert.issueDate}
                                        </span>
                                    </div>

                                    <h4 className="text-base sm:text-lg md:text-xl font-black text-white tracking-tight leading-snug mb-2.5">
                                        {activeCert.title}
                                    </h4>

                                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium mb-5 line-clamp-3">
                                        {activeCert.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                                    <button
                                        onClick={() => { setSelectedItem(activeCert); setCurrentImageIndex(0); }}
                                        className="px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-xs tracking-wider flex items-center gap-1.5 transition-all active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.4)] gelly-button"
                                    >
                                        <ExternalLink size={13} /> View Certificate
                                    </button>

                                    {activeCert.linkedinUrl && (
                                        <a
                                            href={activeCert.linkedinUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 py-2 rounded-full bg-[#0A66C2] hover:bg-[#084e96] text-white font-black uppercase text-xs tracking-wider flex items-center gap-1.5 transition-all active:scale-95 shadow-[0_0_15px_rgba(10,102,194,0.4)] gelly-button"
                                        >
                                            <Linkedin size={13} /> LinkedIn Post
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Slide Indicators / Dots */}
                        <div className="flex items-center justify-center gap-2 mt-6 pt-2">
                            {CERTIFICATIONS.map((cert, idx) => (
                                <button
                                    key={cert.id}
                                    onClick={() => setCertIndex(idx)}
                                    aria-label={`Slide to ${cert.title}`}
                                    className={`compact-dot h-2 rounded-full transition-all duration-300 ${
                                        idx === certIndex 
                                            ? 'w-7 bg-cyan-400 shadow-[0_0_8px_#22d3ee]' 
                                            : 'w-2 bg-white/20 hover:bg-white/40'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── HIGH FIDELITY PROOF MODAL WITH SLIDER ── */}
            {selectedItem && (
                <div 
                    className="fixed inset-0 z-[200] flex items-center justify-center px-4 pt-20 pb-24 lg:p-6 bg-black/80 backdrop-blur-xl animate-fade-in"
                    onClick={() => setSelectedItem(null)}
                >
                    <div 
                        className="relative w-full max-w-xl max-h-full flex flex-col bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-liquid-drop"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <Trophy size={16} className="text-blue-400" />
                                </div>
                                <h2 className="text-sm md:text-lg font-black text-white uppercase tracking-tight leading-none">
                                    {selectedItem.isArcade ? "Proof of Achievement" : "Verified Certificate"}
                                </h2>
                            </div>
                            <button 
                                onClick={() => setSelectedItem(null)}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all gelly-button"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content Body */}
                        <div className="p-5 md:p-8 bg-dark/40 max-h-[70vh] overflow-y-auto no-scrollbar">
                            {/* Description */}
                            <div className="mb-6 text-center">
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-3 flex items-center justify-center gap-2">
                                    {selectedItem.title}
                                    {selectedItem.isArcade && <Zap size={18} className="text-yellow-400 animate-pulse" />}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                    {selectedItem.modalDescription}
                                </p>
                            </div>

                            {/* Proof Image / Slider */}
                            {selectedItem.proofImages && selectedItem.proofImages.length > 0 && (
                                <div 
                                    className="relative group/slider mb-6"
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-slate-950/50 flex items-center justify-center group/img">
                                        <img 
                                            key={currentImageIndex}
                                            src={selectedItem.proofImages[currentImageIndex]}
                                            alt={`${selectedItem.title} proof ${currentImageIndex + 1}`}
                                            className="w-full h-full object-contain transition-all duration-500 animate-fade-in"
                                            loading="eager"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://placehold.co/800x600/0f172a/3b82f6?text=Proof+Image+${currentImageIndex + 1}`;
                                            }}
                                        />
                                        
                                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2 z-10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-[9px] font-black text-white uppercase tracking-widest">
                                                {selectedItem.isArcade ? `Arcade Participant (${currentImageIndex + 1}/${selectedItem.proofImages.length})` : "Verified Certificate"}
                                            </span>
                                        </div>

                                        {selectedItem.isArcade && (
                                            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 px-3 py-1.5 rounded-lg text-yellow-400 text-[9px] font-black uppercase tracking-widest z-10">
                                                <Gift size={12} />
                                                Supportive Proof (Reward)
                                            </div>
                                        )}
                                    </div>

                                    {/* Slider Controls for multi-image proof (Arcade) */}
                                    {selectedItem.proofImages.length > 1 && (
                                        <>
                                            <button 
                                                onClick={prevProofImage}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-60 md:opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-blue-600 active:bg-blue-600"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button 
                                                onClick={nextProofImage}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-60 md:opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-blue-600 active:bg-blue-600"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                            
                                            <div className="flex justify-center gap-1.5 mt-3">
                                                {selectedItem.proofImages.map((_, i) => (
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
                             {selectedItem.linkedinUrl && (
                                <a 
                                    href={selectedItem.linkedinUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 px-6 py-3 bg-[#0A66C2] hover:bg-[#084e96] text-white font-black uppercase text-xs tracking-widest rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(10,102,194,0.4)] active:scale-95 gelly-button"
                                >
                                    <Linkedin size={14} /> View on LinkedIn
                                </a>
                             )}
                             <button 
                                onClick={() => setSelectedItem(null)}
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
