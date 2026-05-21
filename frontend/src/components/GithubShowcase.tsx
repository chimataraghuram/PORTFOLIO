import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, GitCommit, Star } from 'lucide-react';

const GithubShowcase: React.FC = () => {
  return (
    <section id="github-showcase" className="relative py-24 flex items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          {/* Animated Glow Border */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-[2.5rem] blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-shift bg-[length:200%_auto]"></div>
          
          <div className="relative bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-2xl">
            
            {/* Particles (CSS only) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
               <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-cyan-400 blur-[2px] animate-pulse"></div>
               <div className="absolute bottom-[30%] left-[40%] w-1.5 h-1.5 rounded-full bg-purple-400 blur-[1px] animate-ping" style={{ animationDuration: '3s' }}></div>
               <div className="absolute top-[40%] right-[20%] w-3 h-3 rounded-full bg-pink-400 blur-[3px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Left Content */}
            <div className="flex-1 flex flex-col items-start text-left z-10 w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                  <Github size={14} className="text-cyan-400" />
                  <span className="text-[10px] md:text-xs font-bold text-gray-300 uppercase tracking-widest">Developer Profile</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2 tracking-tighter">
                  Chimata <br className="hidden md:block" />Raghuram
                </h2>
                <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-6 tracking-wide">
                  Python full stack Developer
                </h3>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 w-full md:w-auto">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                      <Code2 size={16} />
                      <span className="font-black text-xl">Top</span>
                    </div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Contributor</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-1.5 text-purple-400 mb-1">
                      <GitCommit size={16} />
                      <span className="font-black text-xl">Active</span>
                    </div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Commits</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-1.5 text-pink-400 mb-1">
                      <Star size={16} />
                      <span className="font-black text-xl">10+</span>
                    </div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Projects</span>
                  </div>
                </div>

                <a 
                  href="https://github.com/chimataraghuram" 
                  target="_blank" 
                  rel="noreferrer"
                  className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                >
                  <span>Explore GitHub</span>
                  <ExternalLink size={16} className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>

            {/* Right Content - Video Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="relative w-full md:w-[45%] aspect-video md:aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group/video cursor-pointer"
              style={{ perspective: 1000 }}
            >
              <a href="https://github.com/chimataraghuram" target="_blank" rel="noreferrer" className="block w-full h-full">
                {/* Glow behind video */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 mix-blend-overlay z-10 pointer-events-none group-hover/video:opacity-0 transition-opacity duration-700"></div>
                
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="w-full h-full object-cover scale-[1.02] group-hover/video:scale-110 transition-transform duration-1000 ease-out"
                >
                  <source src="/images/GITHUB PROFILE VIDEO.mp4" type="video/mp4" />
                </video>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover/video:opacity-100 transition-all duration-500 z-20 flex items-center justify-center">
                  <div className="flex flex-col items-center transform translate-y-4 group-hover/video:translate-y-0 transition-transform duration-500">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-3 border border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                      <Github size={28} />
                    </div>
                    <span className="text-white font-bold tracking-widest text-sm uppercase">View Profile</span>
                  </div>
                </div>
              </a>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubShowcase;
