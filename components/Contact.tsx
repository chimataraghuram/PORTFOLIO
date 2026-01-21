import React from 'react';
import { Mail, Send, Linkedin, Github, Link } from 'lucide-react';
import { SOCIAL_LINKS, ABOUT_DATA } from '../constants';
import Reveal from './Reveal';

const Contact: React.FC = () => {
  return (
    <section id="publisher" className="py-20 bg-dark-lighter/10">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal width="100%" className="text-center mb-20">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur-xl opacity-20 animate-pulse"></div>
            <div className="relative px-12 py-6 bg-slate-900/60 rounded-xl border border-white/10 backdrop-blur-3xl backdrop-saturate-150 gelly-card shadow-2xl">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                Connect with Me
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* LinkedIn - Blue */}
          <Reveal width="100%" delay={0.1}>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="block group relative h-full"
            >
              <div className="h-full bg-slate-900/40 backdrop-blur-3xl backdrop-saturate-150 p-10 rounded-xl border border-white/10 group-hover:border-blue-500/50 transition-all duration-500 flex flex-col items-center text-center gelly-card shadow-2xl group-hover:shadow-blue-500/20">
                <div className="p-6 bg-blue-600/10 rounded-xl text-blue-500 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:bg-blue-600/20 group-hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] gelly-button border border-blue-500/20">
                  <Linkedin size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight group-hover:text-blue-400 transition-colors">LinkedIn</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Professional network & industry connections</p>
                <span className="mt-auto relative px-8 py-3.5 rounded-full overflow-hidden gelly-button group/btn border border-blue-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-indigo-500/20 group-hover/btn:from-blue-600 group-hover/btn:via-cyan-500 group-hover/btn:to-indigo-500 transition-all duration-500"></div>
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 font-black tracking-widest text-xs uppercase group-hover/btn:text-white transition-all">View Profile</span>
                </span>
              </div>
            </a>
          </Reveal>

          {/* GitHub - White */}
          <Reveal width="100%" delay={0.2}>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="block group relative h-full"
            >
              <div className="h-full bg-slate-900/40 backdrop-blur-3xl backdrop-saturate-150 p-10 rounded-xl border border-white/10 group-hover:border-white/30 transition-all duration-500 flex flex-col items-center text-center gelly-card shadow-2xl group-hover:shadow-white/10">
                <div className="p-6 bg-white/5 rounded-xl text-white mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 group-hover:bg-white/10 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] gelly-button border border-white/10">
                  <Github size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight group-hover:text-gray-300 transition-colors">GitHub</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Source code, repositories & contributions</p>
                <span className="mt-auto relative px-8 py-3.5 rounded-full overflow-hidden gelly-button group/btn border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 via-slate-500/20 to-zinc-500/20 group-hover/btn:from-gray-600 group-hover/btn:via-slate-500 group-hover/btn:to-zinc-500 transition-all duration-500"></div>
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-slate-200 to-zinc-300 font-black tracking-widest text-xs uppercase group-hover/btn:text-white transition-all">Explore Repos</span>
                </span>
              </div>
            </a>
          </Reveal>

          {/* Telegram - Sky Blue */}
          <Reveal width="100%" delay={0.3}>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noreferrer"
              className="block group relative h-full"
            >
              <div className="h-full bg-slate-900/40 backdrop-blur-3xl backdrop-saturate-150 p-10 rounded-xl border border-white/10 group-hover:border-sky-400/50 transition-all duration-500 flex flex-col items-center text-center gelly-card shadow-2xl group-hover:shadow-sky-400/20">
                <div className="p-6 bg-gradient-to-br from-[#37AEE2] to-[#1E96C8] rounded-xl text-white mb-8 group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 shadow-[0_0_30px_rgba(55,174,226,0.5)] group-hover:shadow-[0_0_50px_rgba(55,174,226,0.7)] gelly-button">
                  <Send size={40} className="-ml-1 mt-1" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight group-hover:text-sky-400 transition-colors">Telegram</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Instant messaging & community updates</p>
                <span className="mt-auto relative px-8 py-3.5 rounded-full overflow-hidden gelly-button group/btn border border-sky-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-cyan-500/20 group-hover/btn:from-sky-500 group-hover/btn:via-blue-500 group-hover/btn:to-cyan-500 transition-all duration-500"></div>
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-cyan-400 font-black tracking-widest text-xs uppercase group-hover/btn:text-white transition-all">Join Channel</span>
                </span>
              </div>
            </a>
          </Reveal>

          {/* Email - Red/Google */}
          <Reveal width="100%" delay={0.4}>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`}
              target="_blank"
              rel="noreferrer"
              className="block group relative h-full"
            >
              <div className="h-full bg-slate-900/40 backdrop-blur-3xl backdrop-saturate-150 p-10 rounded-xl border border-white/10 group-hover:border-red-400/50 transition-all duration-500 flex flex-col items-center text-center gelly-card shadow-2xl group-hover:shadow-red-500/20">
                <div className="relative p-7 rounded-xl mb-8 group-hover:scale-110 transition-all duration-500 gelly-button overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] opacity-20 group-hover:opacity-40 blur-xl"></div>
                  <div className="relative z-10 text-[#EA4335] group-hover:text-white transition-colors duration-500">
                    <Mail size={42} strokeWidth={1.5} />
                  </div>
                  <div className="absolute inset-0 border-2 border-white/5 rounded-xl"></div>
                </div>
                <h3 className="text-2xl font-black mb-3 uppercase tracking-tight bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient">Gmail</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Direct business inquiries & collaborations</p>
                <span className="mt-auto relative px-8 py-3.5 rounded-full overflow-hidden gelly-button group/btn">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-red-500/20 to-yellow-500/20 group-hover/btn:from-blue-500 group-hover/btn:via-red-500 group-hover/btn:to-yellow-500 transition-all duration-500"></div>
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-300 to-yellow-400 font-black tracking-widest text-xs uppercase group-hover/btn:text-white transition-all">Send Email</span>
                </span>
              </div>
            </a>
          </Reveal>

          {/* Linktree - Green */}
          <Reveal width="100%" delay={0.5}>
            <a
              href={SOCIAL_LINKS.linktree}
              target="_blank"
              rel="noreferrer"
              className="block group relative h-full"
            >
              <div className="h-full bg-slate-900/40 backdrop-blur-3xl backdrop-saturate-150 p-10 rounded-xl border border-white/10 group-hover:border-green-500/50 transition-all duration-500 flex flex-col items-center text-center gelly-card shadow-2xl group-hover:shadow-green-500/20">
                <div className="p-6 bg-green-500/10 rounded-xl text-green-500 mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 group-hover:bg-green-500/20 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] gelly-button border border-green-500/20">
                  <Link size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight group-hover:text-green-400 transition-colors">Linktree</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">All important links & social directories</p>
                <span className="mt-auto relative px-8 py-3.5 rounded-full overflow-hidden gelly-button group/btn border border-green-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-lime-500/20 group-hover/btn:from-green-500 group-hover/btn:via-emerald-500 group-hover/btn:to-lime-500 transition-all duration-500"></div>
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-lime-400 font-black tracking-widest text-xs uppercase group-hover/btn:text-white transition-all">Visit Hub</span>
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