import React, { useRef, useState } from 'react';
import { Mail, Send, Linkedin, Github, Link, Code2, GitCommit, Star, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import Reveal from './Reveal';

const Contact: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const showcaseRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = showcaseRef.current?.getBoundingClientRect();
    if (rect) setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  return (
    <section id="contact" className="py-20 pb-32 md:pb-20 bg-dark-lighter/10" style={{ paddingBottom: 'calc(8rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="max-w-6xl mx-auto px-4">
        <Reveal width="100%" className="text-center mb-20">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur-xl opacity-20 animate-pulse"></div>
            <div className="relative px-12 py-6 bg-slate-900/60 rounded-xl border border-white/10 backdrop-blur-3xl backdrop-saturate-150 gelly-card shadow-2xl">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                Contact
              </h2>
            </div>
          </div>
        </Reveal>

        {/* ── Premium GitHub Showcase Card (Full Width) ── */}
        <Reveal width="100%" className="mb-8">
          <div
            ref={showcaseRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMouse(m => ({ ...m, active: false }))}
            className="relative group rounded-3xl overflow-hidden"
          >
            {/* Animated gradient border */}
            <div className="absolute -inset-[1.5px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-700 animate-gradient-shift bg-[length:200%_auto] blur-[2px]" />

            {/* Main card */}
            <div className="relative bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-white/5 overflow-hidden">
              {/* Cursor spotlight */}
              <div
                className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
                style={{
                  opacity: mouse.active ? 1 : 0,
                  background: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, rgba(139,92,246,0.07), transparent 60%)`,
                }}
              />

              {/* Ambient particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                <div className="absolute top-[15%] left-[8%] w-2 h-2 rounded-full bg-cyan-400 blur-[2px] animate-pulse" />
                <div className="absolute bottom-[20%] left-[45%] w-1.5 h-1.5 rounded-full bg-purple-400 blur-[1px] animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute top-[50%] right-[15%] w-2.5 h-2.5 rounded-full bg-pink-400 blur-[3px] animate-pulse" style={{ animationDelay: '1.2s' }} />
                <div className="absolute top-[70%] left-[20%] w-1 h-1 rounded-full bg-yellow-400 blur-[1px] animate-ping" style={{ animationDuration: '4s' }} />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-0 md:gap-0">

                {/* ── LEFT: Profile Info ── */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 w-fit backdrop-blur-md">
                    <Github size={13} className="text-cyan-400" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Developer Profile</span>
                  </div>

                  {/* Name */}
                  <h3 className="text-3xl md:text-5xl font-black text-white leading-tight mb-1 tracking-tighter">
                    {ABOUT_DATA.name}
                  </h3>
                  <p className="text-base md:text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text mb-8 tracking-wide">
                    Python Full Stack Developer
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-cyan-400">
                        <Code2 size={14} />
                        <span className="font-black text-lg text-white">10+</span>
                      </div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Projects</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-purple-400">
                        <GitCommit size={14} />
                        <span className="font-black text-lg text-white">Active</span>
                      </div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Commits</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-pink-400">
                        <Star size={14} />
                        <span className="font-black text-lg text-white">AI/ML</span>
                      </div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Focus</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-slate-900 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all duration-300 w-fit shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)]"
                  >
                    <Github size={16} />
                    <span>Explore GitHub</span>
                    <ExternalLink size={13} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                {/* ── RIGHT: Video Card ── */}
                <div className="w-full md:w-[44%] md:min-h-full relative self-stretch flex items-center justify-center p-6 md:p-8">
                  {/* Divider line (desktop only) */}
                  <div className="hidden md:block absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full group/vid"
                  >
                    {/* Glow ring behind video */}
                    <div className="absolute inset-4 md:inset-6 bg-gradient-to-tr from-cyan-500/20 via-purple-500/10 to-pink-500/20 rounded-2xl blur-2xl pointer-events-none group-hover/vid:opacity-150 transition-opacity duration-700" />

                    {/* Video container */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover/vid:border-cyan-500/40 transition-colors duration-500 shadow-2xl aspect-video">
                      {/* Hover overlay with GitHub icon */}
                      <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 z-20 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                          <Github size={22} className="text-white" />
                        </div>
                        <span className="text-white text-[10px] font-black tracking-[0.25em] uppercase">View Profile</span>
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent z-10 pointer-events-none group-hover/vid:opacity-0 transition-opacity duration-700" />

                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-auto max-h-[400px] object-contain rounded-3xl group-hover:scale-105 transition-transform duration-1000 ease-out pointer-events-none"
                        ref={(el) => { 
                            if (el) { 
                                el.playbackRate = 2.0; // Play fast like a GIF
                                el.play().catch(() => {}); 
                            } 
                        }}
                      >
                        <source src="/github-profile-v2.mp4" type="video/mp4" />
                      </video>
                    </div>

                    <p className="text-center text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-3">
                      github.com/chimataraghuram
                    </p>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Social Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* LinkedIn */}
          <Reveal width="100%" delay={0.1}>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="block group relative h-full w-[90%] mx-auto max-w-md sm:w-full sm:mx-0">
              <div className="h-full bg-slate-900/40 backdrop-blur-3xl backdrop-saturate-150 p-6 sm:p-8 rounded-xl border border-white/10 group-hover:border-blue-500/50 hover:scale-[1.02] transition-all duration-500 flex flex-col items-center text-center gelly-card shadow-2xl group-hover:shadow-blue-500/20">
                <div className="p-4 bg-blue-600/10 rounded-xl text-blue-500 mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:bg-blue-600/20 group-hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] gelly-button border border-blue-500/20">
                  <Linkedin size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight group-hover:text-blue-400 transition-colors">LinkedIn</h3>
                <p className="text-gray-400 text-xs mb-5 leading-relaxed">Professional network &amp; connections</p>
                <span className="mt-auto relative px-5 py-2 rounded-full overflow-hidden gelly-button group/btn border border-blue-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-indigo-500/20 group-hover/btn:from-blue-600 group-hover/btn:via-cyan-500 group-hover/btn:to-indigo-500 transition-all duration-500"></div>
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 font-black tracking-widest text-[10px] uppercase group-hover/btn:text-white transition-all">View Profile</span>
                </span>
              </div>
            </a>
          </Reveal>

          {/* Telegram */}
          <Reveal width="100%" delay={0.2}>
            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="block group relative h-full w-[90%] mx-auto max-w-md sm:w-full sm:mx-0">
              <div className="h-full bg-slate-900/40 backdrop-blur-3xl backdrop-saturate-150 p-6 sm:p-8 rounded-xl border border-white/10 group-hover:border-sky-400/50 hover:scale-[1.02] transition-all duration-500 flex flex-col items-center text-center gelly-card shadow-2xl group-hover:shadow-sky-400/20">
                <div className="p-4 bg-gradient-to-br from-[#37AEE2] to-[#1E96C8] rounded-xl text-white mb-5 group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 shadow-[0_0_30px_rgba(55,174,226,0.5)] gelly-button">
                  <Send size={28} className="-ml-0.5 mt-0.5" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight group-hover:text-sky-400 transition-colors">Telegram</h3>
                <p className="text-gray-400 text-xs mb-5 leading-relaxed">Instant messaging &amp; community</p>
                <span className="mt-auto relative px-5 py-2 rounded-full overflow-hidden gelly-button group/btn border border-sky-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-cyan-500/20 group-hover/btn:from-sky-500 group-hover/btn:via-blue-500 group-hover/btn:to-cyan-500 transition-all duration-500"></div>
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-cyan-400 font-black tracking-widest text-[10px] uppercase group-hover/btn:text-white transition-all">Join Channel</span>
                </span>
              </div>
            </a>
          </Reveal>

          {/* Gmail */}
          <Reveal width="100%" delay={0.3}>
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`} target="_blank" rel="noreferrer" className="block group relative h-full w-[90%] mx-auto max-w-md sm:w-full sm:mx-0">
              <div className="h-full bg-slate-900/40 backdrop-blur-3xl backdrop-saturate-150 p-6 sm:p-8 rounded-xl border border-white/10 group-hover:border-red-400/50 hover:scale-[1.02] transition-all duration-500 flex flex-col items-center text-center gelly-card shadow-2xl group-hover:shadow-red-500/20">
                <div className="relative p-5 rounded-xl mb-5 group-hover:scale-110 transition-all duration-500 gelly-button overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] opacity-20 group-hover:opacity-40 blur-xl"></div>
                  <div className="relative z-10 text-[#EA4335]"><Mail size={30} strokeWidth={1.5} /></div>
                  <div className="absolute inset-0 border-2 border-white/5 rounded-xl"></div>
                </div>
                <h3 className="text-lg font-black mb-2 uppercase tracking-tight bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient">Gmail</h3>
                <p className="text-gray-400 text-xs mb-5 leading-relaxed">Business inquiries &amp; collaborations</p>
                <span className="mt-auto relative px-5 py-2 rounded-full overflow-hidden gelly-button group/btn">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-red-500/20 to-yellow-500/20 group-hover/btn:from-blue-500 group-hover/btn:via-red-500 group-hover/btn:to-yellow-500 transition-all duration-500"></div>
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-300 to-yellow-400 font-black tracking-widest text-[10px] uppercase group-hover/btn:text-white transition-all">Send Email</span>
                </span>
              </div>
            </a>
          </Reveal>

          {/* Linktree */}
          <Reveal width="100%" delay={0.4}>
            <a href={SOCIAL_LINKS.linktree} target="_blank" rel="noreferrer" className="block group relative h-full w-[90%] mx-auto max-w-md sm:w-full sm:mx-0">
              <div className="h-full bg-slate-900/40 backdrop-blur-3xl backdrop-saturate-150 p-6 sm:p-8 rounded-xl border border-white/10 group-hover:border-green-500/50 hover:scale-[1.02] transition-all duration-500 flex flex-col items-center text-center gelly-card shadow-2xl group-hover:shadow-green-500/20">
                <div className="p-4 bg-green-500/10 rounded-xl text-green-500 mb-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 group-hover:bg-green-500/20 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] gelly-button border border-green-500/20">
                  <Link size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight group-hover:text-green-400 transition-colors">Linktree</h3>
                <p className="text-gray-400 text-xs mb-5 leading-relaxed">All important links &amp; directories</p>
                <span className="mt-auto relative px-5 py-2 rounded-full overflow-hidden gelly-button group/btn border border-green-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-lime-500/20 group-hover/btn:from-green-500 group-hover/btn:via-emerald-500 group-hover/btn:to-lime-500 transition-all duration-500"></div>
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-lime-400 font-black tracking-widest text-[10px] uppercase group-hover/btn:text-white transition-all">Visit Hub</span>
                </span>
              </div>
            </a>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Contact;
