import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import Reveal from './Reveal';

interface AIAssistantProps {
    isOpen: boolean;
    onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot', text: "Hi! I'm Raghuram's AI Agent. Ask me about his projects, skills, or experience!" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        // Simulated AI Responses
        setTimeout(() => {
            let botResponse = "I'm still learning, but you can check out Raghuram's projects section for more details!";
            const lowInput = userMsg.toLowerCase();

            if (lowInput.includes('skill')) {
                botResponse = "Raghuram excels in Python, AI/ML, and Full-Stack development. He also has a 3-year diploma in AI & ML!";
            } else if (lowInput.includes('project')) {
                botResponse = "His top projects are the Project Finder and the TechBoy Store. You can see them in the Portfolio section!";
            } else if (lowInput.includes('contact')) {
                botResponse = "You can reach him via the contact form at the bottom of the page or through his social links!";
            } else if (lowInput.includes('game')) {
                botResponse = "Try the Mini Game! It's a physics-based experience built with Matter.js.";
            }

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
            setIsTyping(false);
        }, 1200);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 z-[150] animate-liquid-drop">
            {/* Chat Modal */}
            <div className="w-[320px] md:w-[380px] h-[500px] bg-dark/95 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden gelly-card">
                {/* Header */}
                <div className="p-5 bg-gradient-to-r from-purple-600/20 via-blue-600/10 to-transparent border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg border border-white/20">
                            <img
                                src="/techboy-logo.jpg"
                                alt="TECHBOY AI"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.src = "/logo.png"; }}
                            />
                        </div>
                        <div>
                            <a href={SOCIAL_LINKS.techboyAi} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer mb-1 group title-link">
                                <h4 className="text-sm font-black text-white uppercase tracking-widest leading-none">TECHBOY AI</h4>
                                <ExternalLink size={12} className="text-gray-400 group-hover:text-white transition-colors" />
                            </a>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Online & Ready</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all gelly-button"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar bg-dark/20">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed font-medium shadow-sm animate-in slide-in-from-bottom-2 duration-300 ${msg.role === 'user'
                                ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-tr-none'
                                : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/10'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-1.5">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce duration-700"></div>
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s] duration-700"></div>
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s] duration-700"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-5 border-t border-white/10 bg-dark/60 backdrop-blur-md">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about Raghuram..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 pr-12 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all shadow-inner placeholder:text-gray-600"
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-2 w-10 h-10 rounded-xl flex items-center justify-center text-purple-400 hover:text-purple-300 hover:bg-white/5 transition-all"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
