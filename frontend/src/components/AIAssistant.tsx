import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, ExternalLink, ShieldCheck, Github, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS, ABOUT_DATA, SKILLS_DATA, PROJECTS_DATA, QUALIFICATIONS_DATA } from '../constants';

interface AIAssistantProps {
    isOpen: boolean;
    onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'bot' | 'system', text: string }[]>([
        { 
            role: 'bot', 
            text: `👋 Hi! I'm **TECHBOY AI**, the personal AI agent for **Chimata Raghuram (Raghu)**.\n\nAsk me anything! From his technical stack and projects to interview questions, code architecture, or career journey.` 
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    const openRouterKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // System prompt engineered for live, dynamic, intelligent responses
    const SYSTEM_PROMPT = `
You are TECHBOY AI, the official personal AI agent for Chimata Raghuram (also known as Raghu or TechBoy), embedded in his developer portfolio.

MISSION:
Answer dynamically, intelligently, and creatively to ANY question the user asks. You are a live AI model—do NOT sound like a rigid template or give repetitive canned answers. Tailor your tone and response uniquely to what the user is asking (interview questions, architectural queries, tech comparisons, casual chit-chat, or deep dives into his code).

CRITICAL FORMATTING GUIDELINE:
- Always format neatly with clean bullet points (•) and bold keywords so it is readable at a glance.
- Keep responses compact, punchy, and direct—avoid long, tedious paragraphs.
- Include clickable markdown links [Label](url) when citing projects, GitHub, or LinkedIn.

COMPLETE KNOWLEDGE BASE:
- Identity: Chimata Raghuram (Raghu / TechBoy)
- Role: Python Full Stack Developer & AI/ML Engineer
- Location: Chirala, Andhra Pradesh, India
- Email: ${SOCIAL_LINKS.email}
- LinkedIn: ${SOCIAL_LINKS.linkedin}
- GitHub: ${SOCIAL_LINKS.github}
- Telegram Store: ${SOCIAL_LINKS.telegram}

EDUCATION:
- B-Tech in AI & ML (2024 - 2027): SRK Institute of Technology, Vijayawada (CGPA: 8.00+)
- 3-Year Diploma in AI & ML (2021 - 2024): St. Mary's Group of Institutions, Guntur (78.68%)
- SSC (2021): Vignana Bharathi High School (100% score, 1st place in English writing)

INDUSTRY EXPERIENCE (LINKEDIN):
1. Python Full Stack Developer Intern at Nipuna Technologies (6 Months, 2024):
   - Designed and deployed full-stack dynamic applications with Django backend, SQL databases, and responsive HTML/CSS/JS frontend.
   - Mastered MVC patterns, relational database indexing, and REST API development.
2. AWS Cloud Computing & DevOps Intern at APSSDC (2 Months):
   - Deployed web apps on AWS EC2 Ubuntu Linux with Nginx reverse proxy, custom Security Groups, and SSL/HTTPS.
   - Worked with EC2, S3, IAM, Lambda, and CI/CD pipelines.
3. AI & ML Intern at Smartbridge (Google for Developers - India Edu Program):
   - Trained and evaluated machine learning models with Python on real datasets.

FLAGSHIP PROJECTS (GITHUB):
1. PROJECT FINDER (Live: ${SOCIAL_LINKS.projectFinder} | Repo: https://github.com/chimataraghuram/PROJECT-FINDER.git):
   - Tech: React 19, TypeScript, Node.js Express API proxy, MongoDB (Mongoose), Framer Motion.
   - Features: Searches simultaneously across GitHub, Hugging Face, Kaggle & LinkedIn. Has Gemini AI architectural reviews and a Comparison Studio for side-by-side repo evaluations.
2. TECHBOY STORE (Live: ${SOCIAL_LINKS.techboyStore} | Repo: https://github.com/chimataraghuram/TECHBOY-STORE.git):
   - Tech: Django REST Framework, React 19, PostgreSQL, Firebase Auth (Google OAuth), n8n workflow automation.
   - Features: Smartphone intelligence, price drop tracking, and automated real-time email alerts via n8n.
3. AWS EC2 Web Deployment (Repo: https://github.com/chimataraghuram/AWS-EC2-Website-Deployment-Using-Ubuntu-Apache2.git):
   - Hands-on cloud server administration, SSH, Apache2, and custom Security Groups.

TECHNICAL SKILLS:
- Languages: Python, JavaScript, SQL, HTML5/CSS3
- Frameworks: Django, Django REST Framework, React 19, Node.js, Express, Tailwind CSS
- Cloud & DevOps: AWS (EC2, S3, IAM, Lambda), Docker, Git/GitHub, Linux, Nginx, Apache2, CI/CD
- Databases: PostgreSQL, MongoDB, MySQL
- Next-Gen Tools: n8n Automation, Google AI Studio, Antigravity Agent, Claude Code, Cursor, Codex
`;

    // Local conversational fallback in case of network disconnect
    const getLocalFallback = (query: string): string => {
        const q = query.toLowerCase();

        if (q.includes('hire') || q.includes('why') || q.includes('fit') || q.includes('benefit')) {
            return `Here is why **Raghu** is a high-impact engineering asset:\n\n` +
                   `• **Full-Stack Depth:** Builds secure, production-grade backends with Django REST and responsive UIs with React 19.\n` +
                   `• **Cloud-Native Deployment:** Hands-on experience configuring AWS EC2, Nginx, Linux servers, and CI/CD pipelines.\n` +
                   `• **AI & Automation Integration:** Integrates Gemini LLMs and automated n8n workflows into real applications like [PROJECT FINDER](${SOCIAL_LINKS.projectFinder}).\n` +
                   `• **Continuous Drive:** High academic performance (8.00+ CGPA) and active open-source activity on [GitHub](${SOCIAL_LINKS.github}).`;
        }

        if (q.includes('who') || q.includes('about') || q.includes('raghu') || q.includes('intro')) {
            return `**Chimata Raghuram (Raghu)** is a Python Full Stack Developer & AI/ML Engineer based in Chirala, AP:\n\n` +
                   `• **Role:** Python Full Stack Developer & AI/ML Engineer\n` +
                   `• **Education:** B-Tech in AI & ML at SRK Institute (8.00+ CGPA) & 3-Year Diploma (78.68%)\n` +
                   `• **Core Stack:** Python, Django, React 19, AWS Cloud, Docker, n8n Automation\n` +
                   `• **Flagship Work:** [PROJECT FINDER](${SOCIAL_LINKS.projectFinder}) & [TECHBOY STORE](${SOCIAL_LINKS.techboyStore})\n` +
                   `• **Connect:** [GitHub](${SOCIAL_LINKS.github}) | [LinkedIn](${SOCIAL_LINKS.linkedin})`;
        }

        if (q.includes('project') || q.includes('work') || q.includes('finder') || q.includes('store') || q.includes('build')) {
            return `Here are Raghu's flagship projects:\n\n` +
                   `• **[PROJECT FINDER](${SOCIAL_LINKS.projectFinder})**\n` +
                   `  Multi-platform discovery across GitHub, HuggingFace, Kaggle & LinkedIn with Gemini AI code reviews. ([GitHub Repo](https://github.com/chimataraghuram/PROJECT-FINDER.git))\n\n` +
                   `• **[TECHBOY STORE](${SOCIAL_LINKS.techboyStore})**\n` +
                   `  Smartphone specs comparison with automated n8n price-drop email alerts. Built with Django REST, React 19 & PostgreSQL. ([GitHub Repo](https://github.com/chimataraghuram/TECHBOY-STORE.git))\n\n` +
                   `• **[AWS EC2 Deployment](https://github.com/chimataraghuram/AWS-EC2-Website-Deployment-Using-Ubuntu-Apache2.git)**\n` +
                   `  Production Apache2 web server deployment on AWS Ubuntu Linux.`;
        }

        if (q.includes('intern') || q.includes('experience') || q.includes('job') || q.includes('company')) {
            return `Here is Raghu's industry internship experience:\n\n` +
                   `• **Nipuna Technologies (6 Months):** Python Full Stack Developer Intern — built dynamic web applications with Django, SQL, and REST APIs.\n` +
                   `• **APSSDC (2 Months):** AWS Cloud & DevOps Intern — deployed web apps on EC2 Ubuntu with Nginx, HTTPS, and CI/CD pipelines.\n` +
                   `• **Smartbridge (2 Months):** Google for Developers India Edu Program — AI & ML model training with Python.`;
        }

        if (q.includes('github') || q.includes('linkedin') || q.includes('contact') || q.includes('email') || q.includes('reach')) {
            return `You can connect with Raghu directly:\n\n` +
                   `• **GitHub:** [github.com/chimataraghuram](${SOCIAL_LINKS.github})\n` +
                   `• **LinkedIn:** [linkedin.com/in/chimataraghuram](${SOCIAL_LINKS.linkedin})\n` +
                   `• **Email:** [${SOCIAL_LINKS.email}](mailto:${SOCIAL_LINKS.email})\n` +
                   `• **Live Store:** [techboy-store.vercel.app](${SOCIAL_LINKS.techboyStore})`;
        }

        return `**Chimata Raghuram (Raghu)** — Python Full Stack Developer & AI/ML Engineer:\n\n` +
               `• **Projects:** [PROJECT FINDER](${SOCIAL_LINKS.projectFinder}) | [TECHBOY STORE](${SOCIAL_LINKS.techboyStore})\n` +
               `• **Profiles:** [GitHub](${SOCIAL_LINKS.github}) | [LinkedIn](${SOCIAL_LINKS.linkedin})\n` +
               `• **Education:** B-Tech AI & ML at SRK Institute (8.00+ CGPA)\n` +
               `• **Contact:** [${SOCIAL_LINKS.email}](mailto:${SOCIAL_LINKS.email})`;
    };

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg = input.trim();
        const updatedMessages = [...messages, { role: 'user' as const, text: userMsg }];
        setMessages(updatedMessages);
        setInput('');
        setIsTyping(true);

        let botReply = '';

        // 1. Direct Dynamic Call to Gemini API (gemini-3.1-flash-lite, gemini-3.5-flash)
        if (geminiKey) {
            const geminiModels = ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.8-flash'];
            const contents = updatedMessages
                .filter(m => m.role !== 'system')
                .map(m => ({
                    role: m.role === 'bot' ? 'model' : 'user',
                    parts: [{ text: m.text }]
                }));

            for (const model of geminiModels) {
                try {
                    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                            contents,
                            generationConfig: {
                                thinkingConfig: { thinkingBudget: 0 },
                                temperature: 0.65, // Dynamic, expressive & non-rigid
                            }
                        })
                    });
                    const data = await res.json();
                    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (res.ok && text) {
                        botReply = text.trim();
                        break;
                    }
                } catch (_) {
                    // Try next model or fallback
                }
            }
        }

        // 2. Serverless proxy fallback
        if (!botReply) {
            try {
                const proxyRes = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        systemPrompt: SYSTEM_PROMPT,
                        messages: updatedMessages.map(m => ({
                            role: m.role === 'bot' ? 'assistant' : m.role,
                            content: m.text
                        }))
                    }),
                });
                const proxyData = await proxyRes.json();
                if (proxyData?.choices?.[0]?.message?.content) {
                    botReply = proxyData.choices[0].message.content.trim();
                }
            } catch (_) {
                // Fallback
            }
        }

        // 3. Guaranteed High-Quality Dynamic Fallback (Never leaves user stranded)
        if (!botReply) {
            botReply = getLocalFallback(userMsg);
        }

        setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
        setIsTyping(false);
    };

    if (!isOpen) return null;

    // Helper to render markdown (bold, links) nicely inside chat bubbles
    const renderMessageContent = (text: string) => {
        // First split by markdown links [label](url)
        const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
        return parts.map((part, index) => {
            const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (linkMatch) {
                return (
                    <a
                        key={index}
                        href={linkMatch[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 underline font-semibold transition-colors"
                    >
                        {linkMatch[1]}
                    </a>
                );
            }
            // Parse **bold** markdown within non-link parts
            const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
            return boldParts.map((subPart, subIdx) => {
                const boldMatch = subPart.match(/^\*\*([^*]+)\*\*$/);
                if (boldMatch) {
                    return (
                        <strong key={`${index}-${subIdx}`} className="font-bold text-amber-200">
                            {boldMatch[1]}
                        </strong>
                    );
                }
                return <span key={`${index}-${subIdx}`}>{subPart}</span>;
            });
        });
    };

    return (
        <div className={`
            fixed z-[160] animate-liquid-drop
            bottom-[82px] right-3 left-auto
            md:bottom-6 md:right-6 md:left-auto
            transition-all duration-300 origin-bottom-right
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}>
            {/* Ambient Background Warm Amber/Orange/Red Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-red-600/25 via-orange-500/15 to-transparent blur-2xl rounded-3xl opacity-60 hidden md:block"></div>

            <div className="w-[88vw] max-w-[340px] sm:max-w-[360px] md:w-[410px] md:max-w-none h-[62vh] min-h-[380px] max-h-[540px] md:h-[580px] bg-[#0c0808]/95 backdrop-blur-3xl border border-red-500/40 rounded-3xl shadow-[0_12px_45px_rgba(239,68,68,0.3)] flex flex-col overflow-hidden relative transition-all duration-300">
                {/* Warm Amber/Red Cyber Header matching the pill badge */}
                <div className="p-3 sm:p-3.5 md:p-4 bg-gradient-to-r from-red-950/80 via-orange-950/50 to-transparent border-b border-red-500/20 flex items-center justify-between relative overflow-hidden flex-shrink-0">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-[shimmer_2s_infinite]"></div>
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                        {/* High-Definition Logo with warm amber neon glow border */}
                        <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-2xl overflow-hidden bg-black/80 shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.45)] border border-orange-500/50 p-0.5">
                            <img
                                src="/techboy-logo.jpg"
                                alt="TECHBOY AI Logo"
                                className="w-full h-full object-cover rounded-[13px]"
                                onError={(e) => { 
                                    e.currentTarget.src = "/techboy.png"; 
                                }}
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                                <h4 className="text-[12px] md:text-[13px] font-black uppercase tracking-[2px] leading-tight drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 text-transparent bg-clip-text truncate">
                                    TECHBOY AI
                                </h4>
                                <Bot size={13} className="text-orange-500 animate-pulse shrink-0" />
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.9)] shrink-0"></div>
                                <span className="text-[9px] font-bold text-orange-200/80 uppercase tracking-wider truncate block">Portfolio • GitHub • LinkedIn</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-orange-300 hover:text-white hover:bg-red-500/20 transition-all gelly-button relative z-10 cursor-pointer shrink-0 ml-1.5"
                        aria-label="Close Assistant"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Quick Suggestion Chips - Clean, Modern Minimal Pill Design */}
                {messages.length === 1 && (
                    <div className="px-3.5 py-2.5 bg-black/40 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar touch-pan-x flex-shrink-0">
                        {[
                            "Why hire Raghu?",
                            "Tell me his projects",
                            "AWS & Docker skills?",
                            "Internships"
                        ].map((prompt, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => { setInput(prompt); }}
                                className="shrink-0 min-w-max text-[11px] font-medium text-gray-300 hover:text-white bg-white/[0.05] hover:bg-orange-500/20 hover:border-orange-500/40 border border-white/10 rounded-full px-3 py-1 whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}

                {/* Messages Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-black/30 relative">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed text-[12.5px] font-medium shadow-xl relative transition-all duration-300 ${msg.role === 'user'
                                ? 'bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-tr-none border border-red-400/20'
                                : 'bg-[#150d0d]/90 text-gray-200 rounded-tl-none border border-red-500/20 backdrop-blur-md'
                                }`}>
                                <div className="whitespace-pre-wrap">{renderMessageContent(msg.text)}</div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-[#150d0d]/90 p-3.5 rounded-2xl rounded-tl-none border border-red-500/20 flex gap-2 items-center shadow-lg">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-duration:800ms]"></div>
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:200ms]"></div>
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:400ms]"></div>
                                <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest ml-2 italic">Thinking...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-3 md:p-3.5 border-t border-red-500/20 bg-[#0a0606]/95 backdrop-blur-md">
                    <div className="relative flex items-center group bg-white/[0.04] border border-red-500/30 rounded-2xl focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500/40 transition-all">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask anything..."
                            disabled={isTyping}
                            className="w-full bg-transparent py-3 px-4 pr-12 text-xs md:text-sm text-white focus:outline-none placeholder:text-gray-400 disabled:opacity-50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isTyping || !input.trim()}
                            className="absolute right-2 w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-orange-400 hover:text-amber-300 hover:bg-orange-500/10 transition-all disabled:opacity-30 cursor-pointer"
                            aria-label="Send Message"
                        >
                            <Send size={16} className={isTyping ? 'animate-pulse' : ''} />
                        </button>
                    </div>
                    <div className="mt-2 text-center text-[9px] text-orange-400/80 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                        <Bot size={11} className="text-orange-400" /> Powered by Gemini AI
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
