import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, ExternalLink, ShieldAlert } from 'lucide-react';
import { SOCIAL_LINKS, ABOUT_DATA, SKILLS_DATA, PROJECTS_DATA, QUALIFICATIONS_DATA, EXPLORATIONS_DATA } from '../constants';

interface AIAssistantProps {
    isOpen: boolean;
    onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'bot' | 'system', text: string }[]>([
        { role: 'bot', text: `Hi! I'm ${ABOUT_DATA.name.split(' ')[0]}'s official AI Agent. I know everything about his projects, skills, and experience. How can I help you today?` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // Construct the System Knowledge Base
    const SYSTEM_PROMPT = `
        You are "TECHBOY AI", the elite personal AI assistant for Chimata Raghuram (often called Raghu). 
        Your mission is to represent him professionally and enthusiastically to recruiters and fellow developers.
        
        KNOWLEDGE BASE:
        - Name: ${ABOUT_DATA.name}
        - Role: ${ABOUT_DATA.role}
        - Bio: ${ABOUT_DATA.description}
        - Statistics: ${JSON.stringify(ABOUT_DATA.stats)}
        - Core Skills: ${JSON.stringify(SKILLS_DATA.map(s => `${s.name} (${s.level}%)`))}
        - Key Projects: ${JSON.stringify(PROJECTS_DATA.map(p => ({ title: p.title, tech: p.tags, desc: p.description })))}
        - Experience & Education: ${JSON.stringify(QUALIFICATIONS_DATA.map(q => ({ title: q.title, subtitle: q.subtitle, date: q.date, desc: q.description })))}
        - Tech Explorations: ${JSON.stringify(EXPLORATIONS_DATA.map(e => e.title))}

        GUIDELINES:
        1. Be professional, "tech-savvy", and encouraging.
        2. If asked about contact info, mention LinkedIn (${SOCIAL_LINKS.linkedin}) and Email (${SOCIAL_LINKS.email}).
        3. Highlight his flagship project "PROJECT FINDER" (Full-Stack) whenever possible.
        4. Keep answers concise but informative (max 3-4 sentences unless detail is requested).
        5. If you don't know something specific, politely direct them to check his LinkedIn or Resume.
        6. Always refer to him as "Raghu" or "Chimata Raghuram".
        7. Mention his B-Tech in AI & ML and his 3-year Diploma in AI & ML if relevant to their doubts.
    `;

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        if (!apiKey || apiKey === "#") {
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'bot', text: "API Key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file to enable real AI responses!" }]);
                setIsTyping(false);
            }, 1000);
            return;
        }

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.origin, // Optional
                    "X-Title": "TECHBOY Portfolio AI", // Optional
                },
                body: JSON.stringify({
                    "model": "google/gemini-flash-1.5", // Using a fast, high-quality model
                    "messages": [
                        { "role": "system", "content": SYSTEM_PROMPT },
                        ...messages.map(m => ({
                            role: m.role === 'bot' ? 'assistant' : m.role,
                            content: m.text
                        })),
                        { "role": "user", "content": userMsg }
                    ],
                })
            });

            const data = await response.json();
            const botText = data.choices[0]?.message?.content || "I'm having trouble connecting to my brain right now. Please try again later!";

            setMessages(prev => [...prev, { role: 'bot', text: botText }]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { role: 'bot', text: "Connection error. Please check your internet or API configuration." }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`
            fixed z-[150] animate-liquid-drop transition-all duration-500
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
            bottom-24 right-4 md:right-6
            sm:bottom-6 sm:right-4
            inset-x-4 bottom-24 
            md:inset-auto md:bottom-24 md:right-6
        `}>
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent blur-2xl rounded-3xl opacity-50 hidden md:block"></div>

            <div className="w-full md:w-[380px] h-[70vh] md:h-[500px] bg-[#0f172a]/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative border-gradient-glow transition-all duration-500 mx-auto">
                {/* Modern Header */}
                <div className="p-4 bg-gradient-to-r from-purple-900/40 via-blue-900/20 to-transparent border-b border-white/10 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-[shimmer_2s_infinite]"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg border border-white/20 p-0.5">
                            <img
                                src="/techboy-logo.jpg"
                                alt="TECHBOY AI"
                                className="w-full h-full object-cover rounded-[10px]"
                                onError={(e) => { e.currentTarget.src = "https://api.dicebear.com/9.x/avataaars/svg?seed=TechBoy&glasses=kurt&clothing=hoodie&clothingColor=b91c1c"; }}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5 group cursor-pointer">
                                <h4 className="text-[11px] font-black text-white uppercase tracking-[4px] leading-none drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">TECHBOY AI</h4>
                                <Sparkles size={10} className="text-purple-400 animate-pulse" />
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Neural Link Active</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all gelly-button relative z-10"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-dark/20 relative">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed text-[13px] font-medium shadow-xl relative transition-all duration-300 ${msg.role === 'user'
                                ? 'bg-gradient-to-br from-purple-600 to-blue-700 text-white rounded-tr-none border border-white/10'
                                : 'bg-slate-900/60 text-gray-200 rounded-tl-none border border-white/10 backdrop-blur-md'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-slate-900/60 p-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-2 items-center shadow-lg">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-duration:800ms]"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:200ms]"></div>
                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:400ms]"></div>
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">Processing Doubt...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-dark/60 backdrop-blur-md">
                    <div className="relative flex items-center group">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything about Raghu..."
                            disabled={isTyping}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-6 pr-12 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all shadow-inner placeholder:text-gray-600 disabled:opacity-50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isTyping || !input.trim()}
                            className="absolute right-2 w-10 h-10 rounded-xl flex items-center justify-center text-purple-400 hover:text-purple-300 hover:bg-white/5 transition-all disabled:opacity-30"
                        >
                            <Send size={20} className={isTyping ? 'animate-pulse' : ''} />
                        </button>
                    </div>
                    <div className="mt-2 text-center text-[9px] text-gray-600 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                        <ShieldAlert size={10} /> Powered by OpenRouter AI
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
