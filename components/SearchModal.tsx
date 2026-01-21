import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Code, Briefcase, GraduationCap, User, Mail, Gamepad2, Zap } from 'lucide-react';

interface SearchItem {
    title: string;
    type: 'section' | 'skill' | 'project';
    href: string;
    icon: React.ReactNode;
    keywords: string[];
}

import { PROJECTS_DATA } from '../constants';

const searchData: SearchItem[] = [
    // Sections
    { title: 'Home', type: 'section', href: '#home', icon: <User size={18} />, keywords: ['home', 'hero', 'intro', 'welcome'] },
    { title: 'About Me', type: 'section', href: '#about', icon: <User size={18} />, keywords: ['about', 'bio', 'introduction', 'who'] },
    { title: 'Skills', type: 'section', href: '#skills', icon: <Code size={18} />, keywords: ['skills', 'technologies', 'tech stack', 'expertise'] },
    { title: 'Education', type: 'section', href: '#education', icon: <GraduationCap size={18} />, keywords: ['education', 'qualification', 'degree', 'college', 'university', 'diploma'] },
    { title: 'Internships', type: 'section', href: '#internships', icon: <Briefcase size={18} />, keywords: ['internships', 'experience', 'work', 'job'] },
    { title: 'Projects', type: 'section', href: '#portfolio', icon: <Code size={18} />, keywords: ['projects', 'portfolio', 'work', 'showcase'] },
    { title: 'Contact', type: 'section', href: '#publisher', icon: <Mail size={18} />, keywords: ['contact', 'connect', 'email', 'social', 'linkedin', 'github'] },
    { title: 'Mini Game', type: 'section', href: '#minigame', icon: <Gamepad2 size={18} />, keywords: ['game', 'play', 'fun', 'interactive', 'physics'] },

    // Skills
    { title: 'Python', type: 'skill', href: '#skills', icon: <Zap size={18} />, keywords: ['python', 'programming', 'backend', 'scripting'] },
    { title: 'React', type: 'skill', href: '#skills', icon: <Zap size={18} />, keywords: ['react', 'frontend', 'javascript', 'web'] },
    { title: 'Machine Learning', type: 'skill', href: '#skills', icon: <Zap size={18} />, keywords: ['ml', 'machine learning', 'ai', 'artificial intelligence', 'deep learning'] },
    { title: 'TensorFlow', type: 'skill', href: '#skills', icon: <Zap size={18} />, keywords: ['tensorflow', 'ml', 'deep learning', 'neural network'] },
    { title: 'JavaScript', type: 'skill', href: '#skills', icon: <Zap size={18} />, keywords: ['javascript', 'js', 'web', 'frontend'] },
    { title: 'TypeScript', type: 'skill', href: '#skills', icon: <Zap size={18} />, keywords: ['typescript', 'ts', 'javascript', 'typed'] },
    { title: 'HTML/CSS', type: 'skill', href: '#skills', icon: <Zap size={18} />, keywords: ['html', 'css', 'web', 'frontend', 'styling'] },
    { title: 'SQL', type: 'skill', href: '#skills', icon: <Zap size={18} />, keywords: ['sql', 'database', 'mysql', 'postgresql'] },
    { title: 'Git', type: 'skill', href: '#skills', icon: <Zap size={18} />, keywords: ['git', 'github', 'version control', 'repository'] },
    { title: 'AWS', type: 'skill', href: '#skills', icon: <Zap size={18} />, keywords: ['aws', 'cloud', 'amazon', 'ec2', 's3'] },

    // Dynamic Projects
    ...PROJECTS_DATA.map(project => ({
        title: project.title,
        type: 'project' as const,
        href: `#project-${project.id}`,
        icon: <Briefcase size={18} />,
        keywords: [...project.tags.map(tag => tag.toLowerCase()), project.title.toLowerCase()]
    }))
];

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = searchData.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.keywords.some(keyword => keyword.includes(lowerQuery))
        );
        setResults(filtered);
        setSelectedIndex(0);
    }, [query]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            navigateTo(results[selectedIndex]);
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    const navigateTo = (item: SearchItem) => {
        const element = document.querySelector(item.href);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

            // Highlight animation for projects
            if (item.type === 'project' || item.href.startsWith('#project-')) {
                element.classList.add('highlight-flash'); // Define this or use tailwind directly
                // Using standard tailwind classes for immediate effect if index.css update is skipped
                element.classList.add('ring-4', 'ring-pink-500', 'scale-[1.02]', 'z-30', 'transition-all', 'duration-500');

                setTimeout(() => {
                    element.classList.remove('ring-4', 'ring-pink-500', 'scale-[1.02]', 'z-30');
                    // element.classList.remove('highlight-flash');
                }, 2000);
            }
        }
        onClose();
        setQuery('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4" onClick={onClose}>
            {/* Backdrop - Liquidy Glass */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-md backdrop-saturate-150 animate-fade-in" />

            {/* Modal - Gelly Card Style */}
            <div
                className="relative w-full max-w-lg bg-slate-900/40 backdrop-blur-3xl backdrop-saturate-150 border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden animate-liquid-drop gelly-card"
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input Area */}
                <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-white/[0.02]">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 text-pink-400">
                        <Search size={22} strokeWidth={2.5} />
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search skills, projects, sections..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-gray-500 font-medium"
                    />
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 hover:rotate-90 group"
                    >
                        <X size={20} className="text-gray-400 group-hover:text-white" />
                    </button>
                </div>

                {/* Results Section */}
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar bg-black/10">
                    {query.trim() === '' ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-400 text-sm font-semibold mb-6 uppercase tracking-widest opacity-60">Quick Navigation</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {['Mini Game', ...PROJECTS_DATA.slice(0, 3).map(p => p.title)].map(label => (
                                    <button
                                        key={label}
                                        onClick={() => {
                                            const item = searchData.find(i => i.title === label);
                                            if (item) navigateTo(item);
                                            else setQuery(label);
                                        }}
                                        className="px-5 py-2.5 text-sm bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 rounded-[1.25rem] transition-all duration-300 text-gray-300 hover:text-white hover:scale-105 active:scale-95 shadow-lg"
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="p-10 text-center text-gray-500 font-medium">
                            <div className="mb-2 text-3xl">🔍</div>
                            No results found for "<span className="text-pink-400">{query}</span>"
                        </div>
                    ) : (
                        <div className="p-3 space-y-1">
                            {results.map((item, index) => (
                                <button
                                    key={`${item.type}-${item.title}`}
                                    onClick={() => navigateTo(item)}
                                    className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-300 rounded-[1.5rem] group ${index === selectedIndex
                                        ? 'bg-gradient-to-r from-pink-500/10 to-transparent border border-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.1)]'
                                        : 'hover:bg-white/[0.03] border border-transparent'
                                        }`}
                                >
                                    <div className={`p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${item.type === 'section' ? 'bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]' :
                                        item.type === 'skill' ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]' :
                                            'bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                                        }`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-semibold group-hover:text-pink-400 transition-colors uppercase tracking-tight">{item.title}</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.type}</p>
                                    </div>
                                    <ArrowRight size={18} className={`transition-all duration-300 ${index === selectedIndex ? 'text-pink-500 translate-x-0' : 'text-gray-600 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer hint */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 text-xs text-gray-500">
                    <span>↑↓ Navigate</span>
                    <span>↵ Select</span>
                    <span>Esc Close</span>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
