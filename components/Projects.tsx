import React, { useRef, useEffect } from 'react';
import { ExternalLink, Github, Linkedin, Globe, Search, ShoppingBag } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';
import Reveal from './Reveal';
import { Project } from '../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
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
    <div
      id={`project-${project.id}`}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('a')) return;
        if ((project.title === 'PROJECT FINDER' || project.title === 'TECHBOY STORE') && project.liveUrl && project.liveUrl !== '#') {
          window.open(project.liveUrl, '_blank', 'noreferrer');
        }
      }}
      className={`group bg-dark-lighter rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative flex flex-col h-full gelly-card ${project.title === 'PROJECT FINDER' || project.title === 'TECHBOY STORE' ? 'cursor-pointer' : ''}`}
      style={{
        borderColor: project.color ? `${project.color}4D` : 'rgba(31, 41, 55, 1)', // 30% or default gray
        boxShadow: project.color ? `0 0 20px ${project.color}40` : '' // 25% opacity
      }}
      onMouseEnter={(e) => {
        if (project.color) {
          e.currentTarget.style.borderColor = project.color;
          e.currentTarget.style.boxShadow = `0 0 30px ${project.color}80`;
        } else {
          // Default Pink Hover
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
      {/* Internal Glow - Colorful */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

      {/* Image Container - Responsive Aspect Ratio */}
      <div ref={containerRef} className="relative aspect-video w-full overflow-hidden z-0 flex-shrink-0 bg-slate-900">
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>

        {/* New Badge */}
        {project.isNew && (
          <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-pulse">
            NEW
          </div>
        )}

        {/* Coming Soon Badge */}
        {project.isComingSoon && (
          <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-pulse">
            COMING SOON
          </div>
        )}

        {/* Standard Image Wrapper - No Parallax for better fit */}
        <div
          className="absolute w-full h-full top-0 left-0"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10 bg-dark-lighter flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-dark text-gray-300 rounded-md border border-gray-700 group-hover:border-pink-500/30 transition-colors">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col flex-grow">
          <div className="min-h-[3.5rem] mb-2">
            <h3 className={`text-xl font-bold transition-colors flex items-center gap-2 ${project.title === 'PROJECT FINDER'
              ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]'
              : project.title === 'TECHBOY STORE'
                ? 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]'
                : 'text-white group-hover:text-pink-400'
              }`}>
              <span className="line-clamp-2 leading-tight">{project.title}</span>
              {project.title === 'PROJECT FINDER' && (
                <Search size={20} className="shrink-0 stroke-[3px] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              )}
              {project.title === 'TECHBOY STORE' && (
                <ShoppingBag size={20} className="shrink-0 stroke-[3px] drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] text-yellow-400" />
              )}
            </h3>
          </div>

          <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
            {project.description}
          </p>
        </div>

        {/* Buttons - Pushed to bottom */}
        <div className="mt-auto flex flex-wrap gap-3">
          {/* GitHub Button */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group/btn relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-dark border border-purple-500 rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] hover:scale-105 gelly-button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <Github size={14} className="shrink-0" /> <span className="whitespace-nowrap">GitHub</span>
              </span>
            </a>
          )}

          {/* LinkedIn Button */}
          {project.linkedinUrl && (
            <a
              href={project.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="group/btn relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-dark border border-blue-500 rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:scale-105 gelly-button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <Linkedin size={14} className="shrink-0" /> <span className="whitespace-nowrap">LinkedIn</span>
              </span>
            </a>
          )}

          {/* Live Button */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className={`group/btn relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-dark border rounded-full overflow-hidden transition-all hover:scale-105 gelly-button ${project.title === 'TECHBOY STORE'
                ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8)]'
                : project.title === 'PROJECT FINDER'
                  ? 'border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.8)]'
                  : 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8)]'
                }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300 ${project.title === 'TECHBOY STORE'
                ? 'from-red-500 to-orange-600'
                : project.title === 'PROJECT FINDER'
                  ? 'from-cyan-500 to-blue-600'
                  : 'from-green-500 to-emerald-600'
                }`}></div>
              <span className="relative z-10 flex items-center gap-2">
                <Globe size={14} className="text-white shrink-0" />
                <span className="whitespace-nowrap">{project.title === 'TECHBOY STORE' ? 'Visit Store' : project.title === 'PROJECT FINDER' ? 'Visit Site' : 'Live Demo'}</span>
              </span>
            </a>
          )}

          {/* Hugging Face Button */}
          {project.huggingFaceUrl && (
            <a
              href={project.huggingFaceUrl}
              target="_blank"
              rel="noreferrer"
              className="group/btn relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-dark border border-yellow-500 rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_25px_rgba(234,179,8,0.8)] hover:scale-105 gelly-button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-base leading-none">🤗</span> <span className="whitespace-nowrap">Hugging Face</span>
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 pb-32 md:pb-20" style={{ paddingBottom: 'calc(8rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="max-w-6xl mx-auto px-4">
        <Reveal width="100%" className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-500 rounded-[2rem] blur-xl opacity-70 animate-pulse"></div>
            <div className="relative px-16 py-8 bg-slate-900/60 rounded-[2rem] border border-white/20 backdrop-blur-3xl backdrop-saturate-200 gelly-card cursor-pointer transition-all duration-500 shadow-[0_0_50px_rgba(34,211,238,0.5)] overflow-hidden">
              <h2 className="text-5xl md:text-7xl font-black tracking-widest uppercase text-center flex justify-center">
                <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105 active:scale-95">
                  PROJECTS
                </span>
              </h2>
            </div>
          </div>
          <p className="text-gray-400 text-sm">Most recent work</p>
        </Reveal>

        <Reveal width="100%" delay={0.2} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;