import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Github, Linkedin, Globe, Search, ShoppingBag, X, FileText, CheckCircle, Cpu, Target } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import OrbitalVaultBackground from './OrbitalVaultBackground';
import { Project } from '../types';

const ProjectCard: React.FC<{ project: Project; index: number; onOpenCaseStudy: (p: Project) => void }> = ({ project, index, onOpenCaseStudy }) => {

  return (
    <TiltCard
      className={`project-card group bg-dark-lighter/80 backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-4 hover:scale-[1.03] hover:shadow-[0_30px_50px_-15px_var(--project-hover-shadow)] relative flex flex-col h-full gelly-card w-full ${(project.caseStudy || (project.liveUrl && project.liveUrl !== '#')) ? 'cursor-pointer' : ''}`}
      style={{
        '--project-color-transparent': project.color ? `${project.color}4D` : 'rgba(31, 41, 55, 1)',
        '--project-shadow-color': project.color ? `${project.color}40` : 'transparent',
        '--project-hover-border': project.color || 'rgba(236, 72, 153, 0.5)',
        '--project-hover-shadow': project.color ? `${project.color}80` : 'rgba(236, 72, 153, 0.2)'
      } as React.CSSProperties}
    >
      <div
        id={`project-${project.id}`}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) return;
          if (project.liveUrl && project.liveUrl !== '#') {
            window.open(project.liveUrl, '_blank', 'noreferrer');
          } else if (project.caseStudy) {
            onOpenCaseStudy(project);
          }
        }}
        className="h-full flex flex-col w-full relative group"
      >
        {/* Internal Glow - Colorful */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

        {/* Image Container - Responsive Aspect Ratio */}
        <div className="relative aspect-video w-full overflow-hidden z-0 flex-shrink-0 bg-slate-900">
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>

          {/* New Badge */}
          {project.isNew && (
            <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg animate-pulse">
              NEW
            </div>
          )}

          {/* Coming Soon Badge */}
          {project.isComingSoon && (
            <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg animate-pulse">
              COMING SOON
            </div>
          )}

          {/* ID Badge */}
          <div className="absolute top-3 right-3 z-20 bg-slate-900/80 border border-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-md backdrop-blur-md shadow-xl group-hover:border-cyan-500/50 transition-colors">
            ID:0{index + 1}
          </div>

          {/* Standard Image Wrapper - No Parallax for better fit */}
          <div
            className="absolute w-full h-full top-0 left-0"
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 relative z-10 flex flex-col flex-grow bg-slate-900/60 backdrop-blur-xl border-t border-white/5 group-hover:border-white/10 transition-all duration-500">
          {/* Frosted shimmer on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)' }}
          />
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            {project.tags.map(tag => (
              <span key={tag} className="text-[8px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 bg-dark text-gray-300 rounded border border-gray-700 group-hover:border-pink-500/30 transition-colors">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col flex-grow">
            <div className="mb-2">
              <div
                className={`project-title-btn inline-flex items-center px-3 py-1.5 rounded-full border-2 transition-all duration-300 gelly-button group-hover:scale-105 cursor-pointer active:scale-95 ${project.title === 'My E- Startup Website Deployment on AWS Ubuntu Server' ? 'max-w-full' : ''}`}
                style={{
                  '--title-border-color': project.color ? `${project.color}A6` : 'rgba(236, 72, 153, 0.65)',
                  '--title-shadow': project.color ? `${project.color}80` : 'rgba(236, 72, 153, 0.5)',
                  '--title-bg': project.color ? `${project.color}1A` : 'rgba(236, 72, 153, 0.1)',
                  '--title-hover-border': project.color || 'rgba(236, 72, 153, 1)',
                  '--title-hover-shadow': project.color ? `${project.color}CC` : 'rgba(236, 72, 153, 0.8)',
                  '--title-hover-bg': project.color ? `${project.color}33` : 'rgba(236, 72, 153, 0.25)',
                  '--title-active-shadow': project.color || 'rgba(236, 72, 153, 1)'
                } as React.CSSProperties}
              >
                <h3
                  className={`text-[11px] md:text-xs font-bold transition-colors flex items-center gap-1.5 ${project.title === 'PROJECT FINDER'
                    ? 'text-orange-500'
                    : project.title === 'TECHBOY STORE'
                      ? 'text-red-500'
                      : project.title === 'Virtual Windows Desktop on AWS'
                        ? 'text-blue-500'
                        : 'text-white'
                    }`}
                  style={{
                    textShadow: project.title === 'PROJECT FINDER'
                      ? '0 0 5px rgba(249,115,22,0.8), 0 0 10px rgba(249,115,22,0.4)'
                      : project.title === 'TECHBOY STORE'
                        ? '0 0 5px rgba(239,68,68,0.8), 0 0 10px rgba(239,68,68,0.4)'
                        : project.title === 'Virtual Windows Desktop on AWS'
                          ? '0 0 5px rgba(59,130,246,0.8), 0 0 10px rgba(59,130,246,0.4)'
                          : project.color
                            ? `0 0 5px ${project.color}BF, 0 0 10px ${project.color}60`
                            : '0 0 5px rgba(236,72,153,0.8), 0 0 10px rgba(236,72,153,0.4)'
                  }}
                >
                  <span className={`leading-tight flex items-center gap-2 ${project.title === 'My E- Startup Website Deployment on AWS Ubuntu Server' ? 'break-words' : 'whitespace-nowrap truncate'}`}>
                    {['PROJECT FINDER', 'TECHBOY STORE', 'Virtual Windows Desktop on AWS'].includes(project.title) && (
                      <span className="text-sm">📌</span>
                    )}
                    {project.title}
                  </span>
                  {project.title === 'PROJECT FINDER' && (
                    <Search size={16} className="shrink-0 stroke-[3px] text-yellow-400" style={{ filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.8))' }} />
                  )}
                  {project.title === 'TECHBOY STORE' && (
                    <ShoppingBag size={16} className="shrink-0 stroke-[3px] text-yellow-400" style={{ filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.8))' }} />
                  )}
                </h3>
              </div>
            </div>

            <div className="flex-grow">
              <p className="text-gray-400 text-[11px] sm:text-xs mb-4 line-clamp-3">
                {project.description}
              </p>
            </div>
          </div>

          {/* Buttons - Pushed to bottom */}
          <div className="mt-auto flex flex-wrap gap-2 sm:gap-3">
            
            {/* Read Case Study Button (Primary Action) */}
            {project.caseStudy && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCaseStudy(project);
                }}
                className="w-full mb-2 group/btn relative inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-[10px] md:text-xs font-black text-white bg-dark border-2 rounded-full overflow-hidden transition-all gelly-button"
                style={{
                  borderColor: project.color ? `${project.color}A6` : 'rgba(236,72,153,0.6)',
                  boxShadow: `0 0 15px ${project.color ? project.color + '40' : 'rgba(236,72,153,0.4)'}`
                }}
              >
                <div 
                  className="absolute inset-0 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.color || '#ec4899'}, transparent)` }}
                ></div>
                <span className="relative z-10 flex items-center gap-2">
                  <FileText size={16} /> <span>READ CASE STUDY</span>
                </span>
              </button>
            )}

            {/* GitHub Button */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] md:text-xs font-bold text-white bg-dark border border-purple-500 rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] hover:scale-105 gelly-button"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-1.5">
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
                className="group/btn relative inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] md:text-xs font-bold text-white bg-dark border border-blue-500 rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:scale-105 gelly-button"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-1.5">
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
                className={`group/btn relative inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] md:text-xs font-bold text-white bg-dark border rounded-full overflow-hidden transition-all hover:scale-105 gelly-button ${project.title === 'TECHBOY STORE'
                  ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8)]'
                  : project.title === 'PROJECT FINDER'
                    ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] hover:shadow-[0_0_25px_rgba(249,115,22,0.8)]'
                    : project.title === 'Virtual Windows Desktop on AWS'
                      ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)]'
                      : 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8)]'
                  }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300 ${project.title === 'TECHBOY STORE'
                  ? 'from-red-500 to-red-600'
                  : project.title === 'PROJECT FINDER'
                    ? 'from-orange-500 to-orange-600'
                    : project.title === 'Virtual Windows Desktop on AWS'
                      ? 'from-blue-500 to-blue-600'
                      : 'from-green-500 to-emerald-600'
                  }`}></div>
                <span className="relative z-10 flex items-center gap-1.5">
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
                className="group/btn relative inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] md:text-xs font-bold text-white bg-dark border border-yellow-500 rounded-full overflow-hidden transition-all shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_25px_rgba(234,179,8,0.8)] hover:scale-105 gelly-button"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="text-base leading-none">🤗</span> <span className="whitespace-nowrap">Hugging Face</span>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const Projects: React.FC = () => {
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeCaseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [activeCaseStudy]);

  return (
    <section id="projects" className="py-20 pb-32 md:pb-20 relative" style={{ paddingBottom: 'calc(8rem + env(safe-area-inset-bottom, 0px))' }}>
      <OrbitalVaultBackground />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
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
            <ProjectCard key={project.id} project={project} index={index} onOpenCaseStudy={setActiveCaseStudy} />
          ))}
        </Reveal>
      </div>

      {/* Case Study Modal Overlay - Rendered in a portal to break out of stacking context */}
      {activeCaseStudy && activeCaseStudy.caseStudy && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveCaseStudy(null)}
          ></div>
          
          <div 
            className="relative w-full max-w-2xl max-h-[80vh] bg-dark-lighter border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500"
            style={{ boxShadow: `0 20px 50px -10px ${activeCaseStudy.color || 'rgba(236,72,153)'}40` }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/5 bg-black/20">
              <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-3">
                <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: activeCaseStudy.color || '#ec4899' }}></span>
                {activeCaseStudy.title}
              </h3>
              <button 
                onClick={() => setActiveCaseStudy(null)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-4 md:p-8 overflow-y-auto overflow-x-hidden space-y-8 custom-scrollbar">
              
              {/* Problem Section */}
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-bold flex items-center gap-2 text-rose-400">
                  <Target size={24} /> The Problem
                </h4>
                <ul className="space-y-3">
                  {activeCaseStudy.caseStudy.problem.map((prob, i) => (
                    <li key={i} className="flex gap-3 text-gray-300 leading-relaxed">
                      <span className="text-rose-500/50 mt-1">▹</span> {prob}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Section */}
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-bold flex items-center gap-2 text-blue-400">
                  <Cpu size={24} /> Architecture & Tech Stack
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeCaseStudy.caseStudy.architecture.map((arch, i) => {
                    const [title, desc] = arch.split(':');
                    return (
                      <div key={i} className="bg-black/30 p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                        {desc ? (
                          <>
                            <strong className="text-blue-300 block mb-1">{title}</strong>
                            <p className="text-gray-400 text-sm">{desc}</p>
                          </>
                        ) : (
                          <p className="text-gray-300">{arch}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Impact Section */}
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-bold flex items-center gap-2 text-emerald-400">
                  <CheckCircle size={24} /> Results & Impact
                </h4>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 md:p-6 space-y-4">
                  {activeCaseStudy.caseStudy.impact.map((imp, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <span className="text-emerald-400 font-bold">{i + 1}</span>
                      </div>
                      <p className="text-emerald-100/80 leading-relaxed pt-1">{imp}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 md:p-6 border-t border-white/5 bg-black/20 flex justify-end gap-4">
              {activeCaseStudy.liveUrl && (
                <a href={activeCaseStudy.liveUrl} target="_blank" rel="noreferrer" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all flex items-center gap-2">
                  <Globe size={16} /> View Live
                </a>
              )}
              {activeCaseStudy.githubUrl && (
                <a href={activeCaseStudy.githubUrl} target="_blank" rel="noreferrer" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full font-bold shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2">
                  <Github size={16} /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default React.memo(Projects);
