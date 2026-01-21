import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

const AIAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
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

    return (
        <>
            {/* Floating Bubble */}
            <div className="fixed bottom-6 right-6 z-[100]">
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all duration-300 transform hover:-translate-y-2 group gelly-button"
                    >
                        <Bot size={32} className="group-hover:scale-110 transition-transform" />
                        <Sparkles size={16} className="absolute top-2 right-2 animate-pulse text-yellow-300" />
                    </button>
                )}

                {/* Chat Modal */}
                {isOpen && (
                    <div className="w-[320px] md:w-[380px] h-[500px] bg-slate-900/90 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-liquid-drop gelly-card">
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Portfolio Agent</h4>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-[10px] text-gray-400">Online & Ready</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${msg.role === 'user'
                                            ? 'bg-purple-600 text-white rounded-tr-none'
                                            : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-slate-900/50">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type a message..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-6 pr-12 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 p-1.5 text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                            <p className="text-[10px] text-center text-gray-500 mt-2">Built with AI Intelligence</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AIAssistant;
