import React, { useRef, useEffect } from 'react';
import { ExternalLink, Github, Linkedin, Globe, Search, ShoppingBag, Compass } from 'lucide-react';
import { PROJECTS_DATA, EXPLORATIONS_DATA } from '../constants';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import { Project, Exploration } from '../types';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if project card is in viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Calculate position relative to viewport center
        const center = (rect.top + rect.height / 2) - (viewportHeight / 2);
        // Move image based on scroll position (parallax effect)
        // Adjust speed: 0.15 makes it move at 15% of scroll speed relative to container
        const speed = 0.15;
        imageRef.current.style.transform = `translateY(${center * speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <TiltCard
      className={`group bg-dark-lighter rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] relative flex flex-col h-full gelly-card w-full ${project.title === 'PROJECT FINDER' || project.title === 'TECHBOY STORE' ? 'cursor-pointer' : ''}`}
      style={{
        borderColor: project.color ? `${project.color}4D` : 'rgba(31, 41, 55, 1)',
        boxShadow: project.color ? `0 0 20px ${project.color}40` : ''
      }}
      onMouseEnter={(e) => {
        if (project.color) {
          e.currentTarget.style.borderColor = project.color;
          e.currentTarget.style.boxShadow = `0 0 30px ${project.color}80`;
        } else {
          e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.5)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(236, 72, 153, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (project.color) {
          e.currentTarget.style.borderColor = `${project.color}4D`;
          e.currentTarget.style.boxShadow = `0 0 20px ${project.color}40`;
        } else {
          e.currentTarget.style.borderColor = 'rgb(31, 41, 55)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      <div
        id={`project-${project.id}`}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) return;
          if ((project.title === 'PROJECT FINDER' || project.title === 'TECHBOY STORE') && project.liveUrl && project.liveUrl !== '#') {
            window.open(project.liveUrl, '_blank', 'noreferrer');
          }
        }}
        className="h-full flex flex-col w-full relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur transition duration-500"></div>


        {/* ── MOBILE: Slim vertical card ── */}
        <div className="md:hidden flex flex-col">
          {/* Short Image */}
          <div className="relative w-full h-36 overflow-hidden bg-slate-900 flex-shrink-0">
            {project.isNew && <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full animate-pulse">NEW</div>}
            {project.isComingSoon && <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-orange-500 to-red-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full animate-pulse">COMING SOON</div>}
            <div className="absolute top-2 right-2 z-20 bg-black/60 border border-white/20 text-white text-[9px] font-black px-2 py-0.5 rounded backdrop-blur-md">ID:0{index + 1}</div>
            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {/* Gradient fade at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-dark-lighter to-transparent"></div>
          </div>

          {/* Compact Content */}
          <div className="px-3 pt-2 pb-3">
            {/* Title */}
            <h3
              className={`text-xs font-black uppercase tracking-tight mb-1.5 truncate ${
                project.title === 'PROJECT FINDER' ? 'text-orange-400'
                : project.title === 'TECHBOY STORE' ? 'text-red-400'
                : project.title === 'Virtual Windows Desktop on AWS' ? 'text-blue-400'
                : 'text-white'}`}
              style={{ textShadow: project.color ? `0 0 8px ${project.color}99` : '' }}
            >
              {project.title}
            </h3>

            {/* Tags inline */}
            <div className="flex flex-wrap gap-1 mb-1.5">
              {project.tags.map(tag => (
                <span key={tag} className="text-[8px] uppercase px-1.5 py-0.5 bg-dark text-gray-400 rounded border border-gray-700">{tag}</span>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-[10px] leading-snug line-clamp-2 mb-2.5">{project.description}</p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold text-white border border-purple-500/70 rounded-full bg-purple-500/10 shadow-[0_0_8px_rgba(168,85,247,0.3)] active:scale-95">
                  <Github size={9} />GitHub
                </a>
              )}
              {project.linkedinUrl && (
                <a href={project.linkedinUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold text-white border border-blue-500/70 rounded-full bg-blue-500/10 shadow-[0_0_8px_rgba(59,130,246,0.3)] active:scale-95">
                  <Linkedin size={9} />LinkedIn
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold text-white border rounded-full active:scale-95 ${
                    project.title === 'TECHBOY STORE' ? 'border-red-500/70 bg-red-500/10 shadow-[0_0_8px_rgba(239,68,68,0.3)]'
                    : project.title === 'PROJECT FINDER' ? 'border-orange-500/70 bg-orange-500/10 shadow-[0_0_8px_rgba(249,115,22,0.3)]'
                    : 'border-green-500/70 bg-green-500/10 shadow-[0_0_8px_rgba(34,197,94,0.3)]'}`}>
                  <Globe size={9} />{project.title === 'TECHBOY STORE' ? 'Store' : project.title === 'PROJECT FINDER' ? 'Live Site' : 'Live Demo'}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── DESKTOP: Original full vertical layout ── */}
        <div className="hidden md:block">
          {/* Image Container */}
          <div ref={containerRef} className="relative aspect-video w-full overflow-hidden z-0 flex-shrink-0 bg-slate-900">
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            {project.isNew && (
              <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg animate-pulse">NEW</div>
            )}
            {project.isComingSoon && (
              <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg animate-pulse">COMING SOON</div>
            )}
            <div className="absolute top-3 right-3 z-20 bg-slate-900/80 border border-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-md backdrop-blur-md shadow-xl group-hover:border-cyan-500/50 transition-colors">
              ID:0{index + 1}
            </div>
            <div className="absolute w-full h-full top-0 left-0">
              <img src={project.image} alt={project.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 relative z-10 bg-dark-lighter flex flex-col flex-grow">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="text-[9px] sm:text-xs uppercase tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 bg-dark text-gray-300 rounded-md border border-gray-700 group-hover:border-pink-500/30 transition-colors">{tag}</span>
              ))}
            </div>

            <div className="flex flex-col flex-grow">
              <div className="mb-2">
                <div
                  className="inline-flex items-center px-4 py-2 rounded-full border-2 transition-all duration-300 gelly-button group-hover:scale-105 cursor-pointer active:scale-95"
                  style={{
                    borderColor: project.color ? `${project.color}A6` : 'rgba(236, 72, 153, 0.65)',
                    boxShadow: project.color ? `0 0 15px ${project.color}80` : '0 0 15px rgba(236, 72, 153, 0.5)',
                    backgroundColor: project.color ? `${project.color}1A` : 'rgba(236, 72, 153, 0.1)'
                  }}
                >
                  <h3
                    className={`text-xs md:text-sm font-bold transition-colors flex items-center gap-2 ${
                      project.title === 'PROJECT FINDER' ? 'text-orange-500'
                      : project.title === 'TECHBOY STORE' ? 'text-red-500'
                      : project.title === 'Virtual Windows Desktop on AWS' ? 'text-blue-500'
                      : 'text-white'}`}
                    style={{ textShadow: project.color ? `0 0 5px ${project.color}BF` : '0 0 5px rgba(236,72,153,0.8)' }}
                  >
                    <span className="leading-tight flex items-center gap-2 whitespace-nowrap truncate">
                      {['PROJECT FINDER', 'TECHBOY STORE', 'Virtual Windows Desktop on AWS'].includes(project.title) && <span className="text-sm">📌</span>}
                      {project.title}
                    </span>
                    {project.title === 'PROJECT FINDER' && <Search size={16} className="shrink-0 stroke-[3px] text-yellow-400" style={{ filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.8))' }} />}
                    {project.title === 'TECHBOY STORE' && <ShoppingBag size={16} className="shrink-0 stroke-[3px] text-yellow-400" style={{ filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.8))' }} />}
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">{project.description}</p>
            </div>

            <div className="mt-auto flex flex-wrap gap-2 sm:gap-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer"
                  className="group/btn relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-dark border border-purple-500 rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] hover:scale-105 gelly-button">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2"><Github size={14} className="shrink-0" /><span className="whitespace-nowrap">GitHub</span></span>
                </a>
              )}
              {project.linkedinUrl && (
                <a href={project.linkedinUrl} target="_blank" rel="noreferrer"
                  className="group/btn relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-dark border border-blue-500 rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:scale-105 gelly-button">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2"><Linkedin size={14} className="shrink-0" /><span className="whitespace-nowrap">LinkedIn</span></span>
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer"
                  className={`group/btn relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-dark border rounded-full overflow-hidden transition-all hover:scale-105 gelly-button ${
                    project.title === 'TECHBOY STORE' ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8)]'
                    : project.title === 'PROJECT FINDER' ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] hover:shadow-[0_0_25px_rgba(249,115,22,0.8)]'
                    : project.title === 'Virtual Windows Desktop on AWS' ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)]'
                    : 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8)]'}`}>
                  <div className={`absolute inset-0 bg-gradient-to-r opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300 ${
                    project.title === 'TECHBOY STORE' ? 'from-red-500 to-red-600'
                    : project.title === 'PROJECT FINDER' ? 'from-orange-500 to-orange-600'
                    : project.title === 'Virtual Windows Desktop on AWS' ? 'from-blue-500 to-blue-600'
                    : 'from-green-500 to-emerald-600'}`}></div>
                  <span className="relative z-10 flex items-center gap-2"><Globe size={14} className="text-white shrink-0" /><span className="whitespace-nowrap">{project.title === 'TECHBOY STORE' ? 'Visit Store' : project.title === 'PROJECT FINDER' ? 'Visit Site' : 'Live Demo'}</span></span>
                </a>
              )}
              {project.huggingFaceUrl && (
                <a href={project.huggingFaceUrl} target="_blank" rel="noreferrer"
                  className="group/btn relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-dark border border-yellow-500 rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_25px_rgba(234,179,8,0.8)] hover:scale-105 gelly-button">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2"><span className="text-base leading-none">🤗</span><span className="whitespace-nowrap">Hugging Face</span></span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const ExplorationCard: React.FC<{ exploration: Exploration }> = ({ exploration }) => {
  return (
    <TiltCard
      className="group bg-dark-lighter rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] relative flex flex-col h-full gelly-card w-full"
      style={{
        borderColor: exploration.color ? `${exploration.color}4D` : 'rgba(31, 41, 55, 1)',
        boxShadow: exploration.color ? `0 0 20px ${exploration.color}40` : ''
      }}
      onMouseEnter={(e) => { if (exploration.color) { e.currentTarget.style.borderColor = exploration.color; e.currentTarget.style.boxShadow = `0 0 30px ${exploration.color}80`; } }}
      onMouseLeave={(e) => { if (exploration.color) { e.currentTarget.style.borderColor = `${exploration.color}4D`; e.currentTarget.style.boxShadow = `0 0 20px ${exploration.color}40`; } }}
    >
      <div className="h-full flex flex-col w-full relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

        {/* ── MOBILE: Slim vertical card ── */}
        <div className="md:hidden flex flex-col">
          <div className="relative w-full h-36 overflow-hidden bg-slate-900 flex-shrink-0">
            <img src={exploration.image} onError={(e) => { e.currentTarget.src = "/logo.png"; }} alt={exploration.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-dark-lighter to-transparent"></div>
          </div>
          <div className="px-3 pt-2 pb-3">
            <h3
              className="text-xs font-black uppercase tracking-tight mb-1.5 truncate text-white"
              style={{ textShadow: exploration.color ? `0 0 8px ${exploration.color}99` : '' }}
            >
              {exploration.title}
            </h3>
            <div className="flex flex-wrap gap-1 mb-1.5">
              {exploration.tags.map(tag => (
                <span key={tag} className="text-[8px] uppercase px-1.5 py-0.5 bg-dark text-gray-400 rounded border border-gray-700">{tag}</span>
              ))}
            </div>
            <p className="text-gray-400 text-[10px] leading-snug line-clamp-2 mb-2.5">{exploration.description}</p>
            <a href={exploration.linkedinUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold text-white border rounded-full active:scale-95"
              style={{ borderColor: exploration.color ? `${exploration.color}80` : '#22d3ee', backgroundColor: exploration.color ? `${exploration.color}15` : '#22d3ee15', boxShadow: `0 0 8px ${exploration.color || '#22d3ee'}40` }}>
              <Compass size={9} className="animate-pulse" />Explore
            </a>
          </div>
        </div>

        {/* ── DESKTOP: original full layout ── */}
        <div className="hidden md:block">
          <div className="relative aspect-video w-full overflow-hidden z-0 flex-shrink-0 bg-slate-900">
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <img src={exploration.image} onError={(e) => { e.currentTarget.src = "/logo.png"; }} alt={exploration.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          </div>
          <div className="p-4 md:p-6 relative z-10 bg-dark-lighter flex flex-col flex-grow">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
              {exploration.tags.map(tag => (
                <span key={tag} className="text-[9px] sm:text-xs uppercase tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 bg-dark text-gray-300 rounded-md border border-gray-700 group-hover:border-pink-500/30 transition-colors">{tag}</span>
              ))}
            </div>
            <div className="mb-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full border-2 transition-all duration-300 gelly-button group-hover:scale-105 cursor-pointer active:scale-95"
                style={{ borderColor: exploration.color ? `${exploration.color}80` : 'rgba(168, 85, 247, 0.5)', boxShadow: exploration.color ? `0 0 15px ${exploration.color}60` : '0 0 15px rgba(168, 85, 247, 0.3)', backgroundColor: exploration.color ? `${exploration.color}10` : 'rgba(168, 85, 247, 0.1)' }}>
                <h3 className="text-xs md:text-sm font-bold text-white uppercase tracking-wider text-center flex justify-center w-full">{exploration.title}</h3>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{exploration.description}</p>
            <div className="mt-auto">
              <a href={exploration.linkedinUrl} target="_blank" rel="noreferrer"
                className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-dark border rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:scale-105 gelly-button w-full justify-center"
                style={{ borderColor: exploration.color || '#22d3ee' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2"><Compass size={16} className="shrink-0 animate-pulse" /><span>Explore</span></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 pb-32 md:pb-20" style={{ paddingBottom: 'calc(8rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="max-w-6xl mx-auto px-4">
        <Reveal width="100%" className="text-center mb-12">
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-500 rounded-[1.5rem] md:rounded-[2rem] blur-md md:blur-xl opacity-50 md:opacity-70 animate-pulse"></div>
            <div className="relative px-8 py-4 md:px-16 md:py-8 bg-slate-900/60 rounded-[1.5rem] md:rounded-[2rem] border border-white/20 backdrop-blur-3xl backdrop-saturate-200 gelly-card cursor-pointer transition-all duration-500 shadow-[0_0_20px_rgba(34,211,238,0.3)] md:shadow-[0_0_50px_rgba(34,211,238,0.5)] overflow-hidden">
              <h2 className="text-2xl md:text-7xl font-black tracking-wider md:tracking-widest uppercase text-center flex justify-center">
                <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_5px_rgba(34,211,238,0.4)] md:drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] transition-all duration-300 hover:scale-105 active:scale-95">
                  PROJECTS
                </span>
              </h2>
            </div>
          </div>
          <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-widest font-bold">Most recent work</p>
        </Reveal>
        
        {/* Projects Grid - Single column on mobile, multi-column on desktop */}
        <Reveal width="100%" delay={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </Reveal>

        {/* ── Explorations Sub-Section ─────────────────────── */}
        <div className="mt-20">
          <Reveal width="100%" className="text-center mb-10">
            <div className="relative inline-block mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
              <div className="relative px-6 md:px-10 py-3 md:py-4 bg-slate-900/80 rounded-xl border border-white/10 backdrop-blur-sm gelly-card">
                <h2 className="text-2xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                  Explorations
                </h2>
              </div>
            </div>
            <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-widest font-bold">Curiosity &amp; tinkering</p>
          </Reveal>

          <Reveal width="100%" delay={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {EXPLORATIONS_DATA.map((exploration) => (
              <ExplorationCard key={exploration.id} exploration={exploration} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Projects);
